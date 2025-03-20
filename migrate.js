import path from 'path';
import fs from 'fs';
import Datastore from '@seald-io/nedb';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database');
if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath);

// Crear solo las colecciones importantes
const collections = {
  users: new Datastore({ filename: path.join(dbPath, 'users.db'), autoload: true }),
  chats: new Datastore({ filename: path.join(dbPath, 'chats.db'), autoload: true }),
  settings: new Datastore({ filename: path.join(dbPath, 'settings.db'), autoload: true }),
};

// Desactivar compactación automática durante migración
Object.values(collections).forEach(db => {
  db.persistence.setAutocompactionInterval(0);
});

// Lista para registrar archivos fallidos
const failedFiles = { users: [], chats: [], settings: [] };

// Funciones de sanitización
function sanitizeId(id) {
  return id.replace(/\./g, '_');
}

function sanitizeObject(obj) {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    const sanitizedKey = key.replace(/\./g, '_');
    sanitized[sanitizedKey] = (typeof value === 'object' && value !== null) ? sanitizeObject(value) : value;
  }
  return sanitized;
}

// Función para intentar reparar JSON (más robusta)
function tryFixJSON(rawData, category, id) {
  let fixedData = rawData.trim();

  // 1. Si está vacío o es solo "{}" o "[]", ignorar
  if (!fixedData || fixedData === '{}' || fixedData === '[]') {
    failedFiles[category].push({ id, error: 'Archivo vacío o sin datos útiles', rawData });
    return null;
  }

  // 2. Si es "null" o "undefined", ignorar
  if (fixedData === 'null' || fixedData === 'undefined') {
    failedFiles[category].push({ id, error: 'Datos no válidos: null o undefined', rawData });
    return null;
  }

  // 3. Eliminar comas sobrantes al final de objetos o arrays
  fixedData = fixedData.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');

  // 4. Intentar cerrar llaves o corchetes faltantes
  let openBraces = 0;
  let openBrackets = 0;
  for (const char of fixedData) {
    if (char === '{') openBraces++;
    if (char === '}') openBraces--;
    if (char === '[') openBrackets++;
    if (char === ']') openBrackets--;
  }
  while (openBraces > 0) {
    fixedData += '}';
    openBraces--;
  }
  while (openBrackets > 0) {
    fixedData += ']';
    openBrackets--;
  }

  // 5. Eliminar caracteres no válidos al final (como "}" o "]" sueltos)
  fixedData = fixedData.replace(/}\s*$/, '').replace(/]\s*$/, '');

  // 6. Intentar parsear el JSON reparado
  try {
    const parsedData = JSON.parse(fixedData);
    // Aceptar cualquier dato, incluso si es primitivo (lo convertimos a objeto)
    if (parsedData === null || parsedData === undefined) {
      failedFiles[category].push({ id, error: 'Datos no válidos después de reparación: null o undefined', rawData });
      return null;
    }
    return typeof parsedData === 'object' ? parsedData : { value: parsedData };
  } catch (err) {
    // Si no se puede parsear, intentar reparaciones más agresivas
    console.warn(`No se pudo parsear ${category}/${id}: ${err.message}, intentando reparación agresiva...`);
    try {
      // Reemplazar comillas simples por comillas dobles
      fixedData = fixedData.replace(/'/g, '"');
      // Eliminar comas sobrantes antes de llaves o corchetes de cierre
      fixedData = fixedData.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
      // Intentar parsear de nuevo
      const parsedData = JSON.parse(fixedData);
      if (parsedData === null || parsedData === undefined) {
        failedFiles[category].push({ id, error: 'Datos no válidos después de reparación agresiva: null o undefined', rawData });
        return null;
      }
      return typeof parsedData === 'object' ? parsedData : { value: parsedData };
    } catch (aggressiveErr) {
      // Si aún falla, intentar extraer un objeto parcial
      try {
        const match = fixedData.match(/\{.*\}/);
        if (match) {
          const partialData = JSON.parse(match[0]);
          if (typeof partialData === 'object' && partialData !== null) {
            return partialData;
          }
        }
        failedFiles[category].push({ id, error: `No se pudo reparar (parcial): ${aggressiveErr.message}`, rawData });
        return null;
      } catch (partialErr) {
        failedFiles[category].push({ id, error: `No se pudo reparar (parcial): ${partialErr.message}`, rawData });
        return null;
      }
    }
  }
}

// Migrar directamente de JSON a NeDB
const oldDbPath = path.join(__dirname, 'databaseAnter');
const oldPaths = {
  users: path.join(oldDbPath, 'users'),
  chats: path.join(oldDbPath, 'chats'),
  settings: path.join(oldDbPath, 'settings'),
};

async function migrateToNeDB() {
  console.log('Migrando directamente de JSON a NeDB...');
  for (const [category, dir] of Object.entries(oldPaths)) {
    if (!fs.existsSync(dir)) {
      console.log(`No se encontró el directorio ${dir}, saltando categoría ${category}`);
      continue;
    }
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    console.log(`Encontrados ${files.length} archivos en ${category}`);

    let totalProcessed = 0;
    const seenIds = new Set();

    for (const file of files) {
      const id = path.basename(file, '.json');
      if (category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) continue;
      if (category === 'chats' && id.includes('@newsletter')) continue;
      const filePath = path.join(dir, file);

      // Verificar duplicados
      if (seenIds.has(id)) {
        console.warn(`ID duplicado encontrado: ${category}/${id}, se usará el último dato`);
        failedFiles[category].push({ id, error: 'ID duplicado, se usó el último dato' });
      }
      seenIds.add(id);

      try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        const parsedData = tryFixJSON(rawData, category, id);
        if (parsedData) {
          const doc = {
            _id: sanitizeId(id),
            data: sanitizeObject(parsedData),
          };

          // Insertar en NeDB con reintentos
          let success = false;
          for (let attempt = 1; attempt <= 5; attempt++) {
            try {
              // Asegurarse de que el archivo .db exista
              const dbFile = collections[category].filename;
              if (!fs.existsSync(dbFile)) {
                console.log(`Creando archivo ${dbFile}...`);
                fs.writeFileSync(dbFile, '');
                fs.chmodSync(dbFile, '666');
              }

              await new Promise((resolve, reject) => {
                collections[category].update(
                  { _id: doc._id },
                  { $set: { data: doc.data } },
                  { upsert: true, multi: false },
                  (err) => {
                    if (err) return reject(err);
                    resolve();
                  }
                );
              });
              success = true;
              break;
            } catch (err) {
              console.error(`Intento ${attempt} fallido para ${category}/${doc._id}:`, err.message);
              if (err.code === 'ENOENT') {
                const dbFile = collections[category].filename;
                console.log(`Archivo ${dbFile} no encontrado, recreando...`);
                fs.writeFileSync(dbFile, '');
                fs.chmodSync(dbFile, '666');
              }
              if (attempt === 5) {
                console.error(`No se pudo insertar ${category}/${doc._id} después de 5 intentos, saltando...`);
                failedFiles[category].push({ id: doc._id, error: err.message, rawData });
              }
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }

          if (success) {
            totalProcessed++;
            if (totalProcessed % 10000 === 0) console.log(`Progreso: ${totalProcessed}/${files.length} registros insertados en ${category}`);
          }
        }
      } catch (err) {
        console.error(`Error leyendo ${category}/${id}:`, err.message);
        failedFiles[category].push({ id, error: err.message, rawData });
      }

      // Compactar cada 1000 registros
      if (totalProcessed % 1000 === 0) {
        await new Promise((resolve) => {
          collections[category].persistence.compactDatafile();
          collections[category].on('compaction.done', resolve);
        });
        console.log(`Compactación de ${category} completada después de ${totalProcessed} registros`);
      }
    }

    // Compactar al final
    await new Promise((resolve) => {
      collections[category].persistence.compactDatafile();
      collections[category].on('compaction.done', resolve);
    });
    console.log(`Compactación final de ${category} completada (${totalProcessed} registros válidos)`);
  }
}

// Ejecutar la migración
async function migrate() {
  try {
    // Asegurarse de que los archivos .db existan y tengan permisos
    for (const category of Object.keys(collections)) {
      const dbFile = path.join(dbPath, `${category}.db`);
      if (!fs.existsSync(dbFile)) {
        console.log(`Creando archivo ${dbFile}...`);
        fs.writeFileSync(dbFile, '');
      }
      fs.chmodSync(dbFile, '666'); // Permisos de lectura/escritura
    }

    // Migrar directamente de JSON a NeDB
    await migrateToNeDB();

    // Mostrar archivos fallidos
    console.log('Archivos que fallaron durante la migración:');
    console.log(JSON.stringify(failedFiles, null, 2));

    console.log('Migración completada');
  } catch (err) {
    console.error('Error durante la migración:', err);
  }
}

migrate();
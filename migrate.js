import path from 'path';
import fs from 'fs';
import Datastore from '@seald-io/nedb';
import PQueue from 'p-queue';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database');
if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath);

const tempPath = path.join(__dirname, 'temp');
if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath);

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

const queue = new PQueue({ concurrency: 25 });

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

// Función para intentar reparar JSON (menos estricta)
function tryFixJSON(rawData, category, id) {
  let fixedData = rawData.trim();

  // 1. Si está vacío o es solo "{}" o "[]", ignorar
  if (!fixedData || fixedData === '{}' || fixedData === '[]') {
    failedFiles[category].push({ id, error: 'Archivo vacío o sin datos útiles' });
    return null;
  }

  // 2. Si es "null" o "undefined", ignorar
  if (fixedData === 'null' || fixedData === 'undefined') {
    failedFiles[category].push({ id, error: 'Datos no válidos: null o undefined' });
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
    // Aceptar cualquier dato, incluso si no es un objeto (lo convertimos a objeto)
    if (parsedData === null || parsedData === undefined) {
      failedFiles[category].push({ id, error: 'Datos no válidos después de reparación: null o undefined' });
      return null;
    }
    return typeof parsedData === 'object' ? parsedData : { value: parsedData };
  } catch (err) {
    failedFiles[category].push({ id, error: `No se pudo reparar: ${err.message}` });
    return null;
  }
}

// Paso 1: Convertir a JSON único con reparación y manejo de duplicados
const oldDbPath = path.join(__dirname, 'databaseAnter');
const oldPaths = {
  users: path.join(oldDbPath, 'users'),
  chats: path.join(oldDbPath, 'chats'),
  settings: path.join(oldDbPath, 'settings'),
};

async function convertToSingleJSON() {
  console.log('Paso 1: Convirtiendo archivos a JSON único con reparación...');
  for (const [category, dir] of Object.entries(oldPaths)) {
    if (!fs.existsSync(dir)) {
      console.log(`No se encontró el directorio ${dir}, saltando categoría ${category}`);
      continue;
    }
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    console.log(`Encontrados ${files.length} archivos en ${category}`);

    const data = {};
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
          data[id] = parsedData;
          totalProcessed++;
          if (totalProcessed % 10000 === 0) console.log(`Progreso: ${totalProcessed}/${files.length} archivos procesados`);
        }
      } catch (err) {
        console.error(`Error leyendo ${category}/${id}:`, err.message);
        failedFiles[category].push({ id, error: err.message });
      }
    }

    // Guardar en un solo archivo JSON
    const outputFile = path.join(tempPath, `temp_${category}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log(`Datos de ${category} guardados en ${outputFile} (${totalProcessed} registros válidos)`);
  }
}

// Paso 2: Cargar JSON único en NeDB con upsert y reintentos
async function loadJSONToNeDB() {
  console.log('Paso 2: Cargando JSON único a NeDB...');
  for (const category of Object.keys(collections)) {
    const jsonFile = path.join(tempPath, `temp_${category}.json`);
    if (!fs.existsSync(jsonFile)) {
      console.log(`No se encontró el archivo ${jsonFile}, saltando categoría ${category}`);
      continue;
    }

    console.log(`Cargando datos de ${category} desde ${jsonFile}...`);
    const rawData = fs.readFileSync(jsonFile, 'utf8');
    let data;
    try {
      data = JSON.parse(rawData);
    } catch (err) {
      console.error(`Error parseando ${jsonFile}:`, err.message);
      continue;
    }

    const entries = Object.entries(data);
    console.log(`Insertando ${entries.length} registros en ${category}...`);

    const batchSize = 5000; // Insertar en lotes de 5000 para no saturar NeDB
    for (let i = 0; i < entries.length; i += batchSize) {
      const batch = entries.slice(i, i + batchSize);
      const docs = batch.map(([id, value]) => ({
        _id: sanitizeId(id),
        data: sanitizeObject(value),
      }));

      // Usar update con upsert y reintentos
      const updatePromises = docs.map(doc => queue.add(async () => {
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
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
            return; // Éxito, salimos
          } catch (err) {
            console.error(`Intento ${attempt} fallido para ${category}/${doc._id}:`, err.message);
            if (attempt === 3) throw err;
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }));

      await Promise.all(updatePromises);

      console.log(`Progreso: ${Math.min(i + batchSize, entries.length)}/${entries.length} registros insertados en ${category}`);
    }

    // Compactar después de cargar
    await new Promise((resolve) => {
      collections[category].persistence.compactDatafile();
      collections[category].on('compaction.done', resolve);
    });
    console.log(`Compactación de ${category} completada`);
  }
}

// Ejecutar todo en orden
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

    // Paso 1: Convertir a JSON único con reparación
    await convertToSingleJSON();

    // Paso 2: Cargar JSON único en NeDB
    await loadJSONToNeDB();

    // Mostrar archivos fallidos
    console.log('Archivos que fallaron durante la migración:');
    console.log(JSON.stringify(failedFiles, null, 2));

    // Limpiar archivos temporales
    console.log('Limpiando archivos temporales...');
    fs.rmSync(tempPath, { recursive: true, force: true });

    console.log('Migración completada');
  } catch (err) {
    console.error('Error durante la migración:', err);
  }
}

migrate();
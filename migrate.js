import path from 'path';
import fs from 'fs';
import Datastore from '@seald-io/nedb';
import PQueue from 'p-queue';
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

const queue = new PQueue({ concurrency: 50 }); // Subimos a 50 para más velocidad

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

// Escribir datos a NeDB con reintentos
async function writeToNeDB(category, id, data, retries = 3) {
  const sanitizedId = sanitizeId(id);
  const sanitizedData = sanitizeObject(data);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await new Promise((resolve, reject) => {
        collections[category].update(
          { _id: sanitizedId },
          { $set: { data: sanitizedData } },
          { upsert: true, multi: false },
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
      return; // Éxito, salimos
    } catch (err) {
      console.error(`Intento ${attempt} fallido para ${category}/${id}:`, err.message);
      if (attempt === retries) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Migración solo para users, chats y settings
const oldDbPath = path.join(__dirname, 'databaseAnter');
const oldPaths = {
  users: path.join(oldDbPath, 'users'),
  chats: path.join(oldDbPath, 'chats'),
  settings: path.join(oldDbPath, 'settings'),
};

async function migrateLowDBToNeDB() {
  console.log('Iniciando migración de LowDB a NeDB (solo users, chats, settings)...');
  for (const [category, dir] of Object.entries(oldPaths)) {
    if (!fs.existsSync(dir)) {
      console.log(`No se encontró el directorio ${dir}, saltando categoría ${category}`);
      continue;
    }
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    console.log(`Encontrados ${files.length} archivos en ${category}`);

    const batchSize = 10000; // 10.000 para velocidad
    let totalProcessed = 0;

    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      console.log(`Procesando lote ${i / batchSize + 1}: ${i} a ${Math.min(i + batchSize, files.length)}`);
      
      const migrationPromises = batch.map(file => {
        const id = path.basename(file, '.json');
        if (category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) return Promise.resolve();
        if (category === 'chats' && id.includes('@newsletter')) return Promise.resolve();
        const filePath = path.join(dir, file);
        return new Promise((resolve) => {
          try {
            const rawData = fs.readFileSync(filePath, 'utf8');
            let data;
            try {
              data = JSON.parse(rawData);
              // Ignorar si data es undefined, null o no es un objeto
              if (!data || typeof data !== 'object') {
                console.error(`Datos no válidos en ${category}/${id}: no es un objeto`);
                failedFiles[category].push({ id, error: 'Datos no válidos: no es un objeto' });
                return resolve();
              }
            } catch (parseErr) {
              console.error(`Error parseando JSON en ${category}/${id}:`, parseErr.message);
              failedFiles[category].push({ id, error: parseErr.message });
              return resolve();
            }
            queue.add(() => writeToNeDB(category, id, data)).then(() => {
              totalProcessed++;
              if (totalProcessed % 10000 === 0) console.log(`Progreso: ${totalProcessed}/${files.length} archivos migrados`);
              resolve();
            }).catch(err => {
              console.error(`Error migrando ${category}/${id}:`, err.message);
              failedFiles[category].push({ id, error: err.message });
              resolve();
            });
          } catch (err) {
            console.error(`Error leyendo ${category}/${id}:`, err.message);
            failedFiles[category].push({ id, error: err.message });
            resolve();
          }
        });
      });

      await Promise.all(migrationPromises);
      console.log(`Lote de ${batch.length} archivos procesado en ${category}`);
      
      // Compactar después de cada lote para reducir el tamaño del archivo .db
      await new Promise((resolve) => {
        collections[category].persistence.compactDatafile();
        collections[category].on('compaction.done', resolve);
      });
      console.log(`Compactación de ${category} completada después del lote`);
    }
  }

  // Compactar todo al final
  console.log('Compactando todas las categorías...');
  await Promise.all(Object.values(collections).map(db => new Promise((resolve) => {
    db.persistence.compactDatafile();
    db.on('compaction.done', resolve);
  })));
  console.log('Compactación final completada');

  // Mostrar archivos fallidos
  console.log('Archivos que fallaron durante la migración:');
  console.log(JSON.stringify(failedFiles, null, 2));

  console.log('Migración completada');
}

// Ejecutar todo en orden
async function initializeAndMigrate() {
  try {
    // Asegurarse de que los archivos .db tengan permisos
    for (const category of Object.keys(collections)) {
      const dbFile = path.join(dbPath, `${category}.db`);
      if (fs.existsSync(dbFile)) {
        fs.chmodSync(dbFile, '666'); // Permisos de lectura/escritura
      }
    }
    console.log('Base de datos lista');
    await migrateLowDBToNeDB();
    console.log('Proceso terminado');
  } catch (err) {
    console.error('Error inicial:', err);
  }
}

initializeAndMigrate();
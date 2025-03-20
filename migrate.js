import path from 'path';
import fs from 'fs';
import Datastore from '@seald-io/nedb';
import PQueue from 'p-queue';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database'); // NeDB guardará aquí
if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath);

// Crear las colecciones de NeDB
const collections = {
  users: new Datastore({ filename: path.join(dbPath, 'users.db'), autoload: true }),
  chats: new Datastore({ filename: path.join(dbPath, 'chats.db'), autoload: true }),
  settings: new Datastore({ filename: path.join(dbPath, 'settings.db'), autoload: true }),
  msgs: new Datastore({ filename: path.join(dbPath, 'msgs.db'), autoload: true }),
  sticker: new Datastore({ filename: path.join(dbPath, 'sticker.db'), autoload: true }),
  stats: new Datastore({ filename: path.join(dbPath, 'stats.db'), autoload: true }),
};

// Configurar compactación automática para estabilidad
Object.values(collections).forEach(db => {
  db.persistence.setAutocompactionInterval(60000);
});

const queue = new PQueue({ concurrency: 5 });

// Inicializar global.db.data
global.db = {
  data: {
    users: {},
    chats: {},
    settings: {},
    msgs: {},
    sticker: {},
    stats: {},
  },
};

// Funciones de sanitización
function sanitizeId(id) {
  return id.replace(/\./g, '_');
}

function unsanitizeId(id) {
  return id.replace(/_/g, '.');
}

function sanitizeObject(obj) {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    const sanitizedKey = key.replace(/\./g, '_');
    sanitized[sanitizedKey] = (typeof value === 'object' && value !== null) ? sanitizeObject(value) : value;
  }
  return sanitized;
}

function unsanitizeObject(obj) {
  const unsanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    const unsanitizedKey = key.replace(/_/g, '.');
    unsanitized[unsanitizedKey] = (typeof value === 'object' && value !== null) ? unsanitizeObject(value) : value;
  }
  return unsanitized;
}

// Leer datos desde NeDB
async function readFromNeDB(category, id) {
  const sanitizedId = sanitizeId(id);
  return new Promise((resolve, reject) => {
    collections[category].findOne({ _id: sanitizedId }, (err, doc) => {
      if (err) return reject(err);
      resolve(doc ? unsanitizeObject(doc.data) : {});
    });
  });
}

// Escribir datos a NeDB
async function writeToNeDB(category, id, data) {
  const sanitizedId = sanitizeId(id);
  const sanitizedData = sanitizeObject(data);
  return new Promise((resolve, reject) => {
    collections[category].update(
      { _id: sanitizedId },
      { $set: { data: sanitizedData } },
      { upsert: true, multi: false },
      (err) => {
        if (err) return reject(err);
        collections[category].persistence.compactDatafile();
        resolve();
      }
    );
  });
}

// Funciones públicas
global.db.readData = async function (category, id) {
  const originalId = id;
  if (!global.db.data[category][originalId]) {
    const data = await queue.add(() => readFromNeDB(category, originalId));
    global.db.data[category][originalId] = data;
  }
  return global.db.data[category][originalId];
};

global.db.writeData = async function (category, id, data) {
  const originalId = id;
  global.db.data[category][originalId] = { ...global.db.data[category][originalId], ...data };
  await queue.add(() => writeToNeDB(category, originalId, global.db.data[category][originalId]));
};

global.db.loadDatabase = async function () {
  const loadPromises = Object.keys(collections).map(async (category) => {
    const docs = await new Promise((resolve, reject) => {
      collections[category].find({}, (err, docs) => {
        if (err) return reject(err);
        resolve(docs);
      });
    });
    const seenIds = new Set();
    for (const doc of docs) {
      const originalId = unsanitizeId(doc._id);
      if (seenIds.has(originalId)) {
        await new Promise((res, rej) => {
          collections[category].remove({ _id: doc._id }, {}, (err) => {
            if (err) rej(err);
            else {
              collections[category].persistence.compactDatafile();
              res();
            }
          });
        });
      } else {
        seenIds.add(originalId);
        if (category === 'users' && (originalId.includes('@newsletter') || originalId.includes('lid'))) continue;
        if (category === 'chats' && originalId.includes('@newsletter')) continue;
        global.db.data[category][originalId] = unsanitizeObject(doc.data);
      }
    }
  });
  await Promise.all(loadPromises);
  console.log('Base de datos NeDB cargada en memoria');
};

global.db.save = async function () {
  const savePromises = [];
  for (const category of Object.keys(global.db.data)) {
    for (const [id, data] of Object.entries(global.db.data[category])) {
      if (Object.keys(data).length > 0) {
        if (category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) continue;
        if (category === 'chats' && id.includes('@newsletter')) continue;
        savePromises.push(queue.add(() => writeToNeDB(category, id, data)));
      }
    }
  }
  await Promise.all(savePromises);
  console.log('Datos guardados en NeDB exitosamente.');
};

// Migración deWHEREAS LowDB a NeDB (carpeta renombrada a databaseAnter)
const oldDbPath = path.join(__dirname, 'databaseAnter'); // Datos antiguos aquí
const oldPaths = {
  users: path.join(oldDbPath, 'users'),
  chats: path.join(oldDbPath, 'chats'),
  settings: path.join(oldDbPath, 'settings'),
  msgs: path.join(oldDbPath, 'msgs'),
  sticker: path.join(oldDbPath, 'sticker'),
  stats: path.join(oldDbPath, 'stats'),
};

async function migrateLowDBToNeDB() {
  console.log('Iniciando migración de LowDB a NeDB...');
  for (const [category, dir] of Object.entries(oldPaths)) {
    if (!fs.existsSync(dir)) {
      console.log(`No se encontró el directorio ${dir}, saltando categoría ${category}`);
      continue;
    }
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    console.log(`Encontrados ${files.length} archivos en ${category}`);
    for (const file of files) {
      const id = path.basename(file, '.json');
      if (category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) {
        console.log(`Ignorando ${category}/${id}`);
        continue;
      }
      if (category === 'chats' && id.includes('@newsletter')) {
        console.log(`Ignorando ${category}/${id}`);
        continue;
      }
      try {
        const filePath = path.join(dir, file);
        const rawData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(rawData);
        await global.db.writeData(category, id, data);
        console.log(`Migrado ${category}/${id} exitosamente`);
      } catch (err) {
        console.error(`Error migrando ${category}/${id}:`, err);
      }
    }
  }
  console.log('Migración completada');
}

// Ejecutar todo en orden
async function initializeAndMigrate() {
  try {
    await global.db.loadDatabase(); // Primero carga la base de datos
    console.log('Base de datos lista');
    await migrateLowDBToNeDB(); // Luego migra los datos
    console.log('Proceso terminado');
  } catch (err) {
    console.error('Error inicial:', err);
  }
}

initializeAndMigrate();

// Guardado periódico
setInterval(() => {
  global.db.save().catch(err => console.error('Error en guardado periódico:', err));
}, 30000);

async function gracefulShutdown() {
  await global.db.save();
  console.log('Base de datos guardada antes de cerrar');
  process.exit(0);
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
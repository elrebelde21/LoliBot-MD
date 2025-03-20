import fs from 'fs';
import path from 'path';
import Datastore from 'nedb';
import { Low, JSONFile } from 'lowdb';
import PQueue from 'p-queue';

// Directorios de LowDB
const lowdbDir = path.join(__dirname, 'database');
const paths = {
  users: path.join(lowdbDir, 'users'),
  chats: path.join(lowdbDir, 'chats'),
  settings: path.join(lowdbDir, 'settings'),
  msgs: path.join(lowdbDir, 'msgs'),
  sticker: path.join(lowdbDir, 'sticker'),
  stats: path.join(lowdbDir, 'stats'),
};

// Configuración de NeDB (usando un directorio distinto para los archivos de NeDB)
const nedbDir = path.join(__dirname, 'nedb');
if (!fs.existsSync(nedbDir)) fs.mkdirSync(nedbDir);

const collections = {
  users: new Datastore({ filename: path.join(nedbDir, 'users.db'), autoload: true }),
  chats: new Datastore({ filename: path.join(nedbDir, 'chats.db'), autoload: true }),
  settings: new Datastore({ filename: path.join(nedbDir, 'settings.db'), autoload: true }),
  msgs: new Datastore({ filename: path.join(nedbDir, 'msgs.db'), autoload: true }),
  sticker: new Datastore({ filename: path.join(nedbDir, 'sticker.db'), autoload: true }),
  stats: new Datastore({ filename: path.join(nedbDir, 'stats.db'), autoload: true }),
};

Object.values(collections).forEach(db => {
  db.persistence.setAutocompactionInterval(60000);
});

const queue = new PQueue({ concurrency: 5 });

// Funciones de sanitización para claves y _id
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

function unsanitizeObject(obj) {
  const unsanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    const unsanitizedKey = key.replace(/_/g, '.');
    unsanitized[unsanitizedKey] = (typeof value === 'object' && value !== null) ? unsanitizeObject(value) : value;
  }
  return unsanitized;
}

// Función para escribir en NeDB
async function writeToNeDB(category, id, data) {
  const sanitizedId = sanitizeId(id);
  const sanitizedData = sanitizeObject(data);
  return new Promise((resolve, reject) => {
    collections[category].update(
      { _id: sanitizedId },
      { $set: { data: sanitizedData } },
      { upsert: true, multi: false },
      (err) => {
        if (err) {
          console.error(`Error escribiendo ${category}/${id}:`, err);
          return reject(err);
        }
        collections[category].persistence.compactDatafile();
        resolve();
      }
    );
  });
}

// Función para leer un archivo de LowDB
async function readLowDBFile(category, id) {
  const filePath = path.join(paths[category], `${id}.json`);
  const adapter = new JSONFile(filePath);
  const db = new Low(adapter);
  await db.read();
  return db.data || {};
}

// Función principal de migración
async function migrateLowDBtoNeDB() {
  const categories = ['users', 'chats', 'settings', 'msgs', 'sticker', 'stats'];

  for (const category of categories) {
    if (!fs.existsSync(paths[category])) {
      console.warn(`Directorio para ${category} no existe, se omite.`);
      continue;
    }
    const files = fs.readdirSync(paths[category]);
    for (const file of files) {
      const id = path.basename(file, '.json');

      // Aplicar filtros según las reglas definidas
      if ((category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) ||
          (category === 'chats' && id.includes('@newsletter'))) {
        continue;
      }

      try {
        const data = await queue.add(() => readLowDBFile(category, id));
        await queue.add(() => writeToNeDB(category, id, data));
        console.log(`Migrado: ${category}/${id}`);
      } catch (err) {
        console.error(`Error migrando ${category}/${id}:`, err);
      }
    }
  }
  console.log('Migración completada');
}

migrateLowDBtoNeDB().catch(err => {
  console.error('Error en la migración:', err);
});

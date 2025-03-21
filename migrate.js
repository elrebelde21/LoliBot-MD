import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {Low, JSONFile} from 'lowdb'
import Datastore from '@seald-io/nedb';
import PQueue from 'p-queue';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURACIÓN LOWDB
// Carpeta de LowDB (datos antiguos)
const lowdbBase = path.join(__dirname, 'databaseAnter');

// Definir las carpetas por categoría en LowDB
const lowdbCategories = {
  users: path.join(lowdbBase, 'users'),
  chats: path.join(lowdbBase, 'chats'),
  settings: path.join(lowdbBase, 'settings'),
  msgs: path.join(lowdbBase, 'msgs'),
  sticker: path.join(lowdbBase, 'sticker'),
  stats: path.join(lowdbBase, 'stats'),
};

// Verificar que existan las carpetas de LowDB (opcional)
Object.values(lowdbCategories).forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.warn(`La carpeta ${dir} no existe.`);
  }
});

// CONFIGURACIÓN NeDB
// Carpeta de destino para NeDB (datos nuevos)
const nedbBase = path.join(__dirname, 'database');
if (!fs.existsSync(nedbBase)) fs.mkdirSync(nedbBase);

const collections = {
  users: new Datastore({ filename: path.join(nedbBase, 'users.db'), autoload: true }),
  chats: new Datastore({ filename: path.join(nedbBase, 'chats.db'), autoload: true }),
  settings: new Datastore({ filename: path.join(nedbBase, 'settings.db'), autoload: true }),
  msgs: new Datastore({ filename: path.join(nedbBase, 'msgs.db'), autoload: true }),
  sticker: new Datastore({ filename: path.join(nedbBase, 'sticker.db'), autoload: true }),
  stats: new Datastore({ filename: path.join(nedbBase, 'stats.db'), autoload: true }),
};

Object.values(collections).forEach(db =>
  db.persistence.setAutocompactionInterval(60000)
);

// Cola para controlar concurrencia
const queue = new PQueue({ concurrency: 5 });

// Funciones para sanitizar IDs (NeDB no permite puntos en _id)
const sanitizeId = id => id.replace(/\./g, '_');
const unsanitizeId = id => id.replace(/_/g, '.');

// Sanitizar objetos (para claves anidadas)
const sanitizeObject = obj => {
  if (typeof obj !== 'object' || obj === null) return obj;
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitized[sanitizeId(key)] =
      typeof value === 'object' && value !== null ? sanitizeObject(value) : value;
  }
  return sanitized;
};

const unsanitizeObject = obj => {
  if (typeof obj !== 'object' || obj === null) return obj;
  const unsanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    unsanitized[unsanitizeId(key)] =
      typeof value === 'object' && value !== null ? unsanitizeObject(value) : value;
  }
  return unsanitized;
};

// -------------------------
// Funciones para LowDB
// -------------------------

// Devuelve la ruta del archivo JSON de LowDB para una categoría e id
function getLowDBFilePath(category, id) {
  return path.join(lowdbCategories[category], `${id}.json`);
}

// Lee el archivo de LowDB y devuelve sus datos
async function readLowDBFile(category, id) {
  const filePath = getLowDBFilePath(category, id);
  const adapter = new JSONFile(filePath);
  const db = new Low(adapter);
  await db.read();
  db.data = db.data || {};
  return db.data;
}

// -------------------------
// Funciones para NeDB
// -------------------------

// Inserta o actualiza en NeDB los datos de una categoría e id
async function writeToNeDB(category, id, data) {
  const sanitizedId = sanitizeId(id);
  const sanitizedData = sanitizeObject(data);
  return new Promise((resolve, reject) => {
    collections[category].update(
      { _id: sanitizedId },
      { $set: { data: sanitizedData } },
      { upsert: true, multi: false },
      err => {
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

// -------------------------
// Script de Migración
// -------------------------

async function migrate() {
  const categories = Object.keys(lowdbCategories); // ['users', 'chats', ...]
  let totalMigrated = 0;

  for (const category of categories) {
    // Obtener todos los archivos JSON en la carpeta de la categoría
    if (!fs.existsSync(lowdbCategories[category])) {
      console.warn(`La carpeta ${lowdbCategories[category]} no existe. Se omite ${category}.`);
      continue;
    }
    const files = fs.readdirSync(lowdbCategories[category]);

    for (const file of files) {
      // Asumimos que el archivo es del tipo id.json
      const id = path.basename(file, '.json');

      // Filtros según tus reglas: saltar ciertos registros
      if (category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) continue;
      if (category === 'chats' && id.includes('@newsletter')) continue;

      try {
        // Leer datos desde LowDB
        const data = await queue.add(() => readLowDBFile(category, id));
        // Escribir datos en NeDB
        await queue.add(() => writeToNeDB(category, id, data));
        console.log(`Migrado: ${category}/${id}`);
        totalMigrated++;
      } catch (err) {
        console.error(`Error migrando ${category}/${id}:`, err);
      }
    }
  }

  console.log(`Migración completada. Total migrados: ${totalMigrated}`);
  process.exit(0);
}

// Ejecutar la migración
migrate().catch(err => {
  console.error('Error durante la migración:', err);
  process.exit(1);
});

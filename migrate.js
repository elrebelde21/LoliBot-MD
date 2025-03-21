import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Datastore from '@seald-io/nedb';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir rutas de las bases de datos
const lowdbPath = path.join(__dirname, 'databaseAnter'); // Carpeta donde está LowDB
const nedbPath = path.join(__dirname, 'database'); // Carpeta donde guardaremos NeDB

// Asegurar que la carpeta de NeDB exista
if (!fs.existsSync(nedbPath)) fs.mkdirSync(nedbPath);

// Archivos de LowDB
const lowdbFiles = {
  users: path.join(lowdbPath, 'users.json'),
  chats: path.join(lowdbPath, 'chats.json'),
  settings: path.join(lowdbPath, 'settings.json'),
  msgs: path.join(lowdbPath, 'msgs.json'),
  sticker: path.join(lowdbPath, 'sticker.json'),
  stats: path.join(lowdbPath, 'stats.json'),
};

// Crear instancias de NeDB
const collections = {
  users: new Datastore({ filename: path.join(nedbPath, 'users.db'), autoload: true }),
  chats: new Datastore({ filename: path.join(nedbPath, 'chats.db'), autoload: true }),
  settings: new Datastore({ filename: path.join(nedbPath, 'settings.db'), autoload: true }),
  msgs: new Datastore({ filename: path.join(nedbPath, 'msgs.db'), autoload: true }),
  sticker: new Datastore({ filename: path.join(nedbPath, 'sticker.db'), autoload: true }),
  stats: new Datastore({ filename: path.join(nedbPath, 'stats.db'), autoload: true }),
};

// Función para migrar datos de LowDB a NeDB
const migrateData = async () => {
  for (const [key, filePath] of Object.entries(lowdbFiles)) {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Archivo no encontrado: ${filePath}, saltando...`);
      continue;
    }

    console.log(`🔄 Migrando ${key}...`);

    // Cargar LowDB
    const adapter = new JSONFile(filePath);
    const db = new Low(adapter);
    await db.read();

    // Transformar datos
    const records = Object.entries(db.data).map(([id, data]) => ({
      _id: id.replace(/\./g, '_'), // Reemplaza puntos para evitar conflictos en NeDB
      data,
    }));

    // Insertar en NeDB
    if (records.length > 0) {
      await new Promise((resolve, reject) => {
        collections[key].insert(records, err => {
          if (err) {
            console.error(`❌ Error migrando ${key}:`, err);
            reject(err);
          } else {
            console.log(`✅ ${key} migrado correctamente (${records.length} registros)`);
            resolve();
          }
        });
      });
    } else {
      console.log(`⚠️ No hay datos para migrar en ${key}`);
    }
  }

  console.log('🎉 Migración completada con éxito.');
  process.exit(0);
};

// Ejecutar migración
migrateData().catch(err => {
  console.error('❌ Error en la migración:', err);
  process.exit(1);
});

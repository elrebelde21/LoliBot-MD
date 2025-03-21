import fs from 'fs';
import path from 'path';
import { Low, JSONFile } from 'lowdb';
import initSqlJs from 'sql.js';
import PQueue from 'p-queue';

// Configuración de rutas
const databaseAnterPath = path.join(process.cwd(), 'databaseAnter'); // Carpeta de la base de datos anterior
const databasePath = path.join(process.cwd(), 'database'); // Carpeta de la nueva base de datos

// Rutas de las categorías importantes en la base de datos anterior
const paths = {
    users: path.join(databaseAnterPath, 'users'),
    chats: path.join(databaseAnterPath, 'chats'),
    settings: path.join(databaseAnterPath, 'settings'),
};

// Configuración de SQL.js
const wasmPath = path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
const SQL = await initSqlJs({
    locateFile: () => wasmPath,
});

const categories = ['users', 'chats', 'settings']; // Solo estas categorías se migrarán
const databases = {};

// Inicializar bases de datos SQL.js
async function initializeDatabases() {
    console.log('Inicializando bases de datos SQL.js...');
    if (!fs.existsSync(databasePath)) {
        fs.mkdirSync(databasePath); // Crear la carpeta "database" si no existe
    }

    for (const category of categories) {
        const dbFile = path.join(databasePath, `${category}.db`);
        let db;
        try {
            const fileBuffer = fs.readFileSync(dbFile);
            db = new SQL.Database(fileBuffer);
            console.log(`Base de datos "${category}" cargada desde ${dbFile}`);
        } catch (e) {
            db = new SQL.Database();
            console.log(`Nueva base de datos "${category}" creada.`);
        }
        databases[category] = db;

        db.run(`
            CREATE TABLE IF NOT EXISTS data (
                id TEXT PRIMARY KEY,
                data TEXT
            )
        `);
        saveDatabase(category);
    }
    console.log('Bases de datos SQL.js inicializadas.');
}

// Guardar una base de datos SQL.js en disco
function saveDatabase(category) {
    const data = databases[category].export();
    fs.writeFileSync(path.join(databasePath, `${category}.db`), Buffer.from(data));
    console.log(`Base de datos "${category}" guardada.`);
}

// Leer datos de LowDB
async function readLowDBData(category, id) {
    const filePath = path.join(paths[category], `${id}.json`);
    const db = new Low(new JSONFile(filePath));
    await db.read();
    return db.data || {};
}

// Escribir datos en SQL.js
async function writeSQLData(category, id, data) {
    const db = databases[category];
    const stmt = db.prepare(`
        INSERT INTO data (id, data) 
        VALUES (?, ?) 
        ON CONFLICT(id) DO UPDATE SET data = ?
    `);
    stmt.run([id, JSON.stringify(data), JSON.stringify(data)]);
    stmt.free();
    saveDatabase(category);
}

// Migrar datos de LowDB a SQL.js
async function migrateData() {
    console.log('Iniciando migración de datos...');
    await initializeDatabases();
    const queue = new PQueue({ concurrency: 5 });

    for (const category of categories) {
        console.log(`Procesando categoría: ${category}...`);
        if (!fs.existsSync(paths[category])) {
            console.log(`La carpeta ${paths[category]} no existe. Saltando...`);
            continue;
        }

        const files = fs.readdirSync(paths[category]);
        console.log(`Encontrados ${files.length} archivos en ${category}.`);

        for (const file of files) {
            const id = path.basename(file, '.json');
            if (category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) continue;
            if (category === 'chats' && id.includes('@newsletter')) continue;

            await queue.add(async () => {
                try {
                    console.log(`Migrando: ${category}/${id}...`);
                    const data = await readLowDBData(category, id);
                    await writeSQLData(category, id, data);
                    console.log(`Migrado con éxito: ${category}/${id}`);
                } catch (error) {
                    console.error(`Error migrando ${category}/${id}:`, error);
                }
            });
        }
    }

    console.log('Migración completada.');
}

// Ejecutar la migración
migrateData()
    .then(() => {
        console.log('¡Migración finalizada con éxito!');
    })
    .catch((error) => {
        console.error('Error durante la migración:', error);
    });
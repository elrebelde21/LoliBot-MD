import fs from 'fs/promises';
import path from 'path';
import { Low, JSONFile } from 'lowdb';
import initSqlJs from 'sql.js';
import PQueue from 'p-queue';

// Configuración de rutas
const databaseAnterPath = path.join(process.cwd(), 'databaseAnter'); // Base de datos anterior
const databasePath = path.join(process.cwd(), 'database'); // Nueva base de datos

const paths = {
    users: path.join(databaseAnterPath, 'users'),
    chats: path.join(databaseAnterPath, 'chats'),
    settings: path.join(databaseAnterPath, 'settings'),
};

const categories = Object.keys(paths);
const databases = {};

// Configuración de SQL.js
const wasmPath = path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
const SQL = await initSqlJs({ locateFile: () => wasmPath });

// Crear carpeta de la nueva base de datos si no existe
async function ensureDatabaseFolder() {
    try {
        await fs.access(databasePath);
    } catch {
        await fs.mkdir(databasePath);
    }
}

// Inicializar bases de datos SQL.js
async function initializeDatabases() {
    console.log('Inicializando bases de datos SQL.js...');
    for (const category of categories) {
        const dbFile = path.join(databasePath, `${category}.db`);
        let db;
        try {
            const fileBuffer = await fs.readFile(dbFile).catch(() => null);
            db = fileBuffer ? new SQL.Database(fileBuffer) : new SQL.Database();
            console.log(`Base de datos "${category}" cargada.`);
        } catch {
            db = new SQL.Database();
            console.log(`Nueva base de datos "${category}" creada.`);
        }
        databases[category] = db;
        db.run(`CREATE TABLE IF NOT EXISTS data (id TEXT PRIMARY KEY, data TEXT)`);
    }
    console.log('Bases de datos listas.');
}

// Guardar todas las bases de datos
async function saveAllDatabases() {
    for (const category of categories) {
        const data = databases[category].export();
        await fs.writeFile(path.join(databasePath, `${category}.db`), Buffer.from(data));
        console.log(`Base de datos "${category}" guardada.`);
    }
}

// Leer y reparar JSON de LowDB
async function readLowDBData(category, id) {
    const filePath = path.join(paths[category], `${id}.json`);
    try {
        let content = (await fs.readFile(filePath, 'utf-8')).trim();
        if (!content) return null; // Si está vacío, lo ignoramos

        return JSON.parse(content); // Si es válido, lo retornamos
    } catch (error) {
        console.warn(`JSON corrupto en "${filePath}", intentando reparar...`);
        try {
            const content = (await fs.readFile(filePath, 'utf-8')).replace(/[\x00-\x1F\x7F]/g, ''); 
            return JSON.parse(content);
        } catch {
            console.error(`No se pudo reparar "${filePath}", ignorando...`);
            return null;
        }
    }
}

// Insertar datos en SQL.js usando transacciones
function writeSQLData(category, batch) {
    const db = databases[category];
    db.run('BEGIN TRANSACTION');
    const stmt = db.prepare(`INSERT INTO data (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data = ?`);
    for (const { id, data } of batch) {
        stmt.run([id, JSON.stringify(data), JSON.stringify(data)]);
    }
    stmt.free();
    db.run('COMMIT');
}

// Migrar datos de LowDB a SQL.js con procesamiento en lotes
async function migrateData() {
    console.log('Iniciando migración...');
    await ensureDatabaseFolder();
    await initializeDatabases();
    const queue = new PQueue({ concurrency: 100 });

    for (const category of categories) {
        try {
            const files = (await fs.readdir(paths[category])).filter(f => f.endsWith('.json'));
            console.log(`Migrando ${files.length} archivos de "${category}"...`);
            
            const batchSize = 10000;
            for (let i = 0; i < files.length; i += batchSize) {
                const batch = files.slice(i, i + batchSize);
                await queue.add(async () => {
                    const dataBatch = [];
                    for (const file of batch) {
                        const id = file.replace('.json', '');
                        if ((category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) ||
                            (category === 'chats' && id.includes('@newsletter'))) continue;

                        const data = await readLowDBData(category, id);
                        if (data) dataBatch.push({ id, data });
                    }
                    if (dataBatch.length) writeSQLData(category, dataBatch);
                });
            }
        } catch (error) {
            console.error(`Error en la migración de "${category}":`, error);
        }
    }

    await queue.onIdle();
    await saveAllDatabases();
    console.log('Migración completada.');
}

// Ejecutar la migración
migrateData().catch(err => console.error('Error en la migración:', err));

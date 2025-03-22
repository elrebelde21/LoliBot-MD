import fs from 'fs';
import path from 'path';
import { Low, JSONFile } from 'lowdb';
import initSqlJs from 'sql.js';

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
if (!fs.existsSync(databasePath)) fs.mkdirSync(databasePath);

async function initializeDatabases() {
    console.log('Inicializando bases de datos SQL.js...');
    for (const category of categories) {
        const dbFile = path.join(databasePath, `${category}.db`);
        let db;
        try {
            const fileBuffer = fs.existsSync(dbFile) ? fs.readFileSync(dbFile) : null;
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

// Guardar todas las bases de datos al finalizar
function saveAllDatabases() {
    for (const category of categories) {
        const data = databases[category].export();
        fs.writeFileSync(path.join(databasePath, `${category}.db`), Buffer.from(data));
        console.log(`Base de datos "${category}" guardada.`);
    }
}

// Leer datos de LowDB
async function readLowDBData(category, id) {
    const filePath = path.join(paths[category], `${id}.json`);
    if (!fs.existsSync(filePath)) return null;

    try {
        const db = new Low(new JSONFile(filePath));
        await db.read();
        return db.data || null;
    } catch {
        console.warn(`Archivo corrupto o inválido ignorado: ${filePath}`);
        return null;
    }
}

// Insertar datos en SQL.js usando transacciones para rapidez
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

// Migrar datos de LowDB a SQL.js en lotes de 5000
async function migrateData() {
    console.log('Iniciando migración...');
    await initializeDatabases();

    for (const category of categories) {
        if (!fs.existsSync(paths[category])) continue;
        const files = fs.readdirSync(paths[category]).filter(f => f.endsWith('.json'));

        console.log(`Migrando ${files.length} archivos de "${category}"...`);
        const batchSize = 5000;

        for (let i = 0; i < files.length; i += batchSize) {
            const batch = files.slice(i, i + batchSize);
            const dataBatch = [];

            for (const file of batch) {
                const id = file.replace('.json', '');
                if ((category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) ||
                    (category === 'chats' && id.includes('@newsletter'))) continue;

                const data = await readLowDBData(category, id);
                if (data) dataBatch.push({ id, data });
            }

            if (dataBatch.length) writeSQLData(category, dataBatch);
        }
    }

    saveAllDatabases();
    console.log('Migración completada.');
}

// Ejecutar la migración
migrateData().catch(err => console.error('Error en la migración:', err));

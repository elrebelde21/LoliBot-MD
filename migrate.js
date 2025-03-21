import { join, dirname } from 'path';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import initSqlJs from 'sql.js';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar sql.js
const wasmPath = join(__dirname, 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
if (!existsSync(wasmPath)) {
    console.error('Error: sql-wasm.wasm no encontrado en:', wasmPath);
    process.exit(1);
}

const SQL = await initSqlJs({
    locateFile: () => wasmPath
});

const databasePath = join(__dirname, 'database');
const oldDatabasePath = join(__dirname, 'databaseAnter');
if (!existsSync(databasePath)) mkdirSync(databasePath);

// Categorías a migrar
const categories = ['users', 'chats', 'settings'];
const oldPaths = {
    users: join(oldDatabasePath, 'users'),
    chats: join(oldDatabasePath, 'chats'),
    settings: join(oldDatabasePath, 'settings'),
};

async function migrateToSqlJs() {
    for (const category of categories) {
        const oldDir = oldPaths[category];
        const dbFile = join(databasePath, `${category}.db`);
        let db;

        // Crear nueva base de datos para la categoría
        db = new SQL.Database();

        // Crear la tabla
        db.run(`
            CREATE TABLE IF NOT EXISTS data (
                id TEXT PRIMARY KEY,
                data TEXT
            )
        `);

        // Leer y migrar los archivos JSON de databaseAnter
        if (existsSync(oldDir)) {
            const files = readdirSync(oldDir).filter(file => file.endsWith('.json'));
            for (const file of files) {
                const id = file.replace('.json', '');
                
                // Filtros como en tu código original
                if (category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) continue;
                if (category === 'chats' && id.includes('@newsletter')) continue;

                const filePath = join(oldDir, file);
                const jsonData = JSON.parse(readFileSync(filePath, 'utf8'));

                // Insertar en la base de datos
                const stmt = db.prepare(`
                    INSERT OR REPLACE INTO data (id, data) 
                    VALUES (?, ?)
                `);
                stmt.run([id, JSON.stringify(jsonData)]);
                stmt.free();
            }
        }

        // Guardar la base de datos
        const data = db.export();
        writeFileSync(dbFile, Buffer.from(data));
        console.log(`Migración completada para ${category}: ${dbFile}`);
    }
    console.log('Migración total completada');
}

// Ejecutar la migración
migrateToSqlJs().catch(err => console.error('Error durante la migración:', err));
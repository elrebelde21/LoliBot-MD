process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js' 
import { createRequire } from 'module'
import path, { join } from 'path'
import {fileURLToPath, pathToFileURL} from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs, { watchFile, unwatchFile, writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync, rename } from 'fs';
import { promises as fsPromises } from 'fs';
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { format } from 'util'
import pino from 'pino'
import Pino from 'pino'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import {Low, JSONFile} from 'lowdb'
import Datastore from '@seald-io/nedb';
import store from './lib/store.js'
import readline from 'readline'
import NodeCache from 'node-cache' 
import { startSubBots } from './plugins/jadibot.js';
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { makeInMemoryStore, DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = await import('@whiskeysockets/baileys')
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
protoType()
serialize()
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
}; global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};
//global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '')
global.timestamp = { start: new Date }
const __dirname = global.__dirname(import.meta.url);
//const __dirname = join(fileURLToPath(import.meta.url), '..');
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
//global.prefix = new RegExp('^[' + (opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@').replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']')

//news
const dbPath = path.join(__dirname, 'database');
if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath);

const collections = {
users: new Datastore({ filename: path.join(dbPath, 'users.db'), autoload: true }),
chats: new Datastore({ filename: path.join(dbPath, 'chats.db'), autoload: true }),
settings: new Datastore({ filename: path.join(dbPath, 'settings.db'), autoload: true }),
msgs: new Datastore({ filename: path.join(dbPath, 'msgs.db'), autoload: true }),
sticker: new Datastore({ filename: path.join(dbPath, 'sticker.db'), autoload: true }),
stats: new Datastore({ filename: path.join(dbPath, 'stats.db'), autoload: true }),
};

Object.values(collections).forEach(db => {
  db.setAutocompactionInterval(300000);
});

global.db = { data: {
users: {},
chats: {},
settings: {},
msgs: {},
sticker: {},
stats: {},
},
};

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

async function readFromNeDB(category, id) {
const sanitizedId = sanitizeId(id);
return new Promise((resolve, reject) => {
collections[category].findOne({ _id: sanitizedId }, (err, doc) => {
if (err) {
console.error(`Error leyendo ${category}/${id}:`, err);
return reject(err);
}
resolve(doc ? unsanitizeObject(doc.data) : {});
});
});
}

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
collections[category].compactDatafile();
resolve();
});
});
}

global.db.readData = async function (category, id) {
const originalId = id;
if (!global.db.data[category][originalId]) {
const data = await readFromNeDB(category, originalId);
global.db.data[category][originalId] = data;
}
return global.db.data[category][originalId];
};

global.db.writeData = async function (category, id, data) {
const originalId = id;
global.db.data[category][originalId] = { ...global.db.data[category][originalId], ...data };
await writeToNeDB(category, originalId, global.db.data[category][originalId]);
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
if (err) {
console.error(`Error eliminando duplicado ${originalId}:`, err);
rej(err);
} else {
collections[category].persistence.compactDatafile();
res();
}});
});
} else {
seenIds.add(originalId);
if (category === 'users' && (originalId.includes('@newsletter') || originalId.includes('lid'))) continue;
if (category === 'chats' && originalId.includes('@newsletter')) continue;
global.db.data[category][originalId] = unsanitizeObject(doc.data);
}}});

await Promise.all(loadPromises);
};

global.db.save = async function () {
const savePromises = [];
for (const category of Object.keys(global.db.data)) {
for (const [id, data] of Object.entries(global.db.data[category])) {
if (Object.keys(data).length > 0) {
if (category === 'users' && (id.includes('@newsletter') || id.includes('lid'))) continue;
if (category === 'chats' && id.includes('@newsletter')) continue;
savePromises.push(writeToNeDB(category, id, data));
}}}
await Promise.all(savePromises);
};

global.db.loadDatabase().then(() => {
console.log('Base de datos lista');
}).catch(err => {
console.error('Error cargando base de datos:', err);
});

/*global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('database.json'))
global.DATABASE = global.db; 
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) {
return new Promise((resolve) => setInterval(async function() {
if (!global.db.READ) {
clearInterval(this);
resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
}}, 1 * 1000));
}
if (global.db.data !== null) return;
global.db.READ = true;
await global.db.read().catch(console.error);
global.db.READ = null;
global.db.data = {
users: {},
chats: {},
stats: {},
msgs: {},
sticker: {},
settings: {},
...(global.db.data || {}),
};
global.db.chain = chain(global.db.data);
};
loadDatabase();*/

//if (global.conns instanceof Array) {console.log('Conexiones ya inicializadas...');} else {global.conns = [];}

/* ------------------------------------------------*/

global.creds = 'creds.json'
global.authFile = `BotSession`
global.authFileJB  = 'jadibts'
global.rutaBot = join(__dirname, authFile)
global.rutaJadiBot = join(__dirname, authFileJB)
const respaldoDir = join(__dirname, 'BackupSession');
const credsFile = join(global.rutaBot, global.creds);
const backupFile = join(respaldoDir, global.creds);

if (!fs.existsSync(rutaJadiBot)) {
fs.mkdirSync(rutaJadiBot)}

if (!fs.existsSync(respaldoDir)) fs.mkdirSync(respaldoDir);

const {state, saveState, saveCreds} = await useMultiFileAuthState(global.authFile)
const msgRetryCounterMap = new Map();
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const {version} = await fetchLatestBaileysVersion()
let phoneNumber = global.botNumberCode
const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
let rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: true,
})

const question = (texto) => {
rl.clearLine(rl.input, 0)
return new Promise((resolver) => {
rl.question(texto, (respuesta) => {
rl.clearLine(rl.input, 0)
resolver(respuesta.trim())
})})
}

let opcion
if (methodCodeQR) {
opcion = '1'
}
if (!methodCodeQR && !methodCode && !fs.existsSync(`./${authFile}/creds.json`)) {
do {
let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》'
opcion = await question(`╭${lineM}  
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('┊')} ${chalk.blue.bgBlue.bold.cyan('MÉTODO DE VINCULACIÓN')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}   
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}     
┊ ${chalk.blueBright('┊')} ${chalk.green.bgMagenta.bold.yellow('¿CÓMO DESEA CONECTARSE?')}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright('⇢  Opción 1:')} ${chalk.greenBright('Código QR.')}
┊ ${chalk.blueBright('┊')} ${chalk.bold.redBright('⇢  Opción 2:')} ${chalk.greenBright('Código de 8 digitos.')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
┊ ${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}     
┊ ${chalk.blueBright('┊')} ${chalk.italic.magenta('Escriba sólo el número de')}
┊ ${chalk.blueBright('┊')} ${chalk.italic.magenta('la opción para conectarse.')}
┊ ${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
╰${lineM}\n${chalk.bold.magentaBright('---> ')}`)
if (!/^[1-2]$/.test(opcion)) {
console.log(chalk.bold.redBright(`NO SE PERMITE NÚMEROS QUE NO SEAN ${chalk.bold.greenBright("1")} O ${chalk.bold.greenBright("2")}, TAMPOCO LETRAS O SÍMBOLOS ESPECIALES. ${chalk.bold.yellowBright("CONSEJO: COPIE EL NÚMERO DE LA OPCIÓN Y PÉGUELO EN LA CONSOLA.")}`))
}} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./${authFile}/creds.json`))
}

console.info = () => {} 
const connectionOptions = {
logger: pino({ level: 'silent' }),
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile, 
browser: opcion == '1' ? ['LoliBot-MD', 'Edge', '20.0.04'] : methodCodeQR ? ['LoliBot-MD', 'Edge', '20.0.04'] : ["Ubuntu", "Chrome", "20.0.04"],
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
markOnlineOnConnect: false, 
generateHighQualityLinkPreview: true, 
syncFullHistory: false,
getMessage: async (key) => {
try {
let jid = jidNormalizedUser(key.remoteJid);
let msg = await store.loadMessage(jid, key.id);
return msg?.message || "";
} catch (error) {
return "";
}},
msgRetryCounterCache: msgRetryCounterCache || new Map(),
userDevicesCache: userDevicesCache || new Map(),
//msgRetryCounterMap,
defaultQueryTimeoutMs: undefined,
cachedGroupMetadata: (jid) => global.conn.chats[jid] ?? {},
version: version, 
keepAliveIntervalMs: 55000, 
maxIdleTimeMs: 60000, 
};

/*const connectionOptions = {
logger: pino({ level: 'silent' }), 
printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
mobile: MethodMobile,
auth: { 
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
},
browser: opcion == '1' ? ['LoliBot-MD', 'Edge', '20.0.04'] : methodCodeQR ? ['LoliBot-MD', 'Edge', '20.0.04'] : ["Ubuntu", "Chrome", "20.0.04"],
version: version, 
generateHighQualityLinkPreview: true, 
markOnlineOnConnect: false, 
syncFullHistory: false, 
msgRetryCounterCache: msgRetryCounterCache, 
userDevicesCache: userDevicesCache, 
defaultQueryTimeoutMs: 60000, 
cachedGroupMetadata: async (jid) => { 
return global.db.data.chats[jid] || {};
},
getMessage: async (key) => { 
try {
let jid = jidNormalizedUser(key.remoteJid);
let msg = await store.loadMessage(jid, key.id);
return msg?.message || "";
} catch {
return "";
}
},
keepAliveIntervalMs: 55000, 
maxIdleTimeMs: 60000, 
};*/
    
global.conn = makeWASocket(connectionOptions)

if (!fs.existsSync(`./${authFile}/creds.json`)) {
if (opcion === '2' || methodCode) {
opcion = '2'
if (!conn.authState.creds.registered) {
let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
} else {
do {
phoneNumber = await question(chalk.bgBlack(chalk.bold.greenBright("\n\n✳️ Escriba su número\n\nEjemplo: 5491168xxxx\n\n\n\n")))
phoneNumber = phoneNumber.replace(/\D/g,'')
if (!phoneNumber.startsWith('+')) {
phoneNumber = `+${phoneNumber}`
}
} while (!await isValidPhoneNumber(phoneNumber))
rl.close()
addNumber = phoneNumber.replace(/\D/g, '')
setTimeout(async () => {
let codeBot = await conn.requestPairingCode(addNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
console.log(chalk.bold.white(chalk.bgMagenta(`CÓDIGO DE VINCULACIÓN:`)), chalk.bold.white(chalk.white(codeBot)))
}, 2000)
}}}
}

conn.isInit = false
conn.well = false

if (!opts['test']) {
setInterval(async () => {
if (global.db.data) await global.db.save();
if (opts['autocleartmp'] && (global.support || {}).find) {
const tmpDirs = [os.tmpdir(), 'tmp', "jadibts"];
tmpDirs.forEach(dir => {
cp.spawn('find', [dir, '-amin', '2', '-type', 'f', '-delete']);
})}}, 30 * 1000)}
if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

//respaldo de la sesión
const backupCreds = () => {
if (fs.existsSync(credsFile)) {
fs.copyFileSync(credsFile, backupFile);
console.log(`[✅] Respaldo creado en ${backupFile}`);
} else {
console.log('[⚠] No se encontró el archivo creds.json para respaldar.');
}};

const restoreCreds = () => {
if (fs.existsSync(credsFile)) {
fs.copyFileSync(backupFile, credsFile);
console.log(`[✅] creds.json reemplazado desde el respaldo.`);
} else if (fs.existsSync(backupFile)) {
fs.copyFileSync(backupFile, credsFile);
console.log(`[✅] creds.json restaurado desde el respaldo.`);
} else {
console.log('[⚠] No se encontró ni el archivo creds.json ni el respaldo.');
}};

setInterval(async () => {
await backupCreds();
console.log('[♻️] Respaldo periódico realizado.');
}, 5 * 60 * 1000);

async function connectionUpdate(update) {  
const {connection, lastDisconnect, isNewLogin} = update
global.stopped = connection
if (isNewLogin) conn.isInit = true
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
await global.reloadHandler(true).catch(console.error)
//console.log(await global.reloadHandler(true).catch(console.error));
global.timestamp.connect = new Date
}
if (global.db.data == null) loadDatabase()
if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
if (opcion == '1' || methodCodeQR) {
console.log(chalk.cyan('✅ ESCANEA EL CÓDIGO QR EXPIRA EN 45 SEGUNDOS ✅.'))
}}
if (connection == 'open') {
console.log(chalk.bold.greenBright('\n▣─────────────────────────────···\n│\n│❧ 𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙳𝙾 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰𝙼𝙴𝙽𝚃𝙴 𝙰𝙻 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 ✅\n│\n▣─────────────────────────────···'))
global.botStartTime = Date.now();
await joinChannels(conn)
}
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
if (connection === 'close') {
if (reason === DisconnectReason.badSession) {
conn.logger.error(`[ ⚠ ] Sesión incorrecta, por favor elimina la carpeta ${global.authFile} y escanea nuevamente.`);
} else if (reason === DisconnectReason.connectionClosed) {
conn.logger.warn(`[ ⚠ ] Conexión cerrada, reconectando...`);
restoreCreds();
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionLost) {
conn.logger.warn(`[ ⚠ ] Conexión perdida con el servidor, reconectando...`);
restoreCreds();
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.connectionReplaced) {
conn.logger.error(`[ ⚠ ] Conexión reemplazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`);
} else if (reason === DisconnectReason.loggedOut) {
conn.logger.error(`[ ⚠ ] Conexion cerrada, por favor elimina la carpeta ${global.authFile} y escanea nuevamente.`);
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.restartRequired) {
conn.logger.info(`[ ⚠ ] Reinicio necesario, reinicie el servidor si presenta algún problema.`);
await global.reloadHandler(true).catch(console.error)
} else if (reason === DisconnectReason.timedOut) {
conn.logger.warn(`[ ⚠ ] Tiempo de conexión agotado, reconectando...`);
await global.reloadHandler(true).catch(console.error) //process.send('reset')
} else {
conn.logger.warn(`[ ⚠ ] Razón de desconexión desconocida. ${reason || ''}: ${connection || ''}`);
}}}

process.on('uncaughtException', console.error);

let isInit = true;
let handler = await import('./handler.js');
global.reloadHandler = async function(restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error);
if (Object.keys(Handler || {}).length) handler = Handler;
} catch (e) {
console.error(e);
}
if (restatConn) {
const oldChats = global.conn.chats;
try {
global.conn.ws.close();
} catch { }
conn.ev.removeAllListeners();
global.conn = makeWASocket(connectionOptions, {chats: oldChats});
isInit = true;
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler);
conn.ev.off('group-participants.update', conn.participantsUpdate);
conn.ev.off('groups.update', conn.groupsUpdate);
conn.ev.off('message.delete', conn.onDelete);
conn.ev.off('call', conn.onCall);
conn.ev.off('connection.update', conn.connectionUpdate);
conn.ev.off('creds.update', conn.credsUpdate);
}

conn.welcome = 'HOLAA!! @user ¿COMO ESTAS?😃\n\n『Bienvenido A *@subject*』\n\nUn gusto conocerte amig@ 🤗\n\n_Recuerda leer las reglas del grupo para no tener ningun problema 🧐_\n\n*Solo disfrutar de este grupo y divertite 🥳*`'
conn.bye = 'Bueno, se fue @user 👋\n\nQue dios lo bendiga 😎`'
conn.spromote = 'Hey @user ya forma parte de staff 👑'
conn.sdemote = 'jajaja @user ya no eres admins'
conn.sDesc = 'La descripción ha sido cambiada a \n@desc'
conn.sSubject = 'El nombre del grupo ha sido cambiado a \n@group'
conn.sIcon = 'El icono del grupo ha sido cambiado'
conn.sRevoke = 'El enlace del grupo ha sido cambiado a \n@revoke'
conn.handler = handler.handler.bind(global.conn);
conn.participantsUpdate = handler.participantsUpdate.bind(global.conn);
conn.groupsUpdate = handler.groupsUpdate.bind(global.conn);
conn.onDelete = handler.deleteUpdate.bind(global.conn);
conn.onCall = handler.callUpdate.bind(global.conn);
conn.connectionUpdate = connectionUpdate.bind(global.conn);
conn.credsUpdate = saveCreds.bind(global.conn, true);
conn.ev.on('messages.upsert', conn.handler);
conn.ev.on('group-participants.update', conn.participantsUpdate);
conn.ev.on('groups.update', conn.groupsUpdate);
conn.ev.on('message.delete', conn.onDelete);
conn.ev.on('call', conn.onCall);
conn.ev.on('connection.update', conn.connectionUpdate);
conn.ev.on('creds.update', conn.credsUpdate);
isInit = false
return true
}

//Arranque nativo para subbots
await startSubBots();

/*const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};
async function filesInit() {
for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
const file = global.__filename(join(pluginFolder, filename));
const module = await import(file);
global.plugins[filename] = module.default || module;
} catch (e) {
conn.logger.error(e);
delete global.plugins[filename];
}}}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error)*/

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
const file = global.__filename(join(pluginFolder, filename))
const module = await import(file)
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete global.plugins[filename]
}}}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
const dir = global.__filename(join(pluginFolder, filename), true)
if (filename in global.plugins) {
if (existsSync(dir)) conn.logger.info(` SE ACTULIZADO - '${filename}' CON ÉXITO`)
else {
conn.logger.warn(`SE ELIMINO UN ARCHIVO : '${filename}'`)
return delete global.plugins[filename];
}
} else conn.logger.info(`SE DETECTO UN NUEVO PLUGINS : '${filename}'`)
const err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true,
});
if (err) conn.logger.error(`SE DETECTO UN ERROR DE SINTAXIS | SYNTAX ERROR WHILE LOADING '${filename}'\n${format(err)}`);
else {
try {
const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
global.plugins[filename] = module.default || module;
} catch (e) {
conn.logger.error(`HAY UN ERROR REQUIERE EL PLUGINS '${filename}\n${format(e)}'`);
} finally {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
}}}};
Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadHandler();
async function _quickTest() {
const test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version']),
].map((p) => {
return Promise.race([
new Promise((resolve) => {
p.on('close', (code) => {
resolve(code !== 127);
});
}),
new Promise((resolve) => {
p.on('error', (_) => resolve(false));
})]);
}));

const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
const s = global.support = {ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find};
Object.freeze(global.support);
}

function clearTmp() {
const tmpDir = join(__dirname, 'tmp')
const filenames = readdirSync(tmpDir)
filenames.forEach(file => {
const filePath = join(tmpDir, file)
unlinkSync(filePath)})
}

async function purgeSession() {
const sessionDir = './BotSession';
try {
if (!existsSync(sessionDir)) return;
const files = await readdir(sessionDir);
const preKeys = files.filter(file => file.startsWith('pre-key-'));
const now = Date.now();
const oneHourAgo = now - (24 * 60 * 60 * 1000); //24 horas
    
for (const file of preKeys) {
const filePath = join(sessionDir, file);
const fileStats = await stat(filePath);
if (fileStats.mtimeMs < oneHourAgo) { 
try {
await unlink(filePath);
console.log(chalk.green(`[🗑️] Pre-key antigua eliminada: ${file}`));
} catch (err) {
//console.error(chalk.red(`[⚠] Error al eliminar pre-key antigua ${file}: ${err.message}`));
}} else {
//console.log(chalk.yellow(`[ℹ️] Manteniendo pre-key activa: ${file}`));
}}
console.log(chalk.cyanBright(`[🔵] Sesiones no esenciales eliminadas de ${global.authFile}`));
} catch (err) {
//console.error(chalk.red(`[⚠] Error al limpiar BotSession: ${err.message}`));
}}

async function purgeSessionSB() {
const jadibtsDir = './jadibts/';
try {
if (!existsSync(jadibtsDir)) return;
const directories = await readdir(jadibtsDir);
let SBprekey = [];
const now = Date.now();
const oneHourAgo = now - (24 * 60 * 60 * 1000); //24 horas
    
for (const dir of directories) {
const dirPath = join(jadibtsDir, dir);
const stats = await stat(dirPath);
if (stats.isDirectory()) {
const files = await readdir(dirPath);
const preKeys = files.filter(file => file.startsWith('pre-key-') && file !== 'creds.json');
SBprekey = [...SBprekey, ...preKeys];
for (const file of preKeys) {
const filePath = join(dirPath, file);
const fileStats = await stat(filePath);
if (fileStats.mtimeMs < oneHourAgo) { 
try {
await unlink(filePath);
console.log(chalk.green(`[🗑️] Pre-key antigua eliminada de sub-bot ${dir}: ${file}`));
} catch (err) {
//console.error(chalk.red(`[⚠] Error al eliminar pre-key antigua ${file} en ${dir}: ${err.message}`));
}} else {
//console.log(chalk.yellow(`[ℹ️] Manteniendo pre-key activa en sub-bot ${dir}: ${file}`));
}}}}
if (SBprekey.length === 0) {
//console.log(chalk.green(`[ℹ️] No se encontraron pre-keys en sub-bots.`));
} else {
console.log(chalk.cyanBright(`[🔵] Pre-keys antiguas eliminadas de sub-bots: ${SBprekey.length}`));
}} catch (err) {
//console.error(chalk.red(`[⚠] Error al limpiar sub-bots: ${err.message}`));
}}

async function purgeOldFiles() {
const directories = ['./BotSession/', './jadibts/'];
for (const dir of directories) {
try {
if (!fs.existsSync(dir)) { 
console.log(chalk.yellow(`[⚠] Carpeta no existe: ${dir}`));
continue;
}
const files = await fsPromises.readdir(dir); 
for (const file of files) {
if (file !== 'creds.json') {
const filePath = join(dir, file);
try {
await fsPromises.unlink(filePath);
//console.log(chalk.green(`[🗑️] Archivo residual eliminado: ${file} en ${dir}`));
} catch (err) {
//console.error(chalk.red(`[⚠] Error al eliminar ${file} en ${dir}: ${err.message}`));
}}}
} catch (err) {
//console.error(chalk.red(`[⚠] Error al limpiar ${dir}: ${err.message}`));
}}
//console.log(chalk.cyanBright(`[🟠] Archivos residuales eliminados de ${directories.join(', ')}`));
}

function redefineConsoleMethod(methodName, filterStrings) {
const originalConsoleMethod = console[methodName]
console[methodName] = function() {
const message = arguments[0]
if (typeof message === 'string' && filterStrings.some(filterString => message.includes(atob(filterString)))) {
arguments[0] = ""
}
originalConsoleMethod.apply(console, arguments)
}}

setInterval(async () => {
if (stopped === 'close' || !conn || !conn.user) return;
  await clearTmp();
  console.log(chalk.cyan(`┏━━━━━━⪻♻️ AUTO-CLEAR 🗑️⪼━━━━━━•\n┃→ ARCHIVOS DE LA CARPETA TMP ELIMINADOS\n┗━━━━━━━━━━━━━━━━━━━━━━━━━━━•`));
}, 1000 * 60 * 3); //3 min

setInterval(async () => {
  if (stopped === 'close' || !conn || !conn.user) return;
  await purgeSessionSB();
  await purgeSession();
  console.log(chalk.bold.cyanBright(`\n╭» 🔵 ${global.authFile} 🔵\n│→ SESIONES NO ESENCIALES ELIMINADAS\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`));
  await purgeOldFiles();
  console.log(chalk.bold.cyanBright(`\n╭» 🟠 ARCHIVOS 🟠\n│→ ARCHIVOS RESIDUALES ELIMINADAS\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`));
}, 1000 * 60 * 10); //10 min

_quickTest().then(() => conn.logger.info('Ƈᴀʀɢᴀɴᴅᴏ．．．.\n'))
.catch(console.error)

async function isValidPhoneNumber(number) {
try {
number = number.replace(/\s+/g, '')
// Si el número empieza con '+521' o '+52 1', quitar el '1'
if (number.startsWith('+521')) {
number = number.replace('+521', '+52'); // Cambiar +521 a +52
} else if (number.startsWith('+52') && number[4] === '1') {
number = number.replace('+52 1', '+52'); // Cambiar +52 1 a +52
}
const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
return phoneUtil.isValidNumber(parsedNumber)
} catch (error) {
return false
}}

async function joinChannels(conn) {
for (const channelId of Object.values(global.ch)) {
await conn.newsletterFollow(channelId).catch(() => {})
}}
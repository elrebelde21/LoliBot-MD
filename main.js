import * as baileys from "@whiskeysockets/baileys";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import readlineSync from "readline-sync";
import pino from "pino";
import NodeCache from 'node-cache';
import { startSubBot } from "./lib/subbot.js";
import "./config.js";
import { handler, callUpdate, participantsUpdate, groupsUpdate } from "./handler.js";
import { loadPlugins } from './lib/plugins.js';

await loadPlugins();
const BOT_SESSION_FOLDER = "./BotSession";
const BOT_CREDS_PATH = path.join(BOT_SESSION_FOLDER, "creds.json");
if (!fs.existsSync(BOT_SESSION_FOLDER)) fs.mkdirSync(BOT_SESSION_FOLDER);

if (!globalThis.conns || !(globalThis.conns instanceof Array)) globalThis.conns = [];
let _indiceActualSubbot = 0;
const MAX_SUBBOTS = 5;
let reconectandoAhora = 0;
const reconectando = new Set();
let usarCodigo = false;
let numero = "";

main();

async function main() {
const hayCredencialesPrincipal = fs.existsSync(BOT_CREDS_PATH);
const subbotsFolder = "./jadibot";
const haySubbotsActivos = fs.existsSync(subbotsFolder) && fs.readdirSync(subbotsFolder).some(folder => fs.existsSync(path.join(subbotsFolder, folder, "creds.json"))
);

if (!hayCredencialesPrincipal && !haySubbotsActivos) {
let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》'
const opcion = readlineSync.question(`╭${lineM}  
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
//readlineSync.question(chalk.yellow("Elige una opción (1 o 2): "));
usarCodigo = opcion === "2";
if (usarCodigo) {
console.log(chalk.yellow("Ingresa tu número (ej: +521234567890): "));
numero = readlineSync.question("").replace(/[^0-9]/g, '');
if (numero.startsWith('52') && !numero.startsWith('521')) {
numero = '521' + numero.slice(2);
}}
}

await cargarSubbots();

if (hayCredencialesPrincipal || !haySubbotsActivos) {
try {
await startBot();
} catch (err) {
console.error(chalk.red("❌ Error al iniciar bot principal:"), err);
}} else {
console.log(chalk.yellow("⚠️ Subbots activos detectados. Bot principal desactivado automáticamente."));
}}

async function cargarSubbots() {
const folder = "./jadibot";
if (!fs.existsSync(folder)) return;

const subbotIds = fs.readdirSync(folder);
console.log(chalk.bold.yellowBright(`📦 Subbots cargados: ${subbotIds.length}`));

for (const userId of subbotIds) {
const sessionPath = path.join(folder, userId);
const credsPath = path.join(sessionPath, "creds.json");
if (!fs.existsSync(credsPath)) continue;
if (globalThis.conns?.some(conn => conn.userId === userId)) continue;
if (reconectando.has(userId)) continue;

try {
reconectando.add(userId);
await startSubBot(null, null, "Auto reconexión", false, userId, null);
} catch (e) {
console.log(chalk.red(`❌ Falló la carga de ${userId}:`, e.message));
} finally {
reconectando.delete(userId);
}

await new Promise(res => setTimeout(res, 2500))}
setTimeout(cargarSubbots, 60 * 1000); 
}

async function startBot() {
const { state, saveCreds } = await baileys.useMultiFileAuthState(BOT_SESSION_FOLDER);
const msgRetryCounterMap = new Map();
const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const groupCache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
const { version } = await baileys.fetchLatestBaileysVersion();

console.info = () => {} 
const sock = baileys.makeWASocket({
printQRInTerminal: !usarCodigo && !fs.existsSync(BOT_CREDS_PATH),
logger: pino({ level: 'silent' }),   
browser: ['Windows', 'Chrome'],
auth: { creds: state.creds,
keys: baileys.makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
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
cachedGroupMetadata: async (jid) => groupCache.get(jid),
version: version, 
defaultQueryTimeoutMs: 30_000,
keepAliveIntervalMs: 55000, 
maxIdleTimeMs: 60000, 
});

globalThis.conn = sock;
setupGroupEvents(sock);
sock.ev.on("creds.update", saveCreds);

sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
const code = lastDisconnect?.error?.output?.statusCode || 0;

if (connection === "open") {
console.log(chalk.bold.greenBright('\n▣─────────────────────────────···\n│\n│❧ 𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙳𝙾 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰𝙼𝙴𝙽𝚃𝙴 𝙰𝙻 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 ✅\n│\n▣─────────────────────────────···'))
}

if (connection === "close") {
if ([401, 440, 428, 405].includes(code)) {      
console.log(chalk.red(`❌ Error de sesión (${code}) inválida. Borra la carpeta "BotSession" y vuelve a conectar.`));
}
console.log(chalk.yellow("♻️ Conexión cerrada. Reintentando en 3s..."));
setTimeout(() => startBot(), 3000);
}});

process.on('uncaughtException', console.error);
  
if (usarCodigo && !state.creds.registered) {
setTimeout(async () => {
try {
const code = await sock.requestPairingCode(numero);
console.log(chalk.yellow('Código de emparejamiento:'), chalk.greenBright(code));
} catch {}
}, 2000);
}

sock.ev.on("messages.upsert", async ({ messages, type }) => {
if (type !== "notify") return;
for (const msg of messages) {
if (!msg.message) continue;
const tiempoInicio = Math.floor(sock.uptime / 1000);
if (msg.messageTimestamp && (msg.messageTimestamp < tiempoInicio || (Date.now() / 1000 - msg.messageTimestamp) > 60)) {
  continue;
}
if(msg.key.id.startsWith('NJX-') || msg.key.id.startsWith('Lyru-') || msg.key.id.startsWith('EvoGlobalBot-') || msg.key.id.startsWith('BAE5') && msg.key.id.length === 16 || msg.key.id.startsWith('3EB0') && msg.key.id.length === 12 || msg.key.id.startsWith('3EB0') || msg.key.id.startsWith('3E83') || msg.key.id.startsWith('3E38') && (msg.key.id.length === 20 || msg.key.id.length === 22) || msg.key.id.startsWith('B24E') || msg.key.id.startsWith('8SCO') && msg.key.id.length === 20 || msg.key.id.startsWith('FizzxyTheGreat-')) return
try {
//const { handler } = await import("./handler.js");
await handler(sock, msg);
} catch (err) {
console.error(err);
}}
});
  
sock.ev.on("call", async (calls) => {
try {
//const { callUpdate } = await import("./handler.js");
for (const call of calls) {
await callUpdate(sock, call);
}} catch (err) {
console.error(chalk.red("❌ Error procesando call.update:"), err);
}
});
    
//tmp    
setInterval(() => {
const tmp = './tmp';
try {
if (!fs.existsSync(tmp)) return;
const files = fs.readdirSync(tmp);
files.forEach(file => {
if (file.endsWith('.file')) return;
const filePath = path.join(tmp, file);
const stats = fs.statSync(filePath);
const now = Date.now();
const modifiedTime = new Date(stats.mtime).getTime();
const age = now - modifiedTime;
if (age > 3 * 60 * 1000) {
fs.unlinkSync(filePath);
}
})
console.log(chalk.gray(`┏━━━━━━⪻♻️ AUTO-CLEAR 🗑️⪼━━━━━━•\n┃→ ARCHIVOS DE LA CARPETA TMP ELIMINADOS\n┗━━━━━━━━━━━━━━━━━━━━━━━━━━━•`));
} catch (err) {
console.error('Error cleaning temporary files:', err);
}}, 30 * 1000);
        
setInterval(() => {
console.log('♻️ Reiniciando bot automáticamente...');
process.exit(0); 
}, 10800000) //3hs
//3600000

//tmp session basura
setInterval(() => {
const now = Date.now();
const carpetas = ['./jadibot', './BotSession'];
for (const basePath of carpetas) {
if (!fs.existsSync(basePath)) continue;

const subfolders = fs.readdirSync(basePath);
for (const folder of subfolders) {
const sessionPath = path.join(basePath, folder);
if (!fs.statSync(sessionPath).isDirectory()) continue;
const isActive = globalThis.conns?.some(c => c.userId === folder || c.user?.id?.includes(folder));
const files = fs.readdirSync(sessionPath);

for (const file of files) {
const fullPath = path.join(sessionPath, file);
if (!fs.existsSync(fullPath)) continue;
if (file === 'creds.json') continue;
try {
const stats = fs.statSync(fullPath);
const ageMs = now - stats.mtimeMs;

if (file.startsWith('pre-key') && ageMs > 24 * 60 * 60 * 1000 && !isActive) {
fs.unlinkSync(fullPath);
//console.log(chalk.cyanBright(`[🔵] Pre-key vieja eliminada (${folder}): ${file}`));
} else if (ageMs > 30 * 60 * 1000 && !isActive) {
fs.unlinkSync(fullPath);
//console.log(chalk.gray(`[⚪] Archivo viejo eliminado (${folder}): ${file}`));
}} catch (err) {
console.error(chalk.red(`[⚠] Error al limpiar archivo ${file}:`), err);
}}}}
console.log(chalk.bold.cyanBright(`\n╭» 🟠 ARCHIVOS 🟠\n│→ ARCHIVOS RESIDUALES ELIMINADAS\n╰― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― ― 🗑️♻️`));
}, 10 * 60 * 1000); // cada 10 minutos
    
function setupGroupEvents(sock) {
sock.ev.on("group-participants.update", async (update) => {
console.log(update)
try {
await participantsUpdate(sock, update);
} catch (err) {
console.error(chalk.red("❌ Error procesando group-participants.update:"), err);
}});

sock.ev.on("groups.update", async (updates) => {
console.log(updates)
try {
for (const update of updates) {
await groupsUpdate(sock, update);
}} catch (err) {
console.error(chalk.red("❌ Error procesando groups.update:"), err);
}});
}
}


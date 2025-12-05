import { db, getSubbotConfig } from '../lib/postgres.js';
import fs from 'fs';
import path from 'path';

const audiosPath = path.resolve('./src/audios.json');
function getAudios() {
  try {
    return JSON.parse(fs.readFileSync(audiosPath));
  } catch (e) {
    console.error('[❌] Error leyendo audios.json dinámicamente:', e);
    return {};
  }
}

export async function before(m, { conn }) {
if (!m || m.fromMe || !m.originalText || m.originalText.length > 500) return;
const botId = conn?.user?.id?.replace(/:\d+/, "");
const config = await getSubbotConfig(botId);
const prefixes = Array.isArray(config?.prefix) ? config.prefix : ['.', '/', '#'];
const texto = m.originalText.trim();

if (prefixes.some(p => texto.startsWith(p))) return;
try {
const res = await db.query('SELECT audios FROM group_settings WHERE group_id = $1', [m.chat]);
if (!res.rows[0]?.audios) return;
} catch (e) {
console.error('[❌] Error al consultar configuración de audios:', e);
return;
}

const lowerTexto = texto.toLowerCase();
const chatId = m.chat.trim();
const audios = getAudios();
const sources = [audios[chatId], audios.global].filter(Boolean);

for (const source of sources) {
const clave = Object.keys(source).find(k => {
try {
const regex = new RegExp(source[k].regex, 'i');
const matches = lowerTexto.match(regex);
return matches?.[0]?.length === lowerTexto.length; // match exacto
} catch {
return false;
}
});

if (!clave) continue;

const audio = source[clave];
try {
await conn.sendPresenceUpdate('recording', m.chat);
const isBase64 = audio.audio.startsWith('data:audio/');
const isLocal = audio.audio.startsWith('./') || audio.audio.startsWith('/');
const listaAudios = Array.isArray(audio.audios) ? audio.audios : [audio.audio];
const elegido = listaAudios[Math.floor(Math.random() * listaAudios.length)];

await conn.sendMessage(m.chat, { audio: elegido.startsWith('data:audio/') ? Buffer.from(elegido.split(',')[1], 'base64') : elegido.startsWith('./') || elegido.startsWith('/') ? { url: path.resolve(elegido) } : { url: elegido }, mimetype: 'audio/mpeg' }, { quoted: m });
break; 
} catch (err) {
console.error('[❌] Error enviando audio automático:', err);
}}
}

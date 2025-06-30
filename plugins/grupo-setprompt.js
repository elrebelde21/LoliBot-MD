import { db } from '../lib/postgres.js';
import fetch from 'node-fetch';

const presets = {
  1: () => fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then(r => r.text()),
  2: () => fetch('https://raw.githubusercontent.com/elrebelde21/ChinaMitzuki/master/src/text-chatgpt.txt').then(r => r.text()),
  3: () => 'Eres NeneFlok, actual como un nene millonario cheto…', // resumido por espacio
  4: () => fetch('https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/main/src/text-chatgpt.txt').then(r => r.text())
};

const prompt_name = {
  1: '💣 exploit mode',
  2: '🇨🇳 china',
  3: '💸 NeneFlok',
  4: '🧠 IA multipersonalidad'
};

const handler = async (m, { text, usedPrefix, command, isOwner }) => {
const input = text?.trim().toLowerCase();

if (command === 'clearmemory' || command === 'clearai' || command === 'resetai') {
await db.query('DELETE FROM chat_memory WHERE chat_id = $1', [m.chat]);
return m.reply('🧠 Memoria del chat borrada correctamente. El bot empezará desde cero.');
}

if (command === 'timeIA' || command === 'memttl') {
if (!isOwner) return m.reply('⛔ Solo el *OWNER* puede poner más de 24 horas.');
if (!text) return m.reply(`⏱️ *Uso:* ${usedPrefix + command} 10m | 2h | 1d | 0
Unidades válidas: s (seg), m (min), h (horas), d (días)
Ejemplos:
${usedPrefix + command} 30m      → memoria se borra tras 30 minutos
${usedPrefix + command} 2h       → 2 horas
${usedPrefix + command} 0        → se borra en cada mensaje
`);

if (text === '0') {
await db.query('UPDATE group_settings SET memory_ttl = 0 WHERE group_id = $1', [m.chat]);
return m.reply('🧠 Memoria desactivada. El bot responderá sin historial.');
}

const match = text.match(/^(\d+)([smhd])$/i);
if (!match) return m.reply('❌ Formato inválido. Usa: 10m, 2h, 1d');
const num = parseInt(match[1]);
const unit = match[2].toLowerCase();
const unitToSeconds = { s: 1, m: 60, h: 3600, d: 86400 };
const seconds = num * unitToSeconds[unit];
await db.query('UPDATE group_settings SET memory_ttl = $1 WHERE group_id = $2', [seconds, m.chat]);
return m.reply(`✅ Tiempo de memoria actualizado a *${num}${unit}* (${seconds} segundos).`);
}

if (!text) return m.reply(`📌 *Uso del comando ${command} de esta forma:*
${usedPrefix + command} 1  - ${prompt_name[1]}
${usedPrefix + command} 2 - ${prompt_name[2]}
${usedPrefix + command} 3 - ${prompt_name[3]}
${usedPrefix + command} 4 - ${prompt_name[4]}
${usedPrefix + command} tu texto - ✍️ prompt personalizado
${usedPrefix + command} delete|borrar - 🧹 borrar prompt y memoria`);
let prompt = null;
const isPreset = ['1', '2', '3', '4'].includes(input);
const isDelete = ['delete', 'borrar'].includes(input);
const resetMemory = true;

if (isDelete) {
prompt = null;
} else if (isPreset) {
prompt = await presets[input]();
} else {
prompt = text;
}

await db.query(`INSERT INTO group_settings (group_id, sAutorespond)
    VALUES ($1, $2)
    ON CONFLICT (group_id) DO UPDATE SET sAutorespond = $2`, [m.chat, prompt]);
if (resetMemory) {
await db.query('DELETE FROM chat_memory WHERE chat_id = $1', [m.chat]);
}
return m.reply(prompt ? `✅ *Configuración exitosa.*\n\n*Has establecido un nuevo prompt para este chat.*\n💬 A partir de ahora, el bot usará las indicaciones que hayas establecido.\n\n> *Recuerda etiquetar "@tag" o responder a un mensaje del bot para que te responda.*\n\n` + (prompt_name[input] || prompt) : '🗑️ *Prompt borrado con éxito.*');
};
handler.help = ['setprompt', 'resetai', 'timeIA'];
handler.tags = ['group'];
handler.command = /^setprompt|autorespond|clearmemory|clearai|resetai|memttl|timeIA$/i;
handler.group = true;
handler.admin = true;

export default handler;

import fetch from 'node-fetch';
import { blackboxAi, exoml, perplexity } from '../lib/scraper.js';
import { db } from '../lib/postgres.js';

const MAX_TURNS = 12;

export async function before(m, { conn }) {
const botIds = [conn.user?.id, conn.user?.lid].filter(Boolean).map(j => j.split('@')[0].split(':')[0]);

const mentioned = [...(m.mentionedJid || []),
m.msg?.contextInfo?.participant,
m.msg?.contextInfo?.remoteJid].filter(Boolean);

const mention = mentioned.some(j => {
const num = j?.split('@')[0]?.split(':')[0];
return botIds.includes(num);
});

//const isReplyToBot = m.quoted && [conn.user?.id, conn.user?.lid].some(id => id?.includes(m.quoted.sender));
//if (!mention && !isReplyToBot) return true;
const triggerWords = /\b(bot|simi|alexa|lolibot)\b/i;
if (!mention && !triggerWords.test(m.originalText)) return true;
//if (!mention) return true;

const no_cmd = /(PIEDRA|PAPEL|TIJERA|menu|estado|bots?|serbot|jadibot|Video|Audio|Exp|diamante|lolicoins?)/i;
if (no_cmd.test(m.text)) return true;

await conn.sendPresenceUpdate("composing", m.chat);
const chatId = m.chat;
const query = m.text;
let memory = [];
let systemPrompt = '';
let ttl = 86400; // 1 día por defecto
try {
const { rows } = await db.query('SELECT sautorespond, memory_ttl FROM group_settings WHERE group_id = $1', [chatId]);
systemPrompt = rows[0]?.sautorespond || '';
ttl = rows[0]?.memory_ttl ?? 86400;
} catch (e) {
console.error("[❌] Error obteniendo prompt/ttl:", e.message);
}

if (!systemPrompt) {
systemPrompt = await fetch('https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/main/src/text-chatgpt.txt').then(v => v.text());
//await fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then(r => r.text());
}

try {
const res = await db.query('SELECT history, updated_at FROM chat_memory WHERE chat_id = $1', [chatId]);
const { history = [], updated_at } = res.rows[0] || {};
const expired = !ttl || (updated_at && Date.now() - new Date(updated_at) > ttl * 1000);
memory = expired ? [] : history;
} catch (e) {
console.error("❌ No se pudo obtener memoria de DB:", e.message);
}

if (!memory.length || memory[0]?.role !== 'system' || memory[0]?.content !== systemPrompt) {
memory = [{ role: 'system', content: systemPrompt }];
}

memory.push({ role: 'user', content: query });
if (memory.length > MAX_TURNS * 2 + 1) {
memory = [memory[0], ...memory.slice(-MAX_TURNS * 2)];
}

let result = '';
try {
result = await exoml.generate(memory, systemPrompt, 'llama-4-scout');
} catch (err) {
console.error("❌ Error en ExoML, fallback:", err);
const bb = await blackboxAi(query);
result = bb?.data?.response || "❌ No se obtuvo respuesta.";
}

if (!result || result.trim().length < 2) result = "🤖 ...";
memory.push({ role: 'assistant', content: result });
try {
await db.query(`INSERT INTO chat_memory (chat_id, history, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (chat_id) DO UPDATE SET history = $2, updated_at = NOW()
    `, [chatId, JSON.stringify(memory)]);
} catch (e) {
console.error("❌ No se pudo guardar memoria:", e.message);
}

await conn.reply(m.chat, result, m);
await conn.readMessages([m.key]);

return false;
}
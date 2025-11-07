import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { blackboxAi, exoml, perplexity } from '../lib/scraper.js';
import { db } from '../lib/postgres.js';
 
const handler = async (m, {conn, text, usedPrefix, command}) => {
let username = m.pushName 
if (!text) return m.reply(`*Hola cómo esta 😊, El que te puedo ayudar?*, ingrese una petición o orden para usar la función de chagpt\n*Ejemplo:*\n${usedPrefix + command} Recomienda un top 10 de películas de acción`) 
let syst = `Actuaras como un Bot de WhatsApp el cual fue creado por elrebelde, tu seras LoliBot.`
let syms1 = await fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then(v => v.text());
 
const chatId = m.chat;
let systemPrompt = '';
let ttl = 86400; // 1 día por defecto
let memory = [];

try {
const { rows } = await db.query('SELECT sautorespond, memory_ttl FROM group_settings WHERE group_id = $1', [chatId]);
systemPrompt = rows[0]?.sautorespond || '';
ttl = rows[0]?.memory_ttl ?? 86400;
} catch (e) {
console.error("❌ Error obteniendo prompt o TTL:", e.message);
}

if (!systemPrompt) {
try {
systemPrompt = await fetch('https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/main/src/text-chatgpt.txt').then(r => r.text());
//await fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then(r => r.text());
} catch {
systemPrompt = syms1; 
}}

try {
const res = await db.query('SELECT history, updated_at FROM chat_memory WHERE chat_id = $1', [chatId]);
const { history = [], updated_at } = res.rows[0] || {};
const expired = !ttl || (updated_at && Date.now() - new Date(updated_at) > ttl * 1000);
memory = expired ? [] : history;
} catch (e) {
console.error("❌ Error leyendo memoria:", e.message);
}

if (!memory.length || memory[0]?.role !== 'system' || memory[0]?.content !== systemPrompt) {
  memory = [{ role: 'system', content: systemPrompt }];
}
memory.push({ role: 'user', content: text });
if (memory.length > 25) memory = [memory[0], ...memory.slice(-24)];

function formatForWhatsApp(text) {
  return text
    .replace(/\\([!?.,"'])/g, '$1')  
    .replace(/\*\*/g, "*") 
    .replace(/\_\_/g, "_") 
    .replace(/\\n/g, "\n") 
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$2')
    .replace(/\n{3,}/g, "\n\n") 
    .trim();
}

if (command == 'ia' || command == 'chatgpt') {
await conn.sendPresenceUpdate('composing', m.chat)
let result = '';
try {
result = await exoml.generate(memory, systemPrompt, 'llama-4-scout');
} catch (e) {
try {
let gpt = await fetch(`${info.apis}/ia/gptprompt?text=${text}?&prompt=${systemPrompt}`);
let res = await gpt.json();
result = res.data;
} catch {
result = "❌ No se pudo generar una respuesta.";
}}
memory.push({ role: 'assistant', content: result });

try {
await db.query(`INSERT INTO chat_memory (chat_id, history, updated_at)
      VALUES ($1, $2, NOW())
      ON CONFLICT (chat_id) DO UPDATE SET history = $2, updated_at = NOW()
    `, [chatId, JSON.stringify(memory)]);
} catch (e) {
console.error("❌ No se pudo guardar memoria:", e.message);
}
const formatted = formatForWhatsApp(result)
return await m.reply(formatted)
//await m.reply(result);
}

if (command == 'openai'  || command == 'chatgpt2') {
await conn.sendPresenceUpdate('composing', m.chat);
try {
let gpt = await fetch(`https://api.dorratz.com/ai/gpt?prompt=${text}`) 
let res = await gpt.json()
const decoded = JSON.parse(`"${res.result}"`);
await m.reply(decoded);
} catch {
try { 
let gpt = await fetch(`${info.apis}/ia/gptweb?text=${text}`) 
let res = await gpt.json()
const formatted = formatForWhatsApp(res.gpt)
await m.reply(formatted)
//await m.reply(res.gpt)
} catch {
try {
let gpt = await fetch(`${info.apis}/api/ia2?text=${text}`)
let res = await gpt.json()
await m.reply(res.gpt)
} catch {
try {
let gpt = await fetch(`${info.apis}/ia/chatgpt?q=${text}`)
let res = await gpt.json()
await m.reply(res.data)
} catch (e) {
}}}}}

if (command == 'deepseek') {
await conn.sendPresenceUpdate('composing', m.chat);
try {
const gpt = await fetch(`https://api.dorratz.com/ai/deepseek?prompt=${encodeURIComponent(text)}`);
const res = await gpt.json();
const decoded = JSON.parse(`"${res.result}"`);
await m.reply(decoded);
} catch (e) {
console.error('Error DeepSeek:', e);
await m.reply('❌ Error al consultar DeepSeek API.');
}}

if (command == 'gemini') {
await conn.sendPresenceUpdate('composing', m.chat)
try {
let gpt = await fetch(`https://api.dorratz.com/ai/gemini?prompt=${text}`)
let res = await gpt.json()
await m.reply(res.message)
} catch {
try {
let gpt = await fetch(`https://delirius-apiofc.vercel.app/ia/gemini?query=${text}`)
let res = await gpt.json()
await m.reply(res.message)
} catch {
}}}

if (command === 'blackbox') {
const result = await blackboxAi(text);
if (result.status) return await m.reply(result.data.response);
return await m.reply("❌ Error de blackbox.ai: " + result.error);
}
    
if (command == 'copilot' || command == 'bing') {
await conn.sendPresenceUpdate('composing', m.chat)
try {
let gpt = await fetch(`https://api.dorratz.com/ai/bing?prompt=${text}`)
let res = await gpt.json()
await conn.sendMessage(m.chat, { text: res.result.ai_response, contextInfo: {
externalAdReply: {
title: "[ IA COPILOT ]",
body: "LoliBot",
thumbnailUrl: "https://qu.ax/nTDgf.jpg", 
sourceUrl: "https://api.dorratz.com",
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: m })
//m.reply(res.result.ai_response)
} catch {
try {
let gpt = await fetch(`${info.apis}/ia/bingia?query=${text}`)
let res = await gpt.json()
await m.reply(res.message)
} catch {
}}}}
handler.help = ["chagpt", "ia", "openai", "gemini", "copilot", "blackbox", "deepseek"]
handler.tags = ["buscadores"]
handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|ia2|gemini|copilot|bing|deepseek|blackbox)$/i;
export default handler;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
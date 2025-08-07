import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import fetch from 'node-fetch';
import { pathToFileURL } from 'url';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';
import { db } from '../lib/postgres.js';

//const GITHUB_TOKEN = Buffer.from('Z2hwX1ZoQWdFbk5jbGY3dmRZSWV1TTRsNnZ5eFYzZ3c4WjNHVWphdg==', 'base64').toString();
const GITHUB_REPO = 'LoliBottt/multimedia';
const GITHUB_BRANCH = 'main';

const audiosPath = path.resolve('./src/audios.json');

const handler = async (m, { conn, text, isOwner, isAdmin, command }) => {
const audiosPath = path.resolve('./src/audios.json');
let audios = {};
if (fs.existsSync(audiosPath)) {
try {
audios = JSON.parse(fs.readFileSync(audiosPath));
} catch (e) {
console.error('[❌] Error leyendo audios.json:', e);
}}
const { rows } = await db.query("SELECT value FROM tokens WHERE id = 'github_token'");
const GITHUB_TOKEN = rows[0]?.value;
if (!GITHUB_TOKEN) return m.reply('❌ No se encontró el token en la base de datos.');

const chatId = m.chat;
const isGroup = chatId.endsWith('@g.us');
const scope = isOwner ? 'global' : chatId;
if (!audios[scope]) audios[scope] = {};
const [fraseRaw, ...resto] = text.split('-');
const frases = fraseRaw.split(',').map(f => f.trim().toLowerCase()).filter(Boolean);

if (!frases.length) return m.reply(`✳️ Usa:\n${command === 'addaudios' ? '.addaudios hola,hello - audio' : '.delaudios hola'}`);

if (!isOwner && isGroup && !isAdmin) return m.reply('🚫 Solo admins pueden usar este comando en este grupo');

if (command === 'delaudios') {
const frase = frases[0];
const currentScope = audios[scope] || {};
  
if (!currentScope[frase]) {
let encontrado = false;
for (const key in audios) {
if (audios[key][frase]) {
if (key !== scope && (key === 'global' && !isOwner)) continue;
delete audios[key][frase];
encontrado = true;
fs.writeFileSync(audiosPath, JSON.stringify(audios, null, 2));
await import(pathToFileURL(audiosPath) + `?update=${Date.now()}`, { assert: { type: "json" }});
return m.reply(`🗑️ Audio *${frase}* eliminado correctamente del scope: ${key}`);
}}

if (!encontrado) return m.reply(`❌ No existe un audio guardado con la frase: *${frase}*`);
} else {
if (scope === 'global' && !isOwner) return m.reply('🚫 Solo los owners pueden eliminar audios globales.');
delete audios[scope][frase];
fs.writeFileSync(audiosPath, JSON.stringify(audios, null, 2));
await import(pathToFileURL(audiosPath) + `?update=${Date.now()}`, { assert: { type: "json" }});
return m.reply(`🗑️ Audio *${frase}* eliminado correctamente de ${isOwner ? 'global' : 'este grupo/chat'}`);
}}

const url = resto.join('-')?.trim() || null;
let githubRawUrl = null;

if (url?.startsWith('http')) {
githubRawUrl = url;
} else if (m.quoted?.message?.audioMessage) {
try {
const audioMsg = m.quoted.message.audioMessage;
const stream = await downloadContentFromMessage(audioMsg, 'audio');
let buffer = Buffer.from([]);
for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

const hash = crypto.createHash('md5').update(buffer).digest('hex').slice(0, 10);
const fileName = `media/audio_${hash}.opus`;
const base64 = buffer.toString('base64');
const githubApiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${fileName}`;

let sha = null;
const check = await fetch(githubApiUrl, { method: 'GET', headers: { Authorization: `token ${GITHUB_TOKEN}` }});
if (check.status === 200) {
const existing = await check.json();
sha = existing.sha;
}

const res = await fetch(githubApiUrl, {
method: 'PUT',
headers: { Authorization: `token ${GITHUB_TOKEN}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({
message: `add ${fileName}`,
content: base64,
branch: GITHUB_BRANCH,
...(sha && { sha })
})
});

const data = await res.json();
if (!data.content?.download_url) {
console.error('[❌] Error al subir audio a GitHub:', data);
return m.reply('❌ Error al subir audio.');
}

githubRawUrl = data.content.download_url;
} catch (e) {
console.error('[❌] Error al procesar audio citado:', e);
return m.reply('❌ No se pudo procesar el audio, por favor respondar a un audios nota de voz.');
}} else {
return m.reply('❌ Responde a un audio o usa una URL válida.');
}

for (const frase of frases) {
const regex = `(${frase})`;

if (!audios[scope][frase]) {
audios[scope][frase] = { regex,
audio: githubRawUrl };
} else {
const actual = audios[scope][frase];
if (actual.audio && actual.audio !== githubRawUrl) {
audios[scope][frase] = { regex,
audios: [actual.audio, githubRawUrl] };
} else if (actual.audios) {
if (!actual.audios.includes(githubRawUrl)) actual.audios.push(githubRawUrl);
}}
}

fs.writeFileSync(audiosPath, JSON.stringify(audios, null, 2));
await import(pathToFileURL(audiosPath) + `?update=${Date.now()}`, { assert: { type: "json" }});
return m.reply(`✅ Audio guardado:\n📌 Frases: ${frases.join(', ')}\n🌐 Enlace: ${githubRawUrl}`);
};
handler.help = ['addaudios', 'delaudios'];
handler.tags = ['main'];
handler.command = /^(addaudios|delaudios)$/i;
handler.register = true;
export default handler;

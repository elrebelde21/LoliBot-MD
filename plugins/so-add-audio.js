import fs from 'fs';
import path from 'path';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

const audiosPath = path.resolve('./src/audios.json');
let audios = {};
if (fs.existsSync(audiosPath)) audios = JSON.parse(fs.readFileSync(audiosPath));

const handler = async (m, { conn, text, isOwner, isAdmin, command }) => {
const chatId = m.chat;
const isGroup = chatId.endsWith('@g.us');
const scope = isOwner ? 'global' : chatId;

if (!audios[scope]) audios[scope] = {};

const [fraseRaw, ...resto] = text.split('-');
const frase = fraseRaw?.trim()?.toLowerCase();
const url = resto.join('-')?.trim() || null;
if (!frase) return m.reply(`✳️ *Usa:*\n.addaudios frase\n.addaudios frase - url\n📌 Ej: *.addaudios ara ara*\n\n.delaudios frase\n📌 Ej: *.delaudios ara ara*`);
if (!isOwner && isGroup && !isAdmin) return m.reply('🚫 Solo admins pueden usar este comando en este grupo');

if (command === 'addaudios') {
const regex = `(${frase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`;
const entry = { regex, audio: null };

if (url && url.startsWith('http')) {
entry.audio = url;
} else if (m.quoted?.message?.audioMessage) {
try {
const audioMsg = m.quoted.message.audioMessage;
const stream = await downloadContentFromMessage(audioMsg, 'audio');
let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
const mime = audioMsg.mimetype || 'audio/mpeg';
entry.audio = `data:${mime};base64,${buffer.toString('base64')}`;
} catch (e) {
console.error('[❌] Error al descargar audio citado:', e);
}} else {
return m.reply('❌ Responde a un audio o agrega una URL válida.');
}

audios[scope][frase] = entry;
const ordenado = Object.keys(audios[scope]).sort().reduce((acc, k) => {
acc[k] = audios[scope][k];
return acc;
}, {});
audios[scope] = ordenado;

fs.writeFileSync(audiosPath, JSON.stringify(audios, null, 2));
return m.reply(`✅ Audio guardado *${frase}* ${isOwner ? 'global en el bot' : 'local (en este grupo)'}`);
}

if (command === 'delaudios') {
if (!audios[scope][frase]) return m.reply(`❌ No existe un audio guardado con la frase: *${frase}*`);
if (scope === 'global' && !isOwner) return m.reply('🚫 Solo los owners pueden eliminar audios globales.');
delete audios[scope][frase];
fs.writeFileSync(audiosPath, JSON.stringify(audios, null, 2));
return m.reply(`🗑️ Audio *${frase}* eliminado correctamente de ${isOwner ? 'global' : 'este grupo/chat'}`);
}
};
handler.help = ['addaudios', 'delaudios']
handler.tags = ['main']
handler.command = /^(addaudios|delaudios)$/i;
export default handler;

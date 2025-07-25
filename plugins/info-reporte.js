//Código elaborado por: https://github.com/elrebelde21 

/*FUNCIONA PERO NO COMO QUIERO LUEGO LOS ARREGLOS :v
import { webp2png } from '../lib/webp2mp4.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import axios from 'axios';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OWNER1 = "5214774444444@s.whatsapp.net";
const ACTIVE_CONVERSATIONS = {};
const MAX_VIDEO_SIZE_MB = 60; // Límite de 60MB para videos

let handler = async (m, { conn, text, args, command, usedPrefix }) => {
let media = false;
let q = m.quoted ? m.quoted : m;
let mime = (q.msg || q).mimetype || '';
let url = '';

if (/image|video|audio/.test(mime)) {
media = await q.download();

if (/video/.test(mime)) {
let videoPath = join(__dirname, `./temp_video_${new Date().getTime()}.mp4`);
fs.writeFileSync(videoPath, media);

let videoStats = fs.statSync(videoPath);
let videoSizeMB = videoStats.size / (1024 * 1024);
if (videoSizeMB > MAX_VIDEO_SIZE_MB) {
fs.unlinkSync(videoPath);
return m.reply(`*⚠️ El video excede el tamaño permitido (max 60 MB). Por favor, recórtalo, comprime o envía uno más ligero.*`);
}
url = videoPath;
} else {
url = await uploadImage(media);
}} else if (/webp/.test(mime)) {
media = await q.download();
url = await webp2png(media);
}

let activeConversation = Object.entries(ACTIVE_CONVERSATIONS).find(([id, convo]) => convo.active && convo.userId === m.sender && convo.chatId === m.chat);

if (activeConversation) {
let [reportId] = activeConversation;
let message = `📩 *Mensaje del usuario @${m.sender.split("@")[0]} (ID: ${reportId}):*\n${text || ''}`;

if (url) {
if (/image/.test(mime)) {
await conn.sendMessage(OWNER1, { image: { url }, caption: message, contextInfo: { mentionedJid: [m.sender] } }, { quoted: m });
} else if (/video/.test(mime)) {
await conn.sendMessage(OWNER1, { video: { url }, caption: message, contextInfo: { mentionedJid: [m.sender] } }, { quoted: m });
} else if (/audio/.test(mime)) {
await conn.sendMessage(OWNER1, { audio: { url }, mimetype: mime, caption: message, contextInfo: { mentionedJid: [m.sender] } }, { quoted: m });
}} else if (m.msg && m.msg.sticker) {
await conn.sendMessage(OWNER1, { sticker: media, contextInfo: { mentionedJid: [m.sender] } }, { quoted: m });
} else {
await conn.sendMessage(OWNER1, { text: message, mentions: [m.sender] }, { quoted: m });
}
return;
}

if (command === 'report' || command === 'reporte') {
if (!text && !m.quoted) return m.reply(`⚠️ 𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐞𝐥 𝐞𝐫𝐫𝐨𝐫/𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐜𝐨𝐧 𝐟𝐚𝐥𝐥𝐚\n\n*𝐄𝐣:* ${usedPrefix + command} los sticker no funka`);
if (text.length < 8) throw `${fg} ✨ *𝑴𝒊́𝒏𝒊𝒎𝒐 10 𝒄𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆...*`
if (text.length > 1000) throw `${fg} ⚠️ *𝑴𝒂́𝒙𝒊𝒎𝒐 1000 𝑪𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆.*`

let reportId = Math.floor(Math.random() * 901);

ACTIVE_CONVERSATIONS[reportId] = {
userId: m.sender,
userName: m.pushName || 'Usuario desconocido',
active: true,
chatId: m.chat,
url: url,
mime: mime,
};

let reportText = text || (m.quoted && m.quoted.text) || 'Sin mensaje';
let teks = `┏╼╾╼⧼⧼⧼ ＲＥＰＯＲＴＥ ⧽⧽⧽╼╼╼┓
╏• *ɴᴜᴍᴇʀᴏ:* Wa.me/${m.sender.split("@")[0]}
╏• *ᴍᴇɴsᴀᴊᴇ:* ${reportText}
┗╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼\n\nResponde al mensaje con:\n*"responder ${reportId} [mensaje]"* para interactuar.\nUsa *.fin ${reportId}* para finalizar la conversación.`

await conn.sendMessage(OWNER1, { text: teks, mentions: [m.sender] }, { quoted: m });
await delay(1000)
await conn.reply(m.chat, `*⚡ᴇʟ ʀᴇᴘᴏʀᴛᴇ ʜᴀ sɪᴅᴏ ᴇɴᴠɪᴀᴅᴏs ᴀ ᴍɪ ᴄʀᴇᴀᴅᴏʀ, ᴛᴇɴᴅʀᴀ ᴜɴᴀ ʀᴇsᴘᴜᴇsᴛᴀ ᴘʀᴏɴᴛᴏ, ᴅᴇ sᴇʀ ғᴀʟsᴏ sᴇʀᴀ ɪɢɴᴏʀᴀᴅᴏ ᴇʟ ʀᴇᴘᴏʀᴛᴇ*`);
return;
}};

handler.before = async (m, { conn }) => {
let activeConversation = Object.entries(ACTIVE_CONVERSATIONS).find(([id, convo]) => convo.active && convo.userId === m.sender && convo.chatId === m.chat);

if (activeConversation) {
let [reportId] = activeConversation;
let message2 = `*📩 Nueva respuesta del usuario @${m.sender.split("@")[0]} (ID: ${reportId}):*\n${m.text || ''}`;

if (m.mtype === 'stickerMessage') {
let sticker = await m.download();
if (sticker) {
await conn.sendMessage(OWNER1, { sticker }, { quoted: m });
} else {   
}} else if (m.mtype === 'imageMessage' || m.mtype === 'videoMessage' || m.mtype === 'audioMessage') {
let media = await m.download();
let url = await uploadImage(media);
if (url) {                      
await conn.sendMessage(OWNER1, { [m.mtype === 'videoMessage' ? 'video' : m.mtype === 'audioMessage' ? 'audio' : 'image']: { url }, caption: message2, contextInfo: { mentionedJid: [m.sender] }}, { quoted: m });
} else {
console.error('Error');
}} else {
await conn.sendMessage(OWNER1, { text: message2, mentions: [m.sender] }, { quoted: m });
}}

let matchResponder = m.text.match(/^responder (\S+) (.+)/i);
if (matchResponder) {
let [_, reportId, ownerMessage] = matchResponder;

if (!ACTIVE_CONVERSATIONS[reportId] || !ACTIVE_CONVERSATIONS[reportId].active) return
let { userId } = ACTIVE_CONVERSATIONS[reportId];
if (m.quoted) {
let quoted = m.quoted;
let mime = (quoted.msg || quoted).mimetype || '';
if (/image|video|audio|sticker/.test(mime)) {
let media = await quoted.download();
let url = await uploadImage(media);
if (/image/.test(mime)) {
await conn.sendMessage(userId, { image: { url }, caption: ownerMessage });
} else if (/video/.test(mime)) {
await conn.sendMessage(userId, { video: { url }, caption: ownerMessage });
} else if (/audio/.test(mime)) {
await conn.sendMessage(userId, { audio: { url }, mimetype: mime, caption: ownerMessage });
} else if (/sticker/.test(mime)) {
await conn.sendMessage(userId, { sticker: media });
}} else {
await conn.sendMessage(userId, { text: ownerMessage });
}} else {
await conn.sendMessage(userId, { text: `*• Respuesta del propietario:*\n${ownerMessage}` });
}
return;
}

if (m.quoted && m.quoted.text) {
let quotedTextMatch = m.quoted.text.match(/ID: (\d+)/);
if (quotedTextMatch) {
let reportId = quotedTextMatch[1];
if (ACTIVE_CONVERSATIONS[reportId] && ACTIVE_CONVERSATIONS[reportId].active) {
let { userId } = ACTIVE_CONVERSATIONS[reportId];
let ownerMessage = m.text || 'Sin mensaje';

if (/image|video|audio|sticker/.test(m.mtype)) {
let media = await m.download();
let url = await uploadImage(media);
if (/image/.test(m.mtype)) {
await conn.sendMessage(userId, { image: { url }, caption: ownerMessage });
} else if (/video/.test(m.mtype)) {
await conn.sendMessage(userId, { video: { url }, caption: ownerMessage });
} else if (/audio/.test(m.mtype)) {
await conn.sendMessage(userId, { audio: { url }, mimetype: m.mimetype });
} else if (/sticker/.test(m.mtype)) {
await conn.sendMessage(userId, { sticker: media });
}} else {
await conn.sendMessage(userId, { text: `*• Respuesta del propietario:*\n${ownerMessage}` });
}
return;
}}}

let matchFin = m.text.match(/^\.fin (\S+)/i);
if (matchFin) {
let [_, reportId] = matchFin;

if (!ACTIVE_CONVERSATIONS[reportId]) return await conn.reply(m.chat, `⚠️ No se encontró ninguna conversación activa con ese ID.`, m);        
let { userId } = ACTIVE_CONVERSATIONS[reportId];
ACTIVE_CONVERSATIONS[reportId].active = false;
await conn.reply(userId, `🔒 *La conversación ha sido cerrada por el propietario.*`);
await delay(1000)
await conn.reply(m.chat, `✔️ Conversación ${reportId} cerrada.`);
return;
}};
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['main']
handler.exp = 3500
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes|reportar)$/i 
handler.register = true 
handler.private = true
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

*/

import { db } from "../lib/postgres.js";

const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(`⚠️ Escriba ${command === "suggestion" ? "sugerencias" : "el error/comando con falla"}\n\n*𝐄𝐣:* ${usedPrefix + command} ${command === "suggestion" ? "Agregue un comando de ..." : "los sticker no funka"}`)
if (text.length < 8) return m.reply(`✨ *𝑴𝒊́𝒏𝒊𝒎𝒐 10 𝒄𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆...*`)
if (text.length > 1000) return m.reply(`⚠️ *𝑴𝒂́𝒙𝒊𝒎𝒐 1000 𝑪𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆.*`)
const nombre = m.pushName || "sin nombre";
const tipo = /sugge|suggestion/i.test(command) ? "sugerencia" : "reporte";

await db.query(`INSERT INTO reportes (sender_id, sender_name, mensaje, tipo) VALUES ($1, $2, $3, $4)`, [m.sender, nombre, text, tipo]);
return m.reply(tipo === "sugerencia" ? "✅ ¡Gracias! Tu sugerencia ha sido enviada a nuestro equipo de moderación y será tomada en cuenta." : "✅ Tu reporte ha sido enviado a nuestro equipo de moderación y será revisado pronto.");
};
handler.help = ["report <texto>", "sugge <sugerencia>"];
handler.tags = ["main"];
handler.command = /^(report|request|suggestion|sugge|reporte|bugs?|report-owner|reportes|reportar)$/i;
handler.register = true;

export default handler;

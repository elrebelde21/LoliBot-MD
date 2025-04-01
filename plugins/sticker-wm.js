import {addExif} from '../lib/sticker.js';
const handler = async (m, {conn, text}) => {
if (!m.quoted) return m.reply(`⚠️ ${await tr("RESPONDE AL STICKER QUE DESEA AGREGA UN PAQUETE Y UN NOMBRE")}`) 

let stiker = false;
try {
let [packname, ...author] = text.split('|');
author = (author || []).join('|');
const mime = m.quoted.mimetype || '';
if (!/webp/.test(mime)) return m.reply(`⚠️ ${await tr("RESPONDE AL STICKER QUE DESEA AGREGA UN PAQUETE Y UN NOMBRE")}`) 
const img = await m.quoted.download();
if (!img) return m.reply(`⚠️ ${await tr("RESPONDE AL STICKER QUE DESEA AGREGA UN PAQUETE Y UN NOMBRE")}`) 
stiker = await addExif(img, packname || global.packname, author || global.author);
} catch (e) {
console.error(e);
if (Buffer.isBuffer(e)) stiker = e;
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: ``, mediaType: 2, sourceUrl: redes.getRandom(), thumbnail: img.getRandom()}}}, { quoted: m })
else return m.reply(`⚠️ ${await tr("RESPONDE AL STICKER QUE DESEA AGREGA UN PAQUETE Y UN NOMBRE")}`) 
}}
handler.help = ['wm <packname>|<author>'];
handler.tags = ['sticker'];
handler.command = /^take|robar|wm$/i;
handler.register = true
export default handler;

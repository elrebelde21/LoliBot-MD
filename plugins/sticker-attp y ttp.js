import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
import { db } from '../lib/postgres.js';
let handler = async(m, { conn, text, args, usedPrefix, command }) => {
const userResult = await db.query('SELECT sticker_packname, sticker_author FROM usuarios WHERE id = $1', [m.sender]);
const user = userResult.rows[0] || {};
let f = user.sticker_packname || global.info.packname;
let g = (user.sticker_packname && user.sticker_author ? user.sticker_author : (user.sticker_packname && !user.sticker_author ? '' : global.info.author));
if (!text) return m.reply(`⚠️ 𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙚𝙡 𝙩𝙚𝙭𝙩𝙤 𝙨𝙚 𝙘𝙤𝙣𝙫𝙞𝙚𝙧𝙩𝙖 𝙚𝙡 𝙨𝙩𝙞𝙘𝙠𝙚𝙧\n𝙀𝙟𝙚𝙢𝙥𝙡𝙤\n*${usedPrefix + command}* Nuevo Sticker`)
let teks = encodeURI(text)
conn.fakeReply(m.chat, `Calma crack estoy haciendo tu texto a sticker 👏\n\n> *Esto puede demorar unos minutos*`, '0@s.whatsapp.net', `No haga spam gil`, 'status@broadcast')

if (command == 'attp') {
let stiker = await sticker(null,`${info.fgmods.url}/maker/attp?text=${teks}&apikey=${info.fgmods.key}`, f, g)
conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: info.wm, body: info.vs, mediaType: 2, sourceUrl: info.md, thumbnail: m.pp}}}, { quoted: m })}

if (command == 'ttp' || command == 'brat') {
let stiker = await sticker(null,`https://api.dorratz.com/v3/text-image?text=${teks}&fontSize=50`, f, g)
conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: info.wm, body: info.vs, mediaType: 2, sourceUrl: info.md, thumbnail: m.pp}}}, { quoted: m })
}
}
handler.help = ['attp'];
handler.tags = ['sticker']
handler.command = /^(attp|ttp|ttp2|ttp3|ttp4|attp2|brat)$/i
handler.register = true
export default handler
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
if (text.length > 40) return m.reply(`⚠️ El texto no puede tener más de 40 caracteres.\n\n✍️ Intenta con algo más corto.`)
const teks = encodeURIComponent(text)
const url = `https://api.delirius.store/canvas/attp?text=${teks}`
let stiker = await sticker(null, url, f, g)
conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: info.wm, body: info.vs, mediaType: 2, sourceUrl: null, thumbnail: m.pp}}}, { quoted: m })
}

if (command == 'ttp' || command == 'brat') {
if (!text) return m.reply(`✍️ Escribe un texto.`)
if (text.length > 300) return m.reply(`⚠️ El texto no puede tener más de 300 caracteres.`)
const teks = encodeURIComponent(text)
try {
const url = `https://api.delirius.store/canvas/brat?text=${teks}`
let stiker = await sticker(null, url, f, g)
await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { 
contextInfo: { 
forwardingScore: 200,
isForwarded: false,
externalAdReply: {
showAdAttribution: false,
title: info.wm,
body: info.vs,
mediaType: 2,
sourceUrl: null,
thumbnail: m.pp
}}})
} catch {
try {
let res = await fetch(`https://api.mitzuki.xyz/maker/brat?size=512&text=${teks}&apikey=elrebelde21`)
let json = await res.json()
if (!json.status) return m.reply('Ufff la puta api se cayó 😒 intenta más tarde')
let stiker = await sticker(null, json.data.image_url, f, g)
await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
contextInfo: {
forwardingScore: 200,
isForwarded: false,
externalAdReply: {
showAdAttribution: false,
title: info.wm,
body: info.vs,
mediaType: 2,
sourceUrl: null,
thumbnail: m.pp
}}})
} catch (e) {
return m.reply('❌ Error creando sticker brat.')
}}
}


if (command == 'brat2' || command == 'bratvid') {
if (text.length > 250) return m.reply(`⚠️ El texto no puede tener más de 250 caracteres.\n\n✍️ Intenta con algo más corto.`)
const teks = encodeURIComponent(text)
try {
const url = `https://api.delirius.store/canvas/bratvideo?text=${teks}`
let stiker = await sticker(null, url, f, g)
await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { 
contextInfo: { 
forwardingScore: 200,
isForwarded: false,
externalAdReply: {
showAdAttribution: false,
title: info.wm,
body: info.vs,
mediaType: 2,
sourceUrl: null,
thumbnail: m.pp
}}})
} catch {
try {
let res = await fetch(`https://api.mitzuki.xyz/maker/brat?size=512&text=${teks}&apikey=elrebelde21`)
let json = await res.json()
if (!json.status) return m.reply('Ufff la puta api se cayó 😒 intenta más tarde')
let stiker = await sticker(null, json.data.image_url, f, g)
await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
contextInfo: {
forwardingScore: 200,
isForwarded: false,
externalAdReply: {
showAdAttribution: false,
title: info.wm,
body: info.vs,
mediaType: 2,
sourceUrl: null,
thumbnail: m.pp
}}})
} catch (e) {
return m.reply('❌ Error creando sticker brat.')
}}
}
}
handler.help = ['attp', 'brat', 'bratvid'];
handler.tags = ['sticker']
handler.command = /^(attp|ttp|ttp2|ttp3|ttp4|attp2|brat|brat2|bratvid)$/i
handler.register = true
export default handler

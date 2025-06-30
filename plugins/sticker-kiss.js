import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
try {
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if (!m.mentionedJid.length) m.mentionedJid.push(m.sender)

let getName = async (jid) => {
let name = await conn.getName(jid).catch(() => null)
return name || `+${jid.split('@')[0]}`
}

let senderName = await getName(m.sender)
let mentionedNames = await Promise.all(m.mentionedJid.map(getName))
let res = await fetch('https://nekos.life/api/kiss')
let json = await res.json()
let { url } = json
let texto = `💋 ${senderName} está besando a ${mentionedNames.join(', ')}`
try {
let stickerMessage = await sticker(null, url, texto)
await conn.sendFile(m.chat, stickerMessage, 'sticker.webp', '', m, true, { contextInfo: { forwardingScore: 200, isForwarded: false, externalAdReply: { showAdAttribution: false, title: texto, body: info.wm, mediaType: 2, sourceUrl: info.md, thumbnail: m.pp }}}, { quoted: m })
} catch (err) {
await conn.sendMessage(m.chat, { video: { url: url }, gifPlayback: true, caption: texto, mentions: m.mentionedJid }, { quoted: m })
}} catch (e) {
console.error(e)
}}
handler.help = ['kiss']
handler.tags = ['sticker']
handler.command = /^(kiss|skiss|kis|besos|beso|besar|besando)$/i
handler.register = true

export default handler

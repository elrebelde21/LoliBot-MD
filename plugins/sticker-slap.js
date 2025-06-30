import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'

const slapGifs = [
  'https://media.tenor.com/XiYuU9h44-AAAAAC/anime-slap-mad.gif',
  'https://img.photobucket.com/albums/v639/aoie_emesai/100handslap.gif',
  'https://gifdb.com/images/high/yuruyuri-akari-kyoko-anime-slap-fcacgc0edqhci6eh.gif',
  'https://gifdb.com/images/file/anime-sibling-slap-ptjipasdw3i3hsb0.gif',
  'https://c.tenor.com/Lc7C5mLIVIQAAAAC/tenor.gif',
  'https://i.pinimg.com/originals/71/a5/1c/71a51cd5b7a3e372522b5011bdf40102.gif'
]

let handler = async (m, { conn }) => {
try {
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if (!m.mentionedJid.length) m.mentionedJid.push(m.sender)

const getName = async jid => (await conn.getName(jid).catch(() => null)) || `+${jid.split('@')[0]}`
const senderName = await getName(m.sender)
const mentionedNames = await Promise.all(m.mentionedJid.map(getName))
const texto = `🖐 ${senderName} le dio una bofetada a ${mentionedNames.join(', ')}`
const url = slapGifs[Math.floor(Math.random() * slapGifs.length)]

let stiker
try {
stiker = await sticker(null, url, texto)
} catch (e) {
console.error('⚠️ Error generando sticker:', e)
}

if (stiker) {
await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { contextInfo: { forwardingScore: 200, isForwarded: false, externalAdReply: { showAdAttribution: false, title: texto, body: info.wm, mediaType: 2, sourceUrl: info.md, thumbnail: m.pp }}}, { quoted: m })
return
}

const gifBuffer = await fetch(url).then(r => r.buffer())
await conn.sendMessage(m.chat, { video: gifBuffer, gifPlayback: true, caption: texto, mentions: m.mentionedJid }, { quoted: m })
} catch (e) {
console.error(e)
m.react("❌️")
}}
handler.help = ['slap']
handler.tags = ['sticker']
handler.command = /^(slap|bofetada|manotada|abofetear|golpear)$/i
handler.register = true

export default handler

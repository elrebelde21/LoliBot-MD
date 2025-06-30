import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
try {
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if (!m.mentionedJid.length) m.mentionedJid.push(m.sender)

const getName = async jid => (await conn.getName(jid).catch(() => null)) || `+${jid.split('@')[0]}`
const senderName = await getName(m.sender)
const mentionedNames = await Promise.all(m.mentionedJid.map(getName))
const texto = `🔪 *${senderName}* asesinó fríamente a *${mentionedNames.join(', ')}* 😵`
const { url } = await fetch('https://api.waifu.pics/sfw/kill').then(r => r.json())

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
handler.help = ['kill']
handler.tags = ['sticker']
handler.command = /^(kill|asesinar|matar|slay|stab)$/i
handler.register = true

export default handler

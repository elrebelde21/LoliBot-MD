import { toPTT } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) throw `${mg}𝑹𝒆𝒔𝒑𝒐𝒏𝒅𝒆 𝒂 𝒖𝒏 𝒗𝒊́𝒅𝒆𝒐 𝒐 𝒂𝒖𝒅𝒊𝒐 𝒑𝒂𝒓𝒂 𝒄𝒐𝒏𝒗𝒆𝒓𝒕𝒊𝒓 𝒂 𝒏𝒐𝒕𝒂 𝒅𝒆 𝒗𝒐𝒛`
let media = await q.download?.()
if (!media && !/video/.test(mime)) throw `𝑰𝒏𝒕𝒆𝒏𝒕𝒆́ 𝒅𝒆 𝒏𝒖𝒆𝒗𝒐 𝒎𝒂́𝒔 𝒕𝒂𝒓𝒅𝒆`
if (!media && !/audio/.test(mime)) throw `}𝑰𝒏𝒕𝒆𝒏𝒕𝒆́ 𝒅𝒆 𝒏𝒖𝒆𝒗𝒐 𝒎𝒂́𝒔 𝒕𝒂𝒓𝒅𝒆`
let audio = await toPTT(media, 'mp4')
if (!audio.data && !/audio/.test(mime)) throw `𝑰𝒏𝒕𝒆𝒏𝒕𝒆́ 𝒅𝒆 𝒏𝒖𝒆𝒗𝒐 𝒎𝒂́𝒔 𝒕𝒂𝒓𝒅𝒆.`
if (!audio.data && !/video/.test(mime)) throw `𝑰𝒏𝒕𝒆𝒏𝒕𝒆́ 𝒅𝒆 𝒏𝒖𝒆𝒗𝒐 𝒎𝒂́𝒔 𝒕𝒂𝒓𝒅𝒆`
conn.sendFile(m.chat, audio.data, 'error.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
handler.help = ['tovn (reply)']
handler.tags = ['audio']
handler.command = /^tovn|vn|ptt$/i
handler.register = true
export default handler

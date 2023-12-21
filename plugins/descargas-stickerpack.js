/* By https://github.com/ALBERTO9883/NyanCatBot-MD */
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*⚠️ Ej: ${usedPrefix + command}* https://getstickerpack.com/stickers/flork-memes-4-1`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}})
 
try {
let url = text
let res = await fetch(`https://api.akuari.my.id/downloader/stickerpack?link=${url}`)
let json = await res.json()
for (let data of (json.result || json)) {
const stikers = await sticker(false, data, global.packname, global.author)
conn.sendFile(m.chat, stikers, null, { asSticker: true }, m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': true }}, { quoted: m })
await delay(5000)
}} catch {   
await conn.reply(m.chat, `⚠️ 𝐄𝐫𝐫𝐨𝐫, 𝐩𝐨𝐫 𝐟𝐚𝐯𝐨𝐫 𝐯𝐮𝐞𝐥𝐯𝐚 𝐚 𝐢𝐧𝐭𝐞𝐧𝐭𝐚𝐫`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}})
}}
handler.command = /^stickerpack$/i
handler.limit = 1
handler.register = true
export default handler
const delay = time => new Promise(res => setTimeout(res, time))

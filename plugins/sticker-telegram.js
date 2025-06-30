import fetch from "node-fetch"
import { db } from '../lib/postgres.js';
import { sticker } from '../lib/sticker.js'
let handler = async (m, { conn, args, usedPrefix, command }) => {
const userResult = await db.query('SELECT sticker_packname, sticker_author FROM usuarios WHERE id = $1', [m.sender]);
const user = userResult.rows[0] || {};
let f = user.sticker_packname || global.info.packname;
let g = (user.sticker_packname && user.sticker_author ? user.sticker_author : (user.sticker_packname && !user.sticker_author ? '' : global.info.author));
if (!args[0]) throw `⚠️ 𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙏𝙀𝙇𝙀𝙂𝙍𝘼𝙈\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊:\n${usedPrefix + command} https://t.me/addstickers/Porcientoreal`
if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `⚠️ 𝙇𝘼 𝙐𝙍𝙇 𝙀𝙎 𝙄𝙉𝘾𝙊𝙍𝙍𝙀𝘾𝙏𝘼\n𝙏𝙃𝙀 𝙐𝙍𝙇 𝙄𝙎 𝙄𝙉𝘾𝙊𝙍𝙍𝙀𝘾𝙏`
let packName = args[0].replace("https://t.me/addstickers/", "")
let gas = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, { method: "GET", headers: { "User-Agent": "GoogleBot" } })
if (!gas.ok) throw eror
let json = await gas.json()
m.reply(`✔️ *𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙏𝙊𝙏𝘼𝙇𝙀𝙎:* ${json.result.stickers.length}\n*𝙀𝙉𝙑𝙄𝘼𝘿𝙊 𝙀𝙇:* ${json.result.stickers.length * 1.5} Segundos`.trim())
for (let i = 0; i < json.result.stickers.length; i++) {
let fileId = json.result.stickers[i].thumb.file_id
let gasIn = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
let jisin = await gasIn.json()
let stiker = await sticker(false, "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + jisin.result.file_path, f, g)
await conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: info.wm, body: `🍫 PACK DE STICKERS`, mediaType: 2, sourceUrl: info.nna, thumbnail: m.pp}}}, { quoted: m })
await delay(3000)
}
throw `⚠️ ERROR QUE PASO? NOSE TU SABES? INFORMARLE A MI CREATOR PARA QUE LOS ARREGLE EN VAGO ESE JJJJ`
}
handler.help = ['stikertele *<url>*']
handler.tags = ['sticker', 'downloader']
handler.command = /^(stic?kertele(gram)?)$/i
handler.limit = 1
handler.register = true
export default handler

const delay = time => new Promise(res => setTimeout(res, time))

import { pinterest } from '@bochilteam/scraper'
let handler = async(m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*⚠️ 𝙌𝙪𝙚 𝙚𝙨𝙩𝙖 𝙗𝙪𝙨𝙘𝙖𝙙𝙤?*\n𝙐𝙨𝙖𝙧 𝙙𝙚 𝙡𝙖 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙢𝙖𝙣𝙚𝙧𝙖\n𝙀𝙟 : ${usedPrefix + command} Loli` , m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: iig,  body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', previewType: 0, thumbnail: img.getRandom(), sourceUrl: loli.getRandom()}}})
try {
const json = await pinterest(text)
await conn.sendFile(m.chat, json.getRandom(), 'lp.jpg', `✨ *Resultados de:* ${text}`, m, false, { contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: text, body: wm, previewType: 0, thumbnail: img.getRandom(), sourceUrl: loli.getRandom()}}})
handler.money = 100
} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)
handler.money = false
}}
handler.help = ['pinterest <keyword>']
handler.tags = ['internet']
handler.command = /^(pinterest|dlpinterest|pinterestdl)$/i
//handler.money = 100
handler.register = true
handler.level = 0
export default handler

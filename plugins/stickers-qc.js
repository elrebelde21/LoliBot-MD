import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, {conn, args, usedPrefix, command}) => {
let text
if (args.length >= 1) {
text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
text = m.quoted.text
} else throw "╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝘼𝙂𝙍𝙀𝙂𝙐𝙀́ 𝙐𝙉 𝙏𝙀𝙓𝙏𝙊 𝙋𝘼𝙍𝘼 𝘾𝙍𝙀𝘼𝙍 𝙀𝙇 𝙎𝙏𝙄𝘾𝙆𝙀𝙍"
if (!text) return m.reply('𝙔 𝙀𝙇 𝙏𝙀𝙓𝙏𝙊?')
if (text.length > 30) return m.reply('𝙈𝘼𝙓𝙄𝙈𝙊 30 𝙋𝘼𝙇𝘼𝘽𝙍𝘼𝙎!')
try {
let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg')

const obj = {"type": "quote", "format": "png", "backgroundColor": "#000000", "width": 512, "height": 768, "scale": 2, "messages": [{"entities": [], "avatar": true, "from": {"id": 1, "name": m.name, "photo": {"url": pp}}, "text": text, "replyMessage": {}}]}
const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {headers: {'Content-Type': 'application/json'}})
const buffer = Buffer.from(json.data.result.image, 'base64')
let stiker = await sticker(buffer, false, global.packname, global.author)
if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: `h`, mediaType: 2, sourceUrl: [nna, nn, md, yt].getRandom(), thumbnail: imagen4}}}, { quoted: m })
//conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}
handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(qc)$/i
handler.register = true
export default handler
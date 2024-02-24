import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let user = global.db.data.users[m.sender]
if (!text) return conn.reply(m.chat, `𝗤𝘂𝗲 𝗯𝘂𝘀𝗰𝗮𝗿? 🤔️ 𝙪𝘀𝙖𝙧 𝙙𝙚 𝙡𝙖 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙢𝙖𝙣𝙚𝙧𝙖\n• 𝗘𝗷𝗲𝗺𝗽𝗹𝗼\n*${usedPrefix + command} Loli*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: iig, body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
if (m.text.includes('gore') || m.text.includes('cp')|| m.text.includes('porno')|| m.text.includes('Gore')|| m.text.includes('rule')|| m.text.includes('CP') || m.text.includes('Rule34') || m.text.includes('xxx')) throw '🙄'
try {
const res = await googleImage(text)
let image = res.getRandom()
let link = image
await delay(1000) 
conn.sendFile(m.chat, link, 'error.jpg', `*✨ 𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤: ${text}*`, m, false, { contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
handler.money = 40
} catch (e) {
console.log(e)
handler.money = false
}}
handler.help = ['gimage <query>', 'imagen <query>']
handler.tags = ['internet', 'tools']
handler.command = /^(gimage|image|imagen)$/i
handler.exp = 0
//handler.money = 40
export default handler
const delay = time => new Promise(res => setTimeout(res, time))

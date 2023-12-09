import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let user = global.db.data.users[m.sender]
if (!text) throw `𝗤𝘂𝗲 𝗯𝘂𝘀𝗰𝗮𝗿? 🤔️\n𝗨𝘀𝗲𝗿 𝙙𝙚 𝙡𝙖 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙢𝙖𝙣𝙚𝙧𝙖\n𝗘𝗷𝗲𝗺𝗽𝗹𝗼\n*${usedPrefix + command} Loli*`
if (m.text.includes('gore') || m.text.includes('cp')|| m.text.includes('porno')|| m.text.includes('Gore')|| m.text.includes('rule')|| m.text.includes('CP') || m.text.includes('Rule34') || m.text.includes('xxx')) return m.reply('🙄')
const res = await googleImage(text)
let image = res.getRandom()
let link = image
await delay(1000)
conn.sendFile(m.chat, link, 'error.jpg', `*✨ 𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤: ${text}*`, m)}
handler.help = ['gimage <query>', 'imagen <query>']
handler.tags = ['internet', 'tools']
handler.command = /^(gimage|image|imagen)$/i
handler.exp = 20
handler.money = 40
export default handler
const delay = time => new Promise(res => setTimeout(res, time))

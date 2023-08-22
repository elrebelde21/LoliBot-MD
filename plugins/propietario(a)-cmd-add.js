let handler = async (m, { conn, text, usedPrefix, command }) => {
global.db.data.sticker = global.db.data.sticker || {}
if (!m.quoted) throw '*[❗𝙄𝙣𝙛𝙤❗] 𝙍𝙚𝙨𝙥𝙤𝙣𝙙𝙚 𝙖𝙡 𝙨𝙩𝙞𝙘𝙠𝙚𝙧 𝙤 𝙞𝙢𝙖𝙜𝙚𝙣 𝙖𝙡 𝙘𝙪𝙖𝙡 𝙦𝙪𝙞𝙚𝙧𝙚 𝙖𝙜𝙧𝙚𝙜𝙖 𝙪𝙣 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 𝙤 𝙩𝙚𝙭𝙩𝙤*'
if (!m.quoted.fileSha256) throw '*[❗𝙄𝙣𝙛𝙤❗] 𝑺𝒐𝒍𝒐 𝒑𝒖𝒆𝒅𝒆𝒔 𝒂𝒔𝒊𝒈𝒂𝒏𝒂𝒓 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒐 𝒕𝒆𝒙𝒕𝒐𝒔 𝒂 𝒔𝒕𝒊𝒄𝒌𝒆𝒓 𝒆 𝒊𝒎𝒂𝒈𝒆𝒏*'
if (!text) throw `*[❗𝙄𝙣𝙛𝙤❗] 𝑬𝒓𝒓𝒐𝒓, 𝒍𝒐𝒔 𝒖𝒔𝒂𝒔𝒕𝒆 𝒎𝒂𝒍,\n 𝒖𝒔𝒂 𝒅𝒆 𝒆𝒔𝒕𝒂 𝒎𝒂𝒏𝒆𝒓𝒂:*\n*—◉ ${usedPrefix + command} <texto> <responder a sticker o imagen>*\n\n*𝙀𝙟𝙚𝙢𝙥𝙡𝙤:*\n*—◉ ${usedPrefix + command} <#menu> <responder a sticker o imagen>*`
let sticker = global.db.data.sticker
let hash = m.quoted.fileSha256.toString('base64')
if (sticker[hash] && sticker[hash].locked) throw '*[❗𝙄𝙣𝙛𝙤❗] 𝑺𝒐𝒍𝒐 𝒆𝒍 𝒐𝒘𝒏𝒆𝒓 𝒑𝒖𝒆𝒅𝒆 𝒓𝒆𝒂𝒍𝒊𝒛𝒂𝒓 𝒆𝒔𝒕𝒂 𝒎𝒐𝒅𝒊𝒇𝒊𝒄𝒂𝒄𝒊𝒐́𝒏*'
sticker[hash] = { text, mentionedJid: m.mentionedJid, creator: m.sender, at: + new Date, locked: false }
m.reply(`*[ ✔ ] 𝑬𝒍 𝒕𝒆𝒙𝒕𝒐/𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒂𝒔𝒊𝒈𝒏𝒂𝒅𝒐 𝒂𝒍 𝒔𝒕𝒊𝒄𝒌𝒆𝒓 𝒆 𝒊𝒎𝒂𝒈𝒆𝒏 𝒇𝒖𝒆 𝒂𝒈𝒓𝒆𝒈𝒂𝒅𝒐 𝒂 𝒍𝒂 𝒃𝒂𝒔𝒆 𝒅𝒆 𝒅𝒂𝒕𝒐𝒔 𝒄𝒐𝒓𝒓𝒆𝒄𝒕𝒂𝒎𝒆𝒏𝒕𝒆*`)
}
handler.command = ['setcmd', 'addcmd', 'cmdadd', 'cmdset']
handler.rowner = true
export default handler

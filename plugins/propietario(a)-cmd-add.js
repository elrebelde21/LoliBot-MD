let handler = async (m, { conn, text, usedPrefix, command }) => {
global.db.data.sticker = global.db.data.sticker || {}
if (!m.quoted) throw '*⚠️ 𝙍𝙚𝙨𝙥𝙤𝙣𝙙𝙚 𝙖𝙡 𝙨𝙩𝙞𝙘𝙠𝙚𝙧 𝙤 𝙞𝙢𝙖𝙜𝙚𝙣 𝙖𝙡 𝙘𝙪𝙖𝙡 𝙦𝙪𝙞𝙚𝙧𝙚 𝙖𝙜𝙧𝙚𝙜𝙖 𝙪𝙣 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 𝙤 𝙩𝙚𝙭𝙩𝙤*'
if (!m.quoted.fileSha256) throw '⚠️ 𝐒𝐨𝐥𝐨 𝐩𝐮𝐞𝐝𝐞𝐬 𝐚𝐬𝐢𝐠𝐚𝐧𝐚𝐫 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐨 𝐭𝐞𝐱𝐭𝐨𝐬 𝐚 𝐬𝐭𝐢𝐜𝐤𝐞𝐫𝐬 𝐞 𝐢𝐦𝐚𝐠𝐞𝐧*'
if (!text) throw '*⚠️ 𝙍𝙚𝙨𝙥𝙤𝙣𝙙𝙚 𝙖𝙡 𝙨𝙩𝙞𝙘𝙠𝙚𝙧 𝙤 𝙞𝙢𝙖𝙜𝙚𝙣 𝙖𝙡 𝙘𝙪𝙖𝙡 𝙦𝙪𝙞𝙚𝙧𝙚 𝙖𝙜𝙧𝙚𝙜𝙖 𝙪𝙣 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 𝙤 𝙩𝙚𝙭𝙩𝙤*'
let sticker = global.db.data.sticker
let hash = m.quoted.fileSha256.toString('base64')
if (sticker[hash] && sticker[hash].locked) throw '*⚠️ 𝐒𝐨𝐥𝐨 𝐞𝐥 𝐨𝐰𝐧𝐞𝐫 𝐩𝐮𝐞𝐝𝐞 𝐫𝐞𝐚𝐥𝐢𝐳𝐚𝐫 𝐞𝐬𝐭𝐚 𝐦𝐨𝐝𝐢𝐟𝐢𝐜𝐚𝐜𝐢𝐨́𝐧*'
sticker[hash] = { text, mentionedJid: m.mentionedJid, creator: m.sender, at: + new Date, locked: false }
m.reply(`*[ ✔ ] 𝐄𝐥 𝐓𝐞𝐱𝐭𝐨/𝐂𝐨𝐦𝐚𝐧𝐝𝐨 𝐚𝐬𝐢𝐠𝐧𝐚𝐝𝐨 𝐚𝐥 𝐬𝐭𝐢𝐜𝐤𝐞𝐫𝐬 𝐞 𝐢𝐦𝐚𝐠𝐞𝐧 𝐟𝐮𝐞 𝐚𝐠𝐫𝐞𝐠𝐚𝐝𝐨 𝐚 𝐥𝐚 𝐛𝐚𝐬𝐞 𝐝𝐞 𝐝𝐚𝐭𝐨𝐬 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞*`)
}
handler.command = ['setcmd', 'addcmd', 'cmdadd', 'cmdset']
handler.rowner = true
export default handler

let handler = async (m, { conn, text}) => {
if (!text) throw '𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡𝙜𝙪𝙣 𝙪𝙨𝙪𝙖𝙧𝙞𝙤𝙨 𝙥𝙖𝙧𝙖 𝙙𝙚𝙨𝙗𝙖𝙣𝙚𝙖\n𝙚𝙟𝙚𝙢𝙥𝙡𝙤: *@tag*'
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) throw '𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡𝙜𝙪𝙣 𝙪𝙨𝙪𝙖𝙧𝙞𝙤𝙨 𝙥𝙖𝙧𝙖 𝙙𝙚𝙨𝙗𝙖𝙣𝙚𝙖 \n𝙚𝙟𝙚𝙢𝙥𝙡𝙤: *@tag*'
let users = global.db.data.users
users[who].banned = false
conn.reply(m.chat, `*𝙀𝙡 𝙪𝙨𝙪𝙖𝙧𝙞𝙤 𝙛𝙪𝙚 𝙙𝙚𝙨𝙗𝙖𝙣𝙚𝙖𝙙𝙤 🤩\n𝙥𝙤𝙙𝙧𝙖 𝙪𝙨𝙖𝙧 𝙖 𝙚𝙡 𝙗𝙤𝙩`, m)
}
handler.help = ['unbanuser']
handler.tags = ['owner']
handler.command = /^unbanuser$/i
handler.rowner = true
export default handler

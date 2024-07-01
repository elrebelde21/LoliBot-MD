let handler = async (m, { conn, text}) => {
if (!text) return conn.reply(m.chat,  '⚠️ 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡𝙜𝙪𝙣 𝙪𝙨𝙪𝙖𝙧𝙞𝙤𝙨 𝙥𝙖𝙧𝙖 𝙙𝙚𝙨𝙗𝙖𝙣𝙚𝙖\n𝙚𝙟𝙚𝙢𝙥𝙡𝙤: *@tag*', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) return conn.reply(m.chat,  '⚠️ 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡𝙜𝙪𝙣 𝙪𝙨𝙪𝙖𝙧𝙞𝙤𝙨 𝙥𝙖𝙧𝙖 𝙙𝙚𝙨𝙗𝙖𝙣𝙚𝙖\n𝙚𝙟𝙚𝙢𝙥𝙡𝙤: *@tag*', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
let users = global.db.data.users
users[who].banned = false
conn.reply(m.chat,  '*𝙀𝙡 𝙪𝙨𝙪𝙖𝙧𝙞𝙤 𝙛𝙪𝙚 𝙙𝙚𝙨𝙗𝙖𝙣𝙚𝙖𝙙𝙤 🤩*\n𝘼𝙝𝙤𝙧𝙖 𝙥𝙤𝙙𝙧𝙖 𝙪𝙨𝙖𝙧 𝙖𝙡 𝙚𝙡 𝙗𝙤𝙩', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
}
handler.help = ['unbanuser']
handler.tags = ['owner']
handler.command = /^unbanuser$/i
handler.rowner = true
export default handler

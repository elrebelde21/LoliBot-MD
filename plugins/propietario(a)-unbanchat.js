let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return m.reply('*Este chat no está registrado en la base de datos!*')
  let chat = global.db.data.chats[m.chat]
  if (!chat.isBanned) return m.reply('*Este chat no está baneado!!*')
chat.isBanned = false
conn.reply(m.chat,  '*BOT ONLINE 🚀*', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: '𝐂𝐡𝐚𝐭 𝐝𝐞𝐬𝐛𝐚𝐧𝐞𝐚𝐝𝐨', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
}
handler.command = /^unbanchat$/i
handler.botAdmin = true
handler.admin = true

export default handler

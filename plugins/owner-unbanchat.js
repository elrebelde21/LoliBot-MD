let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return m.reply('*Este chat no est¨¢ registrado en la base de datos!*')
  let chat = global.db.data.chats[m.chat]
  if (!chat.isBanned) return m.reply('*Este chat no est¨¢ baneado!!*')
chat.isBanned = false
conn.reply(m.chat,  '*BOT ONLINE ?*', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: '???? ??????????', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
}
handler.command = /^unbanchat$/i
//handler.botAdmin = true
handler.owner = true

export default handler
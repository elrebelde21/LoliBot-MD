let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = true
m.reply(`*BOT OFF*`)
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat|ban2|banchat1$/i
handler.botAdmin = true
handler.admin = true 
export default handler

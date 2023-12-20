let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat,  '*BOT OFF*', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: '𝐂𝐡𝐚𝐭 𝐛𝐚𝐧𝐞𝐚𝐝𝐨', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat|ban2|banchat1$/i
handler.botAdmin = true
handler.admin = true 
export default handler

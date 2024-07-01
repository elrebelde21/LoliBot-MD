import hispamemes from 'hispamemes'
let handler = async (m, { conn, usedPrefix, command }) => {
try {
const meme = hispamemes.meme()
//conn.sendFile(m.chat, meme, 'error.jpg', '😂😂🤣', m, false, { contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '😂 MEMES 😂', body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [nna, md, yt, tiktok, fb].getRandom()}}})
conn.sendButton(m.chat, '😂🤣🤣', botname, meme, [['😂 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 😂', `/${command}`]], null, null, m)   
//await conn.sendButton(m.chat, `*_${command}_*`.trim(), wm, meme, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `/${command}`]], m)
} catch (e) {
console.log(e)}}
handler.help = ['meme2'];
handler.tags = ['randow'];
handler.command = ['meme2', 'memes2'] 
handler.level = 2
handler.register = true
export default handler

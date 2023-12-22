/*   Creditos - ig : https://www.instagram.com/fg98._/    */
import hispamemes from 'hispamemes'
let handler = async (m, {command, conn}) => {
const url = await hispamemes.meme()  
conn.sendFile(m.chat, url, 'error.jpg', '😂😂😂', m, false, { contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: '😂 MEMES 😂', body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [nna, md, yt, tiktok, fb].getRandom()}}})
}
//conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `/${command}`]], m)}
handler.help = ['meme']
handler.tags = ['random']
handler.command = /^(meme|memes)$/i
export default handler

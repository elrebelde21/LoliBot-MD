import axios from 'axios'
let handler = async(m, { conn, usedPrefix, command }) => {
let res = (await axios.get(`https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/master/src/JSON/Messi.json`)).data  
let url = await res[Math.floor(res.length * Math.random())]
conn.sendFile(m.chat, url, 'error.jpg', command, m, false, { contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: 'Messi 🇦🇷', body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [nna, md, yt, tiktok, fb].getRandom()}}})}
//conn.sendButton(m.chat, "*Messi 🇦🇷*", author, url, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `${usedPrefix + command}`]], m)}
handler.help = ['messi']
handler.tags = ['internet']
handler.command = /^(messi)$/i
handler.register = true
export default handler

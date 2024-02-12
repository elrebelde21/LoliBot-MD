import fetch from 'node-fetch'
import axios from 'axios'
let handler = async(m, { conn, args, usedPrefix, command }) => {
try {
let res = await axios("https://meme-api.herokuapp.com/gimme/Itzy")
let json = res.data
let gata = json.url
conn.sendFile(m.chat, gata, 'error.jpg', `_${command}_`, m)
//conn.sendButton(m.chat, `_${command}_`, wm, gata, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `/${command}`]], m)
} catch (e) {
console.log(e)}} 
handler.help = ['itzy','kpopitzy']
handler.tags = ['internet']
handler.command = /^(itzy|kpopitzy)$/i
handler.register = true
export default handler

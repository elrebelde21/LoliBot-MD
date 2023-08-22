import axios from 'axios'
let handler = async(m, { conn, args, usedPrefix, command }) => {
let res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/navidad.json`)).data  
let mystic = await res[Math.floor(res.length * Math.random())]
await delay(5000)
conn.sendButton(m.chat, `_Navidad 🧑‍🎄_`, author, mystic, [['🔄 𝑺𝒊𝒈𝒖𝒊𝒆𝒏𝒕𝒆 🔄', `${usedPrefix + command}`]], m)}
handler.help = ['navidad']
handler.tags = ['internet']
handler.command = /^(navidad)$/i
export default handler
const delay = time => new Promise(res => setTimeout(res, time))
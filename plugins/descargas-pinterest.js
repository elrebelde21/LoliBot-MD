import { pinterest } from '@bochilteam/scraper'
let handler = async(m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*Que esta buscado❓*️\n*Use de la siguiente manera*\n*Ejemplo:*\n*${usedPrefix + command} Loli*` 
const json = await pinterest(text)
await conn.sendFile(m.chat, json.getRandom(), 'error.jpg', `
✨ *Resultados de: ${text}`.trim(), m)
}
handler.help = ['pinterest <keyword>']
handler.tags = ['internet']
handler.command = /^(pinterest|dlpinterest|pinterestdl)$/i
handler.money = 100
handler.register = true
handler.level = 1
export default handler

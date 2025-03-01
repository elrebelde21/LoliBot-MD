let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply(`*⚠️ Uso:* ${usedPrefix}${command} packname | author\n*Ejemplo:* ${usedPrefix}${command} LoliBot | elrebelde21`)
let text = args.join(" ").split("|")
let packname = text[0].trim()
let author = text[1] ? text[1].trim() : ''
if (!packname) return m.reply('⚠️ Debes ingresar al menos un packname')
global.db.data.users[m.sender].packname = packname
global.db.data.users[m.sender].author = author
m.reply(`✅ Perfecto, hemos actualizado el *EXIF* de tus stickers, eso significa que cada sticker que vayas a crear tendrá tu personalizado\nPackname: ${packname}\nAuthor: ${author || ''}`)
}
handler.help = ['exif <packname> | <author>']
handler.tags = ['sticker'];
handler.command = ['exif'] 
handler.register = true
export default handler
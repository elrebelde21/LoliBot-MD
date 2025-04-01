let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw await tr(`Y EL TEXTO?`)
try {
await conn.updateProfileName(text)
m.reply(await tr('LISTO!'))
} catch (e) {
console.log(e)
throw `Error`
}}
handler.help = ['setbotname <teks>']
handler.tags = ['owner']
handler.command = /^(setbotname|cambianombre)$/i

handler.owner = true

export default handler

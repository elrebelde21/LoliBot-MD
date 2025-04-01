let handler = async (m, { conn, text}) => {
if (!text) return m.reply(await tr('⚠️ Etiquetas algun usuarios para desbanear\nEjemplo: *@tag*'))
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) return m.reply(await tr('⚠️ Etiquetas algun usuarios para desbanear\nEjemplo: *@tag*'))
let users = global.db.data.users
users[who].banned = false
m.reply(await tr('*El usuario fue desbaneado 🤩*, Ahora podra usar al el bot'))
}
handler.help = ['unbanuser']
handler.tags = ['owner']
handler.command = /^unbanuser$/i
handler.owner = true
export default handler

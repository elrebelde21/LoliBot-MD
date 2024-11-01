let handler = async (m, { conn }) => {
if (global.conn.user.jid === conn.user.jid) {
} else {
await conn.reply(m.chat, `Adios bot :(`, m)
conn.fstop = true
conn.ws.close()
}}
handler.help = ['stop']
handler.tags = ['jadibot']
handler.command = ['stop', 'stopbot', 'stopbebot']
handler.owner = true
handler.register = true 
export default handler 
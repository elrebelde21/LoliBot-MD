let handler = async (m, { conn, isAdmin }) => {
if (m.fromMe) throw 'Nggk'
if (isAdmin) return m.reply('Ya eres admin del grupo mi creador 🫡')
await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")}
handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = /^admin.|atad|autoadmin$/i
handler.owner = true
handler.botAdmin = true
export default handler

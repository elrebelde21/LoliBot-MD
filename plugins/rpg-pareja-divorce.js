const handler = async (m, { conn, args }) => {
const targetId = m.mentionedJid[0] || args[0]
if (!targetId) return m.reply("⚠️ Debes etiquetar a la persona con la que deseas divorciarte.")

const userRes = await m.db.query('SELECT marry FROM usuarios WHERE id = $1', [m.sender])
const user = userRes.rows[0]
if (!user || !user.marry || user.marry !== targetId) return m.reply("⚠️ No estás casado con esta persona para poder divorciarte.")

await m.db.query('UPDATE usuarios SET marry = NULL WHERE id = $1', [m.sender])
await m.db.query('UPDATE usuarios SET marry = NULL WHERE id = $1', [targetId])
const nombre1 = await conn.getName(m.sender)
const nombre2 = await conn.getName(targetId)
return conn.reply(m.chat, `@${m.sender.split('@')[0]} (${nombre1}) se divorció de @${targetId.split('@')[0]} (${nombre2}) ahora están separados 🫣`, m, { mentions: [m.sender, targetId] })
}
handler.help = ['divorce <@tag>']
handler.tags = ['econ']
handler.command = ['divorce']
handler.register = true

export default handler

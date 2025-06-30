//Código elaborado por: https://github.com/elrebelde21

const handler = async (m, { conn, args }) => {
const res = await m.db.query('SELECT marry FROM usuarios WHERE id = $1', [m.sender])
const user = res.rows[0]

if (user.marry) {
const pareja = await m.db.query('SELECT nombre FROM usuarios WHERE id = $1', [user.marry])
const spouseName = pareja.rows[0]?.nombre || 'sin nombre'
if (user.marry === (m.mentionedJid[0] || '')) return conn.reply(m.chat, `⚠️ Ya estás casado con @${user.marry.split('@')[0]}. No necesitas casarte de nuevo con la misma persona 🤨`, m, { mentions: [m.sender] })
return conn.reply(m.chat, `⚠️ Ya estás casado con @${user.marry.split('@')[0]} (${spouseName}).\n¿Acaso le vas a ser infiel? 🤨`, m, { mentions: [m.sender] })
}

const mentionedUser = m.mentionedJid[0]
if (!mentionedUser) return m.reply('⚠️ Etiqueta a la persona con la que te quieres casar usando @tag')
if (mentionedUser === m.sender) return m.reply("⚠️ No puedes casarte contigo mismo")

const check = await m.db.query('SELECT marry FROM usuarios WHERE id = $1', [mentionedUser])
if (!check.rows[0]) return m.reply('⚠️ El usuario al que intentas casar no está en mi base de datos.')
if (check.rows[0].marry) return m.reply(`⚠️ El usuario ya está casado con alguien más`)

await m.db.query('UPDATE usuarios SET marry_request = $1 WHERE id = $2', [m.sender, mentionedUser])
await conn.reply(m.chat, `💍 *@${m.sender.split('@')[0]}* se está declarando!! 😳\n@${mentionedUser.split('@')[0]} responde:\n\n❤️ Escribe *Aceptar*\n💔 Escribe *Rechazar*`, m, { mentions: [m.sender, mentionedUser] })

setTimeout(async () => {
const again = await m.db.query('SELECT marry_request FROM usuarios WHERE id = $1', [mentionedUser])
if (again.rows[0]?.marry_request) {
await m.db.query('UPDATE usuarios SET marry_request = NULL WHERE id = $1', [mentionedUser])
await conn.reply(m.chat, '⚠️ El tiempo para aceptar o rechazar ha expirado.', m)
}}, 60000)
}

handler.before = async (m) => {
const res = await m.db.query('SELECT marry_request FROM usuarios WHERE id = $1', [m.sender])
const req = res.rows[0]?.marry_request
if (!req) return

const response = m.originalText.toLowerCase()
if (response === 'aceptar') {
await m.db.query('UPDATE usuarios SET marry = $1, marry_request = NULL WHERE id = $2', [req, m.sender])
await m.db.query('UPDATE usuarios SET marry = $1 WHERE id = $2', [m.sender, req])
await conn.reply(m.chat, `✅ ¡Felicidades! 🥳\n@${req.split('@')[0]} y @${m.sender.split('@')[0]} ahora están casados`, m, { mentions: [req, m.sender] })
} else if (response === 'rechazar') {
await m.db.query('UPDATE usuarios SET marry_request = NULL WHERE id = $1', [m.sender])
await conn.reply(m.chat, `⚠️ Has rechazado la solicitud de matrimonio de @${req.split('@')[0]}`, m, { mentions: [req] })
}}
handler.help = ['marry @tag']
handler.tags = ['econ']
handler.command = ['marry', 'pareja']
handler.register = true

export default handler

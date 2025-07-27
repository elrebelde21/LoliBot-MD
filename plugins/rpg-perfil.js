import { createHash } from 'crypto'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import { xpRange } from '../lib/levelling.js'

const formatPhoneNumber = (jid) => {
  if (!jid) return 'Desconocido';
  const number = jid.replace('@s.whatsapp.net', '');
  if (!/^\d{8,15}$/.test(number)) return 'Desconocido';
  return `+${number}`;
};

let handler = async (m, { conn }) => {
let who = m.mentionedJid?.[0] || (m.fromMe ? conn.user?.jid : m.sender)

const userResult = await m.db.query('SELECT * FROM usuarios WHERE id = $1', [who])
const user = userResult.rows[0]
const bio = await conn.fetchStatus(who).catch(() => ({}))
const biot = bio.status || 'Sin Info'
const profilePic = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/9d38415096b6c46bf03f8.jpg')
const buffer = await (await fetch(profilePic)).buffer()
const { exp, limite, nombre, registered, edad, level, marry, gender, birthday } = user
const { min, xp, max } = xpRange(level, global.multiplier || 1)
const sn = createHash('md5').update(String(who)).digest('hex')
const phone = formatPhoneNumber(who)

let nacionalidad = 'Desconocida'
try {
const response = await fetch(`${info.apis}/tools/country?text=${phone}`)
const data = await response.json()
if (data?.result?.name) nacionalidad = `${data.result.name} ${data.result.emoji}`
} catch (_) {}

let relacion = '❌ *No estás en ninguna relación, solter@ 🤑.*'
if (marry) {
const parejaRes = await m.db.query('SELECT nombre FROM usuarios WHERE id = $1', [marry])
const nombrePareja = parejaRes.rows[0]?.nombre || 'Desconocido'
relacion = `💍 *Está en una relación con:* ${nombrePareja}`
}
 
const texto = `*「 PERFIL 」*

👤 *Nombre:* ${nombre}
☎️ *Número:* ${phone}
🌐 *Link:* wa.me/${who.split('@')[0]}
🌍 *Nacionalidad:* ${nacionalidad} ${edad ? `\n🎈 *Edad:* ${edad}` : ''} ${gender ? `\n⚧️ *Género:* ${gender}` : ''} ${birthday ? `\n🎂 *Cumpleaños:* ${moment(birthday).format('DD/MM/YYYY')}` : ''}
💎 *Límite:* ${limite ?? 0}
⚙️ *Nivel:* ${level}
◯ *Registrado:* ${registered ? 'Sí' : 'No'}

${relacion}

*•━━━━⪻ 𝙿𝙴𝚁𝙵𝙸𝙻 ⪼━━━━•*`
await conn.sendFile(m.chat, buffer, 'perfil.jpg', texto, m)
}
handler.help = ['perfil', 'perfil *@user*']
handler.tags = ['rg']
handler.command = /^(perfil|profile)$/i
handler.register = true

export default handler

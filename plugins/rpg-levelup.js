import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = async (m, { conn }) => {
let name = conn.getName(m.sender)
let user = global.db.data.users[m.sender]
if (!canLevelUp(user.level, user.role, user.exp, global.multiplier)) {
let { min, xp, max } = xpRange(user.level, global.multiplier)
throw `『 *${await tr("TUS ESTADISTICAS")} 🆙* 』

${await tr("Tus estadisticas en tiempo real")} 🕐

├─ ❏ *${await tr("NOMBRE")}:*  ${name}
├─ ❏ *${await tr("XP")} 🆙:* ${user.exp - min}/${xp}
├─ ❏ *${await tr("NIVEL")}:* ${user.level}
└─ ❏ *${await tr("RANGO")}:* ${user.role}

> ${await tr(`Te falta *${max - user.exp}* De *XP* para subir de nivel`)}
`.trim()
}
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
if (before !== user.level) {
let teks = `🎊 ${await tr("Felicidades")} ${conn.getName(m.sender)} ${await tr("llegaste a un nuevo nivel")}:`
let str = `*[ ${await tr("LEVEL UP", "𝐋𝐄𝐕𝐄𝐋 𝐔𝐏")} ]*
        
*• ${await tr("Nivel anterior")}:* ${before}
*• ${await tr("Nivel actual")}:* ${user.level}
*• ${await tr("Rango")}:* ${user.role}

> _*${await tr("Cuanto mas interactues con los bots, mayor sera tu nivel")}_*
`.trim()
try {
const img = await levelup(teks, user.level)
conn.sendFile(m.chat, img, 'levelup.jpg', str, m, null, fake)
} catch (e) {
conn.fakeReply(m.chat, str, '13135550002@s.whatsapp.net', await tr(`*TUS ESTADISTICAS 🆙*`), 'status@broadcast', null, fake)
//m.reply(str)
}}}
handler.help = ['levelup']
handler.tags = ['econ']
handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true
export default handler
import { db } from '../lib/postgres.js'

let handler = async (m, { conn }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => "https://telegra.ph/file/39fb047cdf23c790e0146.jpg")

let groupMetadata
try {
groupMetadata = await conn.groupMetadata(m.chat)
} catch {
return m.reply('*⚠️ Error al obtener información del grupo. Intenta nuevamente más tarde.*')
}
const participants = groupMetadata.participants || []
const groupAdmins = participants.filter(p => p.admin)
const usarLid = participants.some(p => p.id?.endsWith?.('@lid'))
const listAdmin = await Promise.all(groupAdmins.map(async (v, i) => {
let numero = null
if (usarLid && v.id.endsWith('@lid')) {
const res = await db.query('SELECT num FROM usuarios WHERE lid = $1', [v.id])
numero = res.rows[0]?.num || null
} else if (/^\d+@s\.whatsapp\.net$/.test(v.id)) {
numero = v.id.split('@')[0]
}
return `➥ ${numero ? `@${numero}` : `@Usuarios`}`
}))

const { rows } = await db.query(`SELECT * FROM group_settings WHERE group_id = $1`, [m.chat])
const data = rows[0] || {}
const { welcome, detect, antifake, antilink, modoadmin, primary_bot, modohorny, nsfw_horario, banned } = data
const fallbackOwner = m.chat.includes('-') ? m.chat.split('-')[0] + '@s.whatsapp.net' : null
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || fallbackOwner || "Desconocido"

let primaryBotMention = ''
if (primary_bot) {
const allBots = [conn, ...global.conns.filter(bot => bot.user && bot.ws?.socket?.readyState !== 3)]
const selectedBot = allBots.find(bot => bot.user.jid === primary_bot)
primaryBotMention = `@${primary_bot.split('@')[0]}`
}

const text = `『 ＩＮＦＯ ＤＥ ＧＲＵＰＯ 』

*• ID :* 
${groupMetadata.id}

*• Nombre :* 
${groupMetadata.subject}

*• Miembros :*
${participants.length}

*• Creador del grupo :*
@${owner.split('@')[0]}

*• Admins :*
${listAdmin.join('\n')}

*• 𝙲𝙾𝙽𝙵𝙸𝙶𝚄𝚁𝙰𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾 :*
• Bot : ${modoadmin ? 'Apagado 📴' : `${primaryBotMention || 'Online ✅'}`} 
• Bienvenida: ${welcome ? '✅' : '❌'}
• AntiLink: ${antilink ? '✅' : '❌'}
• AntiFake: ${antifake ? '✅' : '❌'}
• Detect: ${detect ? '✅' : '❌'}
• Modo horny: ${modohorny ? '✅' : '❌'}
• NSFW horario permitido: ${nsfw_horario ? `🕒 (${nsfw_horario})` : '❌'}
• Grupo baneado: ${banned ? '🚫 Sí' : '✅ No'}
`.trim()
await conn.sendFile(m.chat, pp, 'pp.jpg', text, m)
}
handler.help = ['infogp']
handler.tags = ['group']
handler.command = ['infogrupo', 'groupinfo', 'infogp']
handler.group = true
handler.register = true

export default handler

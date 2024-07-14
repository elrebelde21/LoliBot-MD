let handler = async (m, { conn, participants, groupMetadata }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat]
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let text = `『 ＩＮＦＯ ＤＥ ＧＲＵＰＯ 』\n\n*• ID :*\n${groupMetadata.id}\n\n*• Nombre :*\n${groupMetadata.subject}\n\n*• Miembros :*\n${participants.length}\n\n*• Creador del. grupo :*\n@${owner.split('@')[0]}\n\n*• Admins :*\n${listAdmin}\n\n*• 𝙲𝙾𝙽𝙵𝙸𝙶𝚄𝚁𝙰𝙽𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾 :*\n• Bienvenida: ${welcome ? '✅' : '❌'}\n• Baneado: ${isBanned ? '✅' : '❌'}\n• Detect: ${detect ? '✅' : '❌'}\n• Anti eliminar: ${del ? '✅' : '❌'}\ • Antilink: ${antiLink ? '✅' : '❌'}\n\n*• 𝙲𝙾𝙽𝙵𝙸𝙶𝚄𝚁𝙰𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙼𝙴𝙽𝚂𝙰𝙹𝙴 :*\n• Bienvenida: ${sWelcome}\n• Despedida: ${sBye}\n• Promovidos: ${sPromote}\n• Degradados: ${sDemote}\n\n*• 𝙳𝙴𝚂𝙲𝚁𝙸𝙲𝙸𝙾𝙽 :*\n${groupMetadata.desc?.toString() || 'desconocido'}`.trim()
conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.help = ['infogp']
handler.tags = ['group']
handler.command = ['infogrupo', 'groupinfo', 'infogp'] 
handler.group = true
handler.register = true

export default handler

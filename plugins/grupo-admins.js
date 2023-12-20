let handler = async (m, { conn, participants, groupMetadata, args, usedPrefix, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `» ${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let pesan = args.join` `
let oi = `${lenguajeGB.smsAddB5()} _${pesan}_`

let textoA = 
`╭━━[ .⋅ 🗣️ ⋅]━━━⬣ 
ෆ ${lenguajeGB.smsAddB3()}
ෆ ${oi}
╰━━━━━━[ *𓃠.⋅ ${vs} ⋅]━━━━━⬣`

let textoB = 
`*${listAdmin}*

⛔ ${lenguajeGB.smsAddB4()} ⛔`.trim()
await conn.sendButton(m.chat, textoA, textoB, pp, [[lenguajeGB.smsConMenu(), `.menu`]], m, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.command = /^(admins|@admins|dmins)$/i
handler.group = true
export default handler

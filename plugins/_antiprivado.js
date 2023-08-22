//by https://github.com/elrebelde21
 
export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
if (m.isBaileys && m.fromMe) return !0
if (m.isGroup) return !1
if (!m.message) return !0 
if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') ||  m.text.includes('menu') ||  m.text.includes('estado') || m.text.includes('bots') || m.text.includes('deletebot') ||  m.text.includes('eliminarsesion') ||  m.text.includes('deletesesion') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let bot = global.db.data.settings[this.user.jid] || {}
if (bot.antiPrivate && !isOwner && !isROwner) {
await m.reply(`Hola *@${m.sender.split`@`[0]}*, Esta prohibido usar el bot el privado\n\n✴️solo si quiere hacerte un bot manda el comando .serbot\n\n🚫NO USAR LOS COMANDO DEL BOT AL PV🚫\n\nPara usar el bot unirte al grupo del oficial del el bot\n${nn}`, false, { mentions: [m.sender] })
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'banchat')
return !1
}}


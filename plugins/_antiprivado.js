const comandos = /piedra|papel|tijera|estado|verificar|creadora|bottemporal|grupos|instalarbot|términos|bots|deletebot|eliminarsesion|serbot|verify|registrar|deletesesion|jadibot/i
export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner, usedPrefix, command }) {
if (m.isBaileys && m.fromMe) return !0
if (m.isGroup) return !1
if (!m.message) return !0
const regex = new RegExp(`^${comandos.source}$`, 'i')
if (regex.test(m.text.toLowerCase().trim())) return !0

let chat, user, bot, mensaje
chat = global.db.data.chats[m.chat]
user = global.db.data.users[m.sender]
bot = global.db.data.settings[this.user.jid] || {}

if (bot.antiPrivate && !isOwner && !isROwner) {
if (user.counterPrivate === 0) {
mensaje = `Hola *@${m.sender.split`@`[0]}*, Esta prohibido usar el bot el privado\n\n✴️solo si quiere hacerte un bot manda el comando .serbot\n\n🚫NO USAR LOS COMANDO DEL BOT AL PV🚫\n\nPara usar el bot unirte al grupo del oficial del el bot\n${nn}\n\n⚠️ \`\`\`ADVERTENCIA 1/3\`\`\` ⚠️`
await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
  
} else if (user.counterPrivate === 1) {
let grupos = [ nn, nnn, nnnt, nnntt, nnnttt ].getRandom()
mensaje = `*Otra vez 🤨 ya que dije no escriba al privado 🫤*\n\n*Para usar el bot unirte al grupo oficial aqui 👇*\n${grupos}\n\n*SI VUELVE A ESCRIBIR SERÁ BLOQUEADO(A)* ‼️\n⚠️ \`\`\`ADVERTENCIA 2/3\`\`\` ⚠️`
await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] }) 
  
} else if (user.counterPrivate === 2) {
mensaje = `*@${m.sender.split`@`[0]} 🤨, NO ENTIENDE QUE REPITE 3 VECES NO ESCRIBE AL PRIVADO, AHORA SERA BLOQUEADO.*\n\n⚠️ \`\`\`ADVERTENCIA 3/3 \`\`\` ⚠️`
await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] }) 
  
user.counterPrivate = -1
await this.updateBlockStatus(m.sender, 'block')
}
user.counterPrivate++
}
return !1
}


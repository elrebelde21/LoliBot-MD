//By @NeKosmic || https://github.com/NeKosmic/ //

import * as fs from 'fs'

export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {
if (!m.fromMe) return !0
if (!m.isGroup) return !1
m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
if (m.isBot) return 
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[this.user.jid] || {}
let delet = m.key.participant
let bang = m.key.id
let name = await conn.getName(m.sender)
let fakemek = {key: {participant: "0@s.whatsapp.net","remoteJid": "0@s.whatsapp.net"},"message": {"groupInviteMessage": {"groupJid": "51995386439-1616969743@g.us","inviteCode": "m","groupName": "P", "caption": 'ʟᴏʟɪʙᴏᴛ-ᴍᴅ', 'jpegThumbnail': null}}}
if (chat.antiTraba && m.text.length > 6000) { //Cantidad máxima de caracteres aceptados en un mensaje//
if (isAdmin) return conn.sendMessage(m.chat, { text: `⚠️ ${await tr("El administrador")} @${m.sender.split("@")[0]} ${await tr("acaba de enviar un texto que contiene muchos caracteres")} -.-!`, mentions: [m.sender] }, { quoted: fakemek })
await conn.fakeReply(m.chat, `*[ ! ] ${await tr("Se detecto un mensaje que contiene muchos caracteres")} [ ! ]*`, '0@s.whatsapp.net', `${isBotAdmin ? await tr('Todavia existe la lergionVirgo? 🤣') : await tr('No soy administrador, no puedo hacer nada :/')}`, 'status@broadcast', null, fake)
//await conn.sendButton(m.chat, `*[ ! ] Se detecto un mensaje que contiene muchos caracteres [ ! ]*\n`, `${isBotAdmin ? '' : 'No soy administrador, no puedo hacer nada :/'}`, null, [['ᴅᴇsᴀᴄᴛɪᴠᴀ ᴀɴᴛɪᴛʀᴀʙᴀ', `/disable antitraba`]], null, null, m)
if (isBotAdmin) {
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
setTimeout(() => { 
conn.fakeReply(m.chat, `${tr("Marcar el chat como leido")} ✓\n${"\n".repeat(400)}\n• ${tr("numero")} : wa.me/${m.sender.split("@")[0]}\n• ${tr("Alias")} : ${name}\n‼️ ${tr("Acaba de enviar un texto que contiene muchos caracteres que puede ocasionar fallos en los dispositivos")}`, '0@s.whatsapp.net', `${tr("Todavia existe la lergionVirgo?")} 🤣, ${tr("sera expulsando aca no queremos rata")} 🐁`, 'status@broadcast', null, fake)
//conn.sendMessage(m.chat, { text: `Marcar el chat como leido ✓\n${"\n".repeat(400)}\n• El número : wa.me/${m.sender.split("@")[0]}\n• Alias : ${name}\n‼️Acaba de enviar un texto que contiene muchos caracteres que puede ocasionar fallos en los dispositivos`, mentions: [m.sender] }, { quoted: fakemek })
}, 0)
setTimeout(() => { 
conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}, 1000)} else if (!bot.restrict) return m.reply(`Este comando esta desactivado por mi jefe`)
}
return !0
} 

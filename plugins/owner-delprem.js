let handler = async (m, { conn, text, command, usedPrefix }) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
else who = m.chat
if (!who) throw await tr(`⚠️ Etiquete a la persona que va eliminar de los usuarios vip 😿\n\nEjemplo:\n*${usedPrefix + command} @tag*`)
if (!global.prems.includes(who.split`@`[0])) throw await tr(`⚠️ El o la usuario(a) no es vip 🥺`)
let index = global.prems.findIndex(v => (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net') === (who.replace(/[^0-9]/g, '') + '@s.whatsapp.net'))
global.prems.splice(index, 1)
conn.reply(m.chat, `${eg}@${who.split`@`[0]} ${await tr("Ahora el o la usuario(a) ya no es vip, tendrá limites con")} ${wm} 😰`, m, {
contextInfo: {
mentionedJid: [who]
}})}
handler.help = ['delprem <@user>']
handler.tags = ['owner']
handler.command = /^(remove|-|del)prem$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.owner = true
export default handler

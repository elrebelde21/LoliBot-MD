let MessageType =  (await import(global.baileys)).default
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
  let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let bot = global.db.data.settings[conn.user.jid] || {}
let name = await conn.getName(m.sender)
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()
let totalreg = Object.keys(global.db.data.users).length
let pp = gataVidMenu.getRandom()
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
  let vn = './media/creador.mp3'

//------- Nombre
  let nowner = `${wm.split`@`[0]}@s.whatsapp.net`
  let teksnomor = `• @${wm.split`@`[0]} •
------- ${wm} -------`

//------------ BIO
let ppown = await conn.profilePictureUrl(nomorown + '@s.whatsapp.net', 'image').catch(_ => imagen1[1]) 
let teksbio = `*𝘾𝙤𝙣𝙩𝙖𝙘𝙩𝙤* 
*${asistencia} (no bot)*
*${bot} (bot)*`
  let teks = ' '
const sections = [{title: `𝙋𝙍𝙊𝙋𝙄𝙀𝙏𝘼𝙍𝙄𝙊/𝙊𝙒𝙉𝙀𝙍`, rows: [{title: "🔰 • NUMERO", rowId: ".owner bio"}, {title: "🌐 • CUENTAS OFICIALES", rowId: ".cuentasgb"}, {title: "🙌 • GRUPOS", rowId: ".grupos"},]}, {title: `–––––––·• 𝘼𝙋𝙊𝙔𝘼 𝘼𝙇 𝘽𝙊𝙏 –––––––·•`, rows: [ {title: "🤖 • INSTALARBOT", rowId: ".instalarbot"}, {title: "🌟 • SC", rowId: "Sc"}, ]}, ]

const listMessage = {
text: `~ *PROPIETARIO/OWNER DEL BOT*`,
footer: `╭┄〔 *OWNER* 〕┄⊱
┆ *Hola👋 ${name}*
┆——————«•»——————
┆• 𝙑𝙚𝙧𝙨𝙞𝙤𝙣 𝙙𝙚𝙡 𝙗𝙤𝙩: ${vs}  
┆———————————
┆• 𝙏𝙤𝙩𝙖𝙡 𝙙𝙚𝙡 𝙐𝙨𝙪𝙖𝙧𝙞𝙤𝙨: *${totalreg}* 
┆———————————
┆• 𝙈𝙤𝙙𝙤: ${global.db.data.settings[conn.user.jid].self ? '*Privado*' : '*Público*'}
┆———————————
┆• 𝙋𝙧𝙚𝙛𝙞𝙟𝙤: *${usedPrefix}* 
┆———————————
┆• 𝙋𝙧𝙚𝙢𝙞𝙪𝙢: ${user.premiumTime > 0 ? 'Siu ✅' : 'No ❌'}
┆———————————
┆• 𝘾𝙝𝙖𝙩(𝙨) 𝙋𝙧𝙤𝙝𝙞𝙗𝙞𝙙𝙤(𝙨): ${Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned).length} 
┆———————————
┆• 𝙐𝙨𝙪𝙖𝙧𝙞𝙤(𝙨) 𝙋𝙧𝙤𝙝𝙞𝙗𝙞𝙙𝙤(𝙨): ${Object.entries(global.db.data.users).filter(user => user[1].banned).length} 
╰━━━⊰ 𓃠 ${vs} ⊱━━━━დ
${wm}`,
title: null,
buttonText: `HAGA CLICK AQUI`,
sections }

try {
if (/(contacto|owner|creator|propietario|dueño|dueña|propietaria|dueño|creadora|creador)/i.test(command)) {
const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count)
switch (type) {
case 'nomor':
conn.reply(m.chat, wm, m, { contextInfo: { mentionedJid: [nowner] }})
break
case 'bio':
await conn.sendFile(m.chat, img.getRandom(), 'pp.jpg', teksbio, fkontak)
break
default:
return await conn.sendMessage(m.chat, listMessage, { quoted: m, contextInfo: { mentionedJid: [m.sender] }})
}} else if (/aoaooaoaooaoa/i.test(command)) {
const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
switch (_type) {
case 't':
break
case '':
break
default:
return await conn.sendFile(m.chat, img.getRandom(), 'loli.jpg', teksbio, fkontak)
}}} catch (err) {
m.reply("Error\n\n\n" + err.stack)}
conn.sendFile(m.chat, vn, 'creador.mp3', null, m, true, { type: 'audioMessage', ptt: true, sendEphemeral: true })}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(contacto|owner|creator|propietario|dueño|dueña|propietaria|dueño|creadora|creador)$/i
handler.register = true
export default handler

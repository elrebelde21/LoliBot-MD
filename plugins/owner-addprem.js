let handler = async (m, { conn, text, usedPrefix, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
else who = m.chat

let user = global.db.data.users[who]
if (!who) throw `*⚠️ 𝐌𝐄𝐍𝐂𝐈𝐎𝐍𝐀/𝐑𝐄𝐏𝐎𝐍𝐃𝐀 𝐀𝐋 𝐌𝐄𝐍𝐒𝐀𝐉𝐄 𝐃𝐄 𝐋𝐀 𝐏𝐄𝐑𝐒𝐎𝐍𝐀 𝐐𝐔𝐄 𝐒𝐄𝐑𝐀́ 𝐏𝐑𝐄𝐌𝐈𝐔𝐌*\n\n*${usedPrefix + command} @${m.sender.split`@`[0]} 1*\n*${usedPrefix + command} 1*`
let txt = text.replace('@' + who.split`@`[0], '').trim()
let name = await '@' + who.split`@`[0]

var hora1 = 3600000 * txt //1h
var dia1 = 86400000 * txt //1d
var semana1 = 604800000 * txt //1s
var mes1 = 2629800000 * txt //1m
var now = new Date() * 1

if (!txt && !m.quoted) throw `*FALTA EL TIEMPO PREMIUM*`
if (txt == 0 || txt == null) throw `*DEBE INGRESAR EL TIEMPO PREMIUM*\n\n*${usedPrefix + command} @${m.sender.split`@`[0]} 1*\n*${usedPrefix + command} 1*`
if (isNaN(txt)) return m.reply(`*SOLO NÚMERO*\n\n*${usedPrefix + command} @${m.sender.split`@`[0]} 1*`)

/*let titulo = [ 'PREMIUM 1', 'PREMIUM 2', 'PREMIUM 3', 'PREMIUM 4', 'PREMIUM 5', 'PREMIUM 6']
let nombre = [ 'PREMIUM BÁSICO', 'PREMIUM NORMAL', 'PREMIUM ESPECIAL', 'PREMIUM PRO', 'PREMIUM PLUS', 'PREMIUM MAGISTRAL']
let descripción = [ 'Premium durante 1 Hora', 'Premium durante 3 Horas', 'Premium durante 5 Horas', 'Premium durante 1 Día', 'Premium durante 1 Semana', 'Premium durante 1 Mes']
let tiempo = [ hora1, hora3, hora5, dia1, semana1, mes1]
let comando = [ 'premium1', `${command[2]}`, `${command[3]}`, `${command[4]}`, `${command[5]}`, `${command[6]}`]

let sections = Object.keys(titulo, nombre, descripción, tiempo, comando).map((v, index) => ({ title: `${titulo[v]}`,
rows: [{ title: `${nombre[v]}`, description: `${1 + index}. ${descripción[v]}`, rowId: usedPrefix + comando[v] + ' ' + `${res ? `${res.map(v => '@' + v.split("@")[0])}` : ''}` + txt, }], }))

const listMessage = {
text: `*ELIJA EL TIEMPO PREMIUM*
*${name}*
${wm}`,
title: null,
buttonText: `TIEMPO AQUÍ `,
sections }
  
if (command == 'addprem') {
//if (!txt || !text) return
await conn.sendMessage(m.chat, listMessage, {quoted: fkontak})}*/
  
 
if (command == 'addprem' || command == 'userpremium') {
if (now < user.premiumTime) user.premiumTime += hora1
else user.premiumTime = now + hora1
user.premium = true
conn.reply(m.chat,  `*🎟️ 𝙐𝙎𝙏𝙀𝘿 𝘼𝙃𝙊𝙍𝘼 𝙀𝙎 𝙋𝙍𝙀𝙈𝙄𝙐𝙈!!!*

*✨ 𝙉𝙊𝙈𝘽𝙍𝙀 » ${name}*
*🕐 𝙏𝙄𝙀𝙈𝙋𝙊 : 𝙏𝙄𝙈𝙀 »* ${msToTime(hora1 - new Date())}
*📉 𝙏𝙄𝙈𝙀𝙍 » ${user.premiumTime - now} seg*`, m, {contextInfo: {mentionedJid: conn.parseMention(name)}})}
    
if (command == 'addprem2' || command == 'userpremium2') {
if (now < user.premiumTime) user.premiumTime += dia1
else user.premiumTime = now + dia1
user.premium = true
conn.reply(m.chat,  `*🎟️ 𝙐𝙎𝙏𝙀𝘿 𝘼𝙃𝙊𝙍𝘼 𝙀𝙎 𝙋𝙍𝙀𝙈𝙄𝙐𝙈!!!*

*✨ 𝙉𝙊𝙈𝘽𝙍𝙀 » ${name}*
*🕐 𝙏𝙄𝙀𝙈𝙋𝙊 : 𝙏𝙄𝙈𝙀 » ${msToTime(dias1 - new Date())}*
*📉 𝙏𝙄𝙈𝙀𝙍 » ${user.premiumTime - now} seg*`, m, {contextInfo: {mentionedJid: conn.parseMention(name)}})}

if (command == 'addprem3' || command == 'userpremium3') {
if (now < user.premiumTime) user.premiumTime += semana1
else user.premiumTime = now + semana1
user.premium = true
conn.reply(m.chat,  `*🎟️ 𝙐𝙎𝙏𝙀𝘿 𝘼𝙃𝙊𝙍𝘼 𝙀𝙎 𝙋𝙍𝙀𝙈𝙄𝙐𝙈!!!*

*✨ 𝙉𝙊𝙈𝘽𝙍𝙀 » ${name}*
*🕐 𝙏𝙄𝙀𝙈𝙋𝙊 : 𝙏𝙄𝙈𝙀 » ${msToTime(semana1 - new Date())}*
*📉 𝙏𝙄𝙈𝙀𝙍 » ${user.premiumTime - now} seg*`, m, {contextInfo: {mentionedJid: conn.parseMention(name)}})}

  
if (command == 'addprem4' || command == 'userpremium4') {
if (now < user.premiumTime) user.premiumTime += mes1
else user.premiumTime = now + mes1
user.premium = true
conn.reply(m.chat,  `*🎟️ 𝙐𝙎𝙏𝙀𝘿 𝘼𝙃𝙊𝙍𝘼 𝙀𝙎 𝙋𝙍𝙀𝙈𝙄𝙐𝙈!!!*

*✨ 𝙉𝙊𝙈𝘽𝙍𝙀 » ${name}*
*🕐 𝙏𝙄𝙀𝙈𝙋𝙊 : 𝙏𝙄𝙈𝙀 » ${msToTime(mes1 - new Date())}*
*📉 𝙏𝙄𝙈𝙀𝙍 » ${user.premiumTime - now} seg*`, m, {contextInfo: {mentionedJid: conn.parseMention(name)}})}
}
handler.help = ['addprem [@user] <days>']
handler.tags = ['owner']
handler.command = ['addprem', 'userpremium', 'addprem2', 'userpremium2', 'addprem3', 'userpremium3', 'addprem4', 'userpremium4'] 
handler.group = true
handler.owner = true
//handler.botAdmin = true
export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " Horas " + minutes + " Minutos " + seconds  + " Segundos "
}
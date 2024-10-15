let ro = 3000
let handler = async (m, { conn, usedPrefix, command}) => {
let time = global.db.data.users[m.sender].lastrob + 7200000
if (new Date - global.db.data.users[m.sender].lastrob < 7200000) throw `🚓 La policía que esta vigilando, vuelve en: ${msToTime(time - new Date())}\n\n‍`
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
else who = m.chat
if (!who) return conn.reply(m.chat, `*⚠️ Etiqueta a un usuario boludo*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}}) 
if (!(who in global.db.data.users)) throw `*⚠️ ¿Quien carajo es? No aparece el mi base de datos.*`
let users = global.db.data.users[who]
let rob = Math.floor(Math.random() * ro)
if (users.exp < rob) return m.reply(`@${who.split`@`[0]} Este usuario tiene menos de ${ro} XP\n> No robes a un pobre v:`, null, { mentions: [who] })    
global.db.data.users[m.sender].exp += rob
global.db.data.users[who].exp -= rob 
m.reply(`*Robaste ${rob} XP a @${who.split`@`[0]}*`, null, { mentions: [who] })
//conn.sendMessage(m.chat, {text: `*Robaste ${rob} XP a @${who.split`@`[0]}*`, contextInfo:{ mentions: [who]}}, { quoted: m})
global.db.data.users[m.sender].lastrob = new Date * 1
}
handler.help = ['rob']
handler.tags = ['econ']
handler.command = ['robar', 'rob']
handler.register = true
export default handler  

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return hours + " Hora(s) " + minutes + " Minuto(s)"}

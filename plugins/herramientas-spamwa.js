let handler = async (m, { conn, text, usedPrefix, command }) => {

let time = global.db.data.users[m.sender].lastrob + 7200000
if (new Date - global.db.data.users[m.sender].lastrob < 7200000) throw `*⏱️ ESPERA ${msToTime(time - new Date())}\n NO USER ESTE COMANDO CON UN MAL USO\n (wey por que no van vos hacerle spam a esta persona???? y no me use a mi para tu pinche pendejada)*`
let [nomor, pesan, jumlah] = text.split('|')
if (!nomor) throw `${mg}𝑰𝒏𝒈𝒓𝒆𝒔𝒂 𝒆𝒍 𝒏𝒖́𝒎𝒆𝒓𝒐 𝒑𝒂𝒓𝒂 𝒆𝒍 𝒔𝒑𝒂𝒎\n*❊ ${usedPrefix + command} numero|texto|cantidad*\n𝑬𝒋𝒆𝒎𝒑𝒍𝒐\n*❊ ${usedPrefix + command} 999999999999|Holaaa|35*`
if (!pesan) throw `${mg}𝑰𝒏𝒈𝒓𝒆𝒔𝒂 𝒆𝒍 𝒏𝒖́𝒎𝒆𝒓𝒐 𝒑𝒂𝒓𝒂 𝒆𝒍 𝒔𝒑𝒂𝒎\n*❊ ${usedPrefix + command} numero|texto|cantidad*\n𝑬𝒋𝒆𝒎𝒑𝒍𝒐\n*❊ ${usedPrefix + command} 999999999999|Holaaa|35*`
if (jumlah && isNaN(jumlah)) throw `𝑳𝒂 𝒄𝒂𝒏𝒕𝒊𝒅𝒂𝒅 𝒅𝒆𝒃𝒆 𝒅𝒆 𝒊𝒓 𝒆𝒍 𝒏𝒖́𝒎𝒆𝒓𝒐 𝒂𝒍 𝒒𝒖𝒆 𝒔𝒆 𝒍𝒆 𝒉𝒂𝒓𝒂́ 𝒔𝒑𝒂𝒎\n*❊ ${usedPrefix + command} numero|texto|cantidad*\n𝑬𝒋𝒆𝒎𝒑𝒍𝒐\n*❊ ${usedPrefix + command} 999999999999|Holaaa|35*`
await delay(10000)
let fixedNumber = nomor.replace(/[-+<>@]/g, '').replace(/ +/g, '').replace(/^[0]/g, '62') + '@s.whatsapp.net'
await delay(10000)
let fixedJumlah = jumlah ? jumlah * 1 : 10
if (fixedJumlah > 5) throw `${fg}𝑴𝒊́𝒏𝒊𝒎𝒐 *5* 𝒎𝒆𝒏𝒔𝒂𝒋𝒆 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒔𝒑𝒂𝒎`
await delay(10000)
await m.reply(`${eg}𝑬𝒍 𝒔𝒑𝒂𝒎 𝒔𝒆 𝒆𝒏𝒗𝒊𝒐́ *${fixedJumlah}* 𝑽𝒆𝒄𝒆𝒔 𝒂 *${nomor}*`)
await delay(10000)
for (let i = fixedJumlah; i > 1; i--) {
await delay(10000)
if (i !== 0) conn.reply(fixedNumber, pesan.trim(), m)
}
global.db.data.users[m.sender].lastrob = new Date * 1
}
handler.help = ['spamwa <number>|<mesage>|<no of messages>']
handler.tags = ['General']
handler.command = /^spam(wa)?$/i
handler.group = false
handler.premium = false
handler.private = true
handler.level = 45
handler.limit = 280
handler.register = true
export default handler 
const delay = time => new Promise(res => setTimeout(res, time))

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return hours + " Hora(s) " + minutes + " Minuto(s)"}

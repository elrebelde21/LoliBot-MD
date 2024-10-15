let handler = async (m, { conn }) => {

let hasil = Math.floor(Math.random() * 6000)
let time = global.db.data.users[m.sender].lastmiming + 400000
if (new Date - global.db.data.users[m.sender].lastmiming < 400000) throw `⏳ 𝐄𝐬𝐩𝐞𝐫𝐚 *${msToTime(time - new Date())}* 𝐏𝐚𝐫𝐚 𝐯𝐨𝐥𝐯𝐞𝐫 𝐚 𝐦𝐢𝐧𝐚𝐫`
let minar = `${pickRandom(['Que pro 😎 has minado',
'🌟✨ Genial!! Obtienes',
'WOW!! eres un(a) gran Minero(a) ⛏️ Obtienes',
'Has Minado!!',
'😲 Lograste Minar la cantidad de',
'Tus Ingresos subiran gracias a que minaste',
'⛏️⛏️⛏️⛏️⛏️ Minando',
'🤩 SII!!! AHORA TIENES',
'La minaria esta de tu lado, por ello obtienes',
'😻 La suerte de Minar',
'♻️ Tu Mision se ha cumplido, lograste minar',
'⛏️ La Mineria te ha beneficiado con',
'🛣️ Has encontrado un Lugar y por minar dicho lugar Obtienes',
'👾 Gracias a que has minado tus ingresos suman',
'Felicidades!! Ahora tienes','⛏️⛏️⛏️ Obtienes'])}`

global.db.data.users[m.sender].exp += hasil
m.reply(`${minar} *${hasil} XP*`)
global.db.data.users[m.sender].lastmiming = new Date * 1
}
handler.help = ['minar']
handler.tags = ['econ']
handler.command = ['minar', 'miming', 'mine'] 
handler.register = true
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
//hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

//hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return minutes + " minuto(s) " + seconds + " segundo(s)" 
}

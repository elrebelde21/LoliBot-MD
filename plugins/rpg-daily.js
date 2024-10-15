const free = 5000
const prem = 20000

let handler = async (m, {conn, isPrems }) => {
let time = global.db.data.users[m.sender].lastclaim + 86400000
if (new Date - global.db.data.users[m.sender].lastclaim < 86400000) throw `⚠️ 𝙔𝙖 𝙧𝙚𝙘𝙡𝙖𝙢𝙖𝙨𝙩𝙚 𝙩𝙪 𝙧𝙚𝙜𝙖𝙡𝙤 🎁\n𝙑𝙪𝙚𝙡𝙫𝙚 𝙚𝙣 *${msToTime(time - new Date())}* 𝙋𝙖𝙧𝙖 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙧𝙚𝙘𝙡𝙖𝙢𝙖𝙧*`
const limit = Math.floor(Math.random() * 30)
const money = Math.floor(Math.random() * 800)
global.db.data.users[m.sender].limit += limit;
global.db.data.users[m.sender].money += money
global.db.data.users[m.sender].exp += isPrems ? prem : free
m.reply(`🎁 *𝙊𝙗𝙩𝙞𝙚𝙣𝙚 𝙪𝙣 𝙧𝙚𝙜𝙖𝙡𝙤!!*

🔸 *𝐇𝐀𝐒 𝐑𝐄𝐂𝐈𝐁𝐈𝐃𝐎:*
*💎 Diamante:* ${limit}
*🪙 LoliCoins:* ${money}
*🆙 Xp:* ${isPrems ? prem : free}`)
  global.db.data.users[m.sender].lastclaim = new Date * 1
}
handler.help = ['daily']
handler.tags = ['econ']
handler.command = ['daily', 'claim'] 
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

return hours + " Horas " + minutes + " Minutos"
}


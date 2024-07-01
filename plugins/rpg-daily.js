const free = 5000
const prem = 20000

let handler = async (m, {conn, isPrems }) => {
let time = global.db.data.users[m.sender].lastclaim + 86400000
if (new Date - global.db.data.users[m.sender].lastclaim < 86400000) throw `🎁 *𝐘𝐚 𝐫𝐞𝐜𝐨𝐠𝐢𝐬𝐭𝐞 𝐭𝐮 𝐫𝐞𝐜𝐨𝐦𝐩𝐞𝐧𝐬𝐚 𝐝𝐢𝐚𝐫𝐢𝐚*\n\n🕚 𝐕𝐮𝐞𝐥𝐯𝐞 𝐞𝐧: *${msToTime(time - new Date())}* `
const limit = Math.floor(Math.random() * 30)
const money = Math.floor(Math.random() * 800)
global.db.data.users[m.sender].limit += limit;
global.db.data.users[m.sender].money += money
global.db.data.users[m.sender].exp += isPrems ? prem : free
  m.reply(`🎁 *𝐑𝐄𝐂𝐎𝐌𝐏𝐄𝐍𝐒𝐀 𝐃𝐈𝐀𝐑𝐈𝐀*

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


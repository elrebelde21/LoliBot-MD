import fetch from 'node-fetch'
let handler = async (m, { isPrems, conn }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
let user = global.db.data.users[m.sender]
let premium = user.premium

let exp = `${pickRandom([500, 600, 700, 800, 900, 999, 1000, 1300, 1500, 1800])}` * 1
let exppremium = `${pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500])}` * 1
	
let money = `${pickRandom([300, 500, 700, 900, 500, 800, 900, 1100, 1350, 1500])}` * 1
let moneypremium = `${pickRandom([800, 1300, 1600, 1900, 2200, 2500, 2700, 3000, 3300, 3500])}` * 1

let potion = `${pickRandom([1, 2, 3, 4, 5])}` * 1
let potionpremium = `${pickRandom([2, 4, 6, 9, 12])}` * 1

let tiketcoin = `${pickRandom([1, 0, 0, 2, 0])}` * 1
let tiketcoinpremium = `${pickRandom([2, 1, 1, 3, 4])}` * 1

let eleksirb = `${pickRandom([1, 1, 1, 3, 1, 2, 2, 1, 5, 8])}` * 1
let eleksirbpremium = `${pickRandom([3, 3, 5, 3, 8, 3, 4, 4, 10, 7])}` * 1

let umpan = `${pickRandom([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])}` * 1
let umpanpremium = `${pickRandom([30, 60, 90, 120, 150, 180, 210, 240, 270, 300])}` * 1

//let gata = Math.floor(Math.random() * 2000)

const recompensas = {	
  exp: premium ? exppremium : exp,
  money: premium ? moneypremium : money,
  potion: premium ? potionpremium : potion,
  tiketcoin: premium ? tiketcoinpremium : tiketcoin,	
  eleksirb: premium ? eleksirbpremium : eleksirb,
  umpan: premium ? umpanpremium : umpan,
}

let time = user.lastclaim + 7200000 //2 Horas 7200000
if (new Date - user.lastclaim < 7200000) return await conn.reply(m.chat,  `🕔 𝙔𝙖 𝙧𝙚𝙘𝙡𝙖𝙢𝙖𝙨𝙩𝙚 𝙩𝙪 𝙧𝙚𝙜𝙖𝙡𝙤 🎁 𝙑𝙪𝙚𝙡𝙫𝙚 𝙚𝙣 *${msToTime(time - new Date())}* 𝙋𝙖𝙧𝙖 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙧𝙚𝙘𝙡𝙖𝙢𝙖𝙧`, fkontak, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}})
//await conn.sendButton(m.chat, `𝙔𝙖 𝙧𝙚𝙘𝙡𝙖𝙢𝙖𝙨𝙩𝙚 𝙩𝙪 𝙧𝙚𝙜𝙖𝙡𝙤 🎁\n𝙑𝙪𝙚𝙡𝙫𝙚 𝙚𝙣 *${msToTime(time - new Date())}* 𝙋𝙖𝙧𝙖 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙧𝙚𝙘𝙡𝙖𝙢𝙖𝙧`, wm, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)
let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${global.rpgshop.emoticon(reward)}\n┃ `}
let text = `╭━━🎁━🎁━🎁━━⬣
┃ ✨ 𝙊𝙗𝙩𝙞𝙚𝙣𝙚 𝙪𝙣 𝙧𝙚𝙜𝙖𝙡𝙤!!
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*
┃ ${texto}
╰━━🎁━🎁━🎁━━⬣

🎟️ 𝑷𝒓𝒆𝒎𝒊𝒖𝒎 ⇢ ${premium ? '✅' : '❌'}\n${wm}`
let img = 'https://img.freepik.com/vector-gratis/gente-diminuta-enormes-cajas-regalo-ilustracion-vectorial-plana-personas-que-celebran-cumpleanos-envian-o-reciben-regalos-lealtad-o-ideas-brillantes-recompensa-bonificacion-concepto-fiesta_74855-25016.jpg?w=2000'
await conn.sendMessage(m.chat, {text: text, contextInfo: {forwardingScore: 9999999, isForwarded: true, image: {url: img}, "externalAdReply":  {"showAdAttribution": true, "renderLargerThumbnail": true, "thumbnail": img.getRandom(), "title": wm, "containsAutoReply": true, "mediaType": 1, "mediaUrl": [nna, nn, md, yt].getRandom(), "sourceUrl": [nna, nn, md, yt].getRandom(), }}}, { quoted: m })
//await conn.sendButton(m.chat, text, texto + `\n\n🎟️ 𝑷𝒓𝒆𝒎𝒊𝒖𝒎 ⇢ ${premium ? '✅' : '❌'}\n${wm}`, img, [['⛰️ 𝘼𝙗𝙧𝙞𝙧 𝙘𝙤𝙛𝙧𝙚  ⛰️', '/cofre'], ['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️', '/menu'] ], fkontak, m)  
user.lastclaim = new Date * 1
}
handler.help = ['daily']
handler.tags = ['xp']
handler.command = ['daily', 'reclamar', 'reclamo', 'regalo', 'claim'] 
handler.register = true
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

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

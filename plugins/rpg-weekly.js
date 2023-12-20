import fetch from 'node-fetch'
let handler = async (m, { isPrems, conn }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
let grupos = [nna, nn, nnn, nnnt]
let gata = [imagen1, imagen2, imagen4, imagen5]
let enlace = { contextInfo: { externalAdReply: {title: wm + ' 🐈', body: 'support group' , sourceUrl: grupos.getRandom(), thumbnail: await(await fetch(gata.getRandom())).buffer() }}}
let enlace2 = { contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: yt, mediaType: 'VIDEO', description: '', title: wm, body: 'LoliBot', thumbnailUrl: await(await fetch(global.img)).buffer(), sourceUrl: yt }}}
let dos = [enlace, enlace2]    

let user = global.db.data.users[m.sender]
let premium = user.premium

let exp = `${pickRandom([1000, 1800, 2500, 3000, 3700, 4400, 5000, 5500, 6000, 6500])}` * 1
let exppremium = `${pickRandom([3000, 4500, 6600, 8500, 9999, 10500, 11600, 12650, 13479, 15000])}` * 1

let diamond = `${pickRandom([3, 5, 8, 9, 11, 13, 16, 18, 19, 20])}` * 1
let diamondpremium = `${pickRandom([8, 14, 18, 22, 27, 29, 33, 36, 38, 40])}` * 1

let kyubi = `${pickRandom([5, 8, 15, 16, 25, 28, 30])}` * 1
let kyubipremium = `${pickRandom([12, 19, 25, 34, 44, 50])}` * 1

let sampah = `${pickRandom([3, 3, 5, 7, 9, 14, 15])}` * 1
let sampahpremium = `${pickRandom([5, 8, 16, 21, 25, 30])}` * 1

let sword = `${pickRandom([1, 1, 2, 2, 1])}` * 1
let swordpremium = `${pickRandom([2, 3, 3, 5, 8])}` * 1

let uncoommon = `${pickRandom([2, 2, 2, 3, 3, 3, 4, 4, 4, 5])}` * 1
let uncoommonpremium = `${pickRandom([5, 5, 5, 5, 5, 7, 7, 9, 9, 10])}` * 1

let mythic = `${pickRandom([2, 2, 2, 1, 2, 1, 1, 2, 1, 3])}` * 1
let mythicpremium = `${pickRandom([2, 2, 3, 3, 3, 3, 4, 4, 4, 3])}` * 1
 
const recompensas = {
  exp: premium ? exppremium : exp,
  diamond: premium ? diamondpremium : diamond,
  kyubi: premium ? kyubipremium : kyubi,
  sampah: premium ? sampahpremium : sampah,
  sword: premium ? swordpremium : sword,
  uncoommon: premium ? uncoommonpremium : uncoommon,
  mythic: premium ? mythicpremium : mythic,
}

let time = user.lastweekly + 259200000 //259200000 3 dias
if (new Date - user.lastweekly < 259200000) return await conn.reply(m.chat, `𝙔𝘼 𝙍𝙀𝘾𝙄𝘽𝙄𝙎𝙏𝙀 𝙏𝙐 𝙍𝙀𝘾𝙊𝙈𝙋𝙀𝙉𝙎𝘼 𝙎𝙀𝙈𝘼𝙉𝘼𝙇 ⛅\n\n𝙑𝙐𝙀𝙇𝙑𝙀 𝙀𝙉\n${clockString(time - new Date() * 1)}`, fkontak,  m)
//await conn.sendButton(m.chat, `𝙔𝘼 𝙍𝙀𝘾𝙄𝘽𝙄𝙎𝙏𝙀 𝙏𝙐 𝙍𝙀𝘾𝙊𝙈𝙋𝙀𝙉𝙎𝘼 𝙎𝙀𝙈𝘼𝙉𝘼𝙇 ⛅\n\n𝙔𝙊𝙐 𝘼𝙇𝙍𝙀𝘼𝘿𝙔 𝙍𝙀𝘾𝙀𝙄𝙑𝙀𝘿 𝙔𝙊𝙐𝙍 𝙒𝙀𝙀𝙆𝙇𝙔 𝙍𝙀𝙒𝘼𝙍𝘿 ⛅`, wm + `\n\n𝙑𝙐𝙀𝙇𝙑𝙀 𝙀𝙉 : 𝘾𝙊𝙈𝙀 𝘽𝘼𝘾𝙆 𝙄𝙉\n${clockString(time - new Date() * 1)}`, null, [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], fkontak, m)
let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${global.rpgshop.emoticon(reward)}\n┃ `}
let text = `╭━━⛅━☃️━⛈️━━⬣
┃ ☀️ 𝙍𝙀𝘾𝙊𝙈𝙋𝙀𝙉𝙎𝘼 𝙎𝙀𝙈𝘼𝙉𝘼𝙇!!
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*
┃ ${texto}
╰━━💫━🌈━🌛━━⬣\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}\n${wm}`
let pp = 'https://i.imgur.com/cYFgSKv.jpeg'
conn.sendMessage(m.chat, {image: {url: pp}, caption: text, mentions: conn.parseMention(text)}, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
//await conn.sendButton(m.chat, text, texto + `\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}\n${wm}`, gata.getRandom(), [['🌅 𝙀𝙉𝙏𝙍𝙀𝙂𝘼 𝘿𝙀𝙇 𝙈𝙀𝙎 | 𝙈𝙊𝙉𝙏𝙃 🌠', '/monthly'], ['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']], m, enlace)  
user.lastweekly = new Date * 1
}
handler.command = ['weekly', 'semana', 'semanal', 'cadasemana', 'entregasemanal'] 
handler.level = 7
handler.register = true
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function clockString(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['┃⇢ ', ye, ' *🗓️ Años : Year*\n', '┃⇢ ', mo, ' *⛅ Mes : Month*\n', '┃⇢ ', d, ' *☀️ Días : Days*\n', '┃⇢ ', h, ' *⏰ Horas : Hours*\n', '┃⇢ ', m, ' *🕐 Minutos : Minutes*\n', '┃⇢ ', s, ' *⏱️ Segundos : Seconds*'].map(v => v.toString().padStart(2, 0)).join('')
}

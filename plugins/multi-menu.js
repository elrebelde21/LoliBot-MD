import { xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch' 
let handler = async (m, { conn, usedPrefix, command, args, usedPrefix: _p, __dirname, isOwner, text, isAdmin, isROwner }) => {
try{
const { levelling } = '../lib/levelling.js'
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)

let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let { money } = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),

exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,

level, limit, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
  
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
let user = global.db.data.users[m.sender]
//user.registered = false

let pp = gataVidMenu.getRandom()
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let fsizedoc = '1'.repeat(10)
let adReply = { fileLength: fsizedoc, seconds: fsizedoc, contextInfo: { forwardingScore: fsizedoc, externalAdReply: { showAdAttribution: true, title: wm, body: '👋 ' + username, mediaUrl: ig, description: 'Hola', previewType: 'PHOTO', thumbnail: await(await fetch(gataMenu.getRandom())).buffer(), sourceUrl: redesMenu.getRandom() }}}

const temaX = [['pornololi', 'nsfwloli'], ['pornopies', 'nsfwfoot'], ['pornoass', 'nsfwass'], ['pornobdsm', 'nsfwbdsm'], ['pornocum', 'nsfwcum'],
['pornoero', 'nsfwero'], ['pornodominar', 'nsfwfemdom'], ['pornoglass', 'nsfwglass'], ['pornohentai', 'nsfwhentai'], ['pornorgia', 'nsfworgy'], ['pornotetas', 'nsfwboobs'],
['pornobooty', 'nsfwbooty'], ['pornoecchi', 'nsfwecchi'], ['pornofurro', 'nsfwfurry'], ['pornotrapito', 'nsfwtrap'], ['pornolesbiana', 'nsfwlesbian'],
['pornobragas', 'nsfwpanties'], ['pornopene', 'nsfwpenis'], ['porno', 'porn'], ['pornorandom', 'pornrandom'], ['pornopechos', 'nsfwbreasts'],
['pornoyaoi', 'nsfwyaoi'], ['pornoyaoi2', 'nsfwyaoi2'], ['pornoyuri', 'nsfwyuri'], ['pornoyuri2', 'nsfwyuri2'], ['pornodarling', 'nsfwdarling'],
['pornodragonmaid', 'nsfwdragonmaid'], ['pornokonosuba', 'nsfwkonosuba'], ['pornopokemon', 'nsfwpokemon'], ['pornotoloveru', 'nsfwtoloveru'], ['pornouzaki', 'nsfwuzaki'],
['pornopack', 'nsfwpack'], ['pornopackchica', 'nsfwpackgirl'], ['pornopackchico', 'nsfwpackmen'], ['pornohentai3', 'nsfwhentai3'], ['pornoass2', 'nsfwass2'],
['pornosticker', 'nsfwsticker'], ['pornochica', 'nsfwsgirl'], ['pornoass3', 'nsfwass3'], ['pornotetas2', 'nsfwboobs2'], ['pornotetas3', 'nsfwboobs3'],
['pornopussy', 'nsfwpussy'], ['pornopaizuri', 'nsfwpaizuri'], ['pornoneko', 'nsfwneko'], ['pornopies2', 'nsfwfoot2'], ['pornoyuri3', 'nsfwyuri3'],
['pornomuslo', 'nsfwhthigh'], ['pornochica2', 'nsfwsgirl2'], ['pornoanal', 'nsfwanal'], ['pornomamada', 'nsfwblowjob'], ['pornogonewild', 'nsfwgonewild'],
['pornofurro2', 'nsfwfurry2'], ['pornotentacle', 'nsfwtentacle'], ['porno4k', 'porn4k'], ['pornokanna', 'nsfwkanna'], ['pornoanal2', 'nsfwanal2'],
['pornoalimento', 'nsfwfood'], ['pornoholo', 'nsfwholo'], ['pornoanal3', 'nsfwanal3'], ['pornomamada2', 'nsfwblowjob2'], ['pornocum2', 'nsfwcum2'],
['pornofuck', 'nsfwfuck'], ['pornoneko2', 'nsfwneko2'], ['pornopussy2', 'nsfwpussy2'], ['pornosolo', 'nsfwsolo'], ['pornorgia2', 'nsfworgy2'],
['pornorgia3', 'nsfworgy3'], ['pornoyaoi3', 'nsfwyaoi3'], ['pornocosplay', 'nsfwcosplay'], ['pornodbz', 'nsfwdbz'], ['pornogenshin', 'nsfwgenshin'],
['pornokimetsu', 'nsfwkimetsu'], ['pornohentai2', 'nsfwhentai2'], ['pornonintendo', 'nsfwnintendo'], ['pornohololive', 'nsfwhololive'], ['pornoheroacademy', 'nsfwheroacademy'],
['pornorezero', 'nsfwrezero'], ['pornotatsumaki', 'nsfwtatsumaki'], ['pornonaruto', 'nsfwnaruto'], ['pornokitagawa', 'nsfwkitagawa'], ['pornovid', 'nsfwvid'],
['pornovid2', 'nsfwvid2'], ['pornovidlesbi', 'nsfwvidlesbi'], ['pornovidgay', 'nsfwvidgay'], ['pornovidbisexual', 'nsfwvidbisexual'], ['pornovidrandom', 'nsfwvidrandom']]

if (command == 'audioefectomenu'){ //audio
let menuA = `🎧 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆🎧🎧🎧🎧🎧🎧🎧🎧🎧
┆ *¡𝙃𝙤𝙡𝙖!* ${username} ✨
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🎧🎧🎧🎧🎧🎧🎧🎧🎧
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖  ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡  ➺ ${level}*
┆❏ *𝙍𝙤𝙡 ➺* ${role}
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤  ➺ ${Object.keys(global.db.data.users).length}* 
┆🎧🎧🎧🎧🎧🎧🎧🎧🎧
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「𝙀𝙛𝙚𝙘𝙩𝙤𝙨 𝙖𝙪𝙙𝙞𝙤𝙨 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🧰 _${usedPrefix}bass_
┆🧰 _${usedPrefix}blown_
┆🧰 _${usedPrefix}deep_
┆🧰 _${usedPrefix}earrape_
┆🧰 _${usedPrefix}fast_
┆🧰 _${usedPrefix}fat_
┆🧰 _${usedPrefix}nightcore_
┆🧰 _${usedPrefix}reverse_
┆🧰 _${usedPrefix}robot_
┆🧰 _${usedPrefix}slow_
┆🧰 _${usedPrefix}smooth_
┆🧰 _${usedPrefix}tupai_
╰──────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

  
} if (command == 'buscarmenu'){ //buscador
let menuA = `🎈 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆🎈🎈🎈🎈🎈🎈🎈🎈🎈
┆❏ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}*
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡 ➺ ${level}*
┆❏ *𝙍𝙤𝙡 ➺  ${role}*
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ➺ ${Object.keys(global.db.data.users).length}* 
┆❏ *𝙏𝙞𝙚𝙢𝙥𝙤 𝙖𝙘𝙩𝙞𝙫𝙤 ➺ ${uptime}*
┆🎈🎈🎈🎈🎈🎈🎈🎈🎈
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「𝙄𝙣𝙛𝙤𝙧𝙢𝙖𝙘𝙞𝙤́𝙣 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🔍➺ _${usedPrefix}animeinfo *texto*_
┆🔍➺ _${usedPrefix}google *texto*_
┆🔍➺ _${usedPrefix}letra *texto*_
┆🔍➺ _${usedPrefix}ytsearch | yts *texto*_
┆🔍➺ _${usedPrefix}wiki | wikipedia *texto*_
╰──────────
`.trim()

await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

  
} if (command == 'hornymenu'){ //comandos+18
let pp = './src/+18.jpg'

let menuA = `😏 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆😏😏😏😏😏😏😏😏😏
┆❏ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}*
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖  ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡  ➺ ${level}*
┆❏ *𝙍𝙤𝙡 ➺  ${role}*
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ➺ ${Object.keys(global.db.data.users).length}* 
┆❏ *𝙏𝙞𝙚𝙢𝙥𝙤 𝙖𝙘𝙩𝙞𝙫𝙤 ➺ ${uptime}*
┆😏😏😏😏😏😏😏😏😏
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「𝗠𝗲𝗻𝘂 +𝟭𝟴 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ *𝑼́𝒔𝒂𝒍𝒐𝒔 𝒃𝒂𝒋𝒐𝒔 𝒕𝒖 𝒓𝒆𝒔𝒑𝒐𝒏𝒔𝒂𝒃𝒊𝒍𝒊𝒅𝒂𝒅*
┆ *𝑵𝒐𝒕𝒂: 𝒏𝒐 𝒔𝒆𝒂 𝒑𝒂𝒋𝒆𝒓𝒐*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🔞➺ _${usedPrefix}nsfwloli_
┆🔞➺ _${usedPrefix}nsfwfoot_
┆🔞➺ _${usedPrefix}nsfwass_
┆🔞➺ _${usedPrefix}nsfwbdsm_
┆🔞➺ _${usedPrefix}nsfwcum_
┆🔞➺ _${usedPrefix}nsfwero_
┆🔞➺ _${usedPrefix}nsfwfemdom_
┆🔞➺ _${usedPrefix}nsfwfoot_
┆🔞➺ _${usedPrefix}nsfwglss_
┆🔞➺ _${usedPrefix}nsfworgy_
┆🔞➺ _${usedPrefix}pies_
┆🔞➺ _${usedPrefix}yuri_
┆🔞➺ _${usedPrefix}yuri2_ 
┆🔞➺ _${usedPrefix}yaoi_
┆🔞➺ _${usedPrefix}yaoi2_
┆🔞➺ _${usedPrefix}panties_ 
┆🔞➺ _${usedPrefix}tetas_ 
┆🔞➺ _${usedPrefix}booty_
┆🔞➺ _${usedPrefix}ecchi_
┆🔞➺ _${usedPrefix}furro_
┆🔞➺ _${usedPrefix}hentai_
┆🔞➺ _${usedPrefix}trapito_
┆🔞➺ _${usedPrefix}imagenlesbians_
┆🔞➺ _${usedPrefix}pene_
┆🔞➺ _${usedPrefix}porno_
┆🔞➺ _${usedPrefix}porno2_
┆🔞➺ _${usedPrefix}randomxxx_
┆🔞➺ _${usedPrefix}pechos_
┆🔞➺ _${usedPrefix}pack_
┆🔞➺ _${usedPrefix}pack2_
┆🔞➺ _${usedPrefix}pack3_
┆🔞➺ _${usedPrefix}videoxxx_
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ 🥵 𝑪𝒐𝒏𝒕𝒆𝒏𝒊𝒅𝒐 𝒅𝒊𝒏𝒂́𝒎𝒊𝒄𝒐  🥵
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆»🥵 _${usedPrefix}pornovideo | pornovid_
┆»🥵 _${usedPrefix}pornovidgay | pornogayv_
┆»🥵 _${usedPrefix}pornolesbivid | pornolesbiv_
┆»🥵 _${usedPrefix}pornobisexualvid | pornobiv_
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ ❤️‍🔥 𝑩𝒖𝒔𝒄𝒂𝒓 𝒚 𝒅𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒓 ❤️‍🔥
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆❤️‍🔥➺ _${usedPrefix}xnxxsearch | buscarxnxx *texto*_
┆❤️‍🔥➺ _${usedPrefix}xvideossearch *texto*_
┆❤️‍🔥➺ _${usedPrefix}xnxxdl | xnxx *enlace*_
┆❤️‍🔥➺ _${usedPrefix}xvideosdl | xvideos *enlace*_
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ 🔥 𝑪𝒐𝒏𝒕𝒆𝒏𝒊𝒅𝒐 𝒑𝒍𝒖𝒔  🔥
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ *𝑼𝒔𝒂𝒓 𝒃𝒂𝒋𝒐 𝒕𝒖 𝒓𝒆𝒔𝒑𝒐𝒏𝒔𝒂𝒃𝒊𝒍𝒊𝒅𝒂𝒅*
┆ *𝑽𝒊𝒅𝒆𝒐 +18 𝒂𝒍𝒆𝒂𝒕𝒐𝒓𝒊𝒐*
┆ *𝑷𝒖𝒆𝒅𝒆 𝒕𝒂𝒓𝒅𝒂𝒓 𝒆𝒏 𝒆𝒏𝒗𝒊𝒂𝒓*
┆ *𝑪𝒐𝒏𝒕𝒆𝒏𝒊𝒅𝒐 𝒅𝒆 𝒄𝒂𝒍𝒊𝒅𝒂𝒅*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆»🔥 _${usedPrefix}pornopremium_
╰──────────`.trim()

await conn.sendButton(m.chat, menuA, menuB, pp, [
[lenguajeGB.smsBotonM1(), usedPrefix + 'menu'], [lenguajeGB.smsBotonM2(), usedPrefix + 'allmenu'], [lenguajeGB.lenguaje() == 'es' ? '🔞 ver lista porno 🔞'.toUpperCase() : '🔞 list horny🔞 '.toUpperCase(), lenguajeGB.lenguaje() == 'es' ? usedPrefix + 'listaporno' : usedPrefix + 'listhorny']], fkontak, adReply, m)

  
}if (command == 'listaporno' || command == 'listhorny') { //comandos+18
let sections = Object.keys(temaX).map((v, index, temaX2) => ({ title: `${lenguajeGB['smsTex4']().slice(1, -1)} : ${wm}`,
rows: [{ 
title: `${1 + index <= 33 ? '🥵' : user.premiumTime > 0 ? '🎟️🥵' : '⚠️'} ${lenguajeGB.lenguaje() == 'es' ? temaX[index][0].toUpperCase() : temaX[index][1].toUpperCase()} ${1 + index <= 33 ? '🥵' : user.premiumTime > 0 ? '🥵🎟️' : '⚠️'} • ${lenguajeGB['smsBotonM7']()} ➜ ${user.premiumTime > 0 ? '✅' : '❌'}`, 
description: `${1 + index}. ${lenguajeGB.lenguaje() == 'es' ? temaX[index][0] : temaX[index][1]} ➜ ${1 + index <= 33 ? user.limit < 2 ? lenguajeGB.smsList1() + lenguajeGB.eDiamante() + lenguajeGB.smsList2() + rpgshopp.emoticon('limit') : lenguajeGB.smsList3() : lenguajeGB.smsList4() + rpg.emoticon('premium')}`, 
rowId: `${usedPrefix}${1 + index <= 33 ? user.limit < 2 ? 'buy limit 5' : lenguajeGB.lenguaje() == 'es' ? temaX[index][0] : temaX[index][1] : user.premiumTime > 0 ? lenguajeGB.lenguaje() == 'es' ? temaX[index][0] : temaX[index][1] : 'pase premium' }` }], }))

let name = await conn.getName(m.sender)
const listMessage = {
text: `${user.premiumTime > 0 ? lenguajeGB.smsCont18PornP() : lenguajeGB.smsCont18Porn()}`,
footer: `╭━━━✦ 🛐 ✦━━━━⬣
🔞 ${lenguajeGB.smsConfi2()} *${name}*
${lenguajeGB.smsList5()}
╰━━━✦ *${vs}* ✦━━━⬣
${wm}`,
title: null,
buttonText: lenguajeGB.smsList6(),
sections }
conn.sendMessage(m.chat, listMessage, {quoted: fkontak})
  
  
} if (command == 'convertidormenu'){ //convertidor
let menuA = `📍 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆💗 *𝙃𝙤𝙡𝙖!*  *${username}*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆📍📍📍📍📍📍📍📍📍
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡 ➺ ${level}*
┆❏ *𝙍𝙤𝙡 ➺  ${role}*
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ➺ ${Object.keys(global.db.data.users).length}* 
┆📍📍📍📍📍📍📍📍📍
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「𝘾𝙤𝙣𝙫𝙚𝙧𝙩𝙞𝙙𝙤𝙧 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🛰️➺ _${usedPrefix}toimg | img | jpg *sticker*_
┆🛰️➺ _${usedPrefix}tomp3 | mp3 *video o nota de voz*_
┆🛰️➺ _${usedPrefix}tovn | vn *video o audio*_
┆🛰️➺ _${usedPrefix}tovideo *audio*_
┆🛰️➺ _${usedPrefix}tourl *video, imagen*_
┆🛰️➺ _${usedPrefix}toenlace  *video, imagen o audio*_
┆🛰️➺ _${usedPrefix}tts es *texto*_
╰──────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)  

  
} if (command == 'descargasmenu'){ //descargas
let menuA = `🪄 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆🪄🪄🪄🪄🪄🪄🪄🪄🪄
┆❏  *𝙁𝙚𝙘𝙝𝙖  ➺ ${week}, ${date}*
┆❏  *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖  ➺ ${exp}*
┆❏  *𝙉𝙞𝙫𝙚𝙡 ➺ ${level}*
┆❏  *𝙍𝙤𝙡 ➺ ${role}*
┆❏  *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏  *𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ➺ ${Object.keys(global.db.data.users).length}*
┆❏ *𝙏𝙞𝙚𝙢𝙥𝙤 𝙖𝙘𝙩𝙞𝙫𝙤 ➺ ${uptime}*
┆🪄🪄🪄🪄🪄🪄🪄🪄🪄
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🚀➺ _${usedPrefix}imagen | image *texto*_
┆🚀➺ _${usedPrefix}pinterest | dlpinterest *texto*_
┆🚀➺ _${usedPrefix}wallpaper|wp *texto*_
┆🚀➺ _${usedPrefix}play | play2 *texto o link*_
┆🚀➺ _${usedPrefix}play.1 *texto o link*_
┆🚀➺ _${usedPrefix}play.2 *texto o link*_ 
┆🚀➺ _${usedPrefix}ytmp3 | yta *link*_
┆🚀➺ _${usedPrefix}ytmp4 | ytv *link*_
┆🚀➺ _${usedPrefix}facebook | fb *link*_
┆🚀➺ _${usedPrefix}instagram *link video o imagen*_
┆🚀➺ _${usedPrefix}verig | igstalk *usuario(a)*_
┆🚀➺ _${usedPrefix}ighistoria | igstory *usuario(a)*_
┆🚀➺ _${usedPrefix}tiktok *link*_
┆🚀➺ _${usedPrefix}tiktokfoto | tiktokphoto *usuario(a)*_
┆🚀➺ _${usedPrefix}vertiktok | tiktokstalk *usuario(a)*_
┆🚀➺ _${usedPrefix}mediafire | dlmediafire *link*_
┆🚀➺ _${usedPrefix}clonarepo | gitclone *link*_
╰──────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

  
} if (command == 'juegosmenu'){ //fun
let menuA = `🎠 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆🎠🎠🎠🎠🎠🎠🎠🎠🎠
┆❏ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}*
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡 ➺ ${level}*
┆❏ *𝙍𝙤𝙡 ➺* ${role}
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ➺ ${Object.keys(global.db.data.users).length}* 
┆🎠🎠🎠🎠🎠🎠🎠🎠🎠
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「𝙅𝙪𝙚𝙜𝙤𝙨 𝙙𝙞𝙣𝙖́𝙢𝙞𝙘𝙤𝙨  」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🎡➺ _${usedPrefix}mates | matemáticas | math_
┆🎡➺ _${usedPrefix}ppt *piedra : papel : tijera*_
┆🎡➺ _${usedPrefix}topgays_
┆🎡➺ _${usedPrefix}topotakus_
┆🎡➺ _${usedPrefix}gay | gay *@tag*_
┆🎡➺ _${usedPrefix}gay2 *nombre : @tag*_
┆🎡➺ _${usedPrefix}lesbiana *nombre : @tag*_
┆🎡➺ _${usedPrefix}manca *nombre : @tag*_
┆🎡➺ _${usedPrefix}manco *nombre : @tag*_
┆🎡➺ _${usedPrefix}pajero *nombre : @tag*_
┆🎡➺ _${usedPrefix}pajera *nombre : @tag*_
┆🎡➺ _${usedPrefix}puto *nombre : @tag*_
┆🎡➺ _${usedPrefix}puta *nombre : @tag*_
┆🎡➺ _${usedPrefix}rata *nombre : @tag*_
┆🎡➺ _${usedPrefix}love *nombre : @tag*_
┆🎡➺ _${usedPrefix}doxear *nombre : @tag*_
┆🎡➺ _${usedPrefix}doxxeame_
┆🎡➺ _${usedPrefix}pregunta *texto*_
┆🎡➺ _${usedPrefix}slot *apuesta*_
┆🎡➺ _${usedPrefix}formarpareja_
┆🎡➺ _${usedPrefix}dado_
┆🎡➺ _${usedPrefix}verdad_
┆🎡➺ _${usedPrefix}reto_
┆🎡➺ _${usedPrefix}simi | okgoogle *texto*_
┆🎡➺ _${usedPrefix}alexa | siri | cortana *texto*_
┆🎡➺ _${usedPrefix}simsimi | bixby *texto*_
┆🎡➺ _${usedPrefix}multijuegos_
┆🎡➺ _${usedPrefix}juegos_
╰───────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

  
} if (command == 'grupomenu'){ //grupo
let menuA = `🔰 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷  *${wm}*
┆🔰🔰🔰🔰🔰🔰🔰🔰🔰
┆❏ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}* 
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡 ➺ ${level}*
┆❏ *𝙍𝙤𝙡 ➺* ${role}
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ➺ ${Object.keys(global.db.data.users).length}* 
┆❏ *𝙏𝙞𝙚𝙢𝙥𝙤 𝙖𝙘𝙩𝙞𝙫𝙤 ➺ ${uptime}*
┆🔰🔰🔰🔰🔰🔰🔰🔰🔰
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「𝙈𝙚𝙣𝙪 𝙙𝙚 𝙜𝙧𝙪𝙥𝙤𝙨 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🌐➺ _${usedPrefix}add *numero*_
┆🌐➺ _${usedPrefix}sacar | ban | kick  *@tag*_
┆🌐➺ _${usedPrefix}grupo *abrir : cerrar*_
┆🌐➺ _${usedPrefix}group *open : close*_
┆🌐➺ _${usedPrefix}daradmin | promote *@tag*_
┆🌐➺ _${usedPrefix}quitar | demote *@tag*_
┆🌐➺ _${usedPrefix}banchat_
┆🌐➺ _${usedPrefix}unbanchat_
┆🌐➺ _${usedPrefix}admins *texto*_
┆🌐➺ _${usedPrefix}invocar *texto*_
┆🌐➺ _${usedPrefix}tagall *texto*_
┆🌐➺ _${usedPrefix}hidetag *texto*_
┆🌐➺ _${usedPrefix}infogrupo | infogroup_
┆🌐➺ _${usedPrefix}enlace | link *texto*_
┆🌐➺ _${usedPrefix}newnombre | setname *texto*_
┆🌐➺ _${usedPrefix}newdesc | setdesc *texto*_
┆🌐➺ _${usedPrefix}setwelcome *texto*_
┆🌐➺ _${usedPrefix}setbye *texto*_
┆🌐➺ _${usedPrefix}on_
┆🌐➺ _${usedPrefix}off_
╰─────────────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

  
} if (command == 'herramientasmenu'){ //herramientas
let menuA = `🔩 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆➤ *${week}, ${date}*
┆➤ *${lenguajeGB['smsBotonM4']()} » ${Object.keys(global.db.data.users).length}* 
┊
┆➤ *${lenguajeGB['smsBotonM5']()} »* ${role}
┆➤ *${lenguajeGB['smsBotonM6']()} » ${level}*
┆➤ *${lenguajeGB['smsBotonM7']()} »* ${user.premiumTime > 0 ? '✅' : '❌'}
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「 ${lenguajeGB['smsTex12']()} 🛠️ 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆❏ ➺ _${usedPrefix}afk *motivo*_
┆❏ ➺ _${usedPrefix}acortar *url*_
┆❏ ➺ _${usedPrefix}calc *operacion math*_
┆❏ ➺ _${usedPrefix}del *respondre a mensaje del Bot*_
┆❏ ➺ _${usedPrefix}qrcode *texto*_
┆❏ ➺ _${usedPrefix}readmore *texto1|texto2*_
┆❏ ➺ _${usedPrefix}spamwa *numero|texto|cantidad*_
┆❏ ➺ _${usedPrefix}styletext *texto*_
┆❏ ➺ _${usedPrefix}traducir *texto*_
┆❏ ➺ _${usedPrefix}morse codificar *texto*_
┆❏ ➺ _${usedPrefix}morse decodificar *morse*_
┆❏ ➺ _${usedPrefix}encuesta | poll *Motivo*_
┆❏ ➺ _${usedPrefix}horario_
╰─────────────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

 
} if (command == 'infomenu'){ //info
let menuA = `🌟 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆🌟🌟🌟🌟🌟🌟🌟🌟🌟
┆➤ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}*
┆➤ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 ➺ ${exp}*
┆➤ *𝙉𝙞𝙫𝙚𝙡 ➺ ${level}*
┆➤ *𝙍𝙤𝙡 ➺  ${role}*
┆➤ *𝙡𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆➤ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤𝙨 ➺ ${Object.keys(global.db.data.users).length}* 
┆➤ *𝘼𝙘𝙩𝙞𝙫𝙤𝙨 ➺ ${uptime}*
┆🌟🌟🌟🌟🌟🌟🌟🌟🌟
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「 𝙄𝙣𝙛𝙤𝙢𝙚𝙣𝙪 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆❏ ➺ _${usedPrefix}cuentaslolibot_
┆❏ ➺ _${usedPrefix}gruposgrupos_
┆❏ ➺ _${usedPrefix}donar_
┆❏ ➺ _${usedPrefix}listagrupos_
┆❏ ➺ _${usedPrefix}grouplist_
┆❏ ➺ _${usedPrefix}estado_
┆❏ ➺ _${usedPrefix}infobot_
┆❏ ➺ _${usedPrefix}creador | owner_
┆❏ ➺ _${usedPrefix}velocidad | ping_
┆❏ ➺ _Bot_
┆❏ ➺ _${usedPrefix}instalarbot | installbot_
┆❏ ➺ _${usedPrefix}serbot | jadibot_
┆❏ ➺ _${usedPrefix}bots | listjadibots_
┆❏ ➺ _${usedPrefix}detener | stop_
┆❏ ➺ _${usedPrefix}reporte *texto*_ 
┆❏ ➺ _${usedPrefix}enable_
┆❏ ➺ _${usedPrefix}_Bot_
┆❏ ➺ _${usedPrefix}_términos y condiciones_
╰─────────────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

  
} if (command == 'makermenu'){ //maker
let menuA = `✨ ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ ${wm}
┆✨✨✨✨✨✨✨✨✨
┆ ☞ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}*
┆ ☞ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 ➺ ${exp}*
┆ ☞ *𝙉𝙞𝙫𝙚𝙡 ➺ ${level}*
┆ ☞ *𝙍𝙤𝙡 ➺* ${role}
┆ ☞ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆ ☞ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤  ➺ ${Object.keys(global.db.data.users).length}* 
┆✨✨✨✨✨✨✨✨✨
┆ • • •「𝙈𝙚𝙣𝙪 𝙚𝙛𝙚𝙘𝙩𝙤 𝙮 𝙡𝙤𝙜𝙤𝙨 」• • •
┆~~••~~••~~••~~••~~
┆🔆 _${usedPrefix}logos *efecto texto*_
┆⛺ _${usedPrefix}simpcard *@tag*_
┆⛺ _${usedPrefix}hornycard *@tag*_
┆⛺ _${usedPrefix}lolice *@tag*_
┆⛺ _${usedPrefix}ytcomment *texto*_
┆⛺ _${usedPrefix}itssostupid_
┆⛺ _${usedPrefix}pixelar_
┆⛺ _${usedPrefix}blur_
┆⛺ ${usedPrefix}logocorazon *Texto*
┆⛺ ${usedPrefix}3dtext *Texto*
┆⛺ ${usedPrefix}angels *Texto*
┆⛺ ${usedPrefix}batshalloween *Texto*
┆⛺ ${usedPrefix}bear2 *Texto*
┆⛺ ${usedPrefix}boom *Texto*
┆⛺ ${usedPrefix}graffiticartoon *Texto*
┆⛺ ${usedPrefix}girlgamer *Texto*
┆⛺ ${usedPrefix}firework *Texto*
┆⛺ ${usedPrefix}gold *Texto*
┆⛺ ${usedPrefix}handlove *Texto*
┆⛺ ${usedPrefix}heartcup *Texto*
┆⛺ ${usedPrefix}heartflashlight *Texto*
┆⛺ ${usedPrefix}birthdaycake *Texto*
┆⛺ ${usedPrefix}birthdaycake2 *Texto*
┆⛺ ${usedPrefix}birthdaycake3 *Texto*
┆⛺ ${usedPrefix}facebooksilverplay *Texto*
┆⛺ ${usedPrefix}facebooksilverplay2 *Texto*
┆⛺ ${usedPrefix}neonsantin *Texto*
┆⛺ ${usedPrefix}womenday *Texto*
┆⛺ ${usedPrefix}summerysand *Texto*
┆⛺ ${usedPrefix}wetglass *Texto*
┆⛺ ${usedPrefix}mylove *Texto*
┆⛺ ${usedPrefix}pikachu *Texto*
┆⛺ ${usedPrefix}logochristmas *Texto*
┆⛺ ${usedPrefix}cardchristmas *Texto*
┆⛺ ${usedPrefix}flowercard *Texto*
╰──────────╯
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

  
/*} if (command == 'menulogos2'){ //marker
let menuA = `⛲ ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `╭┄〔 *${wm}* 〕┄⊱
┊დ *${week}, ${date}*
┊დ *${lenguajeGB['smsBotonM4']()} » ${Object.keys(global.db.data.users).length}* 
┊
┊დ *${lenguajeGB['smsBotonM5']()} »* ${role}
┊დ *${lenguajeGB['smsBotonM6']()} » ${level}*
┊დ *${lenguajeGB['smsBotonM7']()} »* ${user.premiumTime > 0 ? '✅' : '❌'}
╰┄┄┄┄〔 *𓃠 ${vs}* 〕┄┄┄┄⊱
⠇ ${lenguajeGB['smsTex15']()} 🌅
∘ ${usedPrefix}logocorazon *Texto*
∘ ${usedPrefix}3dtext *Texto*
∘ ${usedPrefix}angels *Texto*
∘ ${usedPrefix}batshalloween *Texto*
∘ ${usedPrefix}bear2 *Texto*
∘ ${usedPrefix}boom *Texto*
∘ ${usedPrefix}graffiticartoon *Texto*
∘ ${usedPrefix}girlgamer *Texto*
∘ ${usedPrefix}firework *Texto*
∘ ${usedPrefix}gold *Texto*
∘ ${usedPrefix}handlove *Texto*
∘ ${usedPrefix}heartcup *Texto*
∘ ${usedPrefix}heartflashlight *Texto*
∘ ${usedPrefix}birthdaycake *Texto*
∘ ${usedPrefix}birthdaycake2 *Texto*
∘ ${usedPrefix}birthdaycake3 *Texto*
∘ ${usedPrefix}facebooksilverplay *Texto*
∘ ${usedPrefix}facebooksilverplay2 *Texto*
∘ ${usedPrefix}neonsantin *Texto*
∘ ${usedPrefix}womenday *Texto*
∘ ${usedPrefix}summerysand *Texto*
∘ ${usedPrefix}wetglass *Texto*
∘ ${usedPrefix}mylove *Texto*
∘ ${usedPrefix}pikachu *Texto*
∘ ${usedPrefix}logochristmas *Texto*
∘ ${usedPrefix}cardchristmas *Texto*
∘ ${usedPrefix}flowercard *Texto*
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)
*/
  
} if (command == 'ownermenu'){ //propietario(a)
let menuA = `🛂 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️
┆❏ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}*
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖  ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡  ➺* ${level}
┆❏ *𝙍𝙤𝙡 ➺ ${role}*
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤  ➺ ${Object.keys(global.db.data.users).length}* 
┆❏ *𝙏𝙞𝙚𝙢𝙥𝙤 𝙖𝙘𝙩𝙞𝙫𝙤 ➺ ${uptime}*
┆⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️⚙️
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「𝙈𝙚𝙣𝙪 𝙥𝙖𝙧𝙖 𝙚𝙡 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤/𝙖 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆💎➺ _${usedPrefix}actualizar | update_
┆💎➺ _${usedPrefix}reiniciar | restart_
┆💎➺ _${usedPrefix}borrartmp | cleartmp_
┆💎➺ _${usedPrefix}ban1 | banchat1_
┆💎➺ _${usedPrefix}desban1 | unbanchat1_
┆💎➺ _${usedPrefix}comunicar | broadcastall | bc_
┆💎➺ _${usedPrefix}comunicarpv | broadcastchats | bcc_
┆💎➺ _${usedPrefix}comunicargrupos | broadcastgc_
┆💎➺ _${usedPrefix}bcgc_
┆💎➺ _${usedPrefix}addprem | userpremium *@tag* *cantidad*_
┆💎➺ _${usedPrefix}idioma | language *código*_
┆💎➺ _${usedPrefix}cajafuerte_
┆💎➺ _${usedPrefix}delexp *@tag*_
┆💎➺ _${usedPrefix}addprem | +prem *@tag*_
┆💎➺ _${usedPrefix}delprem | -prem *@tag*_
┆💎➺ _${usedPrefix}listapremium | listprem_
┆💎➺ _${usedPrefix}añadirdiamantes *@tag cantidad*_
┆💎➺ _${usedPrefix}añadirxp *@tag cantidad*_
┆💎➺ _${usedPrefix}añadirlolicoins *@tag cantidad*_
╰─────────────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

  
} if (command == 'randommenu'){ //randomm
let menuA = `⛩️ ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆⛩️⛩️⛩️⛩️⛩️⛩️⛩️⛩️⛩️
┆❏ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}*
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡  ➺ ${level}*
┆❏ *𝙍𝙤𝙡 ➺* ${role}
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ➺ ${Object.keys(global.db.data.users).length}* 
┆⛩️⛩️⛩️⛩️⛩️⛩️⛩️⛩️⛩️
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「 ${lenguajeGB['smsTex23']()} 🧩 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🧩 _${usedPrefix}chica_
┆🧩 _${usedPrefix}chico_
┆🧩 _${usedPrefix}cristianoronaldo_
┆🧩 _${usedPrefix}messi_
┆🧩 _${usedPrefix}meme_
┆🧩 _${usedPrefix}itzy_
┆🧩 _${usedPrefix}blackpink_
┆🧩 _${usedPrefix}kpop *blackpink : exo : bts*_
┆🧩 _${usedPrefix}lolivid_
┆🧩 _${usedPrefix}loli_
┆🧩 _${usedPrefix}navidad_
┆🧩 _${usedPrefix}ppcouple_
┆🧩 _${usedPrefix}neko_
┆🧩 _${usedPrefix}waifu_
┆🧩 _${usedPrefix}akira_
┆🧩 _${usedPrefix}akiyama_
┆🧩 _${usedPrefix}anna_
┆🧩 _${usedPrefix}asuna_
┆🧩 _${usedPrefix}ayuzawa_
┆🧩 _${usedPrefix}boruto_
┆🧩 _${usedPrefix}chiho_
┆🧩 _${usedPrefix}chitoge_
┆🧩 _${usedPrefix}deidara_
┆🧩 _${usedPrefix}erza_
┆🧩 _${usedPrefix}elaina_
┆🧩 _${usedPrefix}eba_
┆🧩 _${usedPrefix}emilia_
┆🧩 _${usedPrefix}hestia_
┆🧩 _${usedPrefix}hinata_
┆🧩 _${usedPrefix}inori_
┆🧩 _${usedPrefix}isuzu_
┆🧩 _${usedPrefix}itachi_
┆🧩 _${usedPrefix}itori_
┆🧩 _${usedPrefix}kaga_
┆🧩 _${usedPrefix}kagura_
┆🧩 _${usedPrefix}kaori_
┆🧩 _${usedPrefix}keneki_
┆🧩 _${usedPrefix}kotori_
┆🧩 _${usedPrefix}kurumi_
┆🧩 _${usedPrefix}madara_
┆🧩 _${usedPrefix}mikasa_
┆🧩 _${usedPrefix}miku_
┆🧩 _${usedPrefix}minato_
┆🧩 _${usedPrefix}naruto_
┆🧩 _${usedPrefix}nezuko_
┆🧩 _${usedPrefix}sagiri_
┆🧩 _${usedPrefix}sasuke_
┆🧩 _${usedPrefix}sakura_
┆🧩 _${usedPrefix}cosplay_
╰━━━━━━━━━━━━━━━━⬣
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)

  
} if (command == 'rpgmenu'){ //rpg
let menuA = `🪅 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆⚒️⚒️⚒️⚒️⚒️⚒️⚒️⚒️⚒️
┆❏ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}*
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡 ➺ ${level}*
┆❏ *𝙍𝙤𝙡 ➺ ${role}*
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ➺ ${Object.keys(global.db.data.users).length}* 
┆⚒️⚒️⚒️⚒️⚒️⚒️⚒️⚒️⚒️
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「 ${lenguajeGB['smsTex21']()} ⚗️ 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🪅 _${usedPrefix}botemporal *enlace* *cantidad*_
┆🪅 _${usedPrefix}addbot *enlace* *cantidad*_
┆⚗️➺ _${usedPrefix}pase premium_
┆⚗️➺ _${usedPrefix}pass premium_
┆⚗️➺ _${usedPrefix}listapremium | listprem_
┆⚗️➺ _${usedPrefix}transfer *tipo cantidad @tag*_
┆⚗️➺ _${usedPrefix}dar *tipo cantidad @tag*_
┆⚗️➺ _${usedPrefix}enviar *tipo cantidad @tag*_
┆⚗️➺ _${usedPrefix}balance_
┆⚗️➺ _${usedPrefix}cartera | wallet_
┆⚗️➺ _${usedPrefix}experiencia | exp_
┆⚗️➺ _${usedPrefix}top | lb | leaderboard_
┆⚗️➺ _${usedPrefix}nivel | level | lvl_
┆⚗️➺ _${usedPrefix}rol | rango_
┆⚗️➺ _${usedPrefix}inventario | inventory_
┆⚗️➺ _${usedPrefix}aventura | adventure_
┆⚗️➺ _${usedPrefix}caza | cazar | hunt_
┆⚗️➺ _${usedPrefix}animales_
┆⚗️➺ _${usedPrefix}alimentos_
┆⚗️➺ _${usedPrefix}curar | heal_
┆⚗️➺ _${usedPrefix}minardiamantes | minargemas_
┆⚗️➺ _${usedPrefix}minargatacoins | minarcoins_
┆⚗️➺ _${usedPrefix}minarexperiencia | minarexp_
┆⚗️➺ _${usedPrefix}minar *:* minar2 *:* minar3_
┆⚗️➺ _${usedPrefix}buy_
┆⚗️➺ _${usedPrefix}sell_
┆⚗️➺ _${usedPrefix}verificar | registrar_
┆⚗️➺ _${usedPrefix}perfil | profile_
┆⚗️➺ _${usedPrefix}myns_
┆⚗️➺ _${usedPrefix}unreg *numero de serie*_
┆⚗️➺ _${usedPrefix}reclamar | regalo | claim_
┆⚗️➺ _${usedPrefix}cofre | abrircofre | coffer_
┆⚗️➺ _${usedPrefix}trabajar | work_
╰─────────────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)


} if (command == 'stickermenu'){ //sticker
let menuA = `🧸 ${lenguajeGB['smsConfi2']()} *${username}*`.trim()
let menuB = `┌───⊷ *${wm}*
┆🧸🧸🧸🧸🧸🧸🧸🧸🧸 
┆❏ *𝙁𝙚𝙘𝙝𝙖 ➺ ${week}, ${date}*
┆❏ *𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 ➺ ${exp}*
┆❏ *𝙉𝙞𝙫𝙚𝙡 ➺ ${level}*
┆❏ *𝙍𝙤𝙡 ➺* ${role}
┆❏ *𝙇𝙤𝙡𝙞𝙘𝙤𝙞𝙣𝙨 ➺ $ ${money}*
┆❏ *𝙐𝙨𝙪𝙖𝙧𝙞𝙤 ➺ ${Object.keys(global.db.data.users).length}* 
┆❏ *𝙏𝙞𝙚𝙢𝙥𝙤 𝙖𝙘𝙩𝙞𝙫𝙤 ➺ ${uptime}*
┆🧸🧸🧸🧸🧸🧸🧸🧸🧸 
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ • • •「 ${lenguajeGB['smsTex22']()} 🎐 」• • •
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🎐 _${usedPrefix}sticker | s *imagen o video*_
┆🎐 _${usedPrefix}sticker | s *url de tipo jpg*_
┆🎐 _${usedPrefix}emojimix *😺+😆*_
┆🎐 _${usedPrefix}scircle | círculo *imagen*_
┆🎐 _${usedPrefix}semoji | emoji *tipo emoji*_
┆🎐 _${usedPrefix}attp *texto*_
┆🎐 _${usedPrefix}attp2 *texto*_
┆🎐 _${usedPrefix}ttp *texto*_
┆🎐 _${usedPrefix}ttp2 *texto*_
┆🎐 _${usedPrefix}ttp3 *texto*_
┆🎐 _${usedPrefix}ttp4 *texto*_
┆🎐 _${usedPrefix}ttp5 *texto*_
┆🎐 _${usedPrefix}ttp6 *texto*_
┆🎐 _${usedPrefix}palmaditas | pat *@tag*_
┆🎐 _${usedPrefix}bofetada | slap *@tag*_
┆🎐 _${usedPrefix}besar | kiss *@tag*_
┆🎐 _${usedPrefix}alimentar | food *@tag*_
┆🎐 _${usedPrefix}dado_
┆🎐 _${usedPrefix}wm *packname|author*_
┆🎐 _${usedPrefix}wm *texto1|texto2*_
┆🎐 _${usedPrefix}stickermarker *efecto : responder a imagen*_
┆🎐 _${usedPrefix}stickerfilter *efecto : responder a imagen*_
┆🎐 _${usedPrefix}cs *:* cs2_
╰─────────────────
`.trim()
await conn.sendButtonVid(m.chat, pp, menuA, menuB, lenguajeGB.smsBotonM1(), '.menu', lenguajeGB.smsBotonM2(), '/allmenu', lenguajeGB.smsBotonM3(), '#inventario', fkontak, adReply)
} 
} catch (e) {
await conn.sendButton(m.chat, `\n${wm}`, lenguajeGB['smsMalError3']() + '#report ' + usedPrefix + command, null, [[lenguajeGB.smsMensError1(), `#reporte ${lenguajeGB['smsMensError2']()} *${usedPrefix + command}*`]], m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}
}
handler.help = ['infomenu'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = ['audioefectomenu', 'buscarmenu', 'hornymenu', 'listaporno', 'listhorny', 'convertidormenu', 'descargasmenu', 'juegosmenu', 'grupomenu',
'herramientasmenu', 'infomenu', 'makermenu', 'menulogos2', 'ownermenu', 'randommenu', 'rpgmenu', 'stickermenu'] 
//handler.register = true
handler.exp = 50
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}

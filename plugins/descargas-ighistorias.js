let handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat,       `${lenguajeGB['smsAvisoMG']()}𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙚𝙡 𝙉𝙤𝙢𝙗𝙧𝙚 𝙙𝙚 𝙪𝙨𝙪𝙖𝙧𝙞𝙤 𝙙𝙚 𝙄𝙂 𝙥𝙖𝙧𝙖 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙧 𝙡𝙖𝙨 𝙝𝙞𝙨𝙩𝙤𝙧𝙞𝙖\n𝙀𝙟:\n*${usedPrefix + command} gatadios*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, body: wm, previewType: 0, thumbnail: img.getRandom(), sourceUrl: loli.getRandom()}}})
try {
await conn.reply(m.chat,  `⌛ 𝐀𝐠𝐮𝐚𝐫𝐝𝐞 𝐮𝐧 𝐦𝐨𝐦𝐞𝐧𝐭𝐨 𝐲𝐚 𝐯𝐨𝐲 𝐜𝐨𝐧 𝐭𝐮 𝐩𝐞𝐫𝐝𝐢𝐝𝐨 🏃‍♂️...`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, body: ' 🚫𝐍𝐨 𝐇𝐚𝐠𝐚 𝐬𝐩𝐚𝐦 ', previewType: 0, thumbnail: img.getRandom(), sourceUrl: loli.getRandom()}}})    
const res = await fetch(`https://api.lolhuman.xyz/api/igstory/${args[0]}?apikey=${lolkeysapi}`)
var anu = await res.json()
var anuku = anu.result
if (anuku == '') return m.reply(`${lenguajeGB['smsAvisoFG']()}𝙐𝙨𝙪𝙖𝙧𝙞𝙤 𝙞𝙣𝙫𝙖𝙡𝙞𝙙𝙤𝙨 𝙤 𝙨𝙞𝙣 𝙝𝙞𝙨𝙩𝙤𝙧𝙞𝙖𝙨`)  
for (var i of anuku) {
let res = await axios.head(i)
let mime = res.headers['content-type']
if (/image/.test(mime)) await conn.sendFile(m.chat, i, 'error.jpg', null, m).catch(() => { return m.reply(`${lenguajeGB['smsAvisoFG']()}𝙐𝙨𝙪𝙖𝙧𝙞𝙤 𝙞𝙣𝙫𝙖𝙡𝙞𝙙𝙤𝙨 𝙤 𝙨𝙞𝙣 𝙝𝙞𝙨𝙩𝙤𝙧𝙞𝙖𝙨`)})
if (/video/.test(mime)) await conn.sendFile(m.chat, i, 'error.mp4', null, m).catch(() => { return m.reply(`${lenguajeGB['smsAvisoFG']()}𝙐𝙨𝙪𝙖𝙧𝙞𝙤 𝙞𝙣𝙫𝙖𝙡𝙞𝙙𝙤𝙨 𝙤 𝙨𝙞𝙣 𝙝𝙞𝙨𝙩𝙤𝙧𝙞𝙖𝙨`)})
}} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}
handler.help = ['igstory <username>']
handler.tags = ['downloader']
handler.command = ['igstory', 'ighistoria', 'ighistorias' ]
handler.limit = 3
handler.exp = 87
export default handler
import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
  let user = db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `🙌𝙃𝙚𝙮 𝙔𝙖 𝙚𝙨𝙩𝙖 𝙧𝙚𝙜𝙞𝙨𝙩𝙧𝙖𝙙𝙤\n\n✳️𝙌𝙪𝙞𝙚𝙧𝙚 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙧𝙚𝙜𝙞𝙨𝙩𝙧𝙖𝙨𝙩𝙚?\n\n𝙐𝙨𝙚 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 𝙥𝙖𝙧𝙖 𝙚𝙡𝙞𝙢𝙞𝙣𝙖𝙧 𝙚𝙡 𝙧𝙚𝙜𝙞𝙨𝙩𝙧𝙤 \n*${usedPrefix}unreg Número de serie*\n𝙨𝙞 𝙣𝙤 𝙧𝙚𝙘𝙪𝙚𝙧𝙙𝙖 𝙨𝙪 𝙣𝙪𝙢𝙚𝙧𝙤 𝙙𝙚 𝙨𝙚𝙧𝙞𝙚 𝙪𝙨𝙖𝙧\n${usedPrefix}myns`
  if (!Reg.test(text)) throw `${mg}✳️ 𝙐𝙨𝙤 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤: *${usedPrefix + command} nombre.edad*\n📌𝙀𝙟𝙚𝙢𝙥𝙡𝙤 : *${usedPrefix + command}* ${name2}.16`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '✳️ 𝑬𝒍 𝒏𝒐𝒎𝒃𝒓𝒆 𝒏𝒐 𝒑𝒖𝒆𝒅𝒆 𝒆𝒔𝒕𝒂 𝒗𝒂𝒄𝒊́𝒐'
  if (!age) throw '✳️ 𝑳𝒂 𝒆𝒅𝒂𝒅 𝒏𝒐 𝒑𝒖𝒆𝒅𝒆 𝒆𝒔𝒕𝒂 𝒗𝒂𝒄𝒊́𝒂'
  if (name.length >= 30) throw '✳️ 𝑷𝒇𝒇𝒇, 𝒆𝒍 𝒏𝒐𝒎𝒃𝒓𝒆 𝒆𝒔  𝒍𝒂𝒓𝒈𝒐' 
  age = parseInt(age)
  if (age > 100) throw '👴🏻 𝑷𝒂 𝒆𝒔𝒕𝒂 𝒗𝒊𝒆𝒋𝒐𝒔'
  if (age < 5) throw '🚼  𝑽𝒓𝒈 𝒍𝒐𝒔 𝒃𝒆𝒃𝒆́𝒔 𝒔𝒂𝒃𝒆𝒓 𝒆𝒔𝒄𝒓𝒊𝒃𝒊𝒓 ✍️😳 '
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
global.db.data.users[m.sender].money += 400
global.db.data.users[m.sender].limit += 4
global.db.data.users[m.sender].exp += 150
global.db.data.users[m.sender].joincount += 2
  let sn = createHash('md5').update(m.sender).digest('hex')
await conn.sendMessage(m.chat, { 
text: `┌───⊷ *𝐍𝐨𝐦𝐛𝐫𝐞:*
┆ ${name}
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ *𝐄𝐝𝐚𝐝:*
┆ ${age} años
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ *𝐁𝐨𝐧𝐨* 
┆ *$4 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞* 💎
┆ *$400 𝐋𝐨𝐥𝐢𝐜𝐨𝐢𝐧𝐬*
┆ *$150 𝐗𝐏*
┆ *$2 𝐓𝐨𝐤𝐞𝐧𝐬*
╰──────────────────`, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[m.sender],
"externalAdReply": {
"showAdAttribution": true,
"renderLargerThumbnail": true,
"thumbnail": gataImg.getRandom(), 
"title": `𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎`, 
"containsAutoReply": true,
"mediaType": 1, 
"mediaUrl": nnn, 
"sourceUrl": nnn, 
}
}
}, { quoted: fkontak })  
/* await conn.reply(m.chat, `┌───⊷ *𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎*
┆ *𝐍𝐨𝐦𝐛𝐫𝐞:*
┆ ${name}
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ *𝐄𝐝𝐚𝐝:*
┆ ${age} años
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ *𝐁𝐨𝐧𝐨* 
┆ *$4 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞* 💎
┆ *$400 𝐋𝐨𝐥𝐢𝐜𝐨𝐢𝐧𝐬*
┆ *$150 𝐗𝐏*
┆ *$2 𝐓𝐨𝐤𝐞𝐧𝐬*
╰──────────────────`, , m)*/
await m.reply(`${sn}`) 
}
handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']

handler.command = /^(verify|verificar|registrar|reg(ister)?)$/i

export default handler

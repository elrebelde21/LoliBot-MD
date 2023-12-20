import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
  let user = db.data.users[m.sender]
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let name2 = conn.getName(m.sender)
  if (user.registered === true) throw `🤨 𝙃𝙚𝙮 𝙔𝙖 𝙚𝙨𝙩𝙖 𝙧𝙚𝙜𝙞𝙨𝙩𝙧𝙖𝙙𝙤`
  if (!Reg.test(text)) throw `${mg}✳️ 𝙐𝙨𝙤 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤: *${usedPrefix + command} nombre.edad*\n📌𝙀𝙟𝙚𝙢𝙥𝙡𝙤 : *${usedPrefix + command}* ${name2}.16`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '✳️ 𝑬𝒍 𝒏𝒐𝒎𝒃𝒓𝒆 𝒏𝒐 𝒑𝒖𝒆𝒅𝒆 𝒆𝒔𝒕𝒂𝒓 𝒗𝒂𝒄𝒊́𝒐'
  if (!age) throw '✳️ 𝑳𝒂 𝒆𝒅𝒂𝒅 𝒏𝒐 𝒑𝒖𝒆𝒅𝒆 𝒆𝒔𝒕𝒂𝒓 𝒗𝒂𝒄𝒊́𝒂'
  if (name.length >= 30) throw '✳️ 𝑷𝒇𝒇𝒇, 𝒆𝒍 𝒏𝒐𝒎𝒃𝒓𝒆 𝒆𝒔  𝒍𝒂𝒓𝒈𝒐' 
  age = parseInt(age)
  if (age > 100) throw '👴🏻 𝑷𝒂 𝒆𝒔𝒕𝒂 𝒗𝒊𝒆𝒋𝒐𝒔'
  if (age < 5) throw '🚼  𝑽𝒓𝒈 𝒍𝒐𝒔 𝒃𝒆𝒃𝒆́𝒔 𝒔𝒂𝒃𝒆𝒏 𝒆𝒔𝒄𝒓𝒊𝒃𝒊𝒓 ✍️😳 '
  user.name = name.trim()
  user.age = age
  user.regTime = + new Date
  user.registered = true
global.db.data.users[m.sender].money += 400
global.db.data.users[m.sender].limit += 4
global.db.data.users[m.sender].exp += 150
global.db.data.users[m.sender].joincount += 2
  let sn = createHash('md5').update(m.sender).digest('hex')
  await conn.reply(m.chat,  `⧼⧼⧼ *𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎* ⧽⧽⧽

• *𝐍𝐨𝐦𝐛𝐫𝐞:* ${name}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
• *𝐄𝐝𝐚𝐝:* ${age} 𝐚𝐧̃𝐨𝐬
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🎁 *𝐑𝐄𝐂𝐎𝐌𝐏𝐄𝐍𝐒𝐀:*
• 4 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞 💎
• 400 𝐋𝐨𝐥𝐢𝐜𝐨𝐢𝐧𝐬
• 150 𝐗𝐏
• 2 𝐓𝐨𝐤𝐞𝐧𝐬
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*𝐓𝐨𝐭𝐚𝐥 𝐝𝐞 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨𝐬:* ${rtotalreg}`, fkontak, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: `𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎`, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: [nna, nn, md, yt, tiktok].getRandom()}}})
await m.reply(`${sn}`)}
handler.help = ['daftar', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['xp']
handler.command = /^(verify|verificar|registrar|reg(ister)?)$/i
export default handler

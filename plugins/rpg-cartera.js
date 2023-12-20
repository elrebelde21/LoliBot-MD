import fetch from 'node-fetch'
let handler = async (m, { usedPrefix, conn}) => {	
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender
let name = conn.getName(who) 
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let pp = img.getRandom()
let user = global.db.data.users[who]
let premium = user.premium
const cartera = {economia: {exp: true, limit: true, money: true, },
}
const recursos = Object.keys(cartera.economia).map(v => user[v] && `*${global.rpgshop.emoticon(v)} ⇢ ${user[v]}*`).filter(v => v).join('\n┃ ').trim()
let cart = `╭━〔 *𝑪𝒂𝒏𝒕𝒆𝒓𝒂 👝* 〕━⬣
┃ ${name} 𝑬𝒏 𝒔𝒖 𝒄𝒂𝒓𝒕𝒆𝒓𝒂 𝒕𝒊𝒆𝒏𝒆...
┃ ${recursos}
╰━━━━〔 *𓃠 ${vs}* 〕━━━⬣`
conn.sendMessage(m.chat, {text: cart, contextInfo: {forwardingScore: 9999999, isForwarded: true, mentionedJid:[who], image: {url: pp}, "externalAdReply":  {"showAdAttribution": true, "renderLargerThumbnail": true, "thumbnail": img.getRandom(), "title": wm, "containsAutoReply": true, "mediaType": 1, "mediaUrl": redes.getRandom(), "sourceUrl": redes.getRandom(), }}}, {quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal2', 'cartera', 'wallet', 'cartera2', 'balance2'] 
handler.register = true
export default handler

let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner} ) {
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"
}
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[conn.user.jid] || {}
if (isBotAdmin && chat.antifake && !isAdmin && !isOwner && !isROwner) {
//if (!db.data.chats[m.chat].antifake && m.isGroup) throw 0
let texto = `${ag}Este numero *@${m.sender.split`@`[0]}* no esta permitido en este grupo!!\n\nLo siento seras expulsado.. tu numero parece algo fake 😯`

if (m.sender.startsWith('91' || '91')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('92' || '92')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('222' || '222')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('93' || '93')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('91' || '91')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('265' || '265')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return   
} 

if (m.sender.startsWith('61' || '61')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('62' || '62')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('966' || '966')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('229' || '229')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('40' || '40')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('49' || '49')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('20' || '20')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('963' || '963')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('967' || '967')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('234' || '234')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('210' || '210')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return 
}

if (m.sender.startsWith('212' || '212')) {
await conn.reply(m.chat, texto, fkontak,  m)
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
if (responseb[0].status === "404") return   
} 	
   
}}
export default handler

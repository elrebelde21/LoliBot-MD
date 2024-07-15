import { randomBytes } from 'crypto'
let handler = async (m, { conn, command, participants, usedPrefix, text }) => {    
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${conn.user.jid.split('@')[0]}:${conn.user.jid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" } 
if (!text && !m.quoted) return m.reply('*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐞𝐥 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐪𝐮𝐞 𝐪𝐮𝐢𝐞𝐫𝐞 𝐭𝐫𝐚𝐦𝐢𝐭𝐞*')   

let users = participants.map(u => conn.decodeJid(u.id))
let cc2 = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks2 = text ? text : cc2.text 
//let d = new Date(new Date + 3600000)
//let locale = lenguajeGB.lenguaje()
//let dia = d.toLocaleDateString(locale, { weekday: 'long' })
//let fecha = d.toLocaleDateString(lenguajeGB.lenguaje(), { day: 'numeric', month: 'numeric', year: 'numeric' })
//let mes = d.toLocaleDateString(", { month: 'long' })
//let año = d.toLocaleDateString(lenguajeGB.lenguaje(), { year: 'numeric' })
//let tiempo = d.toLocaleString('es-CO', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
let groups = Object.keys(await conn.groupFetchAllParticipating())
let usersTag = participants.map(u => conn.decodeJid(u.id))
let readMS = String.fromCharCode(8206).repeat(850)
await m.reply(`*Enviando mensaje oficial, espere un momento...*`) 
for (let i = 0; i < groups.length; i++) {
const id = groups[i];
//const infoGP = lenguajeGB.smsChatGP2(readMS, dia, mes, año, fecha, tiempo)
const delay = i * 4000 //4 seg
setTimeout(async () => { 
await conn.sendMessage(id, { text: `✅ *COMUNICADO OFICIAL* ✅\n\n` + teks2, mentions: [m.sender], mentions: (await conn.groupMetadata(id)).participants.map(v => v.id) }, { quoted: fkontak }) 
//await conn.reply(id, infoGP + teks2, { mentions: (await conn.groupMetadata(id)).participants.map(v => v.id) }, { quoted: fkontak });
}, delay)}         
let totalGP = groups.length
await m.reply(`✅ 𝐌𝐞𝐧𝐬𝐚𝐣𝐞 𝐞𝐧𝐯𝐢𝐚𝐝𝐨 𝐚 ${groups.length} 𝐆𝐫𝐮𝐩𝐨/𝐬*\n\n*𝐍𝐎𝐓𝐀: 𝐄𝐬 𝐩𝐨𝐬𝐢𝐛𝐥𝐞 𝐪𝐮𝐞 𝐭𝐞𝐧𝐠𝐚 𝐟𝐚𝐥𝐥𝐨𝐬 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐲 𝐧𝐨 𝐬𝐞 𝐞𝐧𝐯𝐢𝐞 𝐚 𝐭𝐨𝐝𝐨𝐬 𝐥𝐨𝐬 𝐜𝐡𝐚𝐭𝐬, 𝐝𝐢𝐬𝐜𝐮𝐥𝐩𝐞 𝐩𝐨𝐫 𝐞𝐥 𝐦𝐨𝐦𝐞𝐧𝐭𝐨*`)
}     
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)(group|grup|gc)$/i
handler.owner = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const delay = time => new Promise(res => setTimeout(res, time))
import { db } from '../lib/postgres.js';

let handler = async (m, { conn, text, participants, metadata, args, command }) => {

if (/^(tagall|invocar|invocacion|todos|invocación)$/i.test(command)) {
try {
const metadata = await conn.groupMetadata(m.chat)
const participants = metadata.participants || []
if (!participants.length) return 
const users = participants.map(p => p.phoneNumber || p.id)
const total = users.length

await m.react("📣")
let mensaje = ""
mensaje += `*⺀ ＡＣＴＩＶＥ ＧＲＵＰＯ 🗣️⺀*\n\n`
if (text && text.trim()) {
mensaje += `❏ *Mensaje:* ${text.trim()}\n`
}
mensaje += `*👥 Miembros del grupo:* ${total}\n`
mensaje += `❏ *Etiquetas:*\n`
mensaje += users.map(u => `➥ @${u.replace(/@s\.whatsapp\.net|@lid/g, "").replace(/[^0-9]/g, "")}`).join(" \n ")

await conn.sendMessage(m.chat, { text: mensaje, mentions: users }, { quoted: m })
} catch (e) {
console.error("❌ Error en /tagall:", e)
}}

if (command == 'contador') {
const result = await db.query(`SELECT user_id, message_count
     FROM messages
     WHERE group_id = $1`, [m.chat])
     
let memberData = participants.map(mem => {
const userId = mem.id
const userData = result.rows.find(row => row.user_id === userId) || { message_count: 0 }
return { id: userId, alt: mem.participantAlt, messages: userData.message_count }
})

memberData.sort((a, b) => b.messages - a.messages)
let activeCount = memberData.filter(mem => mem.messages > 0).length
let inactiveCount = memberData.filter(mem => mem.messages === 0).length
let teks = `*📊 Actividad del grupo 📊*\n\n`
teks += `□ Grupo: ${metadata.subject || 'Sin nombre'}\n`
teks += `□ Total de miembros: ${participants.length}\n`
teks += `□ Miembros activos: ${activeCount}\n`
teks += `□ Miembros inactivos: ${inactiveCount}\n\n`
teks += `*□ Lista de miembros:*\n`

for (let mem of memberData) {
let numero = null
if (mem.id.endsWith('@lid')) {
if (mem.alt && mem.alt.endsWith('@s.whatsapp.net')) {
numero = mem.alt.split('@')[0]
} else {
const res = await db.query('SELECT num FROM usuarios WHERE lid = $1', [mem.id])
numero = res.rows[0]?.num || null
}} else if (/^\d+@s\.whatsapp\.net$/.test(mem.id)) {
numero = mem.id.split('@')[0]
}
if (numero) {
teks += `➥ @${numero} - Mensajes: ${mem.messages}\n`
}}

await conn.sendMessage(m.chat, { text: teks, mentions: memberData.map(mem => mem.alt?.endsWith('@s.whatsapp.net') ? mem.alt : mem.id).filter(jid => jid.endsWith('@s.whatsapp.net') || jid.endsWith('@lid')) }, { quoted: m })
}}
handler.help = ['tagall <mensaje>', 'invocar <mensaje>', 'contador']
handler.tags = ['group']
handler.command = /^(tagall|invocar|invocacion|todos|invocación|contador)$/i
handler.admin = true
handler.group = true
//handler.botAdmin = true

export default handler

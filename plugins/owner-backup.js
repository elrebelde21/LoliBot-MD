import fs from 'fs'

let handler = async (m, { conn }) => {
try {
let d = new Date()
let date = d.toLocaleDateString('es', { day: 'numeric',
month: 'long',
year: 'numeric'
})

const rawId = conn.user?.id?.split('@')[0] || ''
const cleanId = rawId.split(':')[0] 
const path = `./jadibot/${cleanId}/creds.json`
if (!fs.existsSync(path)) return await m.reply(`⚠️ El archivo *creds.json* no existe para: ${cleanId}`)
let creds = fs.readFileSync(path)
await m.reply(`_*📂 Preparando la sesión del subbot...*_`)
await conn.reply(m.sender, `📁 *Sesión de ${cleanId}* (${date})`, null)
await conn.sendMessage(m.sender, { document: creds, mimetype: 'application/json', fileName: `creds-${cleanId}.json` }, { quoted: m })
} catch (e) {
await m.react('❌')
console.error(e)
await m.reply("❌ Error al generar respaldo de sesión.")
}}
handler.help = ['backup']
handler.tags = ['owner']
handler.command = /^(backup|respaldo|copia)$/i
handler.owner = true

export default handler

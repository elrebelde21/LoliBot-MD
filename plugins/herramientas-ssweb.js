import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
if (!args[0]) return conn.reply(m.chat, '⚠️ Ingresa un link para sacar captura', m) 
await m.react('⌛')
try {
let ss = await (await fetch(`https://delirius-api-oficial.vercel.app/api/ssweb?url=${args[0]}`)).buffer()
conn.sendFile(m.chat, ss, 'error.png', '✅', m, null, fake)
await m.react('✅')
} catch {
await m.react('❌')
}}
handler.help = ['ss', 'ssweb'].map(v => v + ' *<url>*')
handler.tags = ['tools']
handler.command = /^ss(web)?f?$/i
handler.register = true 
handler.limit = 1
export default handler
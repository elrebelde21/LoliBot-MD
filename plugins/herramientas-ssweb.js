import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
if (!args[0]) throw await tr('⚠️ Ingresa un link para sacar capturas, ejemplo: https://skyultraplus.com')
await m.react('⌛')
try {
let ss = await (await fetch(`https://api.dorratz.com/ssweb?url=${args[0]}`)).buffer()
conn.sendFile(m.chat, ss, 'error.png', '✅', m, null, fake)
await m.react('✅')
} catch {
handler.limit = false
await m.react('❌')
}}
handler.help = ['ss', 'ssweb'].map(v => v + ' *<url>*')
handler.tags = ['tools']
handler.command = /^ss(web)?f?$/i
handler.register = true 
handler.limit = 1
export default handler
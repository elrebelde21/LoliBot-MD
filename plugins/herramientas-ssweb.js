import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
if (!args[0]) return conn.reply(m.chat, '⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐮𝐧 𝐥𝐢𝐧𝐤 𝐩𝐚𝐫𝐚 𝐬𝐚𝐜𝐚𝐫 𝐜𝐚𝐩𝐭𝐮𝐫𝐚, ej: https://skyultraplus.com', m) 
await m.react('⌛')
try {
let ss = await (await fetch(`https://api.dorratz.com/ssweb?url=${args[0]}`)).buffer()
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
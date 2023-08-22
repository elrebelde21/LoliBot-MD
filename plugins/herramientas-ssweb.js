import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
let full = /f$/i.test(command)
if (!args[0]) return conn.reply(m.chat, '*𝑰𝒏𝒈𝒓𝒆𝒔𝒂  𝒖𝒏 𝒖𝒓𝒍 𝒅𝒆 𝒍𝒂 𝒑𝒂́𝒈𝒊𝒏𝒂 𝒂 𝒍𝒂 𝒒𝒖𝒆 𝒔𝒆 𝒕𝒐𝒎𝒂𝒓𝒂́ 𝒄𝒂𝒑𝒕𝒖𝒓𝒂 🔎*', m)
let url = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0]
let ss = await (await fetch(global.API('nrtm', '/api/ssweb', { delay: 1000, url, full }))).buffer()
conn.sendFile(m.chat, ss, 'error.png', url, m)
}
handler.help = ['ss', 'ssf'].map(v => v + ' <url>')
handler.tags = ['internet']
handler.command = /^ss(web)?f?$/i
handler.limit = 3
handler.register = true
export default handler

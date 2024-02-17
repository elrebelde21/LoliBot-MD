import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
let full = /f$/i.test(command)
if (!args[0]) return conn.reply(m.chat, '*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐮𝐧𝐚 𝐮𝐫𝐥 𝐝𝐞 𝐩𝐚𝐠𝐢𝐧𝐚 𝐚 𝐥𝐚 𝐪𝐮𝐞 𝐭𝐨𝐦𝐚𝐫𝐚 𝐜𝐚𝐩𝐭𝐮𝐫𝐚 🔎*', m)
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

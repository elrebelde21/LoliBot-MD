import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {
if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()}*𝗜𝗡𝗚𝗥𝗘𝗦𝗘 𝗨𝗡 𝗘𝗡𝗟𝗔𝗖𝗘 𝗗𝗘 𝗚𝗜𝗧𝗛𝗨𝗕*\n*𝗘𝗝𝗘𝗠𝗣𝗟𝗢:*\n*${usedPrefix + command} ${md}*`
if (!regex.test(args[0])) throw `${lenguajeGB['smsAvisoFG']()}𝗘𝗡𝗟𝗔𝗖𝗘 𝗡𝗢 𝗘𝗦 𝗩𝗔𝗟𝗜𝗗𝗢 𝗗𝗘𝗕𝗘𝗥 𝗦𝗘𝗥 𝗨𝗡 𝗘𝗡𝗟𝗔𝗖𝗘 𝗗𝗘 𝗚𝗜𝗧𝗛𝗨𝗕`
try {   
let [_, user, repo] = args[0].match(regex) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
m.reply(`*𝐄𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨, 𝐮𝐧 𝐦𝐨𝐦𝐞𝐧𝐭𝐨 🚀*\n*𝐒𝐢 𝐧𝐨 𝐥𝐞 𝐥𝐥𝐞𝐠𝐚 𝐞𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 𝐞𝐬 𝐝𝐞𝐛𝐢𝐝𝐨 𝐚 𝐪𝐮𝐞 𝐞𝐥 𝐑𝐞𝐩𝐨𝐬𝐢𝐭𝐨𝐫𝐢𝐨 𝐞𝐬 𝐦𝐮𝐲 𝐩𝐞𝐬𝐚𝐝𝐨*`)
conn.sendFile(m.chat, url, filename, null, m)
} catch { 
handler.limit = 0 //❌No gastada diamante si el comando falla
}}
handler.help = ['gitclone <url>']
handler.tags = ['downloader']
handler.command = /gitclone|clonarepo|clonarrepo|repoclonar/i
handler.register = true
handler.limit = 2
handler.level = 2
export default handler

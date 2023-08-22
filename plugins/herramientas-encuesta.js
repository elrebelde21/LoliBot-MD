/* Creditos a https://github.com/ALBERTO9883 */

let handler = async (m, { conn, text, args, usedPrefix, command }) => {	
if (!args[0]) throw `⚠️️ _𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙪𝙣 𝙩𝙚𝙭𝙩𝙤 𝙥𝙖𝙧𝙖 𝙞𝙣𝙞𝙘𝙞𝙖𝙧 𝙡𝙖 𝙚𝙣𝙘𝙪𝙚𝙨𝙩𝙖!_\n\n📌 𝙀𝙟𝙚𝙢𝙥𝙡𝙤 : \n*${usedPrefix + command}* texto|texto2...`
if (!text.includes('|')) throw  `*⚠️️ 𝑺𝒆𝒑𝒂𝒓𝒆 𝒍𝒂 𝒆𝒏𝒄𝒖𝒆𝒔𝒕𝒂 𝒄𝒐𝒏* *|* \n\n📌 𝑬𝒋𝒆𝒎𝒑𝒍𝒐 : \n*${usedPrefix + command}* texto|texto2...`
let a = []
let b = text.split('|')
for (let c = 0; c < b.length; c++) { a.push([b[c]]) }
return conn.sendPoll(m.chat, `📊 *𝑬𝒏𝒄𝒖𝒆𝒔𝒕𝒂 𝒑𝒂𝒓𝒂:*\n\n${text}`, a, m)}
handler.help = ['encuesta <text|text2>']
handler.tags = ['group'] 
handler.command = ['poll', 'encuesta'] 
handler.register = true
export default handler

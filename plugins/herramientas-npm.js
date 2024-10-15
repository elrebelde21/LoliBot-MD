//import { generateWAMessageFromContent } from "@whiskeysockets/baileys"
let { generateWAMessageFromContent } = (await import(global.baileys))
import fetch from 'node-fetch'

let handler = async (m, { text }) => {
if (!text) throw '⚠️ *𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐞𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐥 𝐦𝐨́𝐝𝐮𝐥𝐨 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐚 𝐛𝐮𝐬𝐜𝐚𝐫?*'
let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
let { objects } = await res.json()
if (!objects.length) throw `⚠️ *𝐍𝐨 𝐬𝐞 𝐞𝐧𝐜𝐨𝐧𝐭𝐫𝐚𝐫𝐨𝐧 𝐫𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨𝐬 𝐝𝐞 _"${text}"_*`
let txt = objects.map(({ package: pkg }) => {
return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
}).join`\n\n`
let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: txt, contextInfo: { externalAdReply: { title: '🔎 𝐁𝐮𝐬𝐜𝐚𝐝𝐨𝐫 𝐍𝐏𝐌𝐉𝐒', body: botname, thumbnailUrl: 'https://telegra.ph/file/f40f44ea9fc4c49fe6f2f.jpg', sourceUrl: md }}}}, { quoted: m })
conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id })
}
handler.help = ['npmsearch']
handler.tags = ['tools']
handler.command = /^npm(js|search)?$/i
handler.register = true 
handler.limit = 1
export default handler
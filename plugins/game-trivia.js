import fs from 'fs'
let timeout = 10000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
conn.tekateki = conn.tekateki ? conn.tekateki : {}
let id = m.chat
if (id in conn.tekateki) {
conn.reply(m.chat, 'Todavía hay una pregunta sin responder en este chat', conn.tekateki[id][0])
throw false
}
let tekateki = JSON.parse(fs.readFileSync(`./src/game/trivia.json`))
let json = tekateki[Math.floor(Math.random() * tekateki.length)]
let _clue = json.response
let clue = _clue.replace(/[A-Za-z]/g, '_')
let caption = `
ⷮ *${json.question}*

*• Tiempo:* ${(timeout / 1000).toFixed(2)} segundos
*• Bono:* +${poin} Exp
`.trim()
conn.tekateki[id] = [
await //conn.reply(m.chat, caption, m),
conn.sendMessage(m.chat, { text: caption, contextInfo:{forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "body": `• 𝐓𝐑𝐈𝐕𝐈𝐀 •`, "previewType": "PHOTO", thumbnail: imagen1, sourceUrl: md}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}), json, poin, setTimeout(async () => {
if (conn.tekateki[id]) await conn.reply(m.chat, `Se acabó el tiempo!`, conn.tekateki[id][0])
delete conn.tekateki[id]
}, timeout)
]}
handler.help = ['trivia']
handler.tags = ['game']
handler.command = /^(trivia|triviador|adivinaza)$/i
handler.register = true
export default handler
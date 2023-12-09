import { sticker } from '../lib/sticker.js'

let handler = m => m

handler.all = async function (m) {
let chat = db.data.chats[m.chat]
let user = db.data.users[m.sender]

if (chat.autosticker && m.isGroup) {
let q = m
let stiker = false
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp/g.test(mime)) return
if (/image/g.test(mime)) {
let img = await q.download?.()
if (!img) return
stiker = await sticker(img, false, packname, author)
} else if (/video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) return 
await m.reply(`[❗] ᴇʟ ᴠɪᴅᴇᴏ ɴᴏ ᴘᴜᴇᴅᴇ ᴅᴜʀᴀ ɴᴀs ᴅᴇ 7 sᴇɢ`)
//await this.sendButton(m.chat, '*[❗𝙄𝙣𝙛𝙤❗]𝑬𝒍 𝒗𝒊́𝒅𝒆𝒐 𝒏𝒐 𝒑𝒖𝒆𝒅𝒆 𝒅𝒖𝒓𝒂𝒓 𝒎𝒂́𝒔 𝒅𝒆 7 𝒔𝒆𝒈', wm, [['𝑫𝒆𝒔𝒂𝒄𝒕𝒊𝒗𝒂 𝒂𝒖𝒕𝒐𝒔𝒕𝒊𝒄𝒌𝒆𝒓', '/disable autosticker']], m)
let img = await q.download()
if (!img) return
stiker = await sticker(img, false, packname, author)
} else if (m.text.split(/\n| /i)[0]) {
if (isUrl(m.text)) stiker = await sticker(false, m.text.split(/\n| /i)[0], packname, author)
else return
}
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: `h`, mediaType: 2, sourceUrl: nn, thumbnail: imagen1}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}
return !0
}
export default handler

const isUrl = (text) => {
return text.match(new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))}

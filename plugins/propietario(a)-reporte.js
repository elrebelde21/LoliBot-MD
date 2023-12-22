let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `⚠️ 𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐞𝐥 𝐞𝐫𝐫𝐨𝐫/𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐜𝐨𝐧 𝐟𝐚𝐥𝐥𝐚\n\n*𝐄𝐣:* ${usedPrefix + command} los sticker no funka`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
if (text.length < 8) throw `${fg} ✨ *𝑴𝒊́𝒏𝒊𝒎𝒐 10 𝒄𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆...*`
if (text.length > 1000) throw `${fg} 😼 *𝑴𝒂́𝒙𝒊𝒎𝒐 1000 𝑪𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆.*`
let teks = `┏╼╾╼⧼⧼⧼ ＲＥＰＯＲＴＥ ⧽⧽⧽╼╼╼┓
╏• *ɴᴜᴍᴇʀᴏ:* Wa.me/${m.sender.split`@`[0]}
╏• *ᴍᴇɴsᴀᴊᴇ:* ${text}
┗╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼`
await delay(1 * 1000)
conn.reply(m.chat,  `⚡ᴇʟ ʀᴇᴘᴏʀᴛᴇ ʜᴀ sɪᴅᴏ ᴇɴᴠɪᴀᴅᴏs ᴀ ᴍɪ ᴄʀᴇᴀᴅᴏʀ, ᴛᴇɴᴅʀᴀ ᴜɴᴀ ʀᴇsᴘᴜᴇsᴛᴀ ᴘʀᴏɴᴛᴏ, ᴅᴇ sᴇʀ ғᴀʟsᴏ sᴇʀᴀ ɪɢɴᴏʀᴀᴅᴏ ᴇʟ ʀᴇᴘᴏʀᴛᴇ`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, body: '𝐄𝐗𝐈𝐓𝐎𝐒', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}})
//conn.reply('593968585383@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
//contextInfo: {
//mentionedJid: [m.sender]
//}})
await delay(3 * 3000)
conn.reply('573026191480@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [m.sender]
}})}
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['info']
handler.exp = 25 
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes|reportar)$/i 
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

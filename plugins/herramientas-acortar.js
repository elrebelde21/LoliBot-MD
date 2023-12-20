
import fetch from 'node-fetch'
let handler = async(m, { conn, args, text }) => {
if (!text) throw '* 𝙔 𝙚𝙡 𝙚𝙣𝙡𝙖𝙘𝙚?*\n*𝙞𝙣𝙜𝙧𝙚𝙨𝙚 𝙚𝙣𝙡𝙖𝙘𝙚 𝙥𝙖𝙧𝙖 𝙖𝙘𝙤𝙧𝙩𝙖*'
let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text()  
if (!shortUrl1) throw `*[❗] ᴇʀʀᴏʀ, ᴄᴏᴍᴘʀᴜᴇʙᴇ  ǫᴜᴇ ᴇʟ  ᴛᴇxᴛᴏ ɪɴɢʀᴇsᴀᴅᴏ sᴇᴀ ᴜɴ ᴛᴇxᴛᴏ ᴇ ɪɴᴛᴇɴᴛᴇ ᴅᴇ ɴᴜᴇᴠᴏ*`
let done = `*✅ sᴇ ʀᴇᴀʟɪᴢᴏ ᴄᴏɴ ᴇxɪᴛᴏ!!*\n\n*ᴇɴʟᴀᴄᴇ ᴅᴇ ᴀɴᴛᴇs:*\n${text}\n*ʟɪɴᴋ ᴀᴄᴏʀᴛᴀᴅᴏ:*\n${shortUrl1}`.trim()   
m.reply(done)}
handler.help = ['tinyurl','acortar'].map(v => v + ' <link>')
handler.tags = ['tools']
handler.command = /^(tinyurl|short|acortar|corto)$/i
handler.limit = 1
handler.register = true
handler.fail = null
export default handler






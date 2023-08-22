let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*[❗] ɪɴɢʀᴇsᴇ ᴜɴ ᴛᴇxᴛᴏ ᴘᴀʀᴀ ᴄʀᴇᴀʀ ᴜɴᴀ ɪᴍᴀɢᴇɴ ʏ ᴀsɪ ᴜsᴀʀ ʟᴀ ғᴜɴᴄɪᴏɴ ᴅᴇ ᴅᴀʟʟ-ᴇ*\n\n*❏ ᴇᴊᴇᴍᴘʟᴏ ᴅᴇ ᴘᴇᴛɪᴄɪᴏɴᴇs*\n*${usedPrefix + command} gatitos llorando*\n*${usedPrefix + command} Gata beso*`
try {
m.reply('*[❗] ᴇsᴘᴇʀᴇ ᴜɴ ᴍᴏᴍᴇɴᴛᴏ ᴇɴ ʟᴏ ǫᴜᴇ ᴍᴀɴᴅᴏ ʟᴏ ǫᴜᴇ ᴍᴇ ᴘɪᴅɪᴏ*')
let tiores = await conn.getFile(`https://api.lolhuman.xyz/api/dall-e?apikey=${lolkeysapi}&text=${text}`)
await conn.sendFile(m.chat, tiores.data, null, null, m)
} catch {
throw `*[❗] ᴇʀʀᴏʀ, ᴠᴜᴇʟᴠᴀ ᴀ ɪɴᴛᴇɴᴛᴀʀ*`
}
}
handler.command = ['dall-e', 'dalle', 'ia2', 'cimg', 'openai2']
handler.money = 20
handler.register = true
export default handler


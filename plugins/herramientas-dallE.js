let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*${lenguajeGB['smsAvisoMG']()}ɪɴɢʀᴇsᴇ ᴜɴ ᴛᴇxᴛᴏ ᴘᴀʀᴀ ᴄʀᴇᴀʀ ᴜɴᴀ ɪᴍᴀɢᴇɴ ʏ ᴀsɪ ᴜsᴀʀ ʟᴀ ғᴜɴᴄɪᴏɴ ᴅᴇ ᴅᴀʟʟ-ᴇ*\n\n*❏ ᴇᴊᴇᴍᴘʟᴏ ᴅᴇ ᴘᴇᴛɪᴄɪᴏɴᴇs*\n*${usedPrefix + command} gatitos llorando*\n*${usedPrefix + command} Gata beso`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: redes.getRandom()}}})
try {
conn.reply(m.chat, `*𝐄𝐬𝐩𝐞𝐫𝐞 ✋ 𝐮𝐧 𝐦𝐨𝐦𝐞𝐧𝐭𝐨.... 𝐘𝐚 𝐯𝐨𝐲 𝐜𝐨𝐧 𝐥𝐨 𝐪𝐮𝐞 𝐦𝐞 𝐩𝐢𝐝𝐢𝐨*`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: lb, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: redes.getRandom()}}})
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


let handler = async (m, { conn, command, usedPrefix, text }) => {
let which = command.replace(/ver/i, '')
if (!text) throw `*⚠️ 𝐔𝐬𝐚𝐫 *${usedPrefix}list${which}* 𝐏𝐚𝐫𝐚 𝐯𝐞𝐫 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚*`
let msgs = global.db.data.msgs
if (!text in msgs) throw `*⚠️ '${text}' 𝐍𝐨 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨 𝐞𝐧 𝐥𝐚 𝐥𝐢𝐬𝐭𝐚 𝐝𝐞 𝐦𝐞𝐧𝐬𝐚𝐣𝐞𝐬*`
let _m = await conn.serializeM(msgs[text])
await _m.copyNForward(m.chat, true)
}
handler.tags = ['owner'];
handler.command = /^ver(vn|msg|video|audio|img|sticker)$/
handler.owner = true
export default handler 
let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) throw `⚠️ ️𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉`
await conn.updateProfilePicture(m.chat, img).then(_ => m.react("✅️"))
} else throw `⚠️ 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉`
}
handler.help = ['setppgc'];
handler.tags = ['group'];
handler.command = /^setpp(group|grup|gc)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler

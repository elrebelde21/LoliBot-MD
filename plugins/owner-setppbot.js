let handler = async (m, { conn, usedPrefix, command }) => {
const userProfile = conn.user.jid || global.conn.user.jid
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let img = await q.download()
if (!img) throw `*⚠️ No se encontró la imagen, por favor responde a una imagen usando el comando ${usedPrefix + command}*`;
await conn.updateProfilePicture(userProfile, img).then(_ => m.reply("*⚠️ Se cambió con éxito la foto de perfil del número del bot*"))
} else throw `⚠️ 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉`
}
handler.help = ["setppbot"]
handler.tags = ["owner"]
handler.command = /^setppbot|cambiafoto|fotobot$/i;
handler.owner = true;

export default handler;
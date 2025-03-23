import jimp from "jimp"
import { S_WHATSAPP_NET } from '@whiskeysockets/baileys'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
try {
let groupId = m.chat;
let quotedMsg = m.quoted ? m.quoted : m
if (!m.quoted) return m.reply(`*⚠️ Responde a una Imagen.*`)
let mediaType = (quotedMsg.type || quotedMsg).mimetype || '';
var media = await quotedMsg.download();
async function processImage(media) {
const image = await jimp.read(media);
const resizedImage = image.getWidth() > image.getHeight() ? image.resize(720, jimp.AUTO) : image.resize(jimp.AUTO, 720);
return { img: await resizedImage.getBufferAsync(jimp.MIME_JPEG),
}}
var { img: processedImage } = await processImage(media);
conn.query({ tag: 'iq', attrs: { target: groupId, to: S_WHATSAPP_NET, type:'set', xmlns: 'w:profile:picture' },
content: [{ tag: 'picture', attrs: { type: 'image' }, content: processedImage }]})
m.react("✅️")
} catch (error) {
return m.react('❌');
}
};
handler.help = ['setppgc'];
handler.tags = ['group'];
handler.command = /^setpp(group|grup|gc)?$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler
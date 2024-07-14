import jimp from 'jimp';

const handler = async (message, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
try {
const userProfile = conn.user.jid;
const quotedMessage = message.quoted ? message.quoted : message;
if (!message.quoted) throw `*⚠️ No se encontró la imagen, por favor responde a una imagen usando el comando ${usedPrefix + command}*`;
const mimeType = quotedMessage.mimetype || '';
const imageBuffer = await quotedMessage.download();
const contactId = await userProfile;

async function processImage(buffer) {
const image = await jimp.read(buffer);
const resizedImage = image.getHeight() > image.getWidth() ? image.resize(720, jimp.AUTO) : image.resize(jimp.AUTO, 720);
const finalBuffer = await resizedImage.getBufferAsync(jimp.MIME_JPEG);
return { img: finalBuffer }}

const { img: processedImage } = await processImage(imageBuffer);

await conn.query({tag: 'iq', attrs: { to: contactId, type: 'set', xmlns: 'w:profile:picture' }, content: [{ tag: 'picture', attrs: { type: 'image' }, content: processedImage }]});

await message.reply('*⚠️ Se cambió con éxito la foto de perfil del número del bot*');
} catch {
throw `*⚠️ No se encontró la imagen, por favor responde a una imagen usando el comando ${usedPrefix + command}*`;
}};
handler.help = ["setppbot"]
handler.tags = ["owner"]
handler.command = /^setppbot|cambiafoto|fotobot$/i;
handler.owner = true;

export default handler;

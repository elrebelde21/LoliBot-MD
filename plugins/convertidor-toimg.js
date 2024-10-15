import {webp2png} from '../lib/webp2mp4.js';
const handler = async (m, {conn, usedPrefix, command}) => {
const notStickerMessage = `*⚠️ 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐚 𝐮𝐧 𝐬𝐭𝐢𝐜𝐤𝐞𝐫 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐞𝐧 𝐢𝐦𝐚𝐠𝐞𝐧 𝐜𝐨𝐧 𝐞𝐥 𝐬𝐢𝐠𝐮𝐢𝐞𝐧𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:* ${usedPrefix + command}`;
if (!m.quoted) throw notStickerMessage;
m.reply(`Euu flaco 🥴\n\n> *Convirtiendo tu Sticker a Imagen 🔄*`) 
const q = m.quoted || m;
const mime = q.mediaType || '';
if (!/sticker/.test(mime)) throw notStickerMessage;
const media = await q.download();
const out = await webp2png(media).catch((_) => null) || Buffer.alloc(0);
await conn.sendFile(m.chat, out, 'error.png', null, m, null, fake);
};
handler.help = ['toimg (reply)'];
handler.tags = ['convertidor']
handler.command = ['toimg', 'jpg', 'img'];
handler.register = true
export default handler;

import {webp2png} from '../lib/webp2mp4.js';
const handler = async (m, {conn, usedPrefix, command}) => {
const notStickerMessage = `*⚠️ ${await tr("Responder a un sticker que desee convertir en imagen con el siguiente comando:")}* ${usedPrefix + command}`;
if (!m.quoted) throw notStickerMessage;
m.reply(`${await tr("Euu flaco")} 🥴\n\n> *${await tr("Convirtiendo tu Sticker a Imagen")} 🔄*`) 
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

import {webp2mp4} from '../lib/webp2mp4.js';
import {ffmpeg} from '../lib/converter.js';
const handler = async (m, {conn, usedPrefix, command}) => {
if (!m.quoted) return conn.reply(m.chat, `[ ⚠️ ] 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐚 𝐚 𝐮𝐧 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐞𝐧 𝐯𝐢𝐝𝐞𝐨 𝐜𝐨𝐧 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 : ${usedPrefix + command}*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
const mime = m.quoted.mimetype || '';
if (!/webp/.test(mime)) throw `[ ⚠️ ] 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐚 𝐚 𝐮𝐧 𝐒𝐭𝐢𝐜𝐤𝐞𝐫 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐞𝐧 𝐯𝐢𝐝𝐞𝐨 𝐜𝐨𝐧 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 : ${usedPrefix + command}*`;
try {
const media = await m.quoted.download();
let out = Buffer.alloc(0);
if (/webp/.test(mime)) {
out = await webp2mp4(media);
} else if (/audio/.test(mime)) {
out = await ffmpeg(media, ['-filter_complex', 'color', '-pix_fmt', 'yuv420p', '-crf', '51', '-c:a', 'copy', '-shortest', ], 'mp3', 'mp4')}
await conn.sendFile(m.chat, out, 'error.mp4', '*⚡ 𝐄𝐗𝐈𝐓𝐎𝐒*', m, 0, {thumbnail: out});
} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}
handler.help = ['tovideo'];
handler.tags = ['sticker'];
handler.command = ['tovideo', 'tomp4', 'mp4', 'togif'];
export default handler;

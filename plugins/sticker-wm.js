import {addExif} from '../lib/sticker.js';
const handler = async (m, {conn, text}) => {
if (!m.quoted) return conn.reply(m.chat,  '╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙌𝙐𝙀 𝘿𝙀𝙎𝙀𝘼 𝘼𝙂𝙍𝙀𝙂𝘼 𝙐𝙉 𝙋𝘼𝙌𝙐𝙀𝙏𝙀 𝙔 𝙐𝙉 𝙉𝙊𝙈𝘽𝙍𝙀', m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})

let stiker = false;
try {
let [packname, ...author] = text.split('|');
author = (author || []).join('|');
const mime = m.quoted.mimetype || '';
if (!/webp/.test(mime)) return conn.reply(m.chat,  '╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙌𝙐𝙀 𝘿𝙀𝙎𝙀𝘼 𝘼𝙂𝙍𝙀𝙂𝘼 𝙐𝙉 𝙋𝘼𝙌𝙐𝙀𝙏𝙀 𝙔 𝙐𝙉 𝙉𝙊𝙈𝘽𝙍𝙀', m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
const img = await m.quoted.download();
if (!img) return conn.reply(m.chat,  '╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙌𝙐𝙀 𝘿𝙀𝙎𝙀𝘼 𝘼𝙂𝙍𝙀𝙂𝘼 𝙐𝙉 𝙋𝘼𝙌𝙐𝙀𝙏𝙀 𝙔 𝙐𝙉 𝙉𝙊𝙈𝘽𝙍𝙀', m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
stiker = await addExif(img, packname || global.packname, author || global.author);
} catch (e) {
console.error(e);
if (Buffer.isBuffer(e)) stiker = e;
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: ``, mediaType: 2, sourceUrl: redes.getRandom(), thumbnail: img.getRandom()}}}, { quoted: m })
else return conn.reply(m.chat,  '╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇* ⊱❗️⊱╮\n\n𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼𝙇 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 𝙌𝙐𝙀 𝘿𝙀𝙎𝙀𝘼 𝘼𝙂𝙍𝙀𝙂𝘼 𝙐𝙉 𝙋𝘼𝙌𝙐𝙀𝙏𝙀 𝙔 𝙐𝙉 𝙉𝙊𝙈𝘽𝙍𝙀', m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
}}
handler.help = ['wm <packname>|<author>'];
handler.tags = ['sticker'];
handler.command = /^take|robar|wm$/i;
handler.register = true
export default handler;

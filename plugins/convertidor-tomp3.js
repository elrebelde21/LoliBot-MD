import {toAudio} from '../lib/converter.js';
const handler = async (m, {conn, usedPrefix, command}) => {
const q = m.quoted ? m.quoted : m;
const mime = (q || q.msg).mimetype || q.mediaType || '';
if (!/video|audio/.test(mime)) return conn.reply(m.chat, `[ ⚠️ ] 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐚 𝐚 𝐮𝐧 𝐕𝐢𝐝𝐞𝐨 𝐨 𝐍𝐨𝐭𝐚 𝐝𝐞 𝐯𝐨𝐳 𝐩𝐚𝐫𝐚 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐮𝐧 𝐬𝐮𝐝𝐢𝐨 𝐌𝐏𝟑 `, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}}) 
const media = await q.download();
if (!media) throw `[ ⚠️ ] 𝐒𝐞 𝐦𝐞 𝐜𝐚𝐲𝐨 𝐞𝐥 𝐢𝐧𝐭𝐞𝐧𝐞𝐭 👽, 𝐢𝐧𝐭𝐞𝐧𝐭𝐚 𝐧𝐮𝐞𝐯𝐚𝐦𝐞𝐧𝐭𝐞`
const audio = await toAudio(media, 'mp4');
if (!audio.data) throw `[ ⚠️ ] 𝐍𝐨 𝐬𝐞 𝐥𝐨𝐠𝐫𝐨 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐬𝐮 𝐧𝐨𝐭𝐚 𝐝𝐞 𝐯𝐨𝐳 𝐚 𝐀𝐮𝐝𝐢𝐨 𝐌𝐏𝟑, 𝐢𝐧𝐭𝐞𝐧𝐭𝐞 𝐦𝐚𝐬 𝐭𝐚𝐫𝐝𝐞`
conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg'}, {quoted: m});
};
handler.alias = ['tomp3', 'toaudio'];
handler.command = /^to(mp3|audio)$/i;
handler.register = true 
export default handler;

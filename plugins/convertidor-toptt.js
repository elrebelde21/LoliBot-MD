import {toPTT} from '../lib/converter.js';
const handler = async (m, {conn, usedPrefix, command}) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (m.quoted ? m.quoted : m.msg).mimetype || '';
  if (!/video|audio/.test(mime)) return conn.reply(m.chat,   `[ ⚠️ ] 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐚 𝐚𝐥 𝐕𝐢𝐝𝐞𝐨/𝐀𝐮𝐝𝐢𝐨 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐚 𝐍𝐨𝐭𝐚 𝐝𝐞 𝐯𝐨𝐳`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
  const media = await q.download?.();
  if (!media && !/video/.test(mime)) throw `[ ⚠️ ] 𝐒𝐞 𝐦𝐞 𝐜𝐚𝐲𝐨 𝐞𝐥 𝐢𝐧𝐭𝐞𝐧𝐞𝐭 👽, 𝐢𝐧𝐭𝐞𝐧𝐭𝐚 𝐧𝐮𝐞𝐯𝐚𝐦𝐞𝐧𝐭𝐞`
  if (!media && !/audio/.test(mime)) throw `[ ⚠️ ] 𝐒𝐞 𝐦𝐞 𝐜𝐚𝐲𝐨 𝐞𝐥 𝐢𝐧𝐭𝐞𝐧𝐞𝐭 👽, 𝐢𝐧𝐭𝐞𝐧𝐭𝐚 𝐧𝐮𝐞𝐯𝐚𝐦𝐞𝐧𝐭𝐞`
  const audio = await toPTT(media, 'mp4');
  if (!audio.data && !/audio/.test(mime)) throw `[ ⚠️ ] 𝐍𝐨 𝐬𝐞 𝐥𝐨𝐠𝐫𝐨 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐬𝐮 𝐧𝐨𝐭𝐚 𝐝𝐞 𝐯𝐨𝐳 𝐚 𝐀𝐮𝐝𝐢𝐨 𝐌𝐏𝟑, 𝐢𝐧𝐭𝐞𝐧𝐭𝐞 𝐦𝐚𝐬 𝐭𝐚𝐫𝐝𝐞`
  if (!audio.data && !/video/.test(mime)) throw `[ ⚠️ ] 𝐍𝐨 𝐬𝐞 𝐥𝐨𝐠𝐫𝐨 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐬𝐮 𝐧𝐨𝐭𝐚 𝐝𝐞 𝐯𝐨𝐳 𝐚 𝐀𝐮𝐝𝐢𝐨 𝐌𝐏𝟑, 𝐢𝐧𝐭𝐞𝐧𝐭𝐞 𝐦𝐚𝐬 𝐭𝐚𝐫𝐝𝐞`
  const aa = conn.sendFile(m.chat, audio.data, 'error.mp3', '', m, true, {mimetype: 'audio/mpeg'});
  if (!aa) return conn.sendMessage(m.chat, {audio: {url: media}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
};
handler.help = ['tovn (reply)'];
handler.tags = ['audio'];
handler.command = /^to(vn|(ptt)?)$/i;
handler.register = true 
export default handler;

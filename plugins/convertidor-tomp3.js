import {toAudio} from '../lib/converter.js';
const handler = async (m, {conn, usedPrefix, command}) => {
const q = m.quoted ? m.quoted : m;
const mime = (q || q.msg).mimetype || q.mediaType || '';
if (!/video|audio/.test(mime)) throw `*⚠️ ¿𝐘 𝐞𝐥 𝐯𝐢𝐝𝐞𝐨? 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐚 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐨 𝐧𝐨𝐭𝐚 𝐝𝐞 𝐯𝐨𝐳 𝐩𝐚𝐫𝐚 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐚 𝐌𝐏𝟑*`;
const media = await q.download();
if (!media) throw '*⚠️ 𝐎𝐂𝐔𝐑𝐑𝐈𝐎́ 𝐔𝐍 𝐄𝐑𝐑𝐎𝐑 𝐍𝐎𝐒𝐄 𝐐𝐔𝐄 𝐏𝐀𝐒𝐎? 𝐓𝐔 𝐒𝐀𝐁𝐄𝐒?* :)';
m.reply(`Calmaoooo estoy procesando 😎\n\n> *Convirtiendo de MP4 a MP3 🔄*`) 
  const audio = await toAudio(media, 'mp4');
if (!audio.data) throw '*⚠️ 𝐓𝐑𝐄𝐌𝐄𝐍𝐃𝐎 ¿𝐍𝐨 𝐬𝐚𝐛𝐞𝐬 𝐮𝐬𝐚𝐫 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨? 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐞𝐫 𝐚 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐨 𝐧𝐨𝐭𝐚 𝐝𝐞 𝐯𝐨𝐳 𝐛𝐨𝐛𝐨*';
conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg', fake, }, {quoted: m});
};
handler.help = ['tomp3'];
handler.tags = ['convertidor']
handler.command = /^to(mp3|audio)$/i;
handler.register = true
export default handler;

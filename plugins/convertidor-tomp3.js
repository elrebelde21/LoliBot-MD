import {toAudio} from '../lib/converter.js';
const handler = async (m, {conn, usedPrefix, command}) => {
const q = m.quoted ? m.quoted : m;
const mime = (q || q.msg).mimetype || q.mediaType || '';
if (!/video|audio/.test(mime)) throw `*⚠️ ¿${await tr("Y el video?, responde a un video o nota de voz para convertir a MP3")}*`;
const media = await q.download();
if (!media) throw `*⚠️ ${await tr("OCURRIO UN ERR NOSE QUE PASO? TU SABES? ")}* :)`
m.reply(`${await tr("Calmaoooo estoy procesando")} 😎\n\n> *${await tr("Convirtiendo de MP4 a MP3")} 🔄*`) 
  const audio = await toAudio(media, 'mp4');
if (!audio.data) throw `*⚠️ ¿${await tr("Y el video?, responde a un video o nota de voz para convertir a MP3")}*`;
conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg', fake, }, {quoted: m});
};
handler.help = ['tomp3'];
handler.tags = ['convertidor']
handler.command = /^to(mp3|audio)$/i;
handler.register = true
export default handler;

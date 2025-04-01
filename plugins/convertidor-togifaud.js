/* 𝐂𝐑𝐄𝐀𝐃𝐎 𝐏𝐎𝐑 https://github.com/BrunoSobrino */

const handler = async (m, {conn, usedPrefix, command}) => {
if (!m.quoted) throw `*⚠️ ${await tr("Responde a un video que desee convertir en gif con audio")}*`;
const q = m.quoted || m;
const mime = (q.msg || q).mimetype || '';
if (!/(mp4)/.test(mime)) throw `*⚠️ ${await tr("El tipo de archivo")} ${mime} ${await tr("no es correcto, responda a un video que desse convertir en gif con audio")}*`;
m.reply(global.wait);
const media = await q.download();
conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: `*${await tr("Aqui esta sus gif con audio")}*`}, {quoted: m});
};
handler.help = ['togif'];
handler.tags = ['convertidor']
handler.command = ['togifaud', 'togif'];
handler.register = true
export default handler;

/* 𝐂𝐑𝐄𝐀𝐃𝐎 𝐏𝐎𝐑 https://github.com/BrunoSobrino */

const handler = async (m, {conn, usedPrefix, command}) => {
  if (!m.quoted) throw `*⚠️ 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝚀𝚄𝙴 𝙳𝙴𝚂𝙴𝙴 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙴𝙽 𝙶𝙸𝙵 𝙲𝙾𝙽 𝙰𝚄𝙳𝙸𝙾*`;
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || '';
  if (!/(mp4)/.test(mime)) throw `*⚠️ 𝙴𝙻 𝚃𝙸𝙿𝙾 𝙳𝙴 𝙰𝚁𝙲𝙷𝙸𝚅𝙾 ${mime} 𝙽𝙾 𝙴𝚂 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾, 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰 𝚄𝙽 𝚅𝙸𝙳𝙴𝙾 𝚀𝚄𝙴 𝙳𝙴𝚂𝙴𝙴 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝙴𝙽 𝙶𝙸𝙵 𝙲𝙾𝙽 𝙰𝚄𝙳𝙸𝙾*`;
  m.reply(global.wait);
  const media = await q.download();
  conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: '*ᴀϙᴜɪ ᴇsᴛᴀ sᴜ ɢɪғ ᴄᴏɴ ᴀᴜᴅɪᴏ*'}, {quoted: m});
};
handler.help = ['togif'];
handler.tags = ['convertidor']
handler.command = ['togifaud', 'togif'];
handler.register = true
export default handler;

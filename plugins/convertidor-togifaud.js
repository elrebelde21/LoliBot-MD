/* 𝐂𝐑𝐄𝐀𝐃𝐎 𝐏𝐎𝐑 https://github.com/BrunoSobrino */

const handler = async (m, {conn, usedPrefix, command}) => {
if (!m.quoted) throw `*⚠️ 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐚 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐞𝐧 𝐠𝐢𝐟 𝐜𝐨𝐧 𝐚𝐮𝐝𝐢𝐨*`;
const q = m.quoted || m;
const mime = (q.msg || q).mimetype || '';
if (!/(mp4)/.test(mime)) throw `*⚠️ 𝐄𝐥 𝐭𝐢𝐩𝐨 𝐝𝐞 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 ${mime} 𝐧𝐨 𝐞𝐬 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐨, 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐚 𝐚 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐪𝐮𝐞 𝐝𝐞𝐬𝐬𝐞 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐞𝐧 𝐠𝐢𝐟 𝐜𝐨𝐧 𝐚𝐮𝐝𝐢𝐨*`;
m.reply(global.wait);
const media = await q.download();
conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: '*ᴀϙᴜɪ ᴇsᴛᴀ sᴜ ɢɪғ ᴄᴏɴ ᴀᴜᴅɪᴏ*'}, {quoted: m});
};
handler.help = ['togif'];
handler.tags = ['convertidor']
handler.command = ['togifaud', 'togif'];
handler.register = true
export default handler;

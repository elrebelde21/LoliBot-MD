/* 𝐂𝐑𝐄𝐀𝐃𝐎 𝐏𝐎𝐑 https://github.com/BrunoSobrino */

const handler = async (m, {conn, usedPrefix, command}) => {
if (!m.quoted) return conn.reply(m.chat,   `[ ⚠️ ] 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐚 𝐚 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐞𝐧 𝐠𝐢𝐟 𝐜𝐨𝐧 𝐚𝐮𝐝𝐢𝐨`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}}) 
try {
const q = m.quoted || m;
const mime = (q.msg || q).mimetype || '';
if (!/(mp4)/.test(mime)) throw `*[ ⚠️ ] 𝐄𝐥 𝐓𝐢𝐩𝐨 𝐝𝐞 𝐚𝐫𝐜𝐡𝐢𝐯𝐨𝐬  ${mime} 𝐧𝐨 𝐞𝐬 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐨, 𝐫𝐞𝐬𝐩𝐨𝐧𝐝𝐚 𝐚 𝐮𝐧 𝐯𝐢𝐝𝐞𝐨 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐞𝐧 𝐆𝐢𝐟 𝐜𝐨𝐧 𝐚𝐮𝐝𝐢𝐨*`;
m.reply(wait);
const media = await q.download();
conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: '*🔰 𝐄𝐗𝐈𝐓𝐎𝐒*'}, {quoted: m});
} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}
handler.command = ['togifaud', 'topgif', 'gif'];
handler.register = true
export default handler;

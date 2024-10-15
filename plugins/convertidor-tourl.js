import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
const handler = async (m) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || '';
if (!mime) throw '*⚠️ ¿𝐘 𝐋𝐀 𝐈𝐌𝐀𝐆𝐄𝐍? 𝐑𝐞𝐬𝐩𝐨𝐧𝐝𝐞 𝐚 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐨 𝐯𝐢𝐝𝐞𝐨 𝐞𝐥 𝐜𝐮𝐚𝐥 𝐬𝐞𝐫𝐚 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐝𝐨 𝐚 𝐞𝐧𝐥𝐚𝐜𝐞*';
const media = await q.download();
const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
const link = await (isTele ? uploadImage : uploadFile)(media);
m.reply(link);
};
handler.help = ['tourl <reply image>'];
handler.tags = ['convertidor']
handler.command = /^(upload|tourl)$/i;
handler.register = true
export default handler;

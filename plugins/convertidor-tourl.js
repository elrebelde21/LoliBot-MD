import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch'
const handler = async (m) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || '';
if (!mime) throw `*⚠️ ¿${await tr("Y la imagen? responde a una imagen o video el cual sera convertido a enlace")}*`
const media = await q.download();
try {
const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
const link = await (isTele ? uploadImage : uploadFile)(media);
m.reply(link);
} catch (e) {
console.log(e) 
}}
handler.help = ['tourl <reply image>'];
handler.tags = ['convertidor']
handler.command = /^(upload|tourl)$/i;
handler.register = true
export default handler;

function formatBytes(bytes) {
  if (bytes === 0) {
    return '0 B';
  }
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function shortUrl(url) {
        let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
        return await res.text()
}

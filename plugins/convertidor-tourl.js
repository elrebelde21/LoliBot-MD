import uploadFile, { quax, RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph } from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command }) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || '';

if (!mime) throw `*\`⚠️ ¿𝐘 𝐋𝐀 𝐈𝐌𝐀𝐆𝐄𝐍/𝐕𝐈𝐃𝐄𝐎?\`*

*• Ejemplo de Uso de ${usedPrefix + command}:*

— Responde a una imagen, sticker o video corto con el comando:

➔ *${usedPrefix + command}*

Subirá automáticamente el archivo a servidores como *qu.ax*, *catbox*, *gofile*, etc.

🌐 *\`¿Quieres elegir un servidor específico?\`*
> Puedes usar:

➔ *${usedPrefix + command} quax _(Recomendado)_*
➔ *${usedPrefix + command} catbox _(recomendado)_*
➔ *${usedPrefix + command} uguu*  
➔ *${usedPrefix + command} pixeldrain*  
➔ *${usedPrefix + command} restfulapi*  
➔ *${usedPrefix + command} filechan*  
➔ *${usedPrefix + command} gofile*  
➔ *${usedPrefix + command} krakenfiles*  
➔ *${usedPrefix + command} telegraph*

📝 *\`Notas:\`*
- *El archivo debe ser una imagen, sticker o video corto.*  
- *Enlaces de qu.ax y catbox no expiran.*
- *Algunos servicios como file.io expiran en 24 horas.*
`.trim();

const media = await q.download();
const option = (args[0] || '').toLowerCase();
const services = { quax, restfulapi: RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph };
try {
if (option && services[option]) {
const link = await services[option](media);
return m.reply(link);
}

const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
const link = await (isTele ? uploadImage : uploadFile)(media);
return m.reply(link);
} catch (e) {
console.error(e);
throw '❌ Error al subir el archivo. Intenta con otra opción:\n' + Object.keys(services).map(v => `➔ ${usedPrefix}${command} ${v}`).join('\n');
}};
handler.help = ['tourl <opcional servicio>'];
handler.tags = ['convertidor'];
handler.command = /^(upload|tourl)$/i;
handler.register = true;
export default handler;

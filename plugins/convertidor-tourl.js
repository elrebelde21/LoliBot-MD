import uploadFile, { quax, RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph } from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import fetch from "node-fetch";
import FormData from "form-data";

const handler = async (m, { args, usedPrefix, command }) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || "";

if (!mime) throw `*\`⚠️ ¿𝐘 𝐋𝐀 𝐈𝐌𝐀𝐆𝐄𝐍/𝐕𝐈𝐃𝐄𝐎?\`*

*• Ejemplo de Uso de ${usedPrefix + command}:*

➔ Responde a una imagen, sticker o video corto con el comando: *${usedPrefix + command}*

Subirá automáticamente el archivo a servidores como *qu.ax*, *catbox*, *cdn-skyultraplus*, etc.

🌐 *\`¿Quieres elegir un servidor específico?\`*
> Puedes usar:

➔ *${usedPrefix + command} quax*  
➔ *${usedPrefix + command} catbox*  
➔ *${usedPrefix + command} sky*
➔ *${usedPrefix + command} uguu*  
➔ *${usedPrefix + command} restfulapi*  
➔ *${usedPrefix + command} gofile*  
➔ *${usedPrefix + command} telegraph*  

📝 *Notas:*
- *El archivo debe ser una imagen, sticker o video corto.*  
- *Enlaces de qu.ax y catbox no expiran.*
- *El CDN de SkyUltraPlus no tiene caducidad y es más rápido (pagando) obtener mas información aqui:* https://cdn.skyultraplus.com`;

const media = await q.download();
if (!media) throw "❌ No se pudo descargar el archivo.";
const option = (args[0] || "").toLowerCase();
const services = { quax, restfulapi: RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph };
try {
if (option === "sky") {
let ext = mime.split("/")[1] || "jpg";
if (ext === "jpeg") ext = "jpg";
const form = new FormData();
form.append("name", "archivo_bot");
form.append("file", media, {
filename: `upload.${ext}`,
contentType: mime,
});

const res = await fetch("https://cdn.skyultraplus.com/upload.php", {
method: "POST",
headers: {
...form.getHeaders(),
"X-API-KEY": "4aef4a55e558",
},
body: form,
});
const json = await res.json().catch(() => ({}));
if (!json.ok) throw `Status: ${res.status}\nerror: ${JSON.stringify(json)}`;
const link = json.file?.url || json.url;
return m.reply(link);
}
    
if (option && services[option]) {
const link = await services[option](media);
return m.reply(link);
}

const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
const link = await (isTele ? uploadImage : uploadFile)(media);
return m.reply(link);
} catch (e) {
console.error(e);
throw '❌ Error al subir el archivo. Intenta con otra opción:\n' + Object.keys(services).concat(["skyultra"]).map(v => `➔ ${usedPrefix}${command} ${v}`).join('\n');
}};
handler.help = ['tourl <opcional servicio>'];
handler.tags = ['convertidor'];
handler.command = /^(upload|tourl)$/i;
handler.register = true;

export default handler;

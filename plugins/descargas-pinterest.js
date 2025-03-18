import axios from 'axios';
import { pinterest } from '../lib/scraper.js';

let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) throw `*⚠️ Ingresa el término de búsqueda.*\nEj: ${usedPrefix + command} nayeon`;
m.react("⌛");

const pinterestApis = [
{ url: async () => {
const response = await pinterest.search(text, 6);
return response.result.pins.slice(0, 6);
},
extract: (result) => ({ title: result.title || text,
description: `🔎 Por: ${result.uploader.username}`,
image: result.media.images.orig.url })
},
{ url: () => axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`).then(res => res.data.data.slice(0, 6)),
extract: (result) => ({ title: result.grid_title || text,
description: '',
image: result.images_url
})
},
{ url: () => axios.get(`https://api.dorratz.com/v2/pinterest?q=${text}`).then(res => res.data.slice(0, 6)),
extract: (result) => ({ title: result.fullname || text,
description: `*🔸️Autor:* ${result.upload_by}\n*🔸️ Seguidores:* ${result.followers}`,
image: result.image })
},
{ url: () => axios.get(`${apis}/search/pinterestv2?text=${encodeURIComponent(text)}`).then(res => res.data.data.slice(0, 6)),
extract: (result) => ({ title: result.description || text,
description: `🔎 Autor: ${result.name} (@${result.username})`,
image: result.image
})
}];

const sendResults = async (results) => {
if (m.isWABusiness) {
const medias = results.map(result => ({ type: "image", data: { url: result.image } }));
await conn.sendAlbumMessage(m.chat, medias, `✅ Resultados para: ${text}`, m);
} else {
const messages = results.map(result => ["",
`${result.title}\n${result.description}`,
result.image
]);
await conn.sendCarousel(m.chat, `✅ Resultados para: ${text}`, "🔍 Pinterest Search", messages, m);
}
m.react("✅️");
};

for (const api of pinterestApis) {
try {
const rawResults = await api.url();
if (!rawResults || rawResults.length === 0) continue; 
const results = rawResults.map(api.extract);
await sendResults(results);
return; 
} catch (e) {
console.log(`Error con ${api.url.name}:`, e);
continue; 
}}
await m.reply(`❌ No se encontraron resultados para "${text}".`);
m.react("❌️");
}
handler.help = ['pinterest <keyword>'];
handler.tags = ['buscadores'];
handler.command = /^(pinterest)$/i;
handler.register = true;
handler.limit = 1;

export default handler;
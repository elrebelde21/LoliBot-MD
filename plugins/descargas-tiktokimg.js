import axios from 'axios';
const userRequests = {};

let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) throw `*⚠️ Ingresa el nombre del video que buscas.*\nEj: ${usedPrefix + command} emilia_mernes`
if (userRequests[m.sender]) return m.reply('⏳ *Espera...* Ya hay una solicitud en proceso. Por favor, espera a que termine antes de hacer otra.')
userRequests[m.sender] = true;
m.react("⏳")
try {
let { data: response } = await axios.get(`${apis}/search/tiktoksearch?query=${text}`);
if (!response || !response.meta || !Array.isArray(response.meta) || response.meta.length === 0) return m.reply(`❌ No se encontraron resultados para "${text}".`);
let searchResults = response.meta;
shuffleArray(searchResults);
let selectedResults = searchResults.slice(0, 5);
if (m.isWABusiness) {
const medias = selectedResults.map(result => ({type: "video", data: { url: result.hd }}));
await conn.sendAlbumMessage(m.chat, medias, `✅ Resultados para: ${text}`, m);
m.react("✅️");
} else {
let messages = selectedResults.map(result => [``,
`${result.title}`, 
result.hd
]);
await conn.sendCarousel(m.chat, `✅ Resultados para: ${text}`, "🔍 TikTok Search", messages, m);
m.react("✅️");
}
} catch (error) {
m.react("❌️")
console.error(error);    
} finally {
delete userRequests[m.sender];
}};
handler.help = ['tiktoksearch <texto>'];
handler.tags = ['downloader'];
handler.command = ['tiktoksearch', 'ttsearch'];
handler.register = true;
handler.limit = 4;

export default handler;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
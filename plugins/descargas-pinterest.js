import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return m.reply(`*⚠️ Ingresa el término de búsqueda.*\nEj: ${usedPrefix + command} nayeon`);
try { 
let response = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
if (!response.data.status) return await m.reply("❌ No se encontraron resultados.")
let searchResults = response.data.data; 
let selectedResults = searchResults.slice(0, 6); 
let messages = selectedResults.map(result => [result.grid_title || text, wm, result.images_url]);
await conn.sendCarousel(m.chat, `✅ Resultados para: ${text}`, "🔍 Pinterest Search", messages, m);
} catch {
try {
let { data: response } = await axios.get(`${apis}/search/pinterestv2?text=${encodeURIComponent(text)}`);
if (!response.status || !response.data || response.data.length === 0) return m.reply(`❌ No se encontraron resultados para "${text}".`);
let searchResults = response.data;
let selectedResults = searchResults.slice(0, 6);
let messages = selectedResults.map(result => [
result.description || null, `🔎 Autor: ${result.name} (@${result.username})`, result.image]);
await conn.sendCarousel(m.chat, `✅ Resultados para: ${text}`, "🔍 Pinterest Search", messages, m);
} catch (error) {
console.error(error);
}}}
handler.help = ['pinterest <keyword>'];
handler.tags = ['buscadores'];
handler.command = /^(pinterest)$/i;
handler.register = true;
handler.limit = 1;

export default handler;
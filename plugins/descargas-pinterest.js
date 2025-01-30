import axios from 'axios'
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return m.reply(`*⚠️ Ingresa el término de búsqueda.*\nEj: ${usedPrefix + command} nayeon`);
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
}};
handler.help = ['pinterest <keyword>'];
handler.tags = ['buscadores'];
handler.command = /^(pinterest)$/i;
handler.register = true;
handler.limit = 1;

export default handler;
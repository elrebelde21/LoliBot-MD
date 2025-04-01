import translate from '@vitalets/google-translate-api';
import {Anime} from '@shineiichijo/marika';
const client = new Anime();
const handler = async (m, {conn, text, usedPrefix}) => {
if (!text) return m.reply(`*⚠️ ${await tr("INGRESE EL NOMBRE DE ALGUN ANIME A BUSCAR")}*`);
m.react("✨") 
try {
const anime = await client.searchAnime(text);
const result = anime.data[0];
const resultes = await translate(`${result.background}`, {to: 'es', autoCorrect: true});
const resultes2 = await translate(`${result.synopsis}`, {to: 'es', autoCorrect: true});
const AnimeInfo = `🟢 • *${await tr("Titulo")}:* ${result.title}
🎋 • *${await tr("Formato")}:* ${result.type}
📈 • *${await tr("Estado")}:* ${result.status.toUpperCase().replace(/\_/g, ' ')}
🍥 • *${await tr("Episodios totales")}:* ${result.episodes}
🎈 • *${await tr("Duración")}: ${result.duration}*
✨ • *${await tr("Basado en")}:* ${result.source.toUpperCase()}
💫 • *${await tr("Entrenado")}:* ${result.aired.from}
🎗 • *${await tr("Finalizado")}:* ${result.aired.to}
🎐 • *${await tr("Popularidad")}:* ${result.popularity}
🎏 • *${await tr("Favoritos")}:* ${result.favorites}
🎇 • *${await tr("Clasificación")}:* ${result.rating}
🏅 • *${await tr("Rango")}:* ${result.rank}
♦ • *${await tr("Trailer")}:* ${result.trailer.url}
🌐 • *ᴜʀʟ:* ${result.url}
🎆 • *ʙᴀᴄᴋɢʀᴏᴜɴᴅ:* ${resultes.text}
❄ • *ʀɪɴɢᴋᴀsᴀɴ:* ${resultes2.text}`;
conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m, null, fake);
m.react("✅") 
} catch (error) {   
try {
const res = await fetch(`${apis}/search/animesearch?q=${encodeURIComponent(text)}`);
const data = await res.json();
if (data && data.data && data.data.length > 0) {
const result = data.data[0];
const AnimeInfo = `*• ${await tr("Titulo")}:* ${result.title}\n` +
`*• ${await tr("Tipo")}:* ${result.type}\n` +
`*• ${await tr("Episodios")}:* ${result.episode}\n` +
`*• ${await tr("Puntuación")}:* ${result.score}\n` +
`*• URL:* ${result.url}`;
await conn.sendFile(m.chat, result.image, 'anime.jpg', AnimeInfo, m, null, fake);
m.react("✅") 
}} catch (e) {
m.reply(`\`\`\`⚠️ ${await tr("OCURRIO UN ERROR")} ⚠️\`\`\`\n\n> *${await tr("Reporta el siguiente error a mi creador con el comando:")}* #report\n\n>>> ${e} <<<< `)       
console.log(e) 
m.react("❌") 
}}}
handler.help = ['animeinfo']
handler.tags = ['buscadores']
handler.command = /^(anime|animeinfo)$/i;
handler.register = true
export default handler;

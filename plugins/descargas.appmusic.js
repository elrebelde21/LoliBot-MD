import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(`Ejemplo de uso: ${usedPrefix + command} https://music.apple.com/us/album/glimpse-of-us/1625328890?i=1625328892`);
  
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/applemusicdl?url=${encodeURIComponent(text)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
 const { name, artists, image, duration, download } = delius.data;
  m.react("⌛");
try {
if (delius.status) {
const texto = `*• Titulo:* ${name}\n*• Artistas:* ${artists}\n*• Duración:* ${duration}`;
conn.sendFile(m.chat, image, 'cover.jpg', texto, m, null, fake);

await conn.sendMessage(m.chat, { document: { url: download }, fileName: `${name}.mp3`, mimetype: 'audio/mp3', }, { quoted: m });
m.react("✅");
} else {
throw new Error("No se encontró la canción.");
}} catch (err) {
console.error("Error resultados 1", err);
try {
const appledown = {
getData: async (urls) => {
const url = `https://aaplmusicdownloader.com/api/applesearch.php?url=${urls}`;
try {
const response = await axios.get(url, { headers: { 'Accept': 'application/json', 'User-Agent': 'MyApp/1.0' } });
return response.data;
} catch (error) {
console.error("Error en getData:", error.message);
return { success: false, message: error.message };
}},

getAudio: async (trackName, artist, urlMusic, token) => {
const url = 'https://aaplmusicdownloader.com/api/composer/swd.php';
const data = { song_name: trackName, artist_name: artist, url: urlMusic, token: token };
const headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'User-Agent': 'MyApp/1.0' };
try {
const response = await axios.post(url, qs.stringify(data), { headers });
return response.data.dlink;
} catch (error) {
console.error("Error en getAudio:", error.message);
m.react("❌");
return { success: false, message: error.message };
}},
download: async (urls) => {
const musicData = await appledown.getData(urls);
if (musicData && musicData.success) {
const encodedData = encodeURIComponent(JSON.stringify([musicData.name, musicData.albumname, musicData.artist, musicData.thumb, musicData.duration, musicData.url]));
const url = 'https://aaplmusicdownloader.com/song.php';
const headers = { 'content-type': 'application/x-www-form-urlencoded', 'User-Agent': 'MyApp/1.0' };
const data = `data=${encodedData}`;
try {
const response = await axios.post(url, data, { headers });
const htmlData = response.data;
const $ = cheerio.load(htmlData);
const trackName = $('td:contains("Track Name:")').next().text();
const albumName = $('td:contains("Album:")').next().text();
const duration = $('td:contains("Duration:")').next().text();
const artist = $('td:contains("Artist:")').next().text();
const thumb = $('figure.image img').attr('src');
const urlMusic = urls;
const token = $('a#download_btn').attr('token');
const downloadLink = await appledown.getAudio(trackName, artist, urlMusic, token);
return { name: trackName, albumname: albumName, artist, url: urlMusic, thumb, duration, token, download: downloadLink };
} catch (error) {
console.error("Error en download:", error.message);
m.react("❌");
return { success: false, message: error.message };
}} 
return { success: false, message: "No se pudo obtener los datos." };
}};

let dataos = await appledown.download(text);
if (dataos.success) {
const { name, albumname, artist, url, thumb, duration, token, download } = dataos;
conn.sendFile(m.chat, thumb, 'cover.jpg', `*• Titulo:* ${name}\n*• Artistas:* (${artist}/${duration})_\n*• URL:* ${url}`, m, null, fake);
await conn.sendMessage(m.chat, { document: { url: download }, fileName: `${name}.mp3`, mimetype: 'audio/mp3' }, { quoted: m });
m.react("✅");
} else {
m.react("❌");
m.reply("No se pudo obtener la canción.");
}} catch (err) {
console.error("Error final:", err);
m.react("❌");
m.reply("Ocurrió un error al intentar obtener el enlace de descarga.");
}}};
handler.help = ['applemusic'];
handler.tags = ['downloader'];
handler.command = /^(applemusic)$/i;
handler.register = true;
handler.limit = 1;

export default handler;

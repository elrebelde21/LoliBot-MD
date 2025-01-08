import {find_lyrics} from '@brandond/findthelyrics';
import {getTracks} from '@green-code/music-track-data';
import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '';
if (!teks) throw `*⚠️ ¿Que esta buscando? ingresa el nombre del tema para buscar la letra de la canción, ejemplo:* ${usedPrefix + command} ozuna te vas`;
try {
const res = await fetch(`${apis}/search/letra?query=${encodeURIComponent(text)}`);
const data = await res.json();
if (data.status !== "200" || !data.data) return conn.reply(m.chat, 'No se encontró la letra de la canción especificada.', m);

const textoLetra = `*🎤 𝙏𝙞𝙩𝙪𝙡𝙤:* ${data.data.title || 'Desconocido'}\n*👤 𝘼𝙪𝙩𝙤𝙧:* ${data.data.artist || 'Desconocido'}\n*🔗 𝘼𝙧𝙩𝙞𝙨𝙩𝙖:* ${data.data.artistUrl || 'No disponible'}\n*🎶 𝙐𝙧𝙡:* ${data.data.url || 'No disponible'}\n\n*📃🎵 𝙇𝙚𝙩𝙧𝙖:*\n${data.data.lyrics || 'Letra no disponible'}`;
const img = data.data.image
conn.sendFile(m.chat, img, 'error,jpg', textoLetra, m, null, fake);
//conn.sendMessage(m.chat, { image: { url: img }, caption: textoLetra }, { quoted: m });
} catch (error) {
try {
const result = await getTracks(teks);
const lyrics = await find_lyrics(`${result[0].artist} ${result[0].title}`);
const res = await fetch(global.API('https://some-random-api.com', '/lyrics', {title: result[0].artist + result[0].title}));
const json = await res.json();
let img;
try {
img = result.album.artwork;
} catch {
try { 
img = json.thumbnail.genius;
} catch {
const bochil = await googleImage(`${result[0].artist} ${result[0].title}`);
img = await bochil.getRandom();
}}
const textoLetra = `*🎤 𝐓𝐈𝐓𝐔𝐋𝐎:* ${result[0].title || ''}\n*👤 𝐀𝐔𝐓𝐎𝐑:* ${result[0].artist || ''}\n\n*📃🎵 𝐋𝐄𝐓𝐑𝐀:*\n${lyrics || ''}`;
//await conn.sendButton(m.chat, textoLetra, botname, img, [['🚀 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐑 𝐀𝐔𝐃𝐈𝐎 🚀', `/ytmp3doc ${result[0].title || ''}`]], null, null, m)   
conn.sendFile(m.chat, img, 'error,jpg', textoLetra, m, null, fake);
await conn.sendMessage(m.chat, {audio: {url: result[0].preview}, fileName: `${result[0].artist} ${result[0].title}.mp3`, mimetype: 'audio/mp4'}, {quoted: m});
} catch (e) {
m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${e} <<<< `)       
console.log(e)}}}
handler.help = ['lirik', 'letra'].map((v) => v + ' <Apa>');
handler.tags = ['buscadores'];
handler.command = /^(lirik|lyrics|lyric|letra)$/i;
handler.register = true
export default handler;

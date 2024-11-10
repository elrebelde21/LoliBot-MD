import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import {youtubedl, youtubedlv2} from '@bochilteam/scraper';
const LimitAud = 725 * 1024 * 1024; //700MB
const LimitVid = 425 * 1024 * 1024; //425MB
const handler = async (m, {conn, command, args, text, usedPrefix}) => {

if (command == 'play' || command == 'musica') {
if (!text) return conn.reply(m.chat, `*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}});
const yt_play = await search(args.join(' '));
const ytplay2 = await yts(text);
const texto1 = `📌 *Título* : ${yt_play[0].title}
📆 *Publicado:* ${yt_play[0].ago}
⌚ *Duración:* ${secondString(yt_play[0].duration.seconds)}

_*Descargado el audio 🔊, aguarden un momento....*_`.trim();
//yt_play[0].url

await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null, fake);
try {
/*if (!ytplay2.all.length) return m.react("❌");
const vid = ytplay2.all[0];
const videoUrl = vid.url;*/
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp3?url=${encodeURIComponent(yt_play[0].url)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius.status) return m.react("❌");
const downloadUrl = delius.data.download.url;
const fileSize = await getFileSize(downloadUrl);
await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
if (fileSize > LimitAud) return await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
} catch (e1) {
try {
let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`);
let dp = await d2.json();
const audiop = await getBuffer(dp.result.media.mp3);
const fileSize = await getFileSize(dp.result.media.mp3);
await conn.sendMessage(m.chat, { audio: { url: audiop }, mimetype: 'audio/mpeg' }, { quoted: m });
if (fileSize > LimitAud) return await conn.sendMessage(m.chat, { document: { url: audiop }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
} catch (e2) {    
await m.react('❌');
console.log(e2);
}}}

if (command == 'play2' || command == 'video') {
if (!text) return conn.reply(m.chat, `*🤔Que está buscando? 🤔*\n*Ingrese el nombre del video*\n\n*Ejemplo:*\n#play emilia 420`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}});
    
const yt_play = await search(args.join(' '));
const ytplay2 = await yts(text);
const texto1 = `📌 *Título* : ${yt_play[0].title}\n📆 *Publicado:* ${yt_play[0].ago}\n⌚ *Duración:* ${secondString(yt_play[0].duration.seconds)}

_*Descargado sus video, aguarden un momento....*_

> _*Si este comando falla usar de la seguirte manera:*_ #ytmp4 ${yt_play[0].url}`.trim();

await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null, fake);
if (!ytplay2.all.length) return m.react("❌");
const vid = ytplay2.all[0];
const videoUrl = vid.url;
try {
const apiUrl = `https://deliriussapi-oficial.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius.status) return m.react("❌");
const downloadUrl = delius.data.download.url;
const fileSize = await getFileSize(downloadUrl);
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}` }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
}} catch (e1) {
try {
let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${videoUrl}`);
let dp = await d2.json();
const audiop = await getBuffer(dp.result.media.mp4);
const fileSize = await getFileSize(dp.result.media.mp4);
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: { url: audiop }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}` }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { video: { url: audiop }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
}} catch (e2) {    
await m.react('❌');
console.log(e2);
}}}

if (command == 'play3' || command == 'play4') {
if (!text) return conn.reply(m.chat, `*🤔Que esta buscado? 🤔*\n*Ingrese el nombre del la canción*\n\n*Ejemplo:*\n#play emilia 420`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
const yt_play = await search(args.join(' '))
const texto1 = `📌 *Título* : ${yt_play[0].title}\n📆 *Publicado:* ${yt_play[0].ago}\n⌚ *Duración:* ${secondString(yt_play[0].duration.seconds)}\n👀 *Vistas:* ${MilesNumber(yt_play[0].views)}`.trim()

await conn.sendButton(m.chat, texto1, botname, yt_play[0].thumbnail, [['Audio', `${usedPrefix}ytmp3 ${yt_play[0].url}`], ['video', `${usedPrefix}ytmp4 ${yt_play[0].url}`], ['Mas resultados', `${usedPrefix}yts ${text}`]], null, null, m)
}}
handler.help = ['play', 'play2'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'play3', 'play4', 'audio', 'video']
//handler.limit = 3
handler.register = true 
export default handler;

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
return search.videos;
}

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
seconds = Number(seconds);
const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor((seconds % (3600 * 24)) / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
  }
  
const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error al obtener el buffer", error);
    throw new Error("Error al obtener el buffer");
  }
}

async function getFileSize(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        return contentLength ? parseInt(contentLength, 10) : 0;
    } catch (error) {
        console.error("Error al obtener el tamaño del archivo", error);
        return 0;
    }
}
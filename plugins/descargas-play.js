//import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { ytmp3, ytmp4 } = require("@hiudyy/ytdl");
const LimitAud = 725 * 1024 * 1024; //725MB
const LimitVid = 425 * 1024 * 1024; //425MB
const isDirectVideo = false; 
const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/

const handler = async (m, {conn, command, args, text, usedPrefix}) => {
if (!text) return m.reply(`*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`) 
const tipoDescarga = command === 'play' ? 'audio' : command === 'play2' ? 'video' : command === 'play3' ? 'audio doc' : command === 'play4' ? 'video doc' : '';
let videoIdToFind = text.match(youtubeRegexID) || null
const yt_play = await search(args.join(' '));
let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1])
  
if (videoIdToFind) {
const videoId = videoIdToFind[1]  
ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)
} 
ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2  
await conn.sendMessage(m.chat, { text: `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*

*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻Aguarde un momento en lo que envío su ${tipoDescarga}*`,  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363355261011910@newsletter', 
serverMessageId: '', 
newsletterName: 'LoliBot ✨️' },
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid: null,  
externalAdReply: {  
showAdAttribution: true,  
renderLargerThumbnail: true,  
title: yt_play[0].title,   
body: wm,
containsAutoReply: true,  
mediaType: 1,   
thumbnailUrl: yt_play[0].thumbnail, 
sourceUrl: [nna, nna2, nnaa].getRandom()
}}}, { quoted: m })
/*conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*

*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻Aguarde un momento en lo que envío su audio*`, m, null, fake);*/

if (command === 'play' || command === 'musica') {
let audioData = null;

const apis = [
{ url: () => ytmp3(yt_play[0].url), extract: (data) => ({ data, isDirect: true }) },
{ url: () => fetch(`https://api.neoxr.eu/api/youtube?url=${yt_play[0].url}&type=audio&quality=128kbps&apikey=GataDios`).then(res => res.json()), extract: (data) => ({ data: data.data.url, isDirect: false }) },
{ url: () => fetch(`https://api.agatz.xyz/api/ytmp3?url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.data.downloadUrl, isDirect: false }) },
{ url: () => fetch(`https://api.fgmods.xyz/api/downloader/ytmp3?url=${yt_play[0].url}&apikey=${fgkeysapi}`).then(res => res.json()), extract: (data) => ({ data: data.result.dl_url, isDirect: false }) },
{ url: () => fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.dl, isDirect: false }) },
{ url: () => fetch(`https://axeel.my.id/api/download/audio?url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.downloads?.url, isDirect: false }) },
{ url: () => fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.result.download.url, isDirect: false }) },
{ url: () => fetch(`https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(yt_play[0].url)}`).then(res => res.json()), extract: (data) => ({ data: data.status === 'tunnel' ? data.url : null, isDirect: false }) },
{ url: () => fetch(`${apis}/download/ytmp3?url=${encodeURIComponent(yt_play[0].url)}`).then(res => res.json()), extract: (data) => ({ data: data.status ? data.data.download.url : null, isDirect: false }) },
{ url: () => fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.result.media.mp3, isDirect: false }) }];

for (const api of apis) {
try {
const data = await api.url();
const { data: extractedData, isDirect } = api.extract(data);
if (extractedData) {
const size = await getFileSize(extractedData);
if (size >= 1024) { 
audioData = extractedData;
isDirectAudio = isDirect;
break; 
}}} catch (e) {
console.log(`Error con API: ${e}`);
continue; 
}}

if (audioData) {
const fileSize = await getFileSize(audioData);
if (fileSize > LimitAud) {
await conn.sendMessage(m.chat, { document: isDirectAudio ? audioData : { url: audioData }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { audio: isDirectAudio ? audioData : { url: audioData }, mimetype: 'audio/mpeg' }, { quoted: m });
}} else {
await m.react('❌');
}}

if (command === 'play2' || command === 'video') {
let videoData = null;

const apis = [
{ url: () => ytmp4(yt_play[0].url), extract: (data) => ({ data, isDirect: false }) },
{ url: () => fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.dl, isDirect: false }) },
{ url: () => fetch(`https://api.neoxr.eu/api/youtube?url=${yt_play[0].url}&type=video&quality=720p&apikey=GataDios`).then(res => res.json()), extract: (data) => ({ data: data.data.url, isDirect: false }) },
{ url: () => fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.result.download.url, isDirect: false }) },
{ url: () => fetch(`https://axeel.my.id/api/download/video?url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.downloads?.url, isDirect: false }) },
{ url: () => fetch(`${apis}/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`).then(res => res.json()), extract: (data) => ({ data: data.status ? data.data.download.url : null, isDirect: false }) },
{ url: () => fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.result.media.mp4, isDirect: false }) }];

for (const api of apis) {
try {
const data = await api.url();
const { data: extractedData, isDirect } = api.extract(data);
if (extractedData) {
const size = await getFileSize(extractedData);
if (size >= 1024) { 
videoData = extractedData;
isDirectVideo = isDirect;
break; 
}}} catch (e) {
console.log(`Error con API: ${e}`);
continue; 
}}

if (videoData) {
const fileSize = await getFileSize(videoData);
const messageOptions = { fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, mimetype: 'video/mp4', quoted: m };

if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: isDirectVideo ? videoData : { url: videoData }, ...messageOptions });
} else {
await conn.sendMessage(m.chat, { video: isDirectVideo ? videoData : { url: videoData }, thumbnail: yt_play[0].thumbnail, ...messageOptions });
}} else {
await m.react('❌'); 
}}

if (command === 'play3' || command === 'playdoc') {
let audioData = null

const apis = [
{ url: () => ytmp3(yt_play[0].url), extract: (data) => ({ data, isDirect: true }) },
{ url: () => fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.result.download.url, isDirect: false }) },
{ url: () => fetch(`${apis}/download/ytmp3?url=${encodeURIComponent(yt_play[0].url)}`).then(res => res.json()), extract: (data) => ({ data: data.status ? data.data.download.url : null, isDirect: false }) },
{ url: () => youtubedl(yt_play[0].url).catch(() => youtubedlv2(yt_play[0].url)).then(yt => yt.audio['128kbps'].download()), extract: (data) => ({ data, isDirect: false }) },
{ url: () => fetch9Convert(yt_play[0].url), extract: (data) => ({ data, isDirect: false }) },
{ url: () => fetchY2mate(yt_play[0].url), extract: (data) => ({ data, isDirect: false }) },
{ url: () => fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.status && data.result?.downloadUrl ? data.result.downloadUrl : null, isDirect: false }) },
{ url: () => fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.result.media.mp3, isDirect: false }) 
}];

for (const api of apis) {
try {
const data = await api.url();
const { data: extractedData, isDirect } = api.extract(data);
if (extractedData) {
const size = await getFileSize(extractedData);
if (size >= 1024) { 
audioData = extractedData;
isDirectAudio = isDirect;
break; 
}}} catch (e) {
console.log(`Error con API: ${e}`);
continue; 
}}

if (audioData) {
await conn.sendMessage(m.chat, { document: isDirectAudio ? audioData : { url: audioData }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3`, quoted: m });
} else {
await m.react('❌');
}}

if (command === 'play4' || command === 'playdoc2') {
let videoData = null;

const apis = [
{ url: () => ytmp4(yt_play[0].url), extract: (data) => ({ data, isDirect: false }) }, 
{ url: () => fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.result.download.url, isDirect: false }) },
{ url: () => fetch(`${apis}/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`).then(res => res.json()), extract: (data) => ({ data: data.status ? data.data.download.url : null, isDirect: false }) },
{ url: () => fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.result.media.mp4, isDirect: false }) }
];

for (const api of apis) {
try {
const data = await api.url();
const { data: extractedData, isDirect } = api.extract(data);
if (extractedData) {
const size = await getFileSize(extractedData);
if (size >= 1024) { 
videoData = extractedData;
isDirectVideo = isDirect;
break; 
}}} catch (e) {
console.log(`Error con API: ${e}`);
continue; 
}}

if (videoData) {
await conn.sendMessage(m.chat, { document: isDirectVideo ? videoData : { url: videoData }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4', quoted: m });
} else {
await m.react('❌');
}}

/*if (command == 'play4') {
if (!text) return conn.reply(m.chat, `*🤔Que esta buscado? 🤔*\n*Ingrese el nombre del la canción*\n\n*Ejemplo:*\n#play emilia 420`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
const yt_play = await search(args.join(' '))
const texto1 = `📌 *Título* : ${yt_play[0].title}\n📆 *Publicado:* ${yt_play[0].ago}\n⌚ *Duración:* ${secondString(yt_play[0].duration.seconds)}\n👀 *Vistas:* ${MilesNumber(yt_play[0].views)}`.trim()

await conn.sendButton(m.chat, texto1, botname, yt_play[0].thumbnail, [['Audio', `${usedPrefix}ytmp3 ${yt_play[0].url}`], ['video', `${usedPrefix}ytmp4 ${yt_play[0].url}`], ['Mas resultados', `${usedPrefix}yts ${text}`]], null, null, m)
}*/
}
handler.help = ['play', 'play2', 'play3', 'play4', 'playdoc'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'play3', 'play4', 'audio', 'video', 'playdoc', 'playdoc2']
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
    return parseInt(response.headers.get('content-length') || 0);
  } catch {
    return 0; // Si falla, asumimos 0
  }
}

async function fetchY2mate(url) {
  const baseUrl = 'https://www.y2mate.com/mates/en60';
  const videoInfo = await fetch(`${baseUrl}/analyze/ajax`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ url, q_auto: 0 })
  }).then(res => res.json());

  const id = videoInfo.result.id;
  const downloadInfo = await fetch(`${baseUrl}/convert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ type: 'youtube', _id: id, v_id: url, token: '', ftype: 'mp4', fquality: '360p' })
  }).then(res => res.json());

  return downloadInfo.result.url;
}

async function fetchInvidious(url) {
  const apiUrl = `https://invidious.io/api/v1/get_video_info`;

const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
const data = await response.json();

if (data && data.video) {
const videoInfo = data.video;
return videoInfo; 
} else {
throw new Error("No se pudo obtener información del video desde Invidious");
  }
}

async function fetch9Convert(url) {
const apiUrl = `https://9convert.com/en429/api`;
const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
const data = await response.json();

if (data.status === 'ok') {
    return data.result.mp3;
  } else {
    throw new Error("No se pudo obtener la descarga desde 9Convert");
  }
}
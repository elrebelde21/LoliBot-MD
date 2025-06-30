//import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios'; 
import { savetube } from '../lib/yt-savetube.js'
import { ogmp3 } from '../lib/youtubedl.js'; 
const LimitAud = 725 * 1024 * 1024; // 725MB
const LimitVid = 425 * 1024 * 1024; // 425MB
const youtubeRegexID = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;
const userCaptions = new Map();
const userRequests = {};
  
const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) return m.reply(`*🤔Que está buscando? 🤔*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n${usedPrefix + command} emilia 420`);
const tipoDescarga = command === 'play' || command === 'musica' ? 'audio' : command === 'play2' ? 'video' : command === 'play3' ? 'audio (documento)' : command === 'play4' ? 'video (documento)' : '';
if (userRequests[m.sender]) return await conn.reply(m.chat, `⏳ Hey @${m.sender.split('@')[0]} espera pendejo, ya estás descargando algo 🙄\nEspera a que termine tu solicitud actual antes de hacer otra...`, userCaptions.get(m.sender) || m);
userRequests[m.sender] = true;
try {
let videoIdToFind = text.match(youtubeRegexID) || null;
const yt_play = await search(args.join(' ')); 
let ytplay2 = await yts(videoIdToFind === null ? text : 'https://youtu.be/' + videoIdToFind[1]);
if (videoIdToFind) {
const videoId = videoIdToFind[1];
ytplay2 = ytplay2.all.find(item => item.videoId === videoId) || ytplay2.videos.find(item => item.videoId === videoId)}
ytplay2 = ytplay2.all?.[0] || ytplay2.videos?.[0] || ytplay2;
const PlayText = await conn.sendMessage(m.chat, { text: `${yt_play[0].title}
*⇄ㅤ     ◁   ㅤ  ❚❚ㅤ     ▷ㅤ     ↻*

*⏰ Duración:* ${secondString(yt_play[0].duration.seconds)}
*👉🏻Aguarde un momento en lo que envío su ${tipoDescarga}*`,  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363349916000764@newsletter', 
serverMessageId: '', 
newsletterName: 'LoliBot ✨️' },
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid: null,  
externalAdReply: {  
showAdAttribution: true,  
renderLargerThumbnail: true,  
title: yt_play[0].title,   
body: "LoliBot",
containsAutoReply: true,  
mediaType: 1,   
thumbnailUrl: yt_play[0].thumbnail, 
sourceUrl: "skyultraplus.com"
}}}, { quoted: m })
userCaptions.set(m.sender, PlayText);

const [input, qualityInput = command === 'play' || command === 'musica' || command === 'play3' ? '320' : '720'] = text.split(' ');
const audioQualities = ['64', '96', '128', '192', '256', '320'];
const videoQualities = ['240', '360', '480', '720', '1080'];
const isAudioCommand = command === 'play' || command === 'musica' || command === 'play3';
const selectedQuality = (isAudioCommand ? audioQualities : videoQualities).includes(qualityInput) ? qualityInput : (isAudioCommand ? '320' : '720');
const isAudio = command.toLowerCase().includes('mp3') || command.toLowerCase().includes('audio')
const format = isAudio ? 'mp3' : '720' 

const audioApis = [
{ url: () => savetube.download(yt_play[0].url, format), extract: (data) => ({ data: data.result.download, isDirect: false }) },
{ url: () => ogmp3.download(yt_play[0].url, selectedQuality, 'audio'), extract: (data) => ({ data: data.result.download, isDirect: false }) },
{ url: () => fetch(`https://api.dorratz.com/v3/ytdl?url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => { 
const mp3 = data.medias.find(media => media.quality === "160kbps" && media.extension === "mp3");
return { data: mp3.url, isDirect: false }}},
{ url: () => fetch(`https://api.neoxr.eu/api/youtube?url=${yt_play[0].url}&type=audio&quality=128kbps&apikey=GataDios`).then(res => res.json()), extract: (data) => ({ data: data.data.url, isDirect: false }) },
{ url: () => fetch(`https://api.fgmods.xyz/api/downloader/ytmp4?url=${yt_play[0].url}&apikey=elrebelde21`).then(res => res.json()), extract: (data) => ({ data: data.result.dl_url, isDirect: false }) },
{ url: () => fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.dl, isDirect: false }) },
{ url: () => fetch(`${info.apis}/download/ytmp3?url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.status ? data.data.download.url : null, isDirect: false }) },
{ url: () => fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.result.download.url, isDirect: false }) },
{ url: () => fetch(`https://exonity.tech/api/dl/playmp3?query=${yt_play[0].title}`).then(res => res.json()), extract: (data) => ({ data: data.result.download, isDirect: false }) 
}];

const videoApis = [
{ url: () => savetube.download(yt_play[0].url, '720'), extract: (data) => ({ data: data.result.download, isDirect: false }) },
{ url: () => ogmp3.download(yt_play[0].url, selectedQuality, 'video'), extract: (data) => ({ data: data.result.download, isDirect: false }) },
{ url: () => fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${yt_play[0].url}`).then(res => res.json()), extract: (data) => ({ data: data.dl, isDirect: false }) },
{ url: () => fetch(`https://api.neoxr.eu/api/youtube?url=${yt_play[0].url}&type=video&quality=720p&apikey=GataDios`).then(res => res.json()), extract: (data) => ({ data: data.data.url, isDirect: false }) },
{ url: () => fetch(`https://api.fgmods.xyz/api/downloader/ytmp4?url=${yt_play[0].url}&apikey=elrebelde21`).then(res => res.json()), extract: (data) => ({ data: data.result.dl_url, isDirect: false }) },
{ url: () => fetch(`${info.apis}/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`).then(res => res.json()), extract: (data) => ({ data: data.status ? data.data.download.url : null, isDirect: false }) },
{ url: () => fetch(`https://exonity.tech/api/dl/playmp4?query=${encodeURIComponent(yt_play[0].title)}`).then(res => res.json()), extract: (data) => ({ data: data.result.download, isDirect: false })
}];

const download = async (apis) => {
let mediaData = null;
let isDirect = false;
for (const api of apis) {
try {
const data = await api.url();
const { data: extractedData, isDirect: direct } = api.extract(data);
if (extractedData) {
const size = await getFileSize(extractedData);
if (size >= 1024) {
mediaData = extractedData;
isDirect = direct;
break;
}}} catch (e) {
console.log(`Error con API: ${e}`);
continue;
}}
return { mediaData, isDirect };
};

if (command === 'play' || command === 'musica') {
const { mediaData, isDirect } = await download(audioApis);
if (mediaData) {
const fileSize = await getFileSize(mediaData);
if (fileSize > LimitAud) {
await conn.sendMessage(m.chat, { document: isDirect ? mediaData : { url: mediaData }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3`, contextInfo: {} }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { audio: isDirect ? mediaData : { url: mediaData }, mimetype: 'audio/mpeg', contextInfo: {} }, { quoted: m });
}} else {
//await m.react('❌');
}}

if (command === 'play2' || command === 'video') {
const { mediaData, isDirect } = await download(videoApis);
if (mediaData) {
const fileSize = await getFileSize(mediaData);
const messageOptions = { fileName: `${yt_play[0].title}.mp4`, caption: `🔰 Aquí está tu video \n🔥 Título: ${yt_play[0].title}`, mimetype: 'video/mp4' };
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: isDirect ? mediaData : { url: mediaData }, ...messageOptions }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { video: isDirect ? mediaData : { url: mediaData }, thumbnail: yt_play[0].thumbnail, ...messageOptions }, { quoted: m });
}} else {
//await m.react('❌');
}}

if (command === 'play3' || command === 'playdoc') {
const { mediaData, isDirect } = await download(audioApis);
if (mediaData) {
await conn.sendMessage(m.chat, { document: isDirect ? mediaData : { url: mediaData }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3`, contextInfo: {} }, { quoted: m });
} else {
await m.react('❌');
}}

if (command === 'play4' || command === 'playdoc2') {
const { mediaData, isDirect } = await download(videoApis);
if (mediaData) {
await conn.sendMessage(m.chat, { document: isDirect ? mediaData : { url: mediaData }, fileName: `${yt_play[0].title}.mp4`, caption: `🔰Título: ${yt_play[0].title}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4'}, { quoted: m })
} else {
//await m.react('❌');
}}
} catch (error) {
console.error(error);
m.react("❌️")
} finally {
delete userRequests[m.sender]; 
}}
handler.help = ['play', 'play2', 'play3', 'play4', 'playdoc'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'play3', 'play4', 'audio', 'video', 'playdoc', 'playdoc2', 'musica'];
handler.register = true;
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
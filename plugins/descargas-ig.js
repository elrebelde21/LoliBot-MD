import fetch from 'node-fetch';
import axios from 'axios';
import instagramGetUrl from 'instagram-url-direct';
import {instagram} from '@xct007/frieren-scraper';
import {instagramdl} from '@bochilteam/scraper';
import instagramDl from '@sasmeee/igdl';
import {fileTypeFromBuffer} from 'file-type';

const handler = async (m, {conn, args, command, usedPrefix}) => {
  const datas = global
 
if (!args[0]) return conn.reply(m.chat, `⚠️ Ingresa el enlace del vídeo de Instagram junto al comando.\n\nEjemplo: *${usedPrefix + command}* https://www.instagram.com/p/C60xXk3J-sb/?igsh=YzljYTk1ODg3Zg==`, m)
await m.react('⌛')
try {
const apiUrl = `${apis}/download/instagram?url=${encodeURIComponent(args[0])}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius || !delius.data || delius.data.length === 0) return m.react("❌");
const downloadUrl = delius.data[0].url;
const fileType = delius.data[0].type;
if (!downloadUrl) return m.react("❌");

if (fileType === 'image') {
await conn.sendFile(m.chat, downloadUrl, 'ig.jpg', '_*Aqui tiene tu imagen de Instagram*', m, null, fake);
m.react('✅')
} else if (fileType === 'video') {
await conn.sendFile(m.chat, downloadUrl, 'ig.mp4', '*Aqui esta el video de Instagram*', m, null, fake);
m.react('✅')
} else {
return m.react("❌"); 
}} catch {   
try {
const img = await instagramDl(args[0]);
for (let i = 0; i < img.length; i++) {
const bufferInfo = await getBuffer(img[i].download_link);
if (bufferInfo.detectedType.mime.startsWith('image/')) {
await conn.sendMessage(m.chat, {image: {url: img[i].download_link}}, {quoted: m});
} else if (bufferInfo.detectedType.mime.startsWith('video/')) {
await conn.sendFile(m.chat, img[i].download_link, 'igdl.mp4', `*Aqui esta el video de Instagram*`, m, null, fake)
//conn.sendMessage(m.chat, {video: {url: img[i].download_link }}, {quoted: m});
await m.react('✅')
}}} catch {   
try {
const datTa = await instagram.download(args[0]);
for (const urRRl of datTa) {
const shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const tXXxt = `_${shortUrRRl}_`.trim();
conn.sendFile(m.chat, urRRl.url, 'error.mp4', tXXxt, m, null, fake);
await new Promise((resolve) => setTimeout(resolve, 10000));
await m.react('✅')    
}} catch {
try {
const resultss = await instagramGetUrl(args[0]).url_list[0];
const shortUrl2 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt2 = `_${shortUrl2}_`.trim();
await conn.sendFile(m.chat, resultss, 'error.mp4', txt2, m, null, fake);
await m.react('✅')
} catch {
try {
const resultssss = await instagramdl(args[0]);
const shortUrl3 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt4 = `_${shortUrl3}_`.trim();
for (const {url} of resultssss) await conn.sendFile(m.chat, url, 'error.mp4', txt4, m, null, fake);
await m.react('✅')
} catch {
try {
const human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkeysapi}&url=${args[0]}`);
const json = await human.json();
const videoig = json.result;
const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt1 = `_${shortUrl1}_`.trim();
await conn.sendFile(m.chat, videoig, 'error.mp4', txt1, m, null, fake);
await m.react('✅')
} catch (e) {
await m.react('❌')
console.log(e)}}}}}}}
handler.help = ['instagram *<link ig>*']
handler.tags = ['downloader']
handler.command = /^(instagramdl|instagram|igdl|ig|instagramdl2|instagram2|igdl2|ig2|instagramdl3|instagram3|igdl3|ig3)$/i
handler.limit = 1
handler.register = true 
export default handler;

const getBuffer = async (url, options) => {
options = options || {};
const res = await axios({method: 'get', url, headers: {'DNT': 1, 'Upgrade-Insecure-Request': 1}, ...options, responseType: 'arraybuffer'});
const buffer = Buffer.from(res.data, 'binary');
const detectedType = await fileTypeFromBuffer(buffer);
if (!detectedType || (detectedType.mime !== 'image/jpeg' && detectedType.mime !== 'image/png' && detectedType.mime !== 'video/mp4')) {
return null;
}
return { buffer, detectedType };
};

/*let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.reply(m.chat, `⚠️ Ingresa el enlace del vídeo de Instagram junto al comando.\n\nEjemplo: *${usedPrefix + command}* https://www.instagram.com/p/C60xXk3J-sb/?igsh=YzljYTk1ODg3Zg==`, m)
await m.react('⌛')
try {
let res = await fetch(`https://vihangayt.me/download/instagram?url=${args[0]}`)
let json = await res.json()
const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
//conn.sendMessage(m.chat, { video: { url: json.data.data[0].url }, caption: `🔗 *Url:* ${shortUrl1}`}, {quoted: m}).catch(console.error)
await conn.sendFile(m.chat, json.data.data[0].url, 'igdl.mp4', `🔗 *Url:* ${shortUrl1}`, m, null, fake)
await m.react('✅')
} catch (e) {
await m.react('❌')
console.log(e) 
}}
handler.help = ['instagram *<link ig>*']
handler.tags = ['downloader']
handler.command = /^(instagramdl|instagram|igdl|ig|instagramdl2|instagram2|igdl2|ig2|instagramdl3|instagram3|igdl3|ig3)$/i
handler.limit = 1
handler.register = true 
export default handler*/
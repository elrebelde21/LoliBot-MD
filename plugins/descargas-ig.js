import fetch from 'node-fetch';
import axios from 'axios';
import {instagramdl} from '@bochilteam/scraper';
import {fileTypeFromBuffer} from 'file-type';
 
const handler = async (m, {conn, args, command, usedPrefix}) => {
const datas = global
if (!args[0]) throw `⚠️ Ingresa el enlace del vídeo de Instagram junto al comando.\n\nEjemplo: *${usedPrefix + command}* https://www.instagram.com/p/C60xXk3J-sb/?igsh=YzljYTk1ODg3Zg==`
await m.react('⌛')
try {
const res = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${args}`);
const data = await res.json();
const fileType = data.data[0].url.includes('.webp') ? 'image' : 'video'; 
const downloadUrl = data.data[0].url;
if (fileType === 'image') {
await conn.sendFile(m.chat, downloadUrl, 'ig.jpg', '_*Aqui tiene tu imagen de Instagram*', m, null, fake);
m.react('✅');
} else if (fileType === 'video') {
await conn.sendFile(m.chat, downloadUrl, 'ig.mp4', '*Aqui esta el video de Instagram*', m, null, fake);
m.react('✅');
}
} catch {   
try {
const res = await fetch(`${APIs.fgmods.url}/downloader/igdl?url=${args}&apikey=${APIs.fgmods.key}`);
const data = await res.json();
if (!data || !data.result || data.result.length === 0) return m.react("❌");  
const result = data.result[0];  
const thumbnail = result.thumbnail;  
const downloadUrl = result.url;  
if (!downloadUrl) return m.react("❌");
if (thumbnail && downloadUrl) {
if (downloadUrl.endsWith('.jpg') || downloadUrl.endsWith('.png')) {
await conn.sendFile(m.chat, downloadUrl, 'ig.jpg', '_*Aqui tiene tu imagen de Instagram*', m, null, fake);
m.react('✅');  
} else if (downloadUrl.endsWith('.mp4')) {
await conn.sendFile(m.chat, downloadUrl, 'ig.mp4', '**Aqui esta el video de Instagram*', m, null, fake);
m.react('✅');  
}} else {
m.react("❌");  
}} catch {   
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
const resultssss = await instagramdl(args[0]);
const shortUrl3 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
const txt4 = `_${shortUrl3}_`.trim();
for (const {url} of resultssss) await conn.sendFile(m.chat, url, 'error.mp4', txt4, m, null, fake);
await m.react('✅')
} catch (e) {
await m.react('❌')
console.log(e)
handler.limit = 0
}}}}}
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
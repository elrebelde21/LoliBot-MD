import fg from 'api-dylux';
import fetch from 'node-fetch';
import axios from 'axios';
const handler = async (m, {conn, args, command, usedPrefix}) => {
if (!args[0]) throw `⚠️ 𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙪𝙣 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 𝙥𝙖𝙧𝙖 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙧 𝙚𝙡 𝙑𝙞𝙙𝙚𝙤\n• *𝙀𝙟 :* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`
if (!args[0].match(/www.facebook.com|fb.watch/g)) throw `⚠️ 𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙪𝙣 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 𝙥𝙖𝙧𝙖 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙧 𝙚𝙡 𝙑𝙞𝙙𝙚𝙤\n• *𝙀𝙟 :* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`
m.react(`⌛`) 
try { 
const api = await fetch(`https://api.agatz.xyz/api/facebook?url=${args}`);
const data = await api.json();
const videoUrl = data.data.hd || data.data.sd; 
const imageUrl = data.data.thumbnail; 
if (videoUrl && videoUrl.endsWith('.mp4')) {
await conn.sendFile(m.chat, videoUrl, 'video.mp4', '✅ Aquí está tu video de Facebook', m, null, fake);
m.react('✅');
} else if (imageUrl && (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.png'))) {
await conn.sendFile(m.chat, imageUrl, 'thumbnail.jpg', '✅ Aquí está la imagen de Facebook', m, null, fake);
m.react('✅');
}} catch {   
try {
const api = await fetch(`https://api.alyachan.dev/api/fb?url=${args}&apikey=Gata-Dios`);
const data = await api.json();
const downloadUrl = data.data[0].url;
if (downloadUrl.endsWith('.jpg') || downloadUrl.endsWith('.png')) {
await conn.sendFile(m.chat, downloadUrl, 'ig.jpg', '✅ Aquí está tu imagen de Facebook', m, null, fake);
m.react('✅');
} else if (downloadUrl.endsWith('.mp4')) {
await conn.sendFile(m.chat, downloadUrl, 'ig.mp4', '✅ Aquí está tu video de Facebook', m, null, fake);
m.react('✅');
}
} catch {   
try {
const api = await fetch(`${APIs.fgmods.url}/downloader/fbdl?url=${args}&apikey=${APIs.fgmods.key}`)
const data = await api.json();
const downloadUrl = data.result[0].hd || data.result[0].sd;
await conn.sendFile(m.chat, downloadUrl, 'video.mp4', '✅ Aquí está tu video de Facebook', m, null, fake);
} catch {   
try {
const apiUrl = `${apis}/download/facebook?url=${args}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
const downloadUrl = delius.urls[0].hd || delius.urls[0].sd;
await conn.sendFile(m.chat, downloadUrl, 'video.mp4', '✅ Aquí está tu video de Facebook', m, null, fake);
} catch {   
try {
const apiUrl = `https://api.dorratz.com/fbvideo?url=${encodeURIComponent(args[0])}`;
const response = await fetch(apiUrl);
const data = await response.json();
if (data.result) {
const hdUrl = data.result.hd;
const sdUrl = data.result.sd;
const audioUrl = data.result.audio;        
const downloadUrl = hdUrl || sdUrl; 
await conn.sendFile(m.chat, downloadUrl, 'video.mp4', '✅ Aquí está tu video de Facebook', m, null, fake);
}} catch {   
try {
const ress = await fg.fbdl(args[0]);
const urll = await ress.data[0].url;
await conn.sendFile(m.chat, urll, 'error.mp4', '✅ 𝐀𝐐𝐔𝐈 𝐄𝐒𝐓𝐀 𝐓𝐔 𝐕𝐈𝐃𝐄𝐎 𝐃𝐄 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊\n\n', m, null, fake);
m.react(`✅`)    
} catch (e) {
m.react(`❌`) 
//m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${err6} <<<< `)       
console.log(e) 
}}}}}}}
handler.help = ['fb', 'facebook', 'fbdl']
handler.tags = ['downloader']
handler.command = /^(facebook|fb|facebookdl|fbdl|facebook2|fb2|facebookdl2|fbdl2|facebook3|fb3|facebookdl3|fbdl3|facebook4|fb4|facebookdl4|fbdl4|facebook5|fb5|facebookdl5|fbdl5)$/i
handler.limit = 3 
handler.register = true
export default handler

async function igeh(url_media) {
return new Promise(async (resolve, reject)=>{
const BASE_URL = 'https://instasupersave.com/';
try {
const resp = await axios(BASE_URL);
const cookie = resp.headers['set-cookie']; // obtener cookie de la solicitud
const session = cookie[0].split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '');
const config = {method: 'post', url: `${BASE_URL}api/convert`, headers: {'origin': 'https://instasupersave.com', 'referer': 'https://instasupersave.com/pt/', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'same-origin', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52', 'x-xsrf-token': session, 'Content-Type': 'application/json', 'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`}, data: {url: url_media}};
axios(config).then(function(response) {
const ig = [];
if (Array.isArray(response.data)) {
response.data.forEach((post) => {
ig.push(post.sd === undefined ? post.thumb : post.sd.url);
})} else {
ig.push(response.data.url[0].url)}
resolve({results_number: ig.length, url_list: ig});
}).catch(function(error) {
reject(error.message)});
} catch (e) {
reject(e.message);
}})}

import fg from 'api-dylux';
import fetch from 'node-fetch';
import {savefrom, facebookdl, facebookdlv2} from '@bochilteam/scraper';
import fbDownloader from 'fb-downloader-scrapper';
import {facebook} from '@xct007/frieren-scraper';
import axios from 'axios';
const handler = async (m, {conn, args, command, usedPrefix}) => {
if (!args[0]) return conn.reply(m.chat,  `⚠️ 𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙪𝙣 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 𝙥𝙖𝙧𝙖 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙧 𝙚𝙡 𝙑𝙞𝙙𝙚𝙤\n• *𝙀𝙟 :* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: imagen4, sourceUrl: redes.getRandom()}}})
if (!args[0].match(/www.facebook.com|fb.watch/g)) return m.reply(`⚠️ 𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙪𝙣 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚 𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠 𝙥𝙖𝙧𝙖 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙧 𝙚𝙡 𝙑𝙞𝙙𝙚𝙤\n• *𝙀𝙟 :* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`) 
m.react(`⌛`) 
try { 
const api = await fetch(`https://api.fgmods.xyz/api/downloader/fbdl?url=${args}&apikey=${fgkeysapi}`)
const data = await api.json();
const downloadUrl = data.result[0].hd || data.result[0].sd;
await conn.sendFile(m.chat, downloadUrl, 'video.mp4', '✅ Aquí está tu video de Facebook', m, null, fake);
} catch (err1) {
try {
const apiUrl = `${apis}/download/facebook?url=${args}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
const downloadUrl = delius.urls[0].hd || delius.urls[0].sd;
await conn.sendFile(m.chat, downloadUrl, 'video.mp4', '✅ Aquí está tu video de Facebook', m, null, fake);
} catch (err1) {
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
}} catch (err2) {
try {
const d2ata = await facebook.v1(args[0]);
let r2es = '';
if (d2ata.urls && d2ata.urls.length > 0) {
r2es = `${d2ata.urls[0]?.hd || d2ata.urls[1]?.sd || ''}` }
conn.sendFile(m.chat, r2es, 'error.mp4', `✅ 𝐀𝐐𝐔𝐈 𝐄𝐒𝐓𝐀 𝐓𝐔 𝐕𝐈𝐃𝐄𝐎 𝐃𝐄 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊\n\n`, m, null, fake);
m.react(`✅`) 
} catch (err3) {
try {
const req = await igeh(args[0]);
conn.sendMessage(m.chat, {video: {url: req.url_list}}, m);
} catch (err1_4) {
try {
const Rres = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=${lolkeysapi}&url=${args[0]}`);
const Jjson = await Rres.json();
let VIDEO = Jjson.result[0];
if (VIDEO == '' || !VIDEO || VIDEO == null) VIDEO = Jjson.result[1];
conn.sendFile(m.chat, VIDEO, 'error.mp4', `✅ 𝐀𝐐𝐔𝐈 𝐄𝐒𝐓𝐀 𝐓𝐔 𝐕𝐈𝐃𝐄𝐎 𝐃𝐄 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊\n\n`, m, null, fake);
m.react(`✅`) 
} catch (err5) {
try {
const ress = await fg.fbdl(args[0]);
const urll = await ress.data[0].url;
await conn.sendFile(m.chat, urll, 'error.mp4', '✅ 𝐀𝐐𝐔𝐈 𝐄𝐒𝐓𝐀 𝐓𝐔 𝐕𝐈𝐃𝐄𝐎 𝐃𝐄 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊\n\n', m, null, fake);
m.react(`✅`) 
} catch (err6) {
try {
const res = await fbDownloader(args[0]);
for (const result of res.download) {
const ur = result.url;
await conn.sendFile(m.chat, ur, 'error.mp4', '✅ 𝐀𝐐𝐔𝐈 𝐄𝐒𝐓𝐀 𝐓𝐔 𝐕𝐈𝐃𝐄𝐎 𝐃𝐄 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊\n\n', m, null, fake);              
m.react(`✅`)               
}} catch (err7) {
try {
const res3 = await fetch(`https://latam-api.vercel.app/api/facebookdl?apikey=nekosmic&q=${args[0]}`);
const json = await res3.json();
const url3 = await json.video;
await conn.sendFile(m.chat, url3, 'error.mp4', '✅ 𝐀𝐐𝐔𝐈 𝐄𝐒𝐓𝐀 𝐓𝐔 𝐕𝐈𝐃𝐄𝐎 𝐃𝐄 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊\n\n', m, null, fake);
m.react(`✅`)               
} catch (err8) {
try {
const {result} = await facebookdl(args[0]).catch(async (_) => await facebookdlv2(args[0])).catch(async (_) => await savefrom(args[0]));
for (const {url, isVideo} of result.reverse()) await conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, '✅ 𝐀𝐐𝐔𝐈 𝐄𝐒𝐓𝐀 𝐓𝐔 𝐕𝐈𝐃𝐄𝐎 𝐃𝐄 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊', m, null, fake);
m.react(`✅`)                 
} catch (e) {
m.react(`❌`) 
//m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${err6} <<<< `)       
console.log(e) 
}}}}}}}}}}}
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

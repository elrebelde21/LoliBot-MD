import fg from 'api-dylux';
import fetch from 'node-fetch';
import axios from 'axios';
const userMessages = new Map();
const userRequests = {};

const handler = async (m, { conn, args, command, usedPrefix }) => {
if (!args[0]) throw `⚠️ ${await tr("Ingrese un enlace de Facebook para descargar el video")}\n• *${await tr("Ejemplo")}:* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`;
if (!args[0].match(/www.facebook.com|fb.watch/g)) throw `⚠️ ${await tr("Ingrese un enlace de Facebook para descargar el video")}\n• *${await tr("Ejemplo")}:* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`;
if (userRequests[m.sender]) return await conn.reply(m.chat, `⚠️ ${await tr("Hey")} @${m.sender.split('@')[0]} ${await tr("Calmao, ya estás bajando un video")} 🙄\n${await tr("Espera a que termine tu descarga actual antes de pedir otra...")}`, m)
userRequests[m.sender] = true;
m.react(`⌛`);
try {
const downloadAttempts = [async () => {
const api = await fetch(`https://api.agatz.xyz/api/facebook?url=${args[0]}`);
const data = await api.json();
const videoUrl = data.data.hd || data.data.sd;
const imageUrl = data.data.thumbnail;
if (videoUrl && videoUrl.endsWith('.mp4')) {
return { type: 'video', url: videoUrl, caption: `✅ ${await tr("Aquí está tu video de Facebook")}` };
} else if (imageUrl && (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.png'))) {
return { type: 'image', url: imageUrl, caption: `✅ ${await tr("Aquí está la imagen de Facebook")}` };
}},
async () => {
const api = await fetch(`${APIs.fgmods.url}/downloader/fbdl?url=${args[0]}&apikey=${APIs.fgmods.key}`);
const data = await api.json();
const downloadUrl = data.result[0].hd || data.result[0].sd;
return { type: 'video', url: downloadUrl, caption: `✅ ${await tr("Aquí está tu video de Facebook")}` };
},
async () => {
const apiUrl = `${apis}/download/facebook?url=${args[0]}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
const downloadUrl = delius.urls[0].hd || delius.urls[0].sd;
return { type: 'video', url: downloadUrl, caption: `✅ ${await tr("Aquí está tu video de Facebook")}`};
},
async () => {
const apiUrl = `https://api.dorratz.com/fbvideo?url=${encodeURIComponent(args[0])}`;
const response = await fetch(apiUrl);
const data = await response.json();
const hdUrl = data.result.hd;
const sdUrl = data.result.sd;
const downloadUrl = hdUrl || sdUrl;
return { type: 'video', url: downloadUrl, caption: `✅ ${await tr("Aquí está tu video de Facebook")}` };
},
async () => {
const ress = await fg.fbdl(args[0]);
const urll = ress.data[0].url;
return { type: 'video', url: urll, caption: `✅ ${await tr("Aquí está tu video de Facebook")}` };
}];

let mediaData = null;
for (const attempt of downloadAttempts) {
try {
mediaData = await attempt();
if (mediaData) break; 
} catch (err) {
console.error(`Error in attempt: ${err.message}`);
continue; 
}}

if (!mediaData) throw new Error(await tr('No se pudo descargar el video o imagen desde ninguna API'));
const fileName = mediaData.type === 'video' ? 'video.mp4' : 'thumbnail.jpg';
await conn.sendFile(m.chat, mediaData.url, fileName, mediaData.caption, m, null, fake);
m.react('✅');
} catch (e) {
m.react('❌');
console.log(e);
} finally {
delete userRequests[m.sender];
}};
handler.help = ['fb', 'facebook', 'fbdl'];
handler.tags = ['downloader'];
handler.command = /^(facebook|fb|facebookdl|fbdl|facebook2|fb2|facebookdl2|fbdl2|facebook3|fb3|facebookdl3|fbdl3|facebook4|fb4|facebookdl4|fbdl4|facebook5|fb5|facebookdl5|fbdl5)$/i;
handler.limit = 3;
handler.register = true;

export default handler;

async function igeh(url_media) {
  return new Promise(async (resolve, reject) => {
    const BASE_URL = 'https://instasupersave.com/';
    try {
      const resp = await axios(BASE_URL);
      const cookie = resp.headers['set-cookie'];
      const session = cookie[0].split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '');
      const config = {
        method: 'post',
        url: `${BASE_URL}api/convert`,
        headers: {
          'origin': 'https://instasupersave.com',
          'referer': 'https://instasupersave.com/pt/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52',
          'x-xsrf-token': session,
          'Content-Type': 'application/json',
          'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`
        },
        data: { url: url_media }
      };
      axios(config).then(function(response) {
        const ig = [];
        if (Array.isArray(response.data)) {
          response.data.forEach((post) => {
            ig.push(post.sd === undefined ? post.thumb : post.sd.url);
          });
        } else {
          ig.push(response.data.url[0].url);
        }
        resolve({ results_number: ig.length, url_list: ig });
      }).catch(function(error) {
        reject(error.message);
      });
    } catch (e) {
      reject(e.message);
    }
  });
}
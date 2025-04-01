import fg from 'api-dylux';
import axios from 'axios';
import fetch from 'node-fetch';
import { Tiktok } from '../lib/tiktok.js';
import cheerio from 'cheerio';
const userRequests = {};

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `⚠️ *${await tr("Que tiktok buscar?")} 🤔*\n\n*⚡${await tr("Ingrese un enlace de tiktok para descarga el video")}*\n*${await tr("Ejemplo")}:* ${usedPrefix + command} https://vm.tiktok.com/ZM6T4X1RY/`;
if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) throw `❌ Error`;
if (userRequests[m.sender]) return await conn.reply(m.chat, `Oye @${m.sender.split('@')[0]}, ${await tr("calma bro, ya estás descargando algo")} 😒\n> ${await tr("Espera a que termine tu solicitud actual antes de hacer otra...")}`, m)
userRequests[m.sender] = true;
let msgEspere = await tr("Espere")
let msgEspere2 = await tr("Ya estoy descargado... sus video de tiktok")
let msgEspere3 = await tr("Ya casi")
let msgEsper4 = await tr("Completado")
let vidtt = await tr("Aqui esta tu video de tiktok")
const { key } = await conn.sendMessage(m.chat, { text: `⌛ ${msgEspere} ✋\n▰▰▰▱▱▱▱▱▱\n${msgEspere2} 🔰` }, { quoted: m });
await delay(1000);
await conn.sendMessage(m.chat, { text: `⌛ ${msgEspere} ✋ \n▰▰▰▰▰▱▱▱▱\n${msgEspere2} 🔰`, edit: key });
await delay(1000);
await conn.sendMessage(m.chat, { text: `⌛ ${msgEspere3} 🏃‍♂️💨\n▰▰▰▰▰▰▰▱▱`, edit: key });
try {
const downloadAttempts = [async () => {
const data = await Tiktok(args);
return data.nowm;
},
async () => {
const tTiktok = await tiktokdlF(args[0]);
return tTiktok.video;
},
async () => {
const response = await axios.get(`https://api.dorratz.com/v2/tiktok-dl?url=${args[0]}`);
return response.data.data.media.org;
},
async () => {
const p = await fg.tiktok(args[0]);
return p.nowm;
}];

let videoUrl = null;
for (const attempt of downloadAttempts) {
try {
videoUrl = await attempt();
if (videoUrl) break; 
} catch (err) {
console.error(`Error in attempt: ${err.message}`);
continue; // Si falla, intentar con la siguiente API
}}

if (!videoUrl) throw new Error(await tr('No se pudo descargar el video desde ninguna API'));
await conn.sendFile(m.chat, videoUrl, 'tt.mp4', `*🔰 ${vidtt}*`, m, null, fake);
//conn.sendMessage(m.chat, {video: { url: videoUrl }, caption: `*🔰 Aqui esta tu video de tiktok*` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `✅ ${msgEsper4}\n▰▰▰▰▰▰▰▰▰\n`, edit: key });
} catch (e) {
console.log(e);
m.react(`❌`);
handler.limit = false;
} finally {
delete userRequests[m.sender];
}};
handler.help = ['tiktok'];
handler.tags = ['downloader'];
handler.command = /^(tt|tiktok)(dl|nowm)?$/i;
handler.limit = 1;

export default handler;

const delay = time => new Promise(res => setTimeout(res, time));

async function tiktokdlF(url) {
  if (!/tiktok/.test(url)) throw new Error(`*• Ejemplo:* _${usedPrefix + command} https://vm.tiktok.com/ZM686Q4ER/_`);
  const gettoken = await axios.get('https://tikdown.org/id');
  const $ = cheerio.load(gettoken.data);
  const token = $('#download-form > input[type=hidden]:nth-child(2)').attr('value');
  const param = { url: url, _token: token };
  const { data } = await axios.request('https://tikdown.org/getAjax?', {
    method: 'post',
    data: new URLSearchParams(Object.entries(param)),
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'
    }
  });
  const getdata = cheerio.load(data.html);
  if (data.status) {
    return {
      status: true,
      thumbnail: getdata('img').attr('src'),
      video: getdata('div.download-links > div:nth-child(1) > a').attr('href'),
      audio: getdata('div.download-links > div:nth-child(2) > a').attr('href')
    };
  } else {
    return { status: false };
  }
}
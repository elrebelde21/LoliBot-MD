import fg from 'api-dylux';
import axios from 'axios';
const handler = async (m, {conn, text, args, usedPrefix, command}) => {
if (!text) throw `⚠️ *Que tiktok buscar? 🤔*\n\n⚡ *Ingrese un enlace de tiktok para descarga el video*\n*Ej:* ${usedPrefix + command} https://vm.tiktok.com/ZM6T4X1RY/` 
if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) throw `❌ Error`
const { key } = await conn.sendMessage(m.chat, {text: `⌛ 𝙀𝙨𝙥𝙚𝙧𝙚 ✋\n▰▰▰▱▱▱▱▱▱\n𝙔𝙖 𝙚𝙨𝙩𝙤𝙮 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙙𝙤... 𝙨𝙪𝙨 𝙫𝙞𝙙𝙚𝙤 𝙙𝙚𝙡 𝙏𝙞𝙠𝙏𝙤𝙠 🔰`}, {quoted: m});
await delay(1000);
await conn.sendMessage(m.chat, {text: `⌛ 𝙀𝙨𝙥𝙚𝙧𝙚 ✋ \n▰▰▰▰▰▱▱▱▱\n𝙔𝙖 𝙚𝙨𝙩𝙤𝙮 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙙𝙤... 𝙨𝙪𝙨 𝙫𝙞𝙙𝙚𝙤 𝙙𝙚𝙡 𝙏𝙞𝙠𝙏𝙤𝙠 🔰`, edit: key});
await delay(1000);
await conn.sendMessage(m.chat, {text: `⌛ 𝙔𝙖 𝙘𝙖𝙨𝙞 🏃‍♂️💨\n▰▰▰▰▰▰▰▱▱`, edit: key});
try {
const tTiktok = await tiktokdlF(args[0]);
await conn.sendMessage(m.chat, {video: {url: tTiktok.video}, caption: `*🔰 Aqui esta tu video de tiktok*`}, {quoted: m});
await conn.sendMessage(m.chat, {text: `✅ 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤\n▰▰▰▰▰▰▰▰▰\n𝘼𝙦𝙪𝙞 𝙚𝙨𝙩𝙖 𝙩𝙪 𝙫𝙞𝙙𝙚𝙤 💫`, edit: key})             
} catch {
try {
const response = await axios.get(`https://api.dorratz.com/v2/tiktok-dl?url=${args[0]}`);
if (response.data.status && response.data.data) {
const videoData = response.data.data.media;
const videoUrl = videoData.org; 
await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: `*🔰 Aqui esta tu video de tiktok*` }, { quoted: m });
await conn.sendMessage(m.chat, {text: `✅ 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤\n▰▰▰▰▰▰▰▰▰\n𝘼𝙦𝙪𝙞 𝙚𝙨𝙩𝙖 𝙩𝙪 𝙫𝙞𝙙𝙚𝙤 💫`, edit: key})   
}} catch {
try {
const p = await fg.tiktok(args[0]);
await conn.sendMessage(m.chat, {video: {url: p.nowm}, caption: `*✅ Aquí esta tu video de tiktok*`}, {quoted: m});
await conn.sendMessage(m.chat, {text: `✅ 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤\n▰▰▰▰▰▰▰▰▰\n𝘼𝙦𝙪𝙞 𝙚𝙨𝙩𝙖 𝙩𝙪 𝙫𝙞𝙙𝙚𝙤 💫`, edit: key})               
} catch (e) {
//m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${e} <<<< `) 
console.log(e) 
m.react(`❌`)         
}}}}
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tt|tiktok)(dl|nowm)?$/i
handler.limit = 1
export default handler
const delay = time => new Promise(res => setTimeout(res, time))

async function tiktokdlF(url) {
  if (!/tiktok/.test(url)) return `_*< DESCARGAS - TIKTOK />*_\n\n*[ ℹ️ ] Ingrese un enlace de TikTok.*\n\n*[ 💡 ] Ejemplo:* _${usedPrefix + command} https://vm.tiktok.com/ZM686Q4ER/_`;
  const gettoken = await axios.get('https://tikdown.org/id');
  const $ = cheerio.load(gettoken.data);
  const token = $('#download-form > input[type=hidden]:nth-child(2)').attr( 'value' );
  const param = {url: url, _token: token};
  const {data} = await axios.request('https://tikdown.org/getAjax?', {method: 'post', data: new URLSearchParams(Object.entries(param)), headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', 'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'}});
  const getdata = cheerio.load(data.html);
  if (data.status) {
    return {status: true, thumbnail: getdata('img').attr('src'), video: getdata('div.download-links > div:nth-child(1) > a').attr('href'), audio: getdata('div.download-links > div:nth-child(2) > a').attr('href')};
  } else {
    return {status: false};
  }
}

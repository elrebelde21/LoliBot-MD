import fg from 'api-dylux' 
import axios from 'axios'
import cheerio from 'cheerio'
import { tiktok } from "@xct007/frieren-scraper";
let generateWAMessageFromContent = (await import(global.baileys)).default
import { tiktokdl } from '@bochilteam/scraper'
let handler = async (m, { conn, text, args, usedPrefix, command}) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
if (!text) return conn.reply(m.chat, `⚠️ *Que tiktok buscar? 🤔*\n\n⚡ *Ingrese un enlace de tiktok para descarga el video*\n*Ej:* ${usedPrefix + command} https://vm.tiktok.com/ZM6T4X1RY/`, fkontak, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})    
if (!/(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi.test(text)) return conn.reply(m.chat, `*EL ENLACE DEL TIKTOK ES INCORRECTO*`, fkontak,  m)  
const { key } = await conn.sendMessage(m.chat, {text: `⌛ 𝙀𝙨𝙥𝙚𝙧𝙚 ✋\n▰▰▰▱▱▱▱▱▱\n𝙔𝙖 𝙚𝙨𝙩𝙤𝙮 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙙𝙤... 𝙨𝙪𝙨 𝙫𝙞𝙙𝙚𝙤 𝙙𝙚𝙡 𝙏𝙞𝙠𝙏𝙤𝙠 🔰`}, {quoted: fkontak});
await delay(1000 * 2);
await conn.sendMessage(m.chat, {text: `⌛ 𝙀𝙨𝙥𝙚𝙧𝙚 ✋ \n▰▰▰▰▰▱▱▱▱\n𝙔𝙖 𝙚𝙨𝙩𝙤𝙮 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙙𝙤... 𝙨𝙪𝙨 𝙫𝙞𝙙𝙚𝙤 𝙙𝙚𝙡 𝙏𝙞𝙠𝙏𝙤𝙠 🔰`, edit: key});
await delay(1000 * 2);
await conn.sendMessage(m.chat, {text: `⌛ 𝙔𝙖 𝙘𝙖𝙨𝙞 🏃‍♂️💨\n▰▰▰▰▰▰▰▱▱`, edit: key});
//await conn.reply(m.chat, `⌛ _𝘾𝙖𝙧𝙜𝙖𝙙𝙤..._\n▰▰▰▱▱▱▱▱▱\n𝙀𝙨𝙥𝙚𝙧𝙚 𝙪𝙣𝙤𝙨 𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨 𝙚𝙡 𝙦𝙪𝙚 𝙢𝙖𝙣𝙙𝙤 𝙨𝙪𝙨 𝙫𝙞𝙙𝙚𝙤 𝙙𝙚 𝙩𝙞𝙠𝙩𝙤𝙠 𝙥𝙤𝙧 𝙛𝙖𝙫𝙤𝙧 🔰`, fkontak,  m) 
try {
const dataF = await tiktok.v1(args[0])
conn.sendFile(m.chat, dataF.play, 'tiktok.mp4', `*Aqui tiene 🔰*`.trim(), m) 
await conn.sendMessage(m.chat, {text: `✅ 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤\n▰▰▰▰▰▰▰▰▰\n𝘼𝙦𝙪𝙞 𝙚𝙨𝙩𝙖 𝙩𝙪 𝙫𝙞𝙙𝙚𝙤 💫`, edit: key})
handler.limit = 1
} catch (e1) {
try {
const tTiktok = await tiktokdlF(args[0])
conn.sendFile(m.chat, tTiktok.video, 'tiktok.mp4', `*Aqui tiene 🔰*`.trim(), m) 
await conn.sendMessage(m.chat, {text: `✅ 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤\n▰▰▰▰▰▰▰▰▰\n𝘼𝙦𝙪𝙞 𝙚𝙨𝙩𝙖 𝙩𝙪 𝙫𝙞𝙙𝙚𝙤 💫`, edit: key})
handler.limit = 1
} catch (e2) {
try {
let p = await fg.tiktok(args[0]) 
conn.sendFile(m.chat, p.nowm, 'tiktok.mp4', `*Aqui tiene 🔰*`.trim(), m)
await conn.sendMessage(m.chat, {text: `✅ 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤\n▰▰▰▰▰▰▰▰▰\n𝘼𝙦𝙪𝙞 𝙚𝙨𝙩𝙖 𝙩𝙪 𝙫𝙞𝙙𝙚𝙤 💫`, edit: key});
handler.limit = 1
} catch (e3) {
try { 
const { author: { nickname }, video, description } = await tiktokdl(args[0])
const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd
conn.sendFile(m.chat, url, 'tiktok.mp4', `*Aqui tiene 🔰*`.trim(), m)
await conn.sendMessage(m.chat, {text: `✅ 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤\n▰▰▰▰▰▰▰▰▰\n𝘼𝙦𝙪𝙞 𝙚𝙨𝙩𝙖 𝙩𝙪 𝙫𝙞𝙙𝙚𝙤 💫`, edit: key});
handler.limit = 1
} catch {
handler.limit = 0
await conn.sendMessage(m.chat, {text: `𝙊𝙘𝙪𝙧𝙧𝙞𝙤 𝙪𝙣 𝙚𝙧𝙧𝙤𝙧 🏃‍♂️💨`, edit: key});
}}}}}
handler.help = ['tiktok']
handler.tags = ['dl']
handler.command = /^(tt|tiktok)(dl|nowm)?$/i
//handler.limit = 1
export default handler
const delay = time => new Promise(res => setTimeout(res, time))

async function tiktokdlF(url) {
if (!/tiktok/.test(url)) return 'Enlace incorrecto';
const gettoken = await axios.get("https://tikdown.org/id");
const $ = cheerio.load(gettoken.data);
const token = $("#download-form > input[type=hidden]:nth-child(2)").attr( "value" );
const param = { url: url, _token: token };
const { data } = await axios.request("https://tikdown.org/getAjax?", { method: "post", data: new URLSearchParams(Object.entries(param)), headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36" }, });
var getdata = cheerio.load(data.html);
if (data.status) {
return { status: true, thumbnail: getdata("img").attr("src"), video: getdata("div.download-links > div:nth-child(1) > a").attr("href"), audio: getdata("div.download-links > div:nth-child(2) > a").attr("href"), }} else
return { status: false }}

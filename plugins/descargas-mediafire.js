import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import {mediafiredl} from '@bochilteam/scraper';
import fg from 'api-dylux'
let free = 150 
let prem = 500

const handler = async (m, {conn, args, usedPrefix, command}) => {
let sticker = 'https://qu.ax/Wdsb.webp'
if (!args[0]) return m.reply(`⚠️ 𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙪𝙣 𝙀𝙣𝙡𝙖𝙘𝙚 𝙫𝙖𝙡𝙞𝙙𝙤 𝙙𝙚𝙡 𝙢𝙚𝙙𝙞𝙖𝙛𝙞𝙧𝙚 𝙀𝙟:*\n${usedPrefix + command} https://www.mediafire.com/file/cv64tns6co3272q/Lolibot.zip/file`)
m.react(`🚀`) 
try {
let res = await fg.mediafireDl(args[0])
let { url, url2, filename, ext, upload_date, filesize, filesizeB } = res
let isLimit = limit * 1024 < filesizeB
let caption = `┏━━『 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 』━━•
┃❥ 𝐍𝐨𝐦𝐛𝐫𝐞 : ${filename}
┃❥ 𝐏𝐞𝐬𝐨 : ${filesize}
┃❥ 𝐓𝐢𝐩𝐨 : ${upload_date}
╰━━━⊰ 𓃠 ${vs} ⊱━━━━•
${isLimit ? `\n> no puedo descargar en archivos superar el limit de descargar que es *+${free} MB*` : '\n> ⏳ ᴱˢᵖᵉʳᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ ᵉⁿ ˡᵒˢ ᵠᵘᵉ ᵉⁿᵛᶦᵒˢ ˢᵘˢ ᵃʳᶜʰᶦᵛᵒˢ'}
`.trim()
await conn.sendFile(m.chat, ss, 'ssweb.png', caption, m, null, fake)
if(!isLimit) await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true })
m.react('✅'); 
} catch (error) {
try {
const res = await fetch(`https://api.siputzx.my.id/api/d/mediafire?url=${args[0]}`);
if (!res.ok) throw new Error(`Error en la API 1: ${res.statusText}`);
const data = await res.json();
if (!data.status || !data.data) return 
const fileDataArray = data.data;
for (const fileData of fileDataArray) {
const caption = `┏━━『 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 』━━•
┃❥ 𝐍𝐨𝐦𝐛𝐫𝐞 : ${fileData.filename}
┃❥ 𝐏𝐞𝐬𝐨 : ${fileData.size}
┃❥ 𝐓𝐢𝐩𝐨 : ${fileData.mime}
╰━━━⊰ 𓃠 ${vs} ⊱━━━━•
> ⏳ ᴱˢᵖᵉʳᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ ᵉⁿ ˡᵒˢ ᵠᵘᵉ ᵉⁿᵛᶦᵒˢ ˢᵘˢ ᵃʳᶜʰᶦᵛᵒˢ
`.trim(); 
await conn.sendFile(m.chat, fileData.link, fileData.filename, caption, m, null, {mimetype: fileData.mime, asDocument: true });
m.react('✅'); 
}
} catch (error) {
try {
const res = await fetch(`${apis}/api/mediafire?url=${args[0]}`);
if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
const data = await res.json();
const fileDataArray = data.data;
fileDataArray.forEach((fileData) => {
const caption = `┏━━『 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 』━━•\n┃❥ 𝐍𝐨𝐦𝐛𝐫𝐞 :\n┃${fileData.filename}\n┃——————«•»——————\n┃❥ 𝐏𝐞𝐬𝐨 :\n┃${fileData.size}\n\n┃——————«•»——————\n┃❥ 𝐓𝐢𝐩𝐨 :\n┃${fileData.mime}\n╰━━━⊰ 𓃠 ${vs} ⊱━━━━•\n\n> ⏳ ᴱˢᵖᵉʳᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ ᵉⁿ ˡᵒˢ ᵠᵘᵉ ᵉⁿᵛᶦᵒˢ ˢᵘˢ ᵃʳᶜʰᶦᵛᵒˢ`.trim();
m.reply(caption);
conn.sendFile(m.chat, fileData.link, fileData.filename, '', m, null, {mimetype: fileData.mime, asDocument: true, 
});
m.react(`✅`);
});
} catch (error) {
try {
const resEX = await mediafiredl(args[0]);
const captionES = `┏━━『 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 』━━•\n┃❥ 𝐍𝐨𝐦𝐛𝐫𝐞 :\n┃${resEX.filename}\n┃——————«•»——————\n┃❥ 𝐏𝐞𝐬𝐨 :\n┃ ${resEX.filesizeH}\n\n┃——————«•»——————\n┃❥ 𝐓𝐢𝐩𝐨 :\n┃${resEX.ext}\n\n╰━━━⊰ 𓃠 ${vs} ⊱━━━━•\n\n> ⏳ ᴱˢᵖᵉʳᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ ᵉⁿ ˡᵒˢ ᵠᵘᵉ ᵉⁿᵛᶦᵒˢ ˢᵘˢ ᵃʳᶜʰᶦᵛᵒˢ`.trim();
m.reply(captionES);
await conn.sendFile(m.chat, resEX.url, resEX.filename, '', m, null, {mimetype: resEX.ext, asDocument: true});
m.react(`✅`)     
} catch (error2) {
try {
const res = await mediafireDl(args[0]);
const {name, size, date, mime, link} = res;
const caption = `┏━━『 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 』━━•\n┃❥ 𝐍𝐨𝐦𝐛𝐫𝐞 :\n┃${name}\n┃——————«•»——————\n┃❥ 𝐏𝐞𝐬𝐨 :\n┃${size}\n\n┃——————«•»——————\n┃❥ 𝐓𝐢𝐩𝐨 :\n┃${mime}\n\n╰━━━⊰ 𓃠 ${vs} ⊱━━━━•\n\n> ⏳ ᴱˢᵖᵉʳᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ ᵉⁿ ˡᵒˢ ᵠᵘᵉ ᵉⁿᵛᶦᵒˢ ˢᵘˢ ᵃʳᶜʰᶦᵛᵒˢ`.trim();
await m.reply(caption);
await conn.sendFile(m.chat, link, name, '', m, null, {mimetype: mime, asDocument: true});      
m.react(`✅`) 
} catch (error3) {
console.error(error3);
conn.sendFile(m.chat, sticker, 'error.webp', '', m, null, fake)
m.react(`❌`) 
}}}}}}
handler.help = ['mediafire', 'mediafiredl'];
handler.tags = ['downloader'];
handler.command = /^(mediafire|mediafiredl|dlmediafire)$/i
handler.register = true
handler.limit = 3
export default handler;

async function mediafireDl(url) {
  const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/', '')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
  const $ = cheerio.load(res.data);
  const link = $('#downloadButton').attr('href');
  const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ', '').replaceAll('\n', '');
  const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
  const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ', '');
  let mime = '';
  const rese = await axios.head(link);
  mime = rese.headers['content-type'];
  return {name, size, date, mime, link};
}

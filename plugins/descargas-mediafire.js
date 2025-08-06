import axios from 'axios';
import fetch from 'node-fetch';
//import cheerio from 'cheerio';
//import { mediafiredl } from '@bochilteam/scraper';
import fg from 'api-dylux';
let free = 150;
let prem = 500;
const userCaptions = new Map();
const userRequests = {};

const handler = async (m, { conn, args, usedPrefix, command }) => {
const sticker = 'https://qu.ax/Wdsb.webp';
if (!args[0]) return m.reply( `⚠️ 𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙪𝙣 𝙀𝙣𝙡𝙖𝙘𝙚 𝙫𝙖𝙡𝙞𝙙𝙤 𝙙𝙚𝙡 𝙢𝙚𝙙𝙞𝙖𝙛𝙞𝙧𝙚 𝙀𝙟:*\n${usedPrefix + command} https://www.mediafire.com/file/sd9hl31vhhzf76v/EvolutionV1.1-beta_%2528Recomendado%2529.apk/file`)

if (userRequests[m.sender]) return await conn.reply(m.chat, `⚠️ Hey @${m.sender.split('@')[0]} pendejo, ya estás descargando algo 🙄\nEspera a que termine tu solicitud actual antes de hacer otra...`, userCaptions.get(m.sender) || m);
userRequests[m.sender] = true;
m.react(`🚀`);
try {
const downloadAttempts = [
async () => {
const res = await fetch(`https://api.delirius.store/download/mediafire?url=${args[0]}`);
const data = await res.json();
return { url: data.data[0].link,
filename: data.data[0].filename,
filesize: data.data[0].size,
mimetype: data.data[0].mime
}},
async () => {
const res = await fetch(`https://api.neoxr.eu/api/mediafire?url=${args[0]}&apikey=russellxz`);
const data = await res.json();
if (!data.status || !data.data) throw new Error('Error en Neoxr');
return { url: data.data.url,
filename: data.data.title,
filesize: data.data.size,
mimetype: data.data.mime
}},
async () => {
const res = await fetch(`https://api.agatz.xyz/api/mediafire?url=${args[0]}`);
const data = await res.json();
return { url: data.data[0].link,
filename: data.data[0].nama,
filesize: data.data[0].size,
mimetype: data.data[0].mime
}},
async () => {
const res = await fetch(`https://api.siputzx.my.id/api/d/mediafire?url=${args[0]}`);
const data = await res.json();
return data.data.map(file => ({ url: file.link,
filename: file.filename,
filesize: file.size,
mimetype: file.mime
}))[0];
}
];

let fileData = null;

for (const attempt of downloadAttempts) {
try {
fileData = await attempt();
if (fileData) break; 
} catch (err) {
console.error(`Error in attempt: ${err.message}`);
continue; // Si falla, intentar con la siguiente API
}}

if (!fileData) throw new Error('No se pudo descargar el archivo desde ninguna API');
const file = Array.isArray(fileData) ? fileData[0] : fileData;
const caption = `┏━━『 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 』━━•
┃❥ 𝐍𝐨𝐦𝐛𝐫𝐞 : ${file.filename}
┃❥ 𝐏𝐞𝐬𝐨 : ${file.filesize}
┃❥ 𝐓𝐢𝐩𝐨 : ${file.mimetype}
╰━━━⊰ 𓃠 ${info.vs} ⊱━━━━•
> ⏳ ᴱˢᵖᵉʳᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ ᵉⁿ ˡᵒˢ ᵠᵘᵉ ᵉⁿᵛᶦᵒˢ ˢᵘˢ ᵃʳᶜʰᶦᵛᵒˢ`.trim();
const captionMessage = await conn.reply(m.chat, caption, m)
userCaptions.set(m.sender, captionMessage);
await conn.sendFile(m.chat, file.url, file.filename, '', m, null, { mimetype: file.mimetype, asDocument: true });
m.react('✅');
} catch (e) {
await conn.sendFile(m.chat, sticker, 'error.webp', '', m);
m.react('❌');
console.error(e);
handler.limit = false;
} finally {
delete userRequests[m.sender];
}};
handler.help = ['mediafire', 'mediafiredl'];
handler.tags = ['downloader'];
handler.command = /^(mediafire|mediafiredl|dlmediafire)$/i;
handler.register = true;
handler.limit = 3;

export default handler;
import {googleIt} from '@bochilteam/scraper';
import google from 'google-it';
import axios from 'axios';
let handler = async (m, { conn, command, args, usedPrefix }) => {
const fetch = (await import('node-fetch')).default;
const text = args.join` `;
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
if (!text) return conn.reply(m.chat,  `⚠️ 𝙌𝙪𝙚 𝙚𝙨𝙩𝙖 𝙗𝙪𝙨𝙘𝙖𝙣𝙙𝙤? 🤔 𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙡𝙤 𝙦𝙪𝙚 𝙦𝙪𝙞𝙚𝙧𝙖 𝙗𝙪𝙨𝙘𝙖𝙧 𝙀𝙟𝙚𝙢𝙥𝙡𝙤 :\n${usedPrefix + command} loli`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}})
try {
const url = 'https://google.com/search?q=' + encodeURIComponent(text);
google({'query': text}).then(res => {
let teks = `*🔍 RESULTADOS DE:* ${text}\n\n*${url}*\n\n`
for (let g of res) {
teks += `_${g.title}_\n_${g.link}_\n_${g.snippet}_\n\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n\n`
} 
const ss = `https://image.thum.io/get/fullpage/${url}`
conn.sendFile(m.chat, ss, 'error.png', teks, fkontak)
//m.reply(teks)
})
} catch {    
handler.limit = 0
}}
handler.help = ['google', 'googlef'].map(v => v + ' <pencarian>')
handler.tags = ['internet']
handler.command = /^googlef?$/i
handler.exp = 40
handler.exp = 3
handler.limit = 1
export default handler
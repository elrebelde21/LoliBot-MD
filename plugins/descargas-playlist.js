import yts from 'yt-search';
import fs from 'fs';
let handler = async (m, { conn, text, usedPrefix, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
if (!text) return conn.reply(m.chat,  `${lenguajeGB['smsAvisoMG']()}𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚 𝙙𝙚 𝙪𝙣 𝙫𝙞𝙙𝙚𝙤 𝙤 𝙘𝙖𝙣𝙖𝙡 𝙙𝙚 𝙮𝙤𝙪𝙩𝙪𝙗𝙚`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: wm, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})    
try {
let vids_ = { 
from: m.sender, 
urls: [] 
}
if (!global.videoList) {
global.videoList = [];
}
if (global.videoList[0]?.from == m.sender) {
delete global.videoList;
}
let results = await yts(text);
let textoInfo = `${lenguajeGB['smsAvisoIIG']()} \`𝙋𝙐𝙀𝘿𝙀𝙎 𝘿𝙀𝙎𝘾𝘼𝙍𝙂𝘼𝙎 𝙀𝙇 𝙑𝙄𝘿𝙀𝙊 𝙌𝙐𝙀 𝙌𝙐𝙄𝙀𝙍𝘼𝙎 𝘿𝙀 𝙀𝙎𝙏𝘼 𝙁𝙊𝙍𝙈𝘼:\`
> ${usedPrefix}video <numero> 
> ${usedPrefix}audio <numero> 

\`*𝙀𝙅𝙀𝙈𝙋𝙇𝙊:*\`
> *${usedPrefix}video 2*\n\n••••••••••••••••••••••••••••••••••••`.trim()  
let teks = results.all.map((v, i) => {
let link = v.url;
vids_.urls.push(link);
return `> [${i + 1}]\n> ❤️꙰༻ *TÍTULO:*  ${v.title}
> ⁖🩵꙰༻ *ENLACE:* ${v.url}
> ⁖💜꙰༻ *DURACIÓN:* ${v.timestamp}
> ⁖💚꙰༻ *SUBIDO:* ${v.ago}
> ⁖🧡꙰༻ *VISTAS:* ${v.views}`}).join('\n\n> ••••••••••••••••••••••••••••••••••••\n\n')
conn.sendFile(m.chat, results.all[0].thumbnail, 'yts.jpeg', textoInfo + '\n\n' + teks, fkontak, m)
global.videoList.push(vids_);
} catch {    
handler.limit = false
}}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^playlist|ytbuscar|yts(earch)?$/i
handler.exp = 70
handler.limit = 1
handler.level = 4
export default handler
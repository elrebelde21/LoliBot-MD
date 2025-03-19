import fetch from 'node-fetch'
const userRequests = {};

const handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `*⚠️ ¿Que esta buscando? ingresar en link de algun vifeo de Threads!!*\n*• Ejemplo:*\n${usedPrefix + command} https://www.threads.net/@adri_leclerc_/post/C_dSNIOOlpy?xmt=AQGzxbmyveDB91QgFo_KQWzqL6PT2yCy2eg8BkhPTO-6Kw`
if (userRequests[m.sender]) return m.reply('⏳ *Espera...* Ya hay una solicitud en proceso. Por favor, espera a que termine antes de hacer otra.')
userRequests[m.sender] = true;
const { key } = await conn.sendMessage(m.chat, {text: `⌛ 𝙀𝙨𝙥𝙚𝙧𝙚 ✋\n▰▰▰▱▱▱▱▱▱`}, {quoted: m});
await delay(1000);
await conn.sendMessage(m.chat, {text: `⌛ 𝙀𝙨𝙥𝙚𝙧𝙚 ✋ \n▰▰▰▰▰▱▱▱▱`, edit: key});
await delay(1000);
await conn.sendMessage(m.chat, {text: `⌛ 𝙔𝙖 𝙘𝙖𝙨𝙞 🏃‍♂️💨\n▰▰▰▰▰▰▰▱▱`, edit: key});
m.react(`⌛`) 
try {
const res = await fetch(`https://api.agatz.xyz/api/threads?url=${args[0]}`);
const data = await res.json()
const downloadUrl = data.data.image_urls[0] || data.data.video_urls[0];
const fileType = downloadUrl.includes('.webp') || downloadUrl.includes('.jpg') || downloadUrl.includes('.png') ? 'image' : 'video';
if (fileType === 'image') {
await conn.sendFile(m.chat, downloadUrl, 'threads_image.jpg', '_*Aquí tienes la imagen de Threads*_', m, null, fake);
m.react('✅');
} else if (fileType === 'video') {
await conn.sendFile(m.chat, downloadUrl, 'threads_video.mp4', '_*Aquí tienes el video de Threads*_', m, null, fake);
m.react('✅');
}
await conn.sendMessage(m.chat, {text: `✅ 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤\n▰▰▰▰▰▰▰▰▰`, edit: key})   
} catch {   
try {
const res2 = await fetch(`https://delirius-apiofc.vercel.app/download/threads?url=${args[0]}`);
const data2 = await res2.json();
if (data2.status === true && data2.data.length > 0) {
const downloadUrl = data2.data[0].url; 
const fileType = data2.data[0].type; 
if (fileType === 'image') {
await conn.sendFile(m.chat, downloadUrl, 'threads_image.jpg', '_*Aquí tienes la imagen de Threads*_', m, null, fake);
m.react('✅');
} else if (fileType === 'video') {
await conn.sendFile(m.chat, downloadUrl, 'threads_video.mp4', '_*Aquí tienes el video de Threads*_', m, null, fake);
m.react('✅');
}}
await conn.sendMessage(m.chat, {text: `✅ 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙖𝙙𝙤\n▰▰▰▰▰▰▰▰▰`, edit: key})   
} catch (e) {
m.react(`❌`) 
await conn.sendMessage(m.chat, {text: `\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:* #report\n\n>>> ${e} <<<<`, edit: key})   
//m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:* #report\n\n>>> ${e} <<<< `)       
console.log(e) 
} finally {
delete userRequests[m.sender];
}}
}
handler.help = ['thread']
handler.tags = ['downloader']
handler.command = /^(thread|threads|threaddl)$/i;
handler.register = true;
handler.limit = 1
export default handler

const delay = time => new Promise(res => setTimeout(res, time))
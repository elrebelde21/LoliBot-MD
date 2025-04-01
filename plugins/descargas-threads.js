import fetch from 'node-fetch'
const userRequests = {};

const handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `*⚠️ ${await tr("¿Qué estás buscando? Ingresa el link de algún video de Threads!!")}*\n*• ${await tr("Ejemplo")}:*\n${usedPrefix + command} https://www.threads.net/@adri_leclerc_/post/C_dSNIOOlpy?xmt=AQGzxbmyveDB91QgFo_KQWzqL6PT2yCy2eg8BkhPTO-6Kw`

if (userRequests[m.sender]) return await conn.reply(m.chat, `⏳ ${await tr("Hey")} @${m.sender.split('@')[0]} ${await tr("pendejo, ya hay una solicitud en proceso. Por favor, espera a que termine antes de hacer otra")}`, userRequests[m.sender].message || m)   
let msgEspere = await tr("Espere")
let msgEspere2 = await tr("Ya casi")
let msgEsperefin = await tr("Completado")
let imgThr = await tr("Aquí tienes la imagen de Threads")
let vidThr = await tr("Aquí tienes el video de Threads")

const { key } = await conn.sendMessage(m.chat, {text: `⌛ ${msgEspere} ✋\n▰▰▰▱▱▱▱▱▱`}, {quoted: m}); 
userRequests[m.sender] = { active: true, message: { key, chat: m.chat, fromMe: true } };
await delay(1000);
await conn.sendMessage(m.chat, {text: `⌛ ${msgEspere} ✋ \n▰▰▰▰▰▱▱▱▱`, edit: key});
await delay(1000);
await conn.sendMessage(m.chat, {text: `⌛ ${msgEspere2} 🏃‍♂️💨\n▰▰▰▰▰▰▰▱▱`, edit: key});
m.react(`⌛`) 
try {
const res = await fetch(`https://api.agatz.xyz/api/threads?url=${args[0]}`);
const data = await res.json()
const downloadUrl = data.data.image_urls[0] || data.data.video_urls[0];
const fileType = downloadUrl.includes('.webp') || downloadUrl.includes('.jpg') || downloadUrl.includes('.png') ? 'image' : 'video';
if (fileType === 'image') {
await conn.sendFile(m.chat, downloadUrl, 'threads_image.jpg', `_*${imgThr}*_`, m, null, fake);
m.react('✅');
} else if (fileType === 'video') {
await conn.sendFile(m.chat, downloadUrl, 'threads_video.mp4', `_*${vidThr}*_`, m, null, fake);
m.react('✅');
}
await conn.sendMessage(m.chat, {text: `${msgEsperefin}\n▰▰▰▰▰▰▰▰▰`, edit: key})   
} catch {   
try {
const res2 = await fetch(`${apis}/download/threads?url=${args[0]}`);
const data2 = await res2.json();
if (data2.status === true && data2.data.length > 0) {
const downloadUrl = data2.data[0].url; 
const fileType = data2.data[0].type; 
if (fileType === 'image') {
await conn.sendFile(m.chat, downloadUrl, 'threads_image.jpg', `_*${imgThr}*_`, m, null, fake);
m.react('✅');
} else if (fileType === 'video') {
await conn.sendFile(m.chat, downloadUrl, 'threads_video.mp4', `_*${vidThr}*_`, m, null, fake);
m.react('✅');
}}
await conn.sendMessage(m.chat, {text: `✅ ${msgEsperefin}\n▰▰▰▰▰▰▰▰▰`, edit: key})   
} catch (e) {
m.react(`❌`) 
m.reply(`\`\`\`⚠️ ${await tr("OCURRIO UN ERROR")} ⚠️\`\`\`\n\n> *${await tr("Reporta el siguiente error a mi creador con el comando:")}* #report\n\n>>> ${e} <<<< `)    
console.log(e) 
}} finally {
delete userRequests[m.sender];
}}
handler.help = ['thread']
handler.tags = ['downloader']
handler.command = /^(thread|threads|threaddl)$/i;
handler.register = true;
handler.limit = 1

export default handler

const delay = time => new Promise(res => setTimeout(res, time))
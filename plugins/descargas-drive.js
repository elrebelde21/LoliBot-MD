import fetch from 'node-fetch'
const userRequests = {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `⚠️ Ingrese una Url de Drive\n• Ejemplo: ${usedPrefix + command} https://drive.google.com/file/d/1-8BSwPSAycKYMqveGm_JTu2c_wIDkJIt/view?usp=drivesdk`
if (userRequests[m.sender]) return m.reply('⏳ *Espera...* Ya hay una solicitud en proceso. Por favor, espera a que termine antes de hacer otra.')
userRequests[m.sender] = true;
m.react("📥")
m.reply(`*⌛ 𝐂𝐚𝐥𝐦𝐚 ✋ 𝐂𝐥𝐚𝐜𝐤, 𝐘𝐚 𝐞𝐬𝐭𝐨𝐲 𝐄𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 🚀*\n*𝐒𝐢 𝐧𝐨 𝐥𝐞 𝐥𝐥𝐞𝐠𝐚 𝐞𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 𝐞𝐬 𝐝𝐞𝐛𝐢𝐝𝐨 𝐚 𝐪𝐮𝐞 𝐞𝐬 𝐦𝐮𝐲 𝐩𝐞𝐬𝐚𝐝𝐨*`)
try {
const api = await fetch(`https://api.siputzx.my.id/api/d/gdrive?url=${args[0]}`);
const data = await api.json();
const fileName = data.data.name;
const mimetype = getMimetype(fileName);
await conn.sendMessage(m.chat, {document: { url: data.data.download }, mimetype: mimetype, fileName: `${fileName}`, caption: null }, { quoted: m });
await m.react("✅");
} catch {   
try {
const api = await fetch(`https://apis.davidcyriltech.my.id/gdrive?url=${args[0]}`);
const data = await api.json();
const fileName = data.name;
const mimetype = getMimetype(fileName);
await conn.sendMessage(m.chat, {document: { url: data.download_link }, mimetype: mimetype, fileName: `${fileName}`, caption: null }, { quoted: m });
await m.react("✅");
} catch (e) {
m.react(`❌`) 
m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:* #report\n\n>>> ${e} <<<< `)       
console.log(e) 
} finally {
delete userRequests[m.sender];
}}}
handler.help = ['drive'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(drive|drivedl|dldrive|gdrive)$/i
handler.register = true
handler.limit = 3
export default handler
const delay = time => new Promise(res => setTimeout(res, time))

const getMimetype = (fileName) => {
    if (fileName.endsWith('.pdf')) return 'application/pdf';
    if (fileName.endsWith('.mp4')) return 'video/mp4';
    if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) return 'image/jpeg';
    if (fileName.endsWith('.png')) return 'image/png';
    if (fileName.endsWith('.zip')) return 'application/zip';
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return 'application/msword';
    if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) return 'application/vnd.ms-excel';
    if (fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) return 'application/vnd.ms-powerpoint';
    if (fileName.endsWith('.txt')) return 'text/plain';
    if (fileName.endsWith('.mp3')) return 'audio/mpeg';
    return 'application/octet-stream'; // Tipo por defecto
  };
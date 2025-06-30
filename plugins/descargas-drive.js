import fetch from 'node-fetch';
const userCaptions = new Map();
const userRequests = {};

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply(`⚠️ Ingrese una Url de Drive\n• Ejemplo: ${usedPrefix + command} https://drive.google.com/file/d/1-8BSwPSAycKYMqveGm_JTu2c_wIDkJIt/view?usp=drivesdk`)

if (userRequests[m.sender]) {
conn.reply(m.chat, `⏳ *Hey @${m.sender.split('@')[0]} Espera...* Ya hay una solicitud en proceso. Por favor, espera a que termine antes de hacer otra...`, userCaptions.get(m.sender) || m)
return;
}
userRequests[m.sender] = true;
m.react("📥");
try {
const waitMessageSent = conn.reply(m.chat, `*⌛ 𝐂𝐚𝐥𝐦𝐚 ✋ 𝐂𝐥𝐚𝐜𝐤, 𝐘𝐚 𝐞𝐬𝐭𝐨𝐲 𝐄𝐧𝐯𝐢𝐚𝐝𝐨 𝐞𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 🚀*\n*𝐒𝐢 𝐧𝐨 𝐥𝐞 𝐥𝐥𝐞𝐠𝐚 𝐞𝐥 𝐚𝐫𝐜𝐡𝐢𝐯𝐨 𝐞𝐬 𝐝𝐞𝐛𝐢𝐝𝐨 𝐚 𝐪𝐮𝐞 𝐞𝐬 𝐦𝐮𝐲 𝐩𝐞𝐬𝐚𝐝𝐨*`, m)
userCaptions.set(m.sender, waitMessageSent);
const downloadAttempts = [
async () => {
const api = await fetch(`https://api.siputzx.my.id/api/d/gdrive?url=${args[0]}`);
const data = await api.json();
return { url: data.data.download,
filename: data.data.name,
};
},
async () => {
const api = await fetch(`https://apis.davidcyriltech.my.id/gdrive?url=${args[0]}`);
const data = await api.json();
return { url: data.download_link,
filename: data.name,
}},
];

let fileData = null;

for (const attempt of downloadAttempts) {
try {
fileData = await attempt();
if (fileData) break; // Si se obtiene un resultado, salir del bucle
} catch (err) {
console.error(`Error in attempt: ${err.message}`);
continue; // Si falla, intentar con la siguiente API
}}

if (!fileData) {
throw new Error('No se pudo descargar el archivo desde ninguna API');
}

const { url, filename } = fileData;
const mimetype = getMimetype(filename);
await conn.sendMessage(m.chat, { document: { url: url }, mimetype: mimetype, fileName: filename, caption: null }, { quoted: m });
await m.react("✅");
} catch (e) {
m.react(`❌`);
m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:* #report\n\n>>> ${e} <<<<`);
console.log(e);
} finally {
delete userRequests[m.sender];
}
};
handler.help = ['drive'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(drive|drivedl|dldrive|gdrive)$/i;
handler.register = true;
handler.limit = 3;

export default handler;

const getMimetype = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  const mimeTypes = {
    'pdf': 'application/pdf',
    'mp4': 'video/mp4',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'zip': 'application/zip',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'txt': 'text/plain',
    'mp3': 'audio/mpeg',
    'apk': 'application/vnd.android.package-archive',
    'rar': 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    'mkv': 'video/x-matroska',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    'wmv': 'video/x-ms-wmv',
    'flv': 'video/x-flv',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'ogg': 'audio/ogg',
    'wav': 'audio/wav',
  };
  return mimeTypes[extension] || 'application/octet-stream'; // Tipo por defecto
};
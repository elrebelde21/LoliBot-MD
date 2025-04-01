import fetch from 'node-fetch';
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
const userCaptions = new Map();
const userRequests = {};

let handler = async (m, { args, usedPrefix, command, conn }) => {
if (!args[0]) return m.reply(`*⚠️ ${await tr("Ingrese un enlace de github")}*\n• *${await tr("Ejemplo")} :* ${usedPrefix + command} https://github.com/elrebelde21/LoliBot-MD`);
if (!regex.test(args[0])) throw `⚠️ ${await tr("Eso no es un enlace de github bobo")} 🤡`;
if (userRequests[m.sender]) {
conn.reply(m.chat, `⏳ *${await tr("Hey")} @${m.sender.split('@')[0]}* ${await tr("*Espera...* Ya hay una solicitud en proceso. Por favor, espera a que termine antes de hacer otra...")}`, userCaptions.get(m.sender) || m)
return;
}
userRequests[m.sender] = true;
try {   
const downloadGit = await conn.reply(m.chat, `*⌛ ${await tr("Calma")} ✋ ${await tr("Clack, ya estoy emviado el archivo")} 🚀*\n> *${await tr("Si no le llega el archivo es debido a que el repositorio es muy pesado")}*`, m, {
contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: wm, body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}});   
userCaptions.set(m.sender, downloadGit);
let [_, user, repo] = args[0].match(regex) || [];
repo = repo.replace(/.git$/, '');
let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
await conn.sendFile(m.chat, url, filename, null, m, null, fake);
} catch (e) { 
m.reply(`\`\`\`⚠️ ${await tr("OCURRIO UN ERROR")} ⚠️\`\`\`\n\n> *${await tr("Reporta el siguiente error a mi creador con el comando:")}* #report\n\n>>> ${e} <<<< `)       
console.log(e);
handler.limit = 0; // ❌ No gasta diamante si el comando falla
} finally {
delete userRequests[m.sender];
}};
handler.help = ['gitclone <url>'];
handler.tags = ['downloader'];
handler.command = /gitclone|clonarepo|clonarrepo|repoclonar/i;
handler.register = true;
handler.limit = 2;
//handler.level = 2

export default handler;
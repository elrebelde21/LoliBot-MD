let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!m.quoted && !m.mentionedJid?.length && !args[0]) return m.reply(`⚠️ Responde al mensaje que quiere eliminar pelotudito.`) 
try {
if (m.quoted) {
let delet = m.quoted.sender;
let bang = m.quoted.id;
return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
}

let target = '';
if (m.mentionedJid?.length) {
target = m.mentionedJid[0];
} else if (args[0] && args[0].startsWith('+')) {
target = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
} else {
return m.reply(`⚠️ Mencionar a alguien o responder a un mensaje.`);
}

let chats = await conn.chats[m.chat]?.messages || [];
let messagesToDelete = Object.values(chats).filter(
msg => (msg.key.participant === target || msg.key.remoteJid === target));

if (!messagesToDelete.length) return 
let totalToDelete = Math.min(messagesToDelete.length, 200); // Máximo 200 mensajes
let deletedCount = 0;

for (let i = 0; i < totalToDelete; i++) {
let message = messagesToDelete[i];
try {
await conn.sendMessage(m.chat, { delete: message.key });
deletedCount++;
await delay(100); 
} catch (err) {
console.log(err);
}}
m.reply(`✅ Se eliminaron ${deletedCount} mensajes de ${target.includes('@s.whatsapp.net')}.`);
} catch (err) {
console.error(err);
}};
handler.help = ['delete *@user*'];
handler.tags = ['group'];
handler.command = /^del(ete)?$/i;
handler.group = true; 
handler.admin = true; 
handler.botAdmin = true; 
handler.register = true;

export default handler;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
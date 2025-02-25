let handler = async (m, { conn, command }) => {
if (!m.quoted) return m.reply(`⚠️ Responde a un mensaje para ${command === 'pin' ? 'fijarlo' : 'desfijarlo'}.`);
try {
let messageKey = {remoteJid: m.chat,
fromMe: m.quoted.fromMe,
id: m.quoted.id,
participant: m.quoted.sender
};

if (command === 'pin') {
await conn.sendMessage(m.chat, {pin: {type: 1, time: 604800, key: messageKey }});
m.react("✅️")
}
   
if (command === 'unpin') {
await conn.sendMessage(m.chat, { pin: { type: 0, key: messageKey }});
m.react("✅️")
}} catch (error) {
console.error(error);
}};
handler.help = ['pin']
handler.tags = ['group']
handler.command = ['pin', 'unpin'] 
handler.admin = true
handler.group = true
handler.botAdmin = true
handler.register = true 
export default handler

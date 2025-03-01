async function handler(m, { conn, usedPrefix, args }) {
if (!args[0]) return conn.sendMessage(m.chat, { text: `⚠️ Por favor, especifica el bot primario con una mención (@tag) o un número (wa.me/...).\nEjemplo: ${usedPrefix}setprimary @tag o ${usedPrefix}setprimary wa.me/123456789` }, { quoted: m });

const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
let botJid;
let selectedBot;
if (m.mentionedJid && m.mentionedJid.length > 0) {
botJid = m.mentionedJid[0]; 
selectedBot = users.find(conn => conn.user.jid === botJid);
} 
else {
botJid = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
selectedBot = users.find(conn => conn.user.jid === botJid);
}

if (!selectedBot) return conn.sendMessage(m.chat, { text: "⚠️ No se encontró un bot conectado con esa mención o número. Usa /listjadibot para ver los bots disponibles." }, { quoted: m });
let chat = global.db.data.chats[m.chat];
chat.primaryBot = botJid; 
await global.db.write(); 
const botName = selectedBot.user.name || botJid.split('@')[0];
conn.sendMessage(m.chat, { text: `✅ El bot *${botName}* ha sido establecido como primario en este grupo. Los demás bots no responderán aquí.` }, { quoted: m });
}
handler.help = ['setprimary <@tag>'];
handler.tags = ['jadibot'];
handler.command = ['setprimary'];
handler.group = true; 
handler.register = true;

export default handler;
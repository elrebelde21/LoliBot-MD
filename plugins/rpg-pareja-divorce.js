let handler = async (m, { conn, args, usedPrefix, command }) => {
const user = global.db.data.users[m.sender];
let targetUser = m.mentionedJid[0] || args[0]; 
if (!targetUser) return m.reply(await tr("⚠️ Debes etiquetar a la persona con la que deseas divorciarte."));
if (!user.marry || user.marry !== targetUser) return m.reply(await tr("⚠️ No estás casado con esta persona para poder divorciarte."));

global.db.data.users[user.marry] = global.db.data.users[user.marry] || {}; 
global.db.data.users[user.marry].marry = null;
global.db.data.users[m.sender].marry = null; 
conn.reply(m.chat, `@${m.sender.split('@')[0]} (${global.db.data.users[m.sender].name}) ${await tr("se Divorcio de")} @${targetUser.split('@')[0]} (${global.db.data.users[targetUser].name}) ${await tr("ahora están separados")} 🫣`, m, { mentions: [m.sender, targetUser] });
};
handler.help = ['divorce <@tag>'];
handler.tags = ['econ'];
handler.command = ['divorce'];
handler.register = true;

export default handler;

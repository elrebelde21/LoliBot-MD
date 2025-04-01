let handler = async (m, { conn, usedPrefix, text }) => {
const isSubBot = global.conns?.some(bot => bot.user.jid === m.sender);
const isMainBot = m.sender === global.conn.user.jid; 
if (!isSubBot && !isMainBot) return m.reply(await tr('⚠️ Este comando solo puede ser usado por el Bot Principal o un Sub-Bot.'));
const bot = isSubBot ? global.conns.find(bot => bot.user.jid === m.sender) : global.conn;
if (!bot) return m.reply(await tr('⚠️ No se pudo identificar el bot.'));
const botConfig = global.db.data.users[bot.user.jid] || {};
const [option, value] = text.split(' ');

if (!option || !value) {
return m.reply(await tr(`⚠️ Uso: *${usedPrefix}setconfig <opción> <valor>*
        
Opciones disponibles:
- *privacy*: 1 (activar) / 0 (desactivar)
- *prestar*: 1 (activar) / 0 (desactivar)`));
}

if (option === 'privacy') {
if (value === '1') {
botConfig.privacy = true;
await conn.sendMessage(m.chat, { text: await tr('✅ *Privacidad activada.*\n> Tu número no se mostrará en la lista de bots.') }, { quoted: m });
} else if (value === '0') {
botConfig.privacy = false;
await conn.sendMessage(m.chat, { text: await tr('✅ *Privacidad desactivada.*\n> Tu número se mostrará en la lista de bots.') }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { text: await tr('⚠️ Valor no válido. Usa: *1* (activar) o *0* (desactivar).') }, { quoted: m });
}} else if (option === 'prestar') {
if (value === '1') {
botConfig.prestar = true;
await conn.sendMessage(m.chat, { text: await tr('✅ *Prestar bot activado.*\n> Los usuarios pueden usar el bot para unirlo a grupos.') }, { quoted: m });
} else if (value === '0') {
botConfig.prestar = false;
await conn.sendMessage(m.chat, { text: await tr('✅ *Prestar bot desactivado.*\n> Los usuarios no podrán unir el bot a grupos.') }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { text: await tr('⚠️ Valor no válido. Usa: *1* (activar) o *0* (desactivar).') }, { quoted: m });
}} else {
return m.reply(await tr('⚠️ Opción no válida.'));
}
global.db.data.users[bot.user.jid] = botConfig;
};
handler.command = handler.help = ['setconfig'];
handler.tags = ['jadibot'];
handler.register = true;

export default handler;

const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw await tr(`⚠️ Ingrese el prefijo que quiera establecer, ejemplo: ${usedPrefix + command} #`)
const prefix = new RegExp('^[' + text.replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
const settings = global.db.data.settings[conn.user.jid] || {};
settings.prefix = text;
global.db.data.settings[conn.user.jid] = settings;
await m.reply(`✅ *${await tr("El prefijo actual del")} ${wm} ${await tr("Se estableció a")} :* [ ${text} ]`);
};
handler.help = ['setprefix'].map(v => v + ' [prefix]');
handler.tags = ['owner'];
handler.command = /^(setprefix)$/i;
handler.owner = true;

export default handler;
const handler = async (m, { conn, text, usedPrefix, command }) => {
const settings = global.db.data.settings[conn.user.jid] || {};
if (!('prefix' in settings)) settings.prefix = opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@'; 
const currentPrefix = settings.prefix || 'ninguno';
 
if (!text) return m.reply(await tr(`*⚠️ Ingrese el prefijo que quiera establecer, Ejemplo:*\n${usedPrefix + command} # _(para establecer un prefijo)_\n${usedPrefix + command} none _(para sin prefijo)_\n${usedPrefix + command} del [prefijo] _(para eliminar un prefijo)._\n\n> Prefijos actuales: [ ${currentPrefix} ]`))
const args = text.trim().split(' ');
const action = args[0].toLowerCase();

if (action === 'none') {
if (!settings.prefix) return await m.reply(await tr(`⚠️ *El bot ya está configurado sin prefijo.*`))
settings.prefix = null; // Sin prefijos
global.db.data.settings[conn.user.jid] = settings;
await m.reply(await tr(`*✅️ Todos los prefijos han sido eliminados. Los comandos ahora funcionarán sin prefijo.*`))
} else if (action === 'del') {
const prefixToDelete = args[1];
if (!prefixToDelete) throw await tr(`⚠️ Especifique el prefijo a eliminar. Ejemplo: ${usedPrefix + command} del /`)
if (!settings.prefix) return await m.reply(`⚠️ *No hay prefijos configurados para eliminar.*`);
if (!settings.prefix.includes(prefixToDelete)) return await m.reply(await tr(`⚠️ *El prefijo [ ${prefixToDelete} ] no está en la lista actual.*`))
settings.prefix = settings.prefix.replace(prefixToDelete, ''); 
if (settings.prefix === '') settings.prefix = null; 
global.db.data.settings[conn.user.jid] = settings;
const updatedPrefix = settings.prefix || 'ninguno';
await m.reply(await tr(`✅️ *El prefijo [ ${prefixToDelete} ] ha sido eliminado. Prefijos actuales: [ ${updatedPrefix} ]*`))
} else {
const newPrefix = text; 
if (settings.prefix === newPrefix) {
await m.reply(await tr(`⚠️ *Los prefijos [ ${newPrefix} ] ya están establecidos.*`))
return;
}
settings.prefix = newPrefix; 
global.db.data.settings[conn.user.jid] = settings;
await m.reply(`✅ *${await tr("El prefijo actual del")} ${wm} ${await tr("Se estableció a")} :* [ ${newPrefix} ]`);
}
};
handler.help = ['setprefix'].map(v => v + ' [prefix | none | del prefix]');
handler.tags = ['owner'];
handler.command = /^(setprefix)$/i;
handler.owner = true;

export default handler;
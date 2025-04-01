let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
let groupId = m.isGroup ? m.chat : null;

if (!m.isGroup && !isOwner) return m.reply(await tr('Solo el owner puede usar este comando en privado.'));
let identifier, action, target;
if (!m.isGroup && isOwner) {
if (args.length < 2) throw `⚠️ ${await tr("Formato incorrecto. Usa")}: !grupo [id/enlace] [ID/URL] - [acción] [+número si aplica]`

if (args[0].startsWith('id')) {
identifier = args[1];
action = args[2]?.replace('-', '').trim().toLowerCase();
target = args[3]?.replace('+', '') + '@s.whatsapp.net';
groupId = identifier;
} else if (args[0].match(/chat\.whatsapp\.com/)) {
identifier = args[0];
if (args[1] === '-') {
action = args[2]?.trim().toLowerCase();
target = args[3]?.replace('+', '') + '@s.whatsapp.net';
} else {
action = args[1]?.replace('-', '').trim().toLowerCase();
target = args[2]?.replace('+', '') + '@s.whatsapp.net';
}
const inviteCode = identifier.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1];
if (!inviteCode) throw `⚠️ ${await tr("Enlace inválido. Usa un enlace de WhatsApp válido.")}`
try {
const inviteInfo = await conn.groupGetInviteInfo(inviteCode);
groupId = inviteInfo.id;
} catch (e) {
throw `⚠️ ${await tr("No se pudo obtener información del grupo. Verifica el enlace o que el bot tenga acceso.")}`
}} else if (args[0] === 'enlace') {
identifier = args[1];
if (args[2] === '-') {
action = args[3]?.trim().toLowerCase();
target = args[4]?.replace('+', '') + '@s.whatsapp.net';
} else {
action = args[2]?.replace('-', '').trim().toLowerCase();
target = args[3]?.replace('+', '') + '@s.whatsapp.net';
}
if (!identifier.match(/chat\.whatsapp\.com/)) {
throw `⚠️ ${await tr("Debes proporcionar un enlace válido.")}`
}
const inviteCode = identifier.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1];
if (!inviteCode) throw `⚠️ ${await tr("Enlace inválido. Usa un enlace de WhatsApp válido.")}`
try {
const inviteInfo = await conn.groupGetInviteInfo(inviteCode);
groupId = inviteInfo.id;
} catch (e) {
throw `⚠️ ${await tr("No se pudo obtener información del grupo. Verifica el enlace o que el bot tenga acceso.")}`
}} else {
throw `⚠️ ${await tr(`Usa "id" o "enlace" como primer argumento, o pasa directamente un enlace válido.`)}`;
}} else if (m.isGroup) {
action = args[0]?.toLowerCase();
target = args[1]?.replace(/@/, '') + '@s.whatsapp.net';
}

if (!groupId) return m.reply(`⚠️ ${await tr("Debes estar en un grupo o especificar un ID/enlace en privado.")}`);
const botId = conn.user.jid;
const groupMetadata = await conn.groupMetadata(groupId);
const isBotAdmin = groupMetadata.participants.some(p => p.id === botId && (p.admin === 'admin' || p.admin === 'superadmin'));
if (!isBotAdmin) return m.reply(`⚠️ ${await tr("El bot debe ser admin para ejecutar este comando.")}`);
if (!action) throw `⚠️ ${await tr("Debes especificar una acción")} (abrir, cerrar, daradmin, etc.).`

switch (action) {
case 'abrir': case 'open': case 'abierto':
await conn.groupSettingUpdate(groupId, 'not_announcement');
m.reply(`🟢 ${await tr("¡GRUPO ABIERTO! Todos pueden escribir ahora.")}`);
break;

case 'cerrar': case 'close': case 'cerrado':
await conn.groupSettingUpdate(groupId, 'announcement');
m.reply(`⚠️ ${await tr("¡GRUPO CERRADO! Solo admins pueden escribir.")}`);
break;

case 'addadmin': case 'promote': case 'daradmin':
if (!target) throw `⚠️ ${await tr("Especifica un número")} (${await tr("ejemplo")}: - daradmin +51987654321) ${await tr("o menciona en grupo.")}`
await conn.groupParticipantsUpdate(groupId, [target], 'promote');
m.reply(`✅ @${target.split('@')[0]} ${await tr("ahora es admin.")}`);
break;

case 'removeadmin': case 'demote': case 'quitaradmin':
if (!target) throw `⚠️ ${await tr("Especifica un número")} (${await tr("ejemplo")} - quitaradmin +51987654321)  ${await tr("o menciona en grupo.")}`
await conn.groupParticipantsUpdate(groupId, [target], 'demote');
m.reply(`✅ @${target.split('@')[0]} ${await tr("ya no es admin.")}`);
break;

case 'kick': case 'eliminar':
if (!target) throw `⚠️ ${await tr("Especifica un número")} (${await tr("ejemplo")}: - eliminar +51987654321)  ${await tr("o menciona en grupo.")}.`
await conn.groupParticipantsUpdate(groupId, [target], 'remove');
m.reply(`🗑️ @${target.split('@')[0]} ${await tr("ha sido eliminado del grupo.")}`);
break;

case "aprobar":
if (!target) throw `⚠️ ${await tr("Especifica un número")} (${await tr("ejemplo")}: - aprobar +51987654321).`
await conn.groupRequestParticipantsUpdate(groupId, [target], 'approve');
m.reply(`@${target.split('@')[0]} ${await tr("usuario has sido aprobado el grupo.")}`);
break

default:
throw `*⚠️ ${await tr("COMANDO INVÁLIDO")}*\n\n*${await tr("En grupo")}:*\n${usedPrefix + command} abrir\n${usedPrefix + command} cerrar\n${usedPrefix + command} daradmin @usuario\n${usedPrefix + command} quitaradmin @usuario\n${usedPrefix + command} eliminar @usuario\n\n*${await tr("En privado (owner)")}:*\n${usedPrefix + command} id [ID] - abrir\n${usedPrefix + command} enlace [URL] - cerrar\n${usedPrefix + command} [URL] - cerrar\n${usedPrefix + command} id [ID] - daradmin +número`;
}
};
handler.help = ['group open/close', 'grupo abrir/cerrar', 'grupo aprobar +number'];
handler.tags = ['group'];
handler.command = /^(group|grupo)$/i;
handler.exp = 200;

export default handler;
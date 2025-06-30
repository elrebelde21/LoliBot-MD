const handler = async (m, { conn, args, participants, isAdmin, isGroup, command }) => {
const mentioned = m.mentionedJid?.[0];

if (!mentioned) {
try {
await m.db.query("UPDATE group_settings SET primary_bot = NULL WHERE group_id = $1", [m.chat]);
await m.reply("✅ El bot primario ha sido eliminado de este grupo. Ahora cualquier subbot puede responder.");
} catch (err) {
console.error(err);
}
return;
}

const botId = conn.user?.id.replace(/:\d+/, "");
const selectedId = mentioned.replace(/:\d+/, "").replace("@s.whatsapp.net", "");

if (selectedId !== botId) {
try {
await conn.sendMessage(m.chat, { text: `✅ El bot @${selectedId} ha sido establecido como *BOT PRINCIPAL* de este grupo.`, mentions: [mentioned]}, { quoted: m });
await m.db.query("UPDATE group_settings SET primary_bot = $1 WHERE group_id = $2", [mentioned, m.chat]);
} catch (err) {
console.error(err);
}} else {
await m.db.query("UPDATE group_settings SET primary_bot = $1 WHERE group_id = $2", [botId + "@s.whatsapp.net", m.chat]);
await m.reply("✅ Te has establecido como el bot principal de este grupo.");
}};
handler.help = ['setprimary'];
handler.tags = ['jadibot'];
handler.command = /^setprimary$/i;
handler.group = true;
handler.admin = true;

export default handler;

//Código elaborado por: https://github.com/elrebelde21

async function handler(m, { conn, args }) {
if (!m.db) return conn.sendMessage(m.chat, { text: '⚠️ Error: No se pudo conectar a la base de datos.' }, { quoted: m });
if (!m.mentionedJid || m.mentionedJid.length === 0 || args.length < 1) return conn.reply(m.chat, '⚠️ Formato incorrecto. Usa: /give @tag nombre_del_personaje', m);

const recipient = m.mentionedJid[0];
const characterName = args.slice(1).join(' ').trim();
if (!characterName) return conn.reply(m.chat, '⚠️ Por favor, especifica el nombre del personaje.', m);
if (recipient === m.sender) return conn.reply(m.chat, 'No puedes regalarte un personaje a ti mismo 😆.', m);
try {
const { rows } = await m.db.query('SELECT id, name, claimed_by FROM characters WHERE LOWER(name) = $1 AND claimed_by = $2', [characterName.toLowerCase(), m.sender]);
const character = rows[0];

if (!character) {
const { rows: exists } = await m.db.query('SELECT name FROM characters WHERE LOWER(name) = $1', [characterName.toLowerCase()]);
if (!exists[0]) return conn.reply(m.chat, `No se encontró el personaje "${characterName}".`, m);
return conn.reply(m.chat, `No eres el propietario de *${characterName}*. Solo el propietario puede regalarlo.`, m);
}

await m.db.query('UPDATE characters SET claimed_by = $1 WHERE id = $2', [recipient, character.id]);
return conn.reply(m.chat, `🎉 ¡Has regalado a *${character.name}* a @${recipient.split('@')[0]}!`, m, { mentions: [recipient] });
} catch (e) {
}}
handler.help = ['give @tag nombre_del_personaje'];
handler.tags = ['gacha'];
handler.command = ['give', 'regalar-personajes'];
handler.register = true;

export default handler;
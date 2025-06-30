import { db } from '../lib/postgres.js';

const maxwarn = 3;

let handler = async (m, { conn, text, args, usedPrefix, command, metadata }) => {
try {
let who;
if (m.isGroup) {
who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
} else {
who = m.chat;
}

if (!who) return m.reply(`*¿A quién le doy una advertencia?* Etiqueta a la persona con @tag o cita su mensaje.`)
const userResult = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [who]);
if (!userResult.rows.length) return m.reply(`*⚠️ ¿Quién carajo es ese?* No aparece en mi base de datos.`)

const name = (await conn.getName(m.sender)) || m.sender.split('@')[0];
let warn = userResult.rows[0].warn || 0;

if (warn < maxwarn) {
await db.query(`UPDATE usuarios
        SET warn = warn + 1
        WHERE id = $1`, [who]);
warn += 1;

let reason = text.trim() || 'No especificada';
await conn.reply(m.chat, `*⚠️ ADVERTENCIA ⚠️*\n\n@${who.split`@`[0]} fuiste advertido por el admin: ${name}\n*• Tiene:* ${warn}/${maxwarn} advertencias\n*• Razón:* ${reason}`, m)
} else if (warn >= maxwarn) {
await db.query(`UPDATE usuarios
        SET warn = 0
        WHERE id = $1`, [who]);
await conn.reply(m.chat, `⚠️ El usuario @${who.split`@`[0]} superó las *${maxwarn}* advertencias y será eliminado del grupo...`, m)
await delay(3000);
await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
}
} catch (err) {
console.error(err);
}};
handler.help = ['warn @user [razón]'];
handler.tags = ['group'];
handler.command = /^warn$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.register = true;

export default handler;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
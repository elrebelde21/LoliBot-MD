import { db } from '../lib/postgres.js';

let handler = async (m, { conn, args, usedPrefix, command, metadata }) => {
try {
let who;
if (m.isGroup) {
who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
} else {
who = m.chat;
}

if (!who) return m.reply(`*¿A quién le quito una advertencia?* Etiqueta a una persona con @tag o cita su mensaje, ¡no soy adivino! :)`)
const userResult = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [who]);
if (!userResult.rows.length) return m.reply(`*¿A quién le quito una advertencia?* Etiqueta a una persona con @tag o cita su mensaje, ¡no soy adivino! :)`)
let warn = userResult.rows[0].warn || 0;

if (warn > 0) {
await db.query(`UPDATE usuarios
        SET warn = warn - 1
        WHERE id = $1`, [who]);
warn -= 1; 
await conn.reply(m.chat, `*⚠️ SE QUITÓ UNA ADVERTENCIA ⚠️*\n\nUsuario: @${who.split`@`[0]}\n*• Advertencia:* -1\n*• Total:* ${warn}`, m)
} else {
await conn.reply(m.chat, `*⚠️ El usuario @${who.split`@`[0]} no tiene ninguna advertencia.*`, m)
}} catch (err) {
}};
handler.help = ['delwarn @user', 'unwarn @user'];
handler.tags = ['group'];
handler.command = /^(delwarn|unwarn)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.register = true;

export default handler;
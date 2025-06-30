import { db } from '../lib/postgres.js';

const maxwarn = 3
let handler = async (m, { conn, participants, metadata }) => {
try {
const result = await db.query(`SELECT id, warn
      FROM usuarios
      WHERE warn > 0`);
const warnedUsers = result.rows.filter(user => participants.some(p => p.id === user.id)).map(user => ({ id: user.id, warn: user.warn }));
warnedUsers.sort((a, b) => b.warn - a.warn);
let teks = `*📋 LISTA DE ADVERTENCIAS 📋*\n\n`;
teks += `Grupo: ${metadata.subject || 'Sin nombre'}\n`;
teks += `Total de usuarios con advertencias: ${warnedUsers.length}\n\n`;

if (warnedUsers.length === 0) {
teks += `*¡No hay usuarios con advertencias en este grupo! 😊*`;
} else {
teks += `*Usuarios advertidos:*\n`;
for (let user of warnedUsers) {
teks += `➥ @${user.id.split('@')[0]} - Advertencias: ${user.warn}/${maxwarn}\n`;
}}
await conn.reply(m.chat, teks, m)
} catch (err) {
console.error(err);
}};
handler.help = ['listwarn'];
handler.tags = ['group'];
handler.command = /^listwarn$/i;
handler.register = true;

export default handler;
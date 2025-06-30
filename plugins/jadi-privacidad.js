import { db } from '../lib/postgres.js'

let handler = async (m, { conn, command, args, usedPrefix }) => {
const val = args[0];
if (!['1', '0'].includes(val)) return m.reply(`Usa:\n${usedPrefix}${command} 1 (activar)\n${usedPrefix}${command} 0 (desactivar)`);

const id = conn.user?.id;
if (!id) return
const botId = id.replace(/:\d+/, '');
try {
if (/setprivacy|privacy/i.test(command)) {
const privacyVal = val === '1'; 
const res = await db.query(`INSERT INTO subbots (id, privacy)
        VALUES ($1, $2)
        ON CONFLICT (id) DO UPDATE SET privacy = $2 RETURNING privacy`, [botId, privacyVal]);
return m.reply(privacyVal ? '✅ *Privacidad activada.*\n> Tu número no se mostrará en la lista de bots.' : '✅ *Privacidad desactivada.*\n> Tu número se mostrará en la lista de bots.');
}

if (/setprestar|prestar/i.test(command)) {
const prestarVal = val === '1'; 
const res = await db.query(`INSERT INTO subbots (id, prestar)
        VALUES ($1, $2)
        ON CONFLICT (id) DO UPDATE SET prestar = $2 RETURNING prestar`, [botId, prestarVal]);
return m.reply(prestarVal ? '✅ *Prestar bot activado.*\n> Los usuarios pueden usar el bot para unirlo a grupos.' : '✅ *Prestar bot desactivado.*\n> Los usuarios no podrán unir el bot a grupos.');
}} catch (err) {
console.error(err);
}}
handler.help = ['setprivacy', 'setprestar']
handler.tags = ['jadibot']
handler.command = /^(privacy|prestar|setprestar|setprivacy)$/i
handler.owner = true
handler.register = true

export default handler
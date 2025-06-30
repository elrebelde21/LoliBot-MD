import { db } from "../lib/postgres.js";

const handler = async (m, { conn }) => {
const id = conn.user?.id;
if (!id) return m.reply("❌ No se pudo identificar este bot.");
const cleanId = id.replace(/:\d+/, '');

try {
const res = await db.query("SELECT * FROM subbots");
let mensaje = "📋 *Configuración de Bot/SubBot en la base de datos:*\n\n";

if (res.rows.length === 0) return m.reply("❌ La tabla subbots está vacía, no hay nada pa’ mostrar.");

for (const row of res.rows) {
mensaje += `ID: ${row.id} (${row.tipo || 'Desconocido'})\n`;
mensaje += `Modo: ${row.mode || 'Public'}\n`;
mensaje += `Nombre: ${row.name || 'por defecto'}\n`;
mensaje += `Prefijos: ${row.prefix ? row.prefix.join(', ') : 'por defecto [/,.,#]'}\n`;
mensaje += `Owners: ${row.owners && row.owners.length ? row.owners.join(', ') : 'Por defecto'}\n`;
mensaje += `Anti-Private: ${row.anti_private ? 'Sí' : 'No'}\n`;
mensaje += `Anti-Call: ${row.anti_call ? 'Sí' : 'No'}\n`;
mensaje += `Privacidad num?: ${row.privacy ? 'Sí' : 'No'}\n`;
mensaje += `Prestar bot?: ${row.prestar ? 'Sí' : 'No'}\n`;
mensaje += `Logo URL: ${row.logo_url || 'no hay (usar por defecto)'}\n`;
mensaje += `-------------------------------\n`;
}
m.reply(mensaje.trim());
} catch (err) {
console.error("❌ Error al consultar subbots:", err);
m.reply("❌ Error al leer la tabla subbots, reporta esta mierda.");
}};
handler.help = ['testsubbots'];
handler.tags = ['owner'];
handler.command = /^testsubbots$/i;
handler.register = true
handler.owner = true;

export default handler;
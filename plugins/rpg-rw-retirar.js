let handler = async (m, { conn, text }) => {
if (!m.db) return 
const characterName = text.trim().toLowerCase();
if (!characterName) return conn.reply(m.chat, '⚠️ Por favor, especifica el nombre del personaje a retirar.', m);
try {
const { rows } = await m.db.query('SELECT * FROM characters WHERE LOWER(name) = $1 AND seller = $2 AND for_sale = true', [characterName, m.sender]);
const characterToRemove = rows[0];

if (!characterToRemove) {
const { rows: exists } = await m.db.query('SELECT * FROM characters WHERE LOWER(name) = $1', [characterName]);
if (!exists[0]) return conn.reply(m.chat, `❌ No se encontró ningún personaje con el nombre: *${characterName}*.`, m);
if (exists[0].seller !== m.sender) return conn.reply(m.chat, `❌ No puedes retirar este personaje porque no eres el vendedor.`, m);
return conn.reply(m.chat, `❌ El personaje *${characterName}* no está actualmente a la venta.`, m);
}

await m.db.query('UPDATE characters SET for_sale = false, seller = null, last_removed_time = $1 WHERE id = $2', [Date.now(), characterToRemove.id]);
return conn.reply(m.chat, `✅ Has retirado el personaje *${characterToRemove.name}* del mercado.`, m);
} catch (e) {
console.error(e);
return conn.reply(m.chat, '⚠️ Error al retirar el personaje. Intenta de nuevo.', m);
}};
handler.help = ['rw-retirar'];
handler.tags = ['gacha'];
handler.command = ['rw-retirar'];
handler.register = true;

export default handler;
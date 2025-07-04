import { db } from '../lib/postgres.js';

let handler = async (m, { conn }) => {
  try {
    const [
      usuarios,
      registrados,
      chats,
      grupos,
      mensajes,
      tablasRes,
      totalSize
    ] = await Promise.all([
      db.query('SELECT COUNT(*) FROM usuarios'),
      db.query('SELECT COUNT(*) FROM usuarios WHERE registered = true'),
      db.query('SELECT COUNT(*) FROM chats'),
      db.query("SELECT COUNT(*) FROM group_settings WHERE welcome IS NOT NULL"),
      db.query('SELECT SUM(message_count) FROM messages'),
      db.query(`
        SELECT relname AS tabla,
               n_live_tup AS filas,
               pg_size_pretty(pg_total_relation_size(relid)) AS tamaño
        FROM pg_stat_user_tables
        ORDER BY pg_total_relation_size(relid) DESC;
      `),
      db.query(`
        SELECT pg_size_pretty(SUM(pg_total_relation_size(relid))) AS total
        FROM pg_stat_user_tables;
      `)
    ]);

    const totalUsers = usuarios.rows[0].count;
    const totalRegistrados = registrados.rows[0].count;
    const totalChats = chats.rows[0].count;
    const totalGroups = grupos.rows[0].count;
    const totalMessages = mensajes.rows[0].sum || 0;
    const totalDBSize = totalSize.rows[0].total;

    let text = `📊 *\`ESTADÍSTICAS DE BASE DE DATOS\`*\n`;
    text += `> 👤 Usuarios: *${totalUsers}*\n`;
    text += `> ✅ Registrados: *${totalRegistrados}*\n`;
    text += `> 💬 Chats totales: *${totalChats}*\n`;
    text += `> 💾 Tamaño total DB: *${totalDBSize}*\n\n`;

    text += `📁 *\`TAMAÑO POR TABLA:\`*\n`;
    for (const row of tablasRes.rows) {
      text += `• *${row.tabla}*: ${row.filas} filas — ${row.tamaño}\n`;
    }

    await m.reply(text);
  } catch (err) {
    console.error("❌ Error en /db info:", err);
    await m.reply('❌ Error al consultar la base de datos.');
  }
};

handler.help = ['db info'];
handler.tags = ['owner'];
handler.command = /^\/?db(info)?$/i;
handler.rowner = true;

export default handler;

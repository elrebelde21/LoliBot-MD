import { db } from "../lib/postgres.js";

const handler = async (m, { conn, args }) => {
  const id = conn.user?.id;
  if (!id) return m.reply("❌ No se pudo identificar este bot.");
  const cleanId = id.replace(/:\d+/, '');

  try {
    const tipoFiltro = args[0] === '1' ? 'oficial' : args[0] === '2' ? 'subbot' : null;
    const [res, conteo] = await Promise.all([
      db.query(`SELECT * FROM subbots${tipoFiltro ? ` WHERE tipo = '${tipoFiltro}'` : ''}`),
      tipoFiltro ? null : db.query(`SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE tipo = 'oficial') AS oficiales,
        COUNT(*) FILTER (WHERE tipo = 'subbot') AS subbots
      FROM subbots`)
    ]);

    if (res.rows.length === 0) {
      return m.reply(tipoFiltro
        ? `❌ No hay ningún bot del tipo *${tipoFiltro}* en la base de datos.`
        : "❌ La tabla subbots está vacía, no hay nada pa’ mostrar.");
    }

    let mensaje = `📋 *Bots ${tipoFiltro ? ` (${tipoFiltro})` : ''}:*\n`;

    if (!tipoFiltro && conteo) {
      const { total, oficiales, subbots } = conteo.rows[0];
      mensaje += `*• Principales:* ${oficiales}\n`;
      mensaje += `*• Subbots:* ${subbots}\n\n`;
     mensaje += `\`🤖 CONFIGURACIÓNES :\`\n`;
    }
    
    for (const row of res.rows) {
      mensaje += `- ID: ${row.id} (${row.tipo || 'Desconocido'})\n`;
      mensaje += `- Modo: ${row.mode || 'Public'}\n`;
      mensaje += `- Nombre: ${row.name || 'por defecto'}\n`;
      mensaje += `- Prefijos: ${row.prefix ? row.prefix.join(', ') : '[/,.,#]'}\n`;
      mensaje += `- Owners: ${row.owners?.length ? row.owners.join(', ') : 'Por defecto'}\n`;
      mensaje += `- Anti-Private: ${row.anti_private ? 'Sí' : 'No'}\n`;
      mensaje += `- Anti-Call: ${row.anti_call ? 'Sí' : 'No'}\n`;
      mensaje += `- Privacidad número: ${row.privacy ? 'Sí' : 'No'}\n`;
      mensaje += `- Prestar bot: ${row.prestar ? 'Sí' : 'No'}\n`;
      mensaje += `- Logo: ${row.logo_url || 'Ninguno'}\n`;
      mensaje += `\n─────────────\n\n`;
    }

    m.reply(mensaje.trim());

  } catch (err) {
    console.error("❌ Error al consultar subbots:", err);
    m.reply("❌ Error al leer la tabla subbots, reporta esta mierda.");
  }
};

handler.help = ['testsubbots [opcional: 1|2]'];
handler.tags = ['owner'];
handler.command = /^testsubbots$/i;
handler.register = true;
handler.owner = true;

export default handler;

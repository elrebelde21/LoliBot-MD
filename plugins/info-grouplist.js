import { db } from '../lib/postgres.js';

const handler = async (m, { conn }) => {
  const botId = (conn.user?.id || '').split(':')[0].replace(/[^0-9]/g, '');
  let txt = '';

  try {
    const res = await db.query(
      `SELECT id FROM chats WHERE is_group = true AND joined = true AND bot_id = $1`,
      [botId]
    );
    const grupos = res.rows;
    if (grupos.length === 0)
      return m.reply('❌ Este bot no está unido a ningún grupo.');

    for (let i = 0; i < grupos.length; i++) {
      const jid = grupos[i].id;
      const metadata = await conn.groupMetadata(jid).catch(() => null);
      if (!metadata) continue;

      // Detectar número del bot
      const botNumber = (conn.user?.id || '').split(':')[0].replace(/[^0-9]/g, '');

      // Buscar coincidencia tanto por @lid como por @s.whatsapp.net
      const bot = metadata.participants.find(
        (u) =>
          u.id?.includes(botNumber) ||
          u.phoneNumber?.includes(botNumber)
      ) || {};

      const isBotAdmin = bot?.admin === 'admin' || bot?.admin === 'superadmin';
      const isParticipant = Boolean(bot?.id);
      const participantStatus = isParticipant
        ? '✅ *Estoy aquí*'
        : '❌ *No estoy aquí*';

      let link = '❌ No soy admin';
      if (isBotAdmin) {
        const code = await conn.groupInviteCode(jid).catch(() => null);
        if (code) link = `https://chat.whatsapp.com/${code}`;
        else link = '⚠️ Error al generar link';
      }

      txt += `${i + 1}. ${metadata.subject || 'Sin nombre'} | ${participantStatus}
- *ID:* ${jid}
- *Admin:* ${isBotAdmin ? 'Sí' : 'No'}
- *Participantes:* ${metadata.participants.length}
- *Link:* ${link}

━━━━━━━━━━━━━━━

`;
    }

    m.reply(
      `_*\`ESTÁ EN ESTOS GRUPOS:\`*_\n> *• Total grupo:* ${grupos.length}\n\n${txt}`.trim()
    );
  } catch (err) {
    console.error(err);
  }
};

handler.help = ['groups', 'grouplist'];
handler.tags = ['main'];
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos|listadegrupos|grupolista|listagrupo)$/i;
handler.register = true;

export default handler;

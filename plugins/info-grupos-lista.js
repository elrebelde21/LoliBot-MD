const handler = async (m, { conn }) => {
  let txt = '';
try {    
  const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
  const totalGroups = groups.length;
  for (let i = 0; i < groups.length; i++) {
    const [jid, chat] = groups[i];
    const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
    const participants = groupMetadata.participants || [];
    const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
    const isBotAdmin = bot?.admin || false;
    const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
    const participantStatus = isParticipant ? '✅ *𝘌𝘴𝘵𝘰𝘺 𝘢𝘲𝘶𝘪*' : '❌ *𝘕𝘰 𝘦𝘴𝘵𝘰𝘺 𝘢𝘲𝘶𝘪*';
    const totalParticipants = participants.length;
    txt += `> • ${i + 1} ${await conn.getName(jid)} | ${participantStatus}
   > *• ID:* ${jid}
   > *• Admin:* ${isBotAdmin ? 'Sii' : 'Noo'}
   > *• Participantes:* ${totalParticipants}
   > *• Link:* ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || '𝘌𝘙𝘙𝘖𝘙'}` : '𝘕𝘖 𝘚𝘖𝘠 𝘈𝘋𝘔𝘐𝘕'}\n\n> ━━━━━━━━━━━━━━━━━━━\n\n`;
  }
m.reply(`${wm} ${lenguajeGB.smsLisA()}
${lenguajeGB.smsLisB()} ${totalGroups}\n\n${txt}`.trim());
} catch {
  const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
  const totalGroups = groups.length;
  for (let i = 0; i < groups.length; i++) {
    const [jid, chat] = groups[i];
    const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
    const participants = groupMetadata.participants || [];
    const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
    const isBotAdmin = bot?.admin || false;
    const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
    const participantStatus = isParticipant ? '✅ *𝘌𝘴𝘵𝘰𝘺 𝘢𝘲𝘶𝘪*' : '❌ *𝘕𝘰 𝘦𝘴𝘵𝘰𝘺 𝘢𝘲𝘶𝘪*';
    const totalParticipants = participants.length;    
    txt += `> ${i + 1} ${await conn.getName(jid)} | ${participantStatus}
   > *• ID:* ${jid}
   > *• Admin:* ${isBotAdmin ? 'Sii' : 'Noo'}
   > *• Participantes:* ${totalParticipants}
   > *• Link:* ${isBotAdmin ? '𝘌𝘙𝘙𝘖𝘙' : '𝘕𝘖 𝘚𝘖𝘠 𝘈𝘋𝘔𝘐𝘕'}\n\n> ━━━━━━━━━━━━━━━━━━━\n\n`;
  }
  m.reply(`${wm} ${lenguajeGB.smsLisA()}
${lenguajeGB.smsLisB()} ${totalGroups}\n\n${txt}`.trim());
 }    
};
handler.help = ['groups', 'grouplist']
handler.tags = ['info']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos|listadegrupos|grupolista|listagrupo)$/i
handler.register = true
export default handler

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
const participantStatus = isParticipant ? await tr('✅ *Estoy aqui*') : await tr('❌ *No estoy aqui*')
const totalParticipants = participants.length;
txt += `> • ${i + 1} ${await conn.getName(jid)} | ${participantStatus}
   > *• ID:* ${jid}
   > *• ${await tr("Admin")}:* ${isBotAdmin ? 'Yes' : 'Noo'}
   > *• ${await tr("Participantes")}:* ${totalParticipants}
   > *• ${await tr("Enlace")}:* ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || await tr('Error')}` : await tr('No soy admin')}\n\n> ━━━━━━━━━━━━━━━━━━━\n\n`;
}
m.reply(`_*${await tr("ESTÁ EN ESTOS GRUPOS")}:*_\n*• ${await tr("Total grupo")}:* ${totalGroups}\n\n${txt}`.trim());
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
const participantStatus = isParticipant ? await tr('✅ *Estoy aqui*') : await tr('❌ *No estoy aqui*')
const totalParticipants = participants.length;    
txt += `> ${i + 1} ${await conn.getName(jid)} | ${participantStatus}
   > *• ID:* ${jid}
   > *• ${await tr("Admin")}:* ${isBotAdmin ? 'yes' : 'Noo'}
   > *• ${await tr("Participantes")}:* ${totalParticipants}
   > *• ${await tr("Enlace")}:* ${isBotAdmin ? await tr('Error') : await tr('No soy admin')}\n\n> ━━━━━━━━━━━━━━━━━━━\n\n`;
}
m.reply(`${wm} _*${await tr("ESTÁ EN ESTOS GRUPOS")}:*_\n*• ${await tr("Total grupo")}:* ${totalGroups}\n\n${txt}`.trim());
}};
handler.help = ['groups', 'grouplist']
handler.tags = ['main']
handler.command = /^(groups|grouplist|listadegrupo|gruposlista|listagrupos|listadegrupos|grupolista|listagrupo)$/i
handler.register = true
export default handler

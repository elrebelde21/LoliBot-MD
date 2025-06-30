import { db } from '../lib/postgres.js';

const linkRegex = /https?:\/\/\S+/i;

export async function before(m, { conn }) {
if (!m.isGroup || !m.originalText) return; 
const userTag = `@${m.sender.split('@')[0]}`;
const bang = m.key.id;
const delet = m.key.participant || m.sender;

try {
const res = await db.query('SELECT antilink2 FROM group_settings WHERE group_id = $1', [m.chat]);
const config = res.rows[0];
if (!config || !config.antilink2) return;
} catch (e) {
console.error(e);
return;
}

const isLinkDetected = linkRegex.test(m.originalText);
if (!isLinkDetected) return;
const metadata = await conn.groupMetadata(m.chat);
const botId = conn.user?.id?.replace(/:\d+@/, "@");
const isBotAdmin = metadata.participants.some(p => p.id === botId && p.admin);
const isSenderAdmin = metadata.participants.some(p => p.id === m.sender && p.admin);

if (isSenderAdmin || m.fromMe) return;
if (!isBotAdmin) {
return await conn.sendMessage(m.chat, { text: `*「 ANTILINK DETECTADO 」*\n\n${userTag}, enviaste un link pero no puedo eliminarte porque no soy admin.`, mentions: [m.sender] }, { quoted: m });
}

await conn.sendMessage(m.chat, { text: `*「 ANTILINK DETECTADO 」*\n\n${userTag}, rompiste las reglas del grupo y serás eliminado.`, mentions: [m.sender] }, { quoted: m });
try {
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
} catch (err) {
console.error(err);
}
}

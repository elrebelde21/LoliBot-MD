let linkRegex1 = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})|5chat-whatzapp\.vercel\.app/i;
let linkRegex2 = /whatsapp.com\/channel\/([0-9A-Za-z]{20,24})/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
if (!m.isGroup) return;
let botsEnGrupo = participants.filter(p => p.id.endsWith('@s.whatsapp.net') && p.admin);
let esBotAdmin = botsEnGrupo.some(b => b.id === conn.user.jid);
if (botsEnGrupo.length > 1 && !esBotAdmin) return;
let chat = global.db.data.chats[m.chat];
let delet = m.key.participant;
let bang = m.key.id;
const user = `@${m.sender.split`@`[0]}`;
const groupAdmins = participants.filter(p => p.admin);
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');
let bot = global.db.data.settings[conn.user.jid] || {};
const isGroupLink = linkRegex1.exec(m.text) || linkRegex2.exec(m.text);
const grupo = `https://chat.whatsapp.com`;

if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply('*El AntiLink está activo, pero te salvaste porque eres admin 😎!*');
if (chat.antiLink && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`;
if (m.text.includes(linkThisGroup)) return !0;
}
conn.sendMessage(m.chat, { text: `*「 ANTILINK DETECTADO 」*\n\n${user} 🤨 Rompiste las reglas del Grupo sera eliminado....`, mentions: [m.sender] }, { quoted: m });
if (!isBotAdmin) return conn.sendMessage(m.chat, { text: `*Te salvarte gil, no soy admin no te puedo eliminar*`, mentions: [...groupAdmins.map(v => v.id)] }, { quoted: m });

if (isBotAdmin) {
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
if (responseb[0]?.status === "404") return;
}} else if (!bot.restrict) {
return 
}
return !0;
}

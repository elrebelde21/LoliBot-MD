let areJidsSameUser = (await import(global.baileys)).default;

let handler = async (m, { conn, text, participants, args, command }) => {
let member = participants.map(u => u.id);
let sum = text ? parseInt(text) : member.length;
let total = 0;
let sider = [];
for (let i = 0; i < sum; i++) {
let user = member[i];
let userData = global.db.data.users[user] || {};
if ((typeof userData.mensaje === 'undefined' || userData.mensaje[m.chat] === 0) && !participants[i].isAdmin && !participants[i].isSuperAdmin) {
if (userData.whitelist !== true) {
total++;
sider.push(user);
}}}
const delay = time => new Promise(res => setTimeout(res, time));

switch (command) {
case "fantasmas":
if (total == 0) return conn.reply(m.chat, `⚠️ ${await tr("Este grupo es activo no tiene fantasmas")} :D`, m);
m.reply(`⚠️ ${await tr("REVISION DE INACTIVO")} ⚠️\n\n${await tr("Grupo")}: ${await conn.getName(m.chat)}\n*${await tr("Miembros del grupo")}:* ${sum}\n*${await tr("Miembros inactivos")}:* ${total}\n\n*[ 👻 ${await tr("LISTAS DE FANTASMAS")} 👻 ]*\n${sider.map(v => '  👉🏻 @' + v.replace(/@.+/, '')).join('\n')}\n\n*${await tr("NOTA: Esto puede no ser %100 acertado el bot inicia el conteo de mensajes apartir de que se activo en este número")}*`, null, { mentions: sider });
break;
case "kickfantasmas":
if (total == 0) return conn.reply(m.chat, `⚠️ ${await tr("Este grupo es activo no tiene fantasmas")} :D`, m);
await m.reply(`⚠️ ${await tr("ELIMINACIÓN DE INACTIVOS")} ⚠️\n\n${await tr("Grupo")}: ${await conn.getName(m.chat)}\n*${await tr("Miembros del grupo")}:* ${sum}\n*${await tr("Miembros inactivos*")}:* ${total}\n\n[ 👻 ${await tr("FANTASMAS ELIMINADO")} 👻 ]\n${sider.map(v => '@' + v.replace(/@.+/, '')).join('\n')}\n\n*${await tr("NOTA: Esto puede no ser %100 acertado el bot inicia el conteo de mensajes apartir de que se activo en este número")}*`, null, { mentions: sider });
await delay(1 * 10000);
let chat = global.db.data.chats[m.chat];
chat.welcome = false;
try {
let users = m.mentionedJid.filter(u => !areJidsSameUser(u, conn.user.id));
let kickedGhost = sider.map(v => v.id).filter(v => v !== conn.user.jid);
for (let user of users) {
if (user.endsWith('@s.whatsapp.net') && !(participants.find(v => areJidsSameUser(v.id, user)) || { admin: true }).admin) {
let res = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
kickedGhost.concat(res);
await delay(1 * 10000);
}}} finally {
chat.welcome = true;
}
break;
}};
handler.command = /^(fantasmas|kickfantasmas)$/i;
handler.group = handler.botAdmin = handler.admin = true;
handler.fail = null;
handler.register = true;
export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
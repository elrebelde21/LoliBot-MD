import { db } from "../lib/postgres.js";

const handler = async (m, { conn, command, isOwner }) => {
let txt = "";

if (command === "listablock") {
try {
const blocklist = await conn.fetchBlocklist() || [];
txt += `📛 *LISTA DE BLOQUEADOS*\n\n*Total:* ${blocklist.length}\n\n╭━━━[ *${info.vs} 𓃠* ]━━━⬣\n`;
if (blocklist.length) {
for (let jid of blocklist) {
txt += `┃🚫 @${jid.split("@")[0]}\n`;
}} else {
txt += "┃✅ No hay usuarios bloqueados actualmente.\n";
}
txt += `╰━━━━━━━⬣\n\n*Por favor no llame para evitar ser Bloqueado, Gracias.*`
} catch (e) {
txt += "❌ Error al obtener la lista de bloqueados.\n";
}
return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
}

if (command === "listaban") {
try {
const res = await db.query("SELECT id, razon_ban, avisos_ban FROM usuarios WHERE banned = true");
txt += `💀 *LISTA DE BANEADOS DEL BOT*\n\n*Total:* ${res.rowCount}\n`;
if (res.rows.length) {
for (const user of res.rows) {
let razon = user.razon_ban ? `\n┃📌 *Razón:* ${user.razon_ban}` : "";
let adv = user.avisos_ban ? ` | *Avisos:* ${user.avisos_ban}/3` : "";
txt += `┃🚫 @${user.id.split("@")[0]}${razon}\n`;
}} else {
txt += "┃✅ No hay usuarios baneados actualmente.\n";
}
txt += "╰━━━━━━━━━━⬣\n";
} catch (e) {
txt += "❌ Error al obtener la lista de baneados.\n";
}
return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
}

if (command === "listaadv") {
try {
const res = await db.query("SELECT id, warn FROM usuarios WHERE warn > 0");
txt += `⚠️ *USUARIOS ADVERTIDOS / WARNED*\n\n*Total:* ${res.rowCount}\n`;
if (res.rows.length) {
let i = 1;
for (const user of res.rows) {
txt += `┃ *${i}.* @${user.id.split("@")[0]} *(Warn: ${user.warn}/4)*\n`;
i++;
}} else {
txt += "┃✅ No hay usuarios advertidos actualmente.\n";
}
txt += "╰━━━━━━━━━━⬣\n";
} catch (e) {
txt += "❌ Error al obtener la lista de advertidos.\n";
}
return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
}};
handler.help = ["listablock", "listaban", "listaadv"];
handler.tags = ["owner"];
handler.command = /^listablock|listaban|listaadv$/i;
handler.owner = true;

export default handler;

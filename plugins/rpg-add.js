let handler = async (m, { conn, command, text }) => {

if (command == 'añadirdiamantes' || command == 'dardiamantes' || command == 'addlimit') {
const pajak = 0;
let who;
if (m.isGroup) who = m.mentionedJid[0];
else who = m.chat;
if (!who) return m.reply(await tr(`⚠️ etiqueta a una persona con el @tag`)) 
const txt = text.replace('@' + who.split`@`[0], '').trim();
if (!txt) return m.reply(await tr(`⚠️ Ingresa la cantidad que desea agregar`))   
if (isNaN(txt)) return m.reply(await tr(`⚠️ Falta el Num`))
const dmt = parseInt(txt);
let limit = dmt;
const pjk = Math.ceil(dmt * pajak);
limit += pjk; 
if (limit < 1) return 
const users = global.db.data.users;
users[who].limit += dmt;
m.reply(`*≡ 💎 ${await tr("SE AGREGADO")}:*
┏╍╍╍╍╍╍╍╍╍╍╍╍╍
┃• *${await tr("Total")}:* ${dmt}
┗╍╍╍╍╍╍╍╍╍╍╍╍╍`)}

if (command == 'añadirxp' || command == 'addexp' || command == 'addxp') {
const pajak = 0;
let who;
if (m.isGroup) who = m.mentionedJid[0];
else who = m.chat;
if (!who) return m.reply(await tr(`⚠️ etiqueta a una persona con el @tag`)) 
const txt = text.replace('@' + who.split`@`[0], '').trim();
if (!txt) return m.reply(await tr(`⚠️ Ingresa la cantidad que desea agregar`))   
if (isNaN(txt)) return m.reply(await tr(`⚠️ Falta el Num`))
const xp = parseInt(txt);
let exp = xp;
const pjk = Math.ceil(xp * pajak);
exp += pjk;
if (exp < 1) return 
const users = global.db.data.users;
users[who].exp += xp;
m.reply(`*≡ ${await tr("EXP AGREGADO")}:*
┏╍╍╍╍╍╍╍╍╍╍╍╍╍
┃• *${await tr("Total")}:* ${xp}
┗╍╍╍╍╍╍╍╍╍╍╍╍╍`)
}}
handler.help = ['addexp', 'addlimit']
handler.tags = ['owner']
handler.command = /^(añadirdiamantes|dardiamantes|addlimit|añadirxp|addexp|addxp)$/i
handler.owner = true
handler.register = true 
export default handler


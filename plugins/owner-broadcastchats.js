import fs from 'fs';
const handler = async (m, {conn, text} ) => {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
if (!text) throw await tr('*⚠️ Ingrese el mensaje que quiere tramite*')
const cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
const teks = text ? text : cc.text;
for (const i of chats) {
await delay(500);
conn.sendMessage(i, { text: await tr(`✅ *COMUNICADO OFICIAL* ✅\n\n`) + teks, mentions: [m.sender], mentions: (await conn.groupMetadata(id)).participants.map(v => v.id) }, { quoted: fkontak })}
m.reply(await tr(`*✅ Mensaje enviado a ${chats.length} Chats Privados*\n\n*NOTA:* Es posible que tenga fallos este comando y no se envie a todos los chats, disculpe por el momento*`))};
handler.help = ['broadcastchats', 'bcchats'].map((v) => v + ' <teks>');
handler.tags = ['owner'];
handler.command = /^(broadcastchats?|bcc(hats?)?)$/i;
handler.owner = true;
export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));
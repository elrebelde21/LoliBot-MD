import fs from 'fs';
const handler = async (m, {conn, text} ) => {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
if (!text) throw '*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐞𝐥 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐪𝐮𝐞 𝐪𝐮𝐢𝐞𝐫𝐞 𝐭𝐫𝐚𝐦𝐢𝐭𝐞*'
const cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
const teks = text ? text : cc.text;
for (const i of chats) {
await delay(500);
conn.sendMessage(i, { text: `✅ *COMUNICADO OFICIAL* ✅\n\n` + teks, mentions: [m.sender], mentions: (await conn.groupMetadata(id)).participants.map(v => v.id) }, { quoted: fkontak })}
m.reply(`*[❗𝐈𝐍𝐅𝐎❗] 𝙼𝙴𝙽𝚂𝙰𝙹𝙴 𝙴𝙽𝚅𝙸𝙰𝙳𝙾 𝙰 ${chats.length} 𝙲𝙷𝙰𝚃𝚂 𝙿𝚁𝙸𝚅𝙰𝙳𝙾𝚂*\n\n*𝐍𝐎𝐓𝐀: 𝙴𝚂 𝙿𝙾𝚂𝙸𝙱𝙻𝙴 𝚀𝚄𝙴 𝚃𝙴𝙽𝙶𝙰 𝙵𝙰𝙻𝙻𝙾𝚂 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝚈 𝙽𝙾 𝚂𝙴 𝙴𝙽𝚅𝙸𝙴 𝙰 𝚃𝙾𝙳𝙾𝚂 𝙻𝙾𝚂 𝙲𝙷𝙰𝚃𝚂, 𝙳𝙸𝚂𝙲𝚄𝙻𝙿𝙴 𝙿𝙾𝚁 𝙴𝙻 𝙼𝙾𝙼𝙴𝙽𝚃𝙾*`)};
handler.help = ['broadcastchats', 'bcchats'].map((v) => v + ' <teks>');
handler.tags = ['owner'];
handler.command = /^(broadcastchats?|bcc(hats?)?)$/i;
handler.rowner = true;
export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));
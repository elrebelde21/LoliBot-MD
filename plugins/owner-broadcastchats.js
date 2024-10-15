import fs from 'fs';
const handler = async (m, {conn, text} ) => {
const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
if (!text) throw '*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐞𝐥 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐪𝐮𝐞 𝐪𝐮𝐢𝐞𝐫𝐞 𝐭𝐫𝐚𝐦𝐢𝐭𝐞*'
const cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
const teks = text ? text : cc.text;
for (const i of chats) {
await delay(500);
conn.sendMessage(i, { text: `✅ *COMUNICADO OFICIAL* ✅\n\n` + teks, mentions: [m.sender], mentions: (await conn.groupMetadata(id)).participants.map(v => v.id) }, { quoted: fkontak })}
m.reply(`*✅ ᴍᴇɴsᴀɴᴇ ᴇɴᴠɪᴀᴅᴏ ᴀ ${chats.length} ᴄʜᴀᴛs ᴘʀɪᴠᴀᴅᴏs*\n\n*𝐍𝐎𝐓𝐀: ᴇs ᴘᴏsɪʙʟᴇ ǫᴜᴇ ᴛᴇɴɢᴀ ғᴀʟʟᴏs ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ʏ ɴᴏ sᴇ ᴇɴᴠɪᴇ ᴀ ᴛᴏᴅᴏs ʟᴏs ᴄʜᴀᴛs, ᴅɪsᴄᴜʟᴘᴇɴ ᴘᴏʀ ᴇʟ ᴍᴏᴍᴇɴᴛᴏ*`)};
handler.help = ['broadcastchats', 'bcchats'].map((v) => v + ' <teks>');
handler.tags = ['owner'];
handler.command = /^(broadcastchats?|bcc(hats?)?)$/i;
handler.rowner = true;
export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));
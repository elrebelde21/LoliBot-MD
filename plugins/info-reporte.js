//Código elaborado por: https://github.com/elrebelde21 

const OWNER1 = "5214774444444@s.whatsapp.net";
const ACTIVE_CONVERSATIONS = {};

let handler = async (m, { conn, text, command }) => {
let activeConversation = Object.entries(ACTIVE_CONVERSATIONS).find(([id, convo]) => convo.active && convo.userId === m.sender && convo.chatId === m.chat);

if (activeConversation) {
let [reportId, conversation] = activeConversation;

await conn.sendMessage(OWNER1, {text: `📩 *Mensaje del usuario @${m.sender.split("@")[0]} (ID: ${reportId}):*\n${text}`, mentions: [m.sender]}, { quoted: m });
return; 
}

if (command === 'report' || command === 'reporte') {
if (!text && !m.quoted) return m.reply(`⚠️ 𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐞𝐥 𝐞𝐫𝐫𝐨𝐫/𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐜𝐨𝐧 𝐟𝐚𝐥𝐥𝐚\n\n*𝐄𝐣:* ${usedPrefix + command} los sticker no funka`);
if (text.length < 8) throw `${fg} ✨ *𝑴𝒊́𝒏𝒊𝒎𝒐 10 𝒄𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆...*`
if (text.length > 1000) throw `${fg} ⚠️ *𝑴𝒂́𝒙𝒊𝒎𝒐 1000 𝑪𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆.*`
    
let reportId = Math.floor(Math.random() * 901);

ACTIVE_CONVERSATIONS[reportId] = {
userId: m.sender,
userName: m.pushName || 'Usuario desconocido',
active: true,
chatId: m.chat };

let reportText = text || (m.quoted && m.quoted.text);
let teks = `┏╼╾╼⧼⧼⧼ ＲＥＰＯＲＴＥ ⧽⧽⧽╼╼╼┓
╏• *ɴᴜᴍᴇʀᴏ:* Wa.me/${m.sender.split("@")[0]}
╏• *ᴍᴇɴsᴀᴊᴇ:* ${reportText}
┗╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼\n\nResponde al mensaje con:\n*"responder ${reportId} [mensaje]"* para interactuar.\nUsa *.fin ${reportId}* para finalizar la conversación.`

await conn.sendMessage(OWNER1, { text: teks, mentions: [m.sender] }, { quoted: m });
await delay(1000)
await conn.reply(m.chat, `*⚡ᴇʟ ʀᴇᴘᴏʀᴛᴇ ʜᴀ sɪᴅᴏ ᴇɴᴠɪᴀᴅᴏs ᴀ ᴍɪ ᴄʀᴇᴀᴅᴏʀ, ᴛᴇɴᴅʀᴀ ᴜɴᴀ ʀᴇsᴘᴜᴇsᴛᴀ ᴘʀᴏɴᴛᴏ, ᴅᴇ sᴇʀ ғᴀʟsᴏ sᴇʀᴀ ɪɢɴᴏʀᴀᴅᴏ ᴇʟ ʀᴇᴘᴏʀᴛᴇ*`);
return;
}};

handler.before = async (m, { conn }) => {
let activeConversation = Object.entries(ACTIVE_CONVERSATIONS).find(([id, convo]) => convo.active && convo.userId === m.sender && convo.chatId === m.chat );

if (activeConversation && m.text) {
let [reportId] = activeConversation;

await conn.sendMessage(OWNER1, { text: `*📩 Nueva respuesta del usuario @${m.sender.split("@")[0]} (ID: ${reportId}):*\n${m.text}`, mentions: [m.sender] }, { quoted: m });
return false; 
}

let matchResponder = m.text.match(/^responder (\S+) (.+)/i);
if (matchResponder) {
let [_, reportId, ownerMessage] = matchResponder;

if (!ACTIVE_CONVERSATIONS[reportId] || !ACTIVE_CONVERSATIONS[reportId].active) return 
let { userId } = ACTIVE_CONVERSATIONS[reportId];
await conn.reply(userId, `💬 *Respuesta del owner:*\n${ownerMessage}`);
return;
}

if (m.quoted && m.quoted.text) {
let quotedTextMatch = m.quoted.text.match(/ID: (\d+)/); 
if (quotedTextMatch) {
let reportId = quotedTextMatch[1];
if (ACTIVE_CONVERSATIONS[reportId] && ACTIVE_CONVERSATIONS[reportId].active) {
let { userId } = ACTIVE_CONVERSATIONS[reportId];
await conn.reply(userId, `💬 *Respuesta del owner:*\n${m.text}`);
return;
}}}

let matchFin = m.text.match(/^\.fin (\S+)/i);
if (matchFin) {
let [_, reportId] = matchFin;

if (!ACTIVE_CONVERSATIONS[reportId]) return 
let { userId } = ACTIVE_CONVERSATIONS[reportId];
ACTIVE_CONVERSATIONS[reportId].active = false;
await conn.reply(userId, `🔒 *La conversación ha sido cerrada por el propietario.*`);
await delay(3000)
await conn.reply(m.chat, `✔️ Conversación ${reportId} cerrada.`);
return;
}};
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['main']
handler.exp = 3500
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes|reportar)$/i 
handler.register = true 
export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/*
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `⚠️ 𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐞𝐥 𝐞𝐫𝐫𝐨𝐫/𝐜𝐨𝐦𝐚𝐧𝐝𝐨 𝐜𝐨𝐧 𝐟𝐚𝐥𝐥𝐚\n\n*𝐄𝐣:* ${usedPrefix + command} los sticker no funka`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}}) 
if (text.length < 8) throw `${fg} ✨ *𝑴𝒊́𝒏𝒊𝒎𝒐 10 𝒄𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆...*`
if (text.length > 1000) throw `${fg} ⚠️ *𝑴𝒂́𝒙𝒊𝒎𝒐 1000 𝑪𝒂𝒓𝒂𝒄𝒕𝒆𝒓𝒆𝒔 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓 𝒆𝒍 𝒓𝒆𝒑𝒐𝒓𝒕𝒆.*`
let teks = `┏╼╾╼⧼⧼⧼ ＲＥＰＯＲＴＥ ⧽⧽⧽╼╼╼┓
╏• *ɴᴜᴍᴇʀᴏ:* Wa.me/${m.sender.split`@`[0]}
╏• *ᴍᴇɴsᴀᴊᴇ:* ${text}
┗╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼`
await delay(1 * 1000)
conn.reply(m.chat,  `⚡ᴇʟ ʀᴇᴘᴏʀᴛᴇ ʜᴀ sɪᴅᴏ ᴇɴᴠɪᴀᴅᴏs ᴀ ᴍɪ ᴄʀᴇᴀᴅᴏʀ, ᴛᴇɴᴅʀᴀ ᴜɴᴀ ʀᴇsᴘᴜᴇsᴛᴀ ᴘʀᴏɴᴛᴏ, ᴅᴇ sᴇʀ ғᴀʟsᴏ sᴇʀᴀ ɪɢɴᴏʀᴀᴅᴏ ᴇʟ ʀᴇᴘᴏʀᴛᴇ`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, body: '𝐄𝐗𝐈𝐓𝐎𝐒', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}})
//conn.reply('593968585383@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
//contextInfo: {
//mentionedJid: [m.sender]
//}})
await delay(3 * 3000)
conn.reply('573147616444@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {contextInfo: {mentionedJid: [m.sender]
}})}
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['main']
handler.exp = 3500
handler.command = /^(report|request|reporte|bugs|bug|report-owner|reportes|reportar)$/i 
handler.register = true 
export default handler
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
*/

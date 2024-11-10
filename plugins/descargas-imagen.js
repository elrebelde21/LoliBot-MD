import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return m.reply(`𝗤𝘂𝗲 𝗯𝘂𝘀𝗰𝗮𝗿? 🤔️ 𝙪𝘀𝙖𝙧 𝙙𝙚 𝙡𝙖 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙢𝙖𝙣𝙚𝙧𝙖\n• 𝗘𝗷𝗲𝗺𝗽𝗹𝗼\n*${usedPrefix + command} Loli*`) 
if (m.text.includes('gore') || m.text.includes('cp')|| m.text.includes('porno')|| m.text.includes('Gore')|| m.text.includes('rule')|| m.text.includes('CP') || m.text.includes('Rule34') || m.text.includes('xxx')) throw '🙄 No voy a buscar tu pendejadas....'
try {
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
conn.sendFile(m.chat, link, 'error.jpg', `_🔎 𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤𝙨 𝙙𝙚: ${text}_`, m, null, fake);
//conn.sendButton(m.chat, ``, botname, link, [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command} ${text}`]], null, null, m, null, fake)
} catch (e) {
console.log(e) 
}}
handler.help = ['gimage <query>', 'imagen <query>'];
handler.tags = ['buscadores'];
handler.command = /^(gimage|image|imagen)$/i;
handler.register = true 
handler.limit = 1
export default handler;

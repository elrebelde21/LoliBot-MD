import {pinterest} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) throw `*⚠️ Ejemplo:* ${usedPrefix + command} Loli`;
try {
const json = await pinterest(text);
conn.sendFile(m.chat, json.getRandom(), 'error.jpg', `_🔎 𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤𝙨 𝙙𝙚: ${text}_`, m, null, fake);
} catch (error1) {
try {
const response=await fetch(`${apis}/search/pinterest?text=${text}`)
const dataR = await response.json()
const json = dataR.result
conn.sendFile(m.chat, json.getRandom(), 'error.jpg', `_🔎 𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤𝙨 𝙙𝙚: ${text}_`, m, null, fake);
//conn.sendButton(m.chat, `💞 ${mid.buscador} ${text}`, `𝙋𝙞𝙣𝙩𝙚𝙧𝙚𝙨𝙩 | ${wm}`, json.getRandom(), [['🔄 𝙎𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 | 𝙉𝙚𝙭𝙩', `${usedPrefix}pinterest ${text}`]], null, null, m)
} catch (e) {
console.log(e) 
}}}
handler.help = ['pinterest <keyword>'];
handler.tags = ['buscadores'];
handler.command = /^(pinterest)$/i;
handler.register = true 
handler.limit = 1
export default handler;

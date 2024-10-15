import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';
const handler = async (m, {args, usedPrefix, command}) => {
const msg = `*⚠️ 𝐔𝐬𝐨 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐨 𝐝𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 ${usedPrefix + command} (idioma) (texto)*\n*• 𝐄𝐣𝐞𝐦𝐩𝐥𝐨:*\n*${usedPrefix + command} es Hello*\n\n> *𝐂𝐨𝐧𝐨𝐜𝐞 𝐥𝐨𝐬 𝐢𝐝𝐢𝐨𝐦𝐚𝐬 𝐚𝐝𝐦𝐢𝐭𝐢𝐝𝐨𝐬 𝐞𝐧:*\nhttps://cloud.google.com/translate/docs/languages`;
if (!args || !args[0]) return m.reply(msg);
let lang = args[0];
let text = args.slice(1).join(' ');
const defaultLang = 'es';
if ((args[0] || '').length !== 2) {
lang = defaultLang;
text = args.join(' ');
}
if (!text && m.quoted && m.quoted.text) text = m.quoted.text;
try {
const result = await translate(`${text}`, {to: lang, autoCorrect: true});
await m.reply('*Traducción:* ' + result.text);
} catch {
try {
const lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`);
const loll = await lol.json();
const result2 = loll.result.translated;
await m.reply('*Traducción:* ' + result2);
} catch {
await m.reply('*[❗𝐈𝐍𝐅𝐎❗] ERROR, VUELVA A INTENTARLO*');
}}};
handler.help = ['traducir', 'translate']
handler.tags = ['tools']
handler.command = /^(translate|traducir|trad)$/i;
handler.register = true 
export default handler;

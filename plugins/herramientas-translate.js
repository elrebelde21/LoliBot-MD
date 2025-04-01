import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';
const handler = async (m, {args, usedPrefix, command}) => {
const msg = `*⚠️ ${await tr(`Uso correcto del comando ${usedPrefix + command} (idioma) (texto)*\n*• Ejemplo:*\n*${usedPrefix + command} es Hello*\n\n> *Conoce los idiomas admitidos en:*`)}\nhttps://cloud.google.com/translate/docs/languages`;
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
await m.reply(await tr('*Traducción:* ') + result.text);
} catch {
try {
const lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`);
const loll = await lol.json();
const result2 = loll.result.translated;
await m.reply(await tr('*Traducción:* ') + result2);
} catch (e) {
m.reply(`\`\`\`⚠️ ${await tr("OCURRIO UN ERROR")} ⚠️\`\`\`\n\n> *${await tr("Reporta el siguiente error a mi creador con el comando:")}* #report\n\n>>> ${e} <<<< `)    
}}};
handler.help = ['traducir', 'translate']
handler.tags = ['tools']
handler.command = /^(translate|traducir|trad)$/i;
handler.register = true 
export default handler;

import gtts from 'node-gtts';
import {readFileSync, unlinkSync} from 'fs';
import {join} from 'path';
const defaultLang = 'es';
const handler = async (m, {conn, args, usedPrefix, command}) => {
let lang = args[0];
let text = args.slice(1).join(' ');
if ((args[0] || '').length !== 2) {
lang = defaultLang;
text = args.join(' ');
}
if (!text && m.quoted?.text) text = m.quoted.text;
conn.sendPresenceUpdate('recording', m.chat)   
let res;
try {
res = await tts(text, lang);
} catch (e) {
m.reply(e + '');
text = args.join(' ');
if (!text) throw `*⚠️ 𝐄𝐬𝐜𝐫𝐢𝐛𝐞 𝐮𝐧 𝐭𝐞𝐱𝐭𝐨 𝐪𝐮𝐞 𝐪𝐮𝐢𝐞𝐫𝐚 𝐜𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐫 𝐚 𝐧𝐨𝐭𝐚 𝐝𝐞 𝐯𝐨𝐳, 𝐄𝐣𝐞𝐦𝐩𝐥𝐨:* ${usedPrefix + command} es Hola negros`;
res = await tts(text, defaultLang);
} finally {
if (res) conn.sendFile(m.chat, res, 'tts.opus', null, m, null, fake, true);
}};
handler.help = ['tts <lang> <teks>'];
handler.tags = ['convertidor']
handler.command = /^g?tts$/i;
handler.register = true
export default handler;

function tts(text, lang = 'es') {
console.log(lang, text);
return new Promise((resolve, reject) => {
try {
const tts = gtts(lang);
const filePath = join(global.__dirname(import.meta.url), '../tmp', (1 * new Date) + '.wav');
tts.save(filePath, text, () => {
resolve(readFileSync(filePath));
unlinkSync(filePath);
});
} catch (e) {
reject(e);
}})}

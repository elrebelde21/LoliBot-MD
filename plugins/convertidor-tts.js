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
if (!text) throw `*⚠️ ${await tr("Escribe un texto que quiera convertir a nota de voz, ejemplo")}:* ${usedPrefix + command} es Hola negros`;
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

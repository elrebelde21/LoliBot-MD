import fetch from 'node-fetch';
import { perplexity } from '../lib/scraper.js';
const antiSpam = new Map();
const handler = (m) => m;

handler.before = async (m) => {
const chat = global.db.data.chats[m.chat];
if (chat.simi) {
if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
let textodem = m.text;
let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
if (prefixRegex.test(m.text)) return true;
const lastMessageTime = antiSpam.get(m.sender) || 0;
const currentTime = Date.now();
if (currentTime - lastMessageTime < 5000) throw !0; 
if (m.fromMe) return;
try {
await conn.sendPresenceUpdate('composing', m.chat)

async function perplexityIA(q, logic) {
try {
let response = await perplexity.chat([{ role: 'system', content: logic || syms1 }, { role: 'user', content: q }], 'sonar-pro');
if (response.status) {
return response.result.response;
} else {
throw new Error(`Error en Perplexity: ${response.result.error}`);
}} catch (error) {
console.error('Error en Perplexity:', error);
return null;
}}
    
async function SimSimi(textodem, language = 'es') {
try {
const { data } = await axios.post("https://api.simsimi.vn/v1/simtalk", new URLSearchParams({
textodem,
lc: language }).toString(), {
headers: {'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }});
return data.message;
} catch (error) {
console.error(error);
return null;
}}
    
let username = `${m.pushName}`;
let syms1 = await fetch('https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/main/src/text-chatgpt.txt').then(v => v.text());
    
let result;
if (!result || result.trim().length === 0) {
result = await perplexityIA(textodem, syms1);
}

if (!result || result.trim().length === 0) {
result = await SimSimi(textodem);
}
    
if (result && result.trim().length > 0) {
await m.reply(result);
antiSpam.set(m.sender, currentTime);
}} catch {
try {
let gpt = await fetch(`${apis}/tools/simi?text=${textodem}`);
let res = await gpt.json();
await m.reply(res.data.message);
antiSpam.set(m.sender, Date.now());
antiSpam.set(m.sender, Date.now());
} catch {
/*SI DA ERROR USARA ESTA OTRA OPCION DE API DE IA QUE RECUERDA EL NOMBRE DE LA PERSONA*/
if (textodem.includes('Hola')) textodem = textodem.replace('Hola', 'Hello');
if (textodem.includes('hola')) textodem = textodem.replace('hola', 'hello');
if (textodem.includes('HOLA')) textodem = textodem.replace('HOLA', 'HELLO');
const reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=' + textodem);
const resu = await reis.json();
const nama = m.pushName || '1';
const api = await fetch('http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=' + nama + '&msg=' + resu[0][0][0]);
const res = await api.json();
const reis2 = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=' + res.cnt);
const resu2 = await reis2.json()
await m.reply(resu2[0][0][0])
antiSpam.set(m.sender, Date.now());
}
return !0;
}}
return true;
};
export default handler;

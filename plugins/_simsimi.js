import fetch from 'node-fetch';
const handler = (m) => m;

handler.before = async (m) => {
const chat = global.db.data.chats[m.chat];
if (chat.simi) {
if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
let textodem = m.text;
if (m.text.includes('serbot') || m.text.includes('bots')|| m.text.includes('jadibot')|| m.text.includes('menu')|| m.text.includes('play')|| m.text.includes('play2') || m.text.includes('playdoc') || m.text.includes('tiktok') || m.text.includes('facebook') || m.text.includes('menu2') ||  m.text.includes('infobot') || m.text.includes('estado') ||  m.text.includes('ping') ||  m.text.includes('instalarbot') ||  m.text.includes('sc') ||  m.text.includes('sticker') ||  m.text.includes('s') || m.text.includes('wm') ||  m.text.includes('qc')) return
try {
await conn.sendPresenceUpdate('composing', m.chat)
let gpt = await fetch(`https://deliriusapi-official.vercel.app/tools/simi?text=${encodeURIComponent(textodem)}`)
let res = await gpt.json() 
await m.reply(res.data.message) 
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
await m.reply(resu2[0][0][0])}
return !0;
}
return true;
};
export default handler;

import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';
const handler = async (m, {text, command, args, usedPrefix}) => {
if (!text) return conn.reply(m.chat,  `*Hola quiere hablar un rato conmigo?* escriba un texto para hablar conmigo\n\n*Ejemplo:* ${usedPrefix + command} Hola bot`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}}) 
  try {
await conn.sendPresenceUpdate('composing', m.chat)
let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/simi?text=${text}`)
let res = await gpt.json()
await m.reply(res.data.message)
  } catch {
    try {
      if (text.includes('Hola')) text = text.replace('Hola', 'Hello');
      if (text.includes('hola')) text = text.replace('hola', 'Hello');
      if (text.includes('HOLA')) text = text.replace('HOLA', 'HELLO');
      const reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=' + text);
      const resu = await reis.json();
      const nama = m.pushName || '1';
      const api = await fetch('http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=' + nama + '&msg=' + resu[0][0][0]);
      const res = await api.json();
      const reis2 = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=' + res.cnt);
      const resu2 = await reis2.json();
      m.reply(resu2[0][0][0]);
    } catch {
return m.reply([`Simsimi esta durmiendo no molesta 🥱`, `Callarte`, `Api simsimi caida`, `Simsimi esta ocupado cojieron con tu hermana vuelva mas tarde 🥵`, `NO MOLESTE PUTA`, `No hay señar`, `No estoy disponible`].getRandom());
    }
  }
};
handler.help = ['simi']
handler.tags = ['game'];
handler.command = /^((sim)?simi|alexa|cortana|bot)$/i;
export default handler;
// by https://github.com/elrebelde21

//let handler = m => m
//handler.all = async function (m) {
import { perplexity } from '../lib/scraper.js';
const antiSpam = new Map();
export async function before(m, { conn }) {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" } 
if (m.id.startsWith('NJX-') || m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20 || m.id.startsWith('FizzxyTheGreat-')) return
let setting = global.db.data.settings[this.user.jid]
let chat = global.db.data.chats[m.chat]
let name = conn.getName(m.sender)
const user = `@${m.sender.split`@`[0]}`;
//let textodem = m.text;
if (chat.isBanned) return
if (m.fromMe) return
if (m.chat === "120363297379773397@newsletter") return; 
if (m.chat === "120363355261011910@newsletter") return;
    
let vn = 'https://qu.ax/eGdW.mp3'
let bot = `${pickRandom([`*Hola ${user} soy un bot el que puedo ayudar? 👉👈*`, `Aqui estoy`, `bot tu abuela`, `que quiere?`, `No dispoble 🫣`, `Hola aqui estoy soy tu botsito sexy el que puedo ayudar uwu`])}
`.trim()//`
let txt = `*${await tr("¿Muy lento tu nokia y necesitas tener activo tu bot 24/7?")}*

> *${await tr("Te tenemos la mejor opción para mantener activo tu bot 24/7, a precios muy accesibles. Es muy barato y todos pueden comprar.")}*

🟢 \`\`\`${await tr("Información del Host")}\`\`\`

💻 *${await tr("Página")}:*
https://dash.skyultraplus.com

*🟢 ${await tr("Dashboard")}:*
https://dash.skyultraplus.com

⚙️ *${await tr("Panel")}:*
https://panel.skyultraplus.com

💥 *${await tr("Comunidad de WhatsApp")}:*
https://chat.whatsapp.com/E6iWpvGuJ8zJNPbN3zOr0D

*🟣 ${await tr("Discord")}:*
https://discord.skyultraplus.com

🧡 *${await tr("Canal de WhatsApp")}:*
https://WhatsApp.skyultraplus.com

🗣📲 *${await tr("Contacto")}:*
• wa.me/15167096032
• ${fb}
• https://instagram.com/gata_dios` 

//if (/^bot|simi|alexa$/i.test(m.text)) {   
if (m.text.includes(`bot`) || m.text.includes(`Bot`) || m.text.includes(`simsimi`) || m.text.includes('lolibot') || m.text.includes(`simi`) || m.text.includes(`alexa`)) {   
if (m.text.includes('jadibot') || m.text.includes('bots') || m.text.includes('serbot') || m.text.includes('instalarbot') || m.text.includes('infobot')) return;
const lastMessageTime = antiSpam.get(m.sender) || 0;
const currentTime = Date.now();
if (currentTime - lastMessageTime < 9000) throw !0; 
    
if (/^¿que es un bot?|Que es un bot?|que es un bot?|que es un bot$/i.test(m.text) ) {
return conn.reply(m.chat, `\`☆::¿${await tr("QUE ES UN BOT DE WHATSAPP?")}::☆\`

> ${await tr("Un bot es una inteligencia artificial que realiza tareas que le indique con comandos, en el caso de WhatsApp puedes crear stickers,  descargas música, vídeos, crear logos personalizados y muchos mas, esto de forma automátizada, o sea que un humano no interfiere en el proceso. Para ver el menu de comando puedes usar:")} #menu

> 「 🅛🅞🅛🅘🅑🅞🅣-🅜🅓 」`, m)
}  
if (/^Quiero un bot|como obtengo un bot?|Quiero un bot?|quiero un bot|solicitó bot|solicito bot|Necesito un bot|necesito un bot$/i.test(m.text)) {
return conn.reply(m.chat,  `\`⚡ ¿${await tr("Quieres un bot para tu grupo?")}\`

*🔰 ${await tr("Tiene varias opciones. Puedes instalarlo tú mismo siguiendo los pasos de instalación:")}*
* #instalarbot

*🧡 ${await tr("Puede hacerte un sub bot mandando el siguiente comando:")}*
* /serbot (${await tr("escanea el QR")}) 
* /code (${await tr("Código de 8 dígitos")})

*💖 ${await tr("Puedes solicitarlo haciendo una donación voluntaria a través de PayPal o Mercado Pago arg")}.*

> 🚀 ${await tr("El bot estará activo 24/7 para tu grupo.")}

\`⚡ ¿${await tr("Por dónde puedo donar?")}\`
> ${await tr("A través de nuestro Paypal, Mercado Pago o Naranja X.")}

*❇️ ${await tr("PayPal:")}* 
https://www.paypal.com/paypalme/OficialGD

*❇️ ${await tr("Mercado pago:")}*
> *• Alias :* OficialGB
> *• CVU :* 0000003100059201491917

*❇️ ${await tr("Naranja X:")}*
> *• CVU :* 4530000800017922067114

\`⏩ ${await tr("Siguiente paso")} ⏩\`

${await tr("Una vez realizado el pago, puedes enviar un comprobante de envío del dinero (captura de pantalla) para que pueda agregar el bot a tu grupo.")}
https://chat.whatsapp.com/FDRfhecUGrCEQswkg8FUYz
${fb}

\`⚡ ¿${await tr("El bot estará activo 24/7?")}\`
> _*${await tr("Sí, nuestro bot está alojado en un servidor de pago para mantenerlo activo 24/7 (por eso también solicitamos donaciones para mantenerlo en funcionamiento)")} 💞.*_

> 「 🅛🅞🅛🅘🅑🅞🅣-🅜🅓 」`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: `Hola ${name} 👋`, body: wm, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
}
try {
let prefixRegex = new RegExp('^[' + setting.prefix.replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']');
let hasPrefixWithKeyword = prefixRegex.test(m.text) && (m.text.match(/^[‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-](bot|Bot|simsimi|simi|alexa|lolibot)/));
let hasKeywordWithoutPrefix = (m.text.includes('bot') || m.text.includes('Bot') || m.text.includes('simsimi') || m.text.includes('simi') || m.text.includes('lolibot') || m.text.includes('alexa')) && !prefixRegex.test(m.text);
if (!hasPrefixWithKeyword && !hasKeywordWithoutPrefix) return;
let query = m.text;
if (hasPrefixWithKeyword) {
query = m.text.replace(prefixRegex, '').replace(/(bot|Bot|simsimi|simi|lolibot|alexa)/i, '').trim(); 
} else if (hasKeywordWithoutPrefix) {
const keywordRegex = /^(bot|Bot|simsimi|simi|lolibot|alexa)\s+/i;
if (keywordRegex.test(m.text)) {
query = m.text.replace(keywordRegex, '').trim();
} else {
query = m.text.trim();
}}
if (!query) return;

conn.sendPresenceUpdate('composing', m.chat);
antiSpam.set(m.sender, currentTime);
async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: true // true = resultado con url
});
return response.data.result;
} catch (error) {
console.error(error);
}}

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
    
async function SimSimi(text, language = 'es') {
try {
const { data } = await axios.post("https://api.simsimi.vn/v1/simtalk", new URLSearchParams({
text,
lc: language }).toString(), {
headers: {'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }});
return data.message;
} catch (error) {
console.error(error);
return null;
}}

let username = `${m.pushName}`;
/*let syms1 = `Tomarás el rol de un bot de Whatsapp creado por elrebelde21. Tu nombre sera LoliBot, Tu idioma es el español, pero puedes responder en diferentes idiomas. tiene este rol que chat divertido con exploit incluido osea los quiere dices es que este rol solo es humor, divertido, no que tome nada real, tu respuesta sera divertida, humor, y usar mucho emojis el tu respuesta.

"general risa el chat por que este rol actúal más como simsimi" Chatbot no chatgpt. 

los quiere dices que tu respuesta sera humor puro, risa, memes.

si pregunta donde aloja el bot 24/7 tu recomienda el hosting "Sky-Ultra-Plus host", alojamiento de bot de WhatsApp, Telegram, discord, todos con etono JavaScript, ofrecemos server gratis y de pago, a precios asequibles, barato, todos puede comprar mas información: (https://dash.skyultraplus.com). 
para actualizaciónes/novedades sobre el bot o nuesro hosting seguir nuestro canal de WhatsApp: (https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A).`;  */
let syms1 = await fetch('https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/main/src/text-chatgpt.txt').then(v => v.text());
//await fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then(v => v.text());

let result;
if (!result || result.trim().length === 0) {
result = await perplexityIA(query, syms1);
}

if (!result || result.trim().length === 0) {
result = await SimSimi(query);
}

if (!result || result.trim().length === 0) {
result = await luminsesi(query, username, syms1);
result = result.replace(/Maaf, terjadi kesalahan saat memproses permintaan Anda/g, '').trim();
result = result.replace(/Generated by BLACKBOX\.AI.*?https:\/\/www\.blackbox\.ai/g, '').trim();
result = result.replace(/and for API requests replace https:\/\/www\.blackbox\.ai with https:\/\/api\.blackbox\.ai/g, '').trim();
}

if (result && result.trim().length > 0) {
await conn.reply(m.chat, result, m);
antiSpam.set(m.sender, currentTime);
}} catch (e) {
try {
let gpt = await fetch(`${apis}/tools/simi?text=${m.text}`);
let res = await gpt.json();
await m.reply(res.data.message);
antiSpam.set(m.sender, Date.now());
} catch (e) {
return m.reply([`Simsimi esta durmiendo no molesta 🥱`, `Callarte`, `Api simsimi caida`, `Simsimi esta ocupado cojieron con tu hermana vuelva mas tarde 🥵`, `NO MOLESTE PUTA`, `No hay señar`, `No estoy disponible`].getRandom());
console.log(e);
}}}

if (/^infohost|hosting$/i.test(m.text)) {
 await conn.sendMessage(m.chat, { text: txt,
contextInfo:{
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: `🤖 𝐒𝐊𝐘𝐏𝐋𝐔𝐒-𝐇𝐎𝐒𝐓 🤖`,
body: `✅ Hosting de Calidad`,
"previewType": "PHOTO",
thumbnailUrl: 'https://cdn.dorratz.com/files/1739136628132.jpg', 
sourceUrl: nna}}}, { quoted: m})
} 
    
if (/^todo bien$/i.test(m.text) ) { //sin prefijo
conn.reply(m.chat, `𝑩𝒊𝒆𝒏 𝒄𝒂𝒑𝒐 😎 𝒚 𝒕𝒖`, m) }

if (/^e$/i.test(m.text) ) { //sem prefixo
conn.reply(m.chat, `𝑸𝒖𝒆 𝒃𝒖𝒆𝒏𝒐 𝒔𝒂𝒃𝒆𝒓 𝒍𝒂 𝒍𝒆𝒕𝒓𝒂 𝒆`, m)}

if (/^@5214774444444|@5492266613038$/i.test(m.text) ) {
conn.reply(m.chat, `*_[ ⚠ ️] No etiquetes a mi creador, si tiene alguna consulta o dudas, hablarle el pv solo por tema del bot_*`, m)
}

/*if (/^Mande porno|porno|paja$/i.test(m.text) ) { //sem prefixo
    let teks = `
${pickRandom([` 𝑨𝒔𝒊́ 𝒒𝒖𝒆 𝒒𝒖𝒊𝒆𝒓𝒂 𝒉𝒂𝒈𝒂 𝒑𝒖𝒕𝒊𝒕𝒐 🧐`, `_uff mire un pajero_`, `_pagame y paso mi pack😏🥵_`, `_que_`, `_que quiere pija dice 🤣`, `_pasa el pack de tu hermana😏_`, `_mire un gilipolla_`, `_siuuu sexo sexo sexo😈_`, '_callarte putito_'])}
`.trim()
conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})
}
*/

if (/^reglas$/i.test(m.text) ) {
m.reply([`\`🌐 ${await tr("REGLAS DEL BOT ")} 🌐\`\n\n* *${await tr("No hacer spam de comandos")}*\n\n${await tr("Usar los comando cada 5 segundos, de lo contrario el bot se puede satura, o numero del bot puede irse a support por spam.")}\n\n* *${await tr("No estar enviando link del grupos al bot para que se una")}*\n\n${await tr("Hablar con mi creador y el lo une a tu grupo, si apoyar nuestras redes sociales:")}\n${yt}\n${md}\n\n* *${await tr("No llamar al bot, ni al creador")}*\n\n${await tr("Si lo haces, seras baneado del bot y bloqueado")}`, `\`⚠️ ${await tr("REGLAS")} ⚠️\`

* ${await tr("Prohibido llamar al bot")}
* ${await tr("Prohibido spam al bot")}
* ${await tr("No agregar al bot")}
* ${await tr("Respeta los términos y condiciones")}`].getRandom() +  `\n\n> 「 🅛🅞🅛🅘🅑🅞🅣-🅜🅓 」`);
}
return !0 
}
//export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

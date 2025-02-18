// by https://github.com/elrebelde21

//let handler = m => m
//handler.all = async function (m) {
export async function before(m, { conn }) {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" } 
m.isBot = m.id.startsWith('BAE5') && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || m.id.startsWith('3EB0') && (m.id.length === 20 || m.id.length === 22) || m.id.startsWith('B24E') && m.id.length === 20;
if (m.isBot) return
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
let txt = `*¿Muy lento tu nokia y necesitas tener activo tu bot 24/7?*

> *Te tenemos la mejor opción para mantener activo tu bot 24/7, a precios muy accesibles. Es muy barato y todos pueden comprar.*

🟢 \`\`\`Información del Host\`\`\`

💻 *Página:*
https://dash.skyultraplus.com

*🟢 Dashboard:*
https://dash.skyultraplus.com

⚙️ *Panel*
https://panel.skyultraplus.com

💥 *Comunidad de WhatsApp:*
https://chat.whatsapp.com/E6iWpvGuJ8zJNPbN3zOr0D

*🟣 Discord:*
https://discord.skyultraplus.com

🧡 *Canal de WhatsApp:*
https://WhatsApp.skyultraplus.com

🗣📲 *Contacto:*
• wa.me/15167096032
• ${fb}
• https://instagram.com/gata_dios` 

//if (/^bot|simi|alexa$/i.test(m.text)) {   
if (m.text.includes(`bot`) || m.text.includes(`Bot`) || m.text.includes(`simsimi`) || m.text.includes(`simi`) || m.text.includes(`alexa`)) {   
if (m.text.includes('jadibot') || m.text.includes('bots') || m.text.includes('serbot') || m.text.includes('instalarbot') || m.text.includes('infobot')) return;
if (/^¿que es un bot?|Que es un bot?|que es un bot?|que es un bot$/i.test(m.text) ) {
return conn.reply(m.chat, `\`☆::¿𝙌𝙐𝙀 𝙀𝙎 𝙐𝙉 𝘽𝙊𝙏 𝘿𝙀 𝙒𝙃𝘼𝙏𝙎𝘼𝙋𝙋?::☆\`

> 𝐔𝐧 𝐁𝐨𝐭 𝐞𝐬 𝐮𝐧𝐚 𝐢𝐧𝐭𝐞𝐥𝐢𝐠𝐞𝐧𝐜𝐢𝐚 𝐚𝐫𝐭𝐢𝐟𝐢𝐜𝐢𝐚𝐥 𝐪𝐮𝐞 𝐫𝐞𝐚𝐥𝐢𝐳𝐚 𝐭𝐚𝐫𝐞𝐚𝐬 𝐪𝐮𝐞 𝐥𝐞 𝐢𝐧𝐝𝐢𝐪𝐮𝐞 𝐜𝐨𝐧 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬, 𝐞𝐧 𝐞𝐥 𝐜𝐚𝐬𝐨 𝐝𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐩𝐮𝐞𝐝𝐞𝐬 𝐜𝐫𝐞𝐚𝐫 𝐬𝐭𝐢𝐜𝐤𝐞𝐫𝐬, 𝐝𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐫 𝐦𝐮́𝐬𝐢𝐜𝐚, 𝐯𝐢𝐝𝐞𝐨𝐬, 𝐜𝐫𝐞𝐚𝐫 𝐥𝐨𝐠𝐨𝐬 𝐩𝐞𝐫𝐬𝐨𝐧𝐚𝐥𝐢𝐳𝐚𝐝𝐨𝐬 𝐲 𝐦𝐮𝐜𝐡𝐨 𝐦𝐚𝐬, 𝐞𝐬𝐭𝐨 𝐝𝐞 𝐟𝐨𝐫𝐦𝐚 𝐚𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐳𝐚𝐝𝐚, 𝐨 𝐬𝐞𝐚 𝐪𝐮𝐞 𝐮𝐧 𝐡𝐮𝐦𝐚𝐧𝐨 𝐧𝐨 𝐢𝐧𝐭𝐞𝐫𝐟𝐢𝐞𝐫𝐞 𝐞𝐧 𝐞𝐥 𝐩𝐫𝐨𝐜𝐞𝐬𝐨. 𝐏𝐚𝐫𝐚 𝐯𝐞𝐫 𝐞𝐥 𝐦𝐞𝐧𝐮́ 𝐝𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 𝐩𝐮𝐞𝐝𝐞𝐬 𝐮𝐬𝐚𝐫: #menu

> 「 🅛🅞🅛🅘🅑🅞🅣-🅜🅓 」`, m)
}  
if (/^Quiero un bot|como obtengo un bot?|Quiero un bot?|quiero un bot|solicitó bot|solicito bot|Necesito un bot|necesito un bot$/i.test(m.text)) {
return conn.reply(m.chat,  `\`⚡ ¿Quieres un bot para tu grupo?\`

*🔰 Tiene varias opciones. Puedes instalarlo tú mismo siguiendo los pasos de instalación:*
* #instalarbot

*🧡 Puede hacerte un sub bot mandando el siguiente comando:*
* /serbot (escanea el QR) 
* /code (Código de 8 dígitos)

*💖 Puedes solicitarlo haciendo una donación voluntaria a través de PayPal o Mercado Pago arg.*

> 🚀 El bot estará activo 24/7 para tu grupo.

\`⚡ ¿Por dónde puedo donar?\`
> A través de nuestro Paypal, Mercado Pago o Naranja X.

*❇️ PayPal:* 
https://www.paypal.com/paypalme/OficialGD

*❇️ Mercado pago:*
> *• Alias :* OficialGB
> *• CVU :* 0000003100059201491917

*❇️ Naranja X:*
> *• CVU :* 4530000800017922067114

\`⏩ Siguiente paso ⏩\`

Una vez realizado el pago, puedes enviar un comprobante de envío del dinero (captura de pantalla) para que pueda agregar el bot a tu grupo.
https://chat.whatsapp.com/FDRfhecUGrCEQswkg8FUYz
${fb}

\`⚡ ¿El bot estará activo 24/7?\`
> _*Sí, nuestro bot está alojado en un servidor de pago para mantenerlo activo 24/7 (por eso también solicitamos donaciones para mantenerlo en funcionamiento) 💞.*_

> 「 🅛🅞🅛🅘🅑🅞🅣-🅜🅓 」`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: `Hola ${name} 👋`, body: wm, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
}
try {
let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
if (prefixRegex.test(m.text)) return true;
let time = global.db.data.users[m.sender].spam + 1000
if (new Date - global.db.data.users[m.sender].spam < 1000) return console.log(`[ SPAM ]`) 

conn.sendPresenceUpdate('composing', m.chat);
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

async function deepseek(query) {
try {
const { data } = await axios.post("https://api.blackbox.ai/api/chat", { messages: [{ id: null, role: "user", content: query }], userSelectedModel: "deepseek-v3" });
return data;
} catch (error) {
console.error('Error en la API de DeepSeek:', error);
return null;
}}

let query = m.text;
let username = `${m.pushName}`;
let syms1 = `Tomarás el rol de un bot de Whatsapp creado por elrebelde21. Tu nombre sera LoliBot, Tu idioma es el español, pero puedes responder en diferentes idiomas. tiene este rol que chat divertido con exploit incluido osea los quiere dices es que este rol solo es humor, divertido, no que tome nada real, tu respuesta sera divertida, humor, y usar mucho emojis el tu respuesta.

"general risa el chat por que este rol actúal más como simsimi" Chatbot no chatgpt. 

los quiere dices que tu respuesta sera humor puro, risa, memes.

si pregunta donde aloja el bot 24/7 tu recomienda el hosting "Sky-Ultra-Plus host", alojamiento de bot de WhatsApp, Telegram, discord, todos con etono JavaScript, ofrecemos server gratis y de pago, a precios asequibles, barato, todos puede comprar mas información: (https://dash.skyultraplus.com). 
para actualizaciónes/novedades sobre el bot o nuesro hosting seguir nuestro canal de WhatsApp: (https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A).`;  

let result;
if (!result || result.trim().length === 0) {
result = await luminsesi(query, username, syms1);
result = result.replace(/Maaf, terjadi kesalahan saat memproses permintaan Anda/g, '').trim();
result = result.replace(/Generated by BLACKBOX\.AI.*?https:\/\/www\.blackbox\.ai/g, '').trim();
result = result.replace(/and for API requests replace https:\/\/www\.blackbox\.ai with https:\/\/api\.blackbox\.ai/g, '').trim();
}

if (!result || result.trim().length === 0) {
const deepseekResponse = await deepseek(query);
if (deepseekResponse) {
result = deepseekResponse;
}}

if (result && result.trim().length > 0) {
await conn.reply(m.chat, result, m);
global.db.data.users[m.sender].spam = new Date * 1
}} catch (e) {
try {
let gpt = await fetch(`${apis}/tools/simi?text=${m.text}`);
let res = await gpt.json();
await m.reply(res.data.message);
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
m.reply([`\`🌐 REGLAS DEL BOT 🌐\`\n\n* *No hacer spam de comandos*\n\nUsar los comando cada 5 segundos, de lo contrario el bot se puede satura, o numero del bot puede irse a support por spam.\n\n* *No estar enviando link del grupos al bot para que se una*\n\nHablar con mi creador y el lo une a tu grupo, si apoyar nuestras redes sociales:\n${yt}\n${md}\n\n* *No llamar al bot, ni al creador*\n\nSi lo haces, seras baneado del bot y bloqueado`, `\`⚠️ 𝙍𝙀𝙂𝙇𝘼𝙎 ⚠️\`

* 𝐏𝐫𝐨𝐡𝐢𝐛𝐢𝐝𝐨 𝐥𝐥𝐚𝐦𝐚𝐫 𝐚𝐥 𝐁𝐨𝐭
* 𝐏𝐫𝐨𝐡𝐢𝐛𝐢𝐝𝐨 𝐒𝐩𝐚𝐦 𝐚𝐥 𝐁𝐨𝐭
* 𝐍𝐨 𝐚𝐠𝐫𝐞𝐠𝐚𝐫 𝐚𝐥 𝐁𝐨𝐭
* 𝐑𝐞𝐬𝐩𝐞𝐭𝐚 𝐥𝐨𝐬 𝐭𝐞𝐫𝐦𝐢𝐧𝐨𝐬 𝐲 𝐜𝐨𝐧𝐝𝐢𝐜𝐢𝐨𝐧𝐞𝐬`].getRandom() +  `\n\n> 「 🅛🅞🅛🅘🅑🅞🅣-🅜🅓 」`);
}
return !0 
}
//export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

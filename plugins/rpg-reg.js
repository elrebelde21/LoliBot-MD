import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'
 
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" } 
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
let biot = bio.status?.toString() || 'Sin Info'
let user = global.db.data.users[m.sender]
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let name2 = conn.getName(m.sender)

if (command == 'verify' || command == 'reg' || command == 'verificar') {
if (user.registered === true) throw await tr(`*Ya estás registrado 🤨*`)
if (!Reg.test(text)) throw `*⚠️ ${await tr(`¿No sabes cómo usar este comando?* Usar de la siguiente manera:\n\n*${usedPrefix + command} nombre.edad*\n*• Ejemplo:*`)} ${usedPrefix + command} ${name2}.16`
        
let [_, name, splitter, age] = text.match(Reg);
if (!name) throw await tr('*¿Y el nombre?*')
if (!age) throw await tr('*La edad no puede estar vacía, agrega tu edad*')
if (name.length >= 45) throw await tr('*¿Qué?, ¿tan largo va a ser tu nombre?*')
age = parseInt(age);
if (age > 100) throw await tr('👴🏻 ¡Estás muy viejo para esto!')
if (age < 5) throw await tr('🚼 ¿Los bebés saben escribir? ✍️😳')

user.name = name + '✓'.trim()
user.age = age;
user.regTime = +new Date();
user.regPhase = 'language';
user.registered = false; 
        
let supportedLanguages = [
{code: 'es', name: 'Español', aliases: ['español', 'spanish']},
{code: 'en', name: 'English', aliases: ['inglés', 'ingles']},
{code: 'pt', name: 'Português', aliases: ['portugues']},
{code: 'id', name: 'Bahasa Indonesia', aliases: ['indonesio']},
{code: 'fr', name: 'Francés', aliases: ['frances', 'french']},
{code: 'de', name: 'Alemán', aliases: ['aleman', 'german']},
{code: 'it', name: 'Italiano', aliases: ['italian']},
{code: 'ar', name: 'Arab (عرب)', aliases: ['arabe', 'arabic']}
];
        
let languageOptions = supportedLanguages.map((lang, i) => `${i + 1}. ${lang.name} (${lang.code})`).join('\n');
        
await conn.sendMessage(m.chat, {text: `📝 ${await tr("*Registro Paso 2: Selecciona tu idioma*")}\n\n${languageOptions}\n\n> *${await tr("Responde con número o nombre del idioma")}*`, mentions: [m.sender]}, { quoted: m });
        
user.regData = { name: name, age: age, supportedLanguages: supportedLanguages, who: who, usedPrefix: usedPrefix, rtotalreg: rtotalreg };
}

if (command == 'nserie' || command == 'myns' || command == 'sn') {
let sn = createHash('md5').update(m.sender).digest('hex')
conn.fakeReply(m.chat, sn, '0@s.whatsapp.net', await tr(`⬇️ ᴇsᴛᴇ ᴇs sᴜs ɴᴜᴍᴇʀᴏ ᴅᴇʟ sᴇʀɪᴇ ⬇️`, "⬇️ Este es sus numero del serie ⬇️"), 'status@broadcast', null, fake)
}

if (command == 'unreg') {
if (!args[0]) throw await tr(`✳️ *Ingrese número de serie*\nVerifique su número de serie con el comando...\n\n*${usedPrefix}nserie*`)
let user = global.db.data.users[m.sender]
let sn = createHash('md5').update(m.sender).digest('hex')
if (args[0] !== sn) throw await tr('⚠️ *Número de serie incorrecto*')
global.db.data.users[m.sender].money -= 400
global.db.data.users[m.sender].limit -= 2
global.db.data.users[m.sender].exp -= 150
user.gender = null
user.birthday = null
user.registered = false
conn.fakeReply(m.chat, await tr(`😢 Ya no estas registrado`), '0@s.whatsapp.net', await tr(`ᴿᵉᵍᶦˢᵗʳᵒ ᵉˡᶦᵐᶦⁿᵃᵈᵒ`, "registro eliminado"), 'status@broadcast', null, fake)
}
}

handler.before = async function (m, { conn }) {
let user = global.db.data.users[m.sender];
if (!user.regPhase) return;
if (m.text && m.text.startsWith(global.prefix)) return;
let text = m.text.toLowerCase().trim();
let currentDate = moment().tz('America/Argentina/Buenos_Aires');
let time = currentDate.format('LT');
let date = currentDate.format('DD/MM/YYYY');
let who = user.regData?.who || m.sender;
let usedPrefix2 = user.regData?.usedPrefix || '/';
let rtotalreg = user.regData?.rtotalreg || Object.values(global.db.data.users).filter(user => user.registered == true).length;

let userNationality = null;
try {
let api = await axios.get(`${apis}/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`);
let userNationalityData = api.data.result;
userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : null;
} catch (err) {
userNationality = null;
}

if (text === 'cancelar' || text === 'cancel') {
user.regPhase = null;
delete user.regData;
if (user._regTimeout) clearTimeout(user._regTimeout);
delete user._regTimeout;
return m.reply(await tr('❌ Registro cancelado. Puedes empezar de nuevo cuando quieras.'));
}

if (!user._regTimeout) {
user._regTimeout = setTimeout(() => {
user.regPhase = null;
delete user.regData;
delete user._regTimeout;
}, 1 * 60 * 1000); // 1 minuto
}

if (user.regPhase === 'language') {
let supportedLanguages = user.regData.supportedLanguages;
let selectedLang = supportedLanguages.find((lang, i) =>
text === (i + 1).toString() ||
lang.code === text ||
lang.name.toLowerCase() === text ||
lang.aliases.includes(text));

if (!selectedLang) {
let languageOptions = supportedLanguages.map((lang, i) => `${i + 1}. ${lang.name} (${lang.code})`).join('\n');
return m.reply(`📝 ${await tr("*Selecciona tu idioma:*\n\n")}${languageOptions}\n\n> *${await tr("Usa número o nombre del idioma")}*`);
}

user.language = selectedLang.code;
user.languageName = selectedLang.name;
user.regPhase = 'gender';
return m.reply(await tr(`📝 *Registro Paso 3: Selecciona tu género*\n\n1. Hombre 👨\n2. Mujer 👩\n3. Otro/No especificar\n\n> *Responde con número o palabra*`));
}

if (user.regPhase === 'gender') {
let genderMap = {'1': 'Hombre', 'hombre': 'Hombre', 'man': 'Hombre',
'2': 'Mujer', 'mujer': 'Mujer', 'woman': 'Mujer',
'3': 'Otro', 'otro': 'Otro', 'other': 'Otro'
};
let gender = genderMap[text];

if (!gender) {
return m.reply(await tr(`📝 *Selecciona tu género:*\n\n1. Hombre 👨\n2. Mujer 👩\n3. Otro/No especificar\n\n> *Usa número o palabra*`));
}

user.gender = gender;
user.regPhase = 'birthday';
return m.reply(await tr(`📝 *Registro Paso 4: Fecha de cumpleaños (Opcional)*\n\nPuedes enviar tu fecha de cumpleaños en formato DD/MM/YYYY (ejemplo: 30/10/2000)\n\n> O escribe "saltar" para omitir este paso.`));
}

if (user.regPhase === 'birthday') {
let birthday = null;

if (text !== 'saltar') {
let birthdayRegex = /^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/;
let match = text.match(birthdayRegex);

if (match) {
let day = parseInt(match[1]);
let month = parseInt(match[2]);
let year = match[3] ? parseInt(match[3]) : null;

if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
let formattedDay = day.toString().padStart(2, '0');
let formattedMonth = month.toString().padStart(2, '0');

if (year) {
let currentYear = new Date().getFullYear();
if (year > currentYear || year < 1900) {
return m.reply(await tr(`📝 *Año inválido*\n\nEl año debe estar entre 1900 y ${currentYear}\n\nIngresa en formato DD/MM/YYYY (ejemplo: 30/10/2005)\n\n> O escribe "saltar"`));
}
birthday = `${formattedDay}/${formattedMonth}/${year}`;
} else {
birthday = `${formattedDay}/${formattedMonth}`;
}}}

if (!birthday) {
return m.reply(await tr(`📝 *Formato inválido*\n\nIngresa en formato DD/MM/YYYY (ejemplo: 30/10/2005)\n\n> O escribe "saltar"`));
}}

if (birthday) user.birthday = birthday;
user.regPhase = null;
user.registered = true;
global.db.data.users[m.sender].money += 400;
global.db.data.users[m.sender].limit += 2;
global.db.data.users[m.sender].exp += 150;
if (user._regTimeout) clearTimeout(user._regTimeout);
delete user._regTimeout;
let sn = createHash('md5').update(m.sender).digest('hex');
let genderEmoji = user.gender === 'Hombre' ? '👨' : user.gender === 'Mujer' ? '👩' : '⚧';
await conn.sendMessage(m.chat, { text: `[ ✅ ${await tr("REGISTRO COMPLETADO")} ]

◉ *${await tr("Nombre")}:* ${user.name}
◉ *${await tr("Edad")}:* ${user.age} ${await tr("años")}
◉ *${await tr("Género")}:* ${user.gender} ${genderEmoji} ${user.birthday ? `\n◉ *${await tr("Cumpleaños")}:* ${user.birthday}` : ''}
◉ *${await tr("Idioma")}:* ${user.languageName || user.language.toUpperCase()}
◉ *${await tr("Hora")}:* ${time} 🇦🇷
◉ *${await tr("Fecha")}:* ${date} ${userNationality ? `\n◉ *${await tr("País")}:* ${userNationality}` : ''}
◉ *${await tr("Número")}:* wa.me/${who.split`@`[0]}
◉ *${await tr("Número de serie")}:*
⤷ ${sn}

🎁 *${await tr("Recompensa")}:*
⤷ 2 ${await tr("diamantes")} 💎
⤷ 400 ${await tr("Coins")} 🪙
⤷ 150 exp

*◉ ${await tr("Para ver los comandos del bot usar")}:*
${usedPrefix2}menu

◉ *${await tr("Total de usuarios registrados")}:* ${rtotalreg} 

> *${await tr("Mira tú registro en este canal")}*
${nnaa}`, contextInfo: { forwardedNewsletterMessageInfo: { newsletterJid: ['120363355261011910@newsletter', '120363297379773397@newsletter'].getRandom(), serverMessageId: '', newsletterName: 'LoliBot ✨' }, forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": `𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎`, "body": wm, "previewType": "PHOTO", thumbnail: img.getRandom(), sourceUrl: [nna, nna2, nn, md, yt, tiktok].getRandom()}}}, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
//await m.reply(`${sn}`);
let ppch = await conn.profilePictureUrl(who, 'image').catch(_ => imageUrl.getRandom()) 
await global.conn.sendMessage(global.ch.ch1, { text: `◉ *${await tr("Usuarios")}:* ${m.pushName || 'Anónimo'}  ${userNationality ? `\n◉ *${await tr("País")}:* ${userNationality}` : ''}
◉ *${await tr("Verificación")}:* ${user.name}
◉ *${await tr("Edad")}:* ${user.age} ${await tr("años")}
◉ *${await tr("Género")}:* ${user.gender} ${genderEmoji} ${user.birthday ? `\n◉ *${await tr("Cumpleaños")}:* ${user.birthday}` : ''}
◉ *${await tr("Idioma")}:* ${user.languageName || user.language.toUpperCase()}
◉ *${await tr("Fecha")}:* ${date}
◉ *Bot:* ${wm}
◉ *${await tr("Número de serie")}:*
⤷ ${sn}`, contextInfo: {
externalAdReply: {
title: "『 𝙉𝙊𝙏𝙄𝙁𝙄𝘾𝘼𝘾𝙄𝙊́𝙉 📢 』",
body: "Nuevo usuario registrado 🥳", 
thumbnailUrl: ppch, 
sourceUrl: [nna, nna2, nn, md, yt, tiktok].getRandom(),
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null }).catch(err => console.error(err));
delete user.regData;
}
}
handler.help = ['reg', 'verificar', 'myns', 'nserie', 'unreg']
handler.tags = ['rg']
handler.command = /^(nserie|unreg|sn|myns|verify|verificar|registrar|reg(ister)?)$/i
export default handler

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else {
        return number.toString();
    }
}
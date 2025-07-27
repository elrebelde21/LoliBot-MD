import { createHash } from 'crypto';
import moment from 'moment-timezone'
import { db } from '../lib/postgres.js';

const Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

const formatPhoneNumber = (jid) => {
  if (!jid) return null;
  const number = jid.replace('@s.whatsapp.net', '');
  if (!/^\d{8,15}$/.test(number)) return null;
  return `+${number}`;
};

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let fkontak = {key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" }, message: {contactMessage: {vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, participant: "0@s.whatsapp.net"};
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
//let ppch = await conn.profilePictureUrl(who, 'image').catch(_ => imageUrl.getRandom()) 
const date = moment.tz('America/Bogota').format('DD/MM/YYYY')
const time = moment.tz('America/Argentina/Buenos_Aires').format('LT')
let userNationality = null;
 try {
const phone = formatPhoneNumber(who);
if (phone) {
const response = await fetch(`${info.apis}/tools/country?text=${phone}`);
const data = await response.json();
userNationality = data.result ? `${data.result.name} ${data.result.emoji}` : null;
}} catch (err) {
userNationality = null;
}

const userResult = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [who]);
let user = userResult.rows[0] || { registered: false };
let name2 = m.pushName || 'loli'
const totalRegResult = await db.query(`SELECT COUNT(*) AS total FROM usuarios WHERE registered = true`);
const rtotalreg = parseInt(totalRegResult.rows[0].total);

if (command == 'verify' || command == 'reg' || command == 'verificar') {
if (user.registered) return m.reply(`*Ya estás registrado 🤨*`)
if (!Reg.test(text)) return m.reply(`*⚠️ ¿No sabes cómo usar este comando?* Usa de la siguiente manera:\n\n*${usedPrefix + command} nombre.edad*\n*• Ejemplo:* ${usedPrefix + command} ${name2}.16`)

let [_, name, splitter, age] = text.match(Reg);
if (!name) return m.reply('*¿Y el nombre?*')
if (!age) return m.reply('*La edad no puede estar vacía, agrega tu edad*')
if (name.length >= 45) return m.reply('*¿Qué?, ¿tan largo va a ser tu nombre?*')
age = parseInt(age);
if (age > 100) return m.reply('👴🏻 ¡Estás muy viejo para esto!')
if (age < 5) return m.reply('🚼 ¿Los bebés saben escribir? ✍️😳')

const sn = createHash('md5').update(m.sender).digest('hex');
await db.query(`INSERT INTO usuarios (id, nombre, edad, money, limite, exp, reg_time, registered, serial_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7, true, $8)
        ON CONFLICT (id) DO UPDATE
        SET nombre = $2,
            edad = $3,
            money = usuarios.money + $4,
            limite = usuarios.limite + $5,
            exp = usuarios.exp + $6,
            reg_time = $7,
            registered = true,
            serial_number = $8`, [m.sender, name.trim() + '✓', age, 400, 2, 150, new Date(), sn]);
const now = new Date();
await conn.sendMessage(m.chat, { text: `[ ✅ REGISTRO COMPLETADO ]

◉ *Nombre:* ${name}
◉ *Edad:* ${age} años
◉ *Hora:* ${time}
◉ *Fecha:* ${date} ${userNationality ? `\n◉ *País:* ${userNationality}` : ''}
◉ *Número:* wa.me/${who.split`@`[0]}
◉ *Número de serie:*
⤷ ${sn}

🎁 *Recompensa:*
⤷ 2 diamantes 💎
⤷ 400 Coins 🪙
⤷ 150 exp

*◉ Para ver los comandos del bot usar:*
${usedPrefix}menu

◉ *Total de usuarios registrados:* ${toNum(rtotalreg + 1)}`,
contextInfo: {
forwardedNewsletterMessageInfo: {
newsletterJid: '120363305025805187@newsletter',
serverMessageId: '',
newsletterName: 'LoliBot ✨️' },
forwardingScore: 9999999,
isForwarded: true,
externalAdReply: {
mediaUrl: info.md,
mediaType: 2,
showAdAttribution: false,
renderLargerThumbnail: false,
title: `𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎`,
body: 'LoliBot',
previewType: 'PHOTO',
thumbnailUrl: "https://telegra.ph/file/33bed21a0eaa789852c30.jpg",
sourceUrl: "https://www.youtube.com/@elrebelde.21"
}}}, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 1000, disappearingMessagesInChat: 24 * 60 * 1000 });
/*await conn.sendMessage("120363297379773397@newsletter", { text: `◉ *Usuarios:* ${m.pushName || 'Anónimo'} ${userNationality ? `\n◉ *País:* ${userNationality}` : ''}\n◉ *Verificación:* ${name}\n◉ *Edad:* ${age} años\n◉ *Fecha:* ${date}\n◉ *Bot:* LoliBot\n◉ *Número de serie:*\n⤷ ${sn}`,
contextInfo: { 
externalAdReply: {
title: "『 𝙉𝙊𝙏𝙄𝙁𝙄𝘾𝘼𝘾𝙄𝙊́𝙉 📢 』",
body: "Nuevo usuario registrado 🥳", 
thumbnailUrl: 'https://telegra.ph/file/33bed21a0eaa789852c30.jpg',
sourceUrl: "https://www.youtube.com/@elrebelde.21",
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}).catch(err => console.error("❌ Error enviando notificación al canal:", err));*/
}

if (command == 'nserie' || command == 'myns' || command == 'sn') {
if (!user.registered) return m.reply(`⚠️ *No estás registrado(a)*\n\nPara registrarte usa:\n*#reg nombre.edad*`);
const sn = user.serial_number || createHash('md5').update(m.sender).digest('hex');
await m.reply(sn);
}

if (command == 'unreg') {
if (!user.registered) return m.reply(`⚠️ *No estás registrado(a)*\n\nPara registrarte usa:\n*#reg nombre.edad*`);
if (!args[0]) return m.reply( `✳️ *Ingrese número de serie*\nVerifique su número de serie con el comando...\n\n*${usedPrefix}nserie*`)
const user2 = userResult.rows[0] || {};
const sn = user2.serial_number || createHash('md5').update(m.sender).digest('hex');
if (args[0] !== sn) return m.reply('⚠️ *Número de serie incorrecto*')
await db.query(`UPDATE usuarios
        SET registered = false,
            nombre = NULL,
            edad = NULL,
            money = money - 400,
            limite = limite - 2,
            exp = exp - 150,
            reg_time = NULL,
            serial_number = NULL
        WHERE id = $1`, [m.sender]);
await m.reply(`😢 Ya no estás registrado`)
}};
handler.help = ['reg <nombre.edad>', 'verificar <nombre.edad>', 'nserie', 'unreg <serial>'];
handler.tags = ['rg'];
handler.command = /^(nserie|unreg|sn|myns|verify|verificar|registrar|reg(ister)?)$/i;

export default handler;

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


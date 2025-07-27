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
const estados = {} 

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
const input = text.trim()
  const step = estados[who]?.step || 0
let name2 = m.pushName || 'loli'
const totalRegResult = await db.query(`SELECT COUNT(*) AS total FROM usuarios WHERE registered = true`);
const rtotalreg = parseInt(totalRegResult.rows[0].total);

if (command === 'reg' || command === 'verify' || command === 'verificar') {
if (user.registered) return m.reply(`*Ya estás registrado 🤨*`)
if (estados[who]?.step) return m.reply('⚠️ Ya tienes un registro en curso. Completa el registro respondiendo el paso anterior.')
if (!Reg.test(text)) return m.reply(`*⚠️ ¿No sabes cómo usar este comando?* Usa de la siguiente manera:\n\n*${usedPrefix + command} nombre.edad*\n*• Ejemplo:* ${usedPrefix + command} ${name2}.16`)

let [_, name, splitter, age] = text.match(Reg)
if (!name) return m.reply('*¿Y el nombre?*')
if (!age) return m.reply('*La edad no puede estar vacía, agrega tu edad*')
if (name.length >= 45) return m.reply('*¿Qué?, ¿tan largo va a ser tu nombre?*')
age = parseInt(age)
if (age > 100) return m.reply('👴🏻 ¡Estás muy viejo para esto!')
if (age < 5) return m.reply('🚼 ¿Los bebés saben escribir? ✍️😳')

estados[who] = { step: 1, nombre: name, edad: age, usedPrefix, userNationality }

return m.reply(`🧑 Registro Paso 2: ¿Cuál es tu género?\n\n1. Hombre ♂️\n2. Mujer ♀️\n3. Otro 🧬\n\n*Responde con el número*`)
}

if (command == 'nserie' || command == 'myns' || command == 'sn') {
if (!user.registered) return m.reply(`⚠️ *No estás registrado(a)*\n\nPara registrarte usa:\n*#reg nombre.edad*`);
const sn = user.serial_number || createHash('md5').update(m.sender).digest('hex');
await conn.fakeReply(m.chat, sn, '0@s.whatsapp.net', `⬇️ ᴇsᴛᴇ ᴇs sᴜs ɴᴜᴍᴇʀᴏ ᴅᴇʟ sᴇʀɪᴇ ⬇️`, 'status@broadcast')
//m.reply(sn);
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
await conn.fakeReply(m.chat, `😢 Ya no estas registrado`, '0@s.whatsapp.net', `ᴿᵉᵍᶦˢᵗʳᵒ ᵉˡᶦᵐᶦⁿᵃᵈᵒ`, 'status@broadcast')
}

if (command === 'setgenero') {
const genero = (args[0] || '').toLowerCase()
if (!['hombre', 'mujer', 'otro'].includes(genero)) return m.reply(`✳️ *Usa:*\n${usedPrefix}setgenero <hombre|mujer|otro>\n📌 Ej: *${usedPrefix}setgenero hombre*`)
const userResult = await db.query('SELECT * FROM usuarios WHERE id = $1', [who])
if (!userResult.rows[0]?.registered) return m.reply('⚠️ *Debes estar registrado para usar este comando.*')
await db.query('UPDATE usuarios SET gender = $1 WHERE id = $2', [genero, who])
return m.reply(`✅ *Género guardado:* ${genero}`)
}

if (command === 'setbirthday') {
let birthday = args.join(' ').trim()
if (!birthday) return m.reply(`✳️ *Usa:*\n${usedPrefix}setbirthday <fecha>\n📌 Ej: *${usedPrefix}setbirthday 30/10/2000*`)
if (birthday.toLowerCase() === 'borrar') {
await db.query('UPDATE usuarios SET birthday = NULL WHERE id = $1', [who])
return m.reply('✅ *Cumpleaños eliminado correctamente.*')
}
try {
const fecha = moment(birthday, ['DD/MM/YYYY', 'D [de] MMMM [de] YYYY'], true)
if (!fecha.isValid()) throw new Error('formato')
await db.query('UPDATE usuarios SET birthday = $1 WHERE id = $2', [fecha.format('YYYY-MM-DD'), who])
return m.reply(`✅ *Cumpleaños guardado:* ${birthday}`)
} catch {
return m.reply('❌ Formato inválido. Ej: 25/7/2009')
}}
}  

handler.before = async (m, { conn, usedPrefix }) => {
let fkontak = {key: { participants: "0@s.whatsapp.net", remoteJid: "status@broadcast", fromMe: false, id: "Halo" }, message: {contactMessage: {vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, participant: "0@s.whatsapp.net"};
  const who = m.sender
  const step = estados[who]?.step
  const input = (m.originalText || m.text || '').trim()
  const totalRegResult = await db.query(`SELECT COUNT(*) AS total FROM usuarios WHERE registered = true`);
const rtotalreg = parseInt(totalRegResult.rows[0].total);
  if (!step) return

  if (!m.text.startsWith(usedPrefix)) {
    if (step === 1) {
  let lower = input.toLowerCase()
  let genero = lower === '1' || lower === 'hombre'   ? 'hombre' : lower === '2' || lower === 'mujer'    ? 'mujer'  : lower === '3' || lower === 'otro'     ? 'otro'   : null
  if (!genero) return m.reply('⚠️ Responde con 1, 2, 3, hombre, mujer u otro para seleccionar tu género')
  estados[who].genero = genero
  estados[who].step = 2
  return m.reply(`🎂 *Registro Paso 3: Fecha de cumpleaños (Opcional)*\n\nPuedes enviar tu fecha de cumpleaños en formato DD/MM/YYYY (ejemplo: 30/10/2000)\n\n> O escribe "omitir" si no quieres decirlo`)
}
    if (step === 2) {
      let cumple = null
      let cumpleTexto = null
      if (input.toLowerCase() !== 'omitir') {
        try {
          const fecha = moment(input, ['DD/MM/YYYY', 'D [de] MMMM [de] YYYY'], true)
          if (!fecha.isValid()) throw new Error('invalid')
          cumple = fecha.format('YYYY-MM-DD')
          cumpleTexto = input
        } catch {
          return m.reply('❌ Formato inválido. Ej: 27/5/2009')
        }
      }
      const pref = estados[who]?.usedPrefix || '.'
const userNationality = estados[who]?.userNationality || ''
      const { nombre, edad, genero } = estados[who]
      const serial = createHash('md5').update(who).digest('hex')
      const reg_time = new Date()
      await db.query(`
        INSERT INTO usuarios (id, nombre, edad, gender, birthday, money, limite, exp, reg_time, registered, serial_number)
        VALUES ($1,$2,$3,$4,$5,400,2,150,$6,true,$7)
        ON CONFLICT (id) DO UPDATE
        SET nombre = $2, edad = $3, gender = $4, birthday = $5,
            money = usuarios.money + 400,
            limite = usuarios.limite + 2,
            exp = usuarios.exp + 150,
            reg_time = $6,
            registered = true,
            serial_number = $7
      `, [who, nombre + '✓', edad, genero, cumple, reg_time, serial])

      const date = moment.tz('America/Bogota').format('DD/MM/YYYY')
      const time = moment.tz('America/Argentina/Buenos_Aires').format('LT')

      delete estados[who]

      return await conn.sendMessage(m.chat, { text: `[ ✅ REGISTRO COMPLETADO ]

◉ *Nombre:* ${nombre}
◉ *Edad:* ${edad} años
◉ *Género:* ${genero} ${cumpleTexto ? `\n◉ *Cumpleaños:* ${cumpleTexto}` : ''}
◉ *Hora:* ${time}
◉ *Fecha:* ${date} ${userNationality ? `\n◉ *País:* ${userNationality}` : ''}
◉ *Número:* wa.me/${who.split('@')[0]}
◉ *Número de serie:*
⤷ ${serial}

🎁 *Recompensa:*
⤷ 2 diamantes 💎
⤷ 400 Coins 🪙
⤷ 150 exp

*◉ Para ver los comandos del bot usar:*
${pref}menu

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
sourceUrl: info.md
}}}, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 1000, disappearingMessagesInChat: 24 * 60 * 1000 });
    }
  }
}

handler.help = ['reg <nombre.edad>', 'verificar <nombre.edad>', 'nserie', 'unreg <serial>', 'setgenero', 'setbirthday'];
handler.tags = ['rg'];
handler.command = /^(setbirthday|setgenero|nserie|unreg|sn|myns|verify|verificar|registrar|reg(ister)?)$/i;

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


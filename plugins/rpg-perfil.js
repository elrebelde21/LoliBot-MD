import db from '../lib/database.js'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'

const languageNames = {
'es': 'Español',
'en': 'Inglés',
'pt': 'Portugués',
'fr': 'Francés',
'de': 'Alemán',
'it': 'Italiano',
'default': 'Desconocido'
};

let handler = async (m, { conn, usedPrefix, command}) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let bio = await conn.fetchStatus(who).catch(_ => 'undefined')
let biot = bio.status?.toString() || 'Sin Info'
let user = global.db.data.users[who]
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/9d38415096b6c46bf03f8.jpg')
let { exp, limit, name, registered, regTime, age, level } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let api = await axios.get(`${apis}/tools/country?text=${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}`)
let userNationalityData = api.data.result
let userNationality = userNationalityData ? `${userNationalityData.name} ${userNationalityData.emoji}` : 'Desconocido'
let img = await (await fetch(`${pp}`)).buffer()
let relacion = user.marry ? `💍 *${await tr("Esta en una relación con")}:* ${conn.getName(user.marry)}` : await tr('❌ *No estas en ninguna relación, solter@ 🤑.*')
let genderEmoji = user.gender === await tr('Hombre') ? '👨' : user.gender === await tr('Mujer') ? '👩' : '⚧';
//${user.marry.split('@')[0]}

let userLanguage = languageNames[user.language] || languageNames['default'];

let str = ` *「 ${await tr("PERFIL")} 」*
 
👤 *${await tr("Nombre")} :* ${name}
☎️ *${await tr("Número")} :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
🌐 *${await tr("Link")} :* wa.me/${who.split`@`[0]}
${genderEmoji} *${await tr("Género")}:* ${user.gender}  ${user.birthday ? `\n🎂 *${await tr("Cumpleaños")}:* ${user.birthday}` : ''}
💠 *${await tr("Idioma")}:* ${userLanguage}
🌎 *${await tr("Nacionalidad")} :* ${userNationality}
💎 *${await tr("Limite")} :* ${limit} 
⚙️ *${await tr("Nivel")} :* ${level}
◯ *${await tr("Registrado")} :* ${registered ? 'yes': 'No'}

${relacion}

*•━━━━⪻ ${await tr("PERFIL")} ⪼━━━━•*`
let mentionedJid = [who]
await conn.sendFile(m.chat, img, 'lp.jpg', str, m, false, { contextInfo: {forwardingScore: 9999999, isForwarded: true, mentionedJid, externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, renderLargerThumbnail: false, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}})
//conn.sendFile(m.chat, img, 'thumbnail.jpg', text, m)
}
handler.help = ['perfil', 'perfil *@user*']
handler.tags = ['rg']
handler.command = /^(perfil|profile)$/i
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function formatDate(n, locale = 'es-US') {
let d = new Date(n)
return d.toLocaleDateString(locale, {weekday: 'long',
day: 'numeric',
month: 'long',
year: 'numeric'
})}

function formatHour(n, locale = 'en-US') {
let d = new Date(n)
return d.toLocaleString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric',
hour12: true
})}


import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import { xpRange } from '../lib/levelling.js'
//import { plugins } from '../lib/plugins.js'
let tags = {'main': 'ℹ️ INFOBOT',
'jadibot': '✨ SER SUB BOT', 
'downloader': '🚀 DESCARGAS',
'game': '👾 JUEGOS', 
'gacha': '✨️ NEW - RPG GACHA',
'rg': '🟢 REGISTRO', 
'group': '⚙️ GRUPO',
'nable': '🕹 ENABLE/DISABLE', 
'nsfw': '🥵 COMANDO +18', 
'buscadores': '🔍 BUSCADORES', 
'sticker': '🧧 STICKER',  
'econ': '🛠 RPG',
'convertidor': '🎈 CONVERTIDORES',
'logo': '🎀 LOGOS',
//'prem': 'PREMIUM',
'tools': '🔧 HERRAMIENTA',
'randow': '🪄 RANDOW',
'efec': '🎙 EFECTO NOTA DE VOZ', 
//'cmd': 'DATABASE',
//'ansfw': 'NSFW ANIME',
'owner': '👑 OWNER', 
}
const defaultMenu = {
before: `「 %wm 」
 
Hola 👋🏻 *%name*
 
*• Fecha:* %fecha
*• Hora:* %hora (🇦🇷) 
*• Usuario:* %toUsers
*• Tiempo activos:* %muptime
%botOfc

*• Tu limite:* %limit
*• Nivel:* %level
*• Rango:* %role
*• Exp:* %totalexp XP 

*• Usuario registrados:* %toUserReg de %toUsers

${[`*\`✅ Activar tu bot 24/7 activo en SkyPlus\`*\nhttps://youtu.be/z2kHwbu8e8s?si=M9iHLdVv7yXe_dvJ`, `Unirte a nuestro canal de WhatsApp y informarte de todas la novedades/Actualizaciones del bot y mas\nhttps://whatsapp.com/channel/0029Vau57ykEwEk5CgosvU3v`, `❤ Seguirme el tiktok\nhttps://www.tiktok.com/@elrebelde.21`].getRandom()}

`.trimStart(),
header: ' `<[ %category ]>` ',
body: ' \n%cmd %islimit %isPremium',
footer: `\n`,
after: `
`,
}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
try {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let fecha = moment.tz('America/Bogota').format('DD/MM/YYYY')
let hora = moment.tz('America/Argentina/Buenos_Aires').format('LT')

let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)

let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)}) * 1000
}

let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let toUsers = `${toNum(totalreg)}`
let toUserReg = `${toNum(rtotalreg)}`
let botOfc = (conn.user.jid == global.conn.user.jid) ? `*• Bot Ofc:* wa.me/${global.conn.user.jid.split`@`[0]}` : `*• Soy un sub bot del:* wa.me/${global.conn.user.jid.split`@`[0]}`
let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
return {
help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
prefix: 'customPrefix' in plugin,
limit: plugin.limit,
premium: plugin.premium,
enabled: !plugin.disabled,
}})
for (let plugin of help)
if (plugin && 'tags' in plugin)
for (let tag of plugin.tags)
if (!(tag in tags) && tag) tags[tag] = tag
conn.menu = conn.menu ? conn.menu : {}
let before = conn.menu.before || defaultMenu.before
let header = conn.menu.header || defaultMenu.header
let body = conn.menu.body || defaultMenu.body
let footer = conn.menu.footer || defaultMenu.footer
let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
let _text = [before, ...Object.keys(tags).map(tag => {
return header.replace(/%category/g, tags[tag]) + '\n' + [...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
return menu.help.map(help => {
return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
.replace(/%islimit/g, menu.limit ? '(💎)' : '')
.replace(/%isPremium/g, menu.premium ? '(💵)' : '')
.trim()}).join('\n')
}),
footer
].join('\n')}),
after
].join('\n')
let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
let replace = {'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, toUsers, toUserReg, role,
readmore: readMore, 
fecha, 
hora, 
botOfc, 
wm
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

let pp = './Menu2.jpg'
conn.sendMessage(m.chat, { text: text,  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363355261011910@newsletter', 
serverMessageId: '', 
newsletterName: 'LoliBot ✨️' },
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid:[m.sender],  
externalAdReply: {  
showAdAttribution: true,  
renderLargerThumbnail: true,  
title: `${name} 👋`,
body: wm,
containsAutoReply: true,  
mediaType: 1,   
thumbnail: imagen, 
sourceUrl: [nna, nna2, nnaa].getRandom()
}}}, { quoted: m })
//conn.sendFile(m.chat, pp, 'menu.jpg', text.trim(), m, null, fake2)
m.react('🙌') 
} catch (e) {
m.react(`❌`) 
throw e
}}
handler.help = ['help']
handler.tags = ['main']
//handler.command = ['menucompleto', 'help', 'fullmenu'] 
handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|m|\?)$/i
handler.register = false
handler.exp = 3
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

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
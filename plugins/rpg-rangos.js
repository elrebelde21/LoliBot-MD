import { xpRange } from '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, command, args, usedPrefix: _p, __dirname, isOwner, text, isAdmin, isROwner }) => {
  
  
const { levelling } = '../lib/levelling.js'
//let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text }) => {

let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)

let d = new Date(new Date + 3600000)
let locale = 'es'
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
setTimeout(resolve, 1000)
}) * 1000
}
let { money } = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),

exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,

level, limit, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
  
  
//let name = await conn.getName(m.sender)
let pp = './media/menus/Menuvid3.mp4'
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
//let user = global.db.data.users[m.sender]
//user.registered = false

let menu = `
╭━━━〔 𝚁𝙰𝙽𝙶𝙾 | 𝚁𝙾𝙻 〕━━━⬣
𝙽𝙾𝙼𝙱𝚁𝙴
${username}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝚁𝙰𝙽𝙶𝙾 𝙰𝙲𝚃𝚄𝙰𝙻
${role}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
👑 *∞ 𝚎𝚕𝚒𝚝𝚎 𝚐𝚕𝚘𝚋𝚊𝚕* 💎🏁
👑 *𝚎𝚕𝚒𝚝𝚎 𝚐𝚕𝚘𝚋𝚊𝚕* 🏁
*𝚃𝚘𝚙 𝙰𝚜𝚝𝚛𝚊𝚕 I* ⚜️🔱
*𝚃𝚘𝚙 𝙰𝚜𝚝𝚛𝚊𝚕 II* ⚜️🔱
*𝚃𝚘𝚙 𝙰𝚜𝚝𝚛𝚊𝚕 III* ⚜️🔱
*𝙴𝚜𝚝𝚎𝚕𝚊𝚛 I* ☄️
*𝙴𝚜𝚝𝚎𝚕𝚊𝚛 II* ☄️
*𝙴𝚜𝚝𝚎𝚕𝚊𝚛 III* ☄️
*𝙻𝚎𝚢𝚎𝚗𝚍𝚊 I* 🏆
*𝙻𝚎𝚢𝚎𝚗𝚍𝚊 II* 🏆
*𝙻𝚎𝚢𝚎𝚗𝚍𝚊 III* 🏆
*𝙻𝚎𝚐𝚎𝚗𝚍𝚊𝚛𝚒𝚘(A) I* 🛡️
*𝙻𝚎𝚐𝚎𝚗𝚍𝚊𝚛𝚒𝚘(A) II* 🛡️
*𝙻𝚎𝚐𝚎𝚗𝚍𝚊𝚛𝚒𝚘(A) III* 🛡️
*𝚂𝚞𝚙𝚎𝚛 𝚙𝚛𝚘 I* 🎩
*𝚂𝚞𝚙𝚎𝚛 𝚙𝚛𝚘 II* 🎩
*𝚂𝚞𝚙𝚎𝚛 𝚙𝚛𝚘 III* 🎩
*𝙿𝚛𝚘 𝚎𝚗 𝚃𝚑𝚎 𝙻𝚘𝚕𝚒𝚋𝚘𝚝-𝙼𝙳 I* 😼
*𝙿𝚛𝚘 𝚎𝚗 𝚃𝚑𝚎 𝙻𝚘𝚕𝚒𝚋𝚘𝚝-𝙼𝙳 II* 😼
*𝙿𝚛𝚘 𝚎𝚗 𝚃𝚑𝚎 𝙻𝚘𝚕𝚒𝚋𝚘𝚝-𝙼𝙳 III* 😼
*𝙳𝚒𝚊𝚖𝚊𝚗𝚝𝚎 I* 💎
*𝙳𝚒𝚊𝚖𝚊𝚗𝚝𝚎 II* 💎
*𝙳𝚒𝚊𝚖𝚊𝚗𝚝𝚎 III* 💎
*𝙾𝚛𝚘 I* 🏅
*𝙾𝚛𝚘 II* 🏅
*𝙾𝚛𝚘 III* 🏅
*𝙿𝚕𝚊𝚝𝚊 I* 🔮
*𝙿𝚕𝚊𝚝𝚊 II* 🔮
*𝙿𝚕𝚊𝚝𝚊 III* 🔮
*𝙸𝚛𝚘𝚗 I* 🦾
*𝙸𝚛𝚘𝚗 II* 🦾
*𝙸𝚛𝚘𝚗 III* 🦾
*𝙼𝚊𝚎𝚜𝚝𝚛𝚘(A) I* ⚒️
*𝙼𝚊𝚎𝚜𝚝𝚛𝚘(A) II* ⚒️
*𝙼𝚊𝚎𝚜𝚝𝚛𝚘(A) III* ⚒️
*𝙴𝚡𝚙𝚕𝚘𝚛𝚊𝚍𝚘𝚛(A) I* 🪓
*𝙴𝚡𝚙𝚕𝚘𝚛𝚊𝚍𝚘𝚛(A) II* 🪓
*𝙴𝚡𝚙𝚕𝚘𝚛𝚊𝚍𝚘𝚛(A) III* 🪓
*𝙰𝚙𝚛𝚎𝚗𝚍𝚒𝚜 I* 🪚
*𝙰𝚙𝚛𝚎𝚗𝚍𝚒𝚜 II* 🪚
*𝙰𝚙𝚛𝚎𝚗𝚍𝚒𝚜 III* 🪚
*𝙽𝚘𝚟𝚊𝚝𝚘(A) I* 🪤
*𝙽𝚘𝚟𝚊𝚝𝚘(A) II* 🪤
*𝙽𝚘𝚟𝚊𝚝𝚘(A) III* 🪤
╰━━━━━━━━━━━━━━━━━━━⬣`.trim()
conn.sendMessage(m.chat, { 
text: menu, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[who],
"externalAdReply": {
"showAdAttribution": true,
"renderLargerThumbnail": true,
"thumbnail": gataImg.getRandom(), 
"title": `Tu rango es`, 
"containsAutoReply": true,
"mediaType": 1, 
"mediaUrl": nnn, 
"sourceUrl": nnn, 
}
}
}, { quoted: m })
//conn.sendHydrated(m.chat, menu, `𝙍𝘼𝙉𝙂𝙊𝙎 | ${wm}`, pp, 'https://github.com/GataNina-Li/GataBot-MD', '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [['𝙈𝙚𝙣𝙪́ 𝙘𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 💫', '.allmenu'],['𝙏𝙤𝙥𝙨 | 𝙍𝙖𝙣𝙠𝙞𝙣𝙜 🏆', `${usedPrefix}top`],['𝙈𝙚𝙣𝙪 𝙋𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡 | 𝙈𝙖𝙞𝙣 𝙢𝙚𝙣𝙪 ⚡', '#menu']], m,)
}
handler.help = ['infomenu'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^(rol|rango|roles|rangos)$/i
handler.register = true
handler.money = true
handler.level = 4
handler.exp = 50
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}

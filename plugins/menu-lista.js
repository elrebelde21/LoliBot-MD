/*import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
try{
let locale = 'es'
let d = new Date(new Date + 3600000)
let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })

let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime) 
wm = global.wm
vs = global.vs
      
let user = global.db.data.users[m.sender]
let { exp, diamond, registered, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let pareja = global.db.data.users[m.sender].pasangan 
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

const sections = [{
title: comienzo + ' ' + lenguajeGB['smsLista1']() + ' ' + fin,
rows: [
{title: lenguajeGB['smsLista2'](), rowId: `${usedPrefix}creadora`},
{title: lenguajeGB['smsLista4'](), rowId: `${usedPrefix}ping`},
{title: lenguajeGB['smsLista5'](), rowId: `${usedPrefix}infomenu`},
{title: lenguajeGB['smsLista6'](), rowId: `${usedPrefix}allmenu`},
{title: lenguajeGB['smsLista7'](), rowId: `${usedPrefix}instalarbot`},
{title: lenguajeGB['smsLista8'](), rowId: `${usedPrefix}serbot`},
{title: lenguajeGB['smsLista9'](), rowId: `${usedPrefix}términos`, description: '\n'}
]},{
title: comienzo + ' ' + lenguajeGB['smsLista10']() + ' ' + fin,
rows: [
{title: lenguajeGB['smsLista11'](), rowId: `${usedPrefix}lb`},
{title: lenguajeGB['smsLista12'](), rowId: `${usedPrefix}listavip`},
{title: lenguajeGB['smsLista13'](), rowId: `${usedPrefix}pase premium`},
{title: lenguajeGB['smsLista15'](), rowId: `${usedPrefix}rpgmenu`},
{title: lenguajeGB['smsLista16'](), rowId: `${usedPrefix}buy`},
]},{	
title: comienzo + ' ' + lenguajeGB['smsLista18']() + ' ' + fin,
rows: [
{title: lenguajeGB['smsLista19'](), rowId: `${usedPrefix}descargasmenu`},
{title: lenguajeGB['smsLista20'](), rowId: `${usedPrefix}buscarmenu`},
{title: lenguajeGB['smsLista21'](), rowId: `${usedPrefix}convertidormenu`},
{title: lenguajeGB['smsLista22'](), rowId: `${usedPrefix}audioefectomenu`, description: '\n'}
]},{
title: comienzo + ' ' + lenguajeGB['smsLista23']() + ' ' + fin,
rows: [
{title: lenguajeGB['smsLista24'](), rowId: `${usedPrefix}juegosmenu`},
{title: lenguajeGB['smsLista25'](), rowId: `${usedPrefix}audios`},
{title: lenguajeGB['smsLista26'](), rowId: `${usedPrefix}stickermenu`},
{title: lenguajeGB['smsLista27'](), rowId: `${usedPrefix}makermenu`},
{title: lenguajeGB['smsLista29'](), rowId: `${usedPrefix}randommenu`},
{title: lenguajeGB['smsLista30'](), rowId: `${usedPrefix}hornymenu`, description: '\n'}
]},{	
title: comienzo + ' ' + lenguajeGB['smsLista31']() + ' ' + fin,
rows: [
{title: lenguajeGB['smsLista32'](), rowId: `${usedPrefix}grupomenu`},
{title: lenguajeGB['smsLista33'](), rowId: `${usedPrefix}listas`},
{title: lenguajeGB['smsLista34'](), rowId: `${usedPrefix}enable`},
{title: lenguajeGB['smsLista35'](), rowId: `${usedPrefix}ownermenu`}
]}]


const listMessage = {
text: `┌──────────────
┆ *𝑻𝒉𝒆 𝑳𝒐𝒍𝒊𝑩𝒐𝒕-𝑴𝑫*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆✨ *𝙃𝙤𝙡𝙖 𝙘𝙤𝙢𝙤 𝙚𝙨𝙩𝙖́ ${name}!!*
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *𝘾𝙧𝙚𝙖𝙙𝙤𝙧 𝙙𝙚𝙡 𝙗𝙤𝙩: 𝙀𝙡 𝙧𝙚𝙗𝙚𝙡𝙙𝙚*
┆➤ *𝙉𝙪𝙢𝙚𝙧𝙤 𝙙𝙚𝙡 𝙘𝙧𝙚𝙖𝙙𝙤𝙧:* *wa.me/5492266466080 (No Bot)*  ${(conn.user.jid == global.conn.user.jid ? '' : `\n┆➤ *𝙎𝙤𝙮 𝙪𝙣 𝙨𝙪𝙗 𝙗𝙤𝙩 𝙙𝙚𝙡:* *wa.me/${global.conn.user.jid.split`@`[0]}*`) || '\n┆➤ *𝙉𝙪𝙢𝙚𝙧𝙤 𝙙𝙚𝙡 𝙗𝙤𝙩 𝙤𝙛𝙞𝙘𝙞𝙖𝙡:* *wa.me/573183650526*'}
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *${lenguajeGB['smsTime']()}*
┆□ ${time}    
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *${lenguajeGB['smsUptime']()}*
┆□ ${uptime}
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *${lenguajeGB['smsVersion']()}*
┆□ ${vs}
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *${lenguajeGB['smsTotalUsers']()}*
┆□ ${Object.keys(global.db.data.users).length} 
┆ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
┆➤ *${lenguajeGB['smsMode']()}*
┆□ ${global.opts['self'] ? `*${lenguajeGB['smsModePrivate']()}*` : `*${lenguajeGB['smsModePublic']()}*`}
└────ׂ─ׂ─ׂ─ׂ─────`, footer: `*» ${lenguajeGB['smsPareja']()} ➺ ${pareja ? `${name} 💞 ${conn.getName(pareja)}` : `😛 ${lenguajeGB['smsResultPareja']()}`}* 
» ${redesMenu.getRandom()}`, //${name} ${ucapan()} //lenguajeGB['smsMenu']()
title: null,
buttonText: `${lenguajeGB['smsListaMenu']()}`, 
sections }
await conn.sendMessage(m.chat, listMessage, {quoted: fkontak})	
      
} catch (e) {
await conn.sendButton(m.chat, `\n${wm}`, lenguajeGB['smsMalError3']() + '#report ' + usedPrefix + command, null, [[lenguajeGB.smsMensError1(), `#reporte ${lenguajeGB['smsMensError2']()} *${usedPrefix + command}*`]], m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)	
}}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|m|\?)$/i
//handler.register = true
handler.exp = 50
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  const time = moment.tz('America/Los_Angeles').format('HH')  //America/Los_Angeles  Asia/Jakarta   America/Toronto
  let res = `${lenguajeGB['smsSaludo']()}`
  if (time >= 4) {
    res = `${lenguajeGB['smsDia']()}`
  }
  if (time >= 11) {
    res = `${lenguajeGB['smsTarde']()}`
  }
  if (time >= 15) {
    res = `${lenguajeGB['smsTarde2']()}`
  }
  if (time >= 17) {
    res = `${lenguajeGB['smsNoche']()}`
  }
  return res
} 
*/

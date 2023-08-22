import { join } from 'path' 
import { promises } from 'fs'

let handler = async (m, { conn, args, usedPrefix, __dirname }) => {
const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}

let imgr = flaaa.getRandom()
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let user = global.db.data.users[m.sender]
    
if (user.health >= 100) return conn.sendButton(m.chat, `𝑻𝒖 𝒔𝒂𝒍𝒖𝒅 𝒆𝒔𝒕𝒂́ 𝒍𝒍𝒆𝒏𝒂 ❤️️`, wm, imgr + `𝒔𝒂𝒍𝒖𝒅: ${user.health}`, [
[`🏕️ 𝘼𝙑𝙀𝙉𝙏𝙐𝙍𝘼𝙍`, `${usedPrefix}adventure`], [`𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖𝙧 🏕️`, `${usedPrefix}adventure`]], fkontak, m)
    
const heal = 40 + (user.cat * 4)
let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((90 - user.health) / heal)))) * 1
    
if (user.potion < count) return conn.sendButton(m.chat,`${htki} 𝑺𝒊𝒏 𝒑𝒐𝒓𝒄𝒊𝒐𝒏𝒆𝒔 ${htka}`, 
`𝑵𝒆𝒄𝒆𝒔𝒊𝒕𝒂 ${count - user.potion} 𝑷𝒐𝒄𝒊𝒐́𝒏 🥤 𝑷𝒂𝒓𝒂 𝒄𝒖𝒓𝒂𝒓𝒕𝒆

𝑺𝒂𝒍𝒖𝒅 :  » ${user.health} ❤️
𝑷𝒐𝒄𝒊𝒐́𝒏 :  » ${user.potion} 🥤

𝑪𝒐𝒎𝒑𝒓𝒂𝒓 𝑷𝒐𝒄𝒊𝒐́𝒏 𝒐 𝒑𝒊́𝒅𝒆𝒍𝒆 𝒂𝒍 𝒂𝒍𝒈𝒖𝒊𝒆𝒏 𝒒𝒖𝒆 𝒕𝒆 𝒕𝒓𝒂𝒏𝒔𝒇𝒊𝒆𝒓𝒂
`.trim(), imgr + 'POCION BAJA', [
[`𝘾𝙤𝙢𝙥𝙧𝙖𝙧 𝙋𝙤𝙘𝙞𝙤𝙣 🥤`, `${usedPrefix}buy potion ${count - user.potion}`],
[`𝙋𝙚𝙙𝙞𝙧 𝘼𝙮𝙪𝙙𝙖 ☘️`, `${usedPrefix}pedirayuda *Por Favor alguien ayudeme con ${count - user.potion} de POCION* 🥤 
*» AYUDA TRANSFIRIENDO:*
*${usedPrefix}transfer potion ${count - user.potion}* @${conn.getName(m.sender)}`]], fkontak, m)
  
    user.potion -= count * 1 //1 potion = count (1) 
    user.health += heal * count
    
conn.sendButton(m.chat, `*━┈━《 ✅ 𝑺𝒂𝒍𝒖𝒅 𝒄𝒐𝒎𝒑𝒍𝒆𝒕𝒂 》━┈━*`, `𝑬𝒙𝒊𝒔𝒕𝒐𝒔𝒂𝒎𝒆𝒏𝒕𝒆 𝒖𝒔𝒐 ${count} 𝑫𝒆 𝒑𝒐𝒄𝒊𝒐́𝒏 🥤 𝑫𝒆 𝒑𝒐𝒄𝒊𝒐́𝒏 𝒑𝒂𝒓𝒂 𝒓𝒆𝒄𝒖𝒑𝒆𝒓𝒂𝒓 𝒔𝒖 𝒔𝒂𝒍𝒖𝒅\n\n𝒔𝒂𝒍𝒖𝒅 : » ${user.health} ❤️`, imgr + 'SALUD COMPLETADA', [
[`𝘼𝙫𝙚𝙣𝙩𝙪𝙧𝙖𝙧 🏕️`, `${usedPrefix}adventure`]], fkontak, m)
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal|curar)$/i
handler.level = 3
handler.register = true

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}

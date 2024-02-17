import TicTacToe from '../lib/tictactoe.js' 
let timeout = 60000
let poin = 600 
let poin_lose = -100
let poin_bot = 200
global.suit = global.suit ? global.suit : {}
//import MessageType from '@adiwajshing/baileys'
let MessageType = (await import(global.baileys)).default
let handler = async (m, { conn, text, command, usedPrefix, args }) => { 
let pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg'
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
if (!db.data.chats[m.chat].game) throw `${lenguajeGB['smsAvisoAG']()}𝙇𝙊𝙎 𝙅𝙐𝙀𝙂𝙊𝙎 𝙀𝙎𝙏𝘼𝙎 𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝘼𝘿𝙊 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊, 𝙎𝙄 𝙀𝙍𝙀𝙎 𝘼𝘿𝙈𝙄𝙉𝙎 𝙋𝙐𝙀𝘿𝙀 𝘼𝘾𝙏𝙄𝙑𝘼𝙍𝙇𝙊 𝘾𝙊𝙉 : #on juegos`  
try {

if (command == 'ppt' || command == 'pvp' || command == 'suit') {
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) throw `${lenguajeGB['smsAvisoAG']()}𝙏𝙚𝙧𝙢𝙞𝙣𝙖 𝙩𝙪 𝙥𝙖𝙧𝙩𝙞𝙙𝙖 𝙖𝙣𝙩𝙚𝙨 𝙙𝙚 𝙞𝙣𝙞𝙘𝙞𝙖 𝙤𝙩𝙧𝙖`
let textquien = `${lenguajeGB['smsAvisoMG']()}𝘼 𝙦𝙪𝙞𝙚𝙣 𝙦𝙪𝙞𝙚𝙧𝙚𝙨 𝙙𝙚𝙨𝙖𝙛𝙞𝙖𝙧? 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖 𝙖 𝙪𝙣𝙖 𝙥𝙚𝙧𝙨𝙤𝙣𝙖\n\n*𝙀𝙟:* ${usedPrefix + command} @0`
if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)}, {quoted: fkontak })
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `${lenguajeGB['smsAvisoIIG']()}𝙇𝙖 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 𝙖 𝙡𝙖 𝙦𝙪𝙚 𝙦𝙪𝙞𝙚𝙧𝙚𝙨 𝙙𝙚𝙨𝙖𝙛𝙞𝙖𝙧 𝙖 𝙪𝙣 𝙚𝙨𝙩𝙖 𝙟𝙪𝙜𝙖𝙣𝙙𝙤 𝙤𝙩𝙧𝙖 𝙥𝙖𝙧𝙩𝙞𝙙𝙖, 𝙀𝙨𝙥𝙚𝙧𝙚 𝙖 𝙦𝙪𝙚 𝙩𝙚𝙧𝙢𝙞𝙣𝙚 𝙙𝙚 𝙟𝙪𝙜𝙖𝙧`
let id = 'suit_' + new Date() * 1
let caption = `${lenguajeGB['smsAvisoIIG']()}🎮👾 𝙂𝘼𝙈𝙀𝙎 - 𝙋𝙑𝙋 - 𝙂𝘼𝙈𝙀𝙎 🎮👾\n\n@${m.sender.split`@`[0]} 𝘿𝙀𝙎𝘼𝙁𝙄𝘼 𝘼 @${m.mentionedJid[0].split`@`[0]} 𝘼 𝙐𝙉 (𝙋𝙑𝙋) 𝘿𝙀 𝙋𝙄𝙀𝘿𝙍𝘼, 𝙋𝘼𝙋𝙀𝙇 𝙊 𝙏𝙄𝙅𝙀𝙍𝘼\n\n> _*Escribe (aceptar) para aceptar*_\n> _*Escribe (rechazar) para rechazar*_`
let imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`
conn.suit[id] = {
chat: await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender, m.mentionedJid]}),
//await conn.sendButton(m.chat, caption, footer, imgplaygame, [[`Aceptar`], [`Rechazar`]], null, {mentions: conn.parseMention(caption)}),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (conn.suit[id]) conn.reply(m.chat, `${lenguajeGB['smsAvisoAG']()}⏳ 𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀 𝙀𝙎𝙋𝙀𝙍𝘼 𝙁𝙄𝙉𝘼𝙇𝙄𝙕𝘼𝘿𝙊, 𝙀𝙇 𝙋𝙑𝙋 𝙎𝙀 𝘾𝘼𝙉𝘾𝙀𝙇𝘼 𝙋𝙊𝙍 𝙁𝘼𝙇𝙏𝘼 𝘿𝙀 𝙍𝙀𝙎𝙋𝙐𝙀𝙎𝙏𝘼`, m)
delete conn.suit[id]}, timeout), poin, poin_lose, poin_bot, timeout
}}

if (command == 'slot'  || command == 'apostar' || command == 'slot1' || command == 'slot2' || command == 'slot3') {
let fa = `${mg}𝙐𝙨𝙖𝙧 𝙙𝙚𝙡 𝙡𝙖 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙢𝙖𝙣𝙚𝙧𝙖:

𝙀𝙟𝙚𝙢𝙥𝙡𝙤:
*${usedPrefix + command} 50*`.trim()

if (!args[0]) throw fa
if (isNaN(args[0])) throw fa
let apuesta = parseInt(args[0])

let users = global.db.data.users[m.sender]

if (apuesta < 10) throw `${lenguajeGB['smsAvisoAG']()}𝐃𝐞𝐛𝐞𝐬 𝐝𝐞𝐥 𝐚𝐩𝐨𝐬𝐭𝐚𝐫 𝐮𝐧 𝐦𝐢𝐧𝐢𝐦𝐨𝐬 𝐝𝐞 *10*`

if (users.exp < apuesta) {
throw `${lenguajeGB['smsAvisoFG']()}𝐍𝒐 𝒂𝒍𝒄𝒂𝒏𝒛𝒂 𝒑𝒂𝒓𝒂 𝒂𝒑𝒐𝒔𝒕𝒂𝒓 𝒆𝒙𝒑, 𝒍𝒆 𝒓𝒆𝒄𝒐𝒎𝒊𝒆𝒏𝒅𝒐 𝒊𝒏𝒕𝒆𝒓𝒂𝒄𝒕𝒖𝒂𝒓 𝒄𝒐𝒏 𝒆𝒍 𝒃𝒐𝒕 𝒑𝒂𝒓𝒂 𝒐𝒃𝒕𝒆𝒏𝒆𝒓 𝒎𝒂́𝒔 𝒓𝒆𝒄𝒖𝒓𝒔𝒐𝒔`    
}
if (command == 'slot1') {
let time = global.db.data.users[m.sender].lastslot + 60000
if (new Date - users.lastslot < 60000) throw `*𝐕𝐮𝐞𝐥𝐯𝐚 𝐞𝐧: ${msToTime(time - new Date())} 𝐏𝐚𝐫𝐚 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐚𝐫 𝐚𝐩𝐨𝐬𝐭𝐚𝐧𝐝𝐨 𝐞𝐱𝐩* 🎰`
users.lastslot = new Date * 1
    
let emojis = ["💎", "⚡", "🪙"];
let a = Math.floor(Math.random() * emojis.length);
let b = Math.floor(Math.random() * emojis.length);
let c = Math.floor(Math.random() * emojis.length);
let x = [],
y = [],
z = [];
for (let i = 0; i < 3; i++) {
x[i] = emojis[a];
a++;
if (a == emojis.length) a = 0;
}
for (let i = 0; i < 3; i++) {
y[i] = emojis[b];
b++;
if (b == emojis.length) b = 0;
}
for (let i = 0; i < 3; i++) {
z[i] = emojis[c];
c++;
if (c == emojis.length) c = 0;
}
let end;
if (a == b && b == c) {
end = `✨ *QUE PRO!! HAS GANADO +${apuesta + apuesta} EXP*`
users.exp += apuesta
} else if (a == b || a == c || b == c) {
end = `🙀 *CASI!!, VUELVA A INTENTAR*\n*BONO DE +50 EXP*`
users.exp += 50
} else {
end = `😿 *HA PERDIDO!! ❌ -${apuesta} EXP*`
users.exp -= apuesta
}
await delay(5000)
let s = `🎰 | *RANURAS* | 🎰 
 ────────
  ${x[0]} : ${y[0]} : ${z[0]}
  ${x[1]} : ${y[1]} : ${z[1]}
  ${x[2]} : ${y[2]} : ${z[2]}
 ────────
🎰 |   *SLOTS*   | 🎰

${end}`
await conn.reply(m.chat, s, m)}

if (users.money < apuesta)  { 
throw `${lenguajeGB['smsAvisoFG']()}𝑵𝒐 𝒂𝒍𝒄𝒂𝒏𝒛𝒂 𝒑𝒂𝒓𝒂 𝒂𝒑𝒐𝒔𝒕𝒂𝒓 𝑳𝒐𝒍𝒊𝒄𝒐𝒊𝒏𝒔, 𝒍𝒆 𝒓𝒆𝒄𝒐𝒎𝒊𝒆𝒏𝒅𝒐 𝒊𝒏𝒕𝒆𝒓𝒂𝒄𝒕𝒖𝒂𝒓 𝒄𝒐𝒏 𝒆𝒍 𝒃𝒐𝒕 𝒑𝒂𝒓𝒂 𝒐𝒃𝒕𝒆𝒏𝒆𝒓 𝒎𝒂́𝒔 𝒓𝒆𝒄𝒖𝒓𝒔𝒐𝒔`    
}
if (command == 'slot2') {
let time = global.db.data.users[m.sender].lastslot + 60000
if (new Date - users.lastslot < 60000) throw `*𝐕𝐮𝐞𝐥𝐯𝐚 𝐞𝐧:${msToTime(time - new Date())} 𝐏𝐚𝐫𝐚 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐚𝐫 𝐚𝐩𝐨𝐬𝐭𝐚𝐧𝐝𝐨 𝐋𝐨𝐥𝐢𝐂𝐨𝐢𝐧𝐬* 🎰`
users.lastslot = new Date * 1
    
let emojis = ["🪙", "🔮", "🧿"];
let a = Math.floor(Math.random() * emojis.length);
let b = Math.floor(Math.random() * emojis.length);
let c = Math.floor(Math.random() * emojis.length);
let x = [],
y = [],
z = [];
for (let i = 0; i < 3; i++) {
x[i] = emojis[a];
a++;
if (a == emojis.length) a = 0;
}
for (let i = 0; i < 3; i++) {
y[i] = emojis[b];
b++;
if (b == emojis.length) b = 0;
}
for (let i = 0; i < 3; i++) {
z[i] = emojis[c];
c++;
if (c == emojis.length) c = 0;
}
let end;
if (a == b && b == c) {
end = `✨ *QUE PRO!! HAS GANADO +${apuesta + apuesta} GataCoins*`
users.money += apuesta
} else if (a == b || a == c || b == c) {
end = `🙀 *CASI!!, VUELVA A INTENTAR*\n*BONO DE +30 LoliCoins*`
users.money += 30
} else {
end = `😿 *HA PERDIDO!! ❌ -${apuesta} LoliCoins*`
users.money -= apuesta
}
//users.lastslot = new Date * 1
//return await m.reply(
    //    `
await delay(5000)
let ss = `
🎰 | *RANURAS* | 🎰 
 ────────
  ${x[0]} : ${y[0]} : ${z[0]}
  ${x[1]} : ${y[1]} : ${z[1]}
  ${x[2]} : ${y[2]} : ${z[2]}
 ────────
🎰 |   *SLOTS*   | 🎰\n\n${end}`
await conn.reply(m.chat, ss, m)}
    
if (users.limit < apuesta) {  
throw `${lenguajeGB['smsAvisoFG']()}𝑵𝒐 𝒂𝒍𝒄𝒂𝒏𝒛𝒂 𝒑𝒂𝒓𝒂 𝒂𝒑𝒐𝒔𝒕𝒂𝒓 𝑫𝒊𝒂𝒎𝒂𝒏𝒕𝒆, 𝒍𝒆 𝒓𝒆𝒄𝒐𝒎𝒊𝒆𝒏𝒅𝒐 𝒊𝒏𝒕𝒆𝒓𝒂𝒄𝒕𝒖𝒂𝒓 𝒄𝒐𝒏 𝒆𝒍 𝒃𝒐𝒕 𝒑𝒂𝒓𝒂 𝒐𝒃𝒕𝒆𝒏𝒆𝒓 𝒎𝒂́𝒔 𝒓𝒆𝒄𝒖𝒓𝒔𝒐𝒔`    
}
if (command == 'slot3') {
let time = global.db.data.users[m.sender].lastslot + 30000
if (new Date - users.lastslot < 30000) throw `*𝐕𝐮𝐞𝐥𝐯𝐚 𝐞𝐧: ${msToTime(time - new Date())} 𝐏𝐚𝐫𝐚 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐚𝐫 𝐚𝐩𝐨𝐬𝐭𝐚𝐧𝐝𝐨 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞* 🎰`
users.lastslot = new Date * 1
    
let emojis = ["🪙", "💣", "💎"];
let a = Math.floor(Math.random() * emojis.length);
let b = Math.floor(Math.random() * emojis.length);
let c = Math.floor(Math.random() * emojis.length);
let x = [],
y = [],
z = [];
for (let i = 0; i < 3; i++) {
x[i] = emojis[a];
a++;
if (a == emojis.length) a = 0;
}
for (let i = 0; i < 3; i++) {
y[i] = emojis[b];
b++;
if (b == emojis.length) b = 0;
}
for (let i = 0; i < 3; i++) {
z[i] = emojis[c];
c++;
if (c == emojis.length) c = 0;
}
let end;
if (a == b && b == c) {
end = `✨ *QUE PRO!! HAS GANADO +${apuesta + apuesta} Diamantes*`
users.limit += apuesta
} else if (a == b || a == c || b == c) {
end = `🙀 *CASI!!, VUELVA A INTENTAR*\n*BONO DE +2 Diamantes*`
users.limit += 2
} else {
end = `😿 *HA PERDIDO!! ❌ -${apuesta} Diamantes*`
users.limit -= apuesta
}
//users.lastslot = new Date * 1
//return await m.reply(
    //    `
await delay(3000)
let sss = `🎰 | *RANURAS* | 🎰 
 ────────
  ${x[0]} : ${y[0]} : ${z[0]}
  ${x[1]} : ${y[1]} : ${z[1]}
  ${x[2]} : ${y[2]} : ${z[2]}
 ────────
🎰 |   *SLOTS*   | 🎰\n\n${end}`
await conn.reply(m.chat, sss, m)}
        
if (command == 'slot') {       
await conn.reply(m.chat, `*Elija en que apostará ${apuesta}*\n\n⚡ Exp:\n${usedPrefix}slot1 ${apuesta}\n\n🪙 Lolicoins:\n${usedPrefix}slot2 ${apuesta}\n\n💎 diamante:\n${usedPrefix}slot3 ${apuesta}`, m)}

if (command == 'apostar') {       
await conn.reply(m.chat, `*Elija en que apostará ${apuesta}*\n\n⚡Exp:\n${usedPrefix}slot1 ${apuesta}\n🪙 Lolicoins:\n${usedPrefix}slot2 ${apuesta}\n💎 Diamante:\n${usedPrefix}slot3 ${apuesta}`, m)}
}

if (command == 'tictactoe' || command == 'ttc' || command == 'ttt' || command == 'xo') {
conn.game = conn.game ? conn.game : {}
if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw `${lenguajeGB['smsAvisoAG']()}𝙏𝙤𝙙𝙖𝙫𝙞𝙖 𝙖𝙡𝙜𝙪𝙞𝙚𝙣 𝙚𝙨𝙩𝙖 𝙟𝙪𝙜𝙖𝙣𝙙𝙤 𝙚𝙣 𝙡𝙖 𝙨𝙖𝙡𝙖 𝙨𝙞 𝙦𝙪𝙞𝙚𝙧𝙚 𝙖𝙗𝙖𝙣𝙙𝙤𝙣𝙖𝙧 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 *salir*\n𝙏𝙖𝙢𝙗𝙞𝙚𝙣 𝙥𝙪𝙚𝙙𝙚𝙨 𝙚𝙡𝙞𝙢𝙞𝙣𝙖𝙧 𝙡𝙖 𝙨𝙖𝙡𝙖 𝙪𝙨𝙖𝙣𝙙𝙤 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 *${usedPrefix}delttt*`
if (!text) throw `*${lenguajeGB['smsAvisoFG']()}𝘿𝙚𝙗𝙚 𝙙𝙚 𝙖𝙜𝙧𝙚𝙜𝙖 𝙪𝙣 𝙣𝙤𝙢𝙗𝙧𝙚 𝙖 𝙡𝙖 𝙨𝙖𝙡𝙖\n𝙀𝙟𝙚𝙢𝙥𝙡𝙤\n${usedPrefix + command} Sala bot*`
let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true)) 
if (room) {
await conn.reply(m.chat, `${lenguajeGB['smsAvisoEG']()}𝘼𝙡𝙜𝙪𝙞𝙚𝙣 𝙨𝙚 𝙝𝙖 𝙪𝙣𝙞𝙙𝙤 𝙖 𝙡𝙖 𝙨𝙖𝙡𝙖 *${text}*\n𝙔𝙖 𝙥𝙪𝙚𝙙𝙚𝙣 𝙟𝙪𝙜𝙖𝙧!! 😼`, fkontak, m)
await conn.reply(m.chat, `${lenguajeGB['smsAvisoRG']()}⭕️ *Clásico Juego del Gato, 3 en raya o tateti* ❌\n\n*¿Cómo jugar?*\n_Responde al Juego con un Número, el mensaje debe contener la posiscion en la que quieras estar (1,2,3,4,5,6,7,8,9)_`, fkontak, m)

room.o = m.chat
room.game.playerO = m.sender
room.state = 'PLAYING'
let arr = room.game.render().map(v => {
return {
X: '❎',
O: '⭕',
1: '1️⃣',
2: '2️⃣',
3: '3️⃣',
4: '4️⃣',
5: '5️⃣',
6: '6️⃣',
7: '7️⃣',
8: '8️⃣',
9: '9️⃣',
}[v]})
let str = `💖 𝙅𝙪𝙚𝙜𝙤 𝙩𝙖𝙩𝙚𝙩𝙞
🫂 𝙅𝙪𝙜𝙖𝙙𝙤𝙧𝙚𝙨:
*┈┈┈┈┈┈┈┈┈*
❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}
*┈┈┈┈┈┈┈┈┈*
     ${arr.slice(0, 3).join('')}
     ${arr.slice(3, 6).join('')}
     ${arr.slice(6).join('')}
*┈┈┈┈┈┈┈┈┈*
𝙏𝙪𝙧𝙣𝙤 𝙙𝙚:
@${room.game.currentTurn.split('@')[0]}
`.trim()

if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: this.parseMention(str)}, { quoted: fkontak, m })
await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str)}, { quoted: fkontak, m })
        
} else {
room = {
id: 'tictactoe-' + (+new Date),
x: m.chat,
o: '',
game: new TicTacToe(m.sender, 'o'),
state: 'WAITING' }
        
if (text) room.name = text     
let imgplay = `https://img.freepik.com/vector-premium/juego-tres-raya-icono-contorno-lineal-neon_7280-2422.jpg`
conn.sendMessage(m.chat, { image: { url: imgplay }, caption: `😼 𝙅𝙪𝙚𝙜𝙤𝙨 𝙏𝙖𝙩𝙚𝙩𝙞

🐈 𝙀𝙨𝙥𝙚𝙧𝙖𝙣𝙙𝙤 𝙖𝙡 𝙨𝙚𝙜𝙪𝙣𝙙𝙤 𝙟𝙪𝙜𝙖𝙙𝙤𝙧 𝙥𝙪𝙚𝙙𝙚 𝙞𝙣𝙜𝙧𝙚𝙨𝙖 𝙪𝙨𝙖𝙣𝙙𝙤 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤
*${usedPrefix + command} ${text}*

𝙎𝙞 𝙦𝙪𝙞𝙚𝙧𝙚𝙨 𝙖𝙗𝙖𝙣𝙙𝙤𝙣𝙖𝙧 𝙡𝙖 𝙨𝙖𝙡𝙖 𝙪𝙨𝙖 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 
*${usedPrefix}delttt*` }, { mentions: conn.parseMention(text), quoted: fkontak })
conn.game[room.id] = room
}}

if (command == 'math' || command == 'mates' || command == 'matemáticas') {
// 60000 = 1 minuto // 30000 = 30 segundos // 15000 = 15 segundos // 10000 = 10 segundos
let time = global.db.data.users[m.sender].wait + 60000
if (new Date - global.db.data.users[m.sender].wait < 60000) return await conn.reply(m.chat, `*🕓 𝙀𝙎𝙋𝙀𝙍𝘼 ${Math.floor((time - new Date()) / 1000)} 𝙎𝙀𝙂𝙐𝙉𝘿𝙊𝙎 𝘼𝙉𝙏𝙀𝙎 𝘿𝙀 𝙑𝙊𝙇𝙑𝙀𝙍  𝘼 𝙅𝙐𝙂𝘼𝙍*`, fkontak, m)
let mat = `${lenguajeGB['smsAvisoIIG']()}✨ 𝙋𝙪𝙚𝙙𝙚 𝙚𝙨𝙘𝙧𝙞𝙗𝙞 𝙡𝙖 𝙙𝙞𝙛𝙞𝙘𝙪𝙡𝙩𝙖𝙙

*Nivel del dificultad*
${Object.keys(modes).join('  |  ')}

*Ejemplo:*
${usedPrefix + command} noob
${usedPrefix + command} impossible2

😼 *Mientras mas dificultad mayor recompensa*`.trim()
if (args.length < 1) return await conn.reply(m.chat, mat, fkontak, m)

let mode = args[0].toLowerCase()
if (!(mode in modes)) return await conn.reply(m.chat, mat, fkontak, m) 

let id = m.chat
if (id in global.math) return conn.reply(m.chat, `${lenguajeGB['smsAvisoAG']()}*ᴛᴏᴅᴀᴠɪᴀ ʜᴀʏ ᴘʀᴇɢᴜɴᴛᴀ sɪɴ ʀᴇsᴘᴏɴᴅᴇʀ ᴇʟ ᴇsᴛᴇ ᴄʜᴀᴛ!!*`, global.math[id][0])
//let ii = global.db.data.users[m.sender].limit += 10 math.dia
let math = genMath(mode)
global.math[id] = [
await conn.reply(m.chat, `╭┄〔 *${wm}* 〕┄⊱
┆𝘾𝙪𝙖𝙡 𝙚𝙨 𝙧𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤 𝙙𝙚: *${math.str} = ?*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🧭 𝙏𝙞𝙚𝙢𝙥𝙤: *${(math.time / 1000).toFixed(0)} segundos*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆𝙍𝙚𝙨𝙥𝙤𝙣𝙙𝙚 𝙖 𝙚𝙨𝙩𝙚 𝙢𝙚𝙣𝙨𝙖𝙟𝙚 𝙮 𝙂𝙖𝙣𝙖 
┆🏆 *${math.bonus}: XP*
╰━━━⊰ 𓃠 ${vs} ⊱━━━━დ`, m),
math, 4,
  
//await conn.reply(m.chat, `⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝘼𝙍𝙍𝙄𝘽𝘼 𝘾𝙊𝙉 𝙇𝘼 𝙍𝙀𝙎𝙋𝙐𝙀𝙎𝙏𝘼\n\n𝘼𝙉𝙎𝙒𝙀𝙍 𝙏𝙃𝙀 𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝘼𝘽𝙊𝙑𝙀 𝙏𝙊 𝙆𝙉𝙊𝙒 𝙔𝙊𝙐𝙍 𝘼𝙉𝙎𝙒𝙀𝙍\n\n${wm}`, fkontak, m), math, 4,
setTimeout(() => { 
if (global.math[id]) conn.reply(m.chat, `${lenguajeGB['smsAvisoAG']()}sᴇ ᴀᴄᴀʙᴏ ᴇʟ ᴛɪᴇᴍᴘᴏ ʟᴀ ʀᴇsᴘᴜᴇsᴛᴀ ᴇs *${math.result}*`, global.math[id][0])
delete global.math[id]
}, math.time)
]
global.db.data.users[m.sender].wait = new Date * 1
}

if (command == 'delttt' || command == 'deltt' || command == 'delxo' || command == 'deltictactoe') {
let room = Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))
if (room == undefined) return await conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}𝙉𝙊 𝙀𝙎𝙏𝘼𝙎 𝙀𝙉 𝙉𝙄𝙉𝙂𝙐𝙉𝘼 𝙋𝘼𝙍𝙏𝙄𝘿𝘼 𝙀𝙉 𝙀𝙇 𝙅𝙐𝙀𝙂𝙊 𝙏𝙍𝙀𝙎 𝙀𝙉 𝙍𝘼𝙔𝘼\n\n💫 𝙄𝙉𝙄𝘾𝙄𝘼𝙍 𝙋𝘼𝙍𝙏𝙄𝘿𝘼 (${usedPrefix}ttt sala nueva)`, fkontak, m)
delete conn.game[room.id]

await conn.reply(m.chat, `${lenguajeGB['smsAvisoEG']()}𝙇𝘼 𝙎𝘼𝙇𝘼 𝙏𝙍𝙀𝙎 𝙀𝙉 𝙍𝘼𝙔𝘼 𝙁𝙐𝙀 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝘿𝘼`, fkontak, m)
}} catch (e) {
await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`)
console.log(e)}}
handler.help = ['ppt']
handler.tags = ['games']
handler.command = /^(ppt|suitpvp|moneda|suert|currency|luck|cara|Method|slot|apostar|slot1|slot2|slot3|tictactoe|ttc|ttt|xo|math|mates|matemáticas|delttt|deltt|delxo|deltictactoe)$/i
handler.group = true
handler.game = true
handler.register = true
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m " + seconds + " s " 
}

let modes = {
noob: [-3, 3,-3, 3, '+-', 15000, 30], 
easy: [-10, 10, -10, 10, '*/+-', 20000, 50],
medium: [-40, 40, -20, 20, '*/+-', 30000, 200],
hard: [-100, 100, -70, 70, '*/+-', 40000, 500],
extreme: [-999999, 999999, -999999, 999999, '*/', 40000, 2500],
impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 50000, 5500],
impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 60000, 8500]
} 

let operators = {
'+': '+',
'-': '-',
'*': '×',
'/': '÷'
}

// XP
function genMath(mode) {
let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
let a = randomInt(a1, a2)
let b = randomInt(b1, b2)
let op = pickRandom([...ops])
let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
if (op == '/') [a, result] = [result, a]
return {
str: `${a} ${operators[op]} ${b}`,
mode,
time,
bonus,
result
}}

function randomInt(from, to) {
if (from > to) [from, to] = [to, from]
from = Math.floor(from)
to = Math.floor(to)
return Math.floor((to - from) * Math.random() + from)
}

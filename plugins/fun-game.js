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
try {
let msgGamPvp1 = await tr("EMPATE 🤝")
let msgGamPvp2 = await tr("🎁 Premios")
let msgGamPvp3 = await tr("HA GANADO! 🎉")
let msgGamPvp4 = await tr("HA PEDIDO! 🤡")
let msgGamPvp5 = await tr("❌ Pérdida")

if (command == 'ppt' || command == 'pvp' || command == 'suit' || command == 'suitpvp') {
const time = global.db.data.users[m.sender].wait + 30000;
if (new Date() - global.db.data.users[m.sender].wait < 30000) return conn.fakeReply(m.chat, `*🕓 ${await tr("Hey, espera")} ${msToTime(time - new Date())} ${await tr("Antes de usar otros comando")}*`, m.sender, `ᴺᵒ ʰᵃᵍᵃⁿ ˢᵖᵃᵐ`, 'status@broadcast', null, fake);

const guideText = `${await tr("Piedra 🗿, Papel 📄 o Tijera ✂️\n\n👾 Jugar con el bot")}:\n• ${usedPrefix + command} piedra\n• ${usedPrefix + command} papel\n• ${usedPrefix + command} tijera\n\n${await tr("🕹 Jugar con un usuario")}:\n${usedPrefix + command} @usuario`;
if (!m.mentionedJid[0] && !args[0]) return conn.sendButton(m.chat, guideText, wm, pp, [['Piedra 🗿', `${usedPrefix + command} piedra`], ['Papel 📄', `${usedPrefix + command} papel`], ['Tijera ✂️', `${usedPrefix + command} tijera`]], m);
const user = global.db.data.users[m.sender];
const playerChoice = args[0]?.toLowerCase();
const choices = ['piedra', 'papel', 'tijera'];
const botChoice = choices[Math.floor(Math.random() * 3)];
const name = conn.getName(m.sender);

if (!m.mentionedJid[0] && choices.includes(playerChoice)) {
global.db.data.users[m.sender].wait = new Date() * 1;
        
const rules = { piedra: { beats: 'tijera', win: 1000, lose: 300, winType: 'coins', loseType: 'coins' },
papel: { beats: 'piedra', win: 1000, lose: 300, winType: 'coins', loseType: 'xp' },
tijera: { beats: 'papel', win: 1000, lose: 300, winType: 'coins', loseType: 'coins' }};
let result, message;
if (playerChoice === botChoice) {
user.exp += 500;
result = msgGamPvp1
message = `${msgGamPvp2} : 500 XP`
} else if (rules[playerChoice].beats === botChoice) {
user[rules[playerChoice].winType] += rules[playerChoice].win;
result = msgGamPvp3
message = `${msgGamPvp2} :  ${rules[playerChoice].win} ${rules[playerChoice].winType}`;
} else {
user[rules[playerChoice].loseType] -= rules[playerChoice].lose;
result = msgGamPvp4
message = `${msgGamPvp5}: -${rules[playerChoice].lose} ${rules[playerChoice].loseType}`;
}
conn.reply(m.chat, `\`「 ${result} 」\`\n\n${await tr("👉 Tu")}: ${playerChoice}\n${await tr("👉 El Bot")}: ${botChoice}\n${message}`, m, { contextInfo: {externalAdReply: { title: name, body: wm, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}});
}

if (m.mentionedJid[0]) {
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) return m.reply(await tr(`⚠️ Termina tu partida  antes de inicia otra`));
if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) return m.reply(await tr(`⚠️ El usuario ya esta jugando, espera a que termine.`));

const id = 'suit_' + new Date() * 1;
const caption = `🎮👾 ${await tr("PVP - PIEDRA, PAPEL O TIJERA")} 👾🎮\n\n@${m.sender.split`@`[0]} ${await tr("DESAFIA A")} @${m.mentionedJid[0].split`@`[0]}\n\n${await tr("> _*Escribe (aceptar) para aceptar*_\n> _*Escribe (rechazar) para rechazar*_")}`;
const msgTimPvp = await tr(`⏳ TIEMPO AGOTADO, EL PVP SE CANCELA`)
conn.suit[id] = {
chat: await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender, m.mentionedJid[0]] }),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (conn.suit[id]) conn.reply(m.chat, msgTimPvp, m);
delete conn.suit[id];
}, timeout),
poin: 1000,
poin_lose: 300,
poin_bot: 500,
timeout
}}
}

if (command == 'slot'  || command == 'apostar' || command == 'slot1' || command == 'slot2' || command == 'slot3') {
const slotTypes = {
slot1: { currency: 'exp',
name: 'Exp',
emojis: ['💎', '⚡', '🪙'],
cooldown: 60000,
bonusWin: apuesta => apuesta * 2,
consolation: 50,
symbol: '⚡'
},
slot2: { currency: 'money',
name: 'LoliCoins',
emojis: ['🪙', '🔮', '🧿'],
cooldown: 60000,
bonusWin: apuesta => apuesta * 2,
consolation: 30,
symbol: '🪙'
},
slot3: {
currency: 'limit',
name: 'Diamantes',
emojis: ['🪙', '💣', '💎'],
cooldown: 30000,
bonusWin: apuesta => apuesta * 2,
consolation: 2,
symbol: '💎'
}}

const fa = `${mg} ${await tr("Usar de la siguiente manera")}:\n*• ${usedPrefix}slot1 50* (${await tr("aportas exp")})\n*• ${usedPrefix}slot2 50* (${await tr("aportas LoliCoins")})\n*• ${usedPrefix}slot3 50* (${await tr("aportas Diamantes")})`.trim()

let msgText1 = await tr(`⚠️ Debes apostar  un minimo de *10 ${name}*`)
let msgText2 = await tr(`⚠️ No tienes  suficientes *${name}* Para apostar. interactuar con el bot para obtener mas recursos.`)

const validateBet = (users, apuesta, currency, name) => {
if (apuesta < 10) throw msgText1
if (users[currency] < apuesta) throw msgText2
}

const playSlot = async (m, conn, apuesta, config, users) => {
const { currency, name, emojis, cooldown, bonusWin, consolation } = config
const time = users.lastslot + cooldown
if (new Date() - users.lastslot < cooldown) throw await tr(`*Vuelva en: ${msToTime(time - new Date())} para continuar apostando ${name}* 🎰`)
users.lastslot = Date.now()

const a = Math.floor(Math.random() * emojis.length)
const b = Math.floor(Math.random() * emojis.length)
const c = Math.floor(Math.random() * emojis.length)
const [x, y, z] = [[], [], []]
for (let i = 0; i < 3; i++) {
x[i] = emojis[(a + i) % emojis.length]
y[i] = emojis[(b + i) % emojis.length]
z[i] = emojis[(c + i) % emojis.length]
}

const msgApost1 = await tr("🥳 *¡QUÉ PRO! HAS GANADO")
const msgApost2 = await tr("😯 *¡CASI! VUELVE A INTENTAR*\n*BONO DE")
const msgApost3 = await tr("😿 *¡HAS PERDIDO!")
const msgApost4 = await tr("RANURAS")
const msgApost5 = await tr("SLOTS")

let end
if (a === b && b === c) {
end = `${msgApost1} +${bonusWin(apuesta)} ${name}*`
users[currency] += apuesta
} else if (a === b || a === c || b === c) {
end = `${msgApost2} +${consolation} ${name}*`
users[currency] += consolation
} else {
end = `${msgApost3} ❌ -${apuesta} ${name}*`
users[currency] -= apuesta
}

const hawemod = [
`${x[0]} : ${y[1]} : ${z[0]}\n${z[1]} : ${y[0]} : ${x[0]}\n${z[2]} : ${x[1]} : ${y[2]}`,
`${x[0]} : ${y[0]} : ${z[0]}\n${y[1]} : ${z[1]} : ${x[1]}\n${x[2]} : ${y[2]} : ${z[2]}`,
`${x[0]} : ${y[1]} : ${z[0]}\n${y[1]} : ${z[2]} : ${x[1]}\n${x[2]} : ${y[1]} : ${z[2]}`
]

const maxIterations = 25
const arrayCasuale = generaArrayCasuale(hawemod, maxIterations)
const array = [...arrayCasuale]
const { key } = await conn.sendMessage(m.chat, { text: `🕹` }, { quoted: m })

for (let i = 0; i < maxIterations; i++) {
await conn.sendMessage(m.chat, {text: `🎰 | *${msgApost4}* | 🎰\n────────\n${array[i]}\n────────\n🎰 | *${msgApost5}* | 🎰`, edit: key }, { quoted: m })
await new Promise(resolve => setTimeout(resolve, 50))
}

await conn.sendMessage(m.chat, { text: `🎰 | *${msgApost4}* | 🎰\n────────\n${x[0]} : ${y[0]} : ${z[0]}\n${x[1]} : ${y[1]} : ${z[1]}\n${x[2]} : ${y[2]} : ${z[2]}\n────────\n🎰 | *${msgApost5}* | 🎰\n\n${end}`, edit: key }, { quoted: m })
}

if (command === 'apostar' || command === 'slot') {
if (!args[0]) return m.reply(fa)
if (isNaN(args[0])) return m.reply(fa)
const apuesta = parseInt(args[0])
        
await conn.sendButton(m.chat, `*${await tr("Elige en qué apostar tus")} ${apuesta}*`, botname, null, [['⚡ Exp', `.slot1 ${apuesta}`], ['🪙 LoliCoins', `.slot2 ${apuesta}`], ['💎 Diamantes', `.slot3 ${apuesta}`]], null, null, m)
return
}

if (!args[0]) return m.reply(fa)
if (isNaN(args[0])) return m.reply(fa)
const apuesta = parseInt(args[0])
const users = global.db.data.users[m.sender]
const slotType = slotTypes[command]
if (!slotType) return 
try {
validateBet(users, apuesta, slotType.currency, slotType.name)
await playSlot(m, conn, apuesta, slotType, users)
} catch (e) {
m.reply(e)
}}

if (command == 'tictactoe' || command == 'ttc' || command == 'ttt' || command == 'xo') {
conn.game = conn.game ? conn.game : {}
if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) return m.reply(await tr(`⚠️ Todavia alguien esta jugando en la sala si quiere abandonar escriba *salir*\nTambien puedes eliminar la sala usando el comando *${usedPrefix}delttt*`)) 
if (!text) return m.reply(await tr(`*⚠️ Debes de agregar un nombre a la sala\nEjemplo:\n${usedPrefix + command} Sala bot*`)) 
let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true)) 
if (room) {
await conn.reply(m.chat, await tr(`⚠️ Alguien se han unido a la sala *${text}*\nYa pueden jugar!! 😼`), fkontak, m)
await conn.reply(m.chat, await tr(`⭕️ *Clásico Juego del Gato, 3 en raya o tateti* ❌\n\n*¿Cómo jugar?*\n_Responde al Juego con un Número, el mensaje debe contener la posiscion en la que quieras estar (1,2,3,4,5,6,7,8,9)_`), fkontak, m)

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
let str = `💖 ${await tr("Juegos tateti")}
🫂 ${await tr("Jugadores")}:
*┈┈┈┈┈┈┈┈┈*
❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}
*┈┈┈┈┈┈┈┈┈*
     ${arr.slice(0, 3).join('')}
     ${arr.slice(3, 6).join('')}
     ${arr.slice(6).join('')}
*┈┈┈┈┈┈┈┈┈*
${await tr("Turno de")}:
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
conn.sendMessage(m.chat, { image: { url: imgplay }, caption: await tr(`😼 Juegos tateti

🐈 Esperando al segundo jugador puede ingresa  usando el comando:
*${usedPrefix + command} ${text}*

Si quieres abandonar la sala usar el comando:
*${usedPrefix}delttt*`) }, { mentions: conn.parseMention(text), quoted: fkontak })
conn.game[room.id] = room
}}

if (command == 'math' || command == 'mates' || command == 'matemáticas') {
// 60000 = 1 minuto // 30000 = 30 segundos // 15000 = 15 segundos // 10000 = 10 segundos
let time = global.db.data.users[m.sender].wait + 60000
if (new Date - global.db.data.users[m.sender].wait < 60000) return await conn.reply(m.chat, await tr(`*🕓 Espera ${Math.floor((time - new Date()) / 1000)} Segundos antes de volver a jugar*`), fkontak, m)
let mat = `✨ ${await tr("Puede escribi la dificultad")}

${await tr("*Nivel del dificultad*")}
${Object.keys(modes).join('  |  ')}

${await tr("*Ejemplo:*")}
${usedPrefix + command} noob
${usedPrefix + command} impossible2

${await tr("😼 *Mientras mas dificultad mayor recompensa*")}`.trim()
if (args.length < 1) return await conn.reply(m.chat, mat, fkontak, m)

let mode = args[0].toLowerCase()
if (!(mode in modes)) return await conn.reply(m.chat, mat, fkontak, m) 

let id = m.chat
if (id in global.math) return conn.reply(m.chat, await tr(`⚠️ *Todavia hay pregunta sin responder el este chat!!*`), global.math[id][0])
//let ii = global.db.data.users[m.sender].limit += 10 math.dia
let msgGametxt = await tr("⌛ Se acabo el tiempo la respuesta es") 

let math = genMath(mode)
global.math[id] = [
await conn.reply(m.chat, `╭┄〔 *${wm}* 〕┄⊱
┆${await tr("Cual es resultado de")}: *${math.str} = ?*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆🧭 ${await tr("Tiempo")}: *${(math.time / 1000).toFixed(0)} ${await tr("segundos")}*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆${await tr("Responde a este mensaje y gana")}
┆🏆 *${math.bonus}: XP*
╰━━━⊰ 𓃠 ${vs} ⊱━━━━დ`, m),
math, 4,
  
//await conn.reply(m.chat, `⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼𝙇 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝘿𝙀 𝘼𝙍𝙍𝙄𝘽𝘼 𝘾𝙊𝙉 𝙇𝘼 𝙍𝙀𝙎𝙋𝙐𝙀𝙎𝙏𝘼\n\n𝘼𝙉𝙎𝙒𝙀𝙍 𝙏𝙃𝙀 𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝘼𝘽𝙊𝙑𝙀 𝙏𝙊 𝙆𝙉𝙊𝙒 𝙔𝙊𝙐𝙍 𝘼𝙉𝙎𝙒𝙀𝙍\n\n${wm}`, fkontak, m), math, 4,
setTimeout(() => { 
if (global.math[id]) conn.reply(m.chat, `${msgGametxt}: *${math.result}*`, global.math[id][0])
delete global.math[id]
}, math.time)
]
global.db.data.users[m.sender].wait = new Date * 1
}

if (command == 'delttt' || command == 'deltt' || command == 'delxo' || command == 'deltictactoe') {
let room = Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))
if (room == undefined) return await conn.reply(m.chat, await tr(`⚠️ No estas en ninguna partidas en el juego tres en raya\n\n💫 Iniciar partidas (${usedPrefix}ttt sala nueva)`), fkontak, m)
delete conn.game[room.id]

await conn.reply(m.chat, await tr(`⚠️ La sala tres en raya fue eliminada`), fkontak, m)
}} catch (e) {
//await conn.reply(m.chat, `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`, fkontak, m)
console.log(e)}}
handler.help = ["ppt", "suitpvp", "pvp", "slot", "apostar", "tictactoe", "ttt", "math", "matemáticas", "delttt"];
handler.tags = ['game'];
handler.command = /^(ppt|suitpvp|suit|pvp|moneda|suert|currency|luck|cara|Method|slot|apostar|slot1|slot2|slot3|tictactoe|ttc|ttt|xo|math|mates|matemáticas|delttt|deltt|delxo|deltictactoe)$/i
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

function generaArrayCasuale(array, ripetizioni) {
  let risultato = [];
  for (let i = 0; i < ripetizioni; i++) {
    risultato = risultato.concat(array);
  }
  return risultato;
}

function randomInt(from, to) {
if (from > to) [from, to] = [to, from]
from = Math.floor(from)
to = Math.floor(to)
return Math.floor((to - from) * Math.random() + from)
}

/* CREDITOS: https://github.com/FG98F */

let handler = async (m, { args, usedPrefix, command, conn }) => {
let fa = `${mg}𝙐𝙨𝙖𝙧 𝙙𝙚𝙡 𝙡𝙖 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚 𝙢𝙖𝙣𝙚𝙧𝙖:

𝙀𝙟𝙚𝙢𝙥𝙡𝙤:
*${usedPrefix + command} 50*`.trim()

if (!args[0]) throw fa
if (isNaN(args[0])) throw fa
let apuesta = parseInt(args[0])

let users = global.db.data.users[m.sender]
//let time = global.db.data.users[m.sender].lastwork + 30000
//if (new Date - users.lastwork < 30000) throw `*𝙑𝙐𝙀𝙇𝙑𝘼 𝙀𝙉 ${msToTime(time - new Date())} 𝙋𝘼𝙍𝘼 𝘾𝙊𝙉𝙏𝙄𝙉𝙐𝘼𝙍 𝘼𝙋𝙊𝙎𝙏𝘼𝙉𝘿𝙊* 🎰\n\n*𝘾𝙊𝙈𝙀 𝘽𝘼𝘾𝙆 𝙄𝙉 ${msToTime(time - new Date())} 𝙏𝙊 𝘾𝙊𝙉𝙏𝙄𝙉𝙐𝙀 𝘽𝙀𝙏𝙏𝙄𝙉𝙂* 💰`

if (apuesta < 10) throw `${lenguajeGB['smsAvisoAG']()}𝑫𝒆𝒃𝒆𝒓 𝒅𝒆𝒍 𝒂𝒑𝒐𝒔𝒕𝒂𝒓 𝒖𝒏 𝒎𝒊́𝒏𝒊𝒎𝒐 𝒅𝒆 *10*`

if (users.exp < apuesta) {
throw `${lenguajeGB['smsAvisoFG']()}𝑵𝒐 𝒂𝒍𝒄𝒂𝒏𝒛𝒂 𝒑𝒂𝒓𝒂 𝒂𝒑𝒐𝒔𝒕𝒂𝒓 𝒆𝒙𝒑, 𝒍𝒆 𝒓𝒆𝒄𝒐𝒎𝒊𝒆𝒏𝒅𝒐 𝒊𝒏𝒕𝒆𝒓𝒂𝒄𝒕𝒖𝒂𝒓 𝒄𝒐𝒏 𝒆𝒍 𝒃𝒐𝒕 𝒑𝒂𝒓𝒂 𝒐𝒃𝒕𝒆𝒏𝒆𝒓 𝒎𝒂́𝒔 𝒓𝒆𝒄𝒖𝒓𝒔𝒐𝒔`    
}
if (command == 'slot1') {
let time = global.db.data.users[m.sender].lastslot + 60000
if (new Date - users.lastslot < 60000) throw `*𝑽𝒖𝒆𝒍𝒗𝒂 𝒆𝒏 ${msToTime(time - new Date())} 𝑷𝒂𝒓𝒂 𝒄𝒐𝒏𝒕𝒊𝒏𝒖𝒂𝒓 𝒂 𝒑𝒐𝒔𝒕𝒂𝒏𝒅𝒐 𝒆𝒙𝒑* 🎰`
users.lastslot = new Date * 1
    
let emojis = ["🍁", "⚡", "🍇"];
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
//users.lastslot = new Date * 1
//return await m.reply(
    //    `
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
/*await conn.sendHydrated(m.chat, `${s}\n\n${end}`, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
['⚡ 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝙊𝙏𝙍𝘼 𝙑𝙀𝙕 | 𝘼𝙂𝘼𝙄𝙉', `${usedPrefix}slot1 ${apuesta}`],
['🐈 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎', `${usedPrefix}slot2 ${apuesta}`],
['💎 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎', `${usedPrefix}slot3 ${apuesta}`]
], m,)}*/


if (users.money < apuesta)  { 
throw `${lenguajeGB['smsAvisoFG']()}𝑵𝒐 𝒂𝒍𝒄𝒂𝒏𝒛𝒂 𝒑𝒂𝒓𝒂 𝒂𝒑𝒐𝒔𝒕𝒂𝒓 𝑳𝒐𝒍𝒊𝒄𝒐𝒊𝒏𝒔, 𝒍𝒆 𝒓𝒆𝒄𝒐𝒎𝒊𝒆𝒏𝒅𝒐 𝒊𝒏𝒕𝒆𝒓𝒂𝒄𝒕𝒖𝒂𝒓 𝒄𝒐𝒏 𝒆𝒍 𝒃𝒐𝒕 𝒑𝒂𝒓𝒂 𝒐𝒃𝒕𝒆𝒏𝒆𝒓 𝒎𝒂́𝒔 𝒓𝒆𝒄𝒖𝒓𝒔𝒐𝒔`    
}
if (command == 'slot2') {
let time = global.db.data.users[m.sender].lastslot + 60000
if (new Date - users.lastslot < 60000) throw `*𝑽𝒖𝒆𝒍𝒗𝒂 𝒆𝒏 ${msToTime(time - new Date())} 𝑷𝒂𝒓𝒂 𝒄𝒐𝒏𝒕𝒊𝒏𝒖𝒂𝒓 𝒂 𝒑𝒐𝒔𝒕𝒂𝒏𝒅𝒐 𝑳𝒐𝒍𝒊𝒄𝒐𝒊𝒏𝒔* 🎰`
users.lastslot = new Date * 1
    
let emojis = ["🐈", "🐓", "🐙"];
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
end = `🙀 *CASI!!, VUELVA A INTENTAR*\n*BONO DE +30 GataCoins*`
users.money += 30
} else {
end = `😿 *HA PERDIDO!! ❌ -${apuesta} GataCoins*`
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
/*await conn.sendHydrated(m.chat, `${ss}\n\n${end}`, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
['🐈 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝙊𝙏𝙍𝘼 𝙑𝙀𝙕 | 𝘼𝙂𝘼𝙄𝙉', `${usedPrefix}slot2 ${apuesta}`],
['⚡ 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝙀𝙓𝙋', `${usedPrefix}slot1 ${apuesta}`],
['💎 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎', `${usedPrefix}slot3 ${apuesta}`]
], m,)}*/

    
if (users.limit < apuesta) {  
throw `${lenguajeGB['smsAvisoFG']()}𝑵𝒐 𝒂𝒍𝒄𝒂𝒏𝒛𝒂 𝒑𝒂𝒓𝒂 𝒂𝒑𝒐𝒔𝒕𝒂𝒓 𝑫𝒊𝒂𝒎𝒂𝒏𝒕𝒆, 𝒍𝒆 𝒓𝒆𝒄𝒐𝒎𝒊𝒆𝒏𝒅𝒐 𝒊𝒏𝒕𝒆𝒓𝒂𝒄𝒕𝒖𝒂𝒓 𝒄𝒐𝒏 𝒆𝒍 𝒃𝒐𝒕 𝒑𝒂𝒓𝒂 𝒐𝒃𝒕𝒆𝒏𝒆𝒓 𝒎𝒂́𝒔 𝒓𝒆𝒄𝒖𝒓𝒔𝒐𝒔`    
}
if (command == 'slot3') {
let time = global.db.data.users[m.sender].lastslot + 30000
if (new Date - users.lastslot < 30000) throw `*𝑽𝒖𝒆𝒍𝒗𝒂 𝒆𝒏 ${msToTime(time - new Date())} 𝑷𝒂𝒓𝒂 𝒄𝒐𝒏𝒕𝒊𝒏𝒖𝒂𝒓 𝒂 𝒑𝒐𝒔𝒕𝒂𝒏𝒅𝒐 𝑫𝒊𝒂𝒎𝒂𝒏𝒕𝒆* 🎰`
users.lastslot = new Date * 1
    
let emojis = ["🪵", "💣", "💎"];
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
let sss = `
🎰 | *RANURAS* | 🎰 
 ────────
  ${x[0]} : ${y[0]} : ${z[0]}
  ${x[1]} : ${y[1]} : ${z[1]}
  ${x[2]} : ${y[2]} : ${z[2]}
 ────────
🎰 |   *SLOTS*   | 🎰\n\n${end}`
await conn.reply(m.chat, sss, m)}
/*await conn.sendHydrated(m.chat, `${sss}\n\n${end}`, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
['💎 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝙊𝙏𝙍𝘼 𝙑𝙀𝙕 | 𝘼𝙂𝘼𝙄𝙉', `${usedPrefix}slot3 ${apuesta}`],
['⚡ 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝙀𝙓𝙋', `${usedPrefix}slot1 ${apuesta}`],
['🐈 𝘼𝙋𝙊𝙎𝙏𝘼𝙍 𝘾𝙊𝙉 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎', `${usedPrefix}slot2 ${apuesta}`]
], m,)}*/
        
        
if (command == 'slot') {       
await conn.reply(m.chat, `*Elija en que apostará ${apuesta}*\n\n⚡ Exp:\n${usedPrefix}slot1 ${apuesta}\n\n🐈 Lolicoins:\n${usedPrefix}slot2 ${apuesta}\n\n💎 diamante:\n${usedPrefix}slot3 ${apuesta}`, m)}
/*await conn.sendHydrated(m.chat, `*Elija en que apostará ${apuesta}*`, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
['⚡ 𝙀𝙓𝙋', `${usedPrefix}slot1 ${apuesta}`],
['🐈 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎', `${usedPrefix}slot2 ${apuesta}`],
['💎 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎', `${usedPrefix}slot3 ${apuesta}`]
], m,)}*/
        
if (command == 'apostar') {       
await conn.reply(m.chat, `*Elija en que apostará ${apuesta}*\n\n*Choose what you will*\n\n⚡Exp:\n${usedPrefix}slot1 ${apuesta}\n🐈 Lolicoins:\n${usedPrefix}slot2 ${apuesta}\n💎 Diamante:\n${usedPrefix}slot3 ${apuesta}`, m)}
/*await conn.sendHydrated(m.chat, `*Elija en que apostará ${apuesta}*\n\n*Choose what you will*`, wm, null, md, '𝙂𝙖𝙩𝙖𝘽𝙤𝙩-𝙈𝘿', null, null, [
['⚡ 𝙀𝙓𝙋', `${usedPrefix}slot1 ${apuesta}`],
['🐈 𝙂𝘼𝙏𝘼𝘾𝙊𝙄𝙉𝙎', `${usedPrefix}slot2 ${apuesta}`],
['💎 𝘿𝙄𝘼𝙈𝘼𝙉𝙏𝙀𝙎', `${usedPrefix}slot3 ${apuesta}`]
], m,)}*/
//global.db.data.users[m.sender].lastwork = new Date * 1
}
handler.help = ['slot <apuesta>']
handler.tags = ['game']
handler.command = ['slot', 'apostar', 'slot1', 'slot2', 'slot3']
handler.register = true
export default handler
const delay = time => new Promise(res => setTimeout(res, time))

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

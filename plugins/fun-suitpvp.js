let handler = m => m
handler.before = async function (m) {
let pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg'
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
this.suit = this.suit ? this.suit : {}
if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
if (room) {
let win = ''
let tie = false
if (m.sender == room.p2 && /^(acc(ept)?|Aceptar|acerta|aceptar|gas|aceptare?|nao|Rechazar|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
let textno = `⚠️@${room.p2.split`@`[0]} ${await tr("Rechazo el pvp, el juego se cancela")}`
m.reply(textno, null, {mentions: this.parseMention(textno)})
delete this.suit[room.id]
return !0 }
room.status = 'play' 
room.asal = m.chat
clearTimeout(room.waktu)
let textplay = `🎮 ${await tr("El juegos comienza, las opciones han sido enviados a los chat privado de ")} @${room.p.split`@`[0]} 𝙔 @${room.p2.split`@`[0]}\n\n${await tr("Seleccionen una opción en sus chats privado respectivamente")}\n\n> *${await tr("Elegir opción en")} wa.me/${conn.user.jid.split`@`[0]}*`
m.reply(textplay, m.chat, {mentions: this.parseMention(textplay)})
let comienzop = await tr(`⚠️ Por favor seleccione una de las siguientes opciones\n\n> ღ Piedra\n> დ Papel\n> ღ Tijera\n\n> *Responda al mensaje con la opción*`)
let comienzop2 = comienzop
let iniciativa = await tr(`⚠️ Ningun jugador tomo la iniciativa de empezar el juegos, el pvp se ah cancelado`)       
let gamtxt1 = await tr("No elegiste ninguna opción,  fin del pvp")
   
if (!room.pilih) this.sendMessage(room.p, { text: comienzop }, { quoted: fkontak })  
if (!room.pilih2) this.sendMessage(room.p2, { text: comienzop2 }, { quoted: fkontak })
room.waktu_milih = setTimeout(() => {              
if (!room.pilih && !room.pilih2) this.sendMessage(m.chat, { text: iniciativa }, { quoted: fkontak })
else if (!room.pilih || !room.pilih2) {
win = !room.pilih ? room.p2 : room.p 
let textnull = `⚠️ @${(room.pilih ? room.p2 : room.p).split`@`[0]} ${gamtxt1}`
this.sendMessage(m.chat, { text: textnull }, { quoted: fkontak }, { mentions: this.parseMention(textnull) })
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
}
delete this.suit[room.id]
return !0
}, room.timeout)}
let jwb = m.sender == room.p
let jwb2 = m.sender == room.p2
let g = /tijera/i
let b = /piedra/i
let k = /papel/i
let reg = /^(tijera|piedra|papel)/i
if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
room.pilih = reg.exec(m.text.toLowerCase())[0]
room.text = m.text
m.reply(`✅ ${await tr(`Has elegido ${m.text}, regresa al grupo y `)} ${room.pilih2 ? await tr(`*Revisa los resultados*`) : await tr('*Espera los resultados*')}`) 
if (!room.pilih2) this.reply(room.p2, await tr(`⚠️ El oponente ah elegido, es tu turno de elegir.`), fkontak, 0)}
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
room.pilih2 = reg.exec(m.text.toLowerCase())[0]
room.text2 = m.text
m.reply(`✅ ${await tr(`Has elegido ${m.text}, regresa al grupo y `)} ${room.pilih2 ? await tr(`*Revisa los resultados*`) : await tr('*Espera los resultados*')}`) 
if (!room.pilih) this.reply(room.p, tr(`⚠️ El oponente ah elegido, es tu turno de elegir.`), fkontak, 0)}
let stage = room.pilih
let stage2 = room.pilih2
if (room.pilih && room.pilih2) {
clearTimeout(room.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = room.p
else if (b.test(stage) && k.test(stage2)) win = room.p2
else if (g.test(stage) && k.test(stage2)) win = room.p
else if (g.test(stage) && b.test(stage2)) win = room.p2
else if (k.test(stage) && b.test(stage2)) win = room.p
else if (k.test(stage) && g.test(stage2)) win = room.p2
else if (stage == stage2) tie = true 

this.reply(room.asal, `🥳 ${await tr("RESULTADOS DEL PVP")}\n\n${tie ? await tr('🥴 Empate!!') : ''} *@${room.p.split`@`[0]} (${room.text})* ${tie ? '' : room.p == win ? await tr(` *Ganarte 🥳 ${room.poin} XP*`) : await tr(` *Perdio 🤡 ${room.poin_lose} XP*`)}
*@${room.p2.split`@`[0]} (${room.text2})* ${tie ? '' : room.p2 == win ? await tr(`*Ganarte 🥳 ${room.poin} XP*`) : await tr(` *Perdio 🤡 ${room.poin_lose} XP*`)}
`.trim(), m, { mentions: [room.p, room.p2] } )
if (!tie) {
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose
}
delete this.suit[room.id]}}
return !0
}
handler.exp = 0
export default handler
function random(arr) {
return arr[Math.floor(Math.random() * arr.length)]}

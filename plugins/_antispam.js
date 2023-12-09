const userSpamData = {}
let handler = m => m
handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems}) {
const chat = global.db.data.chats[m.chat]
if (!m.isGroup) return
if (chat.modoadmin) return  
if (isOwner || isROwner || isAdmin || !isBotAdmin || isPrems) return
  
let user = global.db.data.users[m.sender]
const sender = m.sender
const currentTime = new Date().getTime()
const timeWindow = 5000 // tiempo límite 
const messageLimit = 8 // cantidad de mensajes en dicho tiempo

let time, time2, time3, mensaje
time = 60000 // 1 min
time2 = 120000 // 2 min
time3 = 360000 // 4 min

if (!(sender in userSpamData)) {
userSpamData[sender] = {
lastMessageTime: currentTime,
messageCount: 1,
antiBan: 0, 
message: 0,
message2: 0,
message3: 0,
}
} else {
const userData = userSpamData[sender]
const timeDifference = currentTime - userData.lastMessageTime

if (userData.antiBan === 1) {
if (userData.message < 1) {
userData.message++  
mensaje = `*HEY @${m.sender.split`@`[0]} DEJA SPAM 🤨*\n*NO PUEDE USAR COMANDOS DURANTE 1 MINUTOS*\n\n*MOTIVO: SPAM DE MENSAJES LEVE*\n\n⚠️ \`\`\`ADVERTENCIA 1/3\`\`\` ⚠️`
await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
}} else if (userData.antiBan === 2) {
if (userData.message2 < 1) {
userData.message2++  
mensaje = `*HEY @${m.sender.split`@`[0]} OTRA VEZ 🤨DEJA EL PUTO SPAM*\n*NO PUEDE USAR COMANDOS DURANTE 2 MINUTOS*\n*MOTIVO: SPAM*\n\n*SI VUELVE A HACES SPAM SERA ELIMINADO DEL GRUPO*\n\n⚠️ \`\`\`ADVERTENCIA 2/3\`\`\` ⚠️`
await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
}} else if (userData.antiBan === 3) {
if (userData.message3 < 1) {
userData.message3++  
mensaje = `*Ufff @${m.sender.split`@`[0]} 🤨 NO ENTENDER? QUE REPERTI 3 VECES NO HAGAS SPAM*\nAHORA SERA ELIMINADO DEL GRUPO....`
await conn.reply(m.chat, mensaje, m, { mentions: [m.sender] })  
await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
}}

if (timeDifference <= timeWindow) {
userData.messageCount += 1

if (userData.messageCount >= messageLimit) {
const mention = `@${sender.split("@")[0]}`
const warningMessage = `*${mention} 🤨 ESTA PROHIBIDO HACER SPAM DE MENSAJES!!*`
if (userData.antiBan > 2) return
await conn.reply(m.chat, warningMessage, m, { mentions: [m.sender] })  
user.banned = true
userData.antiBan++
userData.messageCount = 1
                
if (userData.antiBan === 1) {
setTimeout(() => {
if (userData.antiBan === 1) {
userData.antiBan = 0
userData.message = 0
userData.message2 = 0
userData.message3 = 0
user.banned = false
}}, time) 
  
} else if (userData.antiBan === 2) {
setTimeout(() => {
if (userData.antiBan === 2) {
userData.antiBan = 0
userData.message = 0
userData.message2 = 0
userData.message3 = 0
user.banned = false
}}, time2) 
                
} else if (userData.antiBan === 3) {
setTimeout(() => {
if (userData.antiBan === 3) {
userData.antiBan = 0
userData.message = 0
userData.message2 = 0
userData.message3 = 0
user.banned = false
}}, time3)
    
}}
} else {
if (timeDifference >= 2000) {
userData.messageCount = 1
}}
userData.lastMessageTime = currentTime
}}

export default handler


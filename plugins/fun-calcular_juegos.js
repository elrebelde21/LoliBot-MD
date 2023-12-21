import util from 'util'
import path from 'path' 
let handler = async (m, { conn, command, text, usedPrefix }) => {
let user = a => '@' + a.split('@')[0] //'@' + a.split('@')[0]
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b = ps.getRandom()
let c = ps.getRandom()
let d = ps.getRandom()
let e = ps.getRandom()
let f = ps.getRandom()
let g = ps.getRandom()
let h = ps.getRandom()
let i = ps.getRandom()
let j = ps.getRandom() 

if (command == 'gay') {
let vn = './media/gay2.mp3'
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/gay', {  
avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),   
}), 'error.png', `*🏳️‍🌈 𝑴𝒊𝒓𝒆 𝒂 𝒆𝒔𝒕𝒆 𝒈𝒂𝒚 𝒍𝒆 𝒈𝒖𝒔𝒕𝒂 𝒍𝒂 𝒑𝒊𝒋𝒂! 🏳️‍🌈*`, m)
await conn.sendFile(m.chat, vn, 'error.mp3', null, m, true, { type: 'audioMessage', ptt: true })}

//------------------------------------------------------------------------------------

if (command == 'gay2') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES 🏳️‍🌈* *${(500).getRandom()}%* *GAY*_`.trim(), m, m.mentionedJid ? { mentions: m.mentionedJid
  } : {})}

//------------------------------------------------------------------------------------

if (command == 'amistad' || command == 'amigorandom') {   
let toM = a => '@' + a.split('@')[0]
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
m.reply(`*🔰 Vamos a hacer algunas amistades 🔰*\n\n*Oye ${toM(a)} hablale al privado a ${toM(b)} para que jueguen y se haga una amistad 🙆*\n\n*Las mejores amistades empiezan con un juego 😉*`, null, {
mentions: [a, b]})}
  
//------------------------------------------------------------------------------------
  
if (command == 'follar' || command == 'violar') {   
if (!text) throw `*Ingrese el @ o el nombre de la persona que quieras saber si te puedes ${command.replace('how', '')}*`
let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
conn.reply(m.chat, `🤤👅🥵 *𝐀𝐂𝐀𝐁𝐀𝐒 𝐃𝐄 𝐅𝐎𝐋𝐋𝐀𝐑𝐓𝐄𝐋@!*🥵👅🤤\n\n*𝙏𝙚 𝙖𝙘𝙖𝙗𝙖𝙨 𝙙𝙚 𝙛𝙤𝙡𝙡𝙖𝙧 𝙖 𝙡𝙖 𝙥𝙚𝙧𝙧𝙖 𝙙𝙚* *${text}* ⁩ *𝙖 𝟰 𝙥𝙖𝙩𝙖𝙨 𝙢𝙞𝙚𝙣𝙩𝙧𝙖𝙨 𝙩𝙚 𝙜𝙚𝙢𝙞𝙖 𝙘𝙤𝙢𝙤 𝙪𝙣𝙖 𝙢𝙖𝙡𝙙𝙞𝙩𝙖 𝙥𝙚𝙧𝙧𝙖 "𝐀𝐚𝐚𝐡.., 𝐀𝐚𝐚𝐡𝐡, 𝐬𝐢𝐠𝐮𝐞, 𝐧𝐨 𝐩𝐚𝐫𝐞𝐬, 𝐧𝐨 𝐩𝐚𝐫𝐞𝐬.." 𝙮 𝙡𝙖 𝙝𝙖𝙨 𝙙𝙚𝙟𝙖𝙙𝙤 𝙩𝙖𝙣 𝙧𝙚𝙫𝙚𝙣𝙩𝙖𝙙𝙖 𝙦𝙪𝙚 𝙣𝙤 𝙥𝙪𝙚𝙙𝙚 𝙨𝙤𝙨𝙩𝙚𝙣𝙚𝙧 𝙣𝙞 𝙨𝙪 𝙥𝙧𝙤𝙥𝙞𝙤 𝙘𝙪𝙚𝙧𝙥𝙤 𝙡𝙖 𝙢𝙖𝙡𝙙𝙞𝙩𝙖 𝙯𝙤𝙧𝙧𝙖!*\n\n*${text}*\n🤤🥵 *¡𝐘𝐀 𝐓𝐄 𝐇𝐀𝐍 𝐅𝐎𝐋𝐋𝐀𝐃𝐎!* 🥵🤤`, null, { mentions: [user] })}

//------------------------------------------------------------------------------------

if (command == 'formarpareja' || command == 'formarparejas') { 
let toM = a => '@' + a.split('@')[0]  
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
let vn = './media/Vivan.mp3'
conn.sendFile(m.chat, vn, 'Vivan.mp3', null, m, true, { type: 'audioMessage', ptt: true, sendEphemeral: true })
m.reply(`*${toM(a)}, 𝙔𝙖 𝙚𝙨 𝙝𝙤𝙧𝙖 𝙙𝙚 𝙦𝙪𝙚 𝙩𝙚 💍 𝘾𝙖𝙨𝙚𝙨 𝙘𝙤𝙣 ${toM(b)}, 𝙇𝙞𝙣𝙙𝙖 𝙋𝙖𝙧𝙚𝙟𝙖 😉💓*`, null, {
mentions: [a, b]})}

//------------------------------------------------------------------------------------

if (command == 'lesbiana') { 
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES 🏳️‍🌈* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()}*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})} 
  
//------------------------------------------------------------------------------------
  
if (command == 'pajero') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES 😏💦* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()}*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})}
  
//------------------------------------------------------------------------------------
  
if (command == 'pajera') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES 😏💦* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()}*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})}
  
//------------------------------------------------------------------------------------
  
if (command == 'puto') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()},* *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵 XD*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})}
  
//------------------------------------------------------------------------------------
  
if (command == 'puta') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()},* *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵 XD*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})} 

//------------------------------------------------------------------------------------
  
if (command == 'manco') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 💩*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})}
  
//------------------------------------------------------------------------------------
  
if (command == 'manca') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 💩*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})}   
  
//------------------------------------------------------------------------------------ 
  
if (command == 'rata') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 🐁 COME QUESO 🧀*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})}
  
//------------------------------------------------------------------------------------ 
  
if (command == 'prostituto') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` ) 
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 🫦👅, QUIEN QUIERE DE SUS SERVICIOS? XD*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})}
  
//------------------------------------------------------------------------------------
  
if (command == 'prostituta') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` )  
conn.reply(m.chat, `_*${text.toUpperCase()}* *ES* *${(500).getRandom()}%* *${command.replace('how', '').toUpperCase()} 🫦👅, QUIEN QUIERE DE SUS SERVICIOS? XD*_`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})} 
  
//------------------------------------------------------------------------------------
if (command == 'love') {
if (!text) return m.reply(`🤔 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 𝙖𝙡 𝙥𝙚𝙧𝙨𝙤𝙣𝙖 @𝙏𝘼𝙂 𝙤 𝙚𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚` )  
conn.reply(m.chat, ` *❤️❤️ MEDIDOR DE AMOR ❤️❤️* 
*El amor de ${text} por ti es de* *${Math.floor(Math.random() * 100)}%* *de un 100%*
*Deberias pedirle que sea tu  novia/o ?*`.trim(), m, m.mentionedJid ? {
 mentions: m.mentionedJid
 } : {})} 

//------------------------------------------------------------------------------------
if (command == 'personalidad') {
if (!text) return conn.reply(m.chat, 'Ingrese un nombre?', m)
let personalidad = `┏━━°❀❬ *PERSONALIDAD}* ❭❀°━━┓
*┃*
*┃• Nombre* : ${text}
*┃• Buena Moral* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Mala Moral* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Tipo de persona* : ${pickRandom(['De buen corazón','Arrogante','Tacaño','Generoso','Humilde','Tímido','Cobarde','Entrometido','Cristal','No binarie XD', 'Pendejo'])}
*┃• Siempre* : ${pickRandom(['Pesado','De malas','Distraido','De molestoso','Chismoso','Pasa jalandosela','De compras','Viendo anime','Chatea en WhatsApp porque esta soltero','Acostado bueno para nada','De mujeriego','En el celular'])}
*┃• Inteligencia* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Morosidad* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Coraje* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Miedo* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Fama* : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
*┃• Género* : ${pickRandom(['Hombre', 'Mujer', 'Homosexual', 'Bisexual', 'Pansexual', 'Feminista', 'Heterosexual', 'Macho alfa', 'Mujerzona', 'Marimacha', 'Palosexual', 'PlayStationSexual', 'Sr. Manuela', 'Pollosexual'])}
┗━━━━━━━━━━━━━━━━`
conn.reply(m.chat, personalidad, m, { mentions: conn.parseMention(personalidad) })
}

//------------------------------------------------------------------------------------
if (command == 'topgays') {
let vn = './media/gay2.mp3'
let top = `*🌈TOP 10 GAYS/LESBIANAS DEL GRUPO🌈*
    
*_1.- 🏳️‍🌈 ${user(a)}_* 🏳️‍🌈
*_2.- 🪂 ${user(b)}_* 🪂
*_3.- 🪁 ${user(c)}_* 🪁
*_4.- 🏳️‍🌈 ${user(d)}_* 🏳️‍🌈
*_5.- 🪂 ${user(e)}_* 🪂
*_6.- 🪁 ${user(f)}_* 🪁
*_7.- 🏳️‍🌈 ${user(g)}_* 🏳️‍🌈
*_8.- 🪂 ${user(h)}_* 🪂
*_9.- 🪁 ${user(i)}_* 🪁
*_10.- 🏳️‍🌈 ${user(j)}_* 🏳️‍🌈`
m.reply(top, null, { mentions: conn.parseMention(top) })
conn.sendFile(m.chat, vn, 'error.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true })}
    
//------------------------------------------------------------------------------------    
if (command == 'top') {
if (!text) throw `Ejemplo de uso:\n.top *texto*`
let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b = ps.getRandom()
let c = ps.getRandom()
let d = ps.getRandom()
let e = ps.getRandom()
let f = ps.getRandom()
let g = ps.getRandom()
let h = ps.getRandom()
let i = ps.getRandom()
let j = ps.getRandom()
let k = Math.floor(Math.random() * 70);
let x = `${pickRandom(['🤓','😅','😂','😳','😎', '🥵', '😱', '🤑', '🙄', '💩','🍑','🤨','🥴','🔥','👇🏻','😔', '👀','🌚'])}`
let l = Math.floor(Math.random() * x.length);
let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`
let top = `*${x} Top 10 ${text} ${x}*
    
*1. ${user(a)}*
*2. ${user(b)}*
*3. ${user(c)}*
*4. ${user(d)}*
*5. ${user(e)}*
*6. ${user(f)}*
*7. ${user(g)}*
*8. ${user(h)}*
*9. ${user(i)}*
*10. ${user(j)}*`
m.reply(top, null, { mentions: [a, b, c, d, e, f, g, h, i, j]})
conn.sendFile(m.chat, vn, 'error.mp3', null, m, true, {
type: 'audioMessage',
ptt: true })}

//------------------------------------------------------------------------------------
if (command == 'topotakus') {
let vn = './media/otaku.mp3'
let top = `*🌸 TOP 10 OTAKUS DEL GRUPO 🌸*
    
*_1.- 💮 ${user(a)}_* 💮
*_2.- 🌷 ${user(b)}_* 🌷
*_3.- 💮 ${user(c)}_* 💮
*_4.- 🌷 ${user(d)}_* 🌷
*_5.- 💮 ${user(e)}_* 💮
*_6.- 🌷 ${user(f)}_* 🌷
*_7.- 💮 ${user(g)}_* 💮
*_8.- 🌷 ${user(h)}_* 🌷
*_9.- 💮 ${user(i)}_* 💮
*_10.- 🌷 ${user(j)}_* 🌷`
m.reply(top, null, { mentions: conn.parseMention(top) })
conn.sendFile(m.chat, vn, 'otaku.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true 
})}
  
//------------------------------------------------------------------------------------  
if (command == 'topintegrantes' || command == 'topintegrante') {
let top = `*_💎TOP 10 L@S MEJORES INTEGRANTES👑_*
    
*_1.- 💎 ${user(a)}_* 💎
*_2.- 👑 ${user(b)}_* 👑
*_3.- 💎 ${user(c)}_* 💎
*_4.- 👑 ${user(d)}_* 👑
*_5.- 💎 ${user(e)}_* 💎
*_6.- 👑 ${user(f)}_* 👑
*_7.- 💎 ${user(g)}_* 💎
*_8.- 👑 ${user(h)}_* 👑
*_9.- 💎 ${user(i)}_* 💎
*_10.- 👑 ${user(j)}_* 👑`
m.reply(top, null, { mentions: conn.parseMention(top) })}
   
//------------------------------------------------------------------------------------   
if (command == 'toplagrasa' || command == 'topgrasa') {
let top = `*_Uwu TOP 10 LA GRASA Uwu_* 
    
*_1.- Bv ${user(a)} Bv_*
*_2.- :v ${user(b)} :v_*
*_3.- :D ${user(c)} :D_*
*_4.- Owo ${user(d)} Owo_*
*_5.- U.u ${user(e)} U.u_*
*_6.- >:v ${user(f)} >:v_*
*_7.- :'v ${user(g)} :'v_*
*_8.- ._. ${user(h)} ._._*
*_9.- :V ${user(i)} :V_*
*_10.- XD ${user(j)} XD_*`
m.reply(top, null, { mentions: conn.parseMention(top) })}
   
//------------------------------------------------------------------------------------  
if (command == 'toppanafrescos' || command == 'toppanafresco') {
let top = `*_👊TOP 10 PANAFRESCOS👊_* 
    
*_1.- 🤑 ${user(a)}_* 🤑
*_2.- 🤙 ${user(b)}_* 🤙
*_3.- 😎 ${user(c)}_* 😎
*_4.- 👌 ${user(d)}_* 👌
*_5.- 🧐 ${user(e)}_* 🧐
*_6.- 😃 ${user(f)}_* 😃
*_7.- 😋 ${user(g)}_* 😋
*_8.- 🤜 ${user(h)}_* 🤜
*_9.- 💪 ${user(i)}_* 💪
*_10.- 😉 ${user(j)}_* 😉`
m.reply(top, null, { mentions: conn.parseMention(top) })}
   
//------------------------------------------------------------------------------------ 
if (command == 'topshiposters' || command == 'topshipost') {
let top = `*_😱TOP 10 SHIPOSTERS DEL GRUPO😱_* 
    
*_1.- 😈 ${user(a)}_* 😈
*_2.- 🤙 ${user(b)}_* 🤙
*_3.- 🥶 ${user(c)}_* 🥶
*_4.- 🤑 ${user(d)}_* 🤑
*_5.- 🥵 ${user(e)}_* 🥵
*_6.- 🤝 ${user(f)}_* 🤝
*_7.- 😟 ${user(g)}_* 😟
*_8.- 😨 ${user(h)}_* 😨
*_9.- 😇 ${user(i)}_* 😇
*_10.- 🤠 ${user(j)}_* 🤠`
m.reply(top, null, { mentions: conn.parseMention(top) })}
   
//------------------------------------------------------------------------------------ 
if (command == 'toppajeros' || command == 'toppajer@s') {
let top = `*_😏TOP L@S MAS PAJEROS/AS DEL GRUPO💦_* 
    
*_1.- 🥵 ${user(a)}_* 💦
*_2.- 🥵 ${user(b)}_* 💦
*_3.- 🥵 ${user(c)}_* 💦
*_4.- 🥵 ${user(d)}_* 💦
*_5.- 🥵 ${user(e)}_* 💦
*_6.- 🥵 ${user(f)}_* 💦
*_7.- 🥵 ${user(g)}_* 💦
*_8.- 🥵 ${user(h)}_* 💦
*_9.- 🥵 ${user(i)}_* 💦
*_10.- 🥵 ${user(j)}_* 💦`
m.reply(top, null, { mentions: conn.parseMention(top) })}
   
//------------------------------------------------------------------------------------ 
if (command == 'toplind@s' || command == 'toplindos') {
let top = `*_😳TOP L@S MAS LIND@S Y SEXIS DEL GRUPO😳_*
    
*_1.- ✨ ${user(a)}_* ✨
*_2.- ✨ ${user(b)}_* ✨
*_3.- ✨ ${user(c)}_* ✨
*_4.- ✨ ${user(d)}_* ✨
*_5.- ✨ ${user(e)}_* ✨
*_6.- ✨ ${user(f)}_* ✨
*_7.- ✨ ${user(g)}_* ✨
*_8.- ✨ ${user(h)}_* ✨
*_9.- ✨ ${user(i)}_* ✨
*_10.- ✨ ${user(j)}_* ✨`
m.reply(top, null, { mentions: conn.parseMention(top) })}
   
//------------------------------------------------------------------------------------ 
if (command == 'topputos' || command == 'topput@s') {
let top = `*_😏TOP L@S MAS PUT@S DEL GRUPO SON🔥_* 
    
*_1.- 👉 ${user(a)}_* 👌
*_2.- 👉 ${user(b)}_* 👌
*_3.- 👉 ${user(c)}_* 👌
*_4.- 👉 ${user(d)}_* 👌
*_5.- 👉 ${user(e)}_* 👌
*_6.- 👉 ${user(f)}_* 👌
*_7.- 👉 ${user(g)}_* 👌
*_8.- 👉 ${user(h)}_* 👌
*_9.- 👉 ${user(i)}_* 👌
*_10.- 👉 ${user(j)}_* 👌`
m.reply(top, null, { mentions: conn.parseMention(top) })}
   
//------------------------------------------------------------------------------------ 
if (command == 'topfamosos' || command == 'topfamos@s') {
let top = `*_🌟TOP PERSONAS FAMOSAS EN EL GRUPO🌟_* 
    
*_1.- 🛫 ${user(a)}_* 🛫
*_2.- 🥂 ${user(b)}_* 🥂
*_3.- 🤩 ${user(c)}_* 🤩
*_4.- 🛫 ${user(d)}_* 🛫
*_5.- 🥂 ${user(e)}_* 🥂
*_6.- 🤩 ${user(f)}_* 🤩
*_7.- 🛫 ${user(g)}_* 🛫
*_8.- 🥂 ${user(h)}_* 🥂
*_9.- 🤩 ${user(i)}_* 🤩
*_10.- 🛫 ${user(j)}_* 🛫`
m.reply(top, null, { mentions: conn.parseMention(top) })}
   
//------------------------------------------------------------------------------------ 
if (command == 'topsostero') {
let top = `*_😏TOP PERSONAS SOLTERO/A DEL GRUPO😏_* 
    
*_1.- 😎 ${user(a)}_* 😎
*_2.- 😏 ${user(b)}_* 😏
*_3.- 😏 ${user(c)}_* 😏
*_4.- 😎 ${user(d)}_* 😎
*_5.- 😏 ${user(e)}_* 😏
*_6.- 😎 ${user(f)}_* 😎
*_7.- 😏 ${user(g)}_* 😏
*_8.- 😎 ${user(h)}_* 😎
*_9.- 😎 ${user(i)}_* 😎
*_10.- 😏 ${user(j)}_* 😏`
m.reply(top, null, { mentions: conn.parseMention(top) })}
   
//------------------------------------------------------------------------------------    
if (command == 'topparejas' || command == 'top5parejas') {
let top = `*_😍 Las 5 maravillosas parejas del grupo 😍_*
    
*_1.- ${user(a)} 💘 ${user(b)}_* 
Que hermosa pareja 💖, me invitan a su Boda 🛐

*_2.- ${user(c)} 💘 ${user(d)}_*  
🌹 Ustedes se merecen lo mejor del mundo 💞

*_3.- ${user(e)} 💘 ${user(f)}_* 
Tan enamorados 😍, para cuando la familia 🥰

*_4.- ${user(g)} 💘 ${user(h)}_* 
💗 Decreto que ustedes son la pareja del Año 💗 

*_5.- ${user(i)} 💘 ${user(j)}_* 
Genial! 💝, están de Luna de miel 🥵✨❤️‍🔥`
m.reply(top, null, { mentions: conn.parseMention(top) })
}}
handler.help = ['love', 'gay', 'gay2', 'amistad', 'amigorandom', 'violar', 'follar', 'lesbiana', 'formarpareja', 'formarparejas','pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'].map(v => v + ' @tag | nombre')
handler.tags = ['calculator']
handler.command = /^love|violar|follar|amistad|amigorandom|gay|gay2|lesbiana|pajero|formarpareja|formarparejas|pajera|puto|puta|manco|manca|rata|prostituta|prostituto|personalidad|topgays|top|topputos|toplindos|toplind@s|toppajer@s|toppajeros|topshipost|topshiposters|toppanafresco|topgrasa|toppanafrescos|toplagrasa|topintegrante|topintegrantes|topotakus|topfamosos|topfamos@s|topsostero|topparejas|top5parejas/i
handler.exp = 100
handler.register = true
handler.group = true
export default handler
const delay = time => new Promise(res => setTimeout(res, time))
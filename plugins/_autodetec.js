let WAMessageStubType = (await import(global.baileys)).default
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';
export async function before(m, { conn, participants, groupMetadata}) {
if (!m.messageStubType || !m.isGroup) return
let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://telegra.ph/file/2a1d71ab744b55b28f1ae.jpg')
let img = await (await fetch(`${pp}`)).buffer()
let usuario = `@${m.sender.split`@`[0]}` 
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let chat = global.db.data.chats[m.chat]
let users = participants.map(u => conn.decodeJid(u.id))
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')

/*if (chat.detect && m.messageStubType == 2) {
const chatId = m.isGroup ? m.chat : m.sender;
const uniqid = chatId.split('@')[0];
const sessionPath = './BotSession/';
const files = await fs.readdir(sessionPath);
let filesDeleted = 0;
for (const file of files) {
if (file.includes(uniqid)) {
await fs.unlink(path.join(sessionPath, file));
filesDeleted++;
console.log(`⚠️ Eliminacion session (PreKey) que provocan el undefined el chat`)}}

} else*/ if (chat.detect && m.messageStubType == 21) {
await this.sendMessage(m.chat, { text: `${usuario} \`${await tr("HAS CAMBIADO EL NOMBRE DEL GRUPO A")}:\`\n\n> *${m.messageStubParameters[0]}*`, mentions: [m.sender], mentions: [...groupAdmins.map(v => v.id)] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) 
} else if (chat.detect && m.messageStubType == 22) {
await this.sendMessage(m.chat, { text: `${usuario} \`${await tr("HAS CAMBIADO LAS FOTO DEL GRUPO")}\``, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100}) 
} else if (chat.detect && m.messageStubType == 24) {
await this.sendMessage(m.chat, { text: `${usuario} ${await tr("NUEVA DESCRIPCIÓN DEL GRUPO ES ")}:\n\n${m.messageStubParameters[0]}`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.detect && m.messageStubType == 25) {
await this.sendMessage(m.chat, { text: `🔒 ${await tr("AHORA")} *${m.messageStubParameters[0] == 'on' ? await tr('SOLO ADMINS') : await tr('TODOS')}* ${await tr("PUEDE EDITAR LA INFORMACIÓN DEL GRUPO")}`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.detect && m.messageStubType == 26) {
await this.sendMessage(m.chat, { text: `${await tr("EL GRUPO")} *${m.messageStubParameters[0] == 'on' ? 'ESTA CERRADO 🔒' : 'ESTA ABIERTO 🔓'}*\n ${m.messageStubParameters[0] == 'on' ? await tr('SOLO LOS ADMINS PUEDEN ESCRIBIR') : await tr('YA PUEDEN ESCRIBIR TODOS')} ${await tr("EN ESTE GRUPO")}`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.welcome && m.messageStubType == 27 && this.user.jid != global.conn.user.jid) { 
let subject = groupMetadata.subject
let descs = groupMetadata.desc || "*ᴜɴ ɢʀᴜᴘᴏ ɢᴇɴɪᴀ😸*\n *sɪɴ ʀᴇɢʟᴀ 😉*";
let userName = `${m.messageStubParameters[0].split`@`[0]}`;
let defaultWelcome = `┏━━━━━━━━━━━━\n┃──〘 *WELCOME* 〙──\n┃━━━━━━━━━━━━\n┃ *${await tr("Hola")} @${userName} 👋 ${await tr("Bienvenido a")}*\n┃ *_${subject} ✨_*\n┃\n┃=> *_${await tr("En este grupo podrás")}_*\n┃ *_${await tr("encontrar")}:_*\n┠⊷ *${await tr("Amistades")} 🫂* \n┠⊷ *${await tr("Desmadre")} 💃🕺*\n┠⊷ *${await tr("Relajo")} 💅*\n┠⊷ *${await tr("Enemig@s")} 🥵*\n┠⊷ *${await tr("Un Bot Sexy")}*\n┃\n┃=> *_${await tr("Puedes solicitar mi lista de")}_*\n┃ *_${await tr("comandos con:")}_*\n┠⊷ *#menu*\n┃\n┃=> *_${await tr("Aquí tienes la descripción")}_*\n┃ *_${await tr("del grupo, léela!!")}_*\n┃\n\n${descs}\n\n┃\n┃ *_🥳 ${await tr("Disfruta de tu")}_*\n┃ *_${await tr("estadía en el grupo 🥳")}_*\n┃\n┗━━━━━━━━━━━`;
let textWel = chat.sWelcome ? chat.sWelcome
.replace(/@user/g, `@${userName}`)
.replace(/@group/g, subject) 
.replace(/@desc/g, descs)
: defaultWelcome;
                
await this.sendMessage(m.chat, { text: textWel, 
contextInfo:{
forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id || "120363355261011910@newsletter", serverMessageId: '', newsletterName: channelRD.name || wm },
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[m.sender, m.messageStubParameters[0]],
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
thumbnailUrl: pp, 
title: "BIENVENID@ 😄",
body: [wm, ' ' + wm + '😊', '🌟'].getRandom(),
containsAutoReply: true,
mediaType: 1, 
sourceUrl: [nna, nna2, yt].getRandom()}}}, { quoted: fkontak }) 
} else if (chat.welcome && (m.messageStubType == 28 || m.messageStubType == 32) && this.user.jid != global.conn.user.jid ) {
let subject = groupMetadata.subject;
let userName = `${m.messageStubParameters[0].split`@`[0]}`;
let defaultBye = `┏━━━━━━━━━━━━\n┃──〘 *ADIOS* 〙───\n┃━━━━━━━━━━━━\n┃ *_☠ ${await tr("Se fue ")} @${userName}_* \n┃ *_${await tr("Que dios lo bendiga")}️_* \n┃ *_${await tr("Y lo atropelle un tren")} 😇_*\n┗━━━━━━━━━━`;
let textBye = chat.sBye ? chat.sBye
.replace(/@user/g, `@${userName}`)
.replace(/@group/g, subject)
: defaultBye;
await this.sendMessage(m.chat, { text: textBye, 
contextInfo:{
forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id || "120363355261011910@newsletter", serverMessageId: '', newsletterName: channelRD.name || wm },
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[m.sender, m.messageStubParameters[0]],
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
thumbnailUrl: pp, 
title: "BYE 👋",
body: [wm, ' ' + wm + '😊', '🌟'].getRandom(),
containsAutoReply: true,
mediaType: 1, 
sourceUrl: [nna, nna2, nnaa, yt, md].getRandom()}}}, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType == 29) {
let subject = groupMetadata.subject;
let defaultPromote = `@${m.messageStubParameters[0].split`@`[0]} ${await tr("AHORA ES ADMIN EN ESTE GRUPO")}\n\n😼🫵
${await tr("ACCIÓN REALIZADA POR:")} ${usuario}`
let textAdm = chat.sPromote ? chat.sPromote
.replace(/@user/g, `@${m.messageStubParameters[0].split`@`[0]}`)
.replace(/@autor/g, `${usuario}`)
.replace(/@group/g, subject) 
: defaultPromote;
await this.sendMessage(m.chat, { text: textAdm,  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363355261011910@newsletter', 
serverMessageId: '', 
newsletterName: 'LoliBot ✨️' },
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)],
externalAdReply: {  
showAdAttribution: true,  
renderLargerThumbnail: false,  
title: "NUEVO ADMINS 🥳",
body: wm,
containsAutoReply: true,  
mediaType: 1,   
thumbnailUrl: pp, 
sourceUrl: [nna, nna2, nnaa].getRandom()
}}}, { quoted: fkontak })
//await this.sendMessage(m.chat, { text: textAdm, mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.detect && m.messageStubType == 30) {
let subject = groupMetadata.subject;
let defaultDemote = `@${m.messageStubParameters[0].split`@`[0]} ${await tr("DEJA DE SER ADMIN EN ESTE GRUPO")}\n\n😼🫵${await tr("ACCIÓN REALIZADA POR:")} ${usuario}`
let textAdmin = chat.sDemote ? chat.sDemote
.replace(/@user/g, `@${m.messageStubParameters[0].split`@`[0]}`)
.replace(/@autor/g, `${usuario}`)
.replace(/@group/g, subject) 
: defaultDemote;
await this.sendMessage(m.chat, { text: textAdmin,  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363355261011910@newsletter', 
serverMessageId: '', 
newsletterName: 'LoliBot ✨️' },
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)],
externalAdReply: {  
showAdAttribution: true,  
renderLargerThumbnail: false,  
title: "📛 UN ADMINS MENOS",
body: wm,
containsAutoReply: true,  
mediaType: 1,   
thumbnailUrl: pp, 
sourceUrl: [nna, nna2, nnaa].getRandom()
}}}, { quoted: fkontak })
//await this.sendMessage(m.chat, { text: textAdmin, mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
} else if (chat.detect && m.messageStubType === 172 && m.messageStubParameters.length > 0) {
const rawUser = m.messageStubParameters[0];
const users = rawUser.split('@')[0];
const prefijosProhibidos = ['+91', '+92', '+222', '+93', '+265', '+61', '+62', '+966', '+229', '+40', '+49', '+20', '+963', '+967', '+234', '+210', '+212'];
const usersConPrefijo = users.startsWith('+') ? users : `+${users}`;

if (chat.antifake) {
const esProhibido = prefijosProhibidos.some(prefijo => {
const coincide = usersConPrefijo.startsWith(prefijo);
return coincide;
});

if (esProhibido) {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'reject');
console.log(`Solicitud de ${usersConPrefijo} rechazada por prefijo prohibido.`);
} catch (error) {
console.error(`Error al rechazar la solicitud de ${usersConPrefijo}:`, error);
}} else {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
console.log(`Solicitud de ${usersConPrefijo} aprobada (no tiene prefijo prohibido).`);
} catch (error) {
console.error(`Error al aprobar la solicitud de ${usersConPrefijo}:`, error);
}}} else {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
console.log(`Solicitud de ${usersConPrefijo} aprobada (antifake desactivado).`);
} catch (error) {
console.error(`Error al aprobar la solicitud de ${usersConPrefijo}:`, error);
}}
return; /*
} if (chat.detect && m.messageStubType == 72) {
await this.sendMessage(m.chat, { text: `${usuario} 𝘾𝘼𝙈𝘽𝙄𝙊 𝙇𝘼𝙎 𝘿𝙐𝙍𝘼𝘾𝙄𝙊𝙉 𝘿𝙀𝙇 𝙇𝙊𝙎 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝙏𝙀𝙈𝙋𝙊𝙍𝘼𝙇𝙀𝙎 𝘼 *@${m.messageStubParameters[0]}*`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}  else if (chat.detect && m.messageStubType == 123) {
await this.sendMessage(m.chat, { text: `${usuario} *𝘿𝙀𝙎𝘼𝘾𝙏𝙄𝙑𝙊́* 𝙇𝙊𝙎 𝙈𝙀𝙉𝙎𝘼𝙅𝙀 𝙏𝙀𝙈𝙋𝙊𝙍𝘼𝙇.`, mentions: [m.sender] }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})*/
} else {
console.log({messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType], 
})}}

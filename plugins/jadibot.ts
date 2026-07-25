// @ts-nocheck

//import makeWASocket, { Browsers, WASocket, proto, fetchLatestBaileysVersion, useMultiFileAuthState, DisconnectReason } from "baileys"
//import baileys from "@whiskeysockets/baileys"
import {
  makeWASocket,
  Browsers,
  fetchLatestBaileysVersion,
  DisconnectReason,
  useMultiFileAuthState
} from "@whiskeysockets/baileys"
import fs from "fs"
import path from "path"
import chalk from "chalk"
import NodeCache from "node-cache"
import P from "pino"
import { handler, participantsUpdate, handleJoinRequest, groupsUpdate } from "../handler.js"
import { db, setPrefix, setBotSettings, getPrefix } from "../lib/db.js"
import fetch from "node-fetch" 

const restartingSub: Record<string, boolean> = {}
const reconnectTimers: Record<string, NodeJS.Timeout | null> = {}
const reintentos: Record<string, number> = {}
const msgStore = new Map<string, any>()
const cod_enviado: Record<string, boolean> = {}
const activeSubSockets: Record<string, any> = {}
const subbotLocks = new Set<string>()
const subbotStarting = new Set<string>()
const announcedOpen = new Set<string>()
export const subbotUptimes: Record<string, number> = {}

function getCurrentServerIdentifier() {
  return String(
    process.env.P_SERVER_UUID ||
    process.env.SERVER_UUID ||
    process.env.PTERO_SERVER_IDENTIFIER ||
    ""
  ).trim().slice(0, 8)
}

function getCurrentSubbotLimit() {
  const currentIdentifier = getCurrentServerIdentifier()

  const free1Identifier = String(process.env.FREE_SERVER_1_IDENTIFIER || "").trim()
  const free2Identifier = String(process.env.FREE_SERVER_2_IDENTIFIER || "").trim()

  if (currentIdentifier && currentIdentifier === free1Identifier) {
    return Number(process.env.FREE_SERVER_1_LIMIT || 100)
  }

  if (currentIdentifier && currentIdentifier === free2Identifier) {
    return Number(process.env.FREE_SERVER_2_LIMIT || 100)
  }

  return Number(process.env.TEMP_SUBBOT_LIMIT || 50)
}

function countLocalSubbots() {
  const base = path.resolve("./sessions")
  let folders = 0

  try {
    if (fs.existsSync(base)) {
      folders = fs.readdirSync(base)
        .filter(f => f.startsWith("sub_"))
        .filter(f => fs.existsSync(path.join(base, f, "creds.json")))
        .length
    }
  } catch {}

  const sockets = Object.keys(activeSubSockets || {}).length
  return Math.max(folders, sockets)
}

function hasLocalSubbotSession(numero: string) {
  return fs.existsSync(path.resolve(`./sessions/sub_${numero}/creds.json`))
}

function canCreateMoreSubbots(numero: string) {
  if (hasLocalSubbotSession(numero)) return true

  const limit = getCurrentSubbotLimit()
  const total = countLocalSubbots()

  return total < limit
}

function getLimitInfo() {
  const currentIdentifier = getCurrentServerIdentifier()

  const free1Identifier = String(process.env.FREE_SERVER_1_IDENTIFIER || "").trim()
  const free2Identifier = String(process.env.FREE_SERVER_2_IDENTIFIER || "").trim()

  let serverName = "free-temporal"

  if (currentIdentifier && currentIdentifier === free1Identifier) {
    serverName = process.env.FREE_SERVER_1_NAME || "free-1"
  }

  if (currentIdentifier && currentIdentifier === free2Identifier) {
    serverName = process.env.FREE_SERVER_2_NAME || "free-2"
  }

  return {
    serverIdentifier: currentIdentifier || "otro",
    serverName,
    limit: getCurrentSubbotLimit(),
    total: countLocalSubbots()
  }
}

async function saveSubbotInstance({
  ownerId,
  phone,
  botId,
  dir
}: {
  ownerId?: string | null
  phone: string
  botId: string
  dir: string
}) {
  const info = getLimitInfo()

  await db.query(
    `INSERT INTO subbot_instances
     (
       owner_id,
       phone,
       plan,
       ptero_server_id,
       session_id,
       session_path,
       status,
       created_at
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7,NOW())
     ON CONFLICT (session_id)
     DO UPDATE SET
       owner_id = CASE
         WHEN subbot_instances.owner_id LIKE '%@telegram'
           THEN subbot_instances.owner_id
         WHEN EXCLUDED.owner_id IS NULL
           THEN subbot_instances.owner_id
         ELSE EXCLUDED.owner_id
       END,
       phone = EXCLUDED.phone,
       plan = EXCLUDED.plan,
       ptero_server_id = EXCLUDED.ptero_server_id,
       session_path = EXCLUDED.session_path,
       status = 'active'`,
    [
      ownerId || null,
      botId || phone,
      'free',
      info.serverIdentifier,
      `sub_${phone}`,
      dir,
      'active'
    ]
  )
}

async function deleteSubbotInstance(phone: string, botId?: string) {
  await db.query(
    `DELETE FROM subbot_instances
     WHERE session_id = $1
     OR phone = $2
     OR phone = $3`,
    [
      `sub_${phone}`,
      phone,
      botId || phone
    ]
  ).catch(e => {
    console.error('❌ Error borrando subbot_instances:', e)
  })
}

function destroySubSocket(numero: string) {
  const old = activeSubSockets[numero]
  if (!old) return

  try { old.ev?.removeAllListeners?.() } catch {}
  try { old.ws?.close?.() } catch {}
  try { old.end?.() } catch {}

  delete activeSubSockets[numero]
}

function clearReconnectTimer(numero: string) {
  if (reconnectTimers[numero]) {
    clearTimeout(reconnectTimers[numero] as NodeJS.Timeout)
    reconnectTimers[numero] = null
  }
}

function scheduleReconnect(parentSock, m, numero: string, delay = 5000) {
  clearReconnectTimer(numero)

  reconnectTimers[numero] = setTimeout(async () => {
    reconnectTimers[numero] = null
    restartingSub[numero] = false
    await iniciarSubbot(parentSock, m, false, false)
  }, delay)
}

function clearSubbotSession(numero: string) {
  const dir = path.resolve(`./sessions/sub_${numero}`)
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true })
      console.log(chalk.red(`🗑️ Sesión subbot ${numero} eliminada`))
    }
  } catch (e) {
    console.error(`❌ Error borrando sesión subbot ${numero}:`, e)
  }
}

function getRealNumber(m) {
  if (m.key.remoteJid?.endsWith("@g.us")) {
    const jid = [m.key.participantAlt, m.key.participant, m.key.jid, m.key.participantPn]
      .find(j => j?.endsWith("@s.whatsapp.net")) || ""
    return jid.replace(/[^0-9]/g, "")
  }

  const jid = [m.key.remoteJid, m.key.remoteJidAlt, m.key.jid, m.key.senderPn]
    .find(j => j?.endsWith("@s.whatsapp.net")) || ""
  return jid.replace(/[^0-9]/g, "")
}

export async function iniciarSubbot(
  sock: WASocket,
  m: proto.IWebMessageInfo,
  isInitial: boolean = true,
  generaCodigo: boolean = true
) {
  const numero = getRealNumber(m)
  const dir = `./sessions/sub_${numero}`
  const sockMsg = typeof sock.sendMessage === "function"

  if (!numero) return

  if (generaCodigo && !canCreateMoreSubbots(numero)) {
    const info = getLimitInfo()

    await sock.sendMessage(m.chat || m.key.remoteJid!, { text: `⚠️ *Stocks llenos.*

🖥️ *Servidor:* ${info.serverName}
📦 *Subbots:* ${info.total}/${info.limit}

> No hay espacio disponible en este servidor en este momento.

🤖 Puedes intentar crear tu SubBot desde Telegram o desde la pagina web;
t.me/KuromiOfc_bot
https://api.mitzuki.xyz/bots

💡 Puede que otros servidores aún tengan espacio disponible.

💎 O adquirir un servidor premium sin límites de stock.` }, { quoted: m }).catch(() => {})

    return null
  }
  
  // evita doble arranque simultáneo del mismo número
  if (subbotStarting.has(numero)) {
    console.log(chalk.yellow(`⏳ Subbot ${numero} ya se está iniciando, salto.`))
    return activeSubSockets[numero] || null
  }

  // si ya está vivo, no levantar otro
  const current = activeSubSockets[numero]
  if (
    current &&
    current.user &&
    current.ws &&
    current.ws.readyState === 1
  ) {
    console.log(chalk.green(`✅ Subbot ${numero} ya está conectado, no duplico socket.`))
    return current
  }

  subbotStarting.add(numero)
  clearReconnectTimer(numero)

  // destruir socket viejo antes de crear otro
  destroySubSocket(numero)

  try {
    const { state, saveCreds } = await useMultiFileAuthState(dir)
    const { version } = await fetchLatestBaileysVersion()

    const msgRetryCounterCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
    const userDevicesCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
    const groupCache = new NodeCache({ stdTTL: 3600, checkperiod: 120 })

    console.info = () => {}

    const subSock = makeWASocket({
      logger: P({ level: "silent" }),
      printQRInTerminal: false,
      browser: ['Windows', 'Chrome'],
      auth: state,
      markOnlineOnConnect: false,
      generateHighQualityLinkPreview: true,
      syncFullHistory: false,
      getMessage: async () => '',
      msgRetryCounterCache,
      userDevicesCache,
      cachedGroupMetadata: async (jid) => groupCache.get(jid),
      version,
      keepAliveIntervalMs: 20000,
      defaultQueryTimeoutMs: 60000,
      connectTimeoutMs: 60000,
      qrTimeout: 60000,
      retryRequestDelayMs: 2500,
      fireInitQueries: true
    })

    activeSubSockets[numero] = subSock
    subSock.ev.on("creds.update", saveCreds)
    subSock.isMainBot = false
    subSock.isInit = false

    subSock.ev.on("connection.update", async ({ connection, lastDisconnect, isNewLogin, qr }) => {
      const err: any = lastDisconnect?.error
      const statusCode =
        err?.output?.statusCode ??
        err?.statusCode ??
        err?.code ??
        0

      if (connection === "open") {
        subSock.isInit = true
        sock.userId = numero

        const botId = subSock.user?.id?.split(":")[0] || numero
        const ownerName = subSock.authState?.creds?.me?.name || "-"
        subbotUptimes[botId] = Date.now()
        reintentos[numero] = 0
        restartingSub[numero] = false
        subbotLocks.add(numero)

        console.log(chalk.blueBright(`🤖 Subbot conectado: ${botId}`))

        // mandar aviso solo una vez por sesión/arranque manual
        if (sock.isFromCommand && m && !announcedOpen.has(numero)) {
          announcedOpen.add(numero)

await sock.sendMessage(m.chat, { text: `*Conectado exitosamente con WhatsApp ✅*\n\n*💻 Bot:* +${numero}\n*👤 Dueño:* ${ownerName}\n*🛠️ Prefix por default:* "*" _(tu subbot solo responde a ese prefijo puede cambiarlo con "*setprefix")_\n\n> *Unirte a nuestro canal para informarte de todas la Actualizaciónes/novedades sobre el bot*\nhttps://whatsapp.com/channel/0029VagJ2FF4CrfrS8BoLW2b` }, { quoted: m || null }).catch(() => {})
sock.isFromCommand = false
}

const info = getLimitInfo()

const tipo = (
  info.serverName === "free-1" ||
  info.serverName === "free-2"
)
  ? "subbot"
  : "subbot temporal"

await setBotSettings(botId, { tipo })
      await saveSubbotInstance({
  ownerId: m?.sender || null,
  phone: numero,
  botId,
  dir
})
          return
      }

      if (qr && generaCodigo && !cod_enviado[numero]) {
        cod_enviado[numero] = true

        try {
          const rand4 = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 4)
          const customPairingCode = "JADI" + rand4
          const code = await subSock.requestPairingCode(numero, customPairingCode)
          const pretty = code.match(/.{1,4}/g)?.join("-") || code

let txt = "*🔰 MITZUKI 🔰*\nㅤㅤㅤㅤSer sub bot\n\n*1️⃣ Dirígete a los tres puntos en la esquina superior derecha*\n*2️⃣ Opción: Dispositivos vinculados*\n*3️⃣ Vincular con código de teléfono*\n*4️⃣ Pega el código a continuación*\n*5️⃣ Recuerda que esto es gratuito (Por lo tanto muchas quejas no serán tomadas en cuenta).*\n> Codigo de 8 digitos vencen en 60 segundos\n\n*✎ IMPORTANTE:* _No recomendamos usar tu número principal o personal. Si por alguna razón WhatsApp decide suspender el número *(por uso no autorizado, spam, etc.)*, podrías perder el acceso._";
let msg;
try {
msg = await sock.sendMessage(m.chat, { image: { url: "https://files.evogb.win/GataBot_1778873753995" }, caption: txt }, { quoted: m });
} catch (e) {
msg = await sock.sendMessage(m.chat, { text: txt }, { quoted: m });
}

const msgCode = await sock.sendMessage(m.chat!, { text: pretty }, { quoted: m })
console.log(chalk.green(`📌 Subbot ${numero} → Código generado:`), chalk.cyan(pretty))
setTimeout(async () => {
await sock.sendMessage(m.chat!, { delete: msg.key }).catch(() => {})
await sock.sendMessage(m.chat!, { delete: msgCode.key }).catch(() => {})
}, 60000)
} catch (e) {
clearSubbotSession(numero)
await sock.sendMessage(m.chat || m.key.remoteJid!, { text: String(e) }, { quoted: m }).catch(() => {})
}
return
}

      if (connection === "close") {
        console.log(chalk.gray(`[SUBBOT CLOSE] ${numero}`))
        console.log({
          attempts: (reintentos[numero] || 0) + 1,
          statusCode,
          message: err?.message
        })

       destroySubSocket(numero)
        const botId = subSock.user?.id?.split(":")[0] || numero
        await deleteSubbotInstance(numero, botId)

        // logout real = borrar sesión
        if (statusCode === DisconnectReason.loggedOut) {
          console.log(chalk.red(`💀 Subbot ${numero} loggedOut`))
          clearReconnectTimer(numero)
          clearSubbotSession(numero)
          delete reintentos[numero]
          delete restartingSub[numero]
          subbotLocks.delete(numero)
          announcedOpen.delete(numero)

          if (sockMsg) {
            await sock.sendMessage(m.chat || m.key.remoteJid!, { text: "⚠️ Tu subbot perdió la sesión.\nUsa */code* para volver a vincular." }, { quoted: m || null}).catch(() => {})
          }
          return
        }

        // conflicto por socket duplicado
        if (statusCode === 440 || /conflict/i.test(err?.message || "")) {
          reintentos[numero] = (reintentos[numero] || 0) + 1

          if (reintentos[numero] > 20) {
            console.log(chalk.red(`💥 Subbot ${numero} quedó en conflicto muchas veces, paro reconexión.`))
            delete reintentos[numero]
            delete restartingSub[numero]
            subbotLocks.delete(numero)
            announcedOpen.delete(numero)
            return
          }

          console.log(chalk.yellow(`⚠️ Conflict en ${numero}, reintento ${reintentos[numero]}/20`))
          restartingSub[numero] = true
          scheduleReconnect(sock, m, numero, 8000 + (reintentos[numero] * 1500))
          return
        }

        // errores de auth
        if ([401, 403, 405].includes(statusCode)) {
          reintentos[numero] = (reintentos[numero] || 0) + 1

          if (reintentos[numero] >= 5) {
            console.log(chalk.red(`💀 Auth inválida subbot ${numero}`))
            clearSubbotSession(numero)
            delete reintentos[numero]
            delete restartingSub[numero]
            subbotLocks.delete(numero)
            announcedOpen.delete(numero)

            if (sockMsg) {
              await sock.sendMessage(m.chat || m.key.remoteJid!, { text: "⚠️ No se pudo reconectar tu subbot.\nUsa */code* nuevamente." }, { quoted: m || null}).catch(() => {})
            }
            return
          }

          restartingSub[numero] = true
          scheduleReconnect(sock, m, numero, 7000)
          return
        }

        // errores temporales
        reintentos[numero] = (reintentos[numero] || 0) + 1

        if (reintentos[numero] <= 30) {
          const delay = Math.min(30000, 5000 + reintentos[numero] * 2000)
          console.log(chalk.gray(`📶 Retry ${numero} (${reintentos[numero]}/30) en ${delay}ms`))
          restartingSub[numero] = true
          scheduleReconnect(sock, m, numero, delay)
          return
        }

        console.log(chalk.red(`💥 Subbot ${numero} demasiados reintentos`))
        delete reintentos[numero]
        delete restartingSub[numero]
        subbotLocks.delete(numero)
        announcedOpen.delete(numero)
      }
    })

    subSock.ev.on("messages.upsert", async ({ messages, type }) => {
      if (type !== "notify") return

      for (const msg of messages) {
        if (!msg?.message) continue
        if (msg.key.remoteJid === "status@broadcast") continue

        const id = msg.key.id || ""
        if (
          id.startsWith("BAE5") ||
          id.startsWith("3EB0") ||
          id.startsWith("EVO") ||
          id.startsWith("Lyru-") ||
          id.startsWith("EvoGlobalBot-") ||
          id.startsWith("B24E") ||
          id.startsWith("SUKI") ||
          id.startsWith("FizzxyTheGreat-") ||
          (id.startsWith("8SCO") && id.length === 20)
        ) continue

        if (msg.messageStubType) continue
        if (msg.message.protocolMessage || msg.message.pollUpdateMessage || msg.message.reactionMessage) continue

        const now = Date.now() / 1000
        if (msg.messageTimestamp && now - Number(msg.messageTimestamp) > 45) continue

        msgStore.set(msg.key.id, msg)

        try {
          const botId = subSock.user?.id?.split(":")[0]
          const prefix = await getPrefix(botId)
          await handler(subSock, msg, prefix)
        } catch (e) {
          console.error("❌ Handler error:", e)
        }
      }
    })

    subSock.ev.on("group-participants.update", async (update) => {
      try {
        await participantsUpdate(subSock, update)
      } catch (err) {
        console.error(chalk.red("❌ Error procesando group-participants.update:"), err)
      }
    })

    subSock.ev.on("group.join-request", async (data) => {
      const groupId = data.id
      const participants = [{
        jid: data.participant,
        pn: data.participantPn || null
      }]

      try {
        await handleJoinRequest(subSock, groupId, participants)
      } catch (err) {
        console.error("❌ Error aprobando join-request:", err)
      }
    })

    subSock.ev.on("groups.update", async (updates) => {
      if (!updates || !Array.isArray(updates)) return

      for (const update of updates) {
        if (!update || !update.id) continue

        try {
          const metadata = await subSock.groupMetadata(update.id).catch(() => null)
          if (metadata) groupCache.set(update.id, metadata)
          await groupsUpdate(subSock, update).catch(() => {})
        } catch (err) {
          console.error(`❌ groups.update loop error ${update?.id || "?"}:`, err)
        }
      }
    })

    return subSock
  } finally {
    subbotStarting.delete(numero)
  }
}

export default {
name: ["code", "serbot", "jadibot"],
help: ["code"],
desc: "conventirte en un sub bot",
tags: ["jadibot"],
//private: true,
run: async ({ conn, m }) => {
  const numero = getRealNumber(m)
  cod_enviado[numero] = false
  delete reintentos[numero]
  delete restartingSub[numero]
  conn.isFromCommand = true
  await iniciarSubbot(conn, m, true, true)
}
}
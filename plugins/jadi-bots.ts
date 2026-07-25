import { db } from "../lib/db.js"

function cleanNum(v = "") {
  return String(v).split("@")[0].replace(/\D/g, "")
}

function isFreeServer(serverId = "") {
  const s = String(serverId || "")
  return [
    process.env.FREE_SERVER_1_ID,
    process.env.FREE_SERVER_1_IDENTIFIER,
    process.env.FREE_SERVER_2_ID,
    process.env.FREE_SERVER_2_IDENTIFIER
  ].map(String).includes(s)
}

function getParticipantNumber(p: any) {
  return cleanNum(p.phoneNumber || p.id || p.lid || "")
}

export default {
  name: "bots",
  help: ["bots", "listbots"],
  desc: "Muestra resumen de bots",
  tags: ["jadibot"],

  run: async ({ conn, m }) => {
    const mains = await db.query(
      `SELECT bot_id, tipo
       FROM bot_settings
       WHERE tipo = 'main'`
    )

    const subs = await db.query(
      `SELECT phone, plan, ptero_server_id
       FROM subbot_instances
       WHERE status = 'active'`
    )

    const mainIds = mains.rows
      .map((r: any) => cleanNum(r.bot_id))
      .filter(Boolean)

    let free = 0
    let temporal = 0
    let premium = 0

    for (const row of subs.rows) {
      const id = cleanNum(row.phone)
      if (!id) continue

      if (mainIds.includes(id)) continue

      const plan = String(row.plan || "").toLowerCase()

      if (plan === "premium") premium++
      else if (plan === "temporal") temporal++
      else if (isFreeServer(row.ptero_server_id)) free++
    }

    const freeServers = [
      {
        name: process.env.FREE_SERVER_1_NAME || "free-1",
        id: String(process.env.FREE_SERVER_1_ID || ""),
        identifier: String(process.env.FREE_SERVER_1_IDENTIFIER || ""),
        limit: Number(process.env.FREE_SERVER_1_LIMIT || 100)
      },
      {
        name: process.env.FREE_SERVER_2_NAME || "free-2",
        id: String(process.env.FREE_SERVER_2_ID || ""),
        identifier: String(process.env.FREE_SERVER_2_IDENTIFIER || ""),
        limit: Number(process.env.FREE_SERVER_2_LIMIT || 100)
      }
    ]

    let stock = ""

    for (const s of freeServers) {
      const used = subs.rows.filter((r: any) => {
        const id = cleanNum(r.phone)
        if (!id || mainIds.includes(id)) return false

        return (
          String(r.ptero_server_id) === s.id ||
          String(r.ptero_server_id) === s.identifier
        )
      }).length

      stock += `• ${s.name}: ${used}/${s.limit}\n`
    }

    const botsGrupo: string[] = []
    const mentions: string[] = []

    if (m.chat?.endsWith("@g.us")) {
      try {
        const metadata = await conn.groupMetadata(m.chat)

        const ids = metadata.participants
          .map((p: any) => getParticipantNumber(p))
          .filter(Boolean)

        for (const row of mains.rows) {
          const id = cleanNum(row.bot_id)
          if (!id || !ids.includes(id)) continue

          botsGrupo.push(`➥ @${id} (Principal)`)
          mentions.push(`${id}@s.whatsapp.net`)
        }

        for (const row of subs.rows) {
          const id = cleanNum(row.phone)
          if (!id || !ids.includes(id)) continue
          if (mainIds.includes(id)) continue

          const plan = String(row.plan || "").toLowerCase()

          let tipo = ""
          if (plan === "premium") tipo = "Premium"
          else if (plan === "temporal") tipo = "Temporal"
          else if (isFreeServer(row.ptero_server_id)) tipo = "Free"
          else continue

          botsGrupo.push(`➥ @${id} (${tipo})`)
          mentions.push(`${id}@s.whatsapp.net`)
        }
      } catch {}
    }

    const total = mains.rows.length + free + premium
const totalEnGrupo = botsGrupo.length;

    let texto =
      `「 🤖 𝐁𝐎𝐓𝐒 」\n\n` +
      `❏ Principal: ${mains.rows.length}\n` +
      `❏ SubBot Free: ${free}\n` +
      `❏ Premium: ${premium}\n` +
      `❏ Total: ${total}\n\n`

    if (botsGrupo.length) {
      texto += `❏ En este grupo: ${totalEnGrupo}\n` + botsGrupo.join("\n") + `\n\n`
    }

    texto += `「 📊 𝐒𝐓𝐎𝐂𝐊 𝐅𝐑𝐄𝐄 」\n\n` + stock.trimEnd()

    return m.reply(texto.trim())
    //conn.sendMessage(m.chat, {text: texto.trim(), mentions }, { quoted: m })
  }
}
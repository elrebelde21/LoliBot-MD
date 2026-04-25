import { db } from '../lib/postgres.js'

const clean = (v = '') => v.replace(/:\d+/, '')

let handler = async (m, { conn, text, participants, metadata, command }) => {

if (/^(tagall|invocar|invocacion|todos|invocación)$/i.test(command)) {
  try {
    const metadata = await conn.groupMetadata(m.chat)
    const participants = metadata.participants || []
    if (!participants.length) return 

    const users = participants.map(p => clean(p.phoneNumber || p.id))
    const total = users.length

    await m.react("📣")

    let mensaje = `*⺀ ＡＣＴＩＶＥ ＧＲＵＰＯ 🗣️⺀*\n\n`
    if (text && text.trim()) {
      mensaje += `❏ *Mensaje:* ${text.trim()}\n`
    }
    mensaje += `*👥 Miembros del grupo:* ${total}\n`
    mensaje += `❏ *Etiquetas:*\n`
    mensaje += users.map(u => `➥ @${u.split('@')[0]}`).join("\n")

    await conn.sendMessage(m.chat, {
      text: mensaje,
      mentions: users
    }, { quoted: m })

  } catch (e) {
    console.error("❌ Error en tagall:", e)
  }
}

if (command === 'contador') {

  const result = await db.query(
    `SELECT user_id, message_count
     FROM messages
     WHERE group_id = $1`,
    [m.chat]
  )

  const rows = result.rows || []

  let memberData = participants.map(mem => {
    const ids = [
      mem.id,
      mem.phoneNumber,
      mem.lid
    ].filter(Boolean).map(clean)

    const userData = rows.find(r => ids.includes(clean(r.user_id))) || {
      message_count: 0
    }

    const mention = clean(mem.phoneNumber || mem.id)

    return {
      id: clean(mem.id),
      mention,
      messages: Number(userData.message_count || 0)
    }
  })

  memberData.sort((a, b) => b.messages - a.messages)

  const activeCount = memberData.filter(m => m.messages > 0).length
  const inactiveCount = memberData.filter(m => m.messages === 0).length

  let teks = `*📊 Actividad del grupo 📊*\n\n`
  teks += `□ Grupo: ${metadata.subject || 'Sin nombre'}\n`
  teks += `□ Total de miembros: ${participants.length}\n`
  teks += `□ Miembros activos: ${activeCount}\n`
  teks += `□ Miembros inactivos: ${inactiveCount}\n\n`
  teks += `*□ Lista de miembros:*\n`

  for (let mem of memberData) {
    const num = mem.mention.split('@')[0]
    teks += `➥ @${num} - Mensajes: ${mem.messages}\n`
  }

  await conn.sendMessage(m.chat, {
    text: teks,
    contextInfo: {
      mentionedJid: memberData.map(v => v.mention)
    }
  }, { quoted: m })
}

}

handler.help = ['tagall <mensaje>', 'invocar <mensaje>', 'contador']
handler.tags = ['group']
handler.command = /^(tagall|invocar|invocacion|todos|invocación|contador)$/i
handler.admin = true
handler.group = true

export default handler
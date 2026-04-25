import { db } from '../lib/postgres.js'

const cleanJid = (jid = '') => String(jid).replace(/:\d+/, '')

const getParticipantIds = (p = {}) => {
  return [
    p.id,
    p.phoneNumber,
    p.lid,
    p.participantAlt,
    p.jid
  ].filter(Boolean).map(cleanJid)
}

const findParticipant = (participants = [], who = '') => {
  who = cleanJid(who)

  return participants.find(p => {
    const ids = getParticipantIds(p)
    return ids.includes(who)
  })
}

const getUserMentionJid = (participant, fallback) => {
  return cleanJid(
    participant?.phoneNumber ||
    (participant?.id?.endsWith('@s.whatsapp.net') ? participant.id : null) ||
    fallback
  )
}

async function findUserByIds(uniqueIds = [], numbers = []) {
  // Buscar por id
  for (const id of uniqueIds) {
    const r = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [id])
    if (r.rows.length) return r.rows[0]
  }

  // Buscar por lid
  for (const id of uniqueIds) {
    const r = await db.query(`SELECT * FROM usuarios WHERE lid = $1`, [id])
    if (r.rows.length) return r.rows[0]
  }

  // Buscar por número
  for (const num of numbers) {
    const r = await db.query(`SELECT * FROM usuarios WHERE num = $1`, [num])
    if (r.rows.length) return r.rows[0]
  }

  return null
}

let handler = async (m, { conn, metadata }) => {
  try {
    let who

    if (m.isGroup) {
      who = m.mentionedJid?.[0] || m.quoted?.sender || m.quoted?.participant || false
    } else {
      who = m.chat
    }

    if (!who) {
      return m.reply(`*¿A quién le quito una advertencia?* Etiqueta a una persona con @tag o cita su mensaje.`)
    }

    who = cleanJid(who)

    const participants = metadata?.participants || []
    const participant = findParticipant(participants, who)

    const idsToSearch = [
      who,
      ...getParticipantIds(participant)
    ].filter(Boolean).map(cleanJid)

    const uniqueIds = [...new Set(idsToSearch)]
    const numbers = uniqueIds
      .map(v => v.split('@')[0])
      .filter(Boolean)

    const user = await findUserByIds(uniqueIds, numbers)

    if (!user) {
      return m.reply(`⚠️ Ese usuario no aparece en mi base de datos.`)
    }

    const userId = cleanJid(user.id)
    const mentionJid = getUserMentionJid(participant, userId)

    let warn = Number(user.warn || 0)

    if (warn > 0) {
      warn -= 1

      await db.query(
        `UPDATE usuarios SET warn = $2 WHERE id = $1`,
        [userId, warn]
      )

      await conn.sendMessage(m.chat, {
        text: `*⚠️ SE QUITÓ UNA ADVERTENCIA ⚠️*\n\nUsuario: @${mentionJid.split('@')[0]}\n*• Advertencia:* -1\n*• Total:* ${warn}`,
        mentions: [mentionJid]
      }, { quoted: m })

    } else {
      await conn.sendMessage(m.chat, {
        text: `*⚠️ El usuario @${mentionJid.split('@')[0]} no tiene ninguna advertencia.*`,
        mentions: [mentionJid]
      }, { quoted: m })
    }

  } catch (err) {
    console.error(err)
    m.reply('❌ Error ejecutando delwarn.')
  }
}

handler.help = ['delwarn @user', 'unwarn @user']
handler.tags = ['group']
handler.command = /^(delwarn|unwarn)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.register = true

export default handler
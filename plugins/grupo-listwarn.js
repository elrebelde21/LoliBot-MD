import { db } from '../lib/postgres.js'

const maxwarn = 3
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

let handler = async (m, { conn, participants, metadata }) => {
  try {
    const result = await db.query(`
      SELECT id, lid, warn
      FROM usuarios
      WHERE warn > 0
    `)

    const warnedUsers = []

    for (const user of result.rows) {
      const userIds = [
        user.id,
        user.lid
      ].filter(Boolean).map(cleanJid)

      const participant = participants.find(p => {
        const ids = getParticipantIds(p)
        return userIds.some(uid => ids.includes(uid))
      })

      if (!participant) continue

      const mentionJid = cleanJid(
        participant.phoneNumber ||
        (participant.id?.endsWith('@s.whatsapp.net') ? participant.id : null) ||
        user.id
      )

      warnedUsers.push({
        id: mentionJid,
        warn: Number(user.warn || 0)
      })
    }

    warnedUsers.sort((a, b) => b.warn - a.warn)

    let teks = `*📋 LISTA DE ADVERTENCIAS 📋*\n\n`
    teks += `Grupo: ${metadata.subject || 'Sin nombre'}\n`
    teks += `Total de usuarios con advertencias: ${warnedUsers.length}\n\n`

    if (warnedUsers.length === 0) {
      teks += `*¡No hay usuarios con advertencias en este grupo! 😊*`
    } else {
      teks += `*Usuarios advertidos:*\n`
      for (let user of warnedUsers) {
        teks += `➥ @${user.id.split('@')[0]} - Advertencias: ${user.warn}/${maxwarn}\n`
      }
    }

    await conn.sendMessage(m.chat, {
      text: teks,
      mentions: warnedUsers.map(u => u.id)
    }, { quoted: m })

  } catch (err) {
    console.error(err)
    m.reply('❌ Error ejecutando listwarn.')
  }
}

handler.help = ['listwarn']
handler.tags = ['group']
handler.command = /^listwarn$/i
handler.group = true
handler.admin = true
handler.register = true

export default handler
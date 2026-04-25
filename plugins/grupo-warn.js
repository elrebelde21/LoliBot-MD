import { db } from '../lib/postgres.js'

let handler = async (m, { conn, text, metadata }) => {
const maxwarn = 3
const cleanJid = (jid = '') => String(jid).replace(/:\d+/, '')
  try {
    let who

    if (m.isGroup) {
      who = m.mentionedJid?.[0] || m.quoted?.sender || false
    } else {
      who = m.chat
    }

    if (!who) {
      return m.reply(`*¿A quién le doy una advertencia?* Etiqueta a la persona con @tag o cita su mensaje.`)
    }

    who = cleanJid(who)

    const participant = metadata?.participants?.find(p => {
      const ids = [
        p.phoneNumber,
        p.id,
        p.lid
      ].filter(Boolean).map(cleanJid)

      return ids.includes(who)
    })

    const idsToSearch = [
      who,
      participant?.phoneNumber,
      participant?.id,      
      participant?.lid
    ].filter(Boolean).map(cleanJid)

    const uniqueIds = [...new Set(idsToSearch)]

    let userResult = await db.query(
      `SELECT * FROM usuarios WHERE id = ANY($1) OR lid = ANY($1)`,
      [uniqueIds]
    )

    if (!userResult.rows.length) {
      const realId = cleanJid(participant?.phoneNumber || participant?.id || who)
      const num = realId.split('@')[0]
      const userName = await conn.getName(realId).catch(() => num)

      await db.query(
        `INSERT INTO usuarios (id, nombre, num, registered)
         VALUES ($1, $2, $3, false)
         ON CONFLICT (id) DO NOTHING`,
        [realId, userName || num, num]
      )

      userResult = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [realId])
    }

    if (!userResult.rows.length) {
      return m.reply(`⚠️ No pude encontrar ni registrar ese usuario.`)
    }

    const user = userResult.rows[0]
    const userId = cleanJid(user.id)
    const mentionJid = cleanJid(participant?.phoneNumber || userId)
    const kickJid = cleanJid(participant?.id || userId)

    const adminName = (await conn.getName(m.sender).catch(() => null)) || m.sender.split('@')[0]
    let warn = Number(user.warn || 0)
    let reason = text || ''

for (const jid of m.mentionedJid || []) {
  const num = jid.split('@')[0].replace(/[^0-9]/g, '')
  reason = reason
    .replace(new RegExp(`@?${num}`, 'g'), '')
    .replace(new RegExp(`@?\\+?${num}`, 'g'), '')
}

reason = reason
  .replace(/\u2068|\u2069/g, '')
  .replace(/\s+/g, ' ')
  .trim() || 'No especificada'

    if (warn + 1 < maxwarn) {
      warn += 1

      await db.query(
        `UPDATE usuarios SET warn = $2 WHERE id = $1`,
        [userId, warn]
      )

      await conn.sendMessage(m.chat, {
        text: `*⚠️ ADVERTENCIA ⚠️*\n\n@${mentionJid.split('@')[0]} fuiste advertido por el admin: ${adminName}\n*• Tiene:* ${warn}/${maxwarn} advertencias\n*• Razón:* ${reason}`,
        mentions: [mentionJid]
      }, { quoted: m })

    } else {
      await db.query(
        `UPDATE usuarios SET warn = 0 WHERE id = $1`,
        [userId]
      )

      await conn.sendMessage(m.chat, {
        text: `⚠️ El usuario @${mentionJid.split('@')[0]} superó las *${maxwarn}* advertencias y será eliminado del grupo...`,
        mentions: [mentionJid]
      }, { quoted: m })

      await delay(3000)
      await conn.groupParticipantsUpdate(m.chat, [kickJid], 'remove')
    }

  } catch (err) {
    console.error(err)
    m.reply('❌ Error ejecutando warn.')
  }
}

handler.help = ['warn @user [razón]']
handler.tags = ['group']
handler.command = /^warn$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.register = true

export default handler

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
import { db } from '../lib/postgres.js'

const cleanJid = (jid = '') => String(jid || '').replace(/:\d+/, '')
const onlyNum = (v = '') => String(v || '').replace(/[^0-9]/g, '')

const getParticipantIds = (p = {}) => [
  p.id,
  p.phoneNumber,
  p.lid,
  p.participantAlt,
  p.jid
].filter(Boolean).map(cleanJid)

const findParticipant = (participants = [], who = '') => {
  who = cleanJid(who)
  const num = onlyNum(who)

  return participants.find(p => {
    const ids = getParticipantIds(p)
    const nums = ids.map(onlyNum)
    return ids.includes(who) || nums.includes(num)
  })
}

const sameMutedUser = (row, ids = [], nums = []) => {
  const rowIds = [
    row.user_id,
    row.lid
  ].filter(Boolean).map(cleanJid)

  const rowNums = [
    row.num,
    row.user_id,
    row.lid
  ].filter(Boolean).map(onlyNum)

  return ids.some(id => rowIds.includes(cleanJid(id))) ||
    nums.some(num => rowNums.includes(onlyNum(num)))
}

const getTargetData = async (m, conn, metadata) => {
  let who =
    m.mentionedJid?.[0] ||
    m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
    m.quoted?.sender ||
    m.quoted?.participant ||
    m.sender

  if (!who) return null

  who = cleanJid(who)

  const meta = metadata?.participants?.length
    ? metadata
    : await conn.groupMetadata(m.chat)

  const participants = meta.participants || []
  const participant = findParticipant(participants, who)

  const ids = [
    who,
    ...getParticipantIds(participant)
  ].filter(Boolean).map(cleanJid)

  const nums = ids.map(onlyNum).filter(Boolean)

  let user = null

  for (const id of [...new Set(ids)]) {
    const r = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [id])
    if (r.rows.length) {
      user = r.rows[0]
      break
    }
  }

  if (!user) {
    for (const id of [...new Set(ids)]) {
      const r = await db.query(`SELECT * FROM usuarios WHERE lid = $1`, [id])
      if (r.rows.length) {
        user = r.rows[0]
        break
      }
    }
  }

  if (!user) {
    for (const num of [...new Set(nums)]) {
      const r = await db.query(`SELECT * FROM usuarios WHERE num = $1`, [num])
      if (r.rows.length) {
        user = r.rows[0]
        break
      }
    }
  }

  if (user?.id) ids.push(cleanJid(user.id))
  if (user?.lid) ids.push(cleanJid(user.lid))
  if (user?.num) nums.push(onlyNum(user.num))

  const userId = cleanJid(
    user?.id ||
    participant?.phoneNumber ||
    (participant?.id?.endsWith('@s.whatsapp.net') ? participant.id : null) ||
    who
  )

  const lid = cleanJid(
    user?.lid ||
    participant?.lid ||
    (participant?.id?.endsWith('@lid') ? participant.id : null) ||
    ''
  )

  const num = onlyNum(
    user?.num ||
    participant?.phoneNumber ||
    userId ||
    who
  )

  ids.push(userId)
  if (lid) ids.push(lid)
  if (num) nums.push(num)

  return {
    who,
    userId,
    lid,
    num,
    ids: [...new Set(ids.filter(Boolean).map(cleanJid))],
    nums: [...new Set(nums.filter(Boolean).map(onlyNum))]
  }
}

let handler = async (m, { conn, command, metadata }) => {
  try {
    if (!m.isGroup) return

    const target = await getTargetData(m, conn, metadata)
    if (!target) return m.reply('⚠️ Etiqueta o responde a un usuario.')

    const { userId, lid, num, ids, nums } = target

    const resAll = await db.query(`SELECT * FROM muted_users`)
    const filasUsuario = (resAll.rows || []).filter(row => sameMutedUser(row, ids, nums))
    const filaGrupo = filasUsuario.find(row => row.group_id === m.chat)
    const muted = filaGrupo || filasUsuario[0] || null

    if (command === 'mute') {
      if (muted && muted.group_id === m.chat) {
        return m.reply('⚠️ Ese usuario ya está muteado.')
      }

      await db.query(
        `INSERT INTO muted_users (group_id, user_id, lid, num, created_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (group_id, user_id)
         DO UPDATE SET lid = $3, num = $4`,
        [m.chat, userId, lid, num, Date.now()]
      )

      return conn.sendMessage(m.chat, {
        text: `🔇 *Acción de moderación aplicada*\n\n@${num || userId.split('@')[0]} ha sido silenciado por un administrador.`,
        mentions: [userId]
      }, { quoted: m })
    }

    if (command === 'unmute') {
      if (!muted) return m.reply('⚠️ Ese usuario no estaba muteado.')

      const filasABorrar = filasUsuario.length ? filasUsuario : [muted]

      for (const row of filasABorrar) {
        await db.query(
          `DELETE FROM muted_users WHERE group_id = $1 AND user_id = $2`,
          [row.group_id, row.user_id]
        )
      }

      if (num) {
        await db.query(
          `DELETE FROM muted_users WHERE num = $1`,
          [num]
        )
      }

      return conn.sendMessage(m.chat, {
        text: `🔊 *Usuario habilitado*\n\nEl participante @${num || userId.split('@')[0]} puede volver a enviar mensajes.`,
        mentions: [userId]
      }, { quoted: m })
    }

  } catch (e) {
    console.error('[MUTE] ❌ Error:', e)
    m.reply('❌ Error ejecutando mute/unmute.')
  }
}

handler.command = /^(mute|unmute)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
import { db } from '../lib/postgres.js'

const cleanJid = (jid = '') => String(jid || '').replace(/:\d+/, '')

const getIds = (p = {}) => [
  p.id,
  p.phoneNumber,
  p.lid,
  p.participantAlt,
  p.jid
].filter(Boolean).map(cleanJid)

const findParticipant = (participants = [], who = '') => {
  who = cleanJid(who)
  const num = who.replace(/[^0-9]/g, '')

  return participants.find(p => {
    const ids = getIds(p)
    return ids.includes(who) || ids.some(id => id.replace(/[^0-9]/g, '').includes(num))
  })
}

const sameUser = (row, userId, lid, num) => {
  return (
    cleanJid(row.user_id) === userId ||
    cleanJid(row.lid) === lid ||
    String(row.num || '') === num
  )
}

async function getWarnRow(groupId, userId, lid, num) {
  const res = await db.query(
    `SELECT * FROM warn_status WHERE group_id = $1`,
    [groupId]
  )

  return (res.rows || []).find(r => sameUser(r, userId, lid, num))
}

async function deleteWarnRow(groupId, userId, lid, num) {
  const res = await db.query(
    `SELECT * FROM warn_status WHERE group_id = $1`,
    [groupId]
  )

  const rows = res.rows || []

  for (const row of rows) {
    if (!sameUser(row, userId, lid, num)) continue

    await db.query(
      `DELETE FROM warn_status WHERE user_id = $1 AND group_id = $2`,
      [row.user_id, groupId]
    )
  }
}

export async function before(m, { conn }) {
  try {
    if (!m.isGroup) return
    if (!m.message?.groupStatusMentionMessage) return

    const res = await db.query(
      `SELECT antistatus FROM group_settings WHERE group_id = $1`,
      [m.chat]
    )

    const config = res.rows[0] || {}
    if (!config.antistatus) return

    const metadata = await conn.groupMetadata(m.chat)
    const participants = metadata.participants || []

    const botIds = [
      conn.user?.id,
      conn.user?.jid,
      conn.user?.lid
    ].filter(Boolean).map(cleanJid)

    const senderIds = [
      m.sender,
      m.lid,
      m.key?.participant,
      m.key?.participantAlt,
      m.key?.senderLid
    ].filter(Boolean).map(cleanJid)

    const botParticipant = participants.find(p => {
      const ids = getIds(p)
      return ids.some(id => botIds.includes(id))
    })

    const senderParticipant = participants.find(p => {
      const ids = getIds(p)
      return ids.some(id => senderIds.includes(id))
    })

    const isBotAdmin = botParticipant?.admin === 'admin' || botParticipant?.admin === 'superadmin'
    const isSenderAdmin = senderParticipant?.admin === 'admin' || senderParticipant?.admin === 'superadmin'

    if (isSenderAdmin || m.fromMe || m.key?.fromMe) return

    const participant = findParticipant(participants, m.sender)

    const userId = cleanJid(
      participant?.phoneNumber ||
      (participant?.id?.endsWith('@s.whatsapp.net') ? participant.id : null) ||
      m.sender
    )

    const lid = cleanJid(
      participant?.lid ||
      (participant?.id?.endsWith('@lid') ? participant.id : null) ||
      m.lid ||
      null
    )

    const num = userId.split('@')[0].replace(/[^0-9]/g, '')
    const kickJid = cleanJid(participant?.id || m.sender)
    const mentionJid = userId

    if (!isBotAdmin) {
      await conn.sendMessage(m.chat, {
        text: `*「 ANTI ESTADOS 」*\n\n🚫 Está activado, pero no soy admin así que no puedo borrar nada.`,
        mentions: [mentionJid]
      }, { quoted: m })
      return true
    }

    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.key.participant || m.sender
      }
    })

    const oldRow = await getWarnRow(m.chat, userId, lid, num)
    const warns = Number(oldRow?.warns || 0) + 1

    await db.query(
      `INSERT INTO warn_status (user_id, group_id, lid, num, warns)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, group_id)
       DO UPDATE SET warns = $5, lid = $3, num = $4`,
      [oldRow?.user_id || userId, m.chat, lid, num, warns]
    )

    if (warns < 3) {
      await conn.sendMessage(m.chat, {
        text: `*「 ANTI ESTADOS 」*\n\n@${num}, deja de mencionar el grupo con tus estados.\n> Advertencia ${warns}/3`,
        mentions: [mentionJid]
      }, { quoted: m })
      return true
    }

    await conn.groupParticipantsUpdate(m.chat, [kickJid], 'remove')
    await deleteWarnRow(m.chat, userId, lid, num)

    await conn.sendMessage(m.chat, {
      text: `*「 ANTI ESTADOS 」*\n\n🚫 @${num}, eliminado por pesado con los estados.`,
      mentions: [mentionJid]
    }, { quoted: m })

    return true

  } catch (err) {
    console.error('❌ AntiStatus error:', err)
  }
}
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
    return ids.includes(who) || ids.some(id => id.replace(/[^0-9]/g, '') === num)
  })
}

const sameUser = (row, ids = []) => {
  const rowIds = [
    row.user_id,
    row.lid,
    row.num
  ].filter(Boolean).map(v => String(v).replace(/:\d+/, '').replace(/[^0-9]/g, ''))

  const checkIds = ids
    .filter(Boolean)
    .map(v => String(v).replace(/:\d+/, '').replace(/[^0-9]/g, ''))

  return checkIds.some(id => rowIds.includes(id))
}

export async function before(m, { conn }) {
  try {
    if (!m.isGroup) return
    if (m.key?.fromMe) return

    const rawIds = [
      m.sender,
      m.lid,
      m.key?.participant,
      m.key?.participantAlt,
      m.key?.senderLid
    ].filter(Boolean).map(cleanJid)

    const meta = await conn.groupMetadata(m.chat)
    const participants = meta.participants || []

    const participant =
      rawIds.map(id => findParticipant(participants, id)).find(Boolean)

    const ids = [
      ...rawIds,
      participant?.id,
      participant?.phoneNumber,
      participant?.lid
    ].filter(Boolean).map(cleanJid)

    const res = await db.query(
      `SELECT * FROM muted_users WHERE group_id = $1`,
      [m.chat]
    )

    const muted = (res.rows || []).find(row => sameUser(row, ids))
    if (!muted) return

    const deleteParticipant =
      m.key?.participant ||
      m.key?.senderLid ||
      participant?.id ||
      m.sender

    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: deleteParticipant
      }
    })

    return true

  } catch (e) {
    console.error('❌ Error en mute before:', e)
  }
}
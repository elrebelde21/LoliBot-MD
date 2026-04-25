const cleanJid = (jid = '') => String(jid || '').replace(/:\d+/, '')

const findUserByAnyId = async (db, ids = []) => {
  const uniqueIds = [...new Set(ids.filter(Boolean).map(cleanJid))]

  // Buscar por id
  for (const id of uniqueIds) {
    const res = await db.query(
      `SELECT * FROM usuarios WHERE id = $1`,
      [id]
    )
    if (res.rows.length) return res.rows[0]
  }

  // Buscar por lid
  for (const id of uniqueIds) {
    const res = await db.query(
      `SELECT * FROM usuarios WHERE lid = $1`,
      [id]
    )
    if (res.rows.length) return res.rows[0]
  }

  // Buscar por num
  for (const id of uniqueIds) {
    const num = String(id).split('@')[0]?.replace(/[^0-9]/g, '')
    if (!num) continue

    const res = await db.query(
      `SELECT * FROM usuarios WHERE num = $1`,
      [num]
    )
    if (res.rows.length) return res.rows[0]
  }

  return null
}

const handler = async (m, { conn, args, metadata }) => {
  let targetId = m.mentionedJid?.[0] || args?.[0]

  if (!targetId) {
    return m.reply("⚠️ Debes etiquetar a la persona con la que deseas divorciarte.")
  }

  targetId = cleanJid(targetId)

  const participant = metadata?.participants?.find(p => {
    const ids = [
      p.phoneNumber,
      p.id,
      p.lid
    ].filter(Boolean).map(cleanJid)

    return ids.includes(targetId)
  })

  const senderIds = [
    m.sender,
    m.lid,
    m.key?.participant,
    m.key?.participantAlt,
    m.key?.senderLid
  ].filter(Boolean).map(cleanJid)

  const targetIds = [
    targetId,
    participant?.phoneNumber,
    participant?.id,
    participant?.lid
  ].filter(Boolean).map(cleanJid)

  const user = await findUserByAnyId(m.db, senderIds)
  const targetUser = await findUserByAnyId(m.db, targetIds)

  if (!user || !user.marry) {
    return m.reply("⚠️ No estás casado con nadie.")
  }

  if (!targetUser) {
    return m.reply("⚠️ No encontré a esa persona en mi base de datos.")
  }

  const userId = cleanJid(user.id)
  const targetRealId = cleanJid(targetUser.id)

  const userMarry = cleanJid(user.marry)
  const targetAllIds = [
    targetRealId,
    targetUser.lid,
    participant?.phoneNumber,
    participant?.id,
    participant?.lid
  ].filter(Boolean).map(cleanJid)

  if (!targetAllIds.includes(userMarry)) {
    return m.reply("⚠️ No estás casado con esta persona para poder divorciarte.")
  }

  await m.db.query(
    'UPDATE usuarios SET marry = NULL WHERE id = $1',
    [userId]
  )

  await m.db.query(
    'UPDATE usuarios SET marry = NULL WHERE id = $1',
    [targetRealId]
  )

  const mention1 = cleanJid(m.sender)
  const mention2 = cleanJid(participant?.phoneNumber || targetRealId)

  const nombre1 = await conn.getName(mention1).catch(() => mention1.split('@')[0])
  const nombre2 = await conn.getName(mention2).catch(() => mention2.split('@')[0])

  return conn.reply(
    m.chat,
    `@${mention1.split('@')[0]} (${nombre1}) se divorció de @${mention2.split('@')[0]} (${nombre2}) ahora están separados 🫣`,
    m,
    { mentions: [mention1, mention2] }
  )
}

handler.help = ['divorce <@tag>']
handler.tags = ['econ']
handler.command = ['divorce']
handler.register = true

export default handler
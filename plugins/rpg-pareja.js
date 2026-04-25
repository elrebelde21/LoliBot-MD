// Código elaborado por: https://github.com/elrebelde21

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

const handler = async (m, { conn, metadata }) => {
  const senderIds = [
    m.sender,
    m.lid,
    m.key?.participant,
    m.key?.participantAlt,
    m.key?.senderLid
  ].filter(Boolean).map(cleanJid)

  const senderUser = await findUserByAnyId(m.db, senderIds)
  const senderId = cleanJid(senderUser?.id || m.sender)

  if (senderUser?.marry) {
    const pareja = await findUserByAnyId(m.db, [senderUser.marry])
    const spouseId = cleanJid(pareja?.id || senderUser.marry)
    const spouseName = pareja?.nombre || 'sin nombre'

    const mentioned = cleanJid(m.mentionedJid?.[0] || '')

    if (mentioned && mentioned === spouseId) {
      return conn.reply(
        m.chat,
        `⚠️ Ya estás casado con @${spouseId.split('@')[0]}. No necesitas casarte de nuevo con la misma persona 🤨`,
        m,
        { mentions: [spouseId] }
      )
    }

    return conn.reply(
      m.chat,
      `⚠️ Ya estás casado con @${spouseId.split('@')[0]} (${spouseName}).\n¿Acaso le vas a ser infiel? 🤨`,
      m,
      { mentions: [spouseId] }
    )
  }

  let mentionedUser = m.mentionedJid?.[0]

  if (!mentionedUser) {
    return m.reply('⚠️ Etiqueta a la persona con la que te quieres casar usando @tag')
  }

  mentionedUser = cleanJid(mentionedUser)

  const participant = metadata?.participants?.find(p => {
    const ids = [
      p.phoneNumber,
      p.id,
      p.lid
    ].filter(Boolean).map(cleanJid)

    return ids.includes(mentionedUser)
  })

  const targetIds = [
    mentionedUser,
    participant?.phoneNumber,
    participant?.id,
    participant?.lid
  ].filter(Boolean).map(cleanJid)

  const uniqueTargetIds = [...new Set(targetIds)]

  if (uniqueTargetIds.some(id => senderIds.includes(id))) {
    return m.reply('⚠️ No puedes casarte contigo mismo')
  }

  let targetUser = await findUserByAnyId(m.db, uniqueTargetIds)

  if (!targetUser) {
    const realId = cleanJid(participant?.phoneNumber || participant?.id || mentionedUser)
    const lid = cleanJid(participant?.id?.endsWith('@lid') ? participant.id : participant?.lid || null)
    const num = realId.split('@')[0]
    const userName = await conn.getName(realId).catch(() => num)

    await m.db.query(
      `INSERT INTO usuarios (id, nombre, num, lid, registered)
       VALUES ($1, $2, $3, $4, false)
       ON CONFLICT (id) DO NOTHING`,
      [realId, userName || num, num, lid]
    )

    targetUser = await findUserByAnyId(m.db, [realId, lid])
  }

  if (!targetUser) {
    return m.reply('⚠️ El usuario al que intentas casar no está en mi base de datos.')
  }

  const targetId = cleanJid(targetUser.id)
  const mentionJid = cleanJid(participant?.phoneNumber || targetId)

  if (targetUser.marry) {
    return m.reply(`⚠️ El usuario ya está casado con alguien más`)
  }

  await m.db.query(
    'UPDATE usuarios SET marry_request = $1 WHERE id = $2',
    [senderId, targetId]
  )

  await conn.reply(
    m.chat,
    `💍 *@${senderId.split('@')[0]}* se está declarando!! 😳\n@${mentionJid.split('@')[0]} responde:\n\n❤️ Escribe *Aceptar*\n💔 Escribe *Rechazar*`,
    m,
    { mentions: [senderId, mentionJid] }
  )

  setTimeout(async () => {
    const again = await m.db.query(
      'SELECT marry_request FROM usuarios WHERE id = $1',
      [targetId]
    )

    if (again.rows[0]?.marry_request) {
      await m.db.query(
        'UPDATE usuarios SET marry_request = NULL WHERE id = $1',
        [targetId]
      )

      await conn.reply(m.chat, '⚠️ El tiempo para aceptar o rechazar ha expirado.', m)
    }
  }, 60000)
}

handler.before = async (m, { conn }) => {
  const cleanSenderIds = [
    m.sender,
    m.lid,
    m.key?.participant,
    m.key?.participantAlt,
    m.key?.senderLid
  ].filter(Boolean).map(cleanJid)

  const user = await findUserByAnyId(m.db, cleanSenderIds)
  if (!user?.marry_request) return

  const req = cleanJid(user.marry_request)
  const userId = cleanJid(user.id)

  const response = String(m.originalText || '').toLowerCase().trim()

  if (response === 'aceptar') {
    await m.db.query(
      'UPDATE usuarios SET marry = $1, marry_request = NULL WHERE id = $2',
      [req, userId]
    )

    await m.db.query(
      'UPDATE usuarios SET marry = $1 WHERE id = $2',
      [userId, req]
    )

    await conn.reply(
      m.chat,
      `✅ ¡Felicidades! 🥳\n@${req.split('@')[0]} y @${userId.split('@')[0]} ahora están casados`,
      m,
      { mentions: [req, userId] }
    )
  }

  if (response === 'rechazar') {
    await m.db.query(
      'UPDATE usuarios SET marry_request = NULL WHERE id = $1',
      [userId]
    )

    await conn.reply(
      m.chat,
      `⚠️ Has rechazado la solicitud de matrimonio de @${req.split('@')[0]}`,
      m,
      { mentions: [req] }
    )
  }
}

handler.help = ['marry @tag']
handler.tags = ['econ']
handler.command = ['marry', 'pareja']
handler.register = true

export default handler
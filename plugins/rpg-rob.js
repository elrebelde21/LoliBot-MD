const ro = 3000
const cooldown = 3600000

const cleanJid = (jid = '') => String(jid || '').replace(/:\d+/, '')

const handler = async (m, { conn, usedPrefix, command, metadata }) => {
  const now = Date.now()

  const resRobber = await m.db.query(
    'SELECT exp, lastrob FROM usuarios WHERE id = $1',
    [m.sender]
  )

  const robber = resRobber.rows[0] || { exp: 0, lastrob: 0 }
  const timeLeft = Number(robber.lastrob || 0) + cooldown - now

  if (timeLeft > 0) {
    return m.reply(`🚓 La policía está vigilando, vuelve en: *${msToTime(timeLeft)}*`)
  }

  let who

  if (m.isGroup) {
    who = m.mentionedJid?.[0] || m.quoted?.sender || false
  } else {
    who = m.chat
  }

  if (!who) {
    return conn.reply(m.chat, `⚠️ *Etiqueta a un usuario para robarle XP*`, m)
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

  const senderIds = [
    m.sender,
    m.lid,
    m.key?.participant,
    m.key?.participantAlt,
    m.key?.senderLid
  ].filter(Boolean).map(cleanJid)

  if (uniqueIds.some(id => senderIds.includes(id))) {
    return m.reply(`❌ No puedes robarte a ti mismo.`)
  }

  let victim = null

  for (const id of uniqueIds) {
    const res = await m.db.query(
      `SELECT * FROM usuarios WHERE id = $1 OR lid = $1`,
      [id]
    )

    if (res.rows.length) {
      victim = res.rows[0]
      break
    }
  }

  if (!victim) {
    const realId = cleanJid(participant?.phoneNumber || participant?.id || who)
    const num = realId.split('@')[0]
    const userName = await conn.getName(realId).catch(() => num)

    await m.db.query(
      `INSERT INTO usuarios (id, nombre, num, lid, registered)
       VALUES ($1, $2, $3, $4, false)
       ON CONFLICT (id) DO NOTHING`,
      [
        realId,
        userName || num,
        num,
        participant?.id?.endsWith('@lid') ? cleanJid(participant.id) : null
      ]
    )

    const res = await m.db.query(
      `SELECT * FROM usuarios WHERE id = $1`,
      [realId]
    )

    victim = res.rows[0]
  }

  if (!victim) {
    return m.reply(`❌ El usuario no se encuentra en mi base de datos.`)
  }

  const victimId = cleanJid(victim.id)
  const mentionJid = cleanJid(participant?.phoneNumber || victimId)

  const cantidad = Math.floor(Math.random() * ro) + 1
  const victimExp = Number(victim.exp || 0)

  if (victimExp < cantidad) {
    return conn.reply(
      m.chat,
      `@${mentionJid.split('@')[0]} tiene menos XP suficiente.\n> No robes a un pobre v:`,
      m,
      { mentions: [mentionJid] }
    )
  }

  await m.db.query(
    'UPDATE usuarios SET exp = exp + $1, lastrob = $2 WHERE id = $3',
    [cantidad, now, m.sender]
  )

  await m.db.query(
    'UPDATE usuarios SET exp = exp - $1 WHERE id = $2',
    [cantidad, victimId]
  )

  return conn.reply(
    m.chat,
    `*Robaste ${cantidad} XP a @${mentionJid.split('@')[0]}*`,
    m,
    { mentions: [mentionJid] }
  )
}

handler.help = ['rob', 'robar']
handler.tags = ['econ']
handler.command = /^(robar|rob)$/i
handler.register = true

export default handler

function msToTime(duration) {
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  return `${hours} Hora(s) ${minutes} Minuto(s)`
}
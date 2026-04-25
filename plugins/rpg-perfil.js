import { createHash } from 'crypto'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import { xpRange } from '../lib/levelling.js'

const cleanJid = (jid = '') => String(jid || '').replace(/:\d+/, '')

const formatPhoneNumber = (jid) => {
  if (!jid) return 'Desconocido'
  const number = jid.replace(/@(s\.whatsapp\.net|lid)$/i, '').replace(/\D/g, '')
  if (!/^\d{8,15}$/.test(number)) return 'Desconocido'
  return `+${number}`
}

const getTargetFromText = (text = '') => {
  const raw = String(text || '').trim()
  if (!raw) return null
  if (raw.includes('@')) return null

  const num = raw.replace(/\D/g, '')
  if (!num || num.length < 8) return null

  return `${num}@s.whatsapp.net`
}

const getNum = (jid = '') => {
  jid = cleanJid(jid)
  if (!jid.endsWith('@s.whatsapp.net')) return null
  return jid.split('@')[0].replace(/\D/g, '')
}

const findUserByAnyId = async (db, ids = []) => {
  const uniqueIds = [...new Set(ids.filter(Boolean).map(cleanJid))]

  for (const id of uniqueIds) {
    const num = getNum(id)

    const res = await db.query(
      `SELECT * FROM usuarios
       WHERE id = $1
       OR lid = $1
       OR num = $2`,
      [id, num]
    )

    if (res.rows.length) return res.rows[0]
  }

  return null
}

let handler = async (m, { conn, text, metadata }) => {
  const numberTarget = getTargetFromText(text)
  const isOnlyNumberMode = !!numberTarget && !m.mentionedJid?.length

  let who = m.mentionedJid?.[0] || numberTarget

  if (!who && m.isGroup && m.quoted?.sender) {
    who = m.quoted.sender
  }

  if (!who) {
    who = m.fromMe ? cleanJid(conn.user?.id) : m.sender
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

  let searchIds = []

  if (isOnlyNumberMode) {
    searchIds = []
  } else if (m.mentionedJid?.length || m.quoted?.sender) {
    searchIds = idsToSearch
  } else {
    searchIds = [
      m.sender,
      m.lid,
      m.key?.participant,
      m.key?.participantAlt,
      m.key?.senderLid,
      ...idsToSearch
    ]
  }

  let user = isOnlyNumberMode ? null : await findUserByAnyId(m.db, searchIds)

  if (!user && !isOnlyNumberMode) {
    const realId = cleanJid(participant?.phoneNumber || who)
    const num = realId.split('@')[0].replace(/\D/g, '')
    const name = await conn.getName(realId).catch(() => num)

    await m.db.query(
      `INSERT INTO usuarios (id, nombre, num, lid, registered)
       VALUES ($1, $2, $3, $4, false)
       ON CONFLICT (id) DO NOTHING`,
      [
        realId,
        name || num,
        num,
        participant?.id?.endsWith('@lid') ? cleanJid(participant.id) : null
      ]
    )

    user = await findUserByAnyId(m.db, [realId, participant?.id, participant?.phoneNumber])
  }

  const realJid = cleanJid(participant?.phoneNumber || user?.id || who)

  const mentionJid = realJid.endsWith('@lid')
    ? cleanJid(participant?.phoneNumber || who)
    : realJid

  const profilePic = await conn.profilePictureUrl(mentionJid, 'image')
    .catch(_ => 'https://telegra.ph/file/9d38415096b6c46bf03f8.jpg')

  const buffer = await (await fetch(profilePic)).buffer()

  if (isOnlyNumberMode) {
    const texto = `*「 PERFIL 」*

🖼️ Foto de perfil:
wa.me/${mentionJid.split('@')[0]}

*•━━━━⪻ 𝙿𝙴𝚁𝙵𝙸𝙻 ⪼━━━━•*`

    return conn.sendFile(m.chat, buffer, 'perfil.jpg', texto, m)
  }

  const {
    exp = 0,
    limite = 0,
    nombre,
    registered,
    edad,
    level = 0,
    marry,
    gender,
    birthday
  } = user || {}

  const bio = await conn.fetchStatus(mentionJid).catch(() => ({}))
  const biot = bio.status || 'Sin Info'

  const phone = formatPhoneNumber(mentionJid)

  let pais = 'Desconocido'
  try {
    const num = mentionJid.split('@')[0].replace(/\D/g, '')
    const res = await fetch(`https://api.mitzuki.xyz/tools/country?number=${num}&apikey=${process.env.API_KEY}`)
    const json = await res.json()
    if (json.status && json.data?.pais) pais = `${json.data.pais} ${json.data.emoji || ''}`
  } catch {}

  let relacion = '❌ *No estás en ninguna relación, solter@ 🤑.*'

  if (marry) {
    const pareja = await findUserByAnyId(m.db, [marry])
    const parejaId = cleanJid(pareja?.id || marry)
    const nombrePareja = pareja?.nombre || 'Desconocido'
    relacion = `💍 *Está en una relación con:* ${nombrePareja} (@${parejaId.split('@')[0]})`
  }

  const texto = `*「 PERFIL 」*

👤 *Nombre:* ${nombre || await conn.getName(mentionJid).catch(() => 'Desconocido')}
☎️ *Número:* ${phone}
🌐 *Link:* wa.me/${mentionJid.split('@')[0]}
🌍 *Nacionalidad:* ${pais}${edad ? `\n🎈 *Edad:* ${edad}` : ''}${gender ? `\n⚧️ *Género:* ${gender}` : ''}${birthday ? `\n🎂 *Cumpleaños:* ${moment(birthday).format('DD/MM/YYYY')}` : ''}
📝 *Bio:* ${biot}
💎 *Límite:* ${limite ?? 0}
✨ *XP:* ${exp}
⚙️ *Nivel:* ${level}
◯ *Registrado:* ${registered ? 'Sí' : 'No'}

${relacion}

*•━━━━⪻ 𝙿𝙴𝚁𝙵𝙸𝙻 ⪼━━━━•*`

  return conn.sendFile(m.chat, buffer, 'perfil.jpg', texto, m, false, {
    mentions: [mentionJid, marry].filter(Boolean)
  })
}

handler.help = ['perfil', 'perfil *@user*', 'perfil +num']
handler.tags = ['rg']
handler.command = /^(perfil|profile)$/i
handler.register = true

export default handler
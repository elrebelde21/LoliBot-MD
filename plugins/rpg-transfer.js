import { db } from '../lib/postgres.js'

const items = ['limite', 'exp', 'money']
let confirmation = {}

const cleanJid = (jid = '') => String(jid || '').replace(/:\d+/, '')

const getNum = (jid = '') => {
  jid = cleanJid(jid)
  if (!jid.endsWith('@s.whatsapp.net')) return null
  return jid.split('@')[0].replace(/\D/g, '')
}

const findUserByAnyId = async (ids = []) => {
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

const getParticipant = (metadata, jid) => {
  jid = cleanJid(jid)

  return metadata?.participants?.find(p => {
    const ids = [
      p.phoneNumber,
      p.id,
      p.lid
    ].filter(Boolean).map(cleanJid)

    return ids.includes(jid)
  })
}

const getTargetFromArgs = (args = []) => {
  const raw = args.slice(2).join(' ')
  const num = raw.replace(/\D/g, '')
  if (!num || num.length < 8) return null
  return `${num}@s.whatsapp.net`
}

async function handler(m, { conn, args, usedPrefix, command, metadata }) {
  const senderKey = cleanJid(m.sender)

  if (confirmation[senderKey]) {
    return m.reply('𝙀𝙨𝙩𝙖𝙨 𝙝𝙖𝙘𝙞𝙚𝙣𝙙𝙤 𝙪𝙣𝙖 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧𝙚𝙣𝙘𝙞𝙖')
  }

  const senderIds = [
    m.sender,
    m.lid,
    m.key?.participant,
    m.key?.participantAlt,
    m.key?.senderLid
  ]

  const user = await findUserByAnyId(senderIds)
  if (!user) return m.reply('❌ No estás registrado en mi base de datos.')

  const item = items.filter(v => v in user && typeof Number(user[v]) === 'number')

  let menu = `\`⧼⧼⧼ 💱 𝙏𝙍𝘼𝙉𝙎𝙁𝙀𝙍𝙀𝙉𝘾𝙄𝘼 💱 ⧽⧽⧽\`

> *${usedPrefix + command} tipo cantidad @tag*

\`❏ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊 :\`
* *${usedPrefix + command} exp 30 @0*

┏•「 *✅ 𝙍𝙀𝘾𝙐𝙍𝙎𝙊𝙎 𝘿𝙄𝙎𝙋𝙊𝙉𝙄𝘽𝙇𝙀𝙎* 」
┃
┃ 💎 𝘿𝙞𝙖𝙢𝙖𝙣𝙩𝙚𝙨 = limite
┃ 🪙 𝙇𝙤𝙡𝙞𝘾𝙤𝙞𝙣𝙨 = money
┃ ⚡ 𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 = exp
┗•`.trim()

  const type = String(args[0] || '').toLowerCase()

  if (!item.includes(type)) {
    return m.reply(menu)
  }

  const count = Math.max(1, isNumber(args[1]) ? parseInt(args[1]) : 1)

  let who = m.mentionedJid?.[0] || getTargetFromArgs(args)

  if (!who) {
    return m.reply('⚠️ *𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝘼𝙇 𝙐𝙎𝙐𝘼𝙍𝙄𝙊*')
  }

  who = cleanJid(who)

  const participant = getParticipant(metadata, who)

  const targetIds = [
    who,
    participant?.phoneNumber,
    participant?.id,
    participant?.lid
  ]

  const userTo = await findUserByAnyId(targetIds)

  if (!userTo) {
    return m.reply(`⚠️ *𝙀𝙇 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 @${who.split('@')[0]} 𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙐𝙀𝙉𝙏𝙍𝘼 𝙀𝙉 𝙈𝙄 DB*`)
  }

  const senderRealId = cleanJid(user.id)
  const targetRealId = cleanJid(userTo.id)
  const mentionJid = cleanJid(participant?.phoneNumber || targetRealId)

  const senderAllIds = senderIds.filter(Boolean).map(cleanJid)
  const targetAllIds = [
    targetRealId,
    userTo.lid,
    participant?.phoneNumber,
    participant?.id,
    participant?.lid
  ].filter(Boolean).map(cleanJid)

  if (targetAllIds.some(id => senderAllIds.includes(id))) {
    return m.reply('⚠️ No puedes transferirte a ti mismo.')
  }

  if (Number(user[type] || 0) < count) {
    return m.reply(`⚠️ *𝙉𝙊 𝙏𝙄𝙀𝙉𝙀𝙎 𝙎𝙐𝙁𝙄𝘾𝙄𝙀𝙉𝙏𝙀 ${type.toUpperCase()}*`)
  }

  let confirm = `\`ESTÁS A PUNTO DE HACER ESTA TRANSFERENCIA\`

> 💹 *${count} ${type} para* *@${mentionJid.split('@')[0]}*

\`¿DESEAS CONTINUAR?\`
> Tienes 60 segundos.

> Escribe: (si) para aceptar
> Escribe: (no) para cancelar`.trim()

  await conn.reply(m.chat, confirm, m, { mentions: [mentionJid] })

  confirmation[senderKey] = {
    sender: senderRealId,
    senderKey,
    to: targetRealId,
    mentionJid,
    type,
    count,
    messageId: m.id || m.key?.id,
    timeout: setTimeout(() => {
      m.reply('*SU TIEMPO SE HA TERMINADO*')
      delete confirmation[senderKey]
    }, 60 * 1000)
  }
}

handler.before = async (m) => {
  const senderKey = cleanJid(m.sender)
  if (!(senderKey in confirmation)) return
  if (!m.originalText) return

  const data = confirmation[senderKey]
  const { timeout, sender, to, mentionJid, type, count, messageId } = data

  if ((m.id || m.key?.id) === messageId) return

  const response = String(m.originalText || '').trim().toLowerCase()

  if (/^no$/i.test(response)) {
    clearTimeout(timeout)
    delete confirmation[senderKey]
    return m.reply('*CANCELADO*')
  }

  if (!/^si$/i.test(response)) return

  const user = await findUserByAnyId([sender])
  const userTo = await findUserByAnyId([to])

  if (!user || !userTo) {
    clearTimeout(timeout)
    delete confirmation[senderKey]
    return m.reply('❌ Usuarios no válidos.')
  }

  if (Number(user[type] || 0) < count) {
    clearTimeout(timeout)
    delete confirmation[senderKey]
    return m.reply(`⚠️ *𝙔𝘼 𝙉𝙊 𝙏𝙄𝙀𝙉𝙀𝙎 𝙎𝙐𝙁𝙄𝘾𝙄𝙀𝙉𝙏𝙀 ${type.toUpperCase()}*`)
  }

  const newSenderValue = Number(user[type] || 0) - count
  const newTargetValue = Number(userTo[type] || 0) + count

  await db.query(`UPDATE usuarios SET ${type} = $1 WHERE id = $2`, [newSenderValue, user.id])
  await db.query(`UPDATE usuarios SET ${type} = $1 WHERE id = $2`, [newTargetValue, userTo.id])

  clearTimeout(timeout)
  delete confirmation[senderKey]

  return m.reply(
    `✅ *TRANSFERENCIA HECHA:*\n\n*${count} ${type} para* @${mentionJid.split('@')[0]}`,
    null,
    { mentions: [mentionJid] }
  )
}

handler.help = ['transfer'].map(v => v + ' [tipo] [cantidad] [@tag]')
handler.tags = ['econ']
handler.command = ['payxp', 'transfer', 'darxp', 'dar', 'enviar', 'transferir']
handler.disabled = false
handler.register = true

export default handler

function isNumber(x) {
  return !isNaN(x) && Number.isFinite(Number(x))
}

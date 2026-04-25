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

const findParticipant = (participants = [], who = '') => {
  who = cleanJid(who)
  const num = who.replace(/[^0-9]/g, '')

  return participants.find(p => {
    const ids = getParticipantIds(p)
    return ids.includes(who) || ids.some(id => id.replace(/[^0-9]/g, '').includes(num))
  })
}

const handler = async (m, { conn, text, metadata }) => {
  try {
    let who

    if (m.mentionedJid?.[0]) {
      who = m.mentionedJid[0]
    } else if (m.quoted?.sender) {
      who = m.quoted.sender
    } else if (text) {
      const number = text.replace(/[^0-9]/g, '')

      if (!number) {
        return conn.reply(m.chat, `*⚠️ Usuario inválido.*`, m)
      }

      if (number.length > 15 || number.length < 7) {
        return conn.reply(m.chat, `*⚠️ Ese número está mal escrito 🤓*`, m)
      }

      who = `${number}@s.whatsapp.net`
    }

    if (!who) {
      return conn.reply(m.chat, `*⚠️ ¿A quién le doy admin?* etiqueta a una persona o responde su mensaje.`, m)
    }

    who = cleanJid(who)

    const participants = metadata?.participants || []
    const participant = findParticipant(participants, who)

    if (!participant) {
      return conn.reply(m.chat, `⚠️ No encontré ese usuario en el grupo.`, m)
    }

    const user = cleanJid(participant.id)

    await conn.groupParticipantsUpdate(m.chat, [user], 'promote')

    await conn.reply(m.chat, `*[ ✅ ] Admin dado correctamente.*`, m)

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, `❌ No pude darle admin al usuario.`, m)
  }
}

handler.help = ['promote @usuario', 'promote responder chat', 'daradmin @usuario']
handler.tags = ['group']
handler.command = /^(promote|daradmin|darpoder)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null
handler.register = true

export default handler
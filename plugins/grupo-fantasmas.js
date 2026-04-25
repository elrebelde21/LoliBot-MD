import { db } from '../lib/postgres.js'

let handler = async (m, { conn, text, participants, command, metadata }) => {
const cleanJid = (jid = '') => String(jid).replace(/:\d+/, '')
  try {
    const result = await db.query(
      `SELECT user_id, message_count
       FROM messages
       WHERE group_id = $1`,
      [m.chat]
    )

    const rows = result.rows || []

    let memberData = participants.map(mem => {
      const ids = [
        mem.id,
        mem.phoneNumber,
        mem.lid
      ].filter(Boolean).map(cleanJid)

      const userData = rows.find(row => ids.includes(cleanJid(row.user_id))) || {
        message_count: 0
      }

      const jidMention = mem.phoneNumber || mem.id
      const jidKick = mem.id

      return {
        id: cleanJid(jidKick),
        mention: cleanJid(jidMention),
        messages: Number(userData.message_count || 0),
        isAdmin: mem.admin === 'admin' || mem.admin === 'superadmin'
      }
    })

    let sum = text ? parseInt(text) : memberData.length
    if (isNaN(sum) || sum <= 0) sum = memberData.length

    let sider = memberData
      .slice(0, sum)
      .filter(mem => mem.messages === 0 && !mem.isAdmin)

    let total = sider.length

    switch (command.toLowerCase()) {
      case 'fantasmas': {
        if (total === 0) {
          return m.reply(`⚠️ Este grupo es activo, ¡no tiene fantasmas! :D`)
        }

        let teks = `⚠️ REVISIÓN DE INACTIVOS ⚠️\n\n`
        teks += `Grupo: ${metadata.subject || 'Sin nombre'}\n`
        teks += `*Miembros del grupo:* ${memberData.length}\n`
        teks += `*Miembros inactivos:* ${total}\n\n`
        teks += `[ 👻 LISTA DE FANTASMAS 👻 ]\n`
        teks += sider.map(v => `  👉🏻 @${v.mention.split('@')[0]}`).join('\n')
        teks += `\n\n*Nota:* Esto puede no ser 100% acertado. El bot inicia el conteo de mensajes desde que se activó en este grupo.`

        await conn.sendMessage(
          m.chat,
          {
            text: teks,
            contextInfo: {
              mentionedJid: sider.map(v => v.mention)
            }
          },
          { quoted: m }
        )
        break
      }

      case 'kickfantasmas': {
        if (total === 0) {
          return m.reply(`⚠️ Este grupo es activo, ¡no tiene fantasmas! :D`)
        }

        let kickTeks = `⚠️ ELIMINACIÓN DE INACTIVOS ⚠️\n\n`
        kickTeks += `Grupo: ${metadata.subject || 'Sin nombre'}\n`
        kickTeks += `*Miembros del grupo:* ${memberData.length}\n`
        kickTeks += `*Miembros inactivos:* ${total}\n\n`
        kickTeks += `[ 👻 FANTASMAS A ELIMINAR 👻 ]\n`
        kickTeks += sider.map(v => `@${v.mention.split('@')[0]}`).join('\n')
        kickTeks += `\n\n*El bot eliminará la lista mencionada, empezando en 20 segundos, con 10 segundos entre cada expulsión.*`

        await conn.sendMessage(
          m.chat,
          {
            text: kickTeks,
            contextInfo: {
              mentionedJid: sider.map(v => v.mention)
            }
          },
          { quoted: m }
        )

        const chatSettings = (await db.query(
          `SELECT welcome FROM group_settings WHERE group_id = $1`,
          [m.chat]
        )).rows[0] || {}

        const originalWelcome = chatSettings.welcome ?? true

        await db.query(
          `UPDATE group_settings SET welcome = false WHERE group_id = $1`,
          [m.chat]
        )

        await delay(20000)

        try {
          const botIds = [
            conn.user?.id,
            conn.user?.jid,
            conn.user?.lid
          ].filter(Boolean).map(cleanJid)

          for (let user of sider) {
            if (botIds.includes(user.id)) continue

            await conn.groupParticipantsUpdate(m.chat, [user.id], 'remove')
            await delay(10000)
          }
        } finally {
          await db.query(
            `UPDATE group_settings SET welcome = $1 WHERE group_id = $2`,
            [originalWelcome, m.chat]
          )
        }

        await m.reply(`✅ Eliminación de fantasmas completada.`)
        break
      }
    }
  } catch (err) {
    console.error(err)
    m.reply('❌ Error ejecutando el comando. Por favor, intenta de nuevo.')
  }
}

handler.help = ['fantasmas', 'kickfantasmas']
handler.tags = ['group']
handler.command = /^(fantasmas|kickfantasmas)$/i
handler.group = true
handler.botAdmin = true
handler.admin = true
handler.register = true

export default handler

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
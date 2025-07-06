import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import { db } from '../lib/postgres.js'

let handler = async (m, { text, conn, usedPrefix, command }) => {
if (!text) return m.reply(`⚠️ Escribe algo para buscar sticker packs.\nEjemplo: *${usedPrefix + command} gatos*`)

  try {
    const res = await fetch(`https://api.dorratz.com/v3/stickerly?query=${encodeURIComponent(text)}`)
    const json = await res.json()

if (!json.success || !json.data || json.data.length === 0) return m.reply(`❌ No se encontró ningún pack para: *${text}*`)

    const packs = json.data.slice(0, 30)

    const userResult = await db.query('SELECT sticker_packname, sticker_author FROM usuarios WHERE id = $1', [m.sender])
    const user = userResult.rows[0] || {}
    const packname = user.sticker_packname || global.info.packname
    const author = user.sticker_author || global.info.author
const total = packs.length
const max = Math.min(total, 30)

m.reply(`🎯 *Resultados para:* ${text}\n🧷 *Stickers a enviar:* ${max}\n> ⏳ Enviando... espera un momento...`)

    let enviados = 0
    for (const pack of packs) {
    const infoText = `📦 *${pack.name}*\n👤 ${pack.author}\n🧷 ${pack.stickerCount} stickers\n👁 ${pack.viewCount.toLocaleString()} vistas\n📤 ${pack.exportCount.toLocaleString()} exportados\n🔗 ${pack.url}`
      try {
        const stkr = await sticker(false, pack.thumbnailUrl, packname, author)
        if (stkr) {
          await conn.sendFile(m.chat, stkr, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: info.wm, body: pack.name, mediaType: 2, sourceUrl: [info.nna, info.nna2, info.md, info.yt].getRandom(), thumbnail: m.pp}}}, { quoted: m })
         //conn.sendFile(m.chat, stkr, 'sticker.webp', infoText, m, true)
          enviados++
          await new Promise(r => setTimeout(r, 700))
        }
      } catch (err) {
        console.log('❌ Error en sticker:', err)
      }
    }

    if (enviados === 0) return m.reply('❌ No se pudo enviar ningún sticker.')
    else return m.react("✅")
 // m.reply(`✅ *${enviados} stickers enviados.*`)

  } catch (e) {
    console.error(e)
    m.reply('❌ Error buscando stickers.')
  }
}

handler.command = ['stickerly']
handler.help = ['stickerly <texto>']
handler.tags = ['sticker']
handler.register = true

export default handler

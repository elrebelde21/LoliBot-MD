import fetch from 'node-fetch'
const cooldowns = new Map()
const COOLDOWN_DURATION = 180000 // 3 min

let handler = async (m, { conn, args }) => {
const chatId = m.chat
const now = Date.now()
const chatData = cooldowns.get(chatId) || { lastUsed: 0, rankingMessage: null }
 const timeLeft = COOLDOWN_DURATION - (now - chatData.lastUsed)

if (timeLeft > 0) {
const secondsLeft = Math.ceil(timeLeft / 1000)
const minutes = Math.floor(secondsLeft / 60)
const remainingSeconds = secondsLeft % 60
const timeMessage = minutes > 0 ? `${minutes} min${minutes !== 1 ? 's' : ''}${remainingSeconds > 0 ? ` y ${remainingSeconds} seg${remainingSeconds !== 1 ? 's' : ''}` : ''}` : `${remainingSeconds} seg${remainingSeconds !== 1 ? 's' : ''}`

await conn.reply(m.chat, `⚠️ Hey @${m.sender.split('@')[0]} Hay ya se mostró el ranking pendejo 🙄, Solo se muestra cada 3 minutos para evitar spam, Desplázate hacia arriba para verlo completo.👆`, chatData.rankingMessage || m)
return
}

const res = await m.db.query('SELECT id, nombre, exp, limite, money, banco FROM usuarios')
const users = res.rows.map(u => ({ ...u, jid: u.id }))
const sortedExp = [...users].sort((a, b) => b.exp - a.exp)
const sortedLim = [...users].sort((a, b) => b.limite - a.limite)
const sortedMoney = [...users].sort((a, b) => b.money - a.money)
const sortedBanc = [...users].sort((a, b) => b.banco - a.banco)

const len = args[0] ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedExp.length)

const format = (list, prop, icon) =>
list.slice(0, len).map(({ jid, [prop]: value, nombre }, i) =>
`${i + 1}. @${jid.split('@')[0]} *${formatNumber(value)}* (${value}) ${icon}`).join('\n')

const text = `\`🏆 𝚃𝙰𝙱𝙻𝙰 𝙳𝙴 𝙲𝙻𝙰𝚂𝙸𝙲𝙰𝙲𝙸𝙾𝙽\`

💠 *𝐓𝐎𝐏 ${len} 𝐗𝐏 🎯* 
𝐓𝐮: *${sortedExp.findIndex(u => u.jid === m.sender) + 1}* 𝐝𝐞 *${sortedExp.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*
${format(sortedExp, 'exp', '⚡')}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

💠 *𝐓𝐎𝐏 ${len} 𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄 💎* 
𝐓𝐮: *${sortedLim.findIndex(u => u.jid === m.sender) + 1}* 𝐝𝐞 *${sortedLim.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*
${format(sortedLim, 'limite', '💎')}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

💠 *𝐓𝐎𝐏 ${len} 𝐋𝐎𝐋𝐈𝐂𝐎𝐈𝐍𝐒 🪙*
𝐓𝐮: *${sortedMoney.findIndex(u => u.jid === m.sender) + 1}* 𝐝𝐞 *${sortedMoney.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*
${format(sortedMoney, 'money', '🪙')}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

💠 *𝐓𝐎𝐏 ${len} 𝐌𝐈𝐋𝐋𝐎𝐍𝐀𝐑𝐈𝐎𝐒 💵* _(Usuarios con mas dinero en el banco)_
𝐓𝐮: *${sortedBanc.findIndex(u => u.jid === m.sender) + 1}* 𝐝𝐞 *${sortedBanc.length} 𝐮𝐬𝐮𝐚𝐫𝐢𝐨𝐬*
${format(sortedBanc, 'banco', '💵')}
`.trim()

const rankingMessage = await m.reply(text, null, { mentions: conn.parseMention(text) })
cooldowns.set(chatId, { lastUsed: now, rankingMessage })
}
handler.help = ['top']
handler.tags = ['econ']
handler.command = ['leaderboard', 'lb']
handler.register = true
handler.exp = 3500

export default handler

function formatNumber(num) {
  return num >= 1e6 ? (num / 1e6).toFixed(1) + 'M'
       : num >= 1e3 ? (num / 1e3).toFixed(1) + 'k'
       : num.toString()
}

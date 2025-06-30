import { db } from '../lib/postgres.js'

const items = ['limite', 'exp', 'joincount', 'money', 'potion', 'trash', 'wood', 'rock', 'string', 'petFood', 'emerald', 'diamond', 'gold', 'iron', 'common', 'uncoommon', 'mythic', 'legendary', 'pet']
let confirmation = {}

async function handler(m, { conn, args, usedPrefix, command }) {
if (confirmation[m.sender]) return m.reply('𝙀𝙨𝙩𝙖𝙨 𝙝𝙖𝙘𝙞𝙚𝙣𝙙𝙤 𝙪𝙣𝙖 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧𝙚𝙣𝙘𝙞𝙖')

const userRes = await db.query('SELECT * FROM usuarios WHERE id = $1', [m.sender])
let user = userRes.rows[0]
if (!user) return
const item = items.filter(v => v in user && typeof user[v] == 'number')
let lol = `\`⧼⧼⧼ 💱 𝙏𝙍𝘼𝙉𝙎𝙁𝙀𝙍𝙀𝙉𝘾𝙄𝘼 💱 ⧽⧽⧽\`

> *${usedPrefix + command} tipo cantidad @tag*

\`❏ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊 :\`
* *${usedPrefix + command} exp 30 @0*

┏•「 *✅ 𝙍𝙀𝘾𝙐𝙍𝙎𝙊𝙎 𝘿𝙄𝙎𝙋𝙊𝙉𝙄𝘽𝙇𝙀𝙎* 」
┃
┃ 💎 𝘿𝙞𝙖𝙢𝙖𝙣𝙩𝙚𝙨 = limite
┃ 🪙 𝙇𝙤𝙡𝙞𝘾𝙤𝙞𝙣𝙨 = money 
┃ ⚡ 𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 = exp 
┗•`.trim()

const type = (args[0] || '').toLowerCase()
if (!item.includes(type)) return m.reply(lol, m.chat, { mentions: conn.parseMention(lol) })
const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
let who = m.mentionedJid?.[0] || (args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '')
if (!who) return m.reply('⚠️ *𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝘼𝙇 𝙐𝙎𝙐𝘼𝙍𝙄𝙊*')
const userToRes = await db.query('SELECT * FROM usuarios WHERE id = $1', [who])
let userTo = userToRes.rows[0]
if (!userTo) return m.reply(`⚠️ *𝙀𝙇 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 ${who} 𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙐𝙀𝙉𝙏𝙍𝘼 𝙀𝙉 𝙈𝙄 db*`)
if (user[type] * 1 < count) return m.reply(`⚠️ *𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 𝙎𝙐𝙁𝙄𝘾𝙄𝙀𝙉𝙏𝙀 ${type.toUpperCase()}*`)

let confirm = `\`ESTÁS A PUNTO DE HACER ESTA TRANSFERENCIA\`

> 💹 *${count} ${type} para* *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}*

\`¿DESEAS CONTINUAR?\`
> Tienes 60 segundos.

> Escribe: (si) para aceptar
> Escribe: (no) para cancelar`.trim()

await conn.reply(m.chat, confirm, m, { mentions: [who] })

confirmation[m.sender] = {
sender: m.sender,
to: who,
message: m,
type,
count,
timeout: setTimeout(() => {
m.reply('*SU TIEMPO SE HA TERMINADO*')
delete confirmation[m.sender]
}, 60 * 1000)
}}

handler.before = async m => {
if (!(m.sender in confirmation)) return
if (!m.originalText) return

let { timeout, sender, message, to, type, count } = confirmation[m.sender]
if (m.id === message.id) return

const userRes = await db.query('SELECT * FROM usuarios WHERE id = $1', [sender])
const userToRes = await db.query('SELECT * FROM usuarios WHERE id = $1', [to])
let user = userRes.rows[0]
let userTo = userToRes.rows[0]
if (!user || !userTo) return m.reply('❌ Usuarios no válidos.')

if (/^no$/i.test(m.originalText)) {
clearTimeout(timeout)
delete confirmation[sender]
return m.reply('*CANCELADO*')
}

if (/^si$/i.test(m.originalText)) {
const prev = user[type]
const prevTo = userTo[type]

user[type] -= count
userTo[type] += count

await db.query(`UPDATE usuarios SET ${type} = $1 WHERE id = $2`, [user[type], sender])
await db.query(`UPDATE usuarios SET ${type} = $1 WHERE id = $2`, [userTo[type], to])
m.reply(`✅ *TRANSFERENCIA HECHA:*\n\n*${count} ${type} para* @${(to || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [to] })
clearTimeout(timeout)
delete confirmation[sender]
}
}
handler.help = ['transfer'].map(v => v + ' [tipo] [cantidad] [@tag]')
handler.tags = ['econ']
handler.command = ['payxp', 'transfer', 'darxp', 'dar', 'enviar', 'transferir']
handler.disabled = false
handler.register = true

export default handler

function special(type) {
let b = type.toLowerCase()
let special = (['common', 'uncoommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '')
return special
}

function isNumber(x) {
return !isNaN(x)
}

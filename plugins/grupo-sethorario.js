import { db } from '../lib/postgres.js'

let handler = async (m, { args }) => {
const rango = (args[0] || '').trim()
if (!/^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/.test(rango)) throw 'Formato correcto: /sethorario 23:00-06:00'
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [m.chat])
await db.query(`UPDATE group_settings SET nsfw_horario = $1 WHERE group_id = $2`, [rango, m.chat])
m.reply(`⏰ Horario NSFW establecido a *${rango}*`)
}
handler.help = ['sethorario 23:00-06:00']
handler.tags = ['admin']
handler.command = /^sethorario$/i
handler.admin = true
export default handler

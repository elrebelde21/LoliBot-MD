import { execSync } from 'child_process'
let handler = async (m, { conn, text }) => {
//await m.react('🕓')
if (conn.user.jid == conn.user.jid) {
let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
//require('fs').readdirSync('plugins').map(v=>global.reload('', v))
await conn.reply(m.chat, stdout.toString(), m)
//await m.react('✅')
}}
handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'actualizar', 'fix', 'fixed'] 
handler.rowner = true

export default handler
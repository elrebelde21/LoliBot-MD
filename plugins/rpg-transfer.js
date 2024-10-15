const items = ['limit', 'exp', 'joincount', 'money', 'potion', 'trash', 'wood', 'rock', 'string', 'petFood', 'emerald', 'diamond', 'gold', 'iron', 'common', 'uncoommon', 'mythic', 'legendary', 'pet', ]
let confirmation = {} 
async function handler(m, { conn, args, usedPrefix, command }) {
if (confirmation[m.sender]) return m.reply('𝙀𝙨𝙩𝙖𝙨 𝙝𝙖𝙘𝙞𝙚𝙣𝙙𝙤 𝙪𝙣𝙖 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧𝙚𝙣𝙘𝙞𝙖')
let user = global.db.data.users[m.sender]
const item = items.filter(v => v in user && typeof user[v] == 'number')
    
let lol = `\`⧼⧼⧼ 💱 𝙏𝙍𝘼𝙉𝙎𝙁𝙀𝙍𝙀𝙉𝘾𝙄𝘼 💱 ⧽⧽⧽\`
    
> *${usedPrefix + command}  tipo cantidad @tag*

\`❏ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊 :\`
* *${usedPrefix + command} exp 30 @0*

┏•「 *✅ 𝙍𝙀𝘾𝙐𝙍𝙎𝙊𝙎 𝘿𝙄𝙎𝙋𝙊𝙉𝙄𝘽𝙇𝙀𝙎* 」
┃
┃ 💎 𝘿𝙞𝙖𝙢𝙖𝙣𝙩𝙚𝙨 = limit
┃ 🪙 𝙇𝙤𝙡𝙞𝘾𝙤𝙞𝙣𝙨 = money 
┃ ⚡ 𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 = exp 
┗•`.trim()
    
const type = (args[0] || '').toLowerCase()
if (!item.includes(type)) return m.reply(lol,  m.chat, {mentions: conn.parseMention(lol)}, {quoted: m })
const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
if (!who) return m.reply(`${ag} *𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝘼𝙇 𝙐𝙎𝙐𝘼𝙍𝙄𝙊*`)
if (!(who in global.db.data.users)) return m.reply(`${fg}*𝙀𝙇 𝙐𝙎𝙐𝘼𝙍𝙄𝙊 ${who} 𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙐𝙀𝙉𝙏𝙍𝘼 𝙀𝙉 𝙈𝙄 𝘽𝘼𝙎𝙀 𝘿𝙀 𝘿𝘼𝙏𝙊𝙎*`)
if (user[type] * 1 < count) return m.reply(`${fg}*𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 𝙎𝙐𝙁𝙐𝘾𝙄𝙀𝙉𝙏𝙀 𝙋𝘼𝙍𝘼 𝙍𝙀𝘼𝙇𝙄𝙕𝘼𝙍 𝙇𝘼 𝙏𝙍𝘼𝙉𝙎𝙁𝙀𝙍𝙀𝙉𝘾𝙄𝘼 𝘿𝙀 ${type}*`)
let mentionedJid = [who]
let username = conn.getName(who)
    
let confirm = `\`ESTAS A PUNTO DE HACER ESTA ACCIÓN DE TRANFERENCIA\`

> 💹 *${count} ${type} para* *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* ? 

\`DESEAS CONTINUAR?\`
> Tienes 60 segundos!!

> Escriba: (si) para acertar
> escriba: (no) para cancelar\n\n> ${wm}`.trim()
    
let c = `${wm}\nTienes 60 segundos!!`
await conn.reply(m.chat, confirm, m, { mentions: [who] })
//conn.sendButton(m.chat, confirm, c, null, [['𝙎𝙄'], ['𝙉𝙊']], m, { mentions: [who] })
confirmation[m.sender] = {sender: m.sender, to: who, message: m, type, count, timeout: setTimeout(() => (m.reply('*SU TIEMPO SE HA TERMINADO*'), delete confirmation[m.sender]), 60 * 1000)}}

handler.before = async m => {
if (m.isBaileys) return
if (!(m.sender in confirmation)) return
if (!m.text) return
let { timeout, sender, message, to, type, count } = confirmation[m.sender]
if (m.id === message.id) return
let user = global.db.data.users[sender]
let _user = global.db.data.users[to]
if (/^No|no$/i.test(m.text) ) { 
//if (/No?/m.text(m.text.toLowerCase())) {
clearTimeout(timeout)
delete confirmation[sender]
return m.reply('*CANCELADO*')
}
if (/^Si|si$/i.test(m.text) ) { 
//if (/Si?/m.text(m.text.toLowerCase())) {
let previous = user[type] * 1
let _previous = _user[type] * 1
user[type] -= count * 1
_user[type] += count * 1
if (previous > user[type] * 1 && _previous < _user[type] * 1) m.reply(`✅ *TRANSFERENCIA HECHA CON ÉXITO:*\n\n*${count} ${type} para* @${(to || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [to] })
else {
user[type] = previous
_user[type] = _previous
m.reply(`*Error al transferir ${count} ${type} para* *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
}
clearTimeout(timeout)
delete confirmation[sender]
}}
handler.help = ['transfer'].map(v => v + ' [tipo] [cantidad] [@tag]')
handler.tags = ['econ'];
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

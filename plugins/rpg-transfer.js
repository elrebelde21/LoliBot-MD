const items = ['limit', 'exp', 'joincount', 'money', 'potion', 'trash', 'wood', 'rock', 'string', 'petFood', 'emerald', 'diamond', 'gold', 'iron', 'common', 'uncoommon', 'mythic', 'legendary', 'pet', ]
let confirmation = {} 
async function handler(m, { conn, args, usedPrefix, command }) {
if (confirmation[m.sender]) return m.reply('𝙀𝙨𝙩𝙖𝙨 𝙝𝙖𝙘𝙞𝙚𝙣𝙙𝙤 𝙪𝙣𝙖 𝙩𝙧𝙖𝙣𝙨𝙛𝙚𝙧𝙚𝙣𝙘𝙞𝙖')
let user = global.db.data.users[m.sender]
const item = items.filter(v => v in user && typeof user[v] == 'number')
    
let lol = `\`⧼⧼⧼ 💱 ${await tr("TRANSFERENCIAS")} 💱 ⧽⧽⧽\`
    
> *${usedPrefix + command}  ${await tr("Tipo cantidad")} @tag*

\`❏ ${await tr("EJEMPLO")} :\`
* *${usedPrefix + command} exp 30 @0*

┏•「 *✅ ${await tr("RECURSOS DISPONIBLE")}* 」
┃
┃ 💎 𝘿𝙞𝙖𝙢𝙖𝙣𝙩𝙚𝙨 = limit
┃ 🪙 𝙇𝙤𝙡𝙞𝘾𝙤𝙞𝙣𝙨 = money 
┃ ⚡ 𝙀𝙭𝙥𝙚𝙧𝙞𝙚𝙣𝙘𝙞𝙖 = exp 
┗•`.trim()
    
const type = (args[0] || '').toLowerCase()
if (!item.includes(type)) return m.reply(lol,  m.chat, {mentions: conn.parseMention(lol)}, {quoted: m })
const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
if (!who) return m.reply(ag + `*${await tr("ETIQUETE AL USUARIO")}*`)
if (!(who in global.db.data.users)) return m.reply(`${fg}*${await tr("EL USUARIO")} ${who} ${await tr("NO SE ENCUENTRA EN MI BASE DE DATOS")}*`)
if (user[type] * 1 < count) return m.reply(`${fg}*${await tr("NO TIENE SUFICIENTE PARA REALIZAR LA TRANFERENCIA DE ")} ${type}*`)
let mentionedJid = [who]
let username = conn.getName(who)
    
let confirm = `\`${await tr("ESTAS A PUNTO DE HACER ESTA ACCIÓN DE TRANFERENCIA")}\`

> 💹 *${count} ${type} ${await tr("para")}* *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* ? 

\`${await tr("DESEAS CONTINUAR?")}\`
> ${await tr("Tienes 60 segundos!!")}

> ${await tr("Escriba: (si) para acertar")}
> ${await tr("Escriba: (no) para cancelar")}\n\n> ${wm}`.trim()
    
let c = `${wm}\n${await tr("Tienes 60 segundos!!")}`
await conn.reply(m.chat, confirm, m, { mentions: [who] })
//conn.sendButton(m.chat, confirm, c, null, [['𝙎𝙄'], ['𝙉𝙊']], m, { mentions: [who] })
confirmation[m.sender] = {sender: m.sender, to: who, message: m, type, count, timeout: setTimeout(() => (m.reply(`*${tr("SU TIEMPO SE HA TERMINADO")}*`), delete confirmation[m.sender]), 60 * 1000)}}

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
return m.reply(await tr('*CANCELADO*'))
}
if (/^Si|si$/i.test(m.text) ) { 
//if (/Si?/m.text(m.text.toLowerCase())) {
let previous = user[type] * 1
let _previous = _user[type] * 1
user[type] -= count * 1
_user[type] += count * 1
if (previous > user[type] * 1 && _previous < _user[type] * 1) m.reply(`✅ *${await tr("TRANSFERENCIA HECHA CON ÉXITO:")}*\n\n*${count} ${type} ${await tr("para")}* @${(to || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [to] })
else {
user[type] = previous
_user[type] = _previous
m.reply(`*${await tr("Error al transferir")} ${count} ${type} ${await tr("para")}* *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
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

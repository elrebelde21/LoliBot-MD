/*---------------------------------------------------------------------------------------
  🍀 • By https://github.com/ALBERTO9883
  🍀 • ⚘Alberto Y Ashly⚘
-----------------------------------------------------------------------------------------*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
let regex = /x/g
if (!text) return await m.reply(await tr('⚠️ Y el número 🤔'))
if (!text.match(regex)) throw await tr(`*Ejemplo del uso: ${usedPrefix + command} 521999340434x*`)
let msgtxt1 = await tr("Registrado")
let msgtxt2 = await tr("Número")
let msgtxt3 = await tr("Descripción")
let msgtxt4 = await tr("Fecha")
let msgtxt5 = await tr("No Registrado")
let random = text.match(regex).length, total = Math.pow(10, random), array = []
for (let i = 0; i < total; i++) {
let list = [...i.toString().padStart(random, '0')]
let result = text.replace(regex, () => list.shift()) + '@s.whatsapp.net'
if (await conn.onWhatsApp(result).then(v => (v[0] || {}).exists)) {
let info = await conn.fetchStatus(result).catch(_ => {})
array.push({ exists: true, jid: result, ...info })
} else {
array.push({ exists: false, jid: result })
}}
let txt = await tr(msgtxt1 + '\n\n') + array.filter(v => v.exists).map(v => `• ${msgtxt2}: wa.me/${v.jid.split('@')[0]}\n*• ${msgtxt3}:* ${v.status || 'Sin descripcion'}\n*• ${msgtxt4}:* ${formatDate(v.setAt)}`).join('\n\n') + `\n\n*${msgtxt5}:*\n\n` + array.filter(v => !v.exists).map(v => v.jid.split('@')[0]).join('\n')
m.reply(txt)
}
handler.help = ["nowa"]
handler.tags = ["tools"]
handler.command = /^nowa$/i
handler.register = true
export default handler
function formatDate(n, locale = 'id') {
let d = new Date(n)
return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' })}

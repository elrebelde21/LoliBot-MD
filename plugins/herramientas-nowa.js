/*---------------------------------------------------------------------------------------
  🍀 • By https://github.com/ALBERTO9883
  🍀 • ⚘Alberto Y Ashly⚘
-----------------------------------------------------------------------------------------*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
let regex = /x/g
if (!text) throw '⚠️ 𝙔 𝙚𝙡 𝙣𝙪́𝙢𝙚𝙧𝙤🤔'
if (!text.match(regex)) throw `*𝑬𝒋𝒆𝒎𝒑𝒍𝒐 𝒅𝒆𝒍 𝒖𝒔𝒐: ${usedPrefix + command} 521999340434x*`
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
let txt = '𝑹𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒅𝒐\n\n' + array.filter(v => v.exists).map(v => `• 𝑵𝒖́𝒎𝒆𝒓𝒐: wa.me/${v.jid.split('@')[0]}\n*• 𝑫𝒆𝒔𝒄:* ${v.status || 'Sin descripcion'}\n*• 𝑭𝒆𝒄𝒉𝒂:* ${formatDate(v.setAt)}`).join('\n\n') + '\n\n*𝑵𝒐 𝒓𝒆𝒈𝒊𝒔𝒕𝒓𝒂𝒅𝒐*\n\n' + array.filter(v => !v.exists).map(v => v.jid.split('@')[0]).join('\n')
m.reply(txt)
}
handler.command = /^nowa$/i
handler.register = true
export default handler
function formatDate(n, locale = 'id') {
let d = new Date(n)
return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' })}

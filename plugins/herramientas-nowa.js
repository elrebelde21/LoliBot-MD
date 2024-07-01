/*---------------------------------------------------------------------------------------
  🍀 • By https://github.com/ALBERTO9883
  🍀 • ⚘Alberto Y Ashly⚘
-----------------------------------------------------------------------------------------*/
let handler = async (m, { conn, text, usedPrefix, command }) => {
let regex = /x/g
if (!text) return await conn.reply(m.chat,  '⚠️ 𝙔 𝙚𝙡 𝙣𝙪́𝙢𝙚𝙧𝙤 🤔', m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: ag, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, fb, tiktok].getRandom()}}})
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
let txt = '• 𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨\n\n' + array.filter(v => v.exists).map(v => `• 𝐍𝐮𝐦𝐞𝐫𝐨: wa.me/${v.jid.split('@')[0]}\n*• 𝑫𝒆𝒔𝒄:* ${v.status || 'Sin descripcion'}\n*• 𝐅𝐞𝐜𝐡𝐚::* ${formatDate(v.setAt)}`).join('\n\n') + '\n\n*𝐍𝐨 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐝𝐨:*\n\n' + array.filter(v => !v.exists).map(v => v.jid.split('@')[0]).join('\n')
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

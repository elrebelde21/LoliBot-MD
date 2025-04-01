let handler = async (m, { conn, usedPrefix, text }) => {
if (conn.user.jid !== global.conn.user.jid) throw false
let users = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user.jid)])]
let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks = text ? text : cc.text
let content = conn.cMod(m.chat, cc, /bc|broadcast/i.test(teks) ? teks : `*〔 ${await tr("DIFUSIÓN A SUB BOTS")} 〕*\n\n` + teks)
for (let id of users) {
await delay(1500)
await conn.copyNForward(id, content, true)
}
conn.reply(m.chat, `*${await tr("DIFUSIÓN ENVIADA CON ÉXITO A")} ${users.length} 𝗦𝗨𝗕 𝗕𝗢𝗧𝗦*
    
${users.map(v => '• Wa.me/' + v.replace(/[^0-9]/g, '') + `?text=${encodeURIComponent(usedPrefix)}estado`).join('\n')}\n*${await tr("S3 FINALIZO CON EL ENVIO EN")} ${users.length * 1.5} ${await tr("SEGUNDOS APROXIMADAMENTE")}`.trim(), m)}
handler.help = ['bcbot'];
handler.tags = ['jadibot'];
handler.command = /^bcbot$/i
handler.owner = true
export default handler
  
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const delay = time => new Promise(res => setTimeout(res, time))

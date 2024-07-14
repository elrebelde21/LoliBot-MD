let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
let pesan = args.join` `
let oi = `*𝙈𝙚𝙣𝙨𝙖𝙟𝙚:* ${pesan}`
let teks = `*⺀ ＡＣＴＩＶＥ ＧＲＵＰＯ 🗣️⺀*

❏ ${oi}

❏ *𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨:*
`
for (let mem of participants) {
teks += `➥ @${mem.id.split('@')[0]}\n`}
teks += `➥ ${wm}`
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )
}
handler.help = ['tagall <mesaje>','invocar <mesaje>']
handler.tags = ['group']
handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler

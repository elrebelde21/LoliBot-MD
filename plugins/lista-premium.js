let handler = async (m, { conn, isOwner }) => {
let vip = global.db.data.users[m.sender].premium
let prem = Object.entries(global.db.data.users).filter(user => user[1].premium)
let caption = `🎟️ 𝙐𝙨𝙪𝙖𝙧𝙞𝙤 𝙥𝙧𝙚𝙢𝙞𝙪𝙢 
*╭•·–––––––––––––––––––·•*
│ *𝙏𝙤𝙩𝙖𝙡: ${prem.length} 𝙐𝙨𝙪𝙖𝙧𝙞𝙤:* ${prem ? '\n' + prem.map(([jid], i) => `
│ *${i + 1}.* ${conn.getName(jid) == undefined ? 'Sin Usuarios' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split`@`[0] : jid}\n│ - - - - - - - - -`.trim()).join('\n') : ''}
*╰•·–––––––––––––––––––·•*`
await conn.sendButton(m.chat, caption, `🎟️ 🅟🅡🅔🅜🅘🅤🅜 ⇢ ${vip ? '✅' : '❌'}\n${wm}`, null, [ 
[`${vip ? '✦ 𝘿𝙞𝙨𝙛𝙧𝙪𝙩𝙖 𝙥𝙧𝙚𝙢𝙞𝙪𝙢  ✦': '✦ 𝘾𝙤𝙢𝙥𝙧𝙖 𝙥𝙖𝙨𝙚 𝙥𝙧𝙚𝙢𝙞𝙪𝙢 ✦'}`, `${vip ? '.allmenu': '.pase premium'}`]], m, { mentions: await conn.parseMention(caption) })
}
handler.command = /^(listapremium)$/i

export default handler

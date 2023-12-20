let handler = async (m, { conn, isOwner }) => {
let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
let caption = `
╭•·––| 👥 𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒 𝐁𝐀𝐍𝐄𝐀𝐃𝐎𝐒 |––·•
│  Total: ${users.length} ${users ? '\n' + users.map(([jid], i) => `
│ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
╰•·–––––––––––––––––––·•

╭•·––| 💬 𝘾𝙃𝘼𝙏𝙎 𝘽𝘼𝙉𝙀𝘼𝘿𝙊𝙎 |––·•
│  Total: ${chats.length} ${chats ? '\n' + chats.map(([jid], i) => `
│ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
╰•·–––––––––––––––––––·•
`.trim()
m.reply(caption, null, {mentions: conn.parseMention(caption)})}
handler.command = /^chat(s)?baneado(s)?|list(a)?chat(s)?|list(a)?ban(chat(s)?)?$/i
//handler.rowner = true
export default handler

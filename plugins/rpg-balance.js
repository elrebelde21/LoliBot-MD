let handler = async (m, {usedPrefix}) => {	
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender
let name = conn.getName(who) 
m.reply(`┌───⊷ 𝑩𝒂𝒍𝒂𝒏𝒄𝒆 ⊶
▢ *𝑵𝒐𝒎𝒃𝒓𝒆:* ${name}
▢ *𝑫𝒊𝒂𝒎𝒂𝒏𝒕𝒆:* ${global.db.data.users[who].limit}💎
└──────────────
*𝑵𝒐𝒕𝒂:* 
*𝑷𝒖𝒆𝒅𝒆𝒔 𝒄𝒐𝒎𝒑𝒓𝒂𝒓 𝒅𝒊𝒂𝒎𝒂𝒏𝒕𝒆 💎 𝑼𝒔𝒂𝒅𝒐 𝒍𝒐𝒔 𝒄𝒐𝒎𝒂𝒏𝒅𝒐́*
❏ *${usedPrefix}buy <cantidad>*
❏ *${usedPrefix}buyall*`)
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 
handler.register = true
export default handler

let handler = async (m, {usedPrefix}) => {	
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
else who = m.sender
let name = conn.getName(who) 
await conn.reply(m.chat,  `                          ⧼⧼⧼ 𝐁𝐀𝐋𝐀𝐍𝐂𝐄 ⧽⧽⧽\n\n▢ *𝐍𝐨𝐦𝐛𝐫𝐞:* ${name}\n▢ *𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞:* ${global.db.data.users[who].limit}💎\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n*❏ 𝐍𝐎𝐓𝐀:* 𝐏𝐮𝐞𝐝𝐞𝐬 𝐜𝐨𝐦𝐩𝐫𝐚𝐫 𝐝𝐢𝐚𝐦𝐚𝐧𝐭𝐞 💎 𝐔𝐬𝐚𝐧𝐝𝐨 𝐥𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨\n❏ *${usedPrefix}buy <cantidad>*\n❏ *${usedPrefix}buyall*`, m, {contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}})
}
handler.help = ['bal']
handler.tags = ['xp']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 
handler.register = true
export default handler

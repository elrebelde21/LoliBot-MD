let handler = async (m, {conn, usedPrefix}) => {
	
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) throw `✳️ ᴇʟ ᴜsᴜᴀʀɪᴏ ɴᴏ sᴇ ᴇɴᴄᴜᴇɴᴛʀᴀ ᴇɴ ᴍɪ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs`
conn.reply(m.chat, `*•───⧼⧼⧼ 𝙱𝙰𝙻𝙰𝙽𝙲𝙴 ⧽⧽⧽───•*

@${who.split('@')[0]} Tiene:

*• 𝐃𝐢𝐚𝐦𝐚𝐧𝐭𝐞:* _${user.limit} 💎_
*• 𝐄𝐱𝐩:* _${user.exp} ⬆️_
*• 𝐋𝐨𝐥𝐢𝐂𝐨𝐢𝐧𝐬:* _${user.money} 🪙_
> Afuera del Banco 

*•───⧼⧼⧼ 𝙱𝙰𝙽𝙲𝙾 ⧽⧽⧽───•*

*🏦 𝐃𝐢𝐧𝐞𝐫𝐨 :* _${user.banco} 💎_
> Adentro del Banco 🏦 

•───────────────•

> *𝐍𝐎𝐓𝐀 :* 
> 𝐩𝐮𝐞𝐝𝐞𝐬 𝐜𝐨𝐦𝐩𝐫𝐚𝐫 💎 𝐝𝐢𝐚𝐦𝐚𝐧𝐭𝐞 𝐮𝐬𝐚𝐧𝐝𝐨 𝐥𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬
> *• ${usedPrefix}buy <cantidad>*
> *• ${usedPrefix}buyall*`, m, { mentions: [who] })
}
handler.help = ['balance']
handler.tags = ['econ']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 
handler.register = true

export default handler

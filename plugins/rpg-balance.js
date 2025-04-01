let handler = async (m, {conn, usedPrefix}) => {
	
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) throw await tr(`✳️ El usuario no se encuentra en mi base de datos`)
conn.reply(m.chat, `*•───⧼⧼⧼ ${await tr("BALANCE", "𝙱𝙰𝙻𝙰𝙽𝙲𝙴")} ⧽⧽⧽───•*

@${who.split('@')[0]} ${await tr("Tiene")}:

*• ${await tr("Diamantes")}:* _${user.limit} 💎_
*• Exp:* _${user.exp} ⬆️_
*• LoliCoins:* _${user.money} 🪙_
> ${await tr("Afuera del Banco ")}

*•───⧼⧼⧼ ${await tr("BANCO", "𝙱𝙰𝙽𝙲𝙾")} ⧽⧽⧽───•*

*🏦 ${await tr("Dinero")} :* _${user.banco} 💎_
> ${await tr("Adentro del Banco")} 🏦 

•───────────────•

> *${await tr("NOTA")} :* 
> ${await tr("Puedes comprar 💎 Diamantes usando los comandos")}:
> *• ${usedPrefix}buy <cantidad>*
> *• ${usedPrefix}buyall*`, m, { mentions: [who] })
}
handler.help = ['balance']
handler.tags = ['econ']
handler.command = ['bal', 'diamantes', 'diamond', 'balance'] 
handler.register = true

export default handler

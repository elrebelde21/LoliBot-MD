import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	
 let name = conn.getName(m.sender)
  if (!text) throw `✳️ *Ejemplo :*\n\n *${usedPrefix + command}* eres puto`
 
  //let res = await fetch(global.API('https://api.simsimi.net', '/v2/', { text: encodeURIComponent(text), lc: "es" }, ''))
  await conn.sendPresenceUpdate('composing', m.chat)
  let res = await fetch(`https://api.simsimi.net/v2/?text=${text}&lc=es`)
  let json = await res.json()
  if (json.success) 
m.reply(`🤔 𝙋𝙍𝙀𝙂𝙐𝙉𝙏𝘼: ${text}

✅ 𝙍𝙀𝙎𝙋𝙐𝙀𝙎𝙏𝘼 : ${json.success.replace('simsimi', 'simsimi').replace('Simsimi', 'Simsimi').replace('sim simi', 'sim simi')}`) 
}

handler.help = ['pregunta <texto>?']
handler.tags = ['kerang']
handler.command = /^pregunta|preguntas|apakah$/i

export default handler


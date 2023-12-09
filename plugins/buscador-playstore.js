import fetch from 'node-fetch'

let handler = async (m, { conn, text, args }) => {
	if (!args[0]) throw `*[❗] 𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚 𝙙𝙚 𝙡𝙖 𝘼𝙋𝙆 𝙦𝙪𝙚 𝙦𝙪𝙞𝙚𝙧𝙖 𝙗𝙪𝙨𝙘𝙖𝙧*`
	let enc = encodeURIComponent(text)
try {
let json = await fetch(`https://latam-api.vercel.app/api/playstore?apikey=brunosobrino&q=${enc}`)
let gPlay = await json.json()
if (!gPlay.titulo) return m.reply(`[ ! ] Sin resultados`)
conn.sendMessage(m.chat,{image:{url: gPlay.imagen},caption:`🔍 𝙍𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤𝙨: ${gPlay.titulo}
───────•••───────
🧬 𝙄𝙙𝙚𝙣𝙩𝙞𝙛𝙞𝙘𝙖𝙙𝙤𝙧: ${gPlay.id}
───────•••───────
⛓️ 𝙇𝙞𝙣𝙠: ${gPlay.link}
───────•••───────
🖼️ 𝙄𝙢𝙖𝙜𝙚𝙣: ${gPlay.imagen}
───────•••───────
✍️ 𝘿𝙚𝙨𝙖𝙧𝙧𝙤𝙡𝙡𝙖𝙙𝙤𝙧: ${gPlay.desarrollador}
───────•••───────
📜 𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙘𝙞𝙤́𝙣: ${gPlay.descripcion}
───────•••───────
💲 𝙈𝙤𝙣𝙚𝙙𝙖: ${gPlay.moneda}
───────•••───────
🎭 𝙂𝙧𝙖𝙩𝙞𝙨?: ${gPlay.gratis}
───────•••───────
💸 𝙋𝙧𝙚𝙘𝙞𝙤: ${gPlay.precio}
───────•••───────
📈 𝙋𝙪𝙣𝙩𝙪𝙖𝙘𝙞𝙤́𝙣: ${gPlay.puntuacion}`},{quoted:m})
} catch (e) {
m.reply('𝙐𝙛 𝙚𝙧𝙧𝙤𝙧, 𝙨𝙚 𝙢𝙚 𝙘𝙖𝙮𝙤́ 𝙚𝙡 𝙨𝙚𝙧𝙫𝙞𝙙𝙤 🤡,  𝙫𝙪𝙚𝙡𝙫𝙖 𝙖 𝙞𝙣𝙩𝙚𝙣𝙩𝙖𝙧')
console.log(e)
}
}

handler.help = ['playstore <aplicacion>']
handler.tags = ['internet']
handler.command = /^(playstore)$/i

export default handler 
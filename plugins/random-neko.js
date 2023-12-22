import fetch from 'node-fetch'
let handler = async (m, { conn, command }) => {
let ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text()
let nek = ne.split('\n')
let neko = pickRandom(nek)
conn.sendFile(m.chat, neko, 'error.jpg', 'Nyaww~ 🐾💗', m, false, { contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: 'Nyaww~ 🐾💗', body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [nna, md, yt, tiktok, fb].getRandom()}}})
//conn.sendButton(m.chat, 'Nyaww~ 🐾💗', wm, neko, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `/${command}`]],m)
}
handler.command = /^(neko)$/i
handler.tags = ['anime']
handler.help = ['neko']
handler.register = true
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

let handler = async(m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `${mg}𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙚𝙡 𝙩𝙚𝙭𝙩𝙤 𝙨𝙚 𝙘𝙤𝙣𝙫𝙞𝙚𝙧𝙩𝙖 𝙚𝙡 𝙨𝙩𝙞𝙘𝙠𝙚𝙧\n𝙀𝙟𝙚𝙢𝙥𝙡𝙤\n*${usedPrefix + command}* Nuevo Sticker`
let teks = encodeURI(text)
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp?apikey=${lolkeysapi}&text=${teks}`, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, mediaType: 2, sourceUrl: [nna, nn, md, yt].getRandom(), thumbnail: imagen4}}}, { quoted: m })
}
handler.tags = ['sticker']
handler.command = /^(attp|ttp|ttp2|ttp3|ttp4|attp2)$/i
handler.register = true
export default handler
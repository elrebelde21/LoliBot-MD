let handler = async (m, { conn }) => {
let dados = ['https://tinyurl.com/gdd01',
'https://tinyurl.com/gdd02',
'https://tinyurl.com/gdd003',
'https://tinyurl.com/gdd004',
'https://tinyurl.com/gdd05',
'https://tinyurl.com/gdd006']
let url = dados[Math.floor(Math.random() * dados.length)]
m.react("🎲")
//await conn.reply(m.chat, `${lenguajeGB['smsAvisoEG']()}𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝙀𝙎𝙋𝙀𝙍𝙀, 𝙎𝙐 𝘿𝘼𝘿𝙊 𝙎𝙀 𝙀𝙎𝙏𝘼 𝘾𝙍𝙀𝘼𝙉𝘿𝙊\n\n𝙋𝙇𝙀𝘼𝙎𝙀 𝙒𝘼𝙄𝙏, 𝙔𝙊𝙐𝙍 𝘿𝙄𝘾𝙀 𝙄𝙎 𝘽𝙀𝙄𝙉𝙂 𝘾𝙍𝙀𝘼𝙏𝙀𝘿`, fkontak, m)
conn.sendFile(m.chat, url, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: m.pushName, body: info.wm, mediaType: 2, sourceUrl: info.wm, thumbnail: m.pp}}}, { quoted: m })
//conn.sendFile(m.chat, url, 'error.webp', null, m, { asSticker: true })
}
handler.help = ['dados'];
handler.tags = ['game'];
handler.command = ['dado', 'dados', 'dadu'] 
handler.register = true
export default handler

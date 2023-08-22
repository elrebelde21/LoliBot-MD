import { toDataURL } from 'qrcode'
let handler = async (m, { text, conn }) => {
if (!text) throw `${mg}𝑬𝒔𝒄𝒓𝒊𝒃𝒂 𝒖𝒏 𝒕𝒆𝒙𝒕𝒐 𝒑𝒂𝒓𝒂 𝒄𝒐𝒏𝒗𝒆𝒓𝒕𝒊𝒓 𝒆𝒍 𝒄𝒐́𝒅𝒊𝒈𝒐 𝑸𝑹`
conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', wm, m)
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <teks>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i
handler.limit = 1
handler.register = true
export default handler

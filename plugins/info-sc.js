import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)

const handler = async (m, { conn, usedPrefix: _p }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let _package = {}
try {
const pkgStr = await fs.readFile(join(__dirname, '../package.json'), 'utf8')
_package = JSON.parse(pkgStr)
} catch { _package = {} }

const pad = n => (n < 10 ? '0' : '') + n
const kyun = (seconds) => {
const days    = Math.floor(seconds / (24 * 60 * 60))
const hours   = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
const minutes = Math.floor((seconds % (60 * 60)) / 60)
const secs = Math.floor(seconds % 60)
return `🫶 ${info.md}\n\n*⏳ 𝙏𝙄𝙀𝙈𝙋𝙊 𝘼𝘾𝙏𝙄𝙑𝙊:*\n\t${pad(days)} Dias\t ${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(secs)} Segundos\n`
}

const runtime = process.uptime()
const teks = kyun(runtime)
const prep = generateWAMessageFromContent(m.chat, { 
orderMessage: { 
itemCount: -10062007, 
status: 500, 
surface: 999,
message: teks,
description: '^^',
orderTitle: 'Hi Sis',
token: '9',
curreyCode: 'IDR',
totalCurrencyCode: '>〰<',
totalAmount1000: '1000000',
sellerJid: 'https://github.com/elrebelde21/LoliBot-MD',
thumbnailUrl: "https://telegra.ph/file/39fb047cdf23c790e0146.jpg"
}}, { contextInfo: null, quoted: fkontak })
await conn.relayMessage(prep.key.remoteJid, prep.message, { messageId: prep.key.id })
}
handler.help = ['runtime']
handler.tags = ['main']
handler.command = /^(runtime|sc)$/i
handler.owner = false
handler.group = false
handler.private = false
handler.register = true
export default handler

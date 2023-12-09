let { generateWAMessageFromContent } = (await import(global.baileys)).default 
import { performance } from 'perf_hooks'
import { promises } from 'fs'
import { join } from 'path'
let handler  = async (m, { conn, __dirname, usedPrefix: _p }) => {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}

function kyun(seconds){
function pad(s){
return (s < 10 ? '0' : '') + s;
}
var days = Math.floor(seconds / (24 * 60 * 60 * 1000));
var hours = Math.floor(seconds / (60*60));
var minutes = Math.floor(seconds % (60*60) / 60);
var seconds = Math.floor(seconds % 60);
//return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
return `🫶 ${_package.homepage}\n\n*⏳ 𝙏𝙄𝙀𝙈𝙋𝙊 𝘼𝘾𝙏𝙄𝙑𝙊:*\n \t${pad(days)} Dias\t ${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segudos \t\n`
}
const runtime = process.uptime()
const teks = `${kyun(runtime)}`
const itsme = `0@s.whatsapp.net`
const split = `uwu >//<`
const rtimebro = {contextInfo: {participant: itsme, quotedMessage: {extendedTextMessage: {text: split }}}}
let prep = generateWAMessageFromContent(m.chat, { orderMessage: {itemCount: -10062007, status: 500, surface: 999, message: teks, description: '^^', orderTitle: 'Hi Sis', token: '9', curreyCode: 'IDR', totalCurrencyCode: '>〰<', totalAmount1000: '1000000', sellerJid: 'https://github.com/elrebelde21/The-LoliBot-MD', thumbnail: fs.readFileSync('./src/avatar_contact.png')}}, {contextInfo: null, quoted: m})
conn.relayWAMessage(prep)
//conn.sendMessage(m.chat, `${teks}`, MessageType.text, rtimebro)
}
handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(runtime|sc|activo|github)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.register = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
export default handler

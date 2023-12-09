import axios from 'axios'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let user = db.data.users[m.sender]
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let time = global.db.data.users[m.sender].prue + 60000
if (new Date - global.db.data.users[m.sender].prue < 60000) throw `*ESPERA UNOS MINUTOS PARA USAR OTRO COMANDO*`
if (!args[0]) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}*𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝙑𝘼𝙇𝙄𝘿𝙊 𝘿𝙀𝙇 𝙈𝙀𝘿𝙄𝘼𝙁𝙄𝙍𝙀*\n*𝙀𝙅𝙀𝙈𝙋𝙇𝙊:*\n ${usedPrefix + command} https://www.mediafire.com/file/cv64tns6co3272q/Lolibot.zip/file`, fkontak, m)
try {  
let res = await mediafireDl(args[0])
let { name, size, date, mime, link } = res
let caption = `╭┄ ${wm}\n┆ 💫 𝙉𝙊𝙈𝘽𝙍𝙀:\n┆ ${name}\n┆——————«•»——————\n┆ 💪 𝙋𝙀𝙎𝙊:\n┆ ${size}\n┆——————«•»——————\n┆ 🚀 𝙏𝙄𝙋𝙊:\n┆ ${mime}\n╰━━━⊰ 𓃠 ${vs} ⊱━━━━დ\n\n⏳ ᴱˢᵖᵉʳᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ ᵉⁿ ˡᵒˢ ᵠᵘᵉ ᵉⁿᵛᶦᵒˢ ˢᵘˢ ᵃʳᶜʰᶦᵛᵒˢ`.trim()
conn.reply(m.chat, caption, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: '𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿',
body: 'Super Bot WhatsApp',         
previewType: 0, thumbnail: fs.readFileSync("./media/menus/Menu2.jpg"),
sourceUrl: `https://github.com/elrebelde21/The-LoliBot-MD`}}})
await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true })
} catch {  
let sticker = './src/stickers1.webp'
conn.sendFile(m.chat, sticker, 'error.webp', '', m)
handler.limit = false
}
global.db.data.users[m.sender].prue = new Date * 1
}
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(mediafire|mediafiredl|dlmediafire)$/i
handler.register = true
handler.limit = 3
handler.exp = 100
export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m y " + seconds + " s " 
}

async function mediafireDl(url) {
   const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`)
   const $ = cheerio.load(res.data)
   const link = $('#downloadButton').attr('href')
   const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','')
   const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
   const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','')
   let mime = ''
   let rese = await axios.head(link)
   mime = rese.headers['content-type']
   return { name, size, date, mime, link }
}
      
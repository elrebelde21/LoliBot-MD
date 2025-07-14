import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

const handler = async (m, { conn, usedPrefix, command }) => {
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ""
if (!mime.startsWith('image')) return m.reply(`⚠️ *Responde a una imagen para mejorarla en HD.*`)
await m.react('⌛')
    
let img = await q.download?.()
if (!img) return m.reply(`❌ No se pudo descargar la imagen.`)
let url = await uploadImage(img)
let res = await fetch(`https://api.neoxr.eu/api/remini?image=${encodeURIComponent(url)}&apikey=GataDios`)
let json = await res.json()
if (!json.status || !json.data?.url) return m.reply('❌ No se pudo mejorar la imagen.')
await conn.sendFile(m.chat, json.data.url, 'hd.jpg', `✅ *Aquí está tu imagen en HD*`, m)
await m.react('✅')
} catch (e) {
console.error(e)
await m.react('❌')
m.reply(`❌ Error: ${e.message || e}`)
}}
handler.help = ['hd', 'remini', 'enhance']
handler.tags = ['tools']
handler.command = ['hd', 'remini', 'enhance']
handler.register = true
handler.limit = 1

export default handler

import axios from 'axios'
import fetch from 'node-fetch'

const contenidoNSFW = {
  pack: { label: '_🥵 aqui tiene mi Pack 😏_', type: 'json', url: 'https://raw.githubusercontent.com/elrebelde21/The-LoliBot-MD2/main/src/nsfw/pack.json', aliases: [] },
  pack2: { label: '_🥵 aqui tiene mi Pack 😏_', type: 'json', url: 'https://raw.githubusercontent.com/elrebelde21/The-LoliBot-MD2/main/src/nsfw/packgirl.json', aliases: [] },
  pack3: { label: '_🥵 aqui tiene mi Pack 😏_', type: 'json', url: 'https://raw.githubusercontent.com/elrebelde21/The-LoliBot-MD2/main/src/nsfw/packmen.json', aliases: [] },
  tetas: { label: '🥵 dame lechita de hay 🥵', type: 'json', url: 'https://raw.githubusercontent.com/elrebelde21/The-LoliBot-MD2/main/src/nsfw/tetas.json', aliases: ['pechos'] },
  videoxxx: { label: '_*ᴅɪsғʀᴜᴛᴀ ᴅᴇʟ ᴠɪᴅᴇᴏ 🥵_', type: 'json', url: 'https://raw.githubusercontent.com/elrebelde21/The-LoliBot-MD2/main/src/nsfw/videoxxxc.json', aliases: ['vídeoxxx'] },
  videoxxxlesbi: { label: '_*ᴅɪsғʀᴜᴛᴀ ᴅᴇʟ ᴠɪᴅᴇᴏ 🥵_', type: 'json', url: 'https://raw.githubusercontent.com/elrebelde21/The-LoliBot-MD2/main/src/nsfw/videoxxxc2.json', aliases: ['videolesbixxx', 'pornolesbivid'] },
  pornololi: { label: '🥵', type: 'json', url: 'https://raw.githubusercontent.com/elrebelde21/The-LoliBot-MD2/main/src/nsfw/pornololi.json', aliases: ['pornololi'] },
  yuri: { label: '👩‍❤️‍👩 Yuri', type: 'json', url: 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/yuri.json', aliases: [] },
  yaoi: { label: '👨‍❤️‍👨 Yaoi', type: 'api', api: 'https://nekobot.xyz/api/image?type=yaoi', field: 'message', aliases: [] },
  corean: { label: '🥵', type: 'api', api: 'https://delirius-apiofc.vercel.app/nsfw/corean', aliases: ["china"] },
  boobs: { label: 'Upa la paja 😱', type: 'api', api: 'https://delirius-apiofc.vercel.app/nsfw/boobs', aliases: [] },
  girls: { label: '🥵 Uff pa una pajita 🥵', type: 'api', api: 'https://delirius-apiofc.vercel.app/nsfw/girls', aliases: ["porno"] },
  trapito: { label: '🚺 Trapito', type: 'waifu', api: 'trap', aliases: ['trap'] },
}

const aliasMap = {}
for (const [key, item] of Object.entries(contenidoNSFW)) {
  aliasMap[key.toLowerCase()] = item
  for (const alias of (item.aliases || [])) {
    aliasMap[alias.toLowerCase()] = item
  }
}

let handler = async (m, { conn, command }) => {
try {
const item = aliasMap[command.toLowerCase()]
if (!item) return m.reply('❌ Comando NSFW no reconocido.')

if (item.type === 'array') {
const url = item.array[Math.floor(Math.random() * item.array.length)]
await conn.sendFile(m.chat, url, 'nsfw.jpg', item.label, m)
return
}

if (item.type === 'json') {
const { data } = await axios.get(item.url)
const img = data[Math.floor(Math.random() * data.length)]
await conn.sendFile(m.chat, img, 'nsfw.jpg', item.label, m)
return
}

if (item.type === 'waifu') {
const res = await fetch(`https://api.waifu.pics/nsfw/${item.api}`)
const { url } = await res.json()
await conn.sendFile(m.chat, url, 'waifu.jpg', item.label, m)
return
}

if (item.type === 'api') {
const res = await fetch(item.api)
const contentType = res.headers.get('content-type') || ''
if (contentType.startsWith('image/')) {
const buffer = await res.buffer()
await conn.sendFile(m.chat, buffer, 'img.jpg', item.label, m)
return
}
const json = await res.json()
const url = item.field ? json[item.field] : json.url || json.message
await conn.sendFile(m.chat, url, 'nsfw.jpg', item.label, m)
return
}
m.reply('❌ Fuente NSFW no soportada.')
} catch (e) {
console.error('[NSFW ERROR]', e)
m.reply('❌ Error al enviar imagen/video +18.')
}}
handler.help = Object.keys(aliasMap)
handler.tags = ['nsfw']
handler.command = new RegExp(`^(${Object.keys(aliasMap).join('|')})$`, 'i')
handler.limit = 2
handler.register = true
export default handler

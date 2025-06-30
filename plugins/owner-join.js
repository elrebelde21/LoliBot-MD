import { db, getSubbotConfig } from '../lib/postgres.js'

const linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text, isOwner }) => {
let quotedText = m.quoted?.text || ""
let extText = m.quoted?.message?.extendedTextMessage?.text || ""
let allText = `${quotedText}\n${extText}\n${text}`
let link = allText.match(linkRegex)?.[0]
let [_, code] = link ? link.match(linkRegex) : []

if (!code) throw `🤔 𝙔 𝙚𝙡 𝙚𝙣𝙡𝙖𝙘𝙚? 𝙄𝙣𝙜𝙧𝙚𝙨𝙖 𝙪𝙣 𝙚𝙣𝙡𝙖𝙘𝙚 𝙫𝙖́𝙡𝙞𝙙𝙤 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙚𝙡 𝙗𝙤𝙩 𝙥𝙪𝙚𝙙𝙖 𝙪𝙣𝙞𝙧𝙨𝙚.\n\n📝 *¿𝘾𝙤́𝙢𝙤 𝙪𝙨𝙖𝙧 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤?*\nUsa: #join <enlace> [tiempo]\n- Si no pones tiempo, el bot se une por 30 minutos (usuarios) o 1 día (propietario).\n- Puedes especificar el tiempo con: minuto, hora, día o mes.\n\n📌 *Ejemplos:*\n- #join ${info.nn} (por defecto)\n- #join ${info.nn2} 60 minuto (1 hora)\n- #join ${info.nn} 2 día (2 días)\n- #join ${info.nn} 1 mes (30 días)`;

let waMeMatch = allText.match(/wa\.me\/(\d{8,})/)
let solicitante = waMeMatch ? waMeMatch[1] : m.sender.split('@')[0]
const botConfig = await getSubbotConfig(conn.user.id)
const prestar = botConfig.prestar === undefined ? true : botConfig.prestar
const timeMatch = text.match(/(\d+)\s*(minuto|hora|día|dias|mes)/i)
let time, unit
if (!prestar && isOwner) {
time = timeMatch ? parseInt(timeMatch[1]) : 1
unit = timeMatch ? timeMatch[2].toLowerCase() : 'día'
} else {
time = timeMatch ? parseInt(timeMatch[1]) : 30
unit = timeMatch ? timeMatch[2].toLowerCase() : 'minuto'
}

let timeInMs
if (unit.includes('minuto')) {
timeInMs = time * 60 * 1000
} else if (unit.includes('hora')) {
timeInMs = time * 60 * 60 * 1000
} else if (unit.includes('día') || unit.includes('dias')) {
timeInMs = time * 24 * 60 * 60 * 1000
} else if (unit.includes('mes')) {
timeInMs = time * 30 * 24 * 60 * 60 * 1000
}

if (!prestar && !isOwner) {
await m.reply(`𝙎𝙪 𝙚𝙣𝙡𝙖𝙘𝙚 𝙨𝙚 𝙚𝙣𝙫𝙞𝙤́ 𝙖𝙡 𝙢𝙞 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤(𝙖)*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n⚠️ *𝙎𝙪 𝙜𝙧𝙪𝙥𝙤 𝙨𝙚𝙧𝙖́ 𝙚𝙫𝙖𝙡𝙪𝙖𝙙𝙤 𝙮 𝙦𝙪𝙚𝙙𝙖𝙧𝙖́ 𝙖 𝙙𝙚𝙘𝙞𝙨𝙞𝙤́𝙣 𝙙𝙚𝙡 𝙢𝙞 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤(𝙖).*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n❕ *𝙀𝙨 𝙥𝙤𝙨𝙞𝙗𝙡𝙚 𝙦𝙪𝙚 𝙨𝙪 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙪𝙙 𝙨𝙚𝙖 𝙧𝙚𝙘𝙝𝙖𝙯𝙖𝙙𝙖 𝙥𝙤𝙧 𝙡𝙖𝙨 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚𝙨 𝙘𝙖𝙪𝙨𝙖𝙨:*\n1️⃣ *𝙀𝙡 𝙗𝙤𝙩 𝙚𝙨𝙩𝙖́ 𝙨𝙖𝙩𝙪𝙧𝙖𝙙𝙤* .\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n2️⃣ *𝙀𝙡 𝙗𝙤𝙩 𝙛𝙪𝙚 𝙚𝙡𝙞𝙢𝙞𝙣𝙖𝙙𝙤 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤.*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n3️⃣ *𝙀𝙡 𝙜𝙧𝙪𝙥𝙤 𝙣𝙤 𝙘𝙪𝙢𝙥𝙡𝙞𝙧 𝙘𝙤𝙣 𝙡𝙖𝙨 𝙣𝙤𝙧𝙢𝙖𝙩𝙞𝙫𝙖 𝙙𝙚 𝙀𝙡 𝙗𝙤𝙩*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n4⃣ *𝙚𝙡 𝙜𝙧𝙪𝙥𝙤 𝙩𝙞𝙚𝙣𝙚 𝙦𝙪𝙚 𝙩𝙚𝙣𝙚𝙧 𝙢𝙞𝙣𝙞𝙢𝙤 80 𝙥𝙖𝙧𝙩𝙞𝙘𝙞𝙥𝙖𝙣𝙩𝙚𝙨 𝙥𝙖𝙧𝙖 𝙚𝙫𝙞𝙩𝙖𝙧 𝙜𝙧𝙪𝙥𝙤 𝙞𝙣𝙖𝙘𝙩𝙞𝙫𝙤 𝙮 𝙨𝙖𝙩𝙪𝙧𝙖 𝙖𝙡 𝙗𝙤𝙩*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n5⃣ *𝙀𝙡 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤 𝙨𝙚 𝙧𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙞𝙤*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n6️⃣ *𝙉𝙤 𝙨𝙚 𝙖𝙜𝙧𝙚𝙜𝙖 𝙖𝙡 𝙜𝙧𝙪𝙥𝙤 𝙨𝙚𝙜𝙪́𝙣 𝙢𝙞 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤(𝙖)*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n💌 *𝙇𝙖𝙨 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙪𝙙 𝙥𝙪𝙚𝙙𝙚 𝙩𝙖𝙧𝙙𝙖 𝙝𝙤𝙧𝙖𝙨 𝙚𝙣 𝙨𝙚𝙧 𝙧𝙚𝙨𝙥𝙤𝙣𝙍𝙞𝙙𝙖𝙨. 𝙋𝙤𝙧 𝙛𝙖𝙫𝙤𝙧 𝙩𝙚𝙣𝙚𝙧 𝙥𝙖𝙘𝙞𝙚𝙣𝙘𝙞𝙖 𝙜𝙧𝙖𝙘𝙞𝙖𝙨*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n*ᴾᵘᵉᵈᵉ ᵃᵖᵒʸᵃʳ ᵉˡ ᵇᵒᵗ ᶜᵒⁿ ᵘⁿᵃ ᴱˢᵗʳᵉˡˡᶦᵗᵃ ᵉˡ ⁿᵘᵉˢᵗʳᵒ ʳᵉᵖᵒˢᶦᵗᵒʳᶦᵒ ᵒᶠᶦᶜᶦᵃˡ ʸ ˢᵘˢᶜʳᶦʳᵗᵉ ᵃ ⁿᵘᵉˢᵗʳᵒ ᶜᵃⁿᵃˡ ᵈᵉˡ ʸᵒᵘᵀᵘᵇᵉ ᵐᵃⁿᵈᵃ ᶜᵃʳᵗᵘʳᵃ ᵃ ᵐᶦ ᶜʳᵉᵃᵈᵒʳ ᵖᵃʳᵃ ᵠᵘᵉ ᵖᵘᵉᵈᵃ ᵃᵍʳᵉᵍᵃ ᵉˡ ᵇᵒᵗ ᵃ ᵗᵘ ᵍʳᵘᵖᵒ 💫*\n${[info.yt, info.md].getRandom()}`)
let ownerJid = "573226873710@s.whatsapp.net";
if (ownerJid !== conn.user.jid) {
await conn.sendMessage(ownerJid, {text: `*⪨ 𝙎𝙊𝙇𝙄𝘾𝙄𝙏𝙐𝘿 𝘿𝙀 𝘽𝙊𝙏 𝙋𝘼𝙍𝘼 𝙐𝙉 𝙂𝙍𝙐𝙋𝙊 ⪩*\n\n👤 𝙉𝙪𝙢𝙚𝙧𝙤 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙖𝙣𝙩𝙚:\nwa.me/${m.sender.split('@')[0]}\n🔮 𝙇𝙞𝙣𝙠 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤:\nhttp://${link}\n\n⏳ 𝙏𝙞𝙚𝙢𝙥𝙤 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙖𝙙𝙤: ${time} ${unit}${time > 1 ? 's' : ''}`, contextInfo: { mentionedJid: [m.sender] }});
} 
return;
}

if (prestar || isOwner) {
if (!isOwner) {
const costPerHour = 100
const cost = Math.ceil((timeInMs / (60 * 60 * 1000)) * costPerHour)
let { rows } = await db.query('SELECT limite FROM usuarios WHERE id = $1', [m.sender])
let limite = rows[0]?.limite ?? 0
if (limite < cost) return m.reply(`❌ No tienes suficientes diamantes. Necesitas *${cost} diamantes* para unir el bot al grupo.`)
await db.query('UPDATE usuarios SET limite = limite - $1 WHERE id = $2', [cost, m.sender])
await m.reply(`😎 Espere 3 segundos, me uniré al grupo\n\n> Se han descontado *${cost} diamantes* de tu cuenta.`)
}

let res
try {
res = await conn.groupAcceptInvite(code)
} catch (e) {
console.error("Error al unirse al grupo:", e)
return m.reply("❌ No pude unirme al grupo. Verifica el enlace e inténtalo de nuevo.")
}

await new Promise(r => setTimeout(r, 3000))
let groupMeta = await conn.groupMetadata(res)
let groupName = groupMeta.subject || "este grupo"
let mes = `Hola a todos 👋🏻\n\nSoy *${conn.user.name}*.\nFui invitado por *@${solicitante}*\nPara ver el menú escribe: *#menu*\n\nEl bot saldrá automáticamente después de:\n${time} ${unit}${time > 1 ? 's' : ''}`
await conn.sendMessage(res, { text: mes, contextInfo: { mentionedJid: [`${solicitante}@s.whatsapp.net`] } })
await db.query('INSERT INTO group_settings (group_id, expired) VALUES ($1, $2) ON CONFLICT (group_id) DO UPDATE SET expired = $2', [res, Date.now() + timeInMs])
await m.reply(`*El Bot se ha unido al grupo ✅* por *${time} ${unit}${time > 1 ? 's' : ''}*`)
}}
handler.help = ['join [chat.whatsapp.com] [tiempo]']
handler.tags = ['owner']
handler.command = /^unete|join|nuevogrupo|unir|unite|unirse|entra|entrar$/i
handler.register = true
export default handler

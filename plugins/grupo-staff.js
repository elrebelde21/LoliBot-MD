let handler = async (m, { conn, text, participants, metadata, args }) => {
try {
if (!text || !text.trim()) return m.reply(`😾 Y el texto?`)
const metadata = await conn.groupMetadata(m.chat)
const admins = metadata.participants.filter(p => p.admin)
if (!admins.length) return m.reply("⚠️ No hay administradores en este grupo.")

const users = admins.map(p => p.phoneNumber || p.id)
const total = users.length
await m.react("📣")

const mensaje = `•══✪〘 *ＳＴＡＦＦ* 〙✪══•

> *𝐒𝐞 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐥𝐚 𝐩𝐫𝐞𝐬𝐞𝐧𝐜𝐢𝐚 𝐝𝐞 𝐮𝐧 𝐚𝐝𝐦𝐢𝐧𝐬* 

*• Mensaje:* ${text.trim()}

👑 *Administradores (${total}):*\n` + users.map(u => `➥ @${u.replace(/@s\.whatsapp\.net|@lid/g, "").replace(/[^0-9]/g, "")}`).join(" \n ")

await conn.sendMessage(m.chat, { text: mensaje + `\n\n> [ ⚠️ ️] *ᵁˢᵃʳ ᵉˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ˢᵒˡᵒ ᶜᵘᵃⁿᵈᵒ ˢᵉ ᵗʳᵃᵗᵉ ᵈᵉ ᵘⁿᵃ ᵉᵐᵉʳᵍᵉⁿᶜᶦᵃ*`, mentions: users }, { quoted: m})
} catch (e) {
console.error("❌ Error en /admins:", e)
}}
handler.help = ['staff']
handler.tags = ['group']
handler.command = ['staff', 'admins', 'listadmin'] 
handler.group = true
handler.register = true

export default handler

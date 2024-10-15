let handler = async (m, { conn, text, usedPrefix, command }) => {
let who
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
else who = m.chat
let user = global.db.data.users[who]
if (!who) throw `🤓 Etiqueta al usuario boludito`
let users = global.db.data.users
users[who].banned = true
let ban = 'https://qu.ax/SJJt.mp3'
conn.sendMessage(m.chat, { audio: { url: ban }, contextInfo: { "externalAdReply": { "title": `⚠️ ᴱˡ ᵘˢᵘᵃʳᶦᵒ(ᵃ) ᶠᵘᵉ ᵇᵃⁿᵉᵃᵈᵒ(ᵃ) 🙀 ⁿᵒ ᵖᵒᵈʳᵃ ᵘˢᵃʳ ᵃ ${wm}`, "body": ``, "previewType": "PHOTO", "thumbnailUrl": null,"thumbnail": imagen1, "sourceUrl": md, "showAdAttribution": true}}, ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: m })
}
handler.help = ['banuser']
handler.tags = ['owner']
handler.command = /^banuser$/i
handler.rowner = true

export default handler
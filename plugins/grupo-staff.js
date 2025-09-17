let handler = async (m, { conn, participants, metadata, args }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './media/Menu1.jpg'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => {
let jid = v.id
if (jid.endsWith('@lid') && v.participantAlt && v.participantAlt.endsWith('@s.whatsapp.net')) {
jid = v.participantAlt
}
return `${i + 1}. @${jid.split('@')[0]}`
}).join('\n➥ ')

let owner = metadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let text = `•══✪〘 *ＳＴＡＦＦ* 〙✪══•

> *𝐒𝐞 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐥𝐚 𝐩𝐫𝐞𝐬𝐞𝐧𝐜𝐢𝐚 𝐝𝐞 𝐮𝐧 𝐚𝐝𝐦𝐢𝐧𝐬* 

*• 𝐆𝐫𝐮𝐩𝐨:* ${metadata.subject}

*• 𝐀𝐝𝐦𝐢𝐧𝐬:*
➥ ${listAdmin}

> [ ⚠ ️] *ᵁˢᵃʳ ᵉˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ˢᵒˡᵒ ᶜᵘᵃⁿᵈᵒ ˢᵉ ᵗʳᵃᵗᵉ ᵈᵉ ᵘⁿᵃ ᵉᵐᵉʳᵍᵉⁿᶜᶦᵃ*`.trim()

const mentions = [...groupAdmins.map(v => v.participantAlt?.endsWith('@s.whatsapp.net') ? v.participantAlt : v.id), owner]
await conn.sendFile(m.chat, pp, 'staff.jpg', text, m, false, { mentions })
}
handler.help = ['staff']
handler.tags = ['group']
handler.command = ['staff', 'admins', 'listadmin'] 
handler.group = true
handler.register = true

export default handler

let handler = async (m, { conn, participants, groupMetadata, args }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n➥ ')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

let text = `•══✪〘 *ＳＴＡＦＦ* 〙✪══•

> *𝐒𝐞 𝐧𝐞𝐜𝐞𝐬𝐢𝐭𝐚 𝐥𝐚 𝐩𝐫𝐞𝐬𝐞𝐧𝐜𝐢𝐚 𝐝𝐞 𝐮𝐧 𝐚𝐝𝐦𝐢𝐧𝐬* 

*• 𝐆𝐫𝐮𝐩𝐨𝐬:* _${groupMetadata.subject}_

*• 𝐀𝐝𝐦𝐢𝐧𝐬:
${listAdmin}

> [ ⚠ ️] *ᵁˢᵃʳ ᵉˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ˢᵒˡᵒ ᶜᵘᵃⁿᵈᵒ ˢᵉ ᵗʳᵃᵗᵉ ᵈᵉ ᵘⁿᵃ ᵉᵐᵉʳᵍᵉⁿᶜᶦᵃ*
`.trim()
conn.sendFile(m.chat, pp, 'staff.png', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.help = ['staff']
handler.tags = ['group']
handler.command = ['staff', 'admins', 'listadmin'] 
handler.group = true
handler.register = true

export default handler

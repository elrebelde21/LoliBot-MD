let handler = async (m, { conn, participants, groupMetadata }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
const { antiToxic, antiTraba, antiviewonce, isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, temporal, reaction, antiTelegram, antiFacebook, antiTiktok, antiYoutube, modohorny, antiTwitter, antiInstagram, stickers, autolevelup, autosticker, antitoxic, antifake, modoadmin, audios, delete: del } = global.db.data.chats[m.chat]
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let text = `*「 𝙄𝙉𝙁𝙊 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 」*\n
*𝙄𝘿𝙀𝙉𝙏𝙄𝙁𝙄𝘾𝘼𝘾𝙄𝙊𝙉 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊:* 
${groupMetadata.id}

*𝙉𝙊𝙈𝘽𝙍𝙀:* 
${groupMetadata.subject}

*𝘿𝙀𝙎𝘾𝙍𝙄𝙋𝘾𝙄𝙊𝙉:* 
${groupMetadata.desc?.toString() || 'Sin descripción'}

*𝙏𝙊𝙏𝘼𝙇 𝘿𝙀 𝙋𝘼𝙍𝙏𝙄𝘾𝙄𝙋𝘼𝙉𝙏𝙀𝙎:*
${participants.length} Participantes

*𝘾𝙍𝙀𝘼𝘿𝙊𝙍 𝘿𝙀𝙇 𝙂𝙍𝙐𝙋𝙊:* 
@${owner.split('@')[0]}

*𝘼𝘿𝙈𝙄𝙉𝙎:*
${listAdmin}

*𝙊𝙋𝘾𝙄𝙊𝙉𝙀𝙎 𝘼𝙐𝙏𝙊𝙈𝘼𝙏𝙄𝘾𝘼:*
・ 𝙒𝙚𝙡𝙘𝙤𝙢𝙚: ${welcome ? '✅' : '❌'}
・ 𝘼𝙣𝙩𝙞𝙡𝙞𝙣𝙠: ${antiLink ? '✅' : '❌'} 
・ 𝘼𝙣𝙩𝙞𝙡𝙞𝙣𝙠 *2:* ${antiLink2 ? '✅' : '❌'} 
・ 𝘼𝙣𝙩𝙞𝙩𝙧𝙖𝙗𝙖: ${antiTraba ? '✅' : '❌'} 
・ 𝙖𝙪𝙩𝙤𝙨𝙩𝙞𝙘𝙠𝙚𝙧: ${autosticker ? '✅' : '❌'} 
・ 𝙙𝙚𝙩𝙚𝙘𝙩: ${detect ? '✅' : '❌'} 
・ 𝙖𝙪𝙩𝙤𝙡𝙚𝙫𝙚𝙡𝙪𝙥: ${global.db.data.users[m.sender].autolevelup ? '✅' : '❌'}
・ 𝙁𝙪𝙣𝙘𝙞𝙤𝙣 𝙖𝙣𝙖𝙙𝙞𝙧 𝙮 𝙨𝙖𝙘𝙖𝙧: ${global.db.data.settings[conn.user.jid].restrict ? '✅' : '❌'}
・ 𝙨𝙩𝙞𝙘𝙠𝙚𝙧𝙨: ${stickers ? '✅' : '❌'}
・ 𝙧𝙚𝙖𝙘𝙘𝙞𝙤𝙣: ${reaction ? '✅' : '❌'}
・ 𝙖𝙪𝙙𝙞𝙤: ${audios ? '✅' : '❌'} 
・ 𝙢𝙤𝙙𝙤 𝙝𝙤𝙧𝙣𝙮 (+18): ${modohorny ? '✅' : '❌'} 
・ 𝙖𝙣𝙩𝙞𝙩𝙤𝙭𝙞𝙘: ${antitoxic ? '✅' : '❌'} 
・ 𝙖𝙣𝙩𝙞𝙛𝙖𝙠𝙚: ${antifake ? '✅' : '❌'} 
・ 𝙖𝙣𝙩𝙞𝙫𝙞𝙚𝙬𝙤𝙣𝙘𝙚: ${antiviewonce ? '✅' : '❌'}
・ 𝙖𝙣𝙩𝙞𝙙𝙚𝙡𝙚𝙩𝙚: ${global.db.data.chats[m.chat].delete ? '✅' : '❌'}
・ 𝙖𝙣𝙩𝙞𝙩𝙞𝙠𝙩𝙤𝙠: ${antiTiktok ? '✅' : '❌'}
・ 𝙖𝙣𝙩𝙞𝙮𝙤𝙪𝙩𝙪𝙗𝙚: ${antiYoutube ? '✅' : '❌'}
・ 𝙖𝙣𝙩𝙞𝙏𝙚𝙡𝙚𝙜𝙧𝙖𝙢: ${antiTelegram ? '✅' : '❌'}
・ 𝙖𝙣𝙩𝙞𝙁𝙖𝙘𝙚𝙗𝙤𝙤𝙠: ${antiFacebook ? '✅' : '❌'}
・ 𝙖𝙣𝙩𝙞𝙞𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢: ${antiInstagram ? '✅' : '❌'}
・ 𝙖𝙣𝙩𝙞𝙩𝙬𝙞𝙩𝙩𝙚𝙧: ${antiTwitter ? '✅' : '❌'}
・ 𝙢𝙤𝙙𝙤𝙖𝙙𝙢𝙞𝙣: ${modoadmin ? '✅' : '❌'} 
`.trim()
conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(infogrupo|gro?upinfo|info(gro?up|gc))$/i
handler.group = true
export default handler

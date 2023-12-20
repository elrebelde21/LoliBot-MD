let handler = async (m, { conn, participants, groupMetadata }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg' 
const { isBanned, autolevelup, antiver, antitoxic, temporal, restrict, stickers, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, audios, delete: del } = global.db.data.chats[m.chat]

let text = `╭━[ 𝘾𝙤𝙣𝙛𝙞𝙜𝙪𝙧𝙖𝙘𝙞𝙤𝙣 ]━⬣
┃
┃ 𝙒𝙚𝙡𝙘𝙤𝙢𝙚 ${welcome ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝘼𝙣𝙩𝙞𝙡𝙞𝙣𝙠 ${antiLink ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝘼𝙣𝙩𝙞𝙡𝙞𝙣𝙠 *2* ${antiLink2 ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙎𝙩𝙞𝙘𝙠𝙚𝙧 ${stickers ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙁𝙪𝙣𝙘𝙞𝙤𝙣 𝙗𝙤𝙩𝙚𝙢𝙥𝙤𝙧𝙖𝙡  ${global.db.data.settings[conn.user.jid].temporal ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙁𝙪𝙣𝙘𝙞𝙤𝙣 𝙖𝙣̃𝙖𝙙𝙞𝙧 𝙮 𝙨𝙖𝙘𝙖 ${global.db.data.settings[conn.user.jid].restrict ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝘼𝙪𝙩𝙤𝙡𝙚𝙫𝙚𝙡𝙪𝙥 ${global.db.data.users[m.sender].autolevelup ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝘿𝙚𝙩𝙚𝙘𝙩 ${detect ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝘼𝙣𝙩𝙞𝙩𝙤𝙭𝙞𝙘 ${antitoxic ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙖𝙣𝙩𝙞𝙫𝙞𝙚𝙬𝙤𝙣𝙘𝙚 ${antiver ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝘼𝙣𝙩𝙞𝙙𝙚𝙡𝙚𝙩𝙚 ${global.db.data.chats[m.chat].delete ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝙈𝙤𝙙𝙤 𝙝𝙤𝙧𝙣𝙮 (+18) ${modohorny ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝘼𝙪𝙩𝙤𝙨𝙩𝙞𝙘𝙠𝙚𝙧 ${autosticker ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 𝘼𝙪𝙙𝙞𝙤𝙨 ${audios ? '✅' : '❌'} 
╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣
`.trim()
conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] }) 
//conn.sendHydrated(m.chat, text, wm, pp, md, '𝑻𝒉𝒆 𝑳𝒐𝒍𝒊𝑩𝒐𝒕-𝑴𝑫', null, null, [['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️', '/menu']], m,)
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(configuración|settings|setting|confugurar|configuracion|vezgrupo|gruporesumen)$/i
handler.group = true
handler.register = true
export default handler

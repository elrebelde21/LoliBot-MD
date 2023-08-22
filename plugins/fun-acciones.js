let handler = async (m, { conn, groupMetadata, text, command}) => {
  if (!m.mentionedJid[0] && !m.quoted) throw '𝑬𝒕𝒊𝒒𝒖𝒆𝒕𝒂𝒔 𝒂 𝒂𝒍𝒈𝒖𝒊𝒆𝒏 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐 𝒑𝒂𝒓𝒂 𝒉𝒂𝒄𝒆𝒓𝒍𝒆 𝒂𝒍𝒈𝒖𝒏𝒂𝒔 𝒂𝒄𝒄𝒊𝒐𝒏'
  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
let participants = groupMetadata.participants
  conn.reply(m.chat, `Le acabas de ${command} ${text} a *@${user.split('@')[0]}* 😳`, null, { mentions: [user] })

}
handler.help = ['acciones']
handler.tags = ['acciones']
handler.command = /^(regalar|dar|enviar|meter|chupar|metersela|retar)$/

handler.group = true

export default handler

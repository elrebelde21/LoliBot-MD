let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `*✅ BIENVENIDO A LOS GRUPOS OFICIALES*

  1) *${nn}*
  
  2) *${nnn}*

➤ Grupo del Colaboracion LoliBot, GataBot-MD
 *${nnnt}*

➤ Infomarte sobre las nuevas actualizaciones/novedades/test sobre LoliBot aqui:
*${nna2}*
 
➤ Canal oficial donde encontrarán memes, video, novedades sobre cualquier bot, etc:
*${nna}*

➤ *¡Visita todos los enlaces oficiales en un único lugar!*
https://atom.bio/lolibot

 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

⇶⃤꙰𝑬𝒏𝒍𝒂𝒄𝒆 𝒍𝒐𝒍𝒊𝒃𝒐𝒕ꦿ⃟⃢
*${nnnttt}*`.trim() 
conn.reply(m.chat, info, m) 
//conn.fakeReply(m.chat, info, '0@s.whatsapp.net', '𝙏𝙝𝙚-𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿', 'status@broadcast')
}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = /^linkgc|grupos|gruposgatabot|gatabotgrupos|gruposdegatabot|groupofc|gruposgb|grupogb|groupgb$/i
handler.register = true 
export default handler

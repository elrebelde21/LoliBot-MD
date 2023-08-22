
let handler  = async (m, { conn, usedPrefix: _p }) => {
let info = `
*Hola 👋🏻, Bienvenido a los grupos oficiales, te invito a unete a los grupos oficiales para pasar un rato agradable usando el Bot o platicando con la familia de LoliBot-MD 😸*

➤ Grupos oficiales del bot:
1) *${nn}*

2) *${nnn}*

➤ Grupo del Colaboracion LoliBot, GataBot-MD
 *${nnnt}*

➤ Grupo del colaboración LoliBot, DorratBot-MD
*${nnnt2}*

➤ Grupo del col 3 (sin limite)
*${nnntt}*

➤ Infomarte sobre las nuevas actualizaciones del bot
 *${nna}*
 
➤ Grupos del ayuda sobre el bot
 *${nnntttt}*
 
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
Grupos del amistades donde esta el bot

*꧁⁣𓆩Aᴹᴵᴳᴼˢ Cᴴᴬᵀˢ Y Aᴾᴼᴿᵀᴱ*
https://chat.whatsapp.com/JZaD3sfNoVW4JvaoQ4uVwF

*⇶⃤꙰𝑬𝒏𝒍𝒂𝒄𝒆 𝒍𝒐𝒍𝒊𝒃𝒐𝒕ꦿ⃟⃢*
*${nnnttt}*

*꧁⃢⃟҉💫🌺ঔঔ𝔼ℕ𝕃𝔸ℂ𝔼𝕊 𝕃𝔸 𝕁𝔼𝔽𝔸✨*
https://chat.whatsapp.com/JegOp8NUSMd0vn75s4hkaj
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

Si quieres que tu grupo aparezca aca habla con mi creador
`.trim() 

conn.fakeReply(m.chat, info, '0@s.whatsapp.net', '𝙏𝙝𝙚-𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿', 'status@broadcast')
}
handler.command = /^linkgc|grupos|gruposgatabot|gatabotgrupos|gruposdegatabot|groupofc|gruposgb|grupogb|groupgb$/i

export default handler

let media = 'https://qu.ax/dcAc.mp4'
let handler = async (m, { conn, command }) => {
let str = `\`『 ${await tr("CUENTA OFICIALES")} 』\`

\`${await tr("Numero del bot oficial")} (𝙇𝙤𝙡𝙞𝘽𝙤𝙩)\`
> *${bot}*

 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
 
\`『 ${await tr("GitHub oficial", "ᴳᶦᵗᴴᵘᵇ ᵒᶠᶦᶜᶦᵃ")} 』\`   
* *${md}* 

\`『 ${await tr("Grupo oficial", "ᴳʳᵘᵖᵒ ᵒᶠᶦᶜᶦᵃˡ ¹")} 』\`   
* *${nn}* 

\`『  ${await tr("Grupo oficial 2", "ᴳʳᵘᵖᵒ ᵒᶠᶦᶜᶦᵃˡ ²")}   』\`   
* *${nnn}* 

\`『  ${await tr("Canal de WhatsApp / Update", "ᶜᵃⁿᵃˡ ᵈᵉ ᵂʰᵃᵗˢᴬᵖᵖ / ᵘᵖᵈᵃᵗᵉ")} 』\`   
* *${nna}* 

\`『 ${await tr("Asistencia para usuarios Facebook", "ᵃˢᶦˢᵗᵉⁿᶜᶦᵃ ᵖᵃʳᵃ ᵘˢᵘᵃʳᶦᵒˢ ᶠᵃᶜᵉᵇᵒᵒᵏ")} 』\`   
* *${fb}* 

\`『  ${await tr("Tiktok", "ᵀᶦᵏᵀᵒᵏ")} 』\`   
* *${tiktok}* 

\`『 ${await tr("YouTube", "ʸᵒᵘᵀᵘᵇᵉ")} 』\`   
* *${yt}* 

\`『 ${await tr("Grupo Facebook",  "ᴳʳᵘᵖᵒ ᶠᵃᶜᵉᵇᵒᵒᵏ")} 』\`   
* *${face}* 

 ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
\`『 ${await tr("Visita todos los enlaces oficiales en un único lugar", "ⱽᶦˢᶦᵗᵃ ᵗᵒᵈᵒˢ ˡᵒˢ ᵉⁿˡᵃᶜᵉˢ ᵒᶠᶦᶜᶦᵃˡᵉˢ ᵉⁿ ᵘⁿ ᵘⁿᶦᶜᵒ ˡᵘᵍᵃʳ")} 』\`   
• https://atom.bio/lolibot

${wm}`
await conn.reply(m.chat, str, fkontak, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})}
//conn.sendFile(m.chat, media, 'loli.mp4', str, fkontak)}
handler.help = ['cuentaoficial']
handler.tags = ['main']
handler.command = /^cuentasoficiales|cuentas|cuentaofc|cuentaoficial$/i
handler.register = true
export default handler

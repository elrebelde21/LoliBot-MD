import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
let handler  = async (m, { conn }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let texto = `*◄┢┅͜͡✇⟬↯ື ►ஜ۩💥۩ஜ◄ ↯ື⟭✇͜͡┅┧►*

💕 𝙑𝙄𝘿𝙀𝙊 𝘿𝙀 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉
https://youtu.be/z2kHwbu8e8s?si=2z3Fur9U4ccN7EwA

*✨ Canal de Actualizaciones y novedades sobre el bot*
${info.nna}

*📲💛 Si tienes dudas o necesitas ayuda en el proceso de la instalación puede escribirme por facebook:*
${info.fb}

> ❗ *_Solo para temas de instalación_*

───────•••───────

\`✨ 𝙂𝙄𝙏𝙃𝙐𝘽 > 𝙍𝙀𝙋𝙊𝙎𝙄𝙏𝙊𝙍𝙄𝙊\`
> *_Visita mí repositorio 😸 para más información, si te agrada el Bot apoya me con una ⭐️ ¡Gracias!_*
${info.md}

> ───────•••───────

\`✨ 𝙍𝙀𝙌𝙐𝙄𝙎𝙄𝙏𝙊𝙎 𝙋𝘼𝙍𝘼 𝙇𝘼 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉 (aclave de nuestros hosting) 😎\`

> ❌️ _~1 GB de almacenamiento~_
> ❌️ _~Aplicación Termux (actualizada)~_
> ✅ _Un WhatsApp secundarios_
> ✅ _Un número virtual (si es ofc mejor)_
> ❌️ ~_2 dispositivos o una PC para escanear_~
> ✅ _Ahora con 1 dispositivos con el codigo de 8 digitos ya pueden ser bot_

> ───────•••───────

\`📌 INSTALAR - SKYULTRAPLUS HOST\`
https://youtu.be/z2kHwbu8e8s?si=2z3Fur9U4ccN7EwA

💻 *Página:*
https://skyultraplus.com

✨ *Dash:*
dash.skyultraplus.com

⚙️ *Panel:*
https://panel.skyultraplus.com

> ───────•••───────

\`✨ 𝙍𝙀𝙌𝙐𝙄𝙎𝙄𝙏𝙊𝙎 𝙋𝘼𝙍𝘼 𝙇𝘼 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉 (Por termux) ✨\`

> ✅ _1 GB de almacenamiento_
> ✅ _Aplicación Termux (actualizada)_
> ✅ _Un WhatsApp secundarios_
> ✅ _Un número virtual (si es ofc mejor)_
> ❌️ ~_2 dispositivos o una PC para escanear_~
> ✅ _Ahora con 1 dispositivos con el codigo de 8 digitos ya pueden ser bot_

> ───────•••───────

\`📌 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝙍 - 𝙏𝙀𝙍𝙈𝙐𝙓\`

* \`\`\`termux-setup-storage\`\`\`

* \`\`\`apt update && apt upgrade -y && pkg install -y git nodejs ffmpeg imagemagick yarn\`\`\`

* \`\`\`git clone https://github.com/elrebelde21/LoliBot-MD && cd LoliBot-MD\`\`\`

* \`\`\`npm install\`\`\`

* \`\`\`ls\`\`\`

* \`\`\`npm start\`\`\`

> *◄┢┅͜͡✇⟬↯ື ►ஜ۩💥۩ஜ◄ ↯ື⟭✇͜͡┅┧►*` 
let aa = { quoted: m, userJid: conn.user.id }
let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: texto, contextInfo: { externalAdReply: { title: info.wm, body: "Video tutorial", thumbnailUrl: m.pp, mediaUrl: 'https://youtu.be/z2kHwbu8e8s?si=2z3Fur9U4ccN7EwA', mediaType: 2 }, mentionedJid: [m.sender] }}}, aa)
conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id, mentions: [m.sender] })  
}
handler.help = ['instalarbot']
handler.tags = ['main']
handler.command = /^(instalarbot)/i
handler.register = true
export default handler
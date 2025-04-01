//import { generateWAMessageFromContent } from '@adiwajshing/baileys'
let { generateWAMessageFromContent } = (await import(global.baileys)).default 
let handler  = async (m, { conn }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let texto = `*◄┢┅͜͡✇⟬↯ື ►ஜ۩💥۩ஜ◄ ↯ື⟭✇͜͡┅┧►*

\`${await tr("Video de instalación", "𝙑𝙄𝘿𝙀𝙊 𝘿𝙀 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉")}\`
https://youtu.be/z2kHwbu8e8s?si=2z3Fur9U4ccN7EwA

*✨ ${await tr("Canal de Actualizaciones y novedades sobre el bot")}*
${nna2}

*📲💛 ${await tr("Si tienes dudas o necesitas ayuda en el proceso de la instalación puede escribirme por facebook")}:*
${fb}

> ❗ *_${await tr("Solo para temas de instalación")}_*

───────•••───────

\`✨ ${await tr("GITHUB - REPOSITORIO", "𝙂𝙄𝙏𝙃𝙐𝘽 > 𝙍𝙀𝙋𝙊𝙎𝙄𝙏𝙊𝙍𝙄𝙊")}\`
> *_${await tr("Visita mí repositorio 😸 para más información, si te agrada el Bot apoya me con una ⭐️ ¡Gracias!")}_*
${md}

> ───────•••───────

\`✨ ${await tr("REQUISITOS PARA LA INSTALACIÓN (aclave de nuestros hosting)", "𝙍𝙀𝙌𝙐𝙄𝙎𝙄𝙏𝙊𝙎 𝙋𝘼𝙍𝘼 𝙇𝘼 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉 (aclave de nuestros hosting)")} 😎\`

> ❌️ _~${await tr("1 GB de almacenamiento")}~_
> ❌️ _~${await tr("Aplicación Termux (actualizada)")}~_
> ✅ _${await tr("Un WhatsApp secundarios")}_
> ✅ _${await tr("Un número virtual (si es ofc mejor)")}_
> ❌️ ~_${await tr("2 dispositivos o una PC para escanear")}_~
> ✅ _${await tr("Ahora con 1 dispositivos con el codigo de 8 digitos ya pueden ser bot")}_

> ───────•••───────

\`📌 ${await tr("INSTALAR EN SKY-ULTRA-PLUS HOST")}\`
https://youtu.be/z2kHwbu8e8s?si=2z3Fur9U4ccN7EwA

💻 *${await tr("Página")}:*
https://skyultraplus.com

*🟢 ${await tr("Dashboard")}:*
https://dash.skyultraplus.com

⚙️ *${await tr("Panel")}*
https://panel.skyultraplus.com

💥 *${await tr("Comunidad de WhatsApp")}:*
https://chat.whatsapp.com/E6iWpvGuJ8zJNPbN3zOr0D

*🟣 ${await tr("Discord")}:*
https://discord.skyultraplus.com

🧡 *${await tr("Canal de WhatsApp")}:*
https://WhatsApp.skyultraplus.com

🗣📲 *${await tr("Contacto")}:*
• wa.me/15167096032
• https://instagram.com/gata_dios
• ${fb}

> ───────•••───────

\`✨ ${await tr("REQUISITOS PARA LA INSTALACIÓN (Por termux)", "𝙍𝙀𝙌𝙐𝙄𝙎𝙄𝙏𝙊𝙎 𝙋𝘼𝙍𝘼 𝙇𝘼 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉 (Por termux) ")} ✨\`

> ✅ _${await tr("1 GB de almacenamiento")}_
> ✅ _${await tr("Aplicación Termux (actualizada)")}_
> ✅ _${await tr("Un WhatsApp secundarios")}_
> ✅ _${await tr("Un número virtual (si es ofc mejor)")}_
> ❌️ ~_${await tr("2 dispositivos o una PC para escanear")}_~
> ✅ _${await tr("Ahora con 1 dispositivos con el codigo de 8 digitos ya pueden ser bot")}_

> ───────•••───────

\`📌 ${await tr("PASO PARA INSTALAR EL BOT EL TERMUX (OPCIÓN 1 GITHUB)", "𝙋𝘼𝙎𝙊 𝙋𝘼𝙍𝘼 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝙍 𝙀𝙇 𝘽𝙊𝙏 𝙀𝙇 𝙏𝙀𝙍𝙈𝙐𝙓 (𝙊𝙋𝘾𝙄𝙊𝙉 𝟏 𝙂𝙄𝙏𝙃𝙐𝘽)")}\`

* \`\`\`termux-setup-storage\`\`\`

* \`\`\`apt update -y && yes | apt upgrade && pkg install -y bash wget mpv && wget -O - https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/master/install.sh | bash\`\`\`

\`📌 ${await tr("OPCIÓN: 2 ARCHIVOS", "𝙊𝙋𝘾𝙄𝙊𝙉: 2 𝘼𝙍𝘾𝙃𝙄𝙑𝙊")}\`
> *https://youtu.be/i1xjB4bmYCc*

*• ${await tr("Descarga los archivos")}:*
https://github.com/elrebelde21/LoliBot-MD/archive/refs/heads/master.zip

* \`\`\`termux-setup-storage\`\`\`

* \`\`\`apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn\`\`\`

* \`\`\`cd storage/downloads/LoliBot-MD-master/LoliBot-MD-master\`\`\`

* \`\`\`yarn install && npm install\`\`\`

* \`\`\`ls\`\`\`

* \`\`\`npm start\`\`\`

> *◄┢┅͜͡✇⟬↯ື ►ஜ۩💥۩ஜ◄ ↯ື⟭✇͜͡┅┧►*` 
let aa = { quoted: m, userJid: conn.user.jid }
let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: texto, contextInfo: { externalAdReply: { title: 'ʟᴏʟɪʙᴏᴛ-ᴍᴅ', body: null, thumbnail: imagen1, sourceUrl: 'https://youtu.be/z2kHwbu8e8s?si=2z3Fur9U4ccN7EwA' }, mentionedJid: [m.sender] }}}, aa)
conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id, mentions: [m.sender] })  
}
handler.help = ['instalarbot']
handler.tags = ['main']
handler.command = /^(instalarbot)/i
handler.register = true
export default handler
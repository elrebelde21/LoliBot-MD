//import { generateWAMessageFromContent } from '@adiwajshing/baileys'
let { generateWAMessageFromContent } = (await import(global.baileys)).default 
let handler  = async (m, { conn }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let texto = `*◄┢┅͜͡✇⟬↯ື ►ஜ۩💥۩ஜ◄ ↯ື⟭✇͜͡┅┧►*

*𝙑𝙄𝘿𝙀𝙊 𝘿𝙀 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉*
*https://youtu.be/gh5NajZOTA8*

✨ *Canal de Actualizaciones y novedades sobre el bot*
📌 *${global.nna}*

💛 *Si tienes dudas o necesitas ayuda en el proceso de la instalación puede escribir me a este número (No es Bot el número)*

📲 ${asistencia}

❗ *_Solo para temas de instalación_*

───────•••───────

✨ 𝙍𝙀𝙌𝙐𝙄𝙎𝙄𝙏𝙊𝙎 𝙋𝘼𝙍𝘼 𝙇𝘼 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝘾𝙄𝙊𝙉 ✨

✅ _1 GB de almacenamiento_
✅ _Aplicación Termux (actualizada)_
✅ _Un WhatsApp recomiendo el WhatsApp normal_
✅ _Un número virtual (si es ofc mejor)_
✅ _2 dispositivos o una PC para escanear_

───────•••───────

✨ 𝙂𝙄𝙏𝙃𝙐𝘽 > 𝙍𝙀𝙋𝙊𝙎𝙄𝙏𝙊𝙍𝙄𝙊
*_Visita mí repositorio 😸 para más información, si te agrada el Bot apoya me con una ⭐️ ¡Gracias!_*

${md}

───────•••───────

📌 *𝙋𝘼𝙎𝙊 𝙋𝘼𝙍𝘼 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝙍 𝙀𝙇 𝘽𝙊𝙏 𝙀𝙇 𝙏𝙀𝙍𝙈𝙐𝙓*
📌 *𝙊𝙋𝘾𝙄𝙊𝙉: 1 𝙂𝙄𝙏𝙃𝙐𝘽*

🔸 termux-setup-storage

🔸 apt update -y && yes | apt upgrade && pkg install -y bash wget mpv && wget -O - https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/master/install.sh | bash

📌 *𝙊𝙋𝘾𝙄𝙊𝙉: 2 𝘼𝙍𝘾𝙃𝙄𝙑𝙊*
*https://youtu.be/i1xjB4bmYCc*

🔸 termux-setup-storage

🔸 pkg update -y && pkg upgrade -y && pkg install -y bash && pkg install -y wget && pkg install yarn

🔸 cd storage/downloads/Lolibot

🔸 ls

🔸 npm start

───────•••───────

📌 𝙄𝙉𝙎𝙏𝘼𝙇𝘼𝙍 𝙀𝙉 𝙑𝙊𝙍𝙏𝙀𝙓𝙐𝙎𝙃𝙊𝙏𝙎

𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿 : 𝙏𝙪𝙩𝙤𝙧𝙞𝙖𝙡
https://youtu.be/Xp2jRbG_v8o?si=𝙫-𝙍𝙠𝙔𝙮𝙍𝙅𝙊𝙗4𝙨𝙚𝙩𝙫𝙟

_Pagina oficial_
https://dash.vortexuscloud.com/home

───────•••───────

📌 𝗜𝗡𝗦𝗧𝗔𝗟𝗔𝗥 𝗘𝗡 𝗕𝗢𝗫𝗠𝗜𝗡𝗘

*𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿 : 𝘽𝙤𝙭𝙈𝙞𝙣𝙚*
*_https://youtu.be/wWyBHtKzx9Q_*

_Pagina Oficial_ 
_https://boxmineworld.com_

_Panel_
_https://panel.boxmineworld.com_

───────•••───────

📌 𝗜𝗡𝗦𝗧𝗔𝗟𝗔𝗥 𝗘𝗡 𝙍𝙀𝙋𝙇𝙄𝙏 

*𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿 : 𝙍𝙀𝙋𝙇𝙄𝙏*
https://youtu.be/SMjCcfuyWQE

_Pagina Oficial_ 
https://replit.com/

*◄┢┅͜͡✇⟬↯ື ►ஜ۩💥۩ஜ◄ ↯ື⟭✇͜͡┅┧►*

💥 INFO EXTRA 💥_
➤ _Se sugiere leer el archivo README.md_
➤ _Bot compartible con WhatsApp multi device_
➤ _Para habilitar el /añadir y el /sacar usa /enable restrict_ _Puede ocasionar que el numero se vaya a soporte_
➤ _Recomiendo que active el autoread con (#on autoread)_
➤ _Cualquier cosa hablame solo por tema del bot, Saludos 🔰🤖_` 
let aa = { quoted: m, userJid: conn.user.jid }
let prep = generateWAMessageFromContent(m.chat, { extendedTextMessage: { text: texto, contextInfo: { externalAdReply: { title: 'ᴛʜᴇ-ʟᴏʟɪʙᴏᴛ-ᴍᴅ', body: null, thumbnail: imagen1, sourceUrl: 'https://youtu.be/gh5NajZOTA8' }, mentionedJid: [m.sender] }}}, aa)
conn.relayMessage(m.chat, prep.message, { messageId: prep.key.id, mentions: [m.sender] })  
}
handler.command = /^(instalarbot)/i
handler.register = true
export default handler
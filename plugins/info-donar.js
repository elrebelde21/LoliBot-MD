let media = img.getRandom()
let handler = async (m, { conn, command }) => {
//let pp = './src/apoyo.jpg'
let name = await conn.getName(m.sender)
await conn.sendMessage(m.chat, { 
text: `*\`[💖 ${await tr("DONACIÓN", "ＤＯＮＡＣＩＯＮ")} 💖 ]\`*

✨ ¡${await tr("Hola")} ${name}! ✨

¡${await tr("Gracias por usar", "𝘎𝘳𝘢𝘤𝘪𝘢𝘴 𝘱𝘰𝘳 𝘶𝘴𝘢𝘳")} *${wm}*, ${await tr("Tu bot gratuito favorito! 🌟 Tu apoyo es fundamental para mantener este proyecto en marcha y simpre actualizado. Si quieres contribuir y ser parte de este aventura, puedes hacerlo a traves de PayPal o Mercado pago", "𝘵𝘶 𝘣𝘰𝘵 𝘨𝘳𝘢𝘵𝘶𝘪𝘵𝘰 𝘧𝘢𝘷𝘰𝘳𝘪𝘵𝘰! 🌟 𝘛𝘶 𝘢𝘱𝘰𝘺𝘰 𝘦𝘴 𝘧𝘶𝘯𝘥𝘢𝘮𝘦𝘯𝘵𝘢𝘭 𝘱𝘢𝘳𝘢 𝘮𝘢𝘯𝘵𝘦𝘯𝘦𝘳 𝘦𝘴𝘵𝘦 𝘱𝘳𝘰𝘺𝘦𝘤𝘵𝘰 𝘦𝘯 𝘮𝘢𝘳𝘤𝘩𝘢 𝘺 𝘴𝘪𝘦𝘮𝘱𝘳𝘦 𝘢𝘤𝘵𝘶𝘢𝘭𝘪𝘻𝘢𝘥𝘰. 𝘚𝘪 𝘲𝘶𝘪𝘦𝘳𝘦𝘴 𝘤𝘰𝘯𝘵𝘳𝘪𝘣𝘶𝘪𝘳 𝘺 𝘴𝘦𝘳 𝘱𝘢𝘳𝘵𝘦 𝘥𝘦 𝘦𝘴𝘵𝘢 𝘢𝘷𝘦𝘯𝘵𝘶𝘳𝘢, 𝘱𝘶𝘦𝘥𝘦𝘴 𝘩𝘢𝘤𝘦𝘳𝘭𝘰 𝘢 𝘵𝘳𝘢𝘷𝘦́𝘴 𝘥𝘦 𝘗𝘢𝘺𝘗𝘢𝘭 𝘰 𝘔𝘦𝘳𝘤𝘢𝘥𝘰 𝘗𝘢𝘨𝘰")}. 🙏

─────────────────────

*💸 ${await tr("PayPal", "𝘗𝘢𝘺𝘗𝘢𝘭")}:* https://paypal.me/OficialGD
*💸 ${await tr("Mercado pago", "𝘔𝘦𝘳𝘤𝘢𝘥𝘰 𝘗𝘢𝘨𝘰")}:*
*• ${await tr("Alias", "𝘈𝘭𝘪𝘢𝘴")}:* OficialGB
*• 𝘊𝘝𝘜:* 0000003100059201491917

─────────────────────

🎁 ${await tr("*Otras formas de apoyar:*\nSi prefieres ayudar de otra manera, puedes donar un número para convertirlo en bot, o contactar directamente con mi creador. ¡También puedes seguirnos y apoyarnos en nuestras redes sociales", "*𝘖𝘵𝘳𝘢𝘴 𝘧𝘰𝘳𝘮𝘢𝘴 𝘥𝘦 𝘢𝘱𝘰𝘺𝘢𝘳:*\n𝘚𝘪 𝘱𝘳𝘦𝘧𝘪𝘦𝘳𝘦𝘴 𝘢𝘺𝘶𝘥𝘢𝘳 𝘥𝘦 𝘰𝘵𝘳𝘢 𝘮𝘢𝘯𝘦𝘳𝘢, 𝘱𝘶𝘦𝘥𝘦𝘴 𝘥𝘰𝘯𝘢𝘳 𝘶𝘯 𝘯𝘶́𝘮𝘦𝘳𝘰 𝘱𝘢𝘳𝘢 𝘤𝘰𝘯𝘷𝘦𝘳𝘵𝘪𝘳𝘭𝘰 𝘦𝘯 𝘣𝘰𝘵, 𝘰 𝘤𝘰𝘯𝘵𝘢𝘤𝘵𝘢𝘳 𝘥𝘪𝘳𝘦𝘤𝘵𝘢𝘮𝘦𝘯𝘵𝘦 𝘤𝘰𝘯 𝘮𝘪 𝘤𝘳𝘦𝘢𝘥𝘰𝘳. ¡𝘛𝘢𝘮𝘣𝘪𝘦́𝘯 𝘱𝘶𝘦𝘥𝘦𝘴 𝘴𝘦𝘨𝘶𝘪𝘳𝘯𝘰𝘴 𝘺 𝘢𝘱𝘰𝘺𝘢𝘳𝘯𝘰𝘴 𝘦𝘯 𝘯𝘶𝘦𝘴𝘵𝘳𝘢𝘴 𝘳𝘦𝘥𝘦𝘴 𝘴𝘰𝘤𝘪𝘢𝘭𝘦𝘴!")} 👇

🔔 *${await tr("YouTube - Suscribete", "𝘠𝘰𝘶𝘛𝘶𝘣𝘦 - 𝘚𝘶𝘴𝘤𝘳𝘪́𝘣𝘦𝘵𝘦")}*
${yt}

🌟 *${await tr("GitHub - Dale una estrella", "𝘎𝘪𝘵𝘏𝘶𝘣 - 𝘋𝘢𝘭𝘦 𝘶𝘯𝘢 𝘦𝘴𝘵𝘳𝘦𝘭𝘭𝘢")} ⭐*
${md}

🔗 *${await tr("Enlace oficiales en un unico lugar", "𝘌𝘯𝘭𝘢𝘤𝘦𝘴 𝘖𝘧𝘪𝘤𝘪𝘢𝘭𝘦𝘴 𝘦𝘯 𝘶𝘯 𝘜́𝘯𝘪𝘤𝘰 𝘓𝘶𝘨𝘢𝘳")}:*
https://atom.bio/lolibot

👍 *${await tr("Facebook",  "𝘍𝘢𝘤𝘦𝘣𝘰𝘰𝘬")}:*
${face}

─────────────────────

*${await tr("AGRADECIMIENTO",  "ＡＧＲＡＤＥＣＩＭＩＥＮＴＯＳ")}:*

*${wm}* ${await tr("Tiene funciones desarrollada por las siguientes organizaciones y personas increíbles", "ᴛɪᴇɴᴇ ғᴜɴᴄɪᴏɴᴇs ᴅᴇsᴀʀʀᴏʟʟᴀᴅᴀs ᴘᴏʀ ʟᴀs sɪɢᴜɪᴇɴᴛᴇs ᴏʀɢᴀɴɪᴢᴀᴄɪᴏɴᴇs ʏ ᴘᴇʀsᴏɴᴀs ɪɴᴄʀᴇɪ́ʙʟᴇs")}:

- *ᴛʜᴇ-ᴍʏsᴛɪᴄʙᴏᴛ-ᴍᴅ:* 
https://github.com/BrunoSobrino
- *ɢᴀᴛᴀʙᴏᴛ-ᴍᴅ:* 
https://github.com/GataNina-Li

> ${await tr("Gracias",  "ɢʀᴀᴄɪᴀs")} 💕`, 
contextInfo:{
forwardingScore: 9999999,
isForwarded: true, 
mentionedJid:[m.sender],
"externalAdReply": {
"showAdAttribution": true,
"renderLargerThumbnail": true,
"thumbnail": imagen3, 
"title": 'ᴾᵘᵉᵈᵉ ᵃᵖᵒʸᵃʳ ⁿᵘᵉˢᵗʳᵒ ʳᵉᵖᵒˢᶦᵗᵒʳᶦᵒ ᶜᵒⁿ ᵘⁿᵃ ᵉˢᵗʳᵉˡˡᶦᵗᵃˢ ⭐', 
"containsAutoReply": true,
"mediaType": 1, 
"mediaUrl": md, 
"sourceUrl": md, 
}}}, { quoted: m })
// await conn.sendButton(m.chat, `a`, `https://paypal.me/OficialGD`, pp, [['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️', `/menu`]], m) //[['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️', `/menu`]]
/*await conn.sendHydrated(m.chat, str, wm, media, 'https://github.com/elrebelde21/The-LoliBot-MD', 'ɢɪᴛʜᴜʙ', null, null, [
['𝙂𝙧𝙪𝙥𝙤𝙨 𝙊𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 🔰', '.grupos'],
['𝘾𝙧𝙚𝙖𝙙𝙤𝙧 💗', '#owner'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️', '/menu']
], m,)}*/
}
handler.help = ['donar']
handler.tags = ['main']
handler.command = /^dona(te|si)|donar|apoyar|paypal|donating|creditos$/i
handler.exp = 600
handler.register = true
export default handler


/*
//await conn.sendButton(m.chat, wm, `https://paypal.me/OficialGD`, pp, m)
await conn.sendButton(m.chat, ``, `https://paypal.me/OficialGD`, pp, [['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️', `/menu`]], m) //[['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️', `/menu`]]
  */
let handler = async (m, { conn, command, usedPrefix }) => {
let txt = `*¿Muy lento tu nokia y necesitas tener activo tu bot 24/7?*

> *Te tenemos la mejor opción para mantener activo tu bot 24/7, a precios muy accesibles. Es muy barato y todos pueden comprar.*

*🚩Precios :*
* 1GB, 100 CPU = 1Dolar
* 2GB, 120 CPU = 2Dolar
* 3GB, 140 CPU = 3Dolar
* 4GB, 175 CPU = 4Dolar
* 5GB, 200 CPU = 5 Dólar. 

🟢 \`\`\`Información del Host\`\`\`

💻 *Página:*
https://www.infinity-wa.xyz/

*🟢 Dashboard:*
https://dashboard.infinitywa.xyz

⚙️ *Panel*
https://store.panel-infinitywa.store

💥 *Grupo Support whatsapp:*
https://chat.whatsapp.com/GQ82mPnSYnm0XL2hLPk7FV

*🟣 Discord:*
https://discord.com/invite/vgfpe4Nwd8

🧡 *Canal de WhatsApp:*
${nna}

🛍️ *Método de pago:*
*• PayPal :* paypal.me/OfcGB
*• Mercado pago, alías:* OficialGB
*• Naranja x, alías:* OficialGL
*• Yape (Perú) :* +51948705559
*• Uala:* thelolibotm.uala
*• DolarApp:* $oficialgb
*• Pago con tarjeta:* wa.me/390684003755

*• Link de pago:*
• _link.mercadopago.com.ar/h0sting_
• _https://payment-link.astropay.com/RbMJ_
*• Patreon:*_patreon.com/Infinity_wa_hosting_
*• Kofi:* _https://ko-fi.com/infinitywa_

🗣📲 *Contacto:*
• https://www.facebook.com/elrebelde21
• wa.me/573147616444` 

await conn.sendMessage(m.chat, { text: txt,
contextInfo:{
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: `🤖 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘𝐖𝐀-𝐇𝐎𝐒𝐓 🤖`,
body: `✅ Hosting de Calidad`,
"previewType": "PHOTO",
thumbnailUrl: 'https://qu.ax/EQTd.jpg', 
sourceUrl: accountsgb}}},
{ quoted: fkontak})
}
handler.command = /^(infohost|hosting|infinitywa|infinity|host)$/i
export default handler

let handler = async (m, { conn, usedPrefix }) => {
let pp = 'https://i.imgur.com/lkch77g.jpeg' 
var doc = ['pdf','zip','vnd.openxmlformats-officedocument.presentationml.presentation','vnd.openxmlformats-officedocument.spreadsheetml.sheet','vnd.openxmlformats-officedocument.wordprocessingml.document']
var document = doc[Math.floor(Math.random() * doc.length)]    
await m.reply(`╰⊱🔰⊱ *paso a paso* ⊱🔰⊱╮`)
  //conn.sendButton(m.chat, str, author, await(await fetch(pp)).buffer(), [['Menu', '/menu']], m)
let texto1 = `
como crea un numero victual 
aca vamos como crear un numero victual para WhatsApp o otra redes donde quiera registrarte 
segui los paso como el video asi no tiene ningun problema

descarga texnow 👇👇
https://play.google.com/store/apps/details?id=com.enflick.android.TextNow

VPN usado el video 👇👇
https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.turbovpn


y segui los paso del video`
let buttonMessage= {
'document': { url: `https://youtu.be/zjg6fwhJa9E` },
'mimetype': `application/${document}`,
'fileName': `𝑻𝒉𝒆 𝑳𝒐𝒍𝒊𝑩𝒐𝒕-𝑴𝑫`,
'fileLength': 99999999999999,
'pageCount': 200,
'contextInfo': {
'forwardingScore': 200,
'isForwarded': true,
'externalAdReply': {
'mediaUrl': 'https://youtu.be/zjg6fwhJa9E',
'mediaType': 2,
'previewType': 'pdf',
'title': 'Como crea un numero victual',
'body': wm,
 }},
'caption': texto1,
'footer': wm,
'buttons':[
{buttonId: `${usedPrefix}menu`, buttonText: {displayText: '𝑻𝒉𝒆 𝑳𝒐𝒍𝒊𝑩𝒐𝒕-𝑴𝑫'}, type: 1}],
'headerType': 6 }
conn.sendMessage(m.chat, buttonMessage, { quoted: m })}
handler.command = /^(numerovictual|como crea un numero victual)$/i
export default handler

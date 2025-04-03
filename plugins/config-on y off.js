import fetch from 'node-fetch'
import fs from 'fs' 
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, text }) => { 
//try{
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let bot = global.db.data.settings[conn.user.jid] || {}
let toUser = `${m.sender.split("@")[0]}`
let aa = toUser + '@s.whatsapp.net'
let listSections = []    
listSections.push({ title: `『 ${await tr("FUNCIÓN PARA ADMINS")} 』`,
rows: [{ header: `🎉 BIENVENIDA ${m.isGroup ? chat.welcome ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} welcome`, description: `Mensaje de Bienvenida para nuevos Miembros en Grupos\n` }, 
{ header: `🔗 ANTI ENLACES ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antilink`, description: `Eliminar Personas que envíen enlaces de Grupos de WhatsApp\n` },
{ header: `🔗 ANTI ENLACES 2 ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antilink2`, description: `Eliminar Personas que envíen enlaces que contengan https\n` }, 
{ header: `🔗 ANTI TRABA ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antitraba`, description: `El Bot detecta textos largos que podrian ser virus y causar lag en el chat y elimina al usuario.\n` }, 
{ header: `🔗 ANTI TIKTOK ${m.isGroup ? chat.antiTiktok ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antitiktok`, description: `Eliminar Personas que envíen enlaces de TikTok\n` }, 
{ header: `🔗 ANTI YOUTUBE ${m.isGroup ? chat.antiYoutube ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antiyoutube`, description: `Eliminar Personas que envíen enlaces de YouTube\n` }, 
{ header: `🔗 ANTI TELEGRAM ${m.isGroup ? chat.antiTelegram ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antitelegram`, description: `Eliminar Personas que envíen enlaces de Telegram\n` }, 
{ header: `🔗 ANTI FACEBOOK ${m.isGroup ? chat.antiFacebook ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antifacebook`, description: `Eliminar Personas que envíen enlaces de Facebbok\n` }, 
{ header: `🔗 ANTI INSTAGRAM ${m.isGroup ? chat.antiInstagram ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antiinstagram`, description: `Eliminar Personas que envíen enlaces de Instagram\n` }, 
{ header: `🔗 ANTI TWITTER ${m.isGroup ? chat.antiTwitter ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antitwitter`, description: `Eliminar Personas que envíen enlaces de Twitter\n` }, 
{ header: `🔗 ANTI DISCORD ${m.isGroup ? chat.antiDiscord ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antidiscord`, description: `Eliminar Personas que envíen enlaces de Discord\n` }, 
{ header: `🔗 ANTI TREADS ${m.isGroup ? chat.antiThreads ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antithreads`, description: `Eliminar Personas que envíen enlaces de Threas\n` },
{ header: `🟢 ANTIFAKE ${m.isGroup ? chat.antifake ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antifake`, description: `ᶦⁿᵍʳᵉˢᵒ ᵈᵉ ⁿᵘᵐᵉʳᵒ ᶠᵃᵏᵉ (ᵛᶦʳᵗᵘᵃˡᵉˢ), ˢᵉʳᵃⁿ ᵉˣᵖˡᵘˢᵃᵈᵒ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃᵐᵉⁿᵗᵉ ᵈᵉˡ ᴳʳᵘᵖᵒ...\n` }, 
{ header: `🔔 AVISOS ${m.isGroup ? chat.detect ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} detect`, description: `Avisos de acciones dentro del Grupo\n` }, 
{ header: `🪄 STICKERS AUTOMÁTICOS ${m.isGroup ? chat.autosticker ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} autosticker`, description: `Los vídeos, Gif, imágenes, enlaces jpg o jpeg; Se convertirán en Stickers Automáticamente\n` }, 
{ header: `🗑️ ANTI ELIMINAR ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} antidelete`, description: `Todo mensaje eliminado será reenviado al Chat o Grupo\n` }, 
{ header: `🔞 MODO CALIENTE ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} modohorny`, description: `Mostrar contenido para Adulto en los Chats\n` }, 
{ header: `🔊 AUDIOS ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} audios`, description: `Habilitar el envio automático de Audios a todos\n` }, 
{ header: `🆙 NIVEL AUTOMÁTICO ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} autolevelup`, description: `Sube de nivel a todos de manera automática; (Aplica recompensas por subir de Nivel)\n` }, 
{ header: `🙃 CHATBOT ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} chatbot`, description: `El bot empezar a hablar con todos el grupo.\n` }, 
{ header: `🛂 MODO ADMIN ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `.${usedPrefix + command} modoadmin`, description: `Solo los Admins podrán usar el Bot en Grupos\n` }, 
{ header: `『 FUNCIÓN SOLO PARA OWNER 』\n`, title: `🔰 ANTI PRIVADO ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, id: `${usedPrefix + command} antiprivado`, description: `Bloquea a la persoma que usen el bot en privado\n` }, 
{ header: `🚫 ANTI LLAMADAS ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} anticall`, description: `Bloquea a Personas que hagan llamadas\n` }, 
{ header: `⛔ RESTRINGIR ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} restrict`, description: `Habilitar función para agregar o eliminar personas en Grupos\n` }, 
{ header: `⚜️ SOLO PRIVADOS ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} pconly`, description: `Permitir que solo se use en Chats Privados\n` }, 
{ header: `⚜️ SOLO GRUPOS ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} gconly`, description: `Permitir que solo se use en Chats Grupales\n` }, 
{ header: `✅ LECTURA AUTOMÁTICA ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} autoread`, description: `Dejar los mensajes o chats como Leídos.\n` }, 
{ header: `🌐 MODO PÚBLICO ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}`, title: "", id: `${usedPrefix + command} public`, description: `Habilitar función para que todos puedan usar LoliBot.\n` }]
});
let textoo = `*\`⧼⧼⧼ ${await tr("CONFIGURACIÓN")} ⧽⧽⧽\`*

> *${await tr("Seleccione una opción de la lista")}*
> *${await tr("Para empezar a Configurar")}*

● *${await tr("Avisos de la Configuracion:")}*
✅ ⇢ *${await tr("Función Activada")}*
❌ ⇢ *${await tr("Función Desactivada")}*
⚠️ ⇢ *${await tr("Este Chat no es un Grupo")}*

*\`『 ${await tr("FUNCIÓN PARA ADMINS")} 』\`*

🎉 ${await tr("BIENVENIDA")} ${m.isGroup ? chat.welcome ? '✅' : '❌' : `⚠️`}
• ${await tr("Mensaje de Bienvenida para nuevos Miembros en Grupos")}
• ${usedPrefix + command} welcome 

🔗 ${await tr("ANTI ENLACES")} ${m.isGroup ? chat.antilink ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces de Grupos de WhatsApp")}
• ${usedPrefix + command} antilink

🔗 ${await tr("ANTI ENLACES 2")} ${m.isGroup ? chat.antilink2 ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces que contengan https")}
• ${usedPrefix + command} antilink2

🔗 ${await tr("ANTI TRABA")} ${m.isGroup ? chat.antitraba ? '✅' : '❌' : `⚠️`}
• ${await tr("El Bot detecta textos largos que podrían ser virus y causar lag en el chat y elimina al usuario.")}
• ${usedPrefix + command} antitraba

🔗 ${await tr("ANTI TIKTOK")} ${m.isGroup ? chat.antiTiktok ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces de TikTok")}
• ${usedPrefix + command} antitiktok

🔗 ${await tr("ANTI YOUTUBE")} ${m.isGroup ? chat.antiYoutube ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces de YouTube")}
• ${usedPrefix + command} antiyoutube

🔗 ${await tr("ANTI TELEGRAM")} ${m.isGroup ? chat.antiTelegram ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces de Telegram")}
• ${usedPrefix + command} antitelegram

🔗 ${await tr("ANTI FACEBOOK")} ${m.isGroup ? chat.antiFacebook ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces de Facebook")}
• ${usedPrefix + command} antifacebook

🔗 ${await tr("ANTI INSTAGRAM")} ${m.isGroup ? chat.antiInstagram ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces de Instagram")}
• ${usedPrefix + command} antiinstagram

🔗 ${await tr("ANTI TWITTER")} ${m.isGroup ? chat.antiTwitter ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces de Twitter (x)")}
• ${usedPrefix + command} antitwitter

🔗 ${await tr("ANTI DISCORD")} ${m.isGroup ? chat.antiDiscord ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces de Discord")}
• ${usedPrefix + command} antidiscord

🔗 ${await tr("ANTI THREADS")} ${m.isGroup ? chat.antiThreads ? '✅' : '❌' : `⚠️`}
• ${await tr("Eliminar Personas que envíen enlaces de Threads")}
• ${usedPrefix + command} antithreads

🟢 ${await tr("ANTIFAKE")} ${m.isGroup ? chat.antifake ? '✅' : '❌' : `⚠️`}
• ${await tr("Ingreso de número fake (virtuales), serán expulsados automáticamente del Grupo.")}
• ${usedPrefix + command} antifake

🔔 ${await tr("AVISOS")} ${m.isGroup ? chat.detect ? '✅' : '❌' : `⚠️`}
• ${await tr("Avisos de acciones dentro del Grupo")}
• ${usedPrefix + command} detect

🪄 ${await tr("STICKERS AUTOMÁTICOS")} ${m.isGroup ? chat.autosticker ? '✅' : '❌' : `⚠️`}
• ${await tr("Los vídeos, GIF, imágenes, enlaces jpg o jpeg; se convertirán en Stickers automáticamente.")}
• ${usedPrefix + command} autosticker

🗑️ ${await tr("ANTI ELIMINAR")} ${m.isGroup ? chat.delete ? '✅' : '❌' : `⚠️`}
• ${await tr("Todo mensaje eliminado será reenviado al Chat o Grupo.")}
• ${usedPrefix + command} antidelete

🔞 ${await tr("MODO CALIENTE")} ${m.isGroup ? chat.modohorny ? '✅' : '❌' : `⚠️`}
• ${await tr("Mostrar contenido para Adultos en los Chats.")}
• ${usedPrefix + command} modohorny

🔊 ${await tr("AUDIOS")} ${m.isGroup ? chat.audios ? '✅' : '❌' : `⚠️`}
• ${await tr("Habilitar el envío automático de Audios a todos.")}
• ${usedPrefix + command} audios

🆙 ${await tr("NIVEL AUTOMÁTICO")} ${m.isGroup ? chat.autolevelup ? '✅' : '❌' : `⚠️`}
• ${await tr("Sube de nivel a todos de manera automática; (Aplica recompensas por subir de nivel).")}
• ${usedPrefix + command} autolevelup

🙃 ${await tr("CHATBOT")} ${m.isGroup ? chat.simi ? '✅' : '❌' : `⚠️`}
• ${await tr("El bot comenzará a hablar con todos en el grupo.")}
• ${usedPrefix + command} chatbot

🛂 ${await tr("MODO ADMIN")} ${m.isGroup ? chat.modoadmin ? '✅' : '❌' : `⚠️`}
• ${await tr("Solo los Admins podrán usar el Bot en Grupos.")}
• ${usedPrefix + command} modoadmin

*\`『 ${await tr("FUNCIÓN SOLO PARA OWNER")} 』\`"

🔰 ${await tr("ANTI PRIVADO")} ${m.isGroup ? chat.antiPrivate ? '✅' : '❌' : `⚠️`}
• ${await tr("Bloquea a las personas que usen el bot en privado.")}
• ${usedPrefix + command} antiprivado

🚫 ${await tr("ANTI LLAMADAS")} ${m.isGroup ? chat.antiCall ? '✅' : '❌' : `⚠️`}
• ${await tr("Bloquea a personas que hagan llamadas.")}
• ${usedPrefix + command} anticall

⛔ ${await tr("RESTRINGIR")} ${m.isGroup ? chat.restrict ? '✅' : '❌' : `⚠️`}
• ${await tr("Habilitar función para agregar o eliminar personas en Grupos.")}
• ${usedPrefix + command} restrict

⚜️ ${await tr("SOLO PRIVADOS")} ${m.isGroup ? chat.pconly ? '✅' : '❌' : `⚠️`}
• ${await tr("Permitir que solo se use en Chats Privados.")}
• ${usedPrefix + command} pconly

⚜️ ${await tr("SOLO GRUPOS ")} ${m.isGroup ? chat.gconly ? '✅' : '❌' : `⚠️`}
• ${await tr("Permitir que solo se use en Chats Grupales.")}
• ${usedPrefix + command} gconly

✅ ${await tr("LECTURA AUTOMÁTICA")} ${m.isGroup ? chat.autoread ? '✅' : '❌' : `⚠️`}
• ${await tr("Dejar los mensajes o chats como Leídos.")}
• ${usedPrefix + command} autoread

🌐 ${await tr("MODO PÚBLICO")} ${m.isGroup ? chat.self ? '✅' : '❌' : `⚠️`}
• ${await tr("Habilitar función para que todos puedan usar el bot.")}
• ${usedPrefix + command} public

> ${wm}`        
let isEnable = /true|enable|(turn)?on/i.test(command)
let type = (args[0] || '').toLowerCase()
let isAll = false, isUser = false
switch (type) {
case 'welcome': case 'bienvenida':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
    
case 'detect': case 'avisos':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
		
case 'antidelete': case 'antieliminar': case 'delete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.delete = isEnable
break
    
case 'public': case 'publico':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['self'] = !isEnable
break
    
case 'antilink': case 'antienlace':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink = isEnable
break
    
case 'antilink2': case 'antienlace2':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink2 = isEnable 
break
		
case 'antitiktok': case 'antitk': case 'antitik':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTiktok = isEnable 
break
		
case 'antiyoutube': case 'antiyt':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiYoutube = isEnable 
break
		
case 'antitelegram': case 'antitl': case 'antitele': case 'antitg': case 'antitel':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTelegram = isEnable 
break
		
case 'antifacebook': case 'antifb': case 'antifbook':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiFacebook = isEnable 
break
		
case 'antiinstagram': case 'antinstagram': case 'antiig': case 'antig': case 'antiinsta': case 'antinsta':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiInstagram = isEnable 
break
		
case 'antitwitter': case 'antitw': case 'antitwit': case 'antitwter': case 'antitwiter': case 'antix':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTwitter = isEnable 
break

case 'antidiscord':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiDiscord = isEnable 
break

case 'antithreads':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiThreads = isEnable 
break

case 'antitwitch':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTwitch = isEnable 
break
    
case 'modohorny': case 'modocaliente': case 'modehorny':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.modohorny = isEnable          
break
    
case 'stickers':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.stickers = isEnable          
break
    
case 'game': case 'juegos': case 'fun':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.game = isEnable          
break
    
case 'ruleta': case 'game2':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.game2 = isEnable          
break
    
case 'temporal':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.temporal = isEnable
break
		
case 'autolevelup': case 'autonivel': case 'nivelautomatico':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autolevelup = isEnable          
break
    
case 'autosticker':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autosticker = isEnable          
break
    
case 'reaction': case 'reaccion': case 'emojis': case 'antiemojis': case 'reacciones': case 'reaciones':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.reaction = isEnable          
break
		
case 'antitoxic': case 'antitoxicos': case 'antimalos':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antitoxic = isEnable
break
    
case 'audios':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.audios = isEnable          
break
    
case 'antiver': case 'modover': case 'modoobservar': case 'modobservar': case 'antiviewonce':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiver = isEnable 
break
		
case 'antiinternacional': case 'antinternacional': case 'antinternational': case 'antifake': case 'antifalsos': case 'antivirtuales': case 'antiextranjeros':		
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antifake = isEnable          
break
		
case 'jadibot': case 'modojadibot': case 'serbot': case 'modoserbot': 
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.jadibotmd = isEnable
break 
    
case 'restrict': case 'restringir':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.restrict = isEnable
break

case 'antiporn': case 'antiporno':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiPorn = isEnable          
break
    
case 'nyimak':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['nyimak'] = isEnable
break
    
case 'autoread': case 'autovisto':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.autoread2 = isEnable    
global.opts['autoread'] = isEnable  
break
    
case 'anticall': case 'antillamar':
isAll = true
if (!isOwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.antiCall = isEnable
break
		
case 'antispam':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.antiSpam = isEnable
break

case 'antispam2':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.antiSpam2 = isEnable
break

case 'modoadmin': case 'soloadmin': case 'modeadmin':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.modoadmin = isEnable          
break    
   
case 'pconly': case 'privateonly': case 'soloprivados':
isAll = true
if (!isOwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['pconly'] = isEnable
break
    
case 'gconly': case 'grouponly': case 'sologrupos':
isAll = true
if (!isOwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['gconly'] = isEnable
break
case 'antiprivado': case 'antiprivate':
case 'privado':
isAll = true
if (!isOwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.antiPrivate = isEnable
break
case 'antitrabas': case 'antitraba': case 'antilag':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTraba = isEnable
break

case 'autorespond': case 'autoresponder':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autorespond = isEnable 
break		
case 'simi': case 'chatbot':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.simi = isEnable
break 
		
case 'anticommand': case 'antiarabe': case 'antiarabe2': case 'AntiCommand':
isAll = true
if (!isOwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.anticommand = isEnable
break 
		
case 'modoia': case 'chatgpt': case 'ia':
isAll = true;
if (!isOwner) {
global.dfail('owner', m, conn);
throw false;
}
bot.modoia = isEnable;      
break;      
      
case 'swonly': case 'statusonly':
isAll = true
if (!isOwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['swonly'] = isEnable
break
default:
if (!/[01]/.test(command)) return await m.reply(textoo) 
//conn.sendList(m.chat, texto, wm, `AJUSTES`, null, listSections, m)
throw false
}
await m.reply(`*${isEnable ? '✅️' : '❌️'} ${await tr("La opción")} ${type} ${await tr("para")} ${isAll ? await tr('este bot') : isUser ? '' : await tr('este chat')} ${await tr("fue")} ${isEnable ? await tr('activado') : await tr('desactivado')} con exitos*`) 
/*conn.sendButton(m.chat, `╭┄〔 *${wm}* 〕┄⊱
┆🗂️ ᴏᴘᴄɪᴏɴ: ${type} 
┆——————«•»——————
┆🎚️ ᴇsᴛᴀᴅᴏ: ${isEnable ? 'ᴀᴄᴛɪᴠᴀᴅᴏ' : 'ᴅᴇsᴀᴄᴛɪᴠᴀᴅᴏ'}
┆——————«•»——————
┆📣 ᴘᴀʀᴀ: ${isAll ? 'ᴇsᴛᴇ ʙᴏᴛ' : isUser ? '' : 'ᴇsᴛᴇ ᴄʜᴀᴛ'} 
╰━━━⊰ 𓃠 ${vs} ⊱━━━━დ`, wm, null, [[`${isEnable ? `Desactivar` : `Activar`}`, `${isEnable ? `.off ${type}` : `.on ${type}`}`]], null, null, m)*/
}; 
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['nable']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff))$/i
handler.register = true
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

import { db } from '../lib/postgres.js'
import { getSubbotConfig } from '../lib/postgres.js'

const handler = async (m, { conn, args, usedPrefix, command, isAdmin, isOwner }) => {
const isEnable = /true|enable|(turn)?on|1/i.test(command)
const type = (args[0] || '').toLowerCase()
const chatId = m.chat
const botId = conn.user?.id
const cleanId = botId.replace(/:\d+/, '');
const isSubbot = botId !== 'main'
let isAll = false, isUser = false
let res = await db.query('SELECT * FROM group_settings WHERE group_id = $1', [chatId]);
let chat = res.rows[0] || {};
const getStatus = (flag) => m.isGroup ? (chat[flag] ? '✅' : '❌') : '⚠️';

let menu = `*『 ⧼⧼⧼ ＣＯＮＦＩＧＵＲＡＣＩＯ́Ｎ ⧽⧽⧽ 』*\n\n`;
menu += `> *Seleccione una opción de la lista*\n> *Para empezar a Configurar*\n\n`;
menu += `● *Avisos de la Configuracion:*
✅ ⇢ *Función Activada*
❌ ⇢ *Función Desactivada*
⚠️ ⇢ *Este Chat no es un Grupo*\n\n`;
menu += `*『 FUNCIONES PARA ADMINS 』*\n\n`;
menu += `🎉 BIENVENIDA ${getStatus('welcome')}\n• Mensaje de bienvenida\n• ${usedPrefix + command} welcome\n\n`;
menu += `📣 DETECTAR AVISOS ${getStatus('detect')}\n• Avisar cambios en el grupo\n• ${usedPrefix + command} detect\n\n`;
menu += `🔗 ANTILINK ${getStatus('antilink')}\n• Detectar enlaces de grupo\n• ${usedPrefix + command} antilink\n\n`;
menu += `🌐 ANTILINK2 ${getStatus('antilink2')}\n• Detectar cualquier link\n• ${usedPrefix + command} antilink2\n\n`;
menu += `🕵️ ANTIFAKE ${getStatus('antifake')}\n• Bloquear números de otros países\n• ${usedPrefix + command} antifake\n\n`;
menu += `🔞 NSFW ${getStatus('modohorny')}\n• Contenido +18 en stickers/gifs\n• ${usedPrefix + command} modohorny\n\n`
menu += `🔒 MODO SOLO ADMIN ${getStatus('modoadmin')}\n• Solo admins pueden usar comandos\n• ${usedPrefix + command} modoadmin\n\n`;
  
menu += `\n*『 FUNCIONES PARA OWNER 』*\n\n`;
menu += `🚫 ANTIPRIVADO ${isSubbot ? (getSubbotConfig(botId).antiPrivate ? '✅' : '❌') : '⚠️'}
• Bloquear uso en privado
• ${usedPrefix + command} antiprivate\n\n`;
menu += `📵 ANTILLAMADAS ${isSubbot ? (getSubbotConfig(botId).anticall ? '✅' : '❌') : '⚠️'}
• Bloquear llamadas
• ${usedPrefix + command} anticall`;
  
switch (type) {
case 'welcome': case 'bienvenida':
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET welcome = $1 WHERE group_id = $2`, [isEnable, chatId])
break

case "bye": case "despedidas":
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET bye = $1 WHERE group_id = $2`, [isEnable, chatId])
break

case 'detect': case 'avisos':
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET detect = $1 WHERE group_id = $2`, [isEnable, chatId])
break

case 'antilink': case 'antienlace':
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET antilink = $1 WHERE group_id = $2`, [isEnable, chatId])
break
      
case 'antilink2':
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET antilink2 = $1 WHERE group_id = $2`, [isEnable, chatId])
break
            
case "approve": case "autoapprove": case "aprobar":
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET auto_approve = $1 WHERE group_id = $2`, [isEnable, chatId])
break
            
case 'antiporn': case 'antiporno': case 'antinwfs':
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET antiporn = $1 WHERE group_id = $2`, [isEnable, chatId])
break
            
case 'audios':
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET audios = $1 WHERE group_id = $2`, [isEnable, chatId])
break
            
case 'antifake':
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET antifake = $1 WHERE group_id = $2`, [isEnable, chatId])
break
      
case "antistatus": case "antiestados":
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET antistatus = $1 WHERE group_id = $2`, [isEnable, chatId])
break
      
case 'nsfw': case "modohorny": case "modocaliente":
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
  await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
  await db.query(`UPDATE group_settings SET modohorny = $1 WHERE group_id = $2`, [isEnable, chatId])
  break
      
case 'modoadmin': case 'onlyadmin':
if (!m.isGroup) throw '⚠️ Este comando solo se puede usar dentro de un grupo.'
if (!isAdmin) throw "⚠️ Solo los admins puede usar este comando.";
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [chatId])
await db.query(`UPDATE group_settings SET modoadmin = $1 WHERE group_id = $2`, [isEnable, chatId])
break

case 'antiprivate': case 'antiprivado':
if (!isSubbot && !isOwner) return m.reply('❌ Solo el owner o subbots pueden cambiar esto.');
await db.query(`INSERT INTO subbots (id, anti_private)
    VALUES ($1, $2)
    ON CONFLICT (id) DO UPDATE SET anti_private = $2`, [cleanId, isEnable]);
isAll = true;
break;

case 'anticall': case 'antillamada':
if (!isSubbot && !isOwner) return m.reply('❌ Solo el owner o subbots pueden cambiar esto.');
await db.query(`INSERT INTO subbots (id, anti_call)
    VALUES ($1, $2)
    ON CONFLICT (id) DO UPDATE SET anti_call = $2`, [cleanId, isEnable]);
isAll = true;
break;
default:
return m.reply(menu.trim());
}
await m.reply(`🗂️ La opción *${type}* para ${isAll ? 'todo el bot' : isUser ? 'este usuario' : 'este chat'} fue *${isEnable ? 'activada' : 'desactivada'}* correctamente.`)
}
handler.help = ['enable <opción>', 'disable <opción>']
handler.tags = ['nable']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i
handler.register = true
//handler.group = true 
//handler.admin = true
export default handler

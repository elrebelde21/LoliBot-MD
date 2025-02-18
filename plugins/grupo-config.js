let handler = async (m, { conn, args, usedPrefix, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg'  
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'abrir': 'not_announcement',
'cerrar': 'announcement',
}[(args[0] || '')]
if (isClose === undefined)
throw `*⚠️ ACCION MAL USADA*\n\n*• Usar ejemplo:*\n${usedPrefix + command} abrir\n${usedPrefix + command} cerrar`.trim()
await conn.groupSettingUpdate(m.chat, isClose)
  
if (isClose === 'not_announcement'){
m.reply(`🟢 𝙔𝘼 𝙋𝙐𝙀𝘿𝙀𝙉 𝙀𝙎𝘾𝙍𝙄𝘽𝙄𝙍 𝙏𝙊𝘿𝙊𝙎 𝙀𝙉 𝙋𝙐𝙏𝙊 𝙂𝙍𝙐𝙋𝙊, 𝘼𝙃𝙊𝙍𝘼 𝙎𝙄 𝙃𝘼𝘽𝙇𝙀𝙉 𝙕𝙊𝙍𝙍𝘼 𝙓𝘿!!`)
}
  
if (isClose === 'announcement'){
m.reply(`⚠️ 𝙂𝙍𝙐𝙋𝙊 𝘾𝙀𝙍𝙍𝘼𝘿𝙊 𝙎𝙊𝙇𝙊 𝙇𝙊𝙎 𝘼𝘿𝙈𝙄𝙉𝙎 𝙋𝙐𝙀𝘿𝙀𝙉 𝙀𝙎𝘾𝙍𝙄𝘽𝙄𝙍, 𝙈𝙊𝘿𝙊 𝙋𝙍𝙄𝙑𝙄𝙇𝙀𝙂𝙄𝙊 𝙎𝙊𝙍𝙍𝙔😘`)
}}
handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['group']
handler.command = /^(group|grupo)$/i
handler.admin = true
handler.botAdmin = true
handler.exp = 200
export default handler
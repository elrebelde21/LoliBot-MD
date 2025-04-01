import fetch from 'node-fetch' 
let handler = async (m, { conn, isOwner }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let msgTxt = await tr("NADIE HA SIDO BLOQUEADO", "𝙉𝘼𝘿𝙄𝙀 𝙃𝘼 𝙎𝙄𝘿𝙊 𝘽𝙇𝙊𝙌𝙐𝙀𝘼𝘿𝙊")

if (command == 'listban' || command == 'listbaneado') {
let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
let caption = `╭•·––| 👥 ${await tr("USUARIO BANEADOS", "𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒 𝐁𝐀𝐍𝐄𝐀𝐃𝐎𝐒")} |––·•
│  ${await tr("Total")}: ${users.length} ${users ? '\n' + users.map(([jid], i) => `
│ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
╰•·–––––––––––––––––––·•

╭•·––| 💬 ${await tr("CHATS BANEADOS", "𝘾𝙃𝘼𝙏𝙎 𝘽𝘼𝙉𝙀𝘼𝘿𝙊𝙎")} |––·•
│  ${await tr("Total")}: ${chats.length} ${chats ? '\n' + chats.map(([jid], i) => `
│ ${isOwner ? '@' + jid.split`@`[0] : jid}`.trim()).join('\n') : '├'}
╰•·–––––––––––––––––––·•
`.trim()
m.reply(caption, null, {mentions: conn.parseMention(caption)})
}

if (command == 'listablock' || command == 'blocklist' || command == 'listabloqueados') {
await conn.fetchBlocklist().then(async data => {
let txt = `📛 ${await tr("LISTA DE BLOQUEADOS", "𝗟𝗜𝗦𝗧𝗔 𝗗𝗘 𝗕𝗟𝗢𝗤𝗨𝗘𝗔𝗗𝗢𝗦")}\n\n*${await tr("Total")} :* ${data.length}\n\n╭━━━[ *${vs} 𓃠* ]━━━⬣\n`
for (let i of data) {
txt += `┃🚫 @${i.split("@")[0]}\n`
}
txt += `╰━━━━━━━⬣\n\n${await tr("*Por favor no llame para evitar ser Bloqueado, Gracias.*")}`
return conn.reply(m.chat, txt, fkontak, m, { mentions: await conn.parseMention(txt) })
/*conn.sendButton(m.chat, txt, `*Por favor no llame para evitar ser Bloqueado, Gracias.*\n\n*Please do not call to avoid being Blocked, Thank you.*\n\n` + wm, null, [ 
['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], m, { mentions: await conn.parseMention(txt) })*/
}).catch(err => {
console.log(err);
return conn.reply(m.chat, msgTxt, m) 
/*conn.sendButton(m.chat, `${rg}𝙉𝘼𝘿𝙄𝙀 𝙃𝘼 𝙎𝙄𝘿𝙊 𝘽𝙇𝙊𝙌𝙐𝙀𝘼𝘿𝙊\n\n𝙉𝙊 𝙊𝙉𝙀 𝙃𝘼𝙎 𝘽𝙀𝙀𝙉 𝘽𝙇𝙊𝘾𝙆𝙀𝘿`, wm, gata, [
['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], os.getRandom())*/
})
}}
handler.help = ['listban', 'listablock']
handler.tags = ['owner']
handler.command = /^(listban|listbaneado|listablock|blocklist|listabloqueados)$/i
//handler.rowner = true
export default handler

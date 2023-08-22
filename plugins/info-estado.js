/**
POR FAVOR TENGAN LA AMABILIDAD Y BONDAD DE NO CAMBIAR MÍNIMAMENTE LOS CRÉDITOS DE LOLIBOT-MD, 
SI VAS A AÑADIR TUS DATOS O CRÉDITOS, ESTA BIEN. PERO NO QUITEN LOS QUE YA ESTAN DE LOLIBOT-MD, GRACIAS 
**/
let handler = async (m, { conn, command, usedPrefix }) => {
let picture = './media/menus/Menu1.jpg'
let name = await conn.getName(m.sender)
let usuario = `${m.sender.split("@")[0]}`
let aa = usuario + '@s.whatsapp.net'
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) { process.send('uptime')
_muptime = await new Promise(resolve => { process.once('message', resolve) 
setTimeout(resolve, 1000) }) * 1000}
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let uptime = clockString(_uptime)
let estado = `${pickRandom([`*┌───⊷ *ミ🤖 Estado del Bot 🤖彡*\n┆ *=> Bot activo ✅*\n┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┆ *=> Bot uso público ✅️*\n┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┆=> 𝘼𝙘𝙩𝙞𝙫𝙤 𝙙𝙪𝙧𝙖𝙣𝙩𝙚\n┆=> ${uptime} ✅\n╰──────────────────`, `*Online ${uptime} ✅*`, `*Saturado 🥵*`, `Estoy activo desde: ${uptime}`, `Estamos activo papu 🤙`])}
`.trim()
await conn.sendMessage(m.chat, {text: estado, mentions: [m.sender]}, {quoted: fkontak})
/*await conn.reply(m.chat, `┌───⊷ *ミ🤖 Estado del Bot 🤖彡*
┆ *=> Bot activo ✅*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆ *=> Bot uso público ✅️*
┆┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┆=> 𝘼𝙘𝙩𝙞𝙫𝙤 𝙙𝙪𝙧𝙖𝙣𝙩𝙚
┆=> ${uptime} ✅
╰──────────────────`, fkontak, { mentions: [aa,] })*/
}
handler.help = ['estado']
handler.tags = ['main']
handler.command = /^(estado|status|estate|state|stado|stats|botstat(us)?)$/i
export default handler
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}

let handler = async (m, { conn, text, command }) => {
let id = text ? text : m.chat  
await conn.reply(id, '*𝑬𝒍 𝒃𝒐𝒕  𝒂𝒃𝒂𝒏𝒅𝒐𝒏𝒂 𝒆𝒍 𝒈𝒓𝒖𝒑𝒐, 𝒄𝒉𝒂𝒖👋*') 
await conn.groupLeave(id)}
handler.command = /^(salir|leavegc|salirdelgrupo|leave)$/i
handler.rowner = true
export default handler

let handler = async (m, { conn }) => {
if (global.conn.user.jid === conn.user.jid) {
await m.reply('*⚠️ Este comando sólo puede ser ejecutado por un usuario que sea Sub-Bot*');
} else {
await m.reply(`Adios bot :(`);
conn.ws.close();
}};
handler.help = ['stop'];
handler.tags = ['jadibot'];
handler.command = /^(berhenti|stop|detener)$/i
handler.private = true  
export default handler

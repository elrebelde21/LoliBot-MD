import ws from 'ws';
async function handler(m, { conn: _envio, usedPrefix }) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
function convertirMsADiasHorasMinutosSegundos(ms) {
var segundos = Math.floor(ms / 1000);
var minutos = Math.floor(segundos / 60);
var horas = Math.floor(minutos / 60);
var días = Math.floor(horas / 24);
segundos %= 60;
minutos %= 60;
horas %= 24;
var resultado = "";
if (días !== 0) {
resultado += días + " días, ";
}
if (horas !== 0) {
resultado += horas + " horas, ";
}
if (minutos !== 0) {
resultado += minutos + " minutos, ";
}
if (segundos !== 0) {
resultado += segundos + " segundos";
}
return resultado;
}
const message = users.map((v, index) => `👉🏻 wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado (${v.user.name || '-'})\n*🔰 Tiempo activo :* ${ v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : "Desconocido"}`).join('\n\n')
  const replyMessage = message.length === 0 ? '*No hay Sub bots conectado, verifique mas tardes.*' : message;
const totalUsers = users.length;
const responseMessage = `*🤖 Aquí tienes la lista de algunos sub bots (jadibot/serbot) 🤖️*\n\n*👉🏻 Puedes contactarlos para ver si se unen a tu grupo*\n\n*Te pedimos de favor que:*\n*1.- Seas amable ✅*\n*2.- No insistas ni discutas ✅*\n\n*✳ ️Si le aparece el siguiente texto en blanco es que no hay ningún sub bot disponible en este momento inténtelo mas tarde*\n\n*_⚠ NOTA: ️ELLOS SON PERSONAS QUE NO CONOCEMOS.. POR LO QUE EL EQUIPO DE LOLIBOT NO SE HACE RESPONSABLE DE LO QUE PUEDA OCURRIR AHI.._*\n\n*🤖 SUBBOTS CONECTADO :* ${totalUsers || '0'}\n\n${replyMessage.trim()}`.trim();
await _envio.sendMessage(m.chat, {text: responseMessage, mentions: _envio.parseMention(responseMessage)}, {quoted: m})}
handler.command = handler.help = ['listjadibot', 'bots', 'subsbots'];
handler.tags = ['jadibot'];
export default handler;

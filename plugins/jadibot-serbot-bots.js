async function handler(m, { usedPrefix }) {
const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
await m.reply( '*🤖 Aquí tienes la lista de algunos sub bots (jadibot/serbot) 🤖️*\n\n*👉🏻 Puedes contactarlos para ver si se unen a tu grupo*\n\n*Te pedimos de favor que:*\n*1.- Seas amable ✅*\n*2.- No insistas ni discutas ✅*\n\n*✳ ️Si le aparece el siguiente texto en blanco es que no hay ningún sub bot disponible en este momento inténtelo mas tarde*\n\n*_⚠ NOTA: ️ELLOS SON PERSONAS QUE NO CONOCEMOS.. POR LO QUE EL EQUIPO DE LOLIBOT NO SE HACE RESPONSABLE DE LO QUE PUEDA OCURRIR AHI.._*')
await m.reply(users.map(v => '👉🏻 wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado (${v.name})`).join('\n'))}
handler.command = handler.help = ['listjadibot','bots','subsbots']
handler.tags = ['jadibot']
export default handler

let handler = async (m, { conn, text, args, usedPrefix, command }) => {	
let opciones = text.split('|');
if (!opciones[0]) return conn.reply(m.chat, await tr(`⚠️ Usar el comando de la siguiente forma:\n*${usedPrefix + command} Motivo de Encuesta|Opción1|Opción2|Opción3...*`), m);
if (!opciones[1]) return conn.reply(m.chat, await tr(`⚠️ Para crear opciones, este es el formato:\n*${usedPrefix + command} Motivo de Encuesta|Opción1|Opción2|Opción3...*`), m);
if (opciones.length > 13) return conn.reply(m.chat, `⚠️ 𝙈𝘼𝙓𝙄𝙈𝙊 *12* 𝙊𝙋𝘾𝙄𝙊𝙉𝙀𝙎!!`, m);
let pregunta = opciones[0];
let respuestas = opciones.slice(1); 
let mensaje = `📊 ${await tr("Encuesta creada por")}:\n*❤️⇢ ${conn.getName(m.sender)}*\n\n${pregunta}`;
await conn.sendMessage(m.chat, { poll: { name: pregunta, values: respuestas, selectableCount: 1 }}, { quoted: m });
};
handler.help = ['poll', 'encuesta'];
handler.tags = ['tools'];
handler.command = ['poll', 'encuesta', 'crearencuesta', 'startpoll', 'encuestas', 'polls'];
handler.register = true
export default handler;

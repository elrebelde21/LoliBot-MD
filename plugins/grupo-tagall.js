let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}

if (command == 'tagall' || command == 'invocar' || command == 'todos' || command == 'invocacion') {
let pesan = args.join` `
let oi = `*${await tr("Mensaje")}:* ${pesan}`
let teks = `*⺀ ${await tr("ACTIVE GRUPO")} 🗣️⺀*

❏ ${oi}

❏ *${await tr("Etiquetas")}:*
`
for (let mem of participants) {
teks += `➥ @${mem.id.split('@')[0]}\n`}
teks += `➥ ${wm}`
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )
}

if (command == 'contador') {
let memberData = participants.map(mem => {
let userId = mem.id;
let userData = global.db.data.users[userId] || {};
let msgCount = userData.mensaje && userData.mensaje[m.chat] ? userData.mensaje[m.chat] : 0;
return { id: userId, messages: msgCount };
});
memberData.sort((a, b) => b.messages - a.messages);
let activeCount = memberData.filter(mem => mem.messages > 0).length;
let inactiveCount = memberData.filter(mem => mem.messages === 0).length;
  
let teks = `*📊 ${await tr("Actividad del grupo")} 📊*\n\n`;
teks += `□ ${await tr("Grupo")}: ${await conn.getName(m.chat)}\n`;
teks += `□ ${await tr("Total de miembros")}: ${participants.length}\n`;
teks += `□ ${await tr("Miembros activos")}: ${activeCount}\n`;
teks += `□ ${await tr("Miembros inactivos")}: ${inactiveCount}\n\n`;
teks += `*□ ${await tr("Lista de miembros")}:*\n`;
  
for (let mem of memberData) {
teks += `➥ @${mem.id.split('@')[0]} - Mensajes: ${mem.messages}\n`;
}
conn.sendMessage(m.chat, { text: teks, mentions: memberData.map(a => a.id) }, { quoted: m });
}
}
handler.help = ['tagall <mesaje>','invocar <mesaje>', 'contador']
handler.tags = ['group']
handler.command = /^(tagall|invocar|invocacion|todos|invocación|contador)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler

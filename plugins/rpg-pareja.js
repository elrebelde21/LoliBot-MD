let handler = async (m, { conn, args, usedPrefix, command }) => {
const user = global.db.data.users[m.sender];
if (user.marry) {
let spouse = global.db.data.users[user.marry];
if (user.marry === m.mentionedJid[0]) return conn.reply(m.chat, `⚠️ ${await tr("Ya estás casado con")} @${user.marry.split('@')[0]}. ${await tr("No necesitas casarte de nuevo con la misma persona")} 🤨`, m, { mentions: [m.sender] });

const spouseName = spouse ? spouse.name : 'sin name';
conn.reply(m.chat, `⚠️ ${await tr("Ya estás casado con")} @${user.marry.split('@')[0]} (${spouseName}).\n${await tr("¿Acaso le vas a ser infiel?")} 🤨`, m, { mentions: [m.sender] });
return;
}

let mentionedUser = m.mentionedJid[0] || ''; 
if (!mentionedUser) throw await tr('⚠️ Etiquetas a la persona con la que quiere mandarle una solicitud de matrimonio con en @tag')
if (mentionedUser === m.sender) return conn.reply(m.chat, await tr("⚠️ Wtf No puedes casarte contigo mismo. ¿Te vas a enamorar de ti mismo? 😆"), m);
let targetUser = global.db.data.users[mentionedUser];
if (!targetUser) throw await tr('⚠️ El usuario al que intentas casar no está en mi base de datos.')

if (targetUser.marry) {
let spouse = global.db.data.users[targetUser.marry];
const spouseName = spouse ? spouse.name : 'sin name';
throw `⚠️ ${await tr("El usuario")} @${mentionedUser.split('@')[0]} (${targetUser.name}) ${await tr("ya está casado con")} @${spouse.marry.split('@')[0]} (${spouseName}).`;
}

let text = `💍 *@${m.sender.split('@')[0]}* ${await tr("se esta declarado!! 😳\nPor favor")} @${mentionedUser.split('@')[0]} ${await tr("Responder a la declaración")} 🙀\n\n❤️ *_${await tr("Si quieres una Relacion escriba")}:_*\n\n- *Aceptar*\n\n💔 *_${await tr("De no querer una Relacion escriba")}:_*\n- *Rechazar*.`;
let msgTxt = await tr("⚠️ El tiempo para aceptar o rechazar la solicitud ha expirado")

targetUser.marryRequest = m.sender;
conn.reply(m.chat, text, m, { mentions: [mentionedUser, m.sender] });

setTimeout(() => {
if (global.db.data.users[mentionedUser].marryRequest) {
delete global.db.data.users[mentionedUser].marryRequest;
conn.reply(m.chat, msgTxt, m);
}}, 60000);  //1 min
};

handler.before = async (m) => {
const targetId = m.sender; 
if (!global.db.data.users[targetId].marryRequest) return;
const response = m.text.toLowerCase();
const requesterId = global.db.data.users[targetId].marryRequest;

if (response === 'aceptar') {
global.db.data.users[requesterId].marry = targetId;  
global.db.data.users[targetId].marry = requesterId;
delete global.db.data.users[requesterId].marryRequest;
delete global.db.data.users[targetId].marryRequest;
m.reply(`✅ ${await tr("¡Felicidades tenemos una boba en grupos")} 🥳\n\n@${requesterId.split('@')[0]} (${global.db.data.users[requesterId].name}) y @${targetId.split('@')[0]} (${global.db.data.users[targetId].name}) ${await tr("ahora están casados")}.`, null, { mentions: [requesterId, targetId] });
} else if (response === 'rechazar') {
delete global.db.data.users[requesterId].marryRequest;
delete global.db.data.users[targetId].marryRequest;
m.reply(`⚠️ ${await tr("Has rechazado la solicitud de matrimonio de")} @${requesterId.split('@')[0]} (${global.db.data.users[requesterId].name}).`, null, { mentions: [requesterId, targetId] });
}};
handler.help = ['marry @tag', 'pareja']
handler.tags = ['econ']
handler.command = ['marry', 'pareja'];
handler.register = true;

export default handler;

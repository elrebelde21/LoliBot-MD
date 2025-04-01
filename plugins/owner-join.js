let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text;
let [_, code] = link.match(linkRegex) || [];
if (!code) throw `🤔 ${await tr("Y el enlace? ingresar un enlace valido del grupo para que el bot pueda unirse\n\n📝 *¿Como usar el comando?*\nUsa")}: #join <enlace> [tiempo]\n- ${await tr("Si no pones tiempo, el bot se une por 30 minutos (usuarios) o 1 día (propietario).\n- Puedes especificar el tiempo con: minuto, hora, día o mes.\n\n📌 *Ejemplos:*")}\n- #join ${nn} (${await tr("por defecto")})\n- #join ${nn} ${await tr("60 minuto (1 hora)")}\n- #join ${nn} ${await tr("2 día (2 días)")}\n- #join ${nn} ${await tr("1 mes (30 días)")}`;

const botConfig = global.db.data.users[conn.user.jid] || {};
const timeMatch = text.match(/(\d+)\s*(minuto|hora|día|dias|mes)/i);
let time, unit;

if (botConfig.prestar === false && isOwner) {
time = timeMatch ? parseInt(timeMatch[1]) : 1; // 1 día por defecto
unit = timeMatch ? timeMatch[2].toLowerCase() : 'día';
} else {
time = timeMatch ? parseInt(timeMatch[1]) : 30; // Tiempo predeterminado: 30 minutos
unit = timeMatch ? timeMatch[2].toLowerCase() : 'minuto'; 
}

let timeInMs;
if (unit.includes('minuto')) {
  timeInMs = time * 60 * 1000; //60min
} else if (unit.includes('hora')) {
  timeInMs = time * 60 * 60 * 1000; //1hs
} else if (unit.includes('día') || unit.includes('dias')) {
  timeInMs = time * 24 * 60 * 60 * 1000; //1dias
} else if (unit.includes('mes')) {
  timeInMs = time * 30 * 24 * 60 * 60 * 1000; //1mes
}

if (botConfig.prestar === false && !isOwner) {
global.db.data.pendingApprovals = global.db.data.pendingApprovals || {};
global.db.data.pendingApprovals[code] = { sender: m.sender, timeInMs };
const data = global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number);
await m.reply(`${await tr("Su enlace se envio al mi propietario(a)")}*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n⚠️ *${await tr("Su grupo sera evaluado y quedará a decisión del mi propietario(a)")}.*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n❕ *${await tr("Es posible que su solicitud sea rechazadas por las siguientes causas")}:*\n1️⃣ *${await tr("El bot esta saturado")}*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n2️⃣ *${await tr("El bot fue eliminado del grupo")}.*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n3️⃣ *${await tr("El grupo no cumplir con las normativa de el bot")}*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n4⃣ ${await tr("el grupo tiene que tener minimo 80 participantes para evitar grupo inactivo y satura al bot")}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n5⃣ *${await tr("El enlace del grupo se restablecio")}*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n6️⃣ *${await tr("No se agregar al grupo segun mi propietario(a)")}*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n💌 *${await tr("Las solicitud puede tarda horas en ser respondidas. por favor tener paciencia gracias")}*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n> *${await tr("Puede apoyar el bot con una estrellita el nuestro repositorio oficial y suscrirte a nuestro canal del YouTube oficial")} 💫*\n${[yt, md, "https://github.com/elrebelde21/NovaBot_MD"].getRandom()}`) 

let msgTxt = await tr("SOLICITUD DE BOT PARA UN GRUPO")
let msgTxt2 = await tr("Numero del solicitante")
let msgTxt3 = await tr("Link del grupo")
let msgTxt4 = await tr("Tiempo solicitado")
for (let jid of data.map(([id]) => [id] + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
await conn.sendMessage(jid, { text: `*\`⪨ ${msgTxt} ⪩\`*\n\n👤 ${msgTxt2}:\nwa.me/${m.sender.split('@')[0]}\n\n🔮 ${msgTxt3}:\n${link}\n\n> ⏳ ${msgTxt4}: *${time} ${unit}${time > 1 ? 's' : ''}*` }, { quoted: m });
}
return; 
}

if (botConfig.prestar === true || isOwner) {
if (!isOwner) {
const user = global.db.data.users[m.sender];
const costPerHour = 100; 
const cost = Math.ceil((timeInMs / (60 * 60 * 1000)) * costPerHour); 
if (user.limit < cost) return m.reply(await tr(`❌ No tienes suficientes diamantes. Necesitas *${cost} diamantes* para unirte al grupo.`));
user.limit -= cost;
await conn.sendMessage(m.chat, { text: await tr(`😎 Espere 3 segundos, me uniré al grupo\n\n> Se han descontado *${cost} diamantes* de tu cuenta.`) }, { quoted: m });
}

let res;
try {
res = await conn.groupAcceptInvite(code);
} catch (error) {
console.error("Error al unirse al grupo:", error);
return m.reply(await tr("❌ No pude unirme al grupo. Verifica el enlace e inténtalo de nuevo."));
}

await new Promise(resolve => setTimeout(resolve, 3000));
const pendingApproval = global.db.data.pendingApprovals?.[code];
const senderNumber = pendingApproval?.sender || m.sender;
const sendWelcomeMessage = async (groupId) => {
try {
const groupMetadata = await conn.groupMetadata(groupId);
const groupName = groupMetadata.subject || "este grupo";
let mes = `${await tr(`Hola a todos 👋🏻
     
Soy`)} *${conn.user.name}* ${await tr("es uno de los bots multidispositivo de WhatsApp construido con Node.js")}, *${conn.user.name}* ${await tr("Recién invitado por")} *@${senderNumber.split('@')[0]}*

${await tr("para ver el Menu del bot escribe")}:
*#menu*

@${conn.user.jid.split('@')[0]} ${await tr("saldrá automáticamente después de")}:\n${time} ${unit}${time > 1 ? 's' : ''}` 
await conn.reply(groupId, mes);
} catch (error) {
console.error("Error al enviar el mensaje de presentación:", error);
await conn.reply(groupId, mes);
}};
await sendWelcomeMessage(res);
global.db.data.chats[res] = global.db.data.chats[res] || {};
global.db.data.chats[res].expired = +new Date() + timeInMs;
if (global.db.data.pendingApprovals?.[code]) {
delete global.db.data.pendingApprovals[code]}
await m.reply(await tr(`*El Bot se ha unido al grupo✅* por *${time} ${unit}${time > 1 ? 's' : ''}.*`))
}
};
handler.help = ['join [chat.whatsapp.com] [tiempo]'];
handler.tags = ['owner'];
handler.command = /^unete|join|nuevogrupo|unir|unite|unirse|entra|entrar$/i;
handler.register = true;
export default handler;
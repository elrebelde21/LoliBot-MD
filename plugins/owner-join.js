let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text;
let [_, code] = link.match(linkRegex) || [];
if (!code) throw `🤔 𝙔 𝙚𝙡 𝙚𝙣𝙡𝙖𝙘𝙚? 𝙄𝙣𝙜𝙧𝙚𝙨𝙖 𝙪𝙣 𝙚𝙣𝙡𝙖𝙘𝙚 𝙫𝙖́𝙡𝙞𝙙𝙤 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙚𝙡 𝙗𝙤𝙩 𝙥𝙪𝙚𝙙𝙖 𝙪𝙣𝙞𝙧𝙨𝙚.\n\n📝 *¿𝘾𝙤́𝙢𝙤 𝙪𝙨𝙖𝙧 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤?*\nUsa: #join <enlace> [tiempo]\n- Si no pones tiempo, el bot se une por 30 minutos (usuarios) o 1 día (propietario).\n- Puedes especificar el tiempo con: minuto, hora, día o mes.\n\n📌 *Ejemplos:*\n- #join ${nn} (por defecto)\n- #join ${nn} 60 minuto (1 hora)\n- #join ${nn} 2 día (2 días)\n- #join ${nn} 1 mes (30 días)`;

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
await m.reply(`𝙎𝙪 𝙚𝙣𝙡𝙖𝙘𝙚 𝙨𝙚 𝙚𝙣𝙫𝙞𝙤́ 𝙖𝙡 𝙢𝙞 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤(𝙖)*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n⚠️ *𝙎𝙪 𝙜𝙧𝙪𝙥𝙤 𝙨𝙚𝙧𝙖́ 𝙚𝙫𝙖𝙡𝙪𝙖𝙙𝙤 𝙮 𝙦𝙪𝙚𝙙𝙖𝙧𝙖́ 𝙖 𝙙𝙚𝙘𝙞𝙨𝙞𝙤́𝙣 𝙙𝙚𝙡 𝙢𝙞 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤(𝙖).*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n❕ *𝙀𝙨 𝙥𝙤𝙨𝙞𝙗𝙡𝙚 𝙦𝙪𝙚 𝙨𝙪 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙪𝙙 𝙨𝙚𝙖 𝙧𝙚𝙘𝙝𝙖𝙯𝙖𝙙𝙖 𝙥𝙤𝙧 𝙡𝙖𝙨 𝙨𝙞𝙜𝙪𝙞𝙚𝙣𝙩𝙚𝙨 𝙘𝙖𝙪𝙨𝙖𝙨:*\n1️⃣ *𝙀𝙡 𝙗𝙤𝙩 𝙚𝙨𝙩𝙖́ 𝙨𝙖𝙩𝙪𝙧𝙖𝙙𝙤* .\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n2️⃣ *𝙀𝙡 𝙗𝙤𝙩 𝙛𝙪𝙚 𝙚𝙡𝙞𝙢𝙞𝙣𝙖𝙙𝙤 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤.*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n3️⃣ *𝙀𝙡 𝙜𝙧𝙪𝙥𝙤 𝙣𝙤 𝙘𝙪𝙢𝙥𝙡𝙞𝙧 𝙘𝙤𝙣 𝙡𝙖𝙨 𝙣𝙤𝙧𝙢𝙖𝙩𝙞𝙫𝙖 𝙙𝙚 𝙀𝙡 𝙗𝙤𝙩*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n4⃣ *𝙚𝙡 𝙜𝙧𝙪𝙥𝙤 𝙩𝙞𝙚𝙣𝙚 𝙦𝙪𝙚 𝙩𝙚𝙣𝙚𝙧 𝙢𝙞𝙣𝙞𝙢𝙤 80 𝙥𝙖𝙧𝙩𝙞𝙘𝙞𝙥𝙖𝙣𝙩𝙚𝙨 𝙥𝙖𝙧𝙖 𝙚𝙫𝙞𝙩𝙖𝙧 𝙜𝙧𝙪𝙥𝙤 𝙞𝙣𝙖𝙘𝙩𝙞𝙫𝙤 𝙮 𝙨𝙖𝙩𝙪𝙧𝙖 𝙖𝙡 𝙗𝙤𝙩*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n5⃣ *𝙀𝙡 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤 𝙨𝙚 𝙧𝙚𝙨𝙩𝙖𝙗𝙡𝙚𝙘𝙞𝙤*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n6️⃣ *𝙉𝙤 𝙨𝙚 𝙖𝙜𝙧𝙚𝙜𝙖 𝙖𝙡 𝙜𝙧𝙪𝙥𝙤 𝙨𝙚𝙜𝙪́𝙣 𝙢𝙞 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤(𝙖)*.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n💌 *𝙇𝙖𝙨 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙪𝙙 𝙥𝙪𝙚𝙙𝙚 𝙩𝙖𝙧𝙙𝙖 𝙝𝙤𝙧𝙖𝙨 𝙚𝙣 𝙨𝙚𝙧 𝙧𝙚𝙨𝙥𝙤𝙣𝙍𝙞𝙙𝙖𝙨. 𝙋𝙤𝙧 𝙛𝙖𝙫𝙤𝙧 𝙩𝙚𝙣𝙚𝙧 𝙥𝙖𝙘𝙞𝙚𝙣𝙘𝙞𝙖 𝙜𝙧𝙖𝙘𝙞𝙖𝙨*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n*ᴾᵘᵉᵈᵉ ᵃᵖᵒʸᵃʳ ᵉˡ ᵇᵒᵗ ᶜᵒⁿ ᵘⁿᵃ ᴱˢᵗʳᵉˡˡᶦᵗᵃ ᵉˡ ⁿᵘᵉˢᵗʳᵒ ʳᵉᵖᵒˢᶦᵗᵒʳᶦᵒ ᵒᶠᶦᶜᶦᵃˡ ʸ ˢᵘˢᶜʳᶦʳᵗᵉ ᵃ ⁿᵘᵉˢᵗʳᵒ ᶜᵃⁿᵃˡ ᵈᵉˡ ʸᵒᵘᵀᵘᵇᵉ ᵐᵃⁿᵈᵃ ᶜᵃʳᵗᵘʳᵃ ᵃ ᵐᶦ ᶜʳᵉᵃᵈᵒʳ ᵖᵃʳᵃ ᵠᵘᵉ ᵖᵘᵉᵈᵃ ᵃᵍʳᵉᵍᵃ ᵉˡ ᵇᵒᵗ ᵃ ᵗᵘ ᵍʳᵘᵖᵒ 💫*\n${[yt, md, "https://github.com/elrebelde21/NovaBot_MD"].getRandom()}`) 

for (let jid of data.map(([id]) => [id] + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
await conn.sendMessage(jid, { text: `*⪨ 𝙎𝙊𝙇𝙄𝘾𝙄𝙏𝙐𝘿 𝘿𝙀 𝘽𝙊𝙏 𝙋𝘼𝙍𝘼 𝙐𝙉 𝙂𝙍𝙐𝙋𝙊 ⪩*\n\n👤 𝙉𝙪𝙢𝙚𝙧𝙤 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙖𝙣𝙩𝙚:\nwa.me/${m.sender.split('@')[0]}\n\n🔮 𝙇𝙞𝙣𝙠 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤:\n${link}\n\n⏳ 𝙏𝙞𝙚𝙢𝙥𝙤 𝙨𝙤𝙡𝙞𝙘𝙞𝙩𝙖𝙙𝙤: *${time} ${unit}${time > 1 ? 's' : ''}*` }, { quoted: m });
}
return; 
}

if (botConfig.prestar === true || isOwner) {
if (!isOwner) {
const user = global.db.data.users[m.sender];
const costPerHour = 100; 
const cost = Math.ceil((timeInMs / (60 * 60 * 1000)) * costPerHour); 
if (user.limit < cost) return m.reply(`❌ No tienes suficientes diamantes. Necesitas *${cost} diamantes* para unirte al grupo.`);
user.limit -= cost;
await conn.sendMessage(m.chat, { text: `😎 Espere 3 segundos, me uniré al grupo\n\n> Se han descontado *${cost} diamantes* de tu cuenta.` }, { quoted: m });
}

let res;
try {
res = await conn.groupAcceptInvite(code);
} catch (error) {
console.error("Error al unirse al grupo:", error);
return m.reply("❌ No pude unirme al grupo. Verifica el enlace e inténtalo de nuevo.");
}

await new Promise(resolve => setTimeout(resolve, 3000));
const pendingApproval = global.db.data.pendingApprovals?.[code];
const senderNumber = pendingApproval?.sender || m.sender;
const sendWelcomeMessage = async (groupId) => {
try {
const groupMetadata = await conn.groupMetadata(groupId);
const groupName = groupMetadata.subject || "este grupo";
let mes = `Hola a todos 👋🏻
     
Soy *${conn.user.name}* es uno de los bots multidispositivo de WhatsApp construido con Node.js, *${conn.user.name}* Recién invitado por *@${senderNumber.split('@')[0]}*

para ver el Menu del bot escribe:
*#menu*

@${conn.user.jid.split('@')[0]} saldrá automáticamente después de:\n${time} ${unit}${time > 1 ? 's' : ''}` 
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
await m.reply(`*El Bot se ha unido al grupo✅* por *${time} ${unit}${time > 1 ? 's' : ''}.*`)
}
};
handler.help = ['join [chat.whatsapp.com] [tiempo]'];
handler.tags = ['owner'];
handler.command = /^unete|join|nuevogrupo|unir|unite|unirse|entra|entrar$/i;
handler.register = true;
export default handler;
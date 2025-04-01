/*              Codigo Creado Por Bruno Sobrino
      (https://github.com/BrunoSobrino/TheMystic-Bot-MD)
*/
const handler = async (m, {conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin}) => {
if (!args[0]) return m.reply(`*⚠️ ${await tr("Ingrese el prefijo de algum pais para buscar numeros en este grupo de ese pais, ejemplo")}: ${usedPrefix + command} 52*`);
if (isNaN(args[0])) return m.reply(`*⚠️ ${await tr("Ingrese el prefijo de algum pais para buscar numeros en este grupo de ese pais, ejemplo")}: ${usedPrefix + command} 52*`);
const lol = args[0].replace(/[+]/g, '');
const ps = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol || lol));
const bot = global.db.data.settings[conn.user.jid] || {};
if (ps == '') return m.reply(`*⚠️ ${await tr("En este grupo no hay ningun numero con el prefijo")}:* [+${lol}]`);
const numeros = ps.map((v)=> '⭔ @' + v.replace(/@.+/, ''));
const delay = (time) => new Promise((res)=>setTimeout(res, time));

switch (command) {
case 'listanum': case 'listnum':
conn.reply(m.chat, `*${await tr("Lista de numero con el prefijo")} +${lol} ${await tr("Que estan en este grupo")}:*\n\n` + numeros.join`\n`, m, {mentions: ps});
break;
case 'kicknum':
if (!bot.restrict) return m.reply(`*⚠️ ${await tr("El propietario del bot tiene desactivo el restrict, contacte con el para que lo habilite")}:* #on restrict`);
if (!isBotAdmin) return m.reply(`*⚠️ ${await tr("Pinche pendejo, el bot no es admins, hazme admins para poder usar este comando inútil")}*`);
conn.reply(m.chat, `*⚠️ ${await tr("Iniciando eliminacion de numeros con el prefijo")}: +${lol}, ${await tr("cada 10 segundos se eliminara a un usuario")}*`, m);
const ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
const users = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol || lol));
for (const user of users) {
const error = `@${user.split('@')[0]} ${await tr("Ya ha sido eliminado o ha abandonado el grupo")}*`;
if (user !== ownerGroup + '@s.whatsapp.net' && user !== global.conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) {
await delay(2000);
const responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
if (responseb[0].status === '404') m.reply(error, m.chat, {mentions: conn.parseMention(error)});
await delay(10000);
} else return m.reply('*[❗] 𝙴𝚁𝚁𝙾𝚁*')
}
break;
}};
handler.command = /^(listanum|kicknum|listnum)$/i;
handler.group = handler.botAdmin = handler.admin = true;
handler.fail = null;
export default handler;

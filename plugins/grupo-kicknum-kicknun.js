/*              Codigo Creado Por Bruno Sobrino
      (https://github.com/BrunoSobrino/TheMystic-Bot-MD)
*/
const handler = async (m, {conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin}) => {
if (!args[0]) return m.reply(`*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐞𝐥 𝐩𝐫𝐞𝐟𝐢𝐣𝐨 𝐝𝐞 𝐚𝐥𝐠𝐮𝐧 𝐩𝐚𝐢𝐬 𝐩𝐚𝐫𝐚 𝐛𝐮𝐬𝐜𝐚𝐫 𝐧𝐮𝐦𝐞𝐫𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨 𝐝𝐞 𝐞𝐬𝐞 𝐩𝐚𝐢𝐬, 𝐄𝐣𝐞𝐦𝐩𝐥𝐨: ${usedPrefix + command} 52*`);
if (isNaN(args[0])) return m.reply(`*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐞𝐥 𝐩𝐫𝐞𝐟𝐢𝐣𝐨 𝐝𝐞 𝐚𝐥𝐠𝐮𝐧 𝐩𝐚𝐢𝐬 𝐩𝐚𝐫𝐚 𝐛𝐮𝐬𝐜𝐚𝐫 𝐧𝐮𝐦𝐞𝐫𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨 𝐝𝐞 𝐞𝐬𝐞 𝐩𝐚𝐢𝐬, 𝐄𝐣𝐞𝐦𝐩𝐥𝐨: ${usedPrefix + command} 52*`);
const lol = args[0].replace(/[+]/g, '');
const ps = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol || lol));
const bot = global.db.data.settings[conn.user.jid] || {};
if (ps == '') return m.reply(`*⚠️ 𝐄𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨 𝐧𝐨 𝐡𝐚𝐲 𝐧𝐢𝐧𝐠𝐮𝐧 𝐧𝐮𝐦𝐞𝐫𝐨 𝐜𝐨𝐧 𝐞𝐥 𝐩𝐫𝐞𝐟𝐢𝐣𝐨:* [+${lol}]`);
const numeros = ps.map((v)=> '⭔ @' + v.replace(/@.+/, ''));
const delay = (time) => new Promise((res)=>setTimeout(res, time));

switch (command) {
case 'listanum': case 'listnum':
conn.reply(m.chat, `*𝐋𝐢𝐬𝐭𝐚 𝐝𝐞 𝐧𝐮𝐦𝐞𝐫𝐨 𝐜𝐨𝐧 𝐞𝐥 𝐩𝐫𝐞𝐟𝐢𝐣𝐨 +${lol} 𝐪𝐮𝐞 𝐞𝐬𝐭𝐚𝐧 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨:*\n\n` + numeros.join`\n`, m, {mentions: ps});
break;
case 'kicknum':
if (!bot.restrict) return m.reply('*⚠️ El propietario del bot tiene desactivo el restrict, contacte con el para que lo habilite:* #on restrict');
if (!isBotAdmin) return m.reply('*⚠️ Pinche pendejo, el bot no es admins, hazme admins para poder usar este comando inútil**');
conn.reply(m.chat, `*⚠️ 𝐈𝐧𝐢𝐜𝐢𝐚𝐧𝐝𝐨 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐜𝐢𝐨𝐧 𝐝𝐞 𝐧𝐮𝐦𝐞𝐫𝐨𝐬 𝐜𝐨𝐧 𝐞𝐥 𝐩𝐫𝐞𝐟𝐢𝐣𝐨: +${lol}, 𝐜𝐚𝐝𝐚 10 𝐬𝐞𝐠𝐮𝐧𝐝𝐨𝐬 𝐬𝐞 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐫𝐚 𝐚 𝐮𝐧 𝐮𝐬𝐮𝐚𝐫𝐢𝐨*`, m);
const ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
const users = participants.map((u) => u.id).filter((v) => v !== conn.user.jid && v.startsWith(lol || lol));
for (const user of users) {
const error = `@${user.split('@')[0]} ʏᴀ ʜᴀ sɪᴅᴏ ᴇʟɪᴍɪɴᴀᴅᴏ ᴏ ʜᴀ ᴀʙᴀɴᴅᴏɴᴀᴅᴏ ᴇʟ ɢʀᴜᴘᴏ*`;
if (user !== ownerGroup + '@s.whatsapp.net' && user !== global.conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) {
await delay(2000);
const responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
if (responseb[0].status === '404') m.reply(error, m.chat, {mentions: conn.parseMention(error)});
await delay(10000);
} else return m.reply('*[❗] 𝙴𝚁𝚁𝙾𝚁*')}
break;
}};
handler.command = /^(listanum|kicknum|listnum)$/i;
handler.group = handler.botAdmin = handler.admin = true;
handler.fail = null;
export default handler;

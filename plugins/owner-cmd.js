const handler = async (m, {conn, text, usedPrefix, command}) => {
global.db.data.sticker = global.db.data.sticker || {};
  
if (command == 'addcmd' || command == 'setcmd') {  
if (!m.quoted) throw '⚠️ ʀᴇsᴘᴏɴᴅᴇ ᴀʟ ᴜɴ sᴛɪᴄᴋᴇʀ ᴏ ɪᴍᴀɢᴇɴ ᴀʟ ᴄᴜᴀʟ ᴅᴇsᴇᴀ ᴀɢʀᴇɢᴀʀ ᴜɴ ᴄᴏᴍᴀɴᴅᴏ ᴏ ᴛᴇxᴛᴏ';
if (!m.quoted.fileSha256) throw '⚠️ sᴏʟᴏ ᴘᴜᴇᴅᴇs ᴀsɪɢɴᴀʀᴀʀ ᴄᴏᴍᴀɴᴅᴏs ᴏ ᴛᴇxᴛᴏs ᴀ sᴛɪᴄᴋᴇʀ ᴇ ɪᴍᴀɢᴇɴ*';
if (!text) throw `*⚠️ ʀᴇsᴘᴏɴᴅᴇ ᴀʟ ᴜɴ sᴛɪᴄᴋᴇʀ ᴏ ɪᴍᴀɢʀɴ ᴀʟ ᴄᴜᴀʟ ᴅᴇsᴇᴀ ᴀɢʀᴇɢᴀʀ ᴜɴ ᴄᴏᴍᴀɴᴅᴏ ᴏ ᴛᴇxᴛᴏ*\n*• ᴇᴊᴇᴍᴘʟᴏ:* ${usedPrefix + command} <texto> <responder a sticker o imagen`;
const sticker = global.db.data.sticker;
const hash = m.quoted.fileSha256.toString('base64');
if (sticker[hash] && sticker[hash].locked) throw '⚠️ ᴛᴜ ᴏ̨ᴜɪᴇɴ ᴄᴀʀᴀᴊᴏ ᴇʀᴇs? 🧐, sᴏʟᴏ ᴍɪ ᴊᴇғᴇ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ*';
sticker[hash] = {text, mentionedJid: m.mentionedJid, creator: m.sender, at: + new Date, locked: false};
m.reply(`*✅ ᴇʟ ᴛᴇxᴛᴏ/ᴄᴏᴍᴀɴᴅᴏ ᴀsɪɢɴᴀᴅᴏ ᴀʟ sᴛɪᴄᴋᴇʀ/ɪᴍᴀɢᴇɴ ғᴜᴇ ᴀɢʀᴇɢᴀᴅᴏ ᴀ ʟᴀ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ*`);
m.react("✅") 
};

if (command == 'delcmd') {  
let hash = text;
if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex');
if (!hash) throw `*[❗𝐈𝐍𝐅𝐎❗] 𝚂𝙾𝙻𝙾 𝚂𝙴 𝙿𝚄𝙴𝙳𝙴𝙽 𝙰𝚂𝙸𝙶𝙽𝙰𝚁 𝚃𝙴𝚇𝚃𝙾𝚂 𝙾 𝙲𝙾𝙼𝙰𝙽𝙳𝙾𝚂 𝙰𝚂𝙸𝙶𝙽𝙰𝙳𝙾𝚂 𝙰 𝚂𝚃𝙸𝙲𝙺𝙴𝚁𝚂 𝙾 𝙸𝙼𝙰𝙶𝙴𝙽𝙴𝚂, 𝙿𝙰𝚁𝙰 𝙾𝙱𝚃𝙴𝙽𝙴𝚁 𝙴𝙻 𝙲𝙾𝙳𝙸𝙶𝙾 𝙰𝚂𝙸𝙶𝙽𝙰𝙳𝙾 𝚄𝚂𝙴 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 ${usedPrefix}listcmd*`;
  const sticker = global.db.data.sticker;
if (sticker[hash] && sticker[hash].locked) throw '⚠️ ᴛᴜ ᴏ̨ᴜɪᴇɴ ᴄᴀʀᴀᴊᴏ ᴇʀᴇs? 🧐, sᴏʟᴏ ᴍɪ ᴊᴇғᴇ ᴘᴜᴇᴅᴇ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ*';
delete sticker[hash];
m.reply(`*✅ ᴇʟ ᴛᴇxᴛᴏ/ᴄᴏᴍᴀɴᴅᴏ ᴀsɪɢɴᴀᴅᴏ ᴀʟ sᴛɪᴄᴋᴇʀ/ɪᴍᴀɢᴇɴ ғᴜᴇ ᴇʟɪᴍɪɴᴀᴅᴏ ᴅᴇ ʟᴀ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ*`);
}

if (command == 'listcmd' || command == 'cmdlist') {  
conn.reply(m.chat, `*< 𝘓𝘐𝘚𝘛𝘈 𝘋𝘌 𝘊𝘖𝘔𝘈𝘕𝘋𝘖𝘚 / 𝘛𝘌𝘟𝘛𝘖𝘚 𝘈𝘚𝘐𝘎𝘈𝘕𝘋𝘖𝘚 />*

${Object.entries(global.db.data.sticker).map(([key, value], index) => `*${index + 1}.-*\n*ᴄᴏᴅɪɢᴏ:* ${value.locked ? `_*(ʙʟᴏǫᴜᴇᴀᴅᴏ)*_ ${key}` : key}\n*ᴄᴏᴍᴀɴᴅᴏ/ᴛᴇxᴛᴏ:* ${value.text}`).join('\n\n')}
`.trim(), null, {mentions: Object.values(global.db.data.sticker).map((x) => x.mentionedJid).reduce((a, b) => [...a, ...b], [])});
}}
handler.help = ['addcmd', 'delcmd', 'listcmd']
handler.tags = ['owner']
handler.command = ['setcmd', 'addcmd', 'cmdadd', 'cmdset', 'delcmd', 'listcmd', 'cmdlist'];
handler.rowner = true;
export default handler;

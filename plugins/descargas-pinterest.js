import {pinterest} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw `*⚠️ Ejemplo:* ${usedPrefix + command} Loli`;
  const json = await pinterest(text);
conn.sendButton(m.chat, `🔎 𝐑𝐞𝐬𝐮𝐥𝐭𝐚𝐝𝐨𝐬 𝐝𝐞: ${text}`, botname, json.getRandom(), [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command} ${text}`]], null, null, m)   
//conn.sendFile(m.chat, json.getRandom(), 'error.jpg', `*𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂 𝙳𝙴 𝙻𝙰 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰*${text}`.trim(), m);
};
handler.help = ['pinterest <keyword>'];
handler.tags = ['buscadores'];
handler.command = /^(pinterest)$/i;
handler.register = true 
handler.limit = 1
export default handler;

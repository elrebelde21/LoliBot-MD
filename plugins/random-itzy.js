import axios from 'axios';
const handler = async (m, {conn, args, usedPrefix, command}) => {
  const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/itzy.json`)).data;
  const mystic = await res[Math.floor(res.length * Math.random())];
conn.sendButton(m.chat, `_${command}_`, botname, mystic, [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m) 
//conn.sendFile(m.chat, mystic, 'error.jpg', `_${command}_`, m);
};
// conn.sendButton(m.chat, `_${command}_`, author, mystic, [['🔄 𝚂𝙸𝙶𝚄𝙸𝙴𝙽𝚃𝙴 🔄', `/${command}`]], m)}
handler.help = ['itzy', 'kpopitzy'];
handler.tags = ['randow'];
handler.command = /^(itzy|kpopitzy)$/i;
handler.register = true
handler.limit = 1
export default handler;

import fetch from 'node-fetch';
const handler = async (m, {conn, command}) => {
  const ne = await (await fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/anime/neko.txt')).text();
  const nek = ne.split('\n');
  const neko = await nek[Math.floor(Math.random() * nek.length)];
  if (neko == '') throw 'Error';
  conn.sendButton(m.chat, '*💖 Nyaww 💖*', botname, neko, [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m)   
//conn.sendFile(m.chat, neko, 'error.jpg', `Nyaww~ 🐾💗`, m);
};
// conn.sendButton(m.chat, 'Nyaww~ 🐾💗', wm, neko, [['🔄 𝚂𝙸𝙶𝚄𝙸𝙴𝙽𝚃𝙴 🔄', `/${command}`]],m)}
handler.command = /^(neko)$/i;
handler.help = ['neko'];
handler.tags = ['randow'];
handler.register = true
//handler.limit = 1
export default handler;

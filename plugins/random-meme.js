/*   Creditos - ig : https://www.instagram.com/fg98._/    */
import hispamemes from 'hispamemes';
const handler = async (m, {command, conn}) => {
  const url = await hispamemes.meme();
  //conn.sendFile(m.chat, url, 'error.jpg', `_🤣 ${command} 🤣_`, m)
conn.sendButton(m.chat, `_🤣 ${command} 🤣_`, botname, url, [['😂 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 😂', `/${command}`]], null, null, m)     
};
// conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['🔄 𝚂𝙸𝙶𝚄𝙸𝙴𝙽𝚃𝙴 🔄', `/${command}`]], m)}
handler.help = ['memes'];
handler.tags = ['randow'];
handler.command = /^(meme|memes)$/i;
handler.register = true
//handler.limit = 1
export default handler;

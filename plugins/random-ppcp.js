import fetch from 'node-fetch';
const handler = async (m, {
  conn,
  command,
}) => {
  const res = await fetch(`https://api.lolhuman.xyz/api/random/ppcouple?apikey=${lolkeysapi}`);
  if (res.status != 200) throw await res.text();
  const json = await res.json();
  if (!json.status) throw json;
  //conn.sendFile(m.chat, json.result.female, 'error.jpg', `𝙲𝙷𝙸𝙲𝙰 𝙲𝚄𝚃𝙴`, m);
  conn.sendButton(m.chat, '𝘾𝙃𝙄𝘾𝘼 ✨', wm, json.result.female, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `/${command}`]], null, null, m)
//conn.sendFile(m.chat, json.result.male, 'error.jpg', `𝘾𝙃𝙄𝘾𝙊 ✨`, m)
conn.sendButton(m.chat, '𝘾𝙃𝙄𝘾𝙊 ✨', wm, json.result.male, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `/${command}`]], null, null, m)
};
handler.help = ['ppcouple'];
handler.tags = ['randow'];
handler.command = /^(ppcp|ppcouple)$/i;
handler.register = true
handler.limit = 1
export default handler;

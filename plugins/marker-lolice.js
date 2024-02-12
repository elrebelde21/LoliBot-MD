const handler = async (m, {conn}) => {
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
try {
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/lolice', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
  }), 'error.png', '*LLAMEN A LA POLICÍA!! 😱*', m);
} catch (e) {
console.log(e)}}
handler.help = ['lolice'];
handler.tags = ['maker'];
handler.command = /^(lolice)$/i;
handler.register = true
export default handler;

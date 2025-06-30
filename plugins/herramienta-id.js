let handler = async (m, { conn, text, isOwner }) => {
let USER_ID = m.user.lid 
conn.fakeReply(m.chat, USER_ID, '0@s.whatsapp.net', `👇 AQUI ESTA TU NUMERO OCULTO "LID" 👇`, 'status@broadcast')
//m.reply(USER_ID)
}
handler.help = ['mylid'];
handler.tags = ['tools'];
handler.command = /^mylid$/i;

export default handler;

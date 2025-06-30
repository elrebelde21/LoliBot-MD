const handler = async (m, {conn}) => {
const revoke = await conn.groupRevokeInvite(m.chat);
await conn.reply(m.chat, `*_Se restableció con éxito el link del grupo._*\n*• Link Nuevo:* ${'https://chat.whatsapp.com/' + revoke}`, m);
};
handler.help = ['resetlink']
handler.tags = ['group']
handler.command = ['resetlink', 'revoke'];
handler.botAdmin = true;
handler.admin = true;
handler.group = true;
handler.register = true 
export default handler;

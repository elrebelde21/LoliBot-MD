const handler = async (m, {conn, text, isROwner, isOwner}) => {
if (text) {
global.db.data.chats[m.chat].sBye = text;
m.reply(`*⚠️ ${await tr("Mensaje de despedida configurado correctamente para este grupo")}*`);
} else throw `*⚠️ ${await tr("Ingrese el mensaje de despedida que desee agregar, use:")}*\n*- @user (mención)*`;
};
handler.help = ['setbye <text>'];
handler.tags = ['group'];
handler.command = ['setbye'];
handler.admin = true;
handler.register = true 
export default handler;

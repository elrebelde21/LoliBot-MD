const handler = async (m, {conn, text, isROwner, isOwner}) => {
if (text) {
global.db.data.chats[m.chat].sWelcome = text;
m.reply(`*✅ ${await tr("Mensaje de Bienvenida configurado correctamente para este grupo")}*`);
} else throw `*⚠️ ${await tr("Ingrese el mensaje de bienvenida que desee agregar, use:")}*\n*- @user (mención)*\n*- @group (nombre de grupo)*\n*- @desc (description de grupo)*`;
};
handler.help = ['setwelcome <text>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.admin = true;
handler.register = true 
export default handler;

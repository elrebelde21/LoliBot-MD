const handler = async (m, {conn, text, isROwner, isOwner}) => {
if (text) {
global.db.data.chats[m.chat].sWelcome = text;
m.reply('*✅ 𝐌𝐞𝐧𝐬𝐚𝐣𝐞 𝐝𝐞 𝐛𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐚 𝐜𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐝𝐨 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞 𝐩𝐚𝐫𝐚 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨*');
} else throw `*⚠️ 𝐢𝐧𝐠𝐫𝐞𝐬𝐞 𝐞𝐥 𝐦𝐞𝐧𝐬𝐚𝐣𝐞 𝐝𝐞 𝐛𝐢𝐞𝐧𝐯𝐞𝐧𝐢𝐝𝐚 𝐪𝐮𝐞 𝐝𝐞𝐬𝐞𝐞 𝐚𝐠𝐫𝐞𝐠𝐚𝐫, 𝐮𝐬𝐞:*\n*- @user (mención)*\n*- @group (nombre de grupo)*\n*- @desc (description de grupo)*`;
};
handler.help = ['setwelcome <text>'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.admin = true;
handler.register = true 
export default handler;

const handler = async (m, {text}) => {
const user = global.db.data.users[m.sender];
user.afk = + new Date;
user.afkReason = text;
m.reply(`『 ＡＦＫ 』

> ᴇsᴛᴇ ᴜsᴜᴀʀɪᴏ : ${conn.getName(m.sender)} ᴇsᴛᴀ ɪɴᴀᴄᴛɪᴠᴏ. 

\`💤 ＮＯ ＬＯＳ ＥＴＩＱＵＥＴＥ 💤\`
*☣️ ᴍᴏᴛɪᴠᴏs :* ${text ? ': ' + text : 'paja'}`);
};
handler.help = ['afk [alasan]'];
handler.tags = ['econ'];
handler.command = /^afk$/i;
handler.money = 75
handler.register = true
export default handler;

export function before(m) {
const user = global.db.data.users[m.sender];
if (user.afk > -1) {
m.reply(`『 ＤＥＪＡＳＴＥ ＤＥ ＥＳＴＡ ＡＦＫ 』

${user.afkReason ? '*🔸️ ʀᴀᴢᴏɴ :* ' + user.afkReason : ''}*
*🔸 ᴇsᴛᴜᴠᴏ ɪɴᴀᴄᴛɪᴠᴏ ᴅᴜʀᴀɴᴛᴇ:* ${(new Date - user.afk).toTimeString()}*`.trim());
user.afk = -1;
user.afkReason = '';
}
const jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
for (const jid of jids) {
const user = global.db.data.users[jid];
if (!user) {
continue;
}
const afkTime = user.afk;
if (!afkTime || afkTime < 0) {
continue;
}
const reason = user.afkReason || '';
m.reply(`『 💤 ＮＯ ＬＯＳ ＥＴＩＱＵＥＴＥ 💤 』
> *ᴇsᴛᴇ ᴜsᴜᴀʀɪᴏ ǫᴜᴇ ᴍᴇɴᴄɪᴏɴᴀs ᴇsᴛᴀ ᴀғᴋ*

*🔸 ${reason ? 'ᴍᴏᴛɪᴠᴏ ᴅᴇ ɪɴᴀᴄᴛɪᴠɪᴅᴀᴅ (ᴀғᴋ): ' + reason : 'ᴍᴏᴛɪᴠᴏ ᴅᴇ ɪɴᴀᴄᴛɪᴠɪᴅᴀᴅ (ᴀғᴋ): Paja xD\n> _El usuario no especificó un motivo_'}*
*🔸 ᴛɪᴇᴍᴘᴏ ᴛʀᴀɴsᴄᴜʀʀɪᴅᴏ ᴅᴇ ɪɴᴀᴄᴛɪᴠɪᴅᴀᴅ (ᴀғᴋ): ${(new Date - afkTime).toTimeString()}*`.trim());
}
return true;
}

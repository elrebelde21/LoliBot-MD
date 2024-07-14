export function before(m) {
  const user = global.db.data.users[m.sender];
  if (user.afk > -1) {
    m.reply(`╭━─━─━─≪☣️≫─━─━─━╮
┃𝙳𝙴𝙹𝙰𝚂𝚃𝙴 𝙳𝙴 𝙴𝚂𝚃𝙰 𝙰𝙵𝙺
┃${user.afkReason ? '🔸️ *𝚁𝙰𝚉𝙾𝙽 :* ' + user.afkReason : ''}*
┃🔸 *𝙴𝚂𝚃𝚄𝚅𝙾 𝙸𝙽𝙰𝙲𝚃𝙸𝚅𝙾 𝙳𝚄𝚁𝙰𝙽𝚃𝙴* ${(new Date - user.afk).toTimeString()}*
╰━─━─━─≪☣️≫─━─━─━╯ `.trim());
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
    m.reply(`💤 𝙽𝙾 𝙻𝙾𝚂 𝙴𝚃𝙸𝚀𝚄𝙴𝚃𝙴 💤
𝙴𝚜𝚝𝚎 𝚞𝚜𝚞𝚊𝚛𝚒𝚘 𝚚𝚞𝚎 𝚖𝚎𝚗𝚌𝚒𝚘𝚗𝚊𝚜 𝚎𝚜𝚝𝚊 𝙰𝙵𝙺 

*🔸 ${reason ? '𝙼𝙾𝚃𝙸𝚅𝙾 𝙳𝙴 𝙸𝙽𝙰𝙲𝚃𝙸𝚅𝙸𝙳𝙰𝙳 (𝙰𝙵𝙺): ' + reason : '𝙼𝙾𝚃𝙸𝚅𝙾 𝙳𝙴 𝙸𝙽𝙰𝙲𝚃𝙸𝚅𝙸𝙳𝙰𝙳 (𝙰𝙵𝙺): _𝙴𝙻 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙽𝙾 𝙴𝚂𝙿𝙴𝙲𝙸𝙵𝙸𝙲𝙾 𝚄𝙽 𝙼𝙾𝚃𝙸𝚅𝙾_'}*
*🔸 𝚃𝙸𝙴𝙼𝙿𝙾 𝚃𝚁𝙰𝙽𝚂𝙲𝚄𝚁𝚁𝙸𝙳𝙾 𝙳𝙴 𝙸𝙽𝙰𝙲𝚃𝙸𝚅𝙸𝙳𝙰𝙳 (𝙰𝙵𝙺): ${(new Date - afkTime).toTimeString()}*
  `.trim());
  }
  return true;
}

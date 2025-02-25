const handler = async (m, { conn, text }) => {
const user = global.db.data.users[m.sender];
user.afk = +new Date();
user.afkReason = text || 'paja';
user.afkStart = true; 
return conn.fakeReply(m.chat, `『 ＡＦＫ 』

> ᴇʟ ᴜsᴜᴀʀɪᴏ ${conn.getName(m.sender)} ᴇsᴛᴀ ɪɴᴀᴄᴛɪᴠᴏ. 

\`💤 ＮＯ ＬＯＳ ＥＴＩＱＵＥＴＥ 💤\`
*☣️ ᴍᴏᴛɪᴠᴏs :* ${user.afkReason}`, m.sender, `💤 NO MOLESTAR 💤`, 'status@broadcast', null, fake)
/*conn.reply(m.chat, `『 ＡＦＫ 』

> ᴇʟ ᴜsᴜᴀʀɪᴏ ${conn.getName(m.sender)} ᴇsᴛá ɪɴᴀᴄᴛɪＶＯ.

\`💤 ＮＯ ＬＯＳ ＥＴＩＱＵＥＴＥＮ 💤\`
*☣️ ᴍᴏᴛɪᴠᴏ :* ${user.afkReason}`, m);*/
};

async function before(m, { conn }) {
const user = global.db.data.users[m.sender];

if (user?.afk > -1 && !user.afkStart) {
const tiempoAFK = new Date() - user.afk;
conn.reply(m.chat, `『 ＤＥＪＡＳＴＥ ＤＥ ＥＳＴＡＲ ＡＦＫ 』

${user.afkReason ? '*🔸 ʀᴀᴢᴏɴ:* ' + user.afkReason : ''}
*🔸 ᴇsᴛᴜᴠɪsᴛᴇ ɪɴᴀᴄᴛɪᴠᴏ ᴅᴜʀᴀɴᴛᴇ:* ${msToTime(tiempoAFK)}`.trim(), m);
user.afk = -1;
user.afkReason = '';
}

user.afkStart = false; 
const mencionados = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
for (const jid of mencionados) {
const mencionado = global.db.data.users[jid];
if (!mencionado || mencionado.afk < 0) continue;

const afkTime = new Date() - mencionado.afk;
const reason = mencionado.afkReason || 'Sin motivo';
conn.fakeReply(m.chat, `『 💤 ＮＯ ＬＯＳ ＥＴＩＱＵＥＴＥ 💤 』

> *ᴇʟ ᴜsᴜᴀʀɪᴏ ǫᴜᴇ ᴍᴇɴᴄɪᴏɴᴀs ᴇsᴛᴀ ᴀғᴋ*

*🔸 Motivo:* ${reason}
*🔸 ᴛɪᴇᴍᴘᴏ ᴛʀᴀɴsᴄᴜʀʀɪᴅᴏ ᴅᴇ ɪɴᴀᴄᴛɪᴠɪᴅᴀᴅ (ᴀғᴋ): ${msToTime(afkTime)}*`, "0@s.whatsapp.net", `💤 NO MOLESTAR 💤`, 'status@broadcast', null, fake)
}
}
handler.help = ['afk [razón]'];
handler.tags = ['econ'];
handler.command = /^afk$/i;
handler.money = 95;
handler.register = true;
handler.before = before;

export default handler;

function msToTime(ms) {
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}h ${minutes}m ${seconds}s`;
}
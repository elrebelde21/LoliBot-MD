const handler = async (m, { conn, text }) => {
const user = global.db.data.users[m.sender];
user.afk = +new Date();
user.afkReason = text || 'paja';
user.afkStart = true; 
return conn.fakeReply(m.chat, `『 ＡＦＫ 』

> ${await tr("El usuario")} ${conn.getName(m.sender)} ${await tr("esta inactivo")} 

\`💤 ${await tr("NO LOS ETIQUETE")} 💤\`
*☣️ ${await tr("Motivos")} :* ${user.afkReason}`, m.sender, `💤 ${await tr("NO MOLESTAR")} 💤`, 'status@broadcast', null, fake)
/*conn.reply(m.chat, `『 ＡＦＫ 』

> ᴇʟ ᴜsᴜᴀʀɪᴏ ${conn.getName(m.sender)} ᴇsᴛá ɪɴᴀᴄᴛɪＶＯ.

\`💤 ＮＯ ＬＯＳ ＥＴＩＱＵＥＴＥＮ 💤\`
*☣️ ᴍᴏᴛɪᴠᴏ :* ${user.afkReason}`, m);*/
};

async function before(m, { conn }) {
const user = global.db.data.users[m.sender];

if (user?.afk > -1 && !user.afkStart) {
const tiempoAFK = new Date() - user.afk;
conn.reply(m.chat, `『 ${await tr("DEJASTE DE ESTA AFK")} 』

${user.afkReason ? `*🔸 ${await tr("Razon")}:* ` + user.afkReason : ''}
*🔸 ${await tr("Estuviste inactivo durante")}:* ${msToTime(tiempoAFK)}`.trim(), m);
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
conn.fakeReply(m.chat, `『 💤 ${await tr("NO LOS ETIQUETE")}  💤 』

> *${await tr("El usuario que mencionas esta afk")}*

*🔸 ${await tr("Motivo")}:* ${reason}
*🔸 ${await tr("Tiempo transcurrido de inactividad (afk)")}: ${msToTime(afkTime)}*`, "0@s.whatsapp.net", `💤 ${await tr("NO MOLESTAR")}  💤`, 'status@broadcast', null, fake)
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
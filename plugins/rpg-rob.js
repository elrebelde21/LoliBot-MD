const ro = 3000;

const handler = async (m, { conn, usedPrefix, command }) => {
const now = Date.now();
const resRobber = await m.db.query('SELECT exp, lastrob FROM usuarios WHERE id = $1', [m.sender]);
const robber = resRobber.rows[0];
const cooldown = 3600000;
const timeLeft = (robber.lastrob ?? 0) + cooldown - now;
if (timeLeft > 0) return m.reply(`🚓 La policía está vigilando, vuelve en: *${msToTime(timeLeft)}*`);

let who;
if (m.isGroup) {
who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted?.sender;
} else {
who = m.chat;
}

if (!who) return conn.reply(m.chat, `⚠️ *Etiqueta a un usuario para robarle XP*`, m);
if (who === m.sender) return m.reply(`❌ No puedes robarte a ti mismo.`);
const resVictim = await m.db.query('SELECT exp FROM usuarios WHERE id = $1', [who]);
const victim = resVictim.rows[0];
if (!victim) return m.reply(`❌ El usuarios no se encuentra en mi base de datos.`);

const cantidad = Math.floor(Math.random() * ro);
if ((victim.exp ?? 0) < cantidad) return conn.reply(m.chat, `@${who.split('@')[0]} tiene menos de ${ro} XP.\n> No robes a un pobre v:`, m, { mentions: [who] });
await m.db.query('UPDATE usuarios SET exp = exp + $1, lastrob = $2 WHERE id = $3', [cantidad, now, m.sender]);
await m.db.query('UPDATE usuarios SET exp = exp - $1 WHERE id = $2', [cantidad, who]);
return conn.reply(m.chat, `*Robaste ${cantidad} XP a @${who.split('@')[0]}*`, m, { mentions: [who] });
};
handler.help = ['rob', 'robar'];
handler.tags = ['econ'];
handler.command = /^(robar|rob)$/i;
handler.register = true;

export default handler;

function msToTime(duration) {
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  return `${hours} Hora(s) ${minutes} Minuto(s)`;
}

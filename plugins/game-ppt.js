const cooldown = 30_000;
const retos = new Map();
const jugadas = new Map();
const cooldowns = new Map();
const jugadasValidas = ['piedra', 'papel', 'tijera'];

let handler = async (m, { conn, args, usedPrefix, command }) => {
const now = Date.now();
const userId = m.sender;
const cooldownRestante = (cooldowns.get(userId) || 0) + cooldown - now;
if (cooldownRestante > 0) return conn.fakeReply(m.chat, `*🕓 𝙃𝙚𝙮, 𝙀𝙨𝙥𝙚𝙧𝙖 ${msToTime(cooldownRestante)} 𝙖𝙣𝙩𝙚𝙨 𝙙𝙚 𝙪𝙨𝙖𝙧 𝙤𝙩𝙧𝙤𝙨 𝙘𝙤𝙢𝙖𝙣𝙙𝙤*`, m.sender, `ᴺᵒ ʰᵃᵍᵃⁿ ˢᵖᵃᵐ`, 'status@broadcast');

const res = await m.db.query('SELECT exp FROM usuarios WHERE id = $1', [userId]);
const user = res.rows[0];;
const opponent = m.mentionedJid?.[0];
const input = args[0]?.toLowerCase();

if (!opponent && jugadasValidas.includes(input)) {
cooldowns.set(userId, now);
const botJugada = jugadasValidas[Math.floor(Math.random() * 3)];
const resultado = evaluar(input, botJugada);
const xp = Math.floor(Math.random() * 2000) + 500;

let text = '';
let result = "";
if (resultado === 'gana') {
await m.db.query('UPDATE usuarios SET exp = exp + $1 WHERE id = $2', [xp, userId]);
text += `✅ *Ganaste* y obtuviste *${formatNumber(xp)} XP*`;
result = '𝙃𝘼 𝙂𝘼𝙉𝘼𝘿𝙊! 🎉';
} else if (resultado === 'pierde') {
const nuevaXP = Math.max(0, user.exp - xp);
await m.db.query('UPDATE usuarios SET exp = $1 WHERE id = $2', [nuevaXP, userId]);
text += `❌ *Perdiste*. Te quitaron *${formatNumber(xp)} XP*`;
result = '𝙃𝘼 𝙋𝙀𝙍𝘿𝙄𝘿𝙊! 🤡';
} else {
result = '𝙀𝙈𝙋𝘼𝙏𝙀 🤝';
text += `🤝 *Empate*. No ganaste ni perdiste XP.`;
}

return m.reply(`\`「 ${result} 」\`\n\n👉 El Bot: ${botJugada}\n👉 Tú: ${input}\n` + text);
}

if (opponent) {
if (retos.has(opponent)) return m.reply('⚠️ Ese usuario ya tiene un reto pendiente.');
retos.set(opponent, {
retador: userId,
chat: m.chat,
timeout: setTimeout(() => {
retos.delete(opponent);
conn.reply(m.chat, `⏳ 𝙏𝙄𝙀𝙈𝙋𝙊 𝘼𝙂𝙊𝙏𝘼𝘿𝙊, 𝙀𝙇 𝙋𝙑𝙋 𝙎𝙀 𝘾𝘼𝙉𝘾𝙀𝙇𝘼 𝙋𝙊𝙍 𝙁𝘼𝙇𝙏𝘼 𝘿𝙀 𝙍𝙀𝙎𝙋𝙐𝙀𝙎𝙏𝘼 𝘿𝙀 ${opponent.split('@')[0]}`, m, { mentions: [opponent] });
}, 60000)
});

return conn.reply(m.chat, `🎮👾 𝙋𝙑𝙋 - 𝙋𝙄𝙀𝘿𝙍𝘼, 𝙋𝘼𝙋𝙀𝙇 𝙊 𝙏𝙄𝙅𝙀𝙍𝘼 👾🎮\n\n@${m.sender.split`@`[0]} 𝘿𝙀𝙎𝘼𝙁𝙄𝘼 𝘼 @${opponent.split('@')[0]}.\n\n> _*Escribe (aceptar) para aceptar*_\n> _*Escribe (rechazar) para rechazar*_`, m, { mentions: [opponent] });
}

m.reply(`𝐏𝐢𝐞𝐝𝐫𝐚 🗿, 𝐏𝐚𝐩𝐞𝐥 📄 𝐨 𝐓𝐢𝐣𝐞𝐫𝐚 ✂️\n\n👾 𝙅𝙪𝙜𝙖𝙧 𝙘𝙤𝙣 𝙚𝙡 𝙗𝙤𝙩:\n• ${usedPrefix + command} piedra\n• ${usedPrefix + command} papel\n• ${usedPrefix + command} tijera\n\n🕹 𝙅𝙪𝙜𝙖𝙧 𝙘𝙤𝙣 𝙪𝙣 𝙪𝙨𝙪𝙖𝙧𝙞𝙤:\n${usedPrefix + command} @0`);
};

handler.before = async (m, { conn }) => {
const text = m.originalText?.toLowerCase();
const userId = m.sender;
if (['aceptar', 'rechazar'].includes(text) && retos.has(userId)) {
const { retador, chat, timeout } = retos.get(userId);
clearTimeout(timeout);
retos.delete(userId);

if (text === 'rechazar') {
return conn.reply(chat, `⚠️ @${userId.split('@')[0]} rechazó el reto.`, m, { mentions: [userId, retador] });
}

jugadas.set(chat, {
jugadores: [retador, userId],
eleccion: {},
timeout: setTimeout(() => {
jugadas.delete(chat);
conn.reply(chat, `⏰ El duelo expiró por inactividad.`, m);
}, 60000)
});

conn.reply(chat, `✅ Reto aceptado. Las opciones serán enviadas por privado a @${retador.split('@')[0]} y @${userId.split('@')[0]}.`, m, { mentions: [retador, userId] });

await conn.sendMessage(retador, { text: '✊🖐✌️ Escribe *piedra*, *papel* o *tijera* para elegir tu jugada.' });
await conn.sendMessage(userId, { text: '✊🖐✌️ Escribe *piedra*, *papel* o *tijera* para elegir tu jugada.' });
return;
}

if (jugadasValidas.includes(text)) {
for (const [chat, partida] of jugadas) {
const { jugadores, eleccion, timeout } = partida;
if (!jugadores.includes(userId)) continue;

eleccion[userId] = text;
await conn.sendMessage(userId, { text: '✅ Elección recibida. Vuelve al grupo y espera el resultado.' });

if (Object.keys(eleccion).length < 2) return;
clearTimeout(timeout);
jugadas.delete(chat);

const [j1, j2] = jugadores;
const jugada1 = eleccion[j1];
const jugada2 = eleccion[j2];
const resultado = evaluar(jugada1, jugada2);
const xp = Math.floor(Math.random() * 2000) + 500;
let mensaje = `✊🖐✌️ *Piedra, Papel o Tijera*\n\n@${j1.split('@')[0]} eligió: *${jugada1}*\n@${j2.split('@')[0]} eligió: *${jugada2}*\n\n`;

if (resultado === 'empate') {
mensaje += '🤝 ¡Empate! Nadie gana ni pierde XP.';
} else {
const ganador = resultado === 'gana' ? j1 : j2;
const perdedor = ganador === j1 ? j2 : j1;
await m.db.query('UPDATE usuarios SET exp = exp + $1 WHERE id = $2', [xp * 2, ganador]);
await m.db.query('UPDATE usuarios SET exp = exp - $1 WHERE id = $2', [xp, perdedor]);
mensaje += `🎉 @${ganador.split('@')[0]} gana *${formatNumber(xp * 2)} XP*\n💀 @${perdedor.split('@')[0]} pierde *${formatNumber(xp)} XP*`;
}

return conn.sendMessage(chat, { text: mensaje, mentions: [j1, j2] });
}}
};
handler.help = ['ppt piedra|papel|tijera', 'ppt @usuario'];
handler.tags = ['game'];
handler.command = ['ppt', 'suit', 'pvp', 'suitpvp'];
handler.register = true;

export default handler;

function evaluar(a, b) {
  if (a === b) return 'empate';
  if ((a === 'piedra' && b === 'tijera') || (a === 'tijera' && b === 'papel') || (a === 'papel' && b === 'piedra')) return 'gana';
  return 'pierde';
}

function formatNumber(n) {
  return n.toLocaleString('en').replace(/,/g, '.');
}

function msToTime(ms) {
  const s = Math.floor(ms / 1000) % 60;
  const m = Math.floor(ms / 60000) % 60;
  return `${m ? `${m}m ` : ''}${s}s`;
}

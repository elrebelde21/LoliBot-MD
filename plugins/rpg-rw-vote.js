//Código elaborado por: https://github.com/elrebelde21

async function handler(m, { conn, args }) {
if (!m.db) return 
try {
const characterName = args.join(' ').trim();
if (!characterName) return conn.reply(m.chat, '⚠️ Por favor, especifica el nombre del personaje.', m);

const { rows } = await m.db.query('SELECT timevot FROM usuarios WHERE id = $1', [m.sender]);
const user = rows[0];
const lastVoteTime = user?.timevot || 0;
const cooldown = 1800000; // 30 minutos
const now = Date.now();

if (now - lastVoteTime < cooldown) return m.reply(`Bueno pa 🤚 para con emoción esperar ${msToTime(cooldown - (now - lastVoteTime))} para volver usar este comando`)
const { rows: characters } = await m.db.query('SELECT id, name, price, votes FROM characters WHERE LOWER(name) = $1', [characterName.toLowerCase()]);
const character = characters[0];
if (!character) return conn.reply(m.chat, `⚠️ No se encontró el personaje "${characterName}".`, m);
    
const currentPrice = character.price ?? 0;
const newVotes = (character.votes || 0) + 1;
const increment = Math.floor(Math.random() * 50) + 1;
const newPrice = currentPrice + increment;

await m.db.query('UPDATE characters SET votes = $1, price = $2 WHERE id = $3',
[newVotes, newPrice, character.id]);
await m.db.query('UPDATE usuarios SET timevot = $1 WHERE id = $2', [now, m.sender]);

const formattedPrice = newPrice.toLocaleString();
return conn.reply(m.chat, `✨️ Votaste por el personaje *${character.name}*, su nuevo precio es *${formattedPrice}* (+${increment})`, m);
} catch (e) {
}}
handler.help = ['vote <nombre del personaje>'];
handler.tags = ['gacha'];
handler.command = ['vote'];
handler.register = true;

export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutesStr} min ${secondsStr} seg`;
}
function getRandomColor() {
  const random = Math.random() * 100;
  if (random < 47.5) return 'red';
  if (random < 95) return 'black';
  return 'green';
}

function formatExp(amount) {
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}k (${amount.toLocaleString()})`;
  return amount.toLocaleString();
}

async function handler(m, { conn, args, command, usedPrefix }) {
let user = global.db.data.users[m.sender];
const time = global.db.data.users[m.sender].wait + 30000;
if (new Date - global.db.data.users[m.sender].wait < 30000) return conn.fakeReply(m.chat, await tr(`*🕓 Calma crack 🤚, Espera ${msToTime(time - new Date())} antes de volver usar en comando*`), m.sender, `ᴺᵒ ʰᵃᵍᵃⁿ ˢᵖᵃᵐ`, 'status@broadcast', null, fake);

if (args.length < 2) return conn.reply(m.chat, `⚠️ ${await tr("Formato incorrecto. Usa: ${usedPrefix + command} <color> <cantidad>\n\nEjemplo:")} ${usedPrefix + command} black 100`, m);

const color = args[0].toLowerCase();
const betAmount = parseInt(args[1]);

if (!['red', 'black', 'green'].includes(color)) return conn.reply(m.chat, 'Color no válido. Usa "red", "black" o "green".', m);
if (isNaN(betAmount) || betAmount <= 0) return conn.reply(m.chat, await tr('Cantidad no válida. Debe ser un número positivo.'), m);
if (!user || user.exp < betAmount) return conn.reply(m.chat, await tr('No tienes suficiente exp para apostar.'), m);
const resultColor = getRandomColor();
const isWin = resultColor === color;

let winAmount = 0;
if (isWin) {
if (color === 'green') {
winAmount = betAmount * 14; 
} else {
winAmount = betAmount; 
}}
user.exp = (user.exp || 0) - betAmount + winAmount;
global.db.data.users[m.sender].wait = new Date * 1;
conn.reply(m.chat, await tr(`😱 La ruleta cayó en *${resultColor}* y ${isWin ? 'ganaste' : 'perdiste'} *${formatExp(isWin ? winAmount : betAmount)}* exp.`), m);
}
handler.help = ['rt <color> <cantidad>'];
handler.tags = ['game'];
handler.command = ['rt'];
handler.register = true;

export default handler;

function msToTime(duration) {
const milliseconds = parseInt((duration % 1000) / 100);
let seconds = Math.floor((duration / 1000) % 60);
let minutes = Math.floor((duration / (1000 * 60)) % 60);
let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
hours = (hours < 10) ? '0' + hours : hours;
minutes = (minutes < 10) ? '0' + minutes : minutes;
seconds = (seconds < 10) ? '0' + seconds : seconds;
return seconds + ' segundos ';
}
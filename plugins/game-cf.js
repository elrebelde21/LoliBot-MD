const handler = async (m, {conn, args}) => {
const bet = parseInt(args[0], 10); 
let user = global.db.data.users[m.sender]; 
const time = global.db.data.users[m.sender].wait + 30000;
if (new Date - global.db.data.users[m.sender].wait < 30000) return conn.fakeReply(m.chat,  `*🕓 Calma crack 🤚, Espera ${msToTime(time - new Date())} antes de volver usar en comando*`, m.sender, `ᴺᵒ ʰᵃᵍᵃⁿ ˢᵖᵃᵐ`, 'status@broadcast', null, fake);

if (!bet || bet <= 0) return m.reply('❌ Ingresa una cantidad válida para apostar.');
if (!user || user.exp < bet) return m.reply(`❌ No tienes suficiente experiencia (exp) para esta apuesta. Solo tiene ${user.exp.toLocaleString()} `);

const outcome = Math.random() < 0.5 ? 'cara' : 'cruz'; 
const win = outcome === 'cara'; // 
global.db.data.users[m.sender].wait = new Date * 1;

if (win) {
user.exp += bet; 
m.reply(`🎉 La moneda cayó en *${outcome}* y ganaste *${bet.toLocaleString()}* exp.`);
} else {
user.exp -= bet; 
m.reply(`💀 La moneda cayó en *${outcome}* y perdiste *${bet.toLocaleString()}* exp.`);
}};
handler.help = ['cf <cantidad>'];
handler.tags = ['game'];
handler.command = ['cf']; 
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
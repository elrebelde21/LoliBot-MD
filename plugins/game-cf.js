let handler = async (m, { args }) => {
const bet = parseInt(args[0], 10); 
let user = global.db.data.users[m.sender]; 

if (!bet || bet <= 0) return m.reply('❌ Ingresa una cantidad válida para apostar.');
if (!user || user.exp < bet) return m.reply(`❌ No tienes suficiente experiencia (exp) para esta apuesta. Solo tiene ${user.exp.toLocaleString()} `);

const outcome = Math.random() < 0.5 ? 'cara' : 'cruz'; 
const win = outcome === 'cara'; // 

if (win) {
user.exp += bet; 
m.reply(`🎉 La moneda cayó en *${outcome}* y ganaste *${bet.toLocaleString()}* exp.`);
} else {
user.exp -= bet; 
m.reply(`💀 La moneda cayó en *${outcome}* y perdiste *${bet.toLocaleString()}* exp.`);
}};
handler.help = ['cf <cantidad>'];
handler.tags = ['games'];
handler.command = ['cf']; 
handler.register = true;

export default handler;

const handler = async (m, {isPrems, conn}) => {
const time = global.db.data.users[m.sender].lastcofre + 122400000; //3 dias
if (new Date - global.db.data.users[m.sender].lastcofre < 122400000) throw await tr(`🕛 Ya reclamaste tu cofre vuelve en: *${msToTime(time - new Date())}* Para volver a reclamar`)

const img = 'https://img.freepik.com/vector-gratis/cofre-monedas-oro-piedras-preciosas-cristales-trofeo_107791-7769.jpg?w=2000';
const dia = Math.floor(Math.random() * 30);
const coins = Math.floor(Math.random() * 4000);
const expp = Math.floor(Math.random() * 5000);

global.db.data.users[m.sender].limit += dia;
global.db.data.users[m.sender].money += coins;
global.db.data.users[m.sender].exp += expp;

const texto = `[ 🛒 ${await tr("OBTIENES UN COFRE", "𝐎𝐁𝐓𝐈𝐄𝐍𝐄𝐒 𝐔𝐍 𝐂𝐎𝐅𝐑𝐄")} 🎉 ]
 
* ${dia} ${await tr("Diamantes")} 💎
* ${coins} ${await tr("Coins")} 🪙
* ${expp} ${await tr("Exp")} ⚡`;

await conn.sendMessage(m.chat, { image: { url: img }, caption: texto }, { quoted: { key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { conversation: await tr('🎉 Obtiene un regalo 🎁') }}});
global.db.data.users[m.sender].lastcofre = new Date * 1;
};
handler.help = ['daily'];
handler.tags = ['econ'];
handler.command = ['coffer', 'cofre', 'abrircofre', 'cofreabrir'];
handler.level = 9
handler.register = true
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + ' Horas ' + minutes + ' Minutos';
}

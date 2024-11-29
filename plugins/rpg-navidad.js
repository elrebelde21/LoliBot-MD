import fetch from 'node-fetch'
import axios from 'axios';
let handler = async (m, { isPrems, conn }) => {
const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/navidad.json`)).data;
const defaultImage = 'https://img.freepik.com/vector-gratis/gente-diminuta-enormes-cajas-regalo-ilustracion-vectorial-plana-personas-que-celebran-cumpleanos-envian-o-reciben-regalos-lealtad-o-ideas-brillantes-recompensa-bonificacion-concepto-fiesta_74855-25016.jpg?w=2000';
const tee = (res && res.length > 0) ? res[Math.floor(res.length * Math.random())] : defaultImage;

let user = global.db.data.users[m.sender]
let premium = user.premium

let exp = `${pickRandom([1500, 2000, 2500, 3000, 3500, 4500, 5000, 6300, 7500, 10000])}` * 1
let exppremium = `${pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500])}` * 1
	
let money = `${pickRandom([800, 1500, 2000, 2500, 3000, 3500, 4500, 5500, 6550, 7500])}` * 1
let moneypremium = `${pickRandom([800, 1300, 1600, 1900, 2200, 2500, 2700, 3000, 3300, 3500])}` * 1

let potion = `${pickRandom([1, 2, 3, 4, 5])}` * 1
let potionpremium = `${pickRandom([2, 4, 6, 9, 12])}` * 1

let tiketcoin = `${pickRandom([1, 0, 0, 2, 0])}` * 1
let tiketcoinpremium = `${pickRandom([2, 1, 1, 3, 4])}` * 1

let eleksirb = `${pickRandom([1, 1, 1, 3, 1, 2, 2, 1, 5, 8])}` * 1
let eleksirbpremium = `${pickRandom([3, 3, 5, 3, 8, 3, 4, 4, 10, 7])}` * 1

let umpan = `${pickRandom([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])}` * 1
let umpanpremium = `${pickRandom([30, 60, 90, 120, 150, 180, 210, 240, 270, 300])}` * 1

//let gata = Math.floor(Math.random() * 2000)

const emoticons = {
    exp: '✨',
    money: '💰',
    potion: '🧪',
    tiketcoin: '🎟️',
    eleksirb: '🍷',
    umpan: '🎣'
  };
  
const recompensas = {	
  exp: premium ? exppremium : exp,
  money: premium ? moneypremium : money,
  potion: premium ? potionpremium : potion,
  tiketcoin: premium ? tiketcoinpremium : tiketcoin,	
  eleksirb: premium ? eleksirbpremium : eleksirb,
  umpan: premium ? umpanpremium : umpan,
}

let time = user.lastclaim + 3600000 //3600000 = 1hs
if (new Date - user.lastclaim < 3600000) return await conn.sendMessage(m.chat, { image: { url: tee }, caption: `_*Navidad 🧑‍🎄*_`}, { quoted: { key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { conversation: `🕕 Ya reclamaste tu regalo vuelve en: ${msToTime(time - new Date())}` }}});

let texto = Object.entries(recompensas).map(([key, value]) => {
    if (user[key] !== undefined) {
      user[key] += value;
      return `*+${value}* ${emoticons[key] || '❓'}`;
    }
    return ''; 
  }).join('\n');
  
let text = `
╭━━🎅━🎁━🎅━━⬣
┃ ✨ 𝙊𝘽𝙏𝙄𝙀𝙉𝙀𝙎 𝙐𝙉 𝙍𝙀𝙂𝘼𝙇𝙊!!
┃ ✨ 𝙔𝙊𝙐 𝙂𝙀𝙏 𝘼 𝙂𝙄𝙁𝙏!!
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*
╰━━🎁━☃️━🎅━━⬣`
let selectedImage = [defaultImage, tee].find(url => url);

await conn.sendMessage(m.chat, { image: { url: selectedImage}, caption: `${text}\n${texto}` + `\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}\n${wm}` }, { quoted: { key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { conversation: `🎁 Abrir tu regaló 🎁` }}});
user.lastclaim = new Date * 1
}
handler.help = ['navidad']
handler.tags = ['econ']
handler.command = ['navidad', 'navidad2'] 
handler.fail = null
handler.exp = 0
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return `${hours} Horas ${minutes} Minutos ${seconds} Segundos`;
}



/*import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { isPrems, conn }) => {
  const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/navidad.json`)).data;
  const defaultImage = 'https://img.freepik.com/vector-gratis/gente-diminuta-enormes-cajas-regalo-ilustracion-vectorial-plana-personas-que-celebran-cumpleanos-envian-o-reciben-regalos-lealtad-o-ideas-brillantes-recompensa-bonificacion-concepto-fiesta_74855-25016.jpg?w=2000';
  const tee = (res && res.length > 0) ? res[Math.floor(res.length * Math.random())] : defaultImage;

  let user = global.db.data.users[m.sender];
  let premium = user.premium;

  let exp = pickRandom([1500, 2000, 2500, 3000, 3500, 4500, 5000, 6300, 7500, 10000]);
  let exppremium = pickRandom([1000, 1500, 1800, 2100, 2500, 2900, 3300, 3600, 4000, 4500]);

  let money = pickRandom([800, 1500, 2000, 2500, 3000, 3500, 4500, 5500, 6550, 7500]);
  let moneypremium = pickRandom([800, 1300, 1600, 1900, 2200, 2500, 2700, 3000, 3300, 3500]);

  let potion = pickRandom([1, 2, 3, 4, 5]);
  let potionpremium = pickRandom([2, 4, 6, 9, 12]);

  let tiketcoin = pickRandom([1, 0, 0, 2, 0]);
  let tiketcoinpremium = pickRandom([2, 1, 1, 3, 4]);

  let eleksirb = pickRandom([1, 1, 1, 3, 1, 2, 2, 1, 5, 8]);
  let eleksirbpremium = pickRandom([3, 3, 5, 3, 8, 3, 4, 4, 10, 7]);

  let umpan = pickRandom([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  let umpanpremium = pickRandom([30, 60, 90, 120, 150, 180, 210, 240, 270, 300]);

  const emoticons = {
    exp: '✨',
    money: '💰',
    potion: '🧪',
    tiketcoin: '🎟️',
    eleksirb: '🍷',
    umpan: '🎣'
  };

  const recompensas = {	
    exp: premium ? exppremium : exp,
    money: premium ? moneypremium : money,
    potion: premium ? potionpremium : potion,
    tiketcoin: premium ? tiketcoinpremium : tiketcoin,	
    eleksirb: premium ? eleksirbpremium : eleksirb,
    umpan: premium ? umpanpremium : umpan,
  };

  let time = user.lastclaim + 3600000; // 1 hora en milisegundos
  if (new Date - user.lastclaim < 3600000) {
    return await conn.sendMessage(m.chat, { 
      image: { url: tee }, 
      caption: `_*Navidad 🧑‍🎄*_\n\n🕕 Ya reclamaste tu regalo, vuelve en: ${msToTime(time - new Date())}` 
    }, { quoted: { 
      key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, 
      message: { conversation: `🎁 Abrir tu regaló 🎁` } 
    }});
  }

  let texto = Object.entries(recompensas).map(([key, value]) => {
    if (user[key] !== undefined) {
      user[key] += value;
      return `*+${value}* ${emoticons[key] || '❓'}`;
    }
    return ''; 
  }).join('\n');

  let text = `
╭━━🎅━🎁━🎅━━⬣
┃ ✨ 𝙊𝘽𝙏𝙄𝙀𝙉𝙀𝙎 𝙐𝙉 𝙍𝙀𝙂𝘼𝙇𝙊!!
┃ ✨ 𝙔𝙊𝙐 𝙂𝙀𝙏 𝘼 𝙂𝙄𝙁𝙏!!
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*
╰━━🎁━☃️━🎅━━⬣

🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}
${wm}`;

  let selectedImage = [defaultImage, tee].find(url => url);

  await conn.sendMessage(m.chat, { 
    image: { url: selectedImage }, 
    caption: `${text}\n${texto}` 
  }, { quoted: { 
    key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, 
    message: { conversation: `🎁 Abrir tu regaló 🎁` } 
  }});

  user.lastclaim = new Date * 1;
};

handler.help = ['navidad'];
handler.tags = ['diamantes'];
handler.command = ['navidad', 'navidad2']; 
handler.fail = null;
handler.exp = 0;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  let hours = Math.floor(duration / (1000 * 60 * 60)) % 24,
      minutes = Math.floor(duration / (1000 * 60)) % 60,
      seconds = Math.floor(duration / 1000) % 60;

  return `${hours.toString().padStart(2, '0')} Horas ${minutes.toString().padStart(2, '0')} Minutos ${seconds.toString().padStart(2, '0')} Segundos`;
}
*/
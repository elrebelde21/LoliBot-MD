const free = 5000;
const expIncrease = 1000; 

let handler = async (m, { conn, isPrems }) => {
let user = global.db.data.users[m.sender];
let now = new Date().getTime();
let time = user.lastclaim + 86400000;
if (now - user.lastclaim < 86400000) throw `⚠️ 𝙔𝙖 𝙧𝙚𝙘𝙡𝙖𝙢𝙖𝙨𝙩𝙚 𝙩𝙪 𝙧𝙚𝙜𝙖𝙡𝙤 🎁\n𝙑𝙪𝙚𝙡𝙫𝙚 𝙚𝙣 *${msToTime(time - now)}* 𝙥𝙖𝙧𝙖 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙧𝙚𝙘𝙡𝙖𝙢𝙖𝙧*`;
if (user.lastclaim && now - user.lastclaim < 172800000) { 
user.dailyStreak = (user.dailyStreak || 0) + 1;
} else {
user.dailyStreak = 1;
}
let currentExp = free;
let nextExp = currentExp + expIncrease;
user.exp += currentExp;
user.lastclaim = now;
let text = `*🔸 𝐇𝐀𝐒 𝐑𝐄𝐂𝐈𝐁𝐈𝐃𝐎:* Tu recompensa Diaria de: *${formatNumber(currentExp)} XP* (Día ${user.dailyStreak})\n\n_*Mañana no te olviden de seguir reclamado tu recompensa ganaras: ${formatK(nextExp)} (${formatNumber(nextExp)}) XP*_`
conn.fakeReply(m.chat, text, '13135550002@s.whatsapp.net', `🎁 Obtener un regalo 🎁`, 'status@broadcast', null, fake)    
};
handler.help = ['daily', 'claim'];
handler.tags = ['econ'];
handler.command = ['daily', 'claim'];
handler.register = true;

export default handler;

function msToTime(duration) {
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);

    return `${hours} Horas ${minutes} Minutos`;
}

function formatNumber(num) {
    return num.toLocaleString('en').replace(/,/g, '.'); // Convierte a formato "25,000" → "25.000"
}

function formatK(num) {
    return (num / 1000).toFixed(1) + 'k'; // Convierte 25000 → "25.0k"
}

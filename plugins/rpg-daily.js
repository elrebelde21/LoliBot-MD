const free = 5000;
const expIncrease = 1000;
const bonusExp = 10000;
const bonusLimit = 10;
const bonusMoney = 5000;

const handler = async (m, { conn }) => {
const now = Date.now();
const res = await m.db.query("SELECT exp, limite, money, lastclaim, dailystreak FROM usuarios WHERE id = $1", [m.sender]);
const user = res.rows[0];
const lastClaim = Number(user.lastclaim) || 0;
const streak = Number(user.dailystreak) || 0;
const nextClaimTime = lastClaim + 86400000;
const restante = Math.max(0, nextClaimTime - now);

if (now - lastClaim < 86400000) return m.reply(`⚠️ Ya reclamaste tu recompensa diaria, vuelve en *${msToTime(restante)}* para reclamar de nuevo 🎁.`);

const newStreak = (now - lastClaim < 172800000) ? streak + 1 : 1;
const currentExp = free + (newStreak - 1) * expIncrease;
const nextExp = currentExp + expIncrease;

let bonusText = "";
if (newStreak % 7 === 0) {
await m.db.query(`UPDATE usuarios 
      SET exp = exp + $1, limite = limite + $2, money = money + $3, lastclaim = $4, dailystreak = $5
      WHERE id = $6
    `, [currentExp + bonusExp, bonusLimit, bonusMoney, now, newStreak, m.sender]);

bonusText = `\n\n🎉 *¡BONUS por 7 días de racha!* 🎉\n> +${formatNumber(bonusExp)} XP extra\n> +${bonusLimit} Diamantes 💎\n> +${formatNumber(bonusMoney)} LoliCoins 🪙\n\n`;
} else {
await m.db.query(`UPDATE usuarios 
      SET exp = exp + $1, lastclaim = $2, dailystreak = $3
      WHERE id = $4
    `, [currentExp, now, newStreak, m.sender]);
  }

await conn.fakeReply(m.chat, `*🔸 𝐇𝐀𝐒 𝐑𝐄𝐂𝐈𝐁𝐈𝐃𝐎:* Tu recompensa diaria de: *${formatNumber(currentExp)} XP* (Día  ${newStreak})\n` + bonusText + `> _*Mañana no te olviden de seguir reclamado tu recompensa ganaras: ${formatK(nextExp)} (${formatNumber(nextExp)}) XP*_\n`, '13135550002@s.whatsapp.net', `🎁 Obtener un regalo 🎁`, 'status@broadcast');
};
handler.help = ['daily', 'claim'];
handler.tags = ['econ'];
handler.command = ['daily', 'claim'];
handler.register = true;

export default handler;

function msToTime(duration) {
  const totalSeconds = Math.floor(Math.max(0, duration) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}min`;
}

function formatNumber(num) {
  return num.toLocaleString('en').replace(/,/g, '.'); 
}

function formatK(num) {
  return (num / 1000).toFixed(1) + 'k'; 
}

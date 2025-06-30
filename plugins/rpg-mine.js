const handler = async (m, { conn }) => {
const now = Date.now();
const cooldown = 600_000; //10 min
const hasil = Math.floor(Math.random() * 6000);
const res = await m.db.query("SELECT exp, lastmiming FROM usuarios WHERE id = $1", [m.sender]);
const user = res.rows[0];
const lastMine = Number(user?.lastmiming) || 0;
const nextMineTime = lastMine + cooldown;
const restante = Math.max(0, nextMineTime - now);
if (restante > 0) return m.reply(`⏳ 𝐄𝐬𝐩𝐞𝐫𝐚 *${msToTime(restante)}* 𝐩𝐚𝐫𝐚 𝐯𝐨𝐥𝐯𝐞𝐫 𝐚 𝐦𝐢𝐧𝐚𝐫`);
const minar = pickRandom(['Que pro 😎 has minado', '🌟✨ Genial!! Obtienes', 'WOW!! eres un(a) gran Minero(a) ⛏️ Obtienes', 'Has Minado!!', '😲 Lograste Minar la cantidad de', 'Tus Ingresos subiran gracias a que minaste', '⛏️⛏️⛏️⛏️⛏️ Minando', '🤩 SII!!! AHORA TIENES', 'La minaria esta de tu lado, por ello obtienes', '😻 La suerte de Minar', '♻️ Tu Mision se ha cumplido, lograste minar', '⛏️ La Mineria te ha beneficiado con', '🛣️ Has encontrado un Lugar y por minar dicho lugar Obtienes', '👾 Gracias a que has minado tus ingresos suman', 'Felicidades!! Ahora tienes', '⛏️⛏️⛏️ Obtienes']);

await m.db.query(`UPDATE usuarios 
    SET exp = exp + $1, lastmiming = $2 
    WHERE id = $3
  `, [hasil, now, m.sender]);
m.reply(`${minar} *${formatNumber(hasil)} XP*`);
};
handler.help = ['minar'];
handler.tags = ['econ'];
handler.command = ['minar', 'miming', 'mine'];
handler.register = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const totalSeconds = Math.floor(Math.max(0, duration) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} minuto(s) ${seconds} segundo(s)`;
}

function formatNumber(num) {
  return num.toLocaleString('en').replace(/,/g, '.'); 
}

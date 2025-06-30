const handler = async (m, { conn }) => {
const cooldown = 600_000; // 10 min
const now = Date.now();
const res = await m.db.query('SELECT exp, lastslut FROM usuarios WHERE id = $1', [m.sender]);
const user = res.rows[0];
const lastSlut = Number(user?.lastslut) || 0;
const remaining = Math.max(0, lastSlut + cooldown - now);
const mins = Math.floor(remaining / 60000);
const secs = Math.floor((remaining % 60000) / 1000);
if (remaining > 0) return conn.reply(m.chat, `*💦 Debes descansar ${msToTime(remaining)} antes de volver a prostituirte...*`, m);

const ganancias = Math.floor(Math.random() * 2500) + 1000;
const textoo = slut.getRandom();
await m.db.query(`UPDATE usuarios SET exp = exp + $1, lastslut = $2 WHERE id = $3`, [ganancias, now, m.sender]);
await conn.reply(m.chat, `*${textoo}*\n\nGanaste: *${formatNumber(ganancias)} XP*`, m);
};

handler.help = ['slut'];
handler.tags = ['rpg', 'hot'];
handler.command = /^slut$/i;
handler.register = true;

export default handler;

const slut = [
  "Te vendiste por un combo del McDonald's",
  "Le diste una buena mamada a un admin del grupo",
  "Le hiciste un baile sensual al admin y te pagó",
  "Tu OnlyFans explotó por 10 minutos",
  "Tu cliente era un furry y te pagó el doble",
  "Te disfrazaste de maid y funcionó",
  "El viejo verde del grupo te dio propina",
  "Ofreciste abrazos por monedas, pero te malinterpretaron",
  "Trabajaste en una esquina pixelada de San Andreas",
  "Te pagaron por quedarte calladito... y lo hiciste muy bien",
  "Fuiste a la zona roja del grupo y volviste con billete",
  "Tu cosplay de Nezuko encendió el ambiente",
  "Hiciste roleplay con el bot y te pagaron por no romper personaje",
  "Te disfrazaste de emoji y alguien pagó por usarte",
  "Un sugar daddy te ofreció XP a cambio de cariñitos virtuales",
  "Participaste en un 'verdad o reto' y te pasaste de atrevid@",
  "Tu avatar provocó donaciones en un grupo de solteros",
  "Te alquilaste como fondo de pantalla personalizado",
  "Vendiste besos digitales y fue un éxito",
  "Tu waifu interior salió a facturar",
  "Tu foto de perfil enamoró a un moderador",
  "Aceptaste una cita con alguien que solo habla en stickers",
  "Te disfrazaste de bot NSFW y nadie notó la diferencia",
  "Hiciste un dúo de TikTok caliente y lo monetizaste",
  "Un VTuber te contrató como su asistente picante",
  "Tu pack de stickers se volvió viral y pediste comisión",
  "Te pagaron por enviar audios diciendo ‘papi’",
  "Te disfrazaste de Siri y alguien te pidió comandos indecentes",
  "Te ofreciste para dar tutoriales privados en el grupo",
  "Fuiste la estrella de una noche en la taberna del RPG",
  "Le vendiste ‘fotos de pies’ en formato ASCII",
  "Cobraste por dejar que te usaran de NPC caliente",
  "Participaste en un evento hot en un servidor de Minecraft",
  "Le hiciste un peter al admins del grupo",
  "Te grabaste susurrando comandos y alguien lo compró",
  "Creaste un OnlyBots y fuiste trending",
  "Te hiciste pasar por moderador sexy y cobraste multas",
  "Tu nombre salió en un fanfic y alguien te recompensó",
  "Organizaste un evento de ‘nalgadas virtuales’ con entrada paga",
  "Le bailaste a un bot de economía y te soltó todo su saldo"
];

function formatNumber(num) {
  return num.toLocaleString("en").replace(/,/g, ".");
}

function msToTime(duration) {
  const totalSeconds = Math.floor(duration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} minutos ${seconds} segundos`;
}
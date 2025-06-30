//Código elaborado por: https://github.com/elrebelde21

const pendingSales = new Map();
const cooldownTime = 3600000; // 1 hora

function calculateMaxPrice(basePrice, votes) {
if (votes === 0) {
 return Math.round(basePrice * 1.05);
  }
  const maxIncreasePercentage = 0.3;
  const maxPrice = basePrice * (1 + maxIncreasePercentage * votes);
  return Math.round(maxPrice);
}

function calculateMinPrice(basePrice) {
  return Math.round(basePrice * 0.95);
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!m.db) return 

try {
const { rows: userCharacters } = await m.db.query('SELECT * FROM characters WHERE claimed_by = $1',
[m.sender]);

if (args.length < 2) {
if (userCharacters.length === 0) return conn.reply(m.chat, '⚠️ No tienes personajes registrados. Reclama uno primero.', m);
let characterList = 'Lista de tus personajes:\n';
userCharacters.forEach((character, index) => {
characterList += `${index + 1}. ${character.name} - ${character.price} exp\n`;
});
return conn.reply(m.chat, `*⚠️ Pendejo no sabes como usar estos? Usa de la siguiente manera:*\n\n• Puedes vender un personaje a un usuario con:\n${usedPrefix + command} <nombre del personaje> <precio> @tag\n\n• O puedes poner tu personaje en el mercado:\nEj: ${usedPrefix + command} goku 9500\n\n` + characterList, m);
}

const mentioned = m.mentionedJid[0] || null;
const mentionIndex = args.findIndex(arg => arg.startsWith('@'));
let price = args[args.length - 1];
if (mentioned && mentionIndex !== -1) {
price = args[args.length - 2];
}

price = parseInt(price);
if (isNaN(price) || price <= 0) return conn.reply(m.chat, '⚠️ Por favor, especifica un precio válido para tu personaje.', m);

const nameParts = args.slice(0, mentioned ? -2 : -1);
const characterName = nameParts.join(' ').trim();
if (!characterName) return conn.reply(m.chat, '⚠️ No se encontró el nombre del personaje. Verifica e intenta nuevamente.', m);

const characterToSell = userCharacters.find(
c => c.name.toLowerCase() === characterName.toLowerCase()
);

if (!characterToSell) return conn.reply(m.chat, '⚠️ No se encontró el personaje que intentas vender.', m);
if (characterToSell.for_sale) return conn.reply(m.chat, '⚠️ Este personaje ya está en venta. Usa el comando `.rf-retirar` para retirarlo antes de volver a publicarlo.', m);

if (characterToSell.last_removed_time) {
const timeSinceRemoval = Date.now() - characterToSell.last_removed_time;
if (timeSinceRemoval < cooldownTime) {
const remainingTime = Math.ceil((cooldownTime - timeSinceRemoval) / 60000);
return conn.reply(m.chat, `⚠️ Debes esperar ${remainingTime} minutos antes de volver a publicar a *${characterToSell.name}*.`, m);
}}

const minPrice = calculateMinPrice(characterToSell.price);
const maxPrice = calculateMaxPrice(characterToSell.price, characterToSell.votes || 0);
if (price < minPrice) return conn.reply(m.chat, `⚠️ El precio mínimo permitido para ${characterToSell.name} es ${minPrice} exp.`, m);
if (price > maxPrice) return conn.reply(m.chat, `⚠️ El precio máximo permitido para ${characterToSell.name} es ${maxPrice} exp.`, m);

if (mentioned) {
if (pendingSales.has(mentioned)) return conn.reply(m.chat, '⚠️ El comprador ya tiene una solicitud pendiente. Por favor, espera.', m);

pendingSales.set(mentioned, {
seller: m.sender,
buyer: mentioned,
character: characterToSell,
price,
timer: setTimeout(() => {
pendingSales.delete(mentioned);
conn.reply(m.chat, `⏰ @${mentioned.split('@')[0]} no respondió a la oferta de *${characterToSell.name}*. La solicitud fue cancelada.`, m, { mentions: [mentioned] });
}, 60000), // 1 minuto
});

return conn.reply(m.chat, `📜 Hey @${mentioned.split('@')[0]}, el usuario @${m.sender.split('@')[0]} quiere venderte *${characterToSell.name}* por ${price} exp.\n\nResponde con:\n- *Aceptar* para comprar.\n- *Rechazar* para cancelar.`, m, { mentions: [mentioned, m.sender] });
} else {
const previousPrice = characterToSell.price;
await m.db.query('UPDATE characters SET price = $1, for_sale = true, seller = $2, previous_price = $3 WHERE id = $4', [price, m.sender, previousPrice, characterToSell.id]);
return conn.reply(m.chat, `✅ Has puesto a la venta *${characterToSell.name}* en el mercado por ${price} exp.`, m);
}} catch (e) {
console.error(e);
return conn.reply(m.chat, '⚠️ Error al procesar la venta. Intenta de nuevo.', m);
}};

handler.before = async (m, { conn }) => {
const buyerId = m.sender;
const sale = pendingSales.get(buyerId);
if (!sale) return;
if (!m.db) return

const response = m.originalText.toLowerCase();
if (response === 'aceptar') {
const { seller, buyer, character, price } = sale;
try {
const { rows } = await m.db.query('SELECT exp FROM usuarios WHERE id = $1', [buyer]);
const buyerData = rows[0];
if (!buyerData || buyerData.exp < price) {
pendingSales.delete(buyerId);
clearTimeout(sale.timer);
return conn.reply(m.chat, '⚠️ No tienes suficiente exp para comprar este personaje.', m);
}

const sellerExp = Math.round(price * 0.75);
await m.db.query('UPDATE usuarios SET exp = exp - $1 WHERE id = $2', [price, buyer]);
await m.db.query('UPDATE usuarios SET exp = exp + $1 WHERE id = $2', [sellerExp, seller]);
await m.db.query('UPDATE characters SET claimed_by = $1, price = $2, for_sale = false, seller = null WHERE id = $3', [buyer, price, character.id]);
clearTimeout(sale.timer);
pendingSales.delete(buyerId);

return conn.reply(m.chat, `✅ @${buyer.split('@')[0]} ha comprado *${character.name}* de @${seller.split('@')[0]} por ${price} exp.`, m, { mentions: [buyer, seller] });
} catch (e) {      
clearTimeout(sale.timer);
pendingSales.delete(buyerId);
return conn.reply(m.chat, '⚠️ Error al procesar la compra. Intenta de nuevo.', m);
}} else if (response === 'rechazar') {
clearTimeout(sale.timer);
pendingSales.delete(buyerId);
return conn.reply(m.chat, `⚠️ Has rechazado la oferta de compra para *${sale.character.name}*.`, m);
}};
handler.help = ['rw-vender'];
handler.tags = ['gacha'];
handler.command = ['rw-vender', 'vender'];
handler.register = true;

export default handler;
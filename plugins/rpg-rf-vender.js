//Código elaborado por: https://github.com/elrebelde21

import fs from 'fs';
import path from 'path';

const claimedFilePath = path.resolve('./database/claimed_characters.json');
const pendingSales = new Map();
const cooldownTime = 3600000; // 1 hora

function loadCharacters() {
    try {
        const data = fs.readFileSync(claimedFilePath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {        
        return [];
    }
}

function saveCharacters(characters) {
    try {
        fs.writeFileSync(claimedFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {        
    }
}

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
const characters = loadCharacters();

if (args.length < 2) {
const userCharacters = characters.filter(c => c.claimedBy === m.sender);

if (userCharacters.length === 0) return m.reply(await tr('⚠️ No tienes personajes registrados. reclama uno primero.'))
let characterList = await tr('Lista de tus personajes:\n')

userCharacters.forEach((character, index) => { characterList += `${index + 1}. ${character.name} - ${character.price} exp\n` });
return m.reply(await tr(`*⚠️ Pendejo no sabes como usar estos? Usa de la siguiente manera:*\n\n• Puedes vender un personaje a un usuario con:\n${usedPrefix + command} <nombre del personaje> <precio> @tag\n\n• O puedes poner tu personaje en el mercado:\nEj: ${usedPrefix + command} goku 9500\n\n`) + characterList);
}

const mentioned = m.mentionedJid[0] || null;
const mentionIndex = args.findIndex(arg => arg.startsWith('@'));
let price = args[args.length - 1];
if (mentioned && mentionIndex !== -1) {
price = args[args.length - 2];
}

price = parseInt(price);
if (isNaN(price) || price <= 0) return m.reply(await tr('⚠️ Por favor, especifica un precio válido para tu personaje.'))

const nameParts = args.slice(0, mentioned ? -2 : -1);
const characterName = nameParts.join(' ').trim();
if (!characterName) return m.reply(await tr('⚠️ No se encontró el nombre del personaje. Verifica e intenta nuevamente.'))

const characterToSell = characters.find(c =>
c.name.toLowerCase() === characterName.toLowerCase() &&
c.claimedBy === m.sender
);

if (!characterToSell) return m.reply(await tr('⚠️ No se encontró el personaje que intentas vender.'))
if (characterToSell.forSale) return m.reply(await tr('⚠️ Este personaje ya está en venta. Usa el comando `.rf-retirar` para retirarlo antes de volver a publicarlo.'))

if (characterToSell.lastRemovedTime) {
const timeSinceRemoval = Date.now() - characterToSell.lastRemovedTime;
if (timeSinceRemoval < cooldownTime) {
const remainingTime = Math.ceil((cooldownTime - timeSinceRemoval) / 60000); 
return m.reply(await tr(`⚠️ Debes esperar ${remainingTime} minutos antes de volver a publicar a *${characterToSell.name}*.`))
}}

const minPrice = calculateMinPrice(characterToSell.price);
const maxPrice = calculateMaxPrice(characterToSell.price, characterToSell.votes || 0);
if (price < minPrice) return m.reply(await tr(`⚠️ El precio mínimo permitido para ${characterToSell.name} es ${minPrice} exp.`))
if (price > maxPrice) return m.reply(await tr(`⚠️ El precio máximo permitido para ${characterToSell.name} es ${maxPrice} exp.`))

if (mentioned) {
if (pendingSales.has(mentioned)) return m.reply(await tr('⚠️ El comprador ya tiene una solicitud pendiente. Por favor, espera.'))
let msgTxt = await tr("no respondió a la oferta de")
let msgTxt2 = await tr("La solicitud fue cancelada")

pendingSales.set(mentioned, {seller: m.sender,
buyer: mentioned,
character: characterToSell,
price,
timer: setTimeout(() => {
pendingSales.delete(mentioned);
m.reply(`⏰ @${mentioned.split('@')[0]} ${msgTxt} *${characterToSell.name}* ${msgTxt2}.`, null, {
mentions: [mentioned]});
}, 60000), // 1 minuto 
});

m.reply(`📜 @${mentioned.split('@')[0]}, ${await tr("el usuario")} @${m.sender.split('@')[0]} ${await tr(`quiere venderte *${characterToSell.name}* por ${price} exp`)}.\n\n${await tr("Responde con")}:\n- *Aceptar* ${await tr("para comprar")}.\n- *Rechazar* ${await tr("para cancelar")}.`, null, { mentions: [mentioned, m.sender] });
} else {
const previousPrice = characterToSell.price;
characterToSell.price = price;
characterToSell.claimedBy = m.sender;
characterToSell.forSale = true;
characterToSell.seller = m.sender;
if (characterToSell.forSale) {
characterToSell.previousPrice = previousPrice;
}
saveCharacters(characters);
m.reply(await tr(`✅ Has puesto a la venta *${characterToSell.name}* en el mercado por ${price} exp.`))
}};

handler.before = async (m) => {
const buyerId = m.sender;
const sale = pendingSales.get(buyerId);
if (!sale) return;

const response = m.text.toLowerCase();
if (response === 'aceptar') {
const { seller, buyer, character, price } = sale;

if (global.db.data.users[buyer].exp < price) {
pendingSales.delete(buyerId);
return m.reply(await tr('⚠️ No tienes suficiente exp para comprar este personaje.'))
}

const sellerExp = price * 0.75; 
global.db.data.users[buyer].exp -= price;
global.db.data.users[seller].exp += sellerExp;
character.claimedBy = buyer;
character.price = price;
character.forSale = false;
const characters = loadCharacters();
const updatedCharacters = characters.map(c => c.id === character.id ? character : c);
saveCharacters(updatedCharacters);
clearTimeout(sale.timer);
pendingSales.delete(buyerId);
//conn.sendMessage(seller, { text: `✅ @${buyer.split('@')[0]} compró tu personaje *${character.name}* por ${price} exp.\n> _💸 Tu dinero ya fue depositado a tu cuentas recibirte: ${sellerExp} por la comisión que es de %25_`, mentions: [seller, buyer] }, { quoted: m });
m.reply(`✅ @${buyer.split('@')[0]} ${await tr("ha comprado")} *${character.name}* ${await tr("de")} @${seller.split('@')[0]} ${await tr("por")} ${price} exp.`, null, { mentions: [buyer, seller] });
} else if (response === 'rechazar') {
clearTimeout(sale.timer);
pendingSales.delete(buyerId);
m.reply(await tr(`⚠️ Has rechazado la oferta de compra para *${sale.character.name}*.`))
}};
handler.help = ['rf-vender'];
handler.tags = ['gacha'];
handler.command = ['rf-vender', 'vender'];
handler.register = true;
export default handler;

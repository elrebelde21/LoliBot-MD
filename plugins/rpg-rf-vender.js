//Código elaborado por: https://github.com/elrebelde21

import fs from 'fs';
import path from 'path';

const claimedFilePath = path.resolve('./database/claimed_characters.json');
const pendingSales = new Map(); 

function loadCharacters() {
    try {
        const data = fs.readFileSync(claimedFilePath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error(`Error al leer archivo JSON: ${error}`);
        return [];
    }
}

function saveCharacters(characters) {
    try {
        fs.writeFileSync(claimedFilePath, JSON.stringify(characters, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error al guardar archivo JSON: ${error}`);
    }
}

let handler = async (m, { conn, args, usedPrefix,  command }) => {
const characters = loadCharacters();

if (args.length < 2) {
const userCharacters = characters.filter(c => c.claimedBy === m.sender);

if (userCharacters.length === 0) return m.reply('❌ No tienes personajes registrados. Compra o reclama uno primero.');
let characterList = 'Lista de tus personajes:\n';
userCharacters.forEach((character, index) => { characterList += `${index + 1}. ${character.name} - ${character.price} exp\n` });
return m.reply(`*❌ Pendejo no sabes como usar estos? Usa de la seguiente manera:*\n\n• Pueden vender un personajes a un usuarios con:\n${usedPrefix + command} <nombre del personaje> <precio> @tag\n\n• o puedes poner tu personajes en el mercado:\nEj: ${usedPrefix + command} goku 9500\n\n` + characterList);
}       

const mentioned = m.mentionedJid[0] || null; 
const mentionIndex = args.findIndex(arg => arg.startsWith('@'));
let price = args[args.length - 1];
if (mentioned && mentionIndex !== -1) {
price = args[args.length - 2]; 
}

price = parseInt(price);
if (isNaN(price) || price <= 0) return m.reply('❌ Por favor, especifica un precio válido para tu personaje.');

const nameParts = args.slice(0, mentioned ? -2 : -1);
const characterName = nameParts.join(' ').trim();

if (!characterName) return m.reply('❌ No se encontró el nombre del personaje. Verifica e intenta nuevamente.');

const characterToSell = characters.find(c =>
c.name.toLowerCase() === characterName.toLowerCase() &&
c.claimedBy === m.sender
);

if (!characterToSell) return m.reply('❌ No se encontró el personaje que intentas vender.');
if (mentioned) {
if (pendingSales.has(mentioned)) return m.reply('❌ El comprador ya tiene una solicitud pendiente. Por favor, espera.');

pendingSales.set(mentioned, { seller: m.sender,
buyer: mentioned,
character: characterToSell,
price,
timer: setTimeout(() => {
pendingSales.delete(mentioned);
m.reply(`⏰ @${mentioned.split('@')[0]} no respondió a la oferta de *${characterToSell.name}*. La solicitud fue cancelada.`, null, {
mentions: [mentioned],
})}, 60000), // 1 minuto para aceptar
});

conn.sendMessage(mentioned, {text: `📜 @${m.sender.split('@')[0]} quiere venderte *${characterToSell.name}* por ${price} exp.\n\nResponde:\n- *Aceptar*: para completar la compra.\n- *Rechazar*: para cancelar.`, mentions: [m.sender, mentioned]}, { quoted: m });
m.reply(`✅ Solicitud de venta enviada al privado de @${mentioned.split('@')[0]}.`, null, { mentions: [mentioned] });
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
m.reply(`✅ Has puesto a la venta *${characterToSell.name}* en el mercado por ${price} exp (ganancia neta después de comisión de 10%).`);
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
return m.reply('❌ No tienes suficiente exp para comprar este personaje.');
}
const sellerExp = character.price * 0.75;
global.db.data.users[buyer].exp -= price;
global.db.data.users[seller].exp += sellerExp;
character.claimedBy = buyer; 
character.price = price; 
const characters = loadCharacters();
const updatedCharacters = characters.map(c => c.id === character.id ? character : c);
saveCharacters(updatedCharacters);  
clearTimeout(sale.timer);
pendingSales.delete(buyerId);
m.reply(`✅ Has comprado *${character.name}* de @${seller.split('@')[0]} por ${price} exp.`, null, { mentions: [seller] });
conn.sendMessage(seller, { text: `✅ @${buyer.split('@')[0]} compró tu personaje *${character.name}* por ${price} exp.\n> _💸 Tu dinero ya fue depositado a tu cuentas recibirte: ${sellerExp} por la comisión que es de %25_`, mentions: [seller, buyer] }, { quoted: m });
} else if (response === 'rechazar') {
clearTimeout(sale.timer);
pendingSales.delete(buyerId);
m.reply(`❌ Has rechazado la oferta de compra para *${sale.character.name}*.`);
conn.sendMessage(sale.seller, { text: `❌ @${buyerId.split('@')[0]} rechazó tu oferta para vender *${sale.character.name}*.`, mentions: [buyerId] }, { quoted: m });
}
};
handler.help = ['rf-vender'];
handler.tags = ['econ'];
handler.command = ['rf-vender', 'vender'];
handler.register = true;
export default handler;

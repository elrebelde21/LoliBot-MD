//Código elaborado por: https://github.com/elrebelde21

import fs from 'fs';
import path from 'path';

const mainFilePath = path.resolve('./src/characters.json');
const claimedFilePath = path.resolve('./database/claimed_characters.json');

function loadCharacters(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error al leer el archivo JSON (${filePath}):`, error);
    return [];
  }
}

function saveCharacters(filePath, characters) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(characters, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al guardar los personajes:', error);
  }
}

function syncCharacters() {
  const mainCharacters = loadCharacters(mainFilePath);
  const claimedCharacters = loadCharacters(claimedFilePath);

  const newCharacters = mainCharacters.filter(mainChar =>
    !claimedCharacters.some(claimedChar => claimedChar.url === mainChar.url)
  );

  if (newCharacters.length > 0) {
    const updatedCharacters = [...claimedCharacters, ...newCharacters];
    saveCharacters(claimedFilePath, updatedCharacters);
    console.log(`${newCharacters.length} personaje(s) agregado(s) a "claimed".`);
    return updatedCharacters;
  }
  return claimedCharacters;
}

async function handler(m, { conn }) {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imageUrl.getRandom());
const availableCharacters = syncCharacters();

let time = global.db.data.users[m.sender].timeRy + 300000; //5min
if (new Date() - global.db.data.users[m.sender].timeRy < 300000) return conn.fakeReply(m.chat,  `Bueno pa 🤚 para con emoción esperar ${msToTime(time - new Date())} para volver usar este comando `, m.sender, `No haga spam perra`, 'status@broadcast', null, fake);
if (!availableCharacters || availableCharacters.length === 0) return;

const randomCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
//const status = randomCharacter.claimedBy ? `🔒 Estado: Comprado por @${randomCharacter.claimedBy.split('@')[0]}` : `🆓 Estado: Libre`;
const status = randomCharacter.forSale ? `💸 Estado: @${randomCharacter.claimedBy.split('@')[0]} está vendiendo este personaje.` : randomCharacter.claimedBy ? `🔒 Estado: Comprado por @${randomCharacter.claimedBy.split('@')[0]}` : `🆓 Estado: Libre`;

let priceMessage;
if (randomCharacter.previousPrice) {
priceMessage = `~💰 Precio Anterior: ${randomCharacter.previousPrice} exp~\n💰 Precio Actual: ${randomCharacter.price} exp`;
} else {
priceMessage = `💰 Precio: ${randomCharacter.price} exp`;
}

const sentMessage = await conn.sendFile(m.chat, randomCharacter.url, 'lp.jpg', `💥 Nombre: ${randomCharacter.name}\n${priceMessage}\n${status}\n\n> Responde con "c" para comprarlo`, m, false, {
contextInfo: { 
mentionedJid: randomCharacter.claimedBy ? [randomCharacter.claimedBy] : [], 
externalAdReply: {
title: "✨️ Character Details ✨️",
body: wm,
thumbnailUrl: pp, 
sourceUrl: [nna, nna2, nn, md, yt, tiktok].getRandom(),
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}});

global.db.data.users[m.sender].timeRy = new Date() * 1;
global.db.data.tempCharacter = { ...randomCharacter, messageId: sentMessage.id };
}

handler.before = async (m, { conn }) => {
const character = global.db.data.tempCharacter;
if (m.quoted && /^[.]*c$/i.test(m.text) && character && character.messageId === m.quoted.id) {
const user = global.db.data.users[m.sender];
const characters = syncCharacters();
const claimedCharacter = characters.find(c => c.url === character.url);
if (claimedCharacter.claimedBy) {
if (!claimedCharacter.forSale) return await conn.sendMessage(m.chat, {text: `❌ Este personaje ya ha sido comprado por @${claimedCharacter.claimedBy.split('@')[0]}`, contextInfo: { mentionedJid: [claimedCharacter.claimedBy] }}, { quoted: m });
const seller = claimedCharacter.seller;
if (claimedCharacter.seller === m.sender) return await conn.sendMessage(m.chat, { text: '❌ No puedes comprar tu propio personaje.' }, { quoted: m });
if (user.exp < character.price) return await conn.sendMessage(m.chat, { text: '❌ No tienes suficientes exp para comprar este personaje.' }, { quoted: m });
user.exp -= character.price;
const sellerExp = character.price * 0.90;
global.db.data.users[seller].exp += sellerExp; 
claimedCharacter.claimedBy = m.sender;
claimedCharacter.forSale = false; 
claimedCharacter.seller = null; 
saveCharacters(claimedFilePath, characters);
await conn.sendMessage(m.chat, { text: `🎉 ¡Has comprado a ${character.name} por ${character.price} exp!`, image: { url: character.url }}, { quoted: m });      
if (seller) {
await conn.sendMessage(seller, {text: `🎉 ¡Tu personaje ${character.name} ha sido comprando por @${m.sender.split('@')[0]}\n💰 ${sellerExp} exp han sido transferidos a tu cuenta (después de la comisión).\n\n- Precio original: ${character.price} exp\n- Precio recibido: ${sellerExp} exp.`, image: { url: character.url }, contextInfo: { mentionedJid: [m.sender] }}, { quoted: m })
}} else {
if (user.exp < character.price) return await conn.sendMessage(m.chat, { text: '❌ No tienes suficientes exp para comprar este personaje.' }, { quoted: m });
user.exp -= character.price;
claimedCharacter.claimedBy = m.sender;      
saveCharacters(claimedFilePath, characters);
await conn.sendMessage(m.chat, { text: `🎉 ¡Has comprado a ${character.name} por ${character.price} exp!`, image: { url: character.url } }, { quoted: m });
}
delete global.db.data.tempCharacter;
}
};
handler.help = ['rf', 'rm'];
handler.tags = ['gacha'];
handler.command = ['rf', 'rm'];
handler.register = true;

export default handler;

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
//hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

//hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds
return minutes + " min " + seconds + " seg " 
}
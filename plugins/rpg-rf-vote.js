//Código elaborado por: https://github.com/elrebelde21

//PD: ME ESTOY CLONADO A NEKO"S JJJJJJJJJJJJJJJJJJJJJJJJJJ 

import fs from 'fs';
import path from 'path';

const mainFilePath = path.resolve('./database/claimed_characters.json');

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

async function handler(m, { conn, args }) {
const characters = loadCharacters(mainFilePath);
const characterName = args.join(' ').trim();
let time = global.db.data.users[m.sender].timevot + 3600000; //1hora
if (new Date() - global.db.data.users[m.sender].timevot < 3600000) return conn.fakeReply(m.chat,  `Bueno pa 🤚 para con emoción esperar ${msToTime(time - new Date())} para volver usar este comando `, m.sender, `No haga spam perra`, 'status@broadcast', null, fake);
if (!characterName) return conn.reply(m.chat, '⚠️ Por favor, especifica el nombre del personaje.', m);
const character = characters.find(c => c.name.toLowerCase() === characterName.toLowerCase());
if (!character) return conn.reply(m.chat, `⚠️ No se encontró el personaje "${characterName}".`, m);
if (character.price === null || character.price === undefined) {
character.price = 0;
}

character.votes = (character.votes || 0) + 1; 
const increment = Math.floor(Math.random() * 50) + 1; 
character.price += increment;
saveCharacters(mainFilePath, characters);
const formattedPrice = character.price.toLocaleString();
conn.reply(m.chat, `✨️ Votaste por el personaje *${character.name}*, su nuevo precio es *${formattedPrice}* (+${increment})`, m);
global.db.data.users[m.sender].timevot = new Date() * 1;
}
handler.help = ['vote <nombre del personaje>'];
handler.tags = ['econ'];
handler.command = ['vote'];
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
//Código elaborado por: https://github.com/elrebelde21

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

async function handler(m, { conn, args }) {
const characters = loadCharacters(mainFilePath);
let targetUser = m.sender; 
if (m.mentionedJid && m.mentionedJid.length > 0) {
targetUser = m.mentionedJid[0]; 
}
const userCharacters = characters.filter(c => c.claimedBy === targetUser);
if (userCharacters.length === 0) {
const targetUsername = targetUser === m.sender ? 'tú' : `@${targetUser.split('@')[0]}`;
return conn.reply(m.chat, `*${targetUsername}* no tienes ningún personaje en tu harem.`, m, { mentions: [targetUser]});
}

const itemsPerPage = 6; 
const totalPages = Math.ceil(userCharacters.length / itemsPerPage);
let page = parseInt(args[0]) || 1; 
if (page < 1 || page > totalPages) {
page = 1; 
}
const startIndex = (page - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const currentPageCharacters = userCharacters.slice(startIndex, endIndex);
let message = `*\`🛍 Inventario de Compras\`*\n\n`;
message += `*• Usuario:* @${targetUser.split('@')[0]}\n`;
message += `*• Personajes comprados:* ${userCharacters.length}\n\n`;
message += `*\`○ Lista de Personajes:\`*\n`;
currentPageCharacters.forEach((character, index) => {
message += `${index + 1}. *${character.name}* (${character.price.toLocaleString()})\n`;
});
message += `\n> *• Página:* ${page} de ${totalPages}`;
conn.reply(m.chat, message, m, {mentions: [targetUser] });
}
handler.help = ['harem @tag'];
handler.tags = ['gacha'];
handler.command = ['harem'];
handler.register = true;

export default handler;
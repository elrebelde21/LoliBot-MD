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
    console.error(`Error al guardar el archivo JSON (${filePath}):`, error);
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

let handler = async (m, { conn }) => {
  const characters = syncCharacters();
  const totalCharacters = characters.length;
  const claimedCharacters = characters.filter(c => c.claimedBy);
  const freeCharacters = characters.filter(c => !c.claimedBy);
  
const userClaims = claimedCharacters.reduce((acc, character) => {
acc[character.claimedBy] = (acc[character.claimedBy] || 0) + 1;
return acc;
}, {});

const topUsers = Object.entries(userClaims)
.sort(([, countA], [, countB]) => countB - countA) 
.slice(0, 10); 
let textt = `📊 *\`Ranking de Personajes\`* 📊\n- Total de personajes: ${totalCharacters}\n- Personajes reclamados: ${claimedCharacters.length}\n- Personajes libres: ${freeCharacters.length}\n\n`;
textt += '*🏆 Top de usuarios con más personajes reclamados:*\n';
topUsers.forEach(([user, count], index) => { textt += `\n${index + 1}- @${user.split('@')[0]} ${count} personajes` });
await conn.sendMessage(m.chat, {text: textt + `\n\n> _*¡Sigue usando el bot para reclamar más personajes!*_`, contextInfo: { mentionedJid: topUsers.map(([user]) => user) }}, { quoted: m });
}
handler.help = ['rf-personajes'];
handler.tags = ['gacha'];
handler.command = ['rf-personajes',  'ranking'];
handler.register = true;
export default handler;

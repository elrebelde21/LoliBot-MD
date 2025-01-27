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

const topUser = Object.keys(userClaims).reduce((maxUser, user) =>
userClaims[user] > (userClaims[maxUser] || 0) ? user : maxUser, null);
const topUserCount = userClaims[topUser] || 0;
await conn.sendMessage(m.chat, { text:  `📊 *\`Ranking de Personajes\`* 📊
- Total de personajes: ${totalCharacters}
- Personajes reclamados: ${claimedCharacters.length}
- Personajes libres: ${freeCharacters.length}

*🏆 Usuario con más personajes reclamados:*
@${topUser?.split('@')[0] || 'Nadie aún'} ${topUserCount} personajes

> _*¡Sigue usando el bot para reclamar más personajes!*_`, contextInfo: { mentionedJid: topUser ? [topUser] : [] } }, { quoted: m });
}

handler.help = ['rf-personajes'];
handler.tags = ['econ'];
handler.command = ['rf-personajes'];

export default handler;

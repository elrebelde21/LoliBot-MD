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

function saveCharacters(filePath, characters) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(characters, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error al guardar los personajes:', error);
  }
}

async function handler(m, { conn, args }) {
const characters = loadCharacters(mainFilePath);
if (!m.mentionedJid || m.mentionedJid.length === 0 || args.length < 1) return conn.reply(m.chat, '⚠️Formato incorrecto. Usa: /give @tag nombre_del_personaje', m);

const recipient = m.mentionedJid[0];
const characterName = args.slice(1).join(' ').trim();
const character = characters.find(c => c.name.toLowerCase() === characterName.toLowerCase());
if (!character) return conn.reply(m.chat, `No se encontró el personaje "${characterName}".`, m);
if (character.claimedBy !== m.sender) return conn.reply(m.chat, `No eres el propietario de *${character.name}*. Solo el propietario puede regalarlo.`, m);
if (recipient === m.sender) return conn.reply(m.chat, 'No puedes regalarte un personaje a ti mismo 😆.', m);

character.claimedBy = recipient;
saveCharacters(mainFilePath, characters);
conn.reply(m.chat,  `🎉 ¡Has regalado a *${character.name}* a @${recipient.split('@')[0]}!`, m, {mentions: [recipient] });
} 
handler.help = ['give @tag nombre_del_personaje'];
handler.tags = ['gacha'];
handler.command = ['give', 'regalar-personajes'];
handler.register = true;

export default handler;
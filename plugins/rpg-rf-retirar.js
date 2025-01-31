import fs from 'fs';
import path from 'path';

const claimedFilePath = path.resolve('./database/claimed_characters.json');

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

let handler = async (m, { text }) => {
const characters = loadCharacters();
const characterName = text.trim().toLowerCase();
const characterToRemove = characters.find(c => c.name.toLowerCase() === characterName);

if (!characterToRemove) return m.reply(`❌ No se encontró ningún personaje con el nombre: *${characterName}*.`);
if (characterToRemove.seller !== m.sender) return m.reply(`❌ No puedes retirar este personaje porque no eres el vendedor.`);
if (!characterToRemove.forSale) return m.reply(`❌ El personaje *${characterToRemove.name}* no está actualmente a la venta.`);

characterToRemove.lastRemovedTime = Date.now();
characterToRemove.forSale = false;
characterToRemove.seller = null;
saveCharacters(characters);
m.reply(`✅ Has retirado el personaje *${characterToRemove.name}* del mercado.`);
};
handler.help = ['rf-retirar'];
handler.tags = ['gacha'];
handler.command = ['rf-retirar'];
handler.register = true;

export default handler;
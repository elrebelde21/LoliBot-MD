import { db } from '../lib/postgres.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return m.reply(`*⚠️ Uso:* ${usedPrefix}${command} packname | author\n*Ejemplo:* ${usedPrefix}${command} LoliBot | elrebelde21`)

let text = args.join(' ').split('|');
let packname = text[0].trim();
let author = text[1] ? text[1].trim() : '';

if (!packname) return m.reply('⚠️ Debes ingresar al menos un *packname*.');
if (packname.length > 600) return m.reply('⚠️ El *packname* es demasiado largo (máximo 600 caracteres).');
if (author && author.length > 650) return m.reply('⚠️ El *author* es demasiado largo (máximo 650 caracteres).');

await db.query(`UPDATE usuarios
      SET sticker_packname = $1,
          sticker_author = $2
      WHERE id = $3`, [packname, author || null, m.sender]);
await m.reply(`✅ Perfecto, hemos actualizado el *EXIF* de tus stickers. Ahora cada sticker que crees tendrá:\n\n◉ *Packname:* ${packname}\n◉ *Author:* ${author || 'Ninguno'}\n\n> ¡A crear stickers personalizados! 😎`)
};
handler.help = ['exif <packname> | <author>'];
handler.tags = ['sticker'];
handler.command = ['exif'];
handler.register = true;

export default handler;
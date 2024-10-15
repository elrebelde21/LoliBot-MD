import translate from '@vitalets/google-translate-api';
import {Anime} from '@shineiichijo/marika';
const client = new Anime();
const handler = async (m, {conn, text, usedPrefix}) => {
if (!text) return m.reply(`*⚠️ INGRESE EL NOMBRE DE ALGUN ANIME A BUSCAR*`);
try {
const anime = await client.searchAnime(text);
const result = anime.data[0];
const resultes = await translate(`${result.background}`, {to: 'es', autoCorrect: true});
const resultes2 = await translate(`${result.synopsis}`, {to: 'es', autoCorrect: true});
const AnimeInfo = `🟢 • *ᴛɪ́ᴛᴜʟᴏ:* ${result.title}
🎋 • *ғᴏʀᴍᴀᴛᴏ:* ${result.type}
📈 • *ᴇsᴛᴀᴅᴏ:* ${result.status.toUpperCase().replace(/\_/g, ' ')}
🍥 • *ᴇᴘɪsᴏᴅɪᴏs ᴛᴏᴛᴀʟᴇs:* ${result.episodes}
🎈 • *ᴅᴜʀᴀᴄɪᴏ́ɴ: ${result.duration}*
✨ • *ʙᴀsᴀᴅᴏ ᴇɴ:* ${result.source.toUpperCase()}
💫 • *ᴇsᴛʀᴇɴᴀᴅᴏ:* ${result.aired.from}
🎗 • *ғɪɴᴀʟɪᴢᴀᴅᴏ:* ${result.aired.to}
🎐 • *ᴘᴏᴘᴜʟᴀʀɪᴅᴀᴅ:* ${result.popularity}
🎏 • *ғᴀᴠᴏʀɪᴛᴏs:* ${result.favorites}
🎇 • *ᴄʟᴀsɪғɪᴄᴀᴄɪᴏ́ɴ:* ${result.rating}
🏅 • *ʀᴀɴɢᴏ:* ${result.rank}
♦ • *ᴛʀᴀɪʟᴇʀ:* ${result.trailer.url}
🌐 • *ᴜʀʟ:* ${result.url}
🎆 • *ʙᴀᴄᴋɢʀᴏᴜɴᴅ:* ${resultes.text}
❄ • *ʀɪɴɢᴋᴀsᴀɴ:* ${resultes2.text}`;
conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m, fake);
} catch (e) {
m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${e} <<<< `)       
console.log(e) 
}};
handler.help = ['animeinfo']
handler.tags = ['buscadores']
handler.command = /^(anime|animeinfo)$/i;
handler.register = true
export default handler;

import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (!text) return m.reply(`*¿Qué está buscando?* Ingrese el nombre del tema\n*• Ejemplo*\n*${usedPrefix + command}* bad bunny`);
m.react('📀');
let result = await yts(text);
let ytres = result.videos;
if (!ytres.length) return m.reply('❌ No se encontraron resultados.');
let textoo = `*• Resultados de:*  ${text}\n\n`;
for (let i = 0; i < Math.min(15, ytres.length); i++) { 
let v = ytres[i];
textoo += `🎵 *Título:* ${v.title}\n📆 *Publicado hace:* ${v.ago}\n👀 *Vistas:* ${v.views}\n⌛ *Duración:* ${v.timestamp}\n🔗 *Enlace:* ${v.url}\n\n⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰\n\n`;
}
await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', textoo, m);
};
handler.help = ['playlist', 'yts'];
handler.tags = ['downloader'];
handler.command = ['playvid2', 'playlist', 'playlista', 'yts', 'ytsearch'];
handler.register = true;
export default handler;

/*Codigo con la listas obsoleto
import yts from 'yt-search';
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
if (!text) return m.reply(`*Que esta buscado?* ingrese el nombre del tema\n*• Ejemplo*\n*${usedPrefix + command}* bad bunny `) 
m.react('📀');
    
let result = await yts(text);
let ytres = result.videos;
let listSections = [];
for (let index in ytres) {
let v = ytres[index];
listSections.push({title: `${index} | ${v.title}`,
rows: [{header: '• • •「 🅐🅤🅓🅘🅞 」• • •', title: "", description: `▢ ⌚ Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Publicado* : ${v.title}\n▢ 📆 *Subidos:* ${v.ago}\n`, id: `${usedPrefix}fgmp3 ${v.url}`
}, {
header: "• • •「 🅥🅘🅓🅔🅞 」• • •", title: "" , description: `▢ ⌚ Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Publicado* : ${v.title}\n▢ 📆 *Subidos:* ${v.ago}\n`, id: `${usedPrefix}fgmp4 ${v.url}`
}, {
header: "• • •「 🅓🅞🅒🅤🅜🅔🅝🅣🅞🅢 🅜🅟❸ 」• • •", title: "" , description: `▢ ⌚ Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Publicado* : ${v.title}\n▢ 📆 *Subidos:* ${v.ago}\n`, id: `${usedPrefix}ytmp3doc ${v.url}` }, {
header: "'• • •「 🅓🅞🅒🅤🅜🅔🅝🅣🅞🅢 🅜🅟❹ 」• • •", title: "" , description: `▢ ⌚ Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Publicado* : ${v.title}\n▢ 📆 *Subidos:* ${v.ago}\n`, id: `${usedPrefix}ytmp4doc ${v.url}`
}]});}
    
await conn.sendList(m.chat, `*• Resultados:* ${text}*\n\n> *ᴇʟɪᴊᴀ ᴀ ᴜɴᴀ ᴏᴘᴄɪᴏɴ ʏ ᴘʀᴇsɪᴏɴᴇ ᴇɴᴠɪᴀʀ*`, wm, `🚀 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎 🚀`, ytres[0].image, listSections, m);
};
handler.help = ['playlist', 'yts']
handler.tags = ['downloader']
handler.command = ['playvid2', 'playlist', 'playlista', 'yts', 'ytsearch'] 
handler.register = true 

export default handler
*/

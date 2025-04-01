import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
const errorMsg = await tr("*¿Qué está buscando?* Ingrese el nombre del tema");
const exampleMsg = await tr("Ejemplo");
const noResults = await tr("No se encontraron resultados.");
if (!text) return m.reply(`${errorMsg}\n*• ${exampleMsg}:*\n*${usedPrefix + command}* bad bunny`);
m.react('📀');
let result = await yts(text);
let ytres = result.videos;
if (!ytres.length) return m.reply(`❌ ${noResults}`);

const resultsFor = await tr("Resultados de");
const titleLabel = await tr("Título");
const agoLabel = await tr("Publicado hace");
const viewsLabel = await tr("Vistas");
const durationLabel = await tr("Duración");
const linkLabel = await tr("Enlace");
const resultsForCarousel = await tr("Resultados para");

if (m.isWABusiness) {
let textoo = `*• ${resultsFor}:* ${text}\n\n`;
for (let i = 0; i < Math.min(15, ytres.length); i++) {
let v = ytres[i];
textoo += `🎵 *${titleLabel}:* ${v.title}\n📆 *${agoLabel}:* ${v.ago}\n👀 *${viewsLabel}:* ${v.views}\n⌛ *${durationLabel}:* ${v.timestamp}\n🔗 *${linkLabel}:* ${v.url}\n\n⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰\n\n`;
}
await conn.sendFile(m.chat, ytres[0].image, 'thumbnail.jpg', textoo, m, null, fake);
} else {
let selectedResults = ytres.slice(0, 9);
let messages = selectedResults.map(v => [
``,
`🎵 *${titleLabel}:* ${v.title}\n📆 ${agoLabel}: ${v.ago}\n👀 ${viewsLabel}: ${v.views}\n⌛ ${durationLabel}: ${v.timestamp}`,
v.image,
[],
[["Copia para descargar", `.ytmp4 ${v.url}`]],
[],
[]
]);
await conn.sendCarousel(m.chat, `✅ ${resultsForCarousel}: ${text}`, "🎵 YouTube Search", messages, m);
}
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

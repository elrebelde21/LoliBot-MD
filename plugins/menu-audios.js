import fs from 'fs';
import path from 'path';

const audiosPath = path.resolve('./src/audios.json');
let audios = {};
try {
    audios = JSON.parse(fs.readFileSync(audiosPath));
  } catch (e) {
    console.error('[❌] Error cargando media/audios.json:', e);
}
  
let handler = async (m, { conn }) => {
const nombreBot = conn.user?.name || 'Bot';
const isPrincipal = conn === global.conn;
const tipo = isPrincipal ? 'Bot Oficial' : 'Sub Bot';
const taguser = '@' + m.sender.split('@')[0];
const chatId = m.chat?.trim();
const globalAudios = Object.keys(audios.global || {}).sort();
const localAudios = Object.keys(audios[chatId] || {}).sort();
const listaGlobal = globalAudios.map(v => `* 🔊  _${v}_`).join('\n');
const listaLocal = localAudios.map(v => `* 🔊  _${v}_`).join('\n');

let str = `\`Hola ${taguser} 💖彡\`

\`<MENU DE AUDIOS/>\`
> Escribe las palabras/frases tal como estan, no hace falta poner ningun prefijo (#, ., *, etc) 

${listaGlobal} ${listaLocal.length > 0 ? `\n\n---\n\n\`<LISTA LOCAL/>\`\n\n${listaLocal}` : ''}

*🅛🅞🅛🅘🅑🅞🅣-🅜🅓*`.trim();

const pp = fs.readFileSync('./media/Menu2.jpg');
await conn.sendMessage(m.chat, { text: str,
contextInfo: {
forwardedNewsletterMessageInfo: {
newsletterJid: "120363305025805187@newsletter",
newsletterName: "LoliBot ✨️"
},
forwardingScore: 999,
isForwarded: true,
mentionedJid: await conn.parseMention(str),
externalAdReply: {
mediaUrl: [info.nna, info.nna2, info.md].getRandom(),
mediaType: 2,
showAdAttribution: false,
renderLargerThumbnail: false,
title: "✨️ MENU ✨️",
body: `${nombreBot} (${tipo})`,
thumbnailUrl: info.img2,
sourceUrl: "https://skyultraplus.com"
}}}, { quoted: m });
};
handler.help = ['menu2'];
handler.tags = ['main'];
handler.command = /^(menu2|audios|menú2|memu2|menuaudio|menuaudios|memuaudios|memuaudio|audios|audio)$/i;
handler.register = true;
export default handler;

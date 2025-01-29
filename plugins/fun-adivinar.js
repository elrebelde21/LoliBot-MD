import fs from 'fs';
import fetch from 'node-fetch';
import similarity from 'similarity';
import axios from 'axios';

let timeout = 30000; //30s
let timeout2 = 10000; //10s
let poin = 500; 
const threshold = 0.72; 
let juegos = {};

let handler = async (m, { conn, command, usedPrefix }) => {
let id = m.chat;
if (juegos[id]) return conn.reply(m.chat, '⚠️ ¡Ya hay un juego en curso en este chat! Responde primero.', m); 
try {
// ---------- Adivina acertijos ----------
if (/^(acertijo|acert|adivinanza|tekateki)$/i.test(command)) {
let acertijos = JSON.parse(fs.readFileSync(`./src/game/acertijo.json`));
let pregunta = acertijos[Math.floor(Math.random() * acertijos.length)];

let caption = `${pregunta.question}

*• Tiempo:* ${(timeout / 1000)}s
*• Premio:* +${poin} XP`           
let enviado = await conn.sendMessage(m.chat, { text: caption, contextInfo:{forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "body": `• 𝐀𝐂𝐄𝐍𝐓𝐈𝐉𝐎 •`, "previewType": "PHOTO", thumbnail: imagen1, sourceUrl: md}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
                      
juegos[id] = { tipo: 'acertijo',
pregunta,
caption: enviado,
puntos: poin,
timeout: setTimeout(() => {
if (juegos[id]) {
conn.reply(m.chat, `*👾 Perdiste*\n\nSe acabó el tiempo!`, enviado);
delete juegos[id];
}}, timeout)
}}

// ---------- Adivina la Película ----------
if (/^(advpe|adv|peliculas|pelicula)$/i.test(command)) {
let tekateki = JSON.parse(fs.readFileSync(`./src/game/peliculas.json`));
let json = tekateki[Math.floor(Math.random() * tekateki.length)];
let clue = json.response.replace(/[A-Za-z]/g, '_');

let caption = `
${json.question}

*• Tiempo:* ${(timeout / 1000)}s
*• Bono:* +${poin} XP`
let enviado = await conn.sendMessage(m.chat, { text: caption, contextInfo:{forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": "🎬 ADIVINAN", "body": `LA PELÍCULA CON EMOJIS •`, "previewType": "PHOTO", thumbnail: imagen1, sourceUrl: md}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})

juegos[id] = { tipo: 'pelicula',
pregunta: json,
caption: enviado,
puntos: poin,
timeout: setTimeout(() => {
if (juegos[id]) {
conn.reply(m.chat, `⏳ ¡Tiempo agotado! La respuesta era: *${json.response}*`, enviado);
delete juegos[id];
}}, timeout)
}}

// ---------- Adivina trivia ----------
if (/^(trivia|triviador)$/i.test(command)) {
let tekateki = JSON.parse(fs.readFileSync(`./src/game/trivia.json`));
let json = tekateki[Math.floor(Math.random() * tekateki.length)];
let clue = json.response.replace(/[A-Za-z]/g, '_');

let caption = `
${json.question}

*• Tiempo:* ${(timeout2 / 1000)}s
*• Bono:* +${poin} XP`
let enviado = await conn.sendMessage(m.chat, { text: caption, contextInfo:{forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "body": `• 𝐓𝐑𝐈𝐕𝐈𝐀 •`, "previewType": "PHOTO", thumbnail: imagen1, sourceUrl: md}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})

juegos[id] = { tipo: 'trivia',
pregunta: json,
caption: enviado,
puntos: poin,
timeout2: setTimeout(() => {
if (juegos[id]) {
conn.reply(m.chat, `*👾 Perdiste*\n\nSe acabó el tiempo!`, enviado);
delete juegos[id];
}}, timeout2)
}}
} catch (e) {
console.log(e);
}};

handler.before = async (m) => {
let id = m.chat;
if (!juegos[id] || !m.quoted || !m.quoted.fromMe || !m.quoted.id) return;
let juego = juegos[id];
if (m.quoted.id !== juego.caption.key.id) return;

if (juego.tipo === 'acertijo') {
let respuestaCorrecta = juego.pregunta.response.toLowerCase().trim();
let respuestaUsuario = m.text.toLowerCase().trim();
if (respuestaUsuario === respuestaCorrecta) {
global.db.data.users[m.sender].exp += juego.puntos;
m.reply(`✅ *¡Correcto!*\nGanaste +${juego.puntos} XP`);
m.react("✅")
clearTimeout(juego.timeout);
delete juegos[id];
} else if (similarity(respuestaUsuario, respuestaCorrecta) >= threshold) {
m.reply(`🔥 *Casi!* La respuesta es muy parecida.`);
} else {
m.react("❌")
m.reply(`❌ *Incorrecto!* Intenta de nuevo.`);
}}

if (juego.tipo === 'cancion') {
let respuestaCorrecta = juego.pregunta.jawaban.toLowerCase().trim();
let respuestaUsuario = m.text.toLowerCase().trim();

if (respuestaUsuario === respuestaCorrecta) {
global.db.data.users[m.sender].exp += juego.puntos;
m.reply(`✅ *¡Correcto!*\nGanaste +${juego.puntos} XP`);
m.react("✅️")
clearTimeout(juego.timeout);
delete juegos[id];
} else if (similarity(respuestaUsuario, respuestaCorrecta) >= threshold) {
m.reply(`🎶 *Casi!* Intenta de nuevo.`);
} else {
m.reply(`❌ *Incorrecto!*`);
m.react("❌")
}}

if (juego.tipo === 'pelicula') {
let respuestaCorrecta = juego.pregunta.response.toLowerCase().trim();
let respuestaUsuario = m.text.toLowerCase().trim();

if (respuestaUsuario === respuestaCorrecta) {
global.db.data.users[m.sender].exp += juego.puntos;
m.reply(`🎬 ✅ *¡Correcto!*\nGanaste +${juego.puntos} XP`);
m.react("✅️")
clearTimeout(juego.timeout);
delete juegos[id];
} else if (similarity(respuestaUsuario, respuestaCorrecta) >= threshold) {
m.reply(`🎥 *Casi!* La respuesta es muy parecida.`);
} else {
m.reply(`❌ *Incorrecto!*`);
m.react("❌")
}}

if (juego.tipo === 'trivia') {
let respuestaCorrecta = juego.pregunta.response.toLowerCase().trim();
let respuestaUsuario = m.text.toLowerCase().trim();

if (respuestaUsuario === respuestaCorrecta) {
global.db.data.users[m.sender].exp += juego.puntos;
m.reply(`🎉 ✅ *¡Correcto!*\nGanaste +${juego.puntos} XP`);
m.react("✅️")
clearTimeout(juego.timeout);
delete juegos[id];
} else if (similarity(respuestaUsuario, respuestaCorrecta) >= threshold) {
//m.reply(`💡 *Casi!* Intenta de nuevo.`);
m.react("🤏")
} else {
m.react("❌")
}}
};
handler.help = ['acertijo', 'cancion', 'advpe', 'adv', 'peliculas', 'pelicula', 'trivia', 'triviador'];
handler.tags = ['game'];
handler.command = /^(acertijo|acert|adivinanza|tekateki|cancion|canción|advpe|adv|peliculas|pelicula|trivia|triviador)$/i;
handler.register = true;

export default handler;

async function fetchJson(url, options) {
  try {
options ? options : {};
const res = await axios({method: 'GET', url: url, headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}, ...options});
return res.data;
  } catch (err) {
    return err;
  }
}
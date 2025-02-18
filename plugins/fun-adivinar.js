import fs from 'fs';
import fetch from 'node-fetch';
import similarity from 'similarity';

let timeout = 50000;  // 50s
let timeout2 = 20000; // 20s
let poin = 500;
const threshold = 0.72;
let juegos = {};
const preguntasUsadas = new Set();

const archivosRespaldo = {
  acertijo: "acertijo.json",
  pelicula: "peliculas.json",
  trivia: "trivia.json"
};

async function obtenerPregunta(tipo) {
  let maxIntentos = 9;
  let pregunta = null;
  
for (let i = 0; i < maxIntentos; i++) {
    let prompt = "";
    if (tipo === "acertijo") {
      prompt = "Genera un acertijo con su respuesta en formato JSON: {\"question\": \"<pregunta>\", \"response\": \"<respuesta>\"}. Solo genera el JSON sin ningún comentario adicional.";
    } else if (tipo === "pelicula") {
      prompt = "Genera un juego de adivinar película usando emojis como pista, en formato JSON: {\"question\": \"<pregunta>\", \"response\": \"<respuesta>\"}. Solo genera el JSON sin ningún comentario adicional.";
    } else if (tipo === "trivia") {
      prompt = "Genera una pregunta de trivia con opciones múltiples en formato JSON, siguiendo este formato: {\"question\": \"<pregunta>\\n\\nA) ...\\n\\nB) ...\\n\\nC) ...\", \"response\": \"<letra de la respuesta correcta>\"}. Solo genera el JSON sin ningún comentario adicional.";
    }
  
    try {
      let gpt = await fetch(`${apis}/ia/gptweb?text=${encodeURIComponent(prompt)}`);
      let res = await gpt.json();
      if (res.data) {
        let dataText = res.data;
        const match = dataText.match(/```json\s*([\s\S]*?)\s*```/);
        if (match) {
          dataText = match[1];
        }
        try {
          pregunta = JSON.parse(dataText);
        } catch (error) {
          console.error("Error parseando JSON de GPT:", error);
        }
      }
    } catch (error) {
      console.error("Error en fetch a GPT:", error);
    }
  
    if (!pregunta) {
      try {
        let archivo = `./src/game/${archivosRespaldo[tipo]}`;
        let data = JSON.parse(fs.readFileSync(archivo));
        pregunta = data[Math.floor(Math.random() * data.length)];
      } catch (error) {
        console.error("Error leyendo archivo respaldo:", error);
        return null;
      }
    }
    
    if (pregunta && pregunta.question && !preguntasUsadas.has(pregunta.question)) {
      break;
    } else {
      pregunta = null;
    }
  }
  
  if (!pregunta) return null;
  preguntasUsadas.add(pregunta.question);
  return pregunta;
}

let handler = async (m, { conn, command }) => {
  let id = m.chat;
  if (juegos[id]) return conn.reply(m.chat, '⚠️ Todavía hay un juego sin responder en este chat', m);
  try {
    let tipo = "";
    if (/^(acertijo|acert|adivinanza|tekateki)$/i.test(command)) tipo = "acertijo";
    else if (/^(advpe|adv|peliculas|pelicula)$/i.test(command)) tipo = "pelicula";
    else if (/^(trivia|triviador)$/i.test(command)) tipo = "trivia";
    if (!tipo) return;
    
    let pregunta = await obtenerPregunta(tipo);
    if (!pregunta) return;
    
    let caption = "";
    if (tipo === "acertijo") {      
      caption = await conn.sendMessage(m.chat, { 
        text: `${pregunta.question}\n\n*• Tiempo:* ${(timeout / 1000)}s\n*• Bono:* +${poin} XP`, 
        contextInfo: {
          forwardingScore: 9999999, 
          isForwarded: true, 
          externalAdReply: {
            showAdAttribution: true, 
            containsAutoReply: true, 
            body: `• 𝐀𝐂𝐄𝐍𝐓𝐈𝐉𝐎 •`, 
            previewType: "PHOTO", 
            thumbnail: imagen1, 
            sourceUrl: md
          }
        }
      }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
    } else if (tipo === "pelicula") {
      let clue = pregunta.response.replace(/[A-Za-z]/g, '_');
      caption = await conn.sendMessage(m.chat, { 
        text: `${pregunta.question}\n\n*• Tiempo:* ${(timeout / 1000)}s\n*• Bono:* +${poin} XP`, 
        contextInfo: {
          forwardingScore: 9999999, 
          isForwarded: true, 
          externalAdReply: {
            showAdAttribution: true, 
            containsAutoReply: true, 
            title: "🎬 ADIVINAN", 
            body: `LA PELÍCULA CON EMOJIS •`, 
            previewType: "PHOTO", 
            thumbnail: imagen1, 
            sourceUrl: md
          }
        }
      }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
    } else if (tipo === "trivia") {
      caption = await conn.sendMessage(m.chat, { 
        text: `${pregunta.question}\n\n*• Tiempo:* ${(timeout2 / 1000)}s\n*• Bono:* +${poin} XP`, 
        contextInfo: {
          forwardingScore: 9999999, 
          isForwarded: true, 
          externalAdReply: {
            showAdAttribution: true, 
            containsAutoReply: true, 
            body: `• 𝐓𝐑𝐈𝐕𝐈𝐀 •`, 
            previewType: "PHOTO", 
            thumbnail: imagen1, 
            sourceUrl: md
          }
        }
      }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
    }
    
    let enviado = caption;
    juegos[id] = {
      tipo,
      pregunta,
      caption: enviado,
      puntos: poin,
      timeout: setTimeout(() => {
        if (juegos[id]) {
          conn.reply(m.chat, `⏳ Se acabó el tiempo!\n*Respuesta:* ${pregunta.response}`, enviado);
          delete juegos[id];
        }
      }, tipo === "trivia" ? timeout2 : timeout)
    };
  } catch (e) {
    console.error(e);
  }
};

handler.before = async (m) => {
  let id = m.chat;
  if (!juegos[id] || !m.quoted || !m.quoted.fromMe || !m.quoted.id) return;
  let juego = juegos[id];
  if (m.quoted.id !== juego.caption.key.id) return;

  let respuestaCorrecta = juego.pregunta.response.toLowerCase().trim();
  let respuestaUsuario = m.text.toLowerCase().trim();
  if (respuestaUsuario === respuestaCorrecta) {
    global.db.data.users[m.sender].exp += juego.puntos;
    m.react("✅");
    m.reply(`✅ *¡Correcto!*\nGanaste +${juego.puntos} XP`);
    clearTimeout(juego.timeout);
    delete juegos[id];
  } else if (similarity(respuestaUsuario, respuestaCorrecta) >= threshold) {
    m.reply(`🔥 *Casi!* La respuesta es muy parecida.`);
  } else {
    m.react("❌");
    m.reply(`❌ *Incorrecto!* Intenta de nuevo.`);
  }
};

handler.help = ['acertijo', 'pelicula', 'trivia'];
handler.tags = ['game'];
handler.command = /^(acertijo|acert|adivinanza|tekateki|advpe|adv|peliculas|pelicula|trivia|triviador)$/i;
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

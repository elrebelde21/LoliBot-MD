import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command }) => {
const defaultLang = 'es';
if (!args || !args[0]) return m.reply(`⚠️ *Uso correcto del comando:*  
» ${usedPrefix + command} (idioma destino) (texto a traducir)

📌 *Ejemplos:*
• ${usedPrefix + command} es Hello » Español
• ${usedPrefix + command} en hola » inglés
• ${usedPrefix + command} fr buenos días » Francés
• ${usedPrefix + command} pt tudo bem » Portugués
• ${usedPrefix + command} de cómo estás » Alemán
• ${usedPrefix + command} it buongiorno » Italiano`);

  let lang = args[0];
  let text = args.slice(1).join(' ');

  if ((lang || '').length !== 2) {
    text = args.join(' ');
    lang = defaultLang;
  }

  if (!text && m.quoted && m.quoted.text) text = m.quoted.text;

  if (!text) return m.reply(msg);

  try {
    const res = await fetch("https://tr.skyultraplus.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: lang,
        format: "text",
        alternatives: 3,
        api_key: ""
      }),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    if (!json || !json.translatedText) throw '❌ No se pudo traducir.';

    await m.reply(`*Traducción:*\n${json.translatedText}`);
  } catch (e) {
    console.error(e);
    await m.reply('*[❗𝐈𝐍𝐅𝐎❗] ERROR, VUELVA A INTENTARLO*');
  }
};

handler.help = ['traducir', 'translate'];
handler.tags = ['tools'];
handler.command = /^(translate|traducir|trad)$/i;
handler.register = true;

export default handler;

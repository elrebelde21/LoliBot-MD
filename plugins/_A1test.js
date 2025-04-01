const handler = async (m, { conn, usedPrefix, command }) => {
// En otro handler
const otroTexto = await tr("HOLA COMO ESTA?");
await conn.reply(m.chat, otroTexto, m);
m.reply("Hola usuario texto 2 test")
};

handler.command = /^(test)$/i;
export default handler;

export async function tr2(baseText) {
  const m = global.currentMessageContext;
  const targetLang = m ? global.db?.data?.users[m.sender]?.language || global.lang : global.lang;
  
  //console.log("Debug tr:", { baseText, targetLang, sender: m?.sender, globalLang: global.lang });
  
  if (targetLang === 'es') return baseText;
  return await translateText(baseText);
}

export async function translateText2(text) {
  if (typeof text !== 'string' || !text.trim()) return text;

  const m = global.currentMessageContext;
  const targetLang = m ? global.db?.data?.users[m.sender]?.language || global.lang : global.lang;
  
  console.log("Debug translateText:", { text, targetLang });
  
  try {
    const textRegex = /\b(?![\w.]*\.[\w.]*)([\p{L}0-9][\p{L}0-9\s]*)\b/gu;
    const translatableParts = [...text.matchAll(textRegex)].map(match => match[1].trim()).filter(Boolean);

    console.log("Translatable parts:", translatableParts);

    if (translatableParts.length === 0) {
      console.log("No translatable parts found, returning original text");
      return text;
    }

    const res = await fetch("https://tr.skyultraplus.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: translatableParts.join("\n"),
        source: "auto",
        target: targetLang
      }),
      timeout: 5000
    });

    console.log("API response status:", res.status);

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.log("Invalid content type:", contentType);
      return text;
    }

    const data = await res.json();
    console.log("API response data:", data);

    const translated = data.translatedText?.split("\n") || translatableParts;

    let index = 0;
    const translatedText = text.replace(textRegex, (match, group1) => {
      const current = translated[index++];
      return current ? current : match;
    });

    return translatedText;
  } catch (err) {
    console.error("Error en traducción:", err);
    return text;
  }
}
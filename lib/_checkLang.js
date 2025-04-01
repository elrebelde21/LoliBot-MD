export async function tr(baseText) {
  const m = global.currentMessageContext;
  const targetLang = m ? global.db?.data?.users[m.sender]?.language || global.lang : global.lang;
  
  // Si el idioma es español, devolver el texto original sin traducir
  if (targetLang === 'es') return baseText;
  
  // Si no es español, traducir el texto
  return await translateText(baseText);
}

export async function translateText(text) {
  if (typeof text !== 'string' || !text.trim()) return text;

  const m = global.currentMessageContext;
  const targetLang = m ? global.db?.data?.users[m.sender]?.language || global.lang : global.lang;
  
  try {
    const textRegex = /\b(?![\w.]*\.[\w.]*)([\p{L}0-9][\p{L}0-9\s]*)\b/gu;
    const translatableParts = [...text.matchAll(textRegex)].map(match => match[1].trim()).filter(Boolean);

    if (translatableParts.length === 0) return text;

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

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {      
      return text;
    }

    const data = await res.json();
    const translated = data.translatedText?.split("\n") || translatableParts;

    let index = 0;
    const translatedText = text.replace(textRegex, (match, group1) => {
      const current = translated[index++];
      return current ? current : match;
    });

    return translatedText;
  } catch (err) {
    console.error("Error en traducción:", err);
    return text; // Devuelve el texto original si hay error
  }
}
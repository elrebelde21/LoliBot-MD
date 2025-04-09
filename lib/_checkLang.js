const translationCache = new Map();

export async function tr(baseText) {
  const m = global.currentMessageContext;
  const targetLang = m ? global.db?.data?.users[m.sender]?.language || global.lang : global.lang;
  if (targetLang === 'es') return baseText;

  const cacheKey = `${baseText}:${targetLang}`;

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const translatedText = await translateText(baseText, targetLang);

  translationCache.set(cacheKey, translatedText);

  if (translationCache.size > 1000) {
    const firstKey = translationCache.keys().next().value;
    translationCache.delete(firstKey);
  }

  return translatedText;
}

export async function translateText(text, targetLang) {
  if (typeof text !== 'string' || !text.trim()) return text;

  try {
    const textRegex = /\b(?![\w.]*\.[\w.]*)([\p{L}0-9][\p{L}0-9\s]*)\b/gu;
    const translatableParts = [...text.matchAll(textRegex)].map(match => match[1].trim()).filter(Boolean);

    if (translatableParts.length === 0) {
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

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.log("Invalid content type:", contentType);
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
    return text;
  }
}
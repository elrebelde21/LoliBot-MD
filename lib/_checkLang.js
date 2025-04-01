export async function tr(baseText, defaultSpanish) {
  const safeBaseText = typeof baseText === 'string' ? baseText : '';
  const safeDefaultSpanish = typeof defaultSpanish === 'string' ? defaultSpanish : '';
  const m = global.currentMessageContext || {};
  const targetLang = m ? 
    (global.db?.data?.users[m.sender]?.language || global.lang || 'es') : 
    (global.lang || 'es');
  
  return targetLang === 'es' ? safeDefaultSpanish : await translateText(safeBaseText);
}

export async function translateText(text) {
  if (typeof text !== 'string' || !text.trim()) return text || '';

  const m = global.currentMessageContext || {};
  const targetLang = m ? 
    (global.db?.data?.users[m.sender]?.language || global.lang || 'es') : 
    (global.lang || 'es');
  if (targetLang === 'es') return text;

  try {
    // Dividir el texto en partes usando una expresión más robusta
    const parts = text.match(/(\p{Emoji_Presentation}|\p{Emoji}|\p{L}+|[^\p{L}\s])/gu) || [text];
    // Mapa para rastrear qué partes son traducibles
    const translatableMap = parts.map(part => /^[a-zA-Z]+$/.test(part.trim()));
    const translatableParts = parts.filter(part => /^[a-zA-Z]+$/.test(part.trim()));

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
    const translated = (data.translatedText || '').split("\n").filter(Boolean) || translatableParts;

    // Reconstruir el texto preservando todo
    let transIndex = 0;
    const translatedText = parts.map((part, i) => {
      if (translatableMap[i] && transIndex < translated.length) {
        return translated[transIndex++];
      }
      return part;
    }).join('');

    return translatedText || text;
  } catch (err) {
    console.error("Error en traducción:", err);
    return text; // Devolver texto original si falla
  }
}
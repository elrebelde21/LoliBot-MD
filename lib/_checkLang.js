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
    // Separar el texto en partes: palabras traducibles y no traducibles (emojis, símbolos)
    const parts = text.split(/(\s+|[^\p{L}0-9\s]+)/gu);
    const translatableParts = parts
      .map(part => part.trim())
      .filter(part => /^[a-zA-Z0-9]+$/.test(part)); // Solo palabras alfanuméricas

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

    // Reconstruir el texto preservando las partes no traducibles
    let transIndex = 0;
    const translatedText = parts.map(part => {
      if (/^[a-zA-Z0-9]+$/.test(part.trim()) && transIndex < translated.length) {
        return translated[transIndex++];
      }
      return part;
    }).join('');

    return translatedText || text;
  } catch (err) {
    console.error("Error en traducción:", err);
    return text; // Devuelve el texto original si hay error
  }
}
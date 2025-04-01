const handler = async (m, { text }) => {
let user = global.db.data.users[m.sender] || {};
    
const supportedLanguages = {
'es': { name: 'Español', num: 1, flag: '🇪🇸' },
'en': { name: 'Inglés', num: 2, flag: '🇬🇧' },
'fr': { name: 'Francés', num: 3, flag: '🇫🇷' },
'de': { name: 'Alemán', num: 4, flag: '🇩🇪' },
'pt': { name: 'Portugués', num: 5, flag: '🇵🇹' },
'id': { name: 'Bahasa Indonesia', num: 6, flag: '🇮🇩' },
'it': { name: 'Italiano', num: 7, flag: '🇮🇹' },
'ru': { name: 'Ruso', num: 8, flag: '🇷🇺' },
'zh': { name: 'Chino', num: 9, flag: '🇨🇳' },
'ar': { name: 'Árabe', num: 10, flag: '🇸🇦' },
'hi': { name: 'Hindi', num: 11, flag: '🇮🇳' },
'ko': { name: 'Coreano', num: 12, flag: '🇰🇷' },
'tr': { name: 'Turco', num: 13, flag: '🇹🇷' },
'nl': { name: 'Holandés', num: 14, flag: '🇳🇱' },
'sv': { name: 'Sueco', num: 15, flag: '🇸🇪' },
'fi': { name: 'Finlandés', num: 16, flag: '🇫🇮' },
'pl': { name: 'Polaco', num: 17, flag: '🇵🇱' },
'ja': { name: 'Japonés', num: 18, flag: '🇯🇵' },
};

let msgLang = await tr("Idiomas soportados")    
let msgLang2 = await tr("Usa /setlang [código|nombre|número]")
let msgLang3 = await tr("Idioma no reconocido. Usa")
let msgLang4 = await tr("sin argumentos para ver la lista de idiomas.")
let msgLang5 = await tr("Idioma cambiado a")

if (!text) {
let langList = `🌍 *${msgLang}:*\n\n`;
for (const [code, data] of Object.entries(supportedLanguages)) {
langList += `${data.num}. ${data.flag} ${data.name} (${code.toUpperCase()})\n`;
}
langList += `\n💡 ${msgLang2}`
return m.reply(langList);
}
    
let langCode = null;
text = text.toLowerCase();
    
if (!isNaN(text)) {
const num = parseInt(text);
for (const [code, data] of Object.entries(supportedLanguages)) {
if (data.num === num) {
langCode = code;
break;
}}
} else if (supportedLanguages[text]) {
langCode = text;
} else {
for (const [code, data] of Object.entries(supportedLanguages)) {
if (data.name.toLowerCase() === text) {
langCode = code;
break;
}}}
    
if (!langCode) return m.reply(`❌ ${msgLang3} /setlang ${msgLang4}`);
user.language = langCode;
const langData = supportedLanguages[langCode];
m.reply(`✅ ${msgLang5}: ${langData.flag} ${langData.name} (${langCode.toUpperCase()})`);
};
handler.help = ['setlang [código|nombre|número] - Cambia el idioma del bot'];
handler.tags = ['tools'];
handler.command = /^(setlang|idioma|cambiaridioma)$/i;
export default handler;
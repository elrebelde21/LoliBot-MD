import fetch from 'node-fetch';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) throw `*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐮𝐧 𝐭𝐞𝐱𝐭𝐨 𝐩𝐚𝐫𝐚 𝐜𝐫𝐞𝐚𝐫 𝐮𝐧𝐚 𝐢𝐦𝐚𝐠𝐞𝐧 𝐲 𝐚𝐬𝐢 𝐮𝐬𝐚𝐫 𝐥𝐚 𝐟𝐮𝐧𝐜𝐢𝐨𝐧 𝐝𝐞 𝐝𝐚𝐥𝐥-𝐞*\n\n*• 𝐄𝐣𝐞𝐦𝐩𝐥𝐨:*\n*${usedPrefix + command} gatitos llorando*`;
m.react('⌛') 
try {
const tiores1 = await fetch(`https://vihangayt.me/tools/imagine?q=${text}`);
const json1 = await tiores1.json();
await conn.sendMessage(m.chat, {image: {url: json1.data}}, {quoted: m});
m.react('✅') 
} catch {  
console.log('[❗] Error en la api numero 1 de dall-e.')
try {
const tiores2 = await conn.getFile(`https://vihangayt.me/tools/midjourney?q=${text}`);
await conn.sendMessage(m.chat, {image: {url: tiores2.data}}, {quoted: m});
m.react('✅') 
} catch {
console.log('[❗] Error en la api numero 2 de dall-e.');
try {
const tiores3 = await fetch(`https://vihangayt.me/tools/lexicaart?q=${text}`);
const json3 = await tiores3.json();
await conn.sendMessage(m.chat, {image: {url: json3.data[0].images[0].url}}, {quoted: m});
m.react('✅') 
} catch {
console.log('[❗] Error en la api numero 3 de dall-e.');
try {
const tiores4 = await conn.getFile(`https://api.lolhuman.xyz/api/dall-e?apikey=${lolkeysapi}&text=${text}`);
await conn.sendMessage(m.chat, {image: {url: tiores4.data}}, {quoted: m});
m.react('✅') 
} catch (e) {
console.log('[❗] Error, ninguna api funcional.\n' + e);
m.react('❌') 
}}}}};
handler.help = ["dalle"]
handler.tags = ["buscadores"]
handler.command = ['dall-e', 'dalle', 'ia2', 'cimg', 'openai3', 'a-img', 'aimg', 'imagine'];
handler.register = true
export default handler;

import uploadImage from '../lib/uploadImage.js';
const handler = async (m, {conn, text, args, usedPrefix, command}) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || q.mediaType || '';
if (!/image/g.test(mime)) throw `⚠️ ¿${await tr("Hey no sabes como usar este comando pendejo? responde a una imagen")}`
m.react(`⌛`) 
const data = await q.download?.();
const image = await uploadImage(data);
try {
const anime = `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${image}`;
await conn.sendFile(m.chat, anime, 'error.jpg', null, m, null, fake);
m.react(`✅`) 
} catch (i) {
try {
const anime2 = `https://api.zahwazein.xyz/photoeditor/jadianime?url=${image}&apikey=${keysxxx}`;
await conn.sendFile(m.chat, anime2, 'error.jpg', null, m, null, fake);
m.react(`✅`)  
} catch (a) {
try {
const anime3 = `https://api.caliph.biz.id/api/animeai?img=${image}&apikey=caliphkey`;
await conn.sendFile(m.chat, anime3, 'error.jpg', null, m, null, fake);
m.react(`✅`)         
} catch (e) {
m.reply(`\`\`\`⚠️ ${await tr("OCURRIO UN ERROR")} ⚠️\`\`\`\n\n> *${await tr("Reporta el siguiente error a mi creador con el comando:")}* #report\n\n>>> ${e} <<<< `)      
console.log(e) 
m.react(`❌`) 
}}}};
handler.help = ['toanime'];
handler.tags = ['convertidor']
handler.command = /^(jadianime|toanime)$/i;
handler.register = true
export default handler;

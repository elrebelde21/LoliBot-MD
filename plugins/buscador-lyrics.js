const handler = async (m, {conn, text, usedPrefix, command}) => {
const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '';
if (!teks) return m.reply(`*⚠️ ¿Que esta buscando? ingresa el nombre del tema para buscar la letra de la canción, ejemplo:* ${usedPrefix + command} ozuna te vas`)
try {
const res = await fetch(`https://api.fgmods.xyz/api/other/lyrics?text=${text}&apikey=${info.fgmods.key}`)
const data = await res.json();
const textoLetra = `*🎤 𝙏𝙞𝙩𝙪𝙡𝙤:* ${data.result.title}\n*👤 𝘼𝙪𝙩𝙤𝙧:* ${data.result.artist}\n*🎶 𝙐𝙧𝙡:* ${data.result.url || 'No disponible'}\n\n*📃🎵 𝙇𝙚𝙩𝙧𝙖:*\n${data.result.lyrics}`;
const img = data.result.image
conn.sendFile(m.chat, img, 'error,jpg', textoLetra, m);
} catch {
try {
const res = await fetch(`${info.apis}/search/letra?query=${text}`);
const data = await res.json();
if (data.status !== "200" || !data.data) return conn.reply(m.chat, 'No se encontró la letra de la canción especificada.', m);

const textoLetra = `*🎤 𝙏𝙞𝙩𝙪𝙡𝙤:* ${data.data.title || 'Desconocido'}\n*👤 𝘼𝙪𝙩𝙤𝙧:* ${data.data.artist || 'Desconocido'}\n*🔗 𝘼𝙧𝙩𝙞𝙨𝙩𝙖:* ${data.data.artistUrl || 'No disponible'}\n*🎶 𝙐𝙧𝙡:* ${data.data.url || 'No disponible'}\n\n*📃🎵 𝙇𝙚𝙩𝙧𝙖:*\n${data.data.lyrics || 'Letra no disponible'}`;
const img = data.data.image
conn.sendFile(m.chat, img, 'error,jpg', textoLetra, m);
//conn.sendMessage(m.chat, { image: { url: img }, caption: textoLetra }, { quoted: m });
} catch (e) {
m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${e} <<<< `)       
console.log(e)
}}}
handler.help = ['lirik', 'letra'].map((v) => v + ' <Apa>');
handler.tags = ['buscadores'];
handler.command = /^(lirik|lyrics|lyric|letra)$/i;
handler.register = true
export default handler;

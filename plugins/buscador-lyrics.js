const handler = async (m, {conn, text, usedPrefix, command}) => {
const teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '';
if (!teks) throw `*⚠️ ${await tr("¿Que esta buscando? ingresa el nombre del tema para buscar la letra de la canción, ejemplo:")}* ${usedPrefix + command} ozuna te vas`;
try {
const res = await fetch(`https://api.fgmods.xyz/api/other/lyrics?text=${text}&apikey=${fgkeysapi}`)
const data = await res.json();
const textoLetra = `*🎤 ${await tr("Titulo")}:* ${data.result.title}\n*👤 ${await tr("Autor")}:* ${data.result.artist}\n*🎶 𝙐𝙧𝙡:* ${data.result.url || 'No disponible'}\n\n*📃🎵 ${await tr("Letra")}:*\n${data.result.lyrics}`;
const img = data.result.image
conn.sendFile(m.chat, img, 'error,jpg', textoLetra, m, null, fake);
} catch {
try {
const res = await fetch(`${apis}/search/letra?query=${text}`);
const data = await res.json();
if (data.status !== "200" || !data.data) return conn.reply(m.chat, 'No se encontró la letra de la canción especificada.', m);

const textoLetra = `*🎤 ${await tr("Titulo")}:* ${data.data.title || 'Desconocido'}\n*👤 ${await tr("Autor")}:* ${data.data.artist || 'Desconocido'}\n*🔗 ${await tr("Artista")}:* ${data.data.artistUrl || 'No disponible'}\n*🎶 𝙐𝙧𝙡:* ${data.data.url || 'No disponible'}\n\n*📃🎵 ${await tr("Letra")}:*\n${data.data.lyrics || 'Letra no disponible'}`;
const img = data.data.image
conn.sendFile(m.chat, img, 'error,jpg', textoLetra, m, null, fake);
//conn.sendMessage(m.chat, { image: { url: img }, caption: textoLetra }, { quoted: m });
} catch (e) {
m.reply(`\`\`\`⚠️ ${await tr("OCURRIO UN ERROR")} ⚠️\`\`\`\n\n> *${await tr("Reporta el siguiente error a mi creador con el comando:")}* #report\n\n>>> ${e} <<<< `)       
console.log(e)
}}}
handler.help = ['lirik', 'letra'].map((v) => v + ' <Apa>');
handler.tags = ['buscadores'];
handler.command = /^(lirik|lyrics|lyric|letra)$/i;
handler.register = true
export default handler;

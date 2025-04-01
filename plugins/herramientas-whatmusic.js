import fs from 'fs';
import acrcloud from 'acrcloud';
const acr = new acrcloud({host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu',
});

const handler = async (m) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || '';
if (/audio|video/.test(mime)) {
if ((q.msg || q).seconds > 20) return m.reply(await tr('⚠️ El archivo que carga es demasiado grande, le sugerimos que corte el archivo grande a un archivo mas pequeño, 10-20 segundos los datos de audio son suficientes para identificar'))
const media = await q.download();
const ext = mime.split('/')[1];
fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media);
const res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`));
const {code, msg} = res.status;
if (code !== 0) throw msg;
const {title, artists, album, genres, release_date} = res.metadata.music[0];
const txt = `*\`${await tr("RESULTADOS DE LA BÚSQUEDA")}\`*

• 📌 ${await tr("Titulo")}: ${title}
• 👨‍🎤 ${await tr("Artista")}: ${artists !== undefined ? artists.map((v) => v.name).join(', ') : await tr('No encontrado')}
• 💾 ${await tr("Album")}: ${album.name || await tr('No encontrado')}
• 🌐 ${await tr("Genero")}: ${genres !== undefined ? genres.map((v) => v.name).join(', ') : await tr('No encontrado')}
• 📆 ${await tr("Fecha de lanzamiento")}: ${release_date || await tr('No encontrado')}
`.trim();
fs.unlinkSync(`./tmp/${m.sender}.${ext}`);
m.reply(txt);
} else throw await tr('*⚠️ Responde a un audio*')
};
handler.help = ['quemusica']
handler.tags = ['tools']
handler.command = /^quemusica|quemusicaes|whatmusic$/i;
handler.register = true 
export default handler;

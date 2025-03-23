import jimp from 'jimp';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (!/image/.test(mime)) throw '⚠️ ️𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝙀 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉';

    let img = await q.download();
    if (!img) throw '*⚠️️ Responde a una imagen.*';

    let jimpImage = await jimp.read(img);
    let resizedImage = await jimpImage.resize(720, jimp.AUTO).getBufferAsync(jimp.MIME_JPEG);

    await conn.updateProfilePicture(m.chat, resizedImage);
    m.react("✅️")
  } catch (error) {
    console.error(error);
    throw '*⚠️ Ocurrió un error al procesar la imagen.*';
  }
};

handler.help = ['setppgc'];
handler.tags = ['group'];
handler.command = /^setpp(group|grup|gc)?$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
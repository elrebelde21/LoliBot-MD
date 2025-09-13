import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  if (!mime) throw `✳️ Y la imagen/video?`;

  const media = await q.download();
  const form = new FormData();
  form.append("file", media, {
    filename: "file." + mime.split("/")[1],
    contentType: mime
  });
  form.append("name", "tourl2_" + Date.now());

  try {
    const res = await fetch("https://cdn.skyultraplus.com/upload.php", {
      method: "POST",
      headers: {
        "X-API-Key": "4d5d66de3b4e4926" 
      },
      body: form
    });

    const json = await res.json();
    if (!json.ok) throw json.error || "Error desconocido";

    return m.reply(`✅ Archivo subido con éxito:\n${json.url}`);
  } catch (e) {
    console.error(e);
    throw `❌ Error al subir a SkyUltraPlus:\n${e}`;
  }
};

handler.help = ['tourl2'];
handler.tags = ['convertidor'];
handler.command = /^(tourl2)$/i;
handler.register = true;

export default handler;

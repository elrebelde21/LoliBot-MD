import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { sticker } from '../lib/sticker.js';
import { db } from '../lib/postgres.js';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) return m.reply(`⚠️ Escribe algo para buscar sticker packs.\nEjemplo: *${usedPrefix + command} gatos*`);

  try {
    const res = await fetch(`https://zenzxz.dpdns.org/search/stickerlysearch?query=${encodeURIComponent(text)}`);
    const json = await res.json();
    if (!json.status || !json.data || json.data.length === 0)
      return m.reply(`❌ No se encontró ningún pack para: *${text}*`);

    const pack = json.data[0];
    const packUrl = pack.url;
    const htmlRes = await fetch(packUrl);
    const html = await htmlRes.text();
    const $ = cheerio.load(html);
    let stickerUrls = [];
    $('img[src*=".webp"]').each((_, el) => {
      let url = $(el).attr('src');
      if (url && url.includes('sticker_pack')) {
        stickerUrls.push(url);
      }
    });

    if (stickerUrls.length === 0) return m.reply('❌ No se encontraron stickers en el pack.');
    const userResult = await db.query('SELECT sticker_packname, sticker_author FROM usuarios WHERE id = $1', [m.sender]);
    const user = userResult.rows[0] || {};
    const packname = user.sticker_packname || global.info.packname;
    const author = user.sticker_author || global.info.author;
    m.reply(`📦 *Pack:* ${pack.name}\n👤 *Autor:* ${pack.author}\n📤 *Total encontrados:* ${stickerUrls.length}\n🕒 Enviando...`);

    let enviados = 0;
    for (let url of stickerUrls.slice(0, 50)) {
      try {
        let stkr = await sticker(false, url, packname, author);
        if (stkr) {
          await conn.sendFile(m.chat, stkr, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: info.wm, body: pack.name, mediaType: 2, sourceUrl: [info.nna, info.nna2, info.md, info.yt].getRandom(), thumbnail: m.pp}}}, { quoted: m })
        //  conn.sendFile(m.chat, stkr, 'sticker.webp', '', m);
          enviados++;
          await new Promise(res => setTimeout(res, 1000));
        }
      } catch (e) {
        console.log('[STICKER ERROR]', e);
      }
    }

    if (enviados === 0) return m.reply('❌ No se pudo enviar ningún sticker.');
    else return m.reply(`✅ *${enviados} stickers enviados exitosamente.*`);

  } catch (e) {
    console.error(e);
    m.react("❌️")
  }
};

handler.command = ['stickerly'];
handler.help = ['stickerly <text>'];
handler.tags = ['sticker'];
handler.register = true;

export default handler;

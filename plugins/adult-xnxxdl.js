import fetch from 'node-fetch';
import cheerio from 'cheerio';
const handler = async (m, {conn, args, command, usedPrefix}) => {
let porn = 'https://qu.ax/bXMB.webp'
let porn2 = 'https://qu.ax/TxtQ.webp'
if (!db.data.chats[m.chat].modohorny && m.isGroup) return conn.sendFile(m.chat, [porn, porn2].getRandom(), 'sticker.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `ᴸᵒˢ ᶜᵒᵐᵃⁿᵈᵒ ʰᵒʳⁿʸ ᵉˢᵗᵃ ᵈᵉˢᵃᶜᵗᶦᵛᵃᵈᵒ ˢᶦ ᵉʳᵉˢ ᵃᵈᵐᶦⁿ ʸ ᵠᵘᶦᵉʳᵉ ᵃᶜᵗᶦᵛᵃʳˡᵒˢ ᵘˢᵃʳ:`, body: '#enable modohorny', mediaType: 2, sourceUrl: md, thumbnail: imagen3}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})   
  if (!args[0]) throw `*⚠️ ¿Que esta buscando pajin? ingresa un enlace valido de xnxx*\n\n*Aqui te recomiendo uno ejemplo:* ${usedPrefix + command} https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano*`;
  try {
m.react(`⌛`) 
    let xnxxLink = '';
    if (args[0].includes('xnxx')) {
      xnxxLink = args[0];
    } else {
      const index = parseInt(args[0]) - 1;
      if (index >= 0) {
        if (Array.isArray(global.videoListXXX) && global.videoListXXX.length > 0) {
          const matchingItem = global.videoListXXX.find((item) => item.from === m.sender);
          if (matchingItem) {
            if (index < matchingItem.urls.length) {
              xnxxLink = matchingItem.urls[index];
            } else {
              throw `*[❗] 𝙽𝙾 𝚂𝙴 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙾 𝚄𝙽 𝙴𝙽𝙻𝙰𝙲𝙴 𝙿𝙰𝚁𝙰 𝙴𝚂𝙴 𝙽𝚄𝙼𝙴𝚁𝙾, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝚄𝙽 𝙽𝚄𝙼𝙴𝚁𝙾 𝙴𝙽𝚃𝚁𝙴 𝙴𝙻 1 𝚈 𝙴𝙻 ${matchingItem.urls.length}*`;
            }
          } else {
            throw `*[❗] 𝙿𝙰𝚁𝙰 𝙿𝙾𝙳𝙴𝚁 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙳𝙴 𝙴𝚂𝚃𝙰 𝙵𝙾𝚁𝙼𝙰 (${usedPrefix + command} <numero>), 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚁𝙴𝙰𝙻𝙸𝚉𝙰 𝙻𝙰 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰 𝙳𝙴 𝚅𝙸𝙳𝙴𝙾𝚂 𝙲𝙾𝙽 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 ${usedPrefix}xnxxsearch <texto>*`;
          }
        } else {
          throw `*[❗] 𝙿𝙰𝚁𝙰 𝙿𝙾𝙳𝙴𝚁 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙳𝙴 𝙴𝚂𝚃𝙰 𝙵𝙾𝚁𝙼𝙰 (${usedPrefix + command} <numero>), 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚁𝙴𝙰𝙻𝙸𝚉𝙰 𝙻𝙰 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰 𝙳𝙴 𝚅𝙸𝙳𝙴𝙾𝚂 𝙲𝙾𝙽 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 ${usedPrefix}xnxxsearch <texto>*`;
        }
      }
    }
    const res = await xnxxdl(xnxxLink);
    const json = await res.result.files;
    conn.sendMessage(m.chat, {document: {url: json.high}, mimetype: 'video/mp4', fileName: res.result.title}, {quoted: m});
m.react(`🔥`) 
  } catch {
    throw '*⚠️ ¿Que esta buscando pajin? ingresa un enlace valido de xnxx*\n\n*Aqui te recomiendo uno algo similar a estos:* https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano';
  }
};
handler.help = ['xnxxdl']
handler.tags = ['nsfw'];
handler.command = /^(xnxxdl)$/i;
handler.limit = 12
handler.register = true
export default handler;

async function xnxxdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: 200, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({code: 503, status: false, result: err}));
  });
}

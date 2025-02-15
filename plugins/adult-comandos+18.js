import axios from "axios";
import fetch from "node-fetch";
import moment from 'moment-timezone';
import fs from "fs"
const handler = async (m, {command, conn}) => {
let porn = 'https://qu.ax/bXMB.webp'
let porn2 = 'https://qu.ax/TxtQ.webp'
const fakee2 = { contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name }, externalAdReply: { title: "🥵 CONTENIDO +18🥵", body: "No alto para menores..", mediaType: 1, renderLargerThumbnail: false, previewType: `PHOTO`, thumbnail: imagen3, sourceUrl: redes.getRandom() }}}
if (!db.data.chats[m.chat].modohorny && m.isGroup) {
handler.limit = false
conn.sendFile(m.chat, [porn, porn2].getRandom(), 'sticker.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `ᴸᵒˢ ᶜᵒᵐᵃⁿᵈᵒ ʰᵒʳⁿʸ ᵉˢᵗᵃ ᵈᵉˢᵃᶜᵗᶦᵛᵃᵈᵒ ᵖᵃʳᵃ ᵃᶜᵗᶦᵛᵃʳ ᵘˢᵃʳ:`, body: '#enable modohorny', mediaType: 2, sourceUrl: md, thumbnail: imagen3}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
return
}
const horarioNsfw = db.data.chats[m.chat].horarioNsfw
const now = moment.tz('America/Argentina/Buenos_Aires');
const currentTime = now.format('HH:mm');

if (horarioNsfw) {
const { inicio, fin } = horarioNsfw;
const inicioTime = moment(inicio, 'HH:mm').tz('America/Argentina/Buenos_Aires');
const finTime = moment(fin, 'HH:mm').tz('America/Argentina/Buenos_Aires');
const currentMoment = moment(currentTime, 'HH:mm').tz('America/Argentina/Buenos_Aires');
let isWithinTimeRange = false;
if (inicioTime.isAfter(finTime)) {
if (currentMoment.isBetween(inicioTime, moment('23:59', 'HH:mm').tz('America/Argentina/Buenos_Aires')) || 
currentMoment.isBetween(moment('00:00', 'HH:mm').tz('America/Argentina/Buenos_Aires'), finTime)) {
isWithinTimeRange = true;
}} else {
if (currentMoment.isBetween(inicioTime, finTime)) {
isWithinTimeRange = true;
}}
if (!isWithinTimeRange) {
handler.limit = false
conn.sendFile(m.chat, [porn, porn2].getRandom(), 'sticker.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ˢᵒˡᵒ ᶠᵘⁿᶜᶦᵒⁿᵃ ᵉˡ ʰᵒʳᵃʳᶦᵒ ʰᵃᵇᶦˡᶦᵗᵃᵈᵒ ᵉˡ ᵍʳᵘᵖᵒ:`, body: `${inicio} a ${fin}`, mediaType: 2, sourceUrl: md, thumbnail: imagen3}}}, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
return
}}
 
if (command == 'videos') {  
conn.sendFile(m.chat, `${apis}/nsfw/tiktok`, 'error.mp4', "😘", m, null, fakee2);
}
 
if (command == 'hentai') {
conn.sendFile(m.chat, "https://delirius-nsfw.onrender.com/media/h/bdsm", 'error.jpg', "🥵", m, null, fakee2);
//conn.sendFile(m.chat, "https://delirius-nsfw.onrender.com/media/h/bdsm", null, " 🥵", null, null, { viewOnce: true }, m, null, fake)
//conn.sendButton(m.chat, '🥵', botname, "https://delirius-nsfw.onrender.com/media/h/bdsm", [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m)
}

if (command == 'nsfwloli') {
let nsfw = JSON.parse(fs.readFileSync('./src/nsfw/nsfwloli.json'))
conn.sendFile(m.chat, nsfw.url, null, "🥵", null, null, { viewOnce: true }, m, null, fake)
//conn.sendButton(m.chat, '🥵', botname, result.url, [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m)
}

if (command == 'china') {
conn.sendFile(m.chat, `${apis}/nsfw/corean`, 'error.jpg', "🥵", m, null, fakee2, { viewOnce: true }, null)
//conn.sendButton(m.chat, '*Te gustó 😏*', botname, "https://deliriusapi-official.vercel.app/api/china", [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m)
}

if (command == 'boobs') {
conn.sendFile(m.chat, `${apis}/nsfw/boobs`, null, "Upa la paja 😱", null, null, { viewOnce: true }, m, null, fake)
//conn.sendButton(m.chat, '*Upa la paja*', botname, "https://deliriusapi-official.vercel.app/api/boobs", [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m)
}

if (command == 'hentai2') {
let hentai = JSON.parse(fs.readFileSync('./src/nsfw/neko.json'))
let hentairesult = hentai.getRandom()
conn.sendFile(m.chat, hentairesult, null, "Upa la paja 😱", null, null, { viewOnce: true }, m, null, fake)
//conn.sendButton(m.chat, '🥵', botname, hentairesult, [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m)
}
 
if (command == 'porno') {
//conn.sendButton(m.chat, '🥵 Uff pa una pajita 🥵', botname, "https://delirius-nsfw.onrender.com/media/r/ass", [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m)
conn.sendFile(m.chat, `${apis}/nsfw/girls`, null, "🥵 Uff pa una pajita 🥵", null, null, { viewOnce: true }, m, null, fakee2)
}

if (command == 'tetas') {
const resError = (await axios.get(`https://raw.githubusercontent.com/elrebelde21/NovaBot-MD/master/src/nsfw/tetas.json`)).data;
let res = await conn.getFile(`https://api-fgmods.ddns.net/api/nsfw/boobs?apikey=fg-dylux`).data;
if (res == '' || !res || res == null) res = await resError[Math.floor(resError.length * Math.random())];
conn.sendFile(m.chat, res, 'error.jpg', "🥵 dame lechita de hay 🥵", m, null, fakee2);
//conn.sendButton(m.chat, `🥵 dame lechita de hay 🥵`, botname, res, [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m)
//conn.sendFile(m.chat, res, 'thumbnail.jpg', `listo`, m)
}

  if (command == 'pornololi') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwloli.json`)).data;
    const haha = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, haha, 'error.jpg', "🥵", m, null, fakee2);
  }

if (command == 'nsfwfoot') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwfoot.json`)).data;
    const haha = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, haha, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
    //conn.sendMessage(m.chat, {image: {url: haha}, caption: `_${command}_`.trim()}, {quoted: m});
  }

  if (command == 'nsfwass') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwass.json`)).data;
    const haha = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, haha, null, `🥵 Upa la paja 🥵`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'nsfwbdsm') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwbdsm.json`)).data;
    const haha = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, haha, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'nsfwcum') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwcum.json`)).data;
    const haha = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, haha, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'nsfwero') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwero.json`)).data;
    const haha = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, haha, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'nsfwfemdom') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwfemdom.json`)).data;
    const haha = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, haha, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'nsfwglass') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfwglass.json`)).data;
    const haha = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, haha, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }
  
if (command == 'nsfworgy') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/nsfworgy.json`)).data;
    const haha = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, haha, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }
  
  if (command == 'booty') {
    const resError = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/booty.json`)).data;
    let res = await conn.getFile(`https://api-fgmods.ddns.net/api/nsfw/ass?apikey=fg-dylux`).data;
    if (res == '' || !res || res == null) res = await resError[Math.floor(resError.length * Math.random())];
    conn.sendFile(m.chat, res, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'ecchi') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/ecchi.json`)).data;
    const url = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, url, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'furro') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/furro.json`)).data;
    const url = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, url, null, `_y este furro?_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'trapito') {
    const res = await fetch(`https://api.waifu.pics/nsfw/trap`);
    const json = await res.json();
    const url = json.url;
    conn.sendFile(m.chat, url, null, `_oh no un trapito😱 _`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'imagenlesbians') {
    const resError = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/imagenlesbians.json`)).data;
    let res = await conn.getFile(`https://api-fgmods.ddns.net/api/nsfw/lesbian?apikey=fg-dylux`).data;
    if (res == '' || !res || res == null) res = await resError[Math.floor(resError.length * Math.random())];
    conn.sendFile(m.chat, res, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'panties') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/panties.json`)).data;
    const url = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, url, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'pene') {
    const resError = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/pene.json`)).data;
    let res = await conn.getFile(`https://api-fgmods.ddns.net/api/nsfw/penis?apikey=fg-dylux`).data;
    if (res == '' || !res || res == null) res = await resError[Math.floor(resError.length * Math.random())];
    conn.sendFile(m.chat, res, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'randomxxx') {
    const rawjsonn = ['https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/tetas.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/booty.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/imagenlesbians.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/panties.json', 'https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/porno.json'];
    const rawjson = await rawjsonn[Math.floor(rawjsonn.length * Math.random())];
    const res = (await axios.get(rawjson)).data;
    const url = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, url, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'yaoi') {
    const res = await fetch(`https://nekobot.xyz/api/image?type=yaoi`);
    const json = await res.json();
    const url = json.message;
    conn.sendFile(m.chat, url, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'yaoi2') {
    const res = await fetch(`https://purrbot.site/api/img/nsfw/yaoi/gif`);
    const json = await res.json();
    const url = json.link;
    conn.sendFile(m.chat, url, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

  if (command == 'yuri') {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/yuri.json`)).data;
    const url = await res[Math.floor(res.length * Math.random())];
    conn.sendFile(m.chat, url, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }
 
if (command == 'pechos') {
const res = (await axios.get(`https://raw.githubusercontent.com/elrebelde21/NovaBot-MD/master/src/nsfw/pechos.json`)).data;
const url = await res[Math.floor(res.length * Math.random())];
conn.sendFile(m.chat, url, 'error.jpg', "Lindo pechos para dame lechita 🥵", m, null, fakee2);
//conn.sendButton(m.chat, `Lindo pechos para dame lechita 🥵`, botname, url, [['🔄 𝐒𝐈𝐆𝐔𝐈𝐄𝐍𝐓𝐄 🔄', `/${command}`]], null, null, m) 
}

  if (command == 'yuri2') {
    const resError = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/yuri.json`)).data;
    const res = await fetch(`https://purrbot.site/api/img/nsfw/yuri/gif`);
    const json = await res.json();
    let url = json.link;
    if (url == '' || !url || url == null) url = await resError[Math.floor(resError.length * Math.random())];
    conn.sendFile(m.chat, url, null, `_${command}_`, null, null, { viewOnce: true }, m, null, fake)
  }

if (command == 'hentaisearch' || command == 'searchhentai') {
if (!text) throw '*⚠️ 𝙸𝙽𝙶𝚁𝙴𝚂𝙰 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴 𝙰𝙻𝙶𝚄𝙽 𝙷𝙴𝙽𝚃𝙰𝙸 𝙰 𝙱𝚄𝚂𝙲𝙰𝚁*';
const searchResults = await searchHentai(text);
let teks = searchResults.result.map((v, i) => `${i+1}. *_${v.title}_*
↳ 📺 *_Vistas:_* ${v.views}
↳ 🎞️ *_Link:_* ${v.url}`).join('\n\n');
let randomThumbnail;
if (searchResults.result.length > 0) {
const randomIndex = Math.floor(Math.random() * searchResults.result.length);
randomThumbnail = searchResults.result[randomIndex].thumbnail;
} else {
randomThumbnail = 'https://pictures.hentai-foundry.com/e/Error-Dot/577798/Error-Dot-577798-Zero_Two.png';
teks = '*[❗] 𝙽𝙾 𝚂𝙴 𝙷𝙰𝙽 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙰𝙳𝙾 𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂*';
}
conn.sendFile(m.chat, randomThumbnail, 'error.jpg', teks, fake, m);
}}
handler.help = ['nsfwloli', 'nsfwfoot', 'nsfwass', 'nsfwbdsm', 'nsfwcum', 'nsfwero', 'nsfwfemdom', 'nsfwfoot', 'nsfwglass', 'nsfworgy', 'yuri', 'yuri2', 'yaoi', 'yaoi2', 'panties', 'tetas', 'booty', 'ecchi', 'furro', 'hentai', 'trapito', 'imagenlesbians', 'pene', 'porno', 'randomxxx', 'pechos', 'hentai', 'hentai2', 'nsfwloli', 'porno', 'tetas', 'china', 'boobs'];
handler.tags = ['nsfw'];
handler.command = ['nsfwloli', 'nsfwfoot', 'nsfwass', 'nsfwbdsm', 'nsfwcum', 'nsfwero', 'nsfwfemdom', 'nsfwfoot', 'nsfwglass', 'nsfworgy', 'yuri', 'yuri2', 'yaoi', 'yaoi2', 'panties', 'tetas', 'booty', 'ecchi', 'furro', 'hentai', 'trapito', 'imagenlesbians', 'pene', 'porno', 'randomxxx', 'pechos', 'hentai', 'hentai2', 'nsfwloli', 'porno', 'tetas', 'china', 'boobs', 'hentaisearch', 'searchhentai', 'videos']
handler.limit = ["2", "3", "4", "6", "8"].getRandom()
handler.register = true
export default handler

async function searchHentai(search) {
  return new Promise((resolve, reject) => {
    axios.get('https://hentai.tv/?s=' + search).then(async ({data}) => {
      const $ = cheerio.load(data);
      const result = {};
      const res = [];
      result.coder = 'rem-comp';
      result.result = res;
      result.warning = 'It is strictly forbidden to reupload this code, copyright © 2022 by rem-comp';
      $('div.flex > div.crsl-slde').each(function(a, b) {
        const _thumbnail = $(b).find('img').attr('src');
        const _title = $(b).find('a').text().trim();
        const _views = $(b).find('p').text().trim();
        const _url = $(b).find('a').attr('href');
        const hasil = {thumbnail: _thumbnail, title: _title, views: _views, url: _url};
        res.push(hasil);
      });
      resolve(result);
    }).catch((err) => {
      console.log(err);
    });
  });
}

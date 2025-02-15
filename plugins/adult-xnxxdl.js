import fetch from 'node-fetch';
import cheerio from 'cheerio';
import moment from 'moment-timezone';
const handler = async (m, {conn, args, command, usedPrefix}) => {
let porn = 'https://qu.ax/bXMB.webp'
let porn2 = 'https://qu.ax/TxtQ.webp'
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
throw `*⚠️ ɴᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴏ́ ᴜɴ ᴇɴʟᴀᴄᴇ ᴘᴀʀᴀ ᴇsᴇ ɴᴜ́ᴍᴇʀᴏ, ᴘᴏʀ ғᴀᴠᴏʀ ɪɴɢʀᴇsᴇ ᴜɴ ɴᴜ́ᴍᴇʀᴏ ᴇɴᴛʀᴇ ᴇʟ  1 ʏ ᴇʟ ${matchingItem.urls.length}*`;
}} else {
throw `*⚠️ ᴘᴀʀᴀ ᴘᴏᴅᴇʀ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴅᴇ ᴇsᴛᴀ ғᴏʀᴍᴀ (${usedPrefix + command} <numero>), ᴘᴏʀ ғᴀᴠᴏʀ ʀᴇᴀʟɪᴢᴀʀ ʟᴀ ʙᴜ́sǫᴜᴇᴅᴀ ᴅᴇ ᴠɪᴅᴇᴏs ᴄᴏɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ: ${usedPrefix}xnxxsearch <texto>*`;
}} else {
throw `*⚠️ ᴘᴀʀᴀ ᴘᴏᴅᴇʀ ᴜsᴀʀ ᴇsᴛᴇ ᴄᴏᴍᴀɴᴅᴏ ᴅᴇ ᴇsᴛᴀ ғᴏʀᴍᴀ (${usedPrefix + command} <numero>), ᴘᴏʀ ғᴀᴠᴏʀ ʀᴇᴀʟɪᴢᴀʀ ʟᴀ ʙᴜ́sǫᴜᴇᴅᴀ ᴅᴇ ᴠɪᴅᴇᴏs ᴄᴏɴ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ: ${usedPrefix}xnxxsearch <texto>*`;
}}}
const res = await xnxxdl(xnxxLink);
const json = await res.result.files;
conn.sendMessage(m.chat, {document: {url: json.high}, mimetype: 'video/mp4', fileName: res.result.title}, {quoted: m});
m.react(`🔥`) 
} catch {
throw `*⚠️ ¿Que esta buscando pajin? ingresa un enlace valido de xnxx*\n\n*Aqui te recomiendo uno algo similar a estos:* ${usedPrefix + command} https://www.xnxx.com/video-14lcwbe8/rubia_novia_follada_en_cuarto_de_bano`;
handler.limit = false
}};
handler.help = ['xnxxdl']
handler.tags = ['nsfw'];
handler.command = /^(xnxxdl)$/i;
handler.limit = ["10", "12", "15", "16", "18", "25"].getRandom()
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

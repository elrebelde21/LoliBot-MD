import fetch from 'node-fetch';
import moment from 'moment-timezone';
const handler = async (m, {text, usedPrefix, command}) => {
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

if (!text) throw `*⚠️ Que esta buscando Pajín? usar el comando de esta forma*\n*• Ejemplo:* ${usedPrefix + command} Con mi prima*`;
try {
const vids_ = {
from: m.sender,
urls: [],
};
if (!global.videoListXXX) {
global.videoListXXX = [];
}
if (global.videoListXXX[0]?.from == m.sender) {
global.videoListXXX.splice(0, global.videoListXXX.length);
}
const res = await xnxxsearch(text);
const json = res.result;
let cap = `*🔍 RESULTADOS DE LA BUSQUEDA:* ${text.toUpperCase()}\n\n`;
let count = 1;
for (const v of json) {
const linkXXX = v.link;
vids_.urls.push(linkXXX);
cap += `*[${count}]*\n• *🎬 Titulo:* ${v.title}\n• *🔗 Link:* ${v.link}\n• *❗ Info:* ${v.info}`;
cap += '\n\n' + '••••••••••••••••••••••••••••••••' + '\n\n';
count++;
}
m.reply(cap);
global.videoListXXX.push(vids_);
} catch (e) {
m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${e} <<<< `)       
console.log(e) 
handler.limit = false
}};
handler.help = ['xnxxsearch'].map((v) => v + ' <query>');
handler.tags = ['nsfw'];
handler.command = /^xnxxsearch|xnxxs$/i;
handler.limit = ["10", "12", "15", "16", "18", "25"].getRandom()
handler.register = true
export default handler;

async function xnxxsearch(query) {
  return new Promise((resolve, reject) => {
    const baseurl = 'https://www.xnxx.com';
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = [];
      const url = [];
      const desc = [];
      const results = [];
      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb').each(function(c, d) {
          url.push(baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/'));
        });
      });
      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb-under').each(function(c, d) {
          desc.push($(d).find('p.metadata').text());
          $(d).find('a').each(function(e, f) {
            title.push($(f).attr('title'));
          });
        });
      });
      for (let i = 0; i < title.length; i++) {
        results.push({title: title[i], info: desc[i], link: url[i]});
      }
      resolve({code: 200, status: true, result: results});
    }).catch((err) => reject({code: 503, status: false, result: err}));
  });
}



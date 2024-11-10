import axios from 'axios'
import fetch from 'node-fetch'
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import search from 'yt-search'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return await conn.reply(m.chat, `¿Que esta buscando? ingresa el nombre para descargar sus música de Spotify, Ejemplo:* ${usedPrefix + command} ozuna`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: wm, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})    
m.react(`⌛`) 
try {
let songInfo = await spotifyxv(text)
if (!songInfo.length) throw `*No se encontró una canción.*`
let res = songInfo[0]
let fileSizeInMB = (await getBuffer(res.url)).length / (1024 * 1024)
let shortURL = await getTinyURL(res.url)
let spotifyi = `*• Titulo:* _${res.name}_
*• Artista:* ${res.artista.join(', ')}_
*• Url:* _${shortURL}_

> 🚀 *ᴱⁿᵛᶦᵃⁿᵈᵒ ᶜᵃⁿᶜᶦᵒ́ⁿ ᵃᵍᵘᵃʳᵈᵉ ᵘⁿ ᵐᵒᵐᵉⁿᵗᵒ....*`

let resImg = await fetch(res.imagen)
let thumbb = await resImg.buffer()
let { videos } = await search(res.name)
let q = '128kbps'
let v = videos[0].url
let yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v))
let dl_url = await yt.audio[q].download()
let ttl = await yt.title
let size = await yt.audio[q].fileSizeH
let img = await getBuffer(res.imagen)
conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${ttl}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
await m.reply(spotifyi) 
//conn.sendMessage(m.chat, {text: spotifyi, contextInfo: {forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "renderLargerThumbnail": true, "title": global.wm, "containsAutoReply": true, "mediaType": 1, "thumbnail": img, "thumbnailUrl": img, "mediaUrl": shortURL, "sourceUrl": shortURL}}}, {quoted: m});
m.react('✅️')
} catch (error) {
}}
handler.help = ['spotify']
handler.tags = ['downloader']
handler.command = /^(spotify|music)$/i
handler.register = true
//handler.limit = 1
handler.level = 2
export default handler

async function spotifyxv(query) {
let token = await tokens();
let response = await axios({
method: 'get',
url: 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(query) + '&type=track',
headers: {
Authorization: 'Bearer ' + token,
},
})
const tracks = response.data.tracks.items
const results = tracks.map((track) => ({
name: track.name,
artista: track.artists.map((artist) => artist.name),
album: track.album.name,
duracion: timestamp(track.duration_ms),
url: track.external_urls.spotify,
imagen: track.album.images.length ? track.album.images[0].url : '',
}))
return results
}
async function tokens() {
const response = await axios({
method: 'post',
url:
'https://accounts.spotify.com/api/token',
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
Authorization: 'Basic ' + Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64'),
},
data: 'grant_type=client_credentials',
})
return response.data.access_token
}
function timestamp(time) {
const minutes = Math.floor(time / 60000);
const seconds = Math.floor((time % 60000) / 1000);
return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
async function getBuffer(url, options) {
try {
options = options || {};
const res = await axios({
method: 'get',
url,
headers: {
DNT: 1,
'Upgrade-Insecure-Request': 1,
},
...options,
responseType: 'arraybuffer',
});
return res.data;
} catch (err) {
return err;
}}
async function getTinyURL(text) {
try {
let response = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`);
return response.data;
} catch (error) {
return text;
}}

/*import fetch from 'node-fetch';
import fs from 'fs';
import axios from 'axios';

const handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return await conn.reply(m.chat, `¿Que esta buscando? ingresa el nombre para descargar sus música de Spotify, Ejemplo:* ${usedPrefix + command} ozuna`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: mg, body: wm, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})    
m.react(`⌛`) 
let ouh = await fetch(`https://api.nyxs.pw/dl/spotify-direct?title=${text}`)
  let gyh = await ouh.json()
try {
  m.reply(`_✧ Enviando ${gyh.result.title} - ${gyh.result.artists} (${gyh.result.album})\n\n> ${gyh.result.urlSpotify}_`)
      const doc = {
      audio: { url: gyh.result.url },
      mimetype: 'audio/mp4',
      fileName: `${gyh.result.title}.mp3`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: gyh.result.urlSpotify,
          title: gyh.result.title,
          sourceUrl: gyh.result.urlSpotify,
          thumbnail: await (await conn.getFile(gyh.result.thumbnail)).data
        }
      }
    };
   // await conn.sendMessage(m.chat, doc, { quoted: m });
await conn.sendFile(m.chat, gyh.result.url, `${gyh.result.title}.mp3`, ``, m)
	m.react('✅'); 
} catch (error1) {
try {
const downloadRes = await fetch(`https://deliriussapi-oficial.vercel.app/download/spotifydl?url=${gyh.result.url}`);
    const downloadData = await downloadRes.json();
console.log(downloadData)

    if (!downloadData.status) {
      throw new Error('Error al obtener los datos de la canción.');
    }

    const spty = downloadData.data;
    let spotifyDetails = `*• Título:* ${spty.title}\n*• Artista:* ${spty.author}\n*• Álbum:* ${spty.album || 'Desconocido'}\n*• Publicado:* ${spty.year || 'Desconocido'}`;

    // Obtener la portada de la canción
    const imgBufferSong = await (await fetch(spty.thumbnail)).buffer();
    await conn.sendFile(m.chat, imgBufferSong, 'cover.jpg', spotifyDetails, m);

    // Enviar el archivo de audio
    const fileData = {
      link: spty.url,
      filename: `${spty.title}.mp3`,
      mime: 'audio/mpeg'
    };
    await conn.sendFile(m.chat, fileData.link, fileData.filename, '', m, null, { mimetype: fileData.mime, asDocument: true });

    // También enviar el audio directamente
    await conn.sendMessage(m.chat, {
      audio: fileData.link,
      fileName: `${spty.title}.mp3`,
      mimetype: 'audio/mpeg'
    }, { quoted: m });

    m.react('✅'); 
handler.limit = 1
} catch (error2) {
//m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${error} <<<< `) 
console.log(error2) 
m.react(`❌`) 
}}}
handler.help = ['spotify']
handler.tags = ['downloader']
handler.command = /^(spotify|music)$/i
handler.register = true
//handler.limit = 1
handler.level = 2
export default handler


*/
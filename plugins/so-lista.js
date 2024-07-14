//CREDITOS PARA >> https://github.com/BrunoSobrino

let handler = m => m
handler.all = async function (m) {
let chat = global.db.data.chats[m.chat]
if (chat.isBanned) return
if (chat.audios) return
    
if (/^A Bueno master|Bueno master|Bueno Máster|🫂$/i.test(m.text) && chat.audios) {  
if (!db.data.chats[m.chat].audios && m.isGroup) throw 0    
let vn = 'https://qu.ax/xynz.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}  

if (/^a|ª|A$/i.test(m.text) && chat.audios) {  
if (!db.data.chats[m.chat].audios && m.isGroup) throw 0   
let vn = './media/a.mp3'
conn.sendFile(m.chat, vn, 'a.mp3', null, m, true, { 
type: 'audioMessage', 
ptt: true 
})}

if (/^ara ara$/i.test(m.text) && chat.audios) {  
let vn = 'https://qu.ax/PPgt.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })} 

if (chat.audios && m.text.match(/(bienveni|🥳|🤗)/gi)) {
//let vn = './media/Bienvenido.mp3'
let vn = 'https://qu.ax/cUYg.mp3'
this.sendPresenceUpdate('recording', m.chat)   
conn.sendMessage(m.chat, { audio: { url: vn }, contextInfo: { "externalAdReply": { "title": wm, "body": `🐈`, "previewType": "PHOTO", "thumbnailUrl": null,"thumbnail": imagen1, "sourceUrl": md, "showAdAttribution": true}}, ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Blackpink in your area|blackpink in your area|in your area|In your area)/gi)) {    
let vn = 'https://qu.ax/pavq.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Buen día grupo|Buen dia grupo)/gi)) {    
let vn = 'https://qu.ax/GoKq.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Calla Fan de bts|bts|Amo a bts)/gi)) {
let vn = 'https://qu.ax/oqNf.mp3'
let sticker = 'https://qu.ax/rfHP.webp'
this.sendPresenceUpdate('recording', m.chat)
let or = ['audio', 'sticker'];
let media = or[Math.floor(Math.random() * 2)]
if (media === 'audio') await this.sendFile(m.chat, vn, 'error.mp3', null, m, true, {type: 'audioMessage', ptt: true });
if (media === 'sticker') await conn.sendFile(m.chat, sticker, 'error.webp', '', m);
}
    
if (chat.audios && m.text.match(/(Cambiate a Movistar|cambiate a Movistar|cambiate a movistar|Cambiate a movistar|movistar)/gi)) {    
let vn = 'https://qu.ax/RxJC.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Corte Corte|corte|pelea|pelear|golpear|golpea)/gi)) {    
let vn = 'https://qu.ax/hRuU.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(El Toxico|El tóxico|Toxico|tóxico|malo|mala|estupido|estupida)/gi)) {    
let vn = 'https://qu.ax/WzBd.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Elmo sabe donde vives|Elmo sabe dónde vives|elmo|vives|de donde eres|eres de|sabes)/gi)) {    
let vn = 'https://qu.ax/YsLt.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(En caso de una investigación|En caso de una investigacion|fbi|cia|nasa|detective|👤|🕵️‍|♀️🕵️‍♂️)/gi)) {    
let vn = 'https://qu.ax/Syg.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Eres Fuerte|god|🤜|🤛|🦾|👊)/gi)) {    
let vn = 'https://qu.ax/lhzq.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Zzzz|zzz|😴|💩|👽)/gi)) {    
let vn = 'https://qu.ax/KkSZ.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Las reglas del grupo|lee|leíste|leiste)/gi)) {    
let vn = 'https://qu.ax/fwek.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Me anda buscando anonymous|me anda buscando anonymous|Me está buscando anonymous|me está buscando anonymous|Me está buscando anonimo|Me esta buscando anonimo|anonimus|anónimo)/gi)) {    
let vn = 'https://qu.ax/MWJz.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Momento equisde|momento equisde|Momento|fuera|🤘|👄|🕴️|💃|🕺)/gi)) {    
let vn = 'https://qu.ax/PitP.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Motivacion|Motivación|☘️)/gi)) {    
let vn = 'https://qu.ax/MXnK.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Muchachos|⛈️|🌩️|🌦️|🌤️|🌪️|escucharon)/gi)) {    
let vn = 'https://qu.ax/dRVb.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Nico Nico|🐄|🐖|🐬|🐼|🐰|🐇|🦦|🐋)/gi)) {    
let vn = 'https://qu.ax/OUyB.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(No Rompas más|No Rompas mas|💔|😖|😣)/gi)) {    
let vn = 'https://qu.ax/ZkAp.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Porque ta tite|Por qué ta tite|😕|😟)/gi)) {    
let vn = 'https://qu.ax/VrjA.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Potaxio|Potasio|🥑)/gi)) {    
let vn = 'https://qu.ax/vPoj.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Que tal Grupo|qué tal grupo|grupos)/gi)) {    
let vn = 'https://qu.ax/lirF.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Se están riendo de mí|Se estan riendo de mi|Se esta riendo de mi|Se está riendo de mi|se estan)/gi)) {    
let vn = 'https://qu.ax/XBXo.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Su nivel de pendejo|pendeja|pendejo|idiota|tonto|tonta|🙄)/gi)) {    
let vn = 'https://qu.ax/SUHo.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(tal vez|puede ser|posible|🧘‍|♀️🧘|🍦|🍡|🌮|🎩)/gi)) {    
let vn = 'https://qu.ax/QMjH.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Te gusta el Pepino|🥒|🍆|nepe)/gi)) {    
let vn = 'https://qu.ax/ddrn.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Todo bien|😇|😄|🏂|⛷️|🏋️‍|♂️🏋️‍|♀️🤹‍|♀️🤹‍|♂️👌)/gi)) {    
let vn = 'https://qu.ax/EDUC.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Traigan le una falda|Traiganle una falda|Nina|niña|niño)/gi)) {    
let vn = 'https://qu.ax/fnTL.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Y este quien es|Y este quien poronga es|Y este quien porongas es|vida)/gi)) {    
let vn = 'https://qu.ax/QnET.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Goku pervertido|pervertido|pervertida|goku|antojen|antogen|😈|👿|👉👌|👌👈)/gi)) {    
let vn = 'https://qu.ax/CUmZ.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}    
    
if (chat.audios && m.text.match(/(abduzcan|Abduzcan|adbuzcan|Adbuzcan)/gi)) {    
let vn = './media/abduzcan.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(TENGO LOS CALZONES|Tengo los calzones|tengo los calzones|🥶|😨|calzones)/gi)) {    
let vn = 'https://qu.ax/pzRp.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(anadieleimporta|a nadie le importa|y que|no importa|literal)/gi)) {    
let vn = 'https://qu.ax/JocM.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(miarda de bot|mierda de bot|mearda de bot|Miarda de Bot|Mierda de Bot|Mearda de Bot|bot puto|Bot puto|Bot CTM|Bot ctm|bot CTM|bot ctm|bot pendejo|Bot pendejo|bot de mierda)/gi)) {    
let vn = 'https://qu.ax/UEZQ.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}    
    
if (chat.audios && m.text.match(/(baneado|Baneado|baneada)/gi)) {    
let vn = 'https://qu.ax/SJJt.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Cada|Basado|Basada|Basadisimo|BASADO|basado|basada|Que basado|Que basada|que basado)/gi)) {    
let vn = 'https://qu.ax/jDAl.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Bien pensado woody|bien pensado woody|Bien pensado|bien pensado|Bien pensado wudy|bien pensado wudy|Bien pensado Woody|bien pensado Woody|Bien pensado woodi|bien pensado woodi)/gi)) {    
let vn = 'https://qu.ax/nvxb.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(bañate|Bañat)/gi)) {    
let vn = 'https://qu.ax/JsYa.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(buenas noches|Buenas noches|Boanoite|boanoite)/gi)) {    
let vn = 'https://qu.ax/TTfs.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Bueno si|bueno si|bueno sí|Bueno sí)/gi)) {    
let vn = 'https://qu.ax/DqBM.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(buenos dias|Buenos dias|buenos días|Buenos días)/gi)) {    
let vn = 'https://qu.ax/wLUF.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Me olvide|ME OLVIDE|me olvide|Me olvidé|me olvidé|lgante)/gi)) {    
let vn = 'https://qu.ax/SbX.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(giagnosticadocongay|diagnosticado con gay|diagnosticado gay|te diagnóstico con gay|diagnóstico gay|te diagnostico con gay|te diagnóstico con gay|te diagnosticó con gay|te diagnostico con gay)/gi)) {    
let vn = 'https://qu.ax/cUl.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(El pepe|el pepe|El Pepe|el Pepe)/gi)) {    
let vn = 'https://qu.ax/Efdb.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(el rap de fernanfloo|grap|trap)/gi)) {    
let vn = 'https://qu.ax/Vved.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Enojado|ENOJADO|enojado|Molesto|Enojada|ENOJADA|enojada|Molesta|🤬|😡|😠|😤)/gi)) {    
let vn = 'https://qu.ax/jqTX.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(ENTRADA|entrada|Entrada|Entra|ENTRA|Entra|Ingresa|ingresa|INGRESA|ingresar|INGRESAR|Ingresar)/gi)) {    
let vn = 'https://qu.ax/UpAC.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Esto va ser épico papus|esto va ser épico papus|Esto va ser|Esto va a hacer|esto va acer|Esto va aser|esto va ser|esto va a hacer)/gi)) {    
let vn = 'https://qu.ax/pjTx.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Esto va para ti|esto va para ti)/gi)) {    
let vn = 'https://qu.ax/Tabl.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(feliz cumpleaños|felizcumpleaños|happy birthday)/gi)) {    
let vn = 'https://qu.ax/UtmZ.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(fiesta del admin2|fiesta del admin 2|fiestadeladmin2|fiesta del administrador)/gi)) {    
let vn = 'https://qu.ax/MpnG.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Fiesta del admin|fiesta del admin)/gi)) {    
let vn = 'https://qu.ax/jDVi.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(fiesta del admin 3|atención grupo|atencion grupo|aviso importante|fiestadeladmin3|fiesta en casa)/gi)) {    
let vn = 'https://qu.ax/fRz.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Fino señores|fino señores|Fino senores|fino senores|Fino🧐|🧐🍷|🧐🍷|🐍|🙉|🙈)/gi)) {    
let vn = 'https://qu.ax/hapR.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Me voy|me voy|ME VOY|Me fui|me fui|ME FUI|Se fue|se fue|SE FUE|Adios|adios|ADIOS|Chao|chao|CHAO)/gi)) {    
let vn = 'https://qu.ax/iOky.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(tunometecabrasaramambiche|tunometecabrasaramanbiche|tunometecabrasarananbiche|tunometecabrasaranambiche)/gi)) {    
let vn = 'https://qu.ax/LAAB.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(gemidos|gemime|gime|gemime|gemi2)/gi)) {    
let vn = 'https://qu.ax/bwPL.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(audio hentai|Audio hentai|audiohentai|Audiohentai)/gi)) {    
let vn = 'https://qu.ax/GSUY.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(hola|ola|hi|hello)/gi)) {    
let vn = 'https://qu.ax/eGdW.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Homero chino|homero chino|Omero chino|omero chino|Homero Chino)/gi)) {    
let vn = 'https://qu.ax/ebe.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(sexo|Sexo|Hora de sexo|hora de sexo)/gi)) {    
let vn = 'https://qu.ax/Mlfu.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Jesucristo|jesucristo|Jesús|jesús|Auronplay|Auron|Dios)/gi)) {    
let vn = 'https://qu.ax/AWdx.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(La voz de hombre|la voz de hombre|La voz del hombre|la voz del hombre|La voz|la voz|🥸|👨|👩|🤦‍|♂️🤦‍|♀️🤷‍♂️|🤷‍♀️)/gi)) {    
let vn = './media/la-voz-de-hombre.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(laoracion|La biblia|La oración|La biblia|La oración|la biblia|La Biblia|oremos|recemos|rezemos|🙏)/gi)) {    
let vn = 'https://qu.ax/GeeA.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Marica tu|cancion1|Marica quien|maricon|bando)/gi)) {    
let vn = 'https://qu.ax/XULE.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(MA MA MASIVO|ma ma masivo|Ma ma masivo|Bv|BV|bv|masivo|Masivo|MASIVO)/gi)) {    
let vn = 'https://qu.ax/mNX.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(ho me vengo|oh me vengo|o me vengo|Ho me vengo|Oh me vengo|O me vengo)/gi)) {    
let vn = 'https://qu.ax/waHR.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Me pica los cocos|ME PICA |me pica|Me pican los cocos|ME PICAN)/gi)) {    
let vn = 'https://qu.ax/UrNl.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(mmm|Mmm|MmM)/gi)) {    
let vn = 'https://qu.ax/gxFs.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Moshi moshi|Shinobu|mundo)/gi)) {    
let vn = 'https://qu.ax/JAyd.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(nadie te pregunto|Nadie te pregunto|Nadie te preguntó|nadie te preguntó)/gi)) {    
let vn = 'https://qu.ax/MrGg.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Feliz navidad|feliz navidad|Merry Christmas|merry chritmas)/gi)) {    
let vn = 'https://qu.ax/XYyY.m4a'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(niconico|NICONICO|Niconico|niconiconi|Niconiconi|NICONICONI)/gi)) {    
let vn = 'https://qu.ax/YdVq.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(No chupa la|No chupala|no chupala|No chu|no chu|No, chupala|No, chupa la)/gi)) {    
let vn = 'https://qu.ax/iCRk.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(No me hables|no me hables)/gi)) {    
let vn = 'https://qu.ax/xxtz.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(no me hagas usar esto|No me hagas usar esto|No me agas usar esto)/gi)) {    
let vn = 'https://qu.ax/bzDa.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(NO DIGAS ESO PAPU|no digas eso papu|No gigas eso papu|NO PAPU|No papu|NO papu|no papu)/gi)) {    
let vn = 'https://qu.ax/jsb.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(noche de paz|Noche de paz|Noche de amor|noche de amor|Noche de Paz|🌚|🌕|🌖|🌗|🌘|🌑|🌒|🌓|🌔|🌙|🪐)/gi)) {    
let vn = 'https://qu.ax/SgrV.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Nyapasu|Nyanpasu|nyapasu|Nyapasu|Gambure|Yabure|🐨|🐣|🐥|🦄|🤙)/gi)) {    
let vn = 'https://qu.ax/ZgFZ.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Ohayo|ohayo|Ojayo|ojayo|Ohallo|ohallo|Ojallo|ojallo|🏮|🎎|⛩️|🐲|🐉|🌸|🍙|🍘)/gi)) {    
let vn = 'https://qu.ax/PFxn.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(OMAIGA|OMG|omg|omaiga|Omg|Omaiga|OMAIGA)/gi)) {    
let vn = 'https://qu.ax/PfuN.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(oni-chan|onichan|o-onichan)/gi)) {    
let vn = 'https://qu.ax/sEFj.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(orale|Orale)/gi)) {    
let vn = 'https://qu.ax/Epen.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Pasa pack|vendes tu nudes|pasa video hot|pasa tu pack|pasa fotos hot|vendes tu pack|Vendes tu pack|Vendes tu pack?|vendes tu pack|Pasa Pack Bot|pasa pack Bot|pasa tu pack Bot|Pásame tus fotos desnudas|pásame tu pack|me pasas tu pak|me pasas tu pack|pasa pack)/gi)) {    
let vn = 'https://qu.ax/KjHR.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Contexto|CONTEXTO|contexto|Pasen contexto|PASEN CONTEXTO|pasen contexto|Y el contexto|Y EL CONTEXTO|y el contexto)/gi)) {    
let vn = 'https://qu.ax/YBzh.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Pero esto|pero esto|Pero esto ya es otro nivel|pero esto ya es otro nivel|Otro nivel|otro nivel)/gi)) {    
let vn = 'https://qu.ax/javz.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(PIKA|pica|Pica|Pikachu|pikachu|PIKACHU|picachu|Picachu)/gi)) {    
let vn = 'https://qu.ax/wbAf.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Pokemon|pokemon|Pokémon|pokémon)/gi)) {    
let vn = 'https://qu.ax/kWLh.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Quién es tu senpai botsito 7u7|Quien es tu senpai botsito 7u7|Quién es tu sempai botsito 7u7|Quien es tu sempai botsito 7u7|Quién es tu senpai botsito 7w7|Quien es tu senpai botsito 7w7|quién es tu senpai botsito 7u7|quien es tu senpai botsito 7u7|Quién es tu sempai botsito 7w7|Quien es tu sempai botsito 7w7|Quién es tu senpai botsito|Quien es tu senpai botsito|Quién es tu sempai botsito|Quien es tu sempai botsito|Quién es tu senpai botsito|Quien es tu senpai botsito|quién es tu senpai botsito|quien es tu senpai botsito|Quién es tu sempai botsito|Quien es tu sempai botsito)/gi)) {    
let vn = 'https://qu.ax/uyqQ.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(rawr|Rawr|RAWR|raawwr|rraawr|rawwr)/gi)) {    
let vn = 'https://qu.ax/YnoG.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(hablame|Habla me|Hablame|habla me|Háblame|háblame)/gi)) {    
let vn = 'https://qu.ax/uQqA.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Cagaste|Miedo|miedo|Pvp|PVP|temor|que pasa|Que sucede|Que pasa|que sucede|Qué pasa|Qué sucede|Dime|dime)/gi)) {    
let vn = 'https://qu.ax/FAVP.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(YOSHI|Yoshi|YoShi|yoshi)/gi)) {    
let vn = 'https://qu.ax/ZgKT.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Verdad que te engañe|verdad que te engañe|verdad que|Verdad que)/gi)) {    
let vn = 'https://qu.ax/yTid.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(vivan|vivan los novios|vivanlosnovios)/gi)) {    
let vn = 'https://qu.ax/vHX.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Yamete|yamete|Yamete kudasai|yamete kudasai)/gi)) {    
let vn = 'https://qu.ax/thgS.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
    
if (chat.audios && m.text.match(/(Usted esta detenido|usted esta detenido|usted está detenido|Usted está detenido)/gi)) {    
let vn = 'https://qu.ax/UWqX.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(una pregunta|pregunton|preguntona)/gi)) {    
let vn = 'https://qu.ax/NHOM.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(oye|🐔|Chiste)/gi)) {    
let vn = 'https://qu.ax/MSiQ.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(gaspi y la minita|Gaspi y la mina|ig del la minita)/gi)) {
let vn = 'https://qu.ax/wYil.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(gaspi frase|frase)/gi)) {
let vn = 'https://qu.ax/gNwU.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(se pubrio|se que re pubrio)/gi)) {
let vn = 'https://qu.ax/keKg.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(goo|temazo|fuaa temon)/gi)) {
let vn = 'https://qu.ax/SWYV.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(:V|:v|v:)/gi)) {
let vn = 'https://qu.ax/cxDg.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(freefire|freefire)/gi)) {
let vn = 'https://qu.ax/Dwqp.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(Aguanta|aguanta)/gi)) {
let vn = 'https://qu.ax/Qmz.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(es viernes|Es viernes)/gi)) {
let vn = 'https://qu.ax/LcdD.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(feriado|feriado de que)/gi)) {
let vn = 'https://qu.ax/mFCT.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(Delevery|delivery|espanadas)/gi)) {
let vn = 'https://qu.ax/WGzN.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(putos|tarado|tarado eh|tarado)/gi)) {
let vn = 'https://qu.ax/CoOd.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(donde esta?|donde esta)/gi)) {
let vn = 'https://qu.ax/kCWg.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(Q onda|que onda|🤪)/gi)) {
let vn = 'https://qu.ax/YpsR.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(bebesita|bot canta)/gi)) {
let vn = 'https://qu.ax/Ouwp.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(tka|tka)/gi)) {
let vn = 'https://qu.ax/jakw.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(takataka|bot cantar)/gi)) {
let vn = 'https://qu.ax/rxvq.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(Hey|Hei|hey|HEY)/gi)) {
let vn = 'https://qu.ax/AaBt.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(Joder|joder)/gi)) {
let vn = 'https://qu.ax/lSgD.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(:c|c:|:c)/gi)) {
let vn = 'https://qu.ax/XMHj.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(siu|siiuu|ssiiuu|siuuu|siiuuu|siiiuuuu|siuuuu|siiiiuuuuu|siu|SIIIIUUU)/gi)) {
let vn = 'https://qu.ax/bfC.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(Sus|sus|Amongos|among us|Among us|Among)/gi)) {
let vn = 'https://qu.ax/Mnrz.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(te amo|teamo)/gi)) {
let vn = 'https://qu.ax/rGdn.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(Estoy triste|ESTOY TRISTE|estoy triste|Triste|TRISTE|triste|Troste|TROSTE|troste|Truste|TRUSTE|truste)/gi)) {
let vn = 'https://qu.ax/QSyP.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(un Pato| un pato|un pato que va caminando alegremente|Un pato|Un Pato)/gi)) {
let vn = 'https://qu.ax/pmOm.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(UwU|uwu|Uwu|uwU|UWU)/gi)) {
let vn = 'https://qu.ax/lOCR.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(fiesta viernes|viernes|Viernes|viernes fiesta)/gi)) {
let vn = 'https://qu.ax/wqXs.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(WTF|wtf|Wtf|wataf|watafac|watafack)/gi)) {
let vn = 'https://qu.ax/aPtM.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(Yokese|yokese|YOKESE)/gi)) {
let vn = 'https://qu.ax/PWgf.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}

if (chat.audios && m.text.match(/(Bruno|bruno)/gi)) {
let vn = 'https://qu.ax/frSi.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })} 
    
if (/^ok|de acuerdo|okey|okay|estoy de acuerdo|deacuerdo|entiendo|me parece bien|muy bien|👍|🤝|✌️|👌$/i.test(m.text) && chat.audios) {  
if (!db.data.chats[m.chat].audios && m.isGroup) throw 0   
let stiker = await sticker(null, s[Math.floor(Math.random() * s.length)], wm, vs)
await delay(3 * 3000)
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: `h`, mediaType: 2, sourceUrl: nn, thumbnail: imagen1}}}, { quoted: m })}
    
if (chat.audios && m.text.match(/(vetealavrg|vete a la vrg|vete a la verga)/gi)) {    
let vn = 'https://qu.ax/pXts.mp3'
this.sendPresenceUpdate('recording', m.chat)   
this.sendMessage(m.chat, { audio: { url: vn }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: true }, { quoted: m })}
   
return !0 }
export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const s = [
'https://media.makeameme.org/created/uh-ok-5ca824.jpg',
'https://i.pinimg.com/originals/9a/da/00/9ada0026337e175c787b9b47a3cd3de5.jpg',
'https://media1.giphy.com/media/QYwB8ai7mtORGRAxJZ/giphy.gif?cid=ecf05e47onuz2cet71x6d3wizozphrhkow9u7ucskq1uzhkw&rid=giphy.gif&ct=g',
'data:image/jpeg;base64,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',
'https://i.gifer.com/3Pr0.gif',
'https://i.gifer.com/9aM.gif',
'https://i.gifer.com/3BBB.gif',
'https://i.gifer.com/Xi9B.gif'
];  
import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix, command, text}) => {
if (!text) return conn.reply(m.chat,  `⚠️ *𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚 𝙙𝙚𝙡 𝘼𝙋𝙆*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, body: `¿Que esta buscando gile polla?`, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})   
  try {    
const searchA = await search(text);
const data5 = await download(searchA[0].id);
let response = `≪ＤＥＳＣＡＲＧＡＤＯ ＡＰＫＳ🚀≫

┏━━━━━━━━━━━━━━━━━━━━━━• 
┃💫 𝙉𝙊𝙈𝘽𝙍𝙀: ${data5.name}
┃📦 𝙋𝘼𝘾𝙆𝘼𝙂𝙀: ${data5.package}
┃🕒 𝙐𝙇𝙏𝙄𝙈𝘼 𝘼𝘾𝙏𝙐𝙇𝙄𝙕𝘼𝘾𝙄𝙊𝙉: ${data5.lastup}
┃💪 𝙋𝙀𝙎𝙊: ${data5.size}
┗━━━━━━━━━━━━━━━━━━━━━━━•`
await conn.sendFile(m.chat, data5.icon, 'akp.jpg', response, m, false, { contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, body: iig, previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})   
//conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
return await conn.sendMessage(m.chat, {text: '*𝙀𝙡 𝙖𝙥𝙠 𝙚𝙨 𝙢𝙪𝙮 𝙥𝙚𝙨𝙖𝙙𝙤.*'}, {quoted: m})}
await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m}); 
handler.limit = 2
} catch (e) {
m.react(`❌`) 
console.log(e)
handler.limit = false
}};
handler.help = ['apk', 'apkmod'];
handler.tags = ['downloader'];
handler.command = /^(apkmod|apk|modapk|dapk2|aptoide|aptoidedl)$/i;
handler.register = true
//handler.limit = 2
export default handler;

import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
 if (!text) throw `${lenguajeGB['smsAvisoMG']()} *ESCRIBA EL NOMBRE DEL APK*`;
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
await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
return await conn.sendMessage(m.chat, {text: '*EL APK ES MUY PESADO.*'}, {quoted: m})}
await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
} catch {
throw `${lenguajeGB['smsAvisoFG']()} *NO HAY RESULTADOS DE LO QUE SOLICITA*`;
}};
handler.command = /^(apkmod|apk|modapk|dapk2|aptoide|aptoidedl|playstore)$/i;
handler.register = true
handler.limit = 3
export default handler;

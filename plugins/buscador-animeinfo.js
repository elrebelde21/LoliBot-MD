import translate from '@vitalets/google-translate-api'
import { Anime } from "@shineiichijo/marika"
const client = new Anime();
let handler = async(m, { conn, text, usedPrefix }) => {
if (!text) throw `${mg}𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚 𝙙𝙚 𝙪𝙣 𝙖𝙣𝙞𝙢𝙚`
try {  
let anime = await client.searchAnime(text)
let result = anime.data[0];
let resultes = await translate(`${result.background}`, { to: 'es', autoCorrect: true })   
let resultes2 = await translate(`${result.synopsis}`, { to: 'es', autoCorrect: true })   
let AnimeInfo = `
𝙏𝙞́𝙩𝙪𝙡𝙤
❣ ${title}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙀𝙥𝙞𝙨𝙤𝙙𝙞𝙤𝙨
❣ ${episodes}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙏𝙧𝙖𝙣𝙨𝙢𝙞𝙩𝙞𝙙𝙤 𝙥𝙤𝙧:
❣ ${type}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝘾𝙡𝙖𝙨𝙞𝙛𝙞𝙘𝙖𝙘𝙞𝙤́𝙣
❣ ${rated}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙋𝙪𝙣𝙩𝙖𝙟𝙚
❣ ${score}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙈𝙞𝙚𝙢𝙗𝙧𝙤𝙨
❣ ${members}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙎𝙞𝙣𝙤𝙥𝙨𝙞𝙨
❣ ${synopsis}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
𝙀𝙣𝙡𝙖𝙘𝙚
❣ ${url}`
conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m)
/*.trim()
  
await conn.sendHydrated(m.chat, info, wm, null, ig, '𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢', null, null, [
['𝙈𝙚𝙣𝙪 𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖𝙨 | 𝙎𝙚𝙖𝙧𝙘𝙝𝙚𝙨 🔎', '#buscarmenu'],
['𝙈𝙚𝙣𝙪 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 ✨', '.allmenu'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
], m,)  */
} catch {
throw `*[❗] ERROR, INTENTELO DE NUEVO*`  
}}
handler.help = ['animeinfo <anime>']
handler.tags = ['internet']
handler.command = /^(animeinfo)$/i
handler.exp = 50
handler.level = 1
export default handler

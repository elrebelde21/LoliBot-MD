import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
async function wikipedia(querry) {
try {
const link = await axios.get(`https://es.wikipedia.org/wiki/${querry}`)
const $ = cheerio.load(link.data)
let judul = $('#firstHeading').text().trim()
let thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`
let isi = []
$('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
let penjelasan = $(Ra).find('p').text().trim() 
isi.push(penjelasan)})
for (let i of isi) {
const data = {
status: link.status,
result: {
judul: judul,
thumb: 'https:' + thumb,
isi: i}}
return data}
} catch (err) {
var notFond = {
status: link.status,
Pesan: eror}
return notFond}}
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `${mg}𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙡𝙖 𝙥𝙖𝙡𝙖𝙗𝙧𝙖 𝙘𝙡𝙖𝙫𝙚 𝙥𝙖𝙧𝙖 𝙗𝙪𝙨𝙘𝙖𝙧\n𝙀𝙟𝙚𝙢𝙥𝙡𝙤\n*${usedPrefix + command} Luna*`
wikipedia(`${text}`).then(res => {
let info = `𝑬𝒏𝒄𝒐𝒏𝒕𝒓𝒆́ 𝒆𝒔𝒕𝒐:\n\n` + res.result.isi
conn.sendHydrated(m.chat, info, wm, null, null, null, [
['𝙈𝙚𝙣𝙪 𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖𝙨 🔎', '#buscarmenu'],
['𝙈𝙚𝙣𝙪 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙤 ✨', '.allmenu'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️', '/menu']
], m,)   
  
}).catch(() => { m.reply(`${fg}𝑬𝒓𝒓𝒐 𝒏𝒐 𝒔𝒆 𝒆𝒏𝒄𝒐𝒏𝒕𝒓𝒐́ 𝒍𝒐𝒔 𝒒𝒖𝒆 𝒃𝒖𝒔𝒄𝒂𝒃𝒂,  𝑰𝒏𝒕𝒆𝒏𝒕𝒆 𝒅𝒆𝒍 𝒏𝒖𝒆𝒗𝒐`) })}
handler.help = ['wikipedia'].map(v => v + ' <apa>')
handler.tags = [ 'internet']
handler.command = /^(wiki|wikipedia)$/i 
handler.exp = 40
handler.level = 2
handler.money = 25
export default handler

import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
async function wikipedia(querry) {
try {
const link = await axios.get(`https://es.wikipedia.org/wiki/${querry}`);
const $ = cheerio.load(link.data);
const judul = $('#firstHeading').text().trim();
const thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`;
const isi = [];
$('#mw-content-text > div.mw-parser-output').each(function(rayy, Ra) {
const penjelasan = $(Ra).find('p').text().trim();
isi.push(penjelasan)});
for (const i of isi) {
const data = {status: link.status,
result: {judul: judul,
thumb: 'https:' + thumb,
isi: i}};
return data;
}} catch (err) {
const notFond = {status: link.status,
Pesan: eror};
return notFond;
}}
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) throw `*⚠️ ᴇsᴛᴀs ᴜsᴀɴᴅᴏ ᴍᴀʟ ᴇʟ ᴄᴏᴍᴀɴᴅᴏ!!*\n*ᴜsᴏ ᴄᴏʀʀᴇᴄᴛᴏ:*\n*${usedPrefix + command} 𝙿𝚊𝚕𝚊𝚋𝚛𝚊 𝚌𝚕𝚊𝚟𝚎 𝚊 𝚋𝚞𝚜𝚌𝚊𝚛*\n\n*• ᴇᴊᴇᴍᴘʟᴏ:*\n*${usedPrefix + command} Estrellas*`;
wikipedia(`${text}`).then((res) => {
m.reply(`*ᴀǫᴜɪ ᴛɪᴇɴᴇs ʟᴀ ɪɴғᴏʀᴍᴀᴄɪᴏ́ɴ ᴇɴᴄᴏɴᴛʀᴀᴅᴀ:*\n\n` + res.result.isi)}).catch(() => {
m.reply('*⚠️ ɴᴏ sᴇ ᴇɴᴄᴏɴᴛʀᴏ ɴɪɴɢᴜɴᴀ ɪɴғᴏʀᴍᴀᴄɪᴏ́ɴ, ᴘʀᴜᴇʙᴀ ǫᴜᴇ ʜᴀʏᴀs ᴇsᴄʀɪᴛᴏ ᴜɴᴀ sᴏʟᴀ ᴘᴀʟᴀʙʀᴀ ʏ ʟᴏ ʜᴀʏᴀs ᴇsᴄʀɪᴛᴏ ᴄᴏʀʀᴇᴄᴛᴀᴍᴇɴᴛᴇ*');
});
};
handler.help = ['wikipedia'].map((v) => v + ' <apa>');
handler.tags = ['buscadores'];
handler.command = /^(wiki|wikipedia)$/i;
handler.register = true
handler.limit = 1
export default handler;

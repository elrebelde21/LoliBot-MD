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
if (!text) throw `*⚠️ ${await tr("Estas usando mal el comando!!")}*\n\n*• ${await tr("Ejemplo")}:*\n*${usedPrefix + command} Estrellas*`;
wikipedia(`${text}`).then((res) => {
m.reply(`*${tr("Aqui tienes la información encontrarás")}:*\n\n` + res.result.isi)}).catch(() => {
m.reply(`*⚠️ ${tr("No se encontró ninguna información, prueba que hayas escrito una sola palabra y lo hayaw escrito correctamente")}*`);
});
};
handler.help = ['wikipedia'].map((v) => v + ' <apa>');
handler.tags = ['buscadores'];
handler.command = /^(wiki|wikipedia)$/i;
handler.register = true
handler.limit = 1
export default handler;

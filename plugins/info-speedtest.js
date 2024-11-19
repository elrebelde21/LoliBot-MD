import os from 'os';
import cp from "child_process";
import { promisify } from "util";
import fetch from 'node-fetch';
const exec = promisify(cp.exec).bind(cp);
var handler = async (m, { conn }) => {
let response = await fetch('https://ip-json.vercel.app/');
    let json = await response.json();    
    delete json.status;
    json.result.timeZones = [json.result.timeZones[0]];
    let currency = json.result.currency || {};
    let currencyCode = currency.code || 'N/A';
    let currencyName = currency.name || 'N/A';
let o;  
//await conn.reply(m.chat, global.wait, m);
m.react("🚀") 
try {
o = await exec('python3 speed.py --secure --share');
const {stdout, stderr} = o;
if (stdout.trim()) {
const match = stdout.match(/http[^"]+\.png/);
const urlImagen = match ? match[0] : null;
await conn.relayMessage(m.chat, {
extendedTextMessage:{ text: stdout.trim(), 
contextInfo: { externalAdReply: {
title: "< ＩＮＦＯ - ＳＰＥＥＤＴＥＳＴ />", body: `${toTime(os.uptime() * 1000)}`, mediaType: 1,
previewType: 0, renderLargerThumbnail: true,
thumbnailUrl: urlImagen, sourceUrl: redes.getRandom()
}}, mentions: null }}, {quoted: m})} 
//conn.sendMessage(m.chat, {image: {url: urlImagen}, caption: stdout.trim()}, {quoted: m})}
if (stderr.trim()) { 
const match2 = stderr.match(/http[^"]+\.png/);
const urlImagen2 = match2 ? match2[0] : null;    
await conn.relayMessage(m.chat, {
extendedTextMessage:{text: stderr.trim(), contextInfo: {externalAdReply: {
title: "< ＩＮＦＯ - ＳＰＥＥＤＴＥＳＴ />", body: `${toTime(os.uptime() * 1000)}`, mediaType: 1, 
previewType: 0, renderLargerThumbnail: true,
thumbnailUrl: urlImagen2, 
sourceUrl: redes.getRandom()
}}, mentions: null }}, {quoted: m})
//conn.sendMessage(m.chat, {image: {url: urlImagen2}, caption: stderr.trim()}, {quoted: m});
}} catch (e) {
o = e.message; 
return m.reply(o)
console.log(e)}}
handler.help = ["speedtest"];
handler.tags = ["main"];
handler.command = /^(speedtest?|test?speed)$/i;
handler.register = true 
export default handler

function deleteMessage() {
}

function formatSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return (Math.round(bytes / Math.pow(1024, i) * 100) / 100) + ' ' + sizes[i];
}

function ucword(str) {
  return str.replace(/\b\w/g, function(l) {
    return l.toUpperCase();
  });
}

function toTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
}

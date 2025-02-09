import db from '../lib/database.js';
import ws from 'ws';
import { cpus as _cpus, totalmem, freemem, platform, hostname, version, release, arch } from 'os';
import os from 'os';
import moment from 'moment';
import speed from 'performance-now';
import { sizeFormatter } from 'human-readable';

let format = sizeFormatter({std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`,});

const used = process.memoryUsage();

async function getSystemInfo() {
let cpuInfo = os.cpus();
let modeloCPU = cpuInfo && cpuInfo.length > 0 ? cpuInfo[0].model : null

const data = {plataforma: os.platform(),
núcleosCPU: cpuInfo ? cpuInfo.length : null,
modeloCPU: modeloCPU,
arquitecturaSistema: os.arch(),
versiónSistema: os.release(),
procesosActivos: os.loadavg()[0],
memory: humanFileSize(used.free, true, 1) + ' libre de ' + humanFileSize(used.total, true, 1),        
tiempoActividad: 'No disponible',
cargaPromedio: os.loadavg().map((avg, index) => `${index + 1} min: ${avg.toFixed(2)}.`).join('\n'),
horaActual: new Date().toLocaleString(),
};
const startTime = Date.now();
const endTime = Date.now();
data.latencia = `${endTime - startTime} ms`;
return data;
}

let handler = async (m, { conn, usedPrefix }) => {
let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => {
if (typeof stat.total === 'number' && !isNaN(stat.total)) {
return total + stat.total;
} else {
return total;
}}, 0);
let formattedTotalStats = !isNaN(totalStats) ? toNum(totalStats) : 'N/A';
let bot = global.db.data.settings[conn.user.jid];
let _uptime = process.uptime() * 1000;
let uptime = new Date(_uptime).toISOString().substr(11, 8);
let totalreg = Object.keys(global.db.data.users).length;
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
let totalbots = Object.keys(global.db.data.settings).length;
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
let totalchats = Object.keys(global.db.data.chats).length;
let totalf = Object.values(global.plugins).filter(v => v.help && v.tags).length;
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
let totaljadibot = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
const totalUsers = totaljadibot.length;
let timestamp = speed();
let latensi = speed() - timestamp;
const { restrict } = global.db.data.settings[conn.user.jid] || {}
const { autoread } = global.opts    

getSystemInfo().then(async (data) => {
let teks = `*≡ INFOBOT*

*INFORMACIÓN*
*▣ Grupos total:* ${groupsIn.length}
*▣ Grupos unidos:* ${groupsIn.length}
*▣ Grupo salidos:* ${groupsIn.length - groupsIn.length}
*▣ Chats privado:* ${chats.length - groupsIn.length}
*▣ Chats totales:* ${chats.length}
*▣ Sub-Bots conectado:* ${totalUsers}
*▣ Total plugins:* ${totalf}
*▣ Velocidad:* ${latensi.toFixed(4)} ms
*▣ Actividad:* ${uptime}

*▣ Comando Ejecutando:* ${formattedTotalStats}/${totalStats}
*▣ Grupos registrado:* ${toNum(totalchats)}/${totalchats}
*▣ Usuarios registrado:* ${toNum(rtotalreg)} de ${toNum(totalreg)} users totales 

*≡ S E R V E R*
▣ *Servidor:* ${hostname()}
▣ *Plataforma:* ${platform()}
▣ *Cpu:* ${data.núcleosCPU} 
▣ *Ram usada:* ${format(totalmem() - freemem())} de ${format(totalmem())}
▣ *Uptime:* ${toTime(os.uptime() * 1000)}`;

await conn.sendMessage(m.chat, {text: teks, contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363355261011910@newsletter', serverMessageId: '', newsletterName: 'LoliBot ✨' }, externalAdReply : {mediaUrl: null, mediaType: 1, description: null, "title": `INFO - BOT`, previewType: 0, "thumbnail": img1, sourceUrl: redes.getRandom()}}}, { quoted: m })
//conn.sendMessage(m.chat, {image: { url: "https://telegra.ph/file/39fb047cdf23c790e0146.jpg" }, caption: teks, contextInfo: {externalAdReply: { title: `INFO - BOT`, sourceUrl: redes.getRandom(), mediaType: 1, renderLargerThumbnail: true, showAdAttribution: true, thumbnailUrl: img1}}}, { quoted: m })
});
}
handler.help = ['infobot'];
handler.tags = ['main'];
handler.command = /^(infobot|informacionbot|infololi)$/i;
handler.register = true;
export default handler;

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else {
        return number.toString();
    }
}

function humanFileSize(bytes) {
    const unidades = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const exponente = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, exponente)).toFixed(2)} ${unidades[exponente]}`;
}

function toTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return `${days} d, ${hours % 24} hs, ${minutes % 60} min, ${seconds % 60} seg`;
}
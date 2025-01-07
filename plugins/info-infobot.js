import db from '../lib/database.js';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ws from 'ws'
import { cpus as _cpus, totalmem, freemem, platform, hostname, version, release, arch } from 'os';
import os from 'os';
import moment from 'moment';
import speed from 'performance-now';
import { sizeFormatter } from 'human-readable';
import si from 'systeminformation';

let format = sizeFormatter({std: 'JEDEC',
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
});

const __filename = fileURLToPath(import.meta?.url)
const __dirname = path?.dirname(__filename)
const carpetaBase = path?.resolve(__dirname, '..', 'jadibts')
const cantidadCarpetas = (fs?.readdirSync(carpetaBase, { withFileTypes: true }).filter(item => item?.isDirectory())?.length) || 0

const used = process.memoryUsage();
    let ram = await si.mem()
    let cpu = await si.cpuCurrentSpeed()
    let disk = await si.fsSize()
    let up = await si.time()
      
async function getSystemInfo() {
let disk = await si.fsSize();
const memInfo = await si.mem();
const load = await si.currentLoad();
    
let cpuInfo = os.cpus();
let modeloCPU = cpuInfo && cpuInfo.length > 0 ? cpuInfo[0].model : 'Modelo de CPU no disponible';
let espacioTotalDisco = 'Información no disponible';
if (disk && disk.length > 0) {
espacioTotalDisco = humanFileSize(disk[0].available, true, 1) + ' libre de ' + humanFileSize(disk[0].size, true, 1);
}

const data = {
latencia: 'No disponible',
plataforma: os.platform(),
núcleosCPU: cpuInfo ? cpuInfo.length : 'No disponible',
modeloCPU: modeloCPU,
arquitecturaSistema: os.arch(),
versiónSistema: os.release(),
procesosActivos: os.loadavg()[0],
porcentajeCPUUsada: load.currentLoad.toFixed(2) + '%',
memory: humanFileSize(ram.free, true, 1) + ' libre de ' + humanFileSize(ram.total, true, 1),
ramUsada: (memInfo.used / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
ramTotal: (memInfo.total / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
ramLibre: (memInfo.free / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
porcentajeRAMUsada: ((memInfo.used / memInfo.total) * 100).toFixed(2) + '%',
espacioTotalDisco: espacioTotalDisco,
tiempoActividad: 'No disponible',
cargaPromedio: os.loadavg().map((avg, index) => `${index + 1} min: ${avg.toFixed(2)}.`).join('\n'),
horaActual: new Date().toLocaleString(),
detallesCPUNúcleo: load.cpus.map(cpu => cpu.load.toFixed(2) + '%')
};

const startTime = Date.now();
await si.currentLoad();
const endTime = Date.now();
data.latencia = `${endTime - startTime} ms`;
const uptimeSeconds = await si.time().uptime;
const days = Math.floor(uptimeSeconds / 60 / 60 / 24);
const hours = Math.floor((uptimeSeconds / 60 / 60) % 24);
const minutes = Math.floor((uptimeSeconds / 60) % 60);

data.tiempoActividad = `${days}d ${hours}h ${minutes}m`;
return data;
}

let handler = async (m, { conn, usedPrefix }) => {
let bot = global.db.data.settings[conn.user.jid];
let _uptime = process.uptime() * 1000;
let uptime = new Date(_uptime).toISOString().substr(11, 8);
let totalreg = Object.keys(global.db.data.users).length;
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
let totalbots = Object.keys(global.db.data.settings).length;
let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0);
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
let totalchats = Object.keys(global.db.data.chats).length;
let totalf = Object.values(global.plugins).filter(v => v.help && v.tags).length;
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'));
let totaljadibot = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn)])];
const totalUsers = totaljadibot.length;
let timestamp = speed();
let latensi = speed() - timestamp;

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

*▣ Comando Ejecutando:* ${toNum(totalStats)}/${totalStats}
*▣ Grupos registrado:* ${toNum(totalchats)}/${totalchats}
*▣ Usuarios registrado:*  ${rtotalreg} de ${totalreg} usuarios

*≡ S E R V E R*
▣ *Servidor:* ${hostname()}
▣ *Plataforma:* ${platform()}
▣ *Núcleos de CPU:* ${data.núcleosCPU} 
▣ *CPU Usada:* ${data.porcentajeCPUUsada} 
▣ *Ram usada:* ${format(totalmem() - freemem())} / ${format(totalmem())}
▣ *Espacio Total en Disco:* ${data.espacioTotalDisco} 
▣ *Uptime:* ${data.tiempoActividad}`;

await conn.sendMessage(m.chat, {image: { url: "https://telegra.ph/file/39fb047cdf23c790e0146.jpg" }, caption: teks, contextInfo: {externalAdReply: { title: `INFO - BOT`, sourceUrl: redes.getRandom(), mediaType: 1, showAdAttribution: true, thumbnailUrl: img1,
}}}, { quoted: m })});
};
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
}}

function humanFileSize(bytes) {
const unidades = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
const exponente = Math.floor(Math.log(bytes) / Math.log(1024));
return `${(bytes / Math.pow(1024, exponente)).toFixed(2)} ${unidades[exponente]}`;
}

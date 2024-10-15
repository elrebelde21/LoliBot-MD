import { cpus as _cpus, totalmem, freemem } from 'os'
import util from 'util'
import os from 'os'
import moment from 'moment';
import fetch from 'node-fetch'
import osu from 'node-os-utils'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import si from 'systeminformation';

let format = sizeFormatter({
std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})

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
//memory: humanFileSize(ram.free, true, 1) + ' libre de ' + humanFileSize(ram.total, true, 1),
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

//Calcula la latencia (tiempo de respuesta)
const startTime = Date.now();
await si.currentLoad();
const endTime = Date.now();
data.latencia = `${endTime - startTime} ms`;

//Calcula el tiempo de actividad
const uptimeSeconds = await si.time().uptime;
const days = Math.floor(uptimeSeconds / 60 / 60 / 24);
const hours = Math.floor((uptimeSeconds / 60 / 60) % 24);
const minutes = Math.floor((uptimeSeconds / 60) % 60);

data.tiempoActividad = `${days}d ${hours}h ${minutes}m`;
return data;
}

let handler = async (m, { conn, usedPrefix, command, isRowner}) => {
try {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000 }
  
let muptime = clockString(_muptime)
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
const used = process.memoryUsage()
const cpus = _cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})

const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
  
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}})

let old = performance.now()
const { key } = await conn.sendMessage(m.chat, {text: `𝘾𝙤𝙢𝙚𝙣𝙯𝙖𝙣𝙙𝙤 𝙥𝙧𝙪𝙚𝙗𝙖 𝙙𝙚𝙡 𝙫𝙚𝙡𝙤𝙘𝙞𝙙𝙖𝙙 🚀...`}, {quoted: fkontak});
// await delay(1000 * 2);
//await conn.reply(m.chat, `𝘾𝙤𝙢𝙚𝙣𝙯𝙖𝙣𝙙𝙤 𝙥𝙧𝙪𝙚𝙗𝙖 𝙙𝙚𝙡 𝙫𝙚𝙡𝙤𝙘𝙞𝙙𝙖𝙙 🚀...`, fkontak,  m)
let neww = performance.now()
let speed = neww - old

getSystemInfo().then(async (data) => {
let caption = `*🚀 Velocidad 🚀*

🚄 *${Math.round(neww - old)}* ms
🚄 *${speed}* ms

*🕕 TIEMPO ACTIVOS*
${muptime}
${readMore}
*🟢 C H A T S*
▢ *${groupsIn.length}* _Chats de grupo_
▢ *${groupsIn.length}* _Grupos unidos_
▢ *${groupsIn.length - groupsIn.length}* _Grupos abandonados_
▢ *${chats.length - groupsIn.length}* _Chats Privados_
▢ *${chats.length}* _Total Chats_

*🔰 S E R V I D O R : S E R V E R*
*💻 Plataforma :* \`\`\`${os.platform()}\`\`\`
*📡 Servidor :* _${os.hostname()}_
*🔢 Núcleos de CPU :* _${data.núcleosCPU}_
*📡 Modelo de CPU :* _${data.modeloCPU}_
*🏗️ Arquitectura del Sistema :* _${data.arquitecturaSistema}_
*🔢 Versión del Sistema :* _${data.versiónSistema}_
*📈 Procesos Activos :* _${data.procesosActivos}_
*🔳 CPU Usada :* _${data.porcentajeCPUUsada}_
*🟢 RAM:* ${format(totalmem() - freemem())} / ${format(totalmem())}
*🔵 RAM Libre:* ${format(freemem())}
*💾 Porcentaje de RAM Usada :* _${data.porcentajeRAMUsada}_
*📦 Espacio Total en Disco :* _${data.espacioTotalDisco}_
*⏳ Uptime :* _${data.tiempoActividad}_

${readMore}
*NodeJS Uso de memoria : Memory Usage*
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}

${cpus[0] ? `*Uso total de la CPU*
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

*CPU Core(s) Uso (${cpus.length} Core CPU)*
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`
await conn.sendMessage(m.chat, {text: caption, edit: key})});
//await conn.sendFile(m.chat, gataImg.getRandom(), 'gata.jpg', caption, fkontak)
///await conn.sendButton(m.chat, wm, caption, gata.getRandom(), [['𝗠 𝗘 𝗡 𝗨 ☘️', '/menu']], m, dos.getRandom())
} catch (e) {
await conn.reply(m.chat, `${fg}*ALGO SALIÓ MAL.*\n\n\`\`\`REPORTE ESTE COMANDO ${usedPrefix + command} CON EL COMANDO ${usedPrefix}reporte\`\`\``, m)
console.log(e) 
}}
handler.help = ['ping', 'speed']
handler.tags = ['main']
handler.command = /^(ping|speed|velocidad|rapidez|velocity)$/i
handler.register = true 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [' ' + d, ' dias, ', h, ' hs, ', m, ' min, ', s, ' seg '].map(v => v.toString().padStart(2, 0)).join('')
}

function humanFileSize(bytes) {
    const unidades = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const exponente = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, exponente)).toFixed(2)} ${unidades[exponente]}`;
}
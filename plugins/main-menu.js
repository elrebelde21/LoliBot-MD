import moment from 'moment-timezone'
import { xpRange } from '../lib/levelling.js'
import { db } from '../lib/postgres.js'
import fs from "fs";

const cooldowns = new Map()
const COOLDOWN_DURATION = 180000

const tags = {
main: 'ℹ️ INFOBOT',
jadibot: '✨ SER SUB BOT',
downloader: '🚀 DESCARGAS',
game: '👾 JUEGOS',
gacha: '✨️ NEW - RPG GACHA',
rg: '🟢 REGISTRO',
group: '⚙️ GRUPO',
nable: '🕹 ENABLE/DISABLE',
nsfw: '🥵 COMANDO +18',
buscadores: '🔍 BUSCADORES',
sticker: '🧧 STICKER',
econ: '🛠 RPG',
convertidor: '🎈 CONVERTIDORES',
logo: '🎀 LOGOS',
tools: '🔧 HERRAMIENTA',
randow: '🪄 RANDOW',
efec: '🎙 EFECTO NOTA DE VOZ',
owner: '👑 OWNER'
}

const defaultMenu = {
before: `「 %wm 」

Hola 👋🏻 *%name*

*• Fecha:* %fecha
*• Hora:* %hora (🇦🇷) 
*• Usuario:* %totalreg
*• Tiempo activos:* %muptime
*• Tu limite:* %limit
%botOfc

*• Usuario registrados:* %toUserReg de %toUsers

Unirte a nuestro canal de WhatsApp y informarte de todas la novedades/Actualizaciones del bot y mas
%nna2

*Puede hablar con bot de esta forma ej:*
@%BoTag ¿Que es una api?
`.trimStart(),
  header: '`<[ %category ]>`',
  body: ' %cmd %islimit %isPremium',
  footer: `\n`,
  after: ''
}

const handler = async (m, { conn, usedPrefix: _p, args }) => {
const chatId = m.key?.remoteJid;
const now = Date.now();
const chatData = cooldowns.get(chatId) || { lastUsed: 0, menuMessage: null };
const timeLeft = COOLDOWN_DURATION - (now - chatData.lastUsed);

if (timeLeft > 0) {
try {
const senderTag = m.sender ? `@${m.sender.split('@')[0]}` : '@usuario';
await conn.reply(chatId, `⚠️ Hey ${senderTag}, pendejo, ahí está el menú 🙄\n> Solo se enviará cada 3 minutos para evitar spam, Desplázate hacia arriba para verlo completo. 👆`, chatData.menuMessage || m);
} catch (err) {
return;
}
return;
}

const name = m.pushName || 'sin name';
const fecha = moment.tz('America/Argentina/Buenos_Aires').format('DD/MM/YYYY');
const hora = moment.tz('America/Argentina/Buenos_Aires').format('HH:mm:ss');
const _uptime = process.uptime() * 1000;
const muptime = clockString(_uptime);

let user;
try {
const userRes = await db.query(`SELECT * FROM usuarios WHERE id = $1`, [m.sender]);
user = userRes.rows[0] || { limite: 0, level: 0, exp: 0, role: '-' };
} catch (err) {
user = { limite: 0, level: 0, exp: 0, role: '-' };
}

let totalreg = 0;
let rtotalreg = 0;

try {
  const totalRes = await db.query(`SELECT COUNT(*) AS total FROM usuarios`);
  const regRes = await db.query(`SELECT COUNT(*) AS total FROM usuarios WHERE registered = true`);

  totalreg = Number(totalRes?.rows?.[0]?.total ?? totalRes?.rows?.[0]?.count ?? 0);
  rtotalreg = Number(regRes?.rows?.[0]?.total ?? regRes?.rows?.[0]?.count ?? 0);
} catch (err) {
  console.error("❌ Error contando usuarios del menú:", err);
  totalreg = 0;
  rtotalreg = 0;
}

const toUsers = toNum(totalreg || 0);
const toUserReg = toNum(rtotalreg || 0);
const nombreBot = conn.user?.name || 'Bot'
const isPrincipal = conn === global.conn;
const tipo = isPrincipal ? 'Bot Oficial' : 'Sub Bot';
let botOfc = '';
let BoTag = "";
if (conn.user?.id && global.conn?.user?.id) {
const jidNum = conn.user.id.replace(/:\d+/, '').split('@')[0];
botOfc = (conn.user.id === global.conn.user.id) ? `*• Bot Ofc:* wa.me/${jidNum}` : `*• Soy un sub bot del:* wa.me/${global.conn.user.id.replace(/:\d+/, '').split('@')[0]}`;
BoTag = jidNum;
}

const multiplier = "750" || 1.5;
const { min, xp, max } = xpRange(user.level || 0, multiplier);

const help = Object.values(global.plugins).filter(p => !p.disabled).map(plugin => ({
help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
prefix: 'customPrefix' in plugin,
limit: plugin.limit,
premium: plugin.premium
}));

const categoryRequested = args[0]?.toLowerCase();
const validTags = categoryRequested && tags[categoryRequested] ? [categoryRequested] : Object.keys(tags);
let text = defaultMenu.before;

for (const tag of validTags) {
const comandos = help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help);
if (!comandos.length) continue;

text += '\n' + defaultMenu.header.replace(/%category/g, tags[tag]) + '\n';
for (const plugin of comandos) {
for (const helpCmd of plugin.help) {
text += defaultMenu.body
.replace(/%cmd/g, plugin.prefix ? helpCmd : _p + helpCmd)
.replace(/%islimit/g, plugin.limit ? '(💎)' : '')
.replace(/%isPremium/g, plugin.premium ? '(💵)' : '') + '\n';
}}
text += defaultMenu.footer;
}
text += defaultMenu.after;

const replace = {
'%': '%', p: _p, name,
limit: user.limite || 0,
level: user.level || 0,
role: user.role || '-',
totalreg, rtotalreg, toUsers, toUserReg,
exp: (user.exp || 0) - min,
maxexp: xp,
totalexp: user.exp || 0,
xp4levelup: max - (user.exp || 0),
fecha, hora, muptime,
wm: info.wm,
botOfc: botOfc,
BoTag: BoTag,
nna2: info.nna
};

text = String(text).replace(new RegExp(`%(${Object.keys(replace).join('|')})`, 'g'), (_, key) => replace[key] ?? '');
try {
let pp = fs.readFileSync('./media/Menu2.jpg');
const menuMessage = await conn.sendMessage(chatId, { text: text, contextInfo: { forwardedNewsletterMessageInfo: { newsletterJid: process.env.CHANNEL_ID,newsletterName: "LoliBot ✨️" }, forwardingScore: 999, isForwarded: true, mentionedJid: await conn.parseMention(text), externalAdReply: { mediaUrl:  [info.nna, info.nna2, info.md].getRandom(), mediaType: 2, showAdAttribution: false, renderLargerThumbnail: false, title: "✨️ MENU ✨️", body: `${nombreBot} (${tipo})`, thumbnailUrl: info.img2, sourceUrl: "https://skyultraplus.com" }}}, { quoted: m });
cooldowns.set(chatId, { lastUsed: now, menuMessage: menuMessage })
m.react('🙌');
} catch (err) {    
m.react('❌')
console.error(err);
}}
handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help|allmenu|menú)$/i
export default handler

const clockString = ms => {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

const toNum = n => {
  n = Number(n || 0)
  return n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + 'M'
    : n >= 1_000 ? (n / 1_000).toFixed(1) + 'k'
    : n.toString()
}
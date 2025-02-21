//import db from '../lib/database.js'
import { canLevelUp } from '../lib/levelling.js'

export async function before(m, { conn }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
 let ppch = await conn.profilePictureUrl(who, 'image').catch(_ => imageUrl.getRandom()) 
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat]
if (!chat.autolevelup) return !0
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier))
user.level++
user.role = global.rpg.role(user.level).name
if (before !== user.level) {
    
conn.reply(m.chat, [`*「 FELICIDADES LEVEL UP 🆙🥳 」*\n\nFelicidades subiste de nivel sigue asi 👏\n\n*• NIVEL:* ${before} ⟿ ${user.level}\n*• RANGO:* ${user.role}\n\n_*Para ver tu XP en tiempo real coloca el comando #level*_`, `@${m.sender.split`@`[0]} Ohhh pa has alcanzado el siguiente nivel\n*• NIVEL:* ${before} ⟿ ${user.level}\n\n_*Para ver quien es esta el top coloca el comando #lb*_`, `Que pro @${m.sender.split`@`[0]} has alcanzado un nuevo nivel 🙌\n\n*• Nuevo nivel:* ${user.level}\n*• Nivel anterior:* ${before}\n`].getRandom(), m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: ' 💫 𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 🥳 ', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})  

let niv = `*${m.pushName || 'Anónimo'}* Obtiene un nuevo nivel 🥳

*• Nivel anterior:* ${before} 
*• Nivel actúal :* ${user.level}
*• Rol:* ${user.role}
*• Bot:* ${wm}`
let nivell = `*${m.pushName || 'Anónimo'} Haz subido un nuevo nivel 🥳*

> _*• NIVEL:* ${before} ⟿ ${user.level}_`
let nivelll = `🥳 ${m.pushName || 'Anónimo'} Que pro Acaba de alcanzar un nuevo nivel 🥳

*• Nivel:* ${before} ⟿ ${user.level}
*• Rango:* ${user.role}
*• Bot:* ${wm}`
await global.conn.sendMessage(global.ch.ch1, { text: [niv, nivell, nivelll].getRandom(), contextInfo: {
externalAdReply: {
title: "【 🔔 Notificación General 🔔 】",
body: '¡Haz subido de nivel 🥳!',
thumbnailUrl: ppch, 
sourceUrl: redes.getRandom(),
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: false
}}}, { quoted: null })
}}		

global.rpg = {
emoticon(text) {
text = text.toLowerCase();
const mapping = {
role: '🏅',
level: '⬆️'
};
for (const key in mapping) {
if (text.includes(key)) return mapping[key];
}
return '';
},
_roles: null,

generateRoles() {
if (this._roles) return this._roles; 
const ranks = ['NOVATO(A)', 'APRENDIS', 'EXPLORADOR(A)', 'MAESTRO(A)', 'IRON', 'PLATA', 'ORO', 'Bard', 'Necromancer', 'Warlock', 'Wizard', 'Sage', 'Priest', 'Rogue', 'Brawler', 'Archer', 'Sniper', 'Ninja', 'Samurai', 'Berserker', 'Legend', 'Champion', 'Grandmaster', 'Elder', 'Immortal', 'Nephalem', 'Eternal', 'Neptune', 'Pluto', 'Eris', 'Ascension', 'Elysium', 'Ether', 'Gaea', 'Hades', 'DIAMANTE', 'PRO EN LOLIBOT-MD', 'SUPER PRO', 'LEGENDARIO(A)', 'Nova', 'LEYENDA', 'ESTELAR', 'TOP ASTRAL', 'ÉLITE GLOBAL'];
    
const subLevels = ['V', 'IV', 'III', 'II', 'I'];
let roles = [];
let currentLevel = 0;
const step = 1; 

ranks.forEach(rank => {
subLevels.forEach(numeral => {
roles.push({
name: `${rank} ${numeral}`,
level: currentLevel
});
currentLevel += step; 
});
});

roles.sort((a, b) => b.level - a.level);
this._roles = roles;
return roles;
},

role(level) {
level = parseInt(level, 10);
if (isNaN(level)) return { name: '', level: '' };
const roles = this.generateRoles();
const foundRole = roles.find(r => level >= r.level);
return foundRole || roles[roles.length - 1];
}
};
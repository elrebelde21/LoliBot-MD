export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
let setting = global.db.data.settings[this.user.jid];
const settingsREAD = global.db.data.settings[this.user.jid] || {};

if (m.text && prefixRegex.test(m.text)) {
this.sendPresenceUpdate('composing', m.chat);  
this.readMessages([m.key]);  
    
let usedPrefix = m.text.match(prefixRegex)[0];
let command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase(); 
}

if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};
  if (!global.db.data.users[m.sender].mensaje) global.db.data.users[m.sender].mensaje = {};
  if (!global.db.data.users[m.sender].mensaje[m.chat]) global.db.data.users[m.sender].mensaje[m.chat] = 0;
  global.db.data.users[m.sender].mensaje[m.chat]++;

if (m.fromMe) return;
if (m.isGroup) return !1;
if (!m.message) return !0;
let chat = global.db.data.chats[m.chat];
let bot = global.db.data.settings[this.user.jid] || {};
let user = global.db.data.users[m.sender] || {};

if (bot.antiPrivate) {
if (!m.chat.endsWith('g.us')) {
if (!user.warnPriv) {
await m.reply("⚠️ *Atención* ⚠️\n\nEl bot solo responde al comando *jadibot* en privado. Por favor, usa el comando *jadibot* para interactuar. Únete al grupo oficial para más funciones.");
        user.warnPriv = true;       
      }
      return; 
    }
    
    return !1;
  }
}

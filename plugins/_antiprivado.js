export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
let prefixRegex = new RegExp('^[' + (opts['prefix'] || '‎z/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.,\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

let setting = global.db.data.settings[this.user.jid]
const settingsREAD = global.db.data.settings[this.user.jid] || {}

if (m.text && prefixRegex.test(m.text)) {
this.sendPresenceUpdate('composing', m.chat)
this.readMessages([m.key])
        
let usedPrefix = m.text.match(prefixRegex)[0]
let command = m.text.slice(usedPrefix.length).trim().split(' ')[0]
}

if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = {};
if (!global.db.data.users[m.sender].mensaje) global.db.data.users[m.sender].mensaje = {};
if (!global.db.data.users[m.sender].mensaje[m.chat]) global.db.data.users[m.sender].mensaje[m.chat] = 0;
global.db.data.users[m.sender].mensaje[m.chat]++;

if (m.fromMe) return
if (m.isGroup) return !1
if (!m.message) return !0 
if (m.chat === "120363297379773397@newsletter") return; 
if (m.chat === "120363355261011910@newsletter") return;
//if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') ||  m.text.includes('menu') || m.text.includes('estado') || m.text.includes('code') || m.text.includes('Code') || m.text.includes('bots') || m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('reg') || m.text.includes('verificar') || m.text.includes('Serbot') || m.text.includes('Jadibot') || m.text.includes('jadibot code') || m.text.includes('serbot code') || m.text.includes('jadibot --code') || m.text.includes('serbot --code') || m.text.includes('code')) return !0
const comandosPermitidos = ['PIEDRA', 'PAPEL', 'TIJERA', 'menu', 'estado', 'code', 'Code', 'bots',
  'serbot', 'jadibot', 'reg', 'verificar', 'Serbot', 'Jadibot',
  'jadibot code', 'serbot code', 'jadibot --code', 'serbot --code'];
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[this.user.jid] || {}
let user = global.db.data.users[m.sender] || {};
/*if (bot.antiPrivate && !isOwner && !isROwner) {
await m.reply(`Hola esta prohibido usar los comando al privado del bot, por lo cual seras bloqueado...\n\n> _*Para usar mi funciones unirte al  grupo oficial 👇*_\n${[nnn, nnnttt, nnnt].getRandom()}`, false, { mentions: [m.sender] })
await this.updateBlockStatus(m.chat, 'block')
}*/
if (bot.antiPrivate && !m.chat.endsWith('g.us')) {
if (!m.text.toLowerCase().includes('jadibot')) {
    if (!user.warnPriv) {
      await m.reply(`Hola esta prohibido usar los comando al privado del bot, por lo cual seras bloqueado...\n\n> _*Para usar mi funciones unirte al  grupo oficial 👇*_\n${[nnn, nnnttt, nnnt].getRandom()}`, false, { mentions: [m.sender] })
      user.warnPriv = true; 
      global.db.data.users[m.sender] = user; 
    }
    return;
  }
}

return !1;
}


/*
if (m.fromMe) return;
if (m.isGroup) return !1;
if (!m.message) return !0;

let bot = global.db.data.settings[this.user.jid] || {};
let user = global.db.data.users[m.sender] || {};

// Si antiPrivate está activado y el chat NO es un grupo
if (bot.antiPrivate && !m.chat.endsWith('g.us')) {
  // Si el mensaje NO es "jadibot", ignorarlo completamente
  if (!m.text.toLowerCase().includes('jadibot')) {
    if (!user.warnPriv) {
      await m.reply(`⚠️ *Atención* ⚠️\n\nEl uso del bot en privado no está permitido. Solo puedes usar el comando *jadibot*. Para más funciones, únete al grupo oficial.`);
      user.warnPriv = true; // Marcar que ya recibió la advertencia
      global.db.data.users[m.sender] = user; // Guardar el estado del usuario
    }
    return;
  }
}

// Si el mensaje es "jadibot", responder normalmente
return !1;

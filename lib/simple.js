import fs from 'fs'
import { fileTypeFromBuffer } from 'file-type'
import path from 'path';
import fetch from 'node-fetch';
import { db } from './postgres.js'
    
const {
  default: _makeWaSocket,
  makeWALegacySocket,
  proto,
  downloadMediaMessage,
  downloadContentFromMessage,
  jidDecode,
  areJidsSameUser,
  generateWAMessage,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  WAMessageStubType,
  extractMessageContent,
  WA_DEFAULT_EPHEMERAL,
  prepareWAMessageMedia,
} = (await import('@whiskeysockets/baileys')).default;

export async function smsg(conn, m) {
if (!m) return m;
const M = proto.WebMessageInfo; 
m.db = { query: (...args) => db.query(...args) };
  
if (!m.mentionedJid) m.mentionedJid = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
if (!m.quoted && m.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
    const ctx = m.message.extendedTextMessage.contextInfo;
    const quotedMessage = {
      key: {
        id: ctx.stanzaId,
        fromMe: ctx.participant === conn.user?.jid,
        remoteJid: m.chat,
        participant: ctx.participant,
      },
      message: ctx.quotedMessage,
      messageTimestamp: m.messageTimestamp,
      participant: ctx.participant,
      sender: ctx.participant,
      chat: m.chat,
    };
    m.quoted = {
      ...quotedMessage,
      download: () => downloadMediaMessage(quotedMessage, 'buffer', {}),
    };
  }

try {
  const resUser = await db.query('SELECT * FROM usuarios WHERE id = $1', [m.sender]);
  m.user = resUser.rows[0] || {};
} catch (e) {
  console.error("❌ Error al obtener datos del usuario:", e);
  m.user = {};
}

if (m.isGroup) {
  try {
    const resChat = await db.query('SELECT * FROM group_settings WHERE group_id = $1', [m.chat]);
    m.chatDB = resChat.rows[0] || {};
  } catch (e) {
    console.error("❌ Error al obtener datos del grupo:", e);
    m.chatDB = {};
  }
}

if (m.quoted && m.quoted.message && typeof m.quoted.message === 'object') {
  const keys = Object.keys(m.quoted.message);
  if (keys.length > 0) {
    const type = keys[0];
    const media = m?.quoted.message[type];

    if (type?.includes('image')) m.quoted.mimetype = 'image';
    else if (type?.includes('video')) m.quoted.mimetype = 'video';
    else if (type?.includes('sticker')) m.quoted.mimetype = 'image/webp';
    else if (type?.includes('audio')) m.quoted.mimetype = 'audio';
    else if (type?.includes('document')) m.quoted.mimetype = media.mimetype || 'application/octet-stream';
  }
}

if (!m.mimetype) {
    const messageContent = m.message;
    if (messageContent) {
      const type = Object.keys(messageContent)[0];
if (type && type.includes('image')) m.mimetype = 'image';
else if (type && type.includes('video')) m.mimetype = 'video';
else if (type && type.includes('sticker')) m.mimetype = 'image/webp';
else if (type && type.includes('audio')) m.mimetype = 'audio';
else if (type && type.includes('document')) {
  const msgMedia = messageContent[type];
  m.mimetype = msgMedia?.mimetype || 'application/octet-stream';
  }
    }
  }

  if (m.key) {
    m.id = m.key.id;
    m.chat = m.key.remoteJid;
    m.fromMe = m.key.fromMe;
    m.isGroup = m.chat?.endsWith('@g.us') || false;
    let senderJid = m.fromMe ? conn.user.id : m.key.participant || m.key.remoteJid;
if (senderJid.endsWith('@lid')) {
  m.sender = senderJid; 
} else {
  m.sender = cleanJid(senderJid);
}
 m.who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.id : m.sender;
m.pp = await conn.profilePictureUrl(m.who, 'image').catch(_ => 'https://telegra.ph/file/33bed21a0eaa789852c30.jpg');

if (m.isGroup) {
  try {
    const metadata = await conn.groupMetadata(m.chat);
    const participants = metadata.participants || [];
    m.isAdmin = participants.some(p => p.id === m.sender && (p.admin === 'admin' || p.admin === 'superadmin'));
    m.isBotAdmin = participants.some(p => p.id === conn.user?.id.replace(/:\d+@/, "@") && (p.admin === 'admin' || p.admin === 'superadmin'));
  } catch (e) {
    m.isAdmin = false;
    m.isBotAdmin = false;
  }
}
  } else {
  }

m.download = async () => {
    const messageContent = m.message || (m.quoted && m.quoted.message);
    if (!messageContent) throw new Error('No se encontró contenido para descargar');
    const type = Object.keys(messageContent)[0];
    const stream = await downloadContentFromMessage(messageContent[type], type.includes('image') ? 'image' : type.includes('video') ? 'video' : 'document');
    return await streamToBuffer(stream);
  };

conn.decodeJid = (jid) => {
  if (!jid) return jid;
  if (jid.endsWith('@lid')) return jid;
  if (/:\d+@/i.test(jid)) return jid.split(':')[0] + '@s.whatsapp.net';
  return jid;
};
    
  conn.getName = async (jid, withoutContact = false, m = null) => {
  if (!jid) return null;
  jid = conn.decodeJid ? conn.decodeJid(jid) : jid;
  try {
    if (jid.endsWith('@g.us')) {
      const metadata = await conn.groupMetadata(jid);
      return metadata.subject || (withoutContact ? null : jid.split('@')[0]);
    } else {
      if (jid === '0@s.whatsapp.net') return 'WhatsApp';
      if (conn.user?.jid && jid === conn.user.jid) return conn.user.name || jid.split('@')[0];
      if (m?.pushName && m?.sender === jid) return m.pushName;

      const res = await db.query('SELECT nombre FROM usuarios WHERE id = $1', [jid]);
      if (res.rows.length && res.rows[0].nombre) return res.rows[0].nombre;

      return jid.split('@')[0]; //
    }
  } catch (err) {
    console.error(err);
    return jid.split('@')[0];
  }
};

Array.prototype.getRandom = function () {
  return this[Math.floor(Math.random() * this.length)];
};
      
const originalSendMessage = conn.sendMessage.bind(conn);
conn.sendMessage = async function (jid, content, options = {}) {
  const contextInfoDefault = {
    mentionedJid: await conn.parseMention(content?.text || content?.caption || ''),
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
    newsletterJid: "120363305025805187@newsletter",
/*  newsletterJid: (() => {
  const loli = "120363305025805187@newsletter";
  const otros = ["120363160031023229@newsletter", "120363301598733462@newsletter"];
  return Math.random() < 0.75 ? loli :  otros[Math.floor(Math.random() * otros.length)]})(),*/
      newsletterName: "LoliBot ✨️"
    }
  };

  if (!content.contextInfo) {
    content.contextInfo = contextInfoDefault;
  }

  return originalSendMessage(jid, content, options);
};

  conn.parseMention = async (text = '') => {
    try {
      if (typeof text !== 'string') return [];
      const matches = [...text.matchAll(/@([0-9]{5,15})/g)];
      return matches.map(match => `${match[1]}@s.whatsapp.net`).filter(jid => jid.includes('@s.whatsapp.net'));
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  conn.reply = async (chatId, text, quoted = null, options = {}) => {
    const contextInfo = {
      mentionedJid: await conn.parseMention(text),
      isForwarded: true,
      forwardingScore: 1, 
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363305025805187@newsletter",
       newsletterName: "LoliBot ✨️"
      }
    };
    return await conn.sendMessage(chatId, { text, contextInfo }, { quoted, ...options });
  };

  // Reacción
  m.react = async (emoji) => {
    if (!emoji) return;
    await conn.sendMessage(m.chat || m.key.remoteJid, {
      react: { text: emoji, key: m.key }
    });
  };

const defaultContextInfo = async (caption, conn) => ({
  mentionedJid: await conn.parseMention(caption),
  isForwarded: true,
  forwardingScore: 1,
  forwardedNewsletterMessageInfo: {
    newsletterJid: "120363305025805187@newsletter",
    newsletterName: "LoliBot ✨️"
  }
});

function formatExternalAdReply(obj = {}) {
  if (!obj.thumbnailUrl && obj.thumbnail) {
    obj.thumbnailUrl = obj.thumbnail;
    delete obj.thumbnail;
  }
  return {
    ...obj,
    thumbnail: typeof obj.thumbnailUrl === "string" ? { url: obj.thumbnailUrl } : obj.thumbnailUrl,
  };
}

conn.sendFile = async function (jid, path, filename = '', caption = '', quoted = null, ptt = false, options = {}) {
  const contextInfo = options.contextInfo ?? await defaultContextInfo(caption, this);
  if (contextInfo.externalAdReply) contextInfo.externalAdReply = formatExternalAdReply(contextInfo.externalAdReply);
  delete options.contextInfo;

  const getCleanExt = (url) => {
    const match = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
    return match ? match[1].toLowerCase() : 'bin';
  };

  if (Buffer.isBuffer(path)) {
    const fileInfo = await fileTypeFromBuffer(path) || {};
    const ext = (filename.includes('.') ? filename.split('.').pop() : getCleanExt(path)).toLowerCase();
    const mime = fileInfo.mime || 'application/octet-stream';
    const fileName = filename || `file.${ext}`;

    const messageType = (() => {
      if (ext === 'webp') return 'sticker';
      if (['mp4', 'mov', 'mkv'].includes(ext)) return 'video';
      if (['mp3', 'm4a', 'ogg', 'wav'].includes(ext)) return 'audio';
      if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
      if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'document';
      if (['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'csv', 'json', 'apk'].includes(ext)) return 'document';
      return 'document';
    })();

    return await this.sendMessage(jid, {
      ...(messageType === 'sticker' ? { sticker: path } : { [messageType]: path }),
      mimetype: mime,
      fileName,
      caption,
      contextInfo,
      ...options,
    }, { quoted });

  } else if (typeof path === 'string' && /https?:\/\//.test(path)) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
      const buffer = await res.buffer();

      const fileInfo = await fileTypeFromBuffer(buffer) || {};
      const mime = fileInfo.mime || 'application/octet-stream';
      const ext = (typeof filename === 'string' && filename.includes('.') ? filename.split('.').pop() : getCleanExt(path)).toLowerCase();
      const fileName = filename || `file.${ext}`;

      const messageType = (() => {
        if (ext === 'webp') return 'sticker';
        if (['mp4', 'mov', 'mkv'].includes(ext)) return 'video';
        if (['mp3', 'm4a', 'ogg', 'wav'].includes(ext)) return 'audio';
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'image';
        if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'document';
        if (['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'csv', 'json', 'apk'].includes(ext)) return 'document';
        return 'document';
      })();

      return await this.sendMessage(jid, {
        ...(messageType === 'sticker' ? { sticker: buffer } : { [messageType]: buffer }),
        mimetype: mime,
        fileName,
        caption,
        contextInfo,
        ...options,
      }, { quoted });
    } catch (e) {
      console.error(e.message);
      return null;
    }
  }
};

conn.sendImage = async function (jid, path, caption = '', quoted = null, options = {}) {
  const contextInfo = options.contextInfo ?? await defaultContextInfo(caption, this);
  if (contextInfo.externalAdReply) contextInfo.externalAdReply = formatExternalAdReply(contextInfo.externalAdReply);
  delete options.contextInfo;

  return this.sendMessage(jid, {
    image: { url: path },
    caption,
    contextInfo,
    ...options
  }, { quoted });
};

conn.sendVideo = async function (jid, path, caption = '', quoted = null, options = {}) {
  const contextInfo = options.contextInfo ?? await defaultContextInfo(caption, this);
  if (contextInfo.externalAdReply) contextInfo.externalAdReply = formatExternalAdReply(contextInfo.externalAdReply);
  delete options.contextInfo;

  return this.sendMessage(jid, {
    video: { url: path },
    caption,
    contextInfo,
    ...options
  }, { quoted });
};

conn.fakeReply = async function (
  jid,
  caption = '',
  fakeNumber = '0@s.whatsapp.net',
  fakeCaption = '',
  quoted = null,
  options = {}
) {
  const contextInfo = options.contextInfo ?? await defaultContextInfo(caption, this);
  if (contextInfo.externalAdReply) contextInfo.externalAdReply = formatExternalAdReply(contextInfo.externalAdReply);
  delete options.contextInfo;

  return this.sendMessage(jid, {
    text: caption,
    contextInfo,
    ...options
  }, {
    quoted: {
      key: {
        fromMe: false,
        participant: fakeNumber,
        ...(jid.endsWith('@g.us') ? { remoteJid: jid } : { remoteJid: null })
      },
      message: {
        conversation: fakeCaption
      },
      messageTimestamp: parseInt(Date.now() / 1000)
    }
  });
};

conn.sendAudio = async function (jid, path, quoted = null, options = {}) {
  const contextInfo = options.contextInfo ?? await defaultContextInfo('', this);
  if (contextInfo.externalAdReply) contextInfo.externalAdReply = formatExternalAdReply(contextInfo.externalAdReply);
  delete options.contextInfo;

  return this.sendMessage(jid, {
    audio: { url: path },
    mimetype: 'audio/mpeg',
    contextInfo,
    ...options
  }, { quoted });
};

conn.sendAlbumMessage = async function (jid, medias = [], caption = '', quoted = null) {
  if (!Array.isArray(medias) || medias.length === 0) {
    throw new Error("No se proporcionaron medios válidos.");
  }

  const album = generateWAMessageFromContent(jid, {
    albumMessage: {
      expectedImageCount: medias.filter(media => media.type === "image").length,
      expectedVideoCount: medias.filter(media => media.type === "video").length,
      ...(quoted ? {
        contextInfo: {
          remoteJid: quoted.key.remoteJid,
          fromMe: quoted.key.fromMe,
          stanzaId: quoted.key.id,
          participant: quoted.key.participant || quoted.key.remoteJid,
          quotedMessage: quoted.message
        }
      } : {})
    }
  }, { quoted });

  await this.relayMessage(album.key.remoteJid, album.message, {
    messageId: album.key.id
  });

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    let mediaMessage;

    const mediaPayload = {};
    mediaPayload[type] = data;
    if (i === 0 && caption) {
      mediaPayload.caption = caption;
    }

    mediaMessage = await generateWAMessage(album.key.remoteJid, mediaPayload, {
      upload: this.waUploadToServer
    });

    mediaMessage.message.messageContextInfo = {
      messageAssociation: {
        associationType: 1,
        parentMessageKey: album.key
      }
    };

    await this.relayMessage(mediaMessage.key.remoteJid, mediaMessage.message, {
      messageId: mediaMessage.key.id
    });
  }

  return album;
};

conn.sendDocument = async function (jid, path, filename = 'file', quoted = null, options = {}) {
  const contextInfo = options.contextInfo ?? await defaultContextInfo('', this);
  if (contextInfo.externalAdReply) contextInfo.externalAdReply = formatExternalAdReply(contextInfo.externalAdReply);
  delete options.contextInfo;

  return this.sendMessage(jid, {
    document: { url: path },
    fileName: filename,
    mimetype: 'application/octet-stream',
    contextInfo,
    ...options
  }, { quoted });
};

  // Enviar sticker
  conn.sendSticker = async (jid, path, quoted = null, options = {}) => {
  const contextInfo = options.contextInfo ?? await defaultContextInfo('', conn)
  if (contextInfo.externalAdReply) contextInfo.externalAdReply = formatExternalAdReply(contextInfo.externalAdReply)
  delete options.contextInfo;

  return conn.sendMessage(
    jid,
    {
      sticker: typeof path === 'string' ? { url: path } : path,
      contextInfo,
      ...options
    },
    { quoted }
  )
}

  // Enviar nota de voz
  conn.sendPtt = async (jid, path, quoted = null, options = {}) => {
    const contextInfo = options.contextInfo || {};
    delete options.contextInfo;

    return conn.sendMessage(
      jid,
      {
        audio: { url: path },
        mimetype: "audio/ogg; codecs=opus",
        ptt: true,
        contextInfo,
        ...options
      },
      { quoted }
    );
  };

  return m;
}

function cleanJid(jid) {
  if (!jid) return jid;
  if (jid.includes('@lid')) return jid; 
  return jid.replace(/:\d+/, '').replace('@s.whatsapp.net', '') + '@s.whatsapp.net';
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}
import { WAMessageStubType } from '@whiskeysockets/baileys';
import PhoneNumber from 'awesome-phonenumber';
import chalk from 'chalk';
import { watchFile } from 'fs';

const terminalImage = global.opts['img'] ? require('terminal-image') : '';
const urlRegex = (await import('url-regex-safe')).default({ strict: false });

export default async function (m, conn = { user: {} }) {
if (!m.isCommand) return;
const senderName = await conn.getName(m.sender) || '';
const sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') + (senderName ? ' ~' + senderName : '');
const chatName = await conn.getName(m.chat) || '';
const me = PhoneNumber('+' + (conn.user?.jid || '').replace('@s.whatsapp.net', '')).getNumber('international');

let img;
  try {
    if (global.opts['img'] && /sticker|image/gi.test(m.mtype)) {
      img = await terminalImage.buffer(await m.download());
    }
  } catch (e) {
    console.error(e);
  }

const filesize = (m.msg ? m.msg.vcard ? m.msg.vcard.length : m.msg.fileLength ? m.msg.fileLength.low || m.msg.fileLength : m.msg.axolotlSenderKeyDistributionMessage ? m.msg.axolotlSenderKeyDistributionMessage.length :
m.text ? m.text.length : 0 : 0) || 0;

const user = global.db.data.users[m.sender] || {};
const userExp = isNaN(user.exp) ? 0 : user.exp;
const userMoney = isNaN(user.money) ? 0 : user.money;
const userLevel = isNaN(user.level) ? 0 : user.level;
const userLimit = isNaN(user.limit) ? 0 : user.limit;

console.log(`${chalk.redBright('%s')} ${chalk.black(chalk.bgYellow('%s'))} ${chalk.black(chalk.bgGreen('%s'))} ${chalk.magenta('%s [%s %sB]')}
 ${chalk.green('%s')} ${chalk.yellow('%s|%s')} ${chalk.blueBright('-')} ${chalk.green('%s')} ${chalk.cyanBright(chalk.blueBright('%s'))}`.trim(),
me + ' ~' + (conn.user?.name || 'Bot') + `${conn.user.jid == global.conn.user.jid ? '' : ' (𝗦𝗨𝗕 𝗕𝗢𝗧)'}`,
(m.messageTimestamp ? new Date(1000 * (m.messageTimestamp.low || m.messageTimestamp)) : new Date).toTimeString(),
m.messageStubType ? WAMessageStubType[m.messageStubType] : '',
filesize,
filesize === 0 ? 0 : (filesize / 1009 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1),
['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || '',
sender,
userExp,
userMoney,
m.chat + (chatName ? ' ~' + chatName : ''),
m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
);

if (img) console.log(img.trimEnd());

if (typeof m.text === 'string' && m.text) {
let log = m.text.replace(/\u200e+/g, '');
    
// Nuevos formatos/estilos para el texto en consola
// Créditos para: https://github.com/GataNina-Li    
let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~`])(?!`)(.+?)\1|```((?:.|[\n\r])+?)```|`([^`]+?)`)(?=\S?(?:[\s\n]|$))/g;
    let mdFormat = (depth = 4) => (_, type, text, monospace) => {
      let types = {
        '_': 'italic',
        '*': 'bold',
        '~': 'strikethrough',
        '`': 'bgGray'
      };
      text = text || monospace;
      let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(/`/g, '').replace(mdRegex, mdFormat(depth - 1)));
      return formatted;
    };
    log = log.replace(mdRegex, mdFormat(4));
    log = log.split('\n').map(line => {
      if (line.trim().startsWith('>')) {
        return chalk.bgGray.dim(line.replace(/^>/, '┃'));
      } else if (/^([1-9]|[1-9][0-9])\./.test(line.trim())) {
        return line.replace(/^(\d+)\./, (match, number) => {
          const padding = number.length === 1 ? '  ' : ' ';
          return padding + number + '.';
        });
      } else if (/^[-*]\s/.test(line.trim())) {
        return line.replace(/^[*-]/, '  •');
      }
      return line;
    }).join('\n');
    if (log.length < 1024) {
      log = log.replace(urlRegex, (url, i, text) => {
        let end = url.length + i;
        return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url;
      });
    }
    log = log.replace(mdRegex, mdFormat(4));
    if (m.mentionedJid) {
      for (let user of m.mentionedJid) {
        log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' + await conn.getName(user)));
      }
    }
    console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log);
  }
}

let file = global.__filename(import.meta.url);
watchFile(file, () => {
  console.log(chalk.redBright("Update 'lib/print.js'"));
});
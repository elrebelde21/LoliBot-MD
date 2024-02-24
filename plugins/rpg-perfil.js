import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix }) => {
let pp = 'https://telegra.ph/file/591d1228044b81d9721ab.jpg'
//const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
let user = global.db.data.users[m.sender]
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
try {
pp = await conn.getProfilePicture(who)         //pp = await conn.getProfilePicture(who)
} catch (e) {
} finally {
let { name, limit, lastclaim, registered, regTime, age } = global.db.data.users[who]
let mentionedJid = [who]
let username = conn.getName(who)
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let str = `.           \`「 ＰＥＲＦＩＬ 」\`

 *🔥 𝙉𝙤𝙢𝙗𝙧𝙚 :* ${name}
 *✨ 𝙉𝙪𝙢𝙚𝙧𝙤 :* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
*🔰 𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙨 :* wa.me/${who.split`@`[0]}${registered ?'\n🔸 𝙀𝙙𝙖𝙙 ' + age + ' *años*' : ''}
*💎 𝙇𝙞𝙢𝙞𝙩𝙚𝙨 :* *${limit}* 𝙙𝙚 𝙪𝙨𝙤𝙨
*❇️ 𝙍𝙚𝙜𝙞𝙨𝙩𝙧𝙖𝙙𝙤 :* ${user.registered === true ? '✅' : '❌ _#verificar_'}
*❇️ 𝙋𝙧𝙚𝙢𝙞𝙪𝙢 :* ${user.premiumTime > 0 ? '✅' : '❌ _#pase premium_'}
*🔰 𝙈𝙞 𝙚𝙨𝙩𝙖𝙙𝙤:* ${typeof user.miestado !== 'string' ? '_#miestado || Estado no asignado_' : '_Me siento ' + user.miestado + '_'}`.trim()
conn.sendFile(m.chat, pp, 'lp.jpg', str, m, false, { contextInfo: {forwardingScore: 9999999, isForwarded: true, mentionedJid, externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [md, yt, tiktok].getRandom()}}})}}
//conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid }})}}
handler.help = ['profile [@user]']
handler.tags = ['xp']
handler.command = /^perfil|profile?$/i
export default handler

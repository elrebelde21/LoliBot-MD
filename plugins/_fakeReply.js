import fetch from 'node-fetch'

let handler = m => m
handler.all = async function (m) {
	
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
let pp = await this.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/33bed21a0eaa789852c30.jpg")
	
global.rpl = { contextInfo: { externalAdReply: { mediaUrl: nna, mediaType: 'VIDEO', description: 'Actualización/novedades', title: packname, body: 'Canal update', thumbnailUrl: pp, sourceUrl: nna }}} 
   	
global.fake = { contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363160031023229@newsletter', serverMessageId: '', newsletterName: 'INFINITY-WA 💫' }, externalAdReply: { title: wm, body: vs, mediaType: 1, renderLargerThumbnail: false, previewType: `PHOTO`, thumbnailUrl: pp, sourceUrl: redes.getRandom() }}}
   
global.rpyp = { contextInfo: { externalAdReply: { mediaUrl: md, mediaType: 'VIDEO', description: 'GitHub', title: 'GitHub', body: 'ˢᶦ ᵗᵉ ᵃᵍʳᵃᵈᵃ ᵉˡ ᴮᵒᵗ ᵃᵖᵒʸᵃʳᵐᵉ ᶜᵒⁿ ᵘⁿᵃ 🌟', thumbnailUrl: pp, sourceUrl: md }}}

/*----------------------[ SALIDA DEL GRUPO ]-----------------------*/
if (!m.isGroup) return
let chats = global.db.data.chats[m.chat]
if (!chats.expired) return !0
if (+new Date() > chats.expired) {
await this.reply(m.chat, [`*${this.user.name}* ᴹᵉ ᵛᵒʸ ᵈᵉˡ ᵉˡ ᵍʳᵘᵖᵒ ᶠᵘᵉ ᵘⁿ ᵍᵘˢᵗᵒ ᵉˢᵗᵃ ᵃᵠᵘᶦ́ ˢᶦ ᵠᵘᶦᵉʳᵉˢ ᵠᵘᵉ ᵛᵘᵉˡᵛᵃ ᵁˢᵉʳ ᵈᵉ ⁿᵘᵉᵛᵒ ᵉˡ ᶜᵒᵐᵃⁿᵈᵒ`, `Bueno me voy de este grupo de mrd, no me agregue a grupo ptm`, `*${this.user.name}* me voy de este grupito culiado nada interesante yo queria ver teta y son puro gays aca 🤣`].getRandom()) 
await this.groupLeave(m.chat)
chats.expired = null
}

/*----------------------[ FIN DE PREMIUM ]-----------------------*/
for (const user of Object.values(global.db.data.users)) {
if (user.premiumTime != 0 && user.premium) {
if (new Date() * 1 >= user.premiumTime) {
user.premiumTime = 0;
user.premium = false;
const JID = Object.keys(global.db.data.users).find((key) => global.db.data.users[key] === user);
const usuarioJid = JID.split`@`[0];
const textoo = `*⚠️ @${usuarioJid} 𝚃𝚄 𝚃𝙸𝙴𝙼𝙿𝙾 𝙲𝙾𝙼𝙾 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙿𝚁𝙴𝙼𝙸𝚄𝙼 𝙷𝙰 𝙴𝚇𝙿𝙸𝚁𝙰𝙳𝙾, 𝚈𝙰 𝙽𝙾 𝙴𝚁𝙴𝚂 𝚄𝙽 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙿𝚁𝙴𝙼𝙸𝚄𝙼*`;
await this.sendMessage(JID, {text: textoo, mentions: [JID]}, {quoted: ''});
}}}}
 
export default handler

 

import fetch from 'node-fetch'

let handler = m => m
handler.all = async function (m) {
	
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
let pp = await this.profilePictureUrl(who, 'image').catch(_ => "https://telegra.ph/file/33bed21a0eaa789852c30.jpg")
	
global.rpl = { contextInfo: { externalAdReply: { mediaUrl: nna, mediaType: 'VIDEO', description: 'Actualización/novedades', title: packname, body: 'Canal update', thumbnailUrl: pp, sourceUrl: nna }}} 
   	
global.fake = { contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363160031023229@newsletter', serverMessageId: '', newsletterName: 'INFINITY-WA 💫' }, externalAdReply: { title: wm, body: vs, mediaType: 1, renderLargerThumbnail: false, previewType: `PHOTO`, thumbnailUrl: pp, sourceUrl: redes.getRandom() }}}
   
global.rpyp = { contextInfo: { externalAdReply: { mediaUrl: md, mediaType: 'VIDEO', description: 'GitHub', title: 'GitHub', body: 'ˢᶦ ᵗᵉ ᵃᵍʳᵃᵈᵃ ᵉˡ ᴮᵒᵗ ᵃᵖᵒʸᵃʳᵐᵉ ᶜᵒⁿ ᵘⁿᵃ 🌟', thumbnailUrl: pp, sourceUrl: md }}}

} 
export default handler

 

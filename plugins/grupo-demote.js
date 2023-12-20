let handler = async (m, { conn,usedPrefix, text }) => {
if(isNaN(text) && !text.match(/@/g)){
	
}else if(isNaN(text)) {
var number = text.split`@`[1]
}else if(!isNaN(text)) {
var number = text
}
	
if(!text && !m.quoted) return conn.reply(m.chat, `𝙒𝙩𝙛 𝙣𝙤 𝙨𝙤𝙮 𝙖𝙙𝙞𝙫𝙞𝙣𝙤.\n 𝙙𝙚𝙗𝙚 𝙙𝙚 𝙪𝙨𝙖𝙧 𝙙𝙚 𝙚𝙨𝙩𝙖 𝙢𝙖𝙣𝙚𝙧𝙖:\n𝙚𝙟𝙚𝙢𝙥𝙡𝙤\n*${usedPrefix}quitaradmin @tag*\n*${usedPrefix}quitaradmin responder a un mensaje*`, m)
if(number.length > 13 || (number.length < 11 && number.length > 0)) return conn.reply(m.chat, `𝑬𝒔𝒆 𝒏𝒖́𝒎𝒆𝒓𝒐 𝒆𝒔 𝒊𝒏𝒄𝒐𝒓𝒓𝒆𝒄𝒕𝒐, 𝒊𝒏𝒕𝒆𝒏𝒕𝒂 𝒅𝒆𝒍 𝒏𝒖𝒆𝒗𝒐`, m)
  
try {
if(text) {
var user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
var user = m.quoted.sender
} else if(m.mentionedJid) {
var user = number + '@s.whatsapp.net'
} 
} catch (e) {
} finally {
conn.groupParticipantsUpdate(m.chat, [user], 'demote')
//conn.sendHydrated(m.chat, `𝙅𝙖𝙟𝙖 𝙮𝙖 𝙙𝙚𝙟𝙖𝙨𝙩𝙚 𝙙𝙚 𝙨𝙚𝙧 𝙖𝙙𝙢𝙞𝙣𝙨 𝙣𝙤 𝙛𝙪𝙞𝙨𝙩𝙚 𝙗𝙪𝙚𝙣 𝙖𝙙𝙢𝙞𝙣 :𝙫 😧`, wm, null, md, '𝑻𝒉𝒆 𝑳𝒐𝒍𝒊𝑩𝒐𝒕-𝑴𝑫', null, null, [['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ ☘️', '/menu']], m)
}}
handler.help = ['*593xxx*','*@usuario*','*responder chat*'].map(v => 'demote ' + v) 
handler.tags = ['group']
handler.command = /^(demote|quitarpoder|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null
export default handler

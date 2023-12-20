let handler = m => m
export async function all(m) {
let user = global.db.data.users[m.sender]
if (m.chat.endsWith('broadcast')) return
if (user.premiumTime != 0 && user.premium) {
if (new Date() * 1 >= user.premiumTime) {
await m.reply(`${ag}*@${m.sender.split`@`[0]} ¡𝙎𝙚 𝙖𝙘𝙖𝙗𝙤́ 𝙚𝙡 𝙩𝙞𝙚𝙢𝙥𝙤 𝙥𝙧𝙚𝙢𝙞𝙪𝙢!*\n𝙎𝙞 𝙦𝙪𝙞𝙚𝙧𝙚𝙨 𝙤𝙗𝙩𝙚𝙣𝙚𝙧 𝙪𝙣 𝙣𝙪𝙚𝙫𝙤 𝙥𝙖𝙨𝙚 𝙥𝙧𝙚𝙢𝙞𝙪𝙢 𝙪𝙨𝙖 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤\n*#pase premium*`, false, { mentions: [m.sender] })
user.premiumTime = 0
user.premium = false
}}}

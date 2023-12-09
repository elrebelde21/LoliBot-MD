import fetch from 'node-fetch'
let handler = async(m, { conn, text, command, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `𝙀𝙨𝙘𝙧𝙞𝙗𝙖 𝙚𝙡 𝙣𝙤𝙢𝙗𝙧𝙚 𝙙𝙚 𝙪𝙨𝙪𝙖𝙧𝙞𝙤 𝙙𝙚 𝙩𝙞𝙠𝙩𝙤𝙠 𝙨𝙞𝙣 𝙪𝙨𝙖𝙧 "@"\n𝙀𝙟𝙚𝙢𝙥𝙡𝙤\n*${usedPrefix + command} emiliamernes*`, m)
try {
let res = await fetch(`https://api.lolhuman.xyz/api/stalktiktok/${text}?apikey=9b817532fadff8fc7cb86862`)
let res2 = `https://api.lolhuman.xyz/api/pptiktok/${text}?apikey=9b817532fadff8fc7cb86862`
let json = await res.json()
if (res.status !== 200) throw await res.text()
if (!json.status) throw json
let thumb = await (await fetch(json.result.user_picture)).buffer()
let text = `≪ ${wm} ≫

👤 𝙐𝙨𝙪𝙖𝙧𝙞𝙤
${json.result.username}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
✨ 𝙉𝙤𝙢𝙗𝙧𝙚
${json.result.nickname}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
✅ 𝙎𝙚𝙜𝙪𝙞𝙙𝙤𝙧𝙚𝙨
${json.result.followers}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
❇️ 𝙎𝙚𝙜𝙪𝙞𝙙𝙤𝙨
${json.result.followings}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
❤️ 𝙈𝙚 𝙜𝙪𝙨𝙩𝙖 
${json.result.likes}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🎁 𝙋𝙪𝙗𝙡𝙞𝙘𝙖𝙘𝙞𝙤́𝙣𝙚𝙨
${json.result.video}
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
👀 𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙘𝙞𝙤́𝙣
${json.result.bio}
`.trim()
await conn.sendFile(m.chat, res2, 'error.jpg', text, m, false)
} catch (e) {
conn.reply(m.chat, `${lenguajeGB['smsAvisoFG']()}𝙉𝙊 𝙎𝙀 𝙀𝙉𝘾𝙊𝙉𝙏𝙍𝙊 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙎𝙐𝘼𝙍𝙄𝙊.`, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: `${lenguajeGB['smsAvisoAG']()}`,
body: '', previewType: 0, thumbnail: imagen2, sourceUrl: md}}})}}
handler.help = ['tiktokstalk'].map(v => v + ' <username>')
handler.tags = ['stalk']
handler.command = /^(tiktokstalk|ttstalk)$/i
handler.limit = 1
handler.register = true
export default handler

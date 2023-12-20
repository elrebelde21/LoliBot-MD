let handler = async (m, { conn }) => {
conn.reply(m.chat, `
*< 𝑳𝒊𝒔𝒕𝒂 𝒅𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐/𝒕𝒆𝒙𝒕𝒐𝒔 𝒂𝒔𝒊𝒈𝒏𝒂𝒅𝒐𝒔 />*

${Object.entries(global.db.data.sticker).map(([key, value], index) => `*${index + 1}.-*\n*𝑪𝒐́𝒅𝒊𝒈𝒐:* ${value.locked ? `*(𝚋𝚕𝚘𝚚𝚞𝚎𝚊𝚍𝚘)* ${key}` : key}\n*𝑪𝒐𝒎𝒂𝒏𝒅𝒐/𝒕𝒆𝒙𝒕𝒐𝒔* ${value.text}`).join('\n\n')}
`.trim(), null, {mentions: Object.values(global.db.data.sticker).map(x => x.mentionedJid).reduce((a, b) => [...a, ...b], [])})
}
handler.command = ['listcmd', 'cmdlist']
handler.rowner = true
export default handler

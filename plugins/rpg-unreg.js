import { createHash } from 'crypto'
let handler = async function (m, { args }) {
if (!args[0]) throw `𝙄𝙣𝙜𝙧𝙚𝙨𝙚 𝙚𝙡 𝙣𝙪𝙣𝙚𝙧𝙤 𝙙𝙚𝙡 𝙨𝙚𝙧𝙞𝙚, 𝙨𝙞 𝙣𝙤 𝙨𝙖𝙗𝙚 𝙘𝙪𝙖𝙡 𝙚𝙨, 𝙪𝙨𝙚 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤 *#myns*`
let user = global.db.data.users[m.sender]
let sn = createHash('md5').update(m.sender).digest('hex')
if (args[0] !== sn) throw `${fg} 𝑽𝒆𝒓𝒊𝒇𝒊𝒒𝒖𝒆 𝒒𝒖𝒆 𝒔𝒆𝒂 𝒆𝒍 𝒄𝒐𝒓𝒓𝒆𝒄𝒕𝒐, 𝒖𝒔𝒆 𝒆𝒍 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 *#myns* 𝑷𝒂𝒓𝒂 𝒐𝒃𝒕𝒆𝒏𝒆𝒓 𝒔𝒖 𝒏𝒖́𝒎𝒆𝒓𝒐 𝒅𝒆 𝒔𝒆𝒓𝒊𝒆`
global.db.data.users[m.sender].money -= 400
global.db.data.users[m.sender].limit -= 4
global.db.data.users[m.sender].exp -= 150
global.db.data.users[m.sender].joincount -= 2
user.registered = false
m.reply(`${eg} ᴜsᴛᴇᴅ ʏᴀ ɴᴏ ᴇsᴛᴀ ʀᴇɢɪsᴛʀᴀᴅᴏ ᴇʟ ᴍɪ ʙᴀsᴇ ᴅᴇʟ ᴅᴀᴛᴏs 😢`)
}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <numero de serie>')
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true
export default handler

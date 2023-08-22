let handler = async (m, { conn, text }) => {
let id = m.chat
conn.math = conn.math ? conn.math : {}
if (id in conn.math) {
clearTimeout(conn.math[id][3])
delete conn.math[id]
m.reply('*😨 𝑾𝒕𝒇 𝒏𝒐 𝒉𝒂𝒈𝒂 𝒕𝒓𝒂𝒎𝒑𝒂!!*')
}
let val = text
.replace(/[^0-9\-\/+*×÷πEe()piPI/]/g, '')
.replace(/×/g, '*')
.replace(/÷/g, '/')
.replace(/π|pi/gi, 'Math.PI')
.replace(/e/gi, 'Math.E')
.replace(/\/+/g, '/')
.replace(/\++/g, '+')
.replace(/-+/g, '-')
let format = val
.replace(/Math\.PI/g, 'π')
.replace(/Math\.E/g, 'e')
.replace(/\//g, '÷')
.replace(/\*×/g, '×')
try {
console.log(val)
let result = (new Function('return ' + val))()
if (!result) throw result
m.reply(`*${format}* = _${result}_`)
} catch (e) {
if (e == undefined) throw `${mg}𝑰𝒏𝒈𝒓𝒆𝒔𝒆 𝒆𝒍 𝒐𝒑𝒆𝒓𝒂𝒕𝒊𝒗𝒐 𝒎𝒂𝒕𝒆𝒎𝒂́𝒕𝒊𝒄𝒂 𝒑𝒂𝒓𝒂 𝒄𝒂𝒍𝒄𝒖𝒍𝒂𝒓 𝒆𝒍 𝒓𝒆𝒔𝒖𝒍𝒕𝒂𝒅𝒐`
throw `${fg}𝑺𝒐𝒍𝒐 𝒔𝒆 𝒂𝒅𝒎𝒊𝒕𝒆 𝒏𝒖́𝒎𝒆𝒓𝒐𝒔 𝒚 𝒔𝒊́𝒎𝒃𝒐𝒍𝒐𝒔,  -, +, * , /, ×, ÷, π, e, (, )*`
}}
handler.help = ['calc <expression>']
handler.tags = ['tools']
handler.command = /^(calc(ulat(e|or))?|kalk(ulator)?)$/i
handler.limit = 1
handler.register = true
handler.exp = 5
export default handler

import JavaScriptObfuscator from 'javascript-obfuscator'

let handler = async(m, { conn, text }) => {
if (!text) return m.reply("⚠️ *𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐞𝐥 𝐜𝐨𝐝𝐢𝐠𝐨 𝐪𝐮𝐞 𝐯𝐚𝐬 𝐚 𝐨𝐟𝐮𝐬𝐜𝐚𝐫.*") 
function obfuscateCode(code) {
  return JavaScriptObfuscator.obfuscate(code, { compact: false, controlFlowFlattening: true, deadCodeInjection: true, simplify: true, numbersToExpressions: true }).getObfuscatedCode();
}
let obfuscatedCode = await obfuscateCode(text);
conn.sendMessage(m.chat, {text: obfuscatedCode}, {quoted: m});
}
handler.command = /^(ofuscar|ofuscador)$/i
handler.register = true
export default handler

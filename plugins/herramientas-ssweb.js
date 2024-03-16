import fetch from 'node-fetch' 
const handler = async (m, {conn, text, args}) => {   
if (!args[0]) return conn.reply(m.chat, '*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐚 𝐮𝐧𝐚 𝐮𝐫𝐥 𝐝𝐞 𝐩𝐚𝐠𝐢𝐧𝐚 𝐚 𝐥𝐚 𝐪𝐮𝐞 𝐭𝐨𝐦𝐚𝐫𝐚 𝐜𝐚𝐩𝐭𝐮𝐫𝐚 🔎*', m)
try {
const ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer();
conn.sendFile(m.chat, ss, '', '', m)
} catch { 
try {  
const ss2 = `https://api.screenshotmachine.com/?key=c04d3a&url=${args[0]}&screenshotmachine.com&dimension=720x720`;  
conn.sendMessage(m.chat, {image: {url: ss2}}, {quoted: m})
} catch {  
try { 
const ss3 =  `https://api.lolhuman.xyz/api/SSWeb?apikey=${lolkeysapi}&url=${text}`; 
conn.sendMessage(m.chat, {image: {url: ss3}}, {quoted: m}); 
} catch { 
const ss4 = `https://api.lolhuman.xyz/api/SSWeb2?apikey=${lolkeysapi}&url=${text}`;
conn.sendMessage(m.chat, {image: {url: ss4}}, {quoted: m})
}}}}
handler.help = ["ss", "ssf"].map((v) => v + " <url>");   
handler.tags = ["internet"];   
handler.command = /^ss(web)?f?$/i;   
handler.limit = 3
handler.register = true
export default handler

import axios from 'axios'
const {proto, generateWAMessageFromContent, prepareWAMessageMedia, generateWAMessageContent, getDevice} = (await import("@whiskeysockets/baileys")).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('Que video buscas?')

async function createVideoMessage(url) {
const { videoMessage } = await generateWAMessageContent({ video: { url } }, { upload: conn.waUploadToServer })
return videoMessage
}
async function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]]
}
}
try {
let results = []
let { data: response } = await axios.get(`${apis}/search/tiktoksearch?query=` + text)
let searchResults = response.data
shuffleArray(searchResults)
let selectedResults = searchResults.splice(0, 3)
for (let result of selectedResults) {
results.push({
body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: wm }),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: '' + result.title,
hasMediaAttachment: true,
videoMessage: await createVideoMessage(result.nowm)
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })})}
const responseMessage = generateWAMessageFromContent(message.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({ text: 'Resultado de:' + text }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: wm }),
header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...results] })})}}
}, { quoted: message })
await conn.relayMessage(m.chat, responseMessage.message, { messageId: responseMessage.key.id })
} catch (e) {
await m.react(`❌`) 
m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${e} <<<< `)       
console.log(e)
}}

handler.help = ['tiktoksearch']
handler.tags = ['downloader']
handler.command = /^(tiktoksearch|ttsearch)$/i
handler.register = true
handler.limit = 1
export default handler
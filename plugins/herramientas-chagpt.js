import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import {Configuration, OpenAIApi} from 'openai';
const configuration = new Configuration({organization: global.openai_org_id, apiKey: global.openai_key});
const openaiii = new OpenAIApi(configuration);
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (usedPrefix == 'a' || usedPrefix == 'A') return;
if (!text) return m.reply(`*Hola cómo esta 😊, El que te puedo ayudar?*, ingrese una petición o orden para usar la función de chagpt\n*Ejemplo:*\n${usedPrefix + command} Recomienda un top 10 de películas de acción`) 
let syst = `Actuaras como un Bot de WhatsApp el cual fue creado por elrebelde, tu seras LoliBot.`

if (command == 'ia' || command == 'chatgpt') {
try {      
let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/gptweb?text=${text}`) 
let res = await gpt.json()
await m.reply(res.gpt)
} catch {
try {
let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/chatgpt?q=${text}`)
let res = await gpt.json()
await m.reply(res.data)
} catch {
}}}

if (command == 'openai' || command == 'ia2' || command == 'chatgpt2') {
conn.sendPresenceUpdate('composing', m.chat);
let gpt = await fetch(`https://delirius-api-oficial.vercel.app/api/ia2?text=${text}`)
let res = await gpt.json()
await m.reply(res.gpt)
}

if (command == 'gemini') {
let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/gemini?query=${text}`)
let res = await gpt.json()
await m.reply(res.message)
}

if (command == 'copilot' || command == 'bing') {
let gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/bingia?query=${text}`)
let res = await gpt.json()
await m.reply(res.message)
}}
handler.help = ["chagpt", "ia", "openai", "gemini", "copilot"]
handler.tags = ["buscadores"]
handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|ia2|gemini|copilot|bing)$/i;
export default handler;

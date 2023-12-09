/*

⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠

El codigo de este archivo fue realizado por:
- ReyEndymion (https://github.com/ReyEndymion)

⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠ -- ⚠ PROHIBIDO EDITAR ⚠

*/

import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync, promises as fs} from "fs"
import path, { join } from 'path'
let handler  = async (m, { conn }, args) => {
let parentw = conn
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let uniqid = `${who.split`@`[0]}`
if (global.conn.user.jid !== conn.user.jid) return conn.sendMessage(m.chat, {text: '*Use este comando directamente en el numero del Bot principal*'}, { quoted: m }) 
else {
await conn.sendMessage(m.chat, {text: "*👋 Adiós Bot, haz dejado de ser un Bot*"}, { quoted: m }) 
}
try {
fs.rmdir("./jadibts/" + uniqid, { recursive: true, force: true })
await conn.sendMessage(m.chat, {text : "*Todos los archivos de session fueron eliminados*" } , { quoted: m })
} catch(err) {
console.error('La carpeta o archivo de sesion no existen ', err)   
}}
handler.help = ['deletebot']
handler.tags = ['jadibot']
handler.command = /^(deletebot|eliminarsesion|deletesesion)$/i
handler.private = true
handler.fail = null
export default handler

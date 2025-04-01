import { execSync } from 'child_process';

const handler = async (m, { conn, text }) => {
try {
const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
let messager = stdout.toString()
if (messager.includes('Already up to date.')) messager = await tr(`⚠️ Ya esta actualizado a la versión reciente.`)
if (messager.includes('Updating')) messager = `*[ UPDATE ]*\n\n` + stdout.toString()
conn.reply(m.chat, messager, m);
} catch {      
try {    
const status = execSync('git status --porcelain');
if (status.length > 0) {
const conflictedFiles = status
.toString()
.split('\n')
.filter(line => line.trim() !== '')
.map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('BotSession/') || line.includes('npm-debug.log')) {
return null;
}
return '*→ ' + line.slice(3) + '*'})
.filter(Boolean);
if (conflictedFiles.length > 0) {
const errorMessage = `⚠️ ${await tr("Error")}\n> *${await tr("Se han encontrado cambios locales en los archivos del bot que entran en conficto con las nuevas actualizaciones del repositorio. para actualizar, reinstalar el bot o realizar las actualizaciones manualmente.")}*\n\n*\`${await tr("ARCHIVO EN CONFLICTO")} :\`*\n\n${conflictedFiles.join('\n')}.*`
await conn.reply(m.chat, errorMessage, m);  
}}
} catch (error) {
console.error(error);
if (error.message) {
const errorMessage2 = `\n${fg}` + error.message;
}
await m.reply(`${fg}`) 
}}};
handler.help = ['update']
handler.tags = ['owner']
handler.command = /^(update|actualizar|gitpull)$/i;
handler.owner = true;
export default handler;

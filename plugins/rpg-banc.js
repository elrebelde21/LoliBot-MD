const handler = async (m, {conn, command, args}) => {
let who;
if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
else who = m.sender;
let users =  global.db.data.users[m.sender];

if (command == 'dep' || command == 'depositar') {    
if (!args[0]) return m.reply(`[ ⚠️ ] *Ingresa la cantidad para agregar a sus cuenta bancaria*`);
if (args[0] == '--all') {
let count = parseInt(users.limit);
users.limit -= count * 1
users.banco += count * 1
await m.reply(`*[ 🏦 ] Has agregados.*`);
return !0;
};
if (!Number(args[0])) return m.reply(`[ ⚠️ ] *Falto en número de cantidad de diamante 💎*`);
let count = parseInt(args[0]);
if (!users.limit) return m.reply(`*Esta pobre no tener suficiente diamante*`);
if (users.limit < count) return m.reply(`*Che no sabes cuanto dinero tiene el tu cartera? usar el comando:* #bal`);
users.limit -= count * 1;
users.banco += count * 1;
await m.reply(`*[ 🏦 ] Has ingresando ${count} diamante al Banco*`)}
  
if (command == 'retirar' || command == 'toremove') {     
let user =  global.db.data.users[m.sender]
if (!args[0]) return m.reply(`[ ⚠️ ] *ingresa la cantidad a retirar*`);
if (args[0] == '--all') {
let count = parseInt(user.banco);
user.banco -= count * 1
user.limit += count * 1
await m.reply(`*[ 🏦 ] Retiraste (${count}) diamante 💎 del Banco.*`);
return !0 
}
if (!Number(args[0])) return m.reply(`La cantidad debe ser un mumero`); 
let count = parseInt(args[0]);
if (!user.banco) return m.reply(`Hey fantasma 👻, no tener esa cantidad de dinero el banco 🥲`);
if (user.banco < count) return m.reply(`*Che no sabes cuanto dinero tiene el tu cartera? usar el comando:* #bal`);
user.banco -= count * 1
user.limit += count * 1
await m.reply(`*[ 🏦 ] Has Retirado (${count}) dinero del Banco*`)}
}
handler.help = ['dep', 'retirar']
handler.tags = ['econ']
handler.command = /^(dep|depositar|retirar|toremove)$/i
handler.register = true

export default handler 
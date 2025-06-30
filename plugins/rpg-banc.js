const handler = async (m, { conn, command, args }) => {
const res = await m.db.query('SELECT limite, banco FROM usuarios WHERE id = $1', [m.sender])
const user = res.rows[0]
const limite = user.limite ?? 0
const banco = user.banco ?? 0

if (command === 'dep' || command === 'depositar') {
if (!args[0]) return m.reply(`[ ⚠️ ] *Ingresa la cantidad para agregar a tu cuenta bancaria*`)

if (/all/i.test(args[0])) {
if (limite < 1) return m.reply(`*Estás pobre, no tienes diamantes*`)
await m.db.query(`UPDATE usuarios SET limite = 0, banco = banco + $1 WHERE id = $2`, [limite, m.sender])
return m.reply(`*[ 🏦 ] Has agregado ${limite} diamantes al Banco.*`)
}

if (isNaN(args[0])) return m.reply(`[ ⚠️ ] *Falta un número válido de diamantes 💎*`)
const amount = parseInt(args[0])
if (amount < 1) return m.reply(`❌ El mínimo es 1 diamante.`)
if (limite < amount) return m.reply(`*Che, no sabes cuánto tienes en tu cartera? Usa el comando:* #bal`)

await m.db.query(`UPDATE usuarios SET limite = limite - $1, banco = banco + $1 WHERE id = $2`, [amount, m.sender])
return m.reply(`*[ 🏦 ] Has ingresado ${amount} diamantes al Banco*`)
}

if (command === 'retirar' || command === 'toremove') {
if (!args[0]) return m.reply(`[ ⚠️ ] *Ingresa la cantidad a retirar*`)

if (/all/i.test(args[0])) {
if (banco < 1) return m.reply(`Hey fantasma 👻, no tienes nada en el banco 🥲`)
await m.db.query(`UPDATE usuarios SET banco = 0, limite = limite + $1 WHERE id = $2`, [banco, m.sender])
return m.reply(`*[ 🏦 ] Retiraste ${banco} diamantes 💎 del Banco.*`)
}

if (isNaN(args[0])) return m.reply(`La cantidad debe ser un número válido.`)
const amount = parseInt(args[0])
if (amount < 1) return m.reply(`❌ El mínimo es 1 diamante.`)
if (banco < amount) return m.reply(`*Che, no sabes cuánto tienes en tu cuenta? Usa el comando:* #bal`)

await m.db.query(`UPDATE usuarios SET banco = banco - $1, limite = limite + $1 WHERE id = $2`, [amount, m.sender])
return m.reply(`*[ 🏦 ] Has retirado ${amount} diamantes del Banco*`)
}}
handler.help = ['dep', 'depositar', 'retirar', 'toremove']
handler.tags = ['econ']
handler.command = /^(dep|depositar|retirar|toremove)$/i
handler.register = true

export default handler

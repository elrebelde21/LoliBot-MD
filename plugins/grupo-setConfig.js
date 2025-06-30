import { db } from '../lib/postgres.js'

const handler = async (m, { args, command, conn, text }) => {
if (!text) {
const tipo = command === 'setwelcome' ? 'bienvenida' : command === 'setbye' ? 'despedida' : command === 'setpromote' ? 'ascenso' : 'degradación'

const variables = ['@user → Menciona al usuario',
...(command !== 'setpromote' && command !== 'setdemote' ? ['@group → Nombre del grupo'] : []),
...(command === 'setwelcome' ? ['@desc → Descripción del grupo'] : []),
...(command === 'setpromote' || command === 'setdemote' ? ['@author → Quien ejecuta la acción'] : [])
].join('\n• ')

const opciones = (command === 'setwelcome' || command === 'setbye') ? `*Opciones adicionales:*
• --foto → Para enviar el mensaje con imagen
• --nofoto → Para enviar solo texto` : ''

const ejemplo = command === 'setwelcome' ? `Hola @user, bienvenido a @group. Lee las reglas: @desc`
: command === 'setbye' ? `Chao @user, gracias por estar en @group.`
: command === 'setpromote' ? `@user ha sido promovido por @author.`
: `@user ha sido degradado por @author.`

return m.reply(`*⚙️ Personaliza el mensaje de ${tipo} del grupo:*

*Puedes usar las siguientes variables:*
• ${variables}\n${opciones}
*Ejemplo de uso:*
➤ /${command} ${ejemplo} --foto`)
}
    
const hasFoto = text.includes('--foto')
const hasNoFoto = text.includes('--nofoto')
const cleanText = text.replace('--foto', '').replace('--nofoto', '').trim()
await db.query(`INSERT INTO group_settings (group_id) VALUES ($1) ON CONFLICT DO NOTHING`, [m.chat])

if (command === 'setwelcome') {
await db.query(`UPDATE group_settings SET swelcome = $1${hasFoto ? ', photowelcome = true' : ''}${hasNoFoto ? ', photowelcome = false' : ''} WHERE group_id = $2`, [cleanText, m.chat])
return m.reply(`✅ Mensaje de bienvenida guardado${hasFoto ? ' con imagen' : hasNoFoto ? ' sin imagen' : ''}.`)
}

if (command === 'setbye') {
await db.query(`UPDATE group_settings SET sbye = $1${hasFoto ? ', photobye = true' : ''}${hasNoFoto ? ', photobye = false' : ''} WHERE group_id = $2`, [cleanText, m.chat])
return m.reply(`✅ Mensaje de despedida guardado${hasFoto ? ' con imagen' : hasNoFoto ? ' sin imagen' : ''}.`)
}
    
if (command === 'setpromote') {
await db.query(`UPDATE group_settings SET spromote = $1 WHERE group_id = $2`, [cleanText, m.chat])
return m.reply("✅ Mensaje de ascenso guardado.")
}

if (command === 'setdemote') {
await db.query(`UPDATE group_settings SET sdemote = $1 WHERE group_id = $2`, [cleanText, m.chat])
return m.reply("✅ Mensaje de degradación guardado.")
}}
handler.help = ['setwelcome <texto>', 'setbye <texto>']
handler.tags = ['group']
handler.command = ['setwelcome', 'setbye', 'setpromote', 'setdemote']
handler.group = true
handler.admin = true
handler.register = true

export default handler

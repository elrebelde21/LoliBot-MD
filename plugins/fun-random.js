let handler = async (m, { conn, command, usedPrefix, text, groupMetadata }) => {

if (!text) throw `Uso correcto:
${usedPrefix + command} el mas puto`
let em = ['😀','😂','🍑','😍','🤤','🥵','😐','🙂','😎','👻','💩','🥴','🤑','🤓']

    let toM = a => '@' + a.split('@')[0]
    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let am = em.getRandom()
   await conn.sendButton(m.chat, `${toM(a)} *${text}*${am}`, author, null, [['Otro', '.random ' + text]], m,{mentions: [a]})
    
}

handler.command = handler.help = ['random']
handler.tags = ['fun']

handler.group = true

export default handler
 
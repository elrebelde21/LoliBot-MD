export async function all(m, conn) {
    //let res = await conn.groupAcceptInvite(code)
    if (!m.isGroup)
        return
    let chats = global.db.data.chats[m.chat]
    if (!chats.expired)
        return !0
    if (+new Date() > chats.expired) {
    await m.reply(`bueno el bot se van del grupo!!!, si quiere que vuelva, usar el comando _#bottemporal_ para que vuelva al grupo!!`)
       // let caption = `*bueno el bot se van del grupo!!!, si quiere que vuelva, usar el comando _#bottemporal_ para que vuelva al grupo!!*`
        let pp = './media/menus/Menu2.jpg'
    //await this.sendButton(m.chat, caption, wm, null, [['Eliminar caducado', '/delexpired'], ['Cec caducado', '/cekexpired']], null)
//await this.sendButton(m.chat, caption, wm, pp, [['𝑯𝒂𝒔𝒕𝒂 𝒑𝒓𝒐𝒏𝒕𝒐 🤑', '.hastapronto']], null)
//await conn.sendHydrated2(m.chat, caption, wm, pp, 'https://github.com', 'The loliBot-MD', ig, '𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢', null, m,)
        
        await this.groupLeave(m.chat)
        chats.expired = null
    }
}


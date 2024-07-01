import yts from 'yt-search';
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) return m.reply(`*Que esta buscado?* ingrese el nombre del tema Ingresa\n*• Ejemplo*\n*${usedPrefix + command}* bad bunny `) 
    m.react('📀');
    
    let result = await yts(text);
    let ytres = result.videos;
    

    let listSections = [];
    for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
            title: `${index} ┃ ${v.title}`,
            rows: [
                {
                    header: '• • •「 🅐🅤🅓🅘🅞 」• • •',
                    title: "",
                    description: `▢ ⌚ Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Publicado* : ${v.title}\n▢ 📆 *Subidos:* ${v.ago}\n`, 
                    id: `${usedPrefix}fgmp3 ${v.url}`
                },
                {
                    header: "• • •「 🅥🅘🅓🅔🅞 」• • •",
                    title: "" ,
                    description: `▢ ⌚ Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Publicado* : ${v.title}\n▢ 📆 *Subidos:* ${v.ago}\n`, 
                    id: `${usedPrefix}fgmp4 ${v.url}`
                }, 
                   {
                    header: "• • •「 🅓🅞🅒🅤🅜🅔🅝🅣🅞🅢 🅜🅟❸ 」• • •",
                    title: "" ,
                    description: `▢ ⌚ Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Publicado* : ${v.title}\n▢ 📆 *Subidos:* ${v.ago}\n`, 
                    id: `${usedPrefix}ytmp3doc ${v.url}`
                }, 
                    {
                    header: "'• • •「 🅓🅞🅒🅤🅜🅔🅝🅣🅞🅢 🅜🅟❹ 」• • •",
                    title: "" ,
                    description: `▢ ⌚ Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Publicado* : ${v.title}\n▢ 📆 *Subidos:* ${v.ago}\n`, 
                    id: `${usedPrefix}ytmp4doc ${v.url}`
                }   
            ]
        });
    }
    
 await conn.sendList(m.chat, `*Resultados:* ${text}*\n\n> *ᴇʟɪᴊᴀ ᴀ ᴜɴᴀ ᴏᴘᴄɪᴏɴ ʏ ᴘʀᴇsɪᴏɴᴇ ᴇɴᴠɪᴀʀ*`, wm, `🚀 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎 🚀`, ytres[0].image, listSections, m);
};

handler.help = ['playlist']
handler.tags = ['downloader']
handler.command = ['playvid2', 'playlist', 'playlista'] 
handler.register = true 

export default handler

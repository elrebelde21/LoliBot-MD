import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

//owner
global.owner = [
['51906278352'],
['51932884973'],
['51968892918'],
[''],
[''],
[''],
['']
]

//Información 
globalThis.info = {
wm: "𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿",
vs: "2.0.0",
packname: "𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦❤️‍🔥 - LoliBot\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
author: "Owner: @Deyner24\n• Dueña: @itschinita_official",
apis: "https://api.delirius.store",
apikey: "GataDios",
fgmods: { url: 'https://api.fgmods.xyz/api', key: 'elrebelde21' },
neoxr: { url: 'https://api.neoxr.eu/api', key: 'russellxz' },
img2: "https://telegra.ph/file/39fb047cdf23c790e0146.jpg",
img4: fs.readFileSync('./media/Menu2.jpg'),
nn: "https://chat.whatsapp.com/HNDVUxHphPzG3cJHIwCaX5", //Grupo ofc1
nn2: "https://chat.whatsapp.com/KDBt6S54riRCIpSZspkxhg", //Grupo ofc2
nn3: "https://chat.whatsapp.com/GXNXKWSEckU1j1c7sItTxK", //Colab Loli & Gata
nn4: "https://chat.whatsapp.com/Em4Byf4w5VgHObPvZQlfnM", //Enlace LoliBot
nn5: "https://chat.whatsapp.com/J5hQvECqR4W6uTT84uiSBx", //A.T.M.M
nn6: "https://chat.whatsapp.com/ILAHJeZsHh973tQ96i2aqS", //Dev support 
nna: "https://whatsapp.com/channel/0029Vah0NnV6mYPDQI7bpt0z",
nna2: "https://whatsapp.com/channel/0029Vah0NnV6mYPDQI7bpt0z"
}

//----------------------------------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})

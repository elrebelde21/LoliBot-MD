import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

//owner
global.owner = [
['5214774444444'],
['593968585383'],
['13022590512'],
['595975711894'],
['595975711894'],
['5219999699999']
]

//Información 
globalThis.info = {
wm: "𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿",
vs: "2.0.0 (beta)",
packname: "𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦❤️‍🔥 - LoliBot\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
author: "Owner: @elrebelde21\n• Dueña: @its_china_official",
apis: "https://api.delirius.store",
apikey: "GataDios",
fgmods: { url: 'https://api.fgmods.xyz/api', key: 'elrebelde21' },
neoxr: { url: 'https://api.neoxr.eu/api', key: 'GataDios' },
img2: "https://telegra.ph/file/39fb047cdf23c790e0146.jpg",
img4: fs.readFileSync('./media/Menu2.jpg'),
yt: "https://www.youtube.com/@elrebelde.21",
tiktok: "https://www.tiktok.com/@elrebelde.21",
md: "https://github.com/elrebelde21/LoliBot-MD",
fb: "https://www.facebook.com/elrebelde21",
ig: "https://www.instagram.com/its_china_official",
nn: "https://chat.whatsapp.com/HNDVUxHphPzG3cJHIwCaX5", //Grupo ofc1
nn2: "https://chat.whatsapp.com/KDBt6S54riRCIpSZspkxhg", //Grupo ofc2
nn3: "https://chat.whatsapp.com/GXNXKWSEckU1j1c7sItTxK", //Colab Loli & Gata
nn4: "https://chat.whatsapp.com/Em4Byf4w5VgHObPvZQlfnM", //Enlace LoliBot
nn5: "https://chat.whatsapp.com/J5hQvECqR4W6uTT84uiSBx", //A.T.M.M
nn6: "https://chat.whatsapp.com/ILAHJeZsHh973tQ96i2aqS", //Dev support 
nna: "https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A",
nna2: "https://whatsapp.com/channel/0029Vah0NnV6mYPDQI7bpt0z"
}

//----------------------------------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})

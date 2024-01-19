import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs' 
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios' 
import moment from 'moment-timezone'
import { en, es, id, ar, pt } from './lib/idiomas/total-idiomas.js'

//---------[ Añada los numeros a ser Propietario/a ]---------

global.owner = [['573183650526', 'ＰＲＯＰＩＥＴＡＲＩＯ', true], ['573026191480'], ['593968585383'], ['5217294888993'], ['5492266466080'], ['595985451858'], ['595992302861'], ['5492266613038'], ['51907913096']]
global.mods = ['50495745934']
global.prems = ['972529277314'],

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = "" //Ejemplo: +59309090909
global.confirmCode = "" 

//---------[ IDIOMA : LENGUAJE ]---------
//es = Español         id = Bahasa Indonesia
//en = English         pt = Português
//ar = عرب 
global.lenguajeGB = es  

//---------[ APIS GLOBAL ]---------

global.openai_key = 'sk-...OzYy' /* Consigue tu ApiKey en este enlace: https://platform.openai.com/account/api-keys */
global.openai_org_id = 'HITjoN7H8pCwoncEB9e3fSyW' /* Consigue tu ID de organizacion en este enlace: https://platform.openai.com/account/org-settings */
global.Key360 = ['964f-0c75-7afc']//key de violetics
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = 'GataDios'
global.itsrose = ['4b146102c4d500809da9d1ff']
global.baileys = '@whiskeysockets/baileys'

global.APIs = {xteam: 'https://api.xteam.xyz', 
dzx: 'https://api.dhamzxploit.my.id',
lol: 'https://api.lolhuman.xyz',
violetics: 'https://violetics.pw',
neoxr: 'https://api.neoxr.my.id',
zenzapis: 'https://api.zahwazein.xyz',
akuari: 'https://api.akuari.my.id',
akuari2: 'https://apimu.my.id',	
fgmods: 'https://api-fgmods.ddns.net',
botcahx: 'https://api.botcahx.biz.id',
ibeng: 'https://api.ibeng.tech/docs',	
rose: 'https://api.itsrose.site',
popcat : 'https://api.popcat.xyz',
xcoders : 'https://api-xcoders.site' },
global.APIKeys = {'https://api.xteam.xyz': `${keysxteam}`,
'https://api.lolhuman.xyz': `${lolkeysapi}`,
'https://api.neoxr.my.id': `${keysneoxr}`,	
'https://violetics.pw': 'beta',
'https://api.zahwazein.xyz': `${keysxxx}`,
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://api.botcahx.biz.id': 'Admin',
'https://api.ibeng.tech/docs': 'tamvan',
'https://api.itsrose.site': 'Rs-Zeltoria',
'https://api-xcoders.site': 'Frieren' }

global.mods = [] 
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	

//------------------------[ Stickers ]-----------------------------

global.packname = '𝙏𝙤𝙢𝙖 𝙩𝙪 𝙨𝙩𝙞𝙘𝙠𝙚𝙧'
global.author = '𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿'

//------------[ Versión | Nombre | cuentas ]------------

global.wm = '𝙇𝙤𝙡𝙞𝘽𝙤𝙩-𝙈𝘿'
global.vs = '1.5.5'
global.yt = 'https://www.youtube.com/@elrebelde.21'
global.tiktok = 'tiktok.com/@elrebelde21'
global.md = 'https://github.com/elrebelde21/LoliBot-MD'
global.fb = 'https://www.facebook.com/elrebelde21'
global.face = 'https://www.facebook.com/groups/872989990425789/'

global.nna = 'https://whatsapp.com/channel/0029VaKn22pDJ6GwY61Ftn15' //Update
global.nn = 'https://chat.whatsapp.com/C6sxsP2ckrr2vxMKclOeCD' //Grupo 1
global.nnn = 'https://chat.whatsapp.com/H4hxytyGvucIF1k0UAR7es' //Grupo 2
global.nnnt = 'https://chat.whatsapp.com/IlyJBy1fxcw2qAHLSC5YLa' //Grupo del Colaboracion
global.nnnt2 = 'https://chat.whatsapp.com/K7RzcVdxGqhGP5dCpVENSI' // Grupo COL 2
global.nnntt = 'https://chat.whatsapp.com/IB9Vs7mZ03BBkH3reCU8Dw' //Grupo COL 3
global.nnnttt = 'https://chat.whatsapp.com/KlqNmoUcVnsGJxIfATIDrK' //enlace lolibot
global.nnntttt = 'https://chat.whatsapp.com/FRkr7jJHSJA5OjVtE64dDs' //Grupo ayuda sobre el bot
global.bot = 'Wa.me/51997728085'
global.asistencia = 'wa.me/573183650526'
global.redes = [nna, nn, nnn, nnnt, nnnt2, nnntt, nnnttt, yt, md, tiktok]

//-------------------------[ IMAGEN ]------------------------------
global.imagen = fs.readFileSync('./Menu2.jpg')
global.imagen1 = fs.readFileSync('./media/menus/Menu1.jpg')
global.imagen2 = fs.readFileSync('./media/menus/Menu2.jpg')
global.imagen3 = fs.readFileSync('./media/menus/Menu3.jpg')
global.imagen4 = fs.readFileSync('./media/menus/Menu4.jpg')
global.imagen5 = fs.readFileSync('./media/menus/Menu5.jpg')
global.imagen6 = fs.readFileSync('./media/menus/Menu6.jpg')
global.vid1 = fs.readFileSync('./media/menus/Menuvid1.mp4') 
global.img = [imagen, imagen1, imagen2, imagen3, imagen4, imagen5, imagen6]

//------------------------[ Info | Datos ]---------------------------

global.wait = '*⌛ _Cargando..._ ▬▭▭▭▭▭▭*'
global.waitt = '*⌛ _Cargando..._ ▬▬▭▭▭*'
global.waittt = '*⌛ _Cargando..._ ▬▬▬▬▭▭*'
global.waitttt = '*⌛ _Cargando..._ ▬▬▬▬▬▬▭*'
global.waittttt = '*⌛ _Cargando..._ ▬▬▬▬▬▬▬*'
global.rg = '『✅ 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎 ✅』\n\n'
global.resultado = rg
global.ag = '『⚠️ 𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 ⚠️』\n\n'
global.advertencia = ag
global.iig = '『❕ 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊𝙉 』\n\n'
global.informacion = iig
global.fg = '『❌ 𝙀𝙍𝙍𝙊𝙍 ❌』\n\n'
global.fallo = fg
global.mg = '『❗️ 𝙇𝙊 𝙐𝙎𝙊 𝙈𝘼𝙇❗』\n\n'
global.mal = mg
global.eeg = '『📩 𝙍𝙀𝙋𝙊𝙍𝙏𝙀 📩』\n\n'
global.envio = eeg
global.eg = '『💚 𝙀𝙓𝙄𝙏𝙊𝙎 💚』\n\n'
global.exito = eg

//----------------------------[ NIVELES | RPG ]---------------------------------

global.pdoc = ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/msword', 'application/pdf', 'text/rtf']
global.flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=']

global.cmenut = '❖––––––『'
global.cmenub = '┊✦ '
global.cmenuf = '╰━═┅═━––––––๑\n'
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     '
global.dmenut = '*❖─┅──┅〈*'
global.dmenub = '*┊»*'
global.dmenub2 = '*┊*'
global.dmenuf = '*╰┅────────┅✦*'
global.htjava = '⫹⫺'
global.htki = '*⭑•̩̩͙⊱•••• ☪*'
global.htka = '*☪ ••••̩̩͙⊰•⭑*'
global.comienzo = '• • ◕◕════'
global.fin = '════◕◕ • •'
global.botdate = `⫹⫺ Date :  ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}` //Asia/Jakarta
global.bottime = `𝗧 𝗜 𝗠 𝗘 : ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}`//America/Los_Angeles
global.fgif = {
key: {
participant : '0@s.whatsapp.net'},
message: { 
"videoMessage": { 
"title": wm,
"h": `Hmm`,
'seconds': '999999999', 
'gifPlayback': 'true', 
'caption': bottime,
'jpegThumbnail': fs.readFileSync('./media/menus/Menu3.jpg')
}}}

//----------------------------------------------------

global.multiplier = 150 // Cuanto más alto, más difícil subir de nivel
global.rpg = {
emoticon(string) {
string = string.toLowerCase()
let emot = {
level: '🧬 Nivel',
limit: lenguajeGB.eDiamante(),
exp: lenguajeGB.eExp(),
bank: '🏦 Banco',
diamond: lenguajeGB.eDiamantePlus(),
health: '❤️ Salud',
kyubi: lenguajeGB.eMagia(),
joincount: lenguajeGB.eToken(),
emerald: lenguajeGB.eEsmeralda(),
stamina: lenguajeGB.eEnergia(),
role: '💪 Rango',
premium: '🎟️ Premium',
pointxp: '📧 Puntos Exp',
gold: lenguajeGB.eOro(),
trash: lenguajeGB.eBasura(),
crystal: '🔮 Cristal : Crystal',
intelligence: '🧠 Inteligencia ',
string: lenguajeGB.eCuerda(),
keygold: '🔑 Llave de Oro',
keyiron: '🗝️ Llave de Hierro',
emas: lenguajeGB.ePinata(),
fishingrod: '🎣 Caña de Pescar',
gems: '🍀 Gemas',
magicwand: '⚕️ Varita Mágica',
mana: '🪄 Hechizo',
agility: '🤸‍♂️ Agilidad',
darkcrystal: '♠️ Cristal Oscuro : Dark Glass',
iron: lenguajeGB.eHierro(),
rock: lenguajeGB.eRoca(),
potion: lenguajeGB.ePocion(),
superior: '💼 Superior',
robo: '🚔 Robo',
upgrader: '🧰 Aumentar Mejora',
wood: lenguajeGB.eMadera(),
strength: '🦹‍ ♀️ Fuerza',
arc: '🏹 Arco : Arc',
armor: '🥼 Armadura : Armor',
bow: '🏹 Super Arco : Super Bow',
pickaxe: '⛏️ Pico',
sword: lenguajeGB.eEspada(),
common: lenguajeGB.eCComun(),
uncoommon: lenguajeGB.ePComun(),
mythic: lenguajeGB.eCMistica(),
legendary: lenguajeGB.eClegendaria(),
petFood: lenguajeGB.eAMascots(), //?
pet: lenguajeGB.eCMascota(),//?
bibitanggur: lenguajeGB.eSUva(), bibitapel: lenguajeGB.eSManzana(), bibitjeruk: lenguajeGB.eSNaranja(), bibitmangga: lenguajeGB.eSMango(), bibitpisang: lenguajeGB.eSPlatano(),
ayam: '🐓 Pollo',
babi: '🐖 Puerco',
Jabali: '🐗 Jabalí',
bull: '🐃 Toro : Bull',    
buaya: '🐊 Cocodrilo : Alligator',    
cat: lenguajeGB.eGato(),    
centaur: lenguajeGB.eCentauro(),
chicken: '🐓 Pollo : Chicken',
cow: '🐄 Vaca : Cow', 
dog: lenguajeGB.ePerro(),
dragon: lenguajeGB.eDragon(),
elephant: '🐘 Elefante : Elephant',
fox: lenguajeGB.eZorro(),
giraffe: '🦒 Jirafa : Giraffe',
griffin: lenguajeGB.eAve(), //Mascota : Griffin',
horse: lenguajeGB.eCaballo(),
kambing: '🐐 Cabra : Goat',
kerbau: '🐃 Búfalo : Buffalo',
lion: '🦁 León : Lion',
money: lenguajeGB.eGataCoins(),
monyet: '🐒 Mono : Monkey',
panda: '🐼 Panda',
snake: '🐍 Serpiente : Snake',
phonix: '🕊️ Fénix : Phoenix',
rhinoceros: '🦏 Rinoceronte : Rhinoceros',
wolf: lenguajeGB.eLobo(),
tiger: '🐅 Tigre : Tiger',
cumi: '🦑 Calamar : Squid',
udang: '🦐 Camarón : Shrimp',
ikan: '🐟 Pez : Fish',
fideos: '🍝 Fideos : Noodles',
ramuan: '🧪 Ingrediente NOVA : Ingredients',
knife: '🔪 Cuchillo : Knife'
}
let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emot[results[0][0]]
}}

global.rpgg = { //Solo emojis 
emoticon(string) {
string = string.toLowerCase()
let emott = {
level: '🧬', limit: '💎', exp: '⚡', bank: '🏦',
diamond: '💎+', health: '❤️', kyubi: '🌀', joincount: '🪙',
emerald: '💚', stamina: '✨', role: '💪', premium: '🎟️',
pointxp: '📧', gold: '👑',
trash: '🗑', crystal: '🔮', intelligence: '🧠', string: '🕸️', keygold: '🔑',
keyiron: '🗝️', emas: '🪅', fishingrod: '🎣', gems: '🍀', magicwand: '⚕️',
mana: '🪄', agility: '🤸‍♂️', darkcrystal: '♠️', iron: '⛓️', rock: '🪨',
potion: '🥤', superior: '💼', robo: '🚔', upgrader: '🧰', wood: '🪵',
strength: '🦹‍ ♀️', arc: '🏹', armor: '🥼', bow: '🏹', pickaxe: '⛏️', sword: '⚔️',
common: '📦', uncoommon: '🥡', mythic: '🗳️', legendary: '🎁', petFood: '🍖', pet: '🍱',
bibitanggur: '🍇', bibitapel: '🍎', bibitjeruk: '🍊', bibitmangga: '🥭', bibitpisang: '🍌',
ayam: '🐓', babi: '🐖', Jabali: '🐗', bull: '🐃', buaya: '🐊', cat: '🐈',      
centaur: '🐐', chicken: '🐓', cow: '🐄', dog: '🐕', dragon: '🐉', elephant: '🐘',
fox: '🦊', giraffe: '🦒', griffin: '🦅', //Mascota : Griffin',
horse: '🐎', kambing: '🐐', kerbau: '🐃', lion: '🦁', money: '🐱', monyet: '🐒', panda: '🐼',
snake: '🐍', phonix: '🕊️', rhinoceros: '🦏',
wolf: '🐺', tiger: '🐅', cumi: '🦑', udang: '🦐', ikan: '🐟',
fideos: '🍝', ramuan: '🧪', knife: '🔪'
}
let results = Object.keys(emott).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emott[results[0][0]]
}}

global.rpgshop = { //Tienda
emoticon(string) {
string = string.toLowerCase()
let emottt = {
exp: lenguajeGB.eExp(), limit: lenguajeGB.eDiamante(), diamond: lenguajeGB.eDiamantePlus(), joincount: lenguajeGB.eToken(),
emerald: lenguajeGB.eEsmeralda(), berlian: lenguajeGB.eJoya(), kyubi: lenguajeGB.eMagia(), gold: lenguajeGB.eOro(),
money: lenguajeGB.eGataCoins(), tiketcoin: lenguajeGB.eGataTickers(), stamina: lenguajeGB.eEnergia(),
potion: lenguajeGB.ePocion(), aqua: lenguajeGB.eAgua(), trash: lenguajeGB.eBasura(), wood: lenguajeGB.eMadera(),
rock: lenguajeGB.eRoca(), batu: lenguajeGB.ePiedra(), string: lenguajeGB.eCuerda(), iron: lenguajeGB.eHierro(),
coal: lenguajeGB.eCarbon(), botol: lenguajeGB.eBotella(), kaleng: lenguajeGB.eLata(), kardus: lenguajeGB.eCarton(),
eleksirb: lenguajeGB.eEletric(), emasbatang: lenguajeGB.eBarraOro(), emasbiasa: lenguajeGB.eOroComun(), rubah: lenguajeGB.eZorroG(),
sampah: lenguajeGB.eBasuraG(), serigala: lenguajeGB.eLoboG(), kayu: lenguajeGB.eMaderaG(), sword: lenguajeGB.eEspada(),
umpan: lenguajeGB.eCarnada(), healtmonster: lenguajeGB.eBillete(), emas: lenguajeGB.ePinata(), pancingan: lenguajeGB.eGancho(),
pancing: lenguajeGB.eCanaPescar(),
common: lenguajeGB.eCComun(), uncoommon: lenguajeGB.ePComun(), mythic: lenguajeGB.eCMistica(),
pet: lenguajeGB.eCMascota(),//?
gardenboxs: lenguajeGB.eCJardineria(),//?
legendary: lenguajeGB.eClegendaria(),
anggur: lenguajeGB.eUva(), apel: lenguajeGB.eManzana(), jeruk: lenguajeGB.eNaranja(), mangga: lenguajeGB.eMango(), pisang: lenguajeGB.ePlatano(),
bibitanggur: lenguajeGB.eSUva(), bibitapel: lenguajeGB.eSManzana(), bibitjeruk: lenguajeGB.eSNaranja(), bibitmangga: lenguajeGB.eSMango(), bibitpisang: lenguajeGB.eSPlatano(),
centaur: lenguajeGB.eCentauro(), griffin: lenguajeGB.eAve(), kucing: lenguajeGB.eGato(), naga: lenguajeGB.eDragon(),
fox: lenguajeGB.eZorro(), kuda: lenguajeGB.eCaballo(), phonix: lenguajeGB.eFenix(), wolf: lenguajeGB.eLobo(),
anjing: lenguajeGB.ePerro(),
petFood: lenguajeGB.eAMascots(), //?
makanancentaur: lenguajeGB.eCCentauro(), makanangriffin: lenguajeGB.eCAve(),
makanankyubi: lenguajeGB.eCMagica(), makanannaga: lenguajeGB.eCDragon(), makananpet: lenguajeGB.eACaballo(), makananphonix: lenguajeGB.eCFenix()
}
let results = Object.keys(emottt).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emottt[results[0][0]]
}}

global.rpgshopp = { //Tienda
emoticon(string) {
string = string.toLowerCase()
let emotttt = {
exp: '⚡', limit: '💎', diamond: '💎+', joincount: '🪙',
emerald: '💚', berlian: '♦️', kyubi: '🌀', gold: '👑',
money: '🐱', tiketcoin: '🎫', stamina: '✨',
potion: '🥤', aqua: '💧', trash: '🗑', wood: '🪵',
rock: '🪨', batu: '🥌', string: '🕸️', iron: '⛓️',
coal: '⚱️', botol: '🍶', kaleng: '🥫', kardus: '🪧',
eleksirb: '💡', emasbatang: '〽️', emasbiasa: '🧭', rubah: '🦊🌫️',
sampah: '🗑🌫️', serigala: '🐺🌫️', kayu: '🛷', sword: '⚔️',
umpan: '🪱', healtmonster: '💵', emas: '🪅', pancingan: '🪝',
pancing: '🎣',
common: '📦', uncoommon: '🥡', mythic: '🗳️',
pet: '📫',//?
gardenboxs: '💐',//?
legendary: '🎁',
anggur: '🍇', apel: '🍎', jeruk: '🍊', mangga: '🥭', pisang: '🍌',
bibitanggur: '🌾🍇', bibitapel: '🌾🍎', bibitjeruk: '🌾🍊', bibitmangga: '🌾🥭', bibitpisang: '🌾🍌',
centaur: '🐐', griffin: '🦅', kucing: '🐈', naga: '🐉', fox: '🦊', kuda: '🐎', phonix: '🕊️', wolf: '🐺', anjing: '🐶',
petFood: '🍖', //?
makanancentaur: '🐐🥩', makanangriffin: '🦅🥩', makanankyubi: '🌀🥩', makanannaga: '🐉🥩',
makananpet: '🍱🥩', makananphonix: '🕊️🥩'  
}
let results = Object.keys(emotttt).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
if (!results.length) return ''
else return emotttt[results[0][0]]
}}

//----------------------------------------------------

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Se actualizo 'config.js'"))
import(`${file}?update=${Date.now()}`)
})

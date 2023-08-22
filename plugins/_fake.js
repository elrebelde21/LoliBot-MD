import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

let handler = async (m, { conn, args }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
let fsizedoc = '1'.repeat(10)
//let ucapan = ucapan()
let sap = ['Hai', 'Ohayo', 'Kyaa', 'Halo', 'Nyann']
let name = await conn.getName(who)
let sgh = md
let sgc = nnn
let gata = 'https://i.imgur.com/EXTbyyn.jpg'
let pp = await conn.profilePictureUrl(who).catch(_ => gata)
//pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/grupos.jpg' 

/*let ftroli = {
			key: {
				participant: '0@s.whatsapp.net'
			},
			message: {
				orderMessage: {
					itemCount: fsizedoc,
					status: 1,
					surface: 1,
					message: botdate,
					orderTitle: author,
					sellerJid: '0@s.whatsapp.net'
				}
			}
		}si*/ 

/*let fkontak = {
			key: {
				participant: '0@s.whatsapp.net'
			},
			message: {
				contactMessage: {
					displayName: wm,
					vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${author},;;;\nFN:${author},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
					jpegThumbnail: fs.readFileSync('./media/menus/Menu1.jpg'),
					thumbnail: fs.readFileSync('./media/menus/Menu1.jpg'),
					sendEphemeral: true
				}
			}
		}*/

/*let fvn = {
			key: {
				participant: '0@s.whatsapp.net'
			},
			message: {
				audioMessage: {
					mimetype: 'audio/ogg; codecs=opus',
					seconds: fsizedoc,
					ptt: true
				}
			}
		}*/


let ftoko = {
			key: {
				participant: '0@s.whatsapp.net'
			},
			message: {
				productMessage: {
					product: {
						productImage: {
							mimetype: 'image/jpeg',
							jpegThumbnail: fs.readFileSync('./media/menus/Menu1.jpg')
						},
						title: '👋 ' + sap.getRandom() + ' Kak :> ' + name,
						description: botdate,
						currencyCode: 'IDR',
						priceAmount1000: fsizedoc,
						retailerId: 'Ghost',
						productImageCount: 1
					},
					businessOwnerJid: '0@s.whatsapp.net'
				}
			}
		}
await conn.reply(m.chat, `*Prueba*`, ftoko, m)
//await conn.sendButton(m.chat, `*Prueba*`, wm, pp, [[' Menu', '/menu']], ftoko, m)	
}

handler.command = /^(fake)$/i
export default handler

function ucapan() {
  const time = moment.tz('America/Los_Angeles').format('HH')  //America/Los_Angeles  Asia/Jakarta   America/Toronto
  let res = "👋 *BIENVENIDO(A) | WELCOME* 👋"
  if (time >= 4) {
    res = "🌇 *Buenos Días | Good Morning* ⛅"
  }
  if (time >= 11) {
    res = "🏙️ *Buenas Tardes | Good Afternoon* 🌤️"
  }
  if (time >= 15) {
    res = "🌆 *Buenas tardes | Good Afternoon* 🌥️"
  }
  if (time >= 17) {
    res = "🌃 *Buenas noches | Good Evening* 💫"
  }
  return res
} 

const handler = async (m, {conn, isPrems}) => {
const hasil = Math.floor(Math.random() * 5000);
const time = global.db.data.users[m.sender].lastwork + 600000;
if (new Date - global.db.data.users[m.sender].lastwork < 600000) return conn.reply(m.chat, `*ᴇsᴛᴀ ᴄᴀɴsᴀᴅᴏ, ᴅᴇʙᴇs ᴅᴇsᴄᴀɴsᴀʀ ᴄᴏᴍᴏ ᴍɪɴɪᴍᴏ ${msToTime(time - new Date())} ᴘᴀʀᴀ ᴠᴏʟᴠᴇʀ ᴀ ᴛʀᴀʙᴀᴊᴀʀ!*`, m, {contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: wm, body: '', previewType: 0, thumbnail: img.getRandom(), sourceUrl: redes.getRandom()}}})
m.reply(`🛠 ${pickRandom(global.work)} ${hasil} XP`) 
global.db.data.users[m.sender].exp += hasil;
global.db.data.users[m.sender].lastwork = new Date() * 1;
};
handler.help = ['work', 'trabaja', 'w']
handler.tags = ['econ']
handler.command = /^(work|trabajar|chambear|w|chamba)$/i
handler.register = true
export default handler

function msToTime(duration) {
const milliseconds = parseInt((duration % 1000) / 100);
let seconds = Math.floor((duration / 1000) % 60);
let minutes = Math.floor((duration / (1000 * 60)) % 60);
let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
hours = (hours < 10) ? '0' + hours : hours;
minutes = (minutes < 10) ? '0' + minutes : minutes;
seconds = (seconds < 10) ? '0' + seconds : seconds;
return minutes + ' minutos ' + seconds + ' segundos ';
}

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())];
}

global.work = ['Eres un maestro alquimista, destilando misteriosas pociones en busca de secretos perdidos. obtiene: ', 'Violarte al que dijo que los bots se crean con termux obtienes:', 
  'Te conviertes en un intrépido cazador de tesoros, explorando lugares olvidados en busca de riquezas escondidas. obtiene:', "cuidarte el grupos del lolibot ganar", "Ayudas a moderar el grupo de GataBot por", "Ayudas a moderar el grupo de LoliBot por", "Ayudas a moderar el grupo de The-Shadow-Brokers-Bot por", "Trabaja para una empresa militar privada, ganando", "Organiza un evento de cata de vinos y obtiene",
  'Diriges un negocio de transmutación de metales, convirtiendo lo común en valiosos tesoros. obtiene:',
  'Exploras antiguas ruinas y encuentras una reliquia valiosa que te otorga conocimientos ancestrales. obtiene:',
  'Trabajas como mercenario en una guerra épica, enfrentándote a desafíos con tu habilidad y coraje. obtiene:',
  'Eres un investigador de lo paranormal, descubriendo los secretos ocultos del mundo espiritual. obtiene:',
  'Entrenas dragones para carreras, formando vínculos con estas majestuosas criaturas aladas. obtiene:',
  'Te conviertes en el mejor herrero de la ciudad, forjando armas legendarias y artefactos poderosos. obtiene:',
  'Descubres un bosque encantado lleno de criaturas mágicas, estableciendo una conexión única con la naturaleza. obtiene:',
  'Eres un domador de bestias feroces, controlando a las criaturas más salvajes con tu dominio animal. obtiene:',
  'Viajas en el tiempo y resuelves problemas históricos, influyendo en el destino de civilizaciones pasadas. obtiene:',
  'Eres un asesor real, aportando sabiduría y consejo a gobernantes y líderes. obtiene:',
  'Desarrollas tecnología futurista, impulsando la innovación y cambiando el rumbo del mundo. obtiene:',
  'Eres un maestro en el arte de la persuasión, convenciendo a otros con tu elocuencia y astucia.',
  'Piloteas un mecha gigante en batallas épicas, defendiendo la tierra con tu destreza en la máquina de guerra. obtiene:',
  'Diriges una granja de dragones, cuidando de estas majestuosas criaturas y criando dragones únicos. obtiene:',
  'Eres un espía internacional, infiltrándote en organizaciones secretas y desenmascarando complots oscuros. obtiene:',
  'Exploras el espacio y haces descubrimientos asombrosos que te otorgan una visión única del universo. obtiene:',
  'Eres un mago de renombre, realizando trucos impresionantes y conjurando hechizos mágicos. obtiene:',
  'Eres un científico loco, creando inventos extravagantes y experimentos inusuales. obtiene:',
  'Defiendes el reino contra un ejército invasor, liderando ejércitos y demostrando tu valentía en la batalla. obtiene:',
  'Eres un navegante audaz, explorando mares desconocidos y descubriendo islas llenas de tesoros. obtiene:',
  'Eres un maestro en el arte del sigilo, moviéndote en las sombras y realizando misiones secretas. obtiene:',
  'Eres un chef renombrado, creando platillos deliciosos que deleitan a los paladares de todo el mundo. obtiene:',
  'Investigas crímenes complejos como un detective hábil, resolviendo misterios intrigantes. obtiene:',
  'Eres un diplomático hábil, negociando tratados y alianzas para mantener la paz entre naciones. obtiene:',
  'Eres un chamán poderoso, canalizando energías espirituales para curar y proteger. obtiene:',
  'Desarrollas aplicaciones mágicas para dispositivos encantados, mejorando la vida de las personas con tus invenciones. obtiene:',
  'Eres un campeón en torneos de lucha, demostrando tu destreza en el combate mano a mano. obtiene:',
  'Eres un arquitecto visionario, diseñando ciudades futuristas y estructuras impresionantes. obtiene:',
  'Eres un psíquico con habilidades sobrenaturales, explorando las mentes y prediciendo el futuro. obtiene:',
  'Eres un famoso director de cine, creando historias épicas que cautivan a las audiencias. obtiene:',
  'Eres un astrónomo y descubres un nuevo planeta, ampliando nuestro conocimiento del cosmos. obtiene:',
  'Eres un experto en supervivencia, enfrentando los peligros del mundo con ingenio y valentía. obtiene:',
  'Eres un músico talentoso que toca en conciertos masivos, llenando el aire con melodías cautivadoras.',
  'Eres un explorador submarino, sumergiéndote en las profundidades para descubrir tesoros olvidados. obtiene:',
  'Eres un diseñador de moda reconocido, creando tendencias y vistiendo a las personas con tu estilo único.',
  'Eres un líder revolucionario, luchando por un mundo mejor y guiando a las masas hacia la libertad. obtiene:',
  'Eres un médico que descubre una cura para una enfermedad mortal, salvando innumerables vidas. obtiene:',
  'Eres un hacker informático, navegando por el ciberespacio y desvelando secretos digitales. obtiene:',
  'Eres un jardinero botánico que encuentra una planta rara, desentrañando sus propiedades únicas. obtiene:',
  'Eres un cazador de mitos, explorando leyendas y descubriendo la verdad detrás de los cuentos. obtiene:',
  'Eres un arqueólogo que desentierra una ciudad antigua, revelando los secretos de civilizaciones pasadas. obtiene:',
  'Eres un líder espiritual respetado, guiando a otros hacia la iluminación y la paz interior. obtiene:',
  'Eres un jugador profesional, compitiendo en torneos de élite y demostrando tu habilidad en los juegos. obtiene:',
];

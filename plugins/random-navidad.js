import axios from 'axios';
const handler = async (m, {conn, args, usedPrefix, command, }) => {
const res = (await axios.get(`https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/master/src/JSON/navidad.json`)).data;
const navidad = await res[Math.floor(res.length * Math.random())];
conn.sendFile(m.chat, navidad, 'error.jpg', command, m, false, { contextInfo: {externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, title: 'Navidad 🧑‍🎄', body: '𝐒𝐮𝐩𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩', previewType: 0, thumbnail: imagen4, sourceUrl: [nna, md, yt, tiktok, fb].getRandom()}}})
};
handler.help = ['navidad'];
handler.tags = ['internet'];
handler.command = /^(navidad)$/i;
handler.register = true
export default handler;

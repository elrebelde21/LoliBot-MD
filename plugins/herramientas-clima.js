import axios from 'axios';
const handler = async (m, {args}) => {
if (!args[0]) throw '*⚠️ 𝐄𝐬𝐜𝐫𝐢𝐛𝐚 𝐞𝐥 𝐧𝐨𝐦𝐛𝐫𝐞 𝐝𝐞 𝐬𝐮 𝐩𝐚𝐢𝐬 𝐨 𝐜𝐢𝐮𝐝𝐚𝐝*';
try {
const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
const res = await response;
const name = res.data.name;
const Country = res.data.sys.country;
const Weather = res.data.weather[0].description;
const Temperature = res.data.main.temp + '°C';
const Minimum_Temperature = res.data.main.temp_min + '°C';
const Maximum_Temperature = res.data.main.temp_max + '°C';
const Humidity = res.data.main.humidity + '%';
const Wind = res.data.wind.speed + 'km/h';
const wea = `「 📍 」ʟᴜɢᴀʀ: ${name}\n「 🗺️ 」ᴘᴀɪs: ${Country}\n「 🌤️ 」ᴛɪᴇᴍᴘᴏ: ${Weather}\n「 🌡️ 」ᴛᴇᴍᴘᴇʀᴀᴛᴜʀᴀ: ${Temperature}\n「 💠 」 ᴛᴇᴍᴘᴇʀᴀᴛᴜʀᴀ ᴍɪɴɪᴍᴀ: ${Minimum_Temperature}\n「 📛 」 ᴛᴇᴍᴘᴇʀᴀᴛᴜʀᴀ ᴍᴀxɪᴍᴀ: ${Maximum_Temperature}\n「 💦 」ʜᴜᴍᴇᴅᴀᴅ: ${Humidity}\n「 🌬️ 」 ᴠɪᴇɴᴛᴏ: ${Wind}`;
m.reply(wea);
} catch {
return '*⚠️ ɴᴏ sᴇ ʜᴀɴ ᴇɴᴄᴏɴᴛʀᴀᴅᴏ ʀᴇsᴜ𝙽𝙾 𝚂𝙴 𝙷𝙰𝙽 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙰𝙳𝙾 𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂, 𝙲𝙾𝚁𝚁𝙾𝙱𝙾𝚁𝙴 𝚀𝚄𝙴 𝙷𝙰𝚈𝙰 𝙴𝚂𝙲𝚁𝙸𝚃𝙾 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰𝙼𝙴𝙽𝚃𝙴 𝚂𝚄 𝙿𝙰𝙸𝚂 𝙾 𝙲𝙸𝚄𝙳𝙰𝙳*';
}};
handler.help = ['clima *<ciudad/país>*'];
handler.tags = ['tools'];
handler.command = /^(clima|tiempo)$/i;
handler.register = true
export default handler;

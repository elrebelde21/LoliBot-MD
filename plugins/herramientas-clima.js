import axios from 'axios';
const handler = async (m, {args}) => {
if (!args[0]) throw await tr('*⚠️ Escriba el nombre de su pais o ciudad*')
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
const wea = await tr(`「 📍 」Lugar: ${name}\n「 🗺️ 」pais: ${Country}\n「 🌤️ 」tiempo: ${Weather}\n「 🌡️ 」temperatura: ${Temperature}\n「 💠 」 temperatura minima: ${Minimum_Temperature}\n「 📛 」 temperatura maxima: ${Maximum_Temperature}\n「 💦 」humedad: ${Humidity}\n「 🌬️ 」 viento: ${Wind}`);
m.reply(wea);
} catch {
m.reply(`\`\`\`⚠️ ${await tr("OCURRIO UN ERROR")} ⚠️\`\`\`\n\n> *${await tr("Reporta el siguiente error a mi creador con el comando:")}* #report\n\n>>> ${e} <<<< `)    
}};
handler.help = ['clima *<ciudad/país>*'];
handler.tags = ['tools'];
handler.command = /^(clima|tiempo)$/i;
handler.register = true
export default handler;

import fg from 'api-dylux'
let handler = async (m, { conn, text, args }) => {
if (!text) throw `✳️ ${await tr("Ingrese el Username de un usuario de TikTok")}`
m.react("⌛");
try {
const apiUrl = `${apis}/tools/tiktokstalk?q=${encodeURIComponent(args[0])}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius || !delius.result || !delius.result.users) return m.react("❌");
const profile = delius.result.users;
const stats = delius.result.stats;
const txt = `👤 *${await tr("Perfil de TikTok")}*:
*• ${await tr("Nombre de usuario")}*: ${profile.username}
*• ${await tr("Nickname")}*: ${profile.nickname}
*• ${await tr("Verificado")}*: ${profile.verified ? 'Sí' : 'No'}
*• ${await tr("Seguidores")}*: ${stats.followerCount.toLocaleString()}
*• ${await tr("Seguidos")}*: ${stats.followingCount.toLocaleString()}
*• ${await tr("Likes Totales")}*: ${stats.heartCount.toLocaleString()}
*• ${await tr("Videos")}*: ${stats.videoCount.toLocaleString()}
*• ${await tr("Firma")}*: ${profile.signature}
*• URL*: 
${profile.url}`;

await conn.sendFile(m.chat, profile.avatarLarger, 'tt.png', txt, m, null, fake);
m.react("✅");
} catch (e2) {
try {
  let res = await fg.ttStalk(args[0])
  let txt = `👤 *${await tr("Perfil de TikTok")}*:
*• ${await tr("Nombre")}:* ${res.name}
*• ${await tr("Username")}:* ${res.username}
*• ${await tr("Seguidores")}:* ${res.followers}
*• ${await tr("Seguidos")}:* ${res.following}
*• ${await tr("Descripción")}:* ${res.desc}
*• ${await tr("Enlace")}:* https://tiktok.com/${res.username}`
await conn.sendFile(m.chat, res.profile, 'tt.png', txt, m, null, fake)
m.react("✅");
} catch (e) {
await m.react(`❌`) 
m.reply(`\`\`\`⚠️ ${await tr("OCURRIO UN ERROR")} ⚠️\`\`\`\n\n> *${await tr("Reporta el siguiente error a mi creador con el comando:")}* #report\n\n>>> ${e} <<<< `)     
console.log(e)
}}}
handler.help = ['tiktokstalk']
handler.tags = ['downloader']
handler.command = /^t(tstalk|iktokstalk|iktoksearch|tsearch)$/i
handler.register = true
handler.limit = 1
export default handler

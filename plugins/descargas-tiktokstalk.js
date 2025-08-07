import fg from 'api-dylux'
let handler = async (m, { conn, text, args }) => {
if (!text) return m.reply(`✳️ Ingrese el Username de un usuario de TikTok`)
m.react("⌛");
try {
const apiUrl = `${info.apis}/tools/tiktokstalk?q=${encodeURIComponent(args[0])}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius || !delius.result || !delius.result.users) return m.react("❌");
const profile = delius.result.users;
const stats = delius.result.stats;
const txt = `👤 *Perfil de TikTok*:
*• Nombre de usuario*: ${profile.username}
*• Nickname*: ${profile.nickname}
*• Verificado*: ${profile.verified ? 'Sí' : 'No'}
*• Seguidores*: ${stats.followerCount.toLocaleString()}
*• Seguidos*: ${stats.followingCount.toLocaleString()}
*• Likes Totales*: ${stats.heartCount.toLocaleString()}
*• Videos*: ${stats.videoCount.toLocaleString()}
*• Firma*: ${profile.signature}
*• URL*: 
${profile.url}`;

await conn.sendFile(m.chat, profile.avatarLarger, 'tt.png', txt, m);
m.react("✅");
} catch (e2) {
try {
  let res = await fg.ttStalk(args[0])
  let txt = `👤 *Perfil de TikTok*:
*• Nombre:* ${res.name}
*• Username:* ${res.username}
*• Seguidores:* ${res.followers}
*• Siguiendo:* ${res.following}
*• Desc:* ${res.desc}
*• Link* : https://tiktok.com/${res.username}`
await conn.sendFile(m.chat, res.profile, 'tt.png', txt, m)
m.react("✅");
} catch (e) {
await m.react(`❌`) 
m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${e} <<<< `)       
console.log(e)
}}}
handler.help = ['tiktokstalk']
handler.tags = ['downloader']
handler.command = /^t(tstalk|iktokstalk)$/i
handler.register = true
handler.limit = 1
export default handler

import fg from 'api-dylux'
let handler= async (m, { conn, args, text, usedPrefix, command }) => {
if (!args[0]) throw `⚠️ Ingrese el Username de Instagram\n\n*• Ejemplo:* ${usedPrefix + command} GataDios` 
m.react("⌛");
try {
const apiUrl = `https://deliriussapi-oficial.vercel.app/tools/igstalk?username=${encodeURIComponent(args[0])}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius || !delius.data) return m.react("❌");
const profile = delius.data;
const txt = `👤 *Perfil de Instagram*:
🔹 *Nombre de usuario*: ${profile.username}
🔹 *Nombre completo*: ${profile.full_name}
🔹 *Biografía*: ${profile.biography}
🔹 *Verificado*: ${profile.verified ? 'Sí' : 'No'}
🔹 *Cuenta privada*: ${profile.private ? 'Sí' : 'No'}
🔹 *Seguidores*: ${profile.followers}
🔹 *Seguidos*: ${profile.following}
🔹 *Publicaciones*: ${profile.posts}
🔹 *URL*: ${profile.url}`;

await conn.sendFile(m.chat, profile.profile_picture, 'insta_profile.jpg', txt, m, null, fake);
 m.react("✅");
} catch (e2) {
try {     
let res = await fg.igStalk(args[0])
let te = `👤 *Perfil de Instagram*:
*• Nombre:* ${res.name} 
*• Username:* ${res.username}
*• Seguidores:* ${res.followersH}
*• Siguiendo:* ${res.followingH}
*• Bio:* ${res.description}
*• Posts:* ${res.postsH}
*• Link* : https://instagram.com/${res.username.replace(/^@/, '')}`
await conn.sendFile(m.chat, res.profilePic, 'igstalk.png', te, m, null, fake)
m.react("⌛");     
} catch (e) {
await m.react(`❌`) 
m.reply(`\`\`\`⚠️ OCURRIO UN ERROR ⚠️\`\`\`\n\n> *Reporta el siguiente error a mi creador con el comando:*#report\n\n>>> ${e} <<<< `)       
console.log(e)
}}}
handler.help = ['igstalk']
handler.tags = ['downloader']
handler.command = ['igstalk', 'igsearch', 'instagramsearch'] 
handler.register = true
handler.limit = 1
export default handler

import fg from 'api-dylux'
let handler= async (m, { conn, args, text, usedPrefix, command }) => {
if (!args[0]) throw `⚠️ ${await tr("Ingrese el Username de Instagram")}\n\n*• ${await tr("Ejemplo")}:* ${usedPrefix + command} GataDios` 
m.react("⌛");
try {
const apiUrl = `${apis}/tools/igstalk?username=${encodeURIComponent(args[0])}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius || !delius.data) return m.react("❌");
const profile = delius.data;
const txt = `👤 *${await tr("Perfil de Instagram")}*:
🔹 *${await tr("Nombre de usuario")}*: ${profile.username}
🔹 *${await tr("Nombre completo")}*: ${profile.full_name}
🔹 *${await tr("Biografía")}*: ${profile.biography}
🔹 *${await tr("Verificado")}*: ${profile.verified ? 'Sí' : 'No'}
🔹 *${await tr("Cuenta privada")}*: ${profile.private ? 'Sí' : 'No'}
🔹 *${await tr("Seguidores")}*: ${profile.followers}
🔹 *${await tr("Seguidos")}*: ${profile.following}
🔹 *${await tr("Publicaciones")}*: ${profile.posts}
🔹 *URL*: ${profile.url}`;

await conn.sendFile(m.chat, profile.profile_picture, 'insta_profile.jpg', txt, m, null, fake);
 m.react("✅");
} catch (e2) {
try {     
let res = await fg.igStalk(args[0])
let te = `👤 *${await tr("Perfil de Instagram")}*:
*• ${await tr("Nombre")}:* ${res.name} 
*• ${await tr("Nombre completo")}:* ${res.username}
*• ${await tr("Seguidores")}:* ${res.followersH}
*• ${await tr("Seguidos")}:* ${res.followingH}
*• ${await tr("Biografía")}:* ${res.description}
*• Posts:* ${res.postsH}
*• Link* : https://instagram.com/${res.username.replace(/^@/, '')}`
await conn.sendFile(m.chat, res.profilePic, 'igstalk.png', te, m, null, fake)
m.react("⌛");     
} catch (e) {
await m.react(`❌`) 
m.reply(`\`\`\`⚠️ ${await tr("OCURRIO UN ERROR")} ⚠️\`\`\`\n\n> *${await tr("Reporta el siguiente error a mi creador con el comando:")}* #report\n\n>>> ${e} <<<< `)        
console.log(e)
}}}
handler.help = ['igstalk']
handler.tags = ['downloader']
handler.command = ['igstalk', 'igsearch', 'instagramsearch'] 
handler.register = true
handler.limit = 1
export default handler

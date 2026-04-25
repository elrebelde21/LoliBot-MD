import { db } from "../lib/postgres.js";

const handler = async (m, { conn, command, isOwner }) => {
let txt = "";

if (command === "listablock") {
try {
const blocklist = await conn.fetchBlocklist() || [];
txt += `📛 *LISTA DE BLOQUEADOS*\n\n*Total:* ${blocklist.length}\n\n╭━━━[ *${info.vs} 𓃠* ]━━━⬣\n`;
if (blocklist.length) {
for (let jid of blocklist) {
txt += `┃🚫 @${jid.split("@")[0]}\n`;
}} else {
txt += "┃✅ No hay usuarios bloqueados actualmente.\n";
}
txt += `╰━━━━━━━⬣\n\n*Por favor no llame para evitar ser Bloqueado, Gracias.*`
} catch (e) {
txt += "❌ Error al obtener la lista de bloqueados.\n";
}
return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
}

if (command === "chatsbaneados") {
try {
const res = await db.query("SELECT group_id FROM group_settings WHERE banned = true");
txt += `╭•·––| 💬 𝘾𝙃𝘼𝙏𝙎 𝘽𝘼𝙉𝙀𝘼𝘿𝙊𝙎* |––·•
│ *Total:* ${res.rowCount}\n│\n`;
if (res.rows.length) {
for (const chat of res.rows) {
txt += `│🚫 ${chat.group_id}\n`;
}
} else {
txt += "│✅ No hay chats baneados actualmente.\n";
}
txt += "╰•·–––––––––––––––––––·•\n";
} catch (e) {
txt += "❌ Error al obtener la lista de chats baneados.\n";
}
return conn.reply(m.chat, txt, m);
}

if (command === "listaban") {
try {
const res = await db.query("SELECT id, razon_ban, avisos_ban FROM usuarios WHERE banned = true");
txt += `╭•·––| 👥 𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒 𝐁𝐀𝐍𝐄𝐀𝐃𝐎𝐒 |––·•\n│ *Total:* ${res.rowCount}\n│\n`;
if (res.rows.length) {
for (const user of res.rows) {
let razon = user.razon_ban ? `\n│📌 *Razón:* ${user.razon_ban}` : "";
let adv = user.avisos_ban ? ` | *Avisos:* ${user.avisos_ban}/3` : "";
txt += `├🚫 @${user.id.split("@")[0]}${razon}\n`;
}} else {
txt += "│✅ No hay usuarios baneados actualmente.\n";
}
txt += "╰•·–––––––––––––––––––·•\n";
} catch (e) {
txt += "❌ Error al obtener la lista de baneados.\n";
}
return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
}

if (command === "listaparejas") {
  try {
    const res = await db.query(
      "SELECT id, marry FROM usuarios WHERE marry IS NOT NULL"
    )

    const parejas = []
    const vistos = new Set()

    for (const user of res.rows || []) {
      if (!user.marry || user.marry === "null") continue

      const id1 = String(user.id || "").replace(/:\d+/, "")
      const id2 = String(user.marry || "").replace(/:\d+/, "")

      if (!id1 || !id2) continue

      const key = [id1, id2].sort().join("|")
      if (vistos.has(key)) continue

      vistos.add(key)
      parejas.push([id1, id2])
    }

    txt += `╭•·––| 💞 *LISTA DE PAREJAS* |––·•\n│\n`
    txt += `*│Total:* ${parejas.length}\n│\n`

    if (parejas.length) {
      let i = 1

      for (const [id1, id2] of parejas) {
        txt += `│ *${i}.* @${id1.split("@")[0]} 💞 @${id2.split("@")[0]}\n`
        i++
      }
    } else {
      txt += "│✅ No hay parejas registradas actualmente.\n"
    }

    txt += "╰•·–––––––––––––––––––·•\n"
  } catch (e) {
    console.error(e)
    txt += "❌ Error al obtener la lista de parejas.\n"
  }

  return conn.reply(m.chat, txt, m, {
    mentions: await conn.parseMention(txt)
  })
}

if (command === "listaadv") {
try {
const res = await db.query("SELECT id, warn FROM usuarios WHERE warn > 0");
txt += `╭•·––| ⚠️ *USUARIOS ADVERTIDOS / WARNED* |––·•\n│\n*│Total:* ${res.rowCount}\n│\n`;
if (res.rows.length) {
let i = 1;
for (const user of res.rows) {
txt += `│ *${i}.* @${user.id.split("@")[0]} *(Warn: ${user.warn}/4)*\n`;
i++;
}} else {
txt += "│✅ No hay usuarios advertidos actualmente.\n";
}
txt += "╰•·–––––––––––––––––––·•\n";
} catch (e) {
txt += "❌ Error al obtener la lista de advertidos.\n";
}
return conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
}};
handler.help = ["listablock", "listaban", "listaadv", "chatsbaneados", "listaparejas"];
handler.tags = ["owner"];
handler.command = /^listablock|listaban|listaadv|chatsbaneados|listaparejas$/i;
//handler.owner = true;

export default handler;

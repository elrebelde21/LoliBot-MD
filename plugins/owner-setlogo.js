import { db } from "../lib/postgres.js";

const handler = async (m, { args, conn }) => {
const id = conn.user?.id;
if (!id) return;
const url = args[0];
if (!url || !url.startsWith("http")) return m.reply("❌ Proporcione una URL válida de imagen.\n\nEjemplo:\n/setlogo https://i.imgur.com/logo.jpg");
await db.query(`UPDATE subbots SET logo_url = $1 WHERE id = $2`, [url, id.replace(/:\d+/, '')]);
m.reply("✅ Foto/logo del bot actualizada correctamente.");
};
handler.help = ["setlogo <url>"];
handler.tags = ["jadibot"];
handler.command = /^setlogo$/i;
handler.register = true
handler.owner = true;

export default handler;

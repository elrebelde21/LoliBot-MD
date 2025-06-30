import fs from "fs";
import path from "path";

const handler = async (m, { conn }) => {
const rawId = conn.user?.id || "";
const cleanId = rawId.replace(/:\d+/, ""); // elimina :16, :17
const sessionPath = path.join("jadibot", cleanId);
const isSubBot = fs.existsSync(sessionPath);
if (!isSubBot) return m.reply("⚠️ Este comando solo puede ser usado desde una instancia de *SubBot*.")
try {
await m.reply("Adios te voy a extrañar :(");
await conn.logout();

setTimeout(() => {
if (fs.existsSync(sessionPath)) {
fs.rmSync(sessionPath, { recursive: true, force: true });
console.log(`[SubBot ${cleanId}] Sesión cerrada y eliminada.`);
}}, 2000);

setTimeout(() => {
m.reply("✅ *Sesión del SubBot finalizada correctamente.*\nPuedes volver a conectarte usando `/jadibot` o `/serbot`.");
}, 3000);
} catch (err) {
console.error(`❌ Error al cerrar el subbot ${cleanId}:`, err);
await m.reply("❌ Ocurrió un error al cerrar la sesión del SubBot.");
}};
handler.help = ['stop'];
handler.tags = ['jadibot'];
handler.command = /^(stop)$/i;
handler.owner = true;
handler.private = true;
handler.register = true

export default handler;

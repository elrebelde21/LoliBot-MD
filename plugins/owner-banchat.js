import { db } from "../lib/postgres.js";

const handler = async (m, { conn }) => {
await db.query(`INSERT INTO group_settings (group_id, banned)
      VALUES ($1, true)
      ON CONFLICT (group_id) DO UPDATE SET banned = true`, [m.chat]);
m.reply("✅ Este grupo ha sido *baneado*. El bot ya no responderá aquí.");
};
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat|ban2|banchat1$/i
//handler.botAdmin = true
handler.owner = true
export default handler
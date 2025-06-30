import { db } from "../lib/postgres.js";

const handler = async (m, { conn }) => {
    await db.query(`
      INSERT INTO group_settings (group_id, banned)
      VALUES ($1, false)
      ON CONFLICT (group_id) DO UPDATE SET banned = false
    `, [m.chat]);

 m.reply("? Este grupo ha sido *desbaneado*. El bot volver? a responder aqu?.");
}

handler.help = ['unbanchat'];
handler.tags = ['owner']
handler.command = /^unbanchat$/i
//handler.botAdmin = true
handler.owner = true

export default handler
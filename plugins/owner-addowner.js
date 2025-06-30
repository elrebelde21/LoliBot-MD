import { db, getSubbotConfig } from '../lib/postgres.js';

const handler = async (m, { conn, args, command, usedPrefix }) => {
const id = conn.user?.id;
if (!id) return 
const botId = id.replace(/:\d+/, '');
let jidToSave = m.mentionedJid?.[0];
if (!jidToSave && args[0]) {
const input = args[0].replace(/^\+/, '').replace(/[^0-9]/g, '');
if (input.length >= 7) jidToSave = `${input}@s.whatsapp.net`;
}
if (!jidToSave) return m.reply(`❌ Debes etiquetar a alguien o escribir un número válido.\nEjemplo: ${usedPrefix + command} +522257888 o ${usedPrefix + command} @${m.sender}`);

const display = jidToSave.replace(/@.+/, '');
const config = await getSubbotConfig(botId);
if (!Array.isArray(config.owners)) config.owners = [];
try {
if (command === "addowner") {
if (config.owners.includes(jidToSave)) return m.reply(`⚠️ @${display} ya es owner.`, { mentions: [jidToSave] });
config.owners.push(jidToSave);
const res = await db.query(`INSERT INTO subbots (id, owners)
        VALUES ($1, $2)
        ON CONFLICT (id) DO UPDATE SET owners = $2 RETURNING owners`, [botId, config.owners]);
console.log(`✅ Owner agregado: ${jidToSave} para ID ${botId}`);
return m.reply(`✅ Agregado como owner: @${display}`, { mentions: [jidToSave] });
}

if (command === "delowner") {
if (!config.owners.includes(jidToSave)) return m.reply(`⚠️ @${display} no es owner.`, { mentions: [jidToSave] });
config.owners = config.owners.filter(j => j !== jidToSave);
const res = await db.query(`INSERT INTO subbots (id, owners)
        VALUES ($1, $2)
        ON CONFLICT (id) DO UPDATE SET owners = $2 RETURNING owners`, [botId, config.owners]);
console.log(`✅ Owner removido: ${jidToSave} para ID ${botId}`);
return m.reply(`✅ Removido como owner: @${display}`, { mentions: [jidToSave] });
}} catch (err) {
console.error(err);
}};
handler.help = ["addowner", "delowner"];
handler.tags = ["jadibot"];
handler.command = /^(addowner|delowner)$/i;
handler.owner = true;
handler.register = true

export default handler;
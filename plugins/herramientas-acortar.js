import fetch from 'node-fetch';
const handler = async (m, {conn, args, text}) => {
if (!text) throw '*⚠️ 𝐈𝐧𝐠𝐫𝐞𝐬𝐞 𝐮𝐧 𝐞𝐧𝐥𝐚𝐜𝐞/𝐮𝐫𝐥 𝐞𝐥 𝐜𝐮𝐚𝐥 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐨𝐫𝐭𝐚𝐫?*';
const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
if (!shortUrl1) throw `*[❗] 𝐄𝐑𝐑𝐎𝐑, 𝐂𝐎𝐌𝐏𝐑𝐔𝐄𝐁𝐄 𝐐𝐔𝐄 𝐄𝐋 𝐓𝐄𝐗𝐓𝐎 𝐈𝐍𝐆𝐑𝐄𝐒𝐀𝐃𝐎 𝐒𝐄𝐀 𝐔𝐍 𝐓𝐄𝐗𝐓𝐎 𝐈𝐍𝐆𝐑𝐄𝐒𝐀𝐃𝐎 𝐒𝐄𝐀 𝐔𝐍 𝐓𝐄𝐗𝐓𝐎 𝐄 𝐈𝐍𝐓𝐄𝐍𝐓𝐄𝐋𝐎 𝐃𝐄 𝐍𝐔𝐄𝐕𝐎*`;
const done = `*🔶 𝐋𝐢𝐧𝐤 𝐚𝐜𝐨𝐫𝐭𝐚𝐝𝐨 𝐜𝐨𝐫𝐫𝐞𝐜𝐭𝐚𝐦𝐞𝐧𝐭𝐞!!*\n\n*• 𝐋𝐢𝐧𝐤 𝐚𝐧𝐭𝐞𝐫𝐢𝐨𝐫:*\n${text}\n*• 𝐋𝐢𝐧𝐤 𝐚𝐜𝐨𝐫𝐭𝐚𝐝𝐨:*\n${shortUrl1}`.trim();
m.reply(done);
};
handler.help = ['tinyurl', 'acortar'].map((v) => v + ' <link>');
handler.tags = ['tools'];
handler.command = /^(tinyurl|short|acortar|corto)$/i;
handler.fail = null;
handler.register = true
export default handler;

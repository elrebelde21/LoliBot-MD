import fetch from 'node-fetch';
const handler = async (m, {conn, args, text}) => {
if (!text) throw await tr('*⚠️ Ingrese un enlace el cual desea acortar?*')
const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
if (!shortUrl1) throw await tr('*⚠️ Ingrese un enlace el cual desea acortar?*')
const done = await tr(`*🔶 Link acortado correctamente!!*\n\n*• Link anterior:*`) + `\n${text}\n` + await tr(`*• Link acortado:*`) + `\n${shortUrl1}`.trim();
m.reply(done);
};
handler.help = ['tinyurl', 'acortar'].map((v) => v + ' <link>');
handler.tags = ['tools'];
handler.command = /^(tinyurl|short|acortar|corto)$/i;
handler.fail = null;
handler.register = true
export default handler;

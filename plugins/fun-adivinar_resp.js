import similarity from 'similarity'

const threshold = 0.72

let handler = m => m 
handler.before = async function (m) {

//----------------------[adivina acertijo]----------------------
  const id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^ⷮ/i.test(m.quoted.text)) return !0;
  this.tekateki = this.tekateki ? this.tekateki : {};
  if (!(id in this.tekateki)) return m.reply('El juegos ya ha terminado!');
  if (m.quoted.id == this.tekateki[id][0].id) {
    const json = JSON.parse(JSON.stringify(this.tekateki[id][1]));
    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tekateki[id][2];
      m.reply(`\`Respuesta correcta! 🥳\`\n\n> *Ganarte :* ${this.tekateki[id][2]} Exp`);
      m.react(`✅`)
      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) m.reply(`Casi lo logras!`);
    else m.react(`❌`)
}

///----------------------[adivina la canción]----------------------
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/ADIVINA EL TITULO DE LA CANCION/i.test(m.quoted.text)) return !0;
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {};
    if (!(id in this.tebaklagu)) return m.reply('El juego ha terminado');
    if (m.quoted.id == this.tebaklagu[id][0].id) {
      const json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]));
      if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += this.tebaklagu[id][2];
        m.reply(`\`Respuesta correcta! 🥳\`\n\n• *Ganarte :* ${this.tebaklagu[id][2]} XP`);
        m.react(`✅`)
        clearTimeout(this.tebaklagu[id][3]);
        delete this.tebaklagu[id];
      } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`Casi lo logra!`);
      else m.react(`❌`)
    }
    return !0
}

handler.exp = 0

export default handler;

import os from "os"
import cp from "child_process"
import { promisify } from "util"

const exec = promisify(cp.exec)

const handler = async (m) => {
let o
    m.react("🚀")
    try {
      o = await exec("python3 speed.py --secure --share 2>/dev/null")
      const { stdout, stderr } = o
      
      if (stdout.trim()) {
        const urlMatch = stdout.match(/https:\/\/www\.speedtest\.net\/result\/[^\s]+/)
        
        if (urlMatch) {
          const imageUrl = urlMatch[0] + '.png'
          await conn.sendMessage(m.chat, { 
            image: { url: imageUrl },
            caption: stdout.trim()
          }, { quoted: m })
        } else {
          await conn.sendMessage(m.chat, { text: stdout.trim() }, { quoted: m })
        }
      }
      
      if (stderr.trim() && !stderr.includes("Speedtest (Ookla)")) {
        await conn.sendMessage(m.chat, { text: stderr.trim() }, { quoted: m })
      }
    } catch (e) {
      return m.reply(e.message)
    }
  }
handler.help = ['speedtest'];
handler.tags = ['main'];
handler.command = /^(speedtest?|test?speed)$/i;
handler.register = true
export default handler;

function toTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
}
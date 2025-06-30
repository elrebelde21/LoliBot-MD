import syntaxerror from 'syntax-error'
import { format } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

let handler = async (m, _2) => {

//if (m.fromMe) return
const { conn, isOwner, isROwner, args, text, metadata } = _2
if (!isOwner) return

let prefixMatch = (m.originalText || m.text)?.match(/^=?>\s?/)
if (!prefixMatch) return

  const noPrefix = m.originalText.replace(prefixMatch[0], '').trim()
  const _text = prefixMatch[0].startsWith('=') ? 'return ' + noPrefix : noPrefix
  const old = m.exp * 1
  let _return
  let _syntax = ''

  try {
    let i = 15
    const f = { exports: {} }

    let exec = new (async () => {}).constructor(
      'print', 'm', 'handler', 'require', 'conn', 'Array',
      'process', 'args', 'groupMetadata', 'module', 'exports', 'argument',
      _text
    )

    _return = await exec.call(conn,
      (...args) => {
        if (--i < 1) return
        console.log(...args)
        return conn.reply(m.chat, format(...args), m)
      },
      m, handler, require, conn, CustomArray, process, args, metadata, f, f.exports, [conn, _2]
    )

  } catch (e) {
    const err = syntaxerror(_text, 'Execution Function', {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      sourceType: 'module'
    })
    if (err) _syntax = '```' + err + '```\n\n'
    _return = e
  } finally {
    conn.reply(m.chat, _syntax + format(_return), m)
    m.exp = old
  }
}

handler.help = ['> ', '=> ', '=']
handler.tags = ['owner']
handler.customPrefix = /^=?>\s?/
//handler.command = /(?:)/i
//handler.owner = true
handler.register = true

export default handler

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] === 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}

import "dotenv/config"
import fs from "fs"
import path from "path"

const DRIVER = (process.env.DB_DRIVER || "lowdb").toLowerCase().trim()
const JSON_PATH = process.env.LOWDB_PATH || "./database.json"

const DEFAULT_SUBBOT = {
  prefix: ["/", ".", "#"],
  mode: "public",
  anti_private: false,
  anti_call: true,
  owners: [],
  name: null,
  logo_url: null,
  privacy: false,
  prestar: false,
  tipo: null
}

const SCHEMA = {
  group_settings: {
    pk: ["group_id"],
    columns: {
      group_id: null,
      welcome: true,
      bye: false,
      detect: true,
      antifake: false,
      antifake_prefixes: ["92", "92", "222", "93", "265", "213", "225", "241", "61", "249", "966", "229", "40", "49", "48", "20", "963", "967", "234", "256", "243", "210", "249", "212", "971", "974", "968", "965", "962", "961", "964", "970"],
      antilink: false,
      antilink2: false,
      modohorny: false,
      audios: true,
      nsfw_horario: null,
      antistatus: false,
      auto_approve: false,
      modoadmin: false,
      photowelcome: false,
      photobye: false,
      autolevelup: true,
      sWelcome: null,
      sBye: null,
      sPromote: null,
      sDemote: null,
      banned: false,
      expired: 0,
      memory_ttl: 86400,
      sAutorespond: null,
      primary_bot: null
    }
  },

  usuarios: {
    pk: ["id"],
    columns: {
      id: null,
      nombre: null,
      registered: false,
      num: null,
      lid: null,
      banned: false,
      warn_pv: false,
      warn: 0,
      warn_antiporn: 0,
      warn_estado: 0,
      edad: null,
      money: 100,
      limite: 10,
      exp: 0,
      banco: 0,
      level: 0,
      role: "novato",
      reg_time: null,
      serial_number: null,
      sticker_packname: null,
      sticker_author: null,
      ry_time: 0,
      lastwork: 0,
      lastmiming: 0,
      lastclaim: 0,
      dailystreak: 0,
      lastcofre: 0,
      lastrob: 0,
      lastslut: 0,
      timevot: 0,
      wait: 0,
      crime: 0,
      marry: null,
      marry_request: null,
      razon_ban: null,
      avisos_ban: 0,
      gender: null,
      birthday: null
    }
  },

  chats: {
    pk: ["id"],
    columns: {
      id: null,
      is_group: true,
      timestamp: 0,
      is_active: true,
      bot_id: null,
      joined: true
    }
  },

  messages: {
    pk: ["user_id", "group_id"],
    columns: {
      user_id: null,
      group_id: null,
      message_count: 0
    }
  },

  characters: {
    pk: ["id"],
    auto: "id",
    columns: {
      id: null,
      name: null,
      url: null,
      tipo: null,
      anime: null,
      rareza: null,
      price: 0,
      previous_price: null,
      claimed_by: null,
      for_sale: false,
      seller: null,
      votes: 0,
      last_removed_time: null
    }
  },

  subbots: {
    pk: ["id"],
    columns: {
      id: null,
      tipo: "null",
      name: null,
      logo_url: null,
      prefix: ["/", ".", "#"],
      mode: "public",
      owners: [],
      anti_private: false,
      anti_call: true,
      privacy: false,
      prestar: false
    }
  },

  reportes: {
    pk: ["id"],
    auto: "id",
    columns: {
      id: null,
      sender_id: null,
      sender_name: null,
      mensaje: null,
      fecha: null,
      enviado: false,
      tipo: "reporte"
    }
  },

  chat_memory: {
    pk: ["chat_id"],
    columns: {
      chat_id: null,
      history: null,
      updated_at: null
    }
  },

warn_status: {
  pk: ["user_id", "group_id"],
  columns: {
    user_id: null,
    group_id: null,
    lid: null,
    num: null,
    warns: 0
  }
},

muted_users: {
  pk: ["group_id", "user_id"],
  columns: {
    group_id: null,
    user_id: null,
    lid: null,
    num: null,
    created_at: 0
  }
},

  stats: {
    pk: ["command"],
    columns: {
      command: null,
      count: 1
    }
  }
}

const normalizeTable = (t = "") => t.replace(/[`"']/g, "").trim().toLowerCase()
const normalizeCol = (c = "") => c.replace(/[`"']/g, "").trim()

const lowerKeys = (row = {}) => {
  const out = {}
  for (const [k, v] of Object.entries(row || {})) {
    out[k] = parseMaybeJson(v)
    out[k.toLowerCase()] = parseMaybeJson(v)
  }
  return out
}

const clone = (x) => x == null ? x : JSON.parse(JSON.stringify(x))
const nowSql = () => new Date().toISOString()

function parseMaybeJson(v) {
  if (typeof v !== "string") return v
  const s = v.trim()
  if ((s.startsWith("[") && s.endsWith("]")) || (s.startsWith("{") && s.endsWith("}"))) {
    try { return JSON.parse(s) } catch {}
  }
  if (s === "true") return true
  if (s === "false") return false
  return v
}

function normalizeParams(params = []) {
  return params.map(v => {
    if (Array.isArray(v) || (v && typeof v === "object" && !(v instanceof Date))) {
      return JSON.stringify(v)
    }
    return v
  })
}

function buildParamList(sql, params) {
  const out = []
  const converted = sql.replace(/\$(\d+)/g, (_, n) => {
    out.push(params[Number(n) - 1])
    return "?"
  })
  return { sql: converted, params: out }
}

function sqlType(driver, table, col, def, meta) {
  if (meta?.auto === col) {
    if (driver === "postgres") return "SERIAL"
    if (driver === "mariadb") return "INT AUTO_INCREMENT"
    return "INTEGER"
  }

  if (def === null || def === undefined) return "TEXT"

  if (typeof def === "boolean") {
    if (driver === "postgres" || driver === "mariadb") return "BOOLEAN"
    return "INTEGER"
  }

  if (typeof def === "number") return "BIGINT"

  if (Array.isArray(def)) {
    if (driver === "postgres") return "JSONB"
    if (driver === "mariadb") return "JSON"
    return "TEXT"
  }

  if (typeof def === "object") {
    if (driver === "postgres") return "JSONB"
    if (driver === "mariadb") return "JSON"
    return "TEXT"
  }

  return "TEXT"
}

function defaultLiteral(driver, v) {
  if (v === null || v === undefined) return ""

  if (typeof v === "boolean") {
    if (driver === "postgres") return ` DEFAULT ${v ? "true" : "false"}`
    return ` DEFAULT ${v ? 1 : 0}`
  }

  if (typeof v === "number") return ` DEFAULT ${v}`

  if (Array.isArray(v) || typeof v === "object") {
    const json = JSON.stringify(v).replace(/'/g, "''")
    if (driver === "postgres") return ` DEFAULT '${json}'::jsonb`
    if (driver === "mariadb") return ` DEFAULT ('${json}')`
    return ` DEFAULT '${json}'`
  }

  return ` DEFAULT '${String(v).replace(/'/g, "''")}'`
}

async function importPkg(name) {
  try {
    return await import(name)
  } catch {
    throw new Error(`Falta instalar dependencia: ${name}`)
  }
}

class SqlDB {
  constructor(driver, raw) {
    this.driver = driver
    this.raw = raw
  }

  async query(sql, params = []) {
    sql = String(sql || "").trim()
    if (!sql) return { rows: [], rowCount: 0 }

    if (this.driver === "postgres") {
      const res = await this.raw.query(sql, params)
      res.rows = (res.rows || []).map(lowerKeys)
      return res
    }

    let q = this.translate(sql)
    const built = buildParamList(q, params)
    const finalParams = normalizeParams(built.params)
    const first = built.sql.trim().split(/\s+/)[0]?.toUpperCase()

    if (this.driver === "sqlite") {
      if (first === "SELECT" || first === "PRAGMA") {
        return {
          rows: this.raw.prepare(built.sql).all(...finalParams).map(lowerKeys),
          rowCount: 0
        }
      }

      const info = this.raw.prepare(built.sql).run(...finalParams)
      return { rows: [], rowCount: info.changes || 0 }
    }

    const [rows] = await this.raw.query(built.sql, finalParams)
    return {
      rows: Array.isArray(rows) ? rows.map(lowerKeys) : [],
      rowCount: rows?.affectedRows || 0
    }
  }

  translate(sql) {
    if (this.driver === "sqlite") {
      return sql
        .replace(/SERIAL\s+PRIMARY\s+KEY/ig, "INTEGER PRIMARY KEY AUTOINCREMENT")
        .replace(/\bSERIAL\b/ig, "INTEGER")
        .replace(/JSONB/ig, "TEXT")
        .replace(/JSON/ig, "TEXT")
        .replace(/TEXT\[\]/ig, "TEXT")
        .replace(/NOW\(\)/ig, "CURRENT_TIMESTAMP")
    }

    let q = sql
      .replace(/SERIAL\s+PRIMARY\s+KEY/ig, "INT AUTO_INCREMENT PRIMARY KEY")
      .replace(/\bSERIAL\b/ig, "INT AUTO_INCREMENT")
      .replace(/JSONB/ig, "JSON")
      .replace(/TEXT\[\]/ig, "JSON")
      .replace(/NOW\(\)/ig, "CURRENT_TIMESTAMP")

    if (/ON\s+CONFLICT/i.test(q)) {
      if (/DO\s+NOTHING/i.test(q)) {
        q = q
          .replace(/^INSERT\s+INTO/i, "INSERT IGNORE INTO")
          .replace(/ON\s+CONFLICT\s*(?:\([^)]*\))?\s*DO\s+NOTHING/ig, "")
      } else if (/ON\s+CONFLICT\s*\(id\).*UPDATE\s+SET\s+timestamp/i.test(q)) {
        q = q.replace(
          /ON\s+CONFLICT\s*\(id\)\s*DO\s+UPDATE\s+SET\s+timestamp\s*=\s*\$3,\s*bot_id\s*=\s*\$4,\s*joined\s*=\s*true/ig,
          "ON DUPLICATE KEY UPDATE timestamp = VALUES(timestamp), bot_id = VALUES(bot_id), joined = true"
        )
      } else if (/ON\s+CONFLICT\s*\(user_id,\s*group_id\)/i.test(q)) {
        q = q.replace(
          /ON\s+CONFLICT\s*\(user_id,\s*group_id\)\s*DO\s+UPDATE\s+SET\s+message_count\s*=\s*messages\.message_count\s*\+\s*1/ig,
          "ON DUPLICATE KEY UPDATE message_count = message_count + 1"
        )
      } else if (/ON\s+CONFLICT\s*\(command\)/i.test(q)) {
        q = q.replace(
          /ON\s+CONFLICT\s*\(command\)\s*DO\s+UPDATE\s+SET\s+count\s*=\s*stats\.count\s*\+\s*1/ig,
          "ON DUPLICATE KEY UPDATE count = count + 1"
        )
      } else {
        q = q.replace(/ON\s+CONFLICT\s*\([^)]*\)\s*DO\s+UPDATE\s+SET\s+(.+)$/is, (_, set) => {
          return "ON DUPLICATE KEY UPDATE " + set.replace(/EXCLUDED\.([a-zA-Z0-9_]+)/ig, "VALUES($1)")
        })
      }
    }

    return q
  }
}

class JsonDB {
  constructor(kind, fileOrCollection) {
    this.kind = kind
    this.file = typeof fileOrCollection === "string" ? fileOrCollection : null
    this.collection = typeof fileOrCollection === "string" ? null : fileOrCollection
    this.data = {}

    for (const table of Object.keys(SCHEMA)) {
      this.data[table] = []
    }
  }

  async init() {
    if (this.kind === "lowdb") {
      try {
        if (fs.existsSync(this.file)) {
          const json = JSON.parse(fs.readFileSync(this.file, "utf8"))
          this.data = { ...this.data, ...json }
        }
      } catch {
        this.data = {}
      }

      for (const table of Object.keys(SCHEMA)) {
        if (!Array.isArray(this.data[table])) this.data[table] = []
      }

      setInterval(() => this.write().catch(console.error), 30_000)
      return
    }

    const rows = await this.collection.find({}).toArray()
    for (const r of rows) this.data[r.table] = r.rows || []

    for (const table of Object.keys(SCHEMA)) {
      if (!Array.isArray(this.data[table])) this.data[table] = []
    }
  }

  async write() {
    if (this.kind === "lowdb") {
      fs.mkdirSync(path.dirname(this.file), { recursive: true })
      fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2))
      return
    }

    for (const [table, rows] of Object.entries(this.data)) {
      await this.collection.updateOne(
        { table },
        { $set: { table, rows } },
        { upsert: true }
      )
    }
  }

  async query(sql, params = []) {
    sql = String(sql || "").trim()
    if (!sql) return { rows: [], rowCount: 0 }

    if (/^(CREATE|ALTER)\b/i.test(sql)) {
      return { rows: [], rowCount: 0 }
    }

    const cmd = sql.split(/\s+/)[0].toUpperCase()

    try {
      if (cmd === "SELECT") return { rows: this.select(sql, params), rowCount: 0 }
      if (cmd === "INSERT") return this.insert(sql, params)
      if (cmd === "UPDATE") return this.update(sql, params)
      if (cmd === "DELETE") return this.delete(sql, params)

      console.warn("[JSON DB] Query no soportada:", sql)
      return { rows: [], rowCount: 0 }
    } catch (e) {
      console.error("[JSON DB ERROR]", e, "\nSQL:", sql, "\nPARAMS:", params)
      return { rows: [], rowCount: 0 }
    }
  }

  select(sql, params) {
    if (/FROM\s+chat_memory\s+JOIN\s+group_settings/i.test(sql)) {
      const out = []

      for (const mem of this.data.chat_memory || []) {
        const gs = (this.data.group_settings || []).find(g => g.group_id === mem.chat_id)
        if (gs && Number(gs.memory_ttl || 0) > 0) {
          out.push({
            chat_id: mem.chat_id,
            updated_at: mem.updated_at,
            memory_ttl: gs.memory_ttl ?? 86400
          })
        }
      }

      return out
    }

    const m = sql.match(/SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_]+)/is)
    if (!m) return []

    const colsRaw = m[1].trim()
    const table = normalizeTable(m[2])
    let rows = [...(this.data[table] || [])].map(lowerKeys)

    const where = sql.match(/\sWHERE\s+(.+?)(\sORDER\s+BY|\sLIMIT|$)/is)?.[1]
    if (where) rows = rows.filter(r => matchWhere(r, where, params))

    const countMatch = colsRaw.match(/^COUNT\s*\(\s*\*\s*\)(?:\s+AS\s+([a-zA-Z0-9_]+))?$/i)
    if (countMatch) {
      const key = countMatch[1] || "count"
      return [{ [key]: rows.length, total: rows.length, count: rows.length }]
    }

    const order = sql.match(/ORDER\s+BY\s+([a-zA-Z0-9_]+)\s*(ASC|DESC)?/i)
    if (order) {
      const col = order[1]
      const dir = (order[2] || "ASC").toUpperCase()

      rows.sort((a, b) => {
        const av = a[col] ?? a[col.toLowerCase()]
        const bv = b[col] ?? b[col.toLowerCase()]
        return (av > bv ? 1 : av < bv ? -1 : 0) * (dir === "DESC" ? -1 : 1)
      })
    }

    const limit = sql.match(/LIMIT\s+(\d+)/i)
    if (limit) rows = rows.slice(0, Number(limit[1]))

    if (colsRaw === "*") return rows.map(clone)

    const cols = splitSqlList(colsRaw).map(x => {
      const alias = x.match(/\s+AS\s+([a-zA-Z0-9_]+)/i)?.[1]
      const source = x.replace(/\s+AS\s+.*/i, "").trim()
      const cleanSource = source.split(".").pop()
      return {
        source: cleanSource,
        alias: alias || cleanSource
      }
    })

    return rows.map(r => {
      const out = {}

      for (const c of cols) {
        const key = c.source
        const val = r[key] ?? r[key.toLowerCase()]
        out[c.alias] = val
      }

      return out
    })
  }

  insert(sql, params) {
    const m = sql.match(/INSERT\s+INTO\s+([a-zA-Z0-9_]+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/is)
    if (!m) return { rows: [], rowCount: 0 }

    const table = normalizeTable(m[1])
    const schema = SCHEMA[table] || { pk: [], columns: {} }

    if (!this.data[table]) this.data[table] = []

    const cols = m[2].split(",").map(x => x.trim())
    const vals = splitSqlList(m[3]).map(v => valueFromToken(v, params))

    const row = lowerKeys({ ...clone(schema.columns) })

    for (let i = 0; i < cols.length; i++) {
      row[cols[i]] = vals[i]
      row[cols[i].toLowerCase()] = vals[i]
    }

    if (schema.auto && (row[schema.auto] === null || row[schema.auto] === undefined)) {
      row[schema.auto] = nextId(this.data[table], schema.auto)
    }

    if (table === "reportes" && !row.fecha) row.fecha = nowSql()
    if (table === "chat_memory" && !row.updated_at) row.updated_at = nowSql()

    const conflictCols =
      sql.match(/ON\s+CONFLICT\s*\(([^)]+)\)/i)?.[1]?.split(",").map(x => x.trim()) ||
      schema.pk ||
      []

    const idx = this.data[table].findIndex(r => {
      const rr = lowerKeys(r)
      return conflictCols.length && conflictCols.every(c => rr[c] === row[c])
    })

    if (idx >= 0) {
      if (/DO\s+NOTHING/i.test(sql)) return { rows: [], rowCount: 0 }

      const setPart = sql.match(/DO\s+UPDATE\s+SET\s+(.+)$/is)?.[1]
      if (setPart) applySet(this.data[table][idx], setPart, params, row, table)

      this.write().catch(console.error)
      return { rows: [], rowCount: 1 }
    }

    this.data[table].push(row)
    this.write().catch(console.error)

    return { rows: [], rowCount: 1 }
  }

  update(sql, params) {
    const m = sql.match(/UPDATE\s+([a-zA-Z0-9_]+)\s+SET\s+(.+?)\s+WHERE\s+(.+)$/is)
    if (!m) return { rows: [], rowCount: 0 }

    const table = normalizeTable(m[1])
    const setPart = m[2]
    const where = m[3]

    if (!this.data[table]) this.data[table] = []

    let count = 0

    for (const row of this.data[table]) {
      const rr = lowerKeys(row)
      if (matchWhere(rr, where, params)) {
        applySet(row, setPart, params, null, table)
        count++
      }
    }

    if (count) this.write().catch(console.error)

    return { rows: [], rowCount: count }
  }

  delete(sql, params) {
    const m = sql.match(/DELETE\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+(.+))?/is)
    if (!m) return { rows: [], rowCount: 0 }

    const table = normalizeTable(m[1])
    const before = this.data[table]?.length || 0
    const where = m[2]

    if (!where) {
      this.data[table] = []
    } else {
      this.data[table] = (this.data[table] || []).filter(r => !matchWhere(lowerKeys(r), where, params))
    }

    const count = before - this.data[table].length
    if (count) this.write().catch(console.error)

    return { rows: [], rowCount: count }
  }
}

function splitSqlList(s) {
  const out = []
  let cur = ""
  let q = null
  let par = 0

  for (let i = 0; i < s.length; i++) {
    const ch = s[i]

    if (q) {
      cur += ch
      if (ch === q && s[i - 1] !== "\\") q = null
      continue
    }

    if (ch === "'" || ch === '"') {
      q = ch
      cur += ch
      continue
    }

    if (ch === "(") par++
    if (ch === ")") par--

    if (ch === "," && par === 0) {
      out.push(cur.trim())
      cur = ""
      continue
    }

    cur += ch
  }

  if (cur.trim()) out.push(cur.trim())
  return out
}

function valueFromToken(token, params) {
  token = String(token || "").trim()

  const p = token.match(/^\$(\d+)$/)
  if (p) return params[Number(p[1]) - 1]

  if (/^true$/i.test(token)) return true
  if (/^false$/i.test(token)) return false
  if (/^null$/i.test(token)) return null
  if (/^(CURRENT_TIMESTAMP|NOW\(\))$/i.test(token)) return nowSql()

  if (/^'.*'$/.test(token) || /^".*"$/.test(token)) {
    return token.slice(1, -1)
  }

  if (/^-?\d+(\.\d+)?$/.test(token)) return Number(token)

  return token
}

function nextId(rows, col) {
  return Math.max(0, ...rows.map(r => Number(r[col] || 0))) + 1
}

function matchWhere(row, where, params) {
  where = String(where || "").replace(/;\s*$/g, "").trim()

  const andParts = splitWhere(where, "AND")

  for (const andPart of andParts) {
    const orParts = splitWhere(andPart, "OR")

    const ok = orParts.some(part => matchCondition(row, cleanParens(part), params))

    if (!ok) return false
  }

  return true
}

function splitWhere(str, operator) {
  const out = []
  let cur = ""
  let par = 0
  let q = null
  const re = new RegExp(`\\s+${operator}\\s+`, "i")

  for (let i = 0; i < str.length; i++) {
    const ch = str[i]

    if (q) {
      cur += ch
      if (ch === q && str[i - 1] !== "\\") q = null
      continue
    }

    if (ch === "'" || ch === '"') {
      q = ch
      cur += ch
      continue
    }

    if (ch === "(") par++
    if (ch === ")") par--

    const rest = str.slice(i)

    if (par === 0 && re.test(rest)) {
      const m = rest.match(re)
      out.push(cur.trim())
      cur = ""
      i += m[0].length - 1
      continue
    }

    cur += ch
  }

  if (cur.trim()) out.push(cur.trim())
  return out
}

function cleanParens(str = "") {
  str = str.trim()
  while (str.startsWith("(") && str.endsWith(")")) {
    str = str.slice(1, -1).trim()
  }
  return str
}

function matchCondition(row, part, params) {
  let m

  if ((m = part.match(/^([a-zA-Z0-9_\.]+)\s+IS\s+NOT\s+NULL$/i))) {
    const col = m[1].split(".").pop()
    return row[col] != null || row[col.toLowerCase()] != null
  }

  if ((m = part.match(/^([a-zA-Z0-9_\.]+)\s+IS\s+NULL$/i))) {
    const col = m[1].split(".").pop()
    return row[col] == null && row[col.toLowerCase()] == null
  }

  if ((m = part.match(/^([a-zA-Z0-9_\.]+)\s*(=|<>|!=)\s*(\$\d+|true|false|null|'[^']*'|"[^"]*"|-?\d+(?:\.\d+)?)$/i))) {
    const col = m[1].split(".").pop()
    const op = m[2]
    const val = valueFromToken(m[3], params)
    const current = row[col] ?? row[col.toLowerCase()]

    if (op === "=") return current === val
    if (op === "<>" || op === "!=") return current !== val
  }

  if ((m = part.match(/^([a-zA-Z0-9_\.]+)\s*>=\s*(\$\d+|-?\d+(?:\.\d+)?)$/i))) {
    const col = m[1].split(".").pop()
    return Number(row[col] ?? row[col.toLowerCase()] ?? 0) >= Number(valueFromToken(m[2], params))
  }

  if ((m = part.match(/^([a-zA-Z0-9_\.]+)\s*<=\s*(\$\d+|-?\d+(?:\.\d+)?)$/i))) {
    const col = m[1].split(".").pop()
    return Number(row[col] ?? row[col.toLowerCase()] ?? 0) <= Number(valueFromToken(m[2], params))
  }

  if ((m = part.match(/^([a-zA-Z0-9_\.]+)\s*>\s*(\$\d+|-?\d+(?:\.\d+)?)$/i))) {
    const col = m[1].split(".").pop()
    return Number(row[col] ?? row[col.toLowerCase()] ?? 0) > Number(valueFromToken(m[2], params))
  }

  if ((m = part.match(/^([a-zA-Z0-9_\.]+)\s*<\s*(\$\d+|-?\d+(?:\.\d+)?)$/i))) {
    const col = m[1].split(".").pop()
    return Number(row[col] ?? row[col.toLowerCase()] ?? 0) < Number(valueFromToken(m[2], params))
  }

  console.warn("[JSON DB] WHERE no soportado:", part)
  return false
}

function applySet(row, setPart, params, excluded = null, table = "") {
  const assignments = splitSqlList(String(setPart || "").replace(/;\s*$/g, ""))

  for (const a of assignments) {
    const m = a.match(/^([a-zA-Z0-9_]+)\s*=\s*(.+)$/is)
    if (!m) continue

    const col = m[1]
    const colLower = col.toLowerCase()
    let expr = m[2].trim()
    let mm

    if (/^EXCLUDED\./i.test(expr) && excluded) {
      const exCol = expr.split(".")[1]
      row[col] = excluded[exCol] ?? excluded[exCol.toLowerCase()]
      row[colLower] = row[col]
      continue
    }

    if ((mm = expr.match(/^([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\s*\+\s*(\d+)$/i))) {
      const baseCol = mm[2]
      row[col] = Number(row[baseCol] ?? row[baseCol.toLowerCase()] ?? 0) + Number(mm[3])
      row[colLower] = row[col]
      continue
    }

    if ((mm = expr.match(/^([a-zA-Z0-9_]+)\s*([+\-])\s*(\$\d+|\d+)$/i))) {
      const baseCol = mm[1]
      const base = Number(row[baseCol] ?? row[baseCol.toLowerCase()] ?? 0)
      const val = Number(valueFromToken(mm[3], params))
      row[col] = mm[2] === "+" ? base + val : base - val
      row[colLower] = row[col]
      continue
    }

    if ((mm = expr.match(/^COALESCE\(([a-zA-Z0-9_]+),\s*(\$\d+|[^)]+)\)$/i))) {
      const baseCol = mm[1]
      row[col] = row[baseCol] ?? row[baseCol.toLowerCase()] ?? valueFromToken(mm[2], params)
      row[colLower] = row[col]
      continue
    }

    row[col] = valueFromToken(expr, params)
    row[colLower] = row[col]
  }
}

async function initSqlTables(db, driver) {
  for (const [table, meta] of Object.entries(SCHEMA)) {
    const defs = []

    for (const [col, def] of Object.entries(meta.columns)) {
      let line = `${col} ${sqlType(driver, table, col, def, meta)}`

      if (meta.pk?.length === 1 && meta.pk[0] === col) {
        line += " PRIMARY KEY"
      } else if (meta.auto !== col) {
        line += defaultLiteral(driver, def)
      }

      defs.push(line)
    }

    if (meta.pk?.length > 1) {
      defs.push(`PRIMARY KEY (${meta.pk.join(", ")})`)
    }

    await db.query(`CREATE TABLE IF NOT EXISTS ${table} (${defs.join(", ")})`)

    for (const [col, def] of Object.entries(meta.columns)) {
      if (meta.pk?.includes(col)) continue

      try {
        await db.query(
          `ALTER TABLE ${table} ADD COLUMN ${col} ${sqlType(driver, table, col, def, meta)}${defaultLiteral(driver, def)}`
        )
      } catch {}
    }
  }
}

async function createDatabase() {
  if (DRIVER === "postgres") {
    const pg = await importPkg("pg")
    const { Pool } = pg.default || pg

    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL
    })

    const db = new SqlDB("postgres", pool)
    await initSqlTables(db, "postgres")

    console.log("✅ Base de datos PostgreSQL conectada.")
    return db
  }

  if (DRIVER === "sqlite") {
    const mod = await importPkg("better-sqlite3")
    const SQLite = mod.default || mod

    const raw = new SQLite(process.env.SQLITE_PATH || "./database.sqlite")
    const db = new SqlDB("sqlite", raw)

    await initSqlTables(db, "sqlite")

    console.log("✅ Base de datos SQLite conectada.")
    return db
  }

  if (DRIVER === "mariadb" || DRIVER === "mysql") {
    const mysql = await importPkg("mysql2/promise")
    const raw = await (mysql.default || mysql).createConnection(process.env.MYSQL_URL)

    const db = new SqlDB("mariadb", raw)
    await initSqlTables(db, "mariadb")

    console.log("✅ Base de datos MariaDB/MySQL conectada.")
    return db
  }

  if (DRIVER === "mongodb") {
    const mod = await importPkg("mongodb")
    const { MongoClient } = mod

    const client = new MongoClient(process.env.MONGO_URL)
    await client.connect()

    const rawDb = client.db()
    const json = new JsonDB("mongodb", rawDb.collection("bot_tables"))

    await json.init()

    console.log("✅ Base de datos MongoDB conectada.")
    return json
  }

  if (DRIVER !== "lowdb") {
    throw new Error(`DB_DRIVER inválido: ${DRIVER}`)
  }

  const json = new JsonDB("lowdb", JSON_PATH)
  await json.init()

  console.log("✅ Base de datos LowDB conectada.")
  return json
}

export const db = await createDatabase()

export async function getSubbotConfig(botId = "") {
  try {
    const cleanId = String(botId || "").replace(/:\d+/, "")
    const res = await db.query("SELECT * FROM subbots WHERE id = $1", [cleanId])
    const row = res.rows?.[0]

    if (!row) return { ...DEFAULT_SUBBOT }

    let prefix = row.prefix
    let owners = row.owners

    if (!Array.isArray(prefix)) {
      try {
        prefix = prefix ? JSON.parse(prefix) : DEFAULT_SUBBOT.prefix
      } catch {
        prefix = DEFAULT_SUBBOT.prefix
      }
    }

    if (!Array.isArray(owners)) {
      try {
        owners = owners ? JSON.parse(owners) : []
      } catch {
        owners = []
      }
    }

    return {
      ...DEFAULT_SUBBOT,
      ...row,
      prefix,
      owners
    }
  } catch (err) {
    console.error("❌ Error al obtener configuración del subbot desde DB:", err)
    return { ...DEFAULT_SUBBOT }
  }
}

export async function closeDatabase() {
  if (db?.write) await db.write()
  if (db?.raw?.end) await db.raw.end()
  if (db?.raw?.close) db.raw.close()
}
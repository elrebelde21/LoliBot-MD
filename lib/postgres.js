//CODIGO OFUSCADO POR SEGURIDAD BY: https://github.com/elrebelde21

const _0x5c4eee=_0x2ed2;function _0x2ed2(_0xabffba,_0x38e7ec){const _0x17d7ff=_0x17d7();return _0x2ed2=function(_0x2ed296,_0x3d9ef9){_0x2ed296=_0x2ed296-0x1c2;let _0x38acab=_0x17d7ff[_0x2ed296];return _0x38acab;},_0x2ed2(_0xabffba,_0x38e7ec);}(function(_0x377edc,_0x28f7db){const _0x4fadee=_0x2ed2,_0x379313=_0x377edc();while(!![]){try{const _0x25dd1e=parseInt(_0x4fadee(0x1cc))/0x1*(-parseInt(_0x4fadee(0x1c4))/0x2)+-parseInt(_0x4fadee(0x1cd))/0x3*(-parseInt(_0x4fadee(0x1c9))/0x4)+-parseInt(_0x4fadee(0x1d3))/0x5*(parseInt(_0x4fadee(0x1c6))/0x6)+parseInt(_0x4fadee(0x1ca))/0x7*(parseInt(_0x4fadee(0x1d2))/0x8)+parseInt(_0x4fadee(0x1c8))/0x9+parseInt(_0x4fadee(0x1cf))/0xa*(-parseInt(_0x4fadee(0x1d1))/0xb)+-parseInt(_0x4fadee(0x1d0))/0xc;if(_0x25dd1e===_0x28f7db)break;else _0x379313['push'](_0x379313['shift']());}catch(_0x529bab){_0x379313['push'](_0x379313['shift']());}}}(_0x17d7,0xc09b9));import _0x587d92 from'node-fetch';import _0x386c3f from'crypto';import _0x554bd8 from'pg';const {Pool}=_0x554bd8,SECRET='SkyUltraSuperSecretKey2025',timestamp=Date['now']()[_0x5c4eee(0x1ce)](),signature=_0x386c3f['createHmac'](_0x5c4eee(0x1cb),SECRET)[_0x5c4eee(0x1c3)](timestamp)[_0x5c4eee(0x1d5)]('hex'),res=await _0x587d92(_0x5c4eee(0x1c5),{'headers':{'Authorization':_0x5c4eee(0x1c7),'User-Agent':'skyultra-bot-client','x-timestamp':timestamp,'x-signature':signature}}),POSTGRES_URI=(await res[_0x5c4eee(0x1c2)]())[_0x5c4eee(0x1d4)]();export const db=new Pool({'connectionString':POSTGRES_URI});function _0x17d7(){const _0x3f262f=['sha256','13857pMyDqD','4182879ppYWVS','toString','263740pBNHzf','11613816dQVWFX','209SHALnX','5257056WNZGtN','196240gZUpXF','trim','digest','text','update','192PqAZcc','https://db-private.vercel.app/api/pg','66DmfiDc','Bearer\x20skyultra-bot-access-2025','11801592fDFfdB','4WZGUWc','14nVshTZ'];_0x17d7=function(){return _0x3f262f;};return _0x17d7();}

db.connect()
  .then(() => console.log("✅ Base de datos (PostgreSQL) conectado con éxito."))
  .catch(err => console.error("[ ❌ ] Error al conectar a PostgreSQL:", err));

async function initTables() {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS group_settings (
        group_id TEXT PRIMARY KEY
      );
    `);

    const columnasGrupos = [
      ['welcome', 'BOOLEAN DEFAULT true'],
      ['detect', 'BOOLEAN DEFAULT true'],
      ['antifake', 'BOOLEAN DEFAULT false'],
      ['antilink', 'BOOLEAN DEFAULT false'],
      ['antilink2', 'BOOLEAN DEFAULT false'],
      ['modohorny', 'BOOLEAN DEFAULT false'],
      ['nsfw_horario', 'TEXT'],
      ['antiStatus', 'BOOLEAN DEFAULT false'],
      ['modoadmin', 'BOOLEAN DEFAULT false'],
      ['photowelcome', 'BOOLEAN DEFAULT false'],
      ['photobye', 'BOOLEAN DEFAULT false'],
      ['autolevelup', 'BOOLEAN DEFAULT true'],
      ['sWelcome', 'TEXT'],
      ['sBye', 'TEXT'],
      ['sPromote', 'TEXT'],
      ['sDemote', 'TEXT'],
      ['banned', 'BOOLEAN DEFAULT false'],
      ['expired', 'BIGINT DEFAULT 0'],
      ['memory_ttl', 'INTEGER DEFAULT 86400'],
      ['sAutorespond', 'TEXT'],
      ['primary_bot', 'TEXT']
    ];

    for (const [columna, tipo] of columnasGrupos) {
      await db.query(`ALTER TABLE group_settings ADD COLUMN IF NOT EXISTS ${columna} ${tipo}`);
    }

    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id TEXT PRIMARY KEY
      );
    `);

    const columnasUsuarios = [
      ['nombre', 'TEXT'],
      ['registered', 'BOOLEAN DEFAULT false'],
      ['num', 'TEXT'],
      ['lid', 'TEXT UNIQUE'],
      ['warn_pv', 'BOOLEAN DEFAULT false'],
      ['warn', 'INTEGER DEFAULT 0'],
      ['warn_antiporn', 'INTEGER DEFAULT 0'],
      ['warn_estado', 'INTEGER DEFAULT 0'],
      ['edad', 'INTEGER'],
      ['money', 'INTEGER DEFAULT 100'],
      ['limite', 'INTEGER DEFAULT 10'],
      ['exp', 'INTEGER DEFAULT 0'],
      ['banco', 'INTEGER DEFAULT 0'],
      ['level', 'INTEGER DEFAULT 0'],
      ['role', "TEXT DEFAULT 'novato'"],
      ['reg_time', 'TIMESTAMP'],
      ['serial_number', 'TEXT'],
      ['sticker_packname', 'TEXT'],
      ['sticker_author', 'TEXT'],
      ['ry_time', 'BIGINT DEFAULT 0'],
      ['lastwork', 'BIGINT DEFAULT 0'],
      ['lastmiming', 'BIGINT DEFAULT 0'],
      ['lastclaim', 'BIGINT DEFAULT 0'],
      ['dailystreak', 'BIGINT DEFAULT 0'],
      ['lastcofre', 'BIGINT DEFAULT 0'],
      ['lastrob', 'BIGINT DEFAULT 0'],
      ['lastslut', 'BIGINT DEFAULT 0'],
      ['timevot', 'BIGINT DEFAULT 0'],
      ['wait', 'BIGINT DEFAULT 0'],
      ['crime', 'BIGINT DEFAULT 0'],
      ['marry', 'TEXT DEFAULT NULL'],
      ['marry_request', 'TEXT DEFAULT NULL']
    ];

    for (const [columna, tipo] of columnasUsuarios) {
      await db.query(`ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS ${columna} ${tipo}`);
    }

await db.query(`
  CREATE TABLE IF NOT EXISTS chats (
    id TEXT PRIMARY KEY,
    is_group BOOLEAN DEFAULT true,
    timestamp BIGINT,
    is_active BOOLEAN DEFAULT true,
    bot_id TEXT,
    joined BOOLEAN DEFAULT true
  );
`);

//
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        user_id TEXT,
        group_id TEXT,
        message_count INTEGER DEFAULT 0,
        PRIMARY KEY (user_id, group_id)
      );
    `);
    
//carácter 
    await db.query(`
  CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY
  );
`);

const columnasCharacters = [
  ['name', 'TEXT NOT NULL'],
  ['url', 'TEXT NOT NULL'],
  ['tipo', 'TEXT'],
  ['anime', 'TEXT'],
  ['rareza', 'TEXT'],
  ['price', 'INTEGER NOT NULL'],
  ['previous_price', 'INTEGER'],
  ['claimed_by', 'TEXT'],
  ['for_sale', 'BOOLEAN DEFAULT false'],
  ['seller', 'TEXT'],
  ['votes', 'INTEGER DEFAULT 0'],
  ['last_removed_time', 'BIGINT']
];

for (const [columna, tipo] of columnasCharacters) {
  await db.query(`ALTER TABLE characters ADD COLUMN IF NOT EXISTS ${columna} ${tipo}`);
}

//subbot
await db.query(`
  CREATE TABLE IF NOT EXISTS subbots (
    id TEXT PRIMARY KEY
  );
`);

const columnasSubbots = [
  ['tipo', "TEXT DEFAULT 'null'"],
  ['name', 'TEXT'],
  ['logo_url', 'TEXT'],
  ['prefix', "TEXT[] DEFAULT ARRAY['/', '.', '#']"],
  ['mode', "TEXT DEFAULT 'public'"],
  ['owners', 'TEXT[]'],
  ['anti_private', 'BOOLEAN DEFAULT false'],
  ['anti_call', 'BOOLEAN DEFAULT true'],
  ['privacy', 'BOOLEAN DEFAULT false'],
  ['prestar', 'BOOLEAN DEFAULT false']
];

for (const [columna, tipo] of columnasSubbots) {
  await db.query(`ALTER TABLE subbots ADD COLUMN IF NOT EXISTS ${columna} ${tipo}`);
}

    await db.query(`
      CREATE TABLE IF NOT EXISTS chat_memory (
        chat_id TEXT PRIMARY KEY,
        history JSONB,
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS stats (
        command TEXT PRIMARY KEY,
        count INTEGER DEFAULT 1
      );
    `);
  } catch (err) {
    console.error("[❌] Error creando tablas o columnas:", err);
  }
}

export async function getSubbotConfig(botId) {
  try {
    const cleanId = botId.replace(/:\d+/, "");
    const res = await db.query("SELECT * FROM subbots WHERE id = $1", [cleanId]);

    if (res.rows.length > 0) return res.rows[0];

    return {
      prefix: ['/', '.', '#'],
      mode: 'public',
      anti_private: true,
      anti_call: false,
      owners: [],
      name: null,
      logo_url: null,
      privacy: null,
      prestar: null,
      tipo: null
    };
  } catch (err) {
    console.error("❌ Error al obtener configuración del subbot desde DB:", err);
    return {
      prefix: ['/', '.', '#'],
      mode: 'public',
      anti_private: true,
      anti_call: false,
      owners: [],
      name: null,
      logo_url: null,
      privacy: null,
      prestar: null,
      tipo: null
    };
  }
}

initTables();
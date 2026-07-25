import fetch from "node-fetch"

type AniListCharacter = {
  name?: {
    full?: string
  }
  image?: {
    large?: string
  }
  gender?: string
  favourites?: number
  media?: {
    nodes?: Array<{
      title?: {
        romaji?: string
      }
    }>
  }
}

type AniListResponse = {
  data?: {
    Character?: AniListCharacter
  }
}

type CharacterData = {
  name: string
  url: string
  tipo: string
  anime: string
  rareza: string
  price: number
  previous_price: number | null
  claimed_by: string | null
  for_sale: boolean
  seller: string | null
  votes: number
}

type TempCharacter = CharacterData & {
  esGratis: boolean
  messageId: string
  id?: number
}

type UserRow = {
  ry_time?: number
  exp?: number
}

const tempCharacterStore = new Map<string, TempCharacter>()

async function getAniListCharacter(): Promise<CharacterData> {
  const id = Math.floor(Math.random() * 200000)

  const query = `
    query {
      Character(id: ${id}) {
        name { full }
        image { large }
        gender
        favourites
        media(perPage: 1) {
          nodes {
            title { romaji }
          }
        }
      }
    }
  `

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  })

  const json = await res.json() as AniListResponse

  const c = json.data?.Character

  if (!c?.image?.large || !c?.name?.full) {
    return await getAniListCharacter()
  }

  const rarezas = [
    "Común",
    "Raro",
    "Épico",
    "Legendario"
  ]

  const rareza =
    rarezas[Math.floor(Math.random() * rarezas.length)]

  let price = Math.floor((c.favourites || 0) * 0.5)

  if (price < 6500) {
    price = 6500
  }

  if (
    rareza === "Legendario" &&
    price < 50000
  ) {
    price =
      50000 +
      Math.floor(Math.random() * 10000)
  }

  return {
    name: c.name.full,
    url: c.image.large,
    tipo: c.gender || "Desconocido",
    anime:
      c.media?.nodes?.[0]?.title?.romaji ||
      "Sin anime asociado",
    rareza,
    price,
    previous_price: null,
    claimed_by: null,
    for_sale: false,
    seller: null,
    votes: 0
  }
}

function msToTime(duration: number): string {
  const seconds = Math.floor(
    (duration / 1000) % 60
  )

  const minutes = Math.floor(
    (duration / (1000 * 60)) % 60
  )

  return (
    `${minutes.toString().padStart(2, "0")} min ` +
    `${seconds.toString().padStart(2, "0")} seg`
  )
}

export default {
  name: ["rw", "rf", "rollwaifu"],
  help: ["rw"],
  desc: "Tira un personaje gacha",
  tags: ["gacha", "rpg"],
  register: true,

  run: async ({ conn, m }) => {
    if (!m.db) return

    try {
      const {
        rows: [user]
      } = await m.db.query(
        "SELECT ry_time FROM usuarios WHERE id = $1",
        [m.sender]
      )

      const userData = (user || {}) as UserRow

      const lastTime = userData.ry_time || 0
      const now = Date.now()

      if (now - lastTime < 600_000) {
        const remaining =
          600_000 - (now - lastTime)

        return m.reply(
          `🤚 Pa, espera ${msToTime(remaining)} para volver a usar este comando`
        )
      }

      const character = await getAniListCharacter()

      const {
        rows: existing
      } = await m.db.query(
        "SELECT * FROM characters WHERE url = $1",
        [character.url]
      )

      let char: any = existing?.[0]

      if (!char) {
        const { rows } = await m.db.query(
          `INSERT INTO characters (
            name,
            url,
            tipo,
            anime,
            rareza,
            price,
            previous_price,
            claimed_by,
            for_sale,
            seller,
            votes
          ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
          )
          RETURNING *`,
          [
            character.name,
            character.url,
            character.tipo,
            character.anime,
            character.rareza,
            character.price,
            character.previous_price,
            character.claimed_by,
            character.for_sale,
            character.seller,
            character.votes
          ]
        )

        char = rows?.[0]
      }

      const esGratis =
        Math.random() < 0.5 &&
        !char.claimed_by

      const status = char.claimed_by
        ? char.for_sale
          ? `□ Estado: @${String(char.claimed_by).split("@")[0]} está vendiendo este personaje.`
          : `□ Estado: Comprado por @${String(char.claimed_by).split("@")[0]}`
        : `□ Estado: Libre`

      const precioTxt =
        !char.claimed_by && esGratis
          ? "□ ¡Puedes reclamarlo totalmente GRATIS!"
          : char.previous_price
            ? `□ ~Precio anterior: ${char.previous_price} exp~\n□ Precio Actual: ${char.price} exp`
            : `□ Precio: ${char.price} exp`

      const caption =
        `✦ *${char.name}* ✦\n\n` +
        `□ Fuente: ${char.anime}\n` +
        `□ Tipo: *${char.rareza}*\n` +
        `${status}\n` +
        `${precioTxt}\n\n` +
        `${
          char.claimed_by
            ? ""
            : `> Responde con "c" a este mensaje para ${
                esGratis
                  ? "reclamarlo gratis"
                  : "comprarlo"
              }`
        }`//`

      const sent = await conn.sendMessage(
        m.chat,
        {
          image: {
            url: char.url
          },
          caption,
          mentions: char.claimed_by
            ? [char.claimed_by]
            : undefined
        },
        {
          quoted: m
        }
      )

      const msgId = sent?.key?.id

      if (msgId) {
        tempCharacterStore.set(msgId, {
          ...char,
          esGratis,
          messageId: msgId
        })
      }

      await m.db.query(
        "UPDATE usuarios SET ry_time = $1 WHERE id = $2",
        [now, m.sender]
      )
    } catch (e: any) {
      console.error("Error en /rw:", e)

      await m.reply(
        `${m.e?.error || "❌"} Algo salió mal al tirar el personaje...`
      )
    }
  },

  before: async (m, { conn }) => {
    if (!m.quoted || !m.db) return

    const quotedId = m.quoted?.key?.id

    if (!quotedId) return

    const character =
      tempCharacterStore.get(quotedId)

    if (!character) return

if (
      !/^[\/\*\.\#\!\$\-\+\=\&\?\_\@]?c$/i.test(
        m.originalText?.trim() || ""
      )
    ) {
      return
    }

    try {
      const {
        rows: [u]
      } = await m.db.query(
        "SELECT exp FROM usuarios WHERE id = $1",
        [m.sender]
      )

      const user = (u || {}) as UserRow

      if (typeof user.exp !== "number") {
        return m.reply(
          `${m.e?.warn || "⚠️"} No tienes datos de usuario`
        )
      }

      const {
        rows: [char]
      } = await m.db.query(
        "SELECT * FROM characters WHERE url = $1",
        [character.url]
      )

      if (!char) {
        return m.reply(
          "Personaje ya no existe en la base"
        )
      }

      if (char.claimed_by) {
        if (!char.for_sale) {
          return m.reply(
            `${m.e?.warn || "⚠️"} Este personaje ya tiene dueño y no está en venta`
          )
        }

        if (char.claimed_by === m.sender) {
          return m.reply(
            "No podés comprarte tu propio personaje boludo"
          )
        }

        if (user.exp < char.price) {
          return m.reply(
            `${m.e?.warn || "⚠️"} Te faltan ${char.price - user.exp} exp para comprarlo`
          )
        }

        const comision = Math.floor(
          char.price * 0.1
        )

        const alVendedor =
          char.price - comision

        await m.db.query(
          "UPDATE usuarios SET exp = exp - $1 WHERE id = $2",
          [char.price, m.sender]
        )

        await m.db.query(
          "UPDATE usuarios SET exp = exp + $1 WHERE id = $2",
          [alVendedor, char.claimed_by]
        )

        await m.db.query(
          "UPDATE characters SET claimed_by = $1, for_sale = false, seller = null WHERE id = $2",
          [m.sender, char.id]
        )

        await m.reply(
          `🎉 ¡Has comprado a *${char.name}* por ${char.price} exp!`
        )

        await conn.sendMessage(
          char.claimed_by,
          {
            text:
              `Tu personaje *${char.name}* fue comprado por ` +
              `@${m.sender.split("@")[0]}!\n` +
              `Recibiste ${alVendedor} exp (comisión 10%)`,
            mentions: [m.sender]
          }
        )
      } else {
        if (
          !character.esGratis &&
          user.exp < char.price
        ) {
          return m.reply(
            `${m.e?.warn || "⚠️"} Necesitas ${char.price} exp para reclamarlo`
          )
        }

        if (!character.esGratis) {
          await m.db.query(
            "UPDATE usuarios SET exp = exp - $1 WHERE id = $2",
            [char.price, m.sender]
          )
        }

        await m.db.query(
          "UPDATE characters SET claimed_by = $1 WHERE id = $2",
          [m.sender, char.id]
        )

        const texto = character.esGratis
          ? `🎁 ¡Reclamaste a *${char.name}* totalmente GRATIS!`
          : `🎉 ¡Has comprado a *${char.name}* por ${char.price} exp!`

        await m.reply(texto)
      }

      tempCharacterStore.delete(quotedId)
    } catch (err: any) {
      console.error(
        "Error en compra/reclamo rw:",
        err
      )

      await m.reply(
        `${m.e?.error || "❌"} Error al procesar el reclamo/compra`
      )
    }
  }
}
import fetch from 'node-fetch'
import { FormData, Blob } from 'formdata-node'
import { fileTypeFromBuffer } from 'file-type'

/**
 * Upload epheremal file to file.io
 * `Expired in 1 day`
 * `100MB Max Filesize`
 */
const fileIO = async (buffer) => {
  const { ext, mime } = await fileTypeFromBuffer(buffer) || {}
  const form = new FormData()
  const blob = new Blob([buffer], { type: mime })
  form.append('file', blob, 'tmp.' + ext)
  const res = await fetch('https://file.io/?expires=1d', {
    method: 'POST',
    body: form,
  })
  const json = await res.json()
  if (!json.success) throw json
  return json.link
}

/**
 * Upload file to storage.restfulapi.my.id
 */
const RESTfulAPI = async (inp) => {
  const form = new FormData()
  let buffers = inp
  if (!Array.isArray(inp)) buffers = [inp]
  const mime = (await fileTypeFromBuffer(buffers[0]))?.mime || 'application/octet-stream'
  for (const buffer of buffers) {
    const blob = new Blob([buffer], { type: mime })
    form.append('file', blob)
  }
  const res = await fetch('https://storage.restfulapi.my.id/upload', {
    method: 'POST',
    body: form,
  })
  let json = await res.text()
  try {
    json = JSON.parse(json)
    if (!Array.isArray(inp)) return json.files[0].url
    return json.files.map((res) => res.url)
  } catch (e) {
    throw json
  }
}

/*
upload to qu.ax 
*/
const quax = async (buffer) => {
  const { ext, mime } = await fileTypeFromBuffer(buffer)
  const form = new FormData()
  const blob = new Blob([buffer], { type: mime })
  form.append('files[]', blob, 'file.' + ext)
  const res = await fetch('https://qu.ax/upload.php', {
    method: 'POST',
    body: form,
  })
  const json = await res.json()
  if (!json?.success) throw '❌ Error al subir a qu.ax'
  return json.files[0].url
}


/**
 * Upload to catbox.moe as fallback
 */
const catbox = async (buffer) => {
  const { ext } = await fileTypeFromBuffer(buffer) || {}
  const form = new FormData()
  const blob = new Blob([buffer])
  form.append('reqtype', 'fileupload')
  form.append('fileToUpload', blob, 'file.' + ext)
  const res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: form,
  })
  const url = await res.text()
  if (!url.startsWith('https://')) throw new Error('❌ Error al subir a catbox')
  return url
}

/*
upload uguu.se
*/
const uguu = async (buffer) => {
  const { ext } = await fileTypeFromBuffer(buffer) || {}
  const form = new FormData()
  form.append('file', new Blob([buffer]), 'file.' + ext)
  const res = await fetch('https://uguu.se/api.php?d=upload-tool', { method: 'POST', body: form })
  const url = await res.text()
  if (!url.startsWith('https://')) throw '❌ Error al subir a uguu'
  return url
}

// Upload a filechan
const filechan = async (buffer) => {
  const { ext } = await fileTypeFromBuffer(buffer) || {}
  const form = new FormData()
  form.append('file', new Blob([buffer]), 'file.' + ext)
  const res = await fetch('https://api.filechan.org/upload', { method: 'POST', body: form })
  const json = await res.json()
  if (!json?.success || !json?.files?.length) throw '❌ Error al subir a filechan'
  return json.files[0].url
}

// Upload a pixeldrain
const pixeldrain = async (buffer) => {
  const form = new FormData()
  form.append('file', new Blob([buffer]))
  const res = await fetch('https://pixeldrain.com/api/file', { method: 'POST', body: form })
  const json = await res.json()
  if (!json?.success || !json?.id) throw '❌ Error al subir a pixeldrain'
  return `https://pixeldrain.com/u/${json.id}`
}

// Upload a gofile
const gofile = async (buffer) => {
  const getServer = await fetch('https://api.gofile.io/getServer')
  const { data } = await getServer.json()
  const form = new FormData()
  form.append('file', new Blob([buffer]))
  const res = await fetch(`https://${data.server}.gofile.io/uploadFile`, { method: 'POST', body: form })
  const json = await res.json()
  if (!json?.status || json.status !== 'ok') throw '❌ Error al subir a Gofile'
  return json.data.downloadPage
}

// Upload a krakenfiles
const krakenfiles = async (buffer) => {
  const { ext } = await fileTypeFromBuffer(buffer) || {}
  const form = new FormData()
  form.append('file', new Blob([buffer]), 'file.' + ext)
  const res = await fetch('https://api.krakenfiles.com/v2/file/upload', { method: 'POST', body: form })
  const json = await res.json()
  if (!json?.success) throw '❌ Error al subir a KrakenFiles'
  return json.data.url
}

// Upload a telegra.ph
const telegraph = async (buffer) => {
  const { ext } = await fileTypeFromBuffer(buffer) || {}
  const form = new FormData()
  form.append('file', new Blob([buffer]), 'file.' + ext)
  const res = await fetch('https://telegra.ph/upload', { method: 'POST', body: form })
  const json = await res.json()
  if (!Array.isArray(json)) throw '❌ Error al subir a Telegraph'
  return 'https://telegra.ph' + json[0].src
}

// Exports individuales
export { quax, RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph }

// Subida automática con respaldo
export default async function (inp) {
  const servicios = [quax, RESTfulAPI, catbox, uguu, filechan, pixeldrain, gofile, krakenfiles, telegraph]
  let err = null
  for (const upload of servicios) {
    try {
      const result = await upload(inp)
      console.log(`[UPLOAD OK]`, result)
      return result
    } catch (e) {
      console.log(`[UPLOAD FAIL]`, e)
      err = e
    }
  }
  if (err) throw err
}

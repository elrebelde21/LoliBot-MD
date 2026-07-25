import { promises as fs } from "fs"
import { join, dirname } from "path"
import { spawn } from "child_process"
import { fileURLToPath } from "url"
import path from "path";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url))

function ffmpeg(buffer, args = [], ext = "", ext2 = "") {
  return new Promise(async (resolve, reject) => {
    try {
      const tmpDir = join(__dirname, "../../tmp")
      await fs.mkdir(tmpDir, { recursive: true })
      const tmpFile = join(tmpDir, `${Date.now()}.${ext}`)
      const outFile = `${tmpFile}.${ext2}`

      await fs.writeFile(tmpFile, buffer)
      const ff = spawn("ffmpeg", ["-y", "-i", tmpFile, ...args, outFile])

      ff.stderr.on("data", d => console.log("ffmpeg:", d.toString()))

      ff.on("error", reject)
      ff.on("close", async code => {
        try {
          if (code !== 0) {
            await fs.unlink(tmpFile).catch(() => {})
            return reject(new Error(`ffmpeg exited with code ${code}`))
          }

          const data = await fs.readFile(outFile)
          await fs.unlink(tmpFile).catch(() => {})
          await fs.unlink(outFile).catch(() => {})
          resolve({ data, filename: outFile })
        } catch (e) {
          reject(e)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

// 🎙️ Nota de voz (OGG real con Opus)
// 🎙️ Nota de voz (OGG real con Opus) - MÉTODO 2 PASOS CON BITRATE BAJO
function toPTT(buffer, ext) {
  return new Promise(async (resolve, reject) => {
    try {
      const tmpDir = join(__dirname, "../../tmp")
      await fs.mkdir(tmpDir, { recursive: true })
      
      const tmpFile = join(tmpDir, `${Date.now()}.${ext}`)
      const mp3File = tmpFile + '.mp3'
      const oggFile = tmpFile + '.ogg'
      
      await fs.writeFile(tmpFile, buffer)
      
      // Paso 1: MP3 con bitrate muy bajo
      const ff1 = spawn('ffmpeg', [
        '-y',
        '-i', tmpFile,
        '-vn',
        '-c:a', 'libmp3lame',
        '-b:a', '24k',           // Bitrate bajo
        '-ar', '16000',
        '-ac', '1',
        mp3File
      ])
      
      ff1.on('error', reject)
      ff1.on('close', async (code) => {
        try {
          if (code !== 0) {
            await fs.unlink(tmpFile).catch(() => {})
            return reject(new Error(`ffmpeg MP3 exited with code ${code}`))
          }
          
          // Paso 2: MP3 a OGG con bitrate ultra bajo
          const ff2 = spawn('ffmpeg', [
            '-y',
            '-i', mp3File,
            '-c:a', 'libopus',
            '-b:a', '12k',          // Ultra bajo
            '-vbr', 'on',
            '-compression_level', '10',
            '-ar', '8000',
            '-ac', '1',
            '-application', 'lowdelay',
            '-frame_duration', '60',
            '-f', 'ogg',
            oggFile
          ])
          
          ff2.on('error', reject)
          ff2.on('close', async (code2) => {
            try {
              await fs.unlink(tmpFile).catch(() => {})
              await fs.unlink(mp3File).catch(() => {})
              
              if (code2 !== 0) {
                return reject(new Error(`ffmpeg OGG exited with code ${code2}`))
              }
              
              const data = await fs.readFile(oggFile)
              await fs.unlink(oggFile).catch(() => {})
              
              resolve({ data, filename: oggFile })
            } catch (e) {
              reject(e)
            }
          })
        } catch (e) {
          reject(e)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

// 🎧 Audio MP3 normal
function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    "-vn",
    "-c:a", "libmp3lame",
    "-q:a", "4"
  ], ext, "mp3")
}

// 🎬 Video (para webp o video normal)
function toVideo(buffer, ext) {
  const isWebp = /webp/i.test(ext)
  
  if (isWebp) {
    return ffmpeg(buffer, [
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      "-vf", "fps=30,scale=480:-1:flags=lanczos,pad=480:480:(ow-iw)/2:(oh-ih)/2:black",
      "-t", "6",
      "-movflags", "+faststart",
      "-profile:v", "baseline",
      "-level", "3.0"
    ], ext, "mp4")
  }
  
  return ffmpeg(buffer, [
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "28",
    "-c:a", "aac",
    "-b:a", "128k",
    "-ar", "44100"
  ], ext, "mp4")
}

// 🆕 Convertir sticker animado a video usando sharp para extraer frames
export async function webpToVideoSharp(buffer: Buffer): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      const tmpDir = join(__dirname, "../../tmp")
      await fs.mkdir(tmpDir, { recursive: true })
      
      // Extraer frames con sharp
      const metadata = await sharp(buffer).metadata()
      const pageCount = Math.min(metadata.pages || 1, 30)
      
      console.log(`📸 Extrayendo ${pageCount} frames...`)
      
      const frameDir = join(tmpDir, `frames_${Date.now()}`)
      await fs.mkdir(frameDir, { recursive: true })
      
      let frameCount = 0
      const delays = metadata.delay || []
      
      for (let i = 0; i < pageCount; i++) {
        const frame = await sharp(buffer, { page: i })
          .resize(480, 480, { fit: 'contain', background: { r: 0, g: 0, b: 0 } })
          .png()
          .toBuffer()
        
        await fs.writeFile(join(frameDir, `frame_${String(frameCount).padStart(4, '0')}.png`), frame)
        frameCount++
        
        // Usar delay del sticker para mantener la animación
        const delay = (delays[i] || 100)
        const extraFrames = Math.floor(delay / 100) - 1
        for (let j = 0; j < Math.max(0, extraFrames); j++) {
          await fs.writeFile(join(frameDir, `frame_${String(frameCount).padStart(4, '0')}.png`), frame)
          frameCount++
        }
      }
      
      console.log(`✅ ${frameCount} frames generados`)
      
      // Crear video con ffmpeg
      const outFile = join(tmpDir, `${Date.now()}.mp4`)
      
      const ff = spawn("ffmpeg", [
        "-y",
        "-framerate", "10",
        "-i", `${frameDir}/frame_%04d.png`,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-vf", "scale=480:-1:flags=lanczos,pad=480:480:(ow-iw)/2:(oh-ih)/2:black",
        "-t", "6",
        "-movflags", "+faststart",
        "-profile:v", "baseline",
        "-level", "3.0",
        outFile
      ])
      
      ff.stderr.on("data", d => console.log("ffmpeg:", d.toString()))
      
      ff.on("error", reject)
      ff.on("close", async code => {
        try {
          // Limpiar frames temporales
          await fs.rm(frameDir, { recursive: true, force: true }).catch(() => {})
          
          if (code !== 0) {
            return reject(new Error(`ffmpeg exited with code ${code}`))
          }
          
          const data = await fs.readFile(outFile)
          await fs.unlink(outFile).catch(() => {})
          resolve(data)
        } catch (e) {
          reject(e)
        }
      })
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Convierte un buffer o URL de imagen webp a png
 */
export async function webp2png(input: Buffer | string): Promise<Buffer> {
  try {
    let data: Buffer;

    if (Buffer.isBuffer(input)) {
      data = input;
    } else if (typeof input === "string") {
      const res = await fetch(input);
      data = Buffer.from(await res.arrayBuffer());
    } else {
      throw new Error("Entrada inválida: se esperaba buffer o URL");
    }

    const png = await sharp(data)
      .toFormat("png")
      .toBuffer();

    return png;
  } catch (e: any) {
    console.error("❌ Error en webp2png:", e.message);
    throw e;
  }
}

export { ffmpeg, toPTT, toAudio, toVideo, webpToVideoSharp }
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { ffmpeg } from './converter.js';
import fluent_ffmpeg from 'fluent-ffmpeg';
import { spawn } from 'child_process';
import uploadFile from './uploadFile.js';
import uploadImage from './uploadImage.js';
import { fileTypeFromBuffer } from 'file-type';
import webp from 'node-webpmux';
import fetch from 'node-fetch';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tmp = path.join(__dirname, '../tmp');

function sticker2(img, url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (url) {
        const res = await fetch(url);
        if (res.status !== 200) throw await res.text();
        img = await res.buffer();
      }
      const inp = path.join(tmp, +new Date + '.jpeg');
      await fs.promises.writeFile(inp, img);
      const ff = spawn('ffmpeg', [
        '-y', '-i', inp,
        '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1',
        '-f', 'png', '-'
      ]);
      ff.on('error', reject);
      ff.on('close', async () => {
        await fs.promises.unlink(inp);
      });
      const bufs = [];
      const im = spawn('convert', ['png:-', 'webp:-']);
      im.on('error', reject);
      im.stdout.on('data', chunk => bufs.push(chunk));
      ff.stdout.pipe(im.stdin);
      im.on('exit', () => resolve(Buffer.concat(bufs)));
    } catch (e) {
      reject(e);
    }
  });
}

async function sticker3(img, url, packname, author) {
  url = url ? url : await uploadFile(img);
  const res = await fetch('https://api.xteam.xyz/sticker/wm?' + new URLSearchParams({ url, packname, author }));
  return await res.buffer();
}

async function sticker4(img, url) {
  if (url) {
    const res = await fetch(url);
    if (res.status !== 200) throw await res.text();
    img = await res.buffer();
  }
  return await ffmpeg(img, [
    '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
  ], 'jpeg', 'webp');
}

async function sticker5(img, url, packname, author, categories = [''], extra = {}) {
  const { Sticker } = await import('wa-sticker-formatter');
  const stickerMetadata = { type: 'default', pack: packname, author, categories, ...extra };
  return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
}

async function sticker6(img, url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (url) {
        const res = await fetch(url);
        if (res.status !== 200) throw await res.text();
        img = await res.buffer();
      }

      const { ext = 'mp4' } = await fileTypeFromBuffer(img) || {};
      const inputPath = path.join(tmp, `input_${Date.now()}.${ext}`);
      const outputPath = path.join(tmp, `output_${Date.now()}.webp`);

      await fs.promises.writeFile(inputPath, img);

      fluent_ffmpeg(inputPath)
        .inputOptions('-t', '6') // cortar a 6s por si es largo
        .outputOptions([
          '-vcodec', 'libwebp',
          '-vf', 'scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:-1:-1:color=white@0.0',
          '-loop', '0',
          '-preset', 'default',
          '-an',
          '-vsync', '0'
        ])
        .toFormat('webp')
        .on('end', async () => {
          const buffer = await fs.promises.readFile(outputPath);
          await fs.promises.unlink(inputPath);
          await fs.promises.unlink(outputPath);
          resolve(buffer);
        })
        .on('error', async err => {
          console.error('❌ ffmpeg video error:', err);
          await fs.promises.unlink(inputPath).catch(() => {});
          reject(err);
        })
        .save(outputPath);
    } catch (err) {
      reject(err);
    }
  });
}

async function sticker7(img, url) {
  return new Promise(async (resolve, reject) => {
    try {
      if (url) {
        const res = await fetch(url);
        if (res.status !== 200) throw await res.text();
        img = await res.buffer();
      }

      const { ext = 'mp4' } = await fileTypeFromBuffer(img) || {};
      const inputPath = path.join(tmp, `input_${Date.now()}.${ext}`);
      const outputPath = path.join(tmp, `output_${Date.now()}.webp`);

      await fs.promises.writeFile(inputPath, img);

      fluent_ffmpeg(inputPath)
        .inputOptions('-t', '5') // recorta a máximo 5s
        .outputOptions([
          '-vcodec', 'libwebp',
          '-vf', 'scale=320:320:force_original_aspect_ratio=decrease,fps=10',
          '-loop', '0',
          '-preset', 'default',
          '-an',
          '-vsync', '0'
        ])
        .toFormat('webp')
        .on('end', async () => {
          const buffer = await fs.promises.readFile(outputPath);
          await fs.promises.unlink(inputPath);
          await fs.promises.unlink(outputPath);
          resolve(buffer);
        })
        .on('error', async err => {
          console.error('❌ ffmpeg video error (sticker7):', err);
          await fs.promises.unlink(inputPath).catch(() => {});
          reject(err);
        })
        .save(outputPath);
    } catch (err) {
      reject(err);
    }
  });
}

async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
  const img = new webp.Image();
  const stickerPackId = crypto.randomBytes(32).toString('hex');
  const json = { 'sticker-pack-id': stickerPackId, 'sticker-pack-name': packname, 'sticker-pack-publisher': author, 'emojis': categories, ...extra };
  const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
  const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
  const exif = Buffer.concat([exifAttr, jsonBuffer]);
  exif.writeUIntLE(jsonBuffer.length, 14, 4);
  await img.load(webpSticker);
  img.exif = exif;
  return await img.save(null);
}

async function sticker(img, url, packname, author) {
  let lastError, stiker;
  for (const fn of [sticker6, sticker7, sticker5, sticker4, sticker2, sticker3]) {

    try {
      stiker = await fn(img, url, packname, author);

      if (Buffer.isBuffer(stiker)) {

        if (stiker.includes('WEBP')) {
          try {
            const conExif = await addExif(stiker, packname, author);
            if (Buffer.isBuffer(conExif) && conExif.length > 100) return conExif;
          } catch (e) {
            console.error(e);
            return stiker;
          }
        }
   if (stiker.length > 100) return stiker;
      }

      if (typeof stiker === 'string' && stiker.includes('html')) {
        continue;
      }

    } catch (err) {
      console.error(`❌ Error en ${fn.name}:`, err);
      lastError = err;
    }
  }

  console.error(lastError);
  throw lastError || new Error('No se pudo generar el sticker');
}

export {
  sticker,
  sticker2,
  sticker3,
  sticker4,
  sticker5,
  sticker6,
  addExif
};

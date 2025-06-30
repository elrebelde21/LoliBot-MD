import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      const tmpFile = join(__dirname, '../tmp', Date.now() + '.' + ext);
      const outFile = tmpFile + '.' + ext2;

      await fs.writeFile(tmpFile, buffer);

      spawn('ffmpeg', ['-y', '-i', tmpFile, ...args, outFile])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await fs.unlink(tmpFile);
            if (code !== 0) return reject(new Error(`ffmpeg exited with code ${code}`));

            const data = await fs.readFile(outFile);
            await fs.unlink(outFile);

            resolve({
              data,
              filename: outFile,
              delete() {
                return fs.unlink(outFile);
              }
            });
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}

function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
  ], ext, 'ogg');
}

function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10',
  ], ext, 'opus');
}

function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow',
  ], ext, 'mp4');
}

export {
  ffmpeg,
  toPTT,
  toAudio,
  toVideo,
};

import fetch from 'node-fetch'
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import FormData from 'form-data';
import WebSocket from 'ws';
import * as cheerio from 'cheerio';
import { CookieJar } from 'tough-cookie';
import crypto from 'crypto';

const perplexity = {
  api: {
    base: 'https://api.perplexity.ai/chat/completions',
    
    models: {
      'sonar-medium-online': {
        description: 'Online-enabled medium model',
        context: 12000
      },
      'sonar-small-online': {
        description: 'Online-enabled small model',
        context: 12000
      },
      'sonar-medium-chat': {
        description: 'Optimized medium chat model',
        context: 12000
      },
      'sonar-small-chat': {
        description: 'Optimized small chat model', 
        context: 12000
      },
      'sonar-reasoning-pro': {
        description: 'Advanced reasoning model with enhanced capabilities',
        context: 16384
      },
      'sonar-reasoning': {
        description: 'Balanced reasoning model',
        context: 8192
      },
      'sonar-pro': {
        description: 'Enhanced general purpose model',
        context: 8192
      },
      'sonar': {
        description: 'Fast and efficient model',
        context: 4096
      },
      'mixtral-8x7b-instruct': {
        description: 'Mixtral instruction model',
        context: 8192
      },
      'codellama-70b-instruct': {
        description: 'Code specialized model',
        context: 8192
      },
      'llama-2-70b-chat': {
        description: 'LLaMA 2 chat model',
        context: 4096
      }
    },

    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Postify/1.0.0'
    },

    keys: [
      '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',
      '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',
      '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',
      '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'
    ],

    retry: {
      maxAttempts: 3,
      delayMs: 2000,
      timeoutMs: 60000
    }
  },

  isParams: (messages, model, temperature) => {
    const errors = [];

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      errors.push({
        param: 'messages',
        error: 'Udah capek yak gua ngasih tau lu, input tuh minimal diisi napa 🗿',
        example: [{
          role: 'user',
          content: 'inputnya disini yakk'
        }]
      });
    } else {
      messages.forEach((msg, index) => {
        if (!msg.role || !msg.content) {
          errors.push({
            param: `messages[${index}]`,
            error: 'Format message lu ngaco anjirr 🗿',
            example: {
              role: 'user/assistant',
              content: 'inputnya disini yakk'
            }
          });
        }
      });
    }

    if (!model) {
      errors.push({
        param: 'model',
        error: 'Literally modelnya kagak diisi bree?? Minimal input lah 1 mah 🗿',
        available: Object.keys(perplexity.api.models)
      });
    } else if (!perplexity.api.models[model]) {
      errors.push({
        param: 'model',
        error: 'Model yang lu pilih kagak ada bree! Pilih aja salah satu dari list ini yak ..',
        available: Object.keys(perplexity.api.models)
      });
    }

    if (temperature === undefined || temperature === null) {
      errors.push({
        param: 'temperature',
        error: 'Temperaturenya mana bree?! Kagak kosong begini dong 🗿',
        range: '0.0 - 1.0',
        recommended: 0.7
      });
    } else if (temperature < 0 || temperature > 1) {
      errors.push({
        param: 'temperature',
        error: 'Temperaturenya kebanyakan atau kurang ngab! Rangenya 0-1 doang yak 🙃',
        range: '0.0 - 1.0',
        recommended: 0.7
      });
    }

    return errors;
  },

  key: () => perplexity.api.keys[Math.floor(Math.random() * perplexity.api.keys.length)],

  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  retry: async (operation, attempt = 1) => {
    try {
      return await operation();
    } catch (error) {
      if (attempt >= perplexity.api.retry.maxAttempts) {
        throw error;
      }

      console.log(`🔄 Ngetry attempt yang ke-${attempt}, nunggu ${perplexity.api.retry.delayMs}ms yak bree 😂...`);
      console.error(error.message);

      await perplexity.delay(perplexity.api.retry.delayMs * attempt);
      return await perplexity.retry(operation, attempt + 1);
    }
  },

  createAxiosInstance: () => axios.create({
    baseURL: perplexity.api.base,
    timeout: perplexity.api.retry.timeoutMs,
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  }),

  getHeaders: (apiKey) => {
    return {
      'Authorization': `Bearer ${apiKey}`,
      ...perplexity.api.headers
    };
  },

  chat: async (messages, model = 'sonar', temperature = 0.7) => {
    const ve = perplexity.isParams(messages, model, temperature);
    if (ve.length > 0) {
      return {
        status: false,
        code: 400,
        result: {
          error: 'Parameter lu pada ngaco semua anjiir 🌝',
          details: ve
        }
      };
    }

    return await perplexity.retry(async () => {
      const axiosInstance = perplexity.createAxiosInstance();
      const perplexityKey = perplexity.key();

      try {
        const response = await axiosInstance.post('', {
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: 4096,
          stream: false
        }, {
          headers: perplexity.getHeaders(perplexityKey)
        });

        return {
          status: true,
          code: 200,
          result: {
            response: response.data.choices[0].message.content,
            model: {
              name: model,
              ...perplexity.api.models[model]
            }
          }
        };

      } catch (error) {
        const e = {
          status: false,
          code: error.response?.status || 500,
          result: {
            error: 'Error bree 🗿',
            details: `${error.message}`,
            solution: 'Coba lagi nanti aja bree, sapa tau berhasil nanti 😂'
          }
        };
        throw e;
      }
    });
  },

  stream: async (messages, model = 'sonar', temperature = 0.7, onChunk) => {
    const ve = perplexity.isParams(messages, model, temperature);
    if (ve.length > 0) {
      return {
        status: false,
        code: 400,
        result: {
          error: 'Parameter lu pada ngaco semua bree 😫',
          details: ve
        }
      };
    }

    if (typeof onChunk !== 'function') {
      return {
        status: false,
        code: 400,
        result: {
          error: 'Function callbacknya mana bree?! 😤',
          details: [{
            param: 'onChunk',
            error: 'Kudu pake callback function buat streaminnya bree!',
            example: '(chunk) => console.log(chunk)'
          }]
        }
      };
    }

    return await perplexity.retry(async () => {
      const axiosInstance = perplexity.createAxiosInstance();
      const perplexityKey = perplexity.key();

      try {
        const response = await axiosInstance.post('', {
          model: model,
          messages: messages,
          temperature: temperature,
          max_tokens: 4096,
          stream: true
        }, {
          headers: perplexity.getHeaders(perplexityKey),
          responseType: 'stream'
        });

        let pull = '';
        
        for await (const chunk of response.data) {
          const lines = chunk.toString().split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const result = JSON.parse(line.slice(5));
                if (result.choices?.[0]?.delta?.content) {
                  const content = result.choices[0].delta.content;
                  pull += content;
                  onChunk(content);
                }
              } catch (e) {
                if (!line.includes('[DONE]')) {
                  console.warn('❌ Gagal parse chunknya bree: ', e);
                }
              }
            }
          }
        }

        return {
          status: true,
          code: 200,
          result: {
            response: pull,
            model: {
              name: model,
              ...perplexity.api.models[model]
            }
          }
        };

      } catch (error) {
        const e = {
          status: false,
          code: error.response?.status || 500,
          result: {
            error: 'Streamingnya error bree 😑',
            details: error.message,
            solution: 'Reset ulang aja dah streamingnya bree 🔄'
          }
        };
        throw e;
      }
    });
  }
};

const amdl = {
  api: {
    base: {
      video: 'https://amp4.cc',
      audio: 'https://amp3.cc'
    }
  },
  headers: {
    Accept: 'application/json',
    'User-Agent': 'Postify/1.0.0',
  },
  jar: new CookieJar(),
  client: wrapper(axios.create({ jar: new CookieJar() })),

  ytRegex: /^((?:https?:)?\/\/)?((?:www|m|music)\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?([a-zA-Z0-9_-]{11})/,

  formats: {
    video: ['144p', '240p', '360p', '480p', '720p', '1080p'],
    audio: ['64k', '128k', '192k', '256k', '320k']
  },

  captcha: {
    hashChallenge: async function(salt, number, algorithm) {
      return crypto.createHash(algorithm.toLowerCase()).update(salt + number).digest('hex');
    },

    verifyChallenge: async function(challengeData, salt, algorithm, maxNumber) {
      for (let i = 0; i <= maxNumber; i++) {
        if (await this.hashChallenge(salt, i, algorithm) === challengeData) {
          return { number: i, took: Date.now() };
        }
      }
      throw new Error('Captcha verification failed.');
    },

    solve: async function(challenge) {
      const { algorithm, challenge: challengeData, salt, maxnumber, signature } = challenge;
      const solution = await this.verifyChallenge(challengeData, salt, algorithm, maxnumber);
      return Buffer.from(
        JSON.stringify({
          algorithm,
          challenge: challengeData,
          number: solution.number,
          salt,
          signature,
          took: solution.took,
        })
      ).toString('base64');
    },
  },

  isUrl: async function(url) {
    if (!url) {
      return {
        status: false,
        code: 400,
        result: {
          error: "Linknya mana? Yakali download kagak ada linknya 🗿"
        }
      };
    }

    if (!this.ytRegex.test(url)) {
      return {
        status: false,
        code: 400,
        result: {
          error: "Lu masukin link apaan sih 🗿 Link Youtube aja bree, kan lu mau download youtube 👍🏻"
        }
      };
    }

    return {
      status: true,
      code: 200,
      id: url.match(this.ytRegex)[3]
    };
  },

  convert: async function(url, format, quality, isAudio = false) {
    try {
      const linkx = await this.isUrl(url);
      if (!linkx.status) return linkx;

      const formatx = isAudio ? this.formats.audio : this.formats.video;
      if (!quality || !formatx.includes(quality)) {
        return {
          status: false,
          code: 400,
          result: {
            error: "Formatnya kagak ada bree, pilih yang udah disediain aja yak, jangan nyari yang gak ada 🗿",
            available_fmt: formatx
          }
        };
      }

      const fixedURL = `https://youtu.be/${linkx.id}`;
      const base = isAudio ? this.api.base.audio : this.api.base.video;

      const pages = await this.client.get(`${base}/`);
      const $ = cheerio.load(pages.data);
      const csrfToken = $('meta[name="csrf-token"]').attr('content');

      if (!csrfToken) {
        return {
          status: false,
          code: 500,
          result: {
            error: "CSRFnya kagak ada bree 🙃 lagi problem keknya.. "
          }
        };
      }

      const form = new FormData();
      form.append('url', fixedURL);
      form.append('format', format);
      form.append('quality', quality);
      form.append('service', 'youtube');
      
      if (isAudio) {
        form.append('playlist', 'false');
      }

      form.append('_token', csrfToken);

      const captchaX = await this.client.get(`${base}/captcha`, {
        headers: { 
          ...this.headers,
          Origin: base,
          Referer: `${base}/`
        },
      });
      
      if (captchaX.data) {
        const solvedCaptcha = await this.captcha.solve(captchaX.data);
        form.append('altcha', solvedCaptcha);
      }

      const endpoint = isAudio ? '/convertAudio' : '/convertVideo';
      const res = await this.client.post(`${base}${endpoint}`, form, {
        headers: { 
          ...form.getHeaders(),
          ...this.headers,
          Origin: base,
          Referer: `${base}/`
        },
      });

      if (!res.data.success) {
        return {
          status: false,
          code: 400,
          result: {
            error: res.data.message
          }
        };
      }

      const ws = await this.connect(res.data.message, isAudio);
      const dlink = `${base}/dl/${ws.worker}/${res.data.message}/${encodeURIComponent(ws.file)}`;

      return {
        status: true,
        code: 200,
        result: {
          title: ws.title || "Gak tau 🤷🏻",
          type: isAudio ? 'audio' : 'video',
          format: format,
          thumbnail: ws.thumbnail || `https://i.ytimg.com/vi/${linkx.id}/maxresdefault.jpg`,
          download: dlink,
          id: linkx.id,
          duration: ws.duration,
          quality: quality,
          uploader: ws.uploader
        }
      };

    } catch (error) {
      return {
        status: false,
        code: 500,
        result: {
          error: "Error ceunah 😂"
        }
      };
    }
  },

  connect: async function(id, isAudio = false) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`wss://${isAudio ? 'amp3' : 'amp4'}.cc/ws`, ['json'], {
        headers: { 
          ...this.headers,
          Origin: `https://${isAudio ? 'amp3' : 'amp4'}.cc`
        },
        rejectUnauthorized: false,
      });

      let fileInfo = {};
      let timeoutId = setTimeout(() => {
        ws.close();
        reject({
          status: false,
          code: 408,
          result: {
            error: "Connection timeout, Servernya kagak ngeresponse ceunah bree 🤣"
          }
        });
      }, 30000);

      ws.on('open', () => ws.send(id));
      ws.on('message', (data) => {
        const res = JSON.parse(data);
        if (res.event === 'query' || res.event === 'queue') {
          fileInfo = { thumbnail: res.thumbnail, title: res.title, duration: res.duration, uploader: res.uploader };
        } else if (res.event === 'file' && res.done) {
          clearTimeout(timeoutId);
          ws.close();
          resolve({ ...fileInfo, ...res });
        }
      });
      ws.on('error', (err) => {
        clearTimeout(timeoutId);
        reject({
          status: false,
          code: 500,
          result: {
            error: "Yaelah, nih server jelek amat yakk.. Gagal tersambung mulu etdah 😂"
          }
        });
      });
    });
  },

  download: async function(url, format = '720p') {
    try {
      const isAudio = format === 'mp3';
      return await this.convert(
        url,
        isAudio ? 'mp3' : 'mp4',
        isAudio ? '128k' : format,
        isAudio
      );
    } catch (error) {
      return {
        status: false,
        code: 500,
        result: {
          error: "Error euy 🤣"
        }
      };
    }
  }
};

const ytdown = {
  api: {
    base: "https://p.oceansaver.in/ajax/",
    progress: "https://p.oceansaver.in/ajax/progress.php"
  },
  headers: {
    'authority': 'p.oceansaver.in',
    'origin': 'https://y2down.cc',
    'referer': 'https://y2down.cc/',
    'user-agent': 'Postify/1.0.0'
  },
  formats: ['360', '480', '720', '1080', '1440', '2160', 'mp3', 'm4a', 'wav', 'aac', 'flac', 'opus', 'ogg'],

  isUrl: str => { try { new URL(str); return true; } catch (_) { return false; } },

  youtube: url => {
    if (!url) return null;
    const a = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    for (let b of a) {
      if (b.test(url)) return url.match(b)[1];
    }
    return null;
  },

  request: async (endpoint, params = {}) => {
    try {
      const { data } = await axios.get(`${ytdown.api.base}${endpoint}`, {
        params, headers: ytdown.headers, withCredentials: true
      });
      return data;
    } catch (error) {
      console.error(error.message, error.response?.data);
      throw error;
    }
  },

  download: async (link, format) => {
    if (!link) return { error: "Linknya mana? Yakali download kagak ada linknya 🗿" };
    if (!ytdown.isUrl(link)) return { error: "Lu masukin link apaan sih 🗿 Link Youtube aja bree, kan lu mau download youtube 👍🏻" };
    if (!format || !ytdown.formats.includes(format)) return {
      error: "Formatnya kagak ada bree, pilih yang udah disediain aja yak, jangan nyari yang gak ada 🗿",
      availableFormats: ytdown.formats
    };

    const id = ytdown.youtube(link);
    if (!id) return { error: "Kagak bisa ekstrak link youtubenya nih, btw link youtubenya yang bener yak.. biar kagak kejadian begini lagi 😂" };

    try {
      const response = await ytdown.request("download.php", { format, url: `https://www.youtube.com/watch?v=${id}` });
      return ytdown.handler(response, format, id);
    } catch (error) {
      return { 
        error: `${error.message}`,
        details: error.response?.data
      };
    }
  },

  handler: async (data, format, id) => {
    if (!data.success) return { error: data.message || "Error" };
    if (!data.id) return { error: "ID Downloadnya kagak ada bree, jadi proses downloadnya kagak dilanjutin 😂" };

    try {
      const pr = await ytdown.checkProgress(data.id);
      return pr.success ? ytdown.final(data, pr, format, id) : pr;
    } catch (error) {
      return { error: `${error.message}` };
    }
  },

  checkProgress: async (id) => {
    let attempts = 0, lastProgress = -1;
    process.stdout.write("✨ Progress: [                              ] 0%");

    while (attempts < 100) {
      try {
        const { data } = await axios.get(ytdown.api.progress, {
          params: { id }, headers: ytdown.headers, withCredentials: true
        });

        const currentProgress = Math.round(data.progress / 10);
        if (currentProgress !== lastProgress) {
          ytdown.updateBar(currentProgress);
          lastProgress = currentProgress;
        }

        if (data.download_url && data.success) {
          return { success: true, ...data };
        } else if (!data.download_url && data.success) {
          return { error: data.text };
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      } catch (error) {
        console.error("\n", error);
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return { error: "Proses downloadnya kagak bisa di lanjutin bree, Timeout 😂" };
  },

  updateBar: (progress) => {
    const barLength = 30;
    const filledLength = Math.round(barLength * progress / 100);
    const bar = '█'.repeat(filledLength) + ' '.repeat(barLength - filledLength);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`✨ Progress: [${bar}] ${progress}%\n\n`);
  },

  final: (init, pro, formats, id) => ({
    success: true,
    title: init.title || "Idk 🤷🏻",
    type: ['360', '480', '720', '1080', '1440', '2160'].includes(formats) ? 'video' : 'audio',
    formats,
    thumbnail: init.info?.image || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    download: pro.download_url || "Idk 🤷🏻",
    id: id
  })
};

async function sekaikomikDl(url) {
	let res = await fetch(url)
	let $ = cheerio.load(await res.text())
	let data = $('script').map((idx, el) => $(el).html()).toArray()
	data = data.filter(v => /wp-content/i.test(v))
	data = eval(data[0].split('"images":')[1].split('}],')[0])
	return data.map(v => encodeURI(v))
}

async function facebookDl(url) {
	let res = await fetch('https://fdownloader.net/')
	let $ = cheerio.load(await res.text())
	let token = $('input[name="__RequestVerificationToken"]').attr('value')
	let json = await (await fetch('https://fdownloader.net/api/ajaxSearch', {
		method: 'post',
		headers: {
			cookie: res.headers.get('set-cookie'),
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			referer: 'https://fdownloader.net/'
		},
		body: new URLSearchParams(Object.entries({ __RequestVerificationToken: token, q: url }))
	})).json()
	let $$ = cheerio.load(json.data)
	let result = {}
	$$('.button.is-success.is-small.download-link-fb').each(function () {
		let quality = $$(this).attr('title').split(' ')[1]
		let link = $$(this).attr('href')
		if (link) result[quality] = link
	})
	return result
}
//--
 
  async function tiktokStalk(user) {
  let res = await axios.get(`https://urlebird.com/user/${user}/`)
  let $ = cheerio.load(res.data), obj = {}
  obj.pp_user = $('div[class="col-md-auto justify-content-center text-center"] > img').attr('src')
  obj.name = $('h1.user').text().trim()
  obj.username = $('div.content > h5').text().trim()
  obj.followers = $('div[class="col-7 col-md-auto text-truncate"]').text().trim().split(' ')[1]
  obj.following = $('div[class="col-auto d-none d-sm-block text-truncate"]').text().trim().split(' ')[1]
  obj.description = $('div.content > p').text().trim()
  return obj
} 
//--
async function igStalk(username) {
    username = username.replace(/^@/, '')
    const html = await (await fetch(`https://dumpor.com/v/${username}`)).text()
    const $$ = cheerio.load(html)
    const name = $$('div.user__title > a > h1').text().trim()
    const Uname = $$('div.user__title > h4').text().trim()
    const description = $$('div.user__info-desc').text().trim()
    const profilePic = $$('div.user__img').attr('style')?.replace("background-image: url('", '').replace("');", '')
    const row = $$('#user-page > div.container > div > div > div:nth-child(1) > div > a')
    const postsH = row.eq(0).text().replace(/Posts/i, '').trim()
    const followersH = row.eq(2).text().replace(/Followers/i, '').trim()
    const followingH = row.eq(3).text().replace(/Following/i, '').trim()
    const list = $$('ul.list > li.list__item')
    const posts = parseInt(list.eq(0).text().replace(/Posts/i, '').trim().replace(/\s/g, ''))
    const followers = parseInt(list.eq(1).text().replace(/Followers/i, '').trim().replace(/\s/g, ''))
    const following = parseInt(list.eq(2).text().replace(/Following/i, '').trim().replace(/\s/g, ''))
    return {
        name,
        username: Uname,
        description,
        postsH,
        posts,
        followersH,
        followers,
        followingH,
        following,
        profilePic
    }
}

export { perplexity, amdl, ytdown, sekaikomikDl, igStalk, facebookDl,  tiktokStalk }

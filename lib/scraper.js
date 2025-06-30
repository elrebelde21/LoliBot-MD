import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import * as cheerio from 'cheerio';
import { CookieJar } from 'tough-cookie';

//-------------------[IA BLACKBOXAI]--------------------

async function blackboxAi(query) {
  try {
    const headers = {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'id-ID,id;q=0.9',
      'Content-Type': 'application/json',
      'Origin': 'https://www.blackbox.ai',
      'Referer': 'https://www.blackbox.ai/',
      'Sec-Ch-Ua': '"Chromium";v="137", "Not/A)Brand";v="24"',
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': '"Android"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
    };

    const payload = {
      messages: [{ role: 'user', content: query, id: '0quFtyH' }],
      id: 'KB5EUHk',
      previewToken: null,
      userId: null,
      codeModelMode: true,
      trendingAgentMode: {},
      isMicMode: false,
      userSystemPrompt: null,
      maxTokens: 1024,
      playgroundTopP: null,
      playgroundTemperature: null,
      isChromeExt: false,
      githubToken: '',
      clickedAnswer2: false,
      clickedAnswer3: false,
      clickedForceWebSearch: false,
      visitFromDelta: false,
      isMemoryEnabled: false,
      mobileClient: false,
      userSelectedModel: null,
      validated: '00f37b34-a166-4efb-bce5-1312d87f2f94',
      imageGenerationMode: false,
      webSearchModePrompt: false,
      deepSearchMode: false,
      domains: null,
      vscodeClient: false,
      codeInterpreterMode: false,
      customProfile: {
        name: '',
        occupation: '',
        traits: [],
        additionalInfo: '',
        enableNewChats: false
      },
      webSearchModeOption: {
        autoMode: true,
        webMode: false,
        offlineMode: false
      },
      session: null,
      isPremium: false,
      subscriptionCache: null,
      beastMode: false,
      reasoningMode: false,
      designerMode: false,
      workspaceId: '',
      asyncMode: false,
      isTaskPersistent: false
    };

    const postRes = await axios.post('https://www.blackbox.ai/api/chat', payload, {
      headers
    });

    const raw = postRes.data;
    const parsed = raw.split('$~~~$');
    if (parsed.length === 1) {
      return {
        creator: "elrebelde21",
        status: true,
        data: {
          response: parsed[0].trim(),
          source: []
        }
      };
    } else if (parsed.length >= 3) {
      const resultText = parsed[2].trim();
      const resultSources = JSON.parse(parsed[1]);
      return {
        creator: "elrebelde21",
        status: true,
        data: {
          response: resultText,
          source: resultSources.map(s => ({
            link: s.link,
            title: s.title,
            snippet: s.snippet,
            position: s.position
          }))
        }
      };
    } else {
      throw new Error("Format response tidak dikenali.");
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err.message);
    return {
      creator: "elrebelde21",
      status: false,
      error: err.message
    };
  }
}

//-------------------[IA EXOML]--------------------

const exoml = {
    getRandom: () => {
        const gen = (length, charSet = {}) => {
            const l = "abcdefghijklmnopqrstuvwxyz" // lowercase
            const u = l.toUpperCase() // uppercase
            const s = "-_" // symbol
            const n = "0123456789" // number

            let cs = "" // character set
            const { lowerCase = false, upperCase = false, symbol = false, number = false } = charSet

            if (!lowerCase && !upperCase && !symbol && !number) {
                cs += l + u + s + n
            } else {
                if (lowerCase) cs += l
                if (upperCase) cs += u
                if (symbol) cs += s
                if (number) cs += n
            }

            const result = Array.from({ length }, (_ => cs[Math.floor(Math.random() * cs.length)])).join("") || null
            return result
        }

        const id = gen(16, { upperCase: true, lowerCase: true, number: true }) //TXulzbGqk0EDzPeT
        const chatId = `chat-${new Date().getTime()}-${gen(9, { lowerCase: true, number: true })}` //chat-1749292523602-k0tna5ef8
        const userId = `local-user-${new Date().getTime()}-${gen(9, { lowerCase: true, number: true })}` //local-user-1749292766705-b49yu10mm
        const antiBotId = `${gen(32)}-${gen(8, { number: true, lowerCase: true })}` //jUxRXb2xJbf8BVmIn2NGhncRQePiIiNE-8gvna4dd
        return { id, chatId, userId, antiBotId }
    },

    generate: async (messages, systemPrompt, model) => {

        const body = JSON.stringify(
            {
                messages,
                systemPrompt,
                model,
                "isAuthenticated": true,
                ...exoml.getRandom()
            }
        )

        const headers = {
            "content-type": "application/json",
        }

        const response = await fetch("https://exomlapi.com/api/chat", {
            headers,
            body,
            "method": "post"
        })

        if (!response.ok) throw Error(`woops.. response is not ok! ${response.status} ${response.statusText}\n\n${await response.text()}`)

        const data = await response.text()
        
        // aku buruk dalam memparsing ini
        const anu = [...data.matchAll(/^0:"(.*?)"$/gm)].map(v => v[1]).join("").replaceAll("\\n","\n").replaceAll("\\\"","\"")
        if (!anu) throw Error(`gagal parsing pesan dari server, kemungkinan pesan kosong / error.\n\n${data}`)
        return anu

    }
}

// cara pakai
const yourQuestion = "apa bedanya undefined dan null pada javascript"
const systemPrompt = "balas singkat. tidak bertele tele. straight to the poin."

const modelList = [
    "llama",
    "gemma",
    "qwen-3-235b",
    "gpt-4.1",
    "gpt-4o",
    "gpt-4o-mini",
    "llama-4-scout",
    "llama-4-maverick",
    "deepseek-r1",
    "qwq-32b"]
    
const model = modelList[3] //gpt-4.1

const messages = [
    {
        "role": "user",
        "content": "halo",

    },
    {
        "role": "assistant",
        "content": "Halo! Ada yang bisa saya bantu?",

    },
    {
        "role": "user",
        "content": yourQuestion,

    }
]

//-------------------[IA PERPLEXITY]--------------------

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

//----------------------[Pinterest]---------------------------
const pinterest = {
    api: {
        base: "https://www.pinterest.com",
        endpoints: {
            search: "/resource/BaseSearchResource/get/",
            pin: "/resource/PinResource/get/",
            user: "/resource/UserResource/get/"
        }
    },

    headers: {
        'accept': 'application/json, text/javascript, */*, q=0.01',
        'referer': 'https://www.pinterest.com/',
        'user-agent': 'Postify/1.0.0',
        'x-app-version': 'a9522f',
        'x-pinterest-appstate': 'active',
        'x-pinterest-pws-handler': 'www/[username]/[slug].js',
        'x-pinterest-source-url': '/search/pins/?rs=typed&q=kucing%20anggora/',
        'x-requested-with': 'XMLHttpRequest'
    },

    isUrl: (str) => {
        try {
            new URL(str);
            return true;
        } catch (_) {
            return false;
        }
    },

    isPin: (url) => {
    if (!url) return false;
    const patterns = [
        /^https?:\/\/(?:www\.)?pinterest\.com\/pin\/[\w.-]+/,
        /^https?:\/\/(?:www\.)?pinterest\.[\w.]+\/pin\/[\w.-]+/,
        /^https?:\/\/(?:www\.)?pinterest\.(?:ca|co\.uk|com\.au|de|fr|id|es|mx|br|pt|jp|kr|nz|ru|at|be|ch|cl|dk|fi|gr|ie|nl|no|pl|pt|se|th|tr)\/pin\/[\w.-]+/,
        /^https?:\/\/pin\.it\/[\w.-]+/,
        /^https?:\/\/(?:www\.)?pinterest\.com\/amp\/pin\/[\w.-]+/,
        /^https?:\/\/(?:[a-z]{2}|www)\.pinterest\.com\/pin\/[\w.-]+/,
        /^https?:\/\/(?:www\.)?pinterest\.com\/pin\/[\d]+(?:\/)?$/,
        /^https?:\/\/(?:www\.)?pinterest\.[\w.]+\/pin\/[\d]+(?:\/)?$/,
        /^https?:\/\/(?:www\.)?pinterestcn\.com\/pin\/[\w.-]+/,
        /^https?:\/\/(?:www\.)?pinterest\.com\.[\w.]+\/pin\/[\w.-]+/
    ];
    
    const clean = url.trim().toLowerCase();   
    return patterns.some(pattern => pattern.test(clean));
},

    getCookies: async () => {
        try {
            const response = await axios.get(pinterest.api.base);
            const setHeaders = response.headers['set-cookie'];
            if (setHeaders) {
                const cookies = setHeaders.map(cookieString => {
                    const cp = cookieString.split(';');
                    const cv = cp[0].trim();
                    return cv;
                });
                return cookies.join('; ');
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    search: async (query, limit = 10) => {
        if (!query) {
            return {
                status: false,
                code: 400,
                result: {
                    message: "[ ❌ ] ¡Hermano, qué escribiste? ¿El query está literalmente vacío? ¿Crees que tengo un tercer ojo para adivinar? ¡Esfuérzate un poco, por favor!"
                }
            };
        }

        try {
            const cookies = await pinterest.getCookies();
            if (!cookies) {
                return {
                    status: false,
                    code: 400,
                    result: { 
                        message: "[ ❌ ] No pude obtener las cookies, intenta de nuevo más tarde, ¿ya?" 
                    }
                };
            }

            const params = {
                source_url: `/search/pins/?q=${query}`,
                data: JSON.stringify({
                    options: {
                        isPrefetch: false,
                        query: query,
                        scope: "pins",
                        bookmarks: [""],
                        no_fetch_context_on_resource: false,
                        page_size: limit
                    },
                    context: {}
                }),
                _: Date.now()
            };

            const { data } = await axios.get(`${pinterest.api.base}${pinterest.api.endpoints.search}`, {
                headers: { ...pinterest.headers, 'cookie': cookies },
                params: params
            });

            const container = [];
            const results = data.resource_response.data.results.filter((v) => v.images?.orig);
            
            results.forEach((result) => {
                container.push({
                    id: result.id,
                    title: result.title || "",
                    description: result.description,
                    pin_url: `https://pinterest.com/pin/${result.id}`,
                    media: {
                        images: {
                            orig: result.images.orig,
                            small: result.images['236x'],
                            medium: result.images['474x'],
                            large: result.images['736x']
                        },
                        video: result.videos ? {
                            video_list: result.videos.video_list,
                            duration: result.videos.duration,
                            video_url: result.videos.video_url
                        } : null
                    },
                    uploader: {
                        username: result.pinner.username,
                        full_name: result.pinner.full_name,
                        profile_url: `https://pinterest.com/${result.pinner.username}`
                    }
                });
            });

            if (container.length === 0) {
                return {
                    status: false,
                    code: 404,
                    result: {
                        message: `[ ❌ ] ¡Qué desastre, hermano! No encontré nada con "${query}". En serio, tus habilidades de búsqueda necesitan mejorar, sin ofender, ¡esfuérzate más!`
                    }
                };
            }

            return {
                status: true,
                code: 200,
                result: {
                    query: query,
                    total: container.length,
                    pins: container
                }
            };

        } catch (error) {
            return {
                status: false,
                code: error.response?.status || 500,
                result: { 
                    message: "[ ❌ ] ¡El servidor está en caos, hermano! Me molestas todo el tiempo, necesita un descanso. Intenta de nuevo más tarde, ¿ok?" 
                }
            };
        }
    },

    download: async (pinUrl) => {
        if (!pinUrl) {
            return {
                status: false,
                code: 400,
                result: {
                    message: "[ ❌ ] ¿Me diste un link vacío, hermano? ¿En serio? ¿Quieres que descargue aire? ¡Esfuérzate un poco, estoy cansado!"
                }
            };
        }

        if (!pinterest.isUrl(pinUrl)) {
            return {
                status: false,
                code: 400,
                result: {
                    message: "[ ❌ ] ¿Qué link es este? ¡No sabes ni lo básico de URLs, qué locura!"
                }
            };
        }

        if (!pinterest.isPin(pinUrl)) {
            return {
                status: false,
                code: 400,
                result: {
                    message: "[ ❌ ] ¡Por favor, esto no es un link de Pinterest, hermano!"
                }
            };
        }

        try {
            const pinId = pinUrl.split('/pin/')[1].replace('/', '');
            const cookies = await pinterest.getCookies();
            
            if (!cookies) {
                return {
                    status: false,
                    code: 400,
                    result: {
                        message: "[ ❌ ] No pude obtener las cookies, intenta de nuevo más tarde, ¿ya?"
                    }
                };
            }

            const params = {
                source_url: `/pin/${pinId}/`,
                data: JSON.stringify({
                    options: {
                        field_set_key: "detailed",
                        id: pinId,
                    },
                    context: {}
                }),
                _: Date.now()
            };

            const { data } = await axios.get(`${pinterest.api.base}${pinterest.api.endpoints.pin}`, {
                headers: { ...pinterest.headers, 'cookie': cookies },
                params: params
            });

            if (!data.resource_response.data) {
                return {
                    status: false,
                    code: 404,
                    result: {
                        message: "[ ❌ ] El pin ya no existe, hermano, se fue, expiró, ¡borrado del planeta! Busca algo que exista, me cansé de explicarte."
                    }
                };
            }

            const pd = data.resource_response.data;
            const mediaUrls = [];

            if (pd.videos) {
                const videoFormats = Object.values(pd.videos.video_list)
                    .sort((a, b) => b.width - a.width);
                
                videoFormats.forEach(video => {
                    mediaUrls.push({
                        type: 'video',
                        quality: `${video.width}x${video.height}`,
                        width: video.width,
                        height: video.height,
                        duration: pd.videos.duration || null,
                        url: video.url,
                        file_size: video.file_size || null,
                        thumbnail: pd.images.orig.url
                    });
                });
            }

            if (pd.images) {
                const imge = {
                    'original': pd.images.orig,
                    'large': pd.images['736x'],
                    'medium': pd.images['474x'],
                    'small': pd.images['236x'],
                    'thumbnail': pd.images['170x']
                };

                Object.entries(imge).forEach(([quality, image]) => {
                    if (image) {
                        mediaUrls.push({
                            type: 'image',
                            quality: quality,
                            width: image.width,
                            height: image.height,
                            url: image.url,
                            size: `${image.width}x${image.height}`
                        });
                    }
                });
            }

            if (mediaUrls.length === 0) {
                return {
                    status: false,
                    code: 404,
                    result: {
                        message: "[ ❌ ] ¡Qué desastre, hermano! El pin no tiene medios. ¿Qué esperas que descargue, solo vibes? ¡Qué locura!"
                    }
                };
            }

            return {
                status: true,
                code: 200,
                result: {
                    id: pd.id,
                    title: pd.title || pd.grid_title || "",
                    description: pd.description || "",
                    created_at: pd.created_at,
                    dominant_color: pd.dominant_color || null,
                    link: pd.link || null,
                    category: pd.category || null,
                    media_urls: mediaUrls,
                    statistics: {
                        saves: pd.repin_count || 0,
                        comments: pd.comment_count || 0,
                        reactions: pd.reaction_counts || {},
                        total_reactions: pd.total_reaction_count || 0,
                        views: pd.view_count || 0,
                        saves_by_category: pd.aggregated_pin_data?.aggregated_stats || {},
                    },
                    source: {
                        name: pd.domain || null,
                        url: pd.link || null,
                        favicon: pd.favicon_url || null,
                        provider: pd.provider_name || null,
                        rating: pd.embed?.src_rating || null
                    },
                    board: {
                        id: pd.board?.id || null,
                        name: pd.board?.name || null,
                        url: pd.board?.url ? `https://pinterest.com${pd.board.url}` : null,
                        owner: {
                            id: pd.board?.owner?.id || null,
                            username: pd.board?.owner?.username || null
                        }
                    },
                    uploader: {
                        id: pd.pinner?.id || null,
                        username: pd.pinner?.username || null,
                        full_name: pd.pinner?.full_name || null,
                        profile_url: pd.pinner?.username ? `https://pinterest.com/${pd.pinner.username}` : null,
                        image: {
                            small: pd.pinner?.image_small_url || null,
                            medium: pd.pinner?.image_medium_url || null,
                            large: pd.pinner?.image_large_url || null,
                            original: pd.pinner?.image_xlarge_url || null
                        },
                        type: pd.pinner?.type || "user",
                        is_verified: pd.pinner?.verified_identity || false
                    },
                    metadata: {
                        article: pd.article || null,
                        product: {
                            price: pd.price_value || null,
                            currency: pd.price_currency || null,
                            availability: pd.shopping_flags || null,
                            ratings: pd.rating || null,
                            reviews_count: pd.review_count || null
                        },
                        recipe: pd.recipe || null,
                        video: pd.videos ? {
                            duration: pd.videos.duration || null,
                            views: pd.videos.video_view_count || null,
                            cover: pd.videos.cover_image_url || null
                        } : null
                    },
                    is_promoted: pd.is_promoted || false,
                    is_downloadable: pd.is_downloadable || true,
                    is_playable: pd.is_playable || false,
                    is_repin: pd.is_repin || false,
                    is_video: pd.is_video || false,
                    has_required_attribution: pd.attribution || null,
                    privacy_level: pd.privacy || "public",
                    tags: pd.pin_join?.annotations || [],
                    hashtags: pd.hashtags || [],
                    did_it_data: pd.did_it_data || null,
                    native_creator: pd.native_creator || null,
                    sponsor: pd.sponsor || null,
                    visual_search_objects: pd.visual_search_objects || []
                }
            };

        } catch (error) {
            if (error.response?.status === 404) {
                return {
                    status: false,
                    code: 404,
                    result: {
                        message: "[ ❌ ] El pin ya no existe, hermano, se fue, expiró, ¡borrado del planeta! Busca algo que exista, me cansé de explicarte."
                    }
                };
            }

            return {
                status: false,
                code: error.response?.status || 500,
                result: {
                    message: "[ ❌ ] ¡El servidor está en caos, hermano! Me molestas todo el tiempo, necesita un descanso. Intenta de nuevo más tarde, ¿ok?"
                }
            };
        }
    },

    profile: async (username) => {
        if (!username) {
            return {
                status: false,
                code: 400,
                result: {
                    message: "[ ❌ ] ¿Dónde está el username, hermano? ¿Esperas que sea adivino? ¡Dame un username al menos, por favor!"
                }
            };
        }

        try {
            const cookies = await pinterest.getCookies();
            if (!cookies) {
                return {
                    status: false,
                    code: 400,
                    result: {
                        message: "[ ❌ ] No pude obtener las cookies, intenta de nuevo más tarde, ¿ya?"
                    }
                };
            }

            const params = {
                source_url: `/${username}/`,
                data: JSON.stringify({
                    options: {
                        username: username,
                        field_set_key: "profile",
                        isPrefetch: false,
                    },
                    context: {}
                }),
                _: Date.now()
            };

            const { data } = await axios.get(`${pinterest.api.base}${pinterest.api.endpoints.user}`, {
                headers: { ...pinterest.headers, 'cookie': cookies },
                params: params
            });

            if (!data.resource_response.data) {
                return {
                    status: false,
                    code: 404,
                    result: {
                        message: "[ ❌ ] ¡El usuario no existe, hermano! ¿A quién estás buscando en realidad?"
                    }
                };
            }

            const userx = data.resource_response.data;
            
            return {
                status: true,
                code: 200,
                result: {
                    id: userx.id,
                    username: userx.username,
                    full_name: userx.full_name || "",
                    bio: userx.about || "",
                    email: userx.email || null,
                    type: userx.type || "user",
                    profile_url: `https://pinterest.com/${userx.username}`,
                    image: {
                        small: userx.image_small_url || null,
                        medium: userx.image_medium_url || null,
                        large: userx.image_large_url || null,
                        original: userx.image_xlarge_url || null
                    },
                    stats: {
                        pins: userx.pin_count || 0,
                        followers: userx.follower_count || 0,
                        following: userx.following_count || 0,
                        boards: userx.board_count || 0,
                        likes: userx.like_count || 0,
                        saves: userx.save_count || 0
                    },
                    website: userx.website_url || null,
                    domain_url: userx.domain_url || null,
                    domain_verified: userx.domain_verified || false,
                    explicitly_followed_by_me: userx.explicitly_followed_by_me || false,
                    implicitly_followed_by_me: userx.implicitly_followed_by_me || false,
                    location: userx.location || null,
                    country: userx.country || null,
                    is_verified: userx.verified_identity || false,
                    is_partner: userx.is_partner || false,
                    is_indexed: userx.indexed || false,
                    is_tastemaker: userx.is_tastemaker || false,
                    is_employee: userx.is_employee || false,
                    is_blocked: userx.blocked_by_me || false,
                    meta: {
                        first_name: userx.first_name || null,
                        last_name: userx.last_name || null,
                        full_name: userx.full_name || "",
                        locale: userx.locale || null,
                        gender: userx.gender || null,
                        partner: {
                            is_partner: userx.is_partner || false,
                            partner_type: userx.partner_type || null
                        }
                    },
                    account_type: userx.account_type || null,
                    personalize_pins: userx.personalize || false,
                    connected_to_etsy: userx.connected_to_etsy || false,
                    has_password: userx.has_password || true,
                    has_mfa: userx.has_mfa || false,
                    created_at: userx.created_at || null,
                    last_login: userx.last_login || null,
                    social_links: {
                        twitter: userx.twitter_url || null,
                        facebook: userx.facebook_url || null,
                        instagram: userx.instagram_url || null,
                        youtube: userx.youtube_url || null,
                        etsy: userx.etsy_url || null
                    },
                    custom_gender: userx.custom_gender || null,
                    pronouns: userx.pronouns || null,
                    board_classifications: userx.board_classifications || {},
                    interests: userx.interests || []
                }
            };

        } catch (error) {
            if (error.response?.status === 404) {
                return {
                    status: false,
                    code: 404,
                    result: {
                        message: "[ ❌ ] ¡El username no es válido, hermano! Buscas a lo loco, mejor googlea primero."
                    }
                };
            }

            return {
                status: false,
                code: error.response?.status || 500,
                result: {
                    message: "[ ❌ ] ¡El servidor está en caos, hermano! Me molestas todo el tiempo, necesita un descanso. Intenta de nuevo más tarde, ¿ok?"
                }
            };
        }
    }
};

//-------------------[YTDL AMDL]--------------------

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
      throw new Error('Fallo en la verificación de Captcha.');
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
          error: "[ ❌ ] ¿Dónde está el link? ¡No puedo descargar sin un link, por favor!"
        }
      };
    }

    if (!this.ytRegex.test(url)) {
      return {
        status: false,
        code: 400,
        result: {
          error: "[ ❌ ] ¿Qué link metiste, hermano? ¡Solo links de YouTube, que eso es lo que quieres descargar!"
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
            error: "[ ❌ ] ¡Ese formato no existe, hermano! Elige uno de los disponibles, no busques lo que no hay.",
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
            error: "[ ❌ ] ¡No hay CSRF, hermano! Parece que hay un problema..."
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
          title: ws.title || "[ ❌ ] No sé",
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
          error: "[ ❌ ] ¡Hubo un error, qué risa!"
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
            error: "[ ❌ ] Se acabó el tiempo, el servidor no responde, ¡qué risa!"
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
            error: "[ ❌ ] ¡Qué mal, este servidor es pésimo! Falló la conexión otra vez, qué desastre."
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
          error: "[ ❌ ] ¡Error, qué locura!"
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
    if (!link) return { error: "[ ❌ ] ¿Dónde está el link? ¡No puedo descargar sin un link, por favor!" };
    if (!ytdown.isUrl(link)) return { error: "[ ❌ ] ¿Qué link metiste, hermano? ¡Solo links de YouTube, que eso es lo que quieres descargar!" };
    if (!format || !ytdown.formats.includes(format)) return {
      error: "[ ❌ ] ¡Ese formato no existe, hermano! Elige uno de los disponibles, no busques lo que no hay.",
      availableFormats: ytdown.formats
    };

    const id = ytdown.youtube(link);
    if (!id) return { error: "[ ❌ ] No pude extraer el link de YouTube, usa un link correcto para que no pase esto otra vez, ¡qué risa!" };

    try {
      const response = await ytdown.request("download.php", { format, url: `https://www.youtube.com/watch?v=${id}` });
      return ytdown.handler(response, format, id);
    } catch (error) {
      return { 
        error: `[ ❌ ] ${error.message}`,
        details: error.response?.data
      };
    }
  },

  handler: async (data, format, id) => {
    if (!data.success) return { error: data.message || "[ ❌ ] Error" };
    if (!data.id) return { error: "[ ❌ ] ¡No hay ID de descarga, hermano! Así no puedo continuar el proceso, ¡qué risa!" };

    try {
      const pr = await ytdown.checkProgress(data.id);
      return pr.success ? ytdown.final(data, pr, format, id) : pr;
    } catch (error) {
      return { error: `[ ❌ ] ${error.message}` };
    }
  },

  checkProgress: async (id) => {
    let attempts = 0, lastProgress = -1;
    process.stdout.write("[ ✨ ] Progreso: [                              ] 0%");

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

    return { error: "[ ❌ ] El proceso de descarga no pudo continuar, hermano, ¡se acabó el tiempo!" };
  },

  updateBar: (progress) => {
    const barLength = 30;
    const filledLength = Math.round(barLength * progress / 100);
    const bar = '█'.repeat(filledLength) + ' '.repeat(barLength - filledLength);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`[ ✨ ] Progreso: [${bar}] ${progress}%\n\n`);
  },

  final: (init, pro, formats, id) => ({
    success: true,
    title: init.title || "[ ❌ ] No sé",
    type: ['360', '480', '720', '1080', '1440', '2160'].includes(formats) ? 'video' : 'audio',
    formats,
    thumbnail: init.info?.image || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    download: pro.download_url || "[ ❌ ] No sé",
    id: id
  })
};

export { blackboxAi, exoml, perplexity, amdl, pinterest, ytdown };
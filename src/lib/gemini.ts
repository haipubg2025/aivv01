import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";
import { ProxyConfig, GeminiConfig } from "../types";

const defaultApiKey = process.env.GEMINI_API_KEY || "";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

export interface AIStatusUpdate {
  isProcessing?: boolean;
  retryCount?: number;
  lastError?: string | null;
  currentAction?: string | null;
  activeProxyUrl?: string;
  activeKey?: string;
}

async function callAI(
  prompt: string, 
  modelName: string, 
  config?: { responseMimeType?: string; responseSchema?: any; aiConfig?: GeminiConfig; signal?: AbortSignal },
  proxies?: ProxyConfig[],
  apiKeys?: string[],
  onStream?: (text: string) => void,
  onStatus?: (status: AIStatusUpdate) => void
): Promise<{ 
  text: string; 
  usage?: { inputTokens: number; outputTokens: number };
  ttft?: number;
  totalLatency?: number;
  finishReason?: string;
  safetyRatings?: any[];
  httpStatusCode?: number;
  requestId?: string;
}> {
  const generationConfig = config?.aiConfig ? {
    temperature: config.aiConfig.temperature,
    topP: config.aiConfig.topP,
    topK: config.aiConfig.topK,
    maxOutputTokens: config.aiConfig.maxOutputTokens,
    responseMimeType: config.responseMimeType,
    responseSchema: config.responseSchema,
    thinkingConfig: config.aiConfig.thinkingLevel ? { thinkingLevel: config.aiConfig.thinkingLevel } : undefined
  } : (config ? {
    responseMimeType: config.responseMimeType,
    responseSchema: config.responseSchema
  } : undefined);

  let retryCount = 0;
  let lastUsage: { inputTokens: number; outputTokens: number } | undefined = undefined;
  let proxyIndex = 0;
  let keyIndex = 0;

  while (true) {
    if (config?.signal?.aborted) {
      const error = new Error("Yêu cầu đã bị hủy bởi người dùng.");
      error.name = "AbortError";
      throw error;
    }

    const activeProxy = proxies && proxies.length > 0 ? proxies[proxyIndex % proxies.length] : undefined;
    const activeKey = apiKeys && apiKeys.length > 0 ? apiKeys[keyIndex % apiKeys.length] : defaultApiKey;

    if (onStatus) {
      onStatus({
        isProcessing: true,
        retryCount,
        activeProxyUrl: activeProxy?.url,
        activeKey: activeKey ? `${activeKey.substring(0, 4)}...${activeKey.substring(activeKey.length - 4)}` : undefined
      });
    }

    const startTime = Date.now();
    let firstTokenTime: number | undefined;
    let finishReason: string | undefined;
    let safetyRatings: any[] | undefined;
    let httpStatusCode: number | undefined;
    let requestId: string | undefined;

    try {
      if (activeProxy && activeProxy.url) {
        const targetModel = activeProxy.model || modelName;
        const isStream = !!onStream;
        const endpoint = isStream ? 'streamGenerateContent' : 'generateContent';
        const fetchUrl = `${activeProxy.url.replace(/\/$/, '')}/v1beta/models/${targetModel}:${endpoint}?key=${activeProxy.key}${isStream ? '&alt=sse' : ''}`;
        
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: config?.signal,
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig,
            safetySettings
          })
        });

        httpStatusCode = response.status;
        requestId = response.headers.get('x-request-id') || response.headers.get('trace-id') || undefined;

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error?.message || `Proxy error: ${response.status}`);
        }

        if (isStream && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let fullText = "";
          let buffer = "";
          
          while (true) {
            if (config?.signal?.aborted) {
              reader.cancel();
              const error = new Error("Yêu cầu đã bị hủy bởi người dùng.");
              error.name = "AbortError";
              throw error;
            }

            const { done, value } = await reader.read();
            if (done) break;
            
            const decoded = decoder.decode(value, { stream: true });
            buffer += decoded;
            const lines = buffer.split('\n');
            buffer = lines.pop() || ""; // Keep the last partial line in buffer
            
            let foundData = false;
            for (const line of lines) {
              const trimmedLine = line.trim();
              if (!trimmedLine || trimmedLine === 'data: [DONE]') continue;
              
              if (trimmedLine.startsWith('data: ')) {
                foundData = true;
                try {
                  const jsonStr = trimmedLine.replace('data: ', '').trim();
                  if (!jsonStr) continue;
                  const data = JSON.parse(jsonStr);
                  
                  // Capture usage metadata if present in stream
                  if (data.usageMetadata) {
                    lastUsage = {
                      inputTokens: data.usageMetadata.promptTokenCount || 0,
                      outputTokens: data.usageMetadata.candidatesTokenCount || 0
                    };
                  }
                  
                  if (data.candidates?.[0]?.finishReason) {
                    finishReason = data.candidates[0].finishReason;
                  }
                  if (data.candidates?.[0]?.safetyRatings) {
                    safetyRatings = data.candidates[0].safetyRatings;
                  }

                  const delta = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                  if (delta) {
                    if (!firstTokenTime) firstTokenTime = Date.now();
                    fullText += delta;
                    onStream(delta);
                  }
                } catch (e) {
                  // Ignore parse errors for partial chunks
                }
              }
            }
            
            // Fallback: If no "data: " lines found but we have content, it might not be SSE
            if (!foundData && buffer.length > 0 && !buffer.includes('data: ')) {
              // We don't call onStream here because we don't know if it's a partial JSON or what
            }
          }

          // If after the stream ends, fullText is still empty but we have a buffer, 
          // it might have been a regular JSON response
          if (!fullText && buffer) {
            try {
              const data = JSON.parse(buffer);
              fullText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
              if (fullText && onStream) {
                if (!firstTokenTime) firstTokenTime = Date.now();
                onStream(fullText);
              }
              
              if (data.candidates?.[0]?.finishReason) finishReason = data.candidates[0].finishReason;
              if (data.candidates?.[0]?.safetyRatings) safetyRatings = data.candidates[0].safetyRatings;

              if (data.usageMetadata) {
                return { 
                  text: fullText, 
                  usage: {
                    inputTokens: data.usageMetadata.promptTokenCount || 0,
                    outputTokens: data.usageMetadata.candidatesTokenCount || 0
                  },
                  ttft: firstTokenTime ? firstTokenTime - startTime : undefined,
                  totalLatency: Date.now() - startTime,
                  finishReason,
                  safetyRatings,
                  httpStatusCode,
                  requestId
                };
              }
            } catch (e) {
              // Not a valid JSON either
            }
          }

          return { 
            text: fullText, 
            usage: lastUsage,
            ttft: firstTokenTime ? firstTokenTime - startTime : undefined,
            totalLatency: Date.now() - startTime,
            finishReason,
            safetyRatings,
            httpStatusCode,
            requestId
          };
        } else {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (data.candidates?.[0]?.finishReason) finishReason = data.candidates[0].finishReason;
          if (data.candidates?.[0]?.safetyRatings) safetyRatings = data.candidates[0].safetyRatings;
          const usage = data.usageMetadata ? {
            inputTokens: data.usageMetadata.promptTokenCount || 0,
            outputTokens: data.usageMetadata.candidatesTokenCount || 0
          } : undefined;
          return { 
            text: text || "", 
            usage,
            totalLatency: Date.now() - startTime,
            finishReason,
            safetyRatings,
            httpStatusCode,
            requestId
          };
        }
      } else {
        // Direct API
        const genAI = new GoogleGenAI({ apiKey: activeKey });
        
        if (onStream) {
          try {
            const responseStream = await genAI.models.generateContentStream({
              model: modelName,
              contents: prompt,
              config: {
                ...generationConfig,
                safetySettings
              } as any
            });

            let fullText = "";
            let usage: { inputTokens: number; outputTokens: number } | undefined = undefined;
            
            for await (const chunk of responseStream) {
              if (config?.signal?.aborted) {
                const error = new Error("Yêu cầu đã bị hủy bởi người dùng.");
                error.name = "AbortError";
                throw error;
              }

              const delta = chunk.text || "";
              if (delta && !firstTokenTime) firstTokenTime = Date.now();
              fullText += delta;
              onStream(delta);
              
              if ((chunk as any).candidates?.[0]?.finishReason) finishReason = (chunk as any).candidates[0].finishReason;
              if ((chunk as any).candidates?.[0]?.safetyRatings) safetyRatings = (chunk as any).candidates[0].safetyRatings;

              // Capture usage metadata if present in the final chunk
              if ((chunk as any).usageMetadata) {
                usage = {
                  inputTokens: (chunk as any).usageMetadata.promptTokenCount || 0,
                  outputTokens: (chunk as any).usageMetadata.candidatesTokenCount || 0
                };
              }
            }
            return { 
              text: fullText, 
              usage,
              ttft: firstTokenTime ? firstTokenTime - startTime : undefined,
              totalLatency: Date.now() - startTime,
              finishReason,
              safetyRatings
            };
          } catch (streamError: any) {
            if (config?.signal?.aborted || streamError.name === 'AbortError') {
               const error = new Error("Yêu cầu đã bị hủy bởi người dùng.");
               error.name = "AbortError";
               throw error;
            }
            throw streamError;
          }
        } else {
          const response = await genAI.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
              ...generationConfig,
              safetySettings
            } as any
          });
          
          if ((response as any).candidates?.[0]?.finishReason) finishReason = (response as any).candidates[0].finishReason;
          if ((response as any).candidates?.[0]?.safetyRatings) safetyRatings = (response as any).candidates[0].safetyRatings;

          const usage = (response as any).usageMetadata ? {
            inputTokens: (response as any).usageMetadata.promptTokenCount || 0,
            outputTokens: (response as any).usageMetadata.candidatesTokenCount || 0
          } : undefined;

          return { 
            text: response.text || "", 
            usage,
            totalLatency: Date.now() - startTime,
            finishReason,
            safetyRatings
          };
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError' || error.message === "Yêu cầu đã bị hủy bởi người dùng.") {
        throw error;
      }

      retryCount++;
      if (onStatus) {
        onStatus({
          retryCount,
          lastError: error.message || String(error)
        });
      }
      console.error(`Lỗi AI (Lần thử ${retryCount}):`, error);
      
      // Rotate for next retry
      if (proxies && proxies.length > 0) proxyIndex++;
      if (apiKeys && apiKeys.length > 0) keyIndex++;

      // Small delay to prevent UI freeze if it's a tight loop
      await new Promise(resolve => setTimeout(resolve, 100));
      continue;
    }
  }
}

export async function fetchAvailableModels(apiKey?: string, proxy?: ProxyConfig) {
  const key = apiKey || defaultApiKey;
  
  try {
    // Try multiple common endpoints for proxies
    const endpoints = proxy && proxy.url 
      ? [
          `${proxy.url.replace(/\/$/, '')}/v1beta/models?key=${proxy.key}`,
          `${proxy.url.replace(/\/$/, '')}/v1/models?key=${proxy.key}`,
          `${proxy.url.replace(/\/$/, '')}/v1/models` // Some proxies use Bearer token or no key in URL
        ]
      : [`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`];

    for (const url of endpoints) {
      try {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (proxy?.key && !url.includes('key=')) {
          headers['Authorization'] = `Bearer ${proxy.key}`;
        }

        const response = await fetch(url, { headers });
        if (!response.ok) continue;

        const data = await response.json();
        
        // Handle Gemini format: { models: [{ name: "models/...", ... }] }
        if (data.models && Array.isArray(data.models)) {
          return data.models
            .map((m: any) => m.name.split('/').pop())
            .sort();
        }
        
        // Handle OpenAI format: { data: [{ id: "...", ... }] }
        if (data.data && Array.isArray(data.data)) {
          return data.data
            .map((m: any) => m.id)
            .sort();
        }

        // Handle simple array format: ["model1", "model2"]
        if (Array.isArray(data)) {
          return data.sort();
        }
      } catch (e) {
        continue;
      }
    }
    
    return [];
  } catch (error) {
    console.error("Lỗi khi tải danh sách model:", error);
    return [];
  }
}

export async function generateStoryPart(
  prompt: string, 
  modelName: string = "gemini-3.1-pro-preview", 
  proxies?: ProxyConfig[], 
  apiKeys?: string[],
  aiConfig?: GeminiConfig,
  onStream?: (text: string) => void,
  onStatus?: (status: AIStatusUpdate) => void,
  signal?: AbortSignal
) {
  try {
    const response = await callAI(prompt, modelName, { aiConfig, signal }, proxies, apiKeys, onStream, onStatus);
    return { text: response.text || "Không có phản hồi từ AI.", ...response };
  } catch (error) {
    console.error("Lỗi khi gọi Gemini API:", error);
    throw error;
  }
}

export async function countTokens(
  text: string,
  modelName: string = "gemini-3.1-pro-preview",
  proxies?: ProxyConfig[],
  apiKeys?: string[]
): Promise<number> {
  if (!text) return 0;

  let retryCount = 0;
  let proxyIndex = 0;
  let keyIndex = 0;

  while (retryCount < 3) {
    const activeProxy = proxies && proxies.length > 0 ? proxies[proxyIndex % proxies.length] : undefined;
    const activeKey = apiKeys && apiKeys.length > 0 ? apiKeys[keyIndex % apiKeys.length] : defaultApiKey;

    try {
      if (activeProxy && activeProxy.url) {
        const targetModel = activeProxy.model || modelName;
        const fetchUrl = `${activeProxy.url.replace(/\/$/, '')}/v1beta/models/${targetModel}:countTokens?key=${activeProxy.key}`;
        
        const response = await fetch(fetchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text }] }]
          })
        });

        if (!response.ok) {
          throw new Error(`Proxy error: ${response.status}`);
        }

        const data = await response.json();
        return data.totalTokens || 0;
      } else {
        const genAI = new GoogleGenAI({ apiKey: activeKey });
        const response = await genAI.models.countTokens({
          model: modelName,
          contents: text
        });
        return response.totalTokens || 0;
      }
    } catch (error) {
      retryCount++;
      if (proxies && proxies.length > 0) proxyIndex++;
      if (apiKeys && apiKeys.length > 0) keyIndex++;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  // Fallback to estimation if API fails
  return Math.ceil(text.length / 3.5);
}

export async function generateJson(
  prompt: string, 
  schema: any, 
  proxies?: ProxyConfig[], 
  modelName: string = "gemini-3-flash-preview", 
  apiKeys?: string[],
  aiConfig?: GeminiConfig,
  onStream?: (text: string) => void,
  onStatus?: (status: AIStatusUpdate) => void,
  signal?: AbortSignal
) {
  let attempt = 0;

  while (true) {
    try {
      if (attempt > 0 && onStatus) {
        onStatus({ currentAction: 'generating', lastError: `Đang thử lại (Lần ${attempt + 1}) do JSON lỗi...` });
      }

      let fullText = "";
      const response = await callAI(prompt, modelName, {
        responseMimeType: "application/json",
        responseSchema: schema,
        aiConfig,
        signal
      }, proxies, apiKeys, (chunk) => {
        fullText += chunk;
        if (onStream) onStream(chunk);
      }, onStatus);
      
      // Ưu tiên dùng text trả về từ callAI, nếu không có thì dùng fullText tích lũy từ stream
      const finalResult = response.text || fullText;
      
      try {
        return { data: JSON.parse(finalResult || "{}"), ...response };
      } catch (parseError) {
        console.warn(`Phát hiện JSON lỗi ở lần thử ${attempt + 1}, đang thử lại ngay lập tức...`, parseError);
      }
    } catch (error: any) {
      if (error.name === 'AbortError' || error.message === "Yêu cầu đã bị hủy bởi người dùng.") {
        throw error;
      }

      console.error(`Lỗi khi gọi Gemini API (JSON) ở lần thử ${attempt + 1}:`, error);
      
      // We already threw above if it was an abort. For other errors, we continue retrying.
    }
    attempt++;
  }
}

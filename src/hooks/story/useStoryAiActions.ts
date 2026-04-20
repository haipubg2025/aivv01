import { useRef, useEffect } from 'react';
import { generateStoryPart, generateJson, countTokens } from '../../lib/gemini';
import { WORLD_GENERATION_SCHEMA, CHARACTER_GENERATION_SCHEMA, BASE_OUTLINE_SCHEMA, CHAPTERS_SCHEMA, CHAPTER_VERSIONS_SCHEMA, CODEX_GENERATION_SCHEMA, GENERATE_NEXT_ARCS_SCHEMA, BASIC_OUTLINE_SCHEMA, BASIC_OUTLINE_CHILDREN_SCHEMA } from '../../constants/schemas';
import { cleanContextForAi, stripBeautifyTags, countWords, estimateTokens, generateFullOutlineContext, generateBasicOutlineTreeContext, cleanChapterTitleData } from '../../lib/contentUtils';
import { useStoryStore } from '../../store/useStoryStore';
import { 
  getGeneratePrompt,
  getCharacterAiPrompt,
  getWorldDetailsPrompt,
  getRewriteBaseOutlinePrompt,
  getRewriteChaptersPrompt,
  getChapterVersionsPrompt,
  getGenerateNextArcsPrompt,
  getBasicOutlinePrompt,
  getBasicOutlineChildrenPrompt,
  getArcBranchingPrompt,
  getArcBranchingChildrenPrompt,
  getChapterBranchingPrompt,
  getRealismRules
} from '../../constants/prompts';
import { getCodexAiPrompt } from '../../constants/prompts/codex';
import { getGenreDescriptions } from '../../constants/genres';
import { 
  Character, 
  BaseOutline, 
  CodexEntry,
  ProxyConfig,
  AILog,
  BasicOutlineOption
} from '../../types';

export function useStoryAiActions(
  states: any, 
  _utils: { getNextProxy: () => ProxyConfig | undefined, getNextGeminiKey: () => string },
  bibleActions: any,
  addNotification: (message: string, type?: any) => void
) {
  const { applyBibleUpdates } = bibleActions;
  const {
    prompt, setPrompt,
    setIsLoading,
    selectedModel,
    storyConcept,
    storyGuidingPrinciple, setStoryGuidingPrinciple,
    genre, setGenre,
    protagonistType,
    storyTone, setStoryTone,
    storyTitle, setStoryTitle,
    characters, setCharacters,
    worldInfo, setWorldInfo,
    worldGeography, setWorldGeography,
    worldHistory, setWorldHistory,
    worldCulture, setWorldCulture,
    worldEconomy, setWorldEconomy,
    worldReligion, setWorldReligion,
    worldFactions, setWorldFactions,
    worldRelationships, setWorldRelationships,
    worldUniqueElements, setWorldUniqueElements,
    powerSystem, setPowerSystem,
    baseOutlines, setBaseOutlines,
    codex, setCodex,
    timeline, setTimeline,
    selectedChapter, setSelectedChapter,
    currentContext, setCurrentContext,
    aiInstructions,
    references,
    branchingSuggestion,
    isRealismEnabled,
    storyContent, setStoryContent,
    geminiConfig,
    setAiStats,
    setActiveView,
    setLastFullPrompt,
    setStreamingLog,
    worldGenTemperature,
    setIsGeneratingWorld,
    baseOutlineOptions,
    setBaseOutlineOptions,
    setChapterOptions,
    worldGenHistory, setWorldGenHistory,
    basicOutlineOptions, setBasicOutlineOptions,
    selectedBasicOutline,
    tawaMode,
    tawaConfig,
    isProxyEnabled,
    proxies,
    isGeminiEnabled,
    geminiApiKeys,
    setAiStatus,
    currentChapterId, setCurrentChapterId,
    branchingContext, setBranchingContext,
    worldGenSettings
  } = states;

  const abortControllerRef = useRef<AbortController | null>(null);

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsGeneratingWorld(false);
    setAiStatus((prev: any) => ({ ...prev, isProcessing: false, lastError: null, currentAction: 'Đã dừng xử lý.' }));
    // Giữ nguyên aiStats cũ, chỉ xóa startTime để ngắt bộ đếm
    setAiStats((prev: any) => prev ? ({ ...prev, startTime: undefined }) : null);
  };

  const createAbortController = () => {
    stopGeneration();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    return controller;
  };

  const handleGenerate = async (mode: 'generate' | 'continue' | 'rewrite' = 'generate', overridePrompt?: string, count: number = 1) => {
    const currentPrompt = overridePrompt !== undefined ? overridePrompt : prompt;
    if (mode === 'generate' && !currentPrompt.trim()) return;
    
    const controller = createAbortController();

    setIsLoading(true);
    const actionText = mode === 'continue' ? 'Đang viết tiếp...' : mode === 'rewrite' ? 'Đang viết lại...' : 'Đang tạo nội dung truyện...';
    
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: actionText });
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      // Find indices and info for the current part
      let baseOutlineInfo, chapterInfo, currentChapterObj: any;
      if (currentChapterId) {
        for (let aIdx = 0; aIdx < baseOutlines.length; aIdx++) {
          const baseOutline = baseOutlines[aIdx];
          for (let cIdx = 0; cIdx < baseOutline.chapters.length; cIdx++) {
            const chapter = baseOutline.chapters[cIdx];
            if (chapter.id === currentChapterId) {
              baseOutlineInfo = { index: aIdx, title: baseOutline.title };
              chapterInfo = { index: cIdx, title: chapter.title };
              currentChapterObj = chapter;
              break;
            }
          }
          if (chapterInfo) break;
        }
      }

      const bibleContext = `
        --- Ý TƯỞNG CHỦ ĐẠO ---
        ${storyConcept}
        --- KIM CHỈ NAM ĐẠI CỤC ---
        ${storyGuidingPrinciple}
        --- NHÂN VẬT CHÍNH CỐT LÕI ---
        Loại nhân vật: ${protagonistType}
        --- THỂ LOẠI ---
        ${getGenreDescriptions(genre)}
        --- MÀU SẮC CÂU CHUYỆN ---
        ${storyTone}
        --- TỔNG QUAN BỐI CẢNH THẾ GIỚI ---
        ${cleanContextForAi(worldInfo)}
        --- LỊCH SỬ THẾ GIỚI ---
        ${cleanContextForAi(worldHistory)}
        --- VĂN HÓA & PHONG TỤC ---
        ${cleanContextForAi(worldCulture)}
        --- TRỌNG ĐIỂM KINH TẾ ---
        ${cleanContextForAi(worldEconomy)}
        --- TÔN GIÁO & TÍN NGƯỠNG ---
        ${cleanContextForAi(worldReligion)}
        --- ĐỊA LÝ & VÙNG LÃNH THỔ ---
        ${cleanContextForAi(worldGeography)}
        --- CÁC QUỐC GIA & THẾ LỰC ---
        ${cleanContextForAi(worldFactions)}
        --- MỐI QUAN HỆ GIỮA CÁC THẾ LỰC ---
        ${cleanContextForAi(worldRelationships)}
        --- CÁC YẾU TỐ ĐỘC ĐÁO ---
        ${cleanContextForAi(worldUniqueElements)}
        --- HỆ THỐNG SỨC MẠNH ---
        ${cleanContextForAi(powerSystem)}
        --- TIẾN TRÌNH LỊCH SỬ (TIMELINE) ---
        ${timeline.map((t: any) => `[${t.year}] ${t.event} - Chi tiết: ${t.description}`).join('\n')}
        --- CODEX & TÀI LIỆU ---
        ${codex.map((c: any) => `[${c.category}] ${c.title}: ${c.content}`).join('\n')}
        --- DÀN Ý CỐT TRUYỆN TOÀN TẬP ---
        ${generateFullOutlineContext(baseOutlines)}
        --- DANH SÁCH NHÂN VẬT ĐÃ CÓ ---
        ${characters.map((c: Character) => `
        Tên: ${c.name}
        Chức vụ: ${c.occupation || c.role}
        Tuổi: ${c.age}
        Ngày sinh: ${c.birthDate}
        Giới tính: ${c.gender}
        Kim chỉ nam: ${c.guidingPrinciple}
        Tính cách: ${c.personality}
        Ngoại hình: ${c.appearance}
        Thiết lập khác: ${cleanContextForAi(c.description)}
        ---`).join('\n')}
      `;

      const results: string[] = [];
      const summaries: string[] = [];
      const scores: number[] = [];
      const resultsBibleUpdates: any[] = [];
      let totalInputTokens = 0;
      let totalOutputTokens = 0;

      // Loop for multiple versions if count > 1
      const actualCount = (mode === 'continue') ? 1 : count;

      for (let i = 0; i < actualCount; i++) {
        if (controller.signal.aborted) break;
        
        if (actualCount > 1) {
          setAiStatus(prev => ({ ...prev, currentAction: `${actionText} (Bản ${i + 1}/${actualCount})` }));
        }

        let effectivePrompt = currentPrompt;
        if (mode === 'continue' && currentChapterObj?.content) {
          effectivePrompt = `Hãy viết tiếp nội dung cho Chương: ${currentChapterObj.title}. \n\nTóm tắt nội dung chương: ${currentChapterObj.summary}.`;
          if (currentChapterObj.storyGuidingPrinciple) {
            effectivePrompt += ` \n\nKim chỉ nam của chương này: ${currentChapterObj.storyGuidingPrinciple}.`;
          }
          if (currentChapterObj.pov) {
            effectivePrompt += ` \n\nGóc nhìn (POV) của chương này: ${currentChapterObj.pov}.`;
          }
          effectivePrompt += ` \n\nNội dung hiện tại: \n${currentChapterObj.content} \n\n--- HÃY VIẾT TIẾP TỪ ĐÂY ---`;
        } else if (mode === 'rewrite' && currentChapterObj?.content) {
          effectivePrompt = `Hãy viết lại nội dung cho Chương: ${currentChapterObj.title} với phong cách tốt hơn, sâu sắc hơn. \n\nTóm tắt nội dung chương: ${currentChapterObj.summary}.`;
          if (currentChapterObj.storyGuidingPrinciple) {
            effectivePrompt += ` \n\nKim chỉ nam của chương này: ${currentChapterObj.storyGuidingPrinciple}.`;
          }
          if (currentChapterObj.pov) {
            effectivePrompt += ` \n\nGóc nhìn (POV) của chương này: ${currentChapterObj.pov}.`;
          }
          effectivePrompt += ` \n\nNội dung cũ: \n${currentChapterObj.content}`;
          if (actualCount > 1) {
            effectivePrompt += `\n\nĐây là phiên bản thứ ${i + 1}, hãy tạo ra sự khác biệt so với các phiên bản khác.`;
          }
        } else if (actualCount > 1) {
          effectivePrompt += `\n\nĐây là phiên bản thứ ${i + 1}, hãy tạo ra sự khác biệt so với các phiên bản khác.`;
        }

        const fullPrompt = getGeneratePrompt(
          tawaConfig,
          tawaMode,
          bibleContext,
          selectedChapter,
          cleanContextForAi(currentContext),
          stripBeautifyTags(storyContent),
          effectivePrompt,
          storyTitle,
          storyConcept,
          storyGuidingPrinciple,
          states.references,
          aiInstructions,
          baseOutlineInfo,
          chapterInfo,
          isRealismEnabled ? getRealismRules(genre) : ''
        );

        setLastFullPrompt(fullPrompt);
        setStreamingLog('');
        states.setStreamingContent('');
        
        // Tạo log entry mới ngay lập tức
        const newLogId = Date.now().toString();
        states.setAiLogs((prev: any) => [{
          id: newLogId,
          prompt: fullPrompt,
          response: "",
          timestamp: Date.now(),
          isProcessing: true,
          modelName: selectedModel,
          actionType: mode === 'continue' ? '[CONTINUE]' : mode === 'rewrite' ? `[REWRITE_V${i+1}]` : `[GENERATE_V${i+1}]`,
        }, ...prev]);

        // Lấy số token chính xác của input TRƯỚC khi gọi stream để đảm bảo tính chính xác ngay từ đầu
        const exactInputTokens = await countTokens(fullPrompt, selectedModel, activeProxies, activeKeys);
        const currentVersionInputBaseline = totalInputTokens; // Lưu lại baseline trước bản này
        totalInputTokens += exactInputTokens;
        
        // Cập nhật stats với số chính xác ngay lập tức
        setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: totalInputTokens }) : null);

        // Cập nhật log với số chính xác
        states.setAiLogs((prev: any) => {
          const logs = [...prev];
          if (logs.length > 0 && logs[0].id === newLogId) {
            logs[0].inputTokens = exactInputTokens;
          }
          return logs;
        });

        let currentResult = "";
        let currentThinking = "";
        let lastContentLength = 0;
        let lastThinkingLength = 0;
        
        const response = await generateStoryPart(
          fullPrompt, 
          selectedModel, 
          activeProxies, 
          activeKeys, 
          geminiConfig,
          (chunk) => {
            currentResult += chunk;
            setStreamingLog(prev => prev + chunk);
            
            // Extract thinking part
            const thinkingMatch = currentResult.match(/<thinking>([\s\S]*?)(?:<\/thinking>|$)/);
            if (thinkingMatch && thinkingMatch[1]) {
              const fullThinking = thinkingMatch[1];
              const newThinkingPart = fullThinking.slice(lastThinkingLength);
              if (newThinkingPart) {
                currentThinking = fullThinking;
                lastThinkingLength = fullThinking.length;
              }
            }

            const contentMatch = currentResult.match(/<content>([\s\S]*?)(?:<\/content>|$)/);
            let currentContent = "";
            if (contentMatch && contentMatch[1]) {
              currentContent = contentMatch[1];
              const newPart = currentContent.slice(lastContentLength);
              if (newPart) {
                states.setStreamingContent((prev: string) => prev + newPart);
                lastContentLength = currentContent.length;
              }
            }

            // Cập nhật stats liên tục dù có đang thinking hay content
            const estOutputTokens = totalOutputTokens + estimateTokens(currentResult);
            setAiStats((prev: any) => prev ? ({
              ...prev,
              wordCount: countWords(currentContent),
              outputTokens: estOutputTokens
            }) : null);

            // Cập nhật log realtime
          states.setAiLogs((prev: any) => {
            const logs = [...prev];
            if (logs.length > 0 && logs[0].id === newLogId) {
              logs[0].response = currentResult;
              logs[0].rawResponse = currentResult;
              logs[0].thinking = currentThinking;
              logs[0].outputTokens = estOutputTokens;
            }
            return logs;
          });
        },
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { text: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      
      // Đồng bộ số token input từ phản hồi thật của API nếu có để tránh sai lệch sau khi hoàn thành
      if (usage?.inputTokens) {
        totalInputTokens = currentVersionInputBaseline + usage.inputTokens;
      }
      
      // Tương tự cho Output Tokens
      const currentVersionOutputTokens = usage?.outputTokens || estimateTokens(result);
      totalOutputTokens += currentVersionOutputTokens;

      // Extract thinking, summary and content
      const thinkingMatch = result.match(/<thinking>([\s\S]*?)<\/thinking>/);
      const finalThinking = thinkingMatch ? thinkingMatch[1].trim() : currentThinking;

      const summaryMatch = result.match(/<summary>([\s\S]*?)<\/summary>/);
      summaries.push(summaryMatch ? summaryMatch[1].trim() : "");
      
      const contentMatch = result.match(/<content>([\s\S]*?)<\/content>/);
      const finalContent = contentMatch ? contentMatch[1].trim() : result;
      results.push(finalContent);

      const metadataMatch = result.match(/<metadata>([\s\S]*?)<\/metadata>/);
      let aiMetadata: any = { wordCount: 0, score: 0 };
      if (metadataMatch) {
        try {
          aiMetadata = JSON.parse(metadataMatch[1].trim());
        } catch (e) {
          console.warn("Lỗi parse metadata từ AI:", e);
        }
      }

      // Lưu trữ bibleUpdates cho từng phiên bản
      const versionUpdate = aiMetadata.bibleUpdates || null;
      resultsBibleUpdates.push(versionUpdate);

      scores.push(aiMetadata.score || 0);

      // Final cleanup for this version
      const endTime = Date.now();
      const totalTime = (endTime - startTime) / 1000;
      
      const finalWordCount = aiMetadata.wordCount || countWords(finalContent);
      
      const estimatedCost = (totalInputTokens * 0.000000075) + (totalOutputTokens * 0.0000003);

      // Chỉ xóa startTime ở phiên bản cuối cùng
      const isLastVersion = i === actualCount - 1;
      
      setAiStats({
        wordCount: finalWordCount,
        inputTokens: totalInputTokens,
        outputTokens: totalOutputTokens,
        processingTime: totalTime,
        startTime: isLastVersion ? undefined : startTime,
        ttft,
        tps: totalTime > 0 ? (usage?.outputTokens || estimateTokens(result)) / totalTime : 0,
        estimatedCost
      });
      
      states.setAiLogs((prev: AILog[]) => {
        if (prev.length === 0) return prev;
        const newLogs = [...prev];
        const logIdx = newLogs.findIndex(l => l.id === newLogId);
        if (logIdx === -1) return prev;
        
        newLogs[logIdx] = {
          ...newLogs[logIdx],
          isProcessing: false,
          ttft,
          totalLatency,
          finishReason,
          safetyRatings,
          httpStatusCode,
          requestId,
          estimatedCost,
          response: finalContent,
          rawResponse: result,
          thinking: finalThinking,
          inputTokens: usage?.inputTokens || newLogs[logIdx].inputTokens || estimateTokens(fullPrompt),
          outputTokens: usage?.outputTokens || estimateTokens(result),
            tps: totalTime > 0 ? (usage?.outputTokens || estimateTokens(result)) / totalTime : 0,
            systemInstruction: bibleContext,
            parameters: geminiConfig
          };
          return newLogs;
        });
      }

      setPrompt('');
      setActiveView('editor');
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
      abortControllerRef.current = null;
      states.setStreamingContent('');

      // Tự động áp dụng cập nhật Story Bible cho phiên bản đầu tiên (không hiện modal)
      if (resultsBibleUpdates.length > 0 && resultsBibleUpdates[0]) {
        applyBibleUpdates(resultsBibleUpdates[0], false);
      }

      // Update chapter with new versions and content
      if (currentChapterId) {
        setBaseOutlines((prevBaseOutlines: BaseOutline[]) => {
          const newBaseOutlines = prevBaseOutlines.map(baseOutline => ({
            ...baseOutline,
            chapters: baseOutline.chapters.map(chapter => {
              if (chapter.id === currentChapterId) {
                const existingVersions = chapter.versions || [];
                const currentIdx = chapter.selectedVersionIndex ?? (existingVersions.length > 0 ? existingVersions.length - 1 : 0);
                
                let updatedVersions = [...existingVersions];
                let updatedBibleUpdates = chapter.versionBibleUpdates ? [...chapter.versionBibleUpdates] : [];
                let updatedContent = chapter.content || "";
                let newSelectedIdx = currentIdx;

                if (mode === 'continue') {
                  const continuation = results[0];
                  updatedContent = (chapter.content || "") + '\n\n' + continuation;
                  
                  // Update the current version in the array too
                  if (updatedVersions[currentIdx] !== undefined) {
                    updatedVersions[currentIdx] = updatedContent;
                    // For continue, we might want to append/merge bible updates, 
                    // but for now let's just update the current version's update if it exists
                    if (resultsBibleUpdates[0]) {
                      updatedBibleUpdates[currentIdx] = resultsBibleUpdates[0];
                    }
                  } else {
                    updatedVersions = [updatedContent];
                    updatedBibleUpdates = [resultsBibleUpdates[0] || null];
                  }
                } else {
                  // For generate or rewrite, we add new versions
                  newSelectedIdx = existingVersions.length;
                  updatedVersions = [...existingVersions, ...results];
                  updatedBibleUpdates = [...updatedBibleUpdates, ...resultsBibleUpdates];
                  updatedContent = results[0];
                }

                return { 
                  ...chapter, 
                  summary: summaries[0] || chapter.summary,
                  content: updatedContent,
                  versions: updatedVersions,
                  versionBibleUpdates: updatedBibleUpdates,
                  selectedVersionIndex: newSelectedIdx,
                  wordCount: countWords(updatedContent),
                  score: scores[0] || 0,
                  status: 'completed'
                };
              }
              return chapter;
            })
          }));

          // Rebuild storyContent from all chapters that have content
          let fullContent = "";
          newBaseOutlines.forEach(baseOutline => {
            baseOutline.chapters.forEach(chapter => {
              if (chapter.content) {
                fullContent += (fullContent ? '\n\n' : '') + chapter.content;
              }
            });
          });
          setStoryContent(fullContent);

          return newBaseOutlines;
        });

        if (summaries[0]) {
          setCurrentContext(summaries[0]);
        }
      }
    } catch (error: any) {

      if (error.name === 'AbortError' || error.message === "Yêu cầu đã bị hủy bởi người dùng." || error.message === "The operation was aborted") {
        console.log("Generation aborted");
        setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: null, currentAction: 'Đã dừng xử lý.' }));
        setAiStats((prev: any) => prev ? ({ ...prev, startTime: undefined }) : null);
        states.setStreamingContent('');
        return;
      }
      console.error("Lỗi tạo nội dung:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? ({ ...prev, startTime: undefined }) : null);
      states.setStreamingContent('');
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleContinue = () => handleGenerate('continue');
  const handleRewrite = () => handleGenerate('rewrite', undefined, worldGenSettings.chapterVersionCount);

  const handleWriteNextChapter = () => {
    if (!currentChapterId) {
      addNotification("Vui lòng chọn một chương để bắt đầu.", "warning");
      return;
    }

    let foundCurrent = false;
    let nextChapter = null;

    for (const baseOutline of baseOutlines) {
      for (const chapter of baseOutline.chapters) {
        if (foundCurrent) {
          nextChapter = chapter;
          break;
        }
        if (chapter.id === currentChapterId) {
          foundCurrent = true;
        }
      }
      if (nextChapter) break;
    }

    if (nextChapter) {
      selectChapterForWriting(nextChapter.title, nextChapter.summary, nextChapter.id);
    } else {
      addNotification("Bạn đã viết đến chương cuối cùng của dàn ý hiện tại!", "info");
      setActiveView('outline');
    }
  };

  const generateCharacterAI = async (id: string) => {
    const char = characters.find((c: Character) => c.id === id);
    if (!char) return;

    const controller = createAbortController();
    setIsLoading(true);
    
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang sáng tạo nhân vật: ${char.name}...` });
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getCharacterAiPrompt(
        tawaConfig,
        tawaMode,
        worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        genre,
        storyTone,
        storyConcept,
        storyGuidingPrinciple,
        protagonistType,
        char,
        states.references,
        aiInstructions,
        isRealismEnabled ? getRealismRules(genre) : ''
      );

      setLastFullPrompt(prompt);
      setStreamingLog('');

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        CHARACTER_GENERATION_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        geminiConfig,
        (chunk) => setStreamingLog(prev => prev + chunk),
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      
      if (result) {
        setCharacters((prev: Character[]) => prev.map(c => c.id === id ? { ...result, id } : c));
        if (usage) {
          const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
          setAiStats({
            wordCount: countWords(JSON.stringify(result)),
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            processingTime: totalLatency ? totalLatency / 1000 : 0,
            startTime: undefined,
            ttft,
            tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
            estimatedCost
          });
          
          states.setAiLogs((prev: AILog[]) => {
            if (prev.length === 0) return prev;
            const newLogs = [...prev];
            newLogs[0] = {
              ...newLogs[0],
              ttft,
              totalLatency,
              finishReason,
              safetyRatings,
              httpStatusCode,
              requestId,
              estimatedCost,
              tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
              actionType: '[GENERATE_CHARACTER]',
              parameters: geminiConfig
            };
            return newLogs;
          });
        }
      }
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi sáng tạo nhân vật:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAllCodexAI = async () => {
    const controller = createAbortController();
    setIsLoading(true);
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      // Lọc ra các mục chưa có nội dung hoặc nội dung quá ngắn
      const entriesToGenerate = codex.filter((e: CodexEntry) => !e.content || e.content.trim().length < 50);
      
      if (entriesToGenerate.length === 0) {
        setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
        setIsLoading(false);
        return;
      }

      for (let i = 0; i < entriesToGenerate.length; i++) {
        const entry = entriesToGenerate[i];
        if (controller.signal.aborted) break;

        const startTime = Date.now();
        setAiStats({
          wordCount: 0,
          inputTokens: 0,
          outputTokens: 0,
          processingTime: 0,
          startTime: startTime
        });
        setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang viết Codex (${i+1}/${entriesToGenerate.length}): ${entry.title}...` });
        
        const prompt = getCodexAiPrompt(
          tawaConfig,
          tawaMode,
          worldInfo,
          worldGeography,
          worldHistory,
          worldCulture,
          worldEconomy,
          worldReligion,
          worldFactions,
          worldRelationships,
          worldUniqueElements,
          powerSystem,
          genre,
          storyTone,
          storyConcept,
          storyGuidingPrinciple || '',
          entry.title,
          entry.category,
          states.references,
          aiInstructions,
          isRealismEnabled ? getRealismRules(genre) : ''
        );

        setLastFullPrompt(prompt);
        setStreamingLog('');

        // Lấy số token chính xác của input trước khi gọi AI
        try {
          const tokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
          setAiStats((prev: any) => prev ? { ...prev, inputTokens: tokens } : null);
        } catch (tokenError) {
          console.warn("Lỗi đếm token:", tokenError);
        }

        const response = await generateJson(
          prompt, 
          CODEX_GENERATION_SCHEMA, 
          activeProxies, 
          'gemini-3.1-pro-preview', 
          activeKeys, 
          geminiConfig,
          (chunk) => setStreamingLog(prev => prev + chunk),
          (status) => setAiStatus(prev => ({ ...prev, ...status })),
          controller.signal
        );
        
        const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
        
        if (result && result.content) {
          setCodex((prev: CodexEntry[]) => prev.map(e => e.id === entry.id ? { ...e, content: result.content } : e));
          if (usage) {
            const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
            setAiStats({
              wordCount: countWords(result.content),
              inputTokens: usage.inputTokens,
              outputTokens: usage.outputTokens,
              processingTime: totalLatency ? totalLatency / 1000 : 0,
              startTime: undefined,
              ttft,
              tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
              estimatedCost
            });
            
            states.setAiLogs((prev: AILog[]) => {
              if (prev.length === 0) return prev;
              const newLogs = [...prev];
              newLogs[0] = {
                ...newLogs[0],
                ttft,
                totalLatency,
                finishReason,
                safetyRatings,
                httpStatusCode,
                requestId,
                estimatedCost,
                tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
                actionType: '[GENERATE_CODEX]',
                parameters: geminiConfig
              };
              return newLogs;
            });
          }
        }
      }
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi viết Codex:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const summarizeCurrent = async () => {
    if (!storyContent) return;
    const controller = createAbortController();
    setIsLoading(true);
    
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: 'Đang tóm tắt bối cảnh...' });
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const summaryPrompt = `Hãy tóm tắt ngắn gọn (khoảng 100-200 từ) những diễn biến quan trọng nhất trong đoạn văn sau để làm bối cảnh cho chương tiếp theo: \n\n${storyContent.slice(-2000000)}`;
      
      setLastFullPrompt(summaryPrompt);
      setStreamingLog('');

      // Lấy số token chính xác của input trước khi gọi AI
      try {
        const tokens = await countTokens(summaryPrompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
        setAiStats((prev: any) => prev ? { ...prev, inputTokens: tokens } : null);
      } catch (tokenError) {
        console.warn("Lỗi đếm token:", tokenError);
      }

      const response = await generateStoryPart(
        summaryPrompt, 
        'gemini-3.1-pro-preview', 
        activeProxies, 
        activeKeys, 
        geminiConfig,
        (chunk) => setStreamingLog(prev => prev + chunk),
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { text: summary, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      
      setCurrentContext(summary);
      if (usage) {
        const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
        setAiStats({
          wordCount: countWords(summary),
          inputTokens: usage.inputTokens,
          outputTokens: usage.outputTokens,
          processingTime: totalLatency ? totalLatency / 1000 : 0,
          startTime: undefined,
          ttft,
          tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
          estimatedCost
        });
        
        states.setAiLogs((prev: AILog[]) => {
          if (prev.length === 0) return prev;
          const newLogs = [...prev];
          newLogs[0] = {
            ...newLogs[0],
            ttft,
            totalLatency,
            finishReason,
            safetyRatings,
            httpStatusCode,
            requestId,
            estimatedCost,
            tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
            actionType: '[SUMMARIZE_CONTEXT]',
            parameters: geminiConfig
          };
          return newLogs;
        });
      } else {
        setAiStats((prev: any) => ({ ...prev, startTime: undefined }));
      }
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi tóm tắt:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateWorldDetails = async () => {
    if (!storyConcept.trim()) {
      return;
    }

    // Lưu trạng thái hiện tại vào lịch sử trước khi tạo mới
    const currentState = {
      storyTitle,
      genre,
      storyTone,
      storyGuidingPrinciple,
      worldInfo,
      worldGeography,
      worldHistory,
      worldCulture,
      worldEconomy,
      worldReligion,
      worldFactions,
      worldRelationships,
      worldUniqueElements,
      powerSystem,
      characters: [...characters],
      codex: [...codex],
      timeline: [...timeline],
      basicOutlineOptions: [...basicOutlineOptions],
      baseOutlineOptions: [...baseOutlineOptions]
    };
    setWorldGenHistory((prev: any[]) => [...prev, currentState]);

    const controller = createAbortController();
    setIsGeneratingWorld(true);
    
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang sáng tạo thế giới (Ý tưởng -> Bối cảnh -> ${worldGenSettings.characterCount} Nhân vật)...` });

    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getWorldDetailsPrompt(
        states.tawaConfig,
        tawaMode,
        storyConcept,
        storyGuidingPrinciple || '',
        protagonistType,
        genre,
        storyTone,
        selectedBasicOutline,
        generateBasicOutlineTreeContext(basicOutlineOptions),
        states.references,
        aiInstructions,
        isRealismEnabled ? getRealismRules(genre) : '',
        worldGenSettings.characterCount,
        worldGenSettings.codexCount,
        worldGenSettings.timelineCount
      );

      setLastFullPrompt(prompt);
      setStreamingLog('');

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        WORLD_GENERATION_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        { ...geminiConfig, temperature: worldGenTemperature },
        (chunk) => {
          setStreamingLog(prev => prev + chunk);
          // Cập nhật số chữ ước tính trong khi stream JSON
          setAiStats((prev: any) => prev ? ({
            ...prev,
            wordCount: Math.ceil((prev.wordCount || 0) + countWords(chunk))
          }) : null);
        },
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      const endTime = Date.now();
      const totalTime = (endTime - startTime) / 1000;

      if (result.storyTitle) setStoryTitle(result.storyTitle);
      // Chỉ cập nhật thể loại, màu sắc và kim chỉ nam nếu hiện tại đang trống hoặc là "Chưa xác định"
      const isGenreEmpty = !states.genre || states.genre === 'Chưa xác định';
      const isToneEmpty = !states.storyTone || states.storyTone === 'Chưa xác định';
      const isGuidingPrincipleEmpty = !states.storyGuidingPrinciple || states.storyGuidingPrinciple.trim() === '';

      if (result.genre && isGenreEmpty) setGenre(result.genre);
      if (result.storyTone && isToneEmpty) setStoryTone(result.storyTone);
      if (result.storyGuidingPrinciple && isGuidingPrincipleEmpty) setStoryGuidingPrinciple(result.storyGuidingPrinciple);
      if (result.worldInfo) setWorldInfo(result.worldInfo);
      if (result.worldGeography) setWorldGeography(result.worldGeography);
      if (result.worldHistory) setWorldHistory(result.worldHistory);
      if (result.worldCulture) setWorldCulture(result.worldCulture);
      if (result.worldEconomy) setWorldEconomy(result.worldEconomy);
      if (result.worldReligion) setWorldReligion(result.worldReligion);
      if (result.worldFactions) setWorldFactions(result.worldFactions);
      if (result.worldRelationships) setWorldRelationships(result.worldRelationships);
      if (result.worldUniqueElements) setWorldUniqueElements(result.worldUniqueElements);
      if (result.logicSystem) setPowerSystem(result.logicSystem);

      // Cập nhật currentContext với thông tin vắn tắt về thế giới để chuẩn bị cho các bước tiếp theo
      if (result.worldInfo) {
        setCurrentContext(`Bối cảnh: ${result.worldInfo.substring(0, 500)}${result.worldInfo.length > 500 ? '...' : ''}`);
      }

      if (result.characters) {
        setCharacters(result.characters.map((c: any) => ({ ...c, id: Math.random().toString(36).substr(2, 9) })));
      }
      if (result.codex) {
        setCodex(result.codex.map((e: any) => ({ ...e, id: Math.random().toString(36).substr(2, 9) })));
      }
      if (result.timeline) {
        setTimeline(result.timeline.map((e: any) => ({ 
          ...e, 
          id: Math.random().toString(36).substr(2, 9),
          month: 1, day: 1, hour: 0, minute: 0, second: 0 
        })));
      }
      
      const estimatedCost = ((usage?.inputTokens || 0) * 0.000000075) + ((usage?.outputTokens || 0) * 0.0000003);

      setAiStats({
        wordCount: countWords(JSON.stringify(result)),
        inputTokens: usage?.inputTokens || 0,
        outputTokens: usage?.outputTokens || 0,
        processingTime: totalTime,
        startTime: undefined,
        ttft,
        tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
        estimatedCost
      });
      
      states.setAiLogs((prev: AILog[]) => {
        if (prev.length === 0) return prev;
        const newLogs = [...prev];
        newLogs[0] = {
          ...newLogs[0],
          ttft,
          totalLatency,
          finishReason,
          safetyRatings,
          httpStatusCode,
          requestId,
          estimatedCost,
          tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
          actionType: '[GENERATE_WORLD]',
          parameters: { ...geminiConfig, temperature: worldGenTemperature }
        };
        return newLogs;
      });
      
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi sáng tạo thế giới:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsGeneratingWorld(false);
    }
  };

  const generateBaseOutlines = async () => {
    const controller = createAbortController();
    setIsGeneratingWorld(true);
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang xây dựng Dàn Ý ${worldGenSettings.outlineOptionCount} phương án...` });
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getRewriteBaseOutlinePrompt(
        tawaConfig,
        tawaMode,
        storyTitle,
        storyConcept,
        storyGuidingPrinciple || '',
        protagonistType || '',
        genre,
        storyTone,
        worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        characters,
        codex,
        timeline,
        0,
        references,
        aiInstructions,
        generateFullOutlineContext(baseOutlines),
        selectedBasicOutline,
        generateBasicOutlineTreeContext(basicOutlineOptions),
        isRealismEnabled ? getRealismRules(genre) : '',
        worldGenSettings.outlineOptionCount
      );

      setLastFullPrompt(prompt);
      setStreamingLog('');

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        BASE_OUTLINE_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        { ...geminiConfig, temperature: worldGenTemperature }, 
        (chunk) => {
          setStreamingLog(prev => prev + chunk);
          // Cập nhật số chữ ước tính trong khi stream JSON
          setAiStats((prev: any) => prev ? ({
            ...prev,
            wordCount: Math.ceil((prev.wordCount || 0) + countWords(chunk))
          }) : null);
        },
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      const totalTime = (Date.now() - startTime) / 1000;
      
      if (result.baseOutlineOptions) {
        setBaseOutlineOptions(result.baseOutlineOptions.map((a: any) => ({ 
          ...a, 
          id: Math.random().toString(36).substr(2, 9),
          chapterOptions: (a.chapterOptions || []).map((c: any) => ({
            ...cleanChapterTitleData(c),
            id: Math.random().toString(36).substr(2, 9)
          }))
        })));
        setBaseOutlines([]);
      }

      const estimatedCost = ((usage?.inputTokens || 0) * 0.000000075) + ((usage?.outputTokens || 0) * 0.0000003);

      setAiStats({
        wordCount: countWords(JSON.stringify(result)),
        inputTokens: usage?.inputTokens || 0,
        outputTokens: usage?.outputTokens || 0,
        processingTime: totalTime,
        startTime: undefined,
        ttft,
        tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
        estimatedCost
      });

      states.setAiLogs((prev: AILog[]) => {
        if (prev.length === 0) return prev;
        const newLogs = [...prev];
        newLogs[0] = {
          ...newLogs[0],
          ttft,
          totalLatency,
          finishReason,
          safetyRatings,
          httpStatusCode,
          requestId,
          estimatedCost,
          tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
          actionType: '[GENERATE_BASE_OUTLINES]',
          parameters: { ...geminiConfig, temperature: worldGenTemperature }
        };
        return newLogs;
      });
      
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi xây dựng Dàn Ý các phương án:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsGeneratingWorld(false);
    }
  };

  const generateNextArcsBranching = async () => {
    const controller = createAbortController();
    setIsLoading(true);
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: 'Đang phác thảo cây rẽ nhánh cho Arc tiếp theo...' });
    setBasicOutlineOptions([]);
    useStoryStore.getState().setActiveBranchingPath([]);
    setBranchingContext('arc');
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getArcBranchingPrompt(
        tawaConfig,
        tawaMode,
        storyTitle,
        storyConcept,
        storyGuidingPrinciple,
        protagonistType,
        genre,
        storyTone,
        worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        characters,
        generateFullOutlineContext(baseOutlines),
        states.branchingSettings,
        aiInstructions,
        branchingSuggestion,
        isRealismEnabled ? getRealismRules(genre) : ''
      );

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        BASIC_OUTLINE_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        { ...geminiConfig, temperature: 1.0 }, 
        undefined,
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { data: result, usage, ttft, totalLatency } = response;
      const totalTime = totalLatency ? totalLatency / 1000 : (Date.now() - startTime) / 1000;
      
      if (result && result.basicOutlineOptions) {
        setBasicOutlineOptions(result.basicOutlineOptions.map((o: any) => ({
          ...o,
          id: Math.random().toString(36).substr(2, 9),
          keyPlotPoints: o.keyPlotPoints || [],
          potentialBranches: o.potentialBranches || [],
          children: []
        })));
        setActiveView('outline');

        if (usage) {
          const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
          setAiStats({
            wordCount: countWords(JSON.stringify(result)),
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            processingTime: totalTime,
            startTime: undefined,
            ttft,
            tps: totalTime > 0 ? usage.outputTokens / totalTime : 0,
            estimatedCost
          });
        }
      }
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi phác thảo Arc đa nhánh:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateChapterBranching = async (baseOutlineId: string) => {
    const baseOutline = baseOutlines.find(a => a.id === baseOutlineId);
    if (!baseOutline) return;

    const controller = createAbortController();
    setIsLoading(true);
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang phác thảo cây rẽ nhánh cho Chương tiếp theo của "${baseOutline.title}"...` });
    setBasicOutlineOptions([]);
    useStoryStore.getState().setActiveBranchingPath([]);
    setBranchingContext('chapter');
    states.setActiveBranchingBaseOutlineId?.(baseOutlineId); // We'll need to add this to state
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getChapterBranchingPrompt(
        tawaConfig,
        tawaMode,
        storyTitle,
        storyConcept,
        storyGuidingPrinciple,
        protagonistType,
        genre,
        storyTone,
        worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        characters,
        baseOutline,
        generateFullOutlineContext(baseOutlines, baseOutlineId),
        states.branchingSettings,
        aiInstructions,
        branchingSuggestion,
        isRealismEnabled ? getRealismRules(genre) : ''
      );

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokensChapter = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokensChapter }) : null);

      const response = await generateJson(
        prompt, 
        BASIC_OUTLINE_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        { ...geminiConfig, temperature: 1.0 }, 
        undefined,
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { data: result, usage, ttft, totalLatency } = response;
      const totalTime = totalLatency ? totalLatency / 1000 : (Date.now() - startTime) / 1000;
      
      if (result && result.basicOutlineOptions) {
        setBasicOutlineOptions(result.basicOutlineOptions.map((o: any) => ({
          ...o,
          id: Math.random().toString(36).substr(2, 9),
          keyPlotPoints: o.keyPlotPoints || [],
          potentialBranches: o.potentialBranches || [],
          children: []
        })));
        setActiveView('outline');

        if (usage) {
          const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
          setAiStats({
            wordCount: countWords(JSON.stringify(result)),
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            processingTime: totalTime,
            startTime: undefined,
            ttft,
            tps: totalTime > 0 ? usage.outputTokens / totalTime : 0,
            estimatedCost
          });
        }
      }
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi phác thảo Chương đa nhánh:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateBasicOutlineChildren = async (parentOption: BasicOutlineOption, level: number, customBranches?: number, customTotalLevels?: number, ancestors: BasicOutlineOption[] = []) => {
    const controller = createAbortController();
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    
    // Update global totalLevels if provided
    if (customTotalLevels !== undefined) {
      states.setBranchingSettings((prev: any) => ({ ...prev, totalLevels: customTotalLevels }));
    }

    const branchesToUse = customBranches !== undefined ? customBranches : states.branchingSettings.branchesPerLevel;
    const effectiveBranchingSettings = {
      ...states.branchingSettings,
      branchesPerLevel: branchesToUse,
      totalLevels: customTotalLevels !== undefined ? customTotalLevels : states.branchingSettings.totalLevels
    };

    // Set loading state for the specific option
    setBasicOutlineOptions(prev => {
      const updateNode = (options: BasicOutlineOption[]): BasicOutlineOption[] => {
        return options.map(o => {
          if (o.id === parentOption.id) {
            return { ...o, isGeneratingChildren: true };
          }
          if (o.children && o.children.length > 0) {
            return { ...o, children: updateNode(o.children) };
          }
          return o;
        });
      };
      return updateNode(prev);
    });

    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang tạo rẽ nhánh cấp độ ${level} cho "${parentOption.title}"...` });

    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      let prompt = '';
      if (branchingContext === 'global') {
        prompt = getBasicOutlineChildrenPrompt(
          tawaConfig,
          tawaMode,
          storyTitle,
          storyConcept,
          storyGuidingPrinciple,
          protagonistType,
          genre,
          storyTone,
          worldGeography,
          worldHistory,
          worldCulture,
          worldEconomy,
          worldReligion,
          worldFactions,
          worldRelationships,
          worldUniqueElements,
          powerSystem,
          parentOption,
          ancestors,
          level,
          effectiveBranchingSettings,
          aiInstructions,
          branchingSuggestion,
          isRealismEnabled ? getRealismRules(genre) : ''
        );
      } else if (branchingContext === 'arc') {
        prompt = getArcBranchingChildrenPrompt(
          tawaConfig,
          tawaMode,
          storyTitle,
          storyConcept,
          storyGuidingPrinciple,
          protagonistType,
          genre,
          storyTone,
          worldInfo,
          worldGeography,
          worldHistory,
          worldCulture,
          worldEconomy,
          worldReligion,
          worldFactions,
          worldRelationships,
          worldUniqueElements,
          powerSystem,
          parentOption,
          ancestors,
          level,
          effectiveBranchingSettings,
          aiInstructions,
          branchingSuggestion,
          isRealismEnabled ? getRealismRules(genre) : ''
        );
      } else {
        // chapter branching children
        prompt = getArcBranchingChildrenPrompt(
          tawaConfig,
          tawaMode,
          storyTitle,
          storyConcept,
          storyGuidingPrinciple,
          protagonistType,
          genre,
          storyTone,
          worldInfo,
          worldGeography,
          worldHistory,
          worldCulture,
          worldEconomy,
          worldReligion,
          worldFactions,
          worldRelationships,
          worldUniqueElements,
          powerSystem,
          parentOption,
          ancestors,
          level,
          effectiveBranchingSettings,
          aiInstructions,
          branchingSuggestion,
          isRealismEnabled ? getRealismRules(genre) : ''
        );
      }

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const newLogId = Date.now().toString();
      states.setAiLogs((prev: any) => [{
        id: newLogId,
        prompt: prompt,
        response: "",
        timestamp: Date.now(),
        isProcessing: true,
        modelName: 'gemini-3.1-pro-preview',
        actionType: `[GENERATE_OUTLINE_BRANCHES]`,
        inputTokens: exactInputTokens
      }, ...prev]);

      const response = await generateJson(
        prompt, 
        BASIC_OUTLINE_CHILDREN_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        { ...geminiConfig, temperature: 1.0 }, 
        undefined,
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      const totalTime = totalLatency ? totalLatency / 1000 : (Date.now() - startTime) / 1000;
      
      states.setAiLogs((prev: AILog[]) => {
        if (prev.length === 0) return prev;
        const newLogs = [...prev];
        const logIdx = newLogs.findIndex(l => l.id === newLogId);
        if (logIdx === -1) return prev;
        
        newLogs[logIdx] = {
          ...newLogs[logIdx],
          isProcessing: false,
          response: JSON.stringify(result, null, 2),
          outputTokens: usage?.outputTokens || estimateTokens(JSON.stringify(result)),
          ttft,
          totalLatency,
          finishReason,
          safetyRatings,
          httpStatusCode,
          requestId
        };
        return newLogs;
      });

      if (result && result.children) {
        const childrenWithIds = result.children.map((c: any) => ({
          ...c,
          id: Math.random().toString(36).substr(2, 9),
          keyPlotPoints: c.keyPlotPoints || [],
          potentialBranches: c.potentialBranches || [],
          children: []
        }));

        if (usage) {
          const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
          setAiStats({
            wordCount: countWords(JSON.stringify(result)),
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            processingTime: totalTime,
            startTime: undefined,
            ttft,
            tps: totalTime > 0 ? usage.outputTokens / totalTime : 0,
            estimatedCost
          });
        }

        setBasicOutlineOptions(prev => {
          const updateNode = (options: BasicOutlineOption[]): BasicOutlineOption[] => {
            return options.map(o => {
              if (o.id === parentOption.id) {
                return { ...o, children: childrenWithIds, isGeneratingChildren: false };
              }
              if (o.children && o.children.length > 0) {
                return { ...o, children: updateNode(o.children) };
              }
              return o;
            });
          };
          return updateNode(prev);
        });
        return childrenWithIds;
      }
      return null;
    } catch (error: any) {
      if (error.name === 'AbortError' || error.message === "Yêu cầu đã bị hủy bởi người dùng." || error.message === "The operation was aborted") {
        console.log("Generation aborted");
        setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: null, currentAction: 'Đã dừng xử lý.' }));
        setAiStats((prev: any) => prev ? ({ ...prev, startTime: undefined }) : null);
      } else {
        console.error("Lỗi tạo nhánh con:", error);
        setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
        setAiStats((prev: any) => prev ? ({ ...prev, startTime: undefined }) : null);
      }
      
      setBasicOutlineOptions(prev => {
        const updateNode = (options: BasicOutlineOption[]): BasicOutlineOption[] => {
          return options.map(o => {
            if (o.id === parentOption.id) {
              return { ...o, isGeneratingChildren: false };
            }
            if (o.children && o.children.length > 0) {
              return { ...o, children: updateNode(o.children) };
            }
            return o;
          });
        };
        return updateNode(prev);
      });
      return null;
    } finally {
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    }
  };

  const handleGenerateBaseOutlines = async () => {
    const controller = createAbortController();
    setIsLoading(true);
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: Date.now()
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang xây dựng ${worldGenSettings.outlineOptionCount} phương án Dàn ý cơ sở chi tiết...` });
    setBaseOutlineOptions([]);
    
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getRewriteBaseOutlinePrompt(
        tawaConfig,
        tawaMode,
        storyTitle,
        storyConcept,
        storyGuidingPrinciple,
        protagonistType,
        genre,
        storyTone,
        worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        characters,
        codex,
        timeline,
        0,
        states.references,
        aiInstructions,
        '',
        selectedBasicOutline,
        generateBasicOutlineTreeContext(basicOutlineOptions),
        isRealismEnabled ? getRealismRules(genre) : '',
        states.worldGenSettings.outlineOptionCount
      );

      setLastFullPrompt(prompt);
      setStreamingLog('');

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        BASE_OUTLINE_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        geminiConfig,
        (chunk) => setStreamingLog(prev => prev + chunk),
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      
      if (result && result.baseOutlineOptions) {
        // Xử lý cập nhật Story Bible nếu AI đề xuất
        if (result.bibleUpdates) {
          applyBibleUpdates(result.bibleUpdates);
        }

        setBaseOutlineOptions(result.baseOutlineOptions.map((a: any) => ({
          ...a,
          id: Math.random().toString(36).substr(2, 9),
          chapterOptions: (a.chapterOptions || []).map((c: any) => ({
            ...cleanChapterTitleData(c),
            id: Math.random().toString(36).substr(2, 9)
          }))
        })));
        setBaseOutlines([]);
        setActiveView('outline');

        if (usage) {
          const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
          setAiStats({
            wordCount: countWords(JSON.stringify(result)),
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            processingTime: totalLatency ? totalLatency / 1000 : 0,
            startTime: undefined,
            ttft,
            tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
            estimatedCost
          });
          
          states.setAiLogs((prev: AILog[]) => {
            if (prev.length === 0) return prev;
            const newLogs = [...prev];
            newLogs[0] = {
              ...newLogs[0],
              ttft,
              totalLatency,
              finishReason,
              safetyRatings,
              httpStatusCode,
              requestId,
              estimatedCost,
              tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
              actionType: '[GENERATE_BASE_OUTLINES]',
              parameters: geminiConfig
            };
            return newLogs;
          });
        }
      }
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi xây dựng dàn ý cơ sở:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateBasicOutlines = async () => {
    const controller = createAbortController();
    setIsLoading(true);
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: Date.now()
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang phác thảo cây cốt truyện đa nhánh (${states.branchingSettings.branchesPerLevel} -> 5 -> 5 -> 5)...` });
    setBasicOutlineOptions([]);
    useStoryStore.getState().setActiveBranchingPath([]);
    setBranchingContext('global');
    
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getBasicOutlinePrompt(
        tawaConfig,
        tawaMode,
        storyTitle,
        storyConcept,
        storyGuidingPrinciple,
        protagonistType,
        genre,
        storyTone,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        states.branchingSettings,
        aiInstructions,
        branchingSuggestion,
        isRealismEnabled ? getRealismRules(genre) : ''
      );

      setLastFullPrompt(prompt);
      setStreamingLog('');

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        BASIC_OUTLINE_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        { ...geminiConfig, temperature: 1.0 }, 
        (chunk) => setStreamingLog(prev => prev + chunk),
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      
      if (result && result.basicOutlineOptions) {
        const optionsWithIds = result.basicOutlineOptions.map((o: any) => ({
          ...o,
          id: Math.random().toString(36).substr(2, 9),
          keyPlotPoints: o.keyPlotPoints || [],
          potentialBranches: o.potentialBranches || [],
          children: []
        }));

        setBasicOutlineOptions(optionsWithIds);
        setActiveView('outline');

        if (usage) {
          const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
          setAiStats({
            wordCount: countWords(JSON.stringify(result)),
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            processingTime: totalLatency ? totalLatency / 1000 : 0,
            startTime: undefined,
            ttft,
            tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
            estimatedCost
          });
          
          states.setAiLogs((prev: AILog[]) => {
            if (prev.length === 0) return prev;
            const newLogs = [...prev];
            newLogs[0] = {
              ...newLogs[0],
              ttft,
              totalLatency,
              finishReason,
              safetyRatings,
              httpStatusCode,
              requestId,
              estimatedCost,
              tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
              actionType: '[GENERATE_BASIC_OUTLINES]',
              parameters: geminiConfig
            };
            return newLogs;
          });
        }
      }
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi phác thảo dàn ý cơ bản:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSpecificWorldField = async (fieldName: string, fieldLabel: string, setterFn: (val: string) => void) => {
    const controller = createAbortController();
    setIsGeneratingWorld(true);
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: Date.now()
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang sáng tạo ${fieldLabel}...` });
    setStreamingLog('');
    states.setStreamingContent('');

    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];

      const { getSpecificWorldFieldPrompt } = await import('../../constants/prompts/world');
      
      const prompt = getSpecificWorldFieldPrompt(
        tawaConfig,
        tawaMode,
        fieldName,
        fieldLabel,
        storyConcept,
        genre,
        storyTone,
        worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        aiInstructions
      );

      setLastFullPrompt(prompt);

      let fullText = "";
      const exactInputTokens = await countTokens(prompt, selectedModel, activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateStoryPart(
        prompt, 
        selectedModel, 
        activeProxies, 
        activeKeys, 
        geminiConfig, 
        (chunk) => {
          fullText += chunk;
          setStreamingLog(prev => prev + chunk);
          states.setStreamingContent(fullText);
          setterFn(fullText); // Cập nhật trực tiếp vào trường dữ liệu khi streaming
        },
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      
      setterFn(response.text || fullText);

      if (usage) {
        const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
        setAiStats({
          wordCount: countWords(response.text || fullText),
          inputTokens: usage.inputTokens,
          outputTokens: usage.outputTokens,
          processingTime: totalLatency ? totalLatency / 1000 : 0,
          startTime: undefined,
          ttft,
          tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
          estimatedCost
        });
        
        states.setAiLogs((prev: AILog[]) => {
          if (prev.length === 0) return prev;
          const newLogs = [...prev];
          newLogs[0] = {
            ...newLogs[0],
            ttft,
            totalLatency,
            finishReason,
            safetyRatings,
            httpStatusCode,
            requestId,
            estimatedCost,
            tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
            actionType: '[GENERATE_SPECIFIC_WORLD_FIELD]',
            parameters: geminiConfig
          };
          return newLogs;
        });
      }
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      if (error.name === 'AbortError' || error.message === "Yêu cầu đã bị hủy bởi người dùng." || error.message === "The operation was aborted") {
        console.log("Generation aborted");
        setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: null, currentAction: 'Đã dừng xử lý.' }));
        setAiStats((prev: any) => prev ? ({ ...prev, startTime: undefined }) : null);
        states.setStreamingContent('');
        return;
      }
      console.error(`Lỗi sáng tạo ${fieldLabel}:`, error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsGeneratingWorld(false);
      states.setStreamingContent('');
    }
  };

  const undoWorldGeneration = () => {
    if (worldGenHistory.length === 0) return;
    
    const lastState = worldGenHistory[worldGenHistory.length - 1];
    setWorldGenHistory((prev: any[]) => prev.slice(0, -1));

    if (lastState.storyTitle !== undefined) setStoryTitle(lastState.storyTitle);
    if (lastState.genre !== undefined) setGenre(lastState.genre);
    if (lastState.storyTone !== undefined) setStoryTone(lastState.storyTone);
    if (lastState.storyGuidingPrinciple !== undefined) setStoryGuidingPrinciple(lastState.storyGuidingPrinciple);
    if (lastState.worldInfo !== undefined) setWorldInfo(lastState.worldInfo);
    if (lastState.worldGeography !== undefined) setWorldGeography(lastState.worldGeography);
    if (lastState.worldHistory !== undefined) setWorldHistory(lastState.worldHistory);
    if (lastState.worldCulture !== undefined) setWorldCulture(lastState.worldCulture);
    if (lastState.worldEconomy !== undefined) setWorldEconomy(lastState.worldEconomy);
    if (lastState.worldReligion !== undefined) setWorldReligion(lastState.worldReligion);
    if (lastState.worldFactions !== undefined) setWorldFactions(lastState.worldFactions);
    if (lastState.worldRelationships !== undefined) setWorldRelationships(lastState.worldRelationships);
    if (lastState.worldUniqueElements !== undefined) setWorldUniqueElements(lastState.worldUniqueElements);
    if (lastState.powerSystem !== undefined) setPowerSystem(lastState.powerSystem);
    if (lastState.characters !== undefined) setCharacters(lastState.characters);
    if (lastState.codex !== undefined) setCodex(lastState.codex);
    if (lastState.timeline !== undefined) setTimeline(lastState.timeline);
    if (lastState.baseOutlineOptions !== undefined) setBaseOutlineOptions(lastState.baseOutlineOptions);
    if (lastState.basicOutlineOptions !== undefined) setBasicOutlineOptions(lastState.basicOutlineOptions);
  };

  const generateNextArcs = async () => {
    const controller = createAbortController();
    setIsLoading(true);
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: Date.now()
    });
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang sáng tạo ${worldGenSettings.outlineOptionCount} Arc tiếp theo...` });
    setBaseOutlineOptions([]);
    
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });
    
    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getGenerateNextArcsPrompt(
        tawaConfig,
        tawaMode,
        storyTitle,
        storyConcept,
        storyGuidingPrinciple,
        protagonistType,
        genre,
        storyTone,
        worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        characters,
        codex,
        timeline,
        generateFullOutlineContext(baseOutlines),
        aiInstructions,
        isRealismEnabled ? getRealismRules(genre) : '',
        worldGenSettings.outlineOptionCount
      );

      setLastFullPrompt(prompt);
      setStreamingLog('');

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        GENERATE_NEXT_ARCS_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        geminiConfig,
        (chunk) => setStreamingLog(prev => prev + chunk),
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      
      if (result && result.nextArcOptions) {
        // Xử lý cập nhật Story Bible nếu AI đề xuất
        if (result.bibleUpdates) {
          applyBibleUpdates(result.bibleUpdates);
        }

        const mappedOptions = result.nextArcOptions.map((arc: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          title: arc.title,
          summary: arc.summary,
          chapterOptions: arc.chapters.map((c: any) => ({
            id: Math.random().toString(36).substr(2, 9),
            ...cleanChapterTitleData(c)
          }))
        }));

        setBaseOutlineOptions(mappedOptions);
        // Không chuyển sang view world nữa, ở lại OutlineView để người dùng chọn
        setActiveView('outline');

        if (usage) {
          const estimatedCost = ((usage.inputTokens || 0) * 0.000000075) + ((usage.outputTokens || 0) * 0.0000003);
          setAiStats({
            wordCount: countWords(JSON.stringify(result)),
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            processingTime: totalLatency ? totalLatency / 1000 : 0,
            startTime: undefined,
            ttft,
            tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
            estimatedCost
          });
          
          states.setAiLogs((prev: AILog[]) => {
            if (prev.length === 0) return prev;
            const newLogs = [...prev];
            newLogs[0] = {
              ...newLogs[0],
              ttft,
              totalLatency,
              finishReason,
              safetyRatings,
              httpStatusCode,
              requestId,
              estimatedCost,
              tps: totalLatency && totalLatency > 0 ? usage.outputTokens / (totalLatency / 1000) : 0,
              actionType: '[GENERATE_NEXT_ARCS]',
              parameters: geminiConfig
            };
            return newLogs;
          });
        }
      }
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi sáng tạo Arc tiếp theo:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const rewriteChapters = async (baseOutlineId: string) => {
    const baseOutline = baseOutlines.find(a => a.id === baseOutlineId);
    if (!baseOutline) return;

    setIsGeneratingWorld(true);
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang viết các Chương cho Dàn ý cơ sở: ${baseOutline.title}...` });
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });

    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getRewriteChaptersPrompt(
        tawaConfig,
        tawaMode,
        worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        genre,
        storyTone,
        storyGuidingPrinciple,
        protagonistType,
        characters,
        codex,
        timeline,
        states.references,
        baseOutline,
        aiInstructions,
        generateFullOutlineContext(baseOutlines, baseOutlineId),
        isRealismEnabled ? getRealismRules(genre) : ''
      );

      setLastFullPrompt(prompt);
      setStreamingLog('');

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        CHAPTERS_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        geminiConfig,
        (chunk) => {
          setStreamingLog(prev => prev + chunk);
          setAiStats((prev: any) => prev ? ({
            ...prev,
            wordCount: Math.ceil((prev.wordCount || 0) + countWords(chunk))
          }) : null);
        },
        (status) => setAiStatus(prev => ({ ...prev, ...status }))
      );
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      const endTime = Date.now();
      const totalTime = (endTime - startTime) / 1000;

      // Xử lý cập nhật Story Bible nếu AI đề xuất
      if (result.bibleUpdates) {
        applyBibleUpdates(result.bibleUpdates);
      }

      if (result.chapters) {
        setBaseOutlines((prev: BaseOutline[]) => prev.map(a => {
          if (a.id === baseOutlineId) {
            return {
              ...a,
              chapters: result.chapters.map((c: any) => ({
                ...cleanChapterTitleData(c),
                id: Math.random().toString(36).substr(2, 9),
                status: 'not_started',
                wordCount: 0,
                score: 0,
                versions: []
              }))
            };
          }
          return a;
        }));
      }
      
      const estimatedCost = ((usage?.inputTokens || 0) * 0.000000075) + ((usage?.outputTokens || 0) * 0.0000003);

      setAiStats({
        wordCount: countWords(JSON.stringify(result)),
        inputTokens: usage?.inputTokens || 0,
        outputTokens: usage?.outputTokens || 0,
        processingTime: totalTime,
        startTime: undefined,
        ttft,
        tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
        estimatedCost
      });
      
      states.setAiLogs((prev: AILog[]) => {
        if (prev.length === 0) return prev;
        const newLogs = [...prev];
        newLogs[0] = {
          ...newLogs[0],
          ttft,
          totalLatency,
          finishReason,
          safetyRatings,
          httpStatusCode,
          requestId,
          estimatedCost,
          tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
          actionType: '[REWRITE_CHAPTERS]',
          parameters: geminiConfig
        };
        return newLogs;
      });
      
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi viết lại chương:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsGeneratingWorld(false);
    }
  };

  const generateChapterOptions = async (baseOutlineId: string) => {
    const baseOutline = baseOutlines.find(a => a.id === baseOutlineId);
    if (!baseOutline) return;

    const nextChapterIndex = baseOutline.chapters.length + 1;
    const versionCount = worldGenSettings.chapterVersionCount || 10;

    setIsGeneratingWorld(true);
    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang viết ${versionCount} phiên bản cho Chương ${nextChapterIndex} của Dàn ý cơ sở: ${baseOutline.title}...` });
    setChapterOptions([]);
    const startTime = Date.now();
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });

    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getChapterVersionsPrompt(
        tawaConfig,
        tawaMode,
        worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        powerSystem,
        genre,
        storyTone,
        storyGuidingPrinciple,
        protagonistType,
        characters,
        codex,
        timeline,
        states.references,
        baseOutline,
        nextChapterIndex,
        versionCount,
        aiInstructions,
        generateFullOutlineContext(baseOutlines),
        isRealismEnabled ? getRealismRules(genre) : ''
      );

      setLastFullPrompt(prompt);
      setStreamingLog('');

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        CHAPTER_VERSIONS_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        geminiConfig,
        (chunk) => {
          setStreamingLog(prev => prev + chunk);
          setAiStats((prev: any) => prev ? ({
            ...prev,
            wordCount: Math.ceil((prev.wordCount || 0) + countWords(chunk))
          }) : null);
        },
        (status) => setAiStatus(prev => ({ ...prev, ...status }))
      );
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      const endTime = Date.now();
      const totalTime = (endTime - startTime) / 1000;

      // Xử lý cập nhật Story Bible nếu AI đề xuất
      if (result.bibleUpdates) {
        applyBibleUpdates(result.bibleUpdates);
      }

      if (result.versions) {
        setChapterOptions(result.versions.map((v: any) => ({
          ...cleanChapterTitleData(v),
          id: Math.random().toString(36).substr(2, 9),
          parts: []
        })));
      }
      
      const estimatedCost = ((usage?.inputTokens || 0) * 0.000000075) + ((usage?.outputTokens || 0) * 0.0000003);

      setAiStats({
        wordCount: countWords(JSON.stringify(result)),
        inputTokens: usage?.inputTokens || 0,
        outputTokens: usage?.outputTokens || 0,
        processingTime: totalTime,
        startTime: undefined,
        ttft,
        tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
        estimatedCost
      });
      
      states.setAiLogs((prev: AILog[]) => {
        if (prev.length === 0) return prev;
        const newLogs = [...prev];
        newLogs[0] = {
          ...newLogs[0],
          ttft,
          totalLatency,
          finishReason,
          safetyRatings,
          httpStatusCode,
          requestId,
          estimatedCost,
          tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
          actionType: '[GENERATE_CHAPTER_OPTIONS]',
          parameters: geminiConfig
        };
        return newLogs;
      });
      
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi tạo phiên bản chương:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsGeneratingWorld(false);
    }
  };

  const selectChapterForWriting = (_chapterTitle: string, _chapterSummary: string, chapterId: string) => {
    // Find chapter info
    let currentChapterObj: any;
    for (const baseOutline of baseOutlines) {
      for (const chapter of baseOutline.chapters) {
        if (chapter.id === chapterId) {
          currentChapterObj = chapter;
          break;
        }
      }
      if (currentChapterObj) break;
    }

    if (currentChapterObj) {
      setCurrentChapterId(chapterId);
      setSelectedChapter(currentChapterObj);
      setActiveView('editor');
    }
  };

  const handleRewriteBaseOutlineOptions = async () => {
    const controller = createAbortController();
    setIsGeneratingWorld(true);
    const startTime = Date.now();
    const currentBaseOutlineIndex = baseOutlines.length + 1;

    setAiStatus({ isProcessing: true, retryCount: 0, lastError: null, currentAction: `Đang viết lại các phương án cho Dàn ý cơ sở ${currentBaseOutlineIndex}...` });
    setBaseOutlineOptions([]);
    setAiStats({
      wordCount: 0,
      inputTokens: 0,
      outputTokens: 0,
      processingTime: 0,
      startTime: startTime
    });

    try {
      const activeProxies = isProxyEnabled ? proxies.filter(p => p.isActive) : [];
      const activeKeys = isGeminiEnabled ? geminiApiKeys.filter(k => k.isActive).map(k => k.key) : [];
      
      const prompt = getRewriteBaseOutlinePrompt(
        states.tawaConfig,
        states.tawaMode,
        states.storyTitle,
        states.storyConcept,
        states.storyGuidingPrinciple || '',
        states.protagonistType || '',
        states.genre,
        states.storyTone,
        states.worldInfo,
        worldGeography,
        worldHistory,
        worldCulture,
        worldEconomy,
        worldReligion,
        worldFactions,
        worldRelationships,
        worldUniqueElements,
        states.powerSystem,
        states.characters,
        states.codex,
        states.timeline,
        currentBaseOutlineIndex,
        states.references,
        states.aiInstructions,
        generateFullOutlineContext(baseOutlines),
        states.selectedBasicOutline,
        generateBasicOutlineTreeContext(basicOutlineOptions),
        isRealismEnabled ? getRealismRules(genre) : '',
        states.worldGenSettings.outlineOptionCount
      );

      setLastFullPrompt(prompt);
      setStreamingLog('');

      // Lấy số token chính xác của input TRƯỚC khi gọi AI
      const exactInputTokens = await countTokens(prompt, 'gemini-3.1-pro-preview', activeProxies, activeKeys);
      setAiStats((prev: any) => prev ? ({ ...prev, inputTokens: exactInputTokens }) : null);

      const response = await generateJson(
        prompt, 
        BASE_OUTLINE_SCHEMA, 
        activeProxies, 
        'gemini-3.1-pro-preview', 
        activeKeys, 
        { ...geminiConfig, temperature: worldGenTemperature },
        (chunk) => {
          setStreamingLog(prev => prev + chunk);
        },
        (status) => setAiStatus(prev => ({ ...prev, ...status })),
        controller.signal
      );
      const { data: result, usage, ttft, totalLatency, finishReason, safetyRatings, httpStatusCode, requestId } = response;
      const endTime = Date.now();
      const totalTime = (endTime - startTime) / 1000;

      // Xử lý cập nhật Story Bible nếu AI đề xuất
      if (result.bibleUpdates) {
        applyBibleUpdates(result.bibleUpdates);
      }

      if (result.baseOutlineOptions) {
        setBaseOutlineOptions(result.baseOutlineOptions.map((a: any) => ({ 
          ...a, 
          id: Math.random().toString(36).substr(2, 9),
          chapterOptions: a.chapterOptions || []
        })));
        setActiveView('outline');
      }
      
      const estimatedCost = ((usage?.inputTokens || 0) * 0.000000075) + ((usage?.outputTokens || 0) * 0.0000003);

      setAiStats({
        wordCount: countWords(JSON.stringify(result)),
        inputTokens: usage?.inputTokens || 0,
        outputTokens: usage?.outputTokens || 0,
        processingTime: totalTime,
        startTime: undefined,
        ttft,
        tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
        estimatedCost
      });
      
      states.setAiLogs((prev: AILog[]) => {
        if (prev.length === 0) return prev;
        const newLogs = [...prev];
        newLogs[0] = {
          ...newLogs[0],
          ttft,
          totalLatency,
          finishReason,
          safetyRatings,
          httpStatusCode,
          requestId,
          estimatedCost,
          tps: totalTime > 0 ? (usage?.outputTokens || 0) / totalTime : 0,
          actionType: '[REWRITE_BASE_OUTLINE]',
          parameters: { ...geminiConfig, temperature: worldGenTemperature }
        };
        return newLogs;
      });
      
      setAiStatus({ isProcessing: false, retryCount: 0, lastError: null, currentAction: null });
    } catch (error: any) {
      console.error("Lỗi viết lại Dàn ý cơ sở:", error);
      setAiStatus(prev => ({ ...prev, isProcessing: false, lastError: error.message }));
      setAiStats((prev: any) => prev ? { ...prev, startTime: undefined } : null);
    } finally {
      setIsGeneratingWorld(false);
    }
  };

  useEffect(() => {
    const handleRewriteEvent = () => handleRewriteBaseOutlineOptions();
    const handleGenerateNextArcsEvent = () => generateNextArcs();
    const handleGenerateChapterVersions = (e: any) => {
      const { baseOutlineId } = e.detail;
      generateChapterOptions(baseOutlineId);
    };

    window.addEventListener('rewrite-base-outline-options', handleRewriteEvent);
    window.addEventListener('generate-next-arcs-event', handleGenerateNextArcsEvent);
    window.addEventListener('generate-chapter-versions', handleGenerateChapterVersions);

    return () => {
      window.removeEventListener('rewrite-base-outline-options', handleRewriteEvent);
      window.removeEventListener('generate-next-arcs-event', handleGenerateNextArcsEvent);
      window.removeEventListener('generate-chapter-versions', handleGenerateChapterVersions);
    };
  }, [handleGenerateWorldDetails, states, baseOutlines, worldInfo, characters, codex, timeline, genre, storyTone, protagonistType, powerSystem, tawaConfig, tawaMode, aiInstructions]);

  const regenerateRootBranching = async () => {
    if (branchingContext === 'global') {
      await generateBasicOutlines();
    } else if (branchingContext === 'arc') {
      await generateNextArcsBranching();
    } else if (branchingContext === 'chapter' && states.activeBranchingBaseOutlineId) {
      await generateChapterBranching(states.activeBranchingBaseOutlineId);
    }
  };

  return {
    handleGenerate,
    handleContinue,
    handleRewrite,
    handleWriteNextChapter,
    stopGeneration,
    generateCharacterAI,
    generateBasicOutlines,
    generateBasicOutlineChildren,
    handleGenerateBaseOutlines,
    generateBaseOutlines,
    summarizeCurrent,
    handleGenerateWorldDetails,
    generateSpecificWorldField,
    undoWorldGeneration,
    rewriteChapters,
    generateNextArcs,
    generateChapterOptions,
    selectChapterForWriting,
    generateAllCodexAI,
    generateNextArcsBranching,
    generateChapterBranching,
    regenerateRootBranching
  };
}

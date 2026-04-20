import { 
  Character, 
  BaseOutline, 
  BaseOutlineOption, 
  ReferenceMaterial, 
  CodexEntry, 
  TimelineEvent,
  StoryFile
} from '../../types';
import { toast } from 'sonner';

export function useStoryCrudActions(states: any, bibleActions: any) {
  const { applyBibleUpdates } = bibleActions;
  const {
    characters, setCharacters,
    baseOutlines, setBaseOutlines,
    baseOutlineOptions, setBaseOutlineOptions,
    setStoryContent,
    storyContent,
    storyTitle, setStoryTitle,
    storyConcept, setStoryConcept,
    storyGuidingPrinciple, setStoryGuidingPrinciple,
    genre, setGenre,
    protagonistType, setProtagonistType,
    storyTone, setStoryTone,
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
    references, setReferences,
    codex, setCodex,
    timeline, setTimeline,
    basicOutlineOptions, setBasicOutlineOptions,
    selectedBasicOutline, setSelectedBasicOutline,
    aiInstructions, setAiInstructions,
    tawaMode,
    tawaConfig, setTawaConfig,
    setActiveView,
    setSavedStories,
    setPrompt,
    setAiLogs,
    setStreamingLog,
    setAiStats,
    setLastBibleUpdate,
    setCurrentChapterId,
    setWorldGenHistory,
    setChapterOptions,
    setSelectedChapter,
    currentContext, setCurrentContext,
    branchingContext, setBranchingContext,
    branchingSettings, setBranchingSettings,
    branchingSuggestion, setBranchingSuggestion,
    isRealismEnabled, setIsRealismEnabled,
    worldGenTemperature, setWorldGenTemperature,
    worldGenSettings, setWorldGenSettings,
  } = states;

  const addNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast.info(message);
        break;
    }
  };

  const removeNotification = (_id: string) => {
    // Sonner handles this automatically or via toast.dismiss()
  };

  const addCharacter = () => {
    const newChar: Character = {
      id: Date.now().toString(),
      name: 'Nhân vật mới',
      title: 'Chưa rõ',
      occupation: 'Chưa rõ',
      gender: 'Chưa rõ',
      age: 'Chưa rõ',
      birthDate: 'Chưa rõ',
      role: 'Vai trò',
      personality: 'Chưa rõ',
      traits: 'Chưa rõ',
      appearance: 'Chưa rõ',
      originAndFaction: 'Chưa rõ',
      sexualExperience: 'Chưa rõ',
      relationships: 'Chưa rõ',
      currentThoughts: 'Chưa rõ',
      nsfwPersonality: 'Chưa rõ',
      nsfwReactions: 'Chưa rõ',
      guidingPrinciple: 'Chưa rõ',
      abilities: '',
      description: 'Mô tả văn học chi tiết...'
    };
    setCharacters([...characters, newChar]);
  };

  const updateCharacter = (id: string, field: keyof Character, value: string | number) => {
    setCharacters(characters.map((c: Character) => {
      if (c.id === id) {
        if (field === 'level') {
           return { ...c, [field]: value === '' ? undefined : Number(value) };
        }
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const removeCharacter = (id: string) => {
    setCharacters(characters.filter((c: Character) => c.id !== id));
  };

  const addBaseOutline = () => {
    const newBaseOutline: BaseOutline = {
      id: Date.now().toString(),
      title: 'Dàn ý cơ sở mới',
      summary: 'Tóm tắt diễn biến chính...',
      chapters: []
    };
    setBaseOutlines([...baseOutlines, newBaseOutline]);
  };

  const saveStory = () => {
    saveStoryToFile();
    addNotification('Đã lưu dàn ý vào danh sách tệp lưu!', 'success');
  };

  const selectBaseOutlineOption = (option: BaseOutlineOption) => {
    const selectedBaseOutline: BaseOutline = {
      id: option.id,
      title: option.title,
      summary: option.summary,
      chapters: (option.chapterOptions || []).map(c => ({
        id: c.id || Math.random().toString(36).substr(2, 9),
        title: c.title,
        summary: c.summary,
        status: 'not_started',
        wordCount: 0,
        score: 0,
        versions: []
      }))
    };
    
    // Nếu đang ở bước đầu tiên (chưa có dàn ý nào), hoặc người dùng muốn thay đổi dàn ý đầu tiên
    // Chúng ta sẽ kiểm tra xem option này có phải là một trong các options ban đầu không
    // Để đơn giản: Nếu baseOutlines chỉ có 1 phần tử và phần tử đó chưa có nội dung (chưa viết chương nào), 
    // thì có thể coi là đang đổi ý.
    
    const hasStartedWriting = baseOutlines.some((a: BaseOutline) => a.chapters.some(c => c.content));

    if (baseOutlines.length === 0 || !hasStartedWriting) {
      // Thay thế hoàn toàn nếu chưa bắt đầu viết
      setBaseOutlines([selectedBaseOutline]);
    } else {
      // Thêm vào cuối nếu đã bắt đầu viết (đây là Arc tiếp theo)
      setBaseOutlines([...baseOutlines, selectedBaseOutline]);
      // Khi đã thêm Arc tiếp theo thì mới xóa options để tránh nhầm lẫn
      setBaseOutlineOptions([]);
    }
    
    setActiveView('outline');
  };

  const selectBasicOutlineOption = (option: any) => {
    setSelectedBasicOutline(option);
    
    // Nếu option là một mảng (đường dẫn rẽ nhánh), lấy phần tử cuối cùng (lá)
    const leafOption = Array.isArray(option) ? option[option.length - 1] : option;

    // Nếu option có bibleUpdates (được tạo ra từ Bước 0), hãy áp dụng chúng ngay lập tức
    if (leafOption && leafOption.bibleUpdates) {
      applyBibleUpdates(leafOption.bibleUpdates);
    }
    
    // Sau khi chọn dàn ý cơ bản, chúng ta sẽ kích hoạt sự kiện để AI tạo dàn ý cơ sở
    // Hoặc người dùng nhấn nút "Tạo dàn ý cơ sở" trong UI
    setActiveView('outline');
  };

  const addReference = (ref: ReferenceMaterial) => {
    setReferences((prev: ReferenceMaterial[]) => [...prev, ref]);
  };

  const removeReference = (id: string) => {
    setReferences((prev: ReferenceMaterial[]) => prev.filter(r => r.id !== id));
  };

  const resetWorld = () => {
    // Reset World & Concept
    setStoryTitle('Truyện mới');
    setStoryConcept('');
    setStoryGuidingPrinciple('');
    setGenre('');
    setStoryTone('Tươi sáng');
    setWorldInfo('');
    setWorldGeography('');
    setWorldHistory('');
    setWorldCulture('');
    setWorldEconomy('');
    setWorldReligion('');
    setWorldFactions('');
    setWorldRelationships('');
    setWorldUniqueElements('');
    setPowerSystem('');
    setReferences([]);
    
    // Reset Story Content & Outlines
    setStoryContent('');
    setBaseOutlines([]);
    setBaseOutlineOptions([]);
    setChapterOptions([]);
    setSelectedChapter(null);
    setCurrentChapterId(null);
    setCurrentContext('');
    
    // Reset Bible Data
    setCharacters([]);
    setCodex([]);
    setTimeline([]);
    setBasicOutlineOptions([]);
    setSelectedBasicOutline(null);
    setBranchingSettings({ branchesPerLevel: 10, totalLevels: 5 });
    setIsRealismEnabled(false);
    setLastBibleUpdate(null);
    
    // Reset AI & Session Data
    setPrompt('');
    setAiInstructions('');
    setAiLogs([]);
    setStreamingLog('');
    setAiStats(null);
    setWorldGenHistory([]);
    
    // Return to start
    setActiveView('world');
  };

  const addCodexEntry = (entry: CodexEntry) => {
    setCodex((prev: CodexEntry[]) => [...prev, entry]);
  };

  const updateCodexEntry = (id: string, field: keyof CodexEntry, value: string) => {
    setCodex((prev: CodexEntry[]) => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeCodexEntry = (id: string) => {
    setCodex((prev: CodexEntry[]) => prev.filter(e => e.id !== id));
  };

  const updateCodexMetadata = (id: string, metadata: { key: string; value: string }[]) => {
    setCodex((prev: CodexEntry[]) => prev.map(e => e.id === id ? { ...e, metadata } : e));
  };

  const addTimelineEvent = (event: TimelineEvent) => {
    setTimeline((prev: TimelineEvent[]) => [...prev, event]);
  };

  const updateTimelineEvent = (id: string, field: keyof TimelineEvent, value: any) => {
    setTimeline((prev: TimelineEvent[]) => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeTimelineEvent = (id: string) => {
    setTimeline((prev: TimelineEvent[]) => prev.filter(e => e.id !== id));
  };

  const saveStoryToFile = (customId?: string, titleSuffix?: string, isAutoSave?: boolean) => {
    const baseTitle = (storyTitle || 'Truyện không tên').replace(/ \(Auto-Save\)/g, '').trim();
    const newFile: StoryFile = {
      id: typeof customId === 'string' ? customId : Date.now().toString(),
      title: baseTitle + (typeof titleSuffix === 'string' ? titleSuffix : ''),
      content: storyContent,
      concept: storyConcept,
      storyGuidingPrinciple: storyGuidingPrinciple,
      protagonistType: protagonistType,
      genre: genre,
      tone: storyTone,
      currentContext: currentContext,
      branchingSuggestion: branchingSuggestion,
      isRealismEnabled: isRealismEnabled,
      worldGenTemperature: worldGenTemperature,
      characters: characters,
      worldInfo: worldInfo,
      worldGeography: worldGeography,
      worldHistory: worldHistory,
      worldCulture: worldCulture,
      worldEconomy: worldEconomy,
      worldReligion: worldReligion,
      worldFactions: worldFactions,
      worldRelationships: worldRelationships,
      worldUniqueElements: worldUniqueElements,
      powerSystem: powerSystem,
      basicOutlineOptions: basicOutlineOptions,
      selectedBasicOutline: selectedBasicOutline,
      baseOutlines: baseOutlines,
      baseOutlineOptions: baseOutlineOptions,
      aiStats: states.aiStats,
      aiInstructions: aiInstructions,
      tawaMode: tawaMode,
      tawaConfig: tawaConfig,
      worldGenSettings: worldGenSettings,
      references: references,
      codex: codex,
      timeline: timeline,
      branchingContext: branchingContext,
      branchingSettings: branchingSettings,
      timestamp: Date.now(),
      isAutoSave: isAutoSave
    };
    setSavedStories((prev: StoryFile[]) => {
      if (typeof customId === 'string') {
        return [newFile, ...prev.filter(f => f.id !== customId)];
      }
      return [newFile, ...prev];
    });
  };

  const downloadCurrentStory = () => {
    const currentFile: StoryFile = {
      id: Date.now().toString(),
      title: storyTitle || 'Truyện không tên',
      content: storyContent,
      concept: storyConcept,
      storyGuidingPrinciple: storyGuidingPrinciple,
      protagonistType: protagonistType,
      genre: genre,
      tone: storyTone,
      branchingSuggestion: branchingSuggestion,
      isRealismEnabled: isRealismEnabled,
      worldGenTemperature: worldGenTemperature,
      characters: characters,
      worldInfo: worldInfo,
      worldGeography: worldGeography,
      worldHistory: worldHistory,
      worldCulture: worldCulture,
      worldEconomy: worldEconomy,
      worldReligion: worldReligion,
      worldFactions: worldFactions,
      worldRelationships: worldRelationships,
      worldUniqueElements: worldUniqueElements,
      powerSystem: powerSystem,
      basicOutlineOptions: basicOutlineOptions,
      selectedBasicOutline: selectedBasicOutline,
      baseOutlines: baseOutlines,
      baseOutlineOptions: baseOutlineOptions,
      aiStats: states.aiStats,
      aiInstructions: aiInstructions,
      tawaMode: tawaMode,
      tawaConfig: tawaConfig,
      worldGenSettings: worldGenSettings,
      references: references,
      codex: codex,
      timeline: timeline,
      branchingSettings: branchingSettings,
      timestamp: Date.now()
    };
    const blob = new Blob([JSON.stringify(currentFile, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Normalize Vietnamese characters to safe ascii format for filename
    const safeTitle = (currentFile.title || 'truyen-khong-ten')
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
      
    a.download = `${safeTitle}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadStoryFromFile = (file: StoryFile) => {
    // Làm mượt tên truyện, xóa cái đuôi Auto-save do app tự gắn
    const cleanTitle = (file.title || '').replace(/ \(Auto-Save\)/g, '').trim();
    setStoryTitle(cleanTitle || 'Truyện không tên');
    setStoryContent(file.content);
    setStoryConcept(file.concept);
    setStoryGuidingPrinciple(file.storyGuidingPrinciple || '');
    setProtagonistType(file.protagonistType || 'Nam');
    setGenre(file.genre);
    setStoryTone(file.tone);
    setCurrentContext(file.currentContext || '');
    setBranchingSuggestion(file.branchingSuggestion || '');
    setIsRealismEnabled(file.isRealismEnabled || false);
    setWorldGenTemperature(file.worldGenTemperature || 0.9);
    setCharacters(file.characters);
    setWorldInfo(file.worldInfo);
    // Helpers to clear missing fields instead of retaining old ones
    setWorldGeography(file.worldGeography || '');
    setWorldHistory(file.worldHistory || '');
    setWorldCulture(file.worldCulture || '');
    setWorldEconomy(file.worldEconomy || '');
    setWorldReligion(file.worldReligion || '');
    setWorldFactions(file.worldFactions || '');
    setWorldRelationships(file.worldRelationships || '');
    setWorldUniqueElements(file.worldUniqueElements || '');
    setPowerSystem(file.powerSystem || '');
    setBaseOutlines(file.baseOutlines || (file as any).arcs || []);
    setBaseOutlineOptions(file.baseOutlineOptions || (file as any).arcOptions || []);
    setAiStats(file.aiStats || null);
    setAiInstructions(file.aiInstructions || '');
    if (file.tawaConfig) setTawaConfig(file.tawaConfig);
    if (file.worldGenSettings) setWorldGenSettings(file.worldGenSettings);
    setReferences(file.references || []);
    setCodex(file.codex || []);
    setTimeline(file.timeline || []);
    setBasicOutlineOptions(file.basicOutlineOptions || []);
    setSelectedBasicOutline(file.selectedBasicOutline || null);
    if (file.branchingSettings) setBranchingSettings(file.branchingSettings);
    setBranchingContext(file.branchingContext || '');
    setActiveView('editor');
  };

  const deleteStoryFile = (id: string) => {
    setSavedStories((prev: StoryFile[]) => prev.filter(f => f.id !== id));
  };

  const importStoryFromJson = (json: any) => {
    try {
      const cleanTitle = (json.title || '').replace(/ \(Auto-Save\)/g, '').trim();
      
      const newFile: StoryFile = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 6), // Luôn tạo ID mới để tránh trùng lặp
        title: cleanTitle || 'Truyện nhập khẩu',
        content: json.content || '',
        concept: json.concept || '',
        storyGuidingPrinciple: json.storyGuidingPrinciple || '',
        protagonistType: json.protagonistType || 'Nam',
        genre: json.genre || '',
        tone: json.tone || '',
        currentContext: json.currentContext || '',
        branchingSuggestion: json.branchingSuggestion || '',
        isRealismEnabled: json.isRealismEnabled || false,
        worldGenTemperature: json.worldGenTemperature || 0.9,
        characters: json.characters || [],
        worldInfo: json.worldInfo || '',
        worldGeography: json.worldGeography || '',
        worldHistory: json.worldHistory || '',
        worldCulture: json.worldCulture || '',
        worldEconomy: json.worldEconomy || '',
        worldReligion: json.worldReligion || '',
        worldFactions: json.worldFactions || '',
        worldRelationships: json.worldRelationships || '',
        worldUniqueElements: json.worldUniqueElements || '',
        powerSystem: json.powerSystem || '',
        basicOutlineOptions: json.basicOutlineOptions || [],
        selectedBasicOutline: json.selectedBasicOutline || null,
        aiInstructions: json.aiInstructions || '',
        tawaMode: json.tawaMode || false,
        tawaConfig: json.tawaConfig || null,
        worldGenSettings: json.worldGenSettings || { characterCount: 20, outlineOptionCount: 5, codexCount: 15, timelineCount: 10 },
        baseOutlines: json.baseOutlines || json.arcs || [],
        baseOutlineOptions: json.baseOutlineOptions || json.arcOptions || [],
        references: json.references || [],
        codex: json.codex || [],
        timeline: json.timeline || [],
        branchingContext: json.branchingContext || '',
        branchingSettings: json.branchingSettings || { branchesPerLevel: 10, totalLevels: 5 },
        timestamp: json.timestamp || Date.now()
      };
      setSavedStories((prev: StoryFile[]) => [newFile, ...prev]);
      return true;
    } catch (err) {
      console.error("Lỗi khi nhập dữ liệu truyện:", err);
      return false;
    }
  };

  return {
    addCharacter,
    updateCharacter,
    removeCharacter,
    addBaseOutline,
    saveStory,
    selectBaseOutlineOption,
    selectBasicOutlineOption,
    addReference,
    removeReference,
    resetWorld,
    addCodexEntry,
    updateCodexEntry,
    removeCodexEntry,
    updateCodexMetadata,
    addTimelineEvent,
    updateTimelineEvent,
    removeTimelineEvent,
    saveStoryToFile,
    downloadCurrentStory,
    loadStoryFromFile,
    deleteStoryFile,
    importStoryFromJson,
    addNotification,
    removeNotification
  };
}

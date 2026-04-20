import { create } from 'zustand';
import { 
  Theme, 
  ActiveView, 
  Character, 
  Chapter, 
  BaseOutline, 
  BasicOutlineOption,
  BaseOutlineOption,
  ProxyConfig,
  GeminiKeyConfig,
  GeminiConfig,
  StoryFile,
  ReferenceMaterial,
  CodexEntry,
  TimelineEvent,
  AIStats,
  StoryBibleUpdate,
  TawaConfig,
  AIStatus,
  AILog
} from '../types';

interface StoryState {
  // UI State
  isLeftSidebarOpen: boolean;
  setIsLeftSidebarOpen: (open: boolean) => void;
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: (open: boolean) => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  theme: Theme;
  setTheme: (theme: Theme | ((prev: Theme) => Theme)) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;

  // Story Content & Identity
  storyTitle: string;
  setStoryTitle: (title: string | ((prev: string) => string)) => void;
  storyContent: string;
  setStoryContent: (content: string | ((prev: string) => string)) => void;
  prompt: string;
  setPrompt: (prompt: string | ((prev: string) => string)) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  availableGeminiModels: string[];
  setAvailableGeminiModels: (models: string[]) => void;
  history: any[];
  setHistory: (history: any[] | ((prev: any[]) => any[])) => void;

  // Story Bible
  storyConcept: string;
  setStoryConcept: (concept: string | ((prev: string) => string)) => void;
  storyGuidingPrinciple: string;
  setStoryGuidingPrinciple: (principle: string | ((prev: string) => string)) => void;
  genre: string;
  setGenre: (genre: string | ((prev: string) => string)) => void;
  protagonistType: string;
  setProtagonistType: (type: string | ((prev: string) => string)) => void;
  storyTone: string;
  setStoryTone: (tone: string | ((prev: string) => string)) => void;
  currentContext: string;
  setCurrentContext: (context: string | ((prev: string) => string)) => void;
  aiInstructions: string;
  setAiInstructions: (instructions: string | ((prev: string) => string)) => void;
  characters: Character[];
  setCharacters: (chars: Character[] | ((prev: Character[]) => Character[])) => void;
  worldInfo: string;
  setWorldInfo: (info: string | ((prev: string) => string)) => void;
  worldGeography: string;
  setWorldGeography: (geo: string | ((prev: string) => string)) => void;
  worldHistory: string;
  setWorldHistory: (history: string | ((prev: string) => string)) => void;
  worldCulture: string;
  setWorldCulture: (culture: string | ((prev: string) => string)) => void;
  worldEconomy: string;
  setWorldEconomy: (economy: string | ((prev: string) => string)) => void;
  worldReligion: string;
  setWorldReligion: (religion: string | ((prev: string) => string)) => void;
  worldFactions: string;
  setWorldFactions: (factions: string | ((prev: string) => string)) => void;
  worldRelationships: string;
  setWorldRelationships: (rel: string | ((prev: string) => string)) => void;
  worldUniqueElements: string;
  setWorldUniqueElements: (elements: string | ((prev: string) => string)) => void;
  powerSystem: string;
  setPowerSystem: (system: string | ((prev: string) => string)) => void;
  references: ReferenceMaterial[];
  setReferences: (refs: ReferenceMaterial[] | ((prev: ReferenceMaterial[]) => ReferenceMaterial[])) => void;
  codex: CodexEntry[];
  setCodex: (codex: CodexEntry[] | ((prev: CodexEntry[]) => CodexEntry[])) => void;
  timeline: TimelineEvent[];
  setTimeline: (timeline: TimelineEvent[] | ((prev: TimelineEvent[]) => TimelineEvent[])) => void;

  // Outline
  basicOutlineOptions: BasicOutlineOption[];
  setBasicOutlineOptions: (options: BasicOutlineOption[] | ((prev: BasicOutlineOption[]) => BasicOutlineOption[])) => void;
  selectedBasicOutline: BasicOutlineOption | BasicOutlineOption[] | null;
  setSelectedBasicOutline: (option: BasicOutlineOption | BasicOutlineOption[] | null) => void;
  baseOutlines: BaseOutline[];
  setBaseOutlines: (outlines: BaseOutline[] | ((prev: BaseOutline[]) => BaseOutline[])) => void;
  baseOutlineOptions: BaseOutlineOption[];
  setBaseOutlineOptions: (options: BaseOutlineOption[]) => void;
  chapterOptions: Chapter[];
  setChapterOptions: (options: Chapter[]) => void;
  selectedChapter: Chapter | null;
  setSelectedChapter: (chapter: Chapter | null) => void;
  currentChapterId: string | null;
  setCurrentChapterId: (id: string | null) => void;
  activeBranchingBaseOutlineId: string | null;
  setActiveBranchingBaseOutlineId: (id: string | null) => void;
  activeBranchingPath: BasicOutlineOption[];
  setActiveBranchingPath: (path: BasicOutlineOption[] | ((prev: BasicOutlineOption[]) => BasicOutlineOption[])) => void;

  // AI & Config
  geminiApiKeys: GeminiKeyConfig[];
  setGeminiApiKeys: (keys: GeminiKeyConfig[]) => void;
  proxies: ProxyConfig[];
  setProxies: (proxies: ProxyConfig[]) => void;
  isGeminiEnabled: boolean;
  setIsGeminiEnabled: (enabled: boolean) => void;
  isProxyEnabled: boolean;
  setIsProxyEnabled: (enabled: boolean) => void;
  isBeautifyEnabled: boolean;
  setIsBeautifyEnabled: (enabled: boolean) => void;
  tawaConfig: TawaConfig;
  setTawaConfig: (config: TawaConfig) => void;
  geminiConfig: GeminiConfig;
  setGeminiConfig: (config: GeminiConfig) => void;
  
  // Stats & Logs
  aiStats: AIStats | null;
  setAiStats: (stats: AIStats | null | ((prev: AIStats | null) => AIStats | null)) => void;
  aiStatus: AIStatus;
  setAiStatus: (status: AIStatus | ((prev: AIStatus) => AIStatus)) => void;
  aiLogs: AILog[];
  setAiLogs: (logs: AILog[] | ((prev: AILog[]) => AILog[])) => void;
  lastBibleUpdate: StoryBibleUpdate | null;
  setLastBibleUpdate: (update: StoryBibleUpdate | null) => void;
  recentBibleUpdate: StoryBibleUpdate | null;
  setRecentBibleUpdate: (update: StoryBibleUpdate | null) => void;
  bibleUpdateHistory: StoryBibleUpdate[];
  setBibleUpdateHistory: (history: StoryBibleUpdate[] | ((prev: StoryBibleUpdate[]) => StoryBibleUpdate[])) => void;
  lastFullPrompt: string;
  setLastFullPrompt: (prompt: string) => void;
  streamingLog: string;
  setStreamingLog: (log: string | ((prev: string) => string)) => void;
  streamingContent: string;
  setStreamingContent: (content: string | ((prev: string) => string)) => void;
  keyRotationIndex: number;
  setKeyRotationIndex: (index: number) => void;
  proxyRotationIndex: number;
  setProxyRotationIndex: (index: number) => void;

  // Persistence & Others
  isGeneratingWorld: boolean;
  setIsGeneratingWorld: (isGeneratingWorld: boolean) => void;
  tawaMode: boolean;
  setTawaMode: (tawaMode: boolean) => void;
  branchingContext: string;
  setBranchingContext: (context: string) => void;
  savedStories: StoryFile[];
  setSavedStories: (stories: StoryFile[] | ((prev: StoryFile[]) => StoryFile[])) => void;
  worldGenHistory: any[];
  setWorldGenHistory: (worldGenHistory: any[] | ((prev: any[]) => any[])) => void;
  branchingSettings: {
    branchesPerLevel: number;
    totalLevels: number;
  };
  setBranchingSettings: (settings: { branchesPerLevel: number, totalLevels: number } | ((prev: { branchesPerLevel: number, totalLevels: number }) => { branchesPerLevel: number, totalLevels: number })) => void;
  branchingSuggestion: string;
  setBranchingSuggestion: (suggestion: string) => void;
  isRealismEnabled: boolean;
  setIsRealismEnabled: (enabled: boolean) => void;
  worldGenTemperature: number;
  setWorldGenTemperature: (temp: number) => void;
  worldGenSettings: {
    characterCount: number;
    outlineOptionCount: number;
    codexCount: number;
    timelineCount: number;
    chapterVersionCount: number;
  };
  setWorldGenSettings: (settings: { 
    characterCount: number, 
    outlineOptionCount: number,
    codexCount: number,
    timelineCount: number,
    chapterVersionCount: number
  }) => void;
  
  // LED Settings
  ledColor: string;
  setLedColor: (color: string) => void;
  ledAnimationStyle: 'rotate' | 'flow' | 'pulse' | 'neon' | 'disco' | 'liquid' | 'static' | 'none';
  setLedAnimationStyle: (style: 'rotate' | 'flow' | 'pulse' | 'neon' | 'disco' | 'liquid' | 'static' | 'none') => void;
  appTextColor: string;
  setAppTextColor: (color: string) => void;
  appBgColor: string;
  setAppBgColor: (color: string) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  // UI State
  isLeftSidebarOpen: true,
  setIsLeftSidebarOpen: (open) => set({ isLeftSidebarOpen: open }),
  isRightSidebarOpen: true,
  setIsRightSidebarOpen: (open) => set({ isRightSidebarOpen: open }),
  activeView: 'world',
  setActiveView: (view) => set({ activeView: view }),
  theme: 'dark',
  setTheme: (theme) => set((state) => ({ 
    theme: typeof theme === 'function' ? theme(state.theme) : theme 
  })),
  fontFamily: '"Inter", sans-serif',
  setFontFamily: (font) => set({ fontFamily: font }),
  fontSize: 16,
  setFontSize: (size) => set({ fontSize: size }),
  appTextColor: '',
  setAppTextColor: (color) => set({ appTextColor: color }),
  appBgColor: '',
  setAppBgColor: (color) => set({ appBgColor: color }),

  // Story Content
  storyTitle: 'Truyện mới',
  setStoryTitle: (storyTitle) => set((state) => ({ 
    storyTitle: typeof storyTitle === 'function' ? storyTitle(state.storyTitle) : storyTitle 
  })),
  storyContent: '',
  setStoryContent: (content) => set((state) => ({ 
    storyContent: typeof content === 'function' ? content(state.storyContent) : content 
  })),
  prompt: '',
  setPrompt: (prompt) => set((state) => ({ 
    prompt: typeof prompt === 'function' ? prompt(state.prompt) : prompt 
  })),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  selectedModel: 'gemini-3.1-pro-preview',
  setSelectedModel: (model) => set({ selectedModel: model }),
  availableGeminiModels: ['gemini-3.1-pro-preview', 'gemini-3-flash-preview', 'gemini-2.5-pro', 'gemini-2.5-flash'],
  setAvailableGeminiModels: (models) => set({ availableGeminiModels: models }),
  history: [],
  setHistory: (history) => set((state) => ({ 
    history: typeof history === 'function' ? history(state.history) : history 
  })),

  // Story Bible
  storyConcept: '',
  setStoryConcept: (storyConcept) => set((state) => ({ 
    storyConcept: typeof storyConcept === 'function' ? storyConcept(state.storyConcept) : storyConcept 
  })),
  storyGuidingPrinciple: '',
  setStoryGuidingPrinciple: (storyGuidingPrinciple) => set((state) => ({ 
    storyGuidingPrinciple: typeof storyGuidingPrinciple === 'function' ? storyGuidingPrinciple(state.storyGuidingPrinciple) : storyGuidingPrinciple 
  })),
  genre: '',
  setGenre: (genre) => set((state) => ({ 
    genre: typeof genre === 'function' ? genre(state.genre) : genre 
  })),
  protagonistType: 'Nam',
  setProtagonistType: (protagonistType) => set((state) => ({ 
    protagonistType: typeof protagonistType === 'function' ? protagonistType(state.protagonistType) : protagonistType 
  })),
  storyTone: 'Tươi sáng',
  setStoryTone: (storyTone) => set((state) => ({ 
    storyTone: typeof storyTone === 'function' ? storyTone(state.storyTone) : storyTone 
  })),
  currentContext: '',
  setCurrentContext: (currentContext) => set((state) => ({ 
    currentContext: typeof currentContext === 'function' ? currentContext(state.currentContext) : currentContext 
  })),
  aiInstructions: '',
  setAiInstructions: (aiInstructions) => set((state) => ({ 
    aiInstructions: typeof aiInstructions === 'function' ? aiInstructions(state.aiInstructions) : aiInstructions 
  })),
  characters: [],
  setCharacters: (characters) => set((state) => ({
    characters: typeof characters === 'function' ? characters(state.characters) : characters
  })),
  worldInfo: '',
  setWorldInfo: (worldInfo) => set((state) => ({ 
    worldInfo: typeof worldInfo === 'function' ? worldInfo(state.worldInfo) : worldInfo 
  })),
  worldGeography: '',
  setWorldGeography: (worldGeography) => set((state) => ({ 
    worldGeography: typeof worldGeography === 'function' ? worldGeography(state.worldGeography) : worldGeography 
  })),
  worldHistory: '',
  setWorldHistory: (worldHistory) => set((state) => ({ 
    worldHistory: typeof worldHistory === 'function' ? worldHistory(state.worldHistory) : worldHistory 
  })),
  worldCulture: '',
  setWorldCulture: (worldCulture) => set((state) => ({ 
    worldCulture: typeof worldCulture === 'function' ? worldCulture(state.worldCulture) : worldCulture 
  })),
  worldEconomy: '',
  setWorldEconomy: (worldEconomy) => set((state) => ({ 
    worldEconomy: typeof worldEconomy === 'function' ? worldEconomy(state.worldEconomy) : worldEconomy 
  })),
  worldReligion: '',
  setWorldReligion: (worldReligion) => set((state) => ({ 
    worldReligion: typeof worldReligion === 'function' ? worldReligion(state.worldReligion) : worldReligion 
  })),
  worldFactions: '',
  setWorldFactions: (worldFactions) => set((state) => ({ 
    worldFactions: typeof worldFactions === 'function' ? worldFactions(state.worldFactions) : worldFactions 
  })),
  worldRelationships: '',
  setWorldRelationships: (worldRelationships) => set((state) => ({ 
    worldRelationships: typeof worldRelationships === 'function' ? worldRelationships(state.worldRelationships) : worldRelationships 
  })),
  worldUniqueElements: '',
  setWorldUniqueElements: (worldUniqueElements) => set((state) => ({ 
    worldUniqueElements: typeof worldUniqueElements === 'function' ? worldUniqueElements(state.worldUniqueElements) : worldUniqueElements 
  })),
  powerSystem: '',
  setPowerSystem: (powerSystem) => set((state) => ({ 
    powerSystem: typeof powerSystem === 'function' ? powerSystem(state.powerSystem) : powerSystem 
  })),
  references: [],
  setReferences: (refs) => set((state) => ({
    references: typeof refs === 'function' ? refs(state.references) : refs
  })),
  codex: [],
  setCodex: (codex) => set((state) => ({
    codex: typeof codex === 'function' ? codex(state.codex) : codex
  })),
  timeline: [],
  setTimeline: (timeline) => set((state) => ({
    timeline: typeof timeline === 'function' ? timeline(state.timeline) : timeline
  })),

  // Outline
  basicOutlineOptions: [],
  setBasicOutlineOptions: (basicOutlineOptions) => set((state) => ({
    basicOutlineOptions: typeof basicOutlineOptions === 'function' ? basicOutlineOptions(state.basicOutlineOptions) : basicOutlineOptions
  })),
  selectedBasicOutline: null,
  setSelectedBasicOutline: (selectedBasicOutline) => set({ selectedBasicOutline }),
  baseOutlines: [],
  setBaseOutlines: (baseOutlines) => set((state) => ({ 
    baseOutlines: typeof baseOutlines === 'function' ? baseOutlines(state.baseOutlines) : baseOutlines 
  })),
  baseOutlineOptions: [],
  setBaseOutlineOptions: (baseOutlineOptions) => set({ baseOutlineOptions }),
  chapterOptions: [],
  setChapterOptions: (chapterOptions) => set({ chapterOptions }),
  selectedChapter: null,
  setSelectedChapter: (selectedChapter) => set({ selectedChapter }),
  currentChapterId: null,
  setCurrentChapterId: (currentChapterId) => set({ currentChapterId }),
  activeBranchingBaseOutlineId: null,
  setActiveBranchingBaseOutlineId: (activeBranchingBaseOutlineId) => set({ activeBranchingBaseOutlineId }),
  activeBranchingPath: [],
  setActiveBranchingPath: (path) => set((state) => ({ 
    activeBranchingPath: typeof path === 'function' ? path(state.activeBranchingPath) : path 
  })),

  // AI & Config
  geminiApiKeys: [],
  setGeminiApiKeys: (geminiApiKeys) => set({ geminiApiKeys }),
  proxies: [],
  setProxies: (proxies) => set({ proxies }),
  isGeminiEnabled: true,
  setIsGeminiEnabled: (isGeminiEnabled) => set({ isGeminiEnabled }),
  isProxyEnabled: true,
  setIsProxyEnabled: (isProxyEnabled) => set({ isProxyEnabled }),
  isBeautifyEnabled: true,
  setIsBeautifyEnabled: (isBeautifyEnabled) => set({ isBeautifyEnabled }),
  tawaConfig: {
    primaryStyle: 'modern',
    secondaryStyle: 'raw_nsfw',
    pov: 'third_person_limited'
  },
  setTawaConfig: (tawaConfig) => set({ tawaConfig }),
  geminiConfig: {
    temperature: 0.9,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    thinkingLevel: 'HIGH'
  },
  setGeminiConfig: (geminiConfig) => set({ geminiConfig }),

  // Stats & Logs
  aiStats: {
    wordCount: 0,
    inputTokens: 0,
    outputTokens: 0,
    processingTime: 0
  },
  setAiStats: (aiStats) => set((state) => ({
    aiStats: typeof aiStats === 'function' ? aiStats(state.aiStats) : aiStats
  })),
  aiStatus: {
    isProcessing: false,
    retryCount: 0,
    lastError: null,
    currentAction: null
  },
  setAiStatus: (aiStatus) => set((state) => ({ 
    aiStatus: typeof aiStatus === 'function' ? aiStatus(state.aiStatus) : aiStatus 
  })),
  aiLogs: [],
  setAiLogs: (aiLogs) => set((state) => ({ 
    aiLogs: typeof aiLogs === 'function' ? aiLogs(state.aiLogs) : aiLogs 
  })),
  lastBibleUpdate: null,
  setLastBibleUpdate: (lastBibleUpdate) => set({ lastBibleUpdate }),
  recentBibleUpdate: null,
  setRecentBibleUpdate: (recentBibleUpdate) => set({ recentBibleUpdate }),
  bibleUpdateHistory: [],
  setBibleUpdateHistory: (bibleUpdateHistory) => set((state) => ({ 
    bibleUpdateHistory: typeof bibleUpdateHistory === 'function' ? bibleUpdateHistory(state.bibleUpdateHistory) : bibleUpdateHistory 
  })),
  lastFullPrompt: '',
  setLastFullPrompt: (lastFullPrompt) => set({ lastFullPrompt }),
  streamingLog: '',
  setStreamingLog: (streamingLog) => set((state) => ({ 
    streamingLog: typeof streamingLog === 'function' ? streamingLog(state.streamingLog) : streamingLog 
  })),
  streamingContent: '',
  setStreamingContent: (streamingContent) => set((state) => ({ 
    streamingContent: typeof streamingContent === 'function' ? streamingContent(state.streamingContent) : streamingContent 
  })),
  keyRotationIndex: 0,
  setKeyRotationIndex: (keyRotationIndex) => set({ keyRotationIndex }),
  proxyRotationIndex: 0,
  setProxyRotationIndex: (proxyRotationIndex) => set({ proxyRotationIndex }),

  // Others
  isGeneratingWorld: false,
  setIsGeneratingWorld: (isGeneratingWorld) => set({ isGeneratingWorld }),
  tawaMode: false,
  setTawaMode: (tawaMode) => set({ tawaMode }),
  branchingContext: '',
  setBranchingContext: (branchingContext) => set({ branchingContext }),
  savedStories: [],
  setSavedStories: (savedStories) => set((state) => ({ 
    savedStories: typeof savedStories === 'function' ? savedStories(state.savedStories) : savedStories 
  })),
  worldGenHistory: [],
  setWorldGenHistory: (worldGenHistory) => set((state) => ({
    worldGenHistory: typeof worldGenHistory === 'function' ? worldGenHistory(state.worldGenHistory) : worldGenHistory
  })),
  branchingSettings: {
    branchesPerLevel: 10,
    totalLevels: 5
  },
  setBranchingSettings: (branchingSettings) => set((state) => ({ 
    branchingSettings: typeof branchingSettings === 'function' ? branchingSettings(state.branchingSettings) : branchingSettings 
  })),
  branchingSuggestion: '',
  setBranchingSuggestion: (branchingSuggestion) => set({ branchingSuggestion }),
  isRealismEnabled: false,
  setIsRealismEnabled: (isRealismEnabled) => set({ isRealismEnabled }),
  worldGenTemperature: 0.7,
  setWorldGenTemperature: (worldGenTemperature) => set({ worldGenTemperature }),
  worldGenSettings: {
    characterCount: 20,
    outlineOptionCount: 5,
    codexCount: 15,
    timelineCount: 10,
    chapterVersionCount: 1
  },
  setWorldGenSettings: (worldGenSettings) => set({ worldGenSettings }),

  // LED Settings
  ledColor: '#ffffff',
  setLedColor: (ledColor) => set({ ledColor }),
  ledAnimationStyle: 'pulse',
  setLedAnimationStyle: (ledAnimationStyle) => set({ ledAnimationStyle }),
}));

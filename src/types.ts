export type Theme = 'light' | 'dark';
export type ActiveView = 'editor' | 'characters' | 'world' | 'outline' | 'context' | 'summaries' | 'settings' | 'stats' | 'reader' | 'files' | 'codex' | 'timeline' | 'ai-monitor';

export interface TimelineEvent {
  id: string;
  year: number; // Negative for BC, positive for AD
  month: number; // 1-12
  day: number; // 1-31
  hour: number; // 0-23
  minute: number; // 0-59
  second: number; // 0-59
  title: string;
  description: string;
  isBC: boolean;
}

export interface ReferenceMaterial {
  id: string;
  type: 'image' | 'text';
  name: string;
  content: string; // base64 for image, text content for text
}

export interface CodexEntry {
  id: string;
  category: string;
  title: string;
  content: string;
  metadata?: { key: string; value: string }[];
}

export interface StoryFile {
  id: string;
  title: string;
  content: string;
  concept: string;
  storyGuidingPrinciple?: string;
  protagonistType?: string;
  genre: string;
  tone: string;
  currentContext?: string;
  branchingSuggestion?: string;
  isRealismEnabled?: boolean;
  worldGenTemperature?: number;
  characters: Character[];
  worldInfo: string;
  worldGeography?: string;
  worldHistory?: string;
  worldCulture?: string;
  worldEconomy?: string;
  worldReligion?: string;
  worldFactions?: string;
  worldRelationships?: string;
  worldUniqueElements?: string;
  powerSystem: string;
  aiInstructions?: string;
  tawaMode?: boolean;
  tawaConfig?: TawaConfig;
  worldGenSettings?: {
    characterCount: number;
    outlineOptionCount: number;
    codexCount: number;
    timelineCount: number;
    chapterVersionCount?: number;
  };
  branchingSettings?: {
    branchesPerLevel: number;
    totalLevels: number;
  };
  basicOutlineOptions?: BasicOutlineOption[];
  selectedBasicOutline?: BasicOutlineOption | BasicOutlineOption[] | null;
  baseOutlines: BaseOutline[];
  baseOutlineOptions?: BaseOutlineOption[];
  references?: ReferenceMaterial[];
  codex?: CodexEntry[];
  timeline?: TimelineEvent[];
  branchingContext?: string;
  aiStats?: AIStats | null;
  timestamp: number;
  isAutoSave?: boolean;
}

export interface Character {
  id: string;
  name: string;
  level?: number;
  gender: string;
  age: string;
  birthDate: string;
  role: string;
  personality: string;
  traits: string;
  appearance: string;
  originAndFaction: string; // Nguồn gốc & Thế lực (Gia tộc, gia thế, phe phái)
  sexualExperience: string; // Trinh tiết & Kinh nghiệm (Còn trinh/Mất trinh, kinh nghiệm tình dục)
  guidingPrinciple: string; // Kim chỉ nam/Lý tưởng sống
  abilities: string; // Năng lực (Bình thường, Cao cấp, Dị năng)
  description: string; // Mô tả văn học chi tiết
  title: string; // Danh xưng
  occupation: string; // Chức vụ/Nghề nghiệp
  relationships: string; // Mối quan hệ (Với các nhân vật khác)
  currentThoughts: string; // Nội tâm & Mối quan hệ hiện tại (Suy nghĩ thầm kín về các nhân vật khác)
  nsfwPersonality?: string; // Tính cách khi vào cảnh NSFW (Đồng bộ hoặc tương phản)
  nsfwReactions?: string; // Phản ứng đặc trưng khi vào cảnh NSFW
}

export type WritingStatus = 'not_started' | 'in_progress' | 'completed';

export interface Chapter {
  id: string;
  title: string;
  summary: string;
  content?: string;
  versions?: string[];
  selectedVersionIndex?: number;
  wordCount?: number;
  score?: number;
  status?: WritingStatus;
  pov?: NarrativePOV; // POV riêng cho chương này
  storyGuidingPrinciple?: string; // Kim chỉ nam của câu chuyện tại chương này
  isIncludedInReader?: boolean;
  versionBibleUpdates?: (any | null)[]; // Cập nhật Story Bible tương ứng với từng phiên bản (raw updates from AI)
}

export interface BaseOutline {
  id: string;
  title: string;
  summary: string;
  chapters: Chapter[];
  status?: WritingStatus;
}

export interface ChapterOption {
  id: string;
  title: string;
  summary: string;
}

export interface BasicOutlineOption {
  id: string;
  title: string;
  summary: string;
  keyPlotPoints: string[];
  potentialBranches: string[];
  children?: BasicOutlineOption[];
  isGeneratingChildren?: boolean;
}

export interface BaseOutlineOption {
  id: string;
  title: string;
  summary: string;
  chapterOptions: ChapterOption[];
}

export interface GeminiKeyConfig {
  id: string;
  key: string;
  isActive: boolean;
}

export interface ProxyConfig {
  id: string;
  url: string;
  key: string;
  model?: string;
  availableModels?: string[];
  isActive: boolean;
}

export interface GeminiConfig {
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
  thinkingLevel?: 'HIGH' | 'LOW' | 'MINIMAL';
}

export interface AIStats {
  wordCount: number;
  inputTokens: number;
  outputTokens: number;
  processingTime: number; // in seconds
  startTime?: number;
  ttft?: number; // Time to First Token
  tps?: number; // Tokens per Second
  estimatedCost?: number; // Estimated cost in USD
}

export interface StoryBibleUpdate {
  newCharacters: Character[];
  characterUpdates: {
    name: string;
    before: Partial<Character>;
    after: Partial<Character>;
    reason?: string;
  }[];
  newCodexEntries: CodexEntry[];
  codexUpdates: {
    title: string;
    before: string;
    after: string;
    reason?: string;
  }[];
  newTimelineEvents: TimelineEvent[];
  timelineUpdates: {
    title: string;
    before: string;
    after: string;
    reason?: string;
  }[];
  worldUpdates?: {
    before: {
      storyGuidingPrinciple?: string;
      worldGeography?: string;
      worldHistory?: string;
      worldCulture?: string;
      worldEconomy?: string;
      worldReligion?: string;
      worldFactions?: string;
      worldRelationships?: string;
      worldUniqueElements?: string;
      powerSystem?: string;
    };
    after: {
      storyGuidingPrinciple?: string;
      worldGeography?: string;
      worldHistory?: string;
      worldCulture?: string;
      worldEconomy?: string;
      worldReligion?: string;
      worldFactions?: string;
      worldRelationships?: string;
      worldUniqueElements?: string;
      powerSystem?: string;
    };
    reason?: string;
  } | null;
}

export type TawaWritingStyle = 'tawa' | 'light_novel' | 'web_novel' | 'historical' | 'xianxia' | 'palace' | 'modern' | 'nsfw' | 'raw_nsfw' | 'ntr' | 'dark_nsfw' | 'femdom' | 'netori' | 'public_nsfw' | 'dark_milf' | 'blackmail_corruption' | 'adventure_sex' | 'professional_fetish' | 'taboo_seduction' | 'cuckold_sharing' | 'hotwife_lifestyle' | 'classic_wuxia' | 'horror' | 'romance' | 'humor' | 'chill' | 'detective' | 'epic_martial_arts';

export type NarrativePOV = 'first_person' | 'third_person_limited' | 'third_person_omniscient' | 'second_person' | 'deep_pov' | 'multi_pov';

export interface TawaConfig {
  primaryStyle: TawaWritingStyle;
  secondaryStyle?: TawaWritingStyle;
  pov?: NarrativePOV;
}

export interface AIStatus {
  isProcessing: boolean;
  retryCount: number;
  lastError: string | null;
  currentAction: string | null;
  activeProxyUrl?: string;
  activeKey?: string;
}

export interface AILog {
  id: string;
  prompt: string;
  response: string;
  rawResponse?: string;
  thinking?: string;
  timestamp: number;
  isProcessing: boolean;
  modelName?: string;
  inputTokens?: number;
  outputTokens?: number;
  systemInstruction?: string;
  actionType?: string;
  ttft?: number; // Time to First Token (ms)
  tps?: number; // Tokens per Second
  totalLatency?: number; // Total Latency (ms)
  estimatedCost?: number; // Estimated cost in USD
  finishReason?: string;
  safetyRatings?: any[];
  httpStatusCode?: number;
  requestId?: string;
  parameters?: GeminiConfig;
}

export type LedAnimationStyle = 'rotate' | 'flow' | 'pulse' | 'neon' | 'disco' | 'liquid' | 'static' | 'none';

export interface AppSettings {
  selectedModel: string;
  availableGeminiModels?: string[];
  geminiApiKeys: GeminiKeyConfig[];
  proxies: ProxyConfig[];
  geminiConfig: GeminiConfig;
  isGeminiEnabled: boolean;
  isProxyEnabled: boolean;
  aiInstructions: string;
  tawaMode: boolean; // Chế độ viết lách chuyên sâu Tawa
  tawaConfig: TawaConfig;
  storyGuidingPrinciple?: string;
  branchingSettings: {
    branchesPerLevel: number;
    totalLevels: number;
  };
  theme: Theme;
  fontFamily: string;
  fontSize: number;
  isBeautifyEnabled: boolean;
  ledColor: string;
  ledAnimationStyle: LedAnimationStyle;
  appTextColor?: string;
  appBgColor?: string;
  savedStories?: StoryFile[];
  aiStatus: AIStatus;
  aiStats?: AIStats | null;
}

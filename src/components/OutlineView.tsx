import React from 'react';
import { Plus, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { BaseOutline, Chapter, ActiveView, BaseOutlineOption, BasicOutlineOption } from '../types';
import { BaseOutlineItem } from './BaseOutlineItem';
import { ChapterItem } from './ChapterItem';
import { ChapterOptionSelector } from './world/ChapterOptionSelector';
import { BaseOutlineOptionSelector } from './world/BaseOutlineOptionSelector';
import { BasicOutlineOptionSelector } from './world/BasicOutlineOptionSelector';
import { Button } from './ui/button';

interface OutlineViewProps {
  baseOutlines: BaseOutline[];
  setBaseOutlines: (baseOutlines: BaseOutline[]) => void;
  basicOutlineOptions: BasicOutlineOption[];
  selectBasicOutlineOption: (option: BasicOutlineOption) => void;
  selectedBasicOutline: BasicOutlineOption | null;
  baseOutlineOptions: BaseOutlineOption[];
  selectBaseOutlineOption: (option: BaseOutlineOption) => void;
  chapterOptions: Chapter[];
  setChapterOptions: (options: Chapter[]) => void;
  selectedChapter: Chapter | null;
  setSelectedChapter: (chapter: Chapter | null) => void;
  setActiveView: (view: ActiveView) => void;
  generateChapterOptions: (baseOutlineId: string) => Promise<void>;
  rewriteChapters: (baseOutlineId: string) => Promise<void>;
  generateNextArcs: () => Promise<void>;
  generateBasicOutlineChildren: (option: BasicOutlineOption, level: number) => Promise<BasicOutlineOption[] | null>;
  handleGenerateBaseOutlines: () => Promise<void>;
  selectChapterForWriting: (chapterTitle: string, chapterSummary: string, chapterId: string) => void;
  totalLevels: number;
  generateNextArcsBranching: () => Promise<void>;
  generateChapterBranching: (baseOutlineId: string) => Promise<void>;
  regenerateRootBranching: () => Promise<void>;
  branchingSettings: { branchesPerLevel: number; totalLevels: number };
  branchingSuggestion: string;
  setBranchingSuggestion: (val: string) => void;
  isGeneratingWorld?: boolean;
  theme: 'light' | 'dark';
  recentBibleUpdate: any;
  setLastBibleUpdate: (update: any) => void;
}

export const OutlineView: React.FC<OutlineViewProps> = ({
  baseOutlines,
  setBaseOutlines,
  basicOutlineOptions,
  selectBasicOutlineOption,
  selectedBasicOutline,
  baseOutlineOptions,
  selectBaseOutlineOption,
  chapterOptions,
  setChapterOptions,
  selectedChapter,
  setSelectedChapter,
  setActiveView,
  generateChapterOptions,
  rewriteChapters,
  generateNextArcs,
  generateBasicOutlineChildren,
  handleGenerateBaseOutlines,
  selectChapterForWriting,
  totalLevels,
  generateNextArcsBranching,
  generateChapterBranching,
  regenerateRootBranching,
  branchingSettings,
  branchingSuggestion,
  setBranchingSuggestion,
  theme,
  recentBibleUpdate,
  setLastBibleUpdate
}) => {
  const [activeBaseOutlineIdForChapterOptions, setActiveBaseOutlineIdForChapterOptions] = React.useState<string | null>(null);
  const [showOptions, setShowOptions] = React.useState(false);

  // Tự động hiện options nếu chưa có dàn ý nào được chọn
  React.useEffect(() => {
    if (baseOutlines.length === 0 && (baseOutlineOptions.length > 0 || basicOutlineOptions.length > 0)) {
      setShowOptions(true);
    }
  }, [baseOutlines.length, baseOutlineOptions.length, basicOutlineOptions.length]);

  const updateBaseOutline = (baseOutlineIndex: number, field: keyof BaseOutline, value: string) => {
    const newBaseOutlines = [...baseOutlines];
    (newBaseOutlines[baseOutlineIndex] as any)[field] = value;
    setBaseOutlines(newBaseOutlines);
  };

  const updateChapter = (baseOutlineIndex: number, chapterIndex: number, field: keyof Chapter, value: any) => {
    const newBaseOutlines = [...baseOutlines];
    (newBaseOutlines[baseOutlineIndex].chapters[chapterIndex] as any)[field] = value;
    setBaseOutlines(newBaseOutlines);
  };

  const selectChapterOption = (baseOutlineId: string, chapter: Chapter) => {
    setBaseOutlines(baseOutlines.map(a => {
      if (a.id === baseOutlineId) {
        return {
          ...a,
          chapters: [...a.chapters, { 
            ...chapter, 
            id: Math.random().toString(36).substr(2, 9),
            isIncludedInReader: true // Auto include in reader view when selected
          }]
        };
      }
      return a;
    }));
    setChapterOptions([]);
    setActiveBaseOutlineIdForChapterOptions(null);
  };

  React.useEffect(() => {
    const handleEvent = (e: any) => {
      setActiveBaseOutlineIdForChapterOptions(e.detail.baseOutlineId);
    };
    window.addEventListener('generate-chapter-versions', handleEvent);
    return () => window.removeEventListener('generate-chapter-versions', handleEvent);
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b border-zinc-300 dark:border-zinc-800 pb-4">
        <div className="flex flex-wrap items-center gap-3">
          {(baseOutlineOptions.length > 0 || basicOutlineOptions.length > 0) && (
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all text-xs font-bold border ${
                showOptions 
                ? "bg-primary/10 dark:bg-primary/20 border-primary text-primary" 
                : "bg-ivory dark:bg-zinc-900 hover:bg-ivory-dark dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 shadow-sm dark:shadow-none"
              }`}
            >
              <ArrowLeft size={16} />
              {showOptions ? "ĐÓNG DANH SÁCH PHƯƠNG ÁN" : "XEM DANH SÁCH PHƯƠNG ÁN"}
            </button>
          )}
          <Button 
            onClick={generateNextArcs}
            variant="rgb"
            className="rounded-xl px-4 py-5 text-xs font-bold"
          >
            <Plus size={16} />
            Viết phương án tiếp theo
          </Button>
          
          <Button 
            onClick={generateNextArcsBranching}
            variant="rgb"
            className="rounded-xl px-4 py-5 text-xs font-bold"
          >
            <Sparkles size={16} />
            Phác thảo đa nhánh cho Arc tiếp theo
          </Button>

          <Button 
            onClick={() => setLastBibleUpdate(recentBibleUpdate)}
            variant="outline"
            className="rounded-xl px-4 py-5 text-xs font-bold"
            disabled={!recentBibleUpdate}
          >
            <BookOpen size={16} />
            Xem lại Cập nhật Bible
          </Button>

          {selectedBasicOutline && baseOutlineOptions.length === 0 && baseOutlines.length === 0 && (
            <Button 
              onClick={handleGenerateBaseOutlines}
              variant="rgb"
              className="rounded-xl px-4 py-5 text-xs font-bold shadow-lg shadow-emerald-500/20"
            >
              <Sparkles size={16} />
              Tạo Dàn ý cơ sở từ Phác thảo đã chọn
            </Button>
          )}
        </div>
      </div>
      
      {showOptions && (
        <div className="space-y-8">
          {basicOutlineOptions.length > 0 && (
            <BasicOutlineOptionSelector 
              basicOutlineOptions={basicOutlineOptions}
              selectBasicOutlineOption={selectBasicOutlineOption}
              selectedBasicOutline={selectedBasicOutline}
              generateBasicOutlineChildren={generateBasicOutlineChildren}
              regenerateRootBranching={regenerateRootBranching}
              totalLevels={totalLevels}
              branchingSettings={branchingSettings}
              branchingSuggestion={branchingSuggestion}
              setBranchingSuggestion={setBranchingSuggestion}
              theme={theme}
            />
          )}

          {baseOutlineOptions.length > 0 && (
            <div className="pt-8 border-t border-zinc-300 dark:border-zinc-800">
              <BaseOutlineOptionSelector 
                baseOutlineOptions={baseOutlineOptions}
                selectBaseOutlineOption={(opt) => {
                  selectBaseOutlineOption(opt);
                  setShowOptions(false);
                }}
                baseOutlines={baseOutlines}
                theme={theme}
              />
            </div>
          )}
        </div>
      )}

      <div className="space-y-6">
        {baseOutlines.length === 0 && <p className="text-zinc-500 italic text-center py-10">Chưa có Dàn ý cơ sở nào được tạo.</p>}
        {baseOutlines.map((baseOutline, baseOutlineIndex) => (
          <React.Fragment key={baseOutline.id}>
            <BaseOutlineItem 
              baseOutline={baseOutline} 
              baseOutlineIndex={baseOutlineIndex} 
              updateBaseOutline={(field, value) => updateBaseOutline(baseOutlineIndex, field, value)}
              onGenerateChapters={() => rewriteChapters(baseOutline.id)}
              theme={theme}
            >
      <div className="px-6 pb-4">
                <Button 
                  onClick={() => generateChapterBranching(baseOutline.id)}
                  variant="rgb"
                  className="rounded-lg px-3 py-4 text-[10px] font-bold"
                >
                  <Sparkles size={12} />
                  PHÁC THẢO ĐA NHÁNH CHO CHƯƠNG TIẾP THEO
                </Button>
              </div>
              {baseOutline.chapters.map((chapter, chapterIndex) => (
                <ChapterItem 
                  key={chapter.id}
                  chapter={chapter}
                  chapterIndex={chapterIndex}
                  isSelected={selectedChapter?.id === chapter.id}
                  onSelect={() => {
                    setSelectedChapter(chapter);
                    setActiveView('editor');
                  }}
                  updateChapter={(field, value) => updateChapter(baseOutlineIndex, chapterIndex, field, value)}
                  selectChapterForWriting={selectChapterForWriting}
                  theme={theme}
                />
              ))}
            </BaseOutlineItem>
            {chapterOptions.length > 0 && activeBaseOutlineIdForChapterOptions === baseOutline.id && (
              <ChapterOptionSelector 
                chapterOptions={chapterOptions}
                selectChapterOption={(chapter) => selectChapterOption(baseOutline.id, chapter)}
                onRewrite={() => generateChapterOptions(baseOutline.id)}
                theme={theme}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

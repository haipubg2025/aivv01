import React from 'react';
import { Chapter } from '../types';
import { cn } from '../lib/utils';
import { Sparkles, Layers, ChevronDown, ChevronUp, BookOpen, History } from 'lucide-react';
import { AutoResizeTextarea } from './ui/AutoResizeTextarea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChapterItemProps {
  chapter: Chapter;
  chapterIndex: number;
  isSelected: boolean;
  onSelect: () => void;
  updateChapter: (field: keyof Chapter, value: any) => void;
  selectChapterForWriting: (chapterTitle: string, chapterSummary: string, chapterId: string) => void;
  theme: 'light' | 'dark';
}

export const ChapterItem: React.FC<ChapterItemProps> = ({
  chapter,
  isSelected,
  updateChapter,
  selectChapterForWriting,
  theme
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const versions = chapter.versions || [];
  const selectedVersionIndex = chapter.selectedVersionIndex ?? (versions.length > 0 ? versions.length - 1 : -1);
  const currentContent = selectedVersionIndex >= 0 ? versions[selectedVersionIndex] : chapter.content;

  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "p-6 rounded-2xl border transition-all",
      isSelected 
        ? "bg-primary/10 border-primary ring-1 ring-primary/20" 
        : isDark ? "bg-black border-zinc-800 hover:border-zinc-700 shadow-none" : "bg-ivory border-zinc-200 hover:border-zinc-300 shadow-sm"
    )}>
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex items-start justify-between gap-3">
          <AutoResizeTextarea 
            value={chapter.title}
            onChange={(e) => updateChapter('title', e.target.value)}
            className="bg-transparent font-bold text-lg outline-none flex-1 text-zinc-900 dark:text-zinc-100 resize-none overflow-hidden min-h-[30px]"
            placeholder="Tên Chương"
            rows={1}
          />
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            {(() => {
              const hasContent = !!chapter.content || versions.length > 0;
              const percentage = hasContent ? 100 : 0;
              
              return hasContent && (
                <div className="flex items-center gap-2">
                  <div className="w-16 md:w-20 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500">{percentage}%</span>
                </div>
              );
            })()}
            {versions.length > 1 && (
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-md border border-amber-500/20 text-[10px] font-bold">
                <Layers size={10} />
                {versions.length} phiên bản
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Sparkles size={12} className="text-primary shrink-0" />
          <AutoResizeTextarea 
            value={chapter.storyGuidingPrinciple || ''}
            onChange={(e) => updateChapter('storyGuidingPrinciple', e.target.value)}
            className="bg-transparent text-[10px] font-bold outline-none flex-1 text-primary placeholder:text-zinc-400 resize-none overflow-hidden min-h-[20px]"
            placeholder="Kim chỉ nam của chương (Story Guiding Principle)..."
            rows={1}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              selectChapterForWriting(chapter.title, chapter.summary, chapter.id);
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary rounded-lg transition-all text-[10px] font-bold border border-primary/20 shrink-0 shadow-sm dark:shadow-none"
            title="Viết chương này"
          >
            <Sparkles size={12} />
            VIẾT CHƯƠNG NÀY
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              updateChapter('isIncludedInReader', !chapter.isIncludedInReader);
            }}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-[10px] font-bold border shrink-0 shadow-sm dark:shadow-none",
              chapter.isIncludedInReader
                ? "bg-emerald-600/10 dark:bg-emerald-600/20 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "bg-ivory dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
            )}
            title={chapter.isIncludedInReader ? "Bỏ khỏi tập truyện" : "Đưa vào tập truyện"}
          >
            <BookOpen size={12} />
            {chapter.isIncludedInReader ? "ĐÃ CHỌN ĐỌC" : "CHỌN ĐỂ ĐỌC"}
          </button>

          {(chapter.content || versions.length > 0) && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-ivory dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg transition-all text-[10px] font-bold border border-zinc-200 dark:border-zinc-700 shrink-0 shadow-sm dark:shadow-none"
            >
              <BookOpen size={12} />
              {isExpanded ? "ẨN NỘI DUNG" : "XEM NỘI DUNG"}
              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}

          <select
            value={chapter.pov || ''}
            onChange={(e) => updateChapter('pov', e.target.value || undefined)}
            className="bg-ivory dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg px-3 py-1.5 text-[10px] font-bold border border-zinc-200 dark:border-zinc-700 outline-none transition-all cursor-pointer shadow-sm dark:shadow-none"
          >
            <option value="">POV mặc định</option>
            <option value="first_person">Ngôi thứ nhất</option>
            <option value="third_person_limited">Ngôi thứ ba hạn chế</option>
            <option value="third_person_omniscient">Ngôi thứ ba toàn năng</option>
            <option value="deep_pov">Deep POV</option>
            <option value="multi_pov">Đa góc nhìn</option>
          </select>
        </div>
      </div>
      
      <AutoResizeTextarea 
        value={chapter.summary}
        onChange={(e) => updateChapter('summary', e.target.value)}
        className="bg-transparent text-sm text-zinc-600 dark:text-zinc-500 outline-none w-full leading-relaxed mb-4 min-h-[64px]"
        placeholder="Tóm tắt nội dung chương..."
      />

      {isExpanded && (chapter.content || versions.length > 0) && (
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
          {versions.length > 1 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                <History size={12} />
                Các phiên bản đã viết
              </div>
              <div className="flex flex-wrap gap-2">
                {versions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateChapter('selectedVersionIndex', idx)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-bold border transition-all shadow-sm dark:shadow-none",
                      selectedVersionIndex === idx
                        ? "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-500"
                        : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    )}
                  >
                    Phiên bản {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-xl border border-zinc-200 dark:border-zinc-800/50 p-4 max-h-96 overflow-y-auto custom-scrollbar">
            <div className="prose dark:prose-invert prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentContent || "_Chưa có nội dung chi tiết cho chương này._"}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

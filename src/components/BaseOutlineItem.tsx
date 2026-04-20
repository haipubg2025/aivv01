import { BaseOutline } from '../types';
import { AutoResizeTextarea } from './ui/AutoResizeTextarea';
import { Plus } from 'lucide-react';
import { cn } from '../lib/utils';

interface BaseOutlineItemProps {
  baseOutline: BaseOutline;
  baseOutlineIndex: number;
  updateBaseOutline: (field: keyof BaseOutline, value: string) => void;
  onGenerateChapters?: () => void;
  children: React.ReactNode;
  theme: 'light' | 'dark';
}

export const BaseOutlineItem: React.FC<BaseOutlineItemProps> = ({
  baseOutline,
  updateBaseOutline,
  onGenerateChapters,
  children,
  theme
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <div className="relative py-2">
        <div className={cn(
          "p-6 rounded-2xl border shadow-sm dark:shadow-none",
          isDark ? "bg-black border-zinc-800" : "bg-ivory border-zinc-200"
        )}>
          <div className="flex flex-col gap-3 mb-3">
            <AutoResizeTextarea 
              value={baseOutline.title}
              onChange={(e) => updateBaseOutline('title', e.target.value)}
              className="bg-transparent font-bold text-xl outline-none w-full text-primary resize-none overflow-hidden"
              placeholder="Tên Dàn ý cơ sở"
            />
            <div className="flex items-center gap-3">
              {onGenerateChapters && (
                <button 
                  onClick={onGenerateChapters}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all text-xs font-bold shadow-lg shadow-purple-500/20"
                >
                  <Plus size={14} /> {baseOutline.chapters.length === 0 ? "AI SÁNG TẠO DÀN Ý CHƯƠNG" : "VIẾT LẠI DÀN Ý CHƯƠNG"}
                </button>
              )}
              {(() => {
                const totalChapters = baseOutline.chapters.length;
                const completedChapters = baseOutline.chapters.filter(c => !!c.content).length;
                const percentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
                
                return totalChapters > 0 && (
                  <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-950/50 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{percentage}%</span>
                  </div>
                );
              })()}
            </div>
          </div>
          <AutoResizeTextarea 
            value={baseOutline.summary}
            onChange={(e) => updateBaseOutline('summary', e.target.value)}
            className="bg-transparent text-sm text-zinc-600 dark:text-zinc-400 outline-none w-full leading-relaxed min-h-[80px]"
            placeholder="Tóm tắt Dàn ý cơ sở..."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-2">
        {children}
      </div>
    </div>
  );
};

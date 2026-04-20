import React, { useState, useEffect } from 'react';
import { Send, Trash2, Square, RotateCcw, FastForward } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Theme, BaseOutline } from '../types';
import { AutoResizeTextarea } from './ui/AutoResizeTextarea';
import { Button } from './ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from './ui/tooltip';

interface InputAreaProps {
  theme: Theme;
  prompt: string;
  setPrompt: (val: string) => void;
  handleGenerate: (mode?: 'generate' | 'continue' | 'rewrite', overridePrompt?: string, count?: number) => void;
  handleContinue: () => void;
  handleRewrite: () => void;
  handleWriteNextChapter: () => void;
  stopGeneration: () => void;
  isLoading: boolean;
  setStoryContent: (val: string) => void;
  currentChapterId: string | null;
  baseOutlines: BaseOutline[];
  worldGenSettings: any;
}

export const InputArea: React.FC<InputAreaProps> = ({
  theme,
  prompt,
  setPrompt,
  handleGenerate,
  handleRewrite,
  handleWriteNextChapter,
  stopGeneration,
  isLoading,
  setStoryContent,
  currentChapterId,
  baseOutlines,
  worldGenSettings
}) => {
  const [localPrompt, setLocalPrompt] = useState(prompt);

  // Sync local state if global state changes externally (e.g. cleared after generate)
  useEffect(() => {
    setLocalPrompt(prompt);
  }, [prompt]);

  const currentChapter = currentChapterId ? (() => {
    for (const baseOutline of baseOutlines) {
      for (const chapter of baseOutline.chapters) {
        if (chapter.id === currentChapterId) return chapter;
      }
    }
    return null;
  })() : null;

  const hasContent = !!currentChapter?.content;

  const onGenerateClick = () => {
    setPrompt(localPrompt);
    // Sử dụng chapterVersionCount từ cấu hình, tối thiểu là 1
    const count = currentChapterId ? (worldGenSettings?.chapterVersionCount || 1) : 1;
    handleGenerate('generate', localPrompt, count);
  };

  return (
    <div className={cn(
      "p-6 border-t transition-colors duration-300",
      theme === 'dark' ? "border-zinc-800" : "border-zinc-200",
      "bg-[var(--app-bg-color,var(--background))] text-[var(--app-text-color,var(--foreground))]"
    )}>
      <div className="max-w-3xl mx-auto relative">
        <AutoResizeTextarea
          value={localPrompt}
          onChange={(e) => setLocalPrompt(e.target.value)}
          placeholder="Nhập yêu cầu cho phần tiếp theo... (VD: Viết cảnh chiến đấu kịch tính giữa A và B)"
          className={cn(
            "w-full p-4 md:p-5 pr-14 rounded-2xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm leading-relaxed shadow-inner",
            theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-ivory-dark border-zinc-200 text-zinc-900"
          )}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (!isLoading && localPrompt.trim()) onGenerateClick();
            }
          }}
        />
        
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          {isLoading ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="rgb"
                  size="icon"
                  onClick={stopGeneration}
                  className="rounded-xl shadow-xl shadow-red-500/30 active:scale-95 transition-all"
                >
                  <Square size={20} fill="currentColor" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Dừng xử lý</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={onGenerateClick}
                  disabled={!localPrompt.trim()}
                  size="icon"
                  variant={localPrompt.trim() ? "rgb" : "default"}
                  className={cn(
                    "rounded-xl transition-all shadow-xl active:scale-95",
                    !localPrompt.trim() 
                      ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed shadow-none" 
                      : "shadow-primary/30"
                  )}
                >
                  <Send size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Gửi yêu cầu (Enter)</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-3 flex flex-wrap justify-between items-center px-2 gap-4">
        <div className="flex items-center gap-3">
          {hasContent && !isLoading && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="rgb"
                    size="sm"
                    onClick={handleWriteNextChapter}
                    className="gap-1.5 text-[10px] font-bold h-8"
                  >
                    <FastForward size={14} /> VIẾT TIẾP
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Chuyển sang chương tiếp theo</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="rgb"
                    size="sm"
                    onClick={handleRewrite}
                    className="gap-1.5 border-amber-500/20 bg-amber-600/10 hover:bg-amber-600 hover:text-white text-amber-500 text-[10px] font-bold h-8 border animate-pulse"
                  >
                    <RotateCcw size={14} /> VIẾT LẠI
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Yêu cầu AI viết lại bản thảo này</TooltipContent>
              </Tooltip>
            </>
          )}
          <p className="text-[10px] text-zinc-500 font-medium hidden sm:block">ENTER: Gửi • SHIFT+ENTER: Xuống dòng</p>
        </div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setStoryContent('')} 
              className="text-xs text-red-500 hover:text-red-400 font-medium flex items-center gap-1.5 transition-colors h-8"
            >
              <Trash2 size={14} /> Xóa bản thảo
            </Button>
          </TooltipTrigger>
          <TooltipContent>Xóa sạch nội dung đang soạn thảo hiện tại</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  PanelRightClose, 
  PanelRightOpen, 
  Square,
  Save,
  ArrowUp,
  ArrowDown,
  Feather,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Theme, AIStatus } from '../types';
import { Button } from './ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from './ui/tooltip';

interface HeaderProps {
  theme: Theme;
  isLeftSidebarOpen: boolean;
  setIsLeftSidebarOpen: (open: boolean) => void;
  isRightSidebarOpen: boolean;
  setIsRightSidebarOpen: (open: boolean) => void;
  saveStory: () => void;
  stopGeneration: () => void;
  isLoading: boolean;
  aiStatus: AIStatus;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  theme,
  isLeftSidebarOpen,
  setIsLeftSidebarOpen,
  isRightSidebarOpen,
  setIsRightSidebarOpen,
  saveStory,
  stopGeneration,
  isLoading,
  aiStatus
}) => {
  const scrollToTop = () => {
    // Priority 1: Reader View content
    const readerTop = document.getElementById('reader-scroll-top');
    const readerViewport = document.getElementById('reader-content-area');
    
    if (readerTop || readerViewport) {
      if (readerTop) readerTop.scrollIntoView({ behavior: 'auto', block: 'start' });
      if (readerViewport) {
        readerViewport.scrollTo({ top: 0, behavior: 'auto' });
        // Force immediate jump
        readerViewport.scrollTop = 0;
      }
      return;
    }

    // Priority 2: Main scroll container
    const mainViewport = document.getElementById('main-scroll-container');
    if (mainViewport) {
      mainViewport.scrollTo({ top: 0, behavior: 'auto' });
      mainViewport.scrollTop = 0;
    }
  };

  const scrollToBottom = () => {
    // Priority 1: Reader View content
    const readerBottom = document.getElementById('reader-scroll-bottom');
    const readerViewport = document.getElementById('reader-content-area');

    if (readerBottom || readerViewport) {
      if (readerBottom) readerBottom.scrollIntoView({ behavior: 'auto', block: 'end' });
      if (readerViewport) {
        readerViewport.scrollTo({ 
          top: readerViewport.scrollHeight, 
          behavior: 'auto' 
        });
        // Force jump
        readerViewport.scrollTop = readerViewport.scrollHeight;
      }
      return;
    }

    // Priority 2: Main scroll container
    const mainViewport = document.getElementById('main-scroll-container');
    if (mainViewport) {
      mainViewport.scrollTo({ 
        top: mainViewport.scrollHeight, 
        behavior: 'auto' 
      });
      mainViewport.scrollTop = mainViewport.scrollHeight;
    }
  };

  return (
    <header className={cn(
      "h-16 border-b flex items-center justify-between px-4 sticky top-0 z-50 backdrop-blur-md transition-colors duration-300",
      theme === 'dark' ? "border-zinc-800" : "border-zinc-200",
      "bg-[var(--app-bg-color,var(--background))] opacity-95"
    )}>
      <div className="flex items-center gap-4 w-1/3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="rgb" 
              size="icon"
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              className="overflow-hidden"
            >
              {isLeftSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start">
            {isLeftSidebarOpen ? "Đóng thanh bên trái" : "Mở thanh bên trái"}
          </TooltipContent>
        </Tooltip>

        <div className="flex items-center gap-2 group cursor-default">
          <div className="relative">
            <div className="bg-primary p-1.5 rounded-xl text-white shadow-md shadow-primary/20 transform group-hover:scale-110 transition-transform duration-500 ease-out">
              <Feather size={20} className="transform -rotate-12" />
            </div>
            <div className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-white rounded-full p-0.5 shadow-sm animate-pulse border-2 border-[var(--app-bg-color,var(--background))] transition-colors duration-300">
              <Sparkles size={8} fill="currentColor" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg leading-none tracking-tight text-primary">AI Văn Vở</span>
              <span className="hidden sm:inline-block text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 uppercase tracking-tighter">Pro</span>
            </div>
            <span className="hidden sm:block text-[9px] font-medium opacity-40 uppercase tracking-[0.25em] ml-0.5">Creative Studio</span>
          </div>
        </div>
      </div>

      {/* Middle Scroll Buttons */}
      <div className="flex items-center justify-center gap-1 flex-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={scrollToTop}
              className="text-zinc-500 hover:text-primary hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
              <ArrowUp size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Lên đầu trang</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={scrollToBottom}
              className="text-zinc-500 hover:text-primary hover:bg-zinc-200 dark:hover:bg-zinc-900"
            >
              <ArrowDown size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Xuống cuối trang</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center justify-end gap-2 w-1/3">
        {(isLoading || aiStatus.isProcessing) && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="rgb"
                size="sm"
                onClick={stopGeneration}
                className="gap-2 animate-pulse"
              >
                <Square size={16} fill="currentColor" />
                <span className="hidden md:inline">Dừng</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Dừng xử lý AI</TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="rgb"
              size="sm"
              onClick={saveStory}
              className="gap-2"
            >
              <Save size={16} />
              <span className="hidden md:inline">Lưu dàn ý</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Lưu vào bộ nhớ</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="rgb" 
              size="icon"
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className="overflow-hidden"
            >
              {isRightSidebarOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            {isRightSidebarOpen ? "Đóng thanh bên phải" : "Mở thanh bên phải"}
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export const Header = HeaderComponent;

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ActiveView, Theme, AIStats, AIStatus, BaseOutline } from '../types';
import { LeftSidebarContent } from './sidebar/LeftSidebarContent';
import { RightSidebarContent } from './sidebar/RightSidebarContent';

interface SidebarProps {
  side: 'left' | 'right';
  isOpen: boolean;
  theme: Theme;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  aiStats?: AIStats | null;
  aiStatus: AIStatus;
  baseOutlines?: BaseOutline[];
  codexCount?: number;
  timelineCount?: number;
  characterCount?: number;
}

const SidebarComponent: React.FC<SidebarProps> = ({ 
  side, 
  isOpen, 
  theme, 
  activeView, 
  setActiveView, 
  aiStats, 
  aiStatus, 
  baseOutlines = [],
  codexCount,
  timelineCount,
  characterCount
}) => {
  const [elapsed, setElapsed] = React.useState(0);

  const totalChapters = React.useMemo(() => 
    baseOutlines.reduce((acc, baseOutline) => acc + baseOutline.chapters.length, 0)
  , [baseOutlines]);

  const completedChapters = React.useMemo(() => 
    baseOutlines.reduce((acc, baseOutline) => acc + baseOutline.chapters.filter(c => !!c.content).length, 0)
  , [baseOutlines]);

  const globalProgress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

  React.useEffect(() => {
    let interval: any;
    if (aiStats?.startTime) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - aiStats.startTime!) / 1000));
      }, 1000);
    } else {
      setElapsed(aiStats?.processingTime || 0);
    }
    return () => clearInterval(interval);
  }, [aiStats?.startTime, aiStats?.processingTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 240, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className={cn(
            "flex flex-col overflow-hidden shrink-0 h-full relative z-20",
            side === 'left' ? "border-r" : "border-l",
            theme === 'dark' ? "border-zinc-800" : "border-zinc-200",
            "bg-[var(--app-bg-color,var(--background))] text-[var(--app-text-color,var(--foreground))]"
          )}
        >
          <div 
            id={`${side}-sidebar-scroll`} 
            className="flex-1 w-full overflow-y-auto overflow-x-hidden custom-scrollbar"
          >
            <div className="py-4 flex flex-col">
              {side === 'left' ? (
                <LeftSidebarContent 
                  activeView={activeView} 
                  setActiveView={setActiveView} 
                  globalProgress={globalProgress} 
                  codexCount={codexCount}
                  timelineCount={timelineCount}
                  characterCount={characterCount}
                  baseOutlineCount={baseOutlines.length}
                  theme={theme}
                />
              ) : (
                <RightSidebarContent 
                  activeView={activeView} 
                  setActiveView={setActiveView} 
                  aiStats={aiStats} 
                  aiStatus={aiStatus} 
                  elapsed={elapsed} 
                  formatTime={formatTime} 
                  theme={theme}
                />
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export const Sidebar = SidebarComponent;

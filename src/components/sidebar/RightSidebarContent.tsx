import React from 'react';
import { FolderOpen, ListTree, MessageSquareQuote, BarChart3, Activity, Settings } from 'lucide-react';
import { NavItem } from './NavItem';
import { AiStatsDisplay } from './AiStatsDisplay';
import { AiStatusDisplay } from './AiStatusDisplay';
import { ActiveView, AIStats, AIStatus, Theme } from '../../types';
import { cn } from '../../lib/utils';

interface RightSidebarContentProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  aiStats: AIStats | null | undefined;
  aiStatus: AIStatus;
  elapsed: number;
  formatTime: (seconds: number) => string;
  theme: Theme;
}

export const RightSidebarContent: React.FC<RightSidebarContentProps> = ({ 
  activeView, 
  setActiveView, 
  aiStats, 
  aiStatus, 
  elapsed, 
  formatTime,
  theme
}) => {
  return (
    <>
      <h3 className={cn(
        "px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-50",
        theme === 'dark' ? "text-white" : "text-black"
      )}>Quản lý & Hỗ trợ</h3>
      <NavItem id="files" label="Quản lý tệp lưu" icon={FolderOpen} sidebar="right" activeView={activeView} setActiveView={setActiveView} theme={theme} />
      <NavItem id="summaries" label="Mục lục & Tóm Tắt" icon={ListTree} sidebar="right" activeView={activeView} setActiveView={setActiveView} theme={theme} />
      <NavItem id="context" label="Cửa Sổ Ngữ Cảnh" icon={MessageSquareQuote} sidebar="right" activeView={activeView} setActiveView={setActiveView} theme={theme} />
      <NavItem id="stats" label="Thống kê" icon={BarChart3} sidebar="right" activeView={activeView} setActiveView={setActiveView} theme={theme} />
      <NavItem id="ai-monitor" label="AI Monitor (Streaming)" icon={Activity} sidebar="right" activeView={activeView} setActiveView={setActiveView} theme={theme} />
      
      <h3 className={cn(
        "px-4 text-[10px] font-bold uppercase tracking-[0.2em] mt-8 mb-4 opacity-50",
        theme === 'dark' ? "text-white" : "text-black"
      )}>Hệ thống</h3>
      <NavItem id="settings" label="Cấu Hình" icon={Settings} sidebar="right" activeView={activeView} setActiveView={setActiveView} theme={theme} />

      {aiStats && (
        <AiStatsDisplay 
          aiStats={aiStats} 
          elapsed={elapsed} 
          formatTime={formatTime} 
        />
      )}

      <AiStatusDisplay aiStatus={aiStatus} />
    </>
  );
};

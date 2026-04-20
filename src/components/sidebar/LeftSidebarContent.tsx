import React from 'react';
import { Globe, Library, Clock, Users, ListTree, PenTool, Eye } from 'lucide-react';
import { NavItem } from './NavItem';
import { ActiveView, Theme } from '../../types';
import { cn } from '../../lib/utils';

interface LeftSidebarContentProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  globalProgress: number;
  codexCount?: number;
  timelineCount?: number;
  characterCount?: number;
  baseOutlineCount?: number;
  theme: Theme;
}

export const LeftSidebarContent: React.FC<LeftSidebarContentProps> = ({ 
  activeView, 
  setActiveView, 
  globalProgress,
  codexCount,
  timelineCount,
  characterCount,
  baseOutlineCount,
  theme
}) => {
  return (
    <>
      <h3 className={cn(
        "px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-50",
        theme === 'dark' ? "text-white" : "text-black"
      )}>Quy trình chuẩn bị</h3>
      <NavItem id="world" label="Bối cảnh & Cốt truyện" icon={Globe} sidebar="left" activeView={activeView} setActiveView={setActiveView} theme={theme} />
      <NavItem id="codex" label="CODEX" icon={Library} sidebar="left" activeView={activeView} setActiveView={setActiveView} count={codexCount} theme={theme} />
      <NavItem id="timeline" label="Dòng thời gian" icon={Clock} sidebar="left" activeView={activeView} setActiveView={setActiveView} count={timelineCount} theme={theme} />
      <NavItem id="characters" label="Nhân vật" icon={Users} sidebar="left" activeView={activeView} setActiveView={setActiveView} count={characterCount} theme={theme} />
      <NavItem id="outline" label="Dàn ý cơ sở" icon={ListTree} sidebar="left" activeView={activeView} setActiveView={setActiveView} count={baseOutlineCount} theme={theme} />
      
      <h3 className={cn(
        "px-4 text-[10px] font-bold uppercase tracking-[0.2em] mt-8 mb-4 opacity-50",
        theme === 'dark' ? "text-white" : "text-black"
      )}>Sáng tác & Đọc</h3>
      <NavItem id="editor" label="Viết bản thảo" icon={PenTool} sidebar="left" activeView={activeView} setActiveView={setActiveView} progress={globalProgress} theme={theme} />
      <NavItem id="reader" label="Chế độ đọc" icon={Eye} sidebar="left" activeView={activeView} setActiveView={setActiveView} theme={theme} />
    </>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { ActiveView, Theme } from '../../types';

interface NavItemProps {
  id: ActiveView;
  label: string;
  icon: any;
  sidebar: 'left' | 'right';
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  progress?: number;
  count?: number;
  theme: Theme;
}

export const NavItem: React.FC<NavItemProps> = ({ id, label, icon: Icon, sidebar, activeView, setActiveView, progress, count, theme }) => (
  <button 
    onClick={() => setActiveView(id)}
    className={cn(
      "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all border-l-4 relative overflow-hidden no-led",
      activeView === id 
        ? "bg-primary/10 border-primary text-primary btn-rgb" 
        : cn(
            "border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200",
            theme === 'dark' ? "text-white" : "text-black"
          )
    )}
  >
    {progress !== undefined && progress > 0 && (
      <div 
        className="absolute left-0 bottom-0 h-0.5 bg-primary/30 transition-all duration-500" 
        style={{ width: `${progress}%` }}
      />
    )}
    <Icon size={18} />
    <span>{label}</span>
    {count !== undefined && (
      <span className={cn(
        "ml-auto text-xs px-2 py-0.5 rounded-full",
        activeView === id 
          ? "bg-primary/20 text-primary" 
          : (theme === 'dark' ? "bg-zinc-800 text-zinc-400" : "bg-zinc-200 text-zinc-600")
      )}>
        {count}
      </span>
    )}
    {activeView === id && (
      <motion.div 
        layoutId={`active-indicator-${sidebar}`} 
        className={cn("w-1.5 h-1.5 rounded-full bg-primary", count === undefined ? "ml-auto" : "ml-2")} 
      />
    )}
  </button>
);

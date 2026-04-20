import React from 'react';
import { Check, ChevronRight, RefreshCw } from 'lucide-react';
import { BaseOutlineOption } from '../../types';
import { cn } from '../../lib/utils';

interface BaseOutlineOptionSelectorProps {
  baseOutlineOptions: BaseOutlineOption[];
  selectBaseOutlineOption: (option: BaseOutlineOption) => void;
  baseOutlines: any[];
  theme: 'light' | 'dark';
}

export const BaseOutlineOptionSelector: React.FC<BaseOutlineOptionSelectorProps> = ({ 
  baseOutlineOptions, 
  selectBaseOutlineOption, 
  baseOutlines,
  theme
}) => {
  if (baseOutlineOptions.length === 0) return null;

  const isInitial = baseOutlines.length === 0;
  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "p-8 rounded-3xl border-2 animate-in fade-in slide-in-from-top-4 duration-500",
      isDark ? "bg-primary/10 border-primary/30" : "bg-primary/5 border-primary/20"
    )}>
      <h3 className={cn(
        "text-lg font-bold mb-6 flex items-center justify-between gap-2",
        isDark ? "text-primary" : "text-primary"
      )}>
        <div className="flex items-center gap-2">
          <Check size={24} /> 
          {isInitial 
            ? `AI đã tạo ${baseOutlineOptions.length} phương án Dàn ý siêu chi tiết (100+ tình tiết). Hãy chọn 1 phương án:`
            : `AI đã tạo ${baseOutlineOptions.length} phiên bản cho Arc tiếp theo. Hãy chọn 1 phiên bản:`
          }
        </div>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent(isInitial ? 'rewrite-base-outline-options' : 'generate-next-arcs-event'))}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all text-xs font-bold shadow-lg shadow-primary/20"
        >
          <RefreshCw size={14} /> VIẾT LẠI PHƯƠNG ÁN
        </button>
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {baseOutlineOptions.map((option, idx) => (
          <div 
            key={option.id}
            className={cn(
              "group p-6 rounded-2xl border transition-all cursor-pointer",
              isDark 
                ? "bg-black border-zinc-800 hover:border-primary" 
                : "bg-ivory border-zinc-200 hover:border-primary"
            )}
            onClick={() => selectBaseOutlineOption(option)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white">
                  {idx + 1}
                </div>
                <h4 className={cn(
                  "font-bold text-base group-hover:text-primary transition-colors",
                  isDark ? "text-zinc-100" : "text-zinc-900"
                )}>{option.title}</h4>
              </div>
              <ChevronRight size={20} className="text-zinc-600 group-hover:text-primary transition-all group-hover:translate-x-1" />
            </div>
            <p className={cn(
              "text-base leading-relaxed whitespace-pre-wrap",
              isDark ? "text-zinc-400" : "text-zinc-600"
            )}>{option.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

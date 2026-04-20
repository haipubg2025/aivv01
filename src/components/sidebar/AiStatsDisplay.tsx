import React from 'react';
import { Sparkles } from 'lucide-react';
import { AIStats } from '../../types';

interface AiStatsDisplayProps {
  aiStats: AIStats;
  elapsed: number;
  formatTime: (seconds: number) => string;
}

export const AiStatsDisplay: React.FC<AiStatsDisplayProps> = ({ aiStats, elapsed, formatTime }) => {
  return (
    <div className="p-4 border-t border-blue-500 bg-blue-600 text-white font-mono">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} className="text-white" />
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Thông số AI</h4>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center text-[11px] bg-white/10 p-2 rounded-lg border border-white/20">
          <span className="text-white/70 font-medium uppercase tracking-wider text-[9px]">Số chữ (VN)</span>
          <span className="text-white font-mono font-bold text-xs">{(aiStats.wordCount || 0).toLocaleString()}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-white/10 border border-white/20 shadow-sm">
            <span className="text-[9px] uppercase text-white/60 font-bold tracking-widest">Token In</span>
            <span className="text-sm font-mono font-bold text-white leading-none">
              {(aiStats.inputTokens || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-white/10 border border-white/20 shadow-sm">
            <span className="text-[9px] uppercase text-white/60 font-bold tracking-widest">Token Out</span>
            <span className="text-sm font-mono font-bold text-white leading-none">
              {(aiStats.outputTokens || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-1 pt-1">
          <span className="text-[10px] text-white/70 font-medium uppercase tracking-wider">Thời gian xử lý</span>
          <span className="text-white font-mono font-bold text-sm">{formatTime(elapsed || 0)}</span>
        </div>

        {(aiStats.processingTime || 0) > 0 && (
          <div className="flex justify-between items-center px-1 pt-2 border-t border-white/20">
            <span className="text-[9px] text-white/50 uppercase tracking-widest">Tổng cộng</span>
            <span className="text-white/70 font-mono text-[11px]">{(aiStats.processingTime || 0).toFixed(1)}s</span>
          </div>
        )}
      </div>
    </div>
  );
};

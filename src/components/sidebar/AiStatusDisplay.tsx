import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { AIStatus } from '../../types';
import { cn } from '../../lib/utils';

interface AiStatusDisplayProps {
  aiStatus: AIStatus;
}

export const AiStatusDisplay: React.FC<AiStatusDisplayProps> = ({ aiStatus }) => {
  if (!aiStatus.isProcessing && !aiStatus.lastError) return null;

  return (
    <div className={cn(
      "p-4 border-t transition-all duration-300 space-y-4 font-mono",
      aiStatus.lastError 
        ? "bg-red-600 text-white border-red-500" 
        : "bg-blue-600 text-white border-blue-500"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em]",
            aiStatus.lastError ? "text-white" : "text-white"
          )}>
            <RefreshCw size={12} className={cn(aiStatus.isProcessing && "animate-spin")} />
            <span>{aiStatus.lastError ? "Lỗi hệ thống" : "Đang xử lý"}</span>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-bold text-white shadow-sm">
          LẦN: {aiStatus.retryCount}
        </div>
      </div>

      {aiStatus.lastError && (
        <div className="p-3 rounded-xl bg-white/10 border border-white/20 space-y-2 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-2 text-white">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-[11px] font-bold leading-tight">
                {aiStatus.lastError}
              </p>
              <p className="text-[10px] text-white/70 italic font-medium">
                Hệ thống đang tự động thử lại...
              </p>
            </div>
          </div>
        </div>
      )}

      {aiStatus.currentAction && (
        <div className="flex items-center gap-2 px-1">
          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
          <p className="text-[11px] text-white/80 font-medium leading-relaxed italic">
            {aiStatus.currentAction}
          </p>
        </div>
      )}
    </div>
  );
};

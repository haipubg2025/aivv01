import React from 'react';
import { BookOpen, Sparkles, ShieldAlert, Info } from 'lucide-react';
import { stripBeautifyTags } from '../lib/contentUtils';
import { AutoResizeTextarea } from './ui/AutoResizeTextarea';
import { cn } from '../lib/utils';

interface ContextViewProps {
  currentContext: string;
  setCurrentContext: (val: string) => void;
  aiInstructions: string;
  setAiInstructions: (val: string) => void;
  storyTitle: string;
  storyConcept: string;
  storyGuidingPrinciple: string;
  genre: string;
  storyTone: string;
  worldInfo: string;
  powerSystem: string;
  charactersCount: number;
  codexCount: number;
  timelineCount: number;
  theme: 'light' | 'dark';
}

export const ContextView: React.FC<ContextViewProps> = ({
  currentContext,
  setCurrentContext,
  aiInstructions,
  setAiInstructions,
  storyTitle,
  storyConcept,
  storyGuidingPrinciple,
  genre,
  storyTone,
  worldInfo,
  powerSystem,
  charactersCount,
  codexCount,
  timelineCount,
  theme
}) => {
  return (
    <div className="space-y-8">
      <div className={cn(
        "space-y-4 border-b pb-4",
        theme === 'dark' ? "border-zinc-800" : "border-zinc-200"
      )}>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
          Kiểm soát những gì AI sẽ nhận được trước khi bắt đầu viết. Bạn có thể điều chỉnh tóm tắt diễn biến hoặc đưa ra các yêu cầu nghiêm ngặt để AI tuân thủ.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Context Window & AI Instructions */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={20} className="text-zinc-400" />
              <h3 className={cn("text-base font-bold uppercase tracking-wider", theme === 'dark' ? "text-zinc-300" : "text-zinc-700")}>Cửa Sổ Ngữ Cảnh (Context Window)</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Tóm tắt diễn biến quan trọng nhất từ các chương trước. AI sẽ dùng phần này làm "bộ nhớ ngắn hạn".
            </p>
            <AutoResizeTextarea 
              value={stripBeautifyTags(currentContext)}
              onChange={(e) => setCurrentContext(e.target.value)}
              placeholder="Dán hoặc tự viết tóm tắt diễn biến chương trước vào đây..."
              className={cn(
                "w-full p-6 rounded-2xl border text-sm outline-none min-h-[300px] resize-none leading-relaxed focus:border-primary/50 transition-all shadow-inner",
                theme === 'dark' ? "bg-zinc-950 border-zinc-800 text-zinc-100" : "bg-ivory-dark border-zinc-200 text-zinc-900"
              )}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert size={20} className="text-amber-500" />
              <h3 className="text-base font-bold text-amber-500 uppercase tracking-wider">Hướng dẫn, nhắc nhở cho AI</h3>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Yêu cầu AI tuân thủ nghiêm ngặt các quy tắc hoặc phong cách cụ thể cho phân đoạn sắp tới.
            </p>
            <AutoResizeTextarea 
              value={aiInstructions}
              onChange={(e) => setAiInstructions(e.target.value)}
              placeholder="Ví dụ: Tuyệt đối không để nhân vật A chết, sử dụng nhiều từ ngữ miêu tả mùi vị, tập trung vào sự căng thẳng..."
              className={cn(
                "w-full p-6 rounded-2xl border text-sm outline-none min-h-[200px] resize-none leading-relaxed transition-all shadow-inner",
                theme === 'dark' 
                  ? "bg-amber-500/5 border-amber-500/20 text-amber-200/80 focus:border-amber-500/50" 
                  : "bg-amber-50 border-amber-200 text-amber-900 focus:border-amber-500/50"
              )}
            />
          </div>
        </div>

        {/* Right: Detailed Context Preview */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} className="text-zinc-400" />
            <h3 className={cn("text-base font-bold uppercase tracking-wider", theme === 'dark' ? "text-zinc-300" : "text-zinc-700")}>Dữ liệu gửi cho AI</h3>
          </div>

          <div className={cn(
            "p-6 rounded-2xl border space-y-6",
            theme === 'dark' ? "bg-zinc-950/30 border-zinc-800" : "bg-ivory-dark border-zinc-200"
          )}>
            <div className="space-y-4">
              <h4 className={cn("text-xs font-bold uppercase tracking-widest border-b pb-2", theme === 'dark' ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-200")}>Thông tin cốt lõi</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">Tên truyện</span>
                  <span className={cn("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-800")}>{storyTitle || "Chưa đặt tên"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">Thể loại & Tông giọng</span>
                  <span className={cn("text-sm", theme === 'dark' ? "text-zinc-300" : "text-zinc-800")}>{genre || "N/A"} | {storyTone || "N/A"}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">Kim chỉ nam</span>
                  <p className="text-xs text-zinc-400 italic whitespace-pre-wrap">{storyGuidingPrinciple || "Chưa có kim chỉ nam"}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">Ý tưởng chủ đạo</span>
                  <p className="text-xs text-zinc-400 italic whitespace-pre-wrap">{storyConcept || "Chưa có ý tưởng"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className={cn("text-xs font-bold uppercase tracking-widest border-b pb-2", theme === 'dark' ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-200")}>Thế giới & Hệ thống</h4>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">Bối cảnh thế giới</span>
                  <p className="text-xs text-zinc-400 whitespace-pre-wrap">{worldInfo ? "Đã thiết lập (Gửi tóm tắt)" : "Chưa có"}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">Hệ thống sức mạnh</span>
                  <p className="text-xs text-zinc-400 whitespace-pre-wrap">{powerSystem || "Chưa có"}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className={cn("text-xs font-bold uppercase tracking-widest border-b pb-2", theme === 'dark' ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-200")}>Thống kê Story Bible</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className={cn(
                  "p-3 rounded-xl border text-center",
                  theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-ivory border-zinc-200"
                )}>
                  <span className="block text-lg font-bold text-primary">{charactersCount}</span>
                  <span className="text-[9px] text-zinc-500 uppercase font-bold">Nhân vật</span>
                </div>
                <div className={cn(
                  "p-3 rounded-xl border text-center",
                  theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-ivory border-zinc-200"
                )}>
                  <span className="block text-lg font-bold text-emerald-400">{codexCount}</span>
                  <span className="text-[9px] text-zinc-500 uppercase font-bold">Codex</span>
                </div>
                <div className={cn(
                  "p-3 rounded-xl border text-center",
                  theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-ivory border-zinc-200"
                )}>
                  <span className="block text-lg font-bold text-amber-400">{timelineCount}</span>
                  <span className="text-[9px] text-zinc-500 uppercase font-bold">Sự kiện</span>
                </div>
              </div>
            </div>

            <div className={cn(
              "pt-4 flex items-start gap-3 p-4 rounded-xl border",
              theme === 'dark' ? "bg-primary/5 border-primary/10" : "bg-primary/5 border-primary/20"
            )}>
              <Sparkles size={16} className="text-primary shrink-0 mt-0.5" />
              <p className="text-[10px] text-zinc-400 leading-relaxed italic">
                AI sẽ tự động tổng hợp tất cả các thông tin trên cùng với phong cách viết bạn đã chọn để tạo ra nội dung nhất quán nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

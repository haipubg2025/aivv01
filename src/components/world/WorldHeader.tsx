import React from 'react';
import { FileText, Trash2, RefreshCw, Sparkles, Upload, Download, ChevronDown, ChevronUp, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '../ui/tooltip';
import { Badge } from '../ui/badge';
import { RealismToggle } from './RealismToggle';
import { motion, AnimatePresence } from 'motion/react';

interface WorldHeaderProps {
  handleGenerateWorldDetails: () => void;
  undoWorldGeneration: () => void;
  worldGenHistory: any[];
  isGeneratingWorld: boolean;
  generateBasicOutlines: () => void;
  generateBaseOutlines: () => void;
  storyConcept: string;
  resetWorld: () => void;
  exportStoryBible: () => void;
  bibleImportRef: React.RefObject<HTMLInputElement | null>;
  selectedBasicOutline: any | null;
  branchingSettings: {
    branchesPerLevel: number;
    totalLevels: number;
  };
  setBranchingSettings: (val: { branchesPerLevel: number; totalLevels: number }) => void;
  branchingSuggestion: string;
  setBranchingSuggestion: (val: string) => void;
  isRealismEnabled: boolean;
  setIsRealismEnabled: (val: boolean) => void;
  worldGenSettings: {
    characterCount: number;
    outlineOptionCount: number;
    codexCount: number;
    timelineCount: number;
    chapterVersionCount: number;
  };
  setWorldGenSettings: (val: { 
    characterCount: number; 
    outlineOptionCount: number;
    codexCount: number;
    timelineCount: number;
    chapterVersionCount: number;
  }) => void;
  theme: 'light' | 'dark';
  genre: string;
}

export const WorldHeader: React.FC<WorldHeaderProps> = ({
  handleGenerateWorldDetails,
  undoWorldGeneration,
  worldGenHistory,
  isGeneratingWorld,
  generateBasicOutlines,
  generateBaseOutlines,
  storyConcept,
  resetWorld,
  exportStoryBible,
  bibleImportRef,
  selectedBasicOutline,
  branchingSettings,
  setBranchingSettings,
  branchingSuggestion,
  setBranchingSuggestion,
  isRealismEnabled,
  setIsRealismEnabled,
  worldGenSettings,
  setWorldGenSettings,
  theme,
  genre
}) => {
  const isDark = theme === 'dark';
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  return (
    <div className={cn(
      "space-y-6 border-b pb-6",
      isDark ? "border-zinc-800" : "border-zinc-200"
    )}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => bibleImportRef.current?.click()}
                className="h-10 w-10 rounded-xl"
              >
                <Upload size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Nhập dữ liệu Story Bible (.json)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={exportStoryBible}
                className="h-10 w-10 rounded-xl"
              >
                <Download size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Xuất dữ liệu Story Bible (.json)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline"
                onClick={resetWorld}
                className="h-10 gap-2 font-bold rounded-xl px-4 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <Trash2 size={18} />
                RESET
              </Button>
            </TooltipTrigger>
            <TooltipContent>Xóa sạch dữ liệu thế giới hiện tại</TooltipContent>
          </Tooltip>
          
          <RealismToggle 
            isRealismEnabled={isRealismEnabled} 
            setIsRealismEnabled={setIsRealismEnabled} 
            genre={genre}
            theme={theme}
          />

          {worldGenHistory.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline"
                  onClick={undoWorldGeneration}
                  disabled={isGeneratingWorld}
                  className="h-10 gap-2 font-bold rounded-xl px-4 bg-amber-600/10 hover:bg-amber-600/20 text-amber-600 border-amber-600/20 disabled:opacity-50"
                >
                  <RefreshCw size={18} className={isGeneratingWorld ? "animate-spin" : ""} />
                  HOÀN TÁC
                </Button>
              </TooltipTrigger>
              <TooltipContent>Quay lại (Undo) một bước tạo Story Bible trước đó</TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className={cn(
          "flex flex-wrap items-center gap-4 p-4 rounded-2xl border shadow-inner",
          isDark ? "bg-black/40 border-zinc-800" : "bg-zinc-50 border-zinc-200"
        )}>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1 cursor-help">Nhánh / Tầng</label>
                </TooltipTrigger>
                <TooltipContent>Số lượng phương án rẽ nhánh cho mỗi tầng (Cấp độ) khi tạo cây rẽ nhánh.</TooltipContent>
              </Tooltip>
              <Input 
                type="number" 
                min="1" 
                max="20"
                value={branchingSettings.branchesPerLevel}
                onChange={(e) => setBranchingSettings({ ...branchingSettings, branchesPerLevel: parseInt(e.target.value) || 10 })}
                className="w-16 h-8 text-xs font-bold text-center appearance-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1 cursor-help">Tổng số tầng</label>
                </TooltipTrigger>
                <TooltipContent>Số tầng (Độ sâu) tối đa của cây rẽ nhánh ý tưởng.</TooltipContent>
              </Tooltip>
              <Input 
                type="number" 
                min="1" 
                max="10"
                value={branchingSettings.totalLevels}
                onChange={(e) => setBranchingSettings({ ...branchingSettings, totalLevels: parseInt(e.target.value) || 5 })}
                className="w-16 h-8 text-xs font-bold text-center"
              />
            </div>
          </div>

          <div className={cn(
            "h-10 w-px hidden sm:block",
            isDark ? "bg-zinc-800" : "bg-zinc-200"
          )} />

          <div className="flex-1 min-w-[220px] flex flex-col gap-1.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1 flex items-center gap-1.5 cursor-help">
                  <Sparkles size={10} className="text-primary" />
                  Gợi ý hướng rẽ nhánh (Tùy chọn)
                </label>
              </TooltipTrigger>
              <TooltipContent>Nhập yêu cầu cụ thể để AI định hướng các phương án rẽ nhánh theo ý bạn.</TooltipContent>
            </Tooltip>
            <Input 
              placeholder="Thêm phản diện, rẽ sang hướng kinh dị..."
              value={branchingSuggestion}
              onChange={(e) => setBranchingSuggestion(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={selectedBasicOutline ? "outline" : "ai"}
              size="lg"
              onClick={generateBasicOutlines}
              disabled={isGeneratingWorld || !storyConcept.trim()}
              className={cn(
                "h-14 px-8 rounded-2xl font-black text-sm gap-3 shadow-xl transition-all active:scale-95",
                !selectedBasicOutline && "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 glowable-emerald"
              )}
            >
              <FileText size={22} />
              <div className="flex flex-col items-start gap-0">
                <span className="uppercase tracking-tighter">BƯỚC 0</span>
                <span className="text-[10px] opacity-80 font-bold uppercase">Phác thảo cốt truyện (Sơ lược)</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Khởi tạo các ý tưởng phác thảo sơ khai dưới dạng cây rẽ nhánh đa tầng.</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ai"
              size="lg"
              onClick={handleGenerateWorldDetails}
              disabled={isGeneratingWorld || !storyConcept.trim()}
              className="h-14 px-8 rounded-2xl font-black text-sm gap-3 shadow-xl transition-all active:scale-95 bg-primary hover:bg-primary/90 shadow-primary/20"
            >
              {isGeneratingWorld ? <RefreshCw size={22} className="animate-spin" /> : <Sparkles size={22} />}
              <div className="flex flex-col items-start gap-0">
                <span className="uppercase tracking-tighter">BƯỚC 1</span>
                <span className="text-[10px] opacity-80 font-bold uppercase">Tạo Thế Giới & Nhân Vật (Story Bible)</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Xây dựng chi tiết hệ thống nhân vật, địa lý, lịch sử và từ điển thế giới.</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ai"
              size="lg"
              onClick={generateBaseOutlines}
              disabled={isGeneratingWorld || !storyConcept.trim()}
              className="h-14 px-8 rounded-2xl font-black text-sm gap-3 shadow-xl transition-all active:scale-95 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20"
            >
              {isGeneratingWorld ? <RefreshCw size={22} className="animate-spin" /> : <FileText size={22} />}
              <div className="flex flex-col items-start gap-0">
                <span className="uppercase tracking-tighter">BƯỚC 2</span>
                <span className="text-[10px] opacity-80 font-bold uppercase">Dàn Ý các phương án (Base Outline)</span>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Đề xuất các phương án dàn ý chương mở đầu chi tiết từ Thế giới đã tạo.</TooltipContent>
        </Tooltip>

        {!storyConcept.trim() && (
          <div className="animate-in fade-in slide-in-from-left-2 duration-300">
            <Badge variant="destructive" className="animate-pulse py-1 px-3">
              Nhập "Ý tưởng chủ đạo" để bắt đầu
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="h-8 gap-2 text-xs font-bold opacity-60 hover:opacity-100 transition-all hover:bg-white/5"
            >
              {isSettingsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              <Settings2 size={14} />
              CẤU HÌNH SỐ LƯỢNG (BƯỚC 1 & 2)
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mở bảng cấu hình nâng cao để chỉnh số lượng Dàn ý, Nhân vật, Ghi chú...</TooltipContent>
        </Tooltip>

        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className={cn(
                "mt-2 p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-2 gap-6",
                isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
              )}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-xs font-bold opacity-70 uppercase tracking-wider cursor-help">Số lượng nhân vật (Bước 1)</Label>
                      </TooltipTrigger>
                      <TooltipContent>Số lượng nhân vật tối đa AI sẽ tạo ra trong Story Bible.</TooltipContent>
                    </Tooltip>
                    <Badge variant="secondary" className="text-[10px] font-mono px-2 py-0 h-4">{worldGenSettings.characterCount}</Badge>
                  </div>
                  <Input 
                    type="number"
                    min={10}
                    max={50}
                    value={worldGenSettings.characterCount}
                    onChange={(e) => setWorldGenSettings({ ...worldGenSettings, characterCount: parseInt(e.target.value) || 20 })}
                    className="h-9 bg-black/20 border-white/5 focus:border-primary/50 transition-colors"
                  />
                  <p className="text-[10px] opacity-50 italic uppercase font-medium">* Mặc định là 20. Càng nhiều nhân vật, thời gian xử lý càng lâu.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-xs font-bold opacity-70 uppercase tracking-wider cursor-help">Số lượng phương án dàn ý (Bước 2)</Label>
                      </TooltipTrigger>
                      <TooltipContent>Số lượng lựa chọn Dàn ý cơ sở AI sẽ đề xuất.</TooltipContent>
                    </Tooltip>
                    <Badge variant="secondary" className="text-[10px] font-mono px-2 py-0 h-4">{worldGenSettings.outlineOptionCount}</Badge>
                  </div>
                  <Input 
                    type="number"
                    min={1}
                    max={10}
                    value={worldGenSettings.outlineOptionCount}
                    onChange={(e) => setWorldGenSettings({ ...worldGenSettings, outlineOptionCount: parseInt(e.target.value) || 5 })}
                    className="h-9 bg-black/20 border-white/5 focus:border-primary/50 transition-colors"
                  />
                  <p className="text-[10px] opacity-50 italic uppercase font-medium">* Mặc định là 5 phương án khác nhau.</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-xs font-bold opacity-70 uppercase tracking-wider cursor-help">Số mục Codex (Bước 1)</Label>
                      </TooltipTrigger>
                      <TooltipContent>Số lượng ghi chú về kiến thức, địa danh, vật phẩm... sẽ được tạo.</TooltipContent>
                    </Tooltip>
                    <Badge variant="secondary" className="text-[10px] font-mono px-2 py-0 h-4">{worldGenSettings.codexCount}</Badge>
                  </div>
                  <Input 
                    type="number"
                    min={5}
                    max={30}
                    value={worldGenSettings.codexCount}
                    onChange={(e) => setWorldGenSettings({ ...worldGenSettings, codexCount: parseInt(e.target.value) || 15 })}
                    className="h-9 bg-black/20 border-white/5 focus:border-primary/50 transition-colors"
                  />
                  <p className="text-[10px] opacity-50 italic uppercase font-medium">* Bộ từ điển/kiến thức thế giới (Mặc định: 15).</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-xs font-bold opacity-70 uppercase tracking-wider cursor-help">Số lượng sự kiện Timeline (Bước 1)</Label>
                      </TooltipTrigger>
                      <TooltipContent>Số lượng mốc thời gian lịch sử quan trọng trong Story Bible.</TooltipContent>
                    </Tooltip>
                    <Badge variant="secondary" className="text-[10px] font-mono px-2 py-0 h-4">{worldGenSettings.timelineCount}</Badge>
                  </div>
                  <Input 
                    type="number"
                    min={5}
                    max={20}
                    value={worldGenSettings.timelineCount}
                    onChange={(e) => setWorldGenSettings({ ...worldGenSettings, timelineCount: parseInt(e.target.value) || 10 })}
                    className="h-9 bg-black/20 border-white/5 focus:border-primary/50 transition-colors"
                  />
                  <p className="text-[10px] opacity-50 italic uppercase font-medium">* Các mốc lịch sử quan trọng (Mặc định: 10).</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Label className="text-xs font-bold opacity-70 uppercase tracking-wider cursor-help">Số phiên bản Chương</Label>
                      </TooltipTrigger>
                      <TooltipContent>Số lượng lựa chọn phiên bản nội dung khi AI viết một chương cụ thể.</TooltipContent>
                    </Tooltip>
                    <Badge variant="secondary" className="text-[10px] font-mono px-2 py-0 h-4">{worldGenSettings.chapterVersionCount}</Badge>
                  </div>
                  <Input 
                    type="number"
                    min={1}
                    max={20}
                    value={worldGenSettings.chapterVersionCount}
                    onChange={(e) => setWorldGenSettings({ ...worldGenSettings, chapterVersionCount: parseInt(e.target.value) || 10 })}
                    className="h-9 bg-black/20 border-white/5 focus:border-primary/50 transition-colors"
                  />
                  <p className="text-[10px] opacity-50 italic uppercase font-medium">* Số lựa chọn khi viết phiên bản chương. (Mặc định: 10).</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, Info, ChevronDown, Check, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '../ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '../ui/dialog';
import { Switch } from '../ui/switch';
import { 
  REALISM_MODERN_PROMPTS, 
  REALISM_XIANXIA_PROMPTS, 
  REALISM_FANTASY_PROMPTS, 
  REALISM_ANCIENT_PROMPTS 
} from '../../constants/prompts/realism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RealismToggleProps {
  isRealismEnabled: boolean;
  setIsRealismEnabled: (enabled: boolean) => void;
  genre: string;
  theme: 'light' | 'dark';
}

const GENRE_RULES = [
  { id: 'modern', label: 'Hiện đại / Đô thị', content: REALISM_MODERN_PROMPTS },
  { id: 'xianxia', label: 'Tiên hiệp / Huyền huyễn', content: REALISM_XIANXIA_PROMPTS },
  { id: 'fantasy', label: 'Fantasy / Dị giới', content: REALISM_FANTASY_PROMPTS },
  { id: 'ancient', label: 'Cổ đại / Cung đấu', content: REALISM_ANCIENT_PROMPTS },
];

export const RealismToggle: React.FC<RealismToggleProps> = ({
  isRealismEnabled,
  setIsRealismEnabled,
  genre,
  theme
}) => {
  const isDark = theme === 'dark';
  
  // Detect default displayed genre rules based on current genre
  const getDefaultGenreId = () => {
    const g = genre.toLowerCase();
    if (g.includes('hiện đại') || g.includes('hiên đai') || g.includes('vườn trường') || g.includes('đô thị')) return 'modern';
    if (g.includes('tiên hiệp') || g.includes('tu tiên') || g.includes('kiếm hiệp') || g.includes('võ hiệp')) return 'xianxia';
    if (g.includes('fantasy') || g.includes('fantasie') || g.includes('dị giới') || g.includes('isekai') || g.includes('phương tây')) return 'fantasy';
    if (g.includes('cổ đại') || g.includes('cung đấu') || g.includes('phong kiến')) return 'ancient';
    return 'modern';
  };

  const actualActiveGenreId = getDefaultGenreId();
  const [viewingGenreId, setViewingGenreId] = React.useState(actualActiveGenreId);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  
  const activeRule = GENRE_RULES.find(r => r.id === viewingGenreId) || GENRE_RULES[0];
  const isCurrentlyActiveRule = viewingGenreId === actualActiveGenreId;

  return (
    <Dialog onOpenChange={(open) => {
      if (open) setViewingGenreId(getDefaultGenreId());
    }}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button 
              variant={isRealismEnabled ? "default" : "outline"}
              className={cn(
                "h-10 gap-2 font-bold rounded-xl px-4 transition-all shadow-sm",
                isRealismEnabled 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 shadow-emerald-600/20" 
                  : (isDark ? "border-zinc-800 bg-zinc-900/50 text-emerald-500 hover:bg-emerald-500/10" : "border-emerald-100 bg-emerald-50/30 text-emerald-600 hover:bg-emerald-50")
              )}
            >
              <Sparkles size={18} className={cn(isRealismEnabled ? "text-white" : "text-emerald-500")} />
              THỰC TẾ
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Bộ quy tắc Chân thực (Realism): Xem chi tiết prompt và bật/tắt</TooltipContent>
      </Tooltip>

      <DialogContent 
        showCloseButton={false}
        className={cn(
          "fixed inset-0 z-[100] flex flex-col p-0 gap-0 w-screen h-screen max-w-none sm:max-w-none max-h-none sm:max-h-none border-none outline-none overflow-hidden translate-x-0 translate-y-0 sm:translate-x-0 sm:translate-y-0 top-0 left-0 sm:top-0 sm:left-0 rounded-none sm:rounded-none m-0",
          isDark ? "bg-zinc-950 text-zinc-100" : "bg-white text-zinc-900"
        )}
      >
        {/* Fullscreen Header */}
        <div className={cn(
          "h-16 px-6 border-b flex items-center justify-between shrink-0 relative z-20",
          isDark ? "border-zinc-800 bg-zinc-900/80 backdrop-blur-md" : "border-zinc-100 bg-zinc-50/80 backdrop-blur-md"
        )}>
          <div className="flex items-center gap-4">
            {/* Custom Genre Selector Dropdown to avoid UI library portal conflicts */}
            <div className="relative">
              <Button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                variant="ghost" 
                className="h-10 gap-2 px-3 hover:bg-emerald-500/5 text-emerald-500 font-bold rounded-xl border border-transparent hover:border-emerald-500/20"
              >
                <span className="truncate max-w-[150px] sm:max-w-none uppercase text-xs tracking-tight">{activeRule.label}</span>
                <ChevronDown size={14} className="opacity-50" />
              </Button>
              
              {isDropdownOpen && (
                <>
                  {/* Invisible overlay to close dropdown when clicking outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className={cn(
                    "absolute top-full left-0 mt-2 w-72 p-1.5 rounded-2xl shadow-2xl z-50 border",
                    isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
                  )}>
                    {GENRE_RULES.map((rule) => {
                      const isActive = rule.id === actualActiveGenreId;
                      return (
                        <div
                          key={rule.id}
                          onClick={() => {
                            setViewingGenreId(rule.id);
                            setIsDropdownOpen(false);
                          }}
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all",
                            viewingGenreId === rule.id ? "bg-emerald-500/10 text-emerald-500 font-bold" : "hover:bg-zinc-500/5",
                            isActive && viewingGenreId !== rule.id && (isDark ? "text-emerald-400" : "text-emerald-600")
                          )}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs uppercase font-bold">{rule.label}</span>
                            {isActive && <span className="text-[9px] opacity-70">Đang kích hoạt ở truyện</span>}
                          </div>
                          {viewingGenreId === rule.id && <Check size={14} />}
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6 relative z-10">
            {/* Single Toggle Button */}
            <div className="flex items-center gap-3 pr-3 sm:pr-4 border-r border-current border-opacity-10 mr-1 sm:mr-2">
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest hidden xs:block",
                isRealismEnabled ? "text-emerald-500" : "text-zinc-500"
              )}>
                {isRealismEnabled ? "ON" : "OFF"}
              </span>
              <Switch 
                checked={isRealismEnabled}
                onCheckedChange={setIsRealismEnabled}
                className="scale-110"
              />
            </div>

            {/* Single Close Button (X) */}
            <DialogClose asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
              >
                <X size={24} />
              </Button>
            </DialogClose>
          </div>
        </div>

        {/* Fullscreen Content */}
        <div className="flex-1 overflow-hidden flex flex-col relative z-0">
          <div className={cn(
            "px-6 py-3 flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-colors",
            isCurrentlyActiveRule 
              ? (isDark ? "bg-emerald-500/10 text-emerald-400 border-b border-emerald-500/10" : "bg-emerald-50 text-emerald-700 border-b border-emerald-100")
              : (isDark ? "bg-orange-500/10 text-orange-400 border-b border-orange-500/10" : "bg-orange-50 text-orange-700 border-b border-orange-100")
          )}>
            <div className="flex items-center gap-2">
              {isCurrentlyActiveRule ? <Info size={14} /> : <AlertTriangle size={14} />}
              <span>
                {isCurrentlyActiveRule 
                  ? "✅ QUY TẮC NÀY ĐANG ĐƯỢC KÍCH HOẠT VÀ ÁP DỤNG VÀO TRUYỆN CỦA BẠN" 
                  : "⚠️ ĐANG XEM TRƯỚC. QUY TẮC NÀY KHÔNG ĐƯỢC ÁP DỤNG."}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 opacity-70">
              <span className="truncate max-w-[200px]">Thể loại hiện tại: {genre || "Chưa xác định"}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto px-6 py-12">
              <article className={cn(
                "prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black prose-p:leading-relaxed",
                isDark ? "prose-invert" : "",
                isCurrentlyActiveRule ? "prose-emerald prose-strong:text-emerald-500" : "prose-orange prose-strong:text-orange-500"
              )}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {activeRule.content}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

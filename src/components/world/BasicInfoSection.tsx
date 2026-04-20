import React, { useState } from 'react';
import { GENRE_CATEGORIES } from '../../constants/genres';
import { STORY_TONES } from '../../constants/tones';
import { Sparkles, Paperclip, FileText, X, Lightbulb, Search, Sword, Building2, Landmark, Rocket, Ghost, ChevronDown, UserRound, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AutoResizeTextarea } from '../ui/AutoResizeTextarea';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { ALL_CONCEPTS } from '../../constants/concepts';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
import {
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { useMemo } from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

interface BasicInfoSectionProps {
  storyTitle: string;
  setStoryTitle: (val: string) => void;
  storyConcept: string;
  setStoryConcept: (val: string) => void;
  genre: string;
  setGenre: (val: string) => void;
  protagonistType: string;
  setProtagonistType: (val: string) => void;
  storyTone: string;
  setStoryTone: (val: string) => void;
  references: any[];
  removeReference: (id: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  generateSpecificWorldField?: (fieldName: string, fieldLabel: string, setterFn: (val: string) => void) => Promise<void>;
  isGeneratingWorld?: boolean;
  theme: 'light' | 'dark';
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  storyTitle,
  setStoryTitle,
  storyConcept,
  setStoryConcept,
  genre,
  setGenre,
  protagonistType,
  setProtagonistType,
  storyTone,
  setStoryTone,
  references,
  removeReference,
  fileInputRef,
  generateSpecificWorldField,
  isGeneratingWorld,
  theme
}) => {
  const [hoveredGenre, setHoveredGenre] = useState<string | null>(null);
  const [hoveredTone, setHoveredTone] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const [isNsfwMode, setIsNsfwMode] = useState(false);

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {
      all: ALL_CONCEPTS.filter(c => c.isNsfw === isNsfwMode).length,
      'tu-tien': 0,
      'do-thi': 0,
      'cung-dau': 0,
      'sci-fi': 0,
      'kinh-di': 0,
      'nu-cuong': 0,
      'nhom': 0,
    };
    
    ALL_CONCEPTS.filter(c => c.isNsfw === isNsfwMode).forEach(sample => {
      const desc = sample.description.toLowerCase();
      if (desc.includes('tiên hiệp') || desc.includes('huyền huyễn')) counts['tu-tien']++;
      if (desc.includes('đô thị') || desc.includes('ngôn tình')) counts['do-thi']++;
      if (desc.includes('cung đấu') || desc.includes('lịch sử') || desc.includes('dã sử')) counts['cung-dau']++;
      if (desc.includes('sci-fi') || desc.includes('cyberpunk')) counts['sci-fi']++;
      if (desc.includes('kinh dị') || desc.includes('trinh thám') || desc.includes('linh dị')) counts['kinh-di']++;
      if (desc.includes('nữ cường')) counts['nu-cuong']++;
      if (desc.includes('nhóm') || desc.includes('tập thể')) counts['nhom']++;
    });
    
    return counts;
  }, [isNsfwMode]);

  const categories = [
    { id: 'all', label: 'Tất cả', icon: <Sparkles size={14} /> },
    { id: 'tu-tien', label: 'Tu Tiên', icon: <Sword size={14} /> },
    { id: 'do-thi', label: 'Đô Thị', icon: <Building2 size={14} /> },
    { id: 'cung-dau', label: 'Cung Đấu', icon: <Landmark size={14} /> },
    { id: 'nu-cuong', label: 'Nữ Cường', icon: <UserRound size={14} /> },
    { id: 'nhom', label: 'Nhóm / Team', icon: <Users size={14} /> },
    { id: 'sci-fi', label: 'Sci-fi', icon: <Rocket size={14} /> },
    { id: 'kinh-di', label: 'Kinh Dị', icon: <Ghost size={14} /> },
  ];
  
  const filteredConcepts = useMemo(() => {
    const contextConcepts = ALL_CONCEPTS.filter(c => c.isNsfw === isNsfwMode);
    let base = selectedCategory === 'all' ? contextConcepts : contextConcepts.filter(sample => {
      const desc = sample.description.toLowerCase();
      if (selectedCategory === 'tu-tien') return desc.includes('tiên hiệp') || desc.includes('huyền huyễn');
      if (selectedCategory === 'do-thi') return desc.includes('đô thị') || desc.includes('ngôn tình');
      if (selectedCategory === 'cung-dau') return desc.includes('cung đấu') || desc.includes('lịch sử') || desc.includes('dã sử');
      if (selectedCategory === 'sci-fi') return desc.includes('sci-fi') || desc.includes('cyberpunk');
      if (selectedCategory === 'kinh-di') return desc.includes('kinh dị') || desc.includes('trinh thám') || desc.includes('linh dị');
      if (selectedCategory === 'nu-cuong') return desc.includes('nữ cường');
      if (selectedCategory === 'nhom') return desc.includes('nhóm') || desc.includes('tập thể');
      return true;
    });

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      base = base.filter(s => 
        s.title.toLowerCase().includes(term) || 
        s.content.toLowerCase().includes(term) ||
        s.description.toLowerCase().includes(term)
      );
    }
    return base;
  }, [selectedCategory, searchTerm, isNsfwMode]);

  const currentGenres = genre ? genre.split(', ').filter(x => x !== "") : [];
  const isAiCreative = currentGenres.length === 0;
  const isDark = theme === 'dark';

  const allGenres = GENRE_CATEGORIES.flatMap(cat => cat.genres);

  const handleGenreToggle = (g: string) => {
    if (g === "AI_CREATIVE") {
      setGenre("");
      return;
    }

    let newGenres: string[];
    if (currentGenres.includes(g)) {
      newGenres = currentGenres.filter(x => x !== g);
    } else {
      newGenres = [...currentGenres, g];
    }
    setGenre(newGenres.join(', '));
  };

  const renderHeaderWithAiButton = (title: string, fieldName: string, setterFn: (val: string) => void) => (
    <div className="flex items-center justify-between w-full">
      <CardTitle className="text-base font-bold flex items-center gap-2">{title}</CardTitle>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            disabled={isGeneratingWorld}
            onClick={() => generateSpecificWorldField && generateSpecificWorldField(fieldName, title, setterFn)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded hover:bg-opacity-80 transition-all flex items-center gap-1.5",
              isDark ? "bg-zinc-800 text-purple-400" : "bg-purple-50 text-purple-600",
              isGeneratingWorld && "opacity-50 cursor-not-allowed"
            )}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
            </svg>
            AI Gen
          </button>
        </TooltipTrigger>
        <TooltipContent>Yêu cầu AI tự động tạo nội dung gợi ý cho mục "{title}".</TooltipContent>
      </Tooltip>
    </div>
  );

  return (
    <div className="space-y-8">
      <Card className={cn("border-none shadow-sm overflow-hidden", isDark ? "bg-zinc-900/50" : "bg-white")}>
        <CardHeader className="pb-3">
          {renderHeaderWithAiButton('Tên truyện', 'storyTitle', setStoryTitle)}
        </CardHeader>
        <CardContent>
          <AutoResizeTextarea 
            value={storyTitle}
            onChange={(e) => setStoryTitle(e.target.value)}
            placeholder="VD: Kiếm Đạo Độc Tôn, Phàm Nhân Tu Tiên..."
            className={cn(
              "w-full py-2 px-4 rounded-xl border text-xl font-bold outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-primary shadow-inner leading-tight box-border",
              isDark ? "bg-black border-zinc-800" : "bg-zinc-50 border-zinc-200"
            )}
            minRows={1}
          />
        </CardContent>
      </Card>

      <Card className={cn("border-none shadow-sm overflow-hidden", isDark ? "bg-zinc-900/50" : "bg-white")}>
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-bold flex items-center gap-2">Ý tưởng chủ đạo (Concept)</CardTitle>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 gap-2 rounded-lg border-amber-200 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-amber-900/20 transition-all active:scale-95"
                    >
                      <Lightbulb size={14} />
                      MẪU Ý TƯỞNG
                    </Button>
                  </DialogTrigger>
                  <DialogContent 
                    showCloseButton={false} 
                    className={cn(
                      "w-screen h-[100dvh] md:w-[98vw] md:h-[96vh] max-w-none sm:max-w-none md:max-w-none m-0 md:m-auto rounded-none md:rounded-[3rem] border-none p-0 flex flex-col overflow-hidden", 
                      isDark ? "bg-zinc-950 shadow-2xl shadow-black" : "bg-zinc-50 shadow-2xl shadow-zinc-200"
                    )}
                  >
                    {/* Minimal Top Bar - Replaces Header */}
                    <div className={cn(
                      "sticky top-0 z-30 flex items-center gap-3 p-4 border-b backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80",
                      isDark ? "border-zinc-900" : "border-zinc-200"
                    )}>
                      {/* Category Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                          className={cn(
                            "flex items-center gap-3 px-4 h-11 rounded-2xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/20",
                            "transition-all active:scale-95 whitespace-nowrap"
                          )}
                        >
                          {categories.find(c => c.id === selectedCategory)?.label} ({categoryStats[selectedCategory]})
                          <ChevronDown size={16} className={cn("transition-transform duration-200", isCategoryMenuOpen && "rotate-180")} />
                        </button>

                        {isCategoryMenuOpen && (
                          <div className={cn(
                            "absolute top-full left-0 mt-2 w-56 rounded-3xl shadow-2xl border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200",
                            isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-100"
                          )}>
                            <div className="p-2 space-y-1">
                              {categories.map(cat => (
                                <button
                                  key={cat.id}
                                  onClick={() => {
                                    setSelectedCategory(cat.id);
                                    setIsCategoryMenuOpen(false);
                                  }}
                                  className={cn(
                                    "flex items-center justify-between w-full px-4 py-3 rounded-2xl text-xs font-bold transition-all",
                                    selectedCategory === cat.id 
                                      ? "bg-primary text-white" 
                                      : isDark ? "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200" : "text-zinc-600 hover:bg-zinc-100 hover:text-primary"
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    {cat.icon}
                                    {cat.label}
                                  </div>
                                  <span className={cn(
                                    "px-2 py-0.5 rounded-lg text-[10px]",
                                    selectedCategory === cat.id ? "bg-white/20" : "bg-zinc-100 dark:bg-zinc-800"
                                  )}>
                                    {categoryStats[cat.id]}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Search Bar */}
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <Input 
                          placeholder="Tìm kiếm mẫu ý tưởng..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className={cn(
                            "pl-11 h-11 rounded-2xl text-sm border-none shadow-inner",
                            isDark ? "bg-zinc-900 text-zinc-100" : "bg-zinc-100 text-zinc-900"
                          )}
                        />
                        {searchTerm && (
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>

                      {/* Mode Switcher */}
                      <div className={cn(
                        "flex items-center gap-1 p-1 rounded-2xl h-11",
                        isDark ? "bg-zinc-900" : "bg-zinc-100"
                      )}>
                        <button
                          onClick={() => setIsNsfwMode(false)}
                          className={cn(
                            "flex items-center gap-2 px-4 h-full rounded-xl text-xs font-black transition-all",
                            !isNsfwMode 
                              ? "bg-white dark:bg-zinc-800 text-primary shadow-sm" 
                              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                          )}
                        >
                          <ShieldCheck size={14} className={!isNsfwMode ? "text-primary" : "text-zinc-400"} />
                          SFW
                        </button>
                        <button
                          onClick={() => setIsNsfwMode(true)}
                          className={cn(
                            "flex items-center gap-2 px-4 h-full rounded-xl text-xs font-black transition-all",
                            isNsfwMode 
                              ? "bg-red-500 text-white shadow-lg shadow-red-500/20" 
                              : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                          )}
                        >
                          <ShieldAlert size={14} className={isNsfwMode ? "text-white" : "text-zinc-400"} />
                          NSFW
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <ScrollArea className="h-full">
                        <div className="p-4 sm:p-10 w-full max-w-[1600px] mx-auto">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pb-32">
                            {filteredConcepts.map(sample => {
                              const isSelected = storyConcept === sample.content;
                              return (
                                <div 
                                  key={sample.id}
                                  onClick={() => setStoryConcept(sample.content)}
                                  className={cn(
                                    "relative p-6 rounded-[2.5rem] border-4 transition-all cursor-pointer group flex flex-col min-h-[250px] isolate overflow-hidden",
                                    isSelected
                                      ? "border-primary bg-primary/5 ring-8 ring-primary/5 shadow-2xl shadow-primary/10" 
                                      : isDark ? "border-zinc-900 bg-zinc-900/40 hover:border-zinc-800 hover:bg-zinc-900/60" : "border-white bg-white hover:border-primary/20 hover:shadow-2xl shadow-sm"
                                  )}
                                >
                                  {isSelected && (
                                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/20 blur-[60px] -z-10 animate-pulse" />
                                  )}

                                  <div className="flex items-start justify-between mb-5">
                                    <div className="flex-1">
                                      <h4 className={cn(
                                        "font-black text-base leading-tight transition-colors mb-2",
                                        isSelected ? "text-primary" : isDark ? "text-zinc-100" : "text-zinc-900"
                                      )}>
                                        {sample.title}
                                      </h4>
                                      <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter opacity-80">
                                        {sample.description.split(' - ')[0]}
                                      </Badge>
                                    </div>
                                    {isSelected && (
                                      <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/50 animate-in zoom-in-75">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                      </div>
                                    )}
                                  </div>

                                  <p className={cn(
                                    "text-[13px] leading-relaxed mb-6 flex-1",
                                    isSelected ? "text-zinc-900 dark:text-zinc-100 font-semibold" : "text-zinc-500 dark:text-zinc-400"
                                  )}>
                                    {sample.content}
                                  </p>
                                  
                                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-zinc-100 dark:border-zinc-900/50">
                                    <span className={cn(
                                      "text-[10px] uppercase tracking-widest font-black transition-colors",
                                      isSelected ? "text-primary" : "text-zinc-400 group-hover:text-primary"
                                    )}>
                                      {isSelected ? "Đang áp dụng" : "Chọn mẫu này"}
                                    </span>
                                    <Button 
                                      size="sm" 
                                      variant={isSelected ? "default" : "secondary"} 
                                      className={cn(
                                        "h-9 text-[11px] font-black rounded-2xl px-5 transition-all",
                                        isSelected ? "shadow-lg shadow-primary/30" : "bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-white"
                                      )}
                                    >
                                      {isSelected ? "SỬ DỤNG" : "CHỌN"}
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {filteredConcepts.length === 0 && (
                            <div className="py-32 flex flex-col items-center justify-center text-center space-y-6">
                              <div className="p-10 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-300">
                                <Search size={64} />
                              </div>
                              <div className="space-y-2">
                                <p className="text-2xl font-black text-zinc-400">Không tìm thấy ý tưởng phù hợp</p>
                                <p className="text-zinc-400 max-w-md">Chúng tôi không tìm thấy kết quả cho "{searchTerm}". Hãy thử từ khóa khác hoặc xóa bộ lọc.</p>
                                <Button 
                                  variant="outline" 
                                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
                                  className="mt-6 h-12 px-8 rounded-2xl font-black border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                                >
                                  XÓA BỘ LỌC
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>

                    <DialogFooter className={cn(
                      "p-6 sticky bottom-0 z-30 border-t backdrop-blur-xl",
                      isDark ? "bg-zinc-950/80 border-zinc-900/50" : "bg-white/80 border-zinc-200"
                    )}>
                      <div className="flex items-center gap-4 w-full max-w-4xl mx-auto">
                        <DialogClose asChild>
                          <Button variant="outline" className="flex-1 h-14 rounded-[1.25rem] font-black text-base border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">
                            <X size={20} className="mr-2" />
                            ĐÓNG
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant="default" className="flex-[2] h-14 rounded-[1.25rem] font-black text-base shadow-2xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            HOÀN TẤT
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>Mở kho thư viện các mẫu ý tưởng Concept chất lượng đã được biên soạn sẵn.</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  disabled={isGeneratingWorld}
                  onClick={() => generateSpecificWorldField && generateSpecificWorldField('storyConcept', 'Ý tưởng chủ đạo (Concept)', setStoryConcept)}
                  className={cn(
                    "px-3 h-8 text-xs font-medium rounded-lg hover:bg-opacity-80 transition-all flex items-center gap-1.5",
                    isDark ? "bg-zinc-800 text-purple-400" : "bg-purple-50 text-purple-600",
                    isGeneratingWorld && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
                  </svg>
                  AI Gen
                </button>
              </TooltipTrigger>
              <TooltipContent>Yêu cầu AI tự động tạo nội dung gợi ý cho Ý tưởng chủ đạo.</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-8 gap-2 rounded-lg"
                >
                  <Paperclip size={14} />
                  THÊM TƯ LIỆU
                </Button>
              </TooltipTrigger>
              <TooltipContent>Đính kèm hình ảnh hoặc tệp văn bản để AI tham khảo khi xây dựng thế giới.</TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <AutoResizeTextarea 
            value={storyConcept}
            onChange={(e) => setStoryConcept(e.target.value)}
            placeholder="Câu chuyện này nói về điều gì? Thông điệp chính là gì? (Ví dụ: Một hành trình tìm lại bản thân của một chiến binh giải nghệ trong thế giới hậu tận thế...)"
            className={cn(
              "w-full p-6 rounded-2xl border text-base outline-none leading-relaxed focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner",
              isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-zinc-50 border-zinc-200 text-zinc-900"
            )}
          />

          {references.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {references.map(ref => (
                <div key={ref.id} className={cn(
                  "group relative aspect-square rounded-2xl border overflow-hidden hover:border-primary transition-all shadow-sm",
                  isDark ? "bg-black border-zinc-800" : "bg-white border-zinc-200"
                )}>
                  {ref.type === 'image' ? (
                    <img src={ref.content} alt={ref.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center">
                      <FileText size={32} className={isDark ? "text-zinc-600" : "text-zinc-400"} />
                      <span className={cn(
                        "text-[10px] line-clamp-2 font-medium",
                        isDark ? "text-zinc-500" : "text-zinc-600"
                      )}>{ref.name}</span>
                    </div>
                  )}
                  <button 
                    onClick={() => removeReference(ref.id)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className={cn("border-none shadow-sm overflow-hidden", isDark ? "bg-zinc-900/50" : "bg-white")}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">Nhân vật chính cốt lõi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={protagonistType === 'Nam' ? 'default' : 'outline'}
                  onClick={() => setProtagonistType('Nam')}
                  className={cn(
                    "h-auto py-6 rounded-2xl flex flex-col items-center gap-1 border-2",
                    protagonistType === 'Nam' ? "bg-primary/10 border-primary text-primary hover:bg-primary/20" : "hover:bg-primary/5"
                  )}
                >
                  <span className="text-xl font-bold">Nam</span>
                  <span className="text-xs opacity-60 font-normal">(Mặc định)</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thiết lập nhân vật chính là Nam. AI sẽ chú trọng các tương tác và ngoại hình phù hợp.</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={protagonistType === 'Nữ' ? 'default' : 'outline'}
                  onClick={() => setProtagonistType('Nữ')}
                  className={cn(
                    "h-auto py-6 rounded-2xl flex flex-col items-center gap-1 border-2",
                    protagonistType === 'Nữ' ? "bg-pink-600/10 border-pink-500 text-pink-600 dark:text-pink-400 hover:bg-pink-600/20" : "hover:bg-pink-600/5"
                  )}
                >
                  <span className="text-xl font-bold">Nữ</span>
                  <span className="text-[10px] opacity-60 font-normal whitespace-pre-wrap">Sáng tạo theo hướng nữ chính</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thiết lập nhân vật chính là Nữ. AI sẽ điều chỉnh văn phong và góc nhìn xoay quanh nữ chủ.</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={protagonistType === 'Nhóm Người' ? 'default' : 'outline'}
                  onClick={() => setProtagonistType('Nhóm Người')}
                  className={cn(
                    "h-auto py-6 rounded-2xl flex flex-col items-center gap-1 border-2",
                    protagonistType === 'Nhóm Người' ? "bg-emerald-600/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600/20" : "hover:bg-emerald-600/5"
                  )}
                >
                  <span className="text-xl font-bold">Nhóm Người</span>
                  <span className="text-[10px] opacity-60 font-normal whitespace-pre-wrap">Gia đình hoặc tổ chức</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Thiết lập dàn nhân vật chính là một nhóm hoặc tổ chức cùng hành động.</TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      <Card className={cn("border-none shadow-sm overflow-hidden", isDark ? "bg-zinc-900/50" : "bg-white")}>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-1 min-h-[60px]">
            {renderHeaderWithAiButton('Thể loại', 'genre', setGenre)}
            {hoveredGenre ? (
              <div className="text-xs text-primary font-medium animate-in fade-in slide-in-from-top-1 line-clamp-2 h-8">
                {hoveredGenre === "AI_CREATIVE" 
                  ? "Để AI tự do sáng tạo thể loại phù hợp nhất với cốt truyện của bạn."
                  : allGenres.find(g => g.name === hoveredGenre)?.description}
              </div>
            ) : (
              <div className="text-xs text-zinc-500 font-medium h-8">
                Di chuột qua các thể loại để xem mô tả chi tiết.
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[300px] w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/40">
            <div className="space-y-6">
              <Button
                variant={isAiCreative ? "default" : "outline"}
                onClick={() => handleGenreToggle("AI_CREATIVE")}
                onMouseEnter={() => setHoveredGenre("AI_CREATIVE")}
                onMouseLeave={() => setHoveredGenre(null)}
                className="gap-2 h-9"
              >
                <Sparkles size={14} />
                Để AI sáng tạo
              </Button>

              {GENRE_CATEGORIES.map((category) => (
                <div key={category.title} className="space-y-3">
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.genres.map((g) => {
                      const isActive = currentGenres.includes(g.name);
                      return (
                        <Badge
                          key={g.name}
                          variant={isActive ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer transition-all px-2.5 py-1 text-[11px] font-medium",
                            isActive ? "bg-primary border-primary hover:bg-primary-hover" : "bg-transparent hover:bg-primary/10 hover:border-primary/50"
                          )}
                          onClick={() => handleGenreToggle(g.name)}
                          onMouseEnter={() => setHoveredGenre(g.name)}
                          onMouseLeave={() => setHoveredGenre(null)}
                        >
                          {g.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="relative">
            <Input 
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Hoặc nhập thể loại tùy chỉnh (cách nhau bởi dấu phẩy)..."
              className={cn(
                "w-full h-11 pr-12 rounded-xl border-zinc-200 focus-visible:ring-primary shadow-inner",
                isDark ? "bg-black border-zinc-800" : "bg-zinc-50"
              )}
            />
            {genre && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setGenre("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-500 h-8"
              >
                Xóa
              </Button>
            )}
          </div>
          
          {currentGenres.length > 0 && (
            <div className={cn(
              "p-4 rounded-xl border text-sm",
              isDark ? "bg-primary/10 border-primary/20" : "bg-primary/5 border-primary/10"
            )}>
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Đã chọn:</h4>
              <ul className="space-y-1.5">
                {currentGenres.map(g => {
                  const desc = allGenres.find(cat => cat.name === g)?.description;
                  if (!desc) return null;
                  return (
                    <li key={g} className={cn(
                      "text-xs leading-relaxed",
                      isDark ? "text-zinc-300" : "text-zinc-700"
                    )}>
                      <span className="font-bold text-primary">{g}:</span> {desc}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className={cn("border-none shadow-sm overflow-hidden", isDark ? "bg-zinc-900/50" : "bg-white")}>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-1 min-h-[60px]">
            {renderHeaderWithAiButton('Tone màu không khí (Atmospheric Color Tone)', 'storyTone', setStoryTone)}
            {hoveredTone ? (
              <div className="text-xs text-primary font-medium animate-in fade-in slide-in-from-top-1 h-8">
                {STORY_TONES.find(t => t.name === hoveredTone)?.description}
              </div>
            ) : (
              <div className="text-xs text-zinc-500 font-medium h-8">
                Di chuột qua các tone màu để xem mô tả chi tiết.
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={cn(
            "flex flex-wrap gap-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/40",
          )}>
            {STORY_TONES.map((t) => {
              const isActive = storyTone === t.name;
              return (
                <Badge
                  key={t.name}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setStoryTone(t.name)}
                  onMouseEnter={() => setHoveredTone(t.name)}
                  onMouseLeave={() => setHoveredTone(null)}
                  className={cn(
                    "cursor-pointer transition-all px-2.5 py-1 text-[11px] font-medium",
                    isActive ? "bg-primary border-primary hover:bg-primary-hover shadow-md shadow-primary/20" : "bg-transparent hover:bg-primary/10"
                  )}
                >
                  {t.name}
                </Badge>
              );
            })}
          </div>

          <Input 
            value={storyTone}
            onChange={(e) => setStoryTone(e.target.value)}
            placeholder="Hoặc nhập tone tùy chỉnh..."
            className={cn(
              "w-full h-11 rounded-xl border-zinc-200 focus-visible:ring-primary shadow-inner",
              isDark ? "bg-black border-zinc-800" : "bg-zinc-50"
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

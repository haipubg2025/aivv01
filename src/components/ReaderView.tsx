import React from 'react';
import { BookOpen, List, Hash, ChevronRight, Layers, Type, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { BeautifiedContent } from './BeautifiedContent';
import { BaseOutline } from '../types';
import { stripBeautifyTags } from '../lib/contentUtils';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { VIETNAMESE_FONTS, FONT_SIZES } from '../constants/fonts';

interface ReaderViewProps {
  content: string;
  isBeautifyEnabled: boolean;
  baseOutlines: BaseOutline[];
  setBaseOutlines: React.Dispatch<React.SetStateAction<BaseOutline[]>>;
  setStoryContent: (content: string) => void;
  theme: 'light' | 'dark';
  fontFamily: string;
  setFontFamily?: (font: string) => void;
  fontSize?: number;
  setFontSize?: (size: number) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({ 
  content, 
  isBeautifyEnabled, 
  baseOutlines,
  setBaseOutlines,
  setStoryContent,
  theme,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize
}) => {
  const [isFullWidth] = React.useState(true);
  const [isTocOpen, setIsTocOpen] = React.useState(true);
  const [expandedChapterId, setExpandedChapterId] = React.useState<string | null>(null);

  // Auto-include chapters if none are included but there are chapters with content
  React.useEffect(() => {
    const anyIncluded = baseOutlines.some(bo => bo.chapters.some(c => c.isIncludedInReader));
    if (!anyIncluded) {
      const anyWithContent = baseOutlines.some(bo => bo.chapters.some(c => !!c.content || (c.versions && c.versions.length > 0)));
      if (anyWithContent) {
        setBaseOutlines(prev => prev.map(bo => ({
          ...bo,
          chapters: bo.chapters.map(c => {
            if (c.content || (c.versions && c.versions.length > 0)) {
              return { ...c, isIncludedInReader: true };
            }
            return c;
          })
        })));
      }
    }
  }, [baseOutlines, setBaseOutlines]);

  // Filter chapters that are selected for reading
  const includedChapters = React.useMemo(() => {
    return baseOutlines.flatMap(bo => 
      bo.chapters.filter(c => c.isIncludedInReader)
    );
  }, [baseOutlines]);

  const selectVersion = (chapterId: string, versionIndex: number) => {
    setBaseOutlines(prevBaseOutlines => {
      const newBaseOutlines = prevBaseOutlines.map(baseOutline => ({
        ...baseOutline,
        chapters: baseOutline.chapters.map(chapter => {
          if (chapter.id === chapterId && chapter.versions) {
            return { 
              ...chapter, 
              content: chapter.versions[versionIndex], 
              selectedVersionIndex: versionIndex 
            };
          }
          return chapter;
        })
      }));

      // Rebuild storyContent
      let fullContent = "";
      newBaseOutlines.forEach(baseOutline => {
        baseOutline.chapters.forEach(chapter => {
          if (chapter.content) {
            fullContent += (fullContent ? '\n\n' : '') + chapter.content;
          }
        });
      });
      setStoryContent(fullContent);
      
      return newBaseOutlines;
    });
  };

  const scrollToId = (id: string) => {
    // Nếu là scroll top/bottom của reader area
    if (id === 'reader-scroll-top' || id === 'reader-scroll-bottom') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const cleanContent = React.useMemo(() => stripBeautifyTags(content), [content]);

  if (!content && includedChapters.length === 0) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center h-full space-y-4",
        theme === 'dark' ? "text-zinc-500" : "text-zinc-400"
      )}>
        <BookOpen size={48} className="opacity-20" />
        <p className="text-lg font-medium">Chưa có nội dung để đọc.</p>
        <p className="text-sm italic">Hãy chọn chương trong "Dàn ý cơ sở" để đưa vào tập truyện!</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "h-full flex flex-col overflow-hidden",
      theme === 'dark' ? "bg-black" : "bg-zinc-50"
    )}>
      {/* Reader Header/Controls */}
      <div className={cn(
        "p-2 border-b sticky top-0 z-20 backdrop-blur-md",
        theme === 'dark' ? "border-zinc-800 bg-black/80" : "border-zinc-200 bg-white/80"
      )}>
        <div className="flex items-center justify-between gap-4 h-12 px-4">
          {/* Left: TOC Toggle & Title */}
          <div className="flex items-center gap-2">
            <Button
              variant={isTocOpen ? "rgb" : "outline"}
              size="sm"
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="h-9 gap-2 font-bold px-3 transition-all"
            >
              <List size={18} />
              <span className="hidden sm:inline">Mục Lục</span>
            </Button>
            
            <div className={cn("h-6 w-px mx-2 hidden md:block", theme === 'dark' ? "bg-zinc-800" : "bg-zinc-200")} />
          </div>

          {/* Right: Layout Controls & Font Config on Mobile */}
          <div className="flex items-center justify-end gap-1 sm:gap-2">
            {/* Font Config Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-9 gap-1 sm:gap-2 px-2 sm:px-3 font-bold border-zinc-200 dark:border-zinc-800 hover:border-primary transition-all">
                  <Type size={14} className="text-primary" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-zinc-500 hidden sm:inline">
                    {fontFamily ? fontFamily.split(',')[0].replace(/"/g, '') : "Phông chữ"} - {fontSize}px
                  </span>
                  <span className="text-[10px] text-zinc-500 sm:hidden">
                    {fontSize}px
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-6 space-y-6" align="end">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Type size={18} />
                    <h4 className="font-bold text-sm uppercase tracking-wider">Cấu hình hiển thị</h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Kiểu chữ</label>
                      <select 
                        value={fontFamily}
                        onChange={(e) => setFontFamily?.(e.target.value)}
                        className={cn(
                          "w-full p-2.5 rounded-xl border text-sm font-bold outline-none focus:border-primary/50 transition-all",
                          theme === 'dark' ? "bg-black border-zinc-800 text-zinc-100" : "bg-white border-zinc-200 text-zinc-900"
                        )}
                      >
                        {VIETNAMESE_FONTS.map(font => (
                          <option key={font.name} value={font.family} style={{ fontFamily: font.family }}>{font.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Kích thước</label>
                      <div className="flex flex-wrap gap-2">
                        {FONT_SIZES.filter(s => s >= 12 && s <= 32).map(size => (
                          <button
                            key={size}
                            onClick={() => setFontSize?.(size)}
                            className={cn(
                              "w-10 h-10 flex items-center justify-center rounded-lg text-xs font-bold transition-all border",
                              fontSize === size 
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                                : (theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700" : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:border-zinc-300")
                            )}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Table of Contents Sidebar */}
        {isTocOpen && (
          <aside className={cn(
            "fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col sm:relative sm:inset-auto sm:z-0 sm:w-96 border-r animate-in slide-in-from-left duration-300",
            theme === 'dark' ? "border-zinc-800 bg-zinc-950" : "border-zinc-200 bg-white"
          )}>
            <div className={cn(
              "p-4 border-b flex items-center justify-between gap-2 text-zinc-500",
              theme === 'dark' ? "border-zinc-800/50" : "border-zinc-200"
            )}>
              <div className="flex items-center gap-2">
                <Hash size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Tập truyện</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="sm:hidden h-10 w-10 text-primary hover:bg-primary/10 rounded-full" 
                onClick={() => setIsTocOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {includedChapters.map((chapter, idx) => {
                  const hasVersions = chapter.versions && chapter.versions.length > 1;
                  const hasContent = !!chapter.content || (chapter.versions && chapter.versions.length > 0);
                  const isExpanded = expandedChapterId === chapter.id;
                  const selectedVersionIndex = chapter.selectedVersionIndex ?? (chapter.versions ? chapter.versions.length - 1 : -1);

                  return (
                    <div key={chapter.id} className="space-y-1">
                      <div className="flex items-center gap-1 group">
                        <Button
                          variant="ghost"
                          onClick={() => scrollToId(`chapter-${chapter.id}`)}
                          className={cn(
                            "flex-1 justify-start text-left p-2.5 h-auto text-xs font-medium transition-all truncate flex items-center gap-2",
                            !hasContent && "opacity-60 italic",
                            theme === 'dark' 
                              ? "text-zinc-400 hover:bg-primary/10 hover:text-primary" 
                              : "text-zinc-600 hover:bg-primary/10 hover:text-primary"
                          )}
                        >
                          <span className="text-[10px] text-zinc-500 font-mono w-4 shrink-0">{(idx + 1).toString().padStart(2, '0')}</span>
                          <span className="truncate">{chapter.title}</span>
                        </Button>
                        
                        {hasVersions && (
                          <Button 
                            variant="rgb"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedChapterId(isExpanded ? null : chapter.id);
                            }}
                            className={cn(
                              "h-8 w-8 shrink-0 shadow-sm",
                              isExpanded 
                                ? "bg-primary text-white" 
                                : (theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-primary" : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-primary")
                            )}
                          >
                            <ChevronRight size={14} className={cn("transition-transform", isExpanded && "rotate-90")} />
                          </Button>
                        )}
                      </div>

                      {isExpanded && hasVersions && (
                        <div className={cn(
                          "ml-6 pl-2 border-l space-y-1 py-1 animate-in fade-in slide-in-from-top-1 duration-200",
                          theme === 'dark' ? "border-zinc-800" : "border-zinc-200"
                        )}>
                          <div className="flex items-center gap-2 px-2 py-1 text-[9px] font-bold text-zinc-600 uppercase tracking-wider">
                            <Layers size={10} /> Các phiên bản
                          </div>
                          {chapter.versions?.map((_, vIdx) => (
                            <Button
                              key={vIdx}
                              variant={selectedVersionIndex === vIdx ? "default" : "ghost"}
                              onClick={() => selectVersion(chapter.id, vIdx)}
                              className={cn(
                                "w-full justify-between h-7 px-3 text-[10px] font-bold rounded-md",
                                selectedVersionIndex !== vIdx && (theme === 'dark' ? "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700")
                              )}
                            >
                              <span>Phiên bản {vIdx + 1}</span>
                              {selectedVersionIndex === vIdx && <div className="w-1 h-1 rounded-full bg-white" />}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {includedChapters.length === 0 && (
                  <div className="p-4 text-center text-zinc-600 text-xs italic">
                    Chưa có chương nào được chọn.
                  </div>
                )}
              </div>
            </ScrollArea>
          </aside>
        )}

        {/* Reader Content */}
        <ScrollArea id="reader-content-area" className="flex-1 bg-white dark:bg-black">
          <div className="pb-24 pt-12">
            <div id="reader-scroll-top" className="h-0 w-0" />
            <div className={cn(
              "mx-auto px-6 transition-all duration-300",
              isFullWidth ? "max-w-none px-4 md:px-8" : "max-w-5xl"
            )}>
              {includedChapters.length > 0 ? (
                <div className="space-y-32">
                  {includedChapters.map((chapter) => {
                    const versions = chapter.versions || [];
                    const selectedVersionIndex = chapter.selectedVersionIndex ?? (versions.length > 0 ? versions.length - 1 : -1);
                    const contentToRead = selectedVersionIndex >= 0 ? versions[selectedVersionIndex] : chapter.content;

                    // Kiểm tra xem nội dung đã có tiêu đề (H1) chưa để tránh trùng lặp
                    const hasTitleInContent = contentToRead && /^#\s+.+/m.test(contentToRead);

                    return (
                      <div key={chapter.id} id={`chapter-${chapter.id}`} className="scroll-mt-24 last:mb-24">
                        {!hasTitleInContent && (
                          <div className="mb-12 text-center">
                            <h2 className={cn(
                              "text-2xl md:text-3xl font-black tracking-tight",
                              theme === 'dark' ? "text-zinc-100" : "text-zinc-900"
                            )}>
                              {chapter.title}
                            </h2>
                            <div className="mt-4 flex justify-center">
                              <div className="w-12 h-1 bg-primary/30 rounded-full" />
                            </div>
                          </div>
                        )}

                        <div 
                          className={cn(
                            "prose max-w-none reader-prose",
                            theme === 'dark' ? "prose-invert text-zinc-300" : "prose-zinc text-zinc-800",
                          )}
                          style={{
                            fontSize: fontSize ? `${fontSize}px` : undefined,
                            fontFamily: fontFamily || undefined,
                            lineHeight: '1.8'
                          }}
                        >
                          {!contentToRead || contentToRead.trim() === '' ? (
                            <div className="text-center py-16 italic text-zinc-500 text-sm border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-950/50">
                              Chương này chưa có nội dung.
                            </div>
                          ) : isBeautifyEnabled ? (
                            <BeautifiedContent content={contentToRead} fontSize={fontSize} fontFamily={fontFamily} />
                          ) : (
                            <ReactMarkdown 
                              remarkPlugins={[remarkGfm]}
                              components={{
                                hr: () => null
                              }}
                            >
                              {stripBeautifyTags(contentToRead)}
                            </ReactMarkdown>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div 
                  className={cn(
                    "prose max-w-none reader-prose",
                    theme === 'dark' ? "prose-invert text-zinc-300" : "prose-zinc text-zinc-800"
                  )}
                  style={{
                    fontSize: fontSize ? `${fontSize}px` : undefined,
                    fontFamily: fontFamily || undefined,
                    lineHeight: '1.8'
                  }}
                >
                  {isBeautifyEnabled ? (
                    <BeautifiedContent content={content} fontSize={fontSize} fontFamily={fontFamily} />
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        hr: () => null,
                        h1: ({node, ...props}) => (
                          <div className="py-12 text-center">
                            <h1 className={cn(
                              "text-xl md:text-2xl font-black tracking-tighter uppercase mb-0",
                              theme === 'dark' ? "text-zinc-100" : "text-zinc-900"
                            )} {...props} />
                          </div>
                        )
                      }}
                    >
                      {cleanContent}
                    </ReactMarkdown>
                  )}
                </div>
              )}
            </div>
            <div id="reader-scroll-bottom" className="h-0 w-0" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

import React from 'react';
import { FileText, ListTree, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Chapter, ActiveView, BaseOutline } from '../types';
import { BeautifiedContent } from './BeautifiedContent';
import { cn } from '@/lib/utils';
import { stripBeautifyTags } from '../lib/contentUtils';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from './ui/tooltip';

interface EditorViewProps {
  selectedChapter: Chapter | null;
  storyContent: string;
  setStoryContent: (content: string) => void;
  streamingContent?: string;
  setActiveView: (view: ActiveView) => void;
  isBeautifyEnabled: boolean;
  isLoading: boolean;
  selectChapterForWriting: (chapterTitle: string, chapterSummary: string, chapterId: string) => void;
  baseOutlines: BaseOutline[];
  setBaseOutlines: React.Dispatch<React.SetStateAction<BaseOutline[]>>;
  currentChapterId: string | null;
  applyBibleUpdates: (update: any, showModal?: boolean) => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  selectedChapter,
  storyContent,
  setStoryContent,
  streamingContent,
  setActiveView,
  isBeautifyEnabled,
  isLoading,
  selectChapterForWriting,
  baseOutlines,
  setBaseOutlines,
  currentChapterId,
  applyBibleUpdates
}) => {
  const cleanContent = React.useMemo(() => stripBeautifyTags(storyContent), [storyContent]);
  const cleanStreamingContent = React.useMemo(() => streamingContent ? stripBeautifyTags(streamingContent) : '', [streamingContent]);

  const currentChapter = currentChapterId ? (() => {
    for (const baseOutline of baseOutlines) {
      for (const chapter of baseOutline.chapters) {
        if (chapter.id === currentChapterId) return chapter;
      }
    }
    return null;
  })() : null;

  const handleVersionChange = (direction: 'prev' | 'next') => {
    if (!currentChapter || !currentChapter.versions || currentChapter.versions.length <= 1) return;
    
    const currentIndex = currentChapter.selectedVersionIndex ?? 0;
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0) newIndex = currentChapter.versions.length - 1;
    if (newIndex >= currentChapter.versions.length) newIndex = 0;
    
    const newVersion = currentChapter.versions[newIndex];
    const newBibleUpdate = currentChapter.versionBibleUpdates ? currentChapter.versionBibleUpdates[newIndex] : null;
    
    setBaseOutlines(prevBaseOutlines => {
      const newBaseOutlines = prevBaseOutlines.map(baseOutline => ({
        ...baseOutline,
        chapters: baseOutline.chapters.map(chapter => {
          if (chapter.id === currentChapterId) {
            return { ...chapter, content: newVersion, selectedVersionIndex: newIndex };
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

    // Cập nhật modal Story Bible tương ứng với phiên bản mới (ẩn modal, tự động áp dụng)
    if (newBibleUpdate) {
      applyBibleUpdates(newBibleUpdate, false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        {selectedChapter && (
          <Card className={cn(
            "mb-8 border-none shadow-sm overflow-hidden", 
            "bg-primary/5 dark:bg-primary/5 border border-primary/10 dark:border-primary/20"
          )}>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-200">{selectedChapter.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3">
                <div className="text-sm text-zinc-600 dark:text-zinc-400 bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-primary/5 italic leading-relaxed">
                  <span className="font-bold text-primary not-italic mr-2">Tóm tắt:</span>
                  {stripBeautifyTags(selectedChapter.summary)}
                </div>
                
                {selectedChapter.storyGuidingPrinciple && (
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 bg-primary/5 p-3 rounded-lg border border-primary/10 leading-relaxed">
                    <span className="font-bold text-primary mr-2 uppercase text-[10px] tracking-widest">Kim chỉ nam:</span>
                    {selectedChapter.storyGuidingPrinciple}
                  </div>
                )}

                {selectedChapter.pov && (
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 bg-amber-500/5 p-2 px-3 rounded-lg border border-amber-500/10 inline-flex items-center gap-2 self-start">
                    <span className="font-bold text-amber-600 dark:text-amber-400 uppercase text-[10px] tracking-widest">Góc nhìn (POV):</span>
                    <span className="font-medium">{selectedChapter.pov}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-primary/10">
                <div className="flex flex-wrap items-center gap-2">
                  {currentChapter && (
                    <>
                      <div className="text-xs text-zinc-600 dark:text-zinc-500 flex items-center gap-2 mr-2">
                        <Sparkles size={12} className="text-primary" />
                        Đang viết: <span className="text-primary font-bold">{currentChapter.title}</span>
                      </div>
                      
                      {currentChapter.wordCount !== undefined && (
                        <Badge variant="secondary" className="text-[10px] h-5">
                          {currentChapter.wordCount} chữ
                        </Badge>
                      )}

                      {currentChapter.score !== undefined && (
                        <Badge 
                          variant={currentChapter.score >= 8 ? "default" : currentChapter.score >= 5 ? "secondary" : "destructive"}
                          className={cn(
                            "text-[10px] h-5",
                            currentChapter.score >= 8 && "bg-emerald-500 hover:bg-emerald-600",
                            currentChapter.score >= 5 && currentChapter.score < 8 && "bg-amber-500 hover:bg-amber-600 text-white"
                          )}
                        >
                          Điểm: {currentChapter.score}/10
                        </Badge>
                      )}
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {currentChapter && currentChapter.versions && currentChapter.versions.length > 0 && (
                    <div className="flex items-center gap-1 bg-white dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleVersionChange('prev')}
                          >
                            <ChevronLeft size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Phiên bản trước</TooltipContent>
                      </Tooltip>
                      
                      <div className="px-2 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Bản {(currentChapter.selectedVersionIndex ?? 0) + 1} / {currentChapter.versions.length}
                      </div>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleVersionChange('next')}
                          >
                            <ChevronRight size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Phiên bản sau</TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {storyContent || streamingContent ? (
          <div className="max-w-none">
            {isBeautifyEnabled ? (
              <>
                <BeautifiedContent content={storyContent} />
                {streamingContent && <BeautifiedContent content={streamingContent} />}
              </>
            ) : (
              <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg relative">
                {storyContent && (
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => (
                        <div className="py-12 text-center">
                          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter uppercase mb-0" {...props} />
                        </div>
                      ),
                      hr: () => null
                    }}
                  >
                    {cleanContent}
                  </ReactMarkdown>
                )}
                {streamingContent && (
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => (
                        <div className="py-12 text-center">
                          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter uppercase mb-0" {...props} />
                        </div>
                      ),
                      hr: () => null
                    }}
                  >
                    {cleanStreamingContent}
                  </ReactMarkdown>
                )}
                {isLoading && (
                  <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse align-middle" />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-30">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-8 rounded-full mb-6">
              <FileText size={64} className="text-zinc-400 dark:text-zinc-600" />
            </div>
            <h2 className="text-xl font-bold mb-3 tracking-tight text-zinc-900 dark:text-zinc-100">Khởi đầu kiệt tác</h2>
            <p className="max-w-md text-base mb-6 text-zinc-600 dark:text-zinc-400">Hãy hoàn thành các bước chuẩn bị ở sidebar trái để AI hiểu rõ câu chuyện của bạn.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setActiveView('world')}
                className="px-6 py-2 bg-primary text-white hover:bg-primary-hover rounded-full text-xs font-bold transition-all shadow-lg shadow-primary/20"
              >
                Bắt đầu bước 1 →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor Sidebar for Roadmap */}
      {selectedChapter && (
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <Card className="sticky top-24 border-none shadow-sm dark:shadow-none bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <ListTree size={14} className="text-primary" /> Lộ trình chương
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="px-4 pb-6 space-y-0 relative">
                <div className="absolute left-[29px] top-6 bottom-6 w-px bg-zinc-200 dark:bg-zinc-800" />
                {(() => {
                  const currentBaseOutline = baseOutlines.find(bo => bo.chapters.some(c => c.id === selectedChapter.id));
                  if (!currentBaseOutline) return null;
                  return currentBaseOutline.chapters.map((chapter, idx) => (
                    <div 
                      key={chapter.id} 
                      className="relative pl-10 pb-6 last:pb-0 group cursor-pointer"
                      onClick={() => selectChapterForWriting(chapter.title, chapter.summary, chapter.id)}
                    >
                      <div className={cn(
                        "absolute left-0 top-1 w-6 h-6 rounded-full border transition-all flex items-center justify-center z-10",
                        chapter.id === currentChapterId 
                          ? "bg-primary border-primary text-white" 
                          : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 group-hover:border-primary text-zinc-400"
                      )}>
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      </div>
                      <div className={cn(
                        "text-xs font-bold mb-1 transition-colors leading-tight",
                        chapter.id === currentChapterId ? "text-primary" : "text-zinc-700 dark:text-zinc-300 group-hover:text-primary"
                      )}>{chapter.title}</div>
                      <div className="text-[10px] text-zinc-500 leading-relaxed italic line-clamp-2">{stripBeautifyTags(chapter.summary)}</div>
                    </div>
                  ));
                })()}
              </div>
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  <Sparkles size={10} className="inline mr-1 text-primary" />
                  Gợi ý: Hãy yêu cầu AI viết dựa trên từng Chương ở trên để câu chuyện sâu sắc hơn.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      )}
    </div>
  );
};

import React from 'react';
import { MessageSquareQuote, ChevronRight, BookOpen, FileText } from 'lucide-react';
import { BaseOutline } from '../types';
import { cn } from '../lib/utils';
import { stripBeautifyTags } from '../lib/contentUtils';

interface SummariesViewProps {
  baseOutlines: BaseOutline[];
  theme: 'light' | 'dark';
}

export const SummariesView: React.FC<SummariesViewProps> = ({
  baseOutlines,
  theme
}) => {
  const [expandedBaseOutlines, setExpandedBaseOutlines] = React.useState<string[]>([]);
  const [expandedChapters, setExpandedChapters] = React.useState<string[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<{
    type: 'baseOutline' | 'chapter';
    title: string;
    summary: string;
    id: string;
  } | null>(null);

  const toggleBaseOutline = (id: string, title: string, summary: string) => {
    setExpandedBaseOutlines(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    setSelectedItem({ type: 'baseOutline', title, summary, id });
  };

  const toggleChapter = (id: string, title: string, summary: string) => {
    setExpandedChapters(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    setSelectedItem({ type: 'chapter', title, summary, id });
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className={cn(
        "space-y-4 border-b pb-4",
        theme === 'dark' ? "border-zinc-800" : "border-zinc-200"
      )}>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Cột 1: Mục lục */}
        <div className={cn(
          "space-y-4 overflow-y-auto pr-2 custom-scrollbar border-r",
          theme === 'dark' ? "border-zinc-800/50" : "border-zinc-200"
        )}>
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <BookOpen size={14} /> Cấu trúc truyện
          </h3>
          
          {baseOutlines.length === 0 && (
            <div className={cn(
              "p-8 rounded-2xl border border-dashed text-center",
              theme === 'dark' ? "border-zinc-800" : "border-zinc-300"
            )}>
              <p className="text-zinc-500 italic">Chưa có dàn ý. Hãy tạo bối cảnh trước.</p>
            </div>
          )}
          
          {baseOutlines.map((baseOutline) => (
            <div key={baseOutline.id} className="space-y-2">
              <button 
                onClick={() => toggleBaseOutline(baseOutline.id, baseOutline.title, baseOutline.summary)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left border",
                  selectedItem?.id === baseOutline.id 
                    ? "bg-primary/10 border-primary/50" 
                    : theme === 'dark' ? "bg-black border-zinc-800 hover:border-zinc-700" : "bg-ivory-dark border-zinc-200 hover:border-zinc-300"
                )}
              >
                <ChevronRight size={18} className={cn("text-primary transition-transform", expandedBaseOutlines.includes(baseOutline.id) && "rotate-90")} />
                <div className="flex-1">
                  <h4 className={cn("font-bold", selectedItem?.id === baseOutline.id ? "text-primary" : theme === 'dark' ? "text-zinc-300" : "text-zinc-800")}>{baseOutline.title}</h4>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Dàn ý cơ sở</p>
                </div>
              </button>

              {expandedBaseOutlines.includes(baseOutline.id) && (
                <div className={cn(
                  "ml-6 space-y-2 border-l pl-4",
                  theme === 'dark' ? "border-zinc-800" : "border-zinc-200"
                )}>
                  {baseOutline.chapters.map((chapter) => (
                    <div key={chapter.id} className="space-y-2">
                      <button 
                        onClick={() => toggleChapter(chapter.id, chapter.title, chapter.summary)}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left border",
                          selectedItem?.id === chapter.id
                            ? "bg-primary/5 border-primary/30"
                            : theme === 'dark' ? "bg-black border-zinc-800/50 hover:border-zinc-700" : "bg-ivory-dark border-zinc-200 hover:border-zinc-300"
                        )}
                      >
                        <ChevronRight size={16} className={cn("text-zinc-500 transition-transform", expandedChapters.includes(chapter.id) && "rotate-90")} />
                        <div className="flex-1">
                          <h5 className={cn("text-sm font-bold", selectedItem?.id === chapter.id ? "text-primary/80" : theme === 'dark' ? "text-zinc-400" : "text-zinc-700")}>{chapter.title}</h5>
                        </div>
                      </button>

                      {/* Removed parts mapping */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cột 2: Nội dung tóm tắt */}
        <div className={cn(
          "rounded-2xl border p-6 overflow-y-auto custom-scrollbar",
          theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
        )}>
          {selectedItem ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                    {selectedItem.type === 'baseOutline' ? 'Dàn ý cơ sở' : 'Tóm tắt Chương'}
                  </span>
                </div>
                <h3 className={cn("text-lg font-bold", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>{selectedItem.title}</h3>
              </div>
              
              <div className={cn(
                "p-5 rounded-xl border relative group",
                theme === 'dark' ? "bg-black border-zinc-800/50" : "bg-ivory border-zinc-200"
              )}>
                <div className="absolute -left-1 top-4 bottom-4 w-0.5 bg-primary/30 rounded-full" />
                <p className={cn(
                  "leading-relaxed whitespace-pre-wrap text-sm",
                  theme === 'dark' ? "text-zinc-400" : "text-zinc-700"
                )}>
                  {stripBeautifyTags(selectedItem.summary) || "Chưa có nội dung tóm tắt cho mục này."}
                </p>
              </div>

              <div className={cn(
                "pt-6 border-t",
                theme === 'dark' ? "border-zinc-800/50" : "border-zinc-200"
              )}>
                <div className="flex items-center gap-2 text-zinc-500 text-xs italic">
                  <MessageSquareQuote size={14} />
                  <span>Dữ liệu này được sử dụng làm ngữ cảnh cho AI khi viết các phần liên quan.</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center",
                theme === 'dark' ? "bg-zinc-800/50" : "bg-zinc-200"
              )}>
                <FileText size={32} className="text-zinc-600" />
              </div>
              <div className="space-y-1">
                <p className="text-zinc-400 font-medium">Chọn một mục ở cột bên trái</p>
                <p className="text-zinc-500 text-xs">Để xem nội dung tóm tắt chi tiết</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

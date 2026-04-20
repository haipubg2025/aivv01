import React from 'react';
import { FileText, Trash2, Upload, Clock, BookOpen, Download } from 'lucide-react';
import { StoryFile } from '../types';
import { cn } from '../lib/utils';

interface FilesViewProps {
  savedStories: StoryFile[];
  loadStoryFromFile: (file: StoryFile) => void;
  deleteStoryFile: (id: string) => void;
  importStoryFromJson: (json: any) => boolean;
  addNotification: (message: string, type?: any) => void;
  theme: 'light' | 'dark';
}

export const FilesView: React.FC<FilesViewProps> = ({ 
  savedStories, 
  loadStoryFromFile, 
  deleteStoryFile,
  importStoryFromJson,
  addNotification,
  theme
}) => {
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        const success = importStoryFromJson(json);
        if (success) {
          addNotification("Tải truyện lên thành công!", "success");
        } else {
          addNotification("Lỗi: Định dạng tệp không hợp lệ.", "error");
        }
      } catch (err) {
        addNotification("Lỗi: Không thể đọc tệp JSON.", "error");
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = (story: StoryFile) => {
    const blob = new Blob([JSON.stringify(story, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safeTitle = (story.title || 'truyen-khong-ten')
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    a.download = `${safeTitle}-${new Date(story.timestamp).toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredStories = savedStories.filter(story => 
    (story.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    (story.concept || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={cn(
      "h-full flex flex-col p-6 space-y-8 max-w-6xl mx-auto",
      isDark ? "text-zinc-100" : "text-zinc-900"
    )}>
      <div className={cn(
        "space-y-6 border-b pb-6",
        isDark ? "border-zinc-800" : "border-zinc-200"
      )}>
        <div className="flex flex-wrap items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".json" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95 text-sm btn-rgb"
          >
            <Upload size={20} />
            TẢI TRUYỆN TỪ MÁY (.JSON)
          </button>
        </div>
      </div>

      <div className={cn(
        "flex items-center gap-4 p-2 rounded-2xl border btn-rgb",
        isDark ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
      )}>
        <div className="flex-1 px-4">
          <input 
            type="text" 
            placeholder="Tìm kiếm truyện..."
            className="w-full bg-transparent outline-none text-sm py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={cn(
          "flex items-center gap-2 px-4 border-l",
          isDark ? "border-zinc-800" : "border-zinc-200"
        )}>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            {filteredStories.length} TỆP
          </span>
        </div>
      </div>

      {filteredStories.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 space-y-4 py-20">
          <FileText size={64} className="opacity-10" />
          <p className="text-lg font-medium">Chưa có tệp lưu nào.</p>
          <p className="text-sm italic">Hãy bắt đầu viết và lưu lại tác phẩm đầu tiên của bạn!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map(story => (
            <div 
              key={story.id}
              className={cn(
                "group relative border rounded-3xl p-6 transition-all hover:shadow-xl hover:shadow-primary/5",
                isDark 
                  ? "bg-black border-zinc-800 hover:border-primary/50" 
                  : "bg-ivory-dark border-zinc-200 hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "p-2 rounded-xl border transition-colors relative",
                  isDark 
                    ? "bg-zinc-900 border-zinc-800 group-hover:bg-primary/20 group-hover:border-primary/20" 
                    : "bg-ivory border-zinc-200 group-hover:bg-primary/20 group-hover:border-primary/20"
                )}>
                  <FileText size={20} className={cn(
                    "transition-colors",
                    isDark ? "text-zinc-500 group-hover:text-primary" : "text-zinc-400 group-hover:text-primary"
                  )} />
                  {story.isAutoSave && (
                    <span className="absolute -top-2 -right-2 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-white shadow-sm ring-1 ring-white dark:ring-zinc-900 uppercase">
                      Auto
                    </span>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleDownload(story)}
                    className="p-2 hover:bg-indigo-600/20 hover:text-indigo-400 rounded-xl transition-colors text-zinc-500"
                    title="Tải về máy"
                  >
                    <Download size={16} />
                  </button>
                  <button 
                    onClick={() => deleteStoryFile(story.id)}
                    className="p-2 hover:bg-rose-600/20 hover:text-rose-500 rounded-xl transition-colors text-zinc-500"
                    title="Xóa tệp"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                {story.title}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Clock size={14} />
                  <span>{formatDate(story.timestamp)}</span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-3 italic leading-relaxed">
                  {story.concept || "Không có tóm tắt."}
                </p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => loadStoryFromFile(story)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all btn-rgb"
                >
                  <Upload size={14} />
                  TẢI LÊN
                </button>
                <button 
                  onClick={() => {
                    loadStoryFromFile(story);
                    // We need a way to switch view, but this component doesn't have setActiveView
                    // Maybe the parent should handle this or we pass it as a prop
                  }}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all border border-zinc-700"
                  title="Đọc truyện"
                >
                  <BookOpen size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

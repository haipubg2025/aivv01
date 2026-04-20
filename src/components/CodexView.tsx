import React from 'react';
import { Trash2, Search, Plus, X } from 'lucide-react';
import { CodexEntry } from '../types';
import { cn } from '../lib/utils';
import { AutoResizeTextarea } from './ui/AutoResizeTextarea';

interface CodexViewProps {
  codex: CodexEntry[];
  addCodexEntry: (entry: CodexEntry) => void;
  updateCodexEntry: (id: string, field: keyof CodexEntry, value: string) => void;
  removeCodexEntry: (id: string) => void;
  updateCodexMetadata: (id: string, metadata: { key: string; value: string }[]) => void;
  theme: 'light' | 'dark';
}

const DEFAULT_CATEGORIES = [
  "Địa lý & Vùng lãnh thổ", 
  "Tổ chức & Thế lực", 
  "Hệ thống Sức mạnh & Cảnh giới", 
  "Vật phẩm & Trang bị Huyền thoại", 
  "Lịch sử & Thần thoại", 
  "Khái niệm Đặc thù", 
  "Khác"
];

export const CodexView: React.FC<CodexViewProps> = ({
  codex,
  addCodexEntry,
  updateCodexEntry,
  removeCodexEntry,
  updateCodexMetadata,
  theme
}) => {
  const categories = React.useMemo(() => {
    const codexArray = Array.isArray(codex) ? codex : [];
    const existingCats = codexArray.map(e => e.category).filter(Boolean);
    return Array.from(new Set([...DEFAULT_CATEGORIES, ...existingCats]));
  }, [codex]);

  const [activeCategory, setActiveCategory] = React.useState(categories[0]);

  // Ensure activeCategory is valid if categories change
  React.useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const codexArray = Array.isArray(codex) ? codex : [];
  const filteredEntries = codexArray.filter(e => 
    e.category === activeCategory && 
    ((e.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) || 
     (e.content || '').toLowerCase().includes((searchTerm || '').toLowerCase()))
  );

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className={cn(
          "flex items-center gap-2 p-1 rounded-xl border overflow-x-auto custom-scrollbar",
          theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
        )}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap py-2 px-4 rounded-lg text-sm font-bold transition-all",
                activeCategory === cat 
                  ? "bg-primary text-white" 
                  : theme === 'dark' ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-500 hover:text-zinc-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text"
              placeholder={`Tìm kiếm trong ${activeCategory}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:border-primary transition-all text-sm h-12",
                theme === 'dark' ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory-dark border-zinc-200 text-zinc-900"
              )}
            />
          </div>
          <button 
            onClick={() => {
              const newEntry: CodexEntry = {
                id: Date.now().toString(),
                category: activeCategory,
                title: 'Mục mới',
                content: '',
                metadata: []
              };
              addCodexEntry(newEntry);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all h-12 shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">THÊM MỤC MỚI</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 gap-4">
          {filteredEntries.length === 0 ? (
            <div className="py-20 text-center text-zinc-600 italic">
              Chưa có thông tin nào trong mục này.
            </div>
          ) : (
            filteredEntries.map(entry => (
              <div key={entry.id} className={cn(
                "border rounded-2xl p-4 space-y-3",
                theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
              )}>
                <div className="flex items-center justify-between">
                  <AutoResizeTextarea 
                    value={entry.title}
                    onChange={(e) => updateCodexEntry(entry.id, 'title', e.target.value)}
                    className={cn(
                      "bg-transparent border-none outline-none font-bold w-full",
                      "text-primary resize-none overflow-hidden"
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => removeCodexEntry(entry.id)}
                      className="p-2 hover:bg-rose-600/20 hover:text-rose-500 rounded-lg transition-colors text-zinc-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <AutoResizeTextarea 
                  value={entry.content}
                  onChange={(e) => updateCodexEntry(entry.id, 'content', e.target.value)}
                  placeholder="Nhập nội dung chi tiết..."
                  className={cn(
                    "w-full border rounded-xl p-3 text-sm outline-none focus:border-primary/30 resize-none",
                    theme === 'dark' ? "bg-black border-zinc-800 text-zinc-300" : "bg-ivory border-zinc-200 text-zinc-800"
                  )}
                />

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Dữ liệu bổ sung</h4>
                    <button 
                      onClick={() => {
                        const currentMetadata = entry.metadata || [];
                        updateCodexMetadata(entry.id, [...currentMetadata, { key: '', value: '' }]);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                    >
                      <Plus size={10} />
                      THÊM TRƯỜNG DỮ LIỆU
                    </button>
                  </div>
                  
                  {entry.metadata && entry.metadata.length > 0 && (
                    <div className="grid grid-cols-1 gap-2">
                      {entry.metadata.map((meta, idx) => (
                        <div key={idx} className="flex gap-2 items-start group">
                          <input 
                            type="text"
                            placeholder="Tiêu đề (VD: Chủ nhân, Xuất xứ...)"
                            value={meta.key}
                            onChange={(e) => {
                              const newMetadata = [...entry.metadata!];
                              newMetadata[idx].key = e.target.value;
                              updateCodexMetadata(entry.id, newMetadata);
                            }}
                            className={cn(
                              "w-1/3 p-2 rounded-lg border text-xs font-bold outline-none focus:border-primary transition-all",
                              theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-primary" : "bg-zinc-50 border-zinc-200 text-primary"
                            )}
                          />
                          <AutoResizeTextarea 
                            placeholder="Giá trị..."
                            value={meta.value}
                            onChange={(e) => {
                              const newMetadata = [...entry.metadata!];
                              newMetadata[idx].value = e.target.value;
                              updateCodexMetadata(entry.id, newMetadata);
                            }}
                            className={cn(
                              "flex-1 p-2 rounded-lg border text-xs outline-none focus:border-primary transition-all min-h-[34px]",
                              theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-zinc-50 border-zinc-200 text-zinc-800"
                            )}
                            minRows={1}
                          />
                          <button 
                            onClick={() => {
                              const newMetadata = entry.metadata!.filter((_, i) => i !== idx);
                              updateCodexMetadata(entry.id, newMetadata);
                            }}
                            className="p-2 opacity-0 group-hover:opacity-100 hover:bg-rose-600/20 hover:text-rose-500 rounded-lg transition-all text-zinc-600 self-start"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import { motion, AnimatePresence } from 'motion/react';
import { X, UserPlus, BookPlus, CalendarPlus, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';
import { StoryBibleUpdate } from '../types';
import { cn } from '../lib/utils';

interface BibleUpdateModalProps {
  update: StoryBibleUpdate | null;
  onClose: () => void;
  theme: 'light' | 'dark';
  versions?: (StoryBibleUpdate | null)[];
  currentVersionIndex?: number;
  onVersionChange?: (index: number) => void;
}

export function BibleUpdateModal({ 
  update, 
  onClose, 
  theme,
  versions = [],
  currentVersionIndex = 0,
  onVersionChange
}: BibleUpdateModalProps) {
  if (!update) return null;

  const hasChanges = 
    update.newCharacters.length > 0 || 
    update.characterUpdates.length > 0 ||
    update.newCodexEntries.length > 0 ||
    update.codexUpdates.length > 0 ||
    update.newTimelineEvents.length > 0 ||
    update.timelineUpdates.length > 0 ||
    update.worldUpdates !== null;

  const isDark = theme === 'dark';
  const hasMultipleVersions = versions.length > 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-[0.5vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={cn(
            "relative w-full h-full md:w-[99vw] md:max-w-none md:h-[99vh] md:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:border",
            isDark ? "bg-zinc-950 md:border-zinc-800 text-zinc-200" : "bg-ivory md:border-zinc-200 text-zinc-800"
          )}
        >
          {/* Header */}
          <div className={cn(
            "flex items-center justify-between p-4 md:p-6 border-b shrink-0",
            isDark ? "border-zinc-800 bg-zinc-900/50" : "border-zinc-200 bg-ivory-dark/50"
          )}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-bold">AI vừa cập nhật Story Bible</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className={cn(
                "p-2 rounded-full transition-colors",
                isDark ? "hover:bg-zinc-800" : "hover:bg-zinc-200"
              )}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Version Switcher (Swipe UI) */}
          {hasMultipleVersions && onVersionChange && (
            <div className={cn(
              "flex items-center justify-between px-6 py-3 border-b shrink-0",
              isDark ? "bg-zinc-900/30 border-zinc-800" : "bg-zinc-100/50 border-zinc-200"
            )}>
              <div className="text-sm font-medium opacity-70">Phiên bản cập nhật:</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onVersionChange(Math.max(0, currentVersionIndex - 1))}
                  disabled={currentVersionIndex === 0}
                  className="p-1 rounded hover:bg-black/10 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1.5">
                  {versions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => onVersionChange(idx)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all",
                        currentVersionIndex === idx 
                          ? "bg-primary w-6" 
                          : isDark ? "bg-zinc-700" : "bg-zinc-300"
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={() => onVersionChange(Math.min(versions.length - 1, currentVersionIndex + 1))}
                  disabled={currentVersionIndex === versions.length - 1}
                  className="p-1 rounded hover:bg-black/10 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="text-xs font-mono opacity-50">
                VERSION {currentVersionIndex + 1} / {versions.length}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar space-y-10">
            {!hasChanges ? (
              <div className="flex flex-col items-center justify-center h-full opacity-40 text-center py-20">
                <BookPlus className="w-16 h-16 mb-4" />
                <p className="text-lg">Phiên bản này không có cập nhật Story Bible nào mới.</p>
              </div>
            ) : (
              <>
                {/* World Updates */}
                {update.worldUpdates && (
                  <section>
                    <div className="flex items-center gap-2 mb-3 text-indigo-500 font-semibold">
                      <BookPlus className="w-4 h-4" />
                      <h3>Cập nhật Bối cảnh Thế giới</h3>
                    </div>
                    <div className={cn(
                      "p-4 rounded-lg border space-y-4",
                      isDark ? "bg-zinc-900 border-zinc-800" : "bg-ivory-dark border-zinc-200"
                    )}>
                      {update.worldUpdates.reason && (
                        <div className="text-xs italic opacity-60 mb-2">Lý do: {update.worldUpdates.reason}</div>
                      )}
                      <div className="space-y-3">
                        {Object.entries(update.worldUpdates.after).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">
                              {key === 'worldGeography' ? 'Địa lý & Vùng lãnh thổ' : 
                               key === 'worldFactions' ? 'Các quốc gia & Thế lực' :
                               key === 'worldRelationships' ? 'Mối quan hệ thế lực' :
                               key === 'worldUniqueElements' ? 'Yếu tố độc đáo' : key}
                            </span>
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1">
                              <div className="flex-1 p-2 rounded bg-zinc-500/5 border border-zinc-500/10 text-xs opacity-50 italic whitespace-pre-wrap">
                                {String(update.worldUpdates?.before[key as keyof typeof update.worldUpdates.before] || 'Trống')}
                              </div>
                              <ChevronRight className="w-4 h-4 mx-auto md:rotate-0 rotate-90 opacity-30 shrink-0" />
                              <div className="flex-1 p-2 rounded bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium whitespace-pre-wrap">
                                {String(value)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* New Characters */}
                {update.newCharacters.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-3 text-emerald-500 font-semibold">
                      <UserPlus className="w-4 h-4" />
                      <h3>Nhân vật mới ({update.newCharacters.length})</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {update.newCharacters.map((c, i) => (
                        <div key={i} className={cn(
                          "p-3 rounded-lg border",
                          isDark ? "bg-zinc-900 border-zinc-800" : "bg-ivory-dark border-zinc-200"
                        )}>
                          <div className="font-bold text-primary">{c.name}</div>
                          <div className="text-[10px] opacity-70 mb-1 uppercase tracking-wider">{c.role} • {c.gender} • {c.age}</div>
                          <div className="text-sm line-clamp-2 italic opacity-80">"{c.description}"</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Character Updates */}
                {update.characterUpdates.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-3 text-amber-500 font-semibold">
                      <RefreshCw className="w-4 h-4" />
                      <h3>Tiến triển nhân vật ({update.characterUpdates.length})</h3>
                    </div>
                    <div className="space-y-4">
                      {update.characterUpdates.map((u, i) => (
                        <div key={i} className={cn(
                          "p-4 rounded-lg border",
                          isDark ? "bg-zinc-900 border-zinc-800" : "bg-ivory-dark border-zinc-200"
                        )}>
                          <div className="font-bold mb-3 text-primary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {u.name}
                          </div>
                          <div className="space-y-3">
                            {Object.entries(u.after).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">{key}</span>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1">
                                  <div className="flex-1 p-2 rounded bg-red-500/5 border border-red-500/10 text-xs opacity-50 italic">
                                    {String(u.before[key as keyof typeof u.before] || 'Trống')}
                                  </div>
                                  <ChevronRight className="w-4 h-4 mx-auto md:rotate-0 rotate-90 opacity-30 shrink-0" />
                                  <div className="flex-1 p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium">
                                    {String(value)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* New Codex */}
                {update.newCodexEntries.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-3 text-blue-500 font-semibold">
                      <BookPlus className="w-4 h-4" />
                      <h3>Mục từ Codex mới ({update.newCodexEntries.length})</h3>
                    </div>
                    <div className="grid gap-2">
                      {update.newCodexEntries.map((e, i) => (
                        <div key={i} className={cn(
                          "p-3 rounded-lg border",
                          isDark ? "bg-zinc-900 border-zinc-800" : "bg-ivory-dark border-zinc-200"
                        )}>
                          <div className="font-bold flex items-center justify-between">
                            {e.title} 
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 uppercase font-bold">
                              {e.category}
                            </span>
                          </div>
                          <div className="text-sm opacity-80 mt-1 leading-relaxed">{e.content}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Codex Updates */}
                {update.codexUpdates.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-3 text-amber-500 font-semibold">
                      <RefreshCw className="w-4 h-4" />
                      <h3>Cập nhật Codex ({update.codexUpdates.length})</h3>
                    </div>
                    <div className="space-y-3">
                      {update.codexUpdates.map((u, i) => (
                        <div key={i} className={cn(
                          "p-3 rounded-lg border",
                          isDark ? "bg-zinc-900 border-zinc-800" : "bg-ivory-dark border-zinc-200"
                        )}>
                          <div className="font-bold mb-2">{u.title}</div>
                          <div className="flex flex-col md:flex-row md:items-center gap-2 text-xs">
                            <div className="flex-1 p-2 rounded bg-zinc-500/5 border border-zinc-500/10 opacity-50 italic">{u.before}</div>
                            <ChevronRight className="w-4 h-4 mx-auto md:rotate-0 rotate-90 opacity-30" />
                            <div className="flex-1 p-2 rounded bg-primary/10 border border-primary/20 font-medium">{u.after}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* New Timeline */}
                {update.newTimelineEvents.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 mb-3 text-purple-500 font-semibold">
                      <CalendarPlus className="w-4 h-4" />
                      <h3>Sự kiện Timeline mới ({update.newTimelineEvents.length})</h3>
                    </div>
                    <div className="space-y-2">
                      {update.newTimelineEvents.map((e, i) => (
                        <div key={i} className={cn(
                          "p-3 rounded-lg border",
                          isDark ? "bg-zinc-900 border-zinc-800" : "bg-ivory-dark border-zinc-200"
                        )}>
                          <div className="font-bold text-purple-500">Năm {e.year}{e.isBC ? ' TCN' : ''}: {e.title}</div>
                          <div className="text-sm opacity-80 mt-1 leading-relaxed">{e.description}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

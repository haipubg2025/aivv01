import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { TimelineEvent } from '../types';
import { AutoResizeTextarea } from './ui/AutoResizeTextarea';
import { cn } from '../lib/utils';

interface TimelineViewProps {
  timeline: TimelineEvent[];
  addTimelineEvent: (event: TimelineEvent) => void;
  updateTimelineEvent: (id: string, field: keyof TimelineEvent, value: any) => void;
  removeTimelineEvent: (id: string) => void;
  theme: 'light' | 'dark';
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  timeline,
  addTimelineEvent,
  updateTimelineEvent,
  removeTimelineEvent,
  theme
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleAddEvent = () => {
    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      year: 2026,
      month: 4,
      day: 6,
      hour: 12,
      minute: 0,
      second: 0,
      title: 'Sự kiện mới',
      description: '',
      isBC: false
    };
    addTimelineEvent(newEvent);
  };

  const sortedTimeline = [...(Array.isArray(timeline) ? timeline : [])].sort((a, b) => {
    const yearA = a.isBC ? -a.year : a.year;
    const yearB = b.isBC ? -b.year : b.year;
    
    if (yearA !== yearB) return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
    if (a.month !== b.month) return sortOrder === 'asc' ? a.month - b.month : b.month - a.month;
    if (a.day !== b.day) return sortOrder === 'asc' ? a.day - b.day : b.day - a.day;
    if (a.hour !== b.hour) return sortOrder === 'asc' ? a.hour - b.hour : b.hour - a.hour;
    if (a.minute !== b.minute) return sortOrder === 'asc' ? a.minute - b.minute : b.minute - a.minute;
    return sortOrder === 'asc' ? a.second - b.second : b.second - a.second;
  });

  const filteredTimeline = sortedTimeline.filter(event => 
    (event.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
    (event.description || '').toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className={cn(
        "space-y-4 border-b pb-4",
        theme === 'dark' ? "border-zinc-800" : "border-zinc-200"
      )}>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleAddEvent}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl transition-all font-bold text-xs shadow-lg shadow-primary/20"
          >
            <Plus size={20} /> Thêm sự kiện
          </button>
          <div className="flex-1 min-w-[240px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                type="text"
                placeholder="Tìm kiếm sự kiện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-primary transition-all w-full",
                  theme === 'dark' ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory-dark border-zinc-200 text-zinc-900"
                )}
              />
            </div>
          </div>
          <button 
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className={cn(
              "p-2.5 border rounded-xl transition-all text-zinc-400",
              theme === 'dark' ? "bg-zinc-950 border-zinc-800 hover:bg-zinc-900" : "bg-ivory-dark border-zinc-200 hover:bg-ivory"
            )}
            title={sortOrder === 'asc' ? 'Sắp xếp cũ nhất trước' : 'Sắp xếp mới nhất trước'}
          >
            {sortOrder === 'asc' ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredTimeline.length === 0 ? (
          <div className={cn(
            "text-center py-20 rounded-2xl border border-dashed",
            theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-300"
          )}>
            <Calendar size={48} className="mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-500">Chưa có sự kiện nào trong dòng thời gian.</p>
            <button 
              onClick={handleAddEvent}
              className="mt-4 text-primary hover:text-primary-hover font-medium"
            >
              Thêm sự kiện đầu tiên ngay
            </button>
          </div>
        ) : (
          filteredTimeline.map((event) => (
            <div key={event.id} className={cn(
              "border rounded-2xl p-5 transition-all group",
              theme === 'dark' ? "bg-black border-zinc-800 hover:border-zinc-700" : "bg-ivory-dark border-zinc-200 hover:border-zinc-300"
            )}>
              <div className="flex gap-6">
                <div className="w-48 space-y-3">
                  <div className="flex items-center gap-2">
                    <input 
                      type="number"
                      value={event.year}
                      onChange={(e) => updateTimelineEvent(event.id, 'year', parseInt(e.target.value) || 0)}
                      className={cn(
                        "w-full border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-primary",
                        theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
                      )}
                      placeholder="Năm"
                    />
                    <button 
                      onClick={() => updateTimelineEvent(event.id, 'isBC', !event.isBC)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                        event.isBC 
                        ? 'bg-red-500/10 border-red-500/50 text-red-500' 
                        : 'bg-green-500/10 border-green-500/50 text-green-500'
                      }`}
                    >
                      {event.isBC ? 'TCN' : 'SCN'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Tháng</label>
                      <input 
                        type="number"
                        min="1" max="12"
                        value={event.month}
                        onChange={(e) => updateTimelineEvent(event.id, 'month', parseInt(e.target.value) || 1)}
                        className={cn(
                          "w-full border rounded-lg px-2 py-1 text-xs",
                          theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
                        )}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Ngày</label>
                      <input 
                        type="number"
                        min="1" max="31"
                        value={event.day}
                        onChange={(e) => updateTimelineEvent(event.id, 'day', parseInt(e.target.value) || 1)}
                        className={cn(
                          "w-full border rounded-lg px-2 py-1 text-xs",
                          theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Giờ</label>
                      <input 
                        type="number"
                        min="0" max="23"
                        value={event.hour}
                        onChange={(e) => updateTimelineEvent(event.id, 'hour', parseInt(e.target.value) || 0)}
                        className={cn(
                          "w-full border rounded-lg px-1 py-1 text-xs text-center",
                          theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
                        )}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Phút</label>
                      <input 
                        type="number"
                        min="0" max="59"
                        value={event.minute}
                        onChange={(e) => updateTimelineEvent(event.id, 'minute', parseInt(e.target.value) || 0)}
                        className={cn(
                          "w-full border rounded-lg px-1 py-1 text-xs text-center",
                          theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
                        )}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-zinc-500 uppercase font-bold">Giây</label>
                      <input 
                        type="number"
                        min="0" max="59"
                        value={event.second}
                        onChange={(e) => updateTimelineEvent(event.id, 'second', parseInt(e.target.value) || 0)}
                        className={cn(
                          "w-full border rounded-lg px-1 py-1 text-xs text-center",
                          theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <AutoResizeTextarea 
                      value={event.title}
                      onChange={(e) => updateTimelineEvent(event.id, 'title', e.target.value)}
                      placeholder="Tiêu đề sự kiện..."
                      className={cn(
                        "w-full bg-transparent text-base font-bold focus:outline-none border-b border-transparent focus:border-primary/50 pb-1 resize-none overflow-hidden",
                        theme === 'dark' ? "text-zinc-100" : "text-zinc-900"
                      )}
                    />
                    <button 
                      onClick={() => removeTimelineEvent(event.id)}
                      className="p-2 text-zinc-600 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <AutoResizeTextarea 
                    value={event.description}
                    onChange={(e) => updateTimelineEvent(event.id, 'description', e.target.value)}
                    placeholder="Mô tả chi tiết sự kiện..."
                    className={cn(
                      "w-full border rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 resize-none",
                      theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-ivory border-zinc-200 text-zinc-800"
                    )}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

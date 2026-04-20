import React from 'react';
import { Character, BaseOutline } from '../types';
import { countWords } from '../lib/contentUtils';
import { cn } from '../lib/utils';

interface StatsViewProps {
  storyContent: string;
  characters: Character[];
  baseOutlines: BaseOutline[];
  theme: 'light' | 'dark';
}

export const StatsView: React.FC<StatsViewProps> = ({
  storyContent,
  characters,
  baseOutlines,
  theme
}) => {
  const wordCount = countWords(storyContent);
  const charCount = storyContent.length;
  const baseOutlineCount = baseOutlines.length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={cn(
          "p-8 rounded-3xl border flex flex-col items-center justify-center text-center",
          theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
        )}>
          <div className="text-zinc-500 text-sm font-medium mb-2">Tổng số từ</div>
          <div className="text-3xl font-black text-primary">{wordCount}</div>
        </div>
        <div className={cn(
          "p-8 rounded-3xl border flex flex-col items-center justify-center text-center",
          theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
        )}>
          <div className="text-zinc-500 text-sm font-medium mb-2">Số nhân vật</div>
          <div className="text-3xl font-black text-primary">{characters.length}</div>
        </div>
        <div className={cn(
          "p-8 rounded-3xl border flex flex-col items-center justify-center text-center",
          theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
        )}>
          <div className="text-zinc-500 text-sm font-medium mb-2">Số Dàn ý cơ sở</div>
          <div className="text-3xl font-black text-primary">{baseOutlineCount}</div>
        </div>
        <div className={cn(
          "p-8 rounded-3xl border flex flex-col items-center justify-center text-center",
          theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
        )}>
          <div className="text-zinc-500 text-sm font-medium mb-2">Số ký tự</div>
          <div className="text-3xl font-black text-primary">{charCount}</div>
        </div>
      </div>
    </div>
  );
};

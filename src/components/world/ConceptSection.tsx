import React from 'react';
import { AutoResizeTextarea } from '../ui/AutoResizeTextarea';
import { cn } from '../../lib/utils';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

interface ConceptSectionProps {
  storyGuidingPrinciple: string;
  setStoryGuidingPrinciple: (val: string) => void;
  generateSpecificWorldField?: (fieldName: string, fieldLabel: string, setterFn: (val: string) => void) => Promise<void>;
  isGeneratingWorld?: boolean;
  theme: 'light' | 'dark';
}

export const ConceptSection: React.FC<ConceptSectionProps> = ({
  storyGuidingPrinciple,
  setStoryGuidingPrinciple,
  generateSpecificWorldField,
  isGeneratingWorld,
  theme
}) => {
  const isDark = theme === 'dark';

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold flex items-center gap-2">Kim chỉ nam của câu chuyện (Story Guiding Principle)</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                disabled={isGeneratingWorld}
                onClick={() => generateSpecificWorldField && generateSpecificWorldField('storyGuidingPrinciple', 'Kim chỉ nam của câu chuyện (Story Guiding Principle)', setStoryGuidingPrinciple)}
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
            <TooltipContent>Yêu cầu AI tự động tạo nội dung gợi ý cho Kim chỉ nam.</TooltipContent>
          </Tooltip>
        </div>
        <AutoResizeTextarea 
          value={storyGuidingPrinciple}
          onChange={(e) => setStoryGuidingPrinciple(e.target.value)}
          placeholder="Nguyên tắc cốt lõi xuyên suốt câu chuyện là gì? (Ví dụ: 'Mọi hành động đều phải trả giá', 'Tình yêu vượt qua mọi ranh giới', hoặc để trống cho AI tự sáng tạo...)"
          className={cn(
            "w-full p-6 rounded-2xl border text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </div>
    </section>
  );
};

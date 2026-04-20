import React from 'react';
import { AutoResizeTextarea } from '../ui/AutoResizeTextarea';
import { cn } from '../../lib/utils';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

interface WorldDetailsSectionProps {
  worldInfo: string;
  setWorldInfo: (val: string) => void;
  worldGeography: string;
  setWorldGeography: (val: string) => void;
  worldHistory: string;
  setWorldHistory: (val: string) => void;
  worldCulture: string;
  setWorldCulture: (val: string) => void;
  worldEconomy: string;
  setWorldEconomy: (val: string) => void;
  worldReligion: string;
  setWorldReligion: (val: string) => void;
  worldFactions: string;
  setWorldFactions: (val: string) => void;
  worldRelationships: string;
  setWorldRelationships: (val: string) => void;
  worldUniqueElements: string;
  setWorldUniqueElements: (val: string) => void;
  powerSystem: string;
  setPowerSystem: (val: string) => void;
  generateSpecificWorldField?: (fieldName: string, fieldLabel: string, setterFn: (val: string) => void) => Promise<void>;
  isGeneratingWorld?: boolean;
  theme: 'light' | 'dark';
}

export const WorldDetailsSection: React.FC<WorldDetailsSectionProps> = ({
  worldInfo,
  setWorldInfo,
  worldGeography,
  setWorldGeography,
  worldHistory,
  setWorldHistory,
  worldCulture,
  setWorldCulture,
  worldEconomy,
  setWorldEconomy,
  worldReligion,
  setWorldReligion,
  worldFactions,
  setWorldFactions,
  worldRelationships,
  setWorldRelationships,
  worldUniqueElements,
  setWorldUniqueElements,
  powerSystem,
  setPowerSystem,
  generateSpecificWorldField,
  isGeneratingWorld,
  theme
}) => {
  const isDark = theme === 'dark';
  
  const renderHeaderWithAiButton = (title: string, fieldName: string, setterFn: (val: string) => void) => (
    <div className="flex items-center justify-between">
      <h3 className="text-base font-bold flex items-center gap-2">{title}</h3>
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
      <section className="space-y-3">
        {renderHeaderWithAiButton('Bối cảnh thế giới (World Building)', 'worldInfo', setWorldInfo)}
        <AutoResizeTextarea 
          value={worldInfo}
          onChange={(e) => setWorldInfo(e.target.value)}
          placeholder="Mô tả quy tắc thế giới, địa lý, lịch sử, các quốc gia..."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>

      <section className="space-y-3">
        {renderHeaderWithAiButton('Địa lý & Vùng lãnh thổ', 'worldGeography', setWorldGeography)}
        <AutoResizeTextarea 
          value={worldGeography}
          onChange={(e) => setWorldGeography(e.target.value)}
          placeholder="Mô tả chi tiết về các châu lục, quốc gia, địa hình đặc trưng, khí hậu..."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>
      
      <section className="space-y-3">
        {renderHeaderWithAiButton('Lịch sử thế giới', 'worldHistory', setWorldHistory)}
        <AutoResizeTextarea 
          value={worldHistory}
          onChange={(e) => setWorldHistory(e.target.value)}
          placeholder="Các sự kiện chấn động, các kỷ nguyên, nguồn gốc của thế giới..."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>

      <section className="space-y-3">
        {renderHeaderWithAiButton('Văn hóa & Phong tục', 'worldCulture', setWorldCulture)}
        <AutoResizeTextarea 
          value={worldCulture}
          onChange={(e) => setWorldCulture(e.target.value)}
          placeholder="Lễ hội, ẩm thực, cách ăn mặc, quan niệm về đạo đức, nghệ thuật..."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>

      <section className="space-y-3">
        {renderHeaderWithAiButton('Kinh tế & Xã hội', 'worldEconomy', setWorldEconomy)}
        <AutoResizeTextarea 
          value={worldEconomy}
          onChange={(e) => setWorldEconomy(e.target.value)}
          placeholder="Hệ thống tiền tệ, các tầng lớp xã hội, cách vận hành của thị trường, các ngành nghề chính..."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>

      <section className="space-y-3">
        {renderHeaderWithAiButton('Tôn giáo & Tín ngưỡng', 'worldReligion', setWorldReligion)}
        <AutoResizeTextarea 
          value={worldReligion}
          onChange={(e) => setWorldReligion(e.target.value)}
          placeholder="Các vị thần, giáo phái, niềm tin vào cái chết và sự sống..."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>

      <section className="space-y-3">
        {renderHeaderWithAiButton('Các quốc gia & Thế lực', 'worldFactions', setWorldFactions)}
        <AutoResizeTextarea 
          value={worldFactions}
          onChange={(e) => setWorldFactions(e.target.value)}
          placeholder="Danh sách các quốc gia, bang phái, tổ chức bí mật, tập đoàn... và đặc điểm của họ."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>

      <section className="space-y-3">
        {renderHeaderWithAiButton('Mối quan hệ giữa các thế lực', 'worldRelationships', setWorldRelationships)}
        <AutoResizeTextarea 
          value={worldRelationships}
          onChange={(e) => setWorldRelationships(e.target.value)}
          placeholder="Mô tả các liên minh, thù địch, chiến tranh lạnh, hoặc các hiệp ước giữa các quốc gia/thế lực."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>

      <section className="space-y-3">
        {renderHeaderWithAiButton('Các yếu tố độc đáo', 'worldUniqueElements', setWorldUniqueElements)}
        <AutoResizeTextarea 
          value={worldUniqueElements}
          onChange={(e) => setWorldUniqueElements(e.target.value)}
          placeholder="Những điều chỉ có ở thế giới này: sinh vật huyền bí, khoáng sản quý hiếm, hiện tượng thiên nhiên kỳ lạ..."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>
      <section className="space-y-3">
        {renderHeaderWithAiButton('Hệ thống sức mạnh / Logic', 'powerSystem', setPowerSystem)}
        <AutoResizeTextarea 
          value={powerSystem}
          onChange={(e) => setPowerSystem(e.target.value)}
          placeholder="Mô tả các quy luật vận hành của thế giới. Có thể là hệ thống tu luyện, phép thuật, hoặc đơn giản là các quy luật xã hội, kinh tế, khoa học... tùy thuộc vào ý tưởng của bạn."
          className={cn(
            "w-full p-4 md:p-6 rounded-2xl border text-sm md:text-base outline-none leading-relaxed focus:border-primary transition-all shadow-sm dark:shadow-none",
            isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
          )}
        />
      </section>
    </div>
  );
};

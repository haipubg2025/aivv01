import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { TawaConfig, Theme } from '../../types';

interface StyleSettingsProps {
  tawaConfig: TawaConfig;
  setTawaConfig: (config: TawaConfig) => void;
  theme: Theme;
}

export const StyleSettings: React.FC<StyleSettingsProps> = ({
  tawaConfig,
  setTawaConfig,
  theme
}) => {
  const normalStyles = [
    { id: 'tawa', label: 'Tawa (Cân Bằng)', desc: 'Phong cách cân bằng, chuyên sâu, giàu hình ảnh.' },
    { id: 'light_novel', label: 'Light Novel (Nhật)', desc: 'Nhịp độ nhanh, đối thoại nhiều, dễ đọc.' },
    { id: 'web_novel', label: 'Web Novel (Sảng Văn)', desc: 'Nhịp độ nhanh, sảng văn, vả mặt, hệ thống.' },
    { id: 'historical', label: 'Cổ Đại / Lịch Sử', desc: 'Từ ngữ trang trọng, bối cảnh xưa cũ.' },
    { id: 'xianxia', label: 'Tiên Hiệp / Tu Chân', desc: 'Huyền ảo, tiên hiệp, hệ thống tu luyện.' },
    { id: 'palace', label: 'Cung Đấu / Điền Văn', desc: 'Lễ nghi, mưu kế, ngôn ngữ cung đình.' },
    { id: 'modern', label: 'Hiện Đại / Đô Thị', desc: 'Ngôn ngữ đời thường, bối cảnh ngày nay.' },
    { id: 'classic_wuxia', label: 'Kiếm Hiệp Cổ Điển', desc: 'Chương hồi cổ điển, tinh thần hiệp nghĩa.' },
    { id: 'horror', label: 'Kinh Dị / Linh Dị', desc: 'U ám, căng thẳng, rùng rợn.' },
    { id: 'romance', label: 'Ngôn Tình / Lãng Mạn', desc: 'Lãng mạn, tập trung vào cảm xúc.' },
    { id: 'humor', label: 'Hài Hước / Trào Phúng', desc: 'Vui nhộn, tình huống bất ngờ.' },
    { id: 'chill', label: 'Chữa Lành / Nhẹ Nhàng', desc: 'Nhẹ nhàng, thư giãn, chữa lành.' },
    { id: 'detective', label: 'Trinh Thám / Bí Ẩn', desc: 'Logic, suy luận, bí ẩn.' },
    { id: 'epic_martial_arts', label: 'Sử Thi / Võ Thuật', desc: 'Hào hùng, chiến tranh, võ thuật thực chiến.' },
  ];

  const nsfwVanHoaStyles = [
    { id: 'nsfw', label: 'Truyện Sắc (18+) Văn Hoa', desc: 'Miêu tả chi tiết, táo bạo, bao gồm các biến thể: Nghề nghiệp, Cấm kỵ, Quý cô dâm đãng (18+).' },
  ];

  const nsfwRawStyles = [
    { id: 'raw_nsfw', label: 'Sắc Trần Trụi / Raw (18+)', desc: 'Thô tục, trần trụi, tâm sự thực tế, hồi ký dâm dục, bối cảnh sinh viên, phô dâm (18+).' },
  ];

  const nsfwHardcoreStyles = [
    { id: 'dark_nsfw', label: 'Dark NSFW (Hạng Nặng)', desc: 'Bạo liệt, cưỡng đoạt, NTR, Femdom, gái bán hoa, bạo dâm, quân đội, học đường đen tối, ma đạo (18+).' },
  ];

  const allStyles = [...normalStyles, ...nsfwVanHoaStyles, ...nsfwRawStyles, ...nsfwHardcoreStyles];

  const selectedPrimary = allStyles.find(s => s.id === tawaConfig.primaryStyle);
  const selectedSecondary = allStyles.find(s => s.id === tawaConfig.secondaryStyle);

  const renderStyleList = (styleList: typeof normalStyles, type: 'primary' | 'secondary') => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {styleList.map((style) => {
        const isSelected = type === 'primary' ? tawaConfig.primaryStyle === style.id : tawaConfig.secondaryStyle === style.id;
        const isDisabled = type === 'secondary' && tawaConfig.primaryStyle === style.id;
        return (
          <button
            key={`${type}-${style.id}`}
            disabled={isDisabled}
            onClick={() => setTawaConfig({ ...tawaConfig, [type === 'primary' ? 'primaryStyle' : 'secondaryStyle']: style.id as any })}
            className={cn(
              "px-3 py-2 rounded-lg text-xs font-bold transition-all border",
              isSelected
                ? (type === 'primary' ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20")
                : (theme === 'dark' 
                    ? "bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed"
                    : "bg-ivory text-zinc-500 border-zinc-200 hover:border-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed")
            )}
          >
            {style.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className={cn(
        "p-6 rounded-2xl border space-y-4",
        theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
      )}>
        <div className="flex items-center gap-2 text-primary font-bold">
          <Sparkles size={20} />
          <h3 className="text-base">Chế độ Tawa (Deep Process)</h3>
        </div>

        <div className={cn(
          "mt-6 pt-6 border-t space-y-8",
          theme === 'dark' ? "border-zinc-800" : "border-zinc-200"
        )}>
          <div className="space-y-4">
            <div className="flex items-center justify-between mt-4">
              <label className="text-xs font-bold uppercase text-zinc-500 tracking-widest">Văn phong Chủ đạo (70%)</label>
              <span className="text-[10px] text-primary font-medium">Bắt buộc</span>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className={cn("text-xs font-semibold uppercase tracking-wider", theme === 'dark' ? "text-emerald-500" : "text-emerald-600")}>Văn phong SFW (An Toàn)</h4>
                {renderStyleList(normalStyles, 'primary')}
              </div>
              
              <div className="space-y-2">
                <h4 className={cn("text-xs font-semibold uppercase tracking-wider", theme === 'dark' ? "text-rose-500" : "text-rose-600")}>Văn phong NSFW (18+)</h4>
                {renderStyleList([...nsfwVanHoaStyles, ...nsfwRawStyles, ...nsfwHardcoreStyles], 'primary')}
              </div>
            </div>
            {selectedPrimary && (
              <div className={cn(
                "p-3 rounded-xl border flex items-center gap-2",
                theme === 'dark' ? "bg-primary/5 border-primary/10" : "bg-primary/5 border-primary/20"
              )}>
                <div className="w-1 h-1 rounded-full bg-primary" />
                <p className="text-[11px] text-zinc-400 italic">{selectedPrimary.desc}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mt-4">
              <label className="text-xs font-bold uppercase text-zinc-500 tracking-widest">Văn phong Bổ trợ (30%)</label>
              <button 
                onClick={() => setTawaConfig({ ...tawaConfig, secondaryStyle: undefined })}
                className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                XÓA CHỌN
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className={cn("text-xs font-semibold uppercase tracking-wider", theme === 'dark' ? "text-emerald-500" : "text-emerald-600")}>Văn phong SFW (An Toàn)</h4>
                {renderStyleList(normalStyles, 'secondary')}
              </div>
              
              <div className="space-y-2">
                <h4 className={cn("text-xs font-semibold uppercase tracking-wider", theme === 'dark' ? "text-rose-500" : "text-rose-600")}>Văn phong NSFW (18+)</h4>
                {renderStyleList([...nsfwVanHoaStyles, ...nsfwRawStyles, ...nsfwHardcoreStyles], 'secondary')}
              </div>
            </div>
            {selectedSecondary && (
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                <p className="text-[11px] text-zinc-400 italic">{selectedSecondary.desc}</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-zinc-500 tracking-widest">Ngôi kể (Point of View)</label>
              <span className="text-[10px] text-primary font-medium">Bắt buộc</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {[
                { id: 'first_person', label: 'Ngôi thứ nhất (Tôi)', desc: 'Nhập vai sâu, cảm xúc trực tiếp' },
                { id: 'second_person', label: 'Ngôi thứ hai (Bạn)', desc: 'Tương tác trực tiếp với độc giả' },
                { id: 'third_person_limited', label: 'Ngôi thứ ba (Hạn chế)', desc: 'Tập trung vào 1 nhân vật' },
                { id: 'third_person_omniscient', label: 'Ngôi thứ ba (Toàn tri)', desc: 'Biết hết mọi suy nghĩ' },
                { id: 'deep_pov', label: 'Deep POV (Nhập vai sâu)', desc: 'Xóa nhòa ranh giới người kể' },
                { id: 'multi_pov', label: 'Đa góc nhìn (Multi-POV)', desc: 'Chuyển đổi giữa nhiều nhân vật' },
              ].map((pov) => (
                <button
                  key={`pov-${pov.id}`}
                  onClick={() => setTawaConfig({ ...tawaConfig, pov: pov.id as any })}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-bold transition-all border text-left flex flex-col gap-1",
                    tawaConfig.pov === pov.id
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : (theme === 'dark' ? "bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-700" : "bg-ivory text-zinc-500 border-zinc-200 hover:border-zinc-300")
                  )}
                >
                  <span>{pov.label}</span>
                  <span className={cn(
                    "text-[9px] font-normal",
                    tawaConfig.pov === pov.id ? "text-primary-foreground/80" : "text-zinc-600"
                  )}>{pov.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {tawaConfig.primaryStyle && tawaConfig.secondaryStyle && (
            <div className={cn(
              "p-3 rounded-xl text-[11px] leading-relaxed border",
              (
                (tawaConfig.primaryStyle === 'historical' && tawaConfig.secondaryStyle === 'modern') ||
                (tawaConfig.primaryStyle === 'modern' && tawaConfig.secondaryStyle === 'historical') ||
                (tawaConfig.primaryStyle === 'palace' && tawaConfig.secondaryStyle === 'modern') ||
                (tawaConfig.primaryStyle === 'modern' && tawaConfig.secondaryStyle === 'palace')
              )
              ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
              : "bg-primary/10 text-primary border-primary/20"
            )}>
              {(
                (tawaConfig.primaryStyle === 'historical' && tawaConfig.secondaryStyle === 'modern') ||
                (tawaConfig.primaryStyle === 'modern' && tawaConfig.secondaryStyle === 'historical') ||
                (tawaConfig.primaryStyle === 'palace' && tawaConfig.secondaryStyle === 'modern') ||
                (tawaConfig.primaryStyle === 'modern' && tawaConfig.secondaryStyle === 'palace')
              ) ? (
                <p>⚠️ <b>Cảnh báo xung đột:</b> Bạn đang kết hợp văn phong Cổ đại/Cung đình với Hiện đại. AI có thể gặp khó khăn trong việc giữ vững xưng hô và từ vựng. Hãy kiểm tra kỹ kết quả!</p>
              ) : (
                <p>✨ <b>Sẵn sàng:</b> Sự kết hợp giữa {tawaConfig.primaryStyle} và {tawaConfig.secondaryStyle} sẽ tạo ra một trải nghiệm đọc độc đáo.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

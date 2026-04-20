import React from 'react';
import { Sparkles, Type } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Theme } from '../../types';
import { VIETNAMESE_FONTS, FONT_SIZES } from '../../constants/fonts';

interface GeneralSettingsProps {
  isBeautifyEnabled: boolean;
  setIsBeautifyEnabled: (enabled: boolean) => void;
  theme: Theme;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  ledColor: string;
  setLedColor: (color: string) => void;
  ledAnimationStyle: any;
  setLedAnimationStyle: (style: any) => void;
  appTextColor: string;
  setAppTextColor: (color: string) => void;
  appBgColor: string;
  setAppBgColor: (color: string) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  isBeautifyEnabled,
  setIsBeautifyEnabled,
  theme,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  ledColor,
  setLedColor,
  ledAnimationStyle,
  setLedAnimationStyle,
  appTextColor,
  setAppTextColor,
  appBgColor,
  setAppBgColor
}) => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className={cn(
        "p-6 rounded-2xl border space-y-4",
        theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
      )}>
        <div className={cn(
          "p-4 rounded-xl border space-y-4",
          theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-ivory border-zinc-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Type size={20} />
            </div>
            <div>
              <div className={cn("font-bold", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>Thiết lập Phông chữ Hệ thống</div>
              <div className="text-xs text-zinc-500">Áp dụng phông chữ và kích thước văn bản cho toàn bộ ứng dụng</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Kiểu chữ</label>
              <select 
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className={cn(
                  "w-full p-3 rounded-xl border text-sm font-bold outline-none focus:border-primary/50 transition-all",
                  theme === 'dark' ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
                )}
              >
                {VIETNAMESE_FONTS.map(font => (
                  <option 
                    key={font.name} 
                    value={font.family} 
                    style={{ fontFamily: font.family }}
                  >
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Kích thước (px)</label>
              <select 
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className={cn(
                  "w-full p-3 rounded-xl border text-sm font-bold outline-none focus:border-primary/50 transition-all",
                  theme === 'dark' ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
                )}
              >
                {FONT_SIZES.map(size => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={cn(
          "flex items-center justify-between p-4 rounded-xl border",
          theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-ivory border-zinc-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Sparkles size={20} />
            </div>
            <div>
              <div className={cn("font-bold", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>Làm đẹp cho nội dung</div>
              <div className="text-xs text-zinc-500">Hiển thị bong bóng chat, highlight và màu sắc sinh động</div>
            </div>
          </div>
          <button 
            onClick={() => setIsBeautifyEnabled(!isBeautifyEnabled)}
            className={cn(
              "w-12 h-6 rounded-full relative transition-all duration-300",
              isBeautifyEnabled ? "bg-primary" : (theme === 'dark' ? "bg-zinc-700" : "bg-zinc-300")
            )}
          >
            <div className={cn(
              "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
              isBeautifyEnabled ? "right-1" : "left-1"
            )} />
          </button>
        </div>

        <div className={cn(
          "p-4 rounded-xl border space-y-6",
          theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-ivory border-zinc-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Sparkles size={20} />
            </div>
            <div>
              <div className={cn("font-bold", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>Hiệu ứng Viền LED Nút Bấm</div>
              <div className="text-xs text-zinc-500">Tùy chỉnh màu sắc và kiểu chạy của viền LED RGB quanh các nút</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Màu sắc LED</label>
              
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="text-[10px] text-zinc-500 font-semibold mb-1">Gradient Cổ Điển</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'rgb', label: 'RGB Classic', color: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)' },
                      { id: 'cyberpunk', label: 'Cyberpunk', color: 'linear-gradient(45deg, #fceb00, #ff007f, #00f0ff)' },
                      { id: 'sunset', label: 'Hoàng Hôn', color: 'linear-gradient(45deg, #ff4e50, #f9d423)' },
                      { id: 'ocean', label: 'Đại Dương', color: 'linear-gradient(45deg, #00c3ff, #ffff1c)' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setLedColor(c.id)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all p-0.5",
                          ledColor === c.id ? "border-primary scale-110" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                        title={c.label}
                      >
                        <div className="w-full h-full rounded-full" style={{ background: c.color }} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] text-zinc-500 font-semibold mb-1">Màu Đơn (Neon & Pastel)</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: '#ff003c', label: 'Cyber Red', color: '#ff003c' },
                      { id: '#ff00ff', label: 'Magenta', color: '#ff00ff' },
                      { id: '#8a2be2', label: 'Deep Violet', color: '#8a2be2' },
                      { id: '#3b82f6', label: 'Blue', color: '#3b82f6' },
                      { id: '#06b6d4', label: 'Cyan', color: '#06b6d4' },
                      { id: '#00ff00', label: 'Lime', color: '#00ff00' },
                      { id: '#ffd700', label: 'Gold', color: '#ffd700' },
                      { id: '#ffffff', label: 'White', color: '#ffffff' },
                      { id: '#ffb6c1', label: 'Light Pink', color: '#ffb6c1' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setLedColor(c.id)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all p-0.5",
                          ledColor === c.id ? "border-primary scale-110" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                        title={c.label}
                      >
                        <div className="w-full h-full rounded-full" style={{ background: c.color }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-zinc-500/5">
                <input 
                  type="color" 
                  value={ledColor.startsWith('#') ? ledColor : '#06b6d4'}
                  onChange={(e) => setLedColor(e.target.value)}
                  className="w-6 h-6 rounded overflow-hidden bg-transparent cursor-pointer"
                  title="Màu tùy chỉnh"
                />
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  {ledColor.startsWith('#') ? ledColor : 'Tùy chỉnh'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Kiểu chạy LED</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'rotate', label: 'Xoay tròn' },
                  { id: 'flow', label: 'Dòng chảy' },
                  { id: 'pulse', label: 'Nhịp thở' },
                  { id: 'neon', label: 'Phát sáng' },
                  { id: 'disco', label: 'Vũ trường' },
                  { id: 'liquid', label: 'Chất lỏng' },
                  { id: 'static', label: 'Tĩnh' },
                  { id: 'none', label: 'Tắt LED' },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setLedAnimationStyle(style.id as any)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-[10px] font-bold transition-all border",
                      ledAnimationStyle === style.id
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                        : (theme === 'dark' ? "bg-black text-zinc-500 border-zinc-800 hover:border-zinc-700" : "bg-ivory text-zinc-500 border-zinc-200 hover:border-zinc-300")
                    )}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={cn(
          "p-4 rounded-xl border space-y-6",
          theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-ivory border-zinc-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Sparkles size={20} />
            </div>
            <div>
              <div className={cn("font-bold", theme === 'dark' ? "text-zinc-100" : "text-zinc-900")}>Màu sắc Toàn Bộ Ứng Dụng</div>
              <div className="text-xs text-zinc-500">Tùy chỉnh màu chữ và màu nền cho toàn bộ giao diện</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Màu Chữ Hệ Thống</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={appTextColor || (theme === 'dark' ? '#ffffff' : '#000000')}
                  onChange={(e) => setAppTextColor(e.target.value)}
                  className="w-10 h-10 rounded-lg overflow-hidden bg-transparent cursor-pointer border-2 border-zinc-800"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{appTextColor || (theme === 'dark' ? 'Mặc định (Trắng)' : 'Mặc định (Đen)')}</span>
                  {appTextColor && (
                    <button 
                      onClick={() => setAppTextColor('')}
                      className="text-[9px] text-primary hover:underline w-fit"
                    >
                      Đặt lại mặc định
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Màu Nền Hệ Thống</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={appBgColor || (theme === 'dark' ? '#000000' : '#FDFCF0')}
                  onChange={(e) => setAppBgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg overflow-hidden bg-transparent cursor-pointer border-2 border-zinc-800"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{appBgColor || (theme === 'dark' ? 'Mặc định (Đen)' : 'Mặc định (Ngà)')}</span>
                   {appBgColor && (
                    <button 
                      onClick={() => setAppBgColor('')}
                      className="text-[9px] text-primary hover:underline w-fit"
                    >
                      Đặt lại mặc định
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

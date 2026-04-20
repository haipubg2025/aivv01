import React from 'react';
import { Cpu, Sliders } from 'lucide-react';
import { GeminiConfig } from '../../types';
import { cn } from '../../lib/utils';

interface AiSettingsProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  availableGeminiModels: string[];
  geminiConfig: GeminiConfig;
  setGeminiConfig: (config: GeminiConfig) => void;
  theme: 'light' | 'dark';
}

export const AiSettings: React.FC<AiSettingsProps> = ({
  selectedModel,
  setSelectedModel,
  availableGeminiModels,
  geminiConfig,
  setGeminiConfig,
  theme
}) => {
  const handleGeminiConfigChange = (field: keyof GeminiConfig, value: any) => {
    setGeminiConfig({ ...geminiConfig, [field]: value });
  };

  const isDark = theme === 'dark';

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-4">
        <div className="space-y-3">
          <label className="text-sm font-bold uppercase text-zinc-500 tracking-widest">Mô hình AI ưu tiên</label>
        </div>
        
        <div className="space-y-3">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl border",
            isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-ivory border-zinc-200"
          )}>
            <Cpu size={20} className="text-primary" />
            <select 
              className={cn(
                "flex-1 bg-transparent outline-none text-sm font-bold appearance-none cursor-pointer",
                isDark ? "text-zinc-100" : "text-zinc-900"
              )}
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {availableGeminiModels.map(modelId => (
                <option key={modelId} value={modelId} className={isDark ? "bg-zinc-950" : "bg-ivory"}>
                  {modelId} {modelId.includes('pro') ? '(Pro)' : '(Flash)'}
                </option>
              ))}
            </select>
            <div className={cn(
              "text-xs text-zinc-500 px-2 border-l",
              isDark ? "border-zinc-800" : "border-zinc-200"
            )}>
              {selectedModel.includes('pro') ? 'Thông minh' : 'Tốc độ'}
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 italic px-1">
            Chọn mô hình AI bạn muốn sử dụng làm mặc định. <b>Gemini 3.1 Pro</b> là lựa chọn tối ưu cho sáng tác văn học với khả năng xử lý ngữ cảnh cực lớn.
          </p>
        </div>
      </div>

      <div className={cn(
        "p-6 rounded-2xl border space-y-6",
        isDark ? "bg-zinc-950 border-zinc-800" : "bg-ivory-dark border-zinc-200"
      )}>
        <div className="flex items-center gap-2 text-primary font-bold">
          <Sliders size={20} />
          <h3 className="text-base">Cấu hình chi tiết Gemini</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400">Temperature</span>
              <span className="text-primary">{geminiConfig.temperature}</span>
            </div>
            <input 
              type="range" min="0" max="2" step="0.1"
              className="w-full accent-primary"
              value={geminiConfig.temperature}
              onChange={(e) => handleGeminiConfigChange('temperature', parseFloat(e.target.value))}
            />
            <p className="text-[10px] text-zinc-500 italic leading-relaxed">
              <b>Độ sáng tạo (0 - 2.0):</b> 0 là ổn định nhất, 2.0 là ngẫu hứng nhất. <span className="text-primary font-bold">Mặc định: 0.9</span>. Gợi ý: 0.9 - 1.2 cho sáng tác tiểu thuyết để có văn phong bay bổng.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400">Top P</span>
              <span className="text-primary">{geminiConfig.topP}</span>
            </div>
            <input 
              type="range" min="0" max="1" step="0.01"
              className="w-full accent-primary"
              value={geminiConfig.topP}
              onChange={(e) => handleGeminiConfigChange('topP', parseFloat(e.target.value))}
            />
            <p className="text-[10px] text-zinc-500 italic leading-relaxed">
              <b>Top P (0 - 1.0):</b> Giới hạn tập từ vựng dựa trên tổng xác suất tích lũy. Giúp văn bản tự nhiên, tránh các từ quá hiếm.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400">Top K</span>
              <span className="text-primary">{geminiConfig.topK}</span>
            </div>
            <input 
              type="number"
              min="1"
              max="100"
              className={cn(
                "w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary",
                isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
              )}
              value={geminiConfig.topK}
              onChange={(e) => handleGeminiConfigChange('topK', parseInt(e.target.value))}
            />
            <p className="text-[10px] text-zinc-500 italic leading-relaxed">
              <b>Top K (1 - 100):</b> Số lượng từ ứng viên có xác suất cao nhất được xem xét. K nhỏ giúp câu văn gãy gọn, K lớn giúp văn phong đa dạng.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400">Max Output Tokens</span>
              <span className="text-primary">{geminiConfig.maxOutputTokens}</span>
            </div>
            <input 
              type="number"
              min="1"
              max="65536"
              className={cn(
                "w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary",
                isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
              )}
              value={geminiConfig.maxOutputTokens}
              onChange={(e) => handleGeminiConfigChange('maxOutputTokens', parseInt(e.target.value))}
            />
            <p className="text-[10px] text-zinc-500 italic leading-relaxed">
              <b>Độ dài tối đa (1 - 65536):</b> Giới hạn số lượng token trong phản hồi. Đối với <b>Gemini 3.1 Pro</b>, giá trị tối đa có thể lên tới <b>65536</b> (bao gồm cả tokens suy nghĩ).
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-400">Thinking Level</span>
              <span className="text-primary">{geminiConfig.thinkingLevel || 'HIGH'}</span>
            </div>
            <select 
              className={cn(
                "w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-primary appearance-none cursor-pointer",
                isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
              )}
              value={geminiConfig.thinkingLevel || 'HIGH'}
              onChange={(e) => handleGeminiConfigChange('thinkingLevel', e.target.value)}
            >
              <option value="HIGH" className={isDark ? "bg-zinc-950" : "bg-ivory"}>HIGH (Mặc định - Suy nghĩ sâu)</option>
              <option value="LOW" className={isDark ? "bg-zinc-950" : "bg-ivory"}>LOW (Suy nghĩ nhanh - Tiết kiệm)</option>
              <option value="MINIMAL" className={isDark ? "bg-zinc-950" : "bg-ivory"}>MINIMAL (Không suy nghĩ)</option>
            </select>
            <p className="text-[10px] text-zinc-500 italic leading-relaxed">
              <b>Cấp độ suy nghĩ:</b> Chỉ áp dụng cho dòng <b>Gemini 3</b>. HIGH giúp giải quyết các yêu cầu phức tạp tốt hơn.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

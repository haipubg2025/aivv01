import React, { useState } from 'react';
import { LayoutGrid, Cpu, Globe2, RotateCcw, FileText, Moon, Sun, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProxyConfig, GeminiKeyConfig, GeminiConfig, TawaConfig, Theme } from '../types';
import { GeneralSettings } from './settings/GeneralSettings';
import { StyleSettings } from './settings/StyleSettings';
import { AiSettings } from './settings/AiSettings';
import { ApiProxySettings } from './settings/ApiProxySettings';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface SettingsViewProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  availableGeminiModels: string[];
  proxies: ProxyConfig[];
  setProxies: (proxies: ProxyConfig[]) => void;
  geminiApiKeys: GeminiKeyConfig[];
  setGeminiApiKeys: (keys: GeminiKeyConfig[]) => void;
  isGeminiEnabled: boolean;
  setIsGeminiEnabled: (enabled: boolean) => void;
  isProxyEnabled: boolean;
  setIsProxyEnabled: (enabled: boolean) => void;
  tawaConfig: TawaConfig;
  setTawaConfig: (config: TawaConfig) => void;
  geminiConfig: GeminiConfig;
  setGeminiConfig: (config: GeminiConfig) => void;
  resetApiProxy: () => void;
  resetAllSettings: () => void;
  bulkImport: (text: string) => void;
  loadProxyModels: () => void;
  exportSetup: () => void;
  importSetup: (setupJson: string) => void;
  isBeautifyEnabled: boolean;
  setIsBeautifyEnabled: (enabled: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  ledColor: string;
  setLedColor: (color: string) => void;
  ledAnimationStyle: string;
  setLedAnimationStyle: (style: any) => void;
  appTextColor: string;
  setAppTextColor: (color: string) => void;
  appBgColor: string;
  setAppBgColor: (color: string) => void;
}

type SettingsTab = 'chung' | 'van-phong' | 'ai' | 'api-proxy';

export const SettingsView: React.FC<SettingsViewProps> = ({
  selectedModel,
  setSelectedModel,
  availableGeminiModels,
  proxies,
  setProxies,
  geminiApiKeys,
  setGeminiApiKeys,
  isGeminiEnabled,
  setIsGeminiEnabled,
  isProxyEnabled,
  setIsProxyEnabled,
  tawaConfig,
  setTawaConfig,
  geminiConfig,
  setGeminiConfig,
  resetApiProxy,
  resetAllSettings,
  bulkImport,
  loadProxyModels,
  exportSetup,
  importSetup,
  isBeautifyEnabled,
  setIsBeautifyEnabled,
  theme,
  toggleTheme,
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
  setAppBgColor,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('api-proxy');
  const setupImportRef = React.useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'chung', label: 'Chung', icon: LayoutGrid },
    { id: 'van-phong', label: 'Văn Phong', icon: Sparkles },
    { id: 'ai', label: 'AI', icon: Cpu },
    { id: 'api-proxy', label: 'Api & Proxy', icon: Globe2 },
  ];

  const handleSetupImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        importSetup(text);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-8 relative">
      <div className={cn(
        "space-y-4 border-b pb-4",
        theme === 'dark' ? "border-zinc-800" : "border-zinc-200"
      )}>
        <div className="flex flex-wrap items-center gap-2">
          <input 
            type="file" 
            accept=".json" 
            className="hidden" 
            ref={setupImportRef}
            onChange={handleSetupImport}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={() => setupImportRef.current?.click()}
                className={cn(
                  "p-2.5 rounded-xl font-bold transition-all border",
                  theme === 'dark' ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700" : "bg-ivory text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                )}
              >
                <FileText size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Nhập Setup</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={exportSetup}
                className={cn(
                  "p-2.5 rounded-xl font-bold transition-all border",
                  theme === 'dark' ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700" : "bg-ivory text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                )}
              >
                <LayoutGrid size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Xuất Setup</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={toggleTheme}
                className={cn(
                  "p-2.5 rounded-xl transition-all border",
                  theme === 'dark' ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700" : "bg-ivory text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                )}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </TooltipTrigger>
            <TooltipContent>{theme === 'light' ? "Chuyển sang Giao diện Tối" : "Chuyển sang Giao diện Sáng"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={resetAllSettings}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-500 text-sm font-bold transition-all border border-red-500/20"
              >
                <RotateCcw size={16} />
                RESET
              </button>
            </TooltipTrigger>
            <TooltipContent>Khôi phục mặc định toàn bộ cấu hình</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className={cn(
        "flex w-full sm:w-fit gap-1 sm:gap-2 p-1 rounded-2xl border",
        theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-ivory border-zinc-200"
      )}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as SettingsTab)}
            className={cn(
              "flex flex-1 sm:flex-initial items-center justify-center gap-2 px-2 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : (theme === 'dark' ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100")
            )}
          >
            <tab.icon size={18} className="hidden sm:block" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'chung' && (
          <GeneralSettings 
            isBeautifyEnabled={isBeautifyEnabled}
            setIsBeautifyEnabled={setIsBeautifyEnabled}
            theme={theme}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            fontSize={fontSize}
            setFontSize={setFontSize}
            ledColor={ledColor}
            setLedColor={setLedColor}
            ledAnimationStyle={ledAnimationStyle}
            setLedAnimationStyle={setLedAnimationStyle}
            appTextColor={appTextColor}
            setAppTextColor={setAppTextColor}
            appBgColor={appBgColor}
            setAppBgColor={setAppBgColor}
          />
        )}

        {activeTab === 'van-phong' && (
          <StyleSettings 
            tawaConfig={tawaConfig}
            setTawaConfig={setTawaConfig}
            theme={theme}
          />
        )}

        {activeTab === 'ai' && (
          <AiSettings 
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            availableGeminiModels={availableGeminiModels}
            geminiConfig={geminiConfig}
            setGeminiConfig={setGeminiConfig}
            theme={theme}
          />
        )}

        {activeTab === 'api-proxy' && (
          <ApiProxySettings 
            proxies={proxies}
            setProxies={setProxies}
            geminiApiKeys={geminiApiKeys}
            setGeminiApiKeys={setGeminiApiKeys}
            isGeminiEnabled={isGeminiEnabled}
            setIsGeminiEnabled={setIsGeminiEnabled}
            isProxyEnabled={isProxyEnabled}
            setIsProxyEnabled={setIsProxyEnabled}
            resetApiProxy={resetApiProxy}
            bulkImport={bulkImport}
            loadProxyModels={loadProxyModels}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

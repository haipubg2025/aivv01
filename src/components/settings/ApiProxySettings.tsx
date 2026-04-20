import React, { useState, useRef } from 'react';
import { FileText, RotateCcw, Plus, Key, ToggleRight, ToggleLeft, Trash2, Server, RefreshCw, Link, Cpu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ProxyConfig, GeminiKeyConfig } from '../../types';
import { AutoResizeTextarea } from '../ui/AutoResizeTextarea';

interface ApiProxySettingsProps {
  proxies: ProxyConfig[];
  setProxies: (proxies: ProxyConfig[]) => void;
  geminiApiKeys: GeminiKeyConfig[];
  setGeminiApiKeys: (keys: GeminiKeyConfig[]) => void;
  isGeminiEnabled: boolean;
  setIsGeminiEnabled: (enabled: boolean) => void;
  isProxyEnabled: boolean;
  setIsProxyEnabled: (enabled: boolean) => void;
  resetApiProxy: () => void;
  bulkImport: (text: string) => void;
  loadProxyModels: () => void;
  theme: 'light' | 'dark';
}

export const ApiProxySettings: React.FC<ApiProxySettingsProps> = ({
  proxies,
  setProxies,
  geminiApiKeys,
  setGeminiApiKeys,
  isGeminiEnabled,
  setIsGeminiEnabled,
  isProxyEnabled,
  setIsProxyEnabled,
  resetApiProxy,
  bulkImport,
  loadProxyModels,
  theme
}) => {
  const [bulkInput, setBulkInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDark = theme === 'dark';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        bulkImport(text);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleBulkImport = () => {
    if (!bulkInput.trim()) return;
    bulkImport(bulkInput);
    setBulkInput('');
  };

  const handleKeyChange = (id: string, field: keyof GeminiKeyConfig, value: any) => {
    setGeminiApiKeys(geminiApiKeys.map(k => k.id === id ? { ...k, [field]: value } : k));
  };

  const addKey = () => {
    const newKey: GeminiKeyConfig = {
      id: Math.random().toString(36).substr(2, 9),
      key: '',
      isActive: true
    };
    setGeminiApiKeys([...geminiApiKeys, newKey]);
  };

  const removeKey = (id: string) => {
    setGeminiApiKeys(geminiApiKeys.filter(k => k.id !== id));
  };

  const handleProxyChange = (id: string, field: keyof ProxyConfig, value: any) => {
    setProxies(proxies.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addProxy = () => {
    const newProxy: ProxyConfig = {
      id: Math.random().toString(36).substr(2, 9),
      url: '',
      key: '',
      model: 'gemini-3.1-pro-preview',
      isActive: true
    };
    setProxies([...proxies, newProxy]);
  };

  const removeProxy = (id: string) => {
    setProxies(proxies.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Ô nhập tổng */}
      <div className={cn(
        "p-6 rounded-2xl border space-y-4",
        isDark ? "bg-zinc-950 border-zinc-800" : "bg-ivory-dark border-zinc-200"
      )}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold">
            <FileText size={20} />
            <h3 className="text-base">Nhập liệu hàng loạt</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input 
              type="file" 
              accept=".txt" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700" : "bg-ivory text-zinc-600 border-zinc-200 hover:bg-zinc-100"
              )}
            >
              <FileText size={16} />
              CHỌN FILE TXT
            </button>
            <button 
              onClick={resetApiProxy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600/10 hover:bg-rose-600/20 text-rose-500 text-xs font-bold transition-all border border-rose-500/20"
            >
              <RotateCcw size={16} />
              XÓA HẾT
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <AutoResizeTextarea 
            className={cn(
              "w-full min-h-[80px] p-3 rounded-xl border outline-none focus:border-primary transition-all text-sm placeholder:text-zinc-700 resize-none",
              isDark ? "bg-black border-zinc-800 text-zinc-100" : "bg-ivory border-zinc-200 text-zinc-900"
            )}
            placeholder="Dán danh sách API Key hoặc Proxy vào đây...&#10;Ví dụ:&#10;AIza...&#10;https://proxy.com|key_proxy"
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
          />
          <button 
            onClick={handleBulkImport}
            disabled={!bulkInput.trim()}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            PHÂN LOẠI VÀ THÊM VÀO DANH SÁCH
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cột API */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Key size={20} />
              <h3 className="text-base">Gemini API Keys</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsGeminiEnabled(!isGeminiEnabled)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                  isGeminiEnabled 
                    ? "bg-emerald-600/10 text-emerald-500 border-emerald-500/20" 
                    : (isDark ? "bg-zinc-800 text-zinc-500 border-zinc-700" : "bg-ivory text-zinc-500 border-zinc-200")
                )}
              >
                {isGeminiEnabled ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                {isGeminiEnabled ? 'ON' : 'OFF'}
              </button>
              <button 
                onClick={addKey}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all border border-primary/20"
              >
                <Plus size={14} />
                THÊM
              </button>
            </div>
          </div>
          
          <div className={cn(
            "p-4 rounded-2xl border space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar transition-opacity",
            isDark ? "bg-zinc-950 border-zinc-800" : "bg-ivory-dark border-zinc-200",
            !isGeminiEnabled && "opacity-50 pointer-events-none grayscale"
          )}>
            {geminiApiKeys.length === 0 && (
              <div className="p-8 text-center space-y-2">
                <Key size={32} className="mx-auto text-zinc-700" />
                <p className="text-sm text-zinc-500">Chưa có API Key nào.</p>
              </div>
            )}
            {geminiApiKeys.map((keyConfig, index) => (
              <div key={keyConfig.id} className={cn(
                "flex items-center gap-3 p-2 rounded-lg border group transition-all",
                isDark ? "bg-black border-zinc-800/50 hover:border-zinc-700" : "bg-ivory border-zinc-200/50 hover:border-zinc-300"
              )}>
                <span className="text-[10px] font-bold text-zinc-600 w-4">{index + 1}</span>
                <input 
                  type="text"
                  placeholder="Nhập API Key..."
                  className={cn(
                    "flex-1 bg-transparent outline-none text-xs",
                    isDark ? "text-zinc-100" : "text-zinc-900"
                  )}
                  value={keyConfig.key}
                  onChange={(e) => handleKeyChange(keyConfig.id, 'key', e.target.value)}
                />
                <button 
                  onClick={() => removeKey(keyConfig.id)}
                  className="p-1 rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500 text-center italic">Tất cả Key sẽ được sử dụng xoay vòng tự động.</p>
        </div>

        {/* Cột Proxy Ngược */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Server size={20} />
              <h3 className="text-base">Proxy Ngược</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsProxyEnabled(!isProxyEnabled)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                  isProxyEnabled 
                    ? "bg-emerald-600/10 text-emerald-500 border-emerald-500/20" 
                    : (isDark ? "bg-zinc-800 text-zinc-500 border-zinc-700" : "bg-ivory text-zinc-500 border-zinc-200")
                )}
              >
                {isProxyEnabled ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                {isProxyEnabled ? 'ON' : 'OFF'}
              </button>
              <button 
                onClick={loadProxyModels}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                  isDark ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700" : "bg-ivory text-zinc-600 border-zinc-200 hover:bg-zinc-100"
                )}
              >
                <RefreshCw size={14} />
                LOAD
              </button>
              <button 
                onClick={addProxy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all border border-primary/20"
              >
                <Plus size={14} />
                THÊM
              </button>
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-2xl border space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar transition-opacity",
            isDark ? "bg-zinc-950 border-zinc-800" : "bg-ivory-dark border-zinc-200",
            !isProxyEnabled && "opacity-50 pointer-events-none grayscale"
          )}>
            {proxies.length === 0 && (
              <div className="p-8 text-center space-y-2">
                <Server size={32} className="mx-auto text-zinc-700" />
                <p className="text-sm text-zinc-500">Chưa có Proxy nào.</p>
              </div>
            )}
            {proxies.map((proxy, index) => (
              <div key={proxy.id} className={cn(
                "p-3 rounded-xl border space-y-2 group transition-all",
                isDark ? "bg-black border-zinc-800/50 hover:border-zinc-700" : "bg-ivory border-zinc-200/50 hover:border-zinc-300"
              )}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-600 uppercase">Proxy #{index + 1}</span>
                  <button 
                    onClick={() => removeProxy(proxy.id)}
                    className="p-1 rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-1.5">
                  <div className={cn(
                    "flex items-center gap-2 p-1.5 rounded-lg border",
                    isDark ? "bg-zinc-900/50 border-zinc-800/50" : "bg-ivory-dark border-zinc-200/50"
                  )}>
                    <Link size={12} className="text-zinc-600" />
                    <input 
                      type="text"
                      placeholder="URL Proxy..."
                      className={cn(
                        "flex-1 bg-transparent outline-none text-[11px]",
                        isDark ? "text-zinc-100" : "text-zinc-900"
                      )}
                      value={proxy.url}
                      onChange={(e) => handleProxyChange(proxy.id, 'url', e.target.value)}
                    />
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 p-1.5 rounded-lg border",
                    isDark ? "bg-zinc-900/50 border-zinc-800/50" : "bg-ivory-dark border-zinc-200/50"
                  )}>
                    <Key size={12} className="text-zinc-600" />
                    <input 
                      type="text"
                      placeholder="Password / Key..."
                      className={cn(
                        "flex-1 bg-transparent outline-none text-[11px]",
                        isDark ? "text-zinc-100" : "text-zinc-900"
                      )}
                      value={proxy.key}
                      onChange={(e) => handleProxyChange(proxy.id, 'key', e.target.value)}
                    />
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 p-1.5 rounded-lg border",
                    isDark ? "bg-zinc-900/50 border-zinc-800/50" : "bg-ivory-dark border-zinc-200/50"
                  )}>
                    <Cpu size={12} className="text-zinc-600" />
                    {proxy.availableModels && proxy.availableModels.length > 0 ? (
                      <select
                        className={cn(
                          "flex-1 bg-transparent outline-none text-[11px] appearance-none cursor-pointer",
                          isDark ? "text-zinc-100" : "text-zinc-900"
                        )}
                        value={proxy.model || 'gemini-3.1-pro-preview'}
                        onChange={(e) => handleProxyChange(proxy.id, 'model', e.target.value)}
                      >
                        <option value="gemini-3.1-pro-preview" className={isDark ? "bg-zinc-950" : "bg-ivory"}>gemini-3.1-pro-preview</option>
                        {proxy.availableModels.filter(m => m !== 'gemini-3.1-pro-preview').map(m => (
                          <option key={m} value={m} className={isDark ? "bg-zinc-950" : "bg-ivory"}>{m}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type="text"
                        placeholder="Model (mặc định: gemini-3.1-pro-preview)..."
                        className={cn(
                          "flex-1 bg-transparent outline-none text-[11px]",
                          isDark ? "text-zinc-100" : "text-zinc-900"
                        )}
                        value={proxy.model || 'gemini-3.1-pro-preview'}
                        onChange={(e) => handleProxyChange(proxy.id, 'model', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-zinc-500 text-center italic">Tất cả Proxy sẽ được sử dụng xoay vòng tự động.</p>
        </div>
      </div>
    </div>
  );
};

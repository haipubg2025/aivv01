import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, Zap, Maximize2, Minimize2, Copy, Check, ChevronDown, ChevronUp, ShieldAlert, Clock, DollarSign, Settings, Network, BrainCircuit } from 'lucide-react';
import { AIStatus, AIStats, Theme, AILog } from '../types';
import { cn } from '../lib/utils';
import { countTokens } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AiMonitorViewProps {
  aiLogs: AILog[];
  aiStatus: AIStatus;
  aiStats: AIStats | null;
  theme: Theme;
}

const AiLogBlock: React.FC<{ log: AILog, theme: Theme, isLatest: boolean, aiStatus: AIStatus, aiStats: AIStats | null }> = ({ log, theme, isLatest, aiStatus, aiStats }) => {
  const [copied, setCopied] = useState(false);
  const [exactInputTokens, setExactInputTokens] = useState<number | null>(null);
  const [exactOutputTokens, setExactOutputTokens] = useState<number | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (log.prompt) {
      countTokens(log.prompt, log.modelName).then(tokens => setExactInputTokens(tokens));
    } else {
      setExactInputTokens(null);
    }
  }, [log.prompt, log.modelName]);

  useEffect(() => {
    if (log.response && log.isProcessing) {
      const timer = setTimeout(() => {
        countTokens(log.response, log.modelName).then(tokens => setExactOutputTokens(tokens));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!log.isProcessing && log.response) {
      countTokens(log.response, log.modelName).then(tokens => setExactOutputTokens(tokens));
    }
  }, [log.response, log.isProcessing, log.modelName]);

  const estimatedInputTokens = exactInputTokens || Math.ceil((log.prompt?.length || 0) / 3.5);
  const estimatedOutputTokens = exactOutputTokens || Math.ceil((log.response?.length || 0) / 3.5);

  const isProcessing = isLatest ? aiStatus.isProcessing : log.isProcessing;

  return (
    <div className={cn(
      "flex flex-col gap-4 p-4 rounded-xl border",
      theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
    )}>
      {/* Input Section */}
      <div className="flex flex-col min-h-[150px] max-h-[300px]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Terminal size={14} /> Input Sent to AI
          </div>
          <div className="flex items-center gap-3">
            <div className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] text-primary">
              Tokens: {log.inputTokens || (isLatest && aiStats?.inputTokens) || estimatedInputTokens} {(!(log.inputTokens || (isLatest && aiStats?.inputTokens))) && !exactInputTokens && "(Est.)"}
            </div>
            <button 
              onClick={() => copyToClipboard(log.prompt)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
        <div className={cn(
          "flex-1 p-4 rounded-xl text-xs overflow-y-auto border scrollbar-thin",
          theme === 'dark' ? "bg-black border-zinc-800 text-zinc-400" : "bg-ivory border-zinc-200 text-zinc-600"
        )}>
          {log.prompt || "Chưa có dữ liệu input..."}
        </div>
      </div>

      {/* Thinking Section */}
      {(log.thinking || (isProcessing && !log.thinking)) && (
        <div className="flex flex-col min-h-[100px] max-h-[300px]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <BrainCircuit size={14} /> Deep Thinking Process
            </div>
            {isProcessing && !log.thinking && (
              <div className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] text-indigo-400 animate-pulse">
                Thinking...
              </div>
            )}
          </div>
          <div className={cn(
            "flex-1 p-4 rounded-xl text-xs overflow-y-auto border scrollbar-thin italic prose prose-sm max-w-none",
            theme === 'dark' ? "bg-black border-zinc-800 text-indigo-300/80 prose-invert" : "bg-ivory border-zinc-200 text-indigo-700/80"
          )}>
            {log.thinking ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {log.thinking}
              </ReactMarkdown>
            ) : (
              isProcessing ? "AI đang thực hiện Deep Thinking Protocol..." : "Không có dữ liệu suy luận..."
            )}
          </div>
        </div>
      )}

      {/* Output Section */}
      <div className="flex flex-col min-h-[150px] max-h-[300px]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Cpu size={14} /> Streaming Output
          </div>
          <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] text-emerald-400">
            Tokens: {log.outputTokens || (isLatest && aiStats?.outputTokens) || estimatedOutputTokens} {(!(log.outputTokens || (isLatest && aiStats?.outputTokens))) && !exactOutputTokens && "(Est.)"}
          </div>
        </div>
        <div className={cn(
          "flex-1 p-4 rounded-xl text-xs overflow-y-auto border scrollbar-thin relative",
          theme === 'dark' ? "bg-black border-zinc-800 text-emerald-500/90" : "bg-ivory border-zinc-200 text-emerald-700"
        )}>
          {log.rawResponse || log.response || (isProcessing ? "Đang chờ dữ liệu..." : "Chưa có dữ liệu streaming...")}
          {isProcessing && (
            <span className="inline-block w-1.5 h-4 bg-emerald-500 ml-1 animate-pulse align-middle" />
          )}
        </div>
      </div>
      
      {/* Advanced Metrics Toggle */}
      <div className="flex justify-center mt-2">
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-zinc-500 hover:text-primary transition-colors"
        >
          {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          Advanced Metrics
        </button>
      </div>

      {/* Advanced Metrics Section */}
      {showAdvanced && (
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-xl border text-xs",
          theme === 'dark' ? "bg-black border-zinc-800" : "bg-zinc-100 border-zinc-200"
        )}>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-zinc-500 font-bold uppercase text-[10px]"><Clock size={12} /> Performance</div>
            <div className={theme === 'dark' ? "text-zinc-300" : "text-zinc-700"}>
              <div>TTFT: {log.ttft ? `${log.ttft}ms` : 'N/A'}</div>
              <div>TPS: {log.tps ? log.tps.toFixed(2) : 'N/A'}</div>
              <div>Latency: {log.totalLatency ? `${log.totalLatency}ms` : 'N/A'}</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-zinc-500 font-bold uppercase text-[10px]"><DollarSign size={12} /> Cost & Model</div>
            <div className={theme === 'dark' ? "text-zinc-300" : "text-zinc-700"}>
              <div>Model: {log.modelName || 'N/A'}</div>
              <div>Cost: {log.estimatedCost ? `$${log.estimatedCost.toFixed(6)}` : 'N/A'}</div>
              <div>Action: {log.actionType || 'N/A'}</div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-zinc-500 font-bold uppercase text-[10px]"><ShieldAlert size={12} /> Status & Safety</div>
            <div className={theme === 'dark' ? "text-zinc-300" : "text-zinc-700"}>
              <div>Finish: {log.finishReason || 'N/A'}</div>
              <div>Safety: {log.safetyRatings ? 'Checked' : 'N/A'}</div>
            </div>
          </div>

          <div className="flex flex-col gap-1 col-span-2 md:col-span-3">
            <div className="flex items-center gap-1 text-zinc-500 font-bold uppercase text-[10px]"><Network size={12} /> Network & Debug</div>
            <div className={cn("text-[10px]", theme === 'dark' ? "text-zinc-400" : "text-zinc-600")}>
              <div>HTTP Status: {log.httpStatusCode || 'N/A'}</div>
              <div>Request ID: {log.requestId || 'N/A'}</div>
            </div>
          </div>

          {log.parameters && (
            <div className="flex flex-col gap-1 col-span-2 md:col-span-3 mt-2 pt-2 border-t border-zinc-800/50">
              <div className="flex items-center gap-1 text-zinc-500 font-bold uppercase text-[10px]"><Settings size={12} /> Parameters</div>
              <div className={cn("text-[10px] grid grid-cols-2 gap-2", theme === 'dark' ? "text-zinc-400" : "text-zinc-600")}>
                <div>Temp: {log.parameters.temperature}</div>
                <div>Top-P: {log.parameters.topP}</div>
                <div>Top-K: {log.parameters.topK}</div>
                <div>Max Tokens: {log.parameters.maxOutputTokens}</div>
                <div>Thinking: {log.parameters.thinkingLevel || 'N/A'}</div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Status Bar for this log */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/50">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isProcessing ? "bg-amber-500 animate-ping" : "bg-zinc-600"
          )} />
          <span className="text-[10px] font-bold text-zinc-500 uppercase">Status: {isProcessing ? "Processing" : "Completed"}</span>
        </div>
        <div className="text-[10px] text-zinc-500">
          {new Date(log.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export const AiMonitorView: React.FC<AiMonitorViewProps> = ({
  aiLogs,
  aiStatus,
  aiStats,
  theme
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn(
      "flex flex-col h-full transition-all duration-500 ease-in-out",
      isExpanded ? "fixed inset-4 z-50 rounded-3xl shadow-2xl border-2 border-indigo-500/50" : "relative"
    )}>
      {/* Header - Removed title and icon */}
      <div className={cn(
        "p-4 border-b flex items-center justify-end rounded-t-3xl",
        theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
      )}>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "p-2 rounded-lg transition-colors text-zinc-400",
            theme === 'dark' ? "hover:bg-zinc-800" : "hover:bg-zinc-200"
          )}
          title={isExpanded ? "Thu nhỏ" : "Mở rộng toàn màn hình"}
        >
          {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      <div className={cn(
        "flex-1 overflow-y-auto flex flex-col p-4 gap-6 scrollbar-thin",
        theme === 'dark' ? "bg-black" : "bg-ivory"
      )}>
        {aiLogs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-zinc-500 text-sm">
            Chưa có lịch sử xử lý AI nào.
          </div>
        ) : (
          aiLogs.map((log, index) => (
            <AiLogBlock 
              key={log.id} 
              log={log} 
              theme={theme} 
              isLatest={index === 0}
              aiStatus={aiStatus}
              aiStats={aiStats}
            />
          ))
        )}
      </div>

      {/* Global Status Bar */}
      <div className={cn(
        "p-3 border-t flex items-center justify-between rounded-b-3xl",
        theme === 'dark' ? "bg-black border-zinc-800" : "bg-ivory-dark border-zinc-200"
      )}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              aiStatus.isProcessing ? "bg-amber-500 animate-ping" : "bg-zinc-600"
            )} />
            <span className="text-[10px] font-bold text-zinc-500 uppercase">Global Status: {aiStatus.isProcessing ? "Processing" : "Idle"}</span>
          </div>
          {aiStatus.retryCount > 0 && (
            <div className="flex items-center gap-2 text-amber-500">
              <Zap size={12} />
              <span className="text-[10px] font-bold uppercase">Retries: {aiStatus.retryCount}</span>
            </div>
          )}
        </div>
        <div className="text-[10px] text-zinc-500">
          {aiStatus.activeProxyUrl ? `Proxy: ${aiStatus.activeProxyUrl}` : "Direct Connection"}
        </div>
      </div>
    </div>
  );
};

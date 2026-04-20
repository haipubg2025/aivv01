import { useEffect, useRef } from 'react';
import { useStoryState } from './story/useStoryState';
import { useStoryUtils } from './story/useStoryUtils';
import { useStoryAiActions } from './story/useStoryAiActions';
import { useStoryCrudActions } from './story/useStoryCrudActions';
import { useBibleActions } from './story/useBibleActions';
import { useStorySettingsActions } from './story/useStorySettingsActions';
import { useStoryPersistence } from './story/useStoryPersistence';
import { AILog } from '../types';

export function useStory() {
  const states = useStoryState();
  const {
    isProxyEnabled, proxies, proxyRotationIndex, setProxyRotationIndex,
    isGeminiEnabled, geminiApiKeys, keyRotationIndex, setKeyRotationIndex,
    theme, setTheme
  } = states;

  const utils = useStoryUtils(
    isProxyEnabled, proxies, proxyRotationIndex, setProxyRotationIndex,
    isGeminiEnabled, geminiApiKeys, keyRotationIndex, setKeyRotationIndex
  );

  const bibleActions = useBibleActions(states);
  const crudActions = useStoryCrudActions(states, bibleActions);
  const aiActions = useStoryAiActions(states, utils, bibleActions, crudActions.addNotification);
  const settingsActions = useStorySettingsActions(states);
  
  useStoryPersistence(states);

  // Toggle Theme Effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Track AI Logs history - Reset and show only the latest log
  useEffect(() => {
    if (states.lastFullPrompt) {
      states.setAiLogs(() => {
        const newLog: AILog = {
          id: Date.now().toString(),
          prompt: states.lastFullPrompt,
          response: states.streamingLog,
          timestamp: Date.now(),
          isProcessing: states.aiStatus.isProcessing,
          modelName: states.selectedModel,
        };
        return [newLog];
      });
    }
  }, [states.lastFullPrompt]);

  useEffect(() => {
    states.setAiLogs(prev => {
      if (prev.length === 0) return prev;
      const newLogs = [...prev];
      newLogs[0] = {
        ...newLogs[0],
        response: states.streamingLog,
        isProcessing: states.aiStatus.isProcessing,
      };
      return newLogs;
    });
  }, [states.streamingLog, states.aiStatus.isProcessing]);

  // Hook into AI status change to auto-save to browser
  const prevIsProcessing = useRef(states.aiStatus.isProcessing);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Lưu lại trạng thái trước đó để so sánh
    const wasProcessing = prevIsProcessing.current;
    // Cập nhật ngay lập tức ref để các lần render sau (nếu có) thấy trạng thái mới
    prevIsProcessing.current = states.aiStatus.isProcessing;

    // Chỉ kích hoạt lưu khi chuyển từ Đang xử lý (true) sang Hoàn tất (false)
    if (wasProcessing && !states.aiStatus.isProcessing && !states.aiStatus.lastError) {
      // AI Process transitioned from true to false successfully
      
      // Xóa timeout cũ nếu có (bảo vệ khỏi việc lưu nhiều lần liên tiếp)
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Thêm độ trễ 0.5s theo yêu cầu người dùng (nửa giây)
      saveTimeoutRef.current = setTimeout(() => {
        crudActions.saveStoryToFile('auto-save', ' (Auto-Save)', true);
        crudActions.addNotification('Đã tự động lưu tiến trình!', 'success');
        saveTimeoutRef.current = null;
      }, 500);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [states.aiStatus.isProcessing, states.aiStatus.lastError]); // Loại bỏ crudActions khỏi dependencies để tránh vòng lặp re-render

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  
  // Font Effect
  useEffect(() => {
    document.documentElement.style.fontFamily = states.fontFamily;
    document.documentElement.style.fontSize = `${states.fontSize}px`;
  }, [states.fontFamily, states.fontSize]);

  // LED Effect
  useEffect(() => {
    const root = document.documentElement;
    const { ledColor, ledAnimationStyle } = states;

    if (ledAnimationStyle === 'none') {
      root.style.setProperty('--led-display', 'none');
      return;
    }

    root.style.setProperty('--led-display', 'block');

    // Background Gradient logic
    let background = '';
    let bgSize = '100% 100%';

    const GRADIENTS: Record<string, { stops: string, flow: string, radial: string, shadow: string }> = {
      rgb: {
        stops: '#ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000',
        flow: '#ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000',
        radial: '#ff0000, #00ff00, #0000ff',
        shadow: 'rgba(59, 130, 246, 0.5)'
      },
      cyberpunk: {
        stops: '#fceb00, #ff007f, #00f0ff, #fceb00',
        flow: '#fceb00, #ff007f, #00f0ff, #ff007f, #fceb00',
        radial: '#fceb00, #ff007f, #00f0ff',
        shadow: 'rgba(255, 0, 127, 0.5)'
      },
      sunset: {
        stops: '#ff4e50, #f9d423, #ff4e50',
        flow: '#ff4e50, #f9d423, #ff4e50',
        radial: '#ff4e50, #f9d423',
        shadow: 'rgba(255, 78, 80, 0.5)'
      },
      ocean: {
        stops: '#00c3ff, #ffff1c, #00c3ff',
        flow: '#00c3ff, #ffff1c, #00c3ff',
        radial: '#00c3ff, #ffff1c',
        shadow: 'rgba(0, 195, 255, 0.5)'
      }
    };

    const gradientDef = GRADIENTS[ledColor];

    if (gradientDef) {
      background = `conic-gradient(from var(--angle), ${gradientDef.stops})`;
      if (ledAnimationStyle === 'flow') {
        background = `linear-gradient(90deg, ${gradientDef.flow})`;
        bgSize = '200% auto';
      } else if (ledAnimationStyle === 'static' || ledAnimationStyle === 'pulse' || ledAnimationStyle === 'disco') {
        background = `linear-gradient(90deg, ${gradientDef.flow})`;
      } else if (ledAnimationStyle === 'neon') {
        background = `conic-gradient(from var(--angle), ${gradientDef.stops})`;
      } else if (ledAnimationStyle === 'liquid') {
        background = `radial-gradient(circle, ${gradientDef.radial})`;
        bgSize = '200% 200%';
      }
    } else {
      // Custom color
      background = `conic-gradient(from var(--angle), ${ledColor}, transparent, ${ledColor})`;
      if (ledAnimationStyle === 'flow') {
        background = `linear-gradient(90deg, ${ledColor}, white, ${ledColor})`;
        bgSize = '200% auto';
      } else if (ledAnimationStyle === 'static' || ledAnimationStyle === 'pulse' || ledAnimationStyle === 'disco') {
        background = ledColor;
      } else if (ledAnimationStyle === 'neon') {
        background = `conic-gradient(from var(--angle), ${ledColor}, transparent, ${ledColor})`;
      } else if (ledAnimationStyle === 'liquid') {
        background = `radial-gradient(circle, ${ledColor}, white, ${ledColor})`;
        bgSize = '200% 200%';
      }
    }

    // Animation logic
    let animation = 'none';
    if (ledAnimationStyle === 'rotate') {
      animation = 'rotate-rgb 2s linear infinite';
    } else if (ledAnimationStyle === 'flow') {
      animation = 'flow-rgb 3s linear infinite';
    } else if (ledAnimationStyle === 'pulse') {
      animation = 'pulse-rgb 2s ease-in-out infinite';
    } else if (ledAnimationStyle === 'neon') {
      animation = 'rotate-rgb 2s linear infinite';
    } else if (ledAnimationStyle === 'disco') {
      animation = 'disco-rgb 1.5s linear infinite';
    } else if (ledAnimationStyle === 'liquid') {
      animation = 'liquid-rgb 5s ease-in-out infinite';
    } else if (ledAnimationStyle === 'static') {
      animation = 'none';
    }

    root.style.setProperty('--led-background', background);
    root.style.setProperty('--led-animation', animation);
    root.style.setProperty('--led-bg-size', bgSize);
    
    // Shadow for Neon
    if (ledAnimationStyle === 'neon') {
      const shadowColor = gradientDef ? gradientDef.shadow : ledColor;
      root.style.setProperty('--led-shadow', `0 0 10px ${shadowColor}, 0 0 20px ${shadowColor}`);
    } else {
      root.style.setProperty('--led-shadow', 'none');
    }
  }, [states.ledColor, states.ledAnimationStyle]);

  // App Colors Effect
  useEffect(() => {
    const root = document.documentElement;
    if (states.appTextColor) {
      root.style.setProperty('--app-text-color', states.appTextColor);
    } else {
      root.style.removeProperty('--app-text-color');
    }

    if (states.appBgColor) {
      root.style.setProperty('--app-bg-color', states.appBgColor);
    } else {
      root.style.removeProperty('--app-bg-color');
    }
  }, [states.appTextColor, states.appBgColor]);

  return {
    ...states,
    ...aiActions,
    ...crudActions,
    ...settingsActions,
    applyBibleUpdates: bibleActions.applyBibleUpdates,
    toggleTheme
  };
}

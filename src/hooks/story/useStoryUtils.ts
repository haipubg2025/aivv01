import { useCallback } from 'react';
import { ProxyConfig, GeminiKeyConfig } from '../../types';

export function useStoryUtils(
  isProxyEnabled: boolean,
  proxies: ProxyConfig[],
  proxyRotationIndex: number,
  setProxyRotationIndex: React.Dispatch<React.SetStateAction<number>>,
  isGeminiEnabled: boolean,
  geminiApiKeys: GeminiKeyConfig[],
  keyRotationIndex: number,
  setKeyRotationIndex: React.Dispatch<React.SetStateAction<number>>
) {
  const getNextProxy = useCallback(() => {
    if (!isProxyEnabled || proxies.length === 0) return undefined;
    const proxy = proxies[proxyRotationIndex % proxies.length];
    setProxyRotationIndex(prev => (prev + 1) % proxies.length);
    return proxy;
  }, [proxies, proxyRotationIndex, isProxyEnabled, setProxyRotationIndex]);

  const getNextGeminiKey = useCallback(() => {
    if (!isGeminiEnabled) return 'DISABLED';
    const activeKeys = geminiApiKeys.filter(k => k.isActive && k.key.trim());
    if (activeKeys.length === 0) return '';
    
    const key = activeKeys[keyRotationIndex % activeKeys.length].key;
    setKeyRotationIndex(prev => (prev + 1) % activeKeys.length);
    return key;
  }, [geminiApiKeys, keyRotationIndex, isGeminiEnabled, setKeyRotationIndex]);

  return { getNextProxy, getNextGeminiKey };
}

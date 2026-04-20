import localforage from 'localforage';
import { fetchAvailableModels } from '../../lib/gemini';
import { 
  ProxyConfig, 
  GeminiKeyConfig
} from '../../types';

export function useStorySettingsActions(states: any) {
  const {
    geminiApiKeys, setGeminiApiKeys,
    proxies, setProxies,
    setSelectedModel,
    setAvailableGeminiModels,
    setIsGeminiEnabled,
    setIsProxyEnabled,
    setGeminiConfig,
    setTheme,
    setIsLoading,
    setStoryConcept,
    setGenre,
    setStoryTone,
    setCharacters,
    setWorldInfo,
    setWorldGeography,
    setWorldHistory,
    setWorldCulture,
    setWorldEconomy,
    setWorldReligion,
    setWorldFactions,
    setWorldRelationships,
    setWorldUniqueElements,
    setPowerSystem,
    setBaseOutlines,
    setReferences,
    setCodex,
    setTimeline,
    storyConcept,
    genre,
    storyTone,
    characters,
    worldInfo,
    worldGeography,
    worldHistory,
    worldCulture,
    worldEconomy,
    worldReligion,
    worldFactions,
    worldRelationships,
    worldUniqueElements,
    powerSystem,
    baseOutlines,
    references,
    codex,
    timeline,
    selectedModel,
    availableGeminiModels,
    geminiConfig,
    isGeminiEnabled,
    isProxyEnabled,
    tawaMode,
    setTawaConfig,
    theme,
    branchingSuggestion, setBranchingSuggestion,
    isRealismEnabled, setIsRealismEnabled,
    branchingSettings, setBranchingSettings,
    worldGenSettings, setWorldGenSettings,
  } = states;

  const resetApiProxy = () => {
    setGeminiApiKeys([]);
    setProxies([]);
  };

  const bulkImport = (text: string) => {
    const geminiKeyRegex = /AIza[0-9A-Za-z-_]{35}/g;
    const geminiKeysFound = Array.from(new Set(text.match(geminiKeyRegex) || []));
    let remainingText = text.replace(geminiKeyRegex, ' ');
    const proxyPairsFound: { url: string; key: string }[] = [];
    const tokens = remainingText.split(/[\n\r,;|\t]+| {2,}/).map(t => t.trim()).filter(t => t);
    
    const isProxyUrl = (s: string) => {
      const lower = s.toLowerCase();
      return lower.startsWith('http://') || 
             lower.startsWith('https://') || 
             lower.startsWith('socks4://') || 
             lower.startsWith('socks5://') ||
             /^([a-zA-Z0-9.-]+|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):\d+$/.test(s);
    };

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (isProxyUrl(token)) {
        const url = token;
        let key = '';
        if (i + 1 < tokens.length && !isProxyUrl(tokens[i + 1])) {
          key = tokens[i + 1];
          i++;
        } 
        if (url) proxyPairsFound.push({ url, key });
      } else if (i + 1 < tokens.length && isProxyUrl(tokens[i + 1])) {
        const keyCandidate = token;
        const urlCandidate = tokens[i + 1];
        if (!proxyPairsFound.some(p => p.url === urlCandidate)) {
          proxyPairsFound.push({ url: urlCandidate, key: keyCandidate });
          i++;
        }
      }
    }

    const newGeminiKeys: GeminiKeyConfig[] = [
      ...geminiApiKeys,
      ...geminiKeysFound
        .filter(key => !geminiApiKeys.some(k => k.key === key))
        .map(key => ({
          id: Math.random().toString(36).substr(2, 9),
          key,
          isActive: true
        }))
    ];

    const newProxies: ProxyConfig[] = [
      ...proxies,
      ...proxyPairsFound
        .filter(pair => !proxies.some(p => p.url === pair.url))
        .map(pair => ({
          id: Math.random().toString(36).substr(2, 9),
          url: pair.url,
          key: pair.key,
          model: 'gemini-3.1-pro-preview',
          isActive: true
        }))
    ];

    setGeminiApiKeys(newGeminiKeys);
    setProxies(newProxies);
  };

  const loadProxyModels = async () => {
    if (proxies.length === 0) return;
    setIsLoading(true);
    let loadedCount = 0;
    const updatedProxies = await Promise.all(proxies.map(async (proxy: ProxyConfig) => {
      if (!proxy.url) return proxy;
      try {
        const models = await fetchAvailableModels('', proxy);
        if (models.length > 0) {
          loadedCount++;
          return { 
            ...proxy, 
            availableModels: models,
            model: proxy.model && models.includes(proxy.model) ? proxy.model : models[0]
          };
        }
      } catch (err) {
        console.error(`Failed to load models for proxy ${proxy.url}:`, err);
      }
      return proxy;
    }));
    setProxies(updatedProxies);
    setIsLoading(false);
  };

  const resetAllSettings = async () => {
    setSelectedModel('gemini-3.1-pro-preview');
    setAvailableGeminiModels(['gemini-3.1-pro-preview', 'gemini-3-flash-preview']);
    setGeminiApiKeys([]);
    setProxies([
      { id: 'proxy-1', url: '', key: '', isActive: false },
      { id: 'proxy-2', url: '', key: '', isActive: false }
    ]);
    setIsGeminiEnabled(true);
    setIsProxyEnabled(true);
    setTawaConfig({
      primaryStyle: 'modern',
      secondaryStyle: 'raw_nsfw',
      pov: 'third_person_limited'
    });
    setGeminiConfig({
      temperature: 0.9,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 65536,
      thinkingLevel: 'HIGH'
    });
    setTheme('dark');
    await localforage.removeItem('user_settings');
  };

  const exportSetup = () => {
    const setup = {
      selectedModel,
      availableGeminiModels,
      geminiApiKeys,
      proxies,
      geminiConfig,
      isGeminiEnabled,
      isProxyEnabled,
      tawaMode,
      theme
    };
    const blob = new Blob([JSON.stringify(setup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `madaovanvo-setup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSetup = (setupJson: string) => {
    try {
      const setup = JSON.parse(setupJson);
      if (setup.selectedModel) setSelectedModel(setup.selectedModel);
      if (setup.availableGeminiModels) setAvailableGeminiModels(setup.availableGeminiModels);
      if (setup.geminiApiKeys) setGeminiApiKeys(setup.geminiApiKeys);
      if (setup.proxies) setProxies(setup.proxies);
      if (setup.geminiConfig) setGeminiConfig(setup.geminiConfig);
      if (setup.isGeminiEnabled !== undefined) setIsGeminiEnabled(setup.isGeminiEnabled);
      if (setup.isProxyEnabled !== undefined) setIsProxyEnabled(setup.isProxyEnabled);
      if (setup.theme) setTheme(setup.theme);
    } catch (error) {
      console.error("Import error:", error);
    }
  };

  const exportStoryBible = () => {
    const bible = {
      storyConcept,
      genre,
      storyTone,
      characters,
      worldInfo,
      worldGeography,
      worldHistory,
      worldCulture,
      worldEconomy,
      worldReligion,
      worldFactions,
      worldRelationships,
      worldUniqueElements,
      powerSystem,
      baseOutlines,
      references,
      codex,
      timeline,
      branchingSuggestion,
      isRealismEnabled,
      branchingSettings,
      worldGenSettings
    };
    const blob = new Blob([JSON.stringify(bible, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Tạo tên file từ concept truyện giống như tính năng save story
    const safeTitle = (storyConcept || 'story-bible')
      .slice(0, 30) // Lấy 30 ký tự đầu tiên
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
      
    a.download = `bible-${safeTitle || 'tawa'}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importStoryBible = (bibleJson: string) => {
    try {
      const bible = JSON.parse(bibleJson);
      // Cập nhật tất cả, ghi đè rỗng nếu không có dữ liệu
      setStoryConcept(bible.storyConcept || '');
      setGenre(bible.genre || '');
      setStoryTone(bible.storyTone || '');
      setCharacters(bible.characters || []);
      setWorldInfo(bible.worldInfo || '');
      setWorldGeography(bible.worldGeography || '');
      setWorldHistory(bible.worldHistory || '');
      setWorldCulture(bible.worldCulture || '');
      setWorldEconomy(bible.worldEconomy || '');
      setWorldReligion(bible.worldReligion || '');
      setWorldFactions(bible.worldFactions || '');
      setWorldRelationships(bible.worldRelationships || '');
      setWorldUniqueElements(bible.worldUniqueElements || '');
      setPowerSystem(bible.powerSystem || '');
      setBaseOutlines(bible.baseOutlines || []);
      setReferences(bible.references || []);
      setCodex(bible.codex || []);
      setTimeline(bible.timeline || []);
      setBranchingSuggestion(bible.branchingSuggestion || '');
      setIsRealismEnabled(bible.isRealismEnabled || false);
      if (bible.branchingSettings) setBranchingSettings(bible.branchingSettings);
      if (bible.worldGenSettings) setWorldGenSettings(bible.worldGenSettings);
    } catch (error) {
      console.error("Import bible error:", error);
    }
  };

  return {
    resetApiProxy,
    bulkImport,
    loadProxyModels,
    resetAllSettings,
    exportSetup,
    importSetup,
    exportStoryBible,
    importStoryBible
  };
}

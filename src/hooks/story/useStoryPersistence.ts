import { useEffect, useRef } from 'react';
import localforage from 'localforage';
import { AppSettings } from '../../types';

export function useStoryPersistence(states: any) {
  const {
    setSelectedModel,
    setAvailableGeminiModels,
    setGeminiApiKeys,
    setProxies,
    setGeminiConfig,
    setIsGeminiEnabled,
    setIsProxyEnabled,
    isBeautifyEnabled,
    setIsBeautifyEnabled,
    setTheme,
    fontFamily, setFontFamily,
    fontSize, setFontSize,
    setSavedStories,
    ledColor, setLedColor,
    ledAnimationStyle, setLedAnimationStyle,
    appTextColor, setAppTextColor,
    appBgColor, setAppBgColor,
    selectedModel,
    availableGeminiModels,
    geminiApiKeys,
    proxies,
    geminiConfig,
    isGeminiEnabled,
    isProxyEnabled,
    tawaMode,
    tawaConfig,
    setTawaConfig,
    theme,
    savedStories,
    aiStatus,
    // Current Story States
    storyConcept, setStoryConcept,
    storyTitle, setStoryTitle,
    genre, setGenre,
    protagonistType, setProtagonistType,
    storyTone, setStoryTone,
    characters, setCharacters,
    worldInfo, setWorldInfo,
    worldGeography, setWorldGeography,
    worldHistory, setWorldHistory,
    worldCulture, setWorldCulture,
    worldEconomy, setWorldEconomy,
    worldReligion, setWorldReligion,
    worldFactions, setWorldFactions,
    worldRelationships, setWorldRelationships,
    worldUniqueElements, setWorldUniqueElements,
    powerSystem, setPowerSystem,
    references, setReferences,
    codex, setCodex,
    timeline, setTimeline,
    baseOutlines, setBaseOutlines,
    baseOutlineOptions, setBaseOutlineOptions,
    selectedChapter, setSelectedChapter,
    aiInstructions, setAiInstructions,
    storyContent, setStoryContent,
    prompt, setPrompt,
    aiStats, setAiStats,
    branchingSettings, setBranchingSettings,
    branchingSuggestion, setBranchingSuggestion,
    isRealismEnabled, setIsRealismEnabled,
    worldGenTemperature, setWorldGenTemperature,
    setTawaMode,
    currentContext, setCurrentContext,
    branchingContext, setBranchingContext
  } = states;

  const hasLoaded = useRef(false);

  // Load Settings and Current Story from localforage
  useEffect(() => {
    if (hasLoaded.current) return;

    const loadData = async () => {
      try {
        // Load Settings
        const savedSettings = await localforage.getItem<AppSettings>('user_settings');
        if (savedSettings) {
          if (savedSettings.selectedModel) setSelectedModel(savedSettings.selectedModel);
          if (savedSettings.availableGeminiModels) setAvailableGeminiModels(savedSettings.availableGeminiModels);
          if (savedSettings.geminiApiKeys) setGeminiApiKeys(savedSettings.geminiApiKeys);
          if (savedSettings.proxies) setProxies(savedSettings.proxies);
          if (savedSettings.geminiConfig) setGeminiConfig(savedSettings.geminiConfig);
          if (savedSettings.isGeminiEnabled !== undefined) setIsGeminiEnabled(savedSettings.isGeminiEnabled);
          if (savedSettings.isProxyEnabled !== undefined) setIsProxyEnabled(savedSettings.isProxyEnabled);
          if (savedSettings.isBeautifyEnabled !== undefined) setIsBeautifyEnabled(savedSettings.isBeautifyEnabled);
          if (savedSettings.aiInstructions !== undefined) setAiInstructions(savedSettings.aiInstructions);
          if (savedSettings.tawaMode !== undefined) setTawaMode(savedSettings.tawaMode);
          if (savedSettings.tawaConfig) setTawaConfig(savedSettings.tawaConfig);
          if (savedSettings.theme) setTheme(savedSettings.theme);
          if (savedSettings.fontFamily) setFontFamily(savedSettings.fontFamily);
          if (savedSettings.fontSize) setFontSize(savedSettings.fontSize);
          if (savedSettings.ledColor) setLedColor(savedSettings.ledColor);
          if (savedSettings.ledAnimationStyle) setLedAnimationStyle(savedSettings.ledAnimationStyle);
          if (savedSettings.appTextColor) setAppTextColor(savedSettings.appTextColor);
          if (savedSettings.appBgColor) setAppBgColor(savedSettings.appBgColor);
          if (savedSettings.savedStories) setSavedStories(savedSettings.savedStories);
          if (savedSettings.aiStatus) states.setAiStatus(savedSettings.aiStatus);
          if (savedSettings.aiStats) states.setAiStats(savedSettings.aiStats);
          if (savedSettings.branchingSettings) setBranchingSettings(savedSettings.branchingSettings);
        }

        // Load Current Story State
        const currentStory = await localforage.getItem<any>('current_story_draft');
        if (currentStory) {
          if (currentStory.storyTitle !== undefined) setStoryTitle(currentStory.storyTitle);
          if (currentStory.storyConcept !== undefined) setStoryConcept(currentStory.storyConcept);
          if (currentStory.genre !== undefined) setGenre(currentStory.genre);
          if (currentStory.protagonistType !== undefined) setProtagonistType(currentStory.protagonistType);
          if (currentStory.storyTone !== undefined) setStoryTone(currentStory.storyTone);
          if (currentStory.branchingSuggestion !== undefined) setBranchingSuggestion(currentStory.branchingSuggestion);
          if (currentStory.isRealismEnabled !== undefined) setIsRealismEnabled(currentStory.isRealismEnabled);
          if (currentStory.worldGenTemperature !== undefined) setWorldGenTemperature(currentStory.worldGenTemperature);
          if (currentStory.characters) setCharacters(currentStory.characters);
          if (currentStory.worldInfo !== undefined) setWorldInfo(currentStory.worldInfo);
          if (currentStory.worldGeography !== undefined) setWorldGeography(currentStory.worldGeography);
          if (currentStory.worldHistory !== undefined) setWorldHistory(currentStory.worldHistory);
          if (currentStory.worldCulture !== undefined) setWorldCulture(currentStory.worldCulture);
          if (currentStory.worldEconomy !== undefined) setWorldEconomy(currentStory.worldEconomy);
          if (currentStory.worldReligion !== undefined) setWorldReligion(currentStory.worldReligion);
          if (currentStory.worldFactions !== undefined) setWorldFactions(currentStory.worldFactions);
          if (currentStory.worldRelationships !== undefined) setWorldRelationships(currentStory.worldRelationships);
          if (currentStory.worldUniqueElements !== undefined) setWorldUniqueElements(currentStory.worldUniqueElements);
          if (currentStory.powerSystem !== undefined) setPowerSystem(currentStory.powerSystem);
          if (currentStory.references) setReferences(currentStory.references);
          if (currentStory.codex) setCodex(currentStory.codex);
          if (currentStory.timeline) setTimeline(currentStory.timeline);
          if (currentStory.baseOutlines) setBaseOutlines(currentStory.baseOutlines);
          if (currentStory.baseOutlineOptions) setBaseOutlineOptions(currentStory.baseOutlineOptions);
          if (currentStory.selectedChapter) setSelectedChapter(currentStory.selectedChapter);
          if (currentStory.aiInstructions !== undefined) setAiInstructions(currentStory.aiInstructions);
          if (currentStory.aiStats !== undefined) setAiStats(currentStory.aiStats);
          if (currentStory.currentContext !== undefined) setCurrentContext(currentStory.currentContext);
          if (currentStory.branchingContext !== undefined) setBranchingContext(currentStory.branchingContext);
          if (currentStory.storyContent !== undefined) setStoryContent(currentStory.storyContent);
          if (currentStory.prompt !== undefined) setPrompt(currentStory.prompt);
          if (currentStory.branchingSettings) setBranchingSettings(currentStory.branchingSettings);
        }
        
        hasLoaded.current = true;
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    };
    loadData();
  }, [
    setSelectedModel, setAvailableGeminiModels, setGeminiApiKeys, setProxies, setGeminiConfig, 
    setIsGeminiEnabled, setIsProxyEnabled, setIsBeautifyEnabled, setTheme, setFontFamily, setFontSize, setSavedStories, 
    setTawaConfig, setStoryTitle, setStoryConcept, setGenre, setProtagonistType, setStoryTone, setBranchingSuggestion, setIsRealismEnabled, setWorldGenTemperature, setCharacters, 
    setWorldInfo, setPowerSystem, setReferences, setCodex, setTimeline, setBaseOutlines, 
    setBaseOutlineOptions, setSelectedChapter, setAiInstructions, setCurrentContext, setBranchingContext, setStoryContent, setPrompt,
    setBranchingSettings, setTawaMode, setAiStats,
    setLedColor, setLedAnimationStyle, setAppTextColor, setAppBgColor
  ]);

  // Auto-save Settings
  useEffect(() => {
    const saveSettings = async () => {
      const settings: AppSettings = {
        selectedModel,
        availableGeminiModels,
        geminiApiKeys,
        proxies,
        geminiConfig,
        isGeminiEnabled,
        isProxyEnabled,
        isBeautifyEnabled,
        aiInstructions,
        tawaMode,
        tawaConfig,
        theme,
        fontFamily,
        fontSize,
        ledColor,
        ledAnimationStyle,
        appTextColor,
        appBgColor,
        savedStories,
        aiStatus,
        aiStats,
        branchingSettings
      };
      try {
        await localforage.setItem('user_settings', settings);
      } catch (e) {
        console.error("Failed to save settings:", e);
      }
    };
    
    const timeoutId = setTimeout(() => {
      saveSettings();
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [selectedModel, geminiApiKeys, proxies, geminiConfig, isGeminiEnabled, isProxyEnabled, isBeautifyEnabled, theme, fontFamily, fontSize, ledColor, ledAnimationStyle, appTextColor, appBgColor, savedStories, availableGeminiModels, tawaMode, tawaConfig, aiInstructions]);

  // Auto-save Current Story Draft
  useEffect(() => {
    const saveDraft = async () => {
      const draft = {
        storyTitle,
        storyConcept,
        genre,
        protagonistType,
        storyTone,
        branchingSuggestion,
        isRealismEnabled,
        worldGenTemperature,
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
        references,
        codex,
        timeline,
        baseOutlines,
        baseOutlineOptions,
        aiStats,
        selectedChapter,
        aiInstructions,
        currentContext,
        branchingContext,
        storyContent,
        prompt,
        branchingSettings
      };
      try {
        await localforage.setItem('current_story_draft', draft);
      } catch (e) {
        console.error("Failed to save draft:", e);
      }
    };
    
    const timeoutId = setTimeout(() => {
      saveDraft();
    }, 1000); // Debounce for 1 second
    
    return () => clearTimeout(timeoutId);
  }, [
    storyTitle, storyConcept, genre, protagonistType, storyTone, branchingSuggestion, isRealismEnabled, worldGenTemperature, characters, worldInfo, powerSystem, 
    worldGeography, worldHistory, worldCulture, worldEconomy, worldReligion, worldFactions, worldRelationships, worldUniqueElements,
    references, codex, timeline, baseOutlines, baseOutlineOptions, selectedChapter, aiInstructions, aiStats, currentContext, branchingContext,
    storyContent, prompt, branchingSettings
  ]);
}

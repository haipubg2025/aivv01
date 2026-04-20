import React from 'react';
import { EditorView } from './EditorView';
import { CharactersView } from './CharactersView';
import { WorldView } from './WorldView';
import { OutlineView } from './OutlineView';
import { SummariesView } from './SummariesView';
import { ContextView } from './ContextView';
import { SettingsView } from './SettingsView';
import { StatsView } from './StatsView';
import { ReaderView } from './ReaderView';
import { FilesView } from './FilesView';
import { CodexView } from './CodexView';
import { TimelineView } from './TimelineView';
import { AiMonitorView } from './AiMonitorView';

interface ViewRendererProps {
  activeView: string;
  storyProps: any; // Chúng ta sẽ truyền toàn bộ kết quả từ useStory vào đây
}

export const ViewRenderer: React.FC<ViewRendererProps> = ({ activeView, storyProps }) => {
  const {
    selectedChapter, setSelectedChapter, storyContent, setStoryContent,
    setActiveView, isBeautifyEnabled, isLoading, selectChapterForWriting,
    baseOutlines, setBaseOutlines, currentChapterId, characters, addCharacter, updateCharacter,
    removeCharacter, generateCharacterAI, handleGenerateWorldDetails,
    isGeneratingWorld, storyTitle, setStoryTitle, genre, setGenre,
    protagonistType, setProtagonistType,
    storyTone, setStoryTone, storyConcept, setStoryConcept, storyGuidingPrinciple, setStoryGuidingPrinciple, 
    worldInfo, setWorldInfo,
    worldGeography, setWorldGeography,
    worldHistory, setWorldHistory,
    worldCulture, setWorldCulture,
    worldEconomy, setWorldEconomy,
    worldReligion, setWorldReligion,
    worldFactions, setWorldFactions,
    worldRelationships, setWorldRelationships,
    worldUniqueElements, setWorldUniqueElements,
    powerSystem, setPowerSystem, worldGenTemperature,
    setWorldGenTemperature, 
    basicOutlineOptions, selectBasicOutlineOption, selectedBasicOutline,
    baseOutlineOptions, selectBaseOutlineOption, references,
    addReference, removeReference, resetWorld, exportStoryBible,
    importStoryBible, undoWorldGeneration, worldGenHistory, generateNextArcs, 
    generateBasicOutlines, generateBaseOutlines, generateBasicOutlineChildren,
    handleGenerateBaseOutlines,
    generateChapterOptions, rewriteChapters, chapterOptions, setChapterOptions, currentContext,
    setCurrentContext, aiInstructions, setAiInstructions, branchingSuggestion, setBranchingSuggestion, codex,
    timeline, selectedModel, setSelectedModel, availableGeminiModels,
    proxies, setProxies, geminiApiKeys, setGeminiApiKeys,
    isGeminiEnabled, setIsGeminiEnabled, isProxyEnabled, setIsProxyEnabled,
    geminiConfig, setGeminiConfig, resetApiProxy, resetAllSettings,
    bulkImport, loadProxyModels, exportSetup, importSetup,
    tawaConfig, setTawaConfig, setIsBeautifyEnabled, aiStatus,
    savedStories, loadStoryFromFile, deleteStoryFile, importStoryFromJson,
    addCodexEntry, updateCodexEntry, removeCodexEntry, updateCodexMetadata, addTimelineEvent,
    updateTimelineEvent, removeTimelineEvent, addNotification,
    aiLogs, aiStats, theme, toggleTheme, fontFamily, setFontFamily, fontSize, setFontSize,
    branchingSettings, setBranchingSettings,
    isRealismEnabled, setIsRealismEnabled,
    worldGenSettings, setWorldGenSettings,
    generateNextArcsBranching, generateChapterBranching, regenerateRootBranching,
    ledColor, setLedColor, ledAnimationStyle, setLedAnimationStyle,
    appTextColor, setAppTextColor, appBgColor, setAppBgColor,
    recentBibleUpdate, setLastBibleUpdate
  } = storyProps;

  switch (activeView) {
    case 'editor':
      return (
        <EditorView 
          selectedChapter={selectedChapter}
          storyContent={storyContent}
          setStoryContent={setStoryContent}
          streamingContent={storyProps.streamingContent}
          setActiveView={setActiveView}
          isBeautifyEnabled={isBeautifyEnabled}
          isLoading={isLoading}
          selectChapterForWriting={selectChapterForWriting}
          baseOutlines={baseOutlines}
          setBaseOutlines={setBaseOutlines}
          currentChapterId={currentChapterId}
          applyBibleUpdates={storyProps.applyBibleUpdates}
        />
      );
    case 'characters':
      return (
        <CharactersView 
          characters={characters}
          addCharacter={addCharacter}
          updateCharacter={updateCharacter}
          removeCharacter={removeCharacter}
          generateCharacterAI={generateCharacterAI}
          isLoading={isLoading}
        />
      );
    case 'world':
      return (
        <WorldView 
          addNotification={addNotification}
          storyTitle={storyTitle}
          setStoryTitle={setStoryTitle}
          genre={genre}
          setGenre={setGenre}
          protagonistType={protagonistType}
          setProtagonistType={setProtagonistType}
          storyTone={storyTone}
          setStoryTone={setStoryTone}
          storyConcept={storyConcept}
          setStoryConcept={setStoryConcept}
          storyGuidingPrinciple={storyGuidingPrinciple}
          setStoryGuidingPrinciple={setStoryGuidingPrinciple}
          worldInfo={worldInfo}
          setWorldInfo={setWorldInfo}
          worldGeography={worldGeography}
          setWorldGeography={setWorldGeography}
          worldHistory={worldHistory}
          setWorldHistory={setWorldHistory}
          worldCulture={worldCulture}
          setWorldCulture={setWorldCulture}
          worldEconomy={worldEconomy}
          setWorldEconomy={setWorldEconomy}
          worldReligion={worldReligion}
          setWorldReligion={setWorldReligion}
          worldFactions={worldFactions}
          setWorldFactions={setWorldFactions}
          worldRelationships={worldRelationships}
          setWorldRelationships={setWorldRelationships}
          worldUniqueElements={worldUniqueElements}
          setWorldUniqueElements={setWorldUniqueElements}
          powerSystem={powerSystem}
          setPowerSystem={setPowerSystem}
          handleGenerateWorldDetails={handleGenerateWorldDetails}
          generateSpecificWorldField={storyProps.generateSpecificWorldField}
          undoWorldGeneration={undoWorldGeneration}
          worldGenHistory={worldGenHistory}
          isGeneratingWorld={isGeneratingWorld}
          worldGenTemperature={worldGenTemperature}
          setWorldGenTemperature={setWorldGenTemperature}
          generateBasicOutlines={generateBasicOutlines}
          generateBaseOutlines={generateBaseOutlines}
          baseOutlineOptions={baseOutlineOptions}
          selectBaseOutlineOption={selectBaseOutlineOption}
          references={references}
          addReference={addReference}
          removeReference={removeReference}
          resetWorld={resetWorld}
          exportStoryBible={exportStoryBible}
          importStoryBible={importStoryBible}
          baseOutlines={baseOutlines}
          selectedBasicOutline={selectedBasicOutline}
          branchingSettings={branchingSettings}
          setBranchingSettings={setBranchingSettings}
          branchingSuggestion={branchingSuggestion}
          setBranchingSuggestion={setBranchingSuggestion}
          basicOutlineOptions={basicOutlineOptions}
          selectBasicOutlineOption={selectBasicOutlineOption}
          generateBasicOutlineChildren={generateBasicOutlineChildren}
          regenerateRootBranching={regenerateRootBranching}
          totalLevels={branchingSettings.totalLevels}
          isRealismEnabled={isRealismEnabled}
          setIsRealismEnabled={setIsRealismEnabled}
          worldGenSettings={worldGenSettings}
          setWorldGenSettings={setWorldGenSettings}
          theme={theme}
        />
      );
    case 'outline':
      return (
        <OutlineView 
          baseOutlines={baseOutlines}
          setBaseOutlines={setBaseOutlines}
          basicOutlineOptions={basicOutlineOptions}
          selectBasicOutlineOption={selectBasicOutlineOption}
          selectedBasicOutline={selectedBasicOutline}
          baseOutlineOptions={baseOutlineOptions}
          selectBaseOutlineOption={selectBaseOutlineOption}
          chapterOptions={chapterOptions}
          setChapterOptions={setChapterOptions}
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
          setActiveView={setActiveView}
          generateChapterOptions={generateChapterOptions}
          rewriteChapters={rewriteChapters}
          generateNextArcs={generateNextArcs}
          handleGenerateBaseOutlines={handleGenerateBaseOutlines}
          generateBasicOutlineChildren={generateBasicOutlineChildren}
          selectChapterForWriting={selectChapterForWriting}
          totalLevels={branchingSettings.totalLevels}
          generateNextArcsBranching={generateNextArcsBranching}
          generateChapterBranching={generateChapterBranching}
          regenerateRootBranching={regenerateRootBranching}
          branchingSettings={branchingSettings}
          branchingSuggestion={branchingSuggestion}
          setBranchingSuggestion={setBranchingSuggestion}
          isGeneratingWorld={isGeneratingWorld}
          theme={theme}
          recentBibleUpdate={recentBibleUpdate}
          setLastBibleUpdate={setLastBibleUpdate}
        />
      );
    case 'summaries':
      return <SummariesView baseOutlines={baseOutlines} theme={theme} />;
    case 'context':
      return (
        <ContextView 
          currentContext={currentContext}
          setCurrentContext={setCurrentContext}
          aiInstructions={aiInstructions}
          setAiInstructions={setAiInstructions}
          storyTitle={storyTitle}
          storyConcept={storyConcept}
          storyGuidingPrinciple={storyGuidingPrinciple}
          genre={genre}
          storyTone={storyTone}
          worldInfo={worldInfo}
          powerSystem={powerSystem}
          charactersCount={characters.length}
          codexCount={codex.length}
          timelineCount={timeline.length}
          theme={theme}
        />
      );
    case 'settings':
      return (
        <SettingsView 
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          availableGeminiModels={availableGeminiModels}
          proxies={proxies}
          setProxies={setProxies}
          geminiApiKeys={geminiApiKeys}
          setGeminiApiKeys={setGeminiApiKeys}
          isGeminiEnabled={isGeminiEnabled}
          setIsGeminiEnabled={setIsGeminiEnabled}
          isProxyEnabled={isProxyEnabled}
          setIsProxyEnabled={setIsProxyEnabled}
          geminiConfig={geminiConfig}
          setGeminiConfig={setGeminiConfig}
          resetApiProxy={resetApiProxy}
          resetAllSettings={resetAllSettings}
          bulkImport={bulkImport}
          loadProxyModels={loadProxyModels}
          exportSetup={exportSetup}
          importSetup={importSetup}
          tawaConfig={tawaConfig}
          setTawaConfig={setTawaConfig}
          isBeautifyEnabled={isBeautifyEnabled}
          setIsBeautifyEnabled={setIsBeautifyEnabled}
          theme={theme}
          toggleTheme={toggleTheme}
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
      );
    case 'stats':
      return (
        <StatsView 
          storyContent={storyContent}
          characters={characters}
          baseOutlines={baseOutlines}
          theme={theme}
        />
      );
    case 'reader':
      return (
        <ReaderView 
          content={storyContent} 
          isBeautifyEnabled={isBeautifyEnabled}
          baseOutlines={baseOutlines}
          setBaseOutlines={setBaseOutlines}
          setStoryContent={setStoryContent}
          theme={theme}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      );
    case 'files':
      return (
        <FilesView 
          addNotification={addNotification}
          savedStories={savedStories}
          loadStoryFromFile={loadStoryFromFile}
          deleteStoryFile={deleteStoryFile}
          importStoryFromJson={importStoryFromJson}
          theme={theme}
        />
      );
    case 'codex':
      return (
        <CodexView 
          codex={codex}
          addCodexEntry={addCodexEntry}
          updateCodexEntry={updateCodexEntry}
          removeCodexEntry={removeCodexEntry}
          updateCodexMetadata={updateCodexMetadata}
          theme={theme}
        />
      );
    case 'timeline':
      return (
        <TimelineView 
          timeline={timeline}
          addTimelineEvent={addTimelineEvent}
          updateTimelineEvent={updateTimelineEvent}
          removeTimelineEvent={removeTimelineEvent}
          theme={theme}
        />
      );
    case 'ai-monitor':
      return (
        <AiMonitorView 
          aiLogs={aiLogs}
          aiStatus={aiStatus}
          aiStats={aiStats}
          theme={theme}
        />
      );
    default:
      return null;
  }
};

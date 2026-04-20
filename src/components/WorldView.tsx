import React from 'react';
import { ReferenceMaterial, BasicOutlineOption } from '../types';
import { WorldHeader } from './world/WorldHeader';
import { BasicInfoSection } from './world/BasicInfoSection';
import { ConceptSection } from './world/ConceptSection';
import { WorldDetailsSection } from './world/WorldDetailsSection';
import { BasicOutlineOptionSelector } from './world/BasicOutlineOptionSelector';
import { BaseOutlineOptionSelector } from './world/BaseOutlineOptionSelector';

interface WorldViewProps {
  storyTitle: string;
  setStoryTitle: (val: string) => void;
  genre: string;
  setGenre: (val: string) => void;
  protagonistType: string;
  setProtagonistType: (val: string) => void;
  storyTone: string;
  setStoryTone: (val: string) => void;
  storyConcept: string;
  setStoryConcept: (val: string) => void;
  storyGuidingPrinciple: string;
  setStoryGuidingPrinciple: (val: string) => void;
  worldInfo: string;
  setWorldInfo: (val: string) => void;
  worldGeography: string;
  setWorldGeography: (val: string) => void;
  worldHistory: string;
  setWorldHistory: (val: string) => void;
  worldCulture: string;
  setWorldCulture: (val: string) => void;
  worldEconomy: string;
  setWorldEconomy: (val: string) => void;
  worldReligion: string;
  setWorldReligion: (val: string) => void;
  worldFactions: string;
  setWorldFactions: (val: string) => void;
  worldRelationships: string;
  setWorldRelationships: (val: string) => void;
  worldUniqueElements: string;
  setWorldUniqueElements: (val: string) => void;
  powerSystem: string;
  setPowerSystem: (val: string) => void;
  handleGenerateWorldDetails: () => void;
  undoWorldGeneration: () => void;
  worldGenHistory: any[];
  isGeneratingWorld: boolean;
  worldGenTemperature: number;
  setWorldGenTemperature: (val: number) => void;
  generateSpecificWorldField?: (fieldName: string, fieldLabel: string, setterFn: (val: string) => void) => Promise<void>;
  generateBasicOutlines: () => void;
  generateBaseOutlines: () => void;
  baseOutlineOptions: any[];
  selectBaseOutlineOption: (option: any) => void;
  references: ReferenceMaterial[];
  addReference: (ref: ReferenceMaterial) => void;
  removeReference: (id: string) => void;
  resetWorld: () => void;
  exportStoryBible: () => void;
  importStoryBible: (bibleJson: string) => void;
  baseOutlines: any[];
  selectedBasicOutline: any | null;
  branchingSettings: {
    branchesPerLevel: number;
    totalLevels: number;
  };
  setBranchingSettings: (val: { branchesPerLevel: number; totalLevels: number }) => void;
  branchingSuggestion: string;
  setBranchingSuggestion: (val: string) => void;
  basicOutlineOptions: BasicOutlineOption[];
  selectBasicOutlineOption: (option: BasicOutlineOption | BasicOutlineOption[]) => void;
  generateBasicOutlineChildren?: (option: BasicOutlineOption, level: number, customBranches?: number, customTotalLevels?: number) => Promise<BasicOutlineOption[] | null>;
  regenerateRootBranching?: () => Promise<void>;
  totalLevels: number;
  isRealismEnabled: boolean;
  setIsRealismEnabled: (val: boolean) => void;
  worldGenSettings: {
    characterCount: number;
    outlineOptionCount: number;
    codexCount: number;
    timelineCount: number;
    chapterVersionCount: number;
  };
  setWorldGenSettings: (val: { 
    characterCount: number; 
    outlineOptionCount: number;
    codexCount: number;
    timelineCount: number;
    chapterVersionCount: number;
  }) => void;
  addNotification: (message: string, type?: any) => void;
  theme: 'light' | 'dark';
}

export const WorldView: React.FC<WorldViewProps> = ({
  storyTitle,
  setStoryTitle,
  genre,
  setGenre,
  storyTone,
  setStoryTone,
  storyConcept,
  setStoryConcept,
  storyGuidingPrinciple,
  setStoryGuidingPrinciple,
  worldInfo,
  setWorldInfo,
  worldGeography,
  setWorldGeography,
  worldHistory,
  setWorldHistory,
  worldCulture,
  setWorldCulture,
  worldEconomy,
  setWorldEconomy,
  worldReligion,
  setWorldReligion,
  worldFactions,
  setWorldFactions,
  worldRelationships,
  setWorldRelationships,
  worldUniqueElements,
  setWorldUniqueElements,
  powerSystem,
  setPowerSystem,
  protagonistType,
  setProtagonistType,
  handleGenerateWorldDetails,
  generateSpecificWorldField,
  undoWorldGeneration,
  worldGenHistory,
  isGeneratingWorld,
  generateBasicOutlines,
  generateBaseOutlines,
  references,
  addReference,
  removeReference,
  resetWorld,
  exportStoryBible,
  importStoryBible,
  selectedBasicOutline,
  branchingSettings,
  setBranchingSettings,
  branchingSuggestion,
  setBranchingSuggestion,
  basicOutlineOptions,
  selectBasicOutlineOption,
  generateBasicOutlineChildren,
  regenerateRootBranching,
  totalLevels,
  isRealismEnabled,
  setIsRealismEnabled,
  worldGenSettings,
  setWorldGenSettings,
  baseOutlineOptions,
  selectBaseOutlineOption,
  baseOutlines,
  addNotification,
  theme
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const bibleImportRef = React.useRef<HTMLInputElement>(null);

  const handleBibleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        importStoryBible(text);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isImage = file.type.startsWith('image/');
      const isText = file.type.startsWith('text/') || 
                     file.name.endsWith('.md') || 
                     file.name.endsWith('.markdown') || 
                     file.name.endsWith('.json') || 
                     file.name.endsWith('.csv') ||
                     file.name.endsWith('.log');

      if (!isImage && !isText) {
        addNotification(`Tệp ${file.name} không được hỗ trợ. Chỉ hỗ trợ các loại ảnh và tệp văn bản (txt, md, json, csv...).`, "error");
        continue;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        addReference({
          id: Math.random().toString(36).substr(2, 9),
          type: isImage ? 'image' : 'text',
          name: file.name,
          content: content
        });
      };

      if (isImage) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-8">
      <input 
        type="file" 
        accept=".json" 
        className="hidden" 
        ref={bibleImportRef}
        onChange={handleBibleImport}
      />
      <input 
        type="file" 
        multiple 
        accept="image/*,text/*,.md,.markdown,.json,.csv,.log" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <WorldHeader 
        handleGenerateWorldDetails={handleGenerateWorldDetails}
        undoWorldGeneration={undoWorldGeneration}
        generateBaseOutlines={generateBaseOutlines}
        worldGenHistory={worldGenHistory}
        isGeneratingWorld={isGeneratingWorld}
        generateBasicOutlines={generateBasicOutlines}
        storyConcept={storyConcept}
        resetWorld={resetWorld}
        exportStoryBible={exportStoryBible}
        bibleImportRef={bibleImportRef}
        selectedBasicOutline={selectedBasicOutline}
        branchingSettings={branchingSettings}
        setBranchingSettings={setBranchingSettings}
        branchingSuggestion={branchingSuggestion}
        setBranchingSuggestion={setBranchingSuggestion}
        isRealismEnabled={isRealismEnabled}
        setIsRealismEnabled={setIsRealismEnabled}
        worldGenSettings={worldGenSettings}
        setWorldGenSettings={setWorldGenSettings}
        theme={theme}
        genre={genre}
      />

      {basicOutlineOptions.length > 0 && (
        <BasicOutlineOptionSelector 
          basicOutlineOptions={basicOutlineOptions}
          selectBasicOutlineOption={selectBasicOutlineOption}
          selectedBasicOutline={selectedBasicOutline}
          generateBasicOutlineChildren={generateBasicOutlineChildren}
          regenerateRootBranching={regenerateRootBranching}
          totalLevels={totalLevels}
          branchingSettings={branchingSettings}
          branchingSuggestion={branchingSuggestion}
          setBranchingSuggestion={setBranchingSuggestion}
          theme={theme}
        />
      )}

      {baseOutlineOptions.length > 0 && (
        <BaseOutlineOptionSelector 
          baseOutlineOptions={baseOutlineOptions}
          selectBaseOutlineOption={selectBaseOutlineOption}
          baseOutlines={baseOutlines}
          theme={theme}
        />
      )}

      <div className="grid grid-cols-1 gap-8">
        <BasicInfoSection 
          storyTitle={storyTitle}
          setStoryTitle={setStoryTitle}
          storyConcept={storyConcept}
          setStoryConcept={setStoryConcept}
          genre={genre}
          setGenre={setGenre}
          protagonistType={protagonistType}
          setProtagonistType={setProtagonistType}
          storyTone={storyTone}
          setStoryTone={setStoryTone}
          references={references}
          removeReference={removeReference}
          fileInputRef={fileInputRef}
          generateSpecificWorldField={generateSpecificWorldField}
          isGeneratingWorld={isGeneratingWorld}
          theme={theme}
        />

        <ConceptSection 
          storyGuidingPrinciple={storyGuidingPrinciple}
          setStoryGuidingPrinciple={setStoryGuidingPrinciple}
          generateSpecificWorldField={generateSpecificWorldField}
          isGeneratingWorld={isGeneratingWorld}
          theme={theme}
        />

        <WorldDetailsSection 
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
          generateSpecificWorldField={generateSpecificWorldField}
          isGeneratingWorld={isGeneratingWorld}
          theme={theme}
        />
      </div>
    </div>
  );
};

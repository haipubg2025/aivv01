// Hooks
import { useStory } from './hooks/useStory';

// Components
import { MainLayout } from './components/MainLayout';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { InputArea } from './components/InputArea';
import { BibleUpdateModal } from './components/BibleUpdateModal';
import { ViewRenderer } from './components/ViewRenderer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';

export default function App() {
  const storyProps = useStory();
  const {
    isLeftSidebarOpen, setIsLeftSidebarOpen,
    isRightSidebarOpen, setIsRightSidebarOpen,
    activeView, setActiveView,
    theme,
    setStoryContent,
    isLoading,
    stopGeneration,
    saveStory,
    aiStats,
    aiStatus,
    lastBibleUpdate,
    setLastBibleUpdate,
    currentChapterId,
    baseOutlines,
    setBaseOutlines,
    codex,
    timeline,
    characters,
    applyBibleUpdates
  } = storyProps;

  const currentChapter = baseOutlines.flatMap(bo => bo.chapters).find(c => c.id === currentChapterId);
  const currentVersionIndex = currentChapter?.selectedVersionIndex || 0;
  const versions = currentChapter?.versionBibleUpdates || [];

  const handleVersionChange = (index: number) => {
    if (!currentChapter) return;
    
    const newVersion = currentChapter.versions[index];
    const newBibleUpdate = currentChapter.versionBibleUpdates ? currentChapter.versionBibleUpdates[index] : null;
    
    setBaseOutlines(prevBaseOutlines => {
      const newBaseOutlines = prevBaseOutlines.map(baseOutline => ({
        ...baseOutline,
        chapters: baseOutline.chapters.map(chapter => {
          if (chapter.id === currentChapterId) {
            return { ...chapter, content: newVersion, selectedVersionIndex: index };
          }
          return chapter;
        })
      }));

      // Rebuild storyContent
      let fullContent = "";
      newBaseOutlines.forEach(baseOutline => {
        baseOutline.chapters.forEach(chapter => {
          if (chapter.content) {
            fullContent += (fullContent ? '\n\n' : '') + chapter.content;
          }
        });
      });
      setStoryContent(fullContent);

      return newBaseOutlines;
    });

    // Cập nhật storyContent
    // Rebuild storyContent logic is complex, but EditorView already handles it.
    // However, we want the modal to stay open and just update its content.
    if (newBibleUpdate !== undefined) {
      setLastBibleUpdate(newBibleUpdate);
    }
  };

  return (
    <ErrorBoundary theme={theme}>
      <TooltipProvider>
        <MainLayout
        theme={theme}
        header={
          <Header 
            theme={theme}
            isLeftSidebarOpen={isLeftSidebarOpen}
            setIsLeftSidebarOpen={setIsLeftSidebarOpen}
            isRightSidebarOpen={isRightSidebarOpen}
            setIsRightSidebarOpen={setIsRightSidebarOpen}
            saveStory={saveStory}
            stopGeneration={stopGeneration}
            isLoading={isLoading}
            aiStatus={aiStatus}
          />
        }
        leftSidebar={
          <Sidebar 
            side="left"
            isOpen={isLeftSidebarOpen}
            theme={theme}
            activeView={activeView}
            setActiveView={setActiveView}
            aiStatus={aiStatus}
            baseOutlines={baseOutlines}
            codexCount={codex?.length || 0}
            timelineCount={timeline?.length || 0}
            characterCount={characters?.length || 0}
          />
        }
        rightSidebar={
          <Sidebar 
            side="right"
            isOpen={isRightSidebarOpen}
            theme={theme}
            activeView={activeView}
            setActiveView={setActiveView}
            aiStats={aiStats}
            aiStatus={aiStatus}
          />
        }
        footer={activeView === 'editor' ? (
          <InputArea 
            theme={theme}
            prompt={storyProps.prompt}
            setPrompt={storyProps.setPrompt}
            handleGenerate={storyProps.handleGenerate}
            handleContinue={storyProps.handleContinue}
            handleRewrite={storyProps.handleRewrite}
            handleWriteNextChapter={storyProps.handleWriteNextChapter}
            stopGeneration={stopGeneration}
            isLoading={isLoading}
            setStoryContent={setStoryContent}
            currentChapterId={currentChapterId}
            baseOutlines={baseOutlines}
            worldGenSettings={storyProps.worldGenSettings}
          />
        ) : undefined}
      >
        <BibleUpdateModal 
          update={lastBibleUpdate}
          onClose={() => {
            if (lastBibleUpdate) {
              applyBibleUpdates(lastBibleUpdate, false);
            }
            setLastBibleUpdate(null);
          }}
          theme={theme}
          versions={versions}
          currentVersionIndex={currentVersionIndex}
          onVersionChange={handleVersionChange}
        />
        
        <ViewRenderer activeView={activeView} storyProps={storyProps} />
        
        <Toaster 
          position="bottom-right" 
          theme={theme}
          richColors
          expand={false}
        />
      </MainLayout>
      </TooltipProvider>
    </ErrorBoundary>
  );
}

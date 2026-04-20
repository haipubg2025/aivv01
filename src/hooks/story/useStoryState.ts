import { useEffect } from 'react';
import { useStoryStore } from '../../store/useStoryStore';

export function useStoryState() {
  const store = useStoryStore();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      store.setIsLeftSidebarOpen(!isMobile);
      store.setIsRightSidebarOpen(!isMobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...store,
    // Add additional derived state or local state if any (none for now)
  };
}

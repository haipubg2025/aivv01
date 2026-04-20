import React from 'react';
import { cn } from '../lib/utils';
import { Theme } from '../types';

import { ScrollArea } from './ui/scroll-area';

interface MainLayoutProps {
  theme: Theme;
  header: React.ReactNode;
  leftSidebar: React.ReactNode;
  rightSidebar: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  theme,
  header,
  leftSidebar,
  rightSidebar,
  children,
  footer
}) => {
  return (
    <div className={cn(
      "h-screen flex flex-col transition-colors duration-300 overflow-hidden",
      theme === 'dark' ? "dark" : "",
      "bg-[var(--app-bg-color,var(--background))] text-[var(--app-text-color,var(--foreground))]"
    )}>
      {header}

      <div className="flex-1 flex overflow-hidden">
        {leftSidebar}

        <main className="flex-1 flex flex-col min-w-0 relative">
          <ScrollArea id="main-scroll-container" className="flex-1 h-full">
            <div className="p-4 md:p-8 w-full max-w-7xl mx-auto min-h-full">
              {children}
            </div>
          </ScrollArea>

          {footer}
        </main>

        {rightSidebar}
      </div>
    </div>
  );
};

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  minRows?: number;
  maxRows?: number;
}

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ 
  value, 
  className, 
  minRows = 2, 
  maxRows = 100, 
  ...props 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Small reset to auto to calculate scrollHeight correctly
      textarea.style.height = 'auto';
      
      const computedStyle = window.getComputedStyle(textarea);
      
      // Better line height detection
      let lineHeight = parseFloat(computedStyle.lineHeight);
      if (isNaN(lineHeight)) {
        // If lineHeight is "normal", estimate it based on fontSize
        const fontSize = parseFloat(computedStyle.fontSize);
        lineHeight = fontSize * 1.2;
      }
      
      const paddingTop = parseInt(computedStyle.paddingTop) || 0;
      const paddingBottom = parseInt(computedStyle.paddingBottom) || 0;
      const borderTop = parseInt(computedStyle.borderTopWidth) || 0;
      const borderBottom = parseInt(computedStyle.borderBottomWidth) || 0;
      
      const verticalPadding = paddingTop + paddingBottom;
      const borderPadding = borderTop + borderBottom;
      
      // Calculate minHeight and maxHeight including borders as we use border-box
      const minHeight = (lineHeight * minRows) + verticalPadding + borderPadding;
      const maxHeight = (lineHeight * maxRows) + verticalPadding + borderPadding;
      
      // Measure content height (scrollHeight includes padding but not border)
      const scrollHeight = textarea.scrollHeight;
      
      // Force height to minHeight if content is small
      const targetHeight = scrollHeight + borderPadding;
      const newHeight = Math.max(Math.min(targetHeight, maxHeight), minHeight);
      
      textarea.style.height = `${newHeight}px`;
      
      // Toggle overflow based on content vs maxHeight
      if (scrollHeight > maxHeight) {
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.overflowY = 'hidden';
      }
    }
  };

  useLayoutEffect(() => {
    resizeTextarea();
  }, [value]);

  useEffect(() => {
    // Initial delay for render stabilization
    const timeoutId = setTimeout(resizeTextarea, 10);
    window.addEventListener('resize', resizeTextarea);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', resizeTextarea);
    };
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      rows={minRows}
      className={cn("resize-none overflow-hidden custom-scrollbar", className)}
      {...props}
    />
  );
};

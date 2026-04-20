import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface BeautifiedContentProps {
  content: string;
  fontSize?: number;
  fontFamily?: string;
}

export const BeautifiedContent: React.FC<BeautifiedContentProps> = ({ content, fontSize, fontFamily }) => {
  if (!content) return null;

  // Lọc bỏ các thẻ bao ngoài như <content>, <summary>
  // Giữ lại thẻ <n> để rehype-raw chuyển thành HTML node
  const filteredContent = content
    .replace(/<\/?content>/g, '')
    .replace(/<summary>[\s\S]*?<\/summary>/g, '')
    .replace(/<\/?summary>/g, '')
    .replace(/^(?:\s*[-*_ ]{3,}\s*)$/gm, '')
    .replace(/^(?:\s*\*\*[-*_ ]{3,}\*\*)$/gm, '');

  // Xử lý block level
  const blocks = filteredContent.split(/(?:\r?\n){2,}/);
  const processedBlocks = blocks.map(block => {
    let cleanBlock = block.trim();
    if (!cleanBlock || /^(?:[-*_ ]{3,})$/.test(cleanBlock)) return '';
    
    // Nhận diện block dựa trên ký tự đầu tiên
    if (/^[-"“‘]/.test(cleanBlock)) {
      return `<dialogue>\n\n${cleanBlock}\n\n</dialogue>`;
    } else if (/^\*\*/.test(cleanBlock) || /^#/.test(cleanBlock)) {
      // Hủy bỏ nếu chỉ chứa các dấu gạch trang trí
      if (/^\*\*\s*[-*_ ]{3,}\s*\*\*$/.test(cleanBlock)) return '';
      return `<system>\n\n${cleanBlock}\n\n</system>`;
    } else if (/^\[/.test(cleanBlock)) {
      return `<soundblock>\n\n${cleanBlock}\n\n</soundblock>`;
    } else if (/^\(/.test(cleanBlock)) {
      return `<thoughtblock>\n\n${cleanBlock}\n\n</thoughtblock>`;
    } else if (/^«/.test(cleanBlock)) {
      return `<telepathyblock>\n\n${cleanBlock}\n\n</telepathyblock>`;
    } else if (/^~/.test(cleanBlock)) {
      return `<songblock>\n\n${cleanBlock}\n\n</songblock>`;
    }
    
    return cleanBlock;
  });

  let preprocessed = processedBlocks.join('\n\n');

  // Inline replacements: Âm thanh và Tiếng lòng
  // Không match các thẻ markdown link [text](url) (tránh ngoặc tròn liền sau)
  preprocessed = preprocessed.replace(/(?<!\])\(([^)]+)\)/g, '<thought>($1)</thought>');
  preprocessed = preprocessed.replace(/\[([^\]]+)\](?!\()/g, '<sound>[$1]</sound>');
  preprocessed = preprocessed.replace(/«([^»]+)»/g, '<telepathy>«$1»</telepathy>');
  preprocessed = preprocessed.replace(/~([^~]+)~/g, '<song>~$1~</song>');

  return (
    <div 
      className="beautified-story-content text-zinc-300"
      style={{
        fontSize: fontSize ? `${fontSize}px` : undefined,
        fontFamily: fontFamily || undefined
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, ...props}) => (
            <div className="py-12 text-center animate-in fade-in zoom-in duration-1000">
              <h1 {...props} className="text-xl md:text-2xl font-black text-zinc-100 tracking-tighter uppercase" />
            </div>
          ),
          h2: ({node, ...props}) => <h2 {...props} className="text-xl font-bold text-indigo-400 mt-10 mb-6 pb-2" />,
          h3: ({node, ...props}) => <h3 {...props} className="text-lg font-bold text-zinc-200 mt-8 mb-4" />,
          h4: ({node, ...props}) => <h4 {...props} className="text-base font-bold text-zinc-400 mt-6 mb-3" />,
          
          hr: () => null,

          // Render paragraph mặc định, màu chữ sẽ được kế thừa từ component cha
          p: ({node, children, ...props}) => (
            <p className="leading-relaxed text-justify mb-4 last:mb-0" {...props}>
              {children}
            </p>
          ),

          // Custom Block Wrappers
          dialogue: ({node, children, ...props}: any) => {
            if (!children || (Array.isArray(children) && children.length === 0)) return null;
            return (
              <div className="my-4 animate-in slide-in-from-left-2 duration-500 text-sky-400 font-medium" {...props}>
                {children}
              </div>
            );
          },
          system: ({node, children, ...props}: any) => {
            if (!children || (Array.isArray(children) && children.length === 0)) return null;
            return (
              <div className="p-5 rounded-2xl bg-amber-500/5 shadow-inner animate-in zoom-in-95 duration-500 my-6" {...props}>
                <div className="text-amber-200 tracking-wide">
                  {children}
                </div>
              </div>
            );
          },
          soundblock: ({node, children, ...props}: any) => {
            if (!children || (Array.isArray(children) && children.length === 0)) return null;
            return (
              <div className="text-orange-400/90 font-medium italic py-2 animate-in fade-in duration-700" {...props}>
                {children}
              </div>
            );
          },
          thoughtblock: ({node, children, ...props}: any) => {
            if (!children || (Array.isArray(children) && children.length === 0)) return null;
            return (
              <div className="text-fuchsia-400/90 italic py-2 animate-in fade-in duration-700" {...props}>
                {children}
              </div>
            );
          },
          telepathyblock: ({node, children, ...props}: any) => {
            if (!children || (Array.isArray(children) && children.length === 0)) return null;
            return (
              <div className="text-emerald-400/90 font-medium py-2 animate-in fade-in duration-700" {...props}>
                {children}
              </div>
            );
          },
          songblock: ({node, children, ...props}: any) => {
            if (!children || (Array.isArray(children) && children.length === 0)) return null;
            return (
              <div className="text-lime-400/90 italic py-2 animate-in fade-in duration-700" {...props}>
                {children}
              </div>
            );
          },

          // Custom Inline Highlights
          n: ({node, children, ...props}: any) => (
            <span className="text-cyan-400/90 font-medium" {...props}>{children}</span>
          ),
          strong: ({node, children, ...props}: any) => (
            <strong className="text-amber-400 font-bold" {...props}>{children}</strong>
          ),
          sound: ({node, children, ...props}: any) => (
            <span className="text-orange-400 font-medium" {...props}>{children}</span>
          ),
          thought: ({node, children, ...props}: any) => (
            <span className="text-fuchsia-400/90 italic" {...props}>{children}</span>
          ),
          telepathy: ({node, children, ...props}: any) => (
            <span className="text-emerald-400 font-medium" {...props}>{children}</span>
          ),
          song: ({node, children, ...props}: any) => (
            <span className="text-lime-400 italic" {...props}>{children}</span>
          )
        } as any}
      >
        {preprocessed}
      </ReactMarkdown>
    </div>
  );
};


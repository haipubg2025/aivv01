import { REALISM_MODERN_PROMPTS } from './modern';
import { REALISM_XIANXIA_PROMPTS } from './xianxia';
import { REALISM_FANTASY_PROMPTS } from './fantasy';
import { REALISM_ANCIENT_PROMPTS } from './ancient';

export * from './modern';
export * from './xianxia';
export * from './fantasy';
export * from './ancient';

export const ALL_REALISM_RULES = `
${REALISM_MODERN_PROMPTS}
${REALISM_XIANXIA_PROMPTS}
${REALISM_FANTASY_PROMPTS}
${REALISM_ANCIENT_PROMPTS}
`;

export const getRealismRules = (genre: string): string => {
  const g = genre.toLowerCase();
  if (g.includes('hiện đại') || g.includes('hiên đai') || g.includes('vườn trường') || g.includes('đô thị')) {
    return REALISM_MODERN_PROMPTS;
  }
  if (g.includes('tiên hiệp') || g.includes('tu tiên') || g.includes('kiếm hiệp') || g.includes('võ hiệp')) {
    return REALISM_XIANXIA_PROMPTS;
  }
  if (g.includes('fantasy') || g.includes('fantasie') || g.includes('dị giới') || g.includes('isekai') || g.includes('phương tây')) {
    return REALISM_FANTASY_PROMPTS;
  }
  if (g.includes('cổ đại') || g.includes('cung đấu') || g.includes('phong kiến')) {
    return REALISM_ANCIENT_PROMPTS;
  }
  
  // Default to concatenating all if genre is unknown, but prefacing that it's a general set
  return `
  --- QUY TẮC THỰC TẾ (REALISM) CHO THỂ LOẠI "${genre}" ---
  ${ALL_REALISM_RULES}
  `;
};

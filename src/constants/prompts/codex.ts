import { TawaConfig, ReferenceMaterial } from '../../types';
import { getTawaSystemInstruction } from './system';
import { getGenreDescriptions } from '../genres';

export const getCodexAiPrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  worldInfo: string,
  worldGeography: string,
  worldHistory: string,
  worldCulture: string,
  worldEconomy: string,
  worldReligion: string,
  worldFactions: string,
  worldRelationships: string,
  worldUniqueElements: string,
  powerSystem: string,
  genre: string,
  storyTone: string,
  storyConcept: string,
  storyGuidingPrinciple: string,
  codexTitle: string,
  codexCategory: string,
  references: ReferenceMaterial[] = [],
  aiInstructions: string = '',
  realismRules: string = ''
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA), HÃY GIÚP MASTER VIẾT CHI TIẾT MỘT MỤC TỪ TRONG CODEX (BỘ NHỚ RAG).

  --- TƯ LIỆU THAM KHẢO (NẾU CÓ) ---
  ${references.filter(r => r.type === 'text').map(r => '[Tên tệp: ' + r.name + ']\n' + r.content).join('\n\n')}

  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}

  --- THÔNG TIN THẾ GIỚI ---
  Thể loại: "${genre}"
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tone màu: "${storyTone}"
  Kim chỉ nam: "${storyGuidingPrinciple}"
  Ý tưởng chủ đạo: "${storyConcept}"
  Bối cảnh thế giới: "${worldInfo}"
  Địa lý: "${worldGeography}"
  Lịch sử: "${worldHistory}"
  Văn hóa: "${worldCulture}"
  Kinh tế: "${worldEconomy}"
  Tôn giáo: "${worldReligion}"
  Các quốc gia & Thế lực: "${worldFactions}"
  Mối quan hệ: "${worldRelationships}"
  Yếu tố độc đáo: "${worldUniqueElements}"
  Hệ thống sức mạnh: "${powerSystem}"
  
  NHIỆM VỤ: Hãy viết nội dung cực kỳ chi tiết cho mục từ Codex sau:
  - Tên mục từ: "${codexTitle}"
  - Phân loại: "${codexCategory}"

  YÊU CẦU:
  - Mô tả cực kỳ chi tiết, giải thích rõ nguồn gốc, tác dụng, lịch sử hình thành và tầm ảnh hưởng của nó đến thế giới.
  - Phải bám sát logic của thế giới, hệ thống sức mạnh và thể loại truyện.
  - Viết bằng văn phong bách khoa toàn thư nhưng vẫn giữ được sự hấp dẫn của văn học.
`;

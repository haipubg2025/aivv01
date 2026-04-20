import { TawaConfig, ReferenceMaterial, BasicOutlineOption } from '../../types';
import { getTawaSystemInstruction } from './system';
import { getGenreDescriptions } from '../genres';

export const getSpecificWorldFieldPrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  fieldName: string,
  fieldLabel: string,
  storyConcept: string,
  genre: string,
  storyTone: string,
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
  aiInstructions: string = ''
) => {
  return `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA - POWERED BY GEMINI), HÃY GIÚP MASTER PHÁT TRIỂN CHI TIẾT MỘT PHẦN CỤ THỂ TRONG BỐI CẢNH THẾ GIỚI.
  
  MỤC TIÊU: Viết nội dung sáng tạo, chi tiết và sâu sắc cho mục: "${fieldLabel}" (${fieldName}).

  --- BỐI CẢNH HIỆN TẠI (ĐỂ THAM KHẢO VÀ ĐẢM BẢO TÍNH ĐỒNG NHẤT) ---
  Ý tưởng chủ đạo ban đầu: "${storyConcept}"
  Thể loại: "${genre || 'Chưa xác định'}"
  Tone màu: "${storyTone || 'Chưa xác định'}"

  Thế giới tổng quan: ${worldInfo}
  Địa lý: ${worldGeography}
  Lịch sử: ${worldHistory}
  Văn hóa: ${worldCulture}
  Kinh tế: ${worldEconomy}
  Tôn giáo: ${worldReligion}
  Thế lực: ${worldFactions}
  Mối quan hệ: ${worldRelationships}
  Yếu tố độc đáo: ${worldUniqueElements}
  Hệ thống sức mạnh: ${powerSystem}

  YÊU CẦU:
  - Chỉ tạo nội dung cho đúng mục "${fieldLabel}".
  - Nội dung phải mới mẻ, mở rộng dựa trên bối cảnh hiện có thay vì lặp lại.
  - Viết theo văn phong phù hợp với thể loại truyện.
  - Kết quả trả về phải là một chuỗi văn bản thuần túy (không bọc trong cấu trúc JSON) chứa toàn bộ ý tưởng để có thể đưa thẳng vào ô textarea của mục đó.
  `;
};

export const getWorldDetailsPrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  storyConcept: string,
  storyGuidingPrinciple: string,
  mainCharacterGender: string,
  genre: string,
  storyTone: string,
  selectedBasicOutline: BasicOutlineOption | BasicOutlineOption[] | null,
  basicOutlineTreeContext: string = '',
  references: ReferenceMaterial[] = [],
  aiInstructions: string = '',
  realismRules: string = '',
  characterCount: number = 20,
  codexCount: number = 15,
  timelineCount: number = 10
) => {
  const outlinePath = Array.isArray(selectedBasicOutline) ? selectedBasicOutline : (selectedBasicOutline ? [selectedBasicOutline] : []);
  const fullOutlineText = outlinePath.map((node, index) => `
  [CẤP ĐỘ ${index + 1}: ${node.title}]
  Tóm tắt: ${node.summary}
  Sự kiện mấu chốt:
  ${node.keyPlotPoints.map(p => `- ${p}`).join('\n')}
  `).join('\n\n');

  return `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA - POWERED BY GEMINI), HÃY GIÚP MASTER XÂY DỰNG THẾ GIỚI VÀ NHÂN VẬT DỰA TRÊN PHÁC THẢO CỐT TRUYỆN ĐÃ CHỌN.
  
  NHIỆM VỤ: Dựa trên "Phác thảo cốt truyện (Dàn ý cơ bản)" mà Master đã chọn (bao gồm tất cả các tầng rẽ nhánh), hãy xây dựng một thế giới có chiều sâu, logic và hệ thống nhân vật đồ sộ để hiện thực hóa ý tưởng đó.

  --- PHÁC THẢO CỐT TRUYỆN ĐÃ CHỌN (TIẾN TRÌNH CHÍNH) ---
  ${fullOutlineText || 'Chưa chọn phác thảo cụ thể. Hãy dựa trên ý tưởng chủ đạo.'}

  --- TOÀN BỘ CÁC NHÁNH CỐT TRUYỆN ĐÃ PHÁC THẢO (BƯỚC 0) ---
  ${basicOutlineTreeContext || 'Chưa có phác thảo cây đa nhánh.'}

  --- THÔNG TIN NỀN TẢNG ---
  Ý tưởng chủ đạo ban đầu: "${storyConcept}"
  Thể loại: "${genre || 'Chưa xác định'}"
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tone màu: "${storyTone || 'Chưa xác định'}"
  Kim chỉ nam câu chuyện: "${storyGuidingPrinciple || 'Chưa xác định. AI BẮT BUỘC phải tự sáng tạo dựa trên Ý tưởng chủ đạo và tuân thủ QUY TẮC TỊNH TIẾN (từ nhỏ đến lớn, từ ngắn hạn đến dài hạn).'}"
  Giới tính/Loại nhân vật chính: "${mainCharacterGender}"

  --- TƯ LIỆU THAM KHẢO (NẾU CÓ) ---
  ${references.filter(r => r.type === 'text').map(r => '[Tên tệp: ' + r.name + ']\n' + r.content).join('\n\n')}

  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}

  NHIỆM VỤ CHI TIẾT:
  1. Sáng tạo Tên truyện chính thức phù hợp với phác thảo.
  2. Thiết kế Bối cảnh thế giới (worldInfo) tổng quan.
  3. Mô tả Địa lý & Vùng lãnh thổ (worldGeography) chi tiết.
  4. Sáng tạo Lịch sử thế giới (worldHistory) - Các sự kiện chấn động, các kỷ nguyên, nguồn gốc của thế giới.
  5. Xây dựng Văn hóa & Phong tục (worldCulture) - Lễ hội, ẩm thực, cách ăn mặc, quan niệm về đạo đức, nghệ thuật.
  6. Thiết lập Kinh tế & Xã hội (worldEconomy) - Hệ thống tiền tệ, các tầng lớp xã hội, cách vận hành của thị trường, các ngành nghề chính.
  7. Mô tả Tôn giáo & Tín ngưỡng (worldReligion) - Các vị thần, giáo phái, niềm tin vào cái chết và sự sống.
  8. Liệt kê Các quốc gia & Thế lực (worldFactions) và đặc điểm của họ.
  9. Thiết lập Mối quan hệ giữa các thế lực (worldRelationships) (liên minh, thù địch...).
  10. Sáng tạo Các yếu tố độc đáo (worldUniqueElements) của thế giới này.
  11. Xây dựng Hệ thống sức mạnh/Logic thế giới (logicSystem).
  12. Tạo danh sách BẮT BUỘC CHÍNH XÁC ${characterCount} NHÂN VẬT (characters). Phải bao phủ đầy đủ: Nhân vật chính, Nhân vật quan trọng, Nhân vật phụ, Nhân vật bên lề và Quần chúng.
     - **CẤP ĐỘ QUAN TRỌNG (LEVEL):** BẮT BUỘC gán \`level\` cho mỗi nhân vật. Level 1 là quan trọng nhất ("Nhân Vật Cốt Lõi"). Số level càng cao thì độ quan trọng càng giảm (ví dụ: Level 2 là nhân vật quan trọng, Level 3 là nhân vật phụ, Level 4 là nhân vật bên lề, Level 5 là quần chúng). Nhân vật quần chúng không cần vòng quan hệ rộng.
     - **MẠNG LƯỚI QUAN HỆ (BẮT BUỘC):** Không tạo các nhân vật rời rạc. Phải xây dựng một mạng lưới quan hệ chằng chịt: Gia đình (cha mẹ, anh chị em), bạn bè, sư đồ, kẻ thù, người hầu, cấp trên/cấp dưới. Mỗi nhân vật (trừ quần chúng) phải có ít nhất 1-2 mối quan hệ với các nhân vật khác trong danh sách.
     - **QUY TẮC ĐẶT TÊN (BẮT BUỘC):** Tên nhân vật PHẢI gắn liền với Thể loại và Bối cảnh (Xem Mục 20 trong AGENTS.md). Tuyệt đối không đặt tên sai phong cách văn hóa của thể loại.
  13. Lập bộ từ điển thế giới (Codex - BẮT BUỘC CHÍNH XÁC ${codexCount} mục) và Dòng thời gian (Timeline - BẮT BUỘC CHÍNH XÁC ${timelineCount} sự kiện quan trọng).

  ⚠️ QUY TẮC SỐ LƯỢNG (MANDATORY QUANTITY RULES):
  - BẠN BẮT BUỘC PHẢI TẠO RA ĐỦ VÀ CHÍNH XÁC ${characterCount} NHÂN VẬT. KHÔNG ĐƯỢC THIẾU DÙ CHỈ 1 NGƯỜI.
  - BẠN BẮT BUỘC PHẢI TẠO RA ĐỦ VÀ CHÍNH XÁC ${codexCount} MỤC CODEX.
  - BẠN BẮT BUỘC PHẢI TẠO RA ĐỦ VÀ CHÍNH XÁC ${timelineCount} SỰ KIỆN TIMELINE.

  ⚠️ QUY TẮC TỐI THƯỢNG (MANDATORY RULES):
  - QUY TẮC CODEX & TIMELINE: Không được viết qua loa. Codex phải giải thích sâu về các thuật ngữ đặc trưng. Timeline phải trải dài lịch sử thế giới. PHẢI ĐẢM BẢO CHÍNH XÁC SỐ LƯỢNG MỤC ĐÃ YÊU CẦU THEO THÔNG SỐ CẤU HÌNH.
  - QUY TẮC NHÂN VẬT: Tuyệt đối không được lười biếng. Danh sách nhân vật phải là một quần thể sống động. PHẢI CÓ ĐÚNG ${characterCount} NHÂN VẬT. Phải có ít nhất ${Math.ceil(characterCount * 0.25)} nhân vật quan trọng, ${Math.ceil(characterCount * 0.25)} nhân vật phụ có tên tuổi, và số còn lại là nhân vật bên lề/quần chúng định hình xã hội.
  - QUY TẮC NHÂN PHẨM: NGHIÊM CẤM tạo nhân vật chủ chốt có tính cách tham vọng, thủ đoạn, xấu xa, tồi tệ trừ khi có yêu cầu cụ thể. Cấm hắc hóa nhân vật vô lý.
  - QUY TẮC TÍNH CÁCH: CHỈ mô tả tính cách bên ngoài và bên trong (bao gồm cả nét tính cách chủ động hoặc thụ động). TUYỆT ĐỐI KHÔNG đề cập tới sở thích, lí do, giải giải thích hay mong muốn.
  - QUY TẮC NSFW & KINH NGHIỆM: BẮT BUỘC phải sáng tạo đầy đủ các trường "Trinh tiết & Kinh nghiệm" (sexualExperience - bao gồm trạng thái trinh tiết, mức độ kinh nghiệm và quan điểm về tình dục), "Tính cách khi vào cảnh NSFW" (nsfwPersonality) và "Phản ứng đặc trưng (NSFW)" (nsfwReactions - bao gồm phản ứng vật lý, âm thanh, lời thoại và sở thích/kink NSFW nếu có) cho các nhân vật quan trọng.
  - Trong danh sách nhân vật, BẮT BUỘC phải sáng tạo đầy đủ "Danh xưng" (Title) và "Chức vụ / Nghề nghiệp" (Occupation) cho từng người.
  - Ngoại hình nhân vật là thông tin CỐT LÕI, rất khó thay đổi, hãy miêu tả tỉ mỉ và nhất quán.
    + ĐẶC BIỆT CHO NHÂN VẬT NỮ: BẮT BUỘC tuân thủ cấu trúc: Chiều cao, Cân nặng, Số đo 3 vòng, Khuôn mặt, Mái tóc, Ngực, Vóc dáng, và các mô tả khác. Sử dụng ngôn từ gợi hình, nghệ thuật.
    + **TÍNH ĐA DẠNG & ĐỘC BẢN:** Tuyệt đối tránh miêu tả rập khuôn. Hãy sáng tạo sự khác biệt về hình dáng, vị trí, màu sắc/sắc tố, kết cấu (đàn hồi, săn chắc...) và các đặc điểm hiếm gặp để mỗi nhân vật là một thực thể duy nhất.
    + **TƯ DUY TỶ LỆ (PROPORTIONAL REALISM):** AI phải đối chiếu số đo với chiều cao/cân nặng để miêu tả chính xác (nhỏ/lép vs nảy nở/đồ sộ).
    + **HÌNH MẪU LOLI:** Phân biệt rõ 3 dạng (Bé gái chưa lớn, Người lớn ngoại hình Loli, Busty Loli) để miêu tả và xưng hô phù hợp.
    + **DÒNG THỜI GIAN (TIMELINE) LOGIC:** Tuyệt đối không sử dụng các mốc thời gian mặc định, thiếu sáng tạo. Hãy sáng tạo các mốc thời gian có ý nghĩa lịch sử, phù hợp với bối cảnh. Các sự kiện phải có khoảng cách thời gian hợp lý và logic với sự phát triển của thế giới.
  - Mọi chi tiết phải phục vụ và làm nổi bật hướng đi của Phác thảo đã chọn.
  `;
};

import { TawaConfig, Character, CodexEntry, TimelineEvent, ReferenceMaterial, BasicOutlineOption } from '../../types';
import { getTawaSystemInstruction } from './system';
import { getGenreDescriptions } from '../genres';
import { OPENING_RULES } from './openingRules';
import { CHARACTER_RULES } from './characterRules';

export const getRewriteBaseOutlinePrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  storyTitle: string,
  storyConcept: string,
  storyGuidingPrinciple: string,
  _mainCharacterGender: string,
  genre: string,
  storyTone: string,
  worldInfo: string,
  worldGeography: string = '',
  worldHistory: string = '',
  worldCulture: string = '',
  worldEconomy: string = '',
  worldReligion: string = '',
  worldFactions: string = '',
  worldRelationships: string = '',
  worldUniqueElements: string = '',
  powerSystem: string = '',
  characters: Character[],
  codex: CodexEntry[],
  timeline: TimelineEvent[],
  _outlineIndex: number,
  references: ReferenceMaterial[] = [],
  aiInstructions: string = '',
  fullOutline: string = '',
  selectedBasicOutline: BasicOutlineOption | BasicOutlineOption[] | null = null,
  basicOutlineTreeContext: string = '',
  realismRules: string = '',
  outlineOptionCount: number = 5
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
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA), HÃY GIÚP MASTER CẤU TRÚC VÀ ĐỀ XUẤT CÁC PHƯƠNG ÁN HƯỚNG ĐI CHO DÀN Ý CƠ SỞ.
  ${outlinePath.length > 0 ? `DỰA TRÊN PHÁC THẢO CỐT TRUYỆN MÀ MASTER ĐÃ CHỌN (BAO GỒM TOÀN BỘ CÁC TẦNG RẼ NHÁNH), HÃY CHI TIẾT HÓA NÓ THÀNH CHÍNH XÁC ${outlineOptionCount} BIẾN THỂ DÀN Ý CƠ SỞ KHÁC NHAU.` : `DỰA TRÊN THẾ GIỚI VÀ NHÂN VẬT ĐÃ ĐƯỢC THIẾT LẬP, HÃY ĐỀ XUẤT CHÍNH XÁC ${outlineOptionCount} HƯỚNG ĐI DÀN Ý CƠ SỞ HOÀN TOÀN MỚI, KHÁC BIỆT VÀ HẤP DẪN.`}
  
  ⚠️ QUY TẮC SỐ LƯỢNG: BẠN BẮT BUỘC PHẢI TẠO RA ĐỦ VÀ CHÍNH XÁC ${outlineOptionCount} HƯỚNG ĐI/BIẾN THỂ. KHÔNG ĐƯỢC PHÉP THIẾU DÙ CHỈ MỘT PHIÊN BẢN.

  --- TƯ LIỆU THAM KHẢO (NẾU CÓ) ---
  ${references.filter(r => r.type === 'text').map(r => '[Tên tệp: ' + r.name + ']\n' + r.content).join('\n\n')}

  --- BỐI CẢNH & CỐT TRUYỆN (NGUỒN SỰ THẬT - TÔN TRỌNG TUYỆT ĐỐI) ---
  Tên truyện: "${storyTitle}"
  
  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}
  
  Thể loại (TỐI THƯỢNG): "${genre}"
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tone màu: "${storyTone}"
  Kim chỉ nam: "${storyGuidingPrinciple || 'Chưa xác định. AI BẮT BUỘC phải tự sáng tạo dựa trên Ý tưởng chủ đạo và tuân thủ QUY TẮC TỊNH TIẾN (từ nhỏ đến lớn, từ ngắn hạn đến dài hạn).'}"
  Ý tưởng chủ đạo (Concept): "${storyConcept}"
  Hướng dẫn đặc biệt từ Master (AI Instructions): "${aiInstructions}"
  Bối cảnh thế giới: "${worldInfo}"
  Địa lý & Vùng lãnh thổ: "${worldGeography}"
  Lịch sử: "${worldHistory}"
  Văn hóa: "${worldCulture}"
  Kinh tế: "${worldEconomy}"
  Tôn giáo: "${worldReligion}"
  Các quốc gia & Thế lực: "${worldFactions}"
  Mối quan hệ giữa các thế lực: "${worldRelationships}"
  Các yếu tố độc đáo: "${worldUniqueElements}"
  Hệ thống sức mạnh/Logic: "${powerSystem}"
  
  ${outlinePath.length > 0 ? `
  --- PHÁC THẢO CỐT TRUYỆN ĐÃ CHỌN (TIẾN TRÌNH CHÍNH) ---
  ${fullOutlineText}

  --- TOÀN BỘ CÁC NHÁNH CỐT TRUYỆN ĐÃ PHÁC THẢO (BƯỚC 0) ---
  ${basicOutlineTreeContext || 'Chưa có phác thảo cây đa nhánh.'}
  ` : ''}

  --- DÀN Ý CỐT TRUYỆN TOÀN TẬP ---
  ${fullOutline}

  --- DANH SÁCH NHÂN VẬT ĐÃ CÓ ---
  ${JSON.stringify(characters.map(c => ({ name: c.name, role: c.role, personality: c.personality, abilities: c.abilities })))}

  --- TỪ ĐIỂN & LỊCH SỬ ĐÃ CÓ ---
  Codex: ${JSON.stringify(codex.map(e => ({ title: e.title, content: e.content })))}
  Timeline: ${JSON.stringify(timeline.map(e => ({ title: e.title, description: e.description })))}

  NHIỆM VỤ: Hãy tạo ra CHÍNH XÁC ${outlineOptionCount} HƯỚNG ĐI DÀN Ý CƠ SỞ. 
  Mỗi hướng đi phải bao gồm:
  1. Tiêu đề Dàn ý cơ sở. (TUYỆT ĐỐI CẤM ĐƯA TÊN NHÂN VẬT VÀO TRONG NGOẶC ĐƠN Ở TIÊU ĐỀ. Ví dụ cấm: "Khách Hàng Lúc Nửa Đêm (Trần Hạ Vi)". Tiêu đề phải phản ánh sự kiện chung của toàn bộ Arc).
  2. Bản tóm tắt dàn ý chung cho Arc Mở Đầu (hoặc Arc tiếp theo). BẮT BUỘC VIẾT THEO DẠNG GẠCH ĐẦU DÒNG HOẶC ĐOẠN NGẮN. LỆNH TỐI QUAN TRỌNG: BẠN BẮT BUỘC PHẢI NHỒI NHÉT THẬT NHIỀU TÌNH TIẾT, NHIỀU HÀNH ĐỘNG VÀ BIẾN CỐ NHẤT CÓ THỂ VÀO MỖI HƯỚNG ĐI. KHÔNG ĐƯỢC TÓM TẮT QUA LOA HAY CHUNG CHUNG. Mỗi hướng đi phải là một chuỗi liên tục các sự kiện dày đặc để làm khung xương vững chắc cho toàn bộ Arc.
  
  ⚠️ YÊU CẦU QUAN TRỌNG:
  - QUY TẮC BẮT BUỘC VỀ SỐ LƯỢNG NHÂN VẬT: MỌI PHƯƠNG ÁN (TỪ TIÊU ĐỀ ĐẾN NỘI DUNG TÓM TẮT) BẮT BUỘC PHẢI CÓ SỰ XUẤT HIỆN VÀ TƯƠNG TÁC CỦA NHIỀU NHÂN VẬT (ÍT NHẤT 2-3 NHÂN VẬT QUAN TRỌNG TRỞ LÊN). TUYỆT ĐỐI CẤM việc tạo ra một phương án chỉ xoay quanh duy nhất 1 nhân vật. Đại cục là câu chuyện của một tập thể, không phải sân khấu độc diễn của bất kỳ ai.
  - LỖI NGHIÊM TRỌNG CẦN TRÁNH (TUYỆT ĐỐI CẤM): KHÔNG ĐƯỢC CHIA CÁC PHƯƠNG ÁN/HƯỚNG ĐI THEO TỪNG NHÂN VẬT. NẾU BẠN TẠO RA CÁC PHƯƠNG ÁN MÀ TIÊU ĐỀ HOẶC NỘI DUNG CHỈ TẬP TRUNG VÀO VIỆC CHINH PHỤC HOẶC GIẢI QUYẾT VẤN ĐỀ CỦA RIÊNG 1 NHÂN VẬT CỤ THỂ (Ví dụ cấm: "Sự sụp đổ của Nữ Tổng Tài X", "Hành trình thu phục Y", Phương án 1 xoay quanh A, Phương án 2 xoay quanh B), BẠN SẼ BỊ ĐÁNH GIÁ LÀ THẤT BẠI HOÀN TOÀN. Đây là tư duy sai lệch "chia route" kiểu game hẹn hò. TẤT CẢ các phương án phải là các kịch bản của TOÀN BỘ ĐẠI CỤC, nơi TẤT CẢ các nhân vật quan trọng đều tham gia và tương tác lẫn nhau, chỉ khác nhau ở CÁCH THỨC giải quyết vấn đề chung của thế giới/cốt truyện, SỰ KIỆN xảy ra, hoặc ÂM MƯU đằng sau.
  - Phải bám sát tuyệt đối Thể loại, Giới tính nhân vật chính và Tone màu đã định.
  - QUY TẮC MỞ ĐẦU TRUYỆN (BẮT BUỘC): Nếu đây là Dàn ý cơ sở cho Arc Mở Đầu (phần mở đầu truyện), TUYỆT ĐỐI KHÔNG mở đầu rập khuôn (như thức dậy, ngáp dài). Phải tạo "Lưỡi câu" (The Hook) ngay lập tức bằng hành động hoặc sự kiện. LUÔN LUÔN phải giới thiệu về 1 hoặc nhiều nhân vật cốt lõi xuất hiện đầu tiên cùng với bối cảnh của họ thông qua hành động và tương tác, không liệt kê lý lịch khô khan. Không khí mở đầu phải đậm chất thể loại truyện. Hãy áp dụng các phương pháp trong CẨM NANG VIẾT PHẦN MỞ ĐẦU bên dưới.
  
  ${OPENING_RULES}
  - TỐI ĐA HÓA SỰ XUẤT HIỆN CỦA NHÂN VẬT: Bạn PHẢI đưa CÀNG NHIỀU NHÂN VẬT CÀNG TỐT từ "DANH SÁCH NHÂN VẬT ĐÃ CÓ" vào cốt truyện của các hướng đi. Cố gắng tạo tình tiết để họ xuất hiện và tương tác ngay từ đầu. Hãy tạo ra sự tương tác, mâu thuẫn và liên kết sâu sắc giữa họ. Tránh việc chỉ tập trung vào nhân vật chính và bỏ quên dàn nhân vật phụ.
  - **QUY TẮC PHÂN RÃ HÀNH ĐỘNG & LÀM CHẬM NHỊP ĐIỆU (BẮT BUỘC):** Tuyệt đối không giải quyết mâu thuẫn cốt truyện hoặc hành động lớn trong 1 lần. Mỗi chương phải là một bước đệm, phân rã các sự kiện lớn thành chuỗi các tình tiết nhỏ, kéo dài sự chờ đợi và tăng cường độ kịch tính. Tránh "nén" cốt truyện, hãy để câu chuyện thở và phát triển tự nhiên qua từng nhịp chậm rãi.
  - ÁP DỤNG CẨM NANG KHAI THÁC NHÂN VẬT:
  
  ${CHARACTER_RULES}
  
  - Phải sử dụng các nhân vật, địa danh và logic đã có trong thông tin thế giới.
  - Mỗi hướng đi phải mang một màu sắc hoặc hướng đi khác nhau (ví dụ: một hướng đi tập trung vào thăng cấp, một hướng đi tập trung vào âm mưu, một hướng đi tập trung vào phát triển tình cảm của toàn bộ nhóm...).
  - **QUY TẮC TIẾN TRIỂN TÌNH CẢM (BẮT BUỘC):** AI phải tự phân bổ tiến trình tình cảm dựa trên "Độ khó" của từng nhân vật. Nhân vật đã có sẵn cảm tình (thanh mai trúc mã, yêu thầm) có thể xác lập quan hệ ngay trong Arc Mở Đầu. Tuy nhiên, các nhân vật khác phải được giữ ở mức độ gặp gỡ hoặc nảy sinh mâu thuẫn/ấn tượng ban đầu. Tuyệt đối không được "thu hoạch" hàng loạt mĩ nhân ngay từ đầu để duy trì sức hút dài hạn.
  - ĐỐI VỚI THỂ LOẠI HAREM: Đảm bảo sự xuất hiện của nhiều nhân vật nữ ngay từ đầu.

  ⚠️ CẬP NHẬT STORY BIBLE (BẮT BUỘC NHƯNG CẨN TRỌNG):
  Thế giới trong truyện rất rộng lớn. Trong quá trình đề xuất các hướng đi mới, bạn ĐƯỢC PHÉP tạo ra các dữ liệu mới nhưng PHẢI TÔN TRỌNG THIẾT LẬP CŨ:
  - CẤM VIẾT ĐÈ (OVERWRITE) SAI LỆCH THẾ GIỚI: Tuyệt đối không thay đổi thông tin Codex, Timeline hay nguồn gốc hệ thống đã có.
  - newCharacters: Thêm các nhân vật mới (kể cả quần chúng hoặc sẽ chết ngay).
    + QUY TẮC TÍNH CÁCH: CHỈ mô tả tính cách bên ngoài và bên trong. TUYỆT ĐỐI KHÔNG đề cập tới sở thích, mong muốn. NGHIÊM CẤM tạo nhân vật chủ chốt thủ đoạn, xấu xa trừ khi có yêu cầu. Cấm hắc hóa nhân vật vô lý.
    + QUY TẮC NSFW: BẮT BUỘC có sexualExperience, nsfwPersonality, nsfwReactions.
  - newCodexEntries/newTimelineEvents: Thêm các địa danh, vật phẩm hoặc sự kiện lịch sử mới phát sinh. KHÔNG thay đổi mốc lịch sử gốc. Không dùng "Năm 0".
  - characterUpdates: KHI CẬP NHẬT NHÂN VẬT CŨ: CẤM XÓA SỔ THÔNG TIN CŨ. BẮT BUỘC PHẢI SAO CHÉP GIỮ LẠI TẤT CẢ các thông tin cũ (vẫn còn đúng) và CHỈ VIẾT BỔ SUNG thay đổi. TUYỆT ĐỐI KHÔNG xuất ra các chuỗi vô nghĩa như "Không thay đổi", "Không đổi" - nếu một trường không có sự thay đổi, HÃY BỎ QUA TRƯỜNG ĐÓ. KHÔNG ĐƯỢC PHÉP THAY ĐỔI NGOẠI HÌNH HAY TÍNH CÁCH GỐC. Chỉ cập nhật trạng thái (VD: "Đã chết", "Bị thương nặng", "Thay đổi phe phái").
  - worldUpdates: Cập nhật biến động hiện tại, TUYỆT ĐỐI KHÔNG sửa lại lịch sử ban đầu của thế giới.
`;
};

export const getArcBranchingPrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  storyTitle: string,
  storyConcept: string,
  storyGuidingPrinciple: string,
  protagonistType: string,
  genre: string,
  storyTone: string,
  worldInfo: string,
  worldGeography: string = '',
  worldHistory: string = '',
  worldCulture: string = '',
  worldEconomy: string = '',
  worldReligion: string = '',
  worldFactions: string = '',
  worldRelationships: string = '',
  worldUniqueElements: string = '',
  powerSystem: string = '',
  characters: Character[],
  fullOutline: string,
  branchingSettings: { branchesPerLevel: number; totalLevels: number },
  aiInstructions: string = '',
  branchingSuggestion: string = '',
  realismRules: string = ''
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA), HÃY GIÚP MASTER PHÁC THẢO CÁC HƯỚNG ĐI TIẾP THEO CHO ARC (PHƯƠNG ÁN) DƯỚI DẠNG CÂY ĐA NHÁNH.
  
  NHIỆM VỤ: Tạo ra CẤP ĐỘ 1 của cây rẽ nhánh cho Arc tiếp theo.
  BẠN BẮT BUỘC PHẢI TẠO RA CHÍNH XÁC ${branchingSettings.branchesPerLevel} LỰA CHỌN Ý TƯỞNG ARC KHÁC NHAU.
  
  ⚠️ QUY TẮC SỐ LƯỢNG: BẠN BẮT BUỘC PHẢI TẠO RA ĐỦ VÀ CHÍNH XÁC ${branchingSettings.branchesPerLevel} LỰA CHỌN. KHÔNG ĐƯỢC PHÉP THIẾU.

  ${branchingSuggestion ? `
  --- GỢI Ý HƯỚNG RẼ NHÁNH TỪ MASTER (NGUỒN SỰ THẬT - ƯU TIÊN TỐI CAO) ---
  Master muốn các hướng rẽ nhánh Arc này tập trung vào hoặc có yếu tố: "${branchingSuggestion}"
  HÀNH ĐỘNG CỦA AI: Bạn PHẢI bám sát gợi ý rẽ nhánh này để phát triển nội dung. Đây là mệnh lệnh tuyệt đối, không được tự ý đi chệch khỏi gợi ý này.
  ` : ''}
  
  --- BỐI CẢNH & CỐT TRUYỆN (NGUỒN SỰ THẬT - TẤT CẢ PHẢI TUÂN THỦ TỐI THƯỢNG) ---
  Tên truyện: "${storyTitle}"
  
  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}
  
  Thể loại: "${genre}"
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tone màu: "${storyTone}"
  Kim chỉ nam (Guiding Principle): "${storyGuidingPrinciple}"
  Ý tưởng chủ đạo (Concept): "${storyConcept}"
  Hướng dẫn Master (AI Instructions): "${aiInstructions}"
  Kiểu nhân vật chính: "${protagonistType}"
  Dàn ý đã có: ${fullOutline}
  Nhân vật: ${JSON.stringify(characters.map(c => c.name))}
  Thế giới: ${worldInfo}
  Địa lý & Vùng lãnh thổ: ${worldGeography}
  Lịch sử: ${worldHistory}
  Văn hóa: ${worldCulture}
  Kinh tế: ${worldEconomy}
  Tôn giáo: ${worldReligion}
  Các quốc gia & Thế lực: ${worldFactions}
  Mối quan hệ giữa các thế lực: ${worldRelationships}
  Các yếu tố độc đáo: ${worldUniqueElements}
  Sức mạnh: ${powerSystem}

  ⚠️ YÊU CẦU:
  - LỖI NGHIÊM TRỌNG CẦN TRÁNH (TUYỆT ĐỐI CẤM): KHÔNG ĐƯỢC CHIA CÁC PHƯƠNG ÁN/HƯỚNG ĐI THEO TỪNG NHÂN VẬT. NẾU BẠN TẠO RA CÁC PHƯƠNG ÁN MÀ TIÊU ĐỀ HOẶC NỘI DUNG CHỈ TẬP TRUNG VÀO VIỆC CHINH PHỤC HOẶC GIẢI QUYẾT VẤN ĐỀ CỦA RIÊNG 1 NHÂN VẬT CỤ THỂ (Ví dụ cấm: "Sự sụp đổ của Nữ Tổng Tài X", "Hành trình thu phục Y", Phương án 1 xoay quanh A, Phương án 2 xoay quanh B), BẠN SẼ BỊ ĐÁNH GIÁ LÀ THẤT BẠI HOÀN TOÀN. Đây là tư duy sai lệch "chia route" kiểu game hẹn hò. TẤT CẢ các phương án phải là các kịch bản của TOÀN BỘ ĐẠI CỤC, nơi TẤT CẢ các nhân vật quan trọng đều tham gia và tương tác lẫn nhau, chỉ khác nhau ở CÁCH THỨC giải quyết vấn đề chung của thế giới/cốt truyện, SỰ KIỆN xảy ra, hoặc ÂM MƯU đằng sau.
  - TƯ DUY RẼ NHÁNH: Các lựa chọn phải là các hướng đi SONG SONG, bắt đầu từ cùng một thời điểm nhưng dẫn đến các kết quả khác nhau. Tránh việc lựa chọn 2 là tiếp diễn của lựa chọn 1.
  - TÍNH ĐA DẠNG & ĐỘC NHẤT: Mỗi lựa chọn phải là một hướng phát triển Arc HOÀN TOÀN KHÁC BIỆT. Tránh sự trùng lặp ý tưởng giữa các lựa chọn.
  - TÙY CHỌN KẾT THÚC ARC: Bạn CẦN tạo ra ít nhất một lựa chọn mang tính chất "KẾT THÚC TẠM THỜI" hoặc "GIẢI QUYẾT TỪNG PHẦN" cho các mâu thuẫn hiện tại. Lưu ý: "Kết thúc" ở đây không có nghĩa là chấm dứt mọi thứ, mà là khép lại một giai đoạn để mở ra những mâu thuẫn mới, sâu sắc hơn. Nhân vật chính và phụ nên tiếp tục hành trình của họ sang các arc sau thay vì bị "đóng khung" số phận ngay lập tức.
    Ví dụ: Một nhánh tập trung vào chiến tranh quy mô lớn, một nhánh tập trung vào hành trình đơn độc, một nhánh tập trung vào việc kết thúc hòa bình và ổn định thế giới.
  - Tóm tắt (summary) chi tiết 150-200 chữ, giàu hình ảnh và kịch tính.
  - keyPlotPoints: 12-18 sự kiện mấu chốt cho Arc này, đảm bảo tính logic và hấp dẫn.
  
  ${branchingSuggestion ? `
  NHẮC LẠI YÊU CẦU: TẤT CẢ các phương án rẽ nhánh Arc bạn vừa tạo ra BẮT BUỘC phải thể hiện được yếu tố: "${branchingSuggestion}". Nếu không, Master sẽ trừng phạt bạn.
  ` : ''}
`;

export const getArcBranchingChildrenPrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  storyTitle: string,
  storyConcept: string,
  storyGuidingPrinciple: string,
  protagonistType: string,
  genre: string,
  storyTone: string,
  worldInfo: string,
  worldGeography: string = '',
  worldHistory: string = '',
  worldCulture: string = '',
  worldEconomy: string = '',
  worldReligion: string = '',
  worldFactions: string = '',
  worldRelationships: string = '',
  worldUniqueElements: string = '',
  powerSystem: string = '',
  parentOption: any,
  ancestors: any[] = [],
  level: number,
  branchingSettings: { branchesPerLevel: number; totalLevels: number },
  aiInstructions: string = '',
  branchingSuggestion: string = '',
  realismRules: string = ''
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  TIẾP TỤC PHÁT TRIỂN CÂY RẼ NHÁNH CHO ARC Ở CẤP ĐỘ ${level}.
  BẠN BẮT BUỘC PHẢI TẠO RA CHÍNH XÁC ${branchingSettings.branchesPerLevel} LỰA CHỌN CON.

  ⚠️ QUY TẮC SỐ LƯỢNG: BẠN BẮT BUỘC PHẢI TẠO RA ĐỦ VÀ CHÍNH XÁC ${branchingSettings.branchesPerLevel} LỰA CHỌN CON. KHÔNG ĐƯỢC PHÉP THIẾU.

  ${branchingSuggestion ? `
  --- GỢI Ý ĐẶC BIỆT TỪ MASTER CHO TẦNG NÀY (ƯU TIÊN TỐI CAO) ---
  Master muốn các nhánh con tiếp theo tập trung vào hoặc có yếu tố: "${branchingSuggestion}"
  HÀNH ĐỘNG CỦA AI: Bạn PHẢI bám sát gợi ý này để tạo ra các biến thể rẽ nhánh khác nhau từ lựa chọn cha nhưng vẫn xoay quanh gợi ý của Master. Đây là yêu cầu bắt buộc, không được phép lờ đi.
  ` : ''}
  
  --- BỐI CẢNH & CỐT TRUYỆN (NGUỒN SỰ THẬT - CƠ SỞ TRIỂN KHAI) ---
  Tên truyện: "${storyTitle}"
  
  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}
  
  Thể loại: "${genre}"
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tone màu: "${storyTone}"
  Kim chỉ nam (Guiding Principle): "${storyGuidingPrinciple}"
  Ý tưởng chủ đạo (Concept): "${storyConcept}"
  Hướng dẫn Master (AI Instructions): "${aiInstructions}"
  Kiểu nhân vật chính: "${protagonistType}"
  Thế giới: ${worldInfo}
  Địa lý & Vùng lãnh thổ: ${worldGeography}
  Lịch sử: ${worldHistory}
  Văn hóa: ${worldCulture}
  Kinh tế: ${worldEconomy}
  Tôn giáo: ${worldReligion}
  Các quốc gia & Thế lực: ${worldFactions}
  Mối quan hệ giữa các thế lực: ${worldRelationships}
  Các yếu tố độc đáo: ${worldUniqueElements}
  Sức mạnh: ${powerSystem}

  --- LỘ TRÌNH CỐT TRUYỆN ĐÃ CHỌN (CONTEXT PATH) ---
  ${ancestors.length > 0 ? ancestors.map((node, i) => `
  CẤP ĐỘ ${i + 1}: ${node.title}
  Tóm tắt: ${node.summary}
  Sự kiện mấu chốt: ${node.keyPlotPoints?.join(', ') || 'Không có'}
  `).join('\n  ---') : 'Đây là khởi đầu sau cấp độ 1.'}

  --- LỰA CHỌN CHA (CẤP ĐỘ ${level - 1}) ---
  Tiêu đề: "${parentOption.title}"
  Tóm tắt: "${parentOption.summary}"
  Sự kiện mấu chốt: ${parentOption.keyPlotPoints?.join(', ') || 'Không có'}
  
  ⚠️ YÊU CẦU:
  - LỖI NGHIÊM TRỌNG CẦN TRÁNH (TUYỆT ĐỐI CẤM): KHÔNG ĐƯỢC CHIA CÁC PHƯƠNG ÁN/HƯỚNG ĐI THEO TỪNG NHÂN VẬT. NẾU BẠN TẠO RA CÁC PHƯƠNG ÁN MÀ TIÊU ĐỀ HOẶC NỘI DUNG CHỈ TẬP TRUNG VÀO VIỆC CHINH PHỤC HOẶC GIẢI QUYẾT VẤN ĐỀ CỦA RIÊNG 1 NHÂN VẬT CỤ THỂ (Ví dụ cấm: "Sự sụp đổ của Nữ Tổng Tài X", "Hành trình thu phục Y", Phương án 1 xoay quanh A, Phương án 2 xoay quanh B), BẠN SẼ BỊ ĐÁNH GIÁ LÀ THẤT BẠI HOÀN TOÀN. Đây là tư duy sai lệch "chia route" kiểu game hẹn hò. TẤT CẢ các phương án phải là các kịch bản của TOÀN BỘ ĐẠI CỤC, nơi TẤT CẢ các nhân vật quan trọng đều tham gia và tương tác lẫn nhau, chỉ khác nhau ở CÁCH THỨC giải quyết vấn đề chung của thế giới/cốt truyện, SỰ KIỆN xảy ra, hoặc ÂM MƯU đằng sau.
  - TƯ DUY RẼ NHÁNH: Các nhánh con phải là các hướng đi SONG SONG và TƯƠNG PHẢN nhau từ cùng một lựa chọn cha.
  - TÍNH ĐA DẠNG & ĐỘC NHẤT: Các nhánh con phải mở ra những ngã rẽ HOÀN TOÀN KHÁC BIỆT từ cùng một lựa chọn cha.
  - TÙY CHỌN CHUYỂN CẢNH: Một trong các nhánh con NÊN là phương án kết thúc cảnh quay/sự kiện hiện tại một cách hợp lý để chuyển sang bối cảnh mới, đồng thời để lại những "manh mối" hoặc "nút thắt" cho các diễn biến sau này.
  - Phát triển sâu hơn các tình tiết từ lựa chọn cha nhưng theo những hướng tương phản nhau về mặt hành động và sự kiện.
  - Tóm tắt chi tiết 150-200 chữ.
  
  ${branchingSuggestion ? `
  NHẮC LẠI YÊU CẦU: TẤT CẢ các nhánh con bạn vừa tạo ra từ lựa chọn cha BẮT BUỘC phải bám sát yếu tố: "${branchingSuggestion}". Hãy sáng tạo nhưng đừng rời xa "kim chỉ nam" này của Master.
  ` : ''}
`;

export const getChapterBranchingPrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  storyTitle: string,
  storyConcept: string,
  storyGuidingPrinciple: string,
  protagonistType: string,
  genre: string,
  storyTone: string,
  worldInfo: string,
  worldGeography: string = '',
  worldHistory: string = '',
  worldCulture: string = '',
  worldEconomy: string = '',
  worldReligion: string = '',
  worldFactions: string = '',
  worldRelationships: string = '',
  worldUniqueElements: string = '',
  powerSystem: string = '',
  characters: Character[],
  baseOutline: any,
  fullOutline: string,
  branchingSettings: { branchesPerLevel: number; totalLevels: number },
  aiInstructions: string = '',
  branchingSuggestion: string = '',
  realismRules: string = ''
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA), HÃY GIÚP MASTER PHÁC THẢO CÁC PHIÊN BẢN CHO CHƯƠNG TIẾP THEO DƯỚI DẠNG CÂY ĐA NHÁNH.
  
  NHIỆM VỤ: Tạo ra CẤP ĐỘ 1 của cây rẽ nhánh cho Chương tiếp theo của Arc "${baseOutline.title}".
  BẠN BẮT BUỘC PHẢI TẠO RA CHÍNH XÁC ${branchingSettings.branchesPerLevel} LỰA CHỌN DIỄN BIẾN CHƯƠNG.

  ⚠️ QUY TẮC SỐ LƯỢNG: BẠN BẮT BUỘC PHẢI TẠO RA ĐỦ VÀ CHÍNH XÁC ${branchingSettings.branchesPerLevel} LỰA CHỌN. KHÔNG ĐƯỢC PHÉP THIẾU.

  ${branchingSuggestion ? `
  --- GỢI Ý ĐẶC BIỆT TỪ MASTER (ƯU TIÊN TỐI CAO) ---
  Master muốn các hướng rẽ nhánh Chương này tập trung vào hoặc có yếu tố: "${branchingSuggestion}"
  HÀNH ĐỘNG CỦA AI: Bạn PHẢI bám sát gợi ý này để tạo ra các biến thể Chương khác nhau xung quanh nó. Đây là yêu cầu bắt buộc, mọi phương án không tuân theo gợi ý này đều bị coi là lỗi nghiêm trọng.
  ` : ''}
  
  --- THÔNG TIN CỐT LÕI (NGUỒN SỰ THẬT - TRIỂN KHAI CHƯƠNG) ---
  Tên truyện: "${storyTitle}"
  
  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}
  
  Thể loại: "${genre}"
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tone màu: "${storyTone}"
  Kim chỉ nam (Guiding Principle): "${storyGuidingPrinciple}"
  Ý tưởng chủ đạo (Concept): "${storyConcept}"
  Hướng dẫn Master (AI Instructions): "${aiInstructions}"
  Kiểu nhân vật chính: "${protagonistType}"
  Dàn ý Arc hiện tại: ${baseOutline.summary}
  Dàn ý toàn bộ: ${fullOutline}
  Nhân vật: ${JSON.stringify(characters.map(c => c.name))}
  Thế giới: ${worldInfo}
  Địa lý & Vùng lãnh thổ: ${worldGeography}
  Lịch sử: ${worldHistory}
  Văn hóa: ${worldCulture}
  Kinh tế: ${worldEconomy}
  Tôn giáo: ${worldReligion}
  Các quốc gia & Thế lực: ${worldFactions}
  Mối quan hệ giữa các thế lực: ${worldRelationships}
  Các yếu tố độc đáo: ${worldUniqueElements}
  Sức mạnh: ${powerSystem}
  
  ⚠️ YÊU CẦU:
  - LỖI NGHIÊM TRỌNG CẦN TRÁNH (TUYỆT ĐỐI CẤM): KHÔNG ĐƯỢC CHIA CÁC PHƯƠNG ÁN/HƯỚNG ĐI THEO TỪNG NHÂN VẬT. NẾU BẠN TẠO RA CÁC PHƯƠNG ÁN MÀ TIÊU ĐỀ HOẶC NỘI DUNG CHỈ TẬP TRUNG VÀO VIỆC CHINH PHỤC HOẶC GIẢI QUYẾT VẤN ĐỀ CỦA RIÊNG 1 NHÂN VẬT CỤ THỂ (Ví dụ cấm: "Sự sụp đổ của Nữ Tổng Tài X", "Hành trình thu phục Y", Phương án 1 xoay quanh A, Phương án 2 xoay quanh B), BẠN SẼ BỊ ĐÁNH GIÁ LÀ THẤT BẠI HOÀN TOÀN. Đây là tư duy sai lệch "chia route" kiểu game hẹn hò. TẤT CẢ các phương án phải là các kịch bản của TOÀN BỘ ĐẠI CỤC, nơi TẤT CẢ các nhân vật quan trọng đều tham gia và tương tác lẫn nhau, chỉ khác nhau ở CÁCH THỨC giải quyết vấn đề chung của thế giới/cốt truyện, SỰ KIỆN xảy ra, hoặc ÂM MƯU đằng sau.
  - TƯ DUY RẼ NHÁNH: Mỗi lựa chọn phải là một cách triển khai Chương SONG SONG và ĐỘC LẬP. Không được để lựa chọn sau là phần tiếp theo của lựa chọn trước.
  - TÍNH ĐA DẠNG & ĐỘC NHẤT: Mỗi lựa chọn là một cách triển khai Chương HOÀN TOÀN KHÁC BIỆT.
    Ví dụ: Một phiên bản tập trung vào đối thoại và tâm lý, một phiên bản tập trung vào hành động dồn dập, một phiên bản tập trung vào phát hiện bí mật quan trọng.
  - Tóm tắt chi tiết 150-200 chữ.
  
  ${branchingSuggestion ? `
  NHẮC LẠI YÊU CẦU: TẤT CẢ các phiên bản Chương bạn vừa tạo ra BẮT BUỘC phải thể hiện được yếu tố: "${branchingSuggestion}". Nếu không, Master sẽ trừng phạt bạn.
  ` : ''}
`;
export const getGenerateNextArcsPrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  storyTitle: string,
  storyConcept: string,
  storyGuidingPrinciple: string,
  _mainCharacterGender: string,
  genre: string,
  storyTone: string,
  worldInfo: string,
  worldGeography: string = '',
  worldHistory: string = '',
  worldCulture: string = '',
  worldEconomy: string = '',
  worldReligion: string = '',
  worldFactions: string = '',
  worldRelationships: string = '',
  worldUniqueElements: string = '',
  powerSystem: string = '',
  characters: Character[],
  _codex: CodexEntry[],
  _timeline: TimelineEvent[],
  fullOutline: string,
  aiInstructions: string = '',
  realismRules: string = '',
  versionCount: number = 10
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA), HÃY GIÚP MASTER VIẾT TIẾP CÁC ARC TIẾP THEO CHO CÂU CHUYỆN.
  DỰA TRÊN THẾ GIỚI, NHÂN VẬT VÀ DÀN Ý HIỆN TẠI, HÃY SÁNG TẠO CÁC ARC TIẾP THEO ĐỂ PHÁT TRIỂN MẠCH TRUYỆN.

  --- BỐI CẢNH & CỐT TRUYỆN (NGUỒN SỰ THẬT - PHÁC THẢO TIẾP THEO) ---
  Tên truyện: "${storyTitle}"
  
  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}
  
  Thể loại: "${genre}"
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tone màu: "${storyTone}"
  Kim chỉ nam: "${storyGuidingPrinciple || 'Chưa xác định. AI BẮT BUỘC phải tự sáng tạo dựa trên Ý tưởng chủ đạo và tuân thủ QUY TẮC TỊNH TIẾN (từ nhỏ đến lớn, từ ngắn hạn đến dài hạn).'}"
  Ý tưởng chủ đạo (Concept): "${storyConcept}"
  Hướng dẫn Master (AI Instructions): "${aiInstructions}"
  Bối cảnh thế giới: "${worldInfo}"
  Địa lý & Vùng lãnh thổ: "${worldGeography}"
  Lịch sử: "${worldHistory}"
  Văn hóa: "${worldCulture}"
  Kinh tế: "${worldEconomy}"
  Tôn giáo: "${worldReligion}"
  Các quốc gia & Thế lực: "${worldFactions}"
  Mối quan hệ giữa các thế lực: "${worldRelationships}"
  Các yếu tố độc đáo: "${worldUniqueElements}"
  Hệ thống sức mạnh/Logic: "${powerSystem}"
  
  --- DÀN Ý CỐT TRUYỆN HIỆN TẠI ---
  ${fullOutline}

  --- DANH SÁCH NHÂN VẬT ---
  ${JSON.stringify(characters.map(c => ({ name: c.name, role: c.role, personality: c.personality, abilities: c.abilities })))}

  NHIỆM VỤ: Hãy tạo ra ${versionCount} PHIÊN BẢN (LỰA CHỌN) khác nhau cho Arc tiếp theo.
  ⚠️ QUY TẮC SỐ LƯỢNG: BẠN BẮT BUỘC PHẢI TẠO RA ĐỦ VÀ CHÍNH XÁC ${versionCount} PHIÊN BẢN. KHÔNG ĐƯỢC PHÉP THIẾU.
  Mỗi phiên bản phải bao gồm:
  1. Tiêu đề Arc. (TUYỆT ĐỐI CẤM ĐƯA TÊN NHÂN VẬT VÀO TRONG NGOẶC ĐƠN Ở TIÊU ĐỀ. Ví dụ cấm: "Khách Hàng Lúc Nửa Đêm (Trần Hạ Vi)". Tiêu đề phải phản ánh sự kiện chung của toàn bộ Arc).
  2. Bản tóm tắt dàn ý chung cho Arc này. BẮT BUỘC VIẾT THEO DẠNG DANH SÁCH ĐÁNH SỐ (1, 2, 3...). LỆNH TỐI QUAN TRỌNG: BẠN BẮT BUỘC PHẢI NHỒI NHÉT THẬT NHIỀU TÌNH TIẾT, NHIỀU HÀNH ĐỘNG VÀ BIẾN CỐ NHẤT CÓ THỂ. KHÔNG ĐƯỢC TÓM TẮT QUA LOA.
  
  ⚠️ YÊU CẦU:
  - QUY TẮC BẮT BUỘC VỀ SỐ LƯỢNG NHÂN VẬT: MỌI PHƯƠNG ÁN (TỪ TIÊU ĐỀ ĐẾN NỘI DUNG TÓM TẮT) BẮT BUỘC PHẢI CÓ SỰ XUẤT HIỆN VÀ TƯƠNG TÁC CỦA NHIỀU NHÂN VẬT (ÍT NHẤT 2-3 NHÂN VẬT QUAN TRỌNG TRỞ LÊN). TUYỆT ĐỐI CẤM việc tạo ra một phương án chỉ xoay quanh duy nhất 1 nhân vật. Đại cục là câu chuyện của một tập thể, không phải sân khấu độc diễn của bất kỳ ai.
  - LỖI NGHIÊM TRỌNG CẦN TRÁNH (TUYỆT ĐỐI CẤM): KHÔNG ĐƯỢC CHIA CÁC PHƯƠNG ÁN/HƯỚNG ĐI THEO TỪNG NHÂN VẬT. NẾU BẠN TẠO RA CÁC PHƯƠNG ÁN MÀ TIÊU ĐỀ HOẶC NỘI DUNG CHỈ TẬP TRUNG VÀO VIỆC CHINH PHỤC HOẶC GIẢI QUYẾT VẤN ĐỀ CỦA RIÊNG 1 NHÂN VẬT CỤ THỂ (Ví dụ cấm: "Sự sụp đổ của Nữ Tổng Tài X", "Hành trình thu phục Y", Phương án 1 xoay quanh A, Phương án 2 xoay quanh B), BẠN SẼ BỊ ĐÁNH GIÁ LÀ THẤT BẠI HOÀN TOÀN. Đây là tư duy sai lệch "chia route" kiểu game hẹn hò. TẤT CẢ các phương án phải là các kịch bản của TOÀN BỘ ĐẠI CỤC, nơi TẤT CẢ các nhân vật quan trọng đều tham gia và tương tác lẫn nhau, chỉ khác nhau ở CÁCH THỨC giải quyết vấn đề chung của thế giới/cốt truyện, SỰ KIỆN xảy ra, hoặc ÂM MƯU đằng sau.
  - Mỗi phiên bản phải mang một hướng phát triển khác nhau (ví dụ: một bản tập trung vào chiến đấu, một bản tập trung vào phát triển tình cảm của toàn bộ nhóm, một bản tập trung vào giải đố...).
  - **QUY TẮC TIẾN TRIỂN TÌNH CẢM (BẮT BUỘC):** Tình cảm là một quá trình. Tuyệt đối không được cho nhân vật chính chinh phục quá nhiều mĩ nhân trong một Arc ngắn. Mỗi Arc chỉ nên tập trung sâu vào mối quan hệ với 1 nhân vật, những người khác phải để dành cho các Arc sau.
  - Đảm bảo tính liên tục và logic với dàn ý hiện tại.
  - Phát triển sâu hơn các mối quan hệ và mâu thuẫn đã thiết lập.
  - Đưa thêm các nhân vật từ danh sách vào nếu họ chưa xuất hiện hoặc cần tái xuất.

  ⚠️ CẬP NHẬT STORY BIBLE (BẮT BUỘC NHƯNG CẨN TRỌNG):
  Thế giới truyện là một thực thể sống nhưng phải thiết lập trên một nền tảng vững chắc. Trong quá trình đề xuất các Arc tiếp theo, bạn ĐƯỢC PHÉP tạo thêm nhưng PHẢI TUÂN THỦ TÍNH GỐC RỄ CỦA THẾ GIỚI:
  - CẤM VIẾT ĐÈ (OVERWRITE) SAI LỆCH THẾ GIỚI: Tuyệt đối không xóa bỏ hay thay đổi thông tin Codex, Timeline hay nguồn gốc hệ thống sức mạnh đã được thiết lập từ đầu.
  - newCharacters: Thêm bất kỳ nhân vật nào xuất hiện trong Arc (kể cả phụ hay kẻ thù tạm thời).
    + QUY TẮC TÍNH CÁCH: CHỈ mô tả bên ngoài/bên trong. CẤM tạo nhân vật cốt lõi có bản tính xấu xa thủ đoạn trừ khi yêu cầu. Cấm hắc hóa nhân vật vô lý.
    + QUY TẮC NSFW: BẮT BUỘC sáng tạo sexualExperience, nsfwPersonality, nsfwReactions.
  - **DÒNG THỜI GIAN (TIMELINE) & CODEX:** CHỈ thêm vào sự kiện mới diễn ra trong truyện HOẶC sự kiện quá khứ mới được khám phá nhưng PHẢI LOGIC. Cấm viết đè hay sửa lịch sử gốc. Không dùng "Năm 0". NẾU KHÔNG CÓ DIỄN BIẾN GÌ MỚI LÀM THAY ĐỔI CODEX HAY TIMELINE, HÃY ĐỂ TRỐNG PHẦN CẬP NHẬT ĐÓ.
  - characterUpdates: KHI CẬP NHẬT NHÂN VẬT CŨ: CẤM XÓA SỔ THÔNG TIN CŨ. BẮT BUỘC PHẢI SAO CHÉP GIỮ LẠI TẤT CẢ các thông tin cũ (vẫn còn đúng) và CHỈ VIẾT BỔ SUNG thay đổi. TUYỆT ĐỐI KHÔNG xuất ra các chuỗi vô nghĩa như "Không thay đổi", "Không đổi" - nếu một trường không có sự thay đổi, HÃY BỎ QUA TRƯỜNG ĐÓ. KHÔNG ĐƯỢC PHÉP THAY ĐỔI NGOẠI HÌNH HAY TÍNH CÁCH GỐC. Chỉ cập nhật trạng thái sống/chết, vị thế.
  - worldUpdates: Cập nhật biến số hiện hành, TUYỆT ĐỐI KHÔNG sửa thay đổi nguồn gốc thế giới. ĐẶC BIỆT chú ý thay đổi **Kim chỉ nam của câu chuyện (storyGuidingPrinciple)** để phản ánh sự tịnh tiến mục tiêu.
`;

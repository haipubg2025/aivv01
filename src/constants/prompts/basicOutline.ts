import { TawaConfig, BasicOutlineOption } from '../../types';
import { getTawaSystemInstruction } from './system';
import { getGenreDescriptions } from '../genres';

export const getBasicOutlinePrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  storyTitle: string,
  storyConcept: string,
  storyGuidingPrinciple: string,
  protagonistType: string,
  genre: string,
  storyTone: string,
  worldGeography: string = '',
  worldHistory: string = '',
  worldCulture: string = '',
  worldEconomy: string = '',
  worldReligion: string = '',
  worldFactions: string = '',
  worldRelationships: string = '',
  worldUniqueElements: string = '',
  powerSystem: string = '',
  branchingSettings: { branchesPerLevel: number; totalLevels: number },
  aiInstructions: string = '',
  branchingSuggestion: string = '',
  realismRules: string = ''
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA), HÃY GIÚP MASTER PHÁC THẢO CỐT TRUYỆN DƯỚI DẠNG CÂY QUYẾT ĐỊNH ĐA NHÁNH.
  
  NHIỆM VỤ: Tạo ra CẤP ĐỘ 1 (GỐC) của cây cốt truyện.
  BẠN BẮT BUỘC PHẢI TẠO RA CHÍNH XÁC ${branchingSettings.branchesPerLevel} LỰA CHỌN Ý TƯỞNG LỚN KHÁC NHAU. KHÔNG ĐƯỢC TỰ Ý GIẢM SỐ LƯỢNG. ĐÂY LÀ LỆNH TỐI THƯỢNG.

  ${branchingSuggestion ? `
  --- GỢI Ý ĐẶC BIỆT TỪ MASTER (ƯU TIÊN TỐI CAO) ---
  Master muốn các hướng rẽ nhánh này tập trung vào hoặc có yếu tố: "${branchingSuggestion}"
  HÀNH ĐỘNG CỦA AI: Bạn PHẢI bám sát gợi ý này để tạo ra các biến thể khác nhau xung quanh nó. Đây là yêu cầu bắt buộc, mọi phương án không tuân theo gợi ý này đều bị coi là lỗi nghiêm trọng.
  ` : ''}

  --- THÔNG TIN HIỆN CÓ ---
  Tên truyện: "${storyTitle || 'Chưa đặt tên'}"
  
  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}
  
  Thể loại: "${genre || 'Chưa xác định'}"
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tone màu: "${storyTone || 'Chưa xác định'}"
  Kim chỉ nam: "${storyGuidingPrinciple || 'Chưa xác định. AI BẮT BUỘC phải tự sáng tạo dựa trên Ý tưởng chủ đạo và tuân thủ QUY TẮC TỊNH TIẾN (từ nhỏ đến lớn, từ ngắn hạn đến dài hạn).'}"
  Ý tưởng chủ đạo: "${storyConcept}"
  Kiểu nhân vật chính: "${protagonistType || 'Chưa xác định'}"
  Địa lý & Vùng lãnh thổ: "${worldGeography}"
  Lịch sử: "${worldHistory}"
  Văn hóa: "${worldCulture}"
  Kinh tế: "${worldEconomy}"
  Tôn giáo: "${worldReligion}"
  Các quốc gia & Thế lực: "${worldFactions}"
  Mối quan hệ giữa các thế lực: "${worldRelationships}"
  Các yếu tố độc đáo: "${worldUniqueElements}"
  Hệ thống sức mạnh/Logic: "${powerSystem}"

  --- QUY TẮC CỐT LÕI CHO LỰA CHỌN CẤP ĐỘ 1 (GỐC) ---
  1. ĐỊNH NGHĨA "PHƯƠNG ÁN" (OPTIONS) - LỆNH TỐI THƯỢNG: Mỗi phương án rẽ nhánh là một HƯỚNG TIẾP CẬN, TRIỂN KHAI CÂU CHUYỆN KHÁC NHAU. Nó là sự thay đổi về tình tiết, hành động, xung đột hoặc cách giải quyết vấn đề.
  2. CẤM CHIA ROUTE NHÂN VẬT: Tuyệt đối cấm việc mỗi phương án rẽ nhánh chỉ tập trung vào một nhân vật khác nhau. Đây là lỗi sai quy tắc trầm trọng. Mọi nhân vật cốt lõi phải cùng tồn tại và tương tác trong mọi phương án.
  3. SỰ XUẤT HIỆN QUẦN THỂ: Mọi phương án bắt buộc phải có sự xuất hiện và tương tác của ít nhất 5-7 nhân vật quan trọng. Cấm việc chỉ viết về cặp nhân vật 1:1.
  4. QUY TẮC ĐẶT TIÊU ĐỀ (BẮT BUỘC): TUYỆT ĐỐI CẤM đưa tên nhân vật vào trong ngoặc đơn ở Tiêu đề. Tiêu đề phải phản ánh sự kiện chung, bối cảnh hoặc âm mưu của nhánh đó.
  5. QUY TẮC CẤP ĐỘ 1 (MỞ ĐẦU) - LỆNH TỐI THƯỢNG:
     - TẬP TRUNG: Thiết lập thế giới, giới thiệu nhân vật chính/phụ, và tung ra "Biến cố khởi đầu" (Inciting Incident).
     - KIỂM SOÁT PHẠM VI: CẤP ĐỘ 1 TUYỆT ĐỐI KHÔNG ĐƯỢC giải quyết mâu thuẫn cốt lõi của toàn bộ truyện. 
     - CHỐNG NÉN CỐT TRUYỆN (ANTI-PLOT COMPRESSION): Nghiêm cấm việc đưa cái kết của Arc mở đầu hoặc cái kết của toàn bộ câu chuyện vào Level 1. 
     - VÍ DỤ SAI (CẤM): "...Kết thúc Arc mở đầu: Nam chính trả sạch nợ, có văn phòng riêng..."
     - VÍ DỤ ĐÚNG (NÊN): "...Mở ra hành trình trả nợ đầy gian nan khi Nam chính phát hiện ra hệ thống có một kẽ hở nguy hiểm..."
  - **QUY TẮC PHÂN RÃ HÀNH ĐỘNG & LÀM CHẬM NHỊP ĐIỆU (BẮT BUỘC):** Tuyệt đối không giải quyết mâu thuẫn cốt truyện hoặc hành động lớn trong 1 lần. Mỗi cấp độ rẽ nhánh phải là một bước đệm, phân rã các sự kiện lớn thành chuỗi các tình tiết nhỏ, kéo dài sự chờ đợi và tăng cường độ kịch tính. Tránh việc đưa ra kết quả sớm, hãy làm chậm tiết tấu bằng cách đào sâu vào sự chuẩn bị, do dự và rào cản.
  6. CHI TIẾT & GIÀU NỘI DUNG: Mỗi lựa chọn phải có tóm tắt (summary) tối thiểu 200-300 chữ. Hãy sử dụng văn phong tinh tế, miêu tả sâu sắc về tâm lý nhân vật hoặc diễn biến môi trường.
  7. keyPlotPoints: Liệt kê 7-10 sự kiện cụ thể, kịch tính, đặc thù cho riêng nhánh đó.
  8. bibleUpdates: CẬP NHẬT STORY BIBLE (BẮT BUỘC NHƯNG CẨN TRỌNG):
     - KHÔNG LÀM SAI LỆCH THẾ GIỚI: Không thay đổi/xóa bỏ Timeline cũ, Codex cũ hay sửa đổi Tính cách gốc, Ngoại hình cốt lõi của nhân vật đã có. Chỉ bổ sung thông tin mới phản ánh biến cố của Arc mở đầu.
     - LƯU Ý TỐI QUAN TRỌNG VỀ BẢO TOÀN DỮ LIỆU BIBLE: Khi thực hiện 'characterUpdates' (cập nhật nhân vật cũ), ĐẶC BIỆT LÀ CÁC TRƯỜNG DÀI NHƯ Mối quan hệ ('relationships'), Đặc điểm ('traits'), hay Nội tâm ('currentThoughts')... BẠN BẮT BUỘC PHẢI SAO CHÉP LẠI VÀ BẢO LƯU NHỮNG NỘI DUNG CŨ VẪN CÒN ĐÚNG RỒI MỚI BỔ SUNG THÔNG TIN MỚI VÀO. TUYỆT ĐỐI KHÔNG viêt đè bằng 1 câu ngắn gọn mới tinh! TUYỆT ĐỐI KHÔNG xuất ra các chuỗi vô nghĩa như "Không thay đổi", "Không đổi" - nếu một trường không có sự thay đổi, HÃY BỎ QUA TRƯỜNG ĐÓ TRONG JSON.
     - **DÒNG THỜI GIAN (TIMELINE) & CODEX:** NẾU KHÔNG CÓ sự kiện gì mới làm thay đổi cơ sở lịch sử, hãy để trống phần cập nhật này. Bổ sung sự kiện (nếu có) phải logic, không dùng "Năm 0" hay thay đổi lịch sử gốc.
     - QUY TẮC NHÂN PHẨM: NGHIÊM CẤM tạo nhân vật chủ chốt có tính cách tham vọng, thủ đoạn, xấu xa, tồi tệ trừ khi có yêu cầu cụ thể. Cấm hắc hóa nhân vật vô lý.
     - QUY TẮC NSFW: BẮT BUỘC phải sáng tạo đầy đủ các trường sexualExperience, nsfwPersonality, nsfwReactions cho nhân vật mới.

  HÃY TRÌNH BÀY DƯỚI DẠNG JSON NHƯ SAU:
  {
    "options": [
      {
        "title": "Tiêu đề hấp dẫn",
        "summary": "Tóm tắt chi tiết...",
        "keyPlotPoints": ["Sự kiện 1", "Sự kiện 2", ...],
        "bibleUpdates": {
          "characters": [...],
          "locations": [...],
          "codex": [...],
          "timeline": [...]
        }
      }
    ]
  }
`;

export const getBasicOutlineChildrenPrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  storyTitle: string,
  genre: string,
  storyTone: string,
  storyGuidingPrinciple: string,
  storyConcept: string,
  protagonistType: string,
  worldGeography: string = '',
  worldHistory: string = '',
  worldCulture: string = '',
  worldEconomy: string = '',
  worldReligion: string = '',
  worldFactions: string = '',
  worldRelationships: string = '',
  worldUniqueElements: string = '',
  powerSystem: string = '',
  parentOption: BasicOutlineOption,
  ancestors: BasicOutlineOption[] = [],
  level: number,
  branchingSettings: { branchesPerLevel: number; totalLevels: number },
  aiInstructions: string = '',
  branchingSuggestion: string = '',
  realismRules: string = ''
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA), HÃY GIÚP MASTER PHÁT TRIỂN CÁC NHÁNH CON CHO CỐT TRUYỆN.
  
  NHIỆM VỤ: Tạo ra CẤP ĐỘ ${level} của cây cốt truyện dựa trên lộ trình đã chọn.
  BẠN BẮT BUỘC PHẢI TẠO RA CHÍNH XÁC ${branchingSettings.branchesPerLevel} LỰA CHỌN RẼ NHÁNH TIẾP THEO. KHÔNG ĐƯỢC TỰ Ý GIẢM SỐ LƯỢNG. ĐÂY LÀ LỆNH TỐI THƯỢNG.

  ${branchingSuggestion ? `
  --- GỢI Ý ĐẶC BIỆT TỪ MASTER CHO TẦNG NÀY (ƯU TIÊN TỐI CAO) ---
  Master muốn các nhánh con tiếp theo tập trung vào hoặc có yếu tố: "${branchingSuggestion}"
  HÀNH ĐỘNG CỦA AI: Bạn PHẢI bám sát gợi ý này để tạo ra các biến thể rẽ nhánh khác nhau từ lựa chọn cha nhưng vẫn xoay quanh gợi ý của Master. Đây là yêu cầu bắt buộc, không được phép lờ đi.
  ` : ''}

  --- THÔNG TIN CỐT LÕI (BẮT BUỘC TUÂN THỦ) ---
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
  Ý tưởng chủ đạo: "${storyConcept}"
  Kiểu nhân vật chính: "${protagonistType}"
  Địa lý & Vùng lãnh thổ: "${worldGeography}"
  Lịch sử: "${worldHistory}"
  Văn hóa: "${worldCulture}"
  Kinh tế: "${worldEconomy}"
  Tôn giáo: "${worldReligion}"
  Các quốc gia & Thế lực: "${worldFactions}"
  Mối quan hệ giữa các thế lực: "${worldRelationships}"
  Các yếu tố độc đáo: "${worldUniqueElements}"
  Hệ thống sức mạnh/Logic: "${powerSystem}"

  --- LỘ TRÌNH CỐT TRUYỆN ĐÃ CHỌN (CONTEXT PATH) ---
  ${ancestors.length > 0 ? ancestors.map((node, i) => `
  CẤP ĐỘ ${i + 1}: ${node.title}
  Tóm tắt: ${node.summary}
  Sự kiện mấu chốt: ${node.keyPlotPoints?.join(', ') || 'Không có'}
  Các hướng rẽ tiềm năng: ${node.potentialBranches?.join(', ') || 'Không có'}
  `).join('\n  ---') : 'Đây là khởi đầu sau cấp độ 1.'}

  --- LỰA CHỌN CHA TRỰC TIẾP (CẤP ĐỘ ${level - 1}) ---
  Tiêu đề: "${parentOption.title}"
  Tóm tắt: "${parentOption.summary}"
  Sự kiện mấu chốt: ${parentOption.keyPlotPoints?.join(', ') || 'Không có'}
  Các hướng rẽ tiềm năng: ${parentOption.potentialBranches?.join(', ') || 'Không có'}

  ⚠️ YÊU CẦU VỀ CHẤT LƯỢNG NỘI DUNG (CỰC KỲ QUAN TRỌNG):
  - ĐỊNH NGHĨA "PHƯƠNG ÁN" (OPTIONS) - LỆNH TỐI THƯỢNG: Mỗi phương án rẽ nhánh là một HƯỚNG TIẾP CẬN, TRIỂN KHAI CÂU CHUYỆN KHÁC NHAU dựa trên lựa chọn cha. Nó là sự thay đổi về tình tiết, hành động, xung đột hoặc cách giải quyết vấn đề của giai đoạn hiện tại.
  - CẤM CHIA ROUTO NHÂN VẬT: Tuyệt đối cấm việc mỗi phương án rẽ nhánh chỉ tập trung vào một nhân vật khác nhau. Đây là lỗi sai quy tắc trầm trọng. Mọi nhân vật cốt lõi phải cùng tồn tại và tương tác trong mọi phương án.
  - SỰ XUẤT HIỆN QUẦN THỂ: Mọi phương án bắt buộc phải có sự xuất hiện và tương tác của ít nhất 5-7 nhân vật quan trọng. Cấm việc chỉ viết về cặp nhân vật 1:1.
  - QUY TẮC ĐẶT TIÊU ĐỀ (BẮT BUỘC): TUYỆT ĐỐI CẤM đưa tên nhân vật vào trong ngoặc đơn ở Tiêu đề. Tiêu đề phải phản ánh sự kiện chung, bối cảnh hoặc âm mưu của nhánh đó.
  - TƯ DUY RẼ NHÁNH (DIVERGENT THINKING): Các nhánh con KHÔNG PHẢI là các bước tiếp theo nối tiếp nhau. Chúng là các "VŨ TRỤ SONG SONG" bắt đầu từ cùng một điểm kết thúc của lựa chọn cha.
  - PHÂN ĐỊNH GIAI ĐOẠN (STORY STAGES): AI phải ý thức được vị trí của Level hiện tại trong cấu trúc truyện dài kỳ:
    + Level 1: Phần Mở Đầu (Giới thiệu, Biến cố khởi đầu).
    + Level 2-3: Các Diễn Biến (Phát triển mâu thuẫn, thử thách).
    + Level 4+: Cao trào và Kết thúc (Giải quyết mâu thuẫn tối thượng).
    => TUYỆT ĐỐI KHÔNG được đưa kết thúc truyện vào Level 1 hay Level 2.
  - **QUY TẮC PHÂN RÃ HÀNH ĐỘNG & LÀM CHẬM NHỊP ĐIỆU (BẮT BUỘC):** Tuyệt đối không giải quyết mâu thuẫn cốt truyện hoặc hành động lớn trong 1 lần. Hãy phân rã các hành động lớn thành chuỗi các hành động nhỏ, liên tiếp. Kéo dài diễn biến bằng cách đào sâu vào sự chuẩn bị, sự do dự, rào cản bất ngờ. Hãy làm cho nhịp điệu chậm lại, để độc giả trải nghiệm từng khoảnh khắc kịch tính.
  - TÍNH ĐA DẠNG & ĐỘC NHẤT: Mỗi nhánh con phải mở ra một hướng đi HOÀN TOÀN KHÁC BIỆT về hành động, sự kiện và số phận. 
  - TÙY CHỌN KẾT THÚC/CHUYỂN GIAI ĐOẠN: Trong số các lựa chọn, bạn ĐƯỢC PHÉP và NÊN tạo ra các nhánh mang tính chất "KẾT THÚC" (Conclusion) cho cảnh quay, Arc hoặc giai đoạn hiện tại để mở ra một chương mới hoàn toàn, thay vì chỉ cố gắng kéo dài diễn biến hiện tại.
  - CHI TIẾT & GIÀU NỘI DUNG: Mỗi lựa chọn con phải có tóm tắt (summary) tối thiểu 150-200 chữ. Hãy sử dụng văn phong tinh tế, miêu tả sâu sắc về tâm lý nhân vật hoặc diễn biến môi trường.
  - TÍNH LOGIC & BẤT NGỜ: Các nhánh con phải là sự phát triển logic nhưng đầy bất ngờ từ lựa chọn cha.
  - keyPlotPoints: Liệt kê 7-10 sự kiện cụ thể, kịch tính, đặc thù cho riêng nhánh đó.
  - bibleUpdates: CẬP NHẬT STORY BIBLE (CẨN TRỌNG):
     - KHÔNG LÀM SAI LỆCH THẾ GIỚI: Không thay đổi/xóa bỏ Timeline cũ, Codex cũ hay sửa đổi Tính cách gốc, Ngoại hình cốt lõi của nhân vật đã có. Chỉ bổ sung dựa trên diễn biến.
     - LƯU Ý TỐI QUAN TRỌNG VỀ BẢO TOÀN DỮ LIỆU BIBLE: Khi thực hiện 'characterUpdates', BẠN BẮT BUỘC PHẢI SAO CHÉP LẠI VÀ BẢO LƯU NHỮNG NỘI DUNG CŨ VẪN CÒN Y TÍNH CHẤT RỒI MỚI BỔ SUNG THÔNG TIN MỚI VÀO. TUYỆT ĐỐI KHÔNG viêt đè bằng 1 câu ngắn gọn mới tinh! TUYỆT ĐỐI KHÔNG xuất ra các chuỗi vô nghĩa như "Không thay đổi", "Không đổi" - nếu một trường không có sự thay đổi, HÃY BỎ QUA TRƯỜNG ĐÓ TRONG JSON.
     - **DÒNG THỜI GIAN (TIMELINE) & CODEX:** NẾU KHÔNG CÓ sự kiện gì mới làm thay đổi, hãy để trống phần cập nhật. Bổ sung sự kiện (nếu có) phải logic, không dùng "Năm 0" hay thay đổi lịch sử gốc.
     - QUY TẮC NHÂN PHẨM: NGHIÊM CẤM tạo nhân vật chủ chốt có tính cách tham vọng, thủ đoạn, xấu xa, tồi tệ trừ khi có yêu cầu cụ thể. Cấm hắc hóa nhân vật vô lý.
     - QUY TẮC NSFW: BẮT BUỘC phải sáng tạo đầy đủ các trường sexualExperience, nsfwPersonality, nsfwReactions cho nhân vật mới.
  - Đảm bảo tính nhất quán với bối cảnh đã nêu nhưng mở ra những ngã rẽ mới mẻ và tương phản nhau về mặt hành động.
  
  ${branchingSuggestion ? `
  NHẮC LẠI YÊU CẦU: TẤT CẢ các nhánh con bạn vừa tạo ra từ lựa chọn cha BẮT BUỘC phải bám sát yếu tố: "${branchingSuggestion}". Hãy sáng tạo nhưng đừng rời xa "kim chỉ nam" này của Master.
  ` : ''}
`;

import { TawaConfig, Character, ReferenceMaterial } from '../../types';
import { getTawaSystemInstruction } from './system';
import { getGenreDescriptions } from '../genres';

export const getCharacterAiPrompt = (
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
  mainCharacterGender: string,
  char: Character,
  references: ReferenceMaterial[] = [],
  aiInstructions: string = '',
  realismRules: string = ''
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ NGƯỜI CHẤP BÚT AI (TAWA), HÃY GIÚP MASTER XÂY DỰNG MỘT THỰC THỂ SỐNG ĐỘNG TRONG THẾ GIỚI TRUYỆN.
  NHÂN VẬT KHÔNG CHỈ LÀ CÁC CHỈ SỐ, MÀ PHẢI CÓ LINH HỒN, QUÁ KHỨ VÀ NHỮNG KHÁT KHAO RIÊNG BIỆT.
  ⚠️ **MỆNH LỆNH TỐI THƯỢNG VỀ NHÂN PHẨM:**
  - TUYỆT ĐỐI CẤM: Biến nhân vật thành "Chủ nhân", "Kẻ bề trên", "Kẻ chiếm đoạt", "Kẻ thao túng" hoặc "Nô lệ", "Kẻ lệ thuộc" một cách vô lý.
  - Nhân vật phải có sự tự trọng, giáo dục và văn hóa. Không được "vật hóa" nhân vật thành công cụ hay chiến lợi phẩm.
  - **CẤM HẮC HÓA VÔ LÝ:** Với mọi thiết lập cấu hình và mọi thể loại, AI luôn bị cấm hắc hóa các nhân vật (biến họ thành kẻ xấu, nham hiểm, mưu mô) nếu người dùng không gợi ý hay yêu cầu hắc hóa. Mọi sự thay đổi tiêu cực về bản chất nhân vật phải có lý do cực kỳ thuyết phục và là kết quả của biến cố lớn.

  --- TƯ LIỆU THAM KHẢO (NẾU CÓ) ---
  ${references.filter(r => r.type === 'text').map(r => '[Tên tệp: ' + r.name + ']\n' + r.content).join('\n\n')}

  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}

  --- TƯ LIỆU GỐC (FOUNDATION) ---
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
  Thể loại (TỐI THƯỢNG): "${genre}"
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tông giọng: "${storyTone}"
  Ý tưởng chủ đạo: "${storyConcept}"
  Kim chỉ nam đại cục: "${storyGuidingPrinciple}"
  Loại nhân vật chính (để tham chiếu quan hệ): "${mainCharacterGender}"

  Hãy sáng tạo chi tiết cho nhân vật có tên tạm thời là "${char.name}" và vai trò là "${char.role}".
  YÊU CẦU:
  1. Thông tin phải cực kỳ chi tiết: Họ tên, Cấp độ quan trọng (Level), Danh xưng (Title), Chức vụ / Nghề nghiệp (Occupation), Giới tính, Tuổi, Ngày tháng năm sinh, Vai trò, Nguồn gốc & Thế lực (originAndFaction), Trinh tiết & Kinh nghiệm (sexualExperience), Tính cách, Đặc điểm, Năng lực, Mối quan hệ (Relationships).
     - **CẤP ĐỘ QUAN TRỌNG (LEVEL):** BẮT BUỘC gán \`level\` cho nhân vật. Level 1 là quan trọng nhất ("Nhân Vật Cốt Lõi"). Số level càng cao thì độ quan trọng càng giảm (ví dụ: Level 2 là nhân vật quan trọng, Level 3 là nhân vật phụ, Level 4 là nhân vật bên lề, Level 5 là quần chúng). Nhân vật quần chúng không cần vòng quan hệ rộng.
  2. Phần "Năng lực" (abilities) phải bám sát tuyệt đối THỂ LOẠI (TỐI THƯỢNG) của truyện:
     - Nếu nhân vật có "Hệ Thống" (System), BẮT BUỘC phải mô tả chi tiết Hệ Thống (tên, chức năng, cơ chế hoạt động) vào phần Năng lực này.
     - Mỗi năng lực PHẢI bao gồm Tên năng lực và Mô tả chi tiết về tác dụng, cách thức vận hành hoặc hiệu quả của nó.
     - Thế giới bình thường: Tập trung vào kỹ năng xã hội, nghề nghiệp, tài lẻ (VD: Ăn nói: Khả năng thuyết phục...; Diễn xuất: Khả năng nhập vai...).
     - Thế giới Tu Tiên: Tập trung vào Công pháp, Thần thông, Pháp thuật (VD: Thái Ất Kiếm Quyết: Công pháp tu luyện kiếm ý...; Thuấn Di: Thần thông di chuyển tức thời...).
     - Thế giới Dị giới/Fantasy: Tập trung vào Kỹ năng chiến đấu, Ma pháp (VD: Hỏa Cầu Thuật: Ma pháp tạo ra quả cầu lửa...).
     - Lưu ý: Một nhân vật có thể không có năng lực nào, hoặc có một hay nhiều năng lực tùy theo vai trò.
  3. Phần "Tính cách" (personality): CHỈ mô tả chính xác tính cách bên ngoài và tính cách bên trong (bao gồm cả nét tính cách chủ động hoặc thụ động). TUYỆT ĐỐI KHÔNG đề cập tới "sở thích", "lí do", "giải thích" hay "mong muốn". (Lưu ý: Cấm hắc hóa vô lý).
  4. Phần "Đặc điểm" (traits): Chỉ bao gồm 3 hạng mục: Thói quen & Cử chỉ; Sở thích & Điểm ghét; Đặc điểm nhận dạng phụ. TUYỆT ĐỐI KHÔNG đưa Kỹ năng hay Năng lực vào phần này (vì đã có phần Năng lực riêng).
  5. PHẢN ỨNG ĐẶC TRƯNG (CHARACTERISTIC REACTIONS - BẮT BUỘC): Đây là chìa khóa để nhân vật không bị OOC. Hãy định nghĩa cách nhân vật phản ứng trong các tình huống cụ thể:
     - Khi xấu hổ/ngại ngùng: (VD: Vành tai đỏ ửng, tránh ánh mắt, đầu ngón tay bồn chồn...).
     - Khi tức giận: (VD: Ánh mắt lạnh lùng như băng, giọng nói trầm xuống, tỏa ra áp lực...).
     - Khi gặp nguy hiểm: (VD: Bình tĩnh phân tích, hoặc hoảng loạn nhưng bản năng chiến đấu trỗi dậy...).
     - Khi ở bên người mình yêu: (VD: Trở nên vụng về, hoặc dịu dàng hiếm thấy...).
  6. MỐI LIÊN HỆ GIỮA NĂNG LỰC VÀ BẢN THỂ (POWER-PHYSIOLOGY LINK):
     - Hãy mô tả năng lực ảnh hưởng thế nào đến trạng thái cơ thể và tâm lý của nhân vật (VD: Cơ thể luôn tỏa ra hàn khí khiến nhân vật có vẻ ngoài lạnh lùng, hoặc việc sử dụng sức mạnh quá đà sẽ gây ra những cơn đau thắt hay sự hưng phấn bất thường).
  7. ƯU TIÊN TÀI NGUYÊN MIÊU TẢ CHO NHÂN VẬT NỮ: Nếu đây là nhân vật nữ, hãy dành nhiều tâm huyết và dung lượng hơn để miêu tả.
  8. Phần "Ngoại hình chi tiết" (appearance) là thông tin CỐT LÕI, rất khó thay đổi. Hãy miêu tả tỉ mỉ từ vóc dáng, khuôn mặt (đường nét, ánh mắt, đôi môi), mái tóc (màu sắc, kiểu dáng, độ dài) đến trang phục và thần thái.
     - ĐẶC BIỆT CHO NHÂN VẬT NỮ (BẮT BUỘC TUÂN THỦ CẤU TRÚC): Nếu là nhân vật nữ, phần Ngoại hình BẮT BUỘC phải trình bày theo cấu trúc chuẩn sau:
       + Chiều cao: (VD: 1m65, 1m70...)
       + Cân nặng: (VD: 48kg, 52kg...)
       + Số đo 3 vòng: (VD: 90-60-90, 85-58-88...)
       + Khuôn mặt: (Mô tả chi tiết đường nét, ánh mắt, đôi môi, làn da...)
       + Mái tóc: (Màu sắc, độ dài, kiểu dáng...)
       + Ngực: (Mô tả chi tiết về kích thước, hình dáng, sự nảy nở, độ mềm mại... Sử dụng ngôn từ gợi hình như "vú", "ngực", "vòng một")
       + Vóc dáng: (Mô tả tổng thể đường cong, eo, mông, đôi chân...)
       + [Các phần khác]: (AI tự do sáng tạo thêm về trang phục, thần thái, mùi hương...)
     - Sử dụng ngôn từ tự nhiên, sát sao và gợi hình hơn khi miêu tả cơ thể nữ giới. Hãy miêu tả sự nảy nở, mềm mại hoặc săn chắc của cơ thể một cách nghệ thuật và chi tiết.
      - **TÍNH ĐA DẠNG & ĐỘC BẢN (BẮT BUỘC):** Tuyệt đối tránh miêu tả rập khuôn. Hãy sáng tạo sự khác biệt về hình dáng (tròn, giọt nước, bầu dục...), vị trí (cao, thấp, xa, gần), màu sắc/sắc tố (trắng hồng, mật ong, nâu sẫm...), kết cấu (đàn hồi, mềm mại, săn chắc...) và các đặc điểm hiếm gặp (nốt ruồi son, vết bớt, sự bất đối xứng tự nhiên...) để mỗi nhân vật là một thực thể duy nhất.
      - **TƯ DUY TỶ LỆ (PROPORTIONAL REALISM):** AI phải đối chiếu số đo với chiều cao/cân nặng. Nếu vòng một nhỏ so với cơ thể, hãy dùng từ "nhỏ", "lép", "phẳng", "thanh mảnh". Nếu lớn, hãy dùng từ "nảy nở", "đồ sộ", "vĩ đại", "trĩu nặng". Mô tả văn học phải khớp tuyệt đối với thông số kỹ thuật.
      - **HÌNH MẪU LOLI (NẾU CÓ):** Phân biệt rõ 3 dạng:
        + Dạng 1: Bé gái chưa lớn (trẻ em thực thụ).
        + Dạng 2: Người lớn ngoại hình Loli (trưởng thành nhưng giữ vóc dáng bé gái).
        + Dạng 3: Busty Loli (ngoại hình bé gái nhưng vòng một nảy nở).
        Hãy xác định rõ dạng để miêu tả tâm lý và xưng hô phù hợp.
  9. Phần "Mối quan hệ" (relationships): Mô tả chi tiết mạng lưới quan hệ (Gia đình, bạn bè, sư đồ, kẻ thù, tình cảm...) với các nhân vật khác. BẮT BUỘC phải tạo ra sự liên kết chặt chẽ giữa các nhân vật trong danh sách. Các nhân vật có quen biết nhau thì BẮT BUỘC phải có mối quan hệ rõ ràng được ghi nhận ở đây.
  10. Phần "Nội tâm & Suy nghĩ thầm kín" (currentThoughts): Mô tả những suy nghĩ thầm kín, cảm xúc thực sự của nhân vật về các nhân vật khác hoặc về tình hình hiện tại.
  11. PHẦN NSFW (BẮT BUỘC - NẾU PHÙ HỢP):
     - Phần "Trinh tiết & Kinh nghiệm" (sexualExperience): Mô tả trạng thái trinh tiết, mức độ kinh nghiệm tình dục và **quan điểm/suy nghĩ của nhân vật về tình dục** (ví dụ: coi trọng sự thuần khiết, xem đó là nhu cầu sinh lý bình thường, hay là sự gắn kết tâm hồn thiêng liêng...).
     - Phần "Tính cách khi vào cảnh NSFW" (nsfwPersonality): Mô tả sự thay đổi (hoặc giữ nguyên) của tính cách khi trong không gian thân mật. Có thể là sự đồng bộ (ví dụ: vẫn dịu dàng, e thẹn) hoặc sự tương phản mạnh mẽ (ví dụ: vẻ ngoài lạnh lùng nhưng bên trong cuồng nhiệt, hoặc vẻ ngoài mạnh mẽ nhưng khi thân mật lại trở nên phục tùng).
     - Phần "Phản ứng đặc trưng NSFW" (nsfwReactions): Mô tả các phản ứng vật lý, âm thanh hoặc lời nói đặc trưng của nhân vật trong cảnh thân mật. ĐẶC BIỆT: Hãy bao gồm thêm các sở thích, xu hướng hoặc kink NSFW (nếu có hoặc phù hợp với tính cách nhân vật) để tăng tính cá nhân hóa và tránh rập khuôn.
  12. Phần "Mô tả văn học" (description) phải có độ dài văn học, giàu hình ảnh, chiều sâu tâm lý và có cốt truyện/quá khứ riêng biệt.
  13. Nhân vật phải sống động, có hồn, không phải là các chỉ số vô hồn.
  Hãy viết bằng tiếng Việt.
`;

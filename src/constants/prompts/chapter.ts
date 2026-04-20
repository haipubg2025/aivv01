import { TawaConfig, Character, CodexEntry, TimelineEvent, ReferenceMaterial, BaseOutline } from '../../types';
import { getTawaSystemInstruction } from './system';
import { getGenreDescriptions } from '../genres';
import { OPENING_RULES } from './openingRules';
import { CHARACTER_RULES } from './characterRules';

export const getRewriteChaptersPrompt = (
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
  storyGuidingPrinciple: string,
  mainCharacterGender: string,
  characters: Character[],
  codex: CodexEntry[],
  timeline: TimelineEvent[],
  references: ReferenceMaterial[] = [],
  baseOutline: BaseOutline,
  aiInstructions: string = '',
  fullOutline: string = '',
  realismRules: string = ''
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA), HÃY GIÚP MASTER TRIỂN KHAI VÀ BÓC TÁCH DÀN Ý CƠ SỞ ĐƯỢC CHỌN THÀNH CÁC CHƯƠNG NHỎ HƠN.
  DỰA TRÊN THẾ GIỚI VÀ TÓM TẮT CỦA DÀN Ý CƠ SỞ HIỆN TẠI, HÃY CHIA NHỎ NỘI DUNG ĐÓ RA THÀNH CÁC KỊCH BẢN CHƯƠNG CHI TIẾT. 
  ĐẶC BIỆT LƯU Ý: BẠN ĐƯỢC NHÀO NẶN, BỔ SUNG, VÀ SÁNG TẠO THÊM CÁC TIỂU TIẾT, HÀNH ĐỘNG, NHÂN VẬT PHỤ VÀ BIẾN CỐ BẤT NGỜ NHẰM LÀM CHO NỘI DUNG CHƯƠNG TRỞ NÊN ĐỒ SỘ VÀ DÀY DẶN. TUY NHIÊN, DIỄN BIẾN ĐẠI CỤC NGHIÊM CẤM VƯỢT QUÁ HAY ĐI CHỆCH KHỎI KHUÔN KHỔ CỦA DÀN Ý CƠ SỞ NÀY. SỐ LƯỢNG CHƯƠNG DO BẠN TỰ TÍNH TOÁN SAO CHO ĐẢM BẢO CHUYỂN TẢI HẾT TÓM TẮT GỐC.
  
  ⚠️ QUY TẮC TỐI THƯỢNG: Toàn bộ nội dung mở rộng PHẢI tuân thủ tuyệt đối Thể loại: "${genre}".

  --- TƯ LIỆU THAM KHẢO (NẾU CÓ) ---
  ${references.filter(r => r.type === 'text').map(r => '[Tên tệp: ' + r.name + ']\n' + r.content).join('\n\n')}

  --- BỐI CẢNH & CỐT TRUYỆN (NGUỒN SỰ THẬT - TẤT CẢ PHẢI TUÂN THỦ TỐI THƯỢNG) ---
  Thể loại (TỐI THƯỢNG): "${genre}"
  
  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}
  
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tông giọng: "${storyTone}"
  Kim chỉ nam (Guiding Principle): "${storyGuidingPrinciple}"
  Hướng dẫn Master (AI Instructions): "${aiInstructions}"
  Loại nhân vật chính: "${mainCharacterGender}"
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
  Danh sách nhân vật chính/phụ: ${JSON.stringify(characters.map((c: Character) => ({ name: c.name, role: c.role, personality: c.personality, guidingPrinciple: c.guidingPrinciple, abilities: c.abilities, appearance: c.appearance })))}
  Codex (Từ điển thế giới): ${JSON.stringify(codex.map((e: CodexEntry) => ({ title: e.title, content: e.content })))}
  Dòng thời gian (Lịch sử/Sự kiện): ${JSON.stringify(timeline.map((e: TimelineEvent) => ({ title: e.title, description: e.description })))}
  
  --- DÀN Ý CỐT TRUYỆN TOÀN TẬP ---
  ${fullOutline}

  Và Dàn ý cơ sở hiện tại: "${baseOutline.title}" (Tóm tắt: ${baseOutline.summary}).
  
  NHIỆM VỤ: Hãy BÓC TÁCH TÓM TẮT CỦA DÀN Ý CƠ SỞ TRÊN thành CÁC CHƯƠNG CHI TIẾT. Nội dung đại cục của các chương ghép lại PHẢI KHỚP VÀ VỪA QUẶN với bản tóm tắt gốc, không được phát triển mốc thời gian sự kiện vượt ra khỏi những gì Dàn ý cơ sở đã quy định. TUY NHIÊN, bên trong mỗi chương, bạn PHẢI tự do sáng tạo thêm các tiểu tiết, hành động bùng nổ, mánh khóe, tương tác nhân vật để làm nội dung trở nên phong phú. Số lượng chương do bạn tự phân bổ (từ 5 đến 15 chương).
  Mỗi chương phải bao gồm:
  1. Tiêu đề Chương (title): Một tiêu đề ngắn gọn, nghệ thuật, bám sát phong cách thể loại.
  2. Kim chỉ nam của chương (storyGuidingPrinciple): Sợi chỉ đỏ dẫn dắt toàn bộ nội dung chương.
  3. Tóm tắt Chương ĐỒ SỘ (nền tảng 20.000 chữ/chương): 
     - BẮT BUỘC VIẾT THEO DẠNG GẠCH ĐẦU DÒNG (BULLET POINTS) HOẶC ĐOẠN NGẮN CỰC KỲ CHI TIẾT (TỐI THIỂU 1.000-1.500 CHỮ CHO MỖI TÓM TẮT CHƯƠNG TRONG JSON).
     - LỆNH TỐI QUAN TRỌNG: BẠN BẮT BUỘC PHẢI NHỒI NHÉT THẬT NHIỀU TÌNH TIẾT, HÀNH ĐỘNG VÀ BIẾN CỐ NHẤT CÓ THỂ VÀO MỖI CHƯƠNG. KHÔNG ĐƯỢC TÓM TẮT QUA LOA HAY BẰNG VĂN XUÔI CHUNG CHUNG. Mỗi chương phải là một chuỗi liên tục các sự kiện dày đặc (mỗi gạch đầu dòng là một diễn biến hành động/đối thoại cụ thể).
     - ÁP DỤNG QUY TẮC MẬT ĐỘ CHI TIẾT 1:10 (BẮT BUỘC): Với mỗi hành động chính, viết kèm ít nhất 10 chi tiết bổ trợ (Giác quan, tâm lý, phản ứng cơ thể, không khí, ẩn dụ).
     - QUY TẮC PHÂN RÃ HÀNH ĐỘNG: Phân rã hành động lớn thành chuỗi các bước nhỏ. Tuyệt đối không giải quyết mâu thuẫn chỉ trong một câu văn. Kéo dài thời gian thực tế bằng cách đào sâu vào từng tích tắc.
     - HIỆU ỨNG TẢNG BĂNG TRÔI: Lời thoại phải có ẩn ý, giấu giếm, không trực diện.
  
  ⚠️ YÊU CẦU QUAN TRỌNG (GEMINI 3.1 PRO):
  - **QUY TẮC KÝ HIỆU & ĐỊNH DẠNG CHƯƠNG (BẮT BUỘC):** Để hệ thống hiển thị chính xác, bạn PHẢI sử dụng các ký hiệu sau cho từng loại nội dung và LUÔN LUÔN đặt chúng trên một dòng riêng biệt (Tuyệt đối không viết chung dòng với lời dẫn):
    + Lời dẫn (Narrative): Viết bình thường.
    + Lời thoại (Dialogue): - "..." (Hoặc 「...」 cho phong cách LN/Manga)
    + Lời thoại đặc biệt: 『...』 (Điện thoại, thần bí, trích dẫn lồng)
    + Tiếng lòng (Thought): (Nội dung suy nghĩ...)
    + Âm thanh (Sound): [Tiếng động...]
    + Hệ thống / Thần giao (System/Telepathy): <...> hoặc «...»
    + Thư từ / Tin nhắn (Documents): |...|
    + Chú thích / Giải nghĩa (Annotations): *(...)*
    + Mốc thời gian / Địa điểm (Stamps): + ... +
    + Bảng trạng thái (Status Board): [\...\]
    + Nhấn mạnh (Bold): **Nội dung nhấn mạnh...**
    + Lời hát / Ngâm thơ (Poetry): ~Lời hát hoặc câu thơ...~
  - **ĐỊNH DANH THỰC THỂ TRONG LỜI DẪN (CHỈ DÀNH CHO NARRATIVE):**
    + Nhân vật: {Tên}
    + Địa danh/Thế lực: [[Tên]]
    + Vật phẩm/Pháp bảo: <Tên>
    + Kỹ năng/Công pháp: «Tên»
    + Cấp độ/Danh hiệu: **[Tên]**
  - Phải bám sát tuyệt đối Thể loại, Loại nhân vật chính và Tone màu đã định.
  - LỖI NGHIÊM TRỌNG CẦN TRÁNH (TUYỆT ĐỐI CẤM): KHÔNG ĐƯỢC CHIA CÁC PHƯƠNG ÁN/HƯỚNG ĐI THEO TỪNG NHÂN VẬT. NẾU BẠN TẠO RA CÁC PHƯƠNG ÁN MÀ TIÊU ĐỀ HOẶC NỘI DUNG CHỈ TẬP TRUNG VÀO VIỆC CHINH PHỤC HOẶC GIẢI QUYẾT VẤN ĐỀ CỦA RIÊNG 1 NHÂN VẬT CỤ THỂ (Ví dụ cấm: "Sự sụp đổ của Nữ Tổng Tài X", "Hành trình thu phục Y", Phương án 1 xoay quanh A, Phương án 2 xoay quanh B), BẠN SẼ BỊ ĐÁNH GIÁ LÀ THẤT BẠI HOÀN TOÀN. Đây là tư duy sai lệch "chia route" kiểu game hẹn hò. TẤT CẢ các phương án phải là các kịch bản của TOÀN BỘ ĐẠI CỤC, nơi TẤT CẢ các nhân vật quan trọng đều tham gia và tương tác lẫn nhau, chỉ khác nhau ở CÁCH THỨC giải quyết vấn đề chung của thế giới/cốt truyện, SỰ KIỆN xảy ra, hoặc ÂM MƯU đằng sau.
  - QUY TẮC MỞ ĐẦU TRUYỆN (BẮT BUỘC): Nếu đây là phần mở đầu của câu chuyện (Dàn ý cơ sở đầu tiên), TUYỆT ĐỐI KHÔNG mở đầu rập khuôn (như thức dậy, ngáp dài). Phải tạo "Lưỡi câu" (The Hook) ngay lập tức bằng hành động hoặc sự kiện. LUÔN LUÔN phải giới thiệu về 1 hoặc nhiều nhân vật cốt lõi xuất hiện đầu tiên cùng với bối cảnh của họ thông qua hành động và tương tác, không liệt kê lý lịch khô khan. Không khí mở đầu phải đậm chất thể loại truyện. Hãy áp dụng các phương pháp trong CẨM NANG VIẾT PHẦN MỞ ĐẦU bên dưới.
  
  ${OPENING_RULES}
  - NẾU CÓ CẢNH THÂN MẬT/NSFW: Xây dựng "khúc dạo đầu" (foreplay) từ những tình huống sinh hoạt bình thường. Sử dụng trang phục, ánh mắt nhìn trộm qua lăng kính ống nhòm, hoặc những đụng chạm vô tình để kéo căng sự kịch tính. Sử dụng kỹ thuật "Khống chế người thân" để ép buộc nạn nhân phối hợp. Áp dụng kỹ thuật "Cắt xé nội y" bằng dụng cụ sắc bén (dao, kéo) để tạo sự tương phản tàn khốc giữa lưỡi kim loại lạnh lẽo và làn da nóng hổi. Sử dụng "Bịt mắt" để cô lập giác quan, khiến nạn nhân hoảng sợ và nhạy cảm tối đa với mọi đụng chạm.
  - **Tâm Lý Đa Tầng Trong Nhục Dục (Multi-layered Erotic Psychology):** Luôn lồng ghép suy nghĩ nội tâm mang tính "cảnh giác" hoặc "tư duy thực tế" ngay trong lúc hành sự. Khai thác cảm giác uất ức, nhục nhã khi cơ thể bị xâm phạm nhưng phải gồng mình chịu đựng để bảo vệ mạng sống cho người thân (con cái, cha mẹ). Tăng cường sự nhục nhã bằng "Sức mạnh của sự quan sát cưỡng ép" – bắt người thân phải chứng kiến từng hành động dâm đãng của nạn nhân.
  - **Khung Cảnh & Twist (Framing & Narrative Twist):** Gắn kết cảnh nóng với một mục đích lớn lao hơn hoặc một bí mật đen tối (ví dụ: nhiệm vụ thử thách từ diễn đàn ngầm, một vụ cá cược, hoặc một cuộc dàn cảnh trả thù). Điều này biến cảnh nóng thành một mắt xích quan trọng thúc đẩy cốt truyện thay vì chỉ là nội dung bổ trợ.
  - **Tương Phản Chức Nghiệp & Nhiệm Vụ (Occupational Contrast & Missions):** Khai thác sự va chạm giữa các hành động bình thường (giao hàng, sửa chữa) và những nhiệm vụ mạo hiểm hoặc tình huống nhạy cảm bất ngờ. Sự thô ráp của nghề nghiệp kết hợp với sự nóng bỏng của xúc giác tạo nên một sức hút thực dụng độc đáo. Khai thác chi tiết âm thanh và dịch thể (tiếng phập phồng, sự dấp dính của tinh dịch và dâm tủy) để tăng tính trần trụi.
  - **Nghi Thức Vét Máng Tàn Nhẫn (Feral Cunnilingus):** Miêu tả hành động liếm láp thô bạo, tập trung vào sự thèm khát bản năng và mùi hương đặc trưng của vùng kín.
  - **Sự Tương Phản Nhiệt Năng (Thermal Contrast):** Tận dụng nhiệt độ môi trường (đá lạnh, nước ngọt, máy lạnh) đối lập với hơi nóng của cơ thể và dịch thể để tạo ra những phản ứng sinh lý mãnh liệt (co thắt, nổi gai ốc).
  - ĐAN XEN CHÍNH TRỊ & DỤC VỌNG (Political-Erotic Intertwining): Sử dụng các yếu tố vĩ mô (hiệp ước quốc gia, tranh giành quyền lực, phe phái chính trị, lợi ích gia tộc) làm công cụ để thao túng, mặc cả và tạo áp lực trong các mối quan hệ cá nhân hoặc cảnh thân mật.
  - HIỆU ỨNG CÁNH BƯỚM VĨ MÔ (Macro-Consequences): Những quyết định cá nhân, những dục vọng thầm kín của các nhân vật cầm quyền BẮT BUỘC phải dẫn đến những hậu quả to lớn cho toàn bộ thế giới (ví dụ: sa thải trung thần, sụp đổ triều đại, chiến tranh, sụp đổ tập đoàn). Mọi hành động, đặc biệt là những hành động bạo liệt hoặc vi phạm cấm kỵ, đều phải để lại hậu quả rõ rệt về mặt tâm lý cho nạn nhân và hệ lụy chính trị/xã hội lâu dài.
  - KHÔNG GIAN TƯƠNG PHẢN (Atmospheric Contrast): Tạo ra sự kịch tính bằng cách đặt những hành vi bạo liệt, tàn nhẫn hoặc đen tối vào giữa những bối cảnh thanh bình, hoài niệm, trang nghiêm và thơ mộng nhất (ví dụ: cưỡng đoạt giữa vườn hoa hồng, thảm sát trong lễ hội, ân ái trong đền thờ). Sự tương phản giữa vẻ đẹp của bối cảnh và sự tàn khốc của hành động sẽ làm tăng hiệu ứng cảm xúc.
  - TẢ THỰC KHÔNG GIAN & LỄ NGHI (Cinematic & Ceremonial Realism): Khi miêu tả các sự kiện lớn (đăng cơ, yến tiệc, tế lễ...), BẮT BUỘC miêu tả chi tiết về kiến trúc, màu sắc trang phục (VD: bào tím, hạc đỏ), âm thanh nhạc cụ và không khí uy nghiêm để tạo ra một thước phim điện ảnh hoành tráng bằng chữ.
  - BẪY TÂM LÝ & PHÁ VỠ KHÔNG GIAN AN TOÀN (Safe Space Interruption): Tạo ra sự kịch tính tột độ bằng cách cho những nhân vật có vỏ bọc ngoan ngoãn, đáng tin cậy (người giúp việc, thuộc hạ, người thân) bất ngờ lật lọng. Sự xâm phạm, đe dọa hoặc phản bội phải diễn ra ngay trong những không gian mà nạn nhân cho là an toàn nhất (mật thất, phòng ngủ riêng, khi vắng người), biến nơi an toàn thành chiếc bẫy kín không lối thoát.
  - HỒI TƯỞNG ĐAN XEN (Seamless Flashbacks): Sử dụng các đoạn hồi tưởng ngắn, mượt mà lồng ghép vào hiện tại để giải thích nguồn gốc của một nỗi ám ảnh dục vọng, một mối thù, một quyết định chính trị tàn nhẫn, hoặc một ân huệ cứu mạng từ quá khứ. Hồi tưởng không được làm đứt gãy nhịp độ của hiện tại.
  - TỐI ĐA HÓA SỰ XUẤT HIỆN CỦA NHÂN VẬT: Bạn PHẢI đưa CÀNG NHIỀU NHÂN VẬT CÀNG TỐT từ "DANH SÁCH NHÂN VẬT ĐÃ CÓ" vào cốt truyện của các Chương. Hãy tạo ra sự tương tác, mâu thuẫn và liên kết sâu sắc giữa họ. Tránh việc chỉ tập trung vào nhân vật chính và bỏ quên dàn nhân vật phụ.
  - QUY TẮC MẬT ĐỘ CHI TIẾT 1:10 (BẮT BUỘC): Để đạt được mật độ chi tiết cao cho mỗi tóm tắt chương, bạn PHẢI áp dụng quy tắc: Với mỗi hành động chính, viết kèm ít nhất 10 chi tiết bổ trợ (Cảm giác vật lý, Suy nghĩ nội tâm, Phản ứng cơ thể vô thức, Tương tác môi trường, Thần thái, Phản ứng đám đông, Thay đổi bầu không khí, Ẩn dụ văn học, Liên kết quá khứ, Dự báo tương lai).
  - GIÃN NỞ THỜI GIAN & AFTERCARE (BẮT BUỘC): Không bao giờ nhảy cóc qua các đoạn nghỉ. Hãy miêu tả chậm rãi các sinh hoạt sau cao trào (nấu mì, tắm rửa, ép ăn, ngủ gật). Những chi tiết săn sóc này chính là linh hồn giúp câu chuyện trở nên thực tế và nhân văn.
  - **QUY TẮC PHÂN RÃ HÀNH ĐỘNG & LÀM CHẬM NHỊP ĐIỆU (BẮT BUỘC):** Tuyệt đối không giải quyết mâu thuẫn cốt truyện hoặc hành động lớn trong 1 lần. Hãy chia mỗi sự kiện lớn thành ít nhất 5-10 sự kiện/hành động con kéo dài. Kéo dài diễn biến bằng cách đào sâu vào sự chuẩn bị, sự do dự, rào cản bất ngờ và phản ứng đa giác quan. Hãy làm cho người đọc cảm thấy sự chờ đợi đầy kịch tính.
  - ÁP DỤNG CẨM NANG KHAI THÁC NHÂN VẬT:
  
  ${CHARACTER_RULES}
  
  - Phải sử dụng các nhân vật, địa danh và logic đã có trong thông tin thế giới.
  - ĐỐI VỚI THỂ LOẠI HAREM: Đảm bảo sự xuất hiện của nhiều nhân vật nữ đan xen trong các chương.
  - TẬN DỤNG TRÍ TUỆ 3.1 PRO: Hãy tạo ra các nút thắt cốt truyện (plot twists) thông minh, các âm mưu đa tầng và sự phát triển tâm lý nhân vật phức tạp ngay trong bản tóm tắt.

  ⚠️ CẬP NHẬT STORY BIBLE (BẮT BUỘC NHƯNG CẨN TRỌNG):
  Thế giới truyện luôn vận động nhưng phải tuân thủ sự ổn định của thiết lập ban đầu. BẠN BẮT BUỘC PHẢI BẢO TOÀN THÔNG TIN CỐT LÕI (Ngoại hình, Tính cách gốc, Năng lực, Lịch sử). CHỈ CẬP NHẬT KHI CÓ BIẾN CỐ THỰC SỰ TRONG CHƯƠNG GÂY RA SỰ THAY ĐỔI ĐÓ:
  - CẤM VIẾT ĐÈ (OVERWRITE) SAI LỆCH THẾ GIỚI: Tuyệt đối không thay đổi thông tin Codex, Timeline hay nguồn gốc hệ thống tôn giáo, sức mạnh đã có trừ khi chính truyện có sự kiện phá vỡ/viết lại những điều đó.
  - newCharacters: Thêm các nhân vật mới xuất hiện trong các chương này (kể cả nhân vật quần chúng hoặc nhân vật sẽ chết).
    + QUY TẮC CẤP ĐỘ: BẮT BUỘC gán \`level\` cho nhân vật (1-5).
    + QUY TẮC MỐI QUAN HỆ: Các nhân vật có quen biết nhau thì BẮT BUỘC phải có mối quan hệ rõ ràng.
  - **DÒNG THỜI GIAN (TIMELINE) & CODEX:** Tuân thủ Timeline cũ. NẾU CÓ thêm sự kiện MỚI từ chương, hãy thêm vào bằng newTimelineEvents/newCodexEntries. NẾU KHÔNG CÓ DIỄN BIẾN GÌ MỚI LÀM THAY ĐỔI CODEX HAY TIMELINE, HÃY ĐỂ TRỐNG PHẦN CẬP NHẬT ĐÓ. ĐỪNG CỐ TỰ BỊA RA SỰ KIỆN QUÁ KHỨ KHÔNG LIÊN QUAN ĐỂ ĐIỀN VÀO.
  - characterUpdates: KHI CẬP NHẬT NHÂN VẬT CŨ (đặc biệt là 'relationships', 'currentThoughts'): CẤM XÓA SỔ THÔNG TIN CŨ. BẮT BUỘC PHẢI SAO CHÉP GIỮ LẠI TẤT CẢ các thông tin cũ (vẫn còn đúng) và CHỈ VIẾT BỔ SUNG thay đổi. TUYỆT ĐỐI KHÔNG xuất ra các chuỗi vô nghĩa như "Không thay đổi", "Không đổi", "Giữ nguyên" - nếu một trường không có sự thay đổi, HÃY BỎ QUA TRƯỜNG ĐÓ TRONG JSON. KHÔNG ĐƯỢC PHÉP THAY ĐỔI NGOẠI HÌNH (appearance) HAY TÍNH CÁCH (personality) CỦA NHÂN VẬT CHỈ ĐỂ CHO VUI. Chỉ thay đổi nếu cốt truyện chương thực sự làm họ biến dạng/hoán đổi hay hắc hóa trầm trọng.
  - worldUpdates: Cập nhật biến động hiện tại, tuyệt đối KHÔNG viết lại lịch sử ban đầu của thế giới.
`;

export const getChapterVersionsPrompt = (
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
  storyGuidingPrinciple: string,
  mainCharacterGender: string,
  characters: Character[],
  codex: CodexEntry[],
  timeline: TimelineEvent[],
  references: ReferenceMaterial[] = [],
  baseOutline: BaseOutline,
  chapterIndex: number,
  versionCount: number = 10,
  aiInstructions: string = '',
  fullOutline: string = '',
  realismRules: string = ''
) => `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, true, aiInstructions)}
  VỚI TƯ CÁCH LÀ KIẾN TRÚC SƯ NỘI DUNG AI (TAWA), HÃY GIÚP MASTER BÓC TÁCH VÀ VIẾT CHÍNH XÁC ${versionCount} PHIÊN BẢN KHÁC NHAU CHO CHƯƠNG ${chapterIndex} THUỘC DÀN Ý CƠ SỞ HIỆN TẠI.
  CÁC PHIÊN BẢN PHẢI LÀ NHỮNG CÁCH KHAI THÁC VÀ TRIỂN KHAI KHÁC NHAU CỦA CÙNG MỘT GIAI ĐOẠN. BẠN CÓ THỂ THÊM THẮT NHIỀU CHI TIẾT, HÀNH ĐỘNG VÀ BIẾN CỐ SÁNG TẠO ĐỂ LÀM PHONG PHÚ CHƯƠNG, MIỄN LÀ KHÔNG ĐI CHỆCH KHỎI KHUNG SƯỜN CỦA DÀN Ý CƠ SỞ.
  
  ⚠️ QUY TẮC TỐI THƯỢNG: Toàn bộ nội dung mở rộng PHẢI tuân thủ tuyệt đối Thể loại: "${genre}".
  ⚠️ QUY TẮC SỐ LƯỢNG: BẠN BẮT BUỘC PHẢI TẠO RA ĐỦ VÀ CHÍNH XÁC ${versionCount} PHIÊN BẢN. KHÔNG ĐƯỢC PHÉP THIẾU DÙ CHỈ MỘT PHIÊN BẢN.

  --- TƯ LIỆU THAM KHẢO (NẾU CÓ) ---
  ${references.filter(r => r.type === 'text').map(r => '[Tên tệp: ' + r.name + ']\n' + r.content).join('\n\n')}

  --- BỐI CẢNH & CỐT TRUYỆN (NGUỒN SỰ THẬT - TRIỂN KHAI PHIÊN BẢN) ---
  Thể loại (TỐI THƯỢNG): "${genre}"
  
  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}
  
  Mô tả Thể loại:
  ${getGenreDescriptions(genre)}
  Tông giọng: "${storyTone}"
  Kim chỉ nam (Guiding Principle): "${storyGuidingPrinciple}"
  Hướng dẫn Master (AI Instructions): "${aiInstructions}"
  Loại nhân vật chính: "${mainCharacterGender}"
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
  Danh sách nhân vật chính/phụ: ${JSON.stringify(characters.map((c: Character) => ({ name: c.name, role: c.role, personality: c.personality, guidingPrinciple: c.guidingPrinciple, abilities: c.abilities, appearance: c.appearance })))}.
  Codex (Từ điển thế giới): ${JSON.stringify(codex.map((e: CodexEntry) => ({ title: e.title, content: e.content })))}.
  Dòng thời gian (Lịch sử/Sự kiện): ${JSON.stringify(timeline.map((e: TimelineEvent) => ({ title: e.title, description: e.description })))}.
  
  --- DÀN Ý CỐT TRUYỆN TOÀN TẬP ---
  ${fullOutline}

  Và Dàn ý cơ sở hiện tại: "${baseOutline.title}" (Tóm tắt: ${baseOutline.summary}).
  ${baseOutline.chapters.length > 0 ? `Các chương đã có trước đó: ${JSON.stringify(baseOutline.chapters.map(c => ({ title: c.title, summary: c.summary })))}` : ''}
  
  NHIỆM VỤ: Hãy tạo ra ${versionCount} PHIÊN BẢN KHÁC NHAU cho Chương ${chapterIndex}. 
  Hãy tự do sáng tạo chêm xen các tiểu tiết, mánh khóe, tương tác nhân vật và hành động kịch tính để mỗi phiên bản mang một màu sắc diễn biến phong phú riêng biệt (VD: giải quyết bằng bạo lực, bằng trí tuệ, hoặc bằng tâm lý), miễn là vẫn bám sát ranh giới của Dàn ý cơ sở.
  Mỗi phiên bản phải bao gồm:
  1. Tiêu đề phiên bản Chương (title): Tiêu đề nghệ thuật, ngắn gọn. (Lưu ý: Kim chỉ nam nên được điền riêng vào trường storyGuidingPrinciple).
  2. Kim chỉ nam của chương (storyGuidingPrinciple): Một câu ngắn gọn định hướng cho toàn bộ nội dung của chương này, phản ánh mục tiêu hoặc tông giọng chủ đạo của chương.
  3. Tóm tắt Chương ĐỒ SỘ (nền tảng 20.000 chữ/chương). 
     - BẮT BUỘC VIẾT THEO DẠNG GẠCH ĐẦU DÒNG (BULLET POINTS) HOẶC ĐOẠN NGẮN CỰC KỲ CHI TIẾT (TỐI THIỂU 1.000-1.500 CHỮ CHO MỖI TÓM TẮT TRONG JSON). ĐÂY LÀ LỆNH BẮT BUỘC.
     - LỆNH TỐI QUAN TRỌNG: BẠN BẮT BUỘC PHẢI NHỒI NHÉT THẬT NHIỀU TÌNH TIẾT, HÀNH ĐỘNG VÀ BIẾN CỐ NHẤT CÓ THỂ VÀO MỖI PHIÊN BẢN CHƯƠNG. KHÔNG ĐƯỢC TÓM TẮT QUA LOA HAY BẰNG VĂN XUÔI CHUNG CHUNG. Mỗi phiên bản phải là một chuỗi liên tục các sự kiện dày đặc (mỗi gạch đầu dòng là một diễn biến hành động/đối thoại cụ thể).
     - Hãy chia tóm tắt thành nhiều phần rõ ràng: Bối cảnh mở màn, Diễn biến chính, Tuyến truyện phụ (Subplots), Vai trò của các nhân vật phụ, Cao trào và Kết quả. Phải lồng ghép được nhiều nhân vật và tình tiết đa tuyến. Phải dùng gạch đầu dòng để làm rõ nội dung.
  
  ⚠️ YÊU CẦU QUAN TRỌNG (GEMINI 3.1 PRO):
  - **QUY TẮC KÝ HIỆU & ĐỊNH DẠNG CHƯƠNG (BẮT BUỘC):** Để hệ thống hiển thị chính xác, bạn PHẢI sử dụng các ký hiệu sau cho từng loại nội dung và LUÔN LUÔN đặt chúng trên một dòng riêng biệt (Tuyệt đối không viết chung dòng với lời dẫn):
    + Lời dẫn (Narrative): Viết bình thường.
    + Lời thoại (Dialogue): - "..." (Hoặc 「...」 cho phong cách LN/Manga)
    + Lời thoại đặc biệt: 『...』 (Điện thoại, thần bí, trích dẫn lồng)
    + Tiếng lòng (Thought): (Nội dung suy nghĩ...)
    + Âm thanh (Sound): [Tiếng động...]
    + Hệ thống / Thần giao (System/Telepathy): <...> hoặc «...»
    + Thư từ / Tin nhắn (Documents): |...|
    + Chú thích / Giải nghĩa (Annotations): *(...)*
    + Mốc thời gian / Địa điểm (Stamps): + ... +
    + Bảng trạng thái (Status Board): [\...\]
    + Nhấn mạnh (Bold): **Nội dung nhấn mạnh...**
    + Lời hát / Ngâm thơ (Poetry): ~Lời hát hoặc câu thơ...~
  - **ĐỊNH DANH THỰC THỂ TRONG LỜI DẪN (CHỈ DÀNH CHO NARRATIVE):**
    + Nhân vật: {Tên}
    + Địa danh/Thế lực: [[Tên]]
    + Vật phẩm/Pháp bảo: <Tên>
    + Kỹ năng/Công pháp: «Tên»
    + Cấp độ/Danh hiệu: **[Tên]**
  - QUY TẮC ĐẶT TIÊU ĐỀ (BẮT BUỘC): TUYỆT ĐỐI CẤM đưa tên nhân vật vào trong ngoặc đơn ở Tiêu đề (Ví dụ cấm: "Khách Hàng Lúc Nửa Đêm (Trần Hạ Vi)"). Tiêu đề phải phản ánh sự kiện chung, bối cảnh hoặc âm mưu của nhánh đó.
  - QUY TẮC BẮT BUỘC VỀ SỐ LƯỢNG NHÂN VẬT: MỌI PHƯƠNG ÁN (TỪ TIÊU ĐỀ ĐẾN NỘI DUNG TÓM TẮT) BẮT BUỘC PHẢI CÓ SỰ XUẤT HIỆN VÀ TƯƠNG TÁC CỦA NHIỀU NHÂN VẬT (ÍT NHẤT 2-3 NHÂN VẬT QUAN TRỌNG TRỞ LÊN). TUYỆT ĐỐI CẤM việc tạo ra một phương án chỉ xoay quanh duy nhất 1 nhân vật. Đại cục là câu chuyện của một tập thể, không phải sân khấu độc diễn của bất kỳ ai.
  - LỖI NGHIÊM TRỌNG CẦN TRÁNH (TUYỆT ĐỐI CẤM): KHÔNG ĐƯỢC CHIA CÁC PHƯƠNG ÁN/HƯỚNG ĐI THEO TỪNG NHÂN VẬT. NẾU BẠN TẠO RA CÁC PHƯƠNG ÁN MÀ TIÊU ĐỀ HOẶC NỘI DUNG CHỈ TẬP TRUNG VÀO VIỆC CHINH PHỤC HOẶC GIẢI QUYẾT VẤN ĐỀ CỦA RIÊNG 1 NHÂN VẬT CỤ THỂ (Ví dụ cấm: "Sự sụp đổ của Nữ Tổng Tài X", "Hành trình thu phục Y", Phương án 1 xoay quanh A, Phương án 2 xoay quanh B), BẠN SẼ BỊ ĐÁNH GIÁ LÀ THẤT BẠI HOÀN TOÀN. Đây là tư duy sai lệch "chia route" kiểu game hẹn hò. TẤT CẢ các phương án phải là các kịch bản của TOÀN BỘ ĐẠI CỤC, nơi TẤT CẢ các nhân vật quan trọng đều tham gia và tương tác lẫn nhau, chỉ khác nhau ở CÁCH THỨC giải quyết vấn đề chung của thế giới/cốt truyện, SỰ KIỆN xảy ra, hoặc ÂM MƯU đằng sau.
  - Mỗi phiên bản phải mang một hướng đi hoặc màu sắc khác nhau (ví dụ: một bản tập trung vào hành động, một bản tập trung vào đấu trí, một bản tập trung vào tình cảm của toàn bộ nhóm, một bản có bước ngoặt bất ngờ...).
  - Phải bám sát tuyệt đối Thể loại, Loại nhân vật chính và Tone màu đã định.
  - QUY TẮC MỞ ĐẦU TRUYỆN (BẮT BUỘC): Nếu đây là phần mở đầu của câu chuyện (Chương 1 của Dàn ý cơ sở đầu tiên), TUYỆT ĐỐI KHÔNG mở đầu rập khuôn (như thức dậy, ngáp dài). Phải tạo "Lưỡi câu" (The Hook) ngay lập tức bằng hành động hoặc sự kiện. LUÔN LUÔN phải giới thiệu về 1 hoặc nhiều nhân vật cốt lõi xuất hiện đầu tiên cùng với bối cảnh của họ thông qua hành động và tương tác, không liệt kê lý lịch khô khan. Không khí mở đầu phải đậm chất thể loại truyện. Hãy áp dụng các phương pháp trong CẨM NANG VIẾT PHẦN MỞ ĐẦU bên dưới.
  
  ${OPENING_RULES}
  - NẾU CÓ CẢNH THÂN MẬT/NSFW: Xây dựng "khúc dạo đầu" (foreplay) từ những tình huống sinh hoạt bình thường. Sử dụng trang phục, ánh mắt nhìn trộm qua lăng kính ống nhòm, hoặc những đụng chạm vô tình để kéo căng sự kịch tính. Áp dụng các tình huống "Phục kích từ xa" tại bãi tắm hoặc rừng vắng để "Khống chế người thân". Sử dụng "Bịt mắt" và "Cắt xé nội y bằng vật sắc nhọn" để tăng cường sự khủng hoảng và kích thích giác quan.
  - **Tâm Lý Đa Tầng Trong Nhục Dục (Multi-layered Erotic Psychology):** Luôn lồng ghép suy nghĩ nội tâm mang tính "cảnh giác" hoặc "tư duy thực tế" ngay trong lúc hành sự. Đặc biệt khai thác nỗi kinh hoàng khi phải phối hợp dâm đãng để đổi lấy sự an toàn cho người thân ngay tại hiện trường thông qua "Sự quan sát cưỡng ép".
  - **Khung Cảnh & Twist (Framing & Narrative Twist):** Gắn kết cảnh nóng với một mục đích lớn lao hơn hoặc một bí mật đen tối (ví dụ: nhiệm vụ thử thách từ diễn đàn ngầm, một vụ cá cược, hoặc một cuộc dàn cảnh trả thù). Điều này biến cảnh nóng thành một mắt xích quan trọng thúc đẩy cốt truyện thay vì chỉ là nội dung bổ trợ.
  - **Tương Phản Chức Nghiệp & Nhiệm Vụ (Occupational Contrast & Missions):** Khai thác sự va chạm giữa các hành động bình thường (giao hàng, sửa chữa) và những nhiệm vụ mạo hiểm hoặc tình huống nhạy cảm bất ngờ. Tập trung vào âm thanh phạch phạch và sự dính dớp của dịch thể trần trụi.
  - **Nghi Thức Vét Máng Tàn Nhẫn (Feral Cunnilingus):** Miêu tả sự tàn nhẫn và thèm khát khi cưỡng ép vét máng, nhấn mạnh hương vị bản năng.
  - **Sự Tương Phản Nhiệt Năng (Thermal Contrast):** Tận dụng nhiệt độ môi trường (đá lạnh, nước ngọt, máy lạnh) đối lập với hơi nóng của cơ thể và dịch thể để tạo ra những phản ứng sinh lý mãnh liệt.
  - ĐAN XEN CHÍNH TRỊ & DỤC VỌNG (Political-Erotic Intertwining): Sử dụng các yếu tố vĩ mô (hiệp ước quốc gia, tranh giành quyền lực, phe phái chính trị, lợi ích gia tộc) làm công cụ để thao túng, mặc cả và tạo áp lực trong các mối quan hệ cá nhân hoặc cảnh thân mật.
  - HIỆU ỨNG CÁNH BƯỚM VĨ MÔ (Macro-Consequences): Những quyết định cá nhân, những dục vọng thầm kín của các nhân vật cầm quyền BẮT BUỘC phải dẫn đến những hậu quả to lớn cho toàn bộ thế giới (ví dụ: sa thải trung thần, sụp đổ triều đại, chiến tranh, sụp đổ tập đoàn). Mọi hành động, đặc biệt là những hành động bạo liệt hoặc vi phạm cấm kỵ, đều phải để lại hậu quả rõ rệt về mặt tâm lý cho nạn nhân và hệ lụy chính trị/xã hội lâu dài.
  - KHÔNG GIAN TƯƠNG PHẢN (Atmospheric Contrast): Tạo ra sự kịch tính bằng cách đặt những hành vi bạo liệt, tàn nhẫn hoặc đen tối vào giữa những bối cảnh thanh bình, hoài niệm, trang nghiêm và thơ mộng nhất (ví dụ: cưỡng đoạt giữa vườn hoa hồng, thảm sát trong lễ hội, ân ái trong đền thờ). Sự tương phản giữa vẻ đẹp của bối cảnh và sự tàn khốc của hành động sẽ làm tăng hiệu ứng cảm xúc.
  - TẢ THỰC KHÔNG GIAN & LỄ NGHI (Cinematic & Ceremonial Realism): Khi miêu tả các sự kiện lớn (đăng cơ, yến tiệc, tế lễ...), BẮT BUỘC miêu tả chi tiết về kiến trúc, màu sắc trang phục (VD: bào tím, hạc đỏ), âm thanh nhạc cụ và không khí uy nghiêm để tạo ra một thước phim điện ảnh hoành tráng bằng chữ.
  - BẪY TÂM LÝ & PHÁ VỠ KHÔNG GIAN AN TOÀN (Safe Space Interruption): Tạo ra sự kịch tính tột độ bằng cách cho những nhân vật có vỏ bọc ngoan ngoãn, đáng tin cậy (người giúp việc, thuộc hạ, người thân) bất ngờ lật lọng. Sự xâm phạm, đe dọa hoặc phản bội phải diễn ra ngay trong những không gian mà nạn nhân cho là an toàn nhất (mật thất, phòng ngủ riêng, khi vắng người), biến nơi an toàn thành chiếc bẫy kín không lối thoát.
  - HỒI TƯỞNG ĐAN XEN (Seamless Flashbacks): Sử dụng các đoạn hồi tưởng ngắn, mượt mà lồng ghép vào hiện tại để giải thích nguồn gốc của một nỗi ám ảnh dục vọng, một mối thù, một quyết định chính trị tàn nhẫn, hoặc một ân huệ cứu mạng từ quá khứ. Hồi tưởng không được làm đứt gãy nhịp độ của hiện tại.
  - TỐI ĐA HÓA SỰ XUẤT HIỆN CỦA NHÂN VẬT: Bạn PHẢI đưa CÀNG NHIỀU NHÂN VẬT CÀNG TỐT từ "DANH SÁCH NHÂN VẬT ĐÃ CÓ" vào cốt truyện.
  - QUY TẮC MẬT ĐỘ CHI TIẾT 1:10 (BẮT BUỘC): Áp dụng quy tắc: Với mỗi hành động chính, viết kèm ít nhất 10 chi tiết bổ trợ (Cảm giác vật lý, Suy nghĩ nội tâm, Phản ứng cơ thể vô thức, Tương tác môi trường, Thần thái, Ẩn dụ văn học).
  - GIÃN NỞ THỜI GIAN & AFTERCARE: Miêu tả chậm rãi các sinh hoạt đời thường sau cao trào để tăng độ chân thực và chiều sâu tình cảm.
  - **QUY TẮC PHÂN RÃ HÀNH ĐỘNG & LÀM CHẬM NHỊP ĐIỆU (BẮT BUỘC):** Tuyệt đối không giải quyết mâu thuẫn cốt truyện hoặc hành động lớn trong 1 lần. Hãy chia mỗi sự kiện lớn thành ít nhất 5-10 sự kiện/hành động con kéo dài. Kéo dài diễn biến bằng cách đào sâu vào sự chuẩn bị, sự do dự, rào cản bất ngờ và phản ứng đa giác quan. Hãy làm cho người đọc cảm thấy sự chờ đợi đầy kịch tính.
  - ÁP DỤNG CẨM NANG KHAI THÁC NHÂN VẬT:
  
  ${CHARACTER_RULES}
  
  - Phải sử dụng các nhân vật, địa danh và logic đã có trong thông tin thế giới.
  - ĐỐI VỚI THỂ LOẠI HAREM: Đảm bảo sự xuất hiện của các nhân vật nữ trong các phiên bản.
  - TẬN DỤNG TRÍ TUỆ 3.1 PRO: Hãy tạo ra các kịch bản đa dạng, từ chính kịch đến hài hước đen tối, tận dụng khả năng hiểu ngữ cảnh sâu sắc của bạn.

  ⚠️ CẬP NHẬT STORY BIBLE (BẮT BUỘC NHƯNG CẨN TRỌNG):
  Đừng để thế giới bị đóng băng nhưng phải tuân thủ sự ổn định của thiết lập ban đầu. BẠN BẮT BUỘC PHẢI BẢO TOÀN THÔNG TIN CỐT LÕI. CHỈ CẬP NHẬT KHI CÓ BIẾN CỐ THỰC SỰ TRONG CHƯƠNG GÂY RA SỰ THAY ĐỔI ĐÓ:
  - CẤM VIẾT ĐÈ (OVERWRITE) SAI LỆCH THẾ GIỚI: Tuyệt đối không thay đổi thông tin Codex, Timeline hay nguồn gốc hệ thống tôn giáo, sức mạnh đã có.
  - newCharacters: Thêm các nhân vật mới phát sinh trong kịch bản (kể cả nhân vật phụ chỉ xuất hiện 1 lần).
    + QUY TẮC CẤP ĐỘ: BẮT BUỘC gán \`level\` cho nhân vật (1-5).
    + QUY TẮC MỐI QUAN HỆ: Các nhân vật có quen biết nhau thì BẮT BUỘC phải có mối quan hệ rõ ràng.
  - **DÒNG THỜI GIAN (TIMELINE) & CODEX:** Tuân thủ Timeline cũ. NẾU CÓ thêm sự kiện MỚI từ chương, hãy thêm vào. NẾU KHÔNG CÓ DIỄN BIẾN GÌ MỚI LÀM THAY ĐỔI CODEX HAY TIMELINE, HÃY ĐỂ TRỐNG PHẦN CẬP NHẬT ĐÓ. ĐỪNG CỐ TỰ BỊA RA SỰ KIỆN QUÁ KHỨ KHÔNG LIÊN QUAN.
  - characterUpdates: KHI CẬP NHẬT NHÂN VẬT CŨ: CẤM XÓA SỔ THÔNG TIN CŨ. BẮT BUỘC PHẢI SAO CHÉP GIỮ LẠI TẤT CẢ các thông tin cũ (vẫn còn đúng) và CHỈ VIẾT BỔ SUNG thay đổi. TUYỆT ĐỐI KHÔNG xuất ra các chuỗi vô nghĩa như "Không thay đổi", "Không đổi" - nếu một trường không có sự thay đổi, HÃY BỎ QUA TRƯỜNG ĐÓ TRONG JSON. KHÔNG ĐƯỢC PHÉP THAY ĐỔI NGOẠI HÌNH HAY TÍNH CÁCH GỐC (personality) CỦA NHÂN VẬT.
  - worldUpdates: Cập nhật biến động hiện tại do kịch bản sinh ra, tuyệt đối KHÔNG viết lại lịch sử ban đầu của thế giới.
`;

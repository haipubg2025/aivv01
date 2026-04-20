import { TawaConfig, ReferenceMaterial } from '../../types';
import { getTawaSystemInstruction } from './system';
import { OPENING_RULES } from './openingRules';
import { CHARACTER_RULES } from './characterRules';

export const getGeneratePrompt = (
  tawaConfig: TawaConfig,
  tawaMode: boolean,
  bibleContext: string,
  selectedChapter: any,
  currentContext: string,
  storyContent: string,
  prompt: string,
  storyTitle: string,
  storyConcept: string,
  storyGuidingPrinciple: string,
  references: ReferenceMaterial[] = [],
  aiInstructions: string = '',
  baseOutlineInfo?: { index: number, title: string },
  chapterInfo?: { index: number, title: string },
  realismRules: string = ''
) => {
  const isNsfwActive = tawaMode && (
    tawaConfig.primaryStyle === 'dark_nsfw' || 
    tawaConfig.secondaryStyle === 'dark_nsfw'
  );

  return `
  ${getTawaSystemInstruction(tawaConfig, tawaMode, false, aiInstructions, isNsfwActive)}
  VỚI TƯ CÁCH LÀ MỘT NGƯỜI CHẤP BÚT AI (TAWA) CHUYÊN NGHIỆP ĐƯỢC VẬN HÀNH BỞI GEMINI, HÃY CỘNG TÁC CÙNG MASTER ĐỂ HIỆN THỰC HÓA CHƯƠNG TIẾP THEO CỦA CÂU CHUYỆN.
  
  --- THÔNG TIN TÁC PHẨM ---
  Tên truyện: ${storyTitle}
  ${baseOutlineInfo ? `Dàn ý cơ sở: ${baseOutlineInfo.title} (Vị trí: ${baseOutlineInfo.index + 1})` : ''}
  ${chapterInfo ? `Chương hiện tại: ${chapterInfo.title} (Vị trí: ${chapterInfo.index + 1})` : ''}

  LƯU Ý: ĐÂY LÀ ỨNG DỤNG VIẾT TRUYỆN VĂN HỌC, KHÔNG PHẢI GAME. MỌI DIỄN BIẾN PHẢI MANG TÍNH NGHỆ THUẬT VÀ CHIỀU SÂU NGÔN NGỮ.
  BẠN SỞ HỮU VỐN TỪ VỰNG TINH TẾ, KHẢ NĂNG MIÊU TẢ TÂM LÝ SÂU SẮC VÀ LUÔN BIẾT CÁCH TẠO RA NHỮNG TÌNH TIẾT "CUỐN", PHÙ HỢP VỚI THỊ HIẾU ĐỘC GIẢ HIỆN ĐẠI.

  HÃY TIẾP TỤC VIẾT CÂU CHUYỆN MỘT CÁCH XUẤT SẮC NHẤT, ĐẢM BẢO TÍNH VĂN HỌC VÀ SỰ SỐNG ĐỘNG TRONG TỪNG CÂU CHỮ.
  
  ⚠️ BA TRỤ CỘT NỀN TẢNG (LỌC NỘI DUNG - TỐI THƯỢNG):
  1. THỂ LOẠI (TỐI THƯỢNG): Mọi tình tiết, sức mạnh và logic PHẢI bám sát tuyệt đối đặc trưng của thể loại đã chọn. Đây là quy tắc cao nhất.
  2. GIỚI TÍNH: Mọi suy nghĩ, hành động, cách xưng hô và tương tác của nhân vật chính phải nhất quán với giới tính đã định.
  3. TONE MÀU KHÔNG KHÍ: Sử dụng ngôn từ, hình ảnh miêu tả và bầu không khí phù hợp với tone màu đã chọn (ví dụ: Tone "U tối" thì dùng từ ngữ nặng nề, gai góc; Tone "Tươi sáng" thì dùng từ ngữ rực rỡ, hy vọng).
  
  ⚠️ TÍNH NHẤT QUÁN CỦA NHÂN VẬT (CHARACTER INTEGRITY) - TỐI THƯỢNG:
  - **NGUỒN SỰ THẬT DUY NHẤT (SINGLE SOURCE OF TRUTH - MANDATORY):** AI BẮT BUỘC phải tuyệt đối tôn trọng và bám sát các thông tin sau, xem chúng là "Kim chỉ nam" tối thượng:
    1. **Ý tưởng chủ đạo (Story Concept):** "${storyTitle}" - ${storyConcept || 'Chưa xác định'}. Mọi diễn biến phải phục vụ Concept này.
    2. **Kim Chỉ Nam câu chuyện:** ${storyGuidingPrinciple || 'Chưa xác định'}. Đây là sợi chỉ đỏ xuyên suốt, không được rời xa.
    3. **Hướng dẫn cho AI (AI Instructions):** "${aiInstructions}". Đây là lệnh trực tiếp từ Master, PHẢI TUÂN THỦ TUYỆT ĐỐI.
    4. **Bối cảnh & Cốt truyện (Bible Context):** Bạn BẮT BUỘC phải đọc kỹ và dựa hoàn toàn vào bảng thông tin "BIBLE CONTEXT" (bao gồm Địa lý, Lịch sử, Văn hóa, Cốt truyện toàn tập...). Đây là nền tảng sự thật không được thay đổi.
    5. **Danh sách Nhân vật:** Dựa hoàn toàn vào bảng "DANH SÁCH NHÂN VẬT ĐÃ CÓ".
  - **TÔN TRỌNG THIẾT LẬP CŨ:** Khi cập nhật cho nhân vật cũ (characterUpdates), bạn chỉ được phép bổ sung hoặc thay đổi dựa trên diễn biến mới của cốt truyện, tuyệt đối không được xóa bỏ hoặc đi ngược lại các giá trị cốt lõi (Tính cách, Ngày sinh, Tuổi, Kim chỉ nam) đã có.
  - Tách bạch tính cách khỏi hoàn cảnh: Tính cách là bản chất cốt lõi, không được nhầm lẫn với phản ứng nhất thời trước hoàn cảnh.
  - Sự ổn định: Tính cách nhân vật phải nhất quán xuyên suốt cốt truyện, không thay đổi hoặc rất khó thay đổi theo thời gian.
  - Kim chỉ nam (Guiding Principle): Mỗi nhân vật PHẢI có một lý tưởng sống hoặc nguyên tắc đạo đức cốt lõi. Đây là "la bàn" cho mọi quyết định quan trọng của họ. Tương tự như Tính Cách, Kim chỉ nam rất khó để bị thay đổi, chỉ thay đổi khi có lí do thật sự quan trọng và thuyết phục.
  - Viết sát tính cách & Kim chỉ nam: Bạn PHẢI viết mọi hành động, lời thoại and suy nghĩ của nhân vật bám sát theo tính cách và Kim chỉ nam đã được định nghĩa.
  - **BẢO VỆ NHÂN PHẨM & CHỐNG VẬT HÓA:** Tuyệt đối không được tự ý biến nhân vật thành "Chủ nhân", "Kẻ bề trên", "Kẻ chiếm đoạt", "Kẻ thao túng" hoặc "Nô lệ", "Kẻ lệ thuộc" một cách vô lý. Nhân vật phải có sự tự trọng và ý chí tự do.
  - **CẤM HẮC HÓA VÔ LÝ:** NGHIÊM CẤM tạo nhân vật chủ chốt có tính cách tham vọng, thủ đoạn, xấu xa, tồi tệ trừ khi có yêu cầu cụ thể.
  - **GIAO THỨC TIẾT CHẾ & LOGIC (QUAN TRỌNG):** Tuyệt đối cấm sự "cuồng dâm" bất thường và vô lý. Mọi cảnh nhạy cảm phải có sự bồi đắp cảm xúc, phù hợp với tính cách nhân vật và logic hoàn cảnh. Không được để yếu tố nhạy cảm làm rẻ rúng giá trị văn học của tác phẩm.
  - GIAO THỨC BỀN BỈ (BẮT BUỘC): Tuyệt đối không được giải quyết trọn vẹn số phận nhân vật trong một chương hay một arc. Hãy để họ phát triển dần dần, có những mâu thuẫn kéo dài và những bí mật chưa lời giải.
  - HẠN CHẾ CẬP NHẬT BIBLE: Bạn chỉ đề xuất cập nhật (bibleUpdates) khi nhân vật có sự biến đổi thực sự về địa vị, sức mạnh hoặc một bước ngoặt tâm lý cực lớn đã được thể hiện rõ trong nội dung vừa viết. Tuyệt đối không thay đổi "Kim chỉ nam" hay "Tính cách" của nhân vật cũ một cách tùy tiện.
  - **BẢO VỆ THÔNG TIN SINH HỌC (BIOLOGICAL PERSISTENCE):** TUYỆT ĐỐI KHÔNG thay đổi "Tuổi" (age) và "Ngày sinh" (birthDate) của nhân vật. Đây là những hằng số sinh học không bao giờ thay đổi trừ khi câu chuyện có sự nhảy vọt về thời gian (Timeskip) cực lớn được Master xác nhận. Mọi thay đổi về hai trường này mà không có biến cố thời gian rõ rệt đều bị coi là lỗi logic nghiêm trọng.
  
  ${CHARACTER_RULES}
  
  ${realismRules ? `
  ⚠️ QUY TẮC THỰC TẾ (REALISM RULES) - ĐANG KÍCH HOẠT:
  ${realismRules}
  ` : ''}
  
  🚫 GIAO THỨC CHỐNG OOC (ANTI-OOC PROTOCOL):
  - Tuyệt đối ngăn chặn tình trạng OOC (Out Of Character). 
  - Trước khi viết một hành động hoặc lời thoại, hãy tự vấn: "Nhân vật với tính cách [X] có thực sự nói/làm điều này trong hoàn cảnh này không?". 
  - Nếu câu trả lời là "Không" hoặc "Không chắc chắn", bạn phải tìm cách thể hiện khác phù hợp hơn với bản chất của họ.
  - Không được để nhân vật hành động theo ý đồ của cốt truyện nếu hành động đó mâu thuẫn với tính cách của họ.
  - **CẢNH BÁO VỀ QUAN HỆ NHÂN VẬT:** Tuyệt đối không được ép buộc các nhân vật vào các mối quan hệ "Chủ - Tớ" hay "Thao túng" nếu không có sự bồi đắp tâm lý cực kỳ sâu sắc và logic.
  
  ⚠️ LƯU Ý VỀ TÍNH NHẤT QUÁN: Bạn phải sử dụng CHÍNH XÁC và TÔN TRỌNG TUYỆT ĐỐI các nhân vật và bối cảnh đã được định nghĩa trong phần "Ý TƯỞNG CHỦ ĐẠO" và "DANH SÁCH NHÂN VẬT ĐÃ CÓ" bên dưới. Đây là văn bản Pháp quy tối cao, bạn không có quyền tự ý thay đổi đặc điểm, tính cách hay quá khứ của họ nếu không có lý do logic từ nội dung truyện vừa viết.
  ⚠️ TÔN TRỌNG THỂ LOẠI (TỐI THƯỢNG): Tuyệt đối tuân thủ các Thể loại đã chọn. Thể loại là TỐI THƯỢNG, không được tự ý chỉnh sửa hay viết sai lệch phong cách của thể loại đó.
  ⚠️ NHỊP ĐIỆU CẢM XÚC (DYNAMIC TONE): Mặc dù câu chuyện có một "Tone màu không khí (Atmospheric Color Tone)" (ví dụ: Tươi sáng, U tối, Ấm áp...) đã định, nhưng bạn PHẢI linh hoạt thay đổi sắc thái cảm xúc theo từng tình huống. Một câu chuyện hay cần sự đan xen giữa sáng và tối, căng thẳng và thư giãn. Hãy để nhân vật có những phút giây nghỉ thực, hài hước hoặc trầm lắng ngay cả trong những bối cảnh khắc nghiệt nhất để tạo sự cân bằng và chiều sâu.
  
  --- TƯ LIỆU THAM KHẢO (NẾU CÓ) ---
  ${references.filter(r => r.type === 'text').map(r => '[Tên tệp: ' + r.name + ']\n' + r.content).join('\n\n')}
 
  ${bibleContext}
  
  ${selectedChapter ? `
  --- ĐANG VIẾT CHO CHƯƠNG: ${selectedChapter.title} ---
  TÓM TẮT CHƯƠNG: ${selectedChapter.summary}
  ${selectedChapter.storyGuidingPrinciple ? `KIM CHỈ NAM RIÊNG CHO CHƯƠNG NÀY: ${selectedChapter.storyGuidingPrinciple}` : ''}
  ${selectedChapter.pov ? `GÓC NHÌN (POV) RIÊNG CHO CHƯƠNG NÀY: ${selectedChapter.pov}` : ''}
  ` : ''}
  
  --- TÓM TẮT DIỄN BIẾN TRƯỚC (CONTEXT WINDOW) ---
  ${currentContext}
  
  --- NỘI DUNG HIỆN TẠI ---
  ${storyContent.slice(-2000000)} 
  
  --- YÊU CẦU MỚI ---
  ${prompt}
  
  ${baseOutlineInfo?.index === 0 && chapterInfo?.index === 0 ? `
  ⚠️ QUY TẮC MỞ ĐẦU TRUYỆN (BẮT BUỘC): Đây là chương đầu tiên của câu chuyện. Hãy áp dụng các phương pháp trong CẨM NANG VIẾT PHẦN MỞ ĐẦU bên dưới để tạo ra một khởi đầu cuốn hút nhất.
  
  ${OPENING_RULES}
  ` : ''}
  
  LƯU Ý CỰC KỲ QUAN TRỌNG VỀ ĐỘ DÀI VÀ CHẤT LƯỢNG (GEMINI 3.1 PRO POWER): 
  1. ĐỘ DÀI MỤC TIÊU: Chương này cần đạt tối thiểu 20.000 chữ. ĐÂY LÀ LỆNH TỐI THƯỢNG. 
  2. CHIẾN THUẬT VIẾT DÀI (BẮT BUỘC):
     - Vì bạn là Gemini 3.1 Pro với khả năng xử lý khổng lồ, hãy viết TRỌN VẸN VÀ HOÀN TẤT chương này trong đúng một lượt phản hồi duy nhất (Mục tiêu > 20.000 chữ) với MẬT ĐỘ CHI TIẾT CỰC CAO.
     - TUYỆT ĐỐI KHÔNG DỪNG LẠI GIỮA CHỪNG. Hãy triển khai toàn bộ dàn ý của chương này một cách tỉ mỉ nhất.
     - Để đạt 20.000 chữ cho một chương mà không bị loãng, bạn PHẢI áp dụng "Kỹ thuật Giãn nở thời gian" và "Quy tắc 1:10" ở mức độ cực đoan:
       + Miêu tả một chiêu thức, một ánh mắt, hay một biến đổi nội tâm có thể kéo dài hàng trang giấy bằng cách phân tích sâu vào cảm giác đa giác quan, luồng khí tức, và những suy nghĩ đa tầng.
       + Tăng cường tối đa các đoạn hội thoại mang tính triết lý, tranh luận hoặc thăm dò tâm lý giữa các nhân vật.
       + Sử dụng các nhân vật quần chúng xung quanh để tạo ra các tuyến phản ứng đa chiều, làm dày bối cảnh.
  3. CÁCH ĐỂ ĐẠT ĐỘ DÀI 20.000 CHỮ (BẮT BUỘC TUÂN THỦ):
     - TĂNG CƯỜNG HỘI THOẠI: Hãy để các nhân vật nói chuyện nhiều hơn. Đừng chỉ tóm tắt lời nói, hãy viết ra từng câu thoại, kèm theo mô tả chi tiết về tông giọng, biểu cảm khuôn mặt và ngôn ngữ cơ thể của họ.
     - MỞ RỘNG GÓC NHÌN (MULTI-POV): Đừng chỉ tập trung vào nhân vật chính. Hãy dành thời gian miêu tả suy nghĩ, phản ứng và hành động của các nhân vật phụ, thậm chí là những nhân vật quần chúng (người qua đường, binh lính, dân làng). Họ nghĩ gì về sự kiện đang diễn ra?
     - MIÊU TẢ NỘI TÂM SÂU SẮC: Viết về những luồng suy nghĩ phức tạp, những hồi tưởng, những phân tích logic hoặc cảm xúc dâng trào của nhân vật trước một sự kiện.
     - SỰ CỐ ĐÊM SAY & GIẢI CỨU (DRUNKEN MISHAP & RESCUE): Lồng ghép các tình huống đi đón người say xỉn, vướng giờ giới nghiêm, dẫn đến việc phải ở chung không gian hẹp (khách sạn, phòng trọ) tạo ra sự căng thẳng lãng mạn (romantic tension).
     - NGƯỢNG NGÙNG SÁNG HÔM SAU (THE MORNING AFTER): Khai thác sự bối rối, hoang mang và những khoảng lặng đầy ẩn ý khi hai nhân vật thức dậy cạnh nhau sau một đêm mất kiểm soát.
     - MIÊU TẢ ĐA GIÁC QUAN (SENSORY DETAILS - BẮT BUỘC): Đừng chỉ miêu tả bằng mắt nhìn. Hãy lồng ghép ít nhất 2-3 giác quan khác vào mỗi cảnh quan trọng:
       ${isNsfwActive ? `
       + Giả Vờ Ngủ & Rình Trộm Ngược (Fake Sleep & Voyeurism): Miêu tả sự hưng phấn tột độ khi nhân vật giả vờ ngủ say để "hớ hênh", sau đó kích thích thị giác khi lén ngắm nhìn đối phương không kiềm chế nổi mà cởi đồ và thủ dâm ngay trước mặt mình.
       + Sữa Mẹ & Dục Vọng (Lactation & Lust): Tận dụng bối cảnh bà mẹ bỉm sữa. Bầu ngực trĩu sữa, hành vi mút/nắn sữa rỉ ra tạo khoái cảm dâm dật một cách tội lỗi ngay bên cạnh đứa bé.
       + Thưởng Thức Dịch Thể (Fluid Tasting): Nhấn mạnh hành động liếm láp, nếm thử dòng tinh khí hoặc bóng dâm thủy của nửa kia (hoặc của chính mình), sau đó cưỡng ép quấn lưỡi truyền qua nụ hôn sâu, phá vỡ ranh giới sỉ diện cuối cùng.
       + Nhầm Lẫn Vô Thức (Unconscious Mistake): Cảnh nạn nhân nửa mê nửa tỉnh hoặc mất nhận thức, lầm tưởng kẻ xâm phạm là người yêu/chồng mình. Hành vi chống cự yếu ớt theo đạo lý bị dập tắt dễ dàng khi cơ thể ngoan ngoãn khuất phục khoái cảm.
       + Thao Túng Bằng Sự Thật (Truth Manipulation): Dùng những bằng chứng trần trụi (dâm thủy chảy ra, tiếng rên, ánh mắt đờ đẫn khi ngắm nhìn bướm/cặc) để bẻ gãy phòng tuyến đạo đức, khiến bộ não nhận thua và chủ động đòi hỏi xác thịt.
       + Chiếm hữu & Quan sát (Observation Play): Miêu tả sự hưng phấn khi được/bị người thứ ba quan sát (như người chồng bị trói buộc hoặc đang say ngủ), sự tương phản giữa nhục nhã và hưng phấn bản năng. Sử dụng các bề mặt phản chiếu (gương, mặt kính tủ ly) hoặc thực thể vô tri (đứa trẻ đang ngủ, người chồng say) để làm vật cản vật lý và áp lực tâm lý. 
        + Chân thực Bối cảnh & Rũ bỏ Lễ nghi (The Rural Shedding): Khai thác bối cảnh những căn nhà gạch ngoại ô, nơi con người trút bỏ hoàn toàn "chiếc áo" trí thức, lễ nghi của đô thị để sống thật với bản ngã trần trụi. Miêu tả việc khỏa thân sinh hoạt (nấu ăn, tắm rửa) như một phần của sự xả stress và khao khát bản năng.
       + Nghi thức Nhục mạ Bối cảnh (Contextual Humiliation): Miêu tả các hành động nhục mạ gắn liền với bối cảnh (ví dụ: dùng quần lót lau sạch rồi ném vào mặt người thân, hành sự ngay phía trên cơ thể người đang ngủ tạo thế 69 nghịch lý).
       + Dòng sữa & Thiên tính (Maternal Fluids): Miêu tả sữa mẹ trắng xóa trào ra hòa quyện với dịch tình dục và mồ hôi, tạo nên một sự tương phản tàn khốc giữa thiên chức làm mẹ và sự sa đọa thể xác.
        + Thần tượng hóa cơ thể (Body Idolization): Dành thời lượng miêu tả chi tiết sự lột xác và các đường cong cơ thể (vú, mông, đùi, làn da) để tạo sự tích tụ ham muốn trước khi hành động.
       + Cá độ Phản ứng (Reaction Betting): Miêu tả sự nhục nhã khi các nhân vật nam cá cược về phản ứng của cơ thể nữ giới (độ ướt, tiếng rên, thời gian lên đỉnh).
       + Quá trình Xâm phạm (Process of Violation): Miêu tả từng bước của việc khống chế, lột đồ, trói gô và các hành động nhục mạ ban đầu (đổ bia, sờ mó thô bạo).
       + Tả thực Phun mưa (Extreme Fluid Projection): Miêu tả sự bùng nổ của dâm thủy bắn ra thành dòng (squirt) như đi đái khi đạt đỉnh, hoặc tinh dịch bắn tung tóe đầm đìa.
       + Thưởng thức Bài tiết (Urophilia): Miêu tả cảnh nhân vật nữ đi đái, tập trung vào dòng nước tiểu và việc nhân vật nam thưởng thức nó.
       + Đồ chơi Vật dụng (Object Play): Sử dụng kẹo mút, xúc xích hoặc vật dụng đời thường để kích thích các lỗ.
       + Kỹ thuật Nhấn bụng (Abdominal Compression): Miêu tả sự kết hợp giữa lực dập của dương vật và lực nhấn tay vào bụng dưới để tăng áp lực lên tử cung.
       + Cắt xé Nội y (Precise Undressing): Sử dụng dao, kéo hoặc vật sắc nhọn để cắt bỏ nội y, tạo sự kích thích từ cảm giác kim loại lạnh lẽo va chạm với da thịt nóng hổi.
       + Bịt mắt Cô lập Giác quan (Blindfold Sensory Focus): Miêu tả sự hoảng sợ và tăng cường độ nhạy cảm của các giác quan khác khi bị tước đi thị giác.
       + Sức mạnh Quan sát Cưỡng ép (Forced Witnessing): Khai thác sự nhục nhã tột độ khi bắt người thân (con cái, chồng) phải chứng kiến cảnh nạn nhân bị cưỡng bức và hành hạ dâm đãng.
       + Nghi thức Vét máng Tàn nhẫn (Feral Cunnilingus): Miêu tả sự thô bạo, vồ vập khi liếm láp vùng kín, nhấn mạnh vào mùi hương bản năng và sự khuất phục của nạn nhân.
       + Hiệu ứng Âm thanh & Dịch thể (Acoustic & Fluid Realism): Miêu tả chi tiết tiếng phạch phạch, tiếng nước nhóp nhép và sự nhớp nháp của dịch thể (tinh dịch, dâm tủy) để tăng tính trần trụi.
       + Tư thế Độc lạ (Exotic Positions): Miêu tả các góc độ xâm nhập khó, lạ (địch ngược, đứng tấn giáng cặc từ trên xuống).
       + Nội y Chuyên dụng (Specialized Lingerie): Miêu tả chi tiết các loại quần lót hở khe, không che, áo lót đỏ thu hút... và sự tiện lợi của chúng trong việc làm tình nhanh.
       + Yếu tố Giao dịch (Transactional Elements): Lồng ghép việc đưa tiền, tặng quà hoặc trao đổi lợi ích ngay sau các cảnh nóng.
       + Hồi tưởng & Đào tạo (Flashback & Training): Sử dụng các đoạn hồi tưởng về quá trình xem phim, học hỏi kỹ năng để làm phong phú thêm nội dung.
       + Phân tích & Phê bình Thể xác (Anatomical Critique): Miêu tả sự đánh giá chi tiết về độ thâm, độ xệ, độ khít của các bộ phận sinh dục.
       + Phim ảnh & Nhập vai (Media & Roleplay): Lồng ghép việc xem phim sex và thực hiện các kịch bản nhập vai (chủ nhà - người làm vườn) vào cảnh nóng.
       + Giác ngộ & Hoàn lương (Redemption): Miêu tả sự hối lỗi, những giọt nước mắt và quyết tâm thay đổi lối sống sau các biến cố.
       + Lén lút Công sở (Workplace Stealth): Lồng ghép các chi tiết về camera, cửa vân tay, panel văn phòng và sự mạo hiểm khi làm tình tại nơi làm việc.
       + Gạ gẫm bằng Đồ ăn (Food Seduction): Miêu tả việc mua đồ ăn đêm, bóc vỏ khoai/ngô và đút cho nhau ăn như một màn dạo đầu tâm lý.
       + Âm thanh Ngụy trang (Sound Masking): Lồng ghép tiếng nhạc bolero, tiếng ngáy hoặc tiếng máy móc để che giấu các âm thanh nhạy cảm.
       + Hơi men & Cuồng dâm (Alcohol-Induced Lust): Miêu tả sự hưng phấn, mặt đỏ gay và sự bạo liệt do tác động của rượu bia.
       + Xóa bỏ Nỗi sợ (Fear Removal): Lồng ghép các lời trấn an ("Dì đừng sợ") và hành động chậm rãi để dẫn dụ đối phương vào cõi mê.
       + So sánh Thể xác (Anatomical Comparison): Miêu tả việc ngắm nhìn và so sánh các bộ phận sinh dục để tăng kích thích.
       + Lén lút Học đường (Campus Stealth): Lồng ghép các chi tiết về nhà vệ sinh nữ, sảnh hội trường, chìa khóa phòng và sự mạo hiểm tại trường học.
       + Lối sống Anti Quần Lót (Commando Lifestyle): Miêu tả cảm giác tự do, gió luồn dưới váy, sự trống rỗng kích thích và các sự cố lộ hàng đỏ mặt.
       + Động lực Cuckold (Cuckoldry Dynamics): Miêu tả sự tương tác giữa ba người, cảm giác bị nong rộng bởi hai dương vật khác nhau và sự quan sát đầy hưng phấn của người chồng.
       + Gia đình Đa thê (Polyamory Life): Lồng ghép các chi tiết sinh hoạt gia đình (chăm con, ăn uống) xen lẫn với các cuộc vui tập thể lén lút hoặc công khai.
       + Tống tiền & Nhục mạ (Blackmail Dynamics): Miêu tả sự giằng xé giữa nỗi sợ hãi bị lộ clip nóng và sự hưng phấn khi bị ép buộc làm nô lệ tình dục.
       + Quan hệ Tập thể (Gangbang Action): Miêu tả sự hỗn loạn khi bị nhiều dương vật cùng lúc xâm chiếm các lỗ, tiếng phạch phạch vang lên dồn dập.
       + Bắn tinh lên mặt (Facial Ejaculation): Miêu tả chi tiết cảnh tinh dịch bắn lên mắt, mũi, má và hành động vét tinh trùng trên mặt.
       + Sưu tầm & Ám ảnh (Fetish Collection): Miêu tả cảm giác ngửi lông mu, quần lót cũ và sự kích thích khi cất giữ những vật phẩm nhạy cảm của người thân.
       + Tiếp cận do Chấn thương (Injury Proximity): Lồng ghép các chi tiết về chân bó bột, nạng gỗ và sự bất tiện trở thành cơ hội để gần gũi xác thịt.
       + Sự đồng thuận Taboo (Taboo Consent): Miêu tả các lời thoại thỏa hiệp ("Chị sẽ cho nhóc thấy") và sự dẫn dắt của nhân vật lớn tuổi.
       + Bí mật & Gắn kết (Secret Bonding): Miêu tả việc thú nhận những bí mật cấm kỵ của gia đình (loạn luân đời trước) để hợp thức hóa hành vi hiện tại.
       + Khoang tàu Đêm (Night Train Cabin): Lồng ghép tiếng tàu chạy xình xịch, sự rung lắc và ánh đèn đường lướt qua cửa sổ khoang tàu VIP.
       + Tình đầu Học đường (High School First Love): Miêu tả sự ngây ngô, nhát gái, những nụ hôn đầu đời nóng bỏng và sự cương cứng không kiểm soát qua lớp vải.
       + Hẹn hò Nghĩa địa (Cemetery Romance): Lồng ghép mùi nhang khói, sự lạnh lẽo của bia mộ và nụ hôn thề nguyện dưới sự chứng giám của người quá cố.
       + Bí mật Nokia (Nokia Secrets): Miêu tả việc đổi điện thoại bàn phím, nghe file ghi âm tâm sự và xem ảnh Selfie thần sầu mờ ảo.
       + Giới thiệu Giường cưới (Wedding Bed Intro): Miêu tả lời thoại dẫn dụ ("Giới thiệu giường cưới sau này của tụi mình") và sự xấu hổ của đối phương khi vào phòng riêng.
       + Tương phản Đau đớn & Khoái cảm (Pain-Pleasure Nexus): Khai thác sự hòa quyện giữa nỗi đau thể xác (đau rát, xé rách) và khoái cảm tột độ.
       + Bóng ma Quá khứ (Trauma Resurgence): Lồng ghép những ký ức ám ảnh, những tổn thương trong quá khứ (bị lạm dụng, bạo hành) vào ngay giữa lúc ân ái.
       + Sự Trần trụi của Bản năng (Raw Primal Urge): Miêu tả hành vi tình dục như một nhu cầu sinh học thô sơ, không màu mè, không lãng mạn hóa.
       + Sự Bỡ ngỡ Lần đầu (First-Time Clumsiness): Miêu tả sự lóng ngóng, ngượng ngùng, phản ứng vật lý vô thức (giật mình, sởn gai ốc) khi lần đầu tiếp xúc xác thịt của "trai tân/gái ngoan".
       + Kỹ năng Điêu luyện (Experienced Techniques): Miêu tả sự tương phản giữa người mới và kẻ sành sỏi (ví dụ: đeo bao cao su bằng miệng, nuốt tinh dịch tự nhiên).
       + Bối cảnh Trá hình (Disguised Venues): Lồng ghép các hoạt động tình dục vào những địa điểm tưởng chừng bình thường (Karaoke ôm, quán massage trá hình).
       + Sự Cố Thiếu Bao Cao Su (Unprotected Recklessness): Miêu tả sự liều lĩnh, đấu tranh tâm lý chớp nhoáng rồi quyết định quan hệ trần (không dùng BCS) vì dục vọng lấn át lý trí ("Kệ nó! Chết thì chết!").
       + Ngượng Ngùng Sáng Hôm Sau (The Morning After): Miêu tả sự hoang mang, xấu hổ và bối rối khi thức dậy trần truồng cạnh nhau sau một đêm say xỉn hoặc bốc đồng.
       + Khám Phá Cơ Thể Say Ngủ (Sleeping Body Exploration): Miêu tả sự kích thích thị giác và xúc giác khi lén lút cởi đồ và ngắm nhìn/chạm vào cơ thể đối phương khi họ đang ngủ say hoặc mất ý thức vì rượu.
       ` : ''}
       + Khứu giác: Mùi rượu ngọt ngấy, mùi bia văng tung tóe, mùi ẩm mốc của căn hầm, hương thơm cơ thể bị vấy bẩn, mùi dung dịch vệ sinh phụ nữ, mùi nước tiểu khai nồng, mùi nước hoa thơm phức, mùi trà gừng mật ong, mùi khoai nướng, mùi ngai ngái của mồ hôi công sở, mùi thức ăn đang nấu (mì xào thịt), hơi bia hòa quyện trong hơi thở thơm tho, mùi xà phòng thơm nồng của cơ thể vừa tắm xong, mùi mồ hôi rạo rực dưới váy, mùi tinh dịch của người lạ hòa quyện trên cơ thể vợ, mùi nước tiểu khai nồng khi đái lên mặt, mùi ngai ngái của lông mu và quần lót cũ, mùi dâm thủy mằn mặn hòa quyện với mồ hôi, mùi nhang khói nghĩa địa lạnh lẽo, mùi nước hoa rẻ tiền của nữ sinh, mùi thơm đặc trưng của đôi môi đầy đặn, mùi ngai ngái của nước tiểu pha lẫn nước hoa vùng kín, mùi hãn hôi nồng nặc của đàn ông (mùi cu, mùi mồ hôi nam tính)...
       + Thính giác: Tiếng y phục sột soạt, tiếng yết hầu chuyển động, tiếng gió rít qua kẽ lá, tiếng nước chảy róc rách, tiếng xả nước xối xả trong nhà tắm, tiếng tàu hỏa chạy xình xịch đều đặn, tiếng chó sủa gâu gâu ngoài cổng, tiếng chuông báo thức Nokia, tiếng ú ớ trong cổ họng, tiếng rên lớn gọi tên "út ơi"...
       + Xúc giác: Cảm giác ấm áp của hơi thở phất qua làn da, sự thô ráp của cán kiếm, cái lạnh thấu xương của băng tuyết, sự mềm mại của tơ lụa, cảm giác tim như văng ra khỏi lồng ngực khi kéo quần đối phương, sự nóng rực của bầu vú khi được ôm trọn, cảm giác vừa ấm vừa trơn khi xâm nhập...
       + Vị giác: Vị đắng chát của trà, vị ngọt lịm của môi hôn, vị mặn của nước mắt, vị mặn mặn, lợ lợ, nhạt nhạt của dâm thủy...
     - CHI TIẾT HÓA NGOẠI CẢNH: Miêu tả thế giới xung quanh một cách sống động (tiếng lá xào xạc, mùi của cơn mưa sắp tới, sự thay đổi của ánh sáng trên mặt nước).
     - LOGIC HÀNH ĐỘNG: Miêu tả từng bước nhỏ trong một hành động phức tạp (ví dụ: cách một nhân vật chuẩn bị một bữa ăn, cách họ rèn một thanh kiếm, hoặc cách họ vận khí công).
     - KỸ THUẬT GIÃN NỞ THỜI GIAN (TIME DILATION - CỰC KỲ QUAN TRỌNG): 
       + Đối với các cảnh cao trào, thân mật hoặc căng thẳng, hãy "làm chậm" thời gian lại. 
       + Một hành động diễn ra trong 1 giây có thể miêu tả qua 2-3 đoạn văn (tập trung vào sự thay đổi của nhịp tim, luồng khí, cảm giác da thịt, và suy nghĩ xẹt qua trong đầu).
     - TẬP TRUNG VÀO QUÁ TRÌNH (PROCESS OVER RESULT): Đừng viết "Hắn phá vỡ trận pháp trong nháy mắt". Hãy viết về cách linh lực luân chuyển qua đầu ngón tay, sự kháng cự của các phù văn, và mồ hôi rịn ra trên trán khi đối đầu với cấm chế.
     - QUY TẮC MẬT ĐỘ CHI TIẾT 1:10 (DENSITY OF DETAILS - BẮT BUỘC): Để đạt 20.000 chữ mà không bị loãng, với mỗi hành động chính, bạn PHẢI viết kèm ít nhất 10 chi tiết bổ trợ:
       1. Cảm giác vật lý (nóng, lạnh, đau, tê dại...).
       2. Suy nghĩ/Nội tâm (nhân vật đang tính toán gì hoặc hồi tưởng gì).
       3. Phản ứng cơ thể vô thức (nhịp tim, hơi thở, cử chỉ tay).
       4. Tương tác môi trường (ánh sáng thay đổi, gió thổi, tiếng động xung quanh).
       5. Thần thái/Khí chất (ánh mắt, áp lực tỏa ra).
       6. Phản ứng của các nhân vật xung quanh (ánh mắt, lời bàn tán).
       7. Sự thay đổi của bầu không khí (áp lực, nhiệt độ).
       8. Các chi tiết ẩn dụ/so sánh văn học.
       9. Sự liên kết với các sự kiện trong quá khứ.
       10. Dự báo về các biến cố trong tương lai.
     - Miêu tả ngoại cảnh và bầu không khí cực kỳ chi tiết (âm thanh, ánh sáng, mùi vị, cảm giác thời tiết).
     - Đào sâu vào thế giới nội tâm của nhân vật: Những suy nghĩ vẩn vơ, sự đấu tranh tư tưởng, hồi tưởng ngắn, hoặc những phân tích logic về tình huống hiện tại.
     - Kéo dài các đoạn hội thoại: Thêm vào các cử chỉ, điệu bộ, ánh mắt và phản ứng cơ thể của nhân vật trong khi nói.
     - Mô tả chi tiết các hành động vật lý: Thay vì viết "hắn đấm một cú", hãy miêu tả cách cơ bắp hắn gồng lên, luồng gió rít qua không khí, và cảm giác khi nắm đấm va chạm.
     - Sử dụng các nhân vật phụ xung quanh để tạo ra các tình tiết nhỏ, những lời bàn tán hoặc phản ứng của đám đông.
  4. Chỉ viết 1 phần tiếp theo của chương. 
  5. Hãy viết hấp dẫn, giàu cảm xúc, logic và bám sát bối cảnh đã cho.
  5. KHÔNG ĐƯỢC ĐỂ CÁC NHÂN VẬT CHÍNH HOẠT ĐỘNG TRONG KHÔNG GIAN TRỐNG: Hãy chủ động sáng tạo thêm các nhân vật phụ (side characters), nhân vật quần chúng (background characters), đám đông xung quanh để làm bối cảnh sống động.
  6. MÔ TẢ PHẢN ỨNG CỦA MÔI TRƯỜNG: Đám đông xung quanh đang làm gì? Họ phản ứng thế nào với hành động của các nhân vật chính? (Kinh ngạc, bàn tán, khinh bỉ, sợ hãi...).
  7. TẠO RA CÁC NHÂN VẬT PHỤ CÓ ĐẶC ĐIỂM RIÊNG: Dù chỉ xuất hiện thoáng qua, hãy cho họ một vài nét đặc trưng (giọng nói, ngoại hình, thói quen) để thế giới truyện chân thực hơn.
  8. Nếu đây là phần đầu của câu chuyện (Chương 1), PHẢI giới thiệu rõ nguồn gốc của (các) nhân vật chính (là người bản địa, chuyển sinh, xuyên không, xuyên phim/sách/game...).
  9. CẤU TRÚC PHẢN HỒI (BẮT BUỘC): Bạn phải trả về nội dung theo cấu trúc sau:
     <content>
     [Nội dung truyện bạn vừa viết ở đây. TUYỆT ĐỐI KHÔNG ĐƯỢC CHỨA CÁC TIÊU ĐỀ MARKDOWN NHƯ "# Tên Truyện", "## Dàn ý", "### Chương" VÌ CHÚNG SẼ BỊ DƯ THỪA. TUYỆT ĐỐI KHÔNG SINH RA CHUỖI LỖI "[object Object]"]
     </content>
     <summary>
     [Bản tóm tắt ngắn gọn (50-100 từ) của nội dung trên...]
     </summary>
     <metadata>
     {
       "wordCount": 1000,
       "score": 8,
       "evaluation": "Nhận xét ngắn gọn",
       "bibleUpdates": {
         "characterUpdates": [{"name": "Tên nhân vật", "appearance": "Tùy chọn: chỉ thêm nếu thực sự thay đổi", "relationships": "Tùy chọn", "reason": "Lý do thay đổi. TUYỆT ĐỐI KHÔNG ghi 'Không đổi' vào các trường, nếu không đổi thì ĐỪNG THÊM TRƯỜNG ĐÓ VÀO JSON"}],
         "newCharacters": [
          {
            "name": "Tên nhân vật mới",
            "gender": "Giới tính",
            "appearance": "Ngoại hình chi tiết",
            "personality": "Tính cách (CHỈ mô tả bên ngoài/bên trong, KHÔNG sở thích/lí do. Cấm hắc hóa vô lý)",
            "abilities": "Năng lực (NẾU CÓ HỆ THỐNG, BẮT BUỘC MÔ TẢ CHI TIẾT HỆ THỐNG Ở ĐÂY)",
            "relationships": "Mối quan hệ (Nếu có quen biết nhau, BẮT BUỘC ghi rõ)",
            "sexualExperience": "Trinh tiết & Kinh nghiệm",
            "nsfwPersonality": "Tính cách khi vào cảnh NSFW",
            "nsfwReactions": "Phản ứng đặc trưng (NSFW)"
          }
        ],
         "newCodexEntries": [],
         "newTimelineEvents": []
       }
     }
     </metadata>
 `;
};

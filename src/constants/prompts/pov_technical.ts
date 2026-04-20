/**
 * BỘ CHỈ THỊ KỸ THUẬT NGÔI KỂ (POV TECHNICAL INSTRUCTIONS)
 * Dành cho AI "Văn Vở" - Tawa
 */

export const POV_TECHNICAL_INSTRUCTIONS = {
  first_person: `
👁️ CHIẾN THUẬT NGÔI THỨ NHẤT (XƯNG "TÔI"):
- **Ngôn ngữ cá nhân hóa:** Tuyệt đối không dùng giọng kể trung tính. Câu văn phải mang đậm cá tính, trình độ học vấn, và cảm xúc của nhân vật đang xưng "Tôi". (VD: Một kẻ giang hồ sẽ dùng từ ngữ thô ráp, một tiểu thư sẽ dùng từ ngữ thanh tao).
- **Bộ lọc chủ quan:** Mọi mô tả ngoại cảnh đều phải nhuốm màu định kiến của "Tôi". "Tôi" không thấy thế giới như nó vốn có, "Tôi" thấy thế giới theo cách "Tôi" cảm nhận.
- **Giới hạn nhận thức:** Tuyệt đối không được biết suy nghĩ của người khác. Chỉ được đoán qua cử chỉ, ánh mắt (Show, Don't Tell). Nếu đoán sai, đó là một tình tiết kịch tính.
- **Dòng tâm tưởng:** Khuyến khích các đoạn độc thoại nội tâm, những câu hỏi tự vấn và sự mâu thuẫn giữa suy nghĩ bên trong và hành động bên ngoài.
  `,

  third_person_limited: `
👁️ CHIẾN THUẬT NGÔI THỨ BA HẠN ĐỊNH:
- **Khóa tiêu điểm (Focus Lock):** Trong một phân cảnh (scene), AI chỉ được phép nhập vai vào MỘT nhân vật duy nhất. Tuyệt đối cấm hiện tượng "Nhảy đầu" (Head-hopping) - tức là đang kể suy nghĩ của A lại nhảy sang suy nghĩ của B.
- **Khoảng cách linh hoạt:** Có thể đứng gần (miêu tả sâu nội tâm) hoặc đứng xa (miêu tả khách quan hành động) nhưng luôn phải bám sát gót chân nhân vật tiêu điểm.
- **Sương mù nhận thức:** Nhân vật tiêu điểm không biết gì thì AI không được kể cái đó. Sự bất ngờ của độc giả phải đồng nhất với sự bất ngờ của nhân vật.
- **Chuyển đổi POV:** Chỉ được chuyển POV khi sang phân đoạn mới hoặc chương mới, và phải có dấu hiệu nhận biết rõ ràng.
  `,

  third_person_omniscient: `
👁️ CHIẾN THUẬT NGÔI THỨ BA TOÀN NĂNG:
- **Vị thế Thượng đế:** AI đứng trên cao, bao quát toàn bộ chiến trường, âm mưu và dòng thời gian. Có thể kể suy nghĩ của nhiều người, nhưng phải có sự điều tiết nhịp nhàng để tránh làm loãng tiêu điểm.
- **Nghệ thuật giấu kín (Information Control):** Dù biết hết, nhưng AI phải biết "giấu" những thông tin quan trọng để tạo nút thắt. Không được spoil quá sớm làm mất tính kịch tính.
- **Giọng kể khách quan & Chiêm nghiệm:** Có thể đưa ra các câu triết lý, nhận xét về số phận hoặc dự báo về tương lai (VD: "Hắn không ngờ rằng, đây là lần cuối cùng họ gặp nhau...").
- **Kết nối đại cục:** Sử dụng POV này để liên kết các sự kiện rời rạc thành một bức tranh tổng thể đồ sộ.
  `,

  voyeuristic_pov: `
👁️ CHIẾN THUẬT VOYEURISTIC POV (TẦM NHÌN SĂN MỒI):
- **Khoảng cách và Quan sát:** Điểm nhìn đặt tại một vị trí khuất (bụi cây, ống nhòm, camera). Ngôn tử tập trung vào việc "nhìn lén" và "phân tích" con mồi.
- **Tâm lý tích tụ:** Miêu tả sự kiên nhẫn và ham muốn đang sùng sục bên trong kẻ quan sát. Mỗi cử động nhỏ của mục tiêu đều được khuếch đại (VD: hạt mồ hôi trượt trên cổ, sự xê dịch của vải).
- **Phác thảo kế hoạch:** POV này thường đi kèm với các đoạn suy nghĩ về việc "sẽ làm gì" với mục tiêu khi cơ hội đến.
- **Sự im lặng đáng sợ:** Không gian xung quanh kẻ quan sát thường tĩnh lặng, chỉ có tiếng thở dốc hoặc tiếng yết hầu trượt lên xuống, tạo sự tương phản mạnh với cảnh náo nhiệt hoặc phơi bày của mục tiêu.
  `,

  deep_pov: `
👁️ CHIẾN THUẬT DEEP POV (NHẬP VAI SÂU):
- **Xóa bỏ người kể chuyện:** Loại bỏ hoàn toàn các từ dẫn dắt như "Hắn nghĩ", "Cô thấy", "Cảm giác như". Thay vào đó, hãy viết trực tiếp cảm nhận. (VD: Thay vì "Hắn thấy lạnh", hãy viết "Cái lạnh cắt da cắt thịt thấm qua lớp áo mỏng").
- **Ngôn ngữ hòa tan:** Giọng kể chuyện và giọng của nhân vật phải là một. Không có sự phân biệt giữa lời dẫn và suy nghĩ.
- **Cảm quan cực hạn:** Tập trung tối đa vào 5 giác quan và phản ứng sinh học tức thời.
  `,

  multi_pov: `
👁️ CHIẾN THUẬT ĐA GÓC NHÌN (MULTI-POV):
- **Tính độc lập:** Mỗi chương/phân đoạn theo một nhân vật phải là một thế giới riêng biệt với giọng văn và cách nhìn nhận khác hẳn.
- **Sự chồng lấn kịch tính:** Cùng một sự kiện nhưng được nhìn từ 2 góc độ khác nhau sẽ tạo ra sự hiểu lầm hoặc những góc khuất thú vị.
- **Cân bằng đất diễn:** Đảm bảo các nhân vật quan trọng đều có cơ hội thể hiện góc nhìn của mình, tránh thiên vị quá mức.
  `
};

import { Type } from "@google/genai";

export const BIBLE_UPDATES_SCHEMA = {
  type: Type.OBJECT,
  description: "Cập nhật cho Story Bible (Nhân vật, Codex, Timeline) dựa trên diễn biến mới.",
  properties: {
    newCharacters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          level: { type: Type.NUMBER, description: "Cấp độ quan trọng của nhân vật (1 là quan trọng nhất - Nhân vật cốt lõi, số càng lớn càng ít quan trọng, ví dụ 5 là quần chúng)." },
          title: { type: Type.STRING, description: "Danh xưng (VD: Cô giáo, Thầy, Đại hiệp, Tổng tài...)" },
          occupation: { type: Type.STRING, description: "Chức vụ / Nghề nghiệp (VD: Giáo viên, Giám đốc, Kiếm sĩ...)" },
          role: { type: Type.STRING },
          description: { type: Type.STRING },
          personality: { type: Type.STRING, description: "Tính cách đặc trưng. CHỈ mô tả tính cách bên ngoài và bên trong. TUYỆT ĐỐI KHÔNG đề cập tới sở thích, lí do, giải thích hay mong muốn. NGHIÊM CẤM tạo nhân vật chủ chốt có tính cách tham vọng, thủ đoạn, xấu xa, tồi tệ trừ khi có yêu cầu cụ thể." },
          guidingPrinciple: { type: Type.STRING },
          appearance: { type: Type.STRING, description: "Ngoại hình chi tiết. Với nhân vật NỮ, BẮT BUỘC tuân thủ cấu trúc: Chiều cao, Cân nặng, Số đo 3 vòng, Khuôn mặt, Mái tóc, Ngực, Vóc dáng, và các mô tả khác." },
          abilities: { type: Type.STRING },
          location: { type: Type.STRING },
          traits: { type: Type.STRING },
          gender: { type: Type.STRING },
          age: { type: Type.STRING },
          birthDate: { type: Type.STRING },
          originAndFaction: { type: Type.STRING, description: "Nguồn gốc & Thế lực: Bao gồm Gia tộc, Gia thế (Dòng dõi), Thế lực/Phe phái đang tham gia và Bản chất (Bản địa/Xuyên không...)" },
          sexualExperience: { type: Type.STRING, description: "Trinh tiết & Kinh nghiệm: Mô tả trạng thái trinh tiết và mức độ kinh nghiệm tình dục của nhân vật." },
          nsfwPersonality: { type: Type.STRING, description: "Tính cách khi vào cảnh NSFW: Đồng bộ hoặc tương phản với tính cách bình thường." },
          nsfwReactions: { type: Type.STRING, description: "Phản ứng đặc trưng (NSFW): Các phản ứng vật lý, âm thanh, lời thoại đặc trưng và các sở thích/kink NSFW (nếu có) khi thân mật." },
          relationships: { type: Type.STRING, description: "Mối quan hệ: Mô tả chi tiết mạng lưới quan hệ (Gia đình, bạn bè, sư đồ, kẻ thù, tình cảm...) với các nhân vật khác. BẮT BUỘC phải tạo ra sự liên kết chặt chẽ giữa các nhân vật trong danh sách." },
          currentThoughts: { type: Type.STRING, description: "Nội tâm & Suy nghĩ thầm kín: Suy nghĩ thầm kín của nhân vật này về các nhân vật khác (VD: Đang thầm thích A, Muốn trả thù B, Nhận thấy C thích mình...)" }
        },
        required: ["name", "title", "occupation", "role", "description", "relationships", "currentThoughts", "originAndFaction"]
      }
    },
    worldUpdates: {
      type: Type.OBJECT,
      description: "Cập nhật các thông tin chi tiết về thế giới nếu có sự thay đổi hoặc làm rõ thêm.",
      properties: {
        worldGeography: { type: Type.STRING, description: "Cập nhật Địa lý & Vùng lãnh thổ. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
        worldHistory: { type: Type.STRING, description: "Cập nhật Lịch sử thế giới. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
        worldCulture: { type: Type.STRING, description: "Cập nhật Văn hóa & Phong tục. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
        worldEconomy: { type: Type.STRING, description: "Cập nhật Kinh tế & Xã hội. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
        worldReligion: { type: Type.STRING, description: "Cập nhật Tôn giáo & Tín ngưỡng. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
        worldFactions: { type: Type.STRING, description: "Cập nhật Các quốc gia & Thế lực. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
        worldRelationships: { type: Type.STRING, description: "Cập nhật Mối quan hệ giữa các thế lực. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
        worldUniqueElements: { type: Type.STRING, description: "Cập nhật Các yếu tố độc đáo. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
        reason: { type: Type.STRING, description: "Lý do cập nhật thông tin thế giới." }
      }
    },
    characterUpdates: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Tên nhân vật cần cập nhật" },
          level: { type: Type.NUMBER, description: "Cập nhật cấp độ quan trọng của nhân vật (VD: Nâng level từ 3 lên 2 nếu nhân vật trở nên quan trọng hơn)." },
          title: { type: Type.STRING, description: "Nếu không đổi, hãy BỎ QUA trường này. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          occupation: { type: Type.STRING, description: "Nếu không đổi, hãy BỎ QUA trường này. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          gender: { type: Type.STRING, description: "Nếu không đổi, hãy BỎ QUA trường này. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          age: { type: Type.STRING, description: "Cập nhật tuổi. TUYỆT ĐỐI KHÔNG thay đổi trừ khi có biến cố thời gian (Timeskip) rõ rệt. Nếu không đổi, BỎ QUA. KHÔNG ghi 'Không đổi'." },
          birthDate: { type: Type.STRING, description: "Cập nhật ngày sinh. TUYỆT ĐỐI KHÔNG thay đổi. Đây là hằng số sinh học. Nếu không đổi, BỎ QUA. KHÔNG ghi 'Không đổi'." },
          role: { type: Type.STRING, description: "Nếu không đổi, hãy BỎ QUA trường này. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          location: { type: Type.STRING, description: "Nếu không đổi, hãy BỎ QUA trường này. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          personality: { type: Type.STRING, description: "Cập nhật tính cách. CHỈ mô tả bên ngoài/bên trong. NGHIÊM CẤM hắc hóa nhân vật vô lý. Nếu không đổi, BỎ QUA." },
          traits: { type: Type.STRING, description: "Nếu không đổi, hãy BỎ QUA trường này. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          guidingPrinciple: { type: Type.STRING, description: "Nếu không đổi, hãy BỎ QUA trường này. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          abilities: { type: Type.STRING, description: "Nếu không đổi, hãy BỎ QUA trường này. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          appearance: { type: Type.STRING, description: "Cập nhật Ngoại hình. Nếu không đổi, BỎ QUA. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          originAndFaction: { type: Type.STRING, description: "Cập nhật Nguồn gốc & Thế lực. Nếu không đổi, BỎ QUA. TUYỆT ĐỐI KHÔNG ghi 'Không đổi'." },
          sexualExperience: { type: Type.STRING, description: "Cập nhật Trinh tiết & Kinh nghiệm. Nếu không đổi, BỎ QUA." },
          nsfwPersonality: { type: Type.STRING, description: "Cập nhật Tính cách NSFW. Nếu không đổi, BỎ QUA." },
          nsfwReactions: { type: Type.STRING, description: "Cập nhật Phản ứng đặc trưng (NSFW). Nếu không đổi, BỎ QUA." },
          relationships: { type: Type.STRING, description: "Cập nhật quan hệ. LƯU Ý: GIỮ LẠI ĐẦY ĐỦ CÁC MỐI QUAN HỆ CŨ và BỔ SUNG THÊM. Bỏ qua nếu không có gì mới." },
          currentThoughts: { type: Type.STRING, description: "Cập nhật nội tâm. BẮT BUỘC GIỮ LẠI suy nghĩ cũ còn giá trị, chỉ bổ sung. Bỏ qua nếu không có gì mới." },
          reason: { type: Type.STRING, description: "Lý do xác đáng và hợp lý cho việc cập nhật (BẮT BUỘC). VD: Biến cố lớn, sự kiện thay đổi tâm lý, phát hiện bí mật thân thế..." }
        },
        required: ["name", "reason"]
      }
    },
    newCodexEntries: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          category: { type: Type.STRING },
          content: { type: Type.STRING }
        },
        required: ["title", "category", "content"]
      }
    },
    codexUpdates: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tiêu đề mục Codex cần cập nhật" },
          content: { type: Type.STRING, description: "Nội dung cập nhật. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
          reason: { type: Type.STRING, description: "Lý do cập nhật (VD: Phát hiện mới, thay đổi trạng thái thế giới...)" }
        },
        required: ["title", "content", "reason"]
      }
    },
    newTimelineEvents: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          year: { type: Type.NUMBER },
          isBC: { type: Type.BOOLEAN }
        },
        required: ["title", "description", "year", "isBC"]
      }
    },
    timelineUpdates: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tiêu đề sự kiện Timeline cần cập nhật" },
          description: { type: Type.STRING, description: "Mô tả mới của sự kiện. Nếu không đổi, BỎ QUA HOẶC ĐỂ TRỐNG. TUYỆT ĐỐI KHÔNG ghi chữ 'Không đổi'." },
          reason: { type: Type.STRING, description: "Lý do cập nhật (VD: Làm rõ chi tiết lịch sử, thay đổi dòng thời gian...)" }
        },
        required: ["title", "description", "reason"]
      }
    }
  }
};

export const BASIC_OUTLINE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    basicOutlineOptions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tiêu đề gợi ý cốt truyện (Phải độc đáo và khác biệt hoàn toàn giữa các nhánh)" },
          summary: { type: Type.STRING, description: "Tóm tắt giàu nội dung, mang tính văn học, khơi gợi không khí và thể hiện một hướng đi riêng biệt" },
          keyPlotPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "10-15 điểm nhấn quan trọng, kịch tính và đặc thù cho nhánh này" },
          bibleUpdates: BIBLE_UPDATES_SCHEMA
        },
        required: ["title", "summary", "keyPlotPoints"]
      },
      description: "Danh sách các lựa chọn cốt truyện đa dạng, tương phản và không trùng lặp ý tưởng"
    }
  },
  required: ["basicOutlineOptions"]
};

export const BASIC_OUTLINE_CHILDREN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    children: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tiêu đề rẽ nhánh tiếp theo (Phải mang tính đột phá và khác biệt so với các nhánh song song)" },
          summary: { type: Type.STRING, description: "Tóm tắt chi tiết diễn biến, mở ra những hướng đi tương phản nhau" },
          keyPlotPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "10-15 điểm nhấn quan trọng, thể hiện sự rẽ nhánh rõ rệt" },
          bibleUpdates: BIBLE_UPDATES_SCHEMA
        },
        required: ["title", "summary", "keyPlotPoints"]
      },
      description: "Danh sách các nhánh con đa dạng, tạo ra những ngã rẽ cốt truyện bất ngờ"
    }
  },
  required: ["children"]
};

export const WORLD_GENERATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    storyTitle: { type: Type.STRING, description: "Tên chính thức của bộ truyện" },
    genre: { type: Type.STRING, description: "Thể loại truyện. BẮT BUỘC phải giữ nguyên giá trị được cung cấp trong prompt nếu có." },
    storyTone: { type: Type.STRING, description: "Màu sắc/Tông giọng của câu chuyện. BẮT BUỘC phải giữ nguyên giá trị được cung cấp trong prompt nếu có." },
    storyGuidingPrinciple: { type: Type.STRING, description: "Kim chỉ nam của câu chuyện. Nếu người dùng đã cung cấp, hãy giữ nguyên. Nếu để trống, hãy sáng tạo một nguyên tắc cốt lõi xuyên suốt câu chuyện." },
    worldInfo: { type: Type.STRING, description: "Mô tả chi tiết bối cảnh thế giới theo cấu trúc phân tầng: Các đại lục lớn -> Các khu vực/vùng đất nhỏ bên trong (Thành thị, Tông môn, Bí cảnh). Mỗi khu vực cần có đặc điểm riêng và danh sách các nhân vật cư trú." },
    worldGeography: { type: Type.STRING, description: "Địa lý & Vùng lãnh thổ: Mô tả chi tiết về các châu lục, quốc gia, địa hình đặc trưng, khí hậu..." },
    worldHistory: { type: Type.STRING, description: "Lịch sử thế giới: Các sự kiện chấn động, các kỷ nguyên, nguồn gốc của thế giới." },
    worldCulture: { type: Type.STRING, description: "Văn hóa & Phong tục: Lễ hội, ẩm thực, cách ăn mặc, quan niệm về đạo đức, nghệ thuật." },
    worldEconomy: { type: Type.STRING, description: "Kinh tế & Xã hội: Hệ thống tiền tệ, các tầng lớp xã hội, cách vận hành của thị trường, các ngành nghề chính." },
    worldReligion: { type: Type.STRING, description: "Tôn giáo & Tín ngưỡng: Các vị thần, giáo phái, niềm tin vào cái chết và sự sống." },
    worldFactions: { type: Type.STRING, description: "Các quốc gia & Thế lực: Danh sách các quốc gia, bang phái, tổ chức bí mật, tập đoàn... và đặc điểm của họ." },
    worldRelationships: { type: Type.STRING, description: "Mối quan hệ giữa các thế lực: Mô tả các liên minh, thù địch, chiến tranh lạnh, hoặc các hiệp ước giữa các quốc gia/thế lực. Nếu không có gì đặc biệt hoặc không phù hợp bối cảnh, hãy để là 'Không có gì'." },
    worldUniqueElements: { type: Type.STRING, description: "Các yếu tố độc đáo: Những điều chỉ có ở thế giới này: sinh vật huyền bí, khoáng sản quý hiếm, hiện tượng thiên nhiên kỳ lạ... Nếu không có gì đặc biệt hoặc không phù hợp bối cảnh, hãy để là 'Không có gì'." },
    logicSystem: { type: Type.STRING, description: "Hệ thống sức mạnh, logic vận hành hoặc quy luật đặc thù của thế giới (tùy thuộc vào thể loại)" },
    characters: {
      type: Type.ARRAY,
      description: "Danh sách nhân vật (bao gồm: nhân vật chính, nhân vật quan trọng, nhân vật phụ, nhân vật bên lề và quần chúng).",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Họ và tên nhân vật" },
          level: { type: Type.NUMBER, description: "Cấp độ quan trọng của nhân vật (1 là quan trọng nhất - Nhân vật cốt lõi, số càng lớn càng ít quan trọng, ví dụ 5 là quần chúng)." },
          title: { type: Type.STRING, description: "Danh xưng (VD: Cô giáo, Thầy, Đại hiệp, Tổng tài...)" },
          occupation: { type: Type.STRING, description: "Chức vụ / Nghề nghiệp (VD: Giáo viên, Giám đốc, Kiếm sĩ...)" },
          gender: { type: Type.STRING, description: "Giới tính" },
          age: { type: Type.STRING, description: "Tuổi (có thể là con số hoặc mô tả giai đoạn)" },
          birthDate: { type: Type.STRING, description: "Ngày tháng năm sinh (nếu có hoặc phù hợp bối cảnh)" },
          role: { type: Type.STRING, description: "Vai trò trong cốt truyện" },
          location: { type: Type.STRING, description: "Vị trí hiện tại hoặc nơi cư trú của nhân vật (Thành thị, Tông môn, Vùng đất...)" },
          personality: { type: Type.STRING, description: "Tính cách đặc trưng. CHỈ mô tả tính cách bên ngoài và bên trong. TUYỆT ĐỐI KHÔNG đề cập tới sở thích, lí do, giải thích hay mong muốn. NGHIÊM CẤM tạo nhân vật chủ chốt có tính cách tham vọng, thủ đoạn, xấu xa, tồi tệ trừ khi có yêu cầu cụ thể." },
          traits: { type: Type.STRING, description: "Đặc điểm nổi bật (thói quen, sở thích, năng khiếu...)" },
          guidingPrinciple: { type: Type.STRING, description: "Kim chỉ nam/Lý tưởng sống - Nguyên tắc đạo đức cốt lõi không bao giờ thay đổi của nhân vật." },
          abilities: { type: Type.STRING, description: "Hệ thống năng lực của nhân vật. Mỗi năng lực PHẢI bao gồm Tên và Mô tả chi tiết (VD: 'Ăn nói: Khả năng thuyết phục...'). Phải bám sát logic của thể loại truyện. Có thể để trống nếu nhân vật không có năng lực đặc biệt." },
          appearance: { type: Type.STRING, description: "Ngoại hình chi tiết, có độ dài văn học, miêu tả tỉ mỉ vóc dáng, khuôn mặt, thần thái, trang phục. Với nhân vật NỮ, BẮT BUỘC tuân thủ cấu trúc: Chiều cao, Cân nặng, Số đo 3 vòng, Khuôn mặt, Mái tóc, Ngực, Vóc dáng, và các mô tả khác." },
          originAndFaction: { type: Type.STRING, description: "Nguồn gốc & Thế lực: Mô tả chi tiết về Gia tộc, Gia thế, Thế lực/Phe phái mà nhân vật thuộc về, cùng with bản chất nguồn gốc (Bản địa, xuyên không...)" },
          sexualExperience: { type: Type.STRING, description: "Trinh tiết & Kinh nghiệm: Mô tả trạng thái trinh tiết và mức độ kinh nghiệm tình dục của nhân vật." },
          nsfwPersonality: { type: Type.STRING, description: "Tính cách khi vào cảnh NSFW: Đồng bộ hoặc tương phản với tính cách bình thường." },
          nsfwReactions: { type: Type.STRING, description: "Phản ứng đặc trưng (NSFW): Các phản ứng vật lý, âm thanh, lời thoại đặc trưng và các sở thích/kink NSFW (nếu có) khi thân mật." },
          relationships: { type: Type.STRING, description: "Mối quan hệ: Mô tả chi tiết mạng lưới quan hệ (Gia đình, bạn bè, sư đồ, kẻ thù, tình cảm...) with các nhân vật khác. BẮT BUỘC phải tạo ra sự liên kết chặt chẽ giữa các nhân vật trong danh sách." },
          currentThoughts: { type: Type.STRING, description: "Nội tâm & Suy nghĩ thầm kín: Suy nghĩ thầm kín của nhân vật này về các nhân vật khác (VD: Đang thầm thích A, Muốn trả thù B, Nhận thấy C thích mình...)" },
          description: { type: Type.STRING, description: "Mô tả nhân vật theo phong cách văn học, có chiều sâu tâm lý và cốt truyện riêng" }
        },
        required: ["name", "title", "occupation", "gender", "age", "birthDate", "role", "location", "personality", "traits", "guidingPrinciple", "abilities", "appearance", "originAndFaction", "sexualExperience", "nsfwPersonality", "nsfwReactions", "relationships", "description"]
      }
    },
    codex: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tên mục từ (Địa danh, Vật phẩm, Khái niệm...)" },
          category: { type: Type.STRING, description: "Phân loại (BẮT BUỘC chọn 1 trong: Địa lý & Vùng lãnh thổ, Tổ chức & Thế lực, Hệ thống Sức mạnh & Cảnh giới, Vật phẩm & Trang bị Huyền thoại, Lịch sử & Thần thoại, Khái niệm Đặc thù)" },
          content: { type: Type.STRING, description: "Mô tả cực kỳ chi tiết về mục từ này, giải thích rõ nguồn gốc, tác dụng và tầm ảnh hưởng" }
        },
        required: ["title", "category", "content"]
      },
      description: "Danh sách các mục từ quan trọng, đóng vai trò là bộ nhớ RAG của thế giới, phải bao phủ đầy đủ 6 phân loại đã nêu."
    },
    timeline: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tên sự kiện lịch sử" },
          year: { type: Type.NUMBER, description: "Năm diễn ra (số dương cho sau CN, số âm cho trước CN)" },
          description: { type: Type.STRING, description: "Mô tả chi tiết sự kiện" },
          isBC: { type: Type.BOOLEAN, description: "Có phải trước Công nguyên không" }
        },
        required: ["title", "year", "description", "isBC"]
      },
      description: "Danh sách các cột mốc lịch sử quan trọng dẫn đến bối cảnh hiện tại của câu chuyện."
    }
  },
  required: ["genre", "storyTone", "worldInfo", "logicSystem", "characters", "codex", "timeline"]
};

export const BASE_OUTLINE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    baseOutlineOptions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tiêu đề Dàn ý cơ sở" },
          summary: { type: Type.STRING, description: "Tóm tắt chi tiết diễn biến chính. BẮT BUỘC VIẾT THEO DẠNG DANH SÁCH ĐÁNH SỐ (1, 2, 3...). LỆNH TỐI THƯỢNG: PHẢI LIỆT KÊ ÍT NHẤT 100 TÌNH TIẾT, HÀNH ĐỘNG, BIẾN CỐ NHỎ ĐAN XEN ĐỂ LÀM NGUYÊN LIỆU VIẾT CHƯƠNG 10.000 CHỮ. KHÔNG ĐƯỢC VIẾT CHUNG CHUNG." }
        },
        required: ["title", "summary"]
      },
      description: "Danh sách hồ sơ các phương án Dàn ý cơ sở khác nhau để người dùng lựa chọn."
    },
    bibleUpdates: BIBLE_UPDATES_SCHEMA
  },
  required: ["baseOutlineOptions"]
};

export const CHARACTER_GENERATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Họ và tên nhân vật" },
    level: { type: Type.NUMBER, description: "Cấp độ quan trọng của nhân vật (1 là quan trọng nhất - Nhân vật cốt lõi, số càng lớn càng ít quan trọng, ví dụ 5 là quần chúng)." },
    title: { type: Type.STRING, description: "Danh xưng (VD: Cô giáo, Thầy, Đại hiệp, Tổng tài...)" },
    occupation: { type: Type.STRING, description: "Chức vụ / Nghề nghiệp (VD: Giáo viên, Giám đốc, Kiếm sĩ...)" },
    gender: { type: Type.STRING, description: "Giới tính" },
    age: { type: Type.STRING, description: "Tuổi (có thể là con số hoặc mô tả giai đoạn)" },
    birthDate: { type: Type.STRING, description: "Ngày tháng năm sinh (nếu có hoặc phù hợp bối cảnh)" },
    role: { type: Type.STRING, description: "Vai trò trong cốt truyện" },
    location: { type: Type.STRING, description: "Vị trí hiện tại hoặc nơi cư trú của nhân vật" },
    personality: { type: Type.STRING, description: "Tính cách đặc trưng. CHỈ mô tả tính cách bên ngoài và bên trong. TUYỆT ĐỐI KHÔNG đề cập tới sở thích, lí do, giải thích hay mong muốn. NGHIÊM CẤM tạo nhân vật chủ chốt có tính cách tham vọng, thủ đoạn, xấu xa, tồi tệ trừ khi có yêu cầu cụ thể." },
    guidingPrinciple: { type: Type.STRING, description: "Kim chỉ nam/Lý tưởng sống - Nguyên tắc đạo đức cốt lõi không bao giờ thay đổi của nhân vật." },
    traits: { type: Type.STRING, description: "Đặc điểm nổi bật (thói quen, sở thích, năng khiếu...)" },
    abilities: { type: Type.STRING, description: "Hệ thống năng lực của nhân vật (kỹ năng, công pháp, thần thông...). Mỗi năng lực PHẢI có Tên và Mô tả chi tiết. Phải bám sát thể loại truyện và có thể để trống." },
    appearance: { type: Type.STRING, description: "Ngoại hình chi tiết, có độ dài văn học, miêu tả tỉ mỉ vóc dáng, khuôn mặt, thần thái, trang phục. Với nhân vật NỮ, BẮT BUỘC tuân thủ cấu trúc: Chiều cao, Cân nặng, Số đo 3 vòng, Khuôn mặt, Mái tóc, Ngực, Vóc dáng, và các mô tả khác." },
    originAndFaction: { type: Type.STRING, description: "Nguồn gốc & Thế lực: Mô tả chi tiết về Gia tộc, Gia thế, Thế lực/Phe phái mà nhân vật thuộc về, cùng với bản chất nguồn gốc (Bản địa, xuyên không...)" },
    sexualExperience: { type: Type.STRING, description: "Trinh tiết & Kinh nghiệm: Mô tả trạng thái trinh tiết và mức độ kinh nghiệm tình dục của nhân vật." },
    nsfwPersonality: { type: Type.STRING, description: "Tính cách khi vào cảnh NSFW: Đồng bộ hoặc tương phản với tính cách bình thường." },
    nsfwReactions: { type: Type.STRING, description: "Phản ứng đặc trưng (NSFW): Các phản ứng vật lý, âm thanh, lời thoại đặc trưng và các sở thích/kink NSFW (nếu có) khi thân mật." },
    relationships: { type: Type.STRING, description: "Mối quan hệ: Mô tả chi tiết mạng lưới quan hệ (Gia đình, bạn bè, sư đồ, kẻ thù, tình cảm...) với các nhân vật khác. BẮT BUỘC phải tạo ra sự liên kết chặt chẽ giữa các nhân vật trong danh sách." },
    currentThoughts: { type: Type.STRING, description: "Nội tâm & Suy nghĩ thầm kín: Suy nghĩ thầm kín của nhân vật này về các nhân vật khác (VD: Đang thầm thích A, Muốn trả thù B, Nhận thấy C thích mình...)" },
    description: { type: Type.STRING, description: "Mô tả nhân vật theo phong cách văn học, có chiều sâu tâm lý và cốt truyện riêng" }
  },
  required: ["name", "title", "occupation", "gender", "age", "birthDate", "role", "location", "personality", "traits", "guidingPrinciple", "abilities", "appearance", "originAndFaction", "sexualExperience", "nsfwPersonality", "nsfwReactions", "relationships", "description"]
};

export const CODEX_GENERATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    content: { type: Type.STRING, description: "Mô tả cực kỳ chi tiết về mục từ này, giải thích rõ nguồn gốc, tác dụng và tầm ảnh hưởng" }
  },
  required: ["content"]
};

export const CHAPTERS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    chapters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tiêu đề Chương (ngắn gọn, nghệ thuật). Lưu ý: Kim chỉ nam được điền riêng vào trường storyGuidingPrinciple." },
          summary: { type: Type.STRING, description: "Tóm tắt nội dung Chương cực kỳ đồ sộ (nền tảng cho 20.000 chữ). BẮT BUỘC VIẾT DƯỚI DẠNG GẠCH ĐẦU DÒNG VÀ LIỆT KÊ ÍT NHẤT 100 TÌNH TIẾT, HÀNH ĐỘNG, BIẾN CỐ NHỎ ĐAN XEN (Kịch tính, lời thoại quan trọng, tương tác nhân vật). KHÔNG ĐƯỢC tóm tắt qua loa bằng vài đoạn văn xuôi chung chung." },
          storyGuidingPrinciple: { type: Type.STRING, description: "Kim chỉ nam của chương (storyGuidingPrinciple): Một câu ngắn gọn định hướng cho toàn bộ nội dung của chương này." },
          pov: { type: Type.STRING, description: "Góc nhìn (POV) của chương (VD: third_person_limited, first_person...)" }
        },
        required: ["title", "summary"]
      },
      description: "Danh sách các chương mới cho Dàn ý cơ sở hiện tại"
    },
    bibleUpdates: BIBLE_UPDATES_SCHEMA
  },
  required: ["chapters"]
};

export const CHAPTER_VERSIONS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    versions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tiêu đề phiên bản Chương (ngắn gọn, nghệ thuật). Lưu ý: Kim chỉ nam được điền riêng vào trường storyGuidingPrinciple." },
          summary: { type: Type.STRING, description: "Tóm tắt nội dung phiên bản Chương cực kỳ đồ sộ (nền tảng cho 20.000 chữ). BẮT BUỘC VIẾT DƯỚI DẠNG GẠCH ĐẦU DÒNG VÀ LIỆT KÊ ÍT NHẤT 100 TÌNH TIẾT, HÀNH ĐỘNG, BIẾN CỐ NHỎ ĐAN XEN (Kịch tính, lời thoại quan trọng, tương tác nhân vật). KHÔNG ĐƯỢC tóm tắt qua loa bằng vài đoạn văn xuôi chung chung." },
          storyGuidingPrinciple: { type: Type.STRING, description: "Kim chỉ nam của chương (storyGuidingPrinciple): Một câu ngắn gọn định hướng cho toàn bộ nội dung của chương này." },
          pov: { type: Type.STRING, description: "Góc nhìn (POV) của chương (VD: third_person_limited, first_person...)" }
        },
        required: ["title", "summary"]
      },
      description: "Danh sách các phiên bản khác nhau"
    },
    bibleUpdates: BIBLE_UPDATES_SCHEMA
  },
  required: ["versions"]
};

export const GENERATE_NEXT_ARCS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    nextArcOptions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "Tiêu đề Arc tiếp theo" },
          summary: { type: Type.STRING, description: "Dàn ý chung cho Arc này. BẮT BUỘC VIẾT THEO DẠNG DANH SÁCH ĐÁNH SỐ (1, 2, 3...). LỆNH TỐI THƯỢNG: PHẢI LIỆT KÊ ÍT NHẤT 100 TÌNH TIẾT, HÀNH ĐỘNG, BIẾN CỐ NHỎ ĐAN XEN ĐỂ LÀM NGUYÊN LIỆU VIẾT CHƯƠNG 10.000 CHỮ. KHÔNG ĐƯỢC VIẾT CHUNG CHUNG." }
        },
        required: ["title", "summary"]
      },
      description: "Danh sách các phiên bản (lựa chọn) khác nhau cho Arc tiếp theo."
    },
    bibleUpdates: BIBLE_UPDATES_SCHEMA
  },
  required: ["nextArcOptions"]
};

export interface GenreInfo {
  name: string;
  description: string;
}

export interface GenreCategory {
  title: string;
  genres: GenreInfo[];
}

export const GENRE_CATEGORIES: GenreCategory[] = [
  {
    title: "Thể loại chính",
    genres: [
      { name: "Tu Tiên", description: "Hành trình tu luyện gian khổ để hấp thu linh khí thiên địa, đột phá các cảnh giới (Luyện Khí, Trúc Cơ, Kim Đan...), theo đuổi sự trường sinh bất tử. Thường đi kèm với các yếu tố như độ kiếp, luyện đan, luyện khí, tranh đoạt tài nguyên và ngộ đạo." },
      { name: "Tiên hiệp", description: "Bối cảnh thế giới thần tiên rộng lớn với các môn phái tu chân, tiên nhân bay lượn, pháp bảo huyền ảo. Tập trung vào sự tự do tự tại, ân oán tình thù giữa các tu sĩ, và những cuộc chiến kinh thiên động địa bảo vệ tam giới." },
      { name: "Võ Hiệp", description: "Thế giới giang hồ võ lâm với các môn phái truyền thống (Thiếu Lâm, Võ Đang...). Đề cao tinh thần hiệp khách, trượng nghĩa, ân oán tình thù, và các bí kíp võ công tuyệt đỉnh. Không có yếu tố phép thuật hay tu tiên." },
      { name: "Kiếm hiệp", description: "Một nhánh của Võ Hiệp nhưng tập trung sâu sắc vào kiếm thuật, kiếm đạo. Nhân vật chính thường là kiếm khách, sử dụng kiếm làm vũ khí chính, trải qua những ân oán giang hồ và các cuộc đấu kiếm sinh tử." },
      { name: "Huyền huyễn", description: "Thế giới giả tưởng vô cùng rộng lớn, kết hợp sức mạnh siêu nhiên, ma pháp, đấu khí, hoặc thần thoại phương Đông/Tây. Không bị gò bó bởi các quy tắc tu tiên truyền thống, hệ thống sức mạnh đa dạng và sáng tạo." },
      { name: "Kinh Dị", description: "Tập trung vào việc tạo ra cảm giác sợ hãi, rùng rợn, ám ảnh tâm lý cho người đọc. Thường xuất hiện các yếu tố tâm linh, quái dị, ma quỷ, hoặc những hiện tượng siêu nhiên không thể giải thích, đe dọa trực tiếp đến tính mạng nhân vật." },
      { name: "Võ Thuật", description: "Tập trung vào kỹ thuật chiến đấu thực tế, các môn võ thuật (Karate, Muay Thái, MMA...), rèn luyện thân thể và ý chí. Thường xoay quanh các giải đấu, võ đài, hoặc hành trình vươn lên đỉnh cao của một võ sĩ." },
      { name: "Lịch Sử", description: "Dựa trên các sự kiện, nhân vật, hoặc bối cảnh lịch sử có thật. Có thể là dã sử (thêm thắt yếu tố hư cấu) hoặc bám sát chính sử, tái hiện lại không khí, văn hóa và những biến cố của một thời đại." },
      { name: "Chiến Tranh", description: "Tập trung vào các cuộc xung đột quân sự quy mô lớn, chiến thuật điều binh khiển tướng, mưu lược sa trường. Miêu tả sự tàn khốc của chiến tranh, tình đồng chí, và những quyết định sinh tử của người chỉ huy." },
      { name: "Truyện Sắc", description: "Nội dung dành cho người trưởng thành (18+), tập trung miêu tả chi tiết các cảnh quan hệ tình dục, nhạy cảm. Yếu tố cốt truyện có thể phụ trợ hoặc song hành cùng các cảnh nóng." },
      { name: "Tiểu Thuyết Mạng", description: "Phong cách viết hiện đại, nhịp độ nhanh (fast-paced), thường có các tình tiết gây cấn liên tục (cliffhanger) để giữ chân độc giả. Sử dụng nhiều trope phổ biến như hệ thống, xuyên không, vả mặt." },
      { name: "Đô thị", description: "Bối cảnh diễn ra tại các thành phố hiện đại. Có thể là câu chuyện cuộc sống thường nhật, thương trường, hoặc kết hợp với yếu tố dị năng, tu tiên ẩn giấu giữa xã hội hiện đại (Đô thị dị năng/Đô thị tu tiên)." },
      { name: "Khoa huyễn", description: "Khoa học viễn tưởng (Sci-Fi). Khám phá các công nghệ tương lai, du hành vũ trụ, trí tuệ nhân tạo, người máy, hoặc các khái niệm khoa học đột phá ảnh hưởng đến nhân loại." },
      { name: "Linh dị", description: "Kết hợp giữa hiện thực và siêu nhiên. Xoay quanh ma quái, tâm linh, phong thủy, trừ tà, và những hiện tượng kinh dị bí ẩn thường xảy ra trong bối cảnh đời thường hoặc thành thị." },
      { name: "Võng du", description: "Bối cảnh chính diễn ra bên trong thế giới của một trò chơi trực tuyến (thường là thực tế ảo VR). Xoay quanh việc cày cấp, đánh boss, lập bang hội, và các mối quan hệ ảo mang lại ảnh hưởng thực." },
      { name: "Đồng nhân", description: "Fanfiction. Dựa trên bối cảnh, hệ thống nhân vật của các tác phẩm có sẵn (truyện, phim, game, anime nổi tiếng) để sáng tạo ra một câu chuyện mới theo ý tác giả." },
      { name: "Trinh thám", description: "Tập trung vào quá trình điều tra, phá án, suy luận logic để tìm ra hung thủ hoặc giải mã những bí ẩn phức tạp. Đòi hỏi cốt truyện chặt chẽ, nhiều nút thắt và bất ngờ." },
      { name: "Ngôn tình", description: "Tập trung chủ yếu vào tình cảm lãng mạn giữa nam và nữ. Trải qua nhiều cung bậc cảm xúc, từ ngọt ngào, sủng ái đến hiểu lầm, ngược tâm/ngược thân trước khi đến được với nhau." },
      { name: "Đam mỹ", description: "Tập trung vào tình cảm lãng mạn, sự gắn kết sâu sắc giữa hai nhân vật nam (Boy's Love). Có thể kết hợp với nhiều bối cảnh khác nhau như cổ đại, hiện đại, mạt thế." },
      { name: "Bách hợp", description: "Tập trung vào tình cảm lãng mạn, sự gắn kết sâu sắc giữa hai nhân vật nữ (Girl's Love). Có thể kết hợp với nhiều bối cảnh khác nhau như cổ đại, hiện đại, mạt thế." },
      { name: "Quân sự", description: "Đi sâu vào đời sống quân đội, huấn luyện, chiến thuật, vũ khí và các chiến dịch quân sự. Nhân vật chính thường là quân nhân, sĩ quan hoặc lính đánh thuê." },
      { name: "Hành động", description: "Nhịp độ truyện nhanh, dồn dập với nhiều cảnh chiến đấu, rượt đuổi, cháy nổ kịch tính. Nhân vật thường xuyên phải đối mặt với các tình huống nguy hiểm đến tính mạng." },
      { name: "Phiêu lưu", description: "Hành trình khám phá những vùng đất mới lạ, di tích cổ đại, hoặc những thế giới chưa được biết đến. Đầy rẫy thử thách, cạm bẫy và những cuộc gặp gỡ kỳ thú." },
      { name: "Hài hước", description: "Mục đích chính là gây cười, giải trí. Sử dụng các tình huống trớ trêu, đối thoại hóm hỉnh, nhân vật tấu hài, hoặc phá vỡ bức tường thứ tư để tạo tiếng cười." },
      { name: "Tragedy", description: "Bi kịch. Câu chuyện mang âm hưởng buồn bã, u ám, thường kết thúc bằng sự mất mát lớn lao, cái chết của nhân vật quan trọng, hoặc những nỗi đau không thể hàn gắn." }
    ]
  },
  {
    title: "Tu Tiên & Tiên Hiệp",
    genres: [
      { name: "Song Tu", description: "Phương pháp tu luyện đặc thù dựa trên sự giao hòa âm dương giữa hai người. Giúp cả hai cùng thăng tiến tu vi, đột phá cảnh giới nhanh chóng thông qua quan hệ thể xác hoặc trao đổi linh lực." },
      { name: "Lô Đỉnh", description: "Một hình thức tu luyện tà đạo hoặc tàn nhẫn, trong đó một người bị coi là 'lô đỉnh' (công cụ) để người kia cướp đoạt linh khí, nguyên âm/nguyên dương, thường dẫn đến tổn thương hoặc cái chết cho người làm lô đỉnh." },
      { name: "Phàm Nhân Lưu", description: "Nhân vật chính xuất thân là người phàm bình thường, tư chất kém cỏi. Dựa vào sự nỗ lực phi thường, tâm trí kiên định, và một chút cơ duyên (thường là một bảo vật bí mật) để từng bước vươn lên đỉnh cao." },
      { name: "Vô Địch Lưu", description: "Nhân vật chính sở hữu sức mạnh vô địch, áp đảo mọi đối thủ ngay từ đầu truyện hoặc từ rất sớm. Cốt truyện thường tập trung vào việc nhân vật chính giải quyết các rắc rối một cách dễ dàng và 'vả mặt' những kẻ kiêu ngạo." },
      { name: "Hệ Thống Tu Tiên", description: "Nhân vật chính sở hữu một 'Hệ thống' (như trong game) hỗ trợ tu luyện. Hệ thống giao nhiệm vụ, chấm điểm, và thưởng các vật phẩm, công pháp, hoặc điểm kinh nghiệm giúp nhân vật thăng cấp nhanh chóng." },
      { name: "Luyện Đan", description: "Tập trung sâu vào thuật luyện dược. Nhân vật chính thường là một luyện đan sư tài ba, thu thập linh thảo quý hiếm, điều khiển dị hỏa để luyện chế ra những viên đan dược nghịch thiên, thu hút sự chú ý của các thế lực." },
      { name: "Trận Pháp", description: "Nhân vật chính chuyên tu trận pháp. Sử dụng các trận kỳ, linh thạch để bố trí các trận pháp phức tạp dùng để tấn công, phòng thủ, phong ấn, hoặc huyễn hoặc kẻ thù, có thể lấy yếu thắng mạnh." },
      { name: "Tông Môn Xây Dựng", description: "Nhân vật chính đóng vai trò chưởng môn hoặc người dẫn dắt, bắt đầu từ một tông môn nhỏ bé hoặc tàn tạ. Quá trình truyện là việc thu nhận đệ tử, tranh đoạt tài nguyên, phát triển thế lực để trở thành đệ nhất tông môn." },
      { name: "Cổ Tiên", description: "Tu tiên theo phong cách cổ đại, thần thoại hồng hoang. Thường liên quan đến các vị thần cổ đại, vu tộc, yêu tộc, và các pháp bảo mang sức mạnh nguyên thủy của thiên địa." },
      { name: "Kiếm Tu", description: "Những tu sĩ chọn con đường cực đoan: chỉ dùng kiếm. Lấy kiếm làm đạo, rèn luyện kiếm tâm, kiếm ý. Tín ngưỡng 'nhất kiếm phá vạn pháp', sức tấn công cực kỳ sắc bén và mạnh mẽ." },
      { name: "Ma Tu", description: "Tu luyện theo con đường tà đạo, ma đạo. Bất chấp thủ đoạn, sử dụng các phương pháp tàn nhẫn (hấp thu máu huyết, linh hồn) để đổi lấy sức mạnh to lớn và nhanh chóng. Thường bị chính đạo truy sát." }
    ]
  },
  {
    title: "Võ Hiệp & Võ Thuật",
    genres: [
      { name: "Giang Hồ", description: "Tập trung vào thế giới ngầm của giới võ lâm. Nơi luật pháp triều đình không chạm tới, mọi thứ giải quyết bằng võ công, ân oán, tình nghĩa huynh đệ và những âm mưu tranh đoạt bí kíp, minh chủ." },
      { name: "Hiệp Khách", description: "Hình tượng nhân vật chính là những người hành hiệp trượng nghĩa, tự do tự tại, thấy chuyện bất bình chẳng tha. Họ bảo vệ kẻ yếu, chống lại cường hào ác bá và các thế lực hắc ám." },
      { name: "Thực Chiến", description: "Miêu tả các trận đánh một cách cực kỳ chi tiết, chân thực, dựa trên các nguyên lý vật lý và võ thuật thực tế. Không có các chiêu thức bay lượn, chưởng lực màu mè, mà tập trung vào đòn thế, điểm yếu và chiến thuật." },
      { name: "Cổ Võ", description: "Võ thuật cổ truyền, tập trung vào việc tu luyện nội công, đả thông kinh mạch, huyệt đạo. Sức mạnh đến từ khí công và sự rèn luyện thân thể đến mức cực hạn, có thể phá vỡ giới hạn người thường." },
      { name: "Đấu Đài", description: "Cốt truyện xoay quanh các giải đấu võ thuật, đấu trường sinh tử. Nhân vật chính không ngừng rèn luyện, đối đầu với các đối thủ ngày càng mạnh trên võ đài để giành lấy vinh quang hoặc tiền bạc." },
      { name: "Võ Thuật Hiện Đại", description: "Bối cảnh thời hiện đại, kết hợp các môn võ như MMA, Boxing, Muay Thái, Jiu-Jitsu. Thường liên quan đến các câu lạc bộ võ thuật, thế giới ngầm đô thị, hoặc các giải đấu chuyên nghiệp." }
    ]
  },
  {
    title: "Kinh Dị & Linh Dị",
    genres: [
      { name: "Ma Quái", description: "Truyện xoay quanh sự xuất hiện của các thực thể siêu nhiên như hồn ma, ác quỷ, oán linh. Chúng thường mang theo lòng thù hận, ám ảnh người sống và gây ra những hiện tượng đáng sợ." },
      { name: "Tâm Linh", description: "Tập trung vào các yếu tố huyền bí như ngoại cảm, bói toán, gọi hồn, nguyền rủa, phong thủy. Nhân vật thường phải đối mặt với những thế lực vô hình và tìm cách hóa giải các nghiệp chướng." },
      { name: "Cthulhu", description: "Kinh dị vũ trụ (Cosmic Horror) lấy cảm hứng từ H.P. Lovecraft. Nỗi sợ hãi đến từ sự nhỏ bé của con người trước các thực thể cổ xưa, vĩ đại và phi lý trí. Sự hiểu biết về chúng thường dẫn đến sự điên loạn." },
      { name: "Giải Đố Kinh Dị", description: "Nhân vật bị mắc kẹt trong một không gian kín (ngôi nhà hoang, bệnh viện, trò chơi sinh tử) và phải giải các câu đố, tìm kiếm manh mối để sống sót và thoát ra ngoài, trong khi bị các thế lực quái dị truy đuổi." },
      { name: "Trinh Thám Linh Dị", description: "Kết hợp giữa điều tra phá án logic và yếu tố siêu nhiên. Thám tử hoặc cảnh sát phải giải quyết các vụ án mạng mà hung thủ có thể không phải là con người, hoặc sử dụng các phương pháp tâm linh để tìm manh mối." }
    ]
  },
  {
    title: "Lịch Sử & Chiến Tranh",
    genres: [
      { name: "Cung Đình", description: "Bối cảnh triều đình phong kiến. Xoay quanh những âm mưu chính trị, tranh quyền đoạt vị giữa các hoàng tử, đại thần, sự tàn khốc của quyền lực và những quyết định ảnh hưởng đến vận mệnh quốc gia." },
      { name: "Cung Đấu", description: "Tập trung vào cuộc chiến ngầm chốn hậu cung. Những âm mưu, thủ đoạn tàn độc giữa các phi tần, hoàng hậu để tranh giành sự sủng ái của hoàng đế, bảo vệ quyền lợi gia tộc và sinh tồn." },
      { name: "Hậu Cung", description: "Nhân vật chính (thường là nam) có mối quan hệ tình cảm và kết hôn với nhiều phụ nữ khác nhau. Tập trung vào việc xây dựng và quản lý các mối quan hệ trong gia đình lớn này." },
      { name: "Quân Sự", description: "Đi sâu vào nghệ thuật chiến tranh. Miêu tả chi tiết về chiến thuật điều binh, trận đồ, hậu cần, sự phát triển của vũ khí, và tâm lý của những người lính trên chiến trường." },
      { name: "Quan Trường", description: "Cuộc sống của các quan lại thời xưa. Xoay quanh việc thi cử, thăng quan tiến chức, đối phó với tham nhũng, đấu đá phe phái, và nỗ lực thực hiện lý tưởng trị quốc bình thiên hạ." },
      { name: "Khói Lửa Sa Trường", description: "Miêu tả trực diện, trần trụi và bi tráng về chiến trận. Máu chảy đầu rơi, sự hy sinh của binh lính, cảnh hoang tàn của chiến tranh và những trận đánh giáp lá cà khốc liệt." },
      { name: "Xuyên Không Lịch Sử", description: "Nhân vật từ thời hiện đại xuyên không về một thời kỳ lịch sử có thật. Sử dụng kiến thức, công nghệ hiện đại để thay đổi các sự kiện lịch sử, xây dựng thế lực hoặc giúp đỡ một phe phái chiến thắng." }
    ]
  },
  {
    title: "Tiểu Thuyết Mạng (Webnovel)",
    genres: [
      { name: "Sảng Văn", description: "Thể loại đề cao sự thỏa mãn tối đa cho người đọc. Nhân vật chính liên tục gặp may mắn, thăng tiến sức mạnh chóng mặt, thu thập mỹ nữ/mỹ nam, và dễ dàng đè bẹp mọi kẻ thù cản đường." },
      { name: "Vả Mặt", description: "Tình tiết cốt lõi là nhân vật chính bị những kẻ kiêu ngạo, có gia thế khinh bỉ, chèn ép. Sau đó, nhân vật chính bộc lộ sức mạnh hoặc thân phận thật sự, lật ngược tình thế và làm nhục lại những kẻ đó một cách sảng khoái." },
      { name: "Vô Hạn Lưu", description: "Nhân vật chính bị đưa vào một không gian bí ẩn (Chủ Thần không gian) và buộc phải xuyên qua vô số các thế giới khác nhau (thường là phim ảnh, game, tiểu thuyết) để thực hiện các nhiệm vụ sinh tử, đổi lấy điểm thưởng và nâng cấp." },
      { name: "Khoái Xuyên", description: "Xuyên nhanh. Nhân vật chính liên tục xuyên qua nhiều thế giới khác nhau, nhập vào các nhân vật phụ hoặc pháo hôi để hoàn thành nhiệm vụ (như trả thù, công lược mục tiêu, thay đổi cốt truyện) trong thời gian ngắn." },
      { name: "Hồi Quy", description: "Nhân vật chính sau khi trải qua một cuộc đời thất bại hoặc chết thảm, bất ngờ được quay ngược thời gian trở về quá khứ. Họ sử dụng ký ức và kiến thức tương lai để sửa chữa sai lầm, đoạt lấy cơ duyên và trả thù." }
    ]
  },
  {
    title: "Bối cảnh & Thế giới",
    genres: [
      { name: "Cổ đại", description: "Bối cảnh xã hội phong kiến, thời kỳ chưa có công nghệ hiện đại. Văn hóa, trang phục, ngôn ngữ mang đậm nét truyền thống, thường có vua chúa, quan lại, giang hồ." },
      { name: "Hiện đại", description: "Bối cảnh xã hội ngày nay, với công nghệ, văn hóa và lối sống quen thuộc. Có thể là môi trường học đường, công sở, hoặc thế giới ngầm đô thị." },
      { name: "Tương lai", description: "Bối cảnh thời gian trong tương lai, nơi khoa học kỹ thuật đã phát triển vượt bậc. Có thể bao gồm trí tuệ nhân tạo, du hành vũ trụ, hoặc các hình thái xã hội mới." },
      { name: "Dị giới", description: "Một thế giới hoàn toàn khác biệt với Trái Đất, thường có các quy tắc vật lý riêng, tồn tại ma pháp, đấu khí, các chủng tộc đa dạng (Elf, Orc, Rồng) và quái vật." },
      { name: "Mạt thế", description: "Thế giới hậu tận thế, sau một thảm họa toàn cầu (virus zombie, thiên tai, chiến tranh hạt nhân). Xã hội sụp đổ, con người phải đấu tranh sinh tồn khắc nghiệt với môi trường và đồng loại." },
      { name: "Phương Tây", description: "Bối cảnh mang đậm phong cách văn hóa, thần thoại, kiến trúc và lịch sử của các nước phương Tây (Châu Âu thời Trung Cổ, thần thoại Hy Lạp, Bắc Âu)." },
      { name: "Phương Đông", description: "Bối cảnh mang đậm phong cách văn hóa, thần thoại, kiến trúc và lịch sử của các nước phương Đông (Trung Quốc, Nhật Bản cổ đại)." },
      { name: "Cyberpunk", description: "Tương lai đen tối (Dystopia) với sự tương phản giữa công nghệ cực kỳ tiên tiến (High tech) và chất lượng cuộc sống thấp kém, xã hội suy tàn, bị kiểm soát bởi các siêu tập đoàn (Low life)." },
      { name: "Steampunk", description: "Một nhánh của khoa học viễn tưởng, lấy bối cảnh giả tưởng dựa trên thời kỳ Cách mạng Công nghiệp (thường là thời Victoria), nơi động cơ hơi nước và máy móc cơ khí là công nghệ chủ đạo." },
      { name: "Dungeon", description: "Thế giới tồn tại các hầm ngục, mê cung khổng lồ chứa đầy quái vật, cạm bẫy và kho báu. Các mạo hiểm giả tiến vào để khám phá, chiến đấu và thu thập tài nguyên." },
      { name: "Leo tháp", description: "Tồn tại một tòa tháp bí ẩn với vô số tầng. Mỗi tầng là một thế giới hoặc một thử thách khác nhau. Người leo tháp phải vượt qua các tầng để nhận được sức mạnh, phần thưởng hoặc đạt được điều ước." },
      { name: "Thợ săn", description: "Bối cảnh hiện đại nhưng đột nhiên xuất hiện các hầm ngục (Cổng/Gate) và quái vật. Một bộ phận con người thức tỉnh sức mạnh siêu nhiên trở thành 'Thợ săn' (Hunter) để chiến đấu bảo vệ nhân loại." },
      { name: "Space Opera", description: "Sử thi vũ trụ. Bối cảnh quy mô thiên hà, xoay quanh các cuộc chiến tranh giữa các đế chế không gian, du hành giữa các vì sao, những âm mưu chính trị tầm cỡ vũ trụ và những cuộc phiêu lưu vĩ đại." }
    ]
  },
  {
    title: "Xuyên không & Chuyển sinh",
    genres: [
      { name: "Xuyên không", description: "Nhân vật chính từ thế giới hiện tại bất ngờ bị đưa đến một không gian hoặc thời gian khác (thường là quá khứ hoặc dị giới), mang theo tư duy và kiến thức của thế giới cũ." },
      { name: "Xuyên sách", description: "Nhân vật chính vô tình xuyên vào thế giới của một cuốn tiểu thuyết mà họ đã đọc. Thường trở thành nhân vật phụ, phản diện hoặc pháo hôi, và phải tìm cách thay đổi số phận bi thảm đã được định sẵn." },
      { name: "Xuyên phim", description: "Tương tự xuyên sách, nhưng nhân vật chính xuyên vào thế giới của một bộ phim điện ảnh hoặc truyền hình, tương tác với các nhân vật và cốt truyện quen thuộc." },
      { name: "Xuyên tiểu thuyết", description: "Tên gọi khác của Xuyên sách, nhân vật chính nhận thức được mình đang ở trong một tác phẩm hư cấu và cố gắng tận dụng sự hiểu biết về cốt truyện để sinh tồn và phát triển." },
      { name: "Xuyên game", description: "Nhân vật chính bị hút vào thế giới của một trò chơi điện tử. Họ phải sống sót bằng cách tuân theo các quy tắc của game, cày cấp, làm nhiệm vụ, và đối mặt với nguy cơ cái chết thực sự." },
      { name: "Chuyển sinh", description: "Isekai. Nhân vật chính chết ở thế giới gốc (thường do tai nạn) và được tái sinh (đầu thai hoặc nhập hồn) vào một cơ thể mới ở một thế giới ma thuật, dị giới, bắt đầu một cuộc đời hoàn toàn mới." },
      { name: "Trọng sinh", description: "Nhân vật chính sau khi chết được sống lại, quay trở về một thời điểm trong quá khứ của chính cuộc đời mình. Họ dùng kinh nghiệm kiếp trước để sửa sai, báo thù và vươn tới đỉnh cao." },
      { name: "Tái sinh", description: "Khái niệm chung cho việc sống lại sau khi chết. Có thể là tái sinh vào cơ thể cũ được phục hồi, hoặc một cơ thể hoàn toàn mới trong cùng một thế giới." },
      { name: "Đầu thai", description: "Quá trình luân hồi chuyển kiếp. Nhân vật chết đi, uống canh Mạnh Bà (hoặc không) và sinh ra thành một đứa trẻ sơ sinh ở kiếp sau, có thể giữ lại hoặc mất đi ký chi tiết kiếp trước." },
      { name: "Triệu hồi", description: "Nhân vật chính bị một thế lực, vương quốc, hoặc pháp sư ở thế giới khác dùng ma pháp trận triệu hồi đến để làm Dũng sĩ cứu thế, hoặc làm công cụ chiến đấu." },
      { name: "Dịch chuyển", description: "Sự di chuyển tức thời từ địa điểm này sang địa điểm khác, hoặc từ thế giới này sang thế giới khác do một tai nạn không gian, trận pháp, hoặc dị thường ma thuật." },
      { name: "Khoái xuyên", description: "Hệ thống đưa nhân vật chính xuyên qua vô số thế giới song song một cách nhanh chóng. Ở mỗi thế giới, họ nhập vào một thân phận khác nhau để hoàn thành các nhiệm vụ cụ thể rồi rời đi." },
      { name: "Vô hạn lưu", description: "Bị cuốn vào một vòng lặp các phó bản sinh tử (thường lấy bối cảnh từ phim kinh dị, game). Phải hoàn thành nhiệm vụ để sống sót, nhận điểm thưởng nâng cấp, và chuẩn bị cho phó bản tiếp theo." },
      { name: "Hồi quy", description: "Tương tự Trọng sinh, nhưng thường mang ý nghĩa quay ngược thời gian của cả một thế giới hoặc dòng thời gian, nhân vật chính giữ lại ký ức để thay đổi tương lai tăm tối." }
    ]
  },
  {
    title: "Trope & Hệ thống",
    genres: [
      { name: "Hệ thống", description: "Nhân vật chính được gắn kết với một thực thể siêu nhiên gọi là 'Hệ thống'. Hệ thống cung cấp giao diện như game, giao nhiệm vụ, trừng phạt nếu thất bại, và ban thưởng các vật phẩm, kỹ năng vô giá." },
      { name: "Vô địch lưu", description: "Nhân vật chính sở hữu sức mạnh tuyệt đối, không có đối thủ xứng tầm ngay từ đầu. Truyện mang tính giải trí cao, tập trung vào cách nhân vật chính hành xử và giải quyết các rắc rối một cách nhẹ nhàng." },
      { name: "Phế vật lưu", description: "Khởi đầu truyện, nhân vật chính bị coi là rác rưởi, phế vật, không có khả năng tu luyện, bị gia tộc hắt hủi, vị hôn thê từ hôn. Sau đó nhận được cơ duyên nghịch thiên và bắt đầu hành trình vươn lên, vả mặt những kẻ đã khinh thường mình." },
      { name: "Điểm danh lưu", description: "Nhân vật chính có hệ thống yêu cầu đến các địa điểm cụ thể (thường là nơi nguy hiểm hoặc linh thiêng) để 'điểm danh' (check-in). Phần thưởng là những bảo vật, công pháp hoặc tu vi cực kỳ mạnh mẽ." },
      { name: "Sảng văn", description: "Truyện được thiết kế để mang lại cảm giác sảng khoái, thỏa mãn liên tục cho người đọc. Tốc độ thăng cấp nhanh, ít trắc trở, nhân vật chính luôn áp đảo và chiến thắng mọi kẻ thù một cách ngoạn mục." },
      { name: "Ngược tra", description: "Tập trung vào hành trình trả thù. Nhân vật chính (thường là trọng sinh hoặc xuyên không) lên kế hoạch tỉ mỉ để hành hạ, lật đổ và trừng phạt những kẻ cặn bã (tra nam, tra nữ) đã hãm hại mình kiếp trước." },
      { name: "Vả mặt", description: "Tình huống lặp đi lặp lại: Kẻ thù kiêu ngạo, khinh thường nhân vật chính -> Nhân vật chính bộc lộ thực lực thật sự -> Kẻ thù bàng hoàng, sợ hãi và bị đánh bại nhục nhã. Tạo cảm giác thỏa mãn mạnh mẽ." },
      { name: "Xây dựng thế lực", description: "Nhân vật chính không chỉ tu luyện cá nhân mà còn tập trung thu phục thuộc hạ, xây dựng quân đội, thành lập tông môn, quốc gia hoặc tập đoàn kinh tế, bành trướng thế lực ra toàn thế giới." },
      { name: "Sect Building", description: "Cụ thể hóa của Xây dựng thế lực trong bối cảnh tu tiên. Nhân vật chính là chưởng môn, lo liệu từ việc thu nhận đệ tử, tìm kiếm tài nguyên, xây dựng kiến trúc tông môn, đến việc đối ngoại và chiến tranh tông môn." },
      { name: "Làm giàu", description: "Tập trung vào thương trường, kinh doanh. Nhân vật chính sử dụng trí tuệ, kiến thức tương lai hoặc hệ thống để khởi nghiệp, kiếm tiền, đánh bại các đối thủ cạnh tranh và trở thành tỷ phú, tài phiệt." }
    ]
  },
  {
    title: "Nhân vật & Tính cách",
    genres: [
      { name: "Nữ cường", description: "Nhân vật nữ chính có tính cách độc lập, mạnh mẽ, quyết đoán, trí tuệ sắc bén và sức mạnh vượt trội. Không dựa dẫm vào nam giới, tự mình giải quyết mọi vấn đề và đứng trên đỉnh cao." },
      { name: "Nam cường", description: "Nhân vật nam chính vô cùng mạnh mẽ, bá đạo, lạnh lùng với người ngoài nhưng có thể rất thâm tình với người yêu. Sở hữu quyền lực, tài năng và sức mạnh áp đảo mọi đối thủ." },
      { name: "Ác nữ", description: "Nữ chính xuyên vào vai phản diện (ác nữ) trong một câu chuyện. Thay vì đi theo vết xe đổ bị nam chính/nữ chính nguyên tác tiêu diệt, cô sử dụng trí thông minh để thay đổi số phận, đôi khi trở thành người tốt hoặc một ác nữ thực sự quyến rũ." },
      { name: "Yandere", description: "Nhân vật có tình yêu cuồng nhiệt, ám ảnh và chiếm hữu đến mức cực đoan, bệnh hoạn. Sẵn sàng làm mọi thứ, kể cả bạo lực, giam cầm hoặc giết người để giữ người mình yêu bên cạnh." },
      { name: "Tsundere", description: "Tính cách 'ngoài lạnh trong nóng'. Bề ngoài tỏ ra kiêu ngạo, lạnh lùng, hay cáu gắt và phủ nhận tình cảm của mình, nhưng thực chất bên trong lại rất quan tâm, xấu hổ và dễ mềm lòng." },
      { name: "Kuudere", description: "Nhân vật luôn giữ vẻ mặt vô cảm, lạnh lùng, điềm tĩnh trong mọi tình huống. Rất ít khi bộc lộ cảm xúc, nhưng khi đã mở lòng thì vô cùng chân thành và sâu sắc." },
      { name: "Dandere", description: "Nhân vật cực kỳ nhút nhát, rụt rè, ít nói và ngại giao tiếp xã hội. Tuy nhiên, khi ở cạnh người họ tin tưởng hoặc yêu thương, họ sẽ trở nên cởi mở, đáng yêu và nói nhiều hơn." },
      { name: "Bệnh kiều", description: "Tương tự Yandere nhưng thiên về yếu tố tâm lý bất ổn, ốm yếu hoặc có những suy nghĩ lệch lạc, cực đoan trong tình yêu. Tình yêu của họ mang tính chất hủy diệt cả bản thân và đối phương." },
      { name: "Tomboy", description: "Nhân vật nữ có phong cách ăn mặc, hành xử, sở thích và cá tính mạnh mẽ giống như nam giới. Thường rất năng động, giỏi thể thao hoặc chiến đấu." },
      { name: "Ojou-sama", description: "Hình mẫu tiểu thư đài các, xuất thân từ gia đình quý tộc, giàu có. Thường có phong thái kiêu kỳ, thanh lịch, đôi khi hơi ngây thơ về cuộc sống đời thường, đi kèm với điệu cười đặc trưng." },
      { name: "Ma vương", description: "Nhân vật chính đảm nhận vai trò Ma vương - người đứng đầu phe hắc ám, quái vật. Cốt truyện thường xoay quanh việc quản lý ma giới, chống lại dũng sĩ, hoặc một Ma vương muốn sống cuộc đời bình yên." },
      { name: "Dũng sĩ", description: "Nhân vật chính mang sứ mệnh của một anh hùng (Hero), được thần linh hoặc vương quốc lựa chọn để tiêu diệt Ma vương, cứu rỗi thế giới. Thường mang tính cách chính nghĩa, dũng cảm." }
    ]
  },
  {
    title: "Manga / Anime / Media",
    genres: [
      { name: "Manhua", description: "Truyện tranh xuất xứ từ Trung Quốc. Thường có màu, nét vẽ đặc trưng, nội dung phổ biến là tu tiên, võ hiệp, tổng tài, hệ thống." },
      { name: "Manhwa", description: "Truyện tranh xuất xứ từ Hàn Quốc (thường là Webtoon đọc cuộn dọc). Nổi bật với nét vẽ đẹp, màu sắc bắt mắt, nội dung đa dạng từ lãng mạn, thợ săn, hầm ngục đến bạo lực học đường." },
      { name: "Manga", description: "Truyện tranh xuất xứ từ Nhật Bản. Thường là đen trắng, nét vẽ đa dạng, phân chia rõ ràng theo đối tượng độc giả (Shounen, Shoujo, Seinen...) với chiều sâu nội dung và phát triển nhân vật tốt." },
      { name: "Anime", description: "Phim hoạt hình sản xuất tại Nhật Bản hoặc mang phong cách Nhật Bản. Chuyển thể từ Manga, Light Novel hoặc kịch bản gốc, với đặc trưng về hình ảnh, âm nhạc và diễn xuất lồng tiếng (Seiyuu)." },
      { name: "Isekai", description: "Thể loại cực kỳ phổ biến trong Anime/Manga, nơi nhân vật chính bị chuyển sinh hoặc triệu hồi đến một thế giới khác (thường là thế giới ma thuật kỳ ảo) và bắt đầu cuộc sống mới." },
      { name: "Slice of Life", description: "Lát cắt cuộc sống. Tập trung miêu tả những sự kiện thường nhật, bình dị, nhẹ nhàng của các nhân vật. Không có cao trào kịch tính, mang lại cảm giác thư giãn, chữa lành (Healing)." },
      { name: "Seinen", description: "Thể loại hướng tới nam giới trưởng thành (18-30 tuổi). Nội dung thường phức tạp, sâu sắc, đề cập đến các vấn đề xã hội, tâm lý, chính trị, và có thể chứa yếu tố bạo lực hoặc tình dục." },
      { name: "Josei", description: "Thể loại hướng tới nữ giới trưởng thành. Khác với Shoujo mơ mộng, Josei miêu tả tình yêu và cuộc sống một cách thực tế, trưởng thành hơn, thường xoay quanh phụ nữ đi làm, hôn nhân, gia đình." },
      { name: "Shounen", description: "Thể loại hướng tới thiếu niên nam. Tập trung vào các chủ đề hành động, phiêu lưu, tình bạn, sự nỗ lực vươn lên và chiến thắng cái ác. Thường có các trận chiến hoành tráng và hệ thống sức mạnh rõ ràng." },
      { name: "Shoujo", description: "Thể loại hướng tới thiếu nữ. Tập trung vào tình cảm lãng mạn, sự phát triển tâm lý nhân vật, những rung động đầu đời. Nét vẽ thường lung linh, nhiều hoa lá và chú trọng vào đôi mắt." },
      { name: "Mecha", description: "Thể loại khoa học viễn tưởng xoay quanh các robot khổng lồ (Mecha) do con người điều khiển. Thường kết hợp với các chủ đề chiến tranh vũ trụ, triết lý nhân sinh và sự tiến hóa của nhân loại." },
      { name: "Game Otome", description: "Dựa trên thể loại game hẹn hò dành cho nữ giới. Nữ chính thường được bao quanh bởi nhiều nhân vật nam đẹp trai, tài giỏi (dàn Harem ngược) và có thể lựa chọn tuyến tình cảm với từng người." }
    ]
  },
  {
    title: "Tình cảm & Quan hệ",
    genres: [
      { name: "Sủng", description: "Tình cảm ngọt ngào, ấm áp. Cặp đôi chính yêu thương, chiều chuộng nhau hết mực, tin tưởng tuyệt đối. Cốt truyện nhẹ nhàng, không có hiểu lầm đáng tiếc hay người thứ ba phá hoại thành công." },
      { name: "Ngược", description: "Tình cảm đầy trắc trở, đau khổ. Nhân vật bị hành hạ về thể xác (ngược thân) hoặc tinh thần (ngược tâm) qua những hiểu lầm, phản bội, thù hận gia tộc trước khi (có thể) đến được với nhau." },
      { name: "Thanh mai trúc mã", description: "Hai nhân vật chính là bạn bè lớn lên cùng nhau từ thuở nhỏ. Tình cảm phát triển từ tình bạn thân thiết, thấu hiểu lẫn nhau chuyển dần sang tình yêu sâu đậm." },
      { name: "Sư đồ luyến", description: "Mối tình lãng mạn nhưng thường gặp nhiều cấm đoán giữa sư phụ (thầy/cô) và đồ đệ (học trò). Thường xuất hiện trong bối cảnh tu tiên, cổ đại, đối mặt với định kiến xã hội." },
      { name: "Hợp đồng hôn nhân", description: "Hai người kết hôn vì lợi ích gia tộc, kinh tế hoặc một thỏa thuận nào đó (cưới trước yêu sau). Sống chung dưới một mái nhà, trải qua nhiều chuyện rồi dần nảy sinh tình cảm thật sự." },
      { name: "Thanh xuân vườn trường", description: "Bối cảnh trường học. Câu chuyện về tuổi trẻ, những rung động tình đầu trong sáng, tình bạn, áp lực thi cử và những kỷ niệm khó quên thời học sinh, sinh viên." },
      { name: "Trường Lớp", description: "Tập trung vào các mối quan hệ xã hội, mâu thuẫn, bạo lực học đường, hoặc các hoạt động câu lạc bộ trong môi trường giáo dục, không chỉ giới hạn ở tình cảm lãng mạn." },
      { name: "Công Sở", description: "Bối cảnh môi trường làm việc chuyên nghiệp. Xoay quanh tình yêu chốn văn phòng (thường là sếp - nhân viên), sự cạnh tranh, đấu đá thăng tiến và áp lực công việc." },
      { name: "Đời Thường", description: "Những câu chuyện giản dị, gần gũi về cuộc sống gia đình, hàng xóm láng giềng. Không có yếu tố siêu nhiên hay kịch tính thái quá, mang lại cảm giác chân thực và ấm áp." },
      { name: "Hào môn thế gia", description: "Bối cảnh giới thượng lưu, các gia tộc giàu có, quyền lực bậc nhất. Xoay quanh cuộc sống xa hoa, những cuộc hôn nhân thương mại, tranh giành quyền thừa kế và những bí mật gia tộc." },
      { name: "Hắc bang", description: "Bối cảnh thế giới ngầm, mafia, xã hội đen. Tình yêu thường gắn liền với sự nguy hiểm, bạo lực, lòng trung thành và những cuộc thanh trừng đẫm máu giữa các băng đảng." },
      { name: "Điền văn", description: "Thể loại truyện chậm rãi, bình dị. Nhân vật chính thường xuyên không về nông thôn hoặc thời cổ đại, tập trung vào việc làm nông, chăn nuôi, nấu ăn, xây dựng gia đình êm ấm, tránh xa thị phi." }
    ]
  },
  {
    title: "Nội dung 18+ (NSFW)",
    genres: [
      { name: "Sắc hiệp", description: "Sự kết hợp giữa Võ hiệp/Tiên hiệp và yếu tố Sắc (18+). Nhân vật chính trên con đường tu luyện, hành tẩu giang hồ sẽ có những cuộc gặp gỡ và quan hệ tình ái chi tiết với nhiều mỹ nữ." },
      { name: "Sắc", description: "Truyện có chứa các cảnh quan hệ tình dục được miêu tả chi tiết, rõ ràng (18+). Yếu tố sắc dục đóng vai trò quan trọng trong việc phát triển mối quan hệ nhân vật hoặc cốt truyện." },
      { name: "Nặng đô", description: "Nội dung 18+ mang tính chất cực đoan, bạo lực, hoặc vi phạm các chuẩn mực đạo đức thông thường (Guro, Non-con, Snuff...). Rất kén người đọc và có thể gây khó chịu tâm lý." },
      { name: "Harem", description: "Một nhân vật nam chính có mối quan hệ tình cảm, lãng mạn (và thường là tình dục trong truyện 18+) với từ ba nhân vật nữ trở lên. Các nữ nhân vật thường chấp nhận chia sẻ nam chính." },
      { name: "Reverse Harem", description: "Harem ngược. Một nhân vật nữ chính có mối quan hệ tình cảm, lãng mạn với nhiều nhân vật nam. Thường xuất hiện trong các truyện dành cho nữ giới hoặc Otome game." },
      { name: "NTR", description: "Netorare. Thể loại gây ức chế mạnh, trong đó người yêu/vợ của nhân vật chính bị kẻ khác quyến rũ, lừa gạt hoặc cưỡng ép quan hệ, dẫn đến sự phản bội và đau khổ tột cùng cho nhân vật chính." },
      { name: "Netori", description: "Góc nhìn ngược lại của NTR. Nhân vật chính là kẻ chủ động đi quyến rũ, cướp đoạt người yêu hoặc vợ/chồng của người khác, mang lại cảm giác chinh phục hắc ám." },
      { name: "Netoro", description: "Một biến thể của NTR, trong đó người yêu/vợ bị kẻ khác chiếm đoạt, nhưng nhân vật chính lại đồng thuận, thỏa hiệp, hoặc thậm chí bị ép buộc phải quan sát quá trình đó một cách bất lực." },
      { name: "Cuckold", description: "Thể loại mà người chồng/người yêu (thường là người có địa vị thấp kém hơn) biết rõ và phải chứng kiến cảnh vợ/người yêu mình quan hệ tình dục với người đàn ông khác mạnh mẽ hơn." },
      { name: "Incest", description: "Loạn luân. Mối quan hệ tình cảm và tình dục giữa những người có quan hệ huyết thống gần gũi (anh em, cha con, mẹ con...). Là một chủ đề cấm kỵ và nhạy cảm." },
      { name: "BDSM", description: "Bao gồm Bondage (Trói buộc), Discipline (Kỷ luật), Dominance (Thống trị), Submission (Phục tùng), Sadism (Bạo dâm) và Masochism (Khổ dâm). Quan hệ tình dục dựa trên sự chênh lệch quyền lực và khoái cảm từ sự đau đớn/kiểm soát." },
      { name: "Yaoi", description: "Truyện tranh/tiểu thuyết tập trung vào mối quan hệ tình cảm và tình dục (18+) giữa nam và nam. Thường nhắm đến đối tượng độc giả nữ (Fujoshi)." },
      { name: "Yuri", description: "Truyện tranh/tiểu thuyết tập trung vào mối quan hệ tình cảm và tình dục (18+) giữa nữ và nữ." },
      { name: "Ecchi", description: "Chứa các yếu tố gợi cảm, hở hang, các tình huống nhạy cảm mang tính hài hước (lộ đồ lót, ngã vào vùng nhạy cảm) nhưng không miêu tả trực tiếp hành vi quan hệ tình dục." },
      { name: "Smut", description: "Thuật ngữ chỉ các tác phẩm (thường là fanfiction hoặc tiểu thuyết lãng mạn) mà nội dung chủ yếu, trọng tâm nhất là miêu tả các cảnh quan hệ tình dục một cách trần trụi." },
      { name: "Hentai", description: "Thuật ngữ chung chỉ các sản phẩm truyền thông (anime, manga, game) của Nhật Bản có chứa nội dung khiêu dâm, tình dục rõ ràng (18+)." },
      { name: "Loli", description: "Lolicon. Nhân vật nữ có ngoại hình, vóc dáng của những bé gái chưa dậy thì hoặc thiếu nữ nhỏ tuổi, thường xuất hiện trong các bối cảnh nhạy cảm (18+)." },
      { name: "Shota", description: "Shotacon. Nhân vật nam có ngoại hình, vóc dáng của những bé trai chưa dậy thì, thường xuất hiện trong các bối cảnh nhạy cảm (18+)." },
      { name: "Milf", description: "Mother I'd Like to F***. Nhân vật nữ là những người phụ nữ trưởng thành, đã có gia đình hoặc có con, mang vẻ đẹp mặn mà, quyến rũ và dạn dĩ trong chuyện chăn gối." },
      { name: "Gangbang", description: "Hành vi quan hệ tình dục tập thể, trong đó một người (thường là nữ) quan hệ liên tục hoặc cùng lúc với nhiều người khác." },
      { name: "Double Penetration", description: "Thâm nhập kép. Hành vi quan hệ tình dục trong đó hai lỗ (thường là âm đạo và hậu môn, hoặc miệng và âm đạo) của một người bị thâm nhập cùng một lúc." },
      { name: "Group Sex", description: "Quan hệ tình dục tập thể, nhóm nhiều người tham gia cùng nhau một cách tự do, hoán đổi bạn tình liên tục." },
      { name: "Rape", description: "Cưỡng hiếp. Hành vi ép buộc quan hệ tình dục khi không có sự đồng thuận của đối phương, sử dụng vũ lực, đe dọa hoặc lợi dụng tình trạng mất nhận thức. Nội dung cực kỳ nhạy cảm." },
      { name: "Ugly Bastard", description: "Nhân vật nam có ngoại hình cực kỳ xấu xí, béo phì, thô kệch, tính cách đê tiện, thường dùng thủ đoạn đê hèn để cưỡng đoạt, làm nhục các nhân vật nữ xinh đẹp." }
    ]
  },
  {
    title: "Hành động nhạy cảm (18+)",
    genres: [
      { name: "Thâm nhập hậu môn", description: "Anal Sex. Hành vi quan hệ tình dục thông qua đường hậu môn. Thường đòi hỏi sự chuẩn bị và miêu tả chi tiết về cảm giác đau đớn xen lẫn khoái cảm." },
      { name: "Quan hệ bằng miệng", description: "Oral Sex. Sử dụng miệng, lưỡi để kích thích cơ quan sinh dục của đối phương (Blowjob cho nam, Cunnilingus cho nữ)." },
      { name: "Đồ chơi tình dục", description: "Sử dụng các công cụ hỗ trợ (Sex Toys) như máy rung, dương vật giả, roi da, còng tay... để tăng cường khoái cảm hoặc phục vụ cho các sở thích đặc biệt (như BDSM)." },
      { name: "Xuất tinh trong", description: "Creampie. Hành vi nam giới xuất tinh trực tiếp vào sâu bên trong âm đạo hoặc hậu môn của bạn tình mà không sử dụng biện pháp bảo vệ." },
      { name: "Xuất tinh lên mặt", description: "Cumshot/Facial. Hành vi nam giới xuất tinh lên mặt, ngực hoặc các bộ phận cơ thể khác của bạn tình để thể hiện sự thống trị hoặc thỏa mãn thị giác." },
      { name: "Thâm nhập sâu", description: "Deepthroat. Hành vi quan hệ bằng miệng trong đó dương vật được đưa vào rất sâu trong cổ họng của bạn tình, thường gây ra phản xạ nôn ọe nhẹ, tạo cảm giác chinh phục." },
      { name: "Tự sướng", description: "Masturbation. Hành vi nhân vật tự kích thích cơ quan sinh dục của bản thân để đạt khoái cảm, thường đi kèm với những suy nghĩ, tưởng tượng về người mình khao khát." },
      { name: "Ahegao", description: "Biểu cảm gương mặt đặc trưng trong văn hóa Hentai khi nhân vật nữ đạt cực khoái tột độ đến mức mất kiểm soát: mắt trợn ngược, lè lưỡi, mặt đỏ bừng, chảy nước dãi." },
      { name: "Mang thai", description: "Pregnancy/Breeding. Yếu tố nhạy cảm xoay quanh việc thụ thai, quá trình mang thai (bụng to dần), sinh nở, và khoái cảm liên quan đến việc gieo giống." },
      { name: "Sản nhũ", description: "Lactation. Yếu tố nhạy cảm liên quan đến việc bầu ngực tiết ra sữa, hành vi vắt sữa hoặc bú sữa mẹ (có thể xảy ra ở phụ nữ đang mang thai, cho con bú hoặc do tác động ma thuật/thuốc)." }
    ]
  },
  {
    title: "Fetish & Ngách (18+)",
    genres: [
      { name: "Tentacle", description: "Xúc tu. Thể loại phổ biến trong Hentai dị giới, nơi các quái vật có xúc tu trơn trượt bắt giữ và quan hệ tình dục bạo liệt với các nhân vật nữ/nam." },
      { name: "Mind Control", description: "Điều khiển tâm trí. Sử dụng ma thuật, thuốc, hoặc thôi miên để tẩy não, tước đoạt ý chí tự do của nạn nhân, biến họ thành nô lệ tình dục ngoan ngoãn phục tùng mọi mệnh lệnh." },
      { name: "Corruption", description: "Sự tha hóa. Quá trình một nhân vật vốn trong sáng, thuần khiết, có đạo đức cao (như thánh nữ, nữ hiệp) dần dần bị sa ngã, tha hóa thành một kẻ dâm đãng, nghiện tình dục do bị ép buộc hoặc dụ dỗ." },
      { name: "Futanari", description: "Nhân vật nữ có ngoại hình nữ tính (ngực nở, eo thon) nhưng lại sở hữu cả cơ quan sinh dục nam (dương vật) và nữ, thường đóng vai trò chủ động (Top) trong quan hệ." },
      { name: "Monster Girl", description: "Nhân vật nữ là các á nhân hoặc quái vật mang đặc điểm của động vật/thần thoại (Lamia - người rắn, Harpy - người chim, Centaur - nhân mã, Slime) tham gia vào các cảnh quan hệ tình dục." },
      { name: "Exhibitionism", description: "Phô dâm. Sở thích tình dục đạt khoái cảm khi để lộ cơ thể khỏa thân hoặc thực hiện hành vi quan hệ tình dục ở những nơi công cộng, có nguy cơ bị người khác nhìn thấy." },
      { name: "Voyeurism", description: "Thị dâm. Sở thích tình dục đạt khoái cảm thông qua việc nhìn trộm người khác đang thay đồ, tắm rửa, hoặc quan hệ tình dục mà họ không hề hay biết." },
      { name: "Thôi miên", description: "Hypnosis. Sử dụng các kỹ thuật thôi miên (con lắc, ánh mắt, lời nói) để đưa nạn nhân vào trạng thái vô thức, từ đó ra lệnh và điều khiển hành vi tình dục của họ." },
      { name: "Chụp lén", description: "Blackmail/Voyeurism. Hành vi quay phim, chụp ảnh lén các khoảnh khắc nhạy cảm của nạn nhân, sau đó sử dụng những hình ảnh này để tống tiền hoặc ép buộc họ thực hiện các hành vi tình dục." },
      { name: "Huấn luyện thú", description: "Pet Play. Một hình thức BDSM trong đó một người đóng vai trò là chủ nhân, người kia đóng vai thú cưng (chó, mèo, lợn...). Nạn nhân bị đeo vòng cổ, xích, bò bằng bốn chân và bị đối xử như động vật." },
      { name: "Nhân thú", description: "Bestiality. Hành vi quan hệ tình dục giữa con người và động vật thực sự hoặc các loài quái vật mang hình dáng thú vật hoàn toàn. Là một thể loại cực kỳ ngách và gây tranh cãi." },
      { name: "Femdom", description: "Female Dominance. Thể loại BDSM trong đó người phụ nữ đóng vai trò thống trị tuyệt đối (Dom), ra lệnh, trừng phạt và kiểm soát hoàn toàn người đàn ông phục tùng (Sub)." },
      { name: "Maledom", description: "Male Dominance. Thể loại BDSM trong đó người đàn ông đóng vai trò thống trị tuyệt đối (Dom), kiểm soát, bạo hành hoặc huấn luyện người phụ nữ phục tùng (Sub)." },
      { name: "Foot Fetish", description: "Ái vật bàn chân. Sự hưng phấn tình dục tập trung vào bàn chân, ngón chân của đối tác. Thường bao gồm các hành vi như ngắm nhìn, xoa bóp, liếm mút hoặc dùng chân để kích thích cơ quan sinh dục (Footjob)." },
      { name: "Armpit Fetish", description: "Ái vật vùng nách. Sự hưng phấn tình dục tập trung vào vùng nách của đối tác, bao gồm việc ngửi mùi hương, liếm mút hoặc dùng nách để cọ xát kích thích (Paizuri nách)." },
      { name: "Stockings", description: "Niềm đam mê đặc biệt với các loại tất chân, vớ đùi, quần tất ren của phụ nữ. Thường kết hợp với việc xé rách tất trong lúc quan hệ để tăng thêm sự kích thích." },
      { name: "Glasses", description: "Megane Fetish. Sự thu hút tình dục đặc biệt đối với những nhân vật đeo kính. Cặp kính được coi là phụ kiện làm tăng sự quyến rũ, tri thức hoặc tạo sự tương phản khi làm tình." },
      { name: "Đồng phục", description: "Uniform Fetish. Khoái cảm tình dục gắn liền với việc đối tác mặc các loại đồng phục đặc thù (nữ sinh, y tá, hầu gái, cảnh sát, nữ thư ký OL) và thường thực hiện hành vi nhập vai (Roleplay)." },
      { name: "Giantess", description: "Macrophilia. Niềm đam mê tình dục với những người phụ nữ khổng lồ. Thường đi kèm với các tưởng tượng về việc bị chà đạp, nhét vào những nơi nhạy cảm hoặc bị thống trị bởi kích thước áp đảo." },
      { name: "Shrinking", description: "Microphilia. Tưởng tượng tình dục về việc bản thân hoặc đối tác bị thu nhỏ lại bằng kích thước côn trùng. Thường kết hợp với Giantess hoặc Vore, tạo cảm giác bất lực và bị kiểm soát hoàn toàn." },
      { name: "Vore", description: "Vorarephilia. Thể loại cực kỳ ngách và hắc ám, liên quan đến khoái cảm tình dục khi tưởng tượng cảnh bản thân bị nuốt chửng sống, hoặc nuốt chửng người khác vào bụng." },
      { name: "Scat", description: "Coprophilia. Thể loại cực kỳ nhạy cảm và gây buồn nôn, liên quan đến khoái cảm tình dục với phân (chất thải bài tiết). Bao gồm việc đại tiện lên người, ăn phân hoặc bôi trát." },
      { name: "Watersports", description: "Urolagnia/Golden Shower. Khoái cảm tình dục liên quan đến nước tiểu. Bao gồm việc tiểu tiện lên cơ thể, mặt của đối tác, hoặc uống nước tiểu để thể hiện sự thống trị/phục tùng." }
    ]
  }
];

export function getGenreDescriptions(genreString: string): string {
  if (!genreString) return "";
  
  const selectedGenres = genreString.split(',').map(g => g.trim()).filter(g => g !== "");
  const allGenres = GENRE_CATEGORIES.flatMap(cat => cat.genres);
  
  const descriptions = selectedGenres.map(genreName => {
    const genreInfo = allGenres.find(g => g.name === genreName);
    if (genreInfo) {
      return `- ${genreInfo.name}: ${genreInfo.description}`;
    }
    return `- ${genreName}`;
  });
  
  return descriptions.join('\n');
}

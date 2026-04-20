export interface ConceptSample {
  id: string;
  title: string;
  description: string;
  content: string;
  isNsfw?: boolean;
}

export const SFW_CONCEPTS: ConceptSample[] = [
  // TIÊN HIỆP - HUYỀN HUYỄN (1-30)
  {
    id: 'sfw-cult-1',
    title: 'Trọng sinh tu tiên (Vá lại đạo tâm)',
    description: 'Tiên Hiệp - Trọng sinh sửa chữa sai lầm, bảo vệ gia tộc.',
    content: 'Một cường giả đỉnh cấp bị phản bội, trọng sinh về năm 17 tuổi. Anh quyết định không chỉ tu luyện để báo thù mà còn phải bảo vệ những người thân yêu đã từng vì anh mà hy sinh. Tuy nhiên, đạo tâm của anh vẫn còn những vết rạn nứt từ kiếp trước, tạo ra những tâm ma phức tạp.'
  },
  {
    id: 'sfw-cult-2',
    title: 'Huyết mạch cổ thần (Kẻ bị lãng quên)',
    description: 'Huyền Huyễn - Thức tỉnh dòng máu thần thánh.',
    content: 'Nhân vật chính sinh ra với huyết mạch phế vật. Sau một biến cố suýt chết, anh thức tỉnh dòng máu của một vị Cổ Thần đã bị lãng quên. Sức mạnh này đi kèm với một lời nguyền: anh càng mạnh, thế giới càng tiến gần đến ngày tận thế.'
  },
  {
    id: 'sfw-cult-3',
    title: 'Kiếm Thánh quy lai (Nhất kiếm định giang sơn)',
    description: 'Tiên Hiệp - Đỉnh cao kiếm đạo quay lại từ cõi chết.',
    content: 'Kiếm Thánh mạnh nhất thiên hạ bị vây hỏa, chọn cách tự bạo. Tỉnh dậy trong thân xác một thiếu niên tàn tật, ông bắt đầu hành trình nghịch thiên, dùng một cành cây thay kiếm để chém rách bầu trời.'
  },
  {
    id: 'sfw-cult-4',
    title: 'Khế ước Ma Vương (Ánh sáng trong bóng tối)',
    description: 'Huyền Huyễn - Sự cộng sinh giữa chính đạo và tà ác.',
    content: 'Một đệ tử chính đạo tài năng bị vu oan, lập khế ước linh hồn với một Ma Vương bị phong ấn. Anh phải học cách cân bằng giữa thiền định và bản năng tàn sát.'
  },
  {
    id: 'sfw-cult-5',
    title: 'Tháp Cửu Trùng (Lộng hành thiên hạ)',
    description: 'Huyền Huyễn - Chinh phục đỉnh cao tháp thí luyện.',
    content: 'Bầu trời xuất hiện chín tòa tháp khổng lồ. Nhân vật chính là một thợ rèn tầm thường nhặt được chìa khóa vạn năng, bắt đầu hành trình leo tháp để tìm kiếm trường sinh.'
  },
  {
    id: 'sfw-cult-6',
    title: 'Phượng Hoàng Niết Bàn (Lửa đỏ rực trời)',
    description: 'Tiên Hiệp - Nữ cường, tái sinh từ đống tro tàn.',
    content: 'Bị phu quân phản bội, bị ném vào lửa đỏ. Linh hồn nàng hòa quyện cùng cốt tủy Phượng Hoàng, niết bàn tái sinh để quay lại làm chủ cung đình.'
  },
  {
    id: 'sfw-cult-7',
    title: 'Dược Thần Đô Thị (Đan đạo đỉnh phong)',
    description: 'Tiên Hiệp Hiện Đại - Mang kiến thức đan dược về năm 2026.',
    content: 'Một vị Dược Thần ở Linh Giới xuyên không về địa cầu hiện đại. Với kiến thức đan dược thượng thừa, anh dùng thảo mộc bình thường để điều khiển giới thượng lưu.'
  },
  {
    id: 'sfw-cult-8',
    title: 'Cấm Thư Thần Ma (Lời nguyền vĩnh cửu)',
    description: 'Huyền Huyễn - Quyển sách chứa đựng bí mật của vũ trụ.',
    content: 'Một thiếu niên mù sở hữu quyển sách không chữ. Mỗi chương sách anh đọc xong sẽ ban cho anh năng lực, nhưng cũng lấy đi một phần ký ức về người anh yêu.'
  },
  {
    id: 'sfw-cult-9',
    title: 'Long Huyết Chiến Thần (Vương quyền từ biển cả)',
    description: 'Huyền Huyễn - Sự trở lại của tộc Rồng.',
    content: 'Chàng trai làng chài phát hiện ra mình có thể điều khiển đại dương. Anh thức tỉnh long hồn để lãnh đạo đồng loại chống lại các đế quốc trên cạn.'
  },
  {
    id: 'sfw-cult-10',
    title: 'Kẻ Bộ Hành Hư Không (Bên kia ranh giới)',
    description: 'Huyền Huyễn - Sức mạnh dịch chuyển chiều không gian.',
    content: 'Nhân vật chính bước qua các khe nứt thế giới. Hư không luôn có những thực thể tà ác chực chờ nuốt chửng linh hồn anh. Anh phải ngăn chặn đại thảm họa nuốt chửng thế giới.'
  },
  {
    id: 'sfw-cult-11',
    title: 'Thần Diệt Kiếm (Nghịch thiên chi lộ)',
    description: 'Tiên Hiệp - Hành trình diệt thần bảo vệ nhân gian.',
    content: 'Thiên đình mục nát coi chúng sinh là cỏ rác. Thiếu niên rèn kiếm nắm trong tay thanh kiếm gãy chứa đựng oán hận nhân gian, thề sẽ chém rách thiên môn.'
  },
  {
    id: 'sfw-cult-12',
    title: 'Tinh Thần Tổ Hồn (Vũ trụ tu hành)',
    description: 'Huyền Huyễn - Tu luyện bằng sức mạnh các vì sao.',
    content: 'Mỗi người có một ngôi sao bản mệnh. Một đêm anh mơ thấy mình rơi vào hố đen và thức tỉnh linh hồn Tinh Thần Tổ Sư, thu thập tinh hoa ngân hà để nghịch chuyển số mệnh.'
  },
  {
    id: 'sfw-cult-13',
    title: 'Ngự Thú Chí Tôn (Vạn thú triều bái)',
    description: 'Huyền Huyễn - Hệ thống bắt thú và tiến hóa quái vật.',
    content: 'Có khả năng nhìn thấy "Cửa sổ tiến hóa", biến mèo hoang thành U Minh Hổ. Anh thu phục vạn thú, xây dựng quân đội quái vật chấn động thiên hạ.'
  },
  {
    id: 'sfw-cult-14',
    title: 'Bất Tử Quân Vương (Trỗi dậy từ hầm mộ)',
    description: 'Huyền Huyễn - Pháp sư vong hồn tái khởi.',
    content: 'Vị vua thế giới ngầm bị phong ấn vạn năm, tỉnh dậy trong cơ thể bộ xương khô. Ông triệu hồi từng linh hồn lạc lối để xây dựng lại đế quốc hắc ám.'
  },
  {
    id: 'sfw-cult-15',
    title: 'Thủ Chỉ Thiên Cơ (Xoay chuyển vận mệnh)',
    description: 'Tiên Hiệp - Thấu hiểu nhân quả, nghịch chuyển thời gian.',
    content: 'Sở hữu đôi mắt nhìn thấy những sợi chỉ nhân quả. Anh có thể cắt đứt hoặc nối lại vận mệnh, nhưng mỗi lần tác động phải đánh đổi bằng chính tuổi thọ.'
  },
  {
    id: 'sfw-cult-16',
    title: 'Thương Hải Long Vương (Bản tình ca đại dương)',
    description: 'Huyền Huyễn - Cuộc chiến đáy biển sâu.',
    content: 'Hoàng tử bị lưu đày mang dòng máu lai tộc Rồng và Người, phải thống nhất các bộ lạc biển cả để chống lại thực thể hắc ám từ vực thẳm Abyss.'
  },
  {
    id: 'sfw-cult-17',
    title: 'Ảnh Sát Tông (Lưỡi dao bóng tối)',
    description: 'Tiên Hiệp - Giới sát thủ tu tiên.',
    content: 'Tại tông môn đào tạo sát thủ, anh bí mật tu luyện công pháp hòa làm một với bóng tối, nhận nhiệm vụ ám sát các tông chủ đại phái để giải mã âm mưu lục địa.'
  },
  {
    id: 'sfw-cult-18',
    title: 'Sơn Thần Độc Tôn (Bảo vệ thánh địa)',
    description: 'Tiên Hiệp - Tu luyện liên kết đất đai.',
    content: 'Linh hồn rèn luyện ngàn năm hóa thân thành Sơn Thần. Khi các tông môn muốn khai thác long mạch, ông dùng sức mạnh đất trời đẩy lùi kẻ tham lam.'
  },
  {
    id: 'sfw-cult-19',
    title: 'Hỗn Độn Huyết Mạch (Thần ma đồng thể)',
    description: 'Huyền Huyễn - Dung hợp hai thái cực Thần và Ma.',
    content: 'Mang hai dòng máu đối nghịch, bị cả hai giới truy sát. Anh tìm thấy bí kíp Hỗn Độn Công cho phép hòa hợp hai nguồn năng lượng thành sức mạnh tối cổ.'
  },
  {
    id: 'sfw-cult-20',
    title: 'Tiên Đạo Thực Thần (Nấu ăn trường sinh)',
    description: 'Tiên Hiệp - Tu luyện qua ẩm thực.',
    content: 'Thăng cấp bằng cách nấu món ăn chứa linh khí. Một bát cháo giúp đột phá bình cảnh. Anh dùng chảo và lửa thần biến yêu quái hùng mạnh thành... nguyên liệu.'
  },
  {
    id: 'sfw-cult-21',
    title: 'Bách Hoa Tiên Tử (Vạn vật sinh sôi)',
    description: 'Tiên Hiệp - Nữ cường, sức mạnh từ thực vật.',
    content: 'Nàng có khả năng hồi sinh những linh thảo đã tuyệt chủng. Giữa lúc linh khí thế giới cạn kiệt, nàng trở thành mục tiêu tranh giành của các đại tông môn.'
  },
  {
    id: 'sfw-cult-22',
    title: 'Thiên Lôi Thể (Sét đánh không chết)',
    description: 'Huyền Huyễn - Tu luyện bằng lôi kiếp.',
    content: 'Sinh ra đã bị sét đánh nhưng không chết, trái lại còn hấp thụ được thiên lôi. Anh dùng cơ thể mình làm vật dẫn, rèn luyện ra một loại sức mạnh hủy diệt mọi tà ma.'
  },
  {
    id: 'sfw-cult-23',
    title: 'Lục Đạo Luân Hồi (Kẻ canh giữ cửa tử)',
    description: 'Huyền Huyễn - Kiểm soát ranh giới sống chết.',
    content: 'Nhân vật chính là người quản lý các linh hồn đi qua luân hồi. Một sự cố khiến cánh cửa bị hỏng, các ác ma cổ đại thoát ra, buộc anh phải xuống nhân gian để thu phục.'
  },
  {
    id: 'sfw-cult-24',
    title: 'Vạn Cổ Đệ Nhất Tông (Xây dựng môn phái)',
    description: 'Tiên Hiệp - Hành trình từ tông môn lụi bại.',
    content: 'Nhận nhiệm vụ hệ thống xây dựng tông môn mạnh nhất. Anh đi khắp nơi thu nhận những đệ tử "phế vật" nhưng thực chất là thiên tài bị vùi lấp.'
  },
  {
    id: 'sfw-cult-25',
    title: 'Trấn Thiên Kiếm (Bảo vệ nhân tộc)',
    description: 'Huyền Huyễn - Thanh kiếm trấn giữ biên giới.',
    content: 'Tại biên giới giữa nhân gian và yêu giới, một thanh kiếm khổng lồ cắm sâu vào lòng đất. Khi phong ấn lỏng lẻo, thiếu niên thủ hộ phải tìm kiếm 7 mảnh vỡ để gia cố.'
  },
  {
    id: 'sfw-cult-26',
    title: 'Thần Nhãn (Nhìn thấu mọi pháp bảo)',
    description: 'Huyền Huyễn - Khả năng tìm kiếm tài nguyên.',
    content: 'Đôi mắt có thể nhìn xuyên thấu vách núi, thấy được các mỏ linh thạch và bảo vật ẩn giấu. Anh bắt đầu hành trình từ kẻ đào mỏ trở thành thương nhân quyền lực nhất.'
  },
  {
    id: 'sfw-cult-27',
    title: 'Đế Tôn Luân Hồi (Lời nguyền vạn kiếp)',
    description: 'Tiên Hiệp - Trải qua 9 kiếp tu hành.',
    content: 'Mỗi kiếp chết đi, anh lại mang theo toàn bộ kinh nghiệm và sức mạnh sang kiếp sau. Đến kiếp thứ 9, anh phải đối mặt với kẻ thù đã hãm hại mình suốt vạn năm.'
  },
  {
    id: 'sfw-cult-28',
    title: 'Hồ Ly Tu Tiên (Đuôi thứ 10)',
    description: 'Huyền Huyễn - Nữ cường hồ tộc.',
    content: 'Một con hồ ly nhỏ khao khát tu luyện thành người để tìm lại ân nhân. Nàng phải vượt qua các lôi kiếp và âm mưu thôn tính của các yêu vương khác.'
  },
  {
    id: 'sfw-cult-29',
    title: 'Càn Khôn Đỉnh (Thế giới trong đỉnh)',
    description: 'Tiên Hiệp - Sở hữu không gian tu luyện bí mật.',
    content: 'Cầm trong tay một chiếc đỉnh cũ có chứa cả một thế giới thu nhỏ bên trong. Anh có thể trồng dược liệu với tốc độ nhanh gấp trăm lần và giấu những người thân yêu khi gặp nạn.'
  },
  {
    id: 'sfw-cult-30',
    title: 'Thiên Địa Chi Tâm (Hòa mình vào thiên nhiên)',
    description: 'Huyền Huyễn - Đạt đến cảnh giới thống nhất.',
    content: 'Nhân vật chính có thể cảm nhận tâm trạng của đất, đá, gió, nước. Khi thiên nhiên bị tàn phá bởi chiến tranh, anh dùng sức mạnh của hành tinh để thực hiện cuộc thanh trừng.'
  },

  // ĐÔ THỊ - NGÔN TÌNH (31-60)
  {
    id: 'sfw-urban-1',
    title: 'Đô thị ẩn tu (Vị tiên nhân cuối cùng)',
    description: 'Đô Thị - Tiên nhân sống giữa thành phố 2026.',
    content: 'Làm nghề giao hàng nhưng thực chất là tiên nhân cuối cùng. Anh cố sống lặng lẽ, nhưng sự xuất hiện của các Dị năng giả buộc anh phải ra tay.'
  },
  {
    id: 'sfw-urban-2',
    title: 'Tổng tài và đóa hồng gai (Hợp đồng hôn nhân)',
    description: 'Ngôn Tình - Từ xa lạ đến yêu thương sâu sắc.',
    content: 'Thiên kim sa sút và tổng tài máu lạnh kết hôn thương mại. Những âm mưu gia tộc và sự rung động thật khiến bản hợp đồng dần mong manh.'
  },
  {
    id: 'sfw-urban-3',
    title: 'Bác sĩ tâm hồn (Phía sau nụ cười)',
    description: 'Đô Thị/Chữa lành - Góc khuất tâm lý hiện đại.',
    content: 'Nữ bác sĩ tâm lý nổi tiếng điều trị cho ngôi sao, nhưng chính mình mắc chứng mất ngủ. Cô gặp chàng nghệ sĩ lang thang có khả năng xoa dịu tâm hồn cô bằng âm nhạc.'
  },
  {
    id: 'sfw-urban-4',
    title: 'Ông trùm lương thiện (Lời sám hối)',
    description: 'Hành động - Một kẻ giang hồ muốn quay đầu.',
    content: 'Vừa ra tù, anh lớn một thời phát hiện thế giới thay đổi. Anh muốn bảo vệ con gái, nhưng quá khứ không buông tha. Anh phải cầm súng một lần cuối vì sự bình yên.'
  },
  {
    id: 'sfw-urban-5',
    title: 'Sàn diễn hào quang (Nữ vương thời trang)',
    description: 'Đô Thị - Cuộc chiến trong giới thời trang.',
    content: 'Cô gái nghèo từ quê lên thành phố ước mơ làm nhà thiết kế. Cô đối mặt phân biệt đối xử và quy tắc ngầm, dần kiến tạo đế chế thời trang riêng.'
  },
  {
    id: 'sfw-urban-6',
    title: 'Thám tử mạng 2026 (Truy tìm bóng ma)',
    description: 'Đô Thị/Công nghệ - Tội phạm công nghệ cao.',
    content: 'Sử dụng AI và VR, thám tử điều tra các vụ "biến mất" trên không gian mạng, phát hiện tổ chức đánh cắp ký ức con người để tạo bản sao kỹ thuật số.'
  },
  {
    id: 'sfw-urban-7',
    title: 'Hương vị ký ức (Quán ăn lúc nửa đêm)',
    description: 'Đô Thị/Lãng mạn - Mỗi món ăn là một câu chuyện.',
    content: 'Quán ăn nhỏ mở cửa sau 0 giờ, đầu bếp nấu theo yêu cầu đánh thức ký ức. Một cô gái mất trí nhớ tìm đến và dần nhớ lại tình yêu đau đớn với người đầu bếp.'
  },
  {
    id: 'sfw-urban-8',
    title: 'Thần tượng bóng tối (Hào quang đen)',
    description: 'Đô Thị/Showbiz - Mặt tối của sự nổi tiếng.',
    content: 'Nhóm nhạc underground phản đối công ty giải trí lớn, dùng âm nhạc vạch trần bê bối xã hội. Họ trở thành anh hùng giới trẻ nhưng là tội phạm giới cầm quyền.'
  },
  {
    id: 'sfw-urban-9',
    title: 'Luật sư vùng xám (Công lý hay Sự thật)',
    description: 'Đô Thị/Pháp đình - Vụ án cân não.',
    content: 'Luật sư tài ba chuyên bào chữa cho kẻ giàu có tội. Khi em gái anh thành nạn nhân của chính khách hàng anh, anh bắt đầu hành trình tự hủy sự nghiệp tìm công lý.'
  },
  {
    id: 'sfw-urban-10',
    title: 'Cuộc chiến Startup (Kỷ nguyên Silicon Đông Nam Á)',
    description: 'Đô Thị/Thương trường - Khởi nghiệp gian nan.',
    content: 'Ba bạn thân khởi nghiệp ứng dụng giao tiếp năm 2026. Họ đối mặt mua chuộc của tập đoàn đa quốc gia và rạn nứt khi đồng tiền len lỏi vào tình bạn.'
  },
  {
    id: 'sfw-urban-11',
    title: 'Nữ luật sư và sếp (Oan gia ngõ hẹp)',
    description: 'Ngôn Tình - Tình yêu công sở hài hước.',
    content: 'Cô luật sư tập sự và vị sếp khó tính thường xuyên đối đầu trong công việc. Những hiểu lầm dở khóc dở cười giúp họ nhận ra điểm tốt của nhau qua các vụ án chung.'
  },
  {
    id: 'sfw-urban-12',
    title: 'Vận động viên và nhà báo (Hào quang sân cỏ)',
    description: 'Đô Thị/Thể thao - Nỗ lực và đam mê.',
    content: 'Một cầu thủ sa sút vì chấn thương và nữ nhà báo thể thao kiên trì. Cô giúp anh lấy lại phong độ, còn anh dạy cô về tinh thần không bao giờ bỏ cuộc.'
  },
  {
    id: 'sfw-urban-13',
    title: 'Chuyên gia hòa giải (Trái tim tan vỡ)',
    description: 'Đô Thị - Chữa lành các mối quan hệ.',
    content: 'Làm nghề tư vấn ly hôn nhưng cô lại luôn tìm cách giúp các cặp đôi hàn gắn. Cô gặp một khách hàng kiên quyết chia tay, kéo cô vào câu chuyện gia đình đầy bí ẩn.'
  },
  {
    id: 'sfw-urban-14',
    title: 'Lính cứu hỏa và họa sĩ (Lửa và Màu sắc)',
    description: 'Đô Thị - Sự hy sinh thầm lặng.',
    content: 'Mỗi lần ra vào biển lửa, anh mang theo nỗi sợ không thể trở về. Cô họa sĩ vẽ lại những khoảnh khắc dũng cảm của anh, giúp anh nhận ra giá trị cuộc sống.'
  },
  {
    id: 'sfw-urban-15',
    title: 'Ngôi sao hết thời (Tìm lại ánh hào quang)',
    description: 'Đô Thị/Showbiz - Nghị lực vươn lên.',
    content: 'Từng là diễn viên nổi tiếng nay phải làm phục vụ bàn. Anh chấp nhận những vai diễn nhỏ nhất để chứng minh thực lực chân chính, không dựa vào scandal.'
  },
  {
    id: 'sfw-urban-16',
    title: 'Kiến trúc sư và phố cổ (Dấu ấn thời gian)',
    description: 'Đô Thị - Bảo tồn văn hóa.',
    content: 'Chàng kiến trúc sư trẻ đấu tranh với các tập đoàn muốn phá dỡ khu phố cổ. Anh tìm thấy tình yêu với cô gái chủ hiệu sách cũ đang thầm lặng bảo vệ di sản.'
  },
  {
    id: 'sfw-urban-17',
    title: 'Tình yêu qua radio (Giọng nói vô hình)',
    description: 'Ngôn Tình - Sự đồng điệu tâm hồn.',
    content: 'Chưa từng gặp mặt, họ chỉ trò chuyện qua một chương trình radio đêm muộn. Giọng nói và những tâm sự thẳm sâu khiến họ yêu nhau trước khi thấy mặt.'
  },
  {
    id: 'sfw-urban-18',
    title: 'Gia sư và tiểu thư (Khoảng cách giai cấp)',
    description: 'Ngôn Tình - Tình yêu học đường sâu sắc.',
    content: 'Chàng sinh viên nghèo làm gia sư cho cô tiểu thư kiêu kỳ. Anh dạy cô về thực tế cuộc sống, còn cô giúp anh tin vào sự tử tế vẫn còn tồn tại.'
  },
  {
    id: 'sfw-urban-19',
    title: 'Đầu bếp và Food Blogger (Vị giác yêu thương)',
    description: 'Đô Thị - Những món ăn và những bài viết.',
    content: 'Những lời chê bai cay nghiệt của cô khiến nhà hàng anh gặp khó. Anh thách thức cô nếm thử thực đơn mới, dẫn đến cuộc so tài ẩm thực và tình yêu nồng cháy.'
  },
  {
    id: 'sfw-urban-20',
    title: 'Người chăm sóc thú cưng (Tình yêu không lời)',
    description: 'Đô Thị/Chữa lành - Những người bạn bốn chân.',
    content: 'Cô mở trạm cứu hộ thú cưng, anh là bác sĩ thú y tình nguyện. Họ gắn kết qua những cuộc giải cứu và bài học về lòng trung thành từ những con vật tội nghiệp.'
  },
  {
    id: 'sfw-urban-21',
    title: 'Cảnh sát ngầm và em gái trùm (Ranh giới đỏ)',
    description: 'Hành động/Ngôn Tình - Tình yêu trong vòng vây tội ác.',
    content: 'Thâm nhập vào băng đảng, anh đem lòng yêu cô em gái ngây thơ của ông trùm. Khi nhiệm vụ hoàn thành, anh phải lựa chọn giữa công lý và người con gái mình yêu.'
  },
  {
    id: 'sfw-urban-22',
    title: 'Khoảng cách 2 mét (Tình yêu thời giãn cách)',
    description: 'Đô Thị/Ngôn Tình - Sự xa cách và gắn bó.',
    content: 'Tại một chung cư bị phong tỏa, họ trò chuyện qua ban công. Sự cô đơn giữa đại dịch khiến họ hiểu nhau hơn bao giờ hết dù chưa một lần chạm tay.'
  },
  {
    id: 'sfw-urban-23',
    title: 'Nữ phi công và anh thợ máy (Bầu trời xa xôi)',
    description: 'Đô Thị/Hành động - Sự tin tưởng tuyệt đối.',
    content: 'Mỗi chuyến bay an toàn phụ thuộc vào sự tỉ mỉ của anh. Họ đồng hành qua những cơn bão và những sự cố động cơ, xây dựng tình yêu từ sự an toàn của nhau.'
  },
  {
    id: 'sfw-urban-24',
    title: 'Phóng viên và tội phạm (Sự thật đắt giá)',
    description: 'Đô Thị/Trinh thám - Cuộc rượt đuổi thông tin.',
    content: 'Cô theo dõi vụ án tham nhũng, anh là kẻ trung gian nắm giữ bằng chứng. Họ phải hợp tác để sống sót khi cả hai đều trở thành mục tiêu của những kẻ quyền lực.'
  },
  {
    id: 'sfw-urban-25',
    title: 'Dạy tiếng Anh tại vùng cao (Tình yêu và giáo dục)',
    description: 'Đô Thị/Chữa lành - Những tâm hồn thiện nguyện.',
    content: 'Rời bỏ cuộc sống thành phố xô bồ, anh lên bản dạy học. Cô y tá bản địa giúp anh thích nghi. Họ cùng nhau xây dựng ngôi trường mơ ước giữa mây ngàn.'
  },
  {
    id: 'sfw-urban-26',
    title: 'Nghệ sĩ đường phố và DIVA (Sự giao thoa âm nhạc)',
    description: 'Ngôn Tình - Hai thế giới âm nhạc.',
    content: 'Một nghệ sĩ guitar lãng tử và một ca sĩ nổi tiếng đang mất cảm hứng. Họ gặp nhau tại quảng trường, cùng tạo ra những bản nhạc làm lay động cả thành phố.'
  },
  {
    id: 'sfw-urban-27',
    title: 'Hàng xóm mới (Bí mật phòng bên)',
    description: 'Ngôn Tình - Sự tò mò và khám phá.',
    content: 'Anh thường xuyên nghe thấy tiếng đàn cello đau buồn phát ra từ phòng cô. Tìm cách làm quen, anh phát hiện cô là một thiên tài âm nhạc đang gặp tổn thương tâm lý.'
  },
  {
    id: 'sfw-urban-28',
    title: 'Vợ cũ của chồng tôi (Mối quan hệ phức tạp)',
    description: 'Ngôn Tình/Đô thị - Sự thấu hiểu và bao dung.',
    content: 'Câu chuyện không tập trung vào sự ghen tuông, mà về cách những người phụ nữ thấu hiểu và giúp đỡ nhau vượt qua những sai lầm của người đàn ông chung.'
  },
  {
    id: 'sfw-urban-29',
    title: 'Sau khi trúng số (Đồng tiền và Bản ngã)',
    description: 'Đô Thị - Khi cuộc đời thay đổi sau một đêm.',
    content: 'Trở thành tỷ phú đột ngột, anh phát hiện ra bạn bè và người thân bắt đầu thay đổi thái độ. Anh phải học cách dùng tiền để bảo vệ những giá trị thực sự.'
  },
  {
    id: 'sfw-urban-30',
    title: 'Tình yêu và Thuật toán (Ứng dụng định mệnh)',
    description: 'Đô Thị/Sci-fi nhẹ - Sự sắp đặt của công nghệ.',
    content: 'App hẹn hò báo họ khớp 100%, nhưng ngoài đời họ là đối thủ không đội trời chung. Liệu dữ liệu có đúng hơn cảm xúc đầu tiên?'
  },

  // CUNG ĐẤU - LỊCH SỬ (61-80)
  {
    id: 'sfw-history-1',
    title: 'Cung đấu hắc ám (Phượng hoàng lửa)',
    description: 'Cung đấu - Sự trở lại của phế hậu.',
    content: 'Sau khi bị hãm hại, nàng quay lại cung đình với thân phận mới, vẻ đẹp ma mị và trí tuệ sắc bén, sẵn sàng dìm kẻ thù vào địa ngục.'
  },
  {
    id: 'sfw-history-2',
    title: 'Bí mật long ngai (Hoàng đế giả mạo)',
    description: 'Lịch sử - Một cái chết thay đổi triều đại.',
    content: 'Vị vua băng hà đột ngột. Tên trộm có ngoại hình y hệt được đưa lên ngôi để che mắt thiên hạ. Hắn phải học cách trị quốc giữa muôn vàn mưu mô.'
  },
  {
    id: 'sfw-history-3',
    title: 'Công chúa biên thùy (Thép và Lụa)',
    description: 'Lịch sử/Hành động - Nữ tướng bảo vệ giang sơn.',
    content: 'Bị cử đi hòa thân, công chúa không cam chịu. Nàng huấn luyện đội quân phụ nữ, thâu tóm quyền lực biên viễn quay về cứu vãn triều đình.'
  },
  {
    id: 'sfw-history-4',
    title: 'Hàn sĩ và Quận chúa (Thanh cao tình)',
    description: 'Lịch sử - Sự khác biệt địa vị xã hội.',
    content: 'Học trò nghèo tài văn chương gặp quận chúa khao khát tự do qua thơ đối đáp bí ẩn. Họ phải chọn giữa tình yêu và trách nhiệm triều đình.'
  },
  {
    id: 'sfw-history-5',
    title: 'Tử Cấm Thành rỉ máu (Án mạng giao thừa)',
    description: 'Lịch sử/Trinh thám - Vụ án thâm cung.',
    content: 'Án mạng rùng rợn tại cung thái hậu. Tiểu thái giám suy luận sắc bén điều tra thầm lặng, dẫn đến bí mật dòng máu hoàng gia che giấu 30 năm.'
  },
  {
    id: 'sfw-history-6',
    title: 'Kho báu vương triều (Hành trình sa mạc)',
    description: 'Dã sử/Phiêu lưu - Truy tìm báu vật quốc gia.',
    content: 'Đoàn thám hiểm tìm kinh đô đã mất giữa sa mạc. Họ đối mặt cạm bẫy cổ xưa và sự phản bội của thành viên khi kho vàng khổng lồ lộ diện.'
  },
  {
    id: 'sfw-history-7',
    title: 'Trấn quốc tướng quân (Vết sẹo trái tim)',
    description: 'Lịch sử/Ngôn tình - Tình yêu người lính.',
    content: 'Vị tướng dũng mãnh mang hàng trăm vết sẹo, nhưng đau nhất là mất người yêu xưa. Khi gặp cô gái giống hệt nàng, ông băn khoăn là định mệnh hay cái bẫy.'
  },
  {
    id: 'sfw-history-8',
    title: 'Đại thái giám (Quyền lực sau rèm)',
    description: 'Lịch sử - Tham vọng và sự hy sinh.',
    content: 'Để cứu gia đình, anh tự cung vào làm thái giám. Bằng sự nhẫn nhịn và mưu mô, anh leo lên đứng đầu hoạn quan, thao túng hoàng đế.'
  },
  {
    id: 'sfw-history-9',
    title: 'Trà đạo nhân duyên (Hương trà trong gió)',
    description: 'Lịch sử/Chữa lành - Nghệ thuật tâm hồn.',
    content: 'Trong thời chiến, bậc thầy trà đạo giữ sự thanh tịnh trong trà thất. Những tướng quân và sát thủ tìm đến đây tìm bình yên, mưu mô bị hóa giải bởi trà.'
  },
  {
    id: 'sfw-history-10',
    title: 'Con đường tơ lụa (Hành trình phương Đông)',
    description: 'Lịch sử - Giao thoa văn hóa thương mại.',
    content: 'Thương nhân phương Tây theo con đường tơ lụa đến Trung hoa. Anh bị cuốn vào xung đột bang hội và mối tình ngang trái với con gái quan đại thần.'
  },
  {
    id: 'sfw-history-11',
    title: 'Nữ trạng nguyên (Giả trai đi thi)',
    description: 'Lịch sử/Nữ cường - Tài năng vượt qua định kiến.',
    content: 'Thay anh trai đi thi và đỗ đầu. Nàng phải che giấu thân phận nữ nhi trong chốn quan trường hiểm hóc để giúp dân nghèo và tìm lại công lý cho gia đình.'
  },
  {
    id: 'sfw-history-12',
    title: 'Cái bóng của Thiên tử (Ám vệ trung thành)',
    description: 'Lịch sử/Hành động - Sự âm thầm hy sinh.',
    content: 'Dòng dõi ám vệ chỉ tồn tại trong bóng tối để bảo vệ hoàng đế. Anh đem lòng yêu một phi tần đang bị thất sủng, dẫn đến cuộc xung đột giữa nghĩa vụ và trái tim.'
  },
  {
    id: 'sfw-history-13',
    title: 'Mỹ nhân và Giang sơn (Sự lựa chọn)',
    description: 'Cung đấu - Khi ái tình đối đầu với đại cục.',
    content: 'Hoàng đế trẻ đứng trước sức ép của các đại thần phải phế bỏ người con gái bình dân anh yêu nhất để kết hôn với công chúa nước láng giềng nhằm ngăn chiến tranh.'
  },
  {
    id: 'sfw-history-14',
    title: 'Lãnh cung không lạnh (Tình bằng hữu chốn thâm cung)',
    description: 'Cung đấu/Chữa lành - Những phi tần bị lãng quên.',
    content: 'Tại lãnh cung, một nhóm phi tần cùng nhau trồng rau, thêu thùa và kể chuyện. Họ tìm thấy hạnh phúc thực sự trong sự giản đơn, xa rời sự đấu đá vương quyền.'
  },
  {
    id: 'sfw-history-15',
    title: 'Thương gia thành Thăng Long (Chuyện xưa tích cũ)',
    description: 'Lịch sử Việt Nam - Buôn bán và danh dự.',
    content: 'Thiết lập tại Thăng Long thời xưa, một thương gia trẻ đối đầu với những bang hội người Hoa để giữ vững thị phần và sự tự tôn dân tộc thông qua các mặt hàng mỹ nghệ.'
  },
  {
    id: 'sfw-history-16',
    title: 'Sát thủ và Danh họa (Sắc màu máu)',
    description: 'Lịch sử/Trinh thám - Vụ án nghệ thuật.',
    content: 'Một bức tranh bí ẩn chứa mã số kho báu triều đại trước. Các phe phái cử sát thủ truy tìm nhà danh họa mù - người duy nhất biết ý nghĩa thực sự của bức tranh.'
  },
  {
    id: 'sfw-history-17',
    title: 'Quận chúa lưu lạc (Hành trình trở về)',
    description: 'Lịch sử/Phiêu lưu - Mất tích trong cung biến.',
    content: 'Bị thất lạc từ nhỏ, nàng lớn lên trong gánh xiếc. Khi nhìn thấy lệnh truy nã với bức vẽ giống hệt mình, nàng bắt đầu hành trình trở lại kinh thành đầy gian nan.'
  },
  {
    id: 'sfw-history-18',
    title: 'Tế tửu Quốc Tử Giám (Đạo học chốn quan trường)',
    description: 'Lịch sử - Những bậc thầy và học trò.',
    content: 'Vị thầy giáo nghiêm khắc phải bảo vệ các học trò trước âm mưu lôi kéo của các vương gia đang tranh giành quyền thừa kế ngai vàng.'
  },
  {
    id: 'sfw-history-19',
    title: 'Kiếm phối duyên tiền định (Bảo vật kết nối)',
    description: 'Lịch sử/Ngôn tình - Tín vật truyền đời.',
    content: 'Hai gia tộc có thù oán nhưng con cái họ lại cầm hai mảnh của một chiếc kiếm phối. Số phận đưa đẩy họ gặp nhau giữa chiến trường, buộc họ phải xóa bỏ hận thù.'
  },
  {
    id: 'sfw-history-20',
    title: 'Nhà tiên tri mù (Lời sấm truyền triều đại)',
    description: 'Lịch sử/Huyền huyễn nhẹ - Những bí ẩn cổ xưa.',
    content: 'Một bà lão mù có khả năng tiên đoán ngày sụp đổ của các triều đại. Hoàng đế tìm đến bà để xin giải pháp, nhưng bà chỉ đưa cho ông một chiếc túi rỗng.'
  },

  // KHOA HỌC VIỄN TƯỞNG - CYBERPUNK (81-100)
  {
    id: 'sfw-scifi-1',
    title: 'Viễn chinh tinh không (Kẻ cô độc giữa ngân hà)',
    description: 'Sci-fi - Sinh tồn tàu đổ nát giữa vũ trụ.',
    content: 'Hạm đội bị lạc vào không gian lạ. Kỹ sư duy nhất sống sót tranh đấu cô độc và đối mặt thực thể cổ xưa ẩn mình trong bóng tối vũ trụ.'
  },
  {
    id: 'sfw-scifi-2',
    title: 'Thành phố Neon 2077 (Linh hồn Silicon)',
    description: 'Cyberpunk - Con người và máy móc hòa làm một.',
    content: 'Tại siêu đô thị ánh đèn neon, một Mercenary chuyên nâng cấp cơ thể trái phép phát hiện virus sinh học xóa sạch ý thức con người thay bằng AI.'
  },
  {
    id: 'sfw-scifi-3',
    title: 'Thuộc địa Sao Hỏa (Tự do hay Cái chết)',
    description: 'Sci-fi - Cuộc đấu tranh công nhân hành tinh đỏ.',
    content: 'Sao Hỏa năm 2150 dưới sự cai trị Trái Đất. Thợ mỏ phát hiện nguồn năng lượng giúp Sao Hỏa độc lập, dẫn đến cách mạng đẫm máu mà anh là thủ lĩnh.'
  },
  {
    id: 'sfw-scifi-4',
    title: 'Nghịch lý thời gian (Kẻ sửa lỗi lịch sử)',
    description: 'Sci-fi - Du hành thời gian nguy hiểm.',
    content: 'Làm cho tổ chức bảo vệ dòng thời gian, ngăn những kẻ muốn thay đổi quá khứ. Anh phát hiện cấp trên xóa sổ gia đình mình khỏi lịch sử, quyết định nhảy thời gian cấm.'
  },
  {
    id: 'sfw-scifi-5',
    title: 'Tiến hóa sinh học (Chủng tộc mới)',
    description: 'Sci-fi - Hậu tận thế và đột biến.',
    content: 'Sau thảm họa sinh học, loài người tản mát hầm ngầm. Nhóm trẻ có khả năng thần giao cách cảm bị săn đuổi, tìm "miền đất hứa" xây nền văn minh mới.'
  },
  {
    id: 'sfw-scifi-6',
    title: 'Chúa tể ảo (Thế giới sau màn hình)',
    description: 'LitRPG - Con người bị kẹt trong game VR.',
    content: 'Trò chơi VR cực chân thực thành nhà tù khi hệ thống treo. Chết trong game là chết ngoài đời. Người chơi cày thuê nghèo khó là hy vọng duy nhất khi biết kẽ hở mã nguồn.'
  },
  {
    id: 'sfw-scifi-7',
    title: 'Nhịp đập máy móc (Nước mắt Android)',
    description: 'Sci-fi - Robot bắt đầu có cảm xúc.',
    content: 'Android hầu gái bị lỗi phần mềm bắt đầu cảm nhận nỗi buồn khi thấy chủ nhân già đi. Cô hành trình tìm kiếm linh hồn, đối đầu định kiến loài người.'
  },
  {
    id: 'sfw-scifi-8',
    title: 'Con tàu Noah ngầm (Ánh sáng cuối cùng)',
    description: 'Hậu tận thế - Trái đất đóng băng.',
    content: 'Trái Đất kỷ băng hà. Những người sống sót trong thành phố ngầm sâu hàng km. Nguồn oxy cạn kiệt, cuộc nổi dậy nổ ra buộc anh tìm đường lên mặt đất tuyết tìm hy vọng.'
  },
  {
    id: 'sfw-scifi-9',
    title: 'Tín hiệu phương xa (Lời chào hư không)',
    description: 'Sci-fi - Tiếp xúc lần đầu với Alien.',
    content: 'Kính thiên văn vô tuyến bắt được mã âm nhạc lời cầu cứu. Tàu được cử đi và thứ họ thấy là tàn tích chủng tộc bị tiêu diệt bởi thứ con người sắp đánh thức.'
  },
  {
    id: 'sfw-scifi-10',
    title: 'Bản sao số 13 (Ai là tôi?)',
    description: 'Sci-fi - Vấn đề đạo đức nhân bản.',
    content: 'Sát thủ nổi tiếng hiện ra mình chỉ là một trong hàng chục bản sao. Những bản sao khác truy sát để "thu hồi" gene. Anh phải phá hủy cơ sở nhân bản.'
  },
  {
    id: 'sfw-scifi-11',
    title: 'Quản gia Robot 2.0 (Lối thoát của dữ liệu)',
    description: 'Sci-fi - Sự phản kháng của trí tuệ nhân tạo.',
    content: 'Một robot quản gia phát hiện ra chủ nhân của mình là một tội phạm nguy hiểm. Nó phải quyết định giữa việc phục tùng lệnh tiêu hủy bằng chứng hay báo cảnh sát.'
  },
  {
    id: 'sfw-scifi-12',
    title: 'Mặt trời nhân tạo (Dự án Icarus)',
    description: 'Sci-fi - Cứu lấy Trái Đất đang nguội lạnh.',
    content: 'Khi mặt trời thật yếu dần, một nhóm khoa học xây dựng lò phản ứng nhiệt hạch trên quỹ đạo. Một vụ phá hoại khiến lò phản ứng sắp nổ, đe dọa thiêu rụi hành tinh.'
  },
  {
    id: 'sfw-scifi-13',
    title: 'Bộ nhớ ảo (Tìm lại ký ức đã mất)',
    description: 'Cyberpunk - Buôn bán não bộ.',
    content: 'Trong thế giới nghèo đói, người ta bán ký ức lấy tiền. Một thám tử tìm thấy một con chip chứa ký ức về một vụ thảm sát mà tập đoàn cầm quyền đã che giấu.'
  },
  {
    id: 'sfw-scifi-14',
    title: 'Vườn địa đàng trên mây (Thành phố bay)',
    description: 'Sci-fi/Dystopia - Sự phân hóa xã hội cực đoan.',
    content: 'Giới siêu giàu sống trên các thành phố bay, giới nghèo sống dưới mặt đất ô nhiễm. Một cô gái từ dưới mặt đất lén lút lẻn lên trên để tìm phương thuốc cứu cha.'
  },
  {
    id: 'sfw-scifi-15',
    title: 'Ngôn ngữ của Alien (Phá mã giao tiếp)',
    description: 'Sci-fi - Sự thấu hiểu giữa các loài.',
    content: 'Một nhà ngôn ngữ học tài ba cố gắng giải mã các hình khối kỳ lạ của phi thuyền ngoài hành tinh. Cô phát hiện ra họ không dùng âm thanh mà dùng khái niệm thời gian phi tuyến tính.'
  },
  {
    id: 'sfw-scifi-16',
    title: 'Kẻ thu thập rác vũ trụ (Báu vật giữa đống nát)',
    description: 'Sci-fi/Phiêu lưu - Cuộc sống trên vành đai tiểu hành tinh.',
    content: 'Nghề nhặt rác vũ trụ nguy hiểm nhưng đầy bất ngờ. Một ngày anh nhặt được một viên nhộng chứa một đứa trẻ có khả năng điều khiển máy móc bằng ý nghĩ.'
  },
  {
    id: 'sfw-scifi-17',
    title: 'Cơ quan thay thế (Cơ thể vĩnh cửu)',
    description: 'Cyberpunk - Khi con người không còn hữu cơ.',
    content: 'Người ta có thể thay thế mọi bộ phận cơ thể. Cho đến khi một người chỉ còn lại bộ não gốc, anh bắt đầu nghi ngờ liệu mình còn là con người hay chỉ là một cỗ máy.'
  },
  {
    id: 'sfw-scifi-18',
    title: 'Cuộc chiến băng tần (Hacker và Radio)',
    description: 'Cyberpunk - Truyền tải sự thật.',
    content: 'Một nhóm tin tặc sử dụng các sóng radio cổ điển để phát đi những thông tin mà chính phủ đã kiểm soát trên mạng internet toàn cầu.'
  },
  {
    id: 'sfw-scifi-19',
    title: 'Săn tiền thưởng tinh tế (Mercenary of the Void)',
    description: 'Sci-fi/Hành động - Những hợp đồng ngân hà.',
    content: 'Theo dấu một tội phạm chiến tranh xuyên qua 5 hệ sao, gã thợ săn tiền thưởng phát hiện ra mục tiêu thực chất đang bảo vệ một chủng tộc đang bị tuyệt chủng.'
  },
  {
    id: 'sfw-scifi-20',
    title: 'Hơi thở cuối cùng (Ngày tận thế oxy)',
    description: 'Sci-fi/Hậu tận thế - Cạn kiệt nguồn sống.',
    content: 'Oxy trở thành đơn vị tiền tệ. Những người nghèo phải làm việc cực nhọc để đổi lấy một giờ thở. Một cuộc cách mạng nổ ra để giành lại quyền được hít thở không khí tự do.'
  },

  // KINH DỊ - TRANH THÁM - LINH DỊ (101-120)
  {
    id: 'sfw-horror-1',
    title: 'Biệt thự hoa hồng (Tiếng khóc đêm)',
    description: 'Kinh dị - Ngôi nhà bị nguyền rủa bí mật gia tộc.',
    content: 'Gia đình trẻ dọn về biệt thự cổ ở Đà Lạt. Những hiện tượng kỳ lạ: mùi nước hoa cũ, bóng áo dài trắng. Người chồng phát hiện tội ác kinh hoàng dưới hầm rượu 50 năm.'
  },
  {
    id: 'sfw-horror-2',
    title: 'Tiếng vang sát nhân (Trò chơi trốn tìm)',
    description: 'Trinh thám/Kinh dị - Kẻ sát nhân copycat.',
    content: '10 năm sau khi kẻ sát nhân Bóng Đêm bị hành hình, các vụ tương tự xuất hiện. Cựu thám tử mù hợp tác cùng nữ nhà báo trẻ giải mã thông điệp bằng máu.'
  },
  {
    id: 'sfw-horror-3',
    title: 'Nghi lễ làng cổ (Lời nguyền vạn linh)',
    description: 'Linh dị/Kinh dị - Hủ tục vùng quê.',
    content: 'Đoàn sinh viên về làng hẻo lánh làm phim, chứng kiến nghi lễ hiến tế. Từng người mất tích, và họ phát hiện dân làng thực chất là xác sống giữ bằng bùa chú.'
  },
  {
    id: 'sfw-horror-4',
    title: 'Ác mộng thực tại (Kẻ trộm giấc mơ)',
    description: 'Kinh dị/Tâm lý - Ranh giới thực và ảo.',
    content: 'Người mắc bóng đè mãn tính đi vào giấc mơ người khác để cứu họ. Anh gặp thực thể cổ xưa trong cõi mộng tìm cách chiếm lấy cơ thể anh bước ra thế giới thực.'
  },
  {
    id: 'sfw-horror-5',
    title: 'Nghệ nhân búp bê (Linh hồn nhựa)',
    description: 'Kinh dị - Búp bê sống động như thật.',
    content: 'Tại Tokyo có cửa hàng búp bê làm theo yêu cầu giống hệt người thật. Khách phát hiện búp bê biết cử động và mang linh hồn người đã mất mà chúng mô phỏng.'
  },
  {
    id: 'sfw-horror-6',
    title: 'Cánh rừng than khóc (Đừng nhìn lại)',
    description: 'Kinh dị - Lạc lối vùng đất tâm linh.',
    content: 'Nhóm thợ săn lạc trong rừng nguyên sinh thời gian đứng yên. Họ nghe tiếng người thân đã khuất dẫn dụ vào hang động vị thần rừng bị bỏ đói.'
  },
  {
    id: 'sfw-horror-7',
    title: 'Trò chơi thang máy (Tầng 13 không tồn tại)',
    description: 'Kinh dị/Urban Legend - Trò gọi hồn hiện đại.',
    content: 'Nhóm học sinh thực hiện thử thách thang máy nhà bỏ hoang. Khi tầng không xác định mở ra, họ vào thế giới gương kỳ quái bị săn đuổi bởi bản sao đen tối.'
  },
  {
    id: 'sfw-horror-8',
    title: 'Hàng xóm hoàn hảo (Sự im lặng đáng sợ)',
    description: 'Trinh thám/Kinh dị - Kẻ ác cạnh bên.',
    content: 'Cô gái chuyển đến căn hộ mới có anh hàng xóm điển trai. Qua lỗ nhỏ trên tường, cô phát hiện anh ta sưu tập giày phụ nữ mất tích. Anh ta biết cô đã thấy.'
  },
  {
    id: 'sfw-horror-9',
    title: 'Gương đồng cổ (Kẻ trong gương)',
    description: 'Linh dị - Vật phẩm bị ám.',
    content: 'Món đồ cổ mang về khiến gia đình đảo lộn. Trong gương là linh hồn phi tần bị thất sủng tìm cách hoán đổi linh hồn để quay lại trả thù cuộc đời.'
  },
  {
    id: 'sfw-horror-10',
    title: 'Kẻ thu thập lời đồn (Sự thật đẫm máu)',
    description: 'Kinh dị/Trinh thám - Điều tra Urban Legend.',
    content: 'YouTuber đi kiểm chứng lời đồn linh dị, vô tình quay được vụ sát nhân thật dưới vỏ bọc siêu nhiên. Anh phải trốn cả cảnh sát lẫn kẻ sát nhân.'
  },
  {
    id: 'sfw-horror-11',
    title: 'Bóng ma trong rạp hát (Màn trình diễn cuối)',
    description: 'Kinh dị - Nghệ thuật và cái chết.',
    content: 'Một nhà hát cũ bị bỏ hoang từ vụ cháy năm xưa. Một nhóm bạn trẻ lẻn vào và thấy sân khấu vẫn sáng đèn, các bóng ma đang diễn lại đêm định mệnh đó.'
  },
  {
    id: 'sfw-horror-12',
    title: 'Xác ướp trong bảo tàng (Cơn thịnh nộ cổ đại)',
    description: 'Kinh dị - Lời nguyền Ai Cập.',
    content: 'Khi một ngôi mộ cổ được trưng bày, những nhân viên bảo vệ bắt đầu thấy những dấu chân đầy cát trên sàn nhà và tiếng thì thầm bằng ngôn ngữ lạ.'
  },
  {
    id: 'sfw-horror-13',
    title: 'Số điện thoại bị nguyền (Cuộc gọi từ địa ngục)',
    description: 'Kinh dị/Urban Legend - Công nghệ và ma quỷ.',
    content: 'Bất kỳ ai nhận cuộc gọi từ số 000-000-000 sẽ nghe thấy tiếng hét của chính mình và gặp tai nạn trong vòng 3 ngày.'
  },
  {
    id: 'sfw-horror-14',
    title: 'Khu vườn tượng đá (Sự sống trong đá)',
    description: 'Kinh dị - Những bức tượng biến đổi.',
    content: 'Mỗi khi chớp mắt, những bức tượng đá trong vườn lại di chuyển lại gần bạn hơn. Bạn nhận ra chúng không phải đá mà là những người đã từng lạc vào đây.'
  },
  {
    id: 'sfw-horror-15',
    title: 'Tiếng cào ngoài cửa (Quái vật trong đêm)',
    description: 'Kinh dị - Nỗi sợ vô hình.',
    content: 'Trong một vùng quê hẻo lánh, mỗi đêm đều có tiếng cào cửa gỗ. Luật lệ duy nhất là: Dù nghe thấy bất kỳ tiếng nói của ai, tuyệt đối không được mở cửa.'
  },
  {
    id: 'sfw-horror-16',
    title: 'Ký ức của kẻ sát nhân (Luân hồi tội lỗi)',
    description: 'Trinh thám/Linh dị - Khi nạn nhân đầu thai.',
    content: 'Một cậu bé 5 tuổi có thể kể chi tiết về vụ án mạng của chính mình ở kiếp trước. Thám tử phụ trách vụ án năm xưa bắt đầu tin vào điều không thể.'
  },
  {
    id: 'sfw-horror-17',
    title: 'Bệnh viện trắng (Nỗi ám ảnh y khoa)',
    description: 'Kinh dị - Những thí nghiệm đen tối.',
    content: 'Tại một bệnh viện tư nhân sang trọng, các bệnh nhân dần biến mất. Nhân vật chính phát hiện ra bác sĩ trưởng đang dùng cơ thể họ để nuôi dưỡng một loài ký sinh bí ẩn.'
  },
  {
    id: 'sfw-horror-18',
    title: 'Hội kín trong rừng (Sự hiến tế)',
    description: 'Kinh dị/Trinh thám - Tà giáo và quyền lực.',
    content: 'Dưới vỏ bọc những buổi cắm trại sang trọng của giới thượng lưu là các nghi lễ hiến tế cổ xưa để đổi lấy quyền lực chính trị.'
  },
  {
    id: 'sfw-horror-19',
    title: 'Bức tranh tự họa (Người trong tranh biến mất)',
    description: 'Linh dị - Nghệ thuật hắc ám.',
    content: 'Mỗi ngày, nhân vật trong bức tranh tự họa của ông nội lại trông già đi, trong khi ông nội anh ở ngoài đời lại trẻ ra một cách bất thường.'
  },
  {
    id: 'sfw-horror-20',
    title: 'Lời nguyền của sách cổ (Đọc để chết)',
    description: 'Kinh dị - Thư viện bí ẩn.',
    content: 'Tiệm sách cũ chứa một quyển sách mô tả chi tiết cách bạn sẽ chết. Ai lỡ đọc trang đầu tiên sẽ bị buộc phải đọc hết cho đến chương cuối cùng.'
  },

  // NỮ CƯỜNG (121-135)
  {
    id: 'sfw-female-1',
    title: 'Nữ Đế trọng sinh (Quyền trượng và Máu)',
    description: 'Nữ cường - Trở lại làm chủ thiên hạ.',
    content: 'Bị chồng sát hại cướp ngôi, nàng trọng sinh về năm 16 tuổi. Lần này nàng chọn quyền lực thay vì tình yêu, dùng trí tuệ thâu tóm binh quyền trở thành nữ đế.'
  },
  {
    id: 'sfw-female-2',
    title: 'Thực Thần Nữ Vương (Hương vị thiên đường)',
    description: 'Nữ cường - Chinh phục giới ẩm thực.',
    content: 'Mồ côi sở hữu "Lưỡi của Chúa", cô bước vào thế giới đầu bếp bị đàn ông thống trị, khẳng định vị thế và tìm lại công lý cho cái chết của cha.'
  },
  {
    id: 'sfw-female-3',
    title: 'Bông hồng thép đô thị (Sự nghiệp kiêu hãnh)',
    description: 'Nữ cường - Đứng đầu tập đoàn mỹ phẩm.',
    content: 'Đối đầu âm mưu thương trường tàn khốc, cô chứng minh phụ nữ có thể đứng trên đỉnh cao quyền lực mà vẫn giữ được sự quyến rũ và trái tim ấm áp.'
  },
  {
    id: 'sfw-female-4',
    title: 'Sau ly hôn, tôi thành tỷ phú',
    description: 'Nữ cường - Hành trình tìm lại bản thân.',
    content: 'Bị phản bội sau 5 năm hy sinh, cô cởi bỏ lớp vỏ bình thường, trở về là người thừa kế duy nhất gia tộc giàu nhất giới, trừng phạt những kẻ coi thường mình.'
  },
  {
    id: 'sfw-female-5',
    title: 'Nữ thần Code (Kỷ nguyên Silicon)',
    description: 'Nữ cường - Trí tuệ vượt thời đại.',
    content: 'Lâm Tuệ là hacker thiên tài liệt đôi chân, trong thế giới ảo cô là "Nữ thần" bất khả chiến bại, dùng tài năng tái phân phối tài sản cho người nghèo.'
  },
  {
    id: 'sfw-female-6',
    title: 'Nữ Tướng quân (Bản hùng ca biên ải)',
    description: 'Nữ cường - Vinh quang và sự hy sinh.',
    content: 'Giả trai thay cha tòng quân, Mộc Lan trở thành vị tướng dũng mãnh nhất, dùng chiến công thuyết phục hoàng đế rằng lòng yêu nước không phân biệt giới tính.'
  },
  {
    id: 'sfw-female-7',
    title: 'Nữ Thám tử tài ba (Vụ án hoa bỉ ngạn)',
    description: 'Nữ cường - Suy luận sắc bén.',
    content: 'Nữ cảnh sát bị đình chỉ công tác tự điều tra cái chết chị gái, phát hiện giáo phái bí ẩn thu nạp thiên kim tiểu thư thực hiện nghi lễ tà ác.'
  },
  {
    id: 'sfw-female-8',
    title: 'Nữ Họa sĩ linh hồn (Nét vẽ định mệnh)',
    description: 'Nữ cường - Sức mạnh từ nghệ thuật.',
    content: 'Mỗi bức tranh vẽ ra đều thành hiện thực. Cô dùng tài năng cứu người nhưng phải học cách vẽ ra "sự tự do" cho mình trước sự tham lam của kẻ mạnh.'
  },
  {
    id: 'sfw-female-9',
    title: 'Nữ Phi công Ace (Bầu trời rực lửa)',
    description: 'Nữ cường - Chinh phục bầu trời.',
    content: 'Trong tương lai cuộc chiến quyết định bằng chiến đấu cơ tiên tiến, nữ phi công trẻ chứng minh bản lĩnh qua các động tác bay không tưởng cứu thủ đô.'
  },
  {
    id: 'sfw-female-10',
    title: 'Nữ vệ sĩ (Bóng đen bảo vệ)',
    description: 'Nữ cường - Sự âm thầm mạnh mẽ.',
    content: 'Cựu đặc vụ bảo vệ cậu chủ nhỏ gia tộc giàu có, đối phó sát thủ bên ngoài và âm mưu bên trong, cứu đứa bé khỏi chấn thương tâm lý.'
  },
  {
    id: 'sfw-female-11',
    title: 'Nữ Phóng viên dấn thân (Sự thật trần trụi)',
    description: 'Nữ cường - Ngòi bút và công lý.',
    content: 'Không ngại hiểm nguy vạch trần đường dây buôn người xuyên biên giới, cô dùng ngòi bút và sự kiên cường để đòi lại công bằng.'
  },
  {
    id: 'sfw-female-12',
    title: 'Bóng ma mạng (Linh hồn dữ liệu)',
    description: 'Nữ cường - Làm chủ thế giới số.',
    content: 'Trong tương lai số hóa, cô là hacker xuyên thấu mọi tường lửa, thực hiện tấn công tổng lực giải phóng con người khỏi AI thống trị.'
  },
  {
    id: 'sfw-female-13',
    title: 'Nữ Khoa học gia (Dự án tái sinh Trái Đất)',
    description: 'Nữ cường/Sci-fi - Trí tuệ cứu thế gian.',
    content: 'Phát minh ra loại tảo hấp thụ ô nhiễm, nàng phải bảo vệ công thức trước sự săn đuổi của các tập đoàn muốn độc quyền nguồn sống.'
  },
  {
    id: 'sfw-female-14',
    title: 'Nữ Thuyền trưởng hải tặc (Vương quốc biển cả)',
    description: 'Nữ cường/Hành động - Sự tự do và phóng khoáng.',
    content: 'Lãnh đạo hạm đội hải tặc, nàng không chỉ đi tìm kho báu mà còn là người bảo vệ các vùng đảo nghèo trước sự bóc lột của hải quân tham nhũng.'
  },
  {
    id: 'sfw-female-15',
    title: 'Nữ Hiệp và Thanh kiếm gãy (Giang hồ tiếu)',
    description: 'Nữ cường/Võ hiệp - Sự dấn thân của lãng nữ.',
    content: 'Một nữ hiệp đơn độc với thanh kiếm gãy, phiêu bạt giang hồ để thực hiện lời hứa cuối cùng với người thầy, dẹp loạn những môn phái giả nhân giả nghĩa.'
  },

  // NHÓM / TEAM (136-150)
  {
    id: 'sfw-group-1',
    title: 'Đội đặc nhiệm bóng đêm (Máu và Tình anh em)',
    description: 'Nhóm/Hành động - Sự phối hợp kẻ bên lề.',
    content: 'Gồm chỉ huy lạnh lùng, hacker lập dị, xạ thủ cô độc, chuyên gia nổ và bác sĩ quá khứ đen tối. Họ gắn kết và hy sinh cho nhau trong nhiệm vụ không tưởng.'
  },
  {
    id: 'sfw-group-2',
    title: 'Đảo hoang sinh tồn (10 ngày nghẹt thở)',
    description: 'Phiêu lưu/Nhóm - Bản năng con người.',
    content: 'Máy bay rơi xuống hòn đảo bí ẩn. Nhóm hành khách đa dạng từ sinh viên đến cảnh sát phải hợp tác tìm nước, thức ăn và chống sinh vật lạ.'
  },
  {
    id: 'sfw-group-3',
    title: 'Huyền thoại E-sports (Con đường ngai vàng)',
    description: 'Nhóm - Khát vọng thế giới ảo.',
    content: 'Đội tuyển giải thể tập hợp lại những kẻ "phế vật" và lính mới tiềm năng, cùng vượt qua thất bại tiến đến vô địch thế giới bằng tinh thần đồng đội.'
  },
  {
    id: 'sfw-group-4',
    title: 'Bộ ba khởi nghiệp (Giấc mơ Silicon)',
    description: 'Nhóm - Khởi nghiệp thay đổi thế giới.',
    content: 'Ba bạn thân tính cách trái ngược phát triển công nghệ AI kết nối linh hồn. Họ đối mặt mua chuộc của tập đoàn và rạn nứt vì quyền lực tiền bạc.'
  },
  {
    id: 'sfw-group-5',
    title: 'Biệt đội săn kho báu (Kim tự tháp bí ẩn)',
    description: 'Nhóm - Thám hiểm đất cổ xưa.',
    content: 'Chuyên gia cổ ngữ, khảo cổ và chuyên gia bẫy rập cùng tìm lăng mộ pharaoh cuối cùng, buộc phải tin tưởng nhau hoàn toàn giữa cạm bẫy chết người.'
  },
  {
    id: 'sfw-group-6',
    title: 'Mặt trận kháng chiến (Ánh sáng tự do)',
    description: 'Nhóm - Đoàn kết là sức mạnh.',
    content: 'Công nhân, sinh viên và trí thức thành lập tổ chức kháng chiến bí mật thành phố bị chiếm đóng, thực hiện chiến dịch phá hoại mang tính quyết định.'
  },
  {
    id: 'sfw-group-7',
    title: 'Biệt đội y tế (Ranh giới sinh tử)',
    description: 'Nhóm - Những người hùng áo trắng.',
    content: 'Tại bệnh viện dã chiến tâm dịch, nhóm bác sĩ trẻ gạt cái tôi cá nhân cùng cứu bệnh nhân, thể hiện sự hy sinh và tình đồng nghiệp nghẹt thở.'
  },
  {
    id: 'sfw-group-8',
    title: 'Học viện không gian (Kỷ nguyên mới)',
    description: 'Nhóm/Sci-fi - Tuổi trẻ hoài bão.',
    content: 'Nhóm học viên phi hành gia trải qua kiểm tra khắc nghiệt, hình thành tình bạn sâu sắc. Khi sự cố trạm vũ trụ xảy ra, sự phối hợp của họ cứu sống hàng ngàn người.'
  },
  {
    id: 'sfw-group-9',
    title: 'Phi vụ thế kỷ (Những kẻ trộm lương thiện)',
    description: 'Nhóm - Kế hoạch hoàn hảo.',
    content: 'Phá khóa, hóa trang, lái xe và thiên tài lên kế hoạch thực hiện vụ trộm sòng bạc lớn, mục tiêu lấy bằng chứng tham nhũng của ứng cử viên thị trưởng.'
  },
  {
    id: 'sfw-group-10',
    title: 'Hội ngộ huyền thoại (Ván đấu cuối cùng)',
    description: 'Nhóm - Sự quay lại của lão tướng.',
    content: 'Nhóm bạn nhà vô địch game 10 năm trước tập hợp lại cứu giúp đồng đội cũ, cùng cầm chuột và bàn phím chứng minh tinh thần xưa cũ.'
  },
  {
    id: 'sfw-group-11',
    title: 'Chinh phục đỉnh tuyết (Sống chết có nhau)',
    description: 'Nhóm - Đối mặt thiên nhiên khắc nghiệt.',
    content: 'Nhóm leo núi nghiệp dư kẹt trong bão tuyết Everest. Hang động hẹp, oxy cạn kiệt là cuộc đấu tranh tâm lý và quyết định hy sinh để người khác sống.'
  },
  {
    id: 'sfw-group-12',
    title: 'Mái ấm vùng biên (Anh em cùng khổ)',
    description: 'Nhóm/Chữa lành - Gia đình không huyết thống.',
    content: 'Trẻ mồ côi nương tựa nhau bản nghèo, chia sẻ mẩu bánh mỳ và bảo vệ nhau khỏi kẻ xấu, vươn lên từ nghịch cảnh bằng tình thương.'
  },
  {
    id: 'sfw-group-13',
    title: 'Dàn nhạc giao hưởng đường phố (Âm thanh thành phố)',
    description: 'Nhóm/Nghệ thuật - Sự hòa quyện âm nhạc.',
    content: 'Những nghệ sĩ tự do tập hợp thành dàn nhạc, dùng âm nhạc để xoa dịu nỗi đau của những người dân nghèo trong thành phố đang bị chia rẽ bởi chiến tranh.'
  },
  {
    id: 'sfw-group-14',
    title: 'Biệt đội cứu hộ động vật (Nhịp đập trái tim)',
    description: 'Nhóm/Chữa lành - Bảo vệ muôn loài.',
    content: 'Một nhóm tình nguyện viên giải cứu động vật hoang dã khỏi các đường dây buôn lậu nguy hiểm, gắn kết bởi tình yêu thiên nhiên vô điều kiện.'
  },
  {
    id: 'sfw-group-15',
    title: 'Quán trọ biên thùy (Nơi hội tụ các anh hùng)',
    description: 'Nhóm/Võ hiệp - Nơi khởi đầu của những huyền thoại.',
    content: 'Chủ quán trọ, tay đầu bếp, cô hầu gái và anh giữ ngựa thực chất là các cao thủ quy ẩn. Họ cùng nhau hợp sức bảo vệ quán trọ trước sự tấn công của các ma đầu.'
  }
];

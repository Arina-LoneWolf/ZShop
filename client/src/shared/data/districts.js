const districts = [
  {
    name: "Quận Hoàn Kiếm",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Hai Bà Trưng",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Ba Đình",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Đống Đa",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Cầu Giấy",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Thanh Xuân",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Tây Hồ",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Hoàng Mai",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Nam Từ Liêm",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Long Biên",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Bắc Từ Liêm",
    provinceName: "Hà Nội"
  },
  {
    name: "Quận Hà Đông",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Ba Vì",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Ứng Hòa",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Mê Linh",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Mỹ Đức",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Phú Xuyên",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Phúc Thọ",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Quốc Oai",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Chương Mỹ",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Đan Phượng",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Đông Anh",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Gia Lâm",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Sóc Sơn",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Hoài Đức",
    provinceName: "Hà Nội"
  },
  {
    name: "Thị xã Sơn Tây",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Thạch Thất",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Thanh Oai",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Thanh Trì",
    provinceName: "Hà Nội"
  },
  {
    name: "Huyện Thường Tín",
    provinceName: "Hà Nội"
  },
  {
    name: "Thành phố Biên Hòa",
    provinceName: "Đồng Nai"
  },
  {
    name: "Thành phố Long Khánh",
    provinceName: "Đồng Nai"
  },
  {
    name: "Huyện Thống Nhất",
    provinceName: "Đồng Nai"
  },
  {
    name: "Huyện Tân Phú",
    provinceName: "Đồng Nai"
  },
  {
    name: "Huyện Định Quán",
    provinceName: "Đồng Nai"
  },
  {
    name: "Huyện Cẩm Mỹ",
    provinceName: "Đồng Nai"
  },
  {
    name: "Huyện Vĩnh Cửu",
    provinceName: "Đồng Nai"
  },
  {
    name: "Huyện Xuân Lộc",
    provinceName: "Đồng Nai"
  },
  {
    name: "Huyện Long Thành",
    provinceName: "Đồng Nai"
  },
  {
    name: "Huyện Nhơn Trạch",
    provinceName: "Đồng Nai"
  },
  {
    name: "Huyện Trảng Bom",
    provinceName: "Đồng Nai"
  },
  {
    name: "Thành phố Thủ Dầu Một",
    provinceName: "Bình Dương"
  },
  {
    name: "Thành phố Dĩ An",
    provinceName: "Bình Dương"
  },
  {
    name: "Thành phố Thuận An",
    provinceName: "Bình Dương"
  },
  {
    name: "Thị xã Bến Cát",
    provinceName: "Bình Dương"
  },
  {
    name: "Thị xã Tân Uyên",
    provinceName: "Bình Dương"
  },
  {
    name: "Huyện Bắc Tân Uyên",
    provinceName: "Bình Dương"
  },
  {
    name: "Huyện Bàu Bàng",
    provinceName: "Bình Dương"
  },
  {
    name: "Huyện Dầu Tiếng",
    provinceName: "Bình Dương"
  },
  {
    name: "Huyện Phú Giáo",
    provinceName: "Bình Dương"
  },
  {
    name: "Quận 1",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 2",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 3",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 4",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 5",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 6",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 7",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 8",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 9",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 10",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 11",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận 12",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận Tân Phú",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận Tân Bình",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận Phú Nhuận",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận Gò Vấp",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận Bình Thạnh",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận Bình Tân",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Quận Thủ Đức",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Huyện Bình Chánh",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Huyện Nhà Bè",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Huyện Hóc Môn",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Huyện Củ Chi",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Huyện Cần Giờ",
    provinceName: "Hồ Chí Minh"
  },
  {
    name: "Huyện Cao Lãnh",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Thành phố Cà Mau",
    provinceName: "Cà Mau"
  },
  {
    name: "Huyện Thới Bình",
    provinceName: "Cà Mau"
  },
  {
    name: "Huyện Trần Văn Thời",
    provinceName: "Cà Mau"
  },
  {
    name: "Huyện Cái Nước",
    provinceName: "Cà Mau"
  },
  {
    name: "Huyện Đầm Dơi",
    provinceName: "Cà Mau"
  },
  {
    name: "Huyện Năm Căn",
    provinceName: "Cà Mau"
  },
  {
    name: "Huyện Ngọc Hiển",
    provinceName: "Cà Mau"
  },
  {
    name: "Huyện Phú Tân",
    provinceName: "Cà Mau"
  },
  {
    name: "Huyện U Minh",
    provinceName: "Cà Mau"
  },
  {
    name: "Thành phố Bạc Liêu",
    provinceName: "Bạc Liêu"
  },
  {
    name: "Thị xã Giá Rai",
    provinceName: "Bạc Liêu"
  },
  {
    name: "Huyện Hòa Bình",
    provinceName: "Bạc Liêu"
  },
  {
    name: "Huyện Vĩnh Lợi",
    provinceName: "Bạc Liêu"
  },
  {
    name: "Huyện Hồng Dân",
    provinceName: "Bạc Liêu"
  },
  {
    name: "Huyện Đông Hải",
    provinceName: "Bạc Liêu"
  },
  {
    name: "Huyện Phước Long",
    provinceName: "Bạc Liêu"
  },
  {
    name: "Thành phố Sóc Trăng",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Thị xã Vĩnh Châu",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Thị xã Ngã Năm",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Huyện Mỹ Xuyên",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Huyện Mỹ Tú",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Huyện Long Phú",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Huyện Thạnh Trị",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Huyện Kế Sách",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Huyện Trần Đề",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Huyện Cù Lao Dung",
    provinceName: "Sóc Trăng"
  },
  {
    name: "Thành phố Ngã Bảy",
    provinceName: "Hậu Giang"
  },
  {
    name: "Thành phố Vị Thanh",
    provinceName: "Hậu Giang"
  },
  {
    name: "Thị xã Long Mỹ",
    provinceName: "Hậu Giang"
  },
  {
    name: "Huyện Vị Thủy",
    provinceName: "Hậu Giang"
  },
  {
    name: "Huyện Châu Thành A",
    provinceName: "Hậu Giang"
  },
  {
    name: "Huyện Phụng Hiệp",
    provinceName: "Hậu Giang"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "Hậu Giang"
  },
  {
    name: "Quận Cái Răng",
    provinceName: "Cần Thơ"
  },
  {
    name: "Quận Bình Thủy",
    provinceName: "Cần Thơ"
  },
  {
    name: "Quận Ninh Kiều",
    provinceName: "Cần Thơ"
  },
  {
    name: "Quận Ô Môn",
    provinceName: "Cần Thơ"
  },
  {
    name: "Quận Thốt Nốt",
    provinceName: "Cần Thơ"
  },
  {
    name: "Huyện Phong Điền",
    provinceName: "Cần Thơ"
  },
  {
    name: "Huyện Cờ Đỏ",
    provinceName: "Cần Thơ"
  },
  {
    name: "Huyện Vĩnh Thạnh",
    provinceName: "Cần Thơ"
  },
  {
    name: "Huyện Thới Lai",
    provinceName: "Cần Thơ"
  },
  {
    name: "Thành phố Hà Tiên",
    provinceName: "Kiên Giang"
  },
  {
    name: "Thành phố Rạch Giá",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Gò Quao",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện An Biên",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện An Minh",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Giồng Riềng",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Phú Quốc",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện U Minh Thượng",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Giang Thành",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Kiên Hải",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Vĩnh Thuận",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Tân Hiệp",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Kiên Lương",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Hòn Đất",
    provinceName: "Kiên Giang"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "Kiên Giang"
  },
  {
    name: "Thành phố Châu Đốc",
    provinceName: "An Giang"
  },
  {
    name: "Thành phố Long Xuyên",
    provinceName: "An Giang"
  },
  {
    name: "Thị xã Tân Châu",
    provinceName: "An Giang"
  },
  {
    name: "Huyện Tri Tôn",
    provinceName: "An Giang"
  },
  {
    name: "Huyện An Phú",
    provinceName: "An Giang"
  },
  {
    name: "Huyện Chợ Mới",
    provinceName: "An Giang"
  },
  {
    name: "Huyện Châu Phú",
    provinceName: "An Giang"
  },
  {
    name: "Huyện Thoại Sơn",
    provinceName: "An Giang"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "An Giang"
  },
  {
    name: "Huyện Tịnh Biên",
    provinceName: "An Giang"
  },
  {
    name: "Huyện Phú Tân",
    provinceName: "An Giang"
  },
  {
    name: "Thành phố Cao Lãnh",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Thành phố Sa Đéc",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Thị xã Hồng Ngự",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Huyện Tháp Mười",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Huyện Tân Hồng",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Huyện Hồng Ngự",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Huyện Lấp Vò",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Huyện Tam Nông",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Huyện Thanh Bình",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Huyện Lai Vung",
    provinceName: "Đồng Tháp"
  },
  {
    name: "Thành phố Vĩnh Long",
    provinceName: "Vĩnh Long"
  },
  {
    name: "Thị xã Bình Minh",
    provinceName: "Vĩnh Long"
  },
  {
    name: "Huyện Tam Bình",
    provinceName: "Vĩnh Long"
  },
  {
    name: "Huyện Vũng Liêm",
    provinceName: "Vĩnh Long"
  },
  {
    name: "Huyện Trà Ôn",
    provinceName: "Vĩnh Long"
  },
  {
    name: "Huyện Mang Thít",
    provinceName: "Vĩnh Long"
  },
  {
    name: "Huyện Long Hồ",
    provinceName: "Vĩnh Long"
  },
  {
    name: "Huyện Bình Tân",
    provinceName: "Vĩnh Long"
  },
  {
    name: "Thành phố Trà Vinh",
    provinceName: "Trà Vinh"
  },
  {
    name: "Thị xã Duyên Hải",
    provinceName: "Trà Vinh"
  },
  {
    name: "Huyện Trà Cú",
    provinceName: "Trà Vinh"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "Trà Vinh"
  },
  {
    name: "Huyện Cầu Kè",
    provinceName: "Trà Vinh"
  },
  {
    name: "Huyện Cầu Ngang",
    provinceName: "Trà Vinh"
  },
  {
    name: "Huyện Tiểu Cần",
    provinceName: "Trà Vinh"
  },
  {
    name: "Huyện Càng Long",
    provinceName: "Trà Vinh"
  },
  {
    name: "Thành phố Bến Tre",
    provinceName: "Bến Tre"
  },
  {
    name: "Huyện Thạnh Phú",
    provinceName: "Bến Tre"
  },
  {
    name: "Huyện Mỏ Cày Nam",
    provinceName: "Bến Tre"
  },
  {
    name: "Huyện Mỏ Cày Bắc",
    provinceName: "Bến Tre"
  },
  {
    name: "Huyện Giồng Trôm",
    provinceName: "Bến Tre"
  },
  {
    name: "Huyện Chợ Lách",
    provinceName: "Bến Tre"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "Bến Tre"
  },
  {
    name: "Huyện Bình Đại",
    provinceName: "Bến Tre"
  },
  {
    name: "Huyện Ba Tri",
    provinceName: "Bến Tre"
  },
  {
    name: "Thành phố Mỹ Tho",
    provinceName: "Tiền Giang"
  },
  {
    name: "Thị xã Cai Lậy",
    provinceName: "Tiền Giang"
  },
  {
    name: "Thị xã Gò Công",
    provinceName: "Tiền Giang"
  },
  {
    name: "Huyện Cái Bè",
    provinceName: "Tiền Giang"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "Tiền Giang"
  },
  {
    name: "Huyện Chợ Gạo",
    provinceName: "Tiền Giang"
  },
  {
    name: "Huyện Gò Công Đông",
    provinceName: "Tiền Giang"
  },
  {
    name: "Huyện Gò Công Tây",
    provinceName: "Tiền Giang"
  },
  {
    name: "Huyện Tân Phú Đông",
    provinceName: "Tiền Giang"
  },
  {
    name: "Huyện Tân Phước",
    provinceName: "Tiền Giang"
  },
  {
    name: "Thành phố Tân An",
    provinceName: "Long An"
  },
  {
    name: "Thị xã Kiến Tường",
    provinceName: "Long An"
  },
  {
    name: "Huyện Tân Trụ",
    provinceName: "Long An"
  },
  {
    name: "Huyện Tân Thạnh",
    provinceName: "Long An"
  },
  {
    name: "Huyện Thạnh Hóa",
    provinceName: "Long An"
  },
  {
    name: "Huyện Thủ Thừa",
    provinceName: "Long An"
  },
  {
    name: "Huyện Tân Hưng",
    provinceName: "Long An"
  },
  {
    name: "Huyện Mộc Hóa",
    provinceName: "Long An"
  },
  {
    name: "Huyện Đức Huệ",
    provinceName: "Long An"
  },
  {
    name: "Huyện Đức Hòa",
    provinceName: "Long An"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "Long An"
  },
  {
    name: "Huyện Cần Giuộc",
    provinceName: "Long An"
  },
  {
    name: "Huyện Cần Đước",
    provinceName: "Long An"
  },
  {
    name: "Huyện Bến Lức",
    provinceName: "Long An"
  },
  {
    name: "Huyện Vĩnh Hưng",
    provinceName: "Long An"
  },
  {
    name: "Thành phố Vũng Tàu",
    provinceName: "Bà Rịa Vũng Tàu"
  },
  {
    name: "Thành phố Bà Rịa",
    provinceName: "Bà Rịa Vũng Tàu"
  },
  {
    name: "Thị xã Phú Mỹ",
    provinceName: "Bà Rịa Vũng Tàu"
  },
  {
    name: "Huyện Châu Đức",
    provinceName: "Bà Rịa Vũng Tàu"
  },
  {
    name: "Côn Đảo",
    provinceName: "Bà Rịa Vũng Tàu"
  },
  {
    name: "Huyện Long Điền",
    provinceName: "Bà Rịa Vũng Tàu"
  },
  {
    name: "Huyện Đất Đỏ",
    provinceName: "Bà Rịa Vũng Tàu"
  },
  {
    name: "Huyện Xuyên Mộc",
    provinceName: "Bà Rịa Vũng Tàu"
  },
  {
    name: "Thành phố Tây Ninh",
    provinceName: "Tây Ninh"
  },
  {
    name: "Thị xã Trảng Bàng",
    provinceName: "Tây Ninh"
  },
  {
    name: "Thị xã Hòa Thành",
    provinceName: "Tây Ninh"
  },
  {
    name: "Huyện Tân Biên",
    provinceName: "Tây Ninh"
  },
  {
    name: "Huyện Gò Dầu",
    provinceName: "Tây Ninh"
  },
  {
    name: "Huyện Dương Minh Châu",
    provinceName: "Tây Ninh"
  },
  {
    name: "Huyện Bến Cầu",
    provinceName: "Tây Ninh"
  },
  {
    name: "Huyện Châu Thành",
    provinceName: "Tây Ninh"
  },
  {
    name: "Huyện Tân Châu",
    provinceName: "Tây Ninh"
  },
  {
    name: "Thành phố Đồng Xoài",
    provinceName: "Bình Phước"
  },
  {
    name: "Thị xã Phước Long",
    provinceName: "Bình Phước"
  },
  {
    name: "Thị xã Bình Long",
    provinceName: "Bình Phước"
  },
  {
    name: "Huyện Bù Đăng",
    provinceName: "Bình Phước"
  },
  {
    name: "Huyện Bù Đốp",
    provinceName: "Bình Phước"
  },
  {
    name: "Huyện Bù Gia Mập",
    provinceName: "Bình Phước"
  },
  {
    name: "Huyện Chơn Thành",
    provinceName: "Bình Phước"
  },
  {
    name: "Huyện Đồng Phú",
    provinceName: "Bình Phước"
  },
  {
    name: "Huyện Hớn Quản",
    provinceName: "Bình Phước"
  },
  {
    name: "Huyện Lộc Ninh",
    provinceName: "Bình Phước"
  },
  {
    name: "Thành phố Đà Lạt",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Thành phố Bảo Lộc",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Cát Tiên",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Di Linh",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Đạ Tẻh",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Đam Rông",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Đức Trọng",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Lạc Dương",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Lâm Hà",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Đạ Huoai",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Đơn Dương",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Huyện Bảo Lâm",
    provinceName: "Lâm Đồng"
  },
  {
    name: "Thành phố Gia Nghĩa",
    provinceName: "Đắk Nông"
  },
  {
    name: "Huyện Đắk Mil",
    provinceName: "Đắk Nông"
  },
  {
    name: "Huyện Cư Jút",
    provinceName: "Đắk Nông"
  },
  {
    name: "Huyện Đăk Glong",
    provinceName: "Đắk Nông"
  },
  {
    name: "Huyện Đắk RLấp",
    provinceName: "Đắk Nông"
  },
  {
    name: "Huyện Đắk Song",
    provinceName: "Đắk Nông"
  },
  {
    name: "Huyện Krông Nô",
    provinceName: "Đắk Nông"
  },
  {
    name: "Huyện Tuy Đức",
    provinceName: "Đắk Nông"
  },
  {
    name: "Thành phố Buôn Ma Thuột",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Thị Xã Buôn Hồ",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện MĐrắk",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Lắk",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Krông Pắc",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Krông Năng",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Cư Mgar",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Krông A Na",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Krông Búk",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Cư Kuin",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Ea Súp",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Ea Hleo",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Krông Bông",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Buôn Đôn",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Huyện Ea Kar",
    provinceName: "Đắk Lắk"
  },
  {
    name: "Thành phố Pleiku",
    provinceName: "Gia Lai"
  },
  {
    name: "Thị xã An Khê",
    provinceName: "Gia Lai"
  },
  {
    name: "Thị xã Ayun Pa",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Ia Grai",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Đức Cơ",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Đăk Pơ",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Đăk Đoa",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Chư Sê",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Chư Pưh",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Chư Prông",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Chư Păh",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Krông Pa",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Kông Chro",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Phú Thiện",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Mang Yang",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện Ia Pa",
    provinceName: "Gia Lai"
  },
  {
    name: "Huyện KBang",
    provinceName: "Gia Lai"
  },
  {
    name: "Thành phố Kon Tum",
    provinceName: "Kon Tum"
  },
  {
    name: "Huyện Đắk Hà",
    provinceName: "Kon Tum"
  },
  {
    name: "Huyện Đắk Tô",
    provinceName: "Kon Tum"
  },
  {
    name: "Huyện Tu Mơ Rông",
    provinceName: "Kon Tum"
  },
  {
    name: "Huyện Kon Plông",
    provinceName: "Kon Tum"
  },
  {
    name: "Huyện Kon Rẫy",
    provinceName: "Kon Tum"
  },
  {
    name: "Huyện Ngọc Hồi",
    provinceName: "Kon Tum"
  },
  {
    name: "Huyện Sa Thầy",
    provinceName: "Kon Tum"
  },
  {
    name: "Huyện Đắk Glei",
    provinceName: "Kon Tum"
  },
  {
    name: "Thành phố Phan Thiết",
    provinceName: "Bình Thuận"
  },
  {
    name: "Thị xã La Gi",
    provinceName: "Bình Thuận"
  },
  {
    name: "Huyện Hàm Tân",
    provinceName: "Bình Thuận"
  },
  {
    name: "Huyện Bắc Bình",
    provinceName: "Bình Thuận"
  },
  {
    name: "Huyện Đức Linh",
    provinceName: "Bình Thuận"
  },
  {
    name: "Huyện Hàm Thuận Bắc",
    provinceName: "Bình Thuận"
  },
  {
    name: "Huyện Hàm Thuận Nam",
    provinceName: "Bình Thuận"
  },
  {
    name: "Huyện Phú Quí",
    provinceName: "Bình Thuận"
  },
  {
    name: "Huyện Tánh Linh",
    provinceName: "Bình Thuận"
  },
  {
    name: "Huyện Tuy Phong",
    provinceName: "Bình Thuận"
  },
  {
    name: "Thành phố Phan Rang Tháp Chàm",
    provinceName: "Ninh Thuận"
  },
  {
    name: "Huyện Ninh Phước",
    provinceName: "Ninh Thuận"
  },
  {
    name: "Huyện Ninh Hải",
    provinceName: "Ninh Thuận"
  },
  {
    name: "Huyện Bác Ái",
    provinceName: "Ninh Thuận"
  },
  {
    name: "Huyện Thuận Bắc",
    provinceName: "Ninh Thuận"
  },
  {
    name: "Huyện Ninh Sơn",
    provinceName: "Ninh Thuận"
  },
  {
    name: "Huyện Thuận Nam",
    provinceName: "Ninh Thuận"
  },
  {
    name: "Thành phố Cam Ranh",
    provinceName: "Khánh Hòa"
  },
  {
    name: "Thành phố Nha Trang",
    provinceName: "Khánh Hòa"
  },
  {
    name: "Thị xã Ninh Hòa",
    provinceName: "Khánh Hòa"
  },
  {
    name: "Huyện Trường Sa",
    provinceName: "Khánh Hòa"
  },
  {
    name: "Huyện Cam Lâm",
    provinceName: "Khánh Hòa"
  },
  {
    name: "Huyện Diên Khánh",
    provinceName: "Khánh Hòa"
  },
  {
    name: "Huyện Khánh Sơn",
    provinceName: "Khánh Hòa"
  },
  {
    name: "Huyện Khánh Vĩnh",
    provinceName: "Khánh Hòa"
  },
  {
    name: "Huyện Vạn Ninh",
    provinceName: "Khánh Hòa"
  },
  {
    name: "Thành phố Tuy Hòa",
    provinceName: "Phú Yên"
  },
  {
    name: "Thị xã Đông Hòa",
    provinceName: "Phú Yên"
  },
  {
    name: "Thị xã Sông Cầu",
    provinceName: "Phú Yên"
  },
  {
    name: "Huyện Tuy An",
    provinceName: "Phú Yên"
  },
  {
    name: "Huyện Phú Hòa",
    provinceName: "Phú Yên"
  },
  {
    name: "Huyện Sông Hinh",
    provinceName: "Phú Yên"
  },
  {
    name: "Huyện Sơn Hòa",
    provinceName: "Phú Yên"
  },
  {
    name: "Huyện Tây Hòa",
    provinceName: "Phú Yên"
  },
  {
    name: "Huyện Đồng Xuân",
    provinceName: "Phú Yên"
  },
  {
    name: "Thành phố Qui Nhơn",
    provinceName: "Bình Định"
  },
  {
    name: "Thị xã An Nhơn",
    provinceName: "Bình Định"
  },
  {
    name: "Thị xã Hoài Nhơn",
    provinceName: "Bình Định"
  },
  {
    name: "Huyện Tây Sơn",
    provinceName: "Bình Định"
  },
  {
    name: "Huyện An Lão",
    provinceName: "Bình Định"
  },
  {
    name: "Huyện Hoài Ân",
    provinceName: "Bình Định"
  },
  {
    name: "Huyện Phù Cát",
    provinceName: "Bình Định"
  },
  {
    name: "Huyện Phù Mỹ",
    provinceName: "Bình Định"
  },
  {
    name: "Huyện Tuy Phước",
    provinceName: "Bình Định"
  },
  {
    name: "Huyện Vân Canh",
    provinceName: "Bình Định"
  },
  {
    name: "Huyện Vĩnh Thạnh",
    provinceName: "Bình Định"
  },
  {
    name: "Thành phố Quảng Ngãi",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Thị xã Đức Phổ",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Bình Sơn",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Lý Sơn",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Mộ Đức",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Nghĩa Hành",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Sơn Hà",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Sơn Tây",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Sơn Tịnh",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Tư Nghĩa",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Trà Bồng",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Tây Trà",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Ba Tơ",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Huyện Minh Long",
    provinceName: "Quảng Ngãi"
  },
  {
    name: "Thành phố Tam Kỳ",
    provinceName: "Quảng Nam"
  },
  {
    name: "Thành phố Hội An",
    provinceName: "Quảng Nam"
  },
  {
    name: "Thị xã Điện Bàn",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Nông Sơn",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Quế Sơn",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Tây Giang",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Tiên Phước",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Duy Xuyên",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Bắc Trà My",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Đại Lộc",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Đông Giang",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Hiệp Đức",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Nam Giang",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Nam Trà My",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Phước Sơn",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Núi Thành",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Phú Ninh",
    provinceName: "Quảng Nam"
  },
  {
    name: "Huyện Thăng Bình",
    provinceName: "Quảng Nam"
  },
  {
    name: "Quận Thanh Khê",
    provinceName: "Đà Nẵng"
  },
  {
    name: "Quận Liên Chiểu",
    provinceName: "Đà Nẵng"
  },
  {
    name: "Quận Hải Châu",
    provinceName: "Đà Nẵng"
  },
  {
    name: "Quận Cẩm Lệ",
    provinceName: "Đà Nẵng"
  },
  {
    name: "Quận Ngũ Hành Sơn",
    provinceName: "Đà Nẵng"
  },
  {
    name: "Quận Sơn Trà",
    provinceName: "Đà Nẵng"
  },
  {
    name: "Huyện Hòa Vang",
    provinceName: "Đà Nẵng"
  },
  {
    name: "Hoàng Sa",
    provinceName: "Đà Nẵng"
  },
  {
    name: "Thành phố Huế",
    provinceName: "Thừa Thiên Huế"
  },
  {
    name: "Thị xã Hương Trà",
    provinceName: "Thừa Thiên Huế"
  },
  {
    name: "Thị xã Hương Thủy",
    provinceName: "Thừa Thiên Huế"
  },
  {
    name: "Huyện Quảng Điền",
    provinceName: "Thừa Thiên Huế"
  },
  {
    name: "Huyện Phú Vang",
    provinceName: "Thừa Thiên Huế"
  },
  {
    name: "Huyện Phú Lộc",
    provinceName: "Thừa Thiên Huế"
  },
  {
    name: "Huyện Phong Điền",
    provinceName: "Thừa Thiên Huế"
  },
  {
    name: "Huyện Nam Đông",
    provinceName: "Thừa Thiên Huế"
  },
  {
    name: "Huyện A Lưới",
    provinceName: "Thừa Thiên Huế"
  },
  {
    name: "Thành phố Đông Hà",
    provinceName: "Quảng Trị"
  },
  {
    name: "Thị xã Quảng Trị",
    provinceName: "Quảng Trị"
  },
  {
    name: "Huyện Hướng Hóa",
    provinceName: "Quảng Trị"
  },
  {
    name: "Huyện Gio Linh",
    provinceName: "Quảng Trị"
  },
  {
    name: "Huyện Triệu Phong",
    provinceName: "Quảng Trị"
  },
  {
    name: "Cồn Cỏ",
    provinceName: "Quảng Trị"
  },
  {
    name: "Huyện Đa Krông",
    provinceName: "Quảng Trị"
  },
  {
    name: "Huyện Cam Lộ",
    provinceName: "Quảng Trị"
  },
  {
    name: "Huyện Hải Lăng",
    provinceName: "Quảng Trị"
  },
  {
    name: "Huyện Vĩnh Linh",
    provinceName: "Quảng Trị"
  },
  {
    name: "Thành Phố Đồng Hới",
    provinceName: "Quảng Bình"
  },
  {
    name: "Thị xã Ba Đồn",
    provinceName: "Quảng Bình"
  },
  {
    name: "Huyện Minh Hóa",
    provinceName: "Quảng Bình"
  },
  {
    name: "Huyện Quảng Ninh",
    provinceName: "Quảng Bình"
  },
  {
    name: "Huyện Quảng Trạch",
    provinceName: "Quảng Bình"
  },
  {
    name: "Huyện Tuyên Hóa",
    provinceName: "Quảng Bình"
  },
  {
    name: "Huyện Bố Trạch",
    provinceName: "Quảng Bình"
  },
  {
    name: "Huyện Lệ Thủy",
    provinceName: "Quảng Bình"
  },
  {
    name: "Thành phố Hà Tĩnh",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Thị xã Hồng Lĩnh",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Thị xã Kỳ Anh",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Can Lộc",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Đức Thọ",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Hương Sơn",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Lộc Hà",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Nghi Xuân",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Hương Khê",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Thạch Hà",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Vũ Quang",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Cẩm Xuyên",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Thành phố Vinh",
    provinceName: "Nghệ An"
  },
  {
    name: "Thị xã Hoàng Mai",
    provinceName: "Nghệ An"
  },
  {
    name: "Thị xã Cửa Lò",
    provinceName: "Nghệ An"
  },
  {
    name: "Thị xã Thái Hòa",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Con Cuông",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Quế Phong",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Quỳ Châu",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Quỳ Hợp",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Quỳnh Lưu",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Tân Kỳ",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Tương Dương",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Thanh Chương",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Yên Thành",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Kỳ Sơn",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Hưng Nguyên",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Đô Lương",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Diễn Châu",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Nghĩa Đàn",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Anh Sơn",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Nam Đàn",
    provinceName: "Nghệ An"
  },
  {
    name: "Huyện Nghi Lộc",
    provinceName: "Nghệ An"
  },
  {
    name: "Thành phố Sầm Sơn",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Thành phố Thanh Hóa",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Thị xã Bỉm Sơn",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Thị xã Nghi Sơn",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Thiệu Hóa",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Cẩm Thủy",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Đông Sơn",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Hà Trung",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Hậu Lộc",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Hoằng Hóa",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Lang Chánh",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Mường Lát",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Nông Cống",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Nga Sơn",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Ngọc Lặc",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Như Thanh",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Như Xuân",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Quan Hóa",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Quan Sơn",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Quảng Xương",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Thạch Thành",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Thọ Xuân",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Thường Xuân",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Triệu Sơn",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Vĩnh Lộc",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Yên Định",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Huyện Bá Thước",
    provinceName: "Thanh Hóa"
  },
  {
    name: "Thành phố Tam Điệp",
    provinceName: "Ninh Bình"
  },
  {
    name: "Thành phố Ninh Bình",
    provinceName: "Ninh Bình"
  },
  {
    name: "Huyện Yên Mô",
    provinceName: "Ninh Bình"
  },
  {
    name: "Huyện Yên Khánh",
    provinceName: "Ninh Bình"
  },
  {
    name: "Huyện Nho Quan",
    provinceName: "Ninh Bình"
  },
  {
    name: "Huyện Kim Sơn",
    provinceName: "Ninh Bình"
  },
  {
    name: "Huyện Hoa Lư",
    provinceName: "Ninh Bình"
  },
  {
    name: "Huyện Gia Viễn",
    provinceName: "Ninh Bình"
  },
  {
    name: "Thành phố Nam Định",
    provinceName: "Nam Định"
  },
  {
    name: "Huyện Giao Thủy",
    provinceName: "Nam Định"
  },
  {
    name: "Huyện Ý Yên",
    provinceName: "Nam Định"
  },
  {
    name: "Huyện Xuân Trường",
    provinceName: "Nam Định"
  },
  {
    name: "Huyện Vụ Bản",
    provinceName: "Nam Định"
  },
  {
    name: "Huyện Trực Ninh",
    provinceName: "Nam Định"
  },
  {
    name: "Huyện Mỹ Lộc",
    provinceName: "Nam Định"
  },
  {
    name: "Huyện Hải Hậu",
    provinceName: "Nam Định"
  },
  {
    name: "Huyện Nghĩa Hưng",
    provinceName: "Nam Định"
  },
  {
    name: "Huyện Nam Trực",
    provinceName: "Nam Định"
  },
  {
    name: "Thành phố Phủ Lý",
    provinceName: "Hà Nam"
  },
  {
    name: "Thị xã Duy Tiên",
    provinceName: "Hà Nam"
  },
  {
    name: "Huyện Kim Bảng",
    provinceName: "Hà Nam"
  },
  {
    name: "Huyện Bình Lục",
    provinceName: "Hà Nam"
  },
  {
    name: "Huyện Thanh Liêm",
    provinceName: "Hà Nam"
  },
  {
    name: "Huyện Lý Nhân",
    provinceName: "Hà Nam"
  },
  {
    name: "Thành phố Thái Bình",
    provinceName: "Thái Bình"
  },
  {
    name: "Huyện Tiền Hải",
    provinceName: "Thái Bình"
  },
  {
    name: "Huyện Quỳnh Phụ",
    provinceName: "Thái Bình"
  },
  {
    name: "Huyện Hưng Hà",
    provinceName: "Thái Bình"
  },
  {
    name: "Huyện Đông Hưng",
    provinceName: "Thái Bình"
  },
  {
    name: "Huyện Vũ Thư",
    provinceName: "Thái Bình"
  },
  {
    name: "Huyện Kiến Xương",
    provinceName: "Thái Bình"
  },
  {
    name: "Huyện Thái Thụy",
    provinceName: "Thái Bình"
  },
  {
    name: "Thành phố Hưng Yên",
    provinceName: "Hưng Yên"
  },
  {
    name: "Thị xã Mỹ Hào",
    provinceName: "Hưng Yên"
  },
  {
    name: "Huyện Ân Thi",
    provinceName: "Hưng Yên"
  },
  {
    name: "Huyện Phù Cừ",
    provinceName: "Hưng Yên"
  },
  {
    name: "Huyện Tiên Lữ",
    provinceName: "Hưng Yên"
  },
  {
    name: "Huyện Kim Động",
    provinceName: "Hưng Yên"
  },
  {
    name: "Huyện Văn Giang",
    provinceName: "Hưng Yên"
  },
  {
    name: "Huyện Văn Lâm",
    provinceName: "Hưng Yên"
  },
  {
    name: "Huyện Yên Mỹ",
    provinceName: "Hưng Yên"
  },
  {
    name: "Huyện Khoái Châu",
    provinceName: "Hưng Yên"
  },
  {
    name: "Quận Hải An",
    provinceName: "Hải Phòng"
  },
  {
    name: "Quận Ngô Quyền",
    provinceName: "Hải Phòng"
  },
  {
    name: "Quận Lê Chân",
    provinceName: "Hải Phòng"
  },
  {
    name: "Quận Hồng Bàng",
    provinceName: "Hải Phòng"
  },
  {
    name: "Quận Đồ Sơn",
    provinceName: "Hải Phòng"
  },
  {
    name: "Quận Dương Kinh",
    provinceName: "Hải Phòng"
  },
  {
    name: "Quận Kiến An",
    provinceName: "Hải Phòng"
  },
  {
    name: "Huyện Kiến Thụy",
    provinceName: "Hải Phòng"
  },
  {
    name: "Huyện Cát Hải",
    provinceName: "Hải Phòng"
  },
  {
    name: "Huyện Tiên Lãng",
    provinceName: "Hải Phòng"
  },
  {
    name: "Huyện An Lão",
    provinceName: "Hải Phòng"
  },
  {
    name: "Huyện An Dương",
    provinceName: "Hải Phòng"
  },
  {
    name: "Bạch Long Vĩ",
    provinceName: "Hải Phòng"
  },
  {
    name: "Huyện Vĩnh Bảo",
    provinceName: "Hải Phòng"
  },
  {
    name: "Huyện Thủy Nguyên",
    provinceName: "Hải Phòng"
  },
  {
    name: "Thành phố Chí Linh",
    provinceName: "Hải Dương"
  },
  {
    name: "Thành phố Hải Dương",
    provinceName: "Hải Dương"
  },
  {
    name: "Thị xã Kinh Môn",
    provinceName: "Hải Dương"
  },
  {
    name: "Huyện Bình Giang",
    provinceName: "Hải Dương"
  },
  {
    name: "Huyện Gia Lộc",
    provinceName: "Hải Dương"
  },
  {
    name: "Huyện Cẩm Giàng",
    provinceName: "Hải Dương"
  },
  {
    name: "Huyện Thanh Miện",
    provinceName: "Hải Dương"
  },
  {
    name: "Huyện Thanh Hà",
    provinceName: "Hải Dương"
  },
  {
    name: "Huyện Tứ Kỳ",
    provinceName: "Hải Dương"
  },
  {
    name: "Huyện Ninh Giang",
    provinceName: "Hải Dương"
  },
  {
    name: "Huyện Nam Sách",
    provinceName: "Hải Dương"
  },
  {
    name: "Huyện Kim Thành",
    provinceName: "Hải Dương"
  },
  {
    name: "Thành phố Bắc Ninh",
    provinceName: "Bắc Ninh"
  },
  {
    name: "Thị xã Từ Sơn",
    provinceName: "Bắc Ninh"
  },
  {
    name: "Huyện Lương Tài",
    provinceName: "Bắc Ninh"
  },
  {
    name: "Huyện Yên Phong",
    provinceName: "Bắc Ninh"
  },
  {
    name: "Huyện Tiên Du",
    provinceName: "Bắc Ninh"
  },
  {
    name: "Huyện Quế Võ",
    provinceName: "Bắc Ninh"
  },
  {
    name: "Huyện Thuận Thành",
    provinceName: "Bắc Ninh"
  },
  {
    name: "Huyện Gia Bình",
    provinceName: "Bắc Ninh"
  },
  {
    name: "Thành phố Vĩnh Yên",
    provinceName: "Vĩnh Phúc"
  },
  {
    name: "Thành phố Phúc Yên",
    provinceName: "Vĩnh Phúc"
  },
  {
    name: "Huyện Yên Lạc",
    provinceName: "Vĩnh Phúc"
  },
  {
    name: "Huyện Lập Thạch",
    provinceName: "Vĩnh Phúc"
  },
  {
    name: "Huyện Bình Xuyên",
    provinceName: "Vĩnh Phúc"
  },
  {
    name: "Huyện Vĩnh Tường",
    provinceName: "Vĩnh Phúc"
  },
  {
    name: "Huyện Sông Lô",
    provinceName: "Vĩnh Phúc"
  },
  {
    name: "Huyện Tam Đảo",
    provinceName: "Vĩnh Phúc"
  },
  {
    name: "Huyện Tam Dương",
    provinceName: "Vĩnh Phúc"
  },
  {
    name: "Thành phố Việt Trì",
    provinceName: "Phú Thọ"
  },
  {
    name: "Thị xã Phú Thọ",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Phù Ninh",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Tam Nông",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Tân Sơn",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Thanh Ba",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Thanh Sơn",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Thanh Thủy",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Yên Lập",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Hạ Hòa",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Lâm Thao",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Cẩm Khê",
    provinceName: "Phú Thọ"
  },
  {
    name: "Huyện Đoan Hùng",
    provinceName: "Phú Thọ"
  },
  {
    name: "Thành phố Bắc Giang",
    provinceName: "Bắc Giang"
  },
  {
    name: "Huyện Tân Yên",
    provinceName: "Bắc Giang"
  },
  {
    name: "Huyện Sơn Động",
    provinceName: "Bắc Giang"
  },
  {
    name: "Huyện Lục Ngạn",
    provinceName: "Bắc Giang"
  },
  {
    name: "Huyện Lục Nam",
    provinceName: "Bắc Giang"
  },
  {
    name: "Huyện Lạng Giang",
    provinceName: "Bắc Giang"
  },
  {
    name: "Huyện Hiệp Hòa",
    provinceName: "Bắc Giang"
  },
  {
    name: "Huyện Yên Thế",
    provinceName: "Bắc Giang"
  },
  {
    name: "Huyện Việt Yên",
    provinceName: "Bắc Giang"
  },
  {
    name: "Huyện Yên Dũng",
    provinceName: "Bắc Giang"
  },
  {
    name: "Thành phố Cẩm Phả",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Thành phố Móng Cái",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Thành phố Uông Bí",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Thành phố Hạ Long",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Thị xã Quảng Yên",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Thị xã Đông Triều",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Huyện Ba Chẽ",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Huyện Bình Liêu",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Huyện Cô Tô",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Huyện Vân Đồn",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Huyện Tiên Yên",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Hoành Bồ",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Huyện Đầm Hà",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Huyện Hải Hà",
    provinceName: "Quảng Ninh"
  },
  {
    name: "Thành phố Lạng Sơn",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Văn Lãng",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Đình Lập",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Chi Lăng",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Bắc Sơn",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Tràng Định",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Bình Gia",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Lộc Bình",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Văn Quan",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Hữu Lũng",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Huyện Cao Lộc",
    provinceName: "Lạng Sơn"
  },
  {
    name: "Thành phố Thái Nguyên",
    provinceName: "Thái Nguyên"
  },
  {
    name: "Thành phố Sông Công",
    provinceName: "Thái Nguyên"
  },
  {
    name: "Thị xã Phổ Yên",
    provinceName: "Thái Nguyên"
  },
  {
    name: "Huyện Võ Nhai",
    provinceName: "Thái Nguyên"
  },
  {
    name: "Huyện Định Hóa",
    provinceName: "Thái Nguyên"
  },
  {
    name: "Huyện Đại Từ",
    provinceName: "Thái Nguyên"
  },
  {
    name: "Huyện Đồng Hỷ",
    provinceName: "Thái Nguyên"
  },
  {
    name: "Huyện Phú Bình",
    provinceName: "Thái Nguyên"
  },
  {
    name: "Huyện Phú Lương",
    provinceName: "Thái Nguyên"
  },
  {
    name: "Thành phố Hòa Bình",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Tân Lạc",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Đà Bắc",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Kim Bôi",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Lạc Sơn",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Lạc Thủy",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Lương Sơn",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Mai Châu",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Yên Thủy",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Duyên Hải",
    provinceName: "Hòa Bình"
  },
  {
    name: "Huyện Cao Phong",
    provinceName: "Hòa Bình"
  },
  {
    name: "Thành phố Yên Bái",
    provinceName: "Yên Bái"
  },
  {
    name: "Thị xã Nghĩa Lộ",
    provinceName: "Yên Bái"
  },
  {
    name: "Huyện Lục Yên",
    provinceName: "Yên Bái"
  },
  {
    name: "Huyện Văn Chấn",
    provinceName: "Yên Bái"
  },
  {
    name: "Huyện Văn Yên",
    provinceName: "Yên Bái"
  },
  {
    name: "Huyện Trấn Yên",
    provinceName: "Yên Bái"
  },
  {
    name: "Huyện Yên Bình",
    provinceName: "Yên Bái"
  },
  {
    name: "Huyện Mù Căng Chải",
    provinceName: "Yên Bái"
  },
  {
    name: "Huyện Trạm Tấu",
    provinceName: "Yên Bái"
  },
  {
    name: "Thành phố Sơn La",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Mai Sơn",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Bắc Yên",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Vân Hồ",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Mộc Châu",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Mường La",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Phù Yên",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Quỳnh Nhai",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Sông Mã",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Sốp Cộp",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Thuận Châu",
    provinceName: "Sơn La"
  },
  {
    name: "Huyện Yên Châu",
    provinceName: "Sơn La"
  },
  {
    name: "Thành phố Lai Châu",
    provinceName: "Lai Châu"
  },
  {
    name: "Huyện Tân Uyên",
    provinceName: "Lai Châu"
  },
  {
    name: "Huyện Tam Đường",
    provinceName: "Lai Châu"
  },
  {
    name: "Huyện Mường Tè",
    provinceName: "Lai Châu"
  },
  {
    name: "Huyện Than Uyên",
    provinceName: "Lai Châu"
  },
  {
    name: "Huyện Phong Thổ",
    provinceName: "Lai Châu"
  },
  {
    name: "Huyện Sìn Hồ",
    provinceName: "Lai Châu"
  },
  {
    name: "Thành phố Điện Biên Phủ",
    provinceName: "Điện Biên"
  },
  {
    name: "Thị Xã Mường Lay",
    provinceName: "Điện Biên"
  },
  {
    name: "Huyện Tuần Giáo",
    provinceName: "Điện Biên"
  },
  {
    name: "Huyện Mường Nhé",
    provinceName: "Điện Biên"
  },
  {
    name: "Huyện Mường Chà",
    provinceName: "Điện Biên"
  },
  {
    name: "Huyện Mường Ảng",
    provinceName: "Điện Biên"
  },
  {
    name: "Huyện Điện Biên Đông",
    provinceName: "Điện Biên"
  },
  {
    name: "Huyện Nậm Pồ",
    provinceName: "Điện Biên"
  },
  {
    name: "Huyện Điện Biên",
    provinceName: "Điện Biên"
  },
  {
    name: "Huyện Tủa Chùa",
    provinceName: "Điện Biên"
  },
  {
    name: "Thành phố Lào Cai",
    provinceName: "Lào Cai"
  },
  {
    name: "Thị xã Sa Pa",
    provinceName: "Lào Cai"
  },
  {
    name: "Huyện Bảo Thắng",
    provinceName: "Lào Cai"
  },
  {
    name: "Huyện Bảo Yên",
    provinceName: "Lào Cai"
  },
  {
    name: "Huyện Bát Xát",
    provinceName: "Lào Cai"
  },
  {
    name: "Huyện Bắc Hà",
    provinceName: "Lào Cai"
  },
  {
    name: "Huyện Mường Khương",
    provinceName: "Lào Cai"
  },
  {
    name: "Huyện Si Ma Cai",
    provinceName: "Lào Cai"
  },
  {
    name: "Huyện Văn Bàn",
    provinceName: "Lào Cai"
  },
  {
    name: "Thành phố Tuyên Quang",
    provinceName: "Tuyên Quang"
  },
  {
    name: "Huyện Chiêm Hóa",
    provinceName: "Tuyên Quang"
  },
  {
    name: "Huyện Na Hang",
    provinceName: "Tuyên Quang"
  },
  {
    name: "Huyện Hàm Yên",
    provinceName: "Tuyên Quang"
  },
  {
    name: "Huyện Sơn Dương",
    provinceName: "Tuyên Quang"
  },
  {
    name: "Huyện Yên Sơn",
    provinceName: "Tuyên Quang"
  },
  {
    name: "Thành Phố Bắc Kạn",
    provinceName: "Bắc Kạn"
  },
  {
    name: "Huyện Na Rì",
    provinceName: "Bắc Kạn"
  },
  {
    name: "Huyện Chợ Đồn",
    provinceName: "Bắc Kạn"
  },
  {
    name: "Huyện Pác Nặm",
    provinceName: "Bắc Kạn"
  },
  {
    name: "Huyện Chợ Mới",
    provinceName: "Bắc Kạn"
  },
  {
    name: "Huyện Bạch Thông",
    provinceName: "Bắc Kạn"
  },
  {
    name: "Huyện Ba Bể",
    provinceName: "Bắc Kạn"
  },
  {
    name: "Huyện Ngân Sơn",
    provinceName: "Bắc Kạn"
  },
  {
    name: "Thành phố Cao Bằng",
    provinceName: "Cao Bằng"
  },
  {
    name: "Huyện Hà Quảng",
    provinceName: "Cao Bằng"
  },
  {
    name: "Huyện Thạch An",
    provinceName: "Cao Bằng"
  },
  {
    name: "Huyện Trùng Khánh",
    provinceName: "Cao Bằng"
  },
  {
    name: "Huyện Kỳ Anh",
    provinceName: "Hà Tĩnh"
  },
  {
    name: "Huyện Hòa An",
    provinceName: "Cao Bằng"
  },
  {
    name: "Huyện Quảng Hòa",
    provinceName: "Cao Bằng"
  },
  {
    name: "Huyện Long Mỹ",
    provinceName: "Hậu Giang"
  },
  {
    name: "Huyện Cai Lậy",
    provinceName: "Tiền Giang"
  },
  {
    name: "Huyện Bảo Lạc",
    provinceName: "Cao Bằng"
  },
  {
    name: "Huyện Bảo Lâm",
    provinceName: "Cao Bằng"
  },
  {
    name: "Huyện Hạ Lang",
    provinceName: "Cao Bằng"
  },
  {
    name: "Huyện Nguyên Bình",
    provinceName: "Cao Bằng"
  },
  {
    name: "Thành phố Hà Giang",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Quang Bình",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Quản Bạ",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Mèo Vạc",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Hoàng Su Phì",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Đồng Văn",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Bắc Quang",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Bắc Mê",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Yên Minh",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Vị Xuyên",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Xín Mần",
    provinceName: "Hà Giang"
  },
  {
    name: "Huyện Nậm Nhùn",
    provinceName: "Lai Châu"
  },
  {
    name: "Huyện Lâm Bình",
    provinceName: "Tuyên Quang"
  },
  {
    name: "Huyện Ia H Drai",
    provinceName: "Kon Tum"
  },
  {
    name: "Huyện Phú Riềng",
    provinceName: "Bình Phước"
  }
];

export default districts;
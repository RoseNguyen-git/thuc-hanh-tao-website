/* ============================================================
   NỘI DUNG & CẤU HÌNH — chỉ cần sửa file này, không cần động vào code.
   Mọi thông tin lấy từ bộ tài liệu trong thư mục Input/.
   Mục đánh dấu  ⚠ CẦN XÁC NHẬN  là dữ liệu giả lập / chưa có.
   ============================================================ */
window.SITE = {
  couple: "Hà Vy & Thanh An",
  dateLabel: "10.10.2026",

  // Thời điểm đếm ngược (giờ Việt Nam) = giờ bắt đầu lễ cưới
  countdownTo: "2026-10-10T17:30:00+07:00",

  // ---- Lưu RSVP thật: dán URL Web App của Google Apps Script vào đây (xem README.md) ----
  // Để trống = RSVP chỉ lưu trên trình duyệt của khách (chế độ demo).
  endpoint: "https://script.google.com/macros/s/AKfycbyXRmspl7B556YqC-nA6c4ynnLkxD6sGELEEafZXX-JwIVJq43Y2y_Osyzna8mckJ7_TA/exec",

  // Hạn RSVP theo tài liệu: 20.09.2026
  rsvpDeadline: "2026-09-20",

  event: {
    title: "Hà Vy & Thanh An — Wedding",
    start: "2026-10-10T16:30:00+07:00",
    // Tài liệu không nêu giờ kết thúc → tạm đặt 23:00, chỉnh nếu cần
    end: "2026-10-10T23:00:00+07:00",
  },

  // ⚠ CẦN XÁC NHẬN: địa điểm giả lập; thay địa chỉ + link Maps thật
  venue: {
    name: "The Glasshouse Garden",
    area: "Thảo Điền · Hồ Chí Minh",
    address: "",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Glasshouse+Garden+Th%E1%BA%A3o+%C4%90i%E1%BB%81n+H%E1%BB%93+Ch%C3%AD+Minh",
    arrival: "Từ 16:30",
    recommend: "Khách nên có mặt trước 17:10.",
  },

  weddingInfo: [
    { time: "16:30", label: "Guest Arrival" },
    { time: "17:30", label: "Ceremony" },
    { time: "18:30", label: "Dinner" },
    { time: "20:30", label: "Celebration" },
  ],

  story: [
    { year: "2021", en: "The First Hello", vi: "Lần đầu gặp nhau", img: "story-2021.jpg", alt: "Hà Vy và Thanh An — 2021" },
    { year: "2022", en: "More Time Together", vi: "Thêm nhiều thời gian bên nhau", img: "story-2022.jpg", alt: "Hà Vy và Thanh An — 2022" },
    { year: "2024", en: "Our Kind of Everyday", vi: "Những ngày rất đỗi bình thường", img: "story-2024.jpg", alt: "Hà Vy và Thanh An — 2024" },
    { year: "2026", en: "The Next Chapter", vi: "Chương tiếp theo", img: "story-2026.jpg", alt: "Hà Vy và Thanh An — 2026" },
  ],

  gallery: [
    { group: "Studio Portraits", items: [
      { img: "bride-studio-01.jpg", alt: "Chân dung Hà Vy" },
      { img: "groom-studio-01.jpg", alt: "Chân dung Thanh An" },
      { img: "couple-studio-full.jpg", alt: "Hà Vy & Thanh An trong studio" },
      { img: "couple-studio-close.jpg", alt: "Cận cảnh Hà Vy & Thanh An" },
      { img: "couple-studio-seated.jpg", alt: "Hà Vy & Thanh An ngồi cạnh nhau" },
    ]},
    { group: "Together", items: [
      { img: "prewedding-walk.jpg", alt: "Hà Vy & Thanh An sánh bước" },
      { img: "prewedding-veil.jpg", alt: "Hà Vy & Thanh An cùng tấm voan" },
      { img: "first-dance.jpg", alt: "Điệu nhảy đầu tiên", wide: true },
    ]},
    { group: "Little Moments", items: [
      { img: "moments.jpg", alt: "Hoa, nhẫn và chi tiết ngày cưới" },
      { img: "polaroid-corner.jpg", alt: "Góc Polaroid" },
      { img: "signature-drinks.jpg", alt: "Signature drinks" },
    ]},
  ],

  schedule: [
    { time: "16:30", en: "Welcome Drinks", vi: "Đón khách" },
    { time: "17:30", en: "Ceremony", vi: "Lễ cưới" },
    { time: "18:00", en: "Cocktails & Golden Hour", vi: "Cocktail & chụp ảnh" },
    { time: "18:30", en: "Dinner", vi: "Tiệc tối" },
    { time: "20:00", en: "First Dance", vi: "Điệu nhảy đầu tiên" },
    { time: "20:30", en: "The Party", vi: "Tiệc mừng" },
    { time: "22:00", en: "Late Night", vi: "Cuộc vui tiếp tục" },
  ],

  highlights: [
    { en: "Signature Drinks", vi: "Hai cocktail riêng cho buổi tiệc.", img: "signature-drinks.jpg" },
    { en: "Polaroid Corner", vi: "Chụp một tấm, giữ một tấm và để lại một tấm.", img: "polaroid-corner.jpg" },
    { en: "Table Notes", vi: "Những chi tiết nhỏ được chuẩn bị riêng tại bàn tiệc.", img: "reception.jpg" },
    { en: "After Dark", vi: "Không gian thay đổi khi đêm xuống.", img: "after-party.jpg" },
    { en: "Late-night Bites", vi: "Đồ ăn nhẹ sau tiệc.", img: "" },
  ],

  dressCode: {
    style: "Modern Garden Formal",
    desc: "Thanh lịch · Hiện đại · Tự nhiên",
    colors: [
      { name: "Ivory", hex: "#F6F1E8" },
      { name: "Champagne", hex: "#C5A571" },
      { name: "Olive", hex: "#68704A" },
      { name: "Dusty Rose", hex: "#D5AAA4" },
      { name: "Terracotta / Burgundy", hex: "#893748" },
      { name: "Chocolate", hex: "#4A3228" },
      { name: "Black", hex: "#1B1816" },
    ],
  },

  // pending:true = chưa có thông tin → hiển thị "sẽ được cập nhật" (không bịa nội dung)
  faq: [
    { q: "Tôi nên đến lúc mấy giờ?", a: "Đón khách từ 16:30. Bạn nên có mặt trước 17:10 để kịp vào chỗ trước lễ cưới lúc 17:30." },
    { q: "Dress code là gì?", a: "Modern Garden Formal — thanh lịch, hiện đại, tự nhiên. Xem bảng màu gợi ý ở phần Dress Code." },
    { q: "Có chỗ đỗ xe không?", pending: true },
    { q: "Có thể đưa người đi cùng không?", pending: true },
    { q: "Có thể mang trẻ em không?", pending: true },
    { q: "Có món chay không?", a: "Form RSVP có lựa chọn Vegetarian. Chúng tôi sẽ xác nhận lại với đơn vị tiệc.", note: true },
  ],

  // Quà mừng: để enabled:false cho tới khi có dữ liệu thật. KHÔNG tự điền số tài khoản.
  gifts: {
    enabled: false,
    bank: "",
    accountName: "",
    accountNumber: "",
    qrImage: "", // ví dụ "images/qr.png" (QR tạo từ dữ liệu thật)
  },
};

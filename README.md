# Hà Vy & Thanh An — Wedding Event Website

Website tĩnh (HTML/CSS/JS), **không cần chạy server**. Mở `index.html` bằng trình duyệt là dùng được.

```
index.html   styles.css   app.js   content.js   images/   apps-script/Code.gs
```

## 1. Xem thử
Nhấp đúp `index.html`. (RSVP ở chế độ demo: chỉ lưu trên trình duyệt của người nhập.)

## 2. Sửa nội dung
Chỉ sửa `content.js`: lịch trình, địa điểm, Q&A, dress code, quà mừng, hạn RSVP…
Các mục **cần xác nhận** trước khi gửi khách:
- `venue` — The Glasshouse Garden hiện là **địa điểm giả lập**: thay tên, địa chỉ (`address`), link Google Maps (`mapsUrl`).
- `event.end` — giờ kết thúc để thêm vào lịch (tài liệu không nêu, đang đặt 23:00).
- `faq` — 3 câu (đỗ xe, người đi cùng, trẻ em) đang ghi "sẽ được cập nhật"; điền `a: "..."` và bỏ `pending: true`.
- `gifts` — đặt `enabled: true` và điền ngân hàng/số tài khoản/QR **thật**.
- `rsvpDeadline` — theo tài liệu là 20.09.2026 (đã qua); đổi nếu muốn gia hạn.

Thay ảnh: ghi đè file trong `images/` (giữ nguyên tên, tỷ lệ 4:5 cho ảnh đứng, 16:9 cho ảnh ngang).

## 3. Nhận RSVP thật (Google Sheet, ~5 phút)
1. Tạo một Google Sheet mới → menu **Extensions → Apps Script**.
2. Xóa code mẫu, dán toàn bộ nội dung `apps-script/Code.gs` → **Save**.
3. **Deploy → New deployment → loại "Web app"**: *Execute as:* **Me**, *Who has access:* **Anyone** → Deploy → cho phép quyền.
4. Copy **Web app URL** (dạng `https://script.google.com/macros/s/.../exec`) và dán vào `endpoint` trong `content.js`.
5. Gửi thử một RSVP — dòng mới sẽ hiện ở tab **RSVP**. Khách sửa lại phản hồi → thêm dòng mới; dòng mới nhất của một tên là bản cuối.

Nếu mạng khách gián đoạn, phản hồi được lưu trên máy và tự gửi lại khi có mạng.

## 4. Đưa lên mạng để gửi link cho khách
Kéo-thả cả thư mục này vào **Netlify Drop** (app.netlify.com/drop) hoặc dùng GitHub Pages / Cloudflare Pages. Bạn nhận một link công khai để gửi qua Zalo/Messenger.
Trang đã có `noindex` nên Google sẽ không liệt kê. Nên đặt tên link khó đoán.
Sửa nội dung sau này: sửa `content.js` rồi kéo-thả lại thư mục.

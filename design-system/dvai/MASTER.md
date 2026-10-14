# DVAI Design System (Master)

Nguồn sự thật cho giao diện website DVAI, theo mẫu Master + Overrides của skill ui-ux-pro-max. Trang nào cần quy tắc riêng thì thêm file `pages/<ten-trang>.md`; quy tắc ở đó ghi đè file này.

Hướng thiết kế do DVAI duyệt ngày 14/10/2026: bố cục tương tự datamaker.vn (tiêu đề font có chân với một cụm nghiêng tô màu, nền sáng xen dải navy, danh sách lộ trình đánh số), đổi màu theo logo DVAI.

## Màu

| Token | Hex | Dùng cho |
|---|---|---|
| `bg` | `#F1F5F7` | Nền trang |
| `surface` | `#FFFFFF` | Thẻ, form |
| `ink` | `#0D2433` | Chữ chính |
| `muted` | `#53697A` | Chữ phụ (tương phản 5:1 trên `bg`) |
| `line` / `line-strong` | `#D8E2E7` / `#C5D3DA` | Viền |
| `navy` | `#053A6B` | Tiêu đề, dải tối (màu logo) |
| `navy-deep` | `#03284B` | Footer |
| `teal` | `#007A8A` | Nút chính, link, cụm nhấn (tương phản 4.9:1 với chữ trắng) |
| `teal-soft` | `#DCF0F2` | Nền icon, chip |
| `mint` / `sky` | `#5EC9D3` / `#8FD8E0` | Nhấn trên nền tối |
| `blue` / `blue-soft` | `#1D5C9A` / `#E6EEF8` | Thẻ sản phẩm, chip công nghệ |
| `slate` | `#3F4A52` | Nhãn thứ ba (màu xám của logo) |

Màu logo gốc: navy `#043A6A`, teal `#008091`, xám `#404447`.

## Chữ

- Tiêu đề: **Lora** (có hỗ trợ tiếng Việt), weight 400, `<em>` nghiêng màu teal cho một cụm nhấn.
- Nội dung: **Be Vietnam Pro** 400/500/600/700, cỡ cơ bản 16px, line-height 1.6.
- Thang: `display-1` 36–56px, `display-2` 28–40px, `display-3` 24–31px, `lede` 17px.
- Nhãn nhỏ (`eyebrow`): 12px, chữ hoa, giãn 0.12em, kèm vạch hoặc đường kẻ.

## Thành phần

- **Nút**: `.btn-primary` (teal), `.btn-secondary` (viền), `.btn-ghost` (trên nền tối). Cao tối thiểu 48px.
- **CTA**: chỉ «Nhận báo giá» và «Đặt lịch tư vấn». Trang license dùng «Nhận báo giá» làm nút chính; trang giải pháp, dịch vụ dùng «Đặt lịch tư vấn».
- **Thẻ**: nền trắng, viền `line`, bo 14px. Viền trên 3px chỉ dùng cho nhóm sản phẩm.
- **Lộ trình đánh số**: chỉ dùng khi nội dung thật sự là trình tự.
- **Dải navy**: tối đa một dải trong thân trang, cộng khung CTA cuối trang.

## Quy tắc

1. Nền sáng cố định, không có giao diện tối.
2. Tương phản chữ tối thiểu 4.5:1; viền focus 2px luôn hiển thị.
3. Vùng bấm tối thiểu 44×44px; khoảng cách giữa vùng bấm từ 8px.
4. Biểu tượng SVG Lucide, không dùng emoji, không dùng logo hay biểu tượng Microsoft.
5. Chuyển động 150–300ms, tôn trọng `prefers-reduced-motion`.
6. Form: nhãn luôn hiển thị, lỗi ngay dưới ô và có khung tóm tắt lỗi khi gửi.
7. Responsive kiểm tra ở 375, 768, 1024, 1440px; không cuộn ngang.

## Tránh

- Gradient tím hồng kiểu AI, emoji làm biểu tượng.
- Chữ «Partner», «Reseller», «đối tác» hay badge Microsoft khi chưa có danh hiệu.
- Số liệu, nhãn «phổ biến nhất» khi chưa được xác nhận.

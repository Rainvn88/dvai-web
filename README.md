# Website DVAI

Website giới thiệu và thu lead của Công ty TNHH DVAI (DVAI Corporation): Microsoft Cloud & Business Solutions for SMEs in Vietnam.

- Next.js 16 (App Router), TypeScript, Tailwind CSS 4, biểu tượng Lucide
- Chạy bằng máy chủ Next.js trên Mắt Bão Vibe Host; form gửi qua API `/api/lead/`, email qua Microsoft Graph
- Triển khai: xem [DEPLOY.md](DEPLOY.md)
- Hệ thống thiết kế: [design-system/dvai/MASTER.md](design-system/dvai/MASTER.md)

## Chạy trên máy

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build bản production
npm start        # chạy bản production
npm run lint
```

Muốn gửi email thật khi chạy trên máy, sao chép `.env.example` thành `.env.local` và điền giá trị. Nếu chưa có biến `MS_*`, ở chế độ dev API chỉ ghi nội dung email ra terminal và trả về thành công.

## Sửa nội dung

| Muốn sửa | File |
|---|---|
| Thông tin công ty, hotline, email, văn phòng, menu | `src/content/site.ts` |
| 6 ứng dụng dựng sẵn và thời gian triển khai | `src/content/apps.ts` |
| Dự án và số liệu năng lực | `src/content/cases.ts` |
| Bài viết mục Kiến thức | `src/content/articles.ts` |
| Nội dung từng trang | `src/app/<đường-dẫn>/page.tsx` |
| Màu, font, nút, nhãn | `src/app/globals.css` |

Thêm bài viết: thêm một mục vào mảng `articles` trong `src/content/articles.ts`. Trang, sitemap và danh sách bài tự cập nhật.

## Quy tắc nội dung

- Chỉ dùng câu định vị «Microsoft Cloud & Business Solutions for SMEs in Vietnam». Không dùng Partner, Reseller, CSP, Distributor, «đối tác», «uỷ quyền», «chính hãng» hay logo, badge Microsoft cho đến khi DVAI xác nhận đã có danh hiệu thật.
- Toàn site chỉ có hai CTA: «Nhận báo giá» và «Đặt lịch tư vấn».
- Chỉ đưa số liệu đã được DVAI xác nhận. Không tự thêm công nghệ hay con số cho dự án.

## Cấu trúc

```
src/
├── app/                 các trang (mỗi thư mục là một URL), app/api/lead là API form
├── components/
│   ├── layout/          header, footer, thanh CTA mobile
│   ├── sections/        khối nội dung dùng lại giữa các trang
│   ├── forms/           form lead
│   ├── m365/            công cụ chọn gói Microsoft 365
│   ├── demo/            app duyệt chi phí mẫu ở hero
│   └── seo/             dữ liệu cấu trúc JSON-LD
├── content/             nội dung dùng chung
└── lib/                 metadata, quy tắc kiểm tra form (lead.ts), gửi email Graph (mailer.ts)
public/brand/            logo
.env.example             danh sách biến môi trường cần nhập trên Vibe Host
```

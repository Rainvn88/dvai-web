# Triển khai website DVAI lên Hostinger

Website được build thành web tĩnh (HTML, CSS, JS) và một file PHP xử lý form. Chạy được trên mọi gói web hosting của Hostinger.

Luồng triển khai:

```
push lên main  →  GitHub Actions build  →  nhánh deploy (chỉ chứa out/)  →  Hostinger kéo vào public_html
```

## 1. Đưa code lên GitHub

1. Tạo repository mới trên GitHub, ví dụ `dvai-website`. Không tạo sẵn README.
2. Trong thư mục dự án:

   ```bash
   git remote add origin https://github.com/<tai-khoan>/dvai-website.git
   git push -u origin main
   ```

3. Vào tab **Actions** của repository, đợi workflow «Build và deploy» chạy xong (khoảng 2 phút). Nhánh `deploy` sẽ xuất hiện.

## 2. Kết nối Hostinger với nhánh deploy

1. hPanel → **Websites** → chọn dvai.vn → **Advanced** → **GIT**.
2. Thư mục `public_html` phải trống. Nếu có file mặc định của Hostinger (`default.php`), xoá đi bằng File Manager.
3. Điền:
   - **Repository**: với repo public dùng `https://github.com/<tai-khoan>/dvai-website.git`. Với repo private dùng dạng SSH `git@github.com:<tai-khoan>/dvai-website.git`.
   - **Branch**: `deploy`
   - **Directory**: để trống (tức là `public_html`)
4. Repo private: Hostinger hiển thị một SSH key. Copy key đó, vào GitHub → repository → **Settings** → **Deploy keys** → **Add deploy key**, dán vào, không cần quyền ghi.
5. Bấm **Create**, rồi bấm **Deploy** lần đầu.
6. Bật **Auto Deployment**, copy **Webhook URL**. Vào GitHub → **Settings** → **Webhooks** → **Add webhook**, dán URL, chọn sự kiện **Just the push event**. Từ giờ mỗi lần nhánh `deploy` được cập nhật, Hostinger tự kéo bản mới.

Cách khác nếu không dùng GIT của Hostinger: tải nhánh `deploy` về và upload toàn bộ file vào `public_html` bằng File Manager hoặc FTP.

## 3. Cấu hình gửi email cho form

Form gửi dữ liệu tới `https://dvai.vn/api/lead.php`. File này đọc cấu hình từ `dvai-config.php` đặt **ngoài** `public_html`:

```
domains/dvai.vn/
├── dvai-config.php      ← tạo file này
└── public_html/
    └── api/lead.php
```

1. Mở `deploy/dvai-config.sample.php` trong repo, sao chép nội dung.
2. hPanel → **File Manager** → vào thư mục `domains/dvai.vn/` (cấp trên `public_html`), tạo file `dvai-config.php`, dán nội dung, điền thông tin theo cách gửi email bên dưới.
3. Không commit `dvai-config.php` lên GitHub (đã có trong `.gitignore`).

Chọn `transport` theo nơi đặt hộp thư sales@dvai.vn:

| Hộp thư sales@dvai.vn đặt ở | `transport` | Ghi chú |
|---|---|---|
| Microsoft 365 | `graph` | Khuyến nghị. Microsoft đã ngừng SMTP xác thực bằng mật khẩu cho Exchange Online |
| Email Hostinger | `smtp` | `smtp.hostinger.com`, cổng 465, `ssl` |
| Chưa có email phía gửi | `mail` | Dùng hàm `mail()` của hosting; dễ vào thư rác hơn |

## 4. Gửi email qua Microsoft 365 (transport `graph`)

Cần quyền quản trị Microsoft 365 của DVAI.

1. **Tạo hộp thư gửi**: trong Microsoft 365 admin center tạo shared mailbox `website@dvai.vn` (shared mailbox không cần license).
2. **Đăng ký ứng dụng**: Microsoft Entra admin center → **App registrations** → **New registration**, tên `DVAI Website Mailer`, loại tài khoản «Accounts in this organizational directory only». Ghi lại **Application (client) ID** và **Directory (tenant) ID**.
3. **Tạo secret**: **Certificates & secrets** → **New client secret**. Copy **Value** ngay (chỉ hiện một lần). Đặt lịch nhắc thay secret trước ngày hết hạn.
4. **Chỉ cho phép gửi từ website@dvai.vn**. Không cấp quyền Graph `Mail.Send` trong Entra (quyền đó áp dụng cho mọi hộp thư). Thay vào đó cấp quyền qua Exchange Online PowerShell:

   ```powershell
   Connect-ExchangeOnline
   # ObjectId lấy ở Entra > Enterprise applications > DVAI Website Mailer > Object ID
   New-ServicePrincipal -AppId <CLIENT_ID> -ObjectId <ENTERPRISE_APP_OBJECT_ID> -DisplayName "DVAI Website Mailer"
   New-ManagementScope -Name "DVAI Website Sender" -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'website@dvai.vn'"
   New-ManagementRoleAssignment -App <CLIENT_ID> -Role "Application Mail.Send" -CustomResourceScope "DVAI Website Sender"
   ```

5. Điền vào `dvai-config.php`: `tenant_id`, `client_id`, `client_secret`, `sender` = `website@dvai.vn`, `from` = `website@dvai.vn`.

## 5. Kiểm tra sau khi deploy

- [ ] `https://dvai.vn` mở được, `http://` và `www` tự chuyển về `https://dvai.vn`
- [ ] Mở `https://dvai.vn/trang-khong-co/` thấy trang 404 của DVAI
- [ ] Gửi thử form ở `/lien-he/`: chuyển sang trang cảm ơn, email về sales@dvai.vn, bấm Trả lời thì gửi đúng email khách
- [ ] Gửi form 6 lần liên tiếp: lần thứ 6 báo «gửi nhiều yêu cầu trong thời gian ngắn»
- [ ] `https://dvai.vn/sitemap.xml` và `/robots.txt` hiển thị đúng
- [ ] Khai báo sitemap trong Google Search Console
- [ ] Rà soát pháp lý trang Chính sách bảo mật trước khi chạy quảng cáo

Nếu form báo lỗi: hPanel → **Advanced** → **PHP Configuration** kiểm tra đã bật `curl` và `mbstring`; xem log lỗi trong `domains/dvai.vn/logs/` (dòng bắt đầu bằng `[lead]`).

# Triển khai website DVAI lên Mắt Bão Vibe Host

Website chạy bằng máy chủ Next.js (`npm run build`, rồi `npm start`). Vibe Host kết nối với repository GitHub `Rainvn88/dvai-web` và tự build lại mỗi khi nhánh `main` có commit mới.

```
push lên main  →  Vibe Host build và chạy  →  https://dvai.vn
               →  GitHub Actions chạy lint và build để kiểm tra (không triển khai)
```

## 1. Tạo ứng dụng trên Vibe Host

1. Đăng nhập Vibe Host, tạo site mới, chọn **GitHub**, cấp quyền cho repository `Rainvn88/dvai-web`.
2. Chọn nhánh `main`. Kiểu ứng dụng: **Next.js** (Node.js 22 hoặc 24).
3. Lệnh cài đặt `npm ci`, lệnh build `npm run build`, lệnh chạy `npm start`. Cổng: dùng biến `PORT` do Vibe Host cấp (`next start` tự đọc biến này).
4. Nhập biến môi trường ở mục 2, rồi triển khai lần đầu.
5. Mở địa chỉ tạm Vibe Host cấp, kiểm tra trang chủ hiển thị đúng.

## 2. Biến môi trường

Nhập trong phần cài đặt môi trường (Environment variables) của site trên Vibe Host. Mẫu đầy đủ: [.env.example](.env.example).

| Biến | Giá trị |
|---|---|
| `LEAD_TO` | `sales@dvai.vn` |
| `MS_TENANT_ID` | Directory (tenant) ID của Microsoft 365 DVAI |
| `MS_CLIENT_ID` | Application (client) ID của app «DVAI Website Mailer» |
| `MS_CLIENT_SECRET` | Client secret của app (bí mật, chỉ nhập trên Vibe Host) |
| `MS_SENDER` | `website@dvai.vn` |
| `ALLOWED_ORIGINS` | `https://dvai.vn,https://www.dvai.vn` |

Thiếu biến `MS_*` thì form báo lỗi «Máy chủ chưa được cấu hình gửi email». Đổi biến xong cần triển khai lại.

## 3. Quyền gửi email qua Microsoft 365

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

5. Kiểm tra quyền (kết quả `InScope` phải là `True`). Quyền mới có thể mất 30 phút đến 2 giờ mới có hiệu lực:

   ```powershell
   Test-ServicePrincipalAuthorization -Identity <CLIENT_ID> -Resource website@dvai.vn
   ```

6. Nhập `MS_TENANT_ID`, `MS_CLIENT_ID`, `MS_CLIENT_SECRET` vào Vibe Host (mục 2).

## 4. Tên miền dvai.vn

DNS của dvai.vn quản lý tại Mắt Bão (`ns1.matbao.vn`, `ns2.matbao.vn`).

1. Trong Vibe Host, tab **Domains**: thêm `dvai.vn` làm tên miền chính và `www.dvai.vn`.
2. Thêm vào DNS Mắt Bão đúng bản ghi Vibe Host yêu cầu (thường là A hoặc CNAME cho `@` và `www`).
3. SSL do Let's Encrypt cấp và tự gia hạn sau khi DNS trỏ đúng.
4. Website tự chuyển `www.dvai.vn` về `https://dvai.vn`.

**Không xoá các bản ghi email Microsoft 365** đã có: MX `dvai-vn.mail.protection.outlook.com`, SPF `v=spf1 include:spf.protection.outlook.com -all`, CNAME `autodiscover`. Nên thêm hai CNAME DKIM (`selector1._domainkey`, `selector2._domainkey`, lấy trong Microsoft Defender portal → Email authentication → DKIM) và bản ghi DMARC `_dmarc` (`v=DMARC1; p=none; rua=mailto:sales@dvai.vn`).

## 5. Kiểm tra sau khi triển khai

Cách thử đơn giản nhất: gửi form ở `https://dvai.vn/lien-he/` rồi kiểm tra hộp thư sales@dvai.vn.

Thử riêng API bằng PowerShell (gửi một email thử về sales@dvai.vn). Dữ liệu được mã hoá UTF-8 rõ ràng; `curl` trên Windows có thể làm hỏng ký tự tiếng Việt khi truyền trên dòng lệnh:

```powershell
$body = @{ intent='bao-gia'; company='Test'; name='Test'; email='test@dvai.vn'; phone='0912345678'; users='Trên 300'; products=@('Microsoft 365'); consent=$true; website=''; elapsed=5000 } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri 'https://dvai.vn/api/lead/' -ContentType 'application/json; charset=utf-8' -Headers @{ Origin = 'https://dvai.vn' } -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
```

Kết quả đúng là `ok: True`. Nếu lỗi, xem log ứng dụng trên Vibe Host (dòng bắt đầu bằng `[lead]`).

- [ ] `https://dvai.vn` mở được, `www.dvai.vn` tự chuyển về `https://dvai.vn`
- [ ] Mở `https://dvai.vn/trang-khong-co/` thấy trang 404 của DVAI
- [ ] Gửi thử form ở `/lien-he/`: chuyển sang trang cảm ơn, email về sales@dvai.vn, bấm Trả lời thì gửi đúng email khách
- [ ] Gửi form 6 lần liên tiếp: lần thứ 6 báo «gửi nhiều yêu cầu trong thời gian ngắn»
- [ ] `https://dvai.vn/sitemap.xml` và `/robots.txt` hiển thị đúng
- [ ] Khai báo sitemap trong Google Search Console
- [ ] Rà soát pháp lý trang Chính sách bảo mật trước khi chạy quảng cáo

## Ghi chú

- Giới hạn 5 lần gửi mỗi 15 phút theo IP được lưu trong bộ nhớ của máy chủ, sẽ đặt lại khi ứng dụng khởi động lại.
- Nếu sau này chuyển sang hosting khác, chỉ cần nơi đó chạy được Node.js 22+ với `npm run build` và `npm start`, cùng các biến môi trường ở mục 2.

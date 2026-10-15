# Triển khai website DVAI lên Mắt Bão Vibe Host

Website chạy bằng máy chủ Next.js (`npm run build`, rồi `npm start`). Vibe Host kết nối với repository GitHub `Rainvn88/dvai-web`, nhánh `main`.

```
push lên main  →  bấm «Triển khai lại» trên Vibe Host  →  https://dvai.vn
               →  GitHub Actions chạy lint và build để kiểm tra (không triển khai)
```

Vibe Host chưa tự triển khai khi có commit mới: sau mỗi lần push, vào site `dvai-web` trên Vibe Host và bấm **Triển khai lại**. Nếu Vibe Host có tuỳ chọn tự triển khai (auto deploy), bật lên để khỏi bấm tay.

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
| `MS_SENDER` | `sales@dvai.vn` (hộp thư đứng tên gửi; có thể đổi sang `website@dvai.vn`, xem mục 3) |
| `ALLOWED_ORIGINS` | `https://dvai.vn,https://www.dvai.vn` |

Thiếu biến `MS_*` thì form báo lỗi «Máy chủ chưa được cấu hình gửi email». Đổi biến xong cần triển khai lại.

## 3. Quyền gửi email qua Microsoft 365

Cách đang dùng (từ 15/10/2026): app «DVAI Website Mailer» có quyền **Mail.Send** của Microsoft Graph, cấp trên Entra, và gửi thư đứng tên `sales@dvai.vn` tới `sales@dvai.vn`. Khi bấm Trả lời trong email, thư đi thẳng tới khách hàng. Cần tài khoản quản trị Microsoft 365 của DVAI; mọi bước chỉ cần bấm chuột.

1. **Đăng ký ứng dụng**: vào https://entra.microsoft.com → **App registrations** → **New registration**, tên `DVAI Website Mailer`, loại tài khoản «Accounts in this organizational directory only», Redirect URI để trống → **Register**.
2. **Lấy hai ID** ở trang **Overview** của app, phần Essentials:
   - **Application (client) ID** → `MS_CLIENT_ID`. Không dùng dòng Object ID.
   - **Directory (tenant) ID** → `MS_TENANT_ID`. Của DVAI là `f1011410-070f-4ead-9c82-54872d2b08ad`.
3. **Tạo secret**: **Certificates & secrets** → **New client secret**, Description `Vibe Host`, Expires 12 hoặc 24 tháng → **Add**. Copy ngay cột **Value** (không phải cột Secret ID; giá trị chỉ hiện một lần) → `MS_CLIENT_SECRET`.
4. **Cấp quyền gửi thư**: **API permissions** → **Add a permission** → **Microsoft Graph** → **Application permissions** → tìm và tick **Mail.Send** → **Add permissions**. Sau đó bấm **Grant admin consent for…** → **Yes**. Dòng Mail.Send phải có dấu tích xanh «Granted».
5. Nhập ba giá trị vào Vibe Host (mục 2), đặt `MS_SENDER` = `sales@dvai.vn`, rồi **Triển khai lại**. Quyền mới thường có hiệu lực sau vài phút.

**Thay secret trước khi hết hạn.** Đặt lịch nhắc theo ngày hết hạn ở bước 3. Khi gần hết hạn: tạo secret mới, dán vào `MS_CLIENT_SECRET` trên Vibe Host, triển khai lại, gửi thử form, rồi xoá secret cũ trên Entra. Secret hết hạn thì form báo lỗi với mã `token-AADSTS7000222`.

### Tuỳ chọn: thu hẹp quyền chỉ còn một hộp thư

Quyền Mail.Send cấp trên Entra cho phép app gửi thư từ **mọi** hộp thư trong công ty. Secret chỉ nằm trên Vibe Host nên vẫn an toàn nếu không để lộ, nhưng nên thu hẹp khi có người làm IT hỗ trợ (khoảng 15 phút, dùng Exchange Online PowerShell):

1. Tạo shared mailbox `website@dvai.vn` (không cần license). Kiểm tra cả Username và Email của hộp thư đều là `website@dvai.vn`.
2. Cấp quyền chỉ cho hộp thư đó:

   ```powershell
   Install-Module ExchangeOnlineManagement -Scope CurrentUser   # chỉ lần đầu
   Connect-ExchangeOnline -UserPrincipalName <tài khoản quản trị>
   # ObjectId lấy ở Entra > Enterprise applications > DVAI Website Mailer > Object ID (khác Object ID ở App registrations)
   New-ServicePrincipal -AppId <CLIENT_ID> -ObjectId <ENTERPRISE_APP_OBJECT_ID> -DisplayName "DVAI Website Mailer"
   New-ManagementScope -Name "DVAI Website Sender" -RecipientRestrictionFilter "PrimarySmtpAddress -eq 'website@dvai.vn'"
   New-ManagementRoleAssignment -App <CLIENT_ID> -Role "Application Mail.Send" -CustomResourceScope "DVAI Website Sender"
   Test-ServicePrincipalAuthorization -Identity <CLIENT_ID> -Resource website@dvai.vn   # InScope phải là True
   ```

3. Đổi `MS_SENDER` trên Vibe Host thành `website@dvai.vn`, triển khai lại, gửi thử form. Quyền mới có thể mất 30 phút đến 2 giờ.
4. Khi form đã gửi được từ `website@dvai.vn`, **gỡ quyền Mail.Send trên Entra** (API permissions → Mail.Send → Remove permission). Nếu còn giữ quyền này, app vẫn gửi được từ mọi hộp thư vì hai loại quyền cộng dồn.

## 4. Tên miền dvai.vn

DNS của dvai.vn quản lý tại Mắt Bão (`ns1.matbao.vn`, `ns2.matbao.vn`).

1. Trong Vibe Host, tab **Domains**: thêm `dvai.vn` làm tên miền chính và `www.dvai.vn`.
2. Thêm vào DNS Mắt Bão đúng bản ghi Vibe Host yêu cầu (thường là A hoặc CNAME cho `@` và `www`).
3. SSL do Let's Encrypt cấp và tự gia hạn sau khi DNS trỏ đúng.
4. Website tự chuyển `www.dvai.vn` về `https://dvai.vn`.

**Không xoá các bản ghi email Microsoft 365** đã có: MX `dvai-vn.mail.protection.outlook.com`, SPF `v=spf1 include:spf.protection.outlook.com -all`, CNAME `autodiscover`, hai CNAME DKIM `selector1._domainkey` và `selector2._domainkey`.

Còn cần làm cho email (tình trạng ngày 15/10/2026):

- **Bật chữ ký DKIM**: Microsoft Defender portal (security.microsoft.com) → Email & collaboration → Policies & rules → Threat policies → Email authentication settings → DKIM → dvai.vn → bật «Sign messages for this domain with DKIM signatures».
- **Thêm DMARC** tại Mắt Bão: bản ghi TXT tên `_dmarc`, giá trị `v=DMARC1; p=none; rua=mailto:sales@dvai.vn`.

## 5. Kiểm tra sau khi triển khai

Cách thử đơn giản nhất: gửi form ở `https://dvai.vn/lien-he/` rồi kiểm tra hộp thư sales@dvai.vn.

Thử riêng API bằng PowerShell (gửi một email thử về sales@dvai.vn). Dữ liệu được mã hoá UTF-8 rõ ràng; `curl` trên Windows có thể làm hỏng ký tự tiếng Việt khi truyền trên dòng lệnh:

```powershell
$body = @{ intent='bao-gia'; company='Test'; name='Test'; email='test@dvai.vn'; phone='0912345678'; users='Trên 300'; products=@('Microsoft 365'); consent=$true; website=''; elapsed=5000 } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri 'https://dvai.vn/api/lead/' -ContentType 'application/json; charset=utf-8' -Headers @{ Origin = 'https://dvai.vn' } -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
```

Kết quả đúng là `ok: True`.

**Khi form báo «Chưa gửi được yêu cầu»**, dưới thông báo có dòng **Mã lỗi**. Tra mã trong bảng (chi tiết hơn: log ứng dụng trên Vibe Host, dòng bắt đầu bằng `[lead]`):

| Mã lỗi | Nghĩa | Cách sửa |
|---|---|---|
| `token-AADSTS7000215` | Sai client secret (thường do copy cột Secret ID thay vì Value) | Tạo secret mới, copy cột **Value**, cập nhật `MS_CLIENT_SECRET`, triển khai lại |
| `token-AADSTS7000222` | Client secret đã hết hạn | Tạo secret mới như trên |
| `token-AADSTS700016`, `token-AADSTS700038` | Sai `MS_CLIENT_ID` | Copy lại **Application (client) ID** ở trang Overview của app |
| `token-AADSTS90002` | Sai `MS_TENANT_ID` | Dùng `f1011410-070f-4ead-9c82-54872d2b08ad` |
| `send-403-ErrorAccessDenied` | App chưa có quyền gửi thư từ hộp thư `MS_SENDER` | Kiểm tra mục 3 bước 4 (Mail.Send, Grant admin consent). Vừa cấp quyền thì chờ vài phút rồi thử lại |
| `send-404-…` (ErrorInvalidUser, ResourceNotFound) | Không tìm thấy hộp thư `MS_SENDER` | Kiểm tra địa chỉ trong `MS_SENDER` đúng với Username của hộp thư |
| `network` | Máy chủ Vibe Host không kết nối được tới Microsoft | Hỏi Mắt Bão có chặn kết nối ra `login.microsoftonline.com`, `graph.microsoft.com` không |

Đổi bất kỳ biến môi trường nào cũng phải **triển khai lại** mới có hiệu lực.

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

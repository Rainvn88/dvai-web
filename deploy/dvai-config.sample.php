<?php
/**
 * Cấu hình gửi email cho form website DVAI.
 *
 * Cách dùng: sao chép file này thành «dvai-config.php» và tải lên Hostinger,
 * đặt NGOÀI public_html, cùng cấp với thư mục public_html:
 *   domains/dvai.vn/dvai-config.php
 *   domains/dvai.vn/public_html/api/lead.php
 * Không commit file dvai-config.php lên GitHub.
 */

return [
    // Hộp thư nhận lead
    'to' => ['sales@dvai.vn'],

    // Địa chỉ gửi đi, phải thuộc tên miền dvai.vn và được phép gửi (SPF)
    'from' => 'website@dvai.vn',
    'from_name' => 'Website DVAI',

    // Chỉ nhận request từ website của mình
    'allowed_origins' => ['https://dvai.vn', 'https://www.dvai.vn'],

    // Chọn một: 'graph' (email trên Microsoft 365), 'smtp', 'mail' (hàm mail() của hosting)
    'transport' => 'graph',

    // Microsoft 365: App Registration trên Entra ID, quyền Application «Mail.Send»
    // (nên giới hạn app chỉ gửi được từ hộp thư «sender»). Xem DEPLOY.md mục 4.
    'graph' => [
        'tenant_id' => '',
        'client_id' => '',
        'client_secret' => '',
        'sender' => 'website@dvai.vn',
    ],

    // SMTP, ví dụ email Hostinger: smtp.hostinger.com, cổng 465, 'ssl'
    'smtp' => [
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'secure' => 'ssl', // 'ssl' cho cổng 465, 'tls' cho cổng 587
        'username' => 'website@dvai.vn',
        'password' => '',
    ],

    // Tối đa 5 yêu cầu mỗi 15 phút cho mỗi địa chỉ IP
    'rate_limit' => ['max' => 5, 'window_seconds' => 900],

    // Thư mục ghi dữ liệu giới hạn tần suất; để null sẽ dùng thư mục tạm của hệ thống
    'data_dir' => null,
];

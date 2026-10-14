<?php
/**
 * Nhận yêu cầu từ form «Nhận báo giá / Đặt lịch tư vấn» và gửi email về hộp thư bán hàng.
 *
 * Cấu hình đặt NGOÀI public_html, cùng cấp với thư mục public_html:
 *   domains/dvai.vn/dvai-config.php   (mẫu: deploy/dvai-config.sample.php trong repo)
 * Hỗ trợ 3 cách gửi: "graph" (Microsoft 365 qua Microsoft Graph), "smtp", "mail" (hàm mail() của hosting).
 */

declare(strict_types=1);

// Cảnh báo PHP không được lẫn vào phản hồi JSON; lỗi vẫn ghi vào error_log của hosting.
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const USER_RANGES = ['1–10', '11–50', '51–100', '101–300', 'Trên 300'];
const PRODUCTS = [
    'Microsoft 365', 'Power Apps', 'Power Automate', 'Power BI', 'Azure', 'Copilot',
    'Ứng dụng thiết kế riêng', 'Chuyển đổi dữ liệu', 'Quản trị và vận hành',
];
const INTENTS = ['bao-gia' => 'Yêu cầu báo giá', 'tu-van' => 'Đặt lịch tư vấn'];

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function str_field(array $data, string $key, int $max): string
{
    $value = isset($data[$key]) && is_scalar($data[$key]) ? trim((string) $data[$key]) : '';
    // Bỏ ký tự điều khiển (chống chèn header email), giữ xuống dòng cho phần nội dung.
    $value = preg_replace('/[^\P{C}\n]/u', '', $value) ?? '';
    return mb_substr($value, 0, $max);
}

function one_line(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

// ---------- Cấu hình ----------
$config = null;
foreach ([dirname(__DIR__, 2) . '/dvai-config.php', __DIR__ . '/config.php'] as $path) {
    if (is_file($path)) {
        $config = require $path;
        break;
    }
}
if (!is_array($config) || empty($config['to'])) {
    error_log('[lead] Thiếu file cấu hình dvai-config.php');
    respond(500, ['ok' => false, 'error' => 'Máy chủ chưa được cấu hình gửi email.']);
}

// ---------- Kiểm tra request ----------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Chỉ nhận phương thức POST.']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = $config['allowed_origins'] ?? [];
if ($origin !== '' && $allowed && !in_array($origin, $allowed, true)) {
    respond(403, ['ok' => false, 'error' => 'Yêu cầu không hợp lệ.']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000) ?: '';
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Ô bẫy spam có giá trị: bỏ qua nhưng vẫn trả về thành công.
if (str_field($data, 'website', 200) !== '') {
    respond(200, ['ok' => true]);
}
if ((int) ($data['elapsed'] ?? 0) < 1500) {
    respond(400, ['ok' => false, 'error' => 'Vui lòng đợi vài giây rồi gửi lại.']);
}

// ---------- Giới hạn tần suất theo IP ----------
$limit = $config['rate_limit'] ?? ['max' => 5, 'window_seconds' => 900];
$dir = $config['data_dir'] ?? sys_get_temp_dir();
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = rtrim((string) $dir, '/\\') . '/dvai-lead-' . hash('sha256', $ip) . '.json';
$now = time();
$hits = is_file($bucket) ? (json_decode((string) @file_get_contents($bucket), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn($t) => is_int($t) && $t > $now - (int) $limit['window_seconds']));
if (count($hits) >= (int) $limit['max']) {
    respond(429, ['ok' => false, 'error' => 'Bạn đã gửi nhiều yêu cầu trong thời gian ngắn.']);
}

// ---------- Kiểm tra dữ liệu ----------
$intent = str_field($data, 'intent', 20);
$fields = [
    'company' => str_field($data, 'company', 150),
    'name' => one_line(str_field($data, 'name', 100)),
    'email' => one_line(str_field($data, 'email', 200)),
    'phone' => one_line(str_field($data, 'phone', 30)),
    'users' => str_field($data, 'users', 20),
    'message' => str_field($data, 'message', 2000),
];
$inputProducts = array_filter(is_array($data['products'] ?? null) ? $data['products'] : [], 'is_string');
$products = array_values(array_intersect(PRODUCTS, $inputProducts));

$errors = [];
if ($fields['company'] === '') $errors['company'] = 'Nhập tên công ty';
if ($fields['name'] === '') $errors['name'] = 'Nhập họ tên người liên hệ';
if (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Email chưa đúng định dạng, ví dụ ten@congty.vn';
$digits = preg_replace('/^\+84/', '0', preg_replace('/[\s.\-()]/', '', $fields['phone']) ?? '') ?? '';
if (!preg_match('/^\d{8,12}$/', $digits)) $errors['phone'] = 'Số điện thoại cần từ 8 đến 12 chữ số';
if (!in_array($fields['users'], USER_RANGES, true)) $errors['users'] = 'Chọn số lượng người dùng';
if (!$products) $errors['products'] = 'Chọn ít nhất một sản phẩm';
if (($data['consent'] ?? false) !== true) $errors['consent'] = 'Bạn cần đồng ý với chính sách bảo mật để gửi yêu cầu';
if (!isset(INTENTS[$intent])) $intent = 'bao-gia';

if ($errors) {
    respond(422, ['ok' => false, 'error' => 'Thông tin chưa hợp lệ.', 'fields' => $errors]);
}

// ---------- Soạn email ----------
$utm = is_array($data['utm'] ?? null) ? $data['utm'] : [];
$utmText = implode(' / ', array_filter([
    str_field($utm, 'source', 100), str_field($utm, 'medium', 100), str_field($utm, 'campaign', 100),
]));
$time = (new DateTimeImmutable('now', new DateTimeZone('Asia/Ho_Chi_Minh')))->format('d/m/Y H:i');

$subject = sprintf('[Website] %s - %s', INTENTS[$intent], one_line($fields['company']));
$body = implode("\n", [
    'Loại yêu cầu: ' . INTENTS[$intent],
    'Công ty: ' . $fields['company'],
    'Người liên hệ: ' . $fields['name'],
    'Email: ' . $fields['email'],
    'Điện thoại: ' . $fields['phone'],
    'Số lượng người dùng: ' . $fields['users'],
    'Sản phẩm quan tâm: ' . implode(', ', $products),
    '',
    'Nội dung:',
    $fields['message'] !== '' ? $fields['message'] : '(không có)',
    '',
    '---',
    'Trang gửi: ' . one_line(str_field($data, 'page', 200)),
    'Chiến dịch (UTM): ' . ($utmText !== '' ? $utmText : '(không có)'),
    'Thời gian: ' . $time . ' (giờ Việt Nam)',
    'Đồng ý xử lý dữ liệu cá nhân: Có',
    '',
    'Trả lời email này để phản hồi trực tiếp cho khách hàng.',
]);

$mail = [
    'to' => (array) $config['to'],
    'from' => (string) ($config['from'] ?? ''),
    'from_name' => (string) ($config['from_name'] ?? 'Website DVAI'),
    'reply_to' => $fields['email'],
    'reply_name' => $fields['name'],
    'subject' => $subject,
    'body' => $body,
];

$transport = $config['transport'] ?? 'mail';
try {
    $sent = match ($transport) {
        'graph' => send_graph($config['graph'] ?? [], $mail),
        'smtp' => send_smtp($config['smtp'] ?? [], $mail),
        default => send_mail_fn($mail),
    };
} catch (Throwable $e) {
    error_log('[lead] ' . $e->getMessage());
    $sent = false;
}

if (!$sent) {
    respond(502, ['ok' => false, 'error' => 'Chưa gửi được yêu cầu.']);
}

$hits[] = $now;
@file_put_contents($bucket, json_encode($hits), LOCK_EX);
respond(200, ['ok' => true]);

// ---------- Cách gửi email ----------

function encode_header(string $text): string
{
    return function_exists('mb_encode_mimeheader')
        ? mb_encode_mimeheader($text, 'UTF-8', 'B', "\r\n")
        : '=?UTF-8?B?' . base64_encode($text) . '?=';
}

function mime_headers(array $m, bool $includeToSubject): array
{
    $domain = substr(strrchr($m['from'], '@') ?: '@localhost', 1);
    $headers = [
        'Date: ' . date('r'),
        'From: ' . encode_header($m['from_name']) . ' <' . $m['from'] . '>',
        'Reply-To: ' . encode_header($m['reply_name']) . ' <' . $m['reply_to'] . '>',
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $domain . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
    ];
    if ($includeToSubject) {
        array_splice($headers, 2, 0, ['To: ' . implode(', ', $m['to']), 'Subject: ' . encode_header($m['subject'])]);
    }
    return $headers;
}

function encoded_body(string $body): string
{
    return rtrim(chunk_split(base64_encode(str_replace("\n", "\r\n", $body)), 76, "\r\n"));
}

function send_mail_fn(array $m): bool
{
    return mail(
        implode(', ', $m['to']),
        encode_header($m['subject']),
        encoded_body($m['body']),
        implode("\r\n", mime_headers($m, false)),
        '-f' . $m['from']
    );
}

function http_post(string $url, string $payload, array $headers): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
    ]);
    $body = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $error = curl_error($ch);
    if ($body === false) throw new RuntimeException('cURL: ' . $error);
    return ['status' => $status, 'body' => (string) $body];
}

/** Microsoft 365: Entra ID app có quyền Application «Mail.Send», giới hạn chỉ hộp thư gửi. */
function send_graph(array $g, array $m): bool
{
    foreach (['tenant_id', 'client_id', 'client_secret', 'sender'] as $key) {
        if (empty($g[$key])) throw new RuntimeException("Thiếu graph.$key trong cấu hình");
    }
    $token = http_post(
        'https://login.microsoftonline.com/' . rawurlencode($g['tenant_id']) . '/oauth2/v2.0/token',
        http_build_query([
            'client_id' => $g['client_id'],
            'client_secret' => $g['client_secret'],
            'scope' => 'https://graph.microsoft.com/.default',
            'grant_type' => 'client_credentials',
        ]),
        ['Content-Type: application/x-www-form-urlencoded']
    );
    $accessToken = json_decode($token['body'], true)['access_token'] ?? null;
    if (!$accessToken) throw new RuntimeException('Graph token lỗi HTTP ' . $token['status']);

    $message = [
        'message' => [
            'subject' => $m['subject'],
            'body' => ['contentType' => 'Text', 'content' => $m['body']],
            'toRecipients' => array_map(fn($address) => ['emailAddress' => ['address' => $address]], $m['to']),
            'replyTo' => [['emailAddress' => ['address' => $m['reply_to'], 'name' => $m['reply_name']]]],
        ],
        'saveToSentItems' => false,
    ];
    $result = http_post(
        'https://graph.microsoft.com/v1.0/users/' . rawurlencode($g['sender']) . '/sendMail',
        json_encode($message, JSON_UNESCAPED_UNICODE),
        ['Authorization: Bearer ' . $accessToken, 'Content-Type: application/json']
    );
    if ($result['status'] !== 202) throw new RuntimeException('Graph sendMail lỗi HTTP ' . $result['status'] . ': ' . $result['body']);
    return true;
}

/** SMTP tối giản: SSL (465) hoặc STARTTLS (587), xác thực AUTH LOGIN. */
function send_smtp(array $s, array $m): bool
{
    foreach (['host', 'port', 'username', 'password'] as $key) {
        if (empty($s[$key])) throw new RuntimeException("Thiếu smtp.$key trong cấu hình");
    }
    $secure = $s['secure'] ?? 'ssl';
    $target = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $s['host'] . ':' . (int) $s['port'];
    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $fp = @stream_socket_client($target, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
    if (!$fp) throw new RuntimeException("SMTP không kết nối được: $errstr ($errno)");
    stream_set_timeout($fp, 15);

    $read = function () use ($fp): string {
        $response = '';
        while (($line = fgets($fp, 515)) !== false) {
            $response .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $response;
    };
    $command = function (?string $line, array $expect) use ($fp, $read): string {
        if ($line !== null) fwrite($fp, $line . "\r\n");
        $response = $read();
        $code = (int) substr($response, 0, 3);
        if (!in_array($code, $expect, true)) throw new RuntimeException('SMTP ' . trim($response));
        return $response;
    };

    try {
        $helo = $_SERVER['SERVER_NAME'] ?? 'localhost';
        $command(null, [220]);
        $command("EHLO $helo", [250]);
        if ($secure === 'tls') {
            $command('STARTTLS', [220]);
            $method = STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
            if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) $method |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
            if (!stream_socket_enable_crypto($fp, true, $method)) throw new RuntimeException('SMTP STARTTLS thất bại');
            $command("EHLO $helo", [250]);
        }
        $command('AUTH LOGIN', [334]);
        $command(base64_encode($s['username']), [334]);
        $command(base64_encode($s['password']), [235]);
        $command('MAIL FROM:<' . $m['from'] . '>', [250]);
        foreach ($m['to'] as $recipient) $command('RCPT TO:<' . $recipient . '>', [250, 251]);
        $command('DATA', [354]);
        $command(implode("\r\n", mime_headers($m, true)) . "\r\n\r\n" . encoded_body($m['body']) . "\r\n.", [250]);
        $command('QUIT', [221]);
    } finally {
        fclose($fp);
    }
    return true;
}

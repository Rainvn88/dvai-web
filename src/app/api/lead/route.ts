// Nhận yêu cầu từ form «Nhận báo giá / Đặt lịch tư vấn» và gửi email về hộp thư bán hàng.
// Cấu hình bằng biến môi trường trên Vibe Host (xem .env.example và DEPLOY.md).
import { products, type LeadIntent } from "@/content/site";
import { intentLabels, limits, validateLead, type LeadValues } from "@/lib/lead";
import { graphConfig, sendMail } from "@/lib/mailer";

const RATE_MAX = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const MIN_FILL_MS = 1500;
const hits = new Map<string, number[]>();

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Chuỗi một dòng, bỏ ký tự điều khiển, cắt độ dài. */
function text(value: unknown, max: number, multiline = false) {
  if (typeof value !== "string") return "";
  const cleaned = value.replace(multiline ? /[^\P{C}\n]/gu : /\p{C}/gu, "").trim();
  return cleaned.slice(0, max);
}

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function allowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || "https://dvai.vn,https://www.dvai.vn")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const isDev = process.env.NODE_ENV !== "production";
  if (origin && !isDev && !allowedOrigins().includes(origin)) {
    return json(403, { ok: false, error: "Yêu cầu không hợp lệ." });
  }

  const raw = await request.text();
  if (raw.length > 20_000) return json(413, { ok: false, error: "Dữ liệu quá lớn." });
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "Dữ liệu không hợp lệ." });
  }

  // Ô bẫy spam có giá trị: bỏ qua nhưng vẫn trả về thành công.
  if (text(data.website, 200)) return json(200, { ok: true });
  if (typeof data.elapsed !== "number" || data.elapsed < MIN_FILL_MS) {
    return json(400, { ok: false, error: "Vui lòng đợi vài giây rồi gửi lại." });
  }

  const ip = clientIp(request);
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => t > now - RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    return json(429, { ok: false, error: "Bạn đã gửi nhiều yêu cầu trong thời gian ngắn." });
  }

  const intent: LeadIntent = data.intent === "tu-van" ? "tu-van" : "bao-gia";
  const values: LeadValues = {
    company: text(data.company, limits.company),
    name: text(data.name, limits.name),
    email: text(data.email, limits.email),
    phone: text(data.phone, limits.phone),
    users: text(data.users, 20),
    products: Array.isArray(data.products)
      ? data.products.filter((p): p is string => typeof p === "string" && (products as readonly string[]).includes(p))
      : [],
    message: text(data.message, limits.message, true),
    consent: data.consent === true,
  };
  const errors = validateLead(values);
  if (Object.keys(errors).length > 0) {
    return json(422, { ok: false, error: "Thông tin chưa hợp lệ.", fields: errors });
  }

  const utm = (typeof data.utm === "object" && data.utm !== null ? data.utm : {}) as Record<string, unknown>;
  const utmText = [text(utm.source, 100), text(utm.medium, 100), text(utm.campaign, 100)].filter(Boolean).join(" / ");
  const part = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Ho_Chi_Minh",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  const time = `${part.day}/${part.month}/${part.year} ${part.hour}:${part.minute}`;

  const subject = `[Website] ${intentLabels[intent]} - ${values.company}`;
  const body = [
    `Loại yêu cầu: ${intentLabels[intent]}`,
    `Công ty: ${values.company}`,
    `Người liên hệ: ${values.name}`,
    `Email: ${values.email}`,
    `Điện thoại: ${values.phone}`,
    `Số lượng người dùng: ${values.users}`,
    `Sản phẩm quan tâm: ${values.products.join(", ")}`,
    "",
    "Nội dung:",
    values.message || "(không có)",
    "",
    "---",
    `Trang gửi: ${text(data.page, 200) || "(không rõ)"}`,
    `Chiến dịch (UTM): ${utmText || "(không có)"}`,
    `Thời gian: ${time} (giờ Việt Nam)`,
    "Đồng ý xử lý dữ liệu cá nhân: Có",
    "",
    "Trả lời email này để phản hồi trực tiếp cho khách hàng.",
  ].join("\n");

  const config = graphConfig();
  if (!config) {
    if (isDev) {
      // Máy dev chưa có biến môi trường Microsoft 365: chỉ ghi ra console.
      console.info(`[lead] Bản dev, không gửi email:\n${subject}\n${body}`);
      hits.set(ip, [...recent, now]);
      return json(200, { ok: true });
    }
    console.error("[lead] Thiếu biến môi trường MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET hoặc MS_SENDER");
    return json(500, { ok: false, error: "Máy chủ chưa được cấu hình gửi email." });
  }

  const to = (process.env.LEAD_TO || "sales@dvai.vn")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  try {
    await sendMail(config, { to, subject, body, replyTo: { address: values.email, name: values.name } });
  } catch (error) {
    console.error("[lead]", error instanceof Error ? error.message : error);
    return json(502, { ok: false, error: "Chưa gửi được yêu cầu." });
  }

  hits.set(ip, [...recent, now]);
  if (hits.size > 5000) hits.clear();
  return json(200, { ok: true });
}

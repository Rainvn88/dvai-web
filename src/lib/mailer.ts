// Gửi email qua Microsoft Graph bằng app Entra ID (client credentials).
// Xem DEPLOY.md mục 3 về quyền gửi thư.

type Mail = {
  to: string[];
  subject: string;
  body: string;
  replyTo: { address: string; name: string };
};

type GraphConfig = { tenantId: string; clientId: string; clientSecret: string; sender: string };

/** Lỗi gửi email kèm mã ngắn để hiển thị khi chẩn đoán (không chứa bí mật). */
export class MailError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export function graphConfig(): GraphConfig | null {
  const tenantId = process.env.MS_TENANT_ID?.trim();
  const clientId = process.env.MS_CLIENT_ID?.trim();
  const clientSecret = process.env.MS_CLIENT_SECRET?.trim();
  const sender = process.env.MS_SENDER?.trim();
  if (!tenantId || !clientId || !clientSecret || !sender) return null;
  return { tenantId, clientId, clientSecret, sender };
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function request(url: string, init: RequestInit) {
  try {
    return await fetch(url, { ...init, cache: "no-store" });
  } catch (error) {
    throw new MailError("network", `Không kết nối được ${new URL(url).host}: ${error instanceof Error ? error.message : error}`);
  }
}

async function accessToken(config: GraphConfig) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const response = await request(
    `https://login.microsoftonline.com/${encodeURIComponent(config.tenantId)}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    },
  );
  const data = (await response.json().catch(() => null)) as
    | { access_token?: string; expires_in?: number; error?: string; error_description?: string }
    | null;
  if (!response.ok || !data?.access_token) {
    // Ví dụ AADSTS7000215 = sai client secret, AADSTS700016 = sai client ID, AADSTS90002 = sai tenant ID.
    const aadsts = data?.error_description?.match(/AADSTS\d+/)?.[0];
    throw new MailError(`token-${aadsts ?? data?.error ?? response.status}`, `Graph token lỗi HTTP ${response.status}: ${data?.error_description?.split("\r\n")[0] ?? ""}`);
  }
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return cachedToken.value;
}

export async function sendMail(config: GraphConfig, mail: Mail) {
  const token = await accessToken(config);
  const response = await request(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.sender)}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject: mail.subject,
        body: { contentType: "Text", content: mail.body },
        toRecipients: mail.to.map((address) => ({ emailAddress: { address } })),
        replyTo: [{ emailAddress: mail.replyTo }],
      },
      saveToSentItems: false,
    }),
  });
  if (response.status !== 202) {
    // Bỏ token đang lưu: token lấy trước khi quyền có hiệu lực sẽ không có quyền gửi thư.
    cachedToken = null;
    const detail = await response.text().catch(() => "");
    let graphCode = "";
    try {
      graphCode = (JSON.parse(detail) as { error?: { code?: string } }).error?.code ?? "";
    } catch {}
    // Ví dụ 403 ErrorAccessDenied = thiếu quyền Mail.Send, 404 ErrorInvalidUser = không tìm thấy hộp thư gửi.
    throw new MailError(`send-${response.status}${graphCode ? `-${graphCode}` : ""}`, `Graph sendMail lỗi HTTP ${response.status}: ${detail.slice(0, 300)}`);
  }
}

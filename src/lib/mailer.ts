// Gửi email qua Microsoft Graph bằng app Entra ID (client credentials).
// Quyền gửi được giới hạn bằng Exchange RBAC for Applications, chỉ cho hộp thư MS_SENDER. Xem DEPLOY.md.

type Mail = {
  to: string[];
  subject: string;
  body: string;
  replyTo: { address: string; name: string };
};

type GraphConfig = { tenantId: string; clientId: string; clientSecret: string; sender: string };

export function graphConfig(): GraphConfig | null {
  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;
  const sender = process.env.MS_SENDER;
  if (!tenantId || !clientId || !clientSecret || !sender) return null;
  return { tenantId, clientId, clientSecret, sender };
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function accessToken(config: GraphConfig) {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(config.tenantId)}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });
  const data = (await response.json().catch(() => null)) as { access_token?: string; expires_in?: number } | null;
  if (!response.ok || !data?.access_token) {
    throw new Error(`Graph token lỗi HTTP ${response.status}`);
  }
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return cachedToken.value;
}

export async function sendMail(config: GraphConfig, mail: Mail) {
  const token = await accessToken(config);
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.sender)}/sendMail`, {
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
    cache: "no-store",
  });
  if (response.status !== 202) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Graph sendMail lỗi HTTP ${response.status}: ${detail.slice(0, 300)}`);
  }
}

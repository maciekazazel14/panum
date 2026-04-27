// Cloudflare Worker: receives panum.pl contact form, relays via Resend.
// Env: RESEND_API_KEY (secret), TO_EMAIL, FROM_EMAIL, ORIGIN_ALLOW (vars)

interface Env {
  RESEND_API_KEY: string;
  TO_EMAIL: string;
  FROM_EMAIL: string;
  ORIGIN_ALLOW: string;
}

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10 MB — matches form copy
const MAX_MESSAGE_LEN = 5000;
const ALLOWED_FILE_EXT = /\.(stl|3mf|step|stp|obj|zip|pdf|jpg|jpeg|png)$/i;

const INQUIRY_LABEL: Record<string, string> = {
  "print-file": "Druk z pliku",
  "modeling": "Modelowanie",
  "project-quote": "Wycena projektu",
  "other": "Inne",
};

function corsHeaders(origin: string | null, allowList: string): HeadersInit {
  const allowed = allowList.split(",").map((s) => s.trim());
  const allowOrigin = origin && allowed.includes(origin) ? origin : allowed[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(status: number, body: unknown, extraHeaders: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extraHeaders },
  });
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fieldString(form: FormData, key: string, max = 1000): string {
  const v = form.get(key);
  if (typeof v !== "string") return "";
  return v.slice(0, max).trim();
}

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function fileToBase64(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  // base64 in chunks to avoid stack overflow on large files
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, env.ORIGIN_ALLOW);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    if (!url.pathname.endsWith("/api/contact")) {
      return json(404, { error: "not_found" }, cors);
    }

    if (request.method !== "POST") {
      return json(405, { error: "method_not_allowed" }, cors);
    }

    const ct = request.headers.get("Content-Type") || "";
    if (!ct.includes("multipart/form-data")) {
      return json(415, { error: "unsupported_media_type" }, cors);
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return json(400, { error: "invalid_form" }, cors);
    }

    // Honeypot — Web3Forms-style: bots usually fill all fields
    if (fieldString(form, "botcheck")) {
      return json(200, { success: true }, cors);
    }

    const name = fieldString(form, "name", 200);
    const email = fieldString(form, "email", 200);
    const phone = fieldString(form, "phone", 50);
    const inquiryType = fieldString(form, "inquiry_type", 50) || "other";
    const message = fieldString(form, "message", MAX_MESSAGE_LEN);
    const rodo = form.get("rodo");

    if (!email || !isValidEmail(email)) {
      return json(400, { error: "invalid_email" }, cors);
    }
    if (!message) {
      return json(400, { error: "missing_message" }, cors);
    }
    if (!rodo) {
      return json(400, { error: "missing_rodo_consent" }, cors);
    }

    // Optional attachment
    const attachments: { filename: string; content: string }[] = [];
    const file = form.get("attachment");
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_ATTACHMENT_BYTES) {
        return json(413, { error: "attachment_too_large", limit: MAX_ATTACHMENT_BYTES }, cors);
      }
      if (!ALLOWED_FILE_EXT.test(file.name)) {
        return json(400, { error: "attachment_type_not_allowed" }, cors);
      }
      attachments.push({
        filename: file.name,
        content: await fileToBase64(file),
      });
    }

    const inquiryLabel = INQUIRY_LABEL[inquiryType] ?? inquiryType;
    const cfRay = request.headers.get("CF-Ray") ?? "";
    const cfCountry = request.headers.get("CF-IPCountry") ?? "";

    const subject = `panum.pl • ${inquiryLabel}${name ? ` • ${name}` : ""}`;

    const text = [
      `Nowe zapytanie z panum.pl`,
      `Rodzaj: ${inquiryLabel}`,
      `---`,
      name ? `Nadawca: ${name}` : null,
      `Email: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      attachments.length ? `Załącznik: ${attachments[0].filename}` : null,
      `---`,
      `Wiadomość:`,
      message,
      `---`,
      cfRay && `CF-Ray: ${cfRay}`,
      cfCountry && `Country: ${cfCountry}`,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;color:#0f172a;line-height:1.55">
        <tr><td>
          <h2 style="margin:0 0 12px;font-size:18px">Nowe zapytanie z panum.pl</h2>
          <p style="margin:0 0 16px;color:#64748b;font-size:13px"><strong>Rodzaj:</strong> ${escapeHtml(inquiryLabel)}</p>
          <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">
            ${name ? `<tr><td style="color:#64748b">Nadawca</td><td><strong>${escapeHtml(name)}</strong></td></tr>` : ""}
            <tr><td style="color:#64748b">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            ${phone ? `<tr><td style="color:#64748b">Telefon</td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>` : ""}
            ${attachments.length ? `<tr><td style="color:#64748b">Załącznik</td><td>${escapeHtml(attachments[0].filename)}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:18px 0" />
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
          ${cfRay ? `<p style="margin:24px 0 0;color:#94a3b8;font-size:11px">CF-Ray: ${escapeHtml(cfRay)}${cfCountry ? ` · ${escapeHtml(cfCountry)}` : ""}</p>` : ""}
        </td></tr>
      </table>
    `.trim();

    const payload: Record<string, unknown> = {
      from: env.FROM_EMAIL,
      to: [env.TO_EMAIL],
      reply_to: email,
      subject,
      text,
      html,
    };
    if (attachments.length) payload.attachments = attachments;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("resend_error", res.status, detail);
      return json(502, { error: "send_failed" }, cors);
    }

    return json(200, { success: true }, cors);
  },
};

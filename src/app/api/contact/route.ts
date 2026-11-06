import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/config/env";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email is required").max(320),
  phone: z.string().trim().max(30).optional().default(""),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "127.0.0.1";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid input data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, phone, subject, message } = result.data;

    // Dispatch to Google Apps Script webhook (Google Sheets row insertion)
    if (env.GOOGLE_APPS_SCRIPT_URL) {
      try {
        await fetch(env.GOOGLE_APPS_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email: email.toLowerCase(),
            phone: phone || "",
            subject,
            message,
            date: new Date().toISOString(),
          }),
        });
      } catch {
        // Continue cleanly
      }
    }

    // Dispatch formatted HTML notification email via Resend API
    if (env.RESEND_API_KEY) {
      try {
        const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f5f5f0;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border:1px solid #e8e4dd;">
          <tr>
            <td style="padding:40px 40px 20px;">
              <p style="font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#b8a88a;margin:0 0 16px;font-family:Arial,sans-serif;">New Website Contact</p>
              <h1 style="font-size:24px;font-weight:500;color:#1a1a1a;margin:0 0 24px;font-family:Georgia,serif;">${escapeHtml(subject)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e8e4dd;">
                <tr>
                  <td style="padding:20px 0 12px;">
                    <p style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8a8a;margin:0 0 4px;font-family:Arial,sans-serif;">From</p>
                    <p style="font-size:14px;color:#1a1a1a;margin:0;font-family:Arial,sans-serif;">${escapeHtml(name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 12px;">
                    <p style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8a8a;margin:0 0 4px;font-family:Arial,sans-serif;">Email</p>
                    <p style="font-size:14px;color:#1a1a1a;margin:0;font-family:Arial,sans-serif;"><a href="mailto:${escapeHtml(email)}" style="color:#1a1a1a;">${escapeHtml(email)}</a></p>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding:0 0 12px;">
                    <p style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8a8a;margin:0 0 4px;font-family:Arial,sans-serif;">Phone</p>
                    <p style="font-size:14px;color:#1a1a1a;margin:0;font-family:Arial,sans-serif;">${escapeHtml(phone)}</p>
                  </td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding:0 0 12px;">
                    <p style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8a8a;margin:0 0 4px;font-family:Arial,sans-serif;">Subject</p>
                    <p style="font-size:14px;color:#1a1a1a;margin:0;font-family:Arial,sans-serif;">${escapeHtml(subject)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;">
                    <p style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8a8a;margin:0 0 8px;font-family:Arial,sans-serif;">Message</p>
                    <p style="font-size:14px;color:#1a1a1a;margin:0;line-height:1.7;font-family:Arial,sans-serif;white-space:pre-wrap;">${escapeHtml(message)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #e8e4dd;">
              <p style="font-size:11px;color:#b8a88a;margin:0;font-family:Arial,sans-serif;">Sent from Sani Ul Website Contact Form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Sani Ul Website <onboarding@resend.dev>",
            to: [env.CONTACT_EMAIL || "ulsani42@gmail.com"],
            subject: `New Website Contact — ${subject.trim()}`,
            html: emailHtml,
            reply_to: email.trim().toLowerCase(),
          }),
        });
      } catch {
        // Continue cleanly
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}


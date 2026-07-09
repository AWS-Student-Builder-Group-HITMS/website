/**
 * Vercel Serverless Function: Contact Form Handler
 * Endpoint: /api/contact
 * Method: POST
 * Handles contact form submissions and sends emails via Resend
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { Resend } from "resend";

declare const process: {
  cwd(): string;
  env: Record<string, string | undefined>;
};

interface VercelRequest {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[]>;
}

interface VercelResponse {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
  end: (body?: unknown) => void;
}

const envFilePath = path.resolve(process.cwd(), ".env.local");

function loadEnvFile() {
  if (!existsSync(envFilePath)) {
    return;
  }

  for (const rawLine of readFileSync(envFilePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ResendEmailResult {
  error?: unknown;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateContactForm = (data: unknown): data is ContactFormPayload => {
  if (!data || typeof data !== "object") return false;

  const form = data as Record<string, unknown>;

  return (
    typeof form.name === "string" &&
    form.name.trim().length > 0 &&
    form.name.trim().length <= 100 &&
    typeof form.email === "string" &&
    validateEmail(form.email) &&
    typeof form.subject === "string" &&
    form.subject.trim().length > 0 &&
    form.subject.trim().length <= 200 &&
    typeof form.message === "string" &&
    form.message.trim().length > 0 &&
    form.message.trim().length <= 5000
  );
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate request body
    if (!validateContactForm(req.body)) {
      return res.status(400).json({
        error: "Invalid form data. Please check all fields.",
        details: {
          name: "Required, 1-100 characters",
          email: "Valid email required",
          subject: "Required, 1-200 characters",
          message: "Required, 1-5000 characters",
        },
      });
    }

    const { name, email, subject, message } = req.body;

    // Email content - Admin notification
    const adminHtmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="border-top: 4px solid #FF9900; padding-top: 20px; margin-bottom: 30px;">
          <h1 style="color: #FF9900; margin: 0; font-size: 24px;">📬 New Contact Form Submission</h1>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0 0 15px 0;"><strong>From:</strong></p>
          <p style="margin: 0 0 5px 0; color: #666; font-weight: 500;">${name}</p>
          <p style="margin: 0; color: #666;"><a href="mailto:${email}" style="color: #FF9900; text-decoration: none;">${email}</a></p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="color: #FF9900; font-size: 16px; margin: 0 0 10px 0;">Subject</h2>
          <p style="margin: 0; color: #333; font-weight: 500;">${subject}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h2 style="color: #FF9900; font-size: 16px; margin: 0 0 10px 0;">Message</h2>
          <div style="background: #fafafa; padding: 15px; border-left: 3px solid #FF9900; border-radius: 4px;">
            <p style="margin: 0; color: #333; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #999;">
          <p style="margin: 0;"><strong>Quick Reply:</strong> <a href="mailto:${email}" style="color: #FF9900; text-decoration: none;">Reply to ${name}</a></p>
          <p style="margin: 8px 0 0 0;">Sent from AWS SBG HITMS Contact Form</p>
          <p style="margin: 4px 0 0 0;">Timestamp: ${new Date().toISOString()}</p>
        </div>
      </div>
    `;

    // Email content - User confirmation
    const userHtmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="border-top: 4px solid #FF9900; padding-top: 20px; margin-bottom: 30px;">
          <h1 style="color: #FF9900; margin: 0; font-size: 24px;">✨ Thank You for Reaching Out!</h1>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Hi ${name},
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #666;">
          We've received your message and appreciate you taking the time to reach out! Our team will review your message and get back to you as soon as possible, typically within 24-48 hours.
        </p>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 3px solid #FF9900;">
          <h3 style="color: #FF9900; font-size: 14px; margin: 0 0 12px 0;">Your Message Details</h3>
          <p style="margin: 0 0 8px 0; color: #666;"><strong>Subject:</strong> ${subject}</p>
          <p style="margin: 0; color: #666;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #666;">
          In the meantime, feel free to connect with us on social media or join our community:
        </p>

        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <ul style="margin: 0; padding-left: 20px; color: #666;">
            <li style="margin-bottom: 10px;"><a href="https://www.linkedin.com/company/aws-student-builder-group-hitms" style="color: #FF9900; text-decoration: none;"><strong>LinkedIn</strong></a> - Follow for announcements</li>
            <li style="margin-bottom: 10px;"><a href="https://www.instagram.com/awssbghitms" style="color: #FF9900; text-decoration: none;"><strong>Instagram</strong></a> - Daily updates & stories</li>
            <li style="margin-bottom: 10px;"><a href="https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq" style="color: #FF9900; text-decoration: none;"><strong>WhatsApp</strong></a> - Join our community</li>
            <li><a href="https://www.meetup.com/aws-sbg-at-hitms/" style="color: #FF9900; text-decoration: none;"><strong>Meetup</strong></a> - Upcoming events & workshops</li>
          </ul>
        </div>

        <p style="font-size: 16px; line-height: 1.6; color: #666;">
          Best regards,<br>
          <strong>AWS Student Builder Group HITMS</strong><br>
          <span style="font-size: 14px; color: #999;">Building Tomorrow's Cloud Leaders Today</span>
        </p>

        <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
          <p style="margin: 0;">This is an automated confirmation email. Please do not reply to this email.</p>
        </div>
      </div>
    `;

    if (!resend) {
      return res.status(200).json({
        success: true,
        message:
          "Your message was received locally. Configure RESEND_API_KEY to enable email delivery.",
        data: {
          id: "local-dev-preview",
          timestamp: new Date().toISOString(),
        },
      });
    }

    // Send admin notification
    const adminResult = await resend.emails.send({
      from: "AWS SBG Contact Form <onboarding@resend.dev>",
      to: process.env.RESEND_CONTACT_EMAIL || "ahmedhussain12566521@gmail.com",
      replyTo: email,
      subject: `📬 Contact Form: ${subject}`,
      html: adminHtmlContent,
    });
    const adminResultData = adminResult as ResendEmailResult;

    if (adminResultData?.error) {
      console.error("Admin email error:", adminResultData.error);
      return res.status(500).json({
        error: "Failed to send message. Please try again later.",
      });
    }

    // Send user confirmation
    await resend.emails
      .send({
        from: "AWS SBG HITMS <onboarding@resend.dev>",
        to: email,
        subject: "✨ We received your message",
        html: userHtmlContent,
      })
      .catch((error: unknown) => {
        console.error("User confirmation email error:", error);
        // Don't fail the request if confirmation email fails
      });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully! We'll be in touch soon.",
      data: {
        id: adminResult?.id || "resend-send",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
}

/**
 * Resend Email Service Utility
 * Handles email sending for contact form and other notifications
 */

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Send contact form email via Resend
 * @param data - Contact form data
 * @returns Promise with email send result
 */
export async function sendContactEmail(data: ContactFormData) {
  const { name, email, subject, message } = data;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="border-top: 4px solid #FF9900; padding-top: 20px; margin-bottom: 30px;">
        <h1 style="color: #FF9900; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      </div>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0 0 15px 0;"><strong>From:</strong></p>
        <p style="margin: 0 0 10px 0; color: #666;">${name}</p>
        <p style="margin: 0 0 10px 0; color: #666;">${email}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h2 style="color: #FF9900; font-size: 16px; margin: 0 0 10px 0;">Subject</h2>
        <p style="margin: 0; color: #333;">${subject}</p>
      </div>

      <div style="margin-bottom: 20px;">
        <h2 style="color: #FF9900; font-size: 16px; margin: 0 0 10px 0;">Message</h2>
        <p style="margin: 0; color: #333; white-space: pre-wrap; line-height: 1.6;">${message}</p>
      </div>

      <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #999;">
        <p style="margin: 0;">This email was sent from AWS SBG HITMS Contact Form</p>
        <p style="margin: 0;">Sent at: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;

  const plainTextContent = `
    New Contact Form Submission

    From: ${name}
    Email: ${email}

    Subject: ${subject}

    Message:
    ${message}

    ---
    Sent from AWS SBG HITMS Contact Form
    Sent at: ${new Date().toLocaleString()}
  `;

  try {
    const result = await resend.emails.send({
      from: "AWS SBG HITMS <onboarding@resend.dev>",
      to: process.env.RESEND_CONTACT_EMAIL || "contact@sbg-hitms.dev",
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: htmlContent,
      text: plainTextContent,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

/**
 * Send confirmation email to the user
 * @param email - User email
 * @param name - User name
 */
export async function sendConfirmationEmail(email: string, name: string) {
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="border-top: 4px solid #FF9900; padding-top: 20px; margin-bottom: 30px;">
        <h1 style="color: #FF9900; margin: 0; font-size: 24px;">Thank You for Reaching Out! 🚀</h1>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
        Hi ${name},
      </p>

      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #666;">
        We've received your message and will get back to you as soon as possible. Our team typically responds within 24-48 hours.
      </p>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h2 style="color: #FF9900; font-size: 16px; margin: 0 0 15px 0;">Quick Links</h2>
        <ul style="margin: 0; padding-left: 20px; color: #666;">
          <li style="margin-bottom: 8px;"><a href="https://www.linkedin.com/company/aws-student-builder-group-hitms" style="color: #FF9900; text-decoration: none;">Follow us on LinkedIn</a></li>
          <li style="margin-bottom: 8px;"><a href="https://www.instagram.com/awssbghitms" style="color: #FF9900; text-decoration: none;">Connect on Instagram</a></li>
          <li style="margin-bottom: 8px;"><a href="https://chat.whatsapp.com/FgyyG0kLNIKIovBwenLagq" style="color: #FF9900; text-decoration: none;">Join our WhatsApp Community</a></li>
          <li><a href="https://www.meetup.com/aws-sbg-at-hitms/" style="color: #FF9900; text-decoration: none;">Check our Meetup Events</a></li>
        </ul>
      </div>

      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 10px; color: #666;">
        In the meantime, check out our community and stay updated with the latest AWS Student Builder Group initiatives!
      </p>

      <p style="font-size: 16px; line-height: 1.6; color: #666;">
        Best regards,<br>
        <strong>AWS Student Builder Group HITMS Team</strong>
      </p>

      <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
        <p style="margin: 0;">AWS Student Builder Group - HITMS</p>
        <p style="margin: 5px 0 0 0;">Building Tomorrow's Cloud Leaders Today</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "AWS SBG HITMS <onboarding@resend.dev>",
      to: email,
      subject: "We received your message ✓",
      html: htmlContent,
    });
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}

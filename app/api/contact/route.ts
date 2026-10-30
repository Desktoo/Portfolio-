import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const message = body.message?.trim() || "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are all required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const smtpHost = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER?.trim();
    // Strip spaces so 16-letter Google App Passwords work whether pasted as "abcd efgh ijkl mnop" or "abcdefghijklmnop"
    const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, "");
    const receiverEmail = (
      process.env.CONTACT_RECEIVER_EMAIL || smtpUser
    )?.trim();

    if (!smtpUser || !smtpPass || !receiverEmail) {
      return NextResponse.json(
        {
          error:
            "SMTP credentials are not configured yet. Please set SMTP_USER and SMTP_PASS in .env.local.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const cleanName = name.replace(/["<>]/g, "");

    await transporter.sendMail({
      // Display the visitor's name & email as the sender label while authenticating via your SMTP account,
      // and set replyTo to the visitor's actual email so clicking "Reply" in your inbox replies straight to them.
      from: `"${cleanName} (${email})" <${smtpUser}>`,
      replyTo: `"${cleanName}" <${email}>`,
      to: receiverEmail,
      subject: `Portfolio Inquiry from ${cleanName} <${email}>`,
      text: [
        `New message from your portfolio contact form:`,
        ``,
        `From: ${cleanName}`,
        `Email: ${email}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 4px;">New Portfolio Message</h2>
          <p style="margin-top: 0; color: #4B5563; font-size: 14px;">
            You received a new inquiry from your portfolio website. Hit <strong>Reply</strong> to respond directly to ${cleanName}.
          </p>
          <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 16px 0;" />
          <p style="margin: 4px 0;"><strong>From:</strong> ${cleanName}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <div style="margin-top: 16px; padding: 16px; background: #F9FAFB; border-left: 3px solid #111827; white-space: pre-wrap;">${message
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("SMTP Contact Error:", error);
    return NextResponse.json(
      {
        error:
          "Failed to send message via SMTP. Please verify your SMTP configuration.",
      },
      { status: 500 }
    );
  }
}

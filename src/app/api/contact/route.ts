import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, subject, service, message } = body;

    // Validate data types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof service !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid form data." },
        { status: 400 },
      );
    }

    // Clean input
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanService = service.trim();
    const cleanMessage = message.trim();

    // Required fields
    if (
      !cleanName ||
      !cleanEmail ||
      !cleanSubject ||
      !cleanService ||
      !cleanMessage
    ) {
      return NextResponse.json(
        { success: false, message: "Please fill in all fields." },
        { status: 400 },
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 400 },
      );
    }

    // Validate field lengths
    if (
      cleanName.length > 100 ||
      cleanEmail.length > 254 ||
      cleanSubject.length > 150 ||
      cleanService.length > 100 ||
      cleanMessage.length < 10 ||
      cleanMessage.length > 5000
    ) {
      return NextResponse.json(
        { success: false, message: "Please check your form information." },
        { status: 400 },
      );
    }

    // Environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("Missing email environment variables.");

      return NextResponse.json(
        { success: false, message: "Email configuration is missing." },
        { status: 500 },
      );
    }

    // Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Verify Gmail connection
    await transporter.verify();

    // Send email
    await transporter.sendMail({
      from: `"DeveloperJoy Contact" <${emailUser}>`,
      to: "mehedihasan958327@gmail.com",
      replyTo: cleanEmail,
      subject: `New Contact Message: ${cleanSubject}`,
      text: `
New message from your portfolio website.

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
Service: ${cleanService}

Project Details:
${cleanMessage}
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Nodemailer Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown email error";

    return NextResponse.json(
      {
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? errorMessage
            : "Failed to send your message. Please try again later.",
      },
      { status: 500 },
    );
  }
}

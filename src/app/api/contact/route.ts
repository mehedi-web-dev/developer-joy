import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, subject, service, message } = body;

    // Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !service?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { success: false, message: "Please fill in all fields." },
        { status: 400 },
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address." },
        { status: 400 },
      );
    }

    // Validate field lengths
    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length < 10 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid form data." },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const { error } = await resend.emails.send({
      from: "DeveloperJoy Contact <onboarding@resend.dev>",
      to: ["joykhanfiverr@gmail.com"],
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `
New contact form submission

Name: ${name}
Email: ${email}
Service: ${service}
Subject: ${subject}

Project Details:
${message}
      `,
    });

    if (error) {
      console.error("Resend Error:", error);

      return NextResponse.json(
        { success: false, message: "Unable to send your message." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}

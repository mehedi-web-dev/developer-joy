// src/app/api/admin/uploads/images/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api-config";

export const dynamic = "force-dynamic";

/**
 * First-party authenticated upload proxy.
 *
 * Accepts multipart image uploads from the authenticated admin in the browser,
 * securely forwards the HttpOnly session cookie to the backend requireAdmin endpoint,
 * and streams the backend ImgBB upload result back to the frontend.
 */
export async function POST(req: NextRequest) {
  const backendBase = getApiBaseUrl();
  const targetUrl = `${backendBase}/api/admin/uploads/images`;

  const contentType = req.headers.get("content-type");
  if (!contentType || !contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { success: false, message: "Invalid content type. Expected multipart/form-data." },
      { status: 400 }
    );
  }

  const forwardHeaders = new Headers();
  forwardHeaders.set("content-type", contentType);
  forwardHeaders.set("accept", "application/json");

  // Securely forward HttpOnly session cookie from the incoming first-party request
  const cookie = req.headers.get("cookie");
  if (cookie) {
    forwardHeaders.set("cookie", cookie);
  }

  // Forward origin
  const origin = req.headers.get("origin") || req.nextUrl.origin;
  if (origin) {
    forwardHeaders.set("origin", origin);
  }

  let body: ArrayBuffer;
  try {
    body = await req.arrayBuffer();
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to read upload payload." },
      { status: 400 }
    );
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(targetUrl, {
      method: "POST",
      headers: forwardHeaders,
      body,
    });
  } catch (err: any) {
    console.error("[Upload Proxy] Failed to communicate with backend:", err?.message);
    return NextResponse.json(
      { success: false, message: "Upload service temporarily unreachable. Please try again." },
      { status: 502 }
    );
  }

  // Remove hop-by-hop and decompression-invalidated response headers
  const STRIP_RESPONSE_HEADERS = new Set([
    "content-encoding",
    "content-length",
    "transfer-encoding",
    "connection",
    "keep-alive",
  ]);

  const responseHeaders = new Headers();
  backendRes.headers.forEach((value, key) => {
    if (!STRIP_RESPONSE_HEADERS.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  const responseBody = await backendRes.arrayBuffer();

  return new NextResponse(responseBody, {
    status: backendRes.status,
    statusText: backendRes.statusText,
    headers: responseHeaders,
  });
}

// src/app/api/auth/[...all]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApiBaseUrl } from "@/lib/api-config";

export const dynamic = "force-dynamic";

async function proxyAuthRequest(req: NextRequest) {
  const backendBase = getApiBaseUrl();
  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;
  const targetUrl = `${backendBase}${pathname}${search}`;

  const forwardHeaders = new Headers();

  // Forward incoming headers (except host and content-length)
  req.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey !== "host" && lowerKey !== "content-length") {
      forwardHeaders.set(key, value);
    }
  });

  // Ensure origin is explicitly set to the incoming request's origin
  const origin = req.headers.get("origin") || req.nextUrl.origin;
  if (origin) {
    forwardHeaders.set("origin", origin);
  }

  const init: RequestInit = {
    method: req.method,
    headers: forwardHeaders,
    redirect: "manual",
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      init.body = await req.arrayBuffer();
    } catch {
      // Empty or unreadable body
    }
  }

  let backendRes: Response;
  try {
    backendRes = await fetch(targetUrl, init);
  } catch (err: any) {
    console.error(`[Auth Proxy] Failed to reach backend at ${targetUrl}:`, err?.message);
    return NextResponse.json(
      { success: false, message: "Authentication service temporarily unreachable" },
      { status: 502 }
    );
  }

  const responseHeaders = new Headers();
  backendRes.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "set-cookie") {
      responseHeaders.set(key, value);
    }
  });

  const response = new NextResponse(backendRes.body, {
    status: backendRes.status,
    statusText: backendRes.statusText,
    headers: responseHeaders,
  });

  // Extract and preserve all Set-Cookie headers from the backend
  const setCookies = backendRes.headers.getSetCookie
    ? backendRes.headers.getSetCookie()
    : [];

  if (setCookies.length > 0) {
    for (const rawCookie of setCookies) {
      // Normalize cookie attributes for first-party frontend domain
      // Strip any foreign Domain attribute so the cookie belongs to this frontend origin
      let normalizedCookie = rawCookie.replace(/Domain=[^;]+;?\s*/gi, "");

      // Ensure SameSite=Lax for reliable first-party browser navigation
      if (/SameSite=None/i.test(normalizedCookie)) {
        normalizedCookie = normalizedCookie.replace(/SameSite=None/gi, "SameSite=Lax");
      }

      response.headers.append("set-cookie", normalizedCookie);
    }
  } else {
    const singleSetCookie = backendRes.headers.get("set-cookie");
    if (singleSetCookie) {
      let normalizedCookie = singleSetCookie.replace(/Domain=[^;]+;?\s*/gi, "");
      if (/SameSite=None/i.test(normalizedCookie)) {
        normalizedCookie = normalizedCookie.replace(/SameSite=None/gi, "SameSite=Lax");
      }
      response.headers.set("set-cookie", normalizedCookie);
    }
  }

  return response;
}

export const GET = proxyAuthRequest;
export const POST = proxyAuthRequest;
export const PUT = proxyAuthRequest;
export const DELETE = proxyAuthRequest;
export const PATCH = proxyAuthRequest;
export const OPTIONS = proxyAuthRequest;

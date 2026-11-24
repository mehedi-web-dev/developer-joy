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

  if (req.method !== "GET" && req.method !== "HEAD" && req.method !== "OPTIONS") {
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
    console.error(`[Auth Proxy] Failed to reach backend:`, err?.message);
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          Allow: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        },
      });
    }
    return NextResponse.json(
      { success: false, message: "Authentication service temporarily unreachable" },
      { status: 502 }
    );
  }

  // Remove response headers that become invalid after decompression or are hop-by-hop
  const STRIP_RESPONSE_HEADERS = new Set([
    "content-encoding",
    "content-length",
    "transfer-encoding",
    "connection",
    "keep-alive",
    "set-cookie", // Handled separately via getSetCookie()
  ]);

  const responseHeaders = new Headers();
  backendRes.headers.forEach((value, key) => {
    if (!STRIP_RESPONSE_HEADERS.has(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  // Status 204 (No Content), 205 (Reset Content), and 304 (Not Modified) MUST NOT include a response body
  const isNoContent =
    backendRes.status === 204 ||
    backendRes.status === 205 ||
    backendRes.status === 304;

  const responseBody = isNoContent ? null : await backendRes.arrayBuffer();

  const response = new NextResponse(responseBody, {
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

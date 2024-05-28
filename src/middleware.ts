import { NextRequest, NextResponse } from "next/server";

import { AUTH_PATHS } from "./constans/route";

const VERIFY_TOKEN_URL = "http://localhost:3000/api/verifyToken";

async function verifyToken(token: string) {
  try {
    const response = await fetch(VERIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    return response.ok;
  } catch (error) {
    console.error("Fetch error:", error);
    return false;
  }
}

function clearTokenAndRedirect(url: string, search: string) {
  const clearResponse = NextResponse.redirect(new URL(`/${search}`, url));
  clearResponse.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: -1,
  });
  return clearResponse;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname, search } = request.nextUrl;

  if (token) {
    if (AUTH_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL(`/browse${search}`, request.url));
    }

    const isTokenValid = await verifyToken(token);
    if (isTokenValid) {
      return NextResponse.next();
    } else {
      return clearTokenAndRedirect(request.url, search);
    }
  } else {
    if (pathname === "/browse") {
      return NextResponse.redirect(new URL(`/${search}`, request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [...AUTH_PATHS, "/browse"],
};

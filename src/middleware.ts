import { NextRequest, NextResponse } from "next/server";

import { AUTH_PATHS, NO_AUTH_PATHS } from "./constants/route";

const getVerifyTokenUrl = () => {
	if (process.env.VERCEL_ENV) {
		const vercelUrl = `https://${process.env.VERCEL_URL}`;

		return `${vercelUrl}/api/auth/verifyToken`;
	}

	return "http://localhost:3000/api/auth/verifyToken";
};

async function verifyToken(token: string, url: string) {
	const VERIFY_TOKEN_URL = getVerifyTokenUrl();

	try {
		const response = await fetch(new URL(VERIFY_TOKEN_URL, url), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.status === 200;
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
	console.log("🚀 ~ middleware ~ pathname:", pathname);

	if (request.method !== "GET") {
		return NextResponse.next();
	}

	if (token) {
		if (NO_AUTH_PATHS.includes(pathname)) {
			return NextResponse.redirect(new URL(`/browse${search}`, request.url));
		}

		const isTokenValid = await verifyToken(token, request.url);
		if (isTokenValid) {
			return NextResponse.next();
		} else {
			return clearTokenAndRedirect(request.url, search);
		}
	} else {
		if (AUTH_PATHS.includes(pathname)) {
			return NextResponse.redirect(new URL(`/${search}`, request.url));
		}

		return NextResponse.next();
	}
}

export const config = {
	matcher: [
		"/((?!api|_next/static/|_next/image/|images/|videos/|favicon.ico).*)",
	],
};

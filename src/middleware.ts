import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	const { pathname } = request.nextUrl;

	// Check if the user has a token
	if (token) {
		// If user is trying to access the login or signup pages, redirect to browse
		if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
			return NextResponse.redirect(new URL("/browse", request.url));
		}

		try {
			const response = await fetch("http://localhost:3000/api/verifyToken", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ token }),
			});

			if (response.ok) {
				return NextResponse.next();
			} else {
				return NextResponse.redirect(new URL("/", request.url));
			}
		} catch (error) {
			console.error("Fetch error:", error);
			return NextResponse.redirect(new URL("/", request.url));
		}
	} else {
		// If no token, allow the user to access the public pages or redirect to home if trying to access /browse
		if (pathname === "/browse") {
			return NextResponse.redirect(new URL("/", request.url));
		}
		return NextResponse.next();
	}
}

export const config = {
	matcher: ["/", "/login", "/signup", "/browse"],
};

import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;
	console.log("🚀 ~ token:", token);
	const { pathname, search } = request.nextUrl;

	if (token) {
		if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
			return NextResponse.redirect(new URL(`/browse${search}`, request.url));
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
				// Clear the token if it's invalid
				const clearResponse = NextResponse.redirect(new URL(`/${search}`, request.url));
				clearResponse.cookies.set("token", "", { httpOnly: true, secure: true, path: "/", maxAge: -1 });
				return clearResponse;
			}
		} catch (error) {
			console.error("Fetch error:", error);
			// Clear the token in case of fetch error
			const clearResponse = NextResponse.redirect(new URL(`/${search}`, request.url));
			clearResponse.cookies.set("token", "", { httpOnly: true, secure: true, path: "/", maxAge: -1 });
			return clearResponse;
		}
	} else {
		if (pathname === "/browse") {
			return NextResponse.redirect(new URL(`/${search}`, request.url));
		}
		return NextResponse.next();
	}
}

export const config = {
	matcher: ["/", "/login", "/signup", "/browse"],
};

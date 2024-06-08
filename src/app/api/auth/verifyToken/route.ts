import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { admin } from "@/firebaseAdmin";

export async function GET() {
	const authorization = headers().get("Authorization");
	const token = authorization?.split("Bearer ")[1];

	if (!token) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(token);
		if (decodedToken) {
			return NextResponse.json({ message: "Token is valid" }, { status: 200 });
		} else throw new Error("Invalid token");
	} catch (error) {
		const response = NextResponse.json(
			{ message: "Invalid token" },
			{ status: 401 },
		);
		response.cookies.set("token", "", {
			httpOnly: true,
			secure: true,
			path: "/",
			maxAge: -1,
		});
		return response;
	}
}

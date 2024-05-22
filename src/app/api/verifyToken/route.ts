import { verifyIdToken } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { token } = await request.json();

	try {
		await verifyIdToken(token);
		return NextResponse.json({ message: "Token is valid" }, { status: 200 });
	} catch (error) {
		const response = NextResponse.json({ message: "Invalid token" }, { status: 401 });
		response.cookies.set("token", "", { httpOnly: true, secure: true, path: "/", maxAge: -1 });
		return response;
	}
}

import { verifyIdToken } from "@/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { token } = await request.json();

	try {
		await verifyIdToken(token);
		return NextResponse.json({ message: "Token is valid" }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 });
	}
}

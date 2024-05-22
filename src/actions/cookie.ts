"use server";

import { cookies } from "next/headers";

export async function setCookie(token: string) {
	cookies().set("token", token, { httpOnly: true, secure: true, path: "/" });
}

export async function clearToken() {
	console.log("🚀 all cookie", cookies().getAll());
	cookies().set("token", "", { httpOnly: true, secure: true, path: "/", maxAge: -1 });
}

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setCookie(token: string) {
	cookies().set("token", token, { httpOnly: true, secure: true, path: "/" });
	redirect("/browse");
}

export async function clearToken() {
	cookies().set("token", "", {
		httpOnly: true,
		secure: true,
		path: "/",
		maxAge: -1,
	});
}

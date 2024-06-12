"use server";

import { cookies } from "next/headers";

export const setCookie = (key: string, value: string) => {
	cookies().set(key, value, { httpOnly: true, secure: true, path: "/" });
};

export async function setToken(token: string) {
	setCookie("token", token);
}

export async function getToken() {
	return cookies().get("token")?.value;
}

export async function clearToken() {
	cookies().set("token", "", {
		httpOnly: true,
		secure: true,
		path: "/",
		maxAge: -1,
	});
}

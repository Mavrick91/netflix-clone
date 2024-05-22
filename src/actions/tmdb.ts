"use server";

import db from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const getRequestToken = async (): Promise<string> => {
	const tokenResponse = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`);
	const tokenData = await tokenResponse.json();
	const requestToken = tokenData.request_token;

	return requestToken;
};

export const createSession = async (requestToken: string, userId: string): Promise<string> => {
	const sessionResponse = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ request_token: requestToken }),
	});

	if (!sessionResponse.ok) {
		console.log("🚀 ~ response error:", await sessionResponse.text());
		throw new Error("Failed to create session");
	}

	const sessionData = await sessionResponse.json();
	const sessionId = sessionData.session_id;

	const userDoc = doc(collection(db, "users"), userId);
	await setDoc(userDoc, {
		tmdbSessionId: sessionId,
	});

	return sessionId;
};

"use server";

import db from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getSessionId(userId: string): Promise<string | null> {
	const userDocRef = doc(db, "users", userId);
	const userDoc = await getDoc(userDocRef);
	return userDoc.exists() ? userDoc.data()?.tmdbSessionId || null : null;
}

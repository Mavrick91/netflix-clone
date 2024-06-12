"use server";

import { admin, adminDb } from "@/firebaseAdmin";
import { getErrorMessage, logError } from "@/utils/utils";

export const updateFirebaseUser = async (
	uid: string,
	properties: admin.auth.UpdateRequest,
) => {
	admin.auth().updateUser(uid, properties);
};

export const getUser = async (token: string): Promise<string> => {
	try {
		const decodedToken = await admin.auth().verifyIdToken(token);

		const [firebaseUser, userDoc] = await Promise.all([
			admin.auth().getUser(decodedToken.uid),
			adminDb.doc(`users/${decodedToken.uid}`).get(),
		]);

		const userData = userDoc.exists ? userDoc.data() : {};

		return JSON.stringify({ ...firebaseUser, ...userData });
	} catch (error: unknown) {
		const errorMessage = getErrorMessage(error);
		logError(errorMessage);

		throw new Error(errorMessage);
	}
};

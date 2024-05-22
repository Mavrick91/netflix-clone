"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie, clearToken } from "@/actions/cookie";
import { getSessionId } from "@/actions/firebase";
import { getAccountDetails } from "@/actions/tmdb";
import { TMBD, TMDBAccount } from "../../../types";

interface AuthContextType {
	currentUser: CustomUser | null;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

type CustomUser = User & {
	tmdb: TMBD | null;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<CustomUser | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const sessionId = await getSessionId(user.uid);
				const token = await user.getIdToken();

				if (sessionId) {
					const accountTMDBDetails = await getAccountDetails(sessionId);

					const updatedUser: CustomUser = {
						...user,
						tmdb: { sessionId, ...accountTMDBDetails },
					};

					setCurrentUser(updatedUser);
				} else {
					setCurrentUser({ ...user, tmdb: null });
				}

				await setCookie(token);

				const currentParams = new URLSearchParams(searchParams.toString());
				const redirectUrl = `/browse?${currentParams.toString()}`;
				router.push(redirectUrl);
			} else {
				await clearToken();
				setCurrentUser(null);
			}

			setLoading(false);
		});

		return unsubscribe;
	}, [router, searchParams]);

	const logout = async () => {
		await clearToken();
		await signOut(auth);
	};

	if (loading) return null;

	return <AuthContext.Provider value={{ currentUser, logout }}>{!loading && children}</AuthContext.Provider>;
};
